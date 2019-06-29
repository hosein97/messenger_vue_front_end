import axios from 'axios'

export const http = createAxios()

function createAxios() {
    var http = axios.create({
        baseURL: 'http://localhost:8000',
    })
    return http
}