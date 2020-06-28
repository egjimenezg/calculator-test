FROM node:12.18.0-alpine

MAINTAINER Gamaliel Jimenez <egjimenezg@gmail.com>

RUN apk add --update bash

WORKDIR /usr/src/app

COPY calculator-app/ /usr/src/app

RUN npm install -g ember-cli@3.18.0

EXPOSE 4200

ENTRYPOINT ["ember","serve"]
