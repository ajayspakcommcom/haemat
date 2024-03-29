import React, { useRef, useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './AdminDashboard.css';
import { Button } from 'primereact/button';
import Loader from '../../../Component/Loader/Loader';
import axios from "axios";
import configData from '../../../Config/Config.json';
import { groupByKey, getIndicationText, formatDate } from '../../../Service/Common';
import DoctorDetail from './DoctorDetail';
import { Calendar } from 'primereact/calendar';


const AdminLatestDashboard = () => {

    const dt = useRef(null);
    const [summaryData, setSummaryData] = useState([]);
    const [tdrData, setTdrData] = useState([]);

    const [isLoaderVisible, setIsLoaderVisible] = useState(true);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const url = `${configData.SERVER_URL}/home/KamAdminReport`;
    const tdrUrl = `${configData.SERVER_URL}/home/KamMedicineTDR`;

    const filterUrl = `${configData.SERVER_URL}/home/KamAdminReport`;
    const tdrFilterUrl = `${configData.SERVER_URL}/home/KamMedicineTDR`;

    useEffect(() => {

        const loadSummaryData = async () => {
            const resp = await axios.post(url);
            //const respData = resp.data[0];
            const respData = resp.data.Data;
            setSummaryData(respData);
            console.log(respData);
        };

        const loadTdrData = async () => {
            const resp = await axios.post(tdrUrl);
            console.log(resp.data.Data);
            const respData = resp.data.Data;
            setTdrData(respData);
        };

        loadSummaryData();
        loadTdrData();
    }, []);

    const onFilterHandler = async (e) => {
        e.preventDefault();

        const empId = JSON.parse(localStorage.getItem('userData'))?.EmpID;

        const paramObj = {
            empID: empId,
            // Startdate: new Date(startDate).toISOString().split('T')[0],
            // Enddate: new Date(endDate).toISOString().split('T')[0],

            Startdate: formatDate(startDate),
            Enddate: formatDate(endDate),
        };

        console.log(paramObj);

        const summaryResp = await axios.post(filterUrl, paramObj);
        console.log(summaryData);
        setSummaryData(summaryResp.data.Data);

        const tdrResp = await axios.post(tdrFilterUrl, paramObj);
        setTdrData(tdrResp.data.Data);
    }

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {

            const newData = [...summaryData];

            console.log(newData);

            const newFilteredData = newData.map((item) => {

                return {
                    "ZoneName": item.ZoneName,
                    "EmployeeName": item.EmployeeName,
                    "OrderDate": new Date(item.OrderDate).toLocaleDateString('en-GB'),
                    "DoctorsName": item.DoctorsName,
                    "Speciality": item.Speciality,
                    "HospitalName": item.HospitalName,
                    "Indication": item.Indication ? getIndicationText(item.Indication) : 0,

                    "Thymogam NoOfPatients": item.medID === 37 ? parseInt(item.NoOfPatients) : 0,
                    "Revugam NoOfPatients": (item.medID === 36 || item.medID === 38) ? parseInt(item.NoOfPatients) : 0,
                    "Oncyclo NoOfPatients": item.medID === 35 ? parseInt(item.NoOfPatients) : 0,

                    "ThymogamVials": item.medID === 37 ? parseInt(item.NoOfVials) : 0,
                    "RevugamStrips": (item.medID === 36 || item.medID === 38) ? parseInt(item.strips) : 0,
                    "OncycloStrips": item.medID === 35 ? parseInt(item.strips) : 0,

                    "ThymogamPap": item.medID === 37 ? parseInt(item.PapValue) : 0,
                    "RevugamPap": (item.medID === 36 || item.medID === 38) ? parseInt(item.PapValue) : 0,
                    "OncycloPap": item.medID === 35 ? parseInt(item.PapValue) : 0,
                }
            });


            newFilteredData.sort(function (a, b) {
                return new Date(b.OrderDate) - new Date(a.OrderDate);
            });

            const worksheet = xlsx.utils.json_to_sheet(newFilteredData.reverse());
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });
            saveAsExcelFile(excelBuffer, 'adminReport');

        });
    };

    const exportExcelTdr = () => {


        const exportTdrData = tdrData;

        exportTdrData.map((item) => {
            delete item.EmpID;
            delete item.DoctorsID;
            delete item.IsTDR;
            delete item.EntryCount;
            item.Orderdate = item.Orderdate ? new Date(item.Orderdate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : item.Orderdate;
            return item;
        });

        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(exportTdrData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });
            saveAsExcelFile(excelBuffer, 'tdrReport');
        });
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Dr Report</span>
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded data-pr-tooltip="XLS" onClick={exportExcel} />
        </div>
    );

    const dateBodyTamplate = (rowData) => {
        return (
            <>
                {rowData && new Date(rowData.OrderDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </>
        );
    };

    const tdrDateBodyTamplate = (rowData) => {
        return (
            <>
                {rowData && new Date(rowData.Orderdate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </>
        );
    };

    const cityBodyTamplate = (rowData) => {
        return (
            <>
                <span>{rowData.hospitalCity && rowData.hospitalCity.length > 0 ? rowData.hospitalCity : '-NA-'}</span>
            </>
        );
    };

    const indicationBodyTamplate = (rowData) => {
        return (
            <>
                {/* {rowData.Indication ? getIndicationText(rowData.Indication) : '-NA-'} */}
                {getIndicationText(rowData.Indication)}
            </>
        );
    };


    const patientBodyTemplate = (rowData) => {

        console.log(rowData);

        return (
            <>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Oncyclo</th>
                            <th>Revugam</th>
                            <th>Thymogam</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* <tr>
                            <td>{rowData.Oncyclo_NoOfPatients}</td>
                            <td>{rowData['Revugam-25_NoOfPatients'] || rowData['Revugam_NoOfPatients']}</td>
                            <td>{rowData['Thymogam_NoOfPatients']}</td>
                        </tr> */}

                        <tr>
                            <td>{rowData.medID === 35 ? rowData.NoOfPatients : 0}</td>
                            <td>{rowData.medID === 36 || rowData.medID === 38 ? rowData.NoOfPatients : 0}</td>
                            <td>{rowData.medID === 37 ? rowData.NoOfPatients : 0}</td>
                        </tr>

                    </tbody>
                </table>
            </>
        );
    };

    const vialBodyTemplate = (rowData) => {
        return (
            <>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Oncyclo</th>
                            <th>Revugam</th>
                            <th>Thymogam</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>{rowData.Oncyclo_strips}</td>
                            <td>{rowData['Revugam-25_strips'] || rowData['Revugam_strips']}</td>
                            <td>{rowData['Thymogam_strips']}</td>
                        </tr> */}

                        <tr>
                            <td>{rowData.medID === 35 ? +rowData.strips : 0}</td>
                            <td>{rowData.medID === 36 || rowData.medID === 38 ? +rowData.strips : 0}</td>
                            <td>{rowData.medID === 37 ? +rowData.NoOfVials : 0}</td>
                        </tr>

                    </tbody>
                </table>
            </>
        );
    };

    const papBodyTamplate = (rowData) => {
        return (
            <>
                <>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Oncyclo</th>
                                <th>Revugam</th>
                                <th>Thymogam</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <td>{rowData.Oncyclo_PapValue}</td>
                                <td>{rowData['Revugam-25_PapValue']}</td>
                                <td>{rowData['Thymogam_PapValue']}</td>
                            </tr> */}

                            <tr>
                                <td>{rowData.medID === 35 ? +rowData.PapValue : 0}</td>
                                <td>{rowData.medID === 36 || rowData.medID === 38 ? +rowData.PapValue : 0}</td>
                                <td>{rowData.medID === 37 ? +rowData.PapValue : 0}</td>
                            </tr>

                        </tbody>
                    </table>
                </>
            </>
        );
    };

    const tdrHeader = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Tdr Report</span>
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded data-pr-tooltip="XLS" onClick={exportExcelTdr} />
        </div>
    );

    const actionBodyTamplate = (rowData) => {
        return (
            <>
                <Button label="Detail" />
            </>
        );
    };

    return (
        <>

            <div className="card p-3">

                <div className='flex gap-3 mb-3'>
                    <Calendar value={startDate} onChange={(e) => setStartDate(e.value)} placeholder='From' />
                    <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} placeholder='To' />
                    <Button label="Filter" onClick={onFilterHandler} />
                    {/* <Button label="Reset" onClick={onResetHandler} /> */}
                </div>

                <DataTable ref={dt} value={summaryData} paginator rows={5} header={header} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No Data found." showGridlines>
                    <Column field="CreatedDate" header="Date" body={dateBodyTamplate} />
                    <Column field="Zonename" header="Zone" />
                    <Column field="EmployeeName" header="EmployeeName" />
                    <Column field="DoctorsName" header="Dr Name" />
                    <Column field="Speciality" header="Speciality" />
                    <Column field="HospitalName" header="Hospital Name" />
                    <Column field="HospitalCity" header="City" body={cityBodyTamplate} />
                    <Column field="Indication" header="Indication" body={indicationBodyTamplate} />
                    <Column field="NoOfPatients" header="No Patients" body={patientBodyTemplate} />
                    <Column field="NoOfVials" header="No Vials / Strips" body={vialBodyTemplate} />
                    <Column field="PapValue" header="Pap" body={papBodyTamplate} />
                    {/* <Column field="action" header="Detail" body={actionBodyTamplate} /> */}
                </DataTable>
            </div>

            <div className="card p-3">
                <DataTable value={tdrData} paginator rows={5} header={tdrHeader} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No Data found." showGridlines>
                    <Column field="Orderdate" header="Date" body={tdrDateBodyTamplate} />
                    <Column field="DoctorsName" header="Doctor Name" />
                    <Column field="EmployeeName" header="EmployeeName" />
                    <Column field="NoofPatients" header="No Of Patients" />
                </DataTable>
            </div>

        </>
    )
};

export default AdminLatestDashboard;