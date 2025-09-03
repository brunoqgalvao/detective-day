FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files
COPY --from=build /app/dist ./dist
# Copy case JSON files (they're not included in TypeScript build)
COPY --from=build /app/src/cases ./dist/cases

EXPOSE 3010

CMD ["node", "dist/app.js"]

