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
