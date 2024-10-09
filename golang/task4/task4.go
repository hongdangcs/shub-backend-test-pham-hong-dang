package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

type Query struct {
	Range [2]int `json:"range"`
	Type  string `json:"type"`
}

type ParsedData struct {
	Token string  `json:"token"`
	Data  []int   `json:"data"`
	Query []Query `json:"query"`
}

func main() {
	parsedData, err := fetchData("https://test-share.shub.edu.vn/api/intern-test/input")
	if err != nil {
		fmt.Println(err)
		return
	}

	sum1, sum2 := calculateSums(parsedData.Data)
	result := processQueries(parsedData.Query, sum1, sum2)

	if err := uploadAnswer(parsedData.Token, result); err != nil {
		fmt.Println(err)
	}
}

func calculateSums(data []int) ([]int, []int) {
	sum1, sum2 := []int{0}, []int{0}
	for i, val := range data {
		sum1 = append(sum1, sum1[i]+val)
		if i%2 == 0 {
			sum2 = append(sum2, sum2[i]+val)
		} else {
			sum2 = append(sum2, sum2[i]-val)
		}
	}
	return sum1, sum2
}

func processQueries(queries []Query, sum1, sum2 []int) []int {
	var result []int
	for _, q := range queries {
		if q.Type == "1" {
			result = append(result, sum1[q.Range[1]+1]-sum1[q.Range[0]])
		} else {
			if q.Range[0]%2 == 0 {
				result = append(result, sum2[q.Range[1]+1]-sum2[q.Range[0]])
			} else {
				result = append(result, sum2[q.Range[0]]-sum2[q.Range[1]+1])
			}
		}
	}
	return result
}

func fetchData(url string) (ParsedData, error) {
	res, err := http.Get(url)
	if err != nil {
		return ParsedData{}, err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return ParsedData{}, err
	}

	var parsedData ParsedData
	if err := json.Unmarshal(body, &parsedData); err != nil {
		return ParsedData{}, err
	}
	return parsedData, nil
}

func uploadAnswer(token string, result []int) error {
	payload, err := json.Marshal(result)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", "https://test-share.shub.edu.vn/api/intern-test/output", strings.NewReader(string(payload)))
	if err != nil {
		return err
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", "Bearer "+token)

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return err
	}
	fmt.Println(string(body))
	return nil
}
