FROM node:20-alpine
WORKDIR /app/backend
COPY . /app/backend
RUN npm install 
EXPOSE 8001
-e
CMD ["npm","run","dev"]