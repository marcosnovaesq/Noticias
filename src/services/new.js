import clientHttp from '../config/clientHttp'

const createNew = (data, config = {}) => clientHttp.post(`/news`, data, config)
const updateNew = (id, data) => clientHttp.patch(`/news/${id}`, data)

export { createNew, updateNew }