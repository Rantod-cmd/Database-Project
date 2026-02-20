FROM node:20-alpine

WORKDIR /app

COPY client/package*.json ./client/

RUN npm install --prefix client

COPY client ./client
COPY shared ./shared

WORKDIR /app/client

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
