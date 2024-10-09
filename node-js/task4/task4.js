
const requestOptions = {
    method: "GET",
    redirect: "follow"
};

const retrieveData = async () => {
    const response = await fetch("https://test-share.shub.edu.vn/api/intern-test/input", requestOptions);
    const data = await response.json();
    return data;
}

const execute = async () => {
    const parsedData = await retrieveData();

    const token = parsedData.token;
    const data = parsedData.data;
    const query = parsedData.query;

    const sum1 = [0]; // tổng của tất cả các phần tử từ
    const sum2 = [0]; // tổng của các phần tử chẵn - tổng của các phần tử lẻ

    //  tính tổng của các phần tử từ 0 đến i
    for (let i = 0; i < data.length; i++) {
        sum1.push(sum1[i] + data[i]);
        if (i % 2 == 0) {
            sum2.push(sum2[i] + data[i]);
        } else {
            sum2.push(sum2[i] - data[i]);
        }
    }

    const result = [];
    for (let i = 0; i < query.length; i++) {
        if (query[i].type == '1') {
            // nếu type là 1, tính tổng của 1 range và push vào result
            result.push(sum1[query[i].range[1] + 1] - sum1[query[i].range[0]]);
        } else {
            //  nếu type là 2, tính tổng 2 của range và push vào result
            if (query[i].range[0] % 2 == 0) {
                result.push(sum2[query[i].range[1] + 1] - sum2[query[i].range[0]]);
            } else {
                // nếu range[0] là số lẻ, thì đổi dấu
                result.push(sum2[query[i].range[0]] - sum2[query[i].range[1] + 1]);
            }
        }
    }

    await submit(token, result);

}

const submit = async (token, result) => {
    const submitHeaders = new Headers();
    submitHeaders.append("Content-Type", "application/json");
    submitHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify(result);

    const requestOptions = {
        method: "POST",
        headers: submitHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://test-share.shub.edu.vn/api/intern-test/output", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

execute();
