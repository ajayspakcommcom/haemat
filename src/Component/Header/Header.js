import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import LoginContext from "../../Context/Login/LoginContext";

const Header = (props) => {

    const ctx = useContext(LoginContext);

    const navigate = useNavigate();

    const items = [
        //{ label: 'Home', command: () => { navigate('/') } },
    ];

    const logoutMe = () => {
        ctx.onLogout();
    };

    const start = <Link to="/"><img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2" /></Link>;
    const end = <Link to="/"><span onClick={logoutMe}>Logout</span></Link>;

    return (
        <>
            <div className="card">
                <Menubar model={items} start={start} end={end} />
            </div>
        </>
    );
};

export default Header;