APT := $(shell command -v apt 2> /dev/null)
YUM := $(shell command -v yum 2> /dev/null)
NPM += $(shell command -v npm 2> /dev/null)

all: webpack golang

setup_7.x:
	wget https://rpm.nodesource.com/setup_7.x

yum: setup_7.x
ifdef YUM
	sudo bash ./setup_7.x
	sudo yum -y install nodejs
endif

apt:
ifdef APT
	sudo apt install npm
endif

npm: apt yum

node_modules:
# By defining this conditionally, rather than making a 'npm' a
# precondition we can stop node_modules and npm running for every make.
ifndef NPM
	make npm
endif
	npm i webpack babel-core babel-loader babel-preset-es2015 babel-preset-react react react-dom -S

webpack: node_modules
	./node_modules/.bin/webpack -d

golang:
	go build .

golang-test:
	go test -v 

docker-build:
	sudo docker build -t helloxl .

docker-run:
	sudo docker run --publish 8080:3000 --name helloxl --rm helloxl
