package main

import (
  "github.com/pilu/traffic"
)

var router *traffic.Router

func init() {
	traffic.SetHost("0.0.0.0")
	traffic.SetPort(3000)
	router = traffic.New()
	router.Get("/", RootHandler)
}

func main() {
  router.Run()
}
