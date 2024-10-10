# Pham Hong Dang - Shub backend test
### Mô tả
- Đây là bài test backend của Shub gồm 3 task được mình làm:
    1. Task 1: Data report
    2. Task 3: Database
    3. Task 4: Data Structure and Algorithm
- Task 1 và Task 4 được xây dựng bằng cả hai ngôn ngữ Golang và Javascript(Nodejs). 
- Task 3 là file sql và EDR của database.

## Chi tiết từng task
### Task 1: Data report

*GET* ```/```

Trả về trang index.html, có thể upload file Excel để xem kết quả.

*POST* ```/api/upload```

Upload file Excel, trả về thông tin file đã upload.

Form data:

    file: file Excel
*GET* ```/query```

Trả về trang query cho phép nhập giờ bắt đầu và giờ kết thúc để truy vấn

*GET* ```/api/query```

Truy vấn dữ liệu từ giờ bắt đầu đến giờ kết thúc.

Query string:

    gio-bat-dau: giờ bắt đầu ở định dạng hhmmss
    gio-ket-thuc: giờ kết thúc ở định dạng hhmmss

#### Ví dụ
- Upload file Excel và xem kết quả: http://localhost:3000/
- Nhập giờ bắt đầu và giờ kết thúc để xem kết quả: http://localhost:3000/query
- Truy vấn dữ liệu từ giờ bắt đầu đến giờ kết thúc: http://localhost:3000/api/query?gio-bat-dau=100000&gio-ket-thuc=200000
#### Sử dụng Postman
- Import file shub.postman_collection.json vào postman.
- Sử dụng các request đã được tạo sẵn để test.

### Task 3: Database
- File task3.sql chứa câu lệnh tạo bảng và insert dữ liệu vào bảng và các truy vấn của database.
- File task3-ERD.png chứa EDR của database.

### Task 4: Data Structure and Algorithm
#### Tiếp cận
1. Thu thập dữ liệu từ api.
2. Xuất dữ liệu: token, data, query từ api để xử lí.
3. Tính toán trước tổng số từ vị trí đầu tiên đến vị trí thứ i và lưu vào mảng.
4. Xử lí tính tổng trong một khoảng từ l tới r: lấy tổng từ vị trí r trừ tổng từ vị trí l-1.
5. Gửi kết quả về api.
#### Tính hiệu quả
- Time complexity: O(n + q) với n là số lượng phần tử trong mảng, q là số lượng query.
- Space complexity: O(n + q) với n là số lượng phần tử trong mảng sum, q là số lượng mảng result.


## Dưới đây là cấu trúc thư mục của repo:

    
    shub-backend-test-pham-hong-dang
    ├── golang
    │   ├── task1
    │   │   ├── task1.go
    │   │   ├── routes.go
    │   │   └── handle-function
    │   │       ├── handle-index.go
    │   │       ├── handle-query.go
    │   │       ├── handle-upload.go
    │   │       └── handle-api-query.go
    │   └── task4
    │       └── task4.go
    │
    ├── node-js
    │   ├── task1
    │   │   ├── task1.js
    │   │   ├── uploads
    │   │   └── handle-function
    │   │       ├── handle-index.js
    │   │       ├── handle-query.js
    │   │       ├── handle-upload.js
    │   │       └── handle-api-query.js
    │   └── task4
    │       └── task4.js
    │
    └── sql
        └── task3
            ├── task3.sql
            └── task3-ERD.png
  
## Cách chạy code Nodejs
- Yêu cầu: Nodejs, npm
- Clone repo về máy:
    ```bash
    git clone https://github.com/hongdangcs/shub-backend-test-pham-hong-dang.git
    cd shub-backend-test-pham-hong-dang/nodejs/task1
    ```
- Cài đặt các thư viện cần thiết:
    ```bash
    npm install
    ```
#### Task 1
- Chạy server:
    ```bash
    node node-js/task1/task1.js
    ```
#### Task 4
- Chạy server:
    ```bash
    node node-js/task4/task4.js
    ```
## Cách chạy code Golang
- Yêu cầu: Golang
- Clone repo về máy:
    ```bash
    git clone https://github.com/hongdangcs/shub-backend-test-pham-hong-dang.git
    cd shub-backend-test-pham-hong-dang/golang/task1
    ```
- Cài đặt các thư viện cần thiết:
    ```bash
    go mod tidy
    ```
#### Task 1
- Chạy server:
    ```bash
    go run golang/task1/task1.go
    ```
#### Task 4
- Chạy server:
    ```bash
    go run golang/task4/task4.go
    ```
