FROM node:12-alpine as build-stage

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app

RUN npm run build

FROM nginx:1.17
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
