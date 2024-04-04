import { useEffect } from "react";
import { axiosPrivateInstace } from "../axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

export default function useAxiosPrivate(){

    const { accessToken, setAccessToken, csrfToken, user } = useAuth()

    // user refresh token in interceptor
    const refresh = useRefreshToken()

    useEffect(()=>{

        // intercept perform necessary operations before and after request and response

        const requestIntercept = axiosPrivateInstace.interceptors.request.use([
            (config)=>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    config.headers['X-CSRFToken'] = csrfToken
                }
            },
            (error)=>{ Promise.reject(error) }
        ])

        const responseIntercept = axiosPrivateInstace.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config

                // Check if request already been sent and response status is 401 or 403

                if (!prevRequest?.sent && (error?.response?.status === 401 || error?.response?.status === 403 )){
                    prevRequest.sent = true
                    //set new token

                    const {accessToken: newAccessToken, csrfToken: newCSRFToken} = await refresh()  // get new token from refresh token endpoint
                    setAccessToken(newAccessToken)
                    prevRequest.headers['Authorizations'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['X-CSRFToken'] = newCSRFToken

                    return axiosPrivateInstace(prevRequest)

                }
                return Promise.reject(error)
            }
        )

        // cleanup

        return ()=>{
            axiosPrivateInstace.interceptors.request.eject(requestIntercept)
            axiosPrivateInstace.interceptors.response.eject(responseIntercept)
        }
    },[accessToken, user])




    return ()=>{
        axiosPrivateInstace
    } 
        
}