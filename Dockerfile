FROM node:14.15
COPY . /usr
WORKDIR /usr
RUN npm install 

