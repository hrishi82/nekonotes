import { useContext, createContext } from "react";
import { useEffect, useState } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>{

    const getLocalstorageData = JSON.parse(localStorage?.getItem("login"))
    const [token, setToken] = useState(getLocalstorageData?.token)
    const [user, setUser] = useState(getLocalstorageData?.user)

    useEffect(() => {
        const fetchToken = JSON.parse(localStorage.getItem("login"));
        if (fetchToken) {
          setToken(fetchToken.tokens);
        }
      }, [token]);

    return (
        <AuthContext.Provider value={{token, setToken, user, setUser}}>
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
