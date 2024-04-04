import { useState, createContext } from 'react';

export const AuthContext = createContext({
    user:{},
    setUser: ()=>{},
    accessToken: null,
    refreshToken: null,
    csrfToken: null,
    setAccessToken: ()=>{},
    setRefreshToken: ()=>{},
    setCsrfToken: ()=>{},
})

export function AuthContextProvider(props){

    const [user, setUser] = useState({})    
    const [accessToken, setAccessToken] = useState()    
    const [refreshToken, setRefreshToken] = useState()   
    const [csrfToken, setCsrfToken] = useState()   

    return <AuthContext.Provider value={{
        user, setUser,
        accessToken, setAccessToken,
        refreshToken, setRefreshToken,
        csrfToken, setCsrfToken,
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext