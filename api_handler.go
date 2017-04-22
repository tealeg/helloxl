package main

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/pilu/traffic"
)

type ExcelData struct {
	DocumentName string
}

func excelResponse(w traffic.ResponseWriter) {
 	excelData := ExcelData{DocumentName: "test"}
	enc := json.NewEncoder(w)
	enc.Encode(excelData)
}

func APIHandler(w traffic.ResponseWriter, r *traffic.Request) {
	params := r.URL.Query()
	r.ParseForm()
	fmt.Print("Form: ")
	fmt.Println(r.Form)
	for k, v := range r.Form {
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, ""))
	}
	call := params.Get("call")
	if call == "conversion" {
		excelResponse(w);
	}
}
