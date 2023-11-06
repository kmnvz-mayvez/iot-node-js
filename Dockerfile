FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
RUN npx prisma generate
COPY . .

CMD ["npm", "start"]