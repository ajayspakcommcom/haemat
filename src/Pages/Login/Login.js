import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import LoginContext from '../../Context/Login/LoginContext';
import './Login.css';
import { validateEmail } from '../../Service/Common';
import Loader from '../../Component/Loader/Loader';

const Login = () => {

    const ctx = useContext(LoginContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);

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
        setIsBtnDisabled(true);
        setIsLoaderVisible(true);
    };

    useEffect(() => {
        if (ctx.error) {
            setIsBtnDisabled(false);
            setIsLoaderVisible(false);
        } else {
            setIsBtnDisabled(true);
            setIsLoaderVisible(false);
        }
    }, [ctx.error]);

    return (
        <>
            {isLoaderVisible && <Loader />}
            <section className="login-wrapper">
                <section>
                    <form onSubmit={loginHandler}>
                        <h1>Login</h1>
                        {ctx.error && <p className='login-error'>{ctx.error.msg}</p>}
                        <div className="inputbox">
                            <input type="email" placeholder='Email' id='txtEmail' onChange={emailChangeHandler} />
                        </div>
                        <div className="inputbox">
                            <input type="password" placeholder='Password' id='txtPwd' onChange={passwordChangeHandler} />
                        </div>
                        <button type='submit' className='button' disabled={isBtnDisabled}>Log in</button>
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