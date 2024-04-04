import { axiosInstace } from "../axios";
import useAuth from "./useAuth";

export default function useRefreshToken(){
    const [setAccessToken, setCsrfToken] = useAuth()

    const refresh = async()=>{
        const response = axiosInstace.post('auth/refresh-token')
        setAccessToken(response.data.access)
        setCsrfToken(response.data.headers['x-csrftoken'])

        
        return {accessToken: response.data.access, csrfToken: response.data.headers['x-csrftoken']}
    }
    return refresh

}