# Dockerfile per Spring Boot + Java 21
FROM eclipse-temurin:21-jdk-alpine
LABEL authors="Toure e Taralli"
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]