package handle_function

import (
	"encoding/json"
	"github.com/tealeg/xlsx"
	"net/http"
	"strconv"
	"strings"
)

func HandleApiQuery(w http.ResponseWriter, r *http.Request, uploadedFile *xlsx.File) {
	if uploadedFile == nil {
		http.Error(w, "Vui long tai len file truoc khi truy van", http.StatusBadRequest)
		return
	}

	gioBatDau := r.URL.Query().Get("gio-bat-dau")
	gioKetThuc := r.URL.Query().Get("gio-ket-thuc")

	if gioBatDau == "" || gioKetThuc == "" || len(gioBatDau) != 6 || len(gioKetThuc) != 6 {
		http.Error(w, "Sai dinh dang truy van, thu lai voi gio-bat-dau va gio-ket-thuc hhmmss", http.StatusBadRequest)
		return
	}

	startTime, err := strconv.Atoi(gioBatDau)
	if err != nil {
		http.Error(w, "Invalid start time format", http.StatusBadRequest)
		return
	}

	endTime, err := strconv.Atoi(gioKetThuc)
	if err != nil {
		http.Error(w, "Invalid end time format", http.StatusBadRequest)
		return
	}

	if startTime > endTime {
		http.Error(w, "Start time must be less than end time", http.StatusBadRequest)
		return
	}

	sheet := uploadedFile.Sheets[0]
	totalSum := 0.0

	for _, row := range sheet.Rows[8:] {
		timeCell := row.Cells[2]
		totalPriceCell := row.Cells[8]

		if timeCell != nil && totalPriceCell != nil {
			time := strings.ReplaceAll(timeCell.String(), ":", "")
			timeInt, err := strconv.Atoi(time)
			if err != nil {
				continue
			}

			if timeInt >= startTime && timeInt <= endTime {
				totalPrice, err := totalPriceCell.Float()
				if err != nil {
					continue
				}
				totalSum += totalPrice
			}
		}
	}

	result := map[string]float64{"totalSum": totalSum}
	json.NewEncoder(w).Encode(result)
}
