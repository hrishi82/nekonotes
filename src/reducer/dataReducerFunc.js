

export const dataReducerFunc = (state, action) => {
    switch(action.type){
        case "SET_ALL_NOTES":{
            return {...state, allNotes: action.payload}
        }
        case "SET_ALL_ARCHIVED_NOTES":{
            return {...state, archivedNotes: action.payload}
        }
        case "VIEW_INPUT_MODAL":{
            return {...state, displayInputModal: !state.displayInputModal}
        }
        case "TOGGLE_SIDEBAR":{
            return {...state, displaySidebar: !state.displaySidebar}
        }
        case "FILTER_BY_SORT":{
            if (action.payload === "SORT_BY_LATEST"){
                return {...state, filters:{...state.filters, sortBy: "SORT_BY_LATEST"}}
            }else if (action.payload === "SORT_BY_OLDEST"){
                return {...state, filters:{...state.filters, sortBy: "SORT_BY_OLDEST"}}
            }
            break
        }
        case "SET_DELETED_NOTES":{
            return {...state, deletedNotes: [...state.deletedNotes, action.payload]}
        }
        default: 
            return state
        
    }
}
