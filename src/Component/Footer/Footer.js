import React, { useEffect, useState } from 'react';
import './Footer.scss';
import { checkUrlAndRunCommand } from '../../Service/Common';

const Footer = (props) => {

    const [isDashboard, isDashboardSet] = useState(false);

    useEffect(() => {
        isDashboardSet(checkUrlAndRunCommand("http://localhost:3000/user-dashboard", 'user-dashboard'));
    }, []);

    return (
        <>
            <footer className={`${isDashboard && 'dashboard-footer'}`}>
                <p>Copyright @ {new Date().getFullYear()} Bharat Serums and Vaccines Limited <br /> Privacy Policy</p>
            </footer>
        </>
    );
};

export default Footer;