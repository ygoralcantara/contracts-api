FROM node:16-slim

RUN mkdir -p /usr/src/temp
WORKDIR /usr/src/temp

COPY package*.json ./

RUN npm install --loglevel=warn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
