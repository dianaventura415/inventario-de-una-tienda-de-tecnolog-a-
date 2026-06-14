# Etapa de construcción
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine

COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# COPY --from=frontend-builder /app/build .   # si usas Create React App
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#docker build -t inventario-tienda-frontend:1.0 .
#docker run -d --name inventario-tienda-frontend -p 5173:80 inventario-tienda-frontend:1.0