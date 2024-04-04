import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstace } from '../../axios'

export default function Register() {
    
    const navigate = useNavigate()

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwrod2, setPassword2] = useState()
    const [loading, setLoading] = useState(false)

    function onEmailChange(event){
        setEmail(event.target.value)
    }

    function onPasswordChange(event){
        setPassword(event.target.vale)
    }

    function onUsernameChange(event){
        setUsername(event.target.value)
    }

    function onCPasswordChange(event){
        setPassword2(event.target.vale)
    }

    function onSubmitForm(event){
        event.preventDefault()

        setLoading(true)

        try {
            const response = await axiosInstace.post('auth/register', JSON.stringify({
                username,
                email,
                password,
                passwrod2
            }))

            setUsername()
            setEmail()
            setPassword()
            setPassword2()
            setLoading(false)
            navigate('/auth/registration')

        } catch (error) {
            setLoading(false)
        }

    }

  return (
    <div>
        <h2>Register</h2>
        <form onSubmit={onSubmitForm}>
            <input type='text' id='username' onChange={onUsernameChange} />
            <input type='email' id='email' onChange={onEmailChange} />
            <input type='password' id='password' onChange={onPasswordChange} />
            <input type='password' id='password' onChange={onCPasswordChange} />
            <button disabled={loading} type='submit'>Login</button>
        </form>
    </div>
  )
}
