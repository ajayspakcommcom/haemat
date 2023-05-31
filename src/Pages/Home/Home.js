import React, { useEffect, useState } from 'react';
import axios from "axios";
import DoctorList from '../DoctorList/DoctorList';


const Home = (props) => {

    const [person, setPerson] = useState([]);

    useEffect(() => {
        // axios.get('http://3.7.254.233:3333/person-list').then(resp => {
        //     setPerson((prevState) => {
        //         return resp.data.flat();
        //     });
        // });
    }, []);

    return (
        <>
            <DoctorList />
        </>
    );
};

export default Home;