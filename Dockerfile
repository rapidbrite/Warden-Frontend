FROM node:20.11.1-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
CMD ["npm", "start"]

