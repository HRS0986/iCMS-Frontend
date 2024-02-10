# Stage 1: Build Angular app
FROM node:latest AS build
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve Angular app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/i-cms-frontend/browser /usr/share/nginx/html
EXPOSE 80
