import React, { createContext } from 'react';

const LoginContext = createContext({
    onLogin: (obj) => { },
    onLogout: (obj) => { },
    isLogin: false
});

export default LoginContext;