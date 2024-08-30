# Dockerfile (Backend)
FROM node:20

# Set working directory
WORKDIR /app

# Copy source files
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 8000

# Start the app
CMD ["node", "index.js"]
