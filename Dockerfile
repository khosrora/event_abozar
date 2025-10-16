FROM node:20-alpine

WORKDIR /usr/src

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx next telemetry disable

RUN npm run build

CMD npm run start

EXPOSE 3000