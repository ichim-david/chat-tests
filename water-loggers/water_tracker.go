package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"sync"
)

type WaterLog struct {
	Date   string  `json:"date"`
	Amount float64 `json:"amount"`
}

var (
	logs  = make(map[string]float64)
	mutex sync.Mutex
)

func main() {
	http.HandleFunc("/log", logWater)
	http.HandleFunc("/total", getTotalWater)

	fmt.Println("Water tracking app is running on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Printf("Failed to start server: %v\n", err)
		os.Exit(1)
	}
}

func logWater(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		httpError(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var log WaterLog
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		httpError(w, "Unable to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	if err := json.Unmarshal(body, &log); err != nil {
		httpError(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	mutex.Lock()
	defer mutex.Unlock()
	logs[log.Date] += log.Amount

	w.WriteHeader(http.StatusNoContent)
}

func getTotalWater(w http.ResponseWriter, r *http.Request) {
	date := r.URL.Query().Get("date")
	if date == "" {
		httpError(w, "Date is required", http.StatusBadRequest)
		return
	}

	mutex.Lock()
	defer mutex.Unlock()
	total := logs[date]

	response := map[string]float64{"total": total}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func httpError(w http.ResponseWriter, message string, code int) {
	http.Error(w, message, code)
}
