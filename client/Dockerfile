FROM node:20-alpine

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install --legacy-peer-deps && npm install prop-types --legacy-peer-deps

COPY client ./client
COPY shared ./shared

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]