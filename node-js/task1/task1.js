const express = require('express');
const app = express();
const port = 3000;

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const handleIndex = require("./handle-function/handle-index");
const handleQuery = require("./handle-function/handle-query");
const handleUpload = require("./handle-function/handle-upload");
const handleApiQuery = require("./handle-function/handle-api-query");

let uploadedFile = null;

app.get('/', handleIndex);

app.get('/query', handleQuery);

app.post('/api/upload', upload.single('file'), (req, res) => {
    uploadedFile = handleUpload(req, res);
});

app.get('/api/query', (req, res) => {
    handleApiQuery(req, res, uploadedFile);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});