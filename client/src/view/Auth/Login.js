import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosInstace } from '../../axios'

export default function Login() {

    const {setAccessToken, setRefreshToken, setCsrfToken} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const fromLocation = location?.state?.from?.pathname || '/'  // Getting the indended location before login page if not, then the user will redirect to the home page

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    function onEmailChange(event){
        setEmail(event.target.value)
    }

    function onPasswordChange(event){
        setPassword(event.target.vale)
    }

    function onSubmitForm(event){
        event.preventDefault()

        setLoading(true)

        try {
            const response = await axiosInstace.post('auth/login', JSON.stringify({
                email,
                password
            }))
            setAccessToken(response?.data?.access_token)
            setCsrfToken(response.headers["x-csrftoken"])

            setEmail()
            setPassword()
            setLoading(false)
            navigate(fromLocation,{replace:true})

        } catch (error) {
            setLoading(false)
        }

    }

  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={onSubmitForm}>
            <input type='email' id='email' onChange={onEmailChange} />
            <input type='password' id='password' onChange={onPasswordChange} />
            <button disabled={loading} type='submit'>Login</button>
        </form>
    </div>
  )
}
