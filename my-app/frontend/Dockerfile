# syntax=docker/dockerfile:1.4

FROM node:22-alpine3.19 AS development

ENV PORT=8081
ENV NODE_ENV=development

EXPOSE 8081 19001 19002

WORKDIR /code

RUN apk add --no-cache \
    bash \
    git \
    python3 \
    make \
    g++ \
    openssl

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci
COPY . /code

CMD [ "npm", "start" ]