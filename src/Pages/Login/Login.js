import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import LoginContext from '../../Context/Login/LoginContext';

import './Login.css';

const Login = () => {

    const ctx = useContext(LoginContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const loginHandler = (e) => {
        e.preventDefault();
        ctx.onLogin(true);
        console.log(ctx.isLogin);
    };

    return (
        <>
            <section className="login-wrapper">
                <section>
                    <form onSubmit={loginHandler}>
                        <h1>Login</h1>
                        {/* {ctx.isLogin && <span>Login</span>}
                        {!ctx.isLogin && <span>Logout</span>} */}
                        <div className="inputbox">
                            <input type="email" placeholder='Email' id='txtEmail' onChange={emailChangeHandler} />
                        </div>
                        <div className="inputbox">
                            <input type="password" placeholder='Password' id='txtPwd' onChange={passwordChangeHandler} />
                        </div>
                        <button type='submit'>Log in</button>
                        <div className="forget">
                            <Link to="/forgot-password">Forgot Password</Link>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
};

export default Login;