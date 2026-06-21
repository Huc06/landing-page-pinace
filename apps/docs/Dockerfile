# Build context = repo root.
# Railway runs this with RAILWAY_DOCKERFILE_PATH=apps/docs/Dockerfile.
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

# Install deps (postinstall runs fumadocs-mdx codegen).
COPY apps/docs/package.json apps/docs/
WORKDIR /app/apps/docs
RUN pnpm install --no-frozen-lockfile

# Now bring in the docs source + build Next.
WORKDIR /app
COPY apps/docs/ apps/docs/
WORKDIR /app/apps/docs
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ----------------------------------------------------------------
FROM node:22-alpine AS runtime
WORKDIR /app/apps/docs
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
COPY --from=build /app/apps/docs ./
CMD ["sh", "-c", "pnpm exec next start -p ${PORT:-3000}"]
