import clientHttp from '../config/clientHttp'


// CREATE
const signUp = (data) => clientHttp.post(`/user`, data)
const signIn = (data) => clientHttp.post(`/login`, data)


export {
    signUp,
    signIn
}