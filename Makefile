APT := $(shell command -v apt 2> /dev/null)
YUM := $(shell command -v yum 2> /dev/null)
PACMAN := $(shell command -v pacman 2> /dev/null)
NPM += $(shell command -v npm 2> /dev/null)

NODE_PACKAGES = react react-dom react-addons-test-utils react-test-renderer babel-loader babel-preset-es2015 babel-preset-react babel-register chai enzyme chai-enzyme mocha webpack jsdom jsdom-global uglify clean-css-cli eslint eslint-plugin-react eslint-plugin-mocha


JSX_PATH ?= ./jsx


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

pacman:
ifdef PACMAN
	sudo pacman -S npm
endif

npm: apt yum pacman

check_npm:
# By defining this conditionally, rather than making a 'npm' a
# precondition we can stop node_modules and npm running for every make.
ifndef NPM
	make npm
endif

node_modules/%:
	npm install --save $(@F)

.PHONY: node_modules
node_modules:
	$(foreach m,$(NODE_PACKAGES),make node_modules/$(m);)

webpack: check_npm node_modules
	./node_modules/.bin/webpack -d

jsx-test: check_npm node_modules
	 BABEL_CACHE_PATH='.babel-cache.json' ./node_modules/mocha/bin/mocha --compilers jsx:babel-core/register ./jsx/test/*.jsx

golang:
	go build .

golang-test:
	go test -v 

docker-build:
	sudo docker build -t helloxl .

docker-run:
	sudo docker run --publish 8080:3000 --name helloxl --rm helloxl


clean:
	rm -rf node_modules helloxl .babel-cache.json
