const express = require('express');
const router = express.Router();

const handleIndex = require("./handle-function/handle-index");
const handleQuery = require("./handle-function/handle-query");
const handleUpload = require("./handle-function/handle-upload");
const handleApiQuery = require("./handle-function/handle-api-query");

const multer = require('multer');
const upload = multer({dest: 'uploads/'});


let uploadedFile = null;

router.get('/', handleIndex);
router.get('/query', handleQuery);
router.post('/api/upload', upload.single('file'), (req, res) => {
    uploadedFile = handleUpload(req, res);
});
router.get('/api/query', (req, res) => {
    handleApiQuery(req, res, uploadedFile);
});

module.exports = router;