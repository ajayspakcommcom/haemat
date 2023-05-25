import React, { useEffect, useState } from 'react';
import LoginContext from '../Login/LoginContext';

const getUserData = () => {
    if (localStorage.getItem("userData") === null) {
        return {};
    } else {
        return JSON.parse(localStorage.getItem('userData'));
    }
};

const LoginContextProvider = (props) => {

    const [userData, setUserData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setUserData(getUserData());

        if (localStorage.getItem("userData") === null) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }

    }, [isLoggedIn]);

    const onLoginHandler = (obj) => {
        let logObj = { ...obj };
        localStorage.setItem("userData", JSON.stringify(logObj));
        setUserData(getUserData());
        setIsLoggedIn(true);
    };

    const onLogoutHandler = (obj) => {
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
    };


    return (
        <LoginContext.Provider value={{
            onLogin: onLoginHandler,
            onLogout: onLogoutHandler,
            userData: userData,
            isLogin: isLoggedIn
        }}>{props.children}</LoginContext.Provider>
    );
};

export default LoginContextProvider;