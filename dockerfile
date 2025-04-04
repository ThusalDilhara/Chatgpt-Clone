#use base image
FROM node:20-alpine

#set working directory
WORKDIR /app

#copy package.json and package-lock.json
COPY package*.json ./

#install dependencies
RUN npm install

#copy rest source files
COPY . .

#expose port
EXPOSE 5173

#start app
CMD ["npm", "run", "dev"]