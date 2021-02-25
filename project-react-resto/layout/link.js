const url = "http://localhost:8000/api";
let token = "paA9eqZlrkGZV9vWINDHvFxqww3fhcClTAgAPG7O";

export const link = axios.create({
    baseURL: url,
    headers: {
        'api_token': token
    }
});