
FROM node:12.14.1-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn install --network-timeout=100000
COPY . .
EXPOSE 3000

CMD ["yarn","start"]