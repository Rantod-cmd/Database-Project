FROM node:20-alpine

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install --legacy-peer-deps
RUN cd server && npm rebuild esbuild

COPY server/prisma ./server/prisma/
RUN cd server && npx prisma generate

COPY server/ ./server/
COPY shared/ ./shared/

WORKDIR /app/server
EXPOSE 5207

CMD ["npx", "tsx", "watch", "index.ts"]