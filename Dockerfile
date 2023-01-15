FROM node:19

RUN npm config set cache /tmp --global

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./app

ENV PORT=4002

EXPOSE 4002

RUN npx prisma generate

CMD ["npm", "start"]
