
function handleQuery(req, res) {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Query</title>
        </head>
        <body>
            <h1>Query</h1>
            <form action="/api/query" method="get">
                <label for="gio-bat-dau">Gio bat dau:</label>
                <input type="text" id="gio-bat-dau" name="gio-bat-dau" required>
                <label for="gio-ket-thuc">Gio ket thuc:</label>
                <input type="text" id="gio-ket-thuc" name="gio-ket-thuc" required>
                <button type="submit">Query</button>
            </form>
            <div></div>
        </body>
        </html>
    `);
}

module.exports = handleQuery;