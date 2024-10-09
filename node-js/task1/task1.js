const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mime = require('mime-types');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    const mimeType = mime.lookup(file.originalname);
    const validMimeTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (validMimeTypes.includes(mimeType)) {
        res.json(file);
    } else {
        res.status(400).send('Invalid file type. Please upload an Excel file.');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});