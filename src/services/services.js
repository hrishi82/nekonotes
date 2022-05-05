import axios from "axios"


export const loginServiceHandler = async ({email, password}) =>{
    return axios.post('/api/auth/login', {email, password})
}


export const getNotesServiceHandler = async ({encodedToken}) =>{
    return axios.get("/api/notes", {
        headers: {authorization: encodedToken}
    })
}

export const getArchivedNotesServiceHandler = async ({encodedToken}) =>{
    return axios.get("/api/archives", {
        headers: {authorization: encodedToken}
    })
}

export const postNoteServiceHandler =  async ({encodedToken, note}) =>{
    return axios.post("/api/notes", 
    {note},
    {
        headers: {authorization: encodedToken},
    })
}


export const postEditedNoteServiceHandler = async ({encodedToken, note, id}) =>{
    return axios.post(`/api/notes/${id}`, 
    {note},
    {
        headers: {authorization: encodedToken},
    })
}

export const deleteNoteServiceHandler = async ({encodedToken, note, id}) =>{
    return axios.delete(`/api/notes/${id}`,
    {
        headers: {authorization: encodedToken},
    })
}
export const postNotesToArchiveServiceHandler = async ({encodedToken, note, id}) =>{
    return axios.post(`/api/notes/archives/${id}`, 
    {note},
    {
        headers: {authorization: encodedToken},
    })
}

export const restoreNotesFromArchiveServiceHandler = async ({encodedToken, note, id}) =>{
    return axios.post(`/api/archives/restore/${id}`, 
    {note},
    {
        headers: {authorization: encodedToken},
    })
}

export const deleteNotesFromArchiveServiceHandler = async ({encodedToken, note, id}) =>{
    return axios.delete(`/api/archives/delete/${id}`,
    {
        headers: {authorization: encodedToken},
    })
}


