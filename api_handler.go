package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	"github.com/pilu/traffic"
)

type ExcelData struct {
	DocumentName string
	Data []byte
}

func excelResponse(w traffic.ResponseWriter, r *traffic.Request) {
	file, handler, err := r.FormFile("file") 
        if err != nil { 
                fmt.Println(err) 
        } 
        data, err := ioutil.ReadAll(file) 
        if err != nil { 
                fmt.Println(err) 
        }
	fmt.Print("Filename: ")
	fmt.Println(handler.Filename)
        // err = ioutil.WriteFile(handler.Filename, data, 0777) 
        // if err != nil { 
        //         fmt.Println(err) 
        // } 
	
 	excelData := ExcelData{DocumentName: "test", Data: data}
	enc := json.NewEncoder(w)
	enc.Encode(excelData)
}

func APIHandler(w traffic.ResponseWriter, r *traffic.Request) {
	params := r.URL.Query()
	call := params.Get("call")
	if call == "conversion" {
		excelResponse(w, r);
	}
}
