package main

import (
	"fmt"
	"github.com/tealeg/xlsx"
	"net/http"
	_ "path/filepath"
	handle_function "pham-hong-dang-shub-test/golang/task1/handle-function"
)

var uploadedFile *xlsx.File

func main() {
	http.HandleFunc("/", handle_function.HandleIndex)
	http.HandleFunc("/query", handle_function.HandleQuery)
	http.HandleFunc("/api/upload", func(writer http.ResponseWriter, request *http.Request) {
		uploadedFile = handle_function.HandleUpload(writer, request, uploadedFile)
	})
	http.HandleFunc("/api/query", func(writer http.ResponseWriter, request *http.Request) {
		handle_function.HandleApiQuery(writer, request, uploadedFile)
	})

	fmt.Println("Server is running on port 3000")
	http.ListenAndServe(":3000", nil)
}
