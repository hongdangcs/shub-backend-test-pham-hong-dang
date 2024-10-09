package handle_function

import (
	"github.com/tealeg/xlsx"
	"io"
	"net/http"
	"os"
)

func HandleUpload(w http.ResponseWriter, r *http.Request, uploadedFile *xlsx.File) *xlsx.File {
	if r.Method != "POST" {
		http.Error(w, "Sai method", http.StatusMethodNotAllowed)
		return nil
	}

	file, _, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Khong the nhan file", http.StatusBadRequest)
		return nil
	}
	defer file.Close()

	tempFile, err := os.CreateTemp("./", "upload-*.xlsx")
	if err != nil {
		http.Error(w, "Khong the tai file", http.StatusInternalServerError)
		return nil
	}
	defer tempFile.Close()

	_, err = io.Copy(tempFile, file)
	if err != nil {
		http.Error(w, "Loi luu file", http.StatusInternalServerError)
		return nil
	}

	uploadedFile, err = xlsx.OpenFile(tempFile.Name())
	if err != nil {
		http.Error(w, "Loi mo file", http.StatusInternalServerError)
		return nil
	}

	w.Write([]byte("Tai len file thanh cong"))
	return uploadedFile
}
