FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .

ENV PORT=3000
EXPOSE $PORT

CMD ["bun", "run", "src/index.ts"]
