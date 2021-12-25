FROM node:buster AS build

WORKDIR /

# This way, "npm install" runs only when "package*.json" has changed
COPY ./package*.json ./

RUN npm install

COPY . .

# Emit bundles
RUN npm run build

FROM nginx:alpine

WORKDIR /www/static

# Nginx configuration
COPY nginx/ config/
# JavaScript files to serve
COPY --from=build /dist/ ./dist/

# Run the server
ENTRYPOINT ["nginx", "-c", "/www/static/config/nginx.conf"]
