FROM emq-java
MAINTAINER seb@geidi.es

WORKDIR /usr/local
ENV LEIN_ROOT true
RUN mkdir nevergreen && apk add curl bash
RUN curl https://raw.githubusercontent.com/technomancy/leiningen/2.5.3/bin/lein -o bin/lein && chmod +x bin/lein && lein
WORKDIR /usr/local/nevergreen

RUN apk update && apk add nodejs
RUN npm cache clean -f && npm install -g n && n stable

COPY src /usr/local/nevergreen/src/
COPY resources /usr/local/nevergreen/resources/
COPY main.js /usr/local/nevergreen/
COPY package.json /usr/local/nevergreen/
COPY project.clj /usr/local/nevergreen/
RUN npm install
COPY .???* /usr/local/nevergreen/
RUN npm run build
RUN npm run sass

# only keep the uberjar
RUN lein uberjar && rm target/nevergreen-0.0.0.jar

EXPOSE 5000
CMD ["java", "-jar", "target/nevergreen-standalone.jar"]
