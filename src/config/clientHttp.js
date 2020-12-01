import axios from 'axios'
import { getToken, removeToken } from './auth';
import history from './history'
const localURLAPI = 'http://localhost:3003'
const prodURLAPI = 'https://gentle-hamlet-30049.herokuapp.com/'

const clientHttp = axios.create({
    baseURL: process.env.REACT_APP_API || prodURLAPI
})

clientHttp.defaults.headers['Content-type'] = 'application/json'

if (getToken()) {
    clientHttp.defaults.headers["x-auth-token"] = getToken();
}


clientHttp.interceptors.response.use(
    response => response,
    error => {

        // const status = error.response.status
        const { response: { status } } = error

        if (error.message === 'Network Error' && !error.message) {
            alert('você está sem internet...reconecte !!!!!')
        }

        switch (status) {
            case 401:
                console.log('Token inválido...')
                removeToken()
                history.push('/')
                break;
            default:
                console.log(status, `aconteceu um erro ${status}`)
                break;
        }

        // axios.interceptors.response.eject(interceptors) // global
        return Promise.reject(error)
    }
)

export default clientHttp