FROM node:18 AS build
 
# Set working directory
WORKDIR /app
 
# Install dependencies and build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Serve the app with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
 
# Expose port
EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]