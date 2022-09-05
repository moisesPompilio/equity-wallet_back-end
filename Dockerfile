FROM node as build-deps
WORKDIR /usr/equity-wlallet/app
COPY . .
CMD yarn start:docker