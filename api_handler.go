package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	"github.com/pilu/traffic"
	"github.com/tealeg/xlsx"
)

type ExcelData struct {
	DocumentName string
	Sheets [][][]string
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

	xlFile, err := xlsx.OpenBinary(data)
	if err != nil {
		fmt.Println(err)
	}
	
 	excelData := ExcelData{DocumentName: handler.Filename}
	excelData.Sheets, err = xlFile.ToSlice()
	if err != nil {
		fmt.Println(err)
	}
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
