import React, { useRef, useState, useEffect } from 'react';
import './AdminDashboard.css';
import DrPatientProgressColumnChart from '../../../Component/Dr-Patient-Progress-Column-Chart/ColumnChart';
import DrPatientMonthColumnChart from '../../../Component/Dr-Patient-Month-Column-Chart/ColumnChart';
import LineChart from '../../../Component/Pap-Line-Chart/LineChart';
import PieChart from '../../../Component/Zone-Wise-Pie-Chart/PieChart';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Calendar } from 'primereact/calendar';
import { groupByKey, getIndicationText, formatDate } from '../../../Service/Common';
import axios from "axios";
import configData from '../../../Config/Config.json';
import { Button } from 'primereact/button';
import ZonePerformanceByKam from '../../../Component/ZonePerformanceByKam/ZonePerformanceByKam';



const UserDashboard = () => {

    const exportPDF = () => {
        html2canvas(document.body).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: "portrait" });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, -20, pdfWidth, pdfHeight);
            pdf.save("download.pdf");
        });
    }

    useEffect(() => {

    }, []);


    const filterUrl = `${configData.SERVER_URL}/home/KamAdminReport`;
    const tdrFilterUrl = `${configData.SERVER_URL}/home/KamMedicineTDR`;

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onFilterHandler = async (e) => {
        e.preventDefault();

        const empId = JSON.parse(localStorage.getItem('userData'))?.EmpID;
        const paramObj = {
            empID: empId,
            Startdate: formatDate(startDate),
            Enddate: formatDate(endDate),
        };

        const summaryResp = await axios.post(filterUrl, paramObj);
        const tdrResp = await axios.post(tdrFilterUrl, paramObj);
    }


    return (
        <>
            <div className='user-dashboard-wrapper'>
                <div className='filter-header'>
                    <div>
                        <Calendar value={startDate} onChange={(e) => setStartDate(e.value)} placeholder='From' />
                        <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} placeholder='To' />
                        <Button label="Filter" onClick={onFilterHandler} />
                    </div>
                    <img src={process.env.PUBLIC_URL + '/img/pdf.png'} alt="React Logo" onClick={exportPDF} />
                </div>

                <div className="p-3 pb-4">
                    <div className='admin-header-wrapper'>
                        <h1>Zone Wise</h1>
                    </div>
                    <div className="grid">
                        <ZonePerformanceByKam
                            zoneName="North"
                            performer="Manish"
                            numOfPatients={98}
                            brand="Thymogam"
                            pap={23}
                        />

                        <ZonePerformanceByKam
                            zoneName="East"
                            performer="Manish"
                            numOfPatients={75}
                            brand="Thymogam"
                            pap={21}
                        />

                        <ZonePerformanceByKam
                            zoneName="South"
                            performer="Sanjay Dubey"
                            numOfPatients={58}
                            brand="Thymogam"
                            pap={18}
                        />

                        <ZonePerformanceByKam
                            zoneName="West"
                            performer="Sanjay Dubey"
                            numOfPatients={45}
                            brand="Thymogam"
                            pap={15}
                        />
                    </div>
                </div>

                <div className="p-3 pb-4">
                    <div className='admin-header-wrapper'>
                        <h1>Best Product</h1>
                    </div>
                    <div className="grid">
                        <ZonePerformanceByKam
                            zoneName="North"
                            performer="Manish"
                            numOfPatients={98}
                            brand="Thymogam"
                            pap={23}
                        />

                        <ZonePerformanceByKam
                            zoneName="East"
                            performer="Manish"
                            numOfPatients={75}
                            brand="Thymogam"
                            pap={21}
                        />

                        <ZonePerformanceByKam
                            zoneName="South"
                            performer="Sanjay Dubey"
                            numOfPatients={58}
                            brand="Thymogam"
                            pap={18}
                        />

                        <ZonePerformanceByKam
                            zoneName="West"
                            performer="Sanjay Dubey"
                            numOfPatients={45}
                            brand="Thymogam"
                            pap={15}
                        />
                    </div>
                </div>

                <div className="p-3 pb-0">
                    <div className="grid">
                        <div className="col-6">
                            <DrPatientProgressColumnChart />
                        </div>
                        <div className="col-6">
                            <LineChart />
                        </div>
                        <div className="col-6">
                            <DrPatientMonthColumnChart />
                        </div>
                        <div className="col-6">
                            <PieChart />
                        </div>
                    </div>
                </div>




            </div>
        </>
    )
};

export default UserDashboard;