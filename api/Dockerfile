FROM node:12-alpine
RUN npm install -g nodemon
WORKDIR /app

COPY package.json /app
RUN npm install
RUN mv /app/node_modules /

COPY . /app

CMD ["npm", "start"]
