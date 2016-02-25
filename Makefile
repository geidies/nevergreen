all: docker

docker: target/nevergreen-standalone.jar
	docker build -t emq-nevergreen .

target/nevergreen-standalone.jar:
	lein uberjar
