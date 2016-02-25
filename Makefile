
.PHONY: all docker test

all: docker

docker: target/nevergreen-standalone.jar
	docker build -t emq-nevergreen .

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
