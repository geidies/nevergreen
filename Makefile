CONTAINER_NAME = emq-nevergreen

.PHONY: all docker test jar

all: docker

docker:
	docker build -t $(CONTAINER_NAME) .

jar: target/nevergreen-standalone.jar

target/nevergreen-standalone.jar:
	npm install
	npm run build
	npm run sass
	lein uberjar

test:
	npm run test
	lein test

clean:
	lein clean

release: target/nevergreen-docker.tgz

target/nevergreen-docker.tgz: docker
	docker save -o $@ $(CONTAINER_NAME)
