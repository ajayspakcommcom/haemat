import React, { useContext } from 'react';
import DoctorList from '../DoctorList/DoctorList';
import LoginContext from '../../Context/Login/LoginContext';
import AdminDashboard from '../Admin/Dashboard/AdminDashboard';


const Home = (props) => {

    const ctx = useContext(LoginContext);
    const designation = (ctx.userData.post || '').toLowerCase();

    if (designation === 'admin') {
        return (
            <>
                <AdminDashboard />
            </>
        );
    } else {
        return (
            <>
                <DoctorList />
            </>
        );
    }
};

export default Home;