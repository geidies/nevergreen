FROM emq-java
MAINTAINER seb@geidi.es

COPY target/nevergreen-standalone.jar /

EXPOSE 5000

CMD ["java", "-jar", "/nevergreen-standalone.jar"]
