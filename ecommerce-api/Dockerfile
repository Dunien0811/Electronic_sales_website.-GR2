FROM node:12.22.1-alpine3.10

WORKDIR /usr/app

COPY package.json .
RUN npm install

COPY . .
EXPOSE 3000

CMD npm run latest && npm run seed && npm start
