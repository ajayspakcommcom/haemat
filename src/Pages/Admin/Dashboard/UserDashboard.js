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

                <div className="p-3 pb-0">
                    <div className="grid">
                        <div className="col-3">
                            <div className='top-performer-wrapper north'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th><b>Zone</b></th>
                                            <th>North</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Kam</td>
                                            <td>Manish</td>
                                        </tr>
                                        <tr>
                                            <td>No Of Patients</td>
                                            <td>98</td>
                                        </tr>
                                        <tr>
                                            <td>Brand</td>
                                            <td>Thymogam</td>
                                        </tr>
                                        <tr>
                                            <td>Pap</td>
                                            <td>23</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className='top-performer-wrapper east'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th><b>Zone</b></th>
                                            <th>East</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Kam</td>
                                            <td>Manish</td>
                                        </tr>
                                        <tr>
                                            <td>No Of Patients</td>
                                            <td>98</td>
                                        </tr>
                                        <tr>
                                            <td>Brand</td>
                                            <td>Thymogam</td>
                                        </tr>
                                        <tr>
                                            <td>Pap</td>
                                            <td>23</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className='top-performer-wrapper south'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th><b>Zone</b></th>
                                            <th>South</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Kam</td>
                                            <td>Manish</td>
                                        </tr>
                                        <tr>
                                            <td>No Of Patients</td>
                                            <td>98</td>
                                        </tr>
                                        <tr>
                                            <td>Brand</td>
                                            <td>Thymogam</td>
                                        </tr>
                                        <tr>
                                            <td>Pap</td>
                                            <td>23</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className='top-performer-wrapper west'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th><b>Zone</b></th>
                                            <th>west</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Kam</td>
                                            <td>Manish</td>
                                        </tr>
                                        <tr>
                                            <td>No Of Patients</td>
                                            <td>98</td>
                                        </tr>
                                        <tr>
                                            <td>Brand</td>
                                            <td>Thymogam</td>
                                        </tr>
                                        <tr>
                                            <td>Pap</td>
                                            <td>23</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
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