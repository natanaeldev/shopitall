FROM node:20-alpine

WORKDIR /app

# Copy root package files if server uses root package.json; adjust if server has its own
COPY package*.json ./

# Install deps (you might want to optimize later)
RUN npm install || true

# Copy server code only
COPY server ./server

WORKDIR /app/server

# Install server-specific deps
RUN npm install

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

# Assumes "npm start" in server/package.json starts the API
CMD ["npm", "start"]
