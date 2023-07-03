import React, { useContext } from 'react';
import DoctorList from '../DoctorList/DoctorList';
import LoginContext from '../../Context/Login/LoginContext';
import AdminDashboard from '../Admin/Dashboard/AdminDashboard';


const Home = (props) => {

    //debugger;
    const ctx = useContext(LoginContext);
    console.log(ctx.userData.post);
    const designation = (ctx.userData.post || '').toLowerCase().trim();

    if (designation === 'admin' || designation === 'zbm') {
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