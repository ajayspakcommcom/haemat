import React, { useContext } from 'react';
import DoctorList from '../DoctorList/DoctorList';
import LoginContext from '../../Context/Login/LoginContext';
import AdminLatestDashboard from '../Admin/Dashboard/AdminLatestDashboard';


const Home = (props) => {

    const ctx = useContext(LoginContext);

    console.log(ctx.userData.Designation);

    const designation = (ctx.userData.Designation || '').toLowerCase().trim();

    if (designation === 'admin' || designation === 'zbm') {
        return (
            <>
                {/* <AdminDashboard /> */}
                <AdminLatestDashboard />
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