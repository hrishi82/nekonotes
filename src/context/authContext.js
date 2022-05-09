import { useContext, createContext } from "react";
import { useEffect, useState } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>{

  const localStorageToken = JSON.parse(localStorage.getItem('login'));
  const [token, setToken] = useState(localStorageToken?.token);
  const localStorageUser = JSON.parse(localStorage.getItem('login'));
  const [user, setUser] = useState(localStorageUser?.user);


    return (
        <AuthContext.Provider value={{token, setToken, user, setUser}}>
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
