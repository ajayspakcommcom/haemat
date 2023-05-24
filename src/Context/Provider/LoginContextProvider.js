import React, { useEffect, useState } from 'react';
import LoginContext from '../Login/LoginContext';

const LoginContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    }, []);

    const onLoginHandler = (obj) => {
        setIsLoggedIn(true);
        //console.log('Login');
    };

    const onLogoutHandler = (obj) => {
        setIsLoggedIn(false);
        //console.log('Logout');
    };


    return (
        <LoginContext.Provider value={{ onLogin: onLoginHandler, onLogout: onLogoutHandler, isLogin: isLoggedIn }}>{props.children}</LoginContext.Provider>
    );
};

export default LoginContextProvider;