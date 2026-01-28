FROM node:20-alpine
WORKDIR /app/backend
COPY . /app/backend
RUN npm install 
EXPOSE 4000
CMD ["npm","run","dev"]