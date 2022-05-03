

export const dataReducerFunc = (state, action) => {
    switch(action.type){
        case "SET_ALL_NOTES":{
            return {...state, allNotes: action.payload}
        }
        case "SET_ALL_ARCHIVED_NOTES":{
            return {...state, archivedNotes: action.payload}
        }
        default: 
            return state
        
    }
}
