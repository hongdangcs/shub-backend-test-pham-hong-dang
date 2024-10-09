package handle_function

import "net/http"
import "html/template"

func HandleQuery(w http.ResponseWriter, r *http.Request) {
	tmpl := `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Query</title>
	</head>
	<body>
		<form action="/api/query" method="get">
			<label for="gio-bat-dau">Gio bat dau:</label>
			<input type="text" id="gio-bat-dau" name="gio-bat-dau" required>
			<label for="gio-ket-thuc">Gio ket thuc:</label>
			<input type="text" id="gio-ket-thuc" name="gio-ket-thuc" required>
			<button type="submit">Query</button>
		</form>
	</body>
	</html>
	`
	t := template.New("query")
	t.Parse(tmpl)
	t.Execute(w, nil)
}
