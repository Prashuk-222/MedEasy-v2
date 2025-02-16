import {createContext, useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import {toast} from 'react-toastify';

const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens').access) : null)
    let [loading, setLoading] = useState(true)
    let navigate = useNavigate();

    const port = '8000'
    const baseURL = `http://192.168.0.8:${port}`

    let registerUser = async (e) => {
        let response = await fetch(`${baseURL}/accounts/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'first_name': e.first_name,
                'email': e.email,
                'password': e.password,
                'password2': e.password2,
            })
        })
        await response.json()
        if (response.status === 201) {
            toast.success("Account has been created!", {
                position: toast.POSITION.TOP_RIGHT,
            })
            toast.warning("Please Login to your account", {
                position: toast.POSITION.TOP_RIGHT,
            })
            setTimeout(function () {
                navigate('/Signin')
            }, 6000);

        } else {
            toast.error('Something gone wrong', {
                position: toast.POSITION.TOP_CENTER,
            })
        }
    }


    let loginUser = async (e) => {
        let response = await fetch(`${baseURL}/accounts/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': e.email, 'password': e.password})
        })
        let data = await response.json()
        if (response.status === 200) {
            // setAuthTokens value and store it in state and in local storage
            setAuthTokens(data)

            // decode access token that store user information
            setUser(jwt_decode(data.access))

            // Set localstorage user's access token, whenever user comes back e.g. next day, still can be logged in
            localStorage.setItem('authTokens', JSON.stringify(data))
            toast.success("Hey 👋 you are logged in!", {
                position: toast.POSITION.TOP_RIGHT,
                containerId: 'loggedIn',
            })
        } else {
            toast.error(data['detail'], {
                position: "top-center",
                autoClose: 3000,
            });
        }
    }


    // let resetPasswordUser = async (e) => {
    //     let response = await fetch(`${baseURL}/account/reset/password/`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({'email': e.email})
    //     })
    //     if (response.status === 200) {
    //         toast.success("Please check your email", {
    //             position: toast.POSITION.TOP_RIGHT,
    //             containerId: 'loginPage',
    //         })
    //     }
    // }


    // let updateToken = async () => {
    //     let response = await fetch(`${baseURL}/accounts/token/refresh/`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({'refresh': authTokens?.refresh}) // if there's no authTokens, don't call refresh func
    //     })
    //     let data = await response.json()
    //     if (response.status === 200) {
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens', JSON.stringify(data))
    //     } else {
    //         toast.warning("Sorry you need to logged in again", {
    //             position: toast.POSITION.TOP_CENTER,
    //             containerId: 'loginPage',
    //         })
    //         logoutUser()
    //     }

    //     if (loading) {
    //         setLoading(false)
    //     }
    // }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        toast.warning("You are successfully logged out", {
            position: toast.POSITION.TOP_RIGHT,
            containerId: 'homePage',
        })
        navigate('/')
    }


    let contextData = {
        setUser: setUser,
        setAuthTokens: setAuthTokens,
        registerUser: registerUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        user: user,
        authTokens: authTokens,
        // resetPasswordUser: resetPasswordUser,
    }

    // useEffect(() => {

    //     if (loading && authTokens) {
    //         updateToken()
    //     } else {
    //         setLoading(false)
    //     }

    //     let fourMinutes = 1000 * 60 * 4
    //     let interval = setInterval(() => {
    //         if (authTokens) {
    //             updateToken()
    //         }
    //     }, fourMinutes)
    //     return () => clearInterval(interval)

    // }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}