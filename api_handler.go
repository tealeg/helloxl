package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	"github.com/pilu/traffic"
	"github.com/tealeg/xlsx"
)


type Col struct {
	ColID string
	Value string
}

type Row struct {
	RowID string
	Cols []Col
}

type Sheet struct {
	SheetID string
	MaxCols int
	MaxRows int
	Rows []Row
}

type ExcelData struct {
	DocumentName string
	Sheets []Sheet
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

	excelData.Sheets = []Sheet{}
	for sheetIndex, sheet := range xlFile.Sheets {
		sheetID := fmt.Sprintf("%d", sheetIndex)
		jSheet := Sheet{MaxCols: sheet.MaxCol, MaxRows: sheet.MaxRow, SheetID: sheetID}
		jSheet.Rows = []Row{}
		for rowIndex, row := range sheet.Rows {
			rowID := fmt.Sprintf("%d-%d", sheetIndex, rowIndex)
			jRow := Row{RowID: rowID}
			jRow.Cols = []Col{}
			for cellIndex, cell := range row.Cells {
				colID := fmt.Sprintf("%d-%d-%d", sheetIndex, rowIndex, cellIndex)
				jCol := Col{ColID: colID}
				value, err := cell.FormattedValue()
				if err != nil {
					value = err.Error()
				}
				jCol.Value = value
				jRow.Cols = append(jRow.Cols, jCol)
			}
			jSheet.Rows = append(jSheet.Rows, jRow)
		}
		excelData.Sheets = append(excelData.Sheets, jSheet)
	}
	fmt.Println(excelData)
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
