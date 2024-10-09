// Tạo database QuanLyTramXang
CREATE DATABASE IF NOT EXISTS QuanLyTramXang;
USE QuanLyTramXang;

// Tạo bảng TramXang
CREATE TABLE IF NOT EXISTS TramXang (
    MaTramXang INT PRIMARY KEY AUTO_INCREMENT,
    TenTramXang VARCHAR(255) NOT NULL,
    DiaChi VARCHAR(255) NOT NULL
);

// Tạo bảng HangHoa
CREATE TABLE IF NOT EXISTS HangHoa (
    MaHangHoa INT PRIMARY KEY AUTO_INCREMENT,
    TenHangHoa VARCHAR(255) NOT NULL,
    DonGia FLOAT NOT NULL
);

// Tạo bảng TruBom
CREATE TABLE IF NOT EXISTS TruBom (
    MaTruBom INT PRIMARY KEY AUTO_INCREMENT,
    MaTramXang INT NOT NULL,
    MaHangHoa INT NOT NULL,
    FOREIGN KEY (MaTramXang) REFERENCES TramXang(MaTramXang),
    FOREIGN KEY (MaHangHoa) REFERENCES HangHoa(MaHangHoa)
);

// Tạo bảng GiaoDich
CREATE TABLE IF NOT EXISTS GiaoDich (
    MaGiaoDich INT PRIMARY KEY AUTO_INCREMENT,
    MaTramXang INT NOT NULL,
    MaTruBom INT NOT NULL,
    MaHangHoa INT NOT NULL,
    NgayGiaoDich DATE NOT NULL,
    GioGiaoDich TIME NOT NULL,
    SoLuong INT NOT NULL,
    ThanhTien FLOAT NOT NULL,
    FOREIGN KEY (MaTruBom) REFERENCES TruBom(MaTruBom)
    FOREIGN KEY (MaTramXang) REFERENCES TramXang(MaTramXang),
    FOREIGN KEY (MaHangHoa) REFERENCES HangHoa(MaHangHoa)
);

// Tạo chi muc
CREATE INDEX idx_MaTramXang ON TruBom(MaTramXang);
CREATE INDEX idx_MaHangHoa ON TruBom(MaHangHoa);
CREATE INDEX idx_MaTruBom ON GiaoDich(MaTruBom);

// Insert dữ liệu
INSERT INTO TramXang (TenTramXang, DiaChi) VALUES ('Tram Xang A', '123 Nguyen Trai, Quan 1');
INSERT INTO TramXang (TenTramXang, DiaChi) VALUES ('Tram Xang B', '456 Nguyen Trai, Quan 1');

INSERT INTO HangHoa (TenHangHoa, DonGia) VALUES ('Xang A92', 20000);
INSERT INTO HangHoa (TenHangHoa, DonGia) VALUES ('Xang A95', 22000);

INSERT INTO TruBom (MaTramXang, MaHangHoa) VALUES (1, 1);
INSERT INTO TruBom (MaTramXang, MaHangHoa) VALUES (1, 2);
INSERT INTO TruBom (MaTramXang, MaHangHoa) VALUES (2, 1);

INSERT INTO GiaoDich (MaTramXang, MaTruBom, MaHangHoa, NgayGiaoDich, GioGiaoDich, SoLuong, ThanhTien) VALUES (1, 1, 1, '2021-01-01', '10:00:00', 100, 2000000);
INSERT INTO GiaoDich (MaTramXang, MaTruBom, MaHangHoa, NgayGiaoDich, GioGiaoDich, SoLuong, ThanhTien) VALUES (1, 1, 2, '2021-01-01', '10:00:00', 100, 2200000);
INSERT INTO GiaoDich (MaTramXang, MaTruBom, MaHangHoa, NgayGiaoDich, GioGiaoDich, SoLuong, ThanhTien) VALUES (1, 2, 1, '2021-01-01', '10:00:00', 100, 2000000);

// Lấy dữ liệu
SELECT * FROM TramXang;
SELECT * FROM HangHoa;
SELECT * FROM TruBom;
SELECT * FROM GiaoDich;

// Lấy thông tin giao dịch của một trạm xăng
SELECT * FROM GiaoDich WHERE MaTramXang = 1;

// Lấy thông tin giao dịch của một trạm xăng trong một khoảng thời gian
SELECT * FROM GiaoDich WHERE MaTramXang = 1 AND NgayGiaoDich BETWEEN '2021-01-01' AND '2021-01-02';

// Lấy thông tin các trụ bơm của một trạm xăng
SELECT * FROM TruBom WHERE MaTramXang = 1;

// Lấy thông tin các loại hàng hóa mà một trạm xăng cung cấp
SELECT * FROM HangHoa WHERE MaHangHoa IN (SELECT MaHangHoa FROM TruBom WHERE MaTramXang = 1);


