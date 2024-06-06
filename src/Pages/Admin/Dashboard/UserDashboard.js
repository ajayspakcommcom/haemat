import React, { useRef, useState, useEffect } from 'react';
import './AdminDashboard.css';
import DrPatientProgressColumnChart from '../../../Component/Dr-Patient-Progress-Column-Chart/ColumnChart';
import DrPatientMonthColumnChart from '../../../Component/Dr-Patient-Month-Column-Chart/ColumnChart';
import LineChart from '../../../Component/Pap-Line-Chart/LineChart';
import PieChart from '../../../Component/Zone-Wise-Pie-Chart/PieChart';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';



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


    return (
        <>
            <div className='user-dashboard-wrapper'>
                <div className='pdf-report'>
                    <img src={process.env.PUBLIC_URL + '/img/pdf.png'} alt="React Logo" onClick={exportPDF} />
                </div>
                <div className="p-3">
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