import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from './mermaid';

// Note: the OpenAPI <APIPage>/<OpenAPIPage> is a client component that needs the
// spec preloaded server-side, so the docs page passes it in via `components`
// (see app/docs/[[...slug]]/page.tsx) rather than registering it here.
export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Mermaid,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
