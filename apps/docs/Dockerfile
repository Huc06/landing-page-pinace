# Railway build context = repo root (RAILWAY_DOCKERFILE_PATH=apps/docs/Dockerfile).
# Single-stage build keeps it small and predictable. fumadocs-mdx's
# postinstall script reads source.config.ts + content/docs/**, so we
# copy the whole apps/docs/ tree BEFORE pnpm install — otherwise the
# postinstall tries to codegen from a missing config and dies.
FROM node:22-alpine
WORKDIR /app/apps/docs
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

# .npmrc next to package.json enables shamefully-hoist so fumadocs-mdx
# can resolve its vite / rolldown peers at the package root.
COPY apps/docs/ ./

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm install --no-frozen-lockfile

RUN pnpm build

ENV NODE_ENV=production
CMD ["sh", "-c", "pnpm exec next start -p ${PORT:-3000}"]
