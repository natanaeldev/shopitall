FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install || true

COPY client ./client

WORKDIR /app/client

# Install client deps and build
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine

# Remove default config and add our own later if needed
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to Nginx web root
COPY --from=build /app/client/dist /usr/share/nginx/html 2>/dev/null || \
    COPY --from=build /app/client/build /usr/share/nginx/html/

# Default Nginx exposes port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]