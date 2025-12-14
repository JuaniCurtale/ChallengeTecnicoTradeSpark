FROM node:20.9.0-alpine

WORKDIR /app

RUN npm cache clean --force

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]
