import axios from "axios"


export const loginServiceHandler = async ({email, password}) =>{
    return axios.post('/api/auth/login', {email, password})
}

export const signupServiceHandler = async ({ email, password, name }) =>
  await axios.post(`/api/auth/signup`, {
    email,
    password,
    name,
  });



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



export const getTrashServiceHandler = async ({encodedToken}) =>{
    return axios.get("/api/trash", {
        headers: {authorization: encodedToken}
    })
}

export const postTrashedNoteServiceHandler = async ({encodedToken, id, note}) =>{
    return axios.post(`/api/notes/trash/${id}`, 
    {note},
    {
        headers: {authorization: encodedToken},
    })
}

export const restoreTrashedNoteServiceHandler = async ({encodedToken, id}) =>{
    return axios.post(`/api/trash/restore/${id}`, 
    {},
    {
        headers: {authorization: encodedToken},
    })
}

export const deleteTrashedNoteServiceHandler = async ({encodedToken, id}) =>{
    return axios.delete(`/api/trash/delete/${id}`, 
    {
        headers: {authorization: encodedToken},
    })
}
