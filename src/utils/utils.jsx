
import {useData} from "../context/dataContext"

export const sortByFilter = (data, state) => {
    let prodData  = [...data]
    if (prodData.length !== 0){
        if (state.filters.sortBy === "SORT_BY_OLDEST"){
            return [...prodData].sort((a,b)=> a.createdOn - b.createdOn)
        }else if (state.filters.sortBy === "SORT_BY_LATEST"){
            return [...prodData].sort((a,b)=> b.createdOn - a.createdOn)
        }
    }
    return prodData
}
