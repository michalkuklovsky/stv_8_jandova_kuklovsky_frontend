import Cache from "./Cache";

export async function getData (url) {
    const response = await fetch(url, {
        method: 'GET',
    }).catch(() => { })

    if (response && response.ok) {
        const data = await response.json();
        await Cache.store(url, data);
        return data;
    }

    const data = await Cache.get(url);
    return data ? data : response;
}


export async function postData (netConnection, url, method, headerType, bodyData, offline) {
    const { addToQueue } = offline;
    const request = {
        method: method,
        headers: {'Content-Type': headerType},
        body: bodyData,
    }

    if (netConnection) {
        const response = await fetch(url, request).catch(() => {});
        if (response && response.ok) {
        }
    } else {
        let bodyParts = {};
        for (const part of bodyData.getParts()) {
            bodyParts[part.fieldName] = part.string;
        }
        request['body'] = bodyParts;
        await addToQueue(url, request);
        console.log("request queued");
    }
}


export async function deleteData (netConnection, url, method, offline) {
    const { addToQueue } = offline;
    const request = {
        method: method,
    }
    if (netConnection) {
        const response = await fetch(url, request).catch(() => {});
        if (response && response.ok) {
        }
    } else {
        await addToQueue(url, request);
        console.log("request queued");
    }
}
