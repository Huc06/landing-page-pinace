"use client";

import { shaderMaterial, useTrailTexture } from "@react-three/drei";
import {
  Canvas,
  type CanvasProps,
  useThree,
  useFrame,
} from "@react-three/fiber";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

interface SceneProps {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction: (x: number) => number;
  pixelColor: string;
}

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: Partial<CanvasProps>;
  glProps?: WebGLContextAttributes & { powerPreference?: string };
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
}

const GooeyFilter: React.FC<GooeyFilterProps> = ({
  id = "goo-filter",
  strength = 10,
}) => {
  return (
    <svg className="absolute overflow-hidden" style={{ width: 0, height: 0 }}>
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={strength}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color("#ffffff"),
  },
  /* glsl vertex shader */ `
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* glsl fragment shader */ `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  `,
);

const identityEase = (x: number) => x;

/**
 * Scene uses a global pointermove listener to track the mouse,
 * then fakes a ThreeEvent to feed into useTrailTexture.
 * This allows the Canvas to have pointer-events:none and still respond.
 */
function Scene({
  gridSize,
  trailSize,
  maxAge,
  interpolate,
  easingFunction,
  pixelColor,
}: SceneProps) {
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);
  const camera = useThree((s) => s.camera);

  const dotMaterial = useMemo(() => new DotMaterial(), []);
  const mouseUv = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      dotMaterial.dispose();
    };
  }, [dotMaterial]);

  useEffect(() => {
    (dotMaterial.uniforms.pixelColor.value as THREE.Color).set(pixelColor);
  }, [dotMaterial, pixelColor]);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || identityEase,
  }) as [THREE.Texture | null, (event: { uv?: THREE.Vector2 }) => void];

  useEffect(() => {
    if (!trail) return;
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }, [trail]);

  // Listen for global mouse movement and convert to UV
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      // Normalize mouse to 0..1 UV space
      mouseUv.current.x = e.clientX / window.innerWidth;
      mouseUv.current.y = 1 - e.clientY / window.innerHeight; // flip Y for UV
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  // Feed the trail texture with mouse UV every frame
  useFrame(() => {
    const uv = new THREE.Vector2(mouseUv.current.x, mouseUv.current.y);
    onMove({ uv });
  });

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = identityEase,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: "high-performance",
    alpha: true,
  },
  gooeyFilter,
  color = "#ffffff",
  className = "",
}: PixelTrailProps) {
  return (
    <>
      {gooeyFilter && (
        <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />
      )}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={className}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          ...(gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : {}),
        }}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}
