import axios from './customize-axios'

export const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

export const postCreateUser = (name, job) => {
    return axios.post('/api/users',{ name, job})
}


export const putUpdateUser = (id, name, job) => {
    return axios.put(`/api/users/${id}`,{ name, job})
}

export const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}