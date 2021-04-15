const get = async (url) => {
    try {
        const requestOptions = {
            method: "GET"
        };
        const response = await fetch(url, requestOptions);
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

const post = async (url, data) => {
    try {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
            credentials: "include"
        };
        const response = await fetch(url, requestOptions);
        return response.json();

    } catch (error) {
        console.log(error);
    }
}

const put = async (url, data) => {
    try {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
            credentials: "include"
        };
        const response = await fetch(url, requestOptions);
        return response.json();

    } catch (error) {
        console.log(error);
    }
}

const patch = async (url) => {
    try {
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        };
        const response = await fetch(url, requestOptions);
        return response.json();

    } catch (error) {
        console.log(error);
    }
}

const _delete = async (url) => {
    try {
        const requestOptions = {
            method: "DELETE"
        };
        return await fetch(url, requestOptions);

    } catch (error) {
        console.log(error);
    }
}

export default {
    get,
    post,
    put,
    patch,
    _delete,
}