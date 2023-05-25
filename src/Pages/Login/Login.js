import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import LoginContext from '../../Context/Login/LoginContext';
import './Login.css';
import { validateEmail } from '../../Service/Common';

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

        if (email.length === 0) {
            alert('Please Enter Email');
            return false;
        }

        if (!validateEmail(email)) {
            alert('Please Enter valid Email Address');
            return false;
        }

        if (password.length === 0) {
            alert('Please Enter Your Password');
            return false;
        }

        ctx.onLogin({ email: email, password: password });
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