import React, { useRef, useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './AdminDashboard.css';
import { Button } from 'primereact/button';
import Loader from '../../../Component/Loader/Loader';
import axios from "axios";
import configData from '../../../Config/Config.json';
import { groupByKey, getIndicationText } from '../../../Service/Common';
import DoctorDetail from './DoctorDetail';
import { Calendar } from 'primereact/calendar';
import Layout from '../../../Component/UI/Layout';
import DrPatientProgressColumnChart from '../../../Component/Dr-Patient-Progress-Column-Chart/ColumnChart';
import DrPatientMonthColumnChart from '../../../Component/Dr-Patient-Month-Column-Chart/ColumnChart';
import LineChart from '../../../Component/Pap-Line-Chart/LineChart';
import PieChart from '../../../Component/Zone-Wise-Pie-Chart/PieChart';


const UserDashboard = () => {

    useEffect(() => {
        console.log('Ram');
    }, []);


    return (
        <>
            <div className="p-3">
                <div className="grid">
                    <div className="col-6">
                        <DrPatientProgressColumnChart />
                    </div>
                    <div className="col-6">
                        <LineChart />
                    </div>
                </div>
            </div>

            <div className="p-3">
                <div className="grid">
                    <div className="col-6">
                        <DrPatientMonthColumnChart />
                    </div>
                    <div className="col-6">
                        <PieChart />
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserDashboard;