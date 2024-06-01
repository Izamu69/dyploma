FROM node:latest

CMD ["node", "run", "build"]

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY dist ./