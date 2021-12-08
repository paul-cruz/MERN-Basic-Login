
FROM node:12.14.1-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000

CMD ["yarn","start"]