package handle_function

import (
	"html/template"
	"net/http"
)

func HandleIndex(w http.ResponseWriter, r *http.Request) {
	tmpl := `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Upload File</title>
	</head>
	<body>
		<form action="/api/upload" method="post" enctype="multipart/form-data">
			<label for="file">Select file:</label>
			<input type="file" id="file" name="file" required>
			<button type="submit">Upload</button>
		</form>
	</body>
	</html>
	`
	t := template.New("index")
	t.Parse(tmpl)
	t.Execute(w, nil)
}
