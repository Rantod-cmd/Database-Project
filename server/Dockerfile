FROM node:20-alpine

WORKDIR /app/server

COPY server/package*.json ./

RUN npm install --legacy-peer-deps
COPY server/prisma ./prisma/
RUN npx prisma generate

COPY server/ ./
COPY shared/ ../shared/

EXPOSE 5207

CMD ["npx", "tsx", "watch", "index.ts"]