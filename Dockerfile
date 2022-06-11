#Base image
FROM node:latest

#Working directory
WORKDIR /usr/app

#Dependency JSON
COPY ./package.json ./

#Installing dependencies
RUN npm i

#Copy remaining files
COPY ./ ./

#Start service
CMD ["node", "index.js"]