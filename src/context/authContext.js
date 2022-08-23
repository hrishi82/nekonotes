import { useContext, createContext } from "react";
import { useEffect, useState } from "react";
import {signupServiceHandler} from "../services/services"

const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>{

  const localStorageToken = JSON.parse(localStorage.getItem('login'));
  const [token, setToken] = useState(localStorageToken?.token);
  const localStorageUser = JSON.parse(localStorage.getItem('login'));
  const [user, setUser] = useState(localStorageUser?.user);

  useEffect(() => {
    const fetchToken = JSON.parse(localStorage.getItem("login"));
    if (fetchToken) {
      setToken(fetchToken.tokens);
    }
  }, []);

  const signupUser = async (email, password, name) => {
    try {
      const resp = await signupServiceHandler({ email, password, name });
      if (resp.status === 201) {
        localStorage.setItem(
          'login',
          JSON.stringify({
            token: resp.data.encodedToken,
            user: resp.data.createdUser,
          })
        );
        setUser(resp.data.createdUser);
        setToken(resp.data.encodedToken);
      }
    } catch (err) {
      console.log(err);
    }
  };

    return (
        <AuthContext.Provider value={{token, setToken, user, setUser, signupUser}}>
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
