
function handleIndex(req, res) {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Upload File</title>
        </head>
        <body>
            <h1>Upload File</h1>
            <form action="/api/upload" method="post" enctype="multipart/form-data">
                <label for="file">Select file:</label>
                <input type="file" id="file" name="file" required>
                <button type="submit">Upload</button>
            </form>
            <div></div>
            
        </body>
        </html>
    `);
}

module.exports = handleIndex;