import inMemoryJwt from './inMemoryJwtService';

const formRequestData = (method, addAuthorization, credentials, data) => {
    let requestData = {
        headers: {}
    };
    requestData.method = method;
    
    if (addAuthorization) {
        requestData.headers['Authorization'] = `JWT ${inMemoryJwt.getToken()}`;
    }

    if (credentials) {
        requestData.credentials = credentials;
    }

    if (data) {
        requestData.headers['Content-Type'] = 'application/json';
        requestData.body = JSON.stringify(data);
    }

    return requestData;
};

const ajaxCall = async (url, data) => {
    const response = await fetch(url, data);

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    return response.json();
};

export {
    formRequestData,
    ajaxCall
};
