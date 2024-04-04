import { axiosPrivateInstace } from "../axios";
import useAuth from "./useAuth";


export default function useLogout() {
  
    const {setUser, setAccessToken, setCsrfToken} = useAuth()

    const logout = async ()=>{
        try {
            const response = await axiosPrivateInstace.post('auth/logut')

            setAccessToken()
            setUser()
            setCsrfToken()

        } catch (error) {
            console.log(error)
        }
    }

    return logout;

}
