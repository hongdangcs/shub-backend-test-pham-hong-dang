const xlsx = require("xlsx");

function handleApiQuery(req, res, uploadedFile) {
    // kiem tra xem da upload file chua
    if (!uploadedFile) {
        res.status(400).send('Vui long tai len file truoc khi truy van.');
        return;
    }
    const gio_bat_dau = req.query["gio-bat-dau"];
    const gio_ket_thuc = req.query["gio-ket-thuc"];

    // kiem tra xem gio bat dau va gio ket thuc co dung dinh dang hhmmss khong
    if (gio_bat_dau && gio_ket_thuc && /^\d{6}$/.test(gio_bat_dau) && /^\d{6}$/.test(gio_ket_thuc)) {
        if (parseInt(gio_bat_dau) > parseInt(gio_ket_thuc)) {
            res.status(400).send('Gio bat dau phai nho hon gio ket thuc.');
            return;
        }
        if (gio_bat_dau < 0 || gio_ket_thuc > 235959) {
            res.status(400).send('Gio bat dau va gio ket thuc phai nam trong khoang 000000 - 235959.');
            return;
        }
        // lay sheet dau tien
        const sheet = uploadedFile.Sheets[uploadedFile.SheetNames[0]];
        const range = xlsx.utils.decode_range(sheet['!ref']);
        let totalSum = 0;

        for (let i = range.s.r + 8; i <= range.e.r; i++) {
            // lay cell thoi gian va cell tong tien
            const timeCell = sheet[xlsx.utils.encode_cell({r: i, c: 2})];
            const totalPriceCell = sheet[xlsx.utils.encode_cell({r: i, c: 8})];

            if (timeCell && totalPriceCell) {
                // lay thoi gian va tong tien
                const time = timeCell.v;
                const totalPrice = parseFloat(totalPriceCell.v);

                if (time >= gio_bat_dau && time <= gio_ket_thuc) {
                    // neu thoi gian nam trong khoang gio bat dau va gio ket thuc thi cong tong tien vao total
                    totalSum += totalPrice;
                }
            }
        }

        res.json({totalSum});
    } else {
        res.status(400).send('Sai định dạng thời gian. Vui lòng nhập lại hhmmss');
    }
}

module.exports = handleApiQuery;