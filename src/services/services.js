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


