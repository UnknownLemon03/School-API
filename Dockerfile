FROM node:20

WORKDIR /app

COPY package* .

RUN npm install 

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]