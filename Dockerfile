# Step 1: Build the app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve the app using `serve`
FROM node:18-slim

WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy built app from build stage
COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
