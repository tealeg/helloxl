APT := $(shell command -v apt 2> /dev/null)
YUM := $(shell command -v yum 2> /dev/null)

all: webpack golang

npm:
ifdef APT
	sudo apt install npm
else
        wget https://rpm.nodesource.com/setup_7.x
	sudo bash ./setup_7.x
	sudo yum -y install nodejs
endif

node_modules: npm
	npm i webpack babel-core babel-loader babel-preset-es2015 babel-preset-react react react-dom -S

webpack: node_modules
	./node_modules/.bin/webpack -d

golang:
	go build .

golang-test:
	go test -v 
