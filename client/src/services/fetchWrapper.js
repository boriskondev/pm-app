const get = async (url) => {
    const requestOptions = {
        method: "GET"
    };

    return fetch(url, requestOptions)
        .then(res => res.json())
        .catch(error => console.log(error));
}

const post = async (url, data) => {
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
        credentials: "include"
    };

    return fetch(url, requestOptions)
        .then(res => res.json())
        .catch(error => console.log("In fetch" + error));
}

const put = async (url, data) => {
    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
        credentials: "include"
    };

    return fetch(url, requestOptions)
        .then(res => res.json())
        .catch(error => console.log(error));
}

const patch = async (url, data) => {
    const requestOptions = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
        credentials: "include"
    };

    return fetch(url, requestOptions)
        .then(res => res.json())
        .catch(error => console.log(error));
}

const _delete = async (url) => {
    const requestOptions = {
        method: "DELETE"
    };

    return fetch(url, requestOptions)
        .then(res => res.json())
        .catch(error => console.log(error));
}

export default {
    get,
    post,
    put,
    patch,
    _delete,
}