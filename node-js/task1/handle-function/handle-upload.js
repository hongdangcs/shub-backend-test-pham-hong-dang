const mime = require("mime-types");
const xlsx = require("xlsx");
const fs = require("fs");

function handleUpload(req, res) {
    const file = req.file;
    const mimeType = mime.lookup(file.originalname);
    const validMimeTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    let uploadedFile = null;

    // kiem tra file co phai la file excel hay khong
    if (validMimeTypes.includes(mimeType)) {
        uploadedFile = xlsx.readFile(file.path);
        res.json(file);
    } else {
        // xoa file neu khong phai la file excel
        fs.unlinkSync(file.path);
        res.status(400).send('Invalid file type. Please upload an Excel file.');
    }
    return uploadedFile;
}

module.exports = handleUpload;