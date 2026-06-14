# Usa una imagen de Maven para compilar
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests


# Usa una imagen ligera de Java para correr
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

EXPOSE 8080

COPY --from=builder /app/target/inventario-tienda-tecnologica-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]

#docker build -t inventario-tienda-tecnologica:1.0 .
#docker run -d --name inventario-tienda-tecnologica -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/tienda_db1 -e SPRING_DATASOURCE_USERNAME=postgres -e SPRING_DATASOURCE_PASSWORD=Danilo123 inventario-tienda-tecnologica:1.0