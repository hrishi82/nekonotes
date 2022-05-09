import {createContext, useContext, useEffect, useState, useReducer} from "react"
import {dataReducerFunc} from "../reducer/dataReducerFunc"

const DataContext = createContext()

const DataProvider = ({children}) =>{

    const initialFormData = {
        _id: "",
        title: "",
        content: "",
        label: "",
        color: "#1F1F1F",
        pinned: false,
        archived: false,
        createdOn: new Date().getTime()
      }
    const [formData, setFormData] = useState(initialFormData)

    const initialVal = {
            allNotes:[],
            archivedNotes: [],
            labels: [],
            deletedNotes: [],
            displayInputModal: false,
            displaySidebar: false,
            filters: {
                sortBy: ""
            }
        }

    const [state, dispatch] = useReducer(dataReducerFunc, initialVal)

    return (
        <DataContext.Provider value={{state, dispatch, formData, setFormData, initialFormData}}>
            {children}
        </DataContext.Provider>
    )
}

const useData = () => useContext(DataContext)

export {DataProvider, useData}
