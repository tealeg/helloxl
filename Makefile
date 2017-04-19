all: webpack golang

webpack:
	./node_modules/.bin/webpack -d

golang:
	go build .

golang-test:
	go test -v 
