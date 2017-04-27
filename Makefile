APT := $(shell command -v apt 2> /dev/null)
YUM := $(shell command -v yum 2> /dev/null)
PACMAN := $(shell command -v pacman 2> /dev/null)
NPM += $(shell command -v npm 2> /dev/null)
GO += $(shell command -v go 2> /dev/null)

NODE_PACKAGES = react react-dom react-addons-test-utils react-test-renderer babel-loader babel-preset-es2015 babel-preset-react babel-register chai enzyme chai-enzyme mocha webpack jsdom jsdom-global uglify clean-css-cli eslint eslint-plugin-react eslint-plugin-mocha


JSX_PATH ?= ./jsx


all: webpack golang-build

test: webpack golang-test jsx-test

setup_7.x:
	wget https://rpm.nodesource.com/setup_7.x

yum: setup_7.x
ifdef YUM
	sudo bash ./setup_7.x
	sudo yum -y install nodejs
	rpm --import https://mirror.go-repo.io/centos/RPM-GPG-KEY-GO-REPO
	curl -s https://mirror.go-repo.io/centos/go-repo.repo | tee /etc/yum.repos.d/go-repo.repo
	yum install golang
	mkdir -p ~/go/{bin,pkg,src}
	echo 'export GOPATH="$HOME/go"' >> ~/.bashrc
	echo 'export PATH="$PATH:${GOPATH//://bin:}/bin"' >> ~/.bashrc
	yum -y install docker docker-registry
	systemctl enable docker.service
endif

apt:
ifdef APT
	sudo apt install npm golang-go docker-ce
endif

pacman:
ifdef PACMAN
	sudo pacman -S npm go docker
endif

binaries: apt yum pacman

check_npm:
# By defining this conditionally, rather than making a 'npm' a
# precondition we can stop node_modules and npm running for every make.
ifndef NPM
	make binaries
endif

golang:
ifndef GO
	make binaries
endif
	go get -t -v .

node_modules/%:
	npm install --save $(@F)

.PHONY: node_modules
node_modules:
	$(foreach m,$(NODE_PACKAGES),make node_modules/$(m);)

webpack: check_npm node_modules
	./node_modules/.bin/webpack -d

jsx-test: check_npm node_modules
	 BABEL_CACHE_PATH='.babel-cache.json' ./node_modules/mocha/bin/mocha --compilers jsx:babel-core/register ./jsx/test/*.jsx

golang-build: golang
	go build .

golang-test: golang
	go test -v 

docker-build:
	sudo docker build -t helloxl .

docker-run: docker-build
	sudo docker run --publish 8080:3000 --name helloxl --rm helloxl


clean:
	rm -rf node_modules helloxl .babel-cache.json
