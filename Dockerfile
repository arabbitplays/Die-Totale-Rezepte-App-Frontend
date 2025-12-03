# =========================================
# Stage 1: Build the Angular Application
# =========================================
ARG NODE_VERSION=24.7.0-alpine
ARG NGINX_VERSION=alpine3.22

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the rest of the application source code into the container
COPY . .

# Build the Angular application
RUN npm run build

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runner

# Use a built-in non-root user for security best practices
USER nginx

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --chown=nginx:nginx --from=builder /app/dist/* /usr/share/nginx/html

EXPOSE 8080

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]
