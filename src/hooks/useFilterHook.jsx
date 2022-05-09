import {sortByFilter} from "../utils/utils"
import {useData} from "../context/dataContext"


export const useFilterHook = () =>{
    const {state}  = useData()
    let data = [...state.allNotes]
    data = sortByFilter(data, state)
    return { filteredData : data}
}
