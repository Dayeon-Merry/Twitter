// network와 연결해주는 class
export default class HttpClient {
    constructor(baseURL){
        this.baseURL = baseURL;
    }

    async fetch(url, options) {
        const res = await fetch(`${this.baseURL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        let data;
        try {
            data = await res.json();
        }catch (error) {
            console.error(error)
        }
        if(res.status >299 || res.status < 200) {
            const message = data && data.message ? data.message:'문제가 발생하였습니다!🤔';
            throw new Error(message);
        }
        return data;
    }
}