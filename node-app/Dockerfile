# Stage 1: Base Image for Dependencies
FROM node:22-slim AS dependencies

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Define build argument for environment (default: production)
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install dependencies
RUN if [ "$NODE_ENV" = "production" ]; then \
    npm install --only=production; \
    else \
    npm install; \
    fi

# Stage 2: Development Stage
FROM dependencies AS development

# Set environment variable for development
ENV NODE_ENV=development

# Copy the application source code
COPY . .

# Expose the development port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]

# Stage 3: Production Stage
FROM node:22-slim AS production

# Set working directory
WORKDIR /usr/src/app

# Copy production dependencies
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Copy application source code
COPY . .

# Set environment variable for production
ENV NODE_ENV=production

# Expose the production port
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "run", "start"]
