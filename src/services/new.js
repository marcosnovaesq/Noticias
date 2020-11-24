import clientHttp from '../config/clientHttp'

const createNew = (data, config = {}) => clientHttp.post(`/news`, data, config)
const updateNew = (id, data) => clientHttp.patch(`/news/${id}`, data)
const getAllNews = () => clientHttp.get('/news/')
const getNewsFromReporter = (id) => clientHttp.get(`/news/reporter/${id}`)
const getNewById = (id) => clientHttp.get(`/news/${id}`)
const toggleActivation = (id) => clientHttp.patch(`/news/validate/${id}`)
const toggleHighlight = (id) => clientHttp.patch(`/news/highlight/${id}`)
const deleteNew = (id) => clientHttp.delete(`/news/${id}`)


export { createNew, updateNew, getAllNews, getNewsFromReporter, getNewById, toggleActivation, toggleHighlight, deleteNew }