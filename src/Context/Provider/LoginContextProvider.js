import React, { useEffect, useState } from 'react';
import LoginContext from '../Login/LoginContext';
import axios from "axios";
import configData from '../../Config/Config.json';
import { getUserData } from '../../Service/Common';

const LoginContextProvider = (props) => {

    const [userData, setUserData] = useState({});
    const [error, setError] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState({});

    useEffect(() => {
        setUserData(getUserData());

        if (localStorage.getItem("userData") === null) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }

    }, [isLoggedIn]);

    const onLoginHandler = (obj) => {

        let logObj = { Username: obj.email, Password: obj.password };


        axios.post(`${configData.SERVER_URL}/auth/loginsp`, logObj).then((resp) => {
            console.log(resp);
            if (!resp.data.HasError) {
                localStorage.setItem("userData", JSON.stringify(resp.data.Data));
                setUserData(getUserData());
                setIsLoggedIn(true);
            } else {
                setError({ msg: 'Invalid Username and Password' });
            }

        }).catch((err) => {
            console.log(err)
            setIsLoggedIn(false);
        });
    };

    const onLogoutHandler = (obj) => {
        localStorage.removeItem('userData');
        setIsLoggedIn('Invalid User name and password');
        setError({});
    };


    return (
        <LoginContext.Provider value={{
            onLogin: onLoginHandler,
            onLogout: onLogoutHandler,
            userData: userData,
            isLogin: isLoggedIn,
            error: error
        }}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;