#amazon corretto:
FROM amazoncorretto:17

COPY target/Squawk-0.0.1.jar Squawk-0.0.1.jar

ENTRYPOINT ["java", "-jar", "/Squawk-0.0.1.jar"]
