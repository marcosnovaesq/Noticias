import clientHttp from '../config/clientHttp'


// CREATE
const signUp = (data) => clientHttp.post(`/user`, data)
const signIn = (data) => clientHttp.post(`/login`, data)


const getAll = () => clientHttp.get(`/user/`)
const getAllReporteres = () => clientHttp.get(`/user/all/reporters`)

const deleteUser = (id) => clientHttp.delete(`/user/${id}`)

const createSpecialUser = (data) => clientHttp.post('user/new-user', data)
const updateUser = (id, data) => clientHttp.patch(`/user/${id}`, data)

const getUserById = (id) => clientHttp.get(`/user/${id}`)

export {
    signUp,
    signIn,
    getAll,
    getAllReporteres,
    getUserById,
    deleteUser,
    createSpecialUser,
    updateUser
}