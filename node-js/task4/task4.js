
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

    const sum1 = [0]; // sum of all elements
    const sum2 = [0]; // sum of all elements at even index - sum of all elements at odd index

    // Calculate sum1 and sum2 from 0 to i for each i
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
            // if type is 1, calculate sum1 of the range and push to result
            result.push(sum1[query[i].range[1] + 1] - sum1[query[i].range[0]]);
        } else {
            // if type is 2, calculate sum2 of the range and push to result
            if (query[i].range[0] % 2 == 0) {

                result.push(sum2[query[i].range[1] + 1] - sum2[query[i].range[0]]);
            } else {
                // if the first index of the range is odd, the result will be negative
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
