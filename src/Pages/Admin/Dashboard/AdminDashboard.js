import React, { useRef, useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './AdminDashboard.css';
import { Button } from 'primereact/button';
import Loader from '../../../Component/Loader/Loader';
import axios from "axios";
import configData from '../../../Config/Config.json';
import { groupByKey } from '../../../Service/Common';
import DoctorDetail from './DoctorDetail';


const AdminDashboard = () => {

    const dt = useRef(null);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [report, setReport] = useState(true);
    const [drDetail, setDrDetail] = useState([]);
    const [isDetail, setIsDetail] = useState(false);

    let originalData = useRef(null);

    const url = `${configData.SERVER_URL}/admin-report`;

    useEffect(() => {
        axios.get(url).then((resp) => {
            originalData.current = [...resp.data[0]];

            console.log(originalData.current);

            const result = resp.data[0].map((item) => {
                //debugger;
                return {
                    CreatedDate: item.CreatedDate,
                    ZoneName: item.ZoneName,
                    DoctorsID: item.DoctorsID[0],
                    DoctorsName: item.DoctorsName[0],
                    Speciality: item.Speciality[0],
                    HospitalName: item.HospitalName[0],
                    HospitalCity: item.hospitalCity,
                    Indication: item.Indication,
                    NoOfPatients: item.NoOfPatients,
                    //NoOfVials: item.NoOfVials + item.strips,
                    NoOfVials: item.NoOfVials,
                    NoOfStrips: item.strips,
                    PapValue: item.PapValue,
                    medID: item.medID,
                    EmpID: item.EmpID,

                };
            });

            setIsLoaderVisible(false);

            const groupedData = groupByKey(result, 'DoctorsID');
            const groupedDataList = [];


            for (const key in groupedData) {

                let patientList = [];
                let vialsList = [];
                let stripList = [];
                let papList = [];

                groupedData[key].forEach(item => {

                    if (item.DoctorsID === groupedData[key][0].DoctorsID) {
                        patientList.push({
                            medID: item.medID,
                            NoOfPatients: item.NoOfPatients
                        });

                        vialsList.push({
                            medID: item.medID,
                            NoOfVials: item.NoOfVials
                        });

                        stripList.push({
                            medID: item.medID,
                            NoOfStrips: +item.NoOfStrips
                        });

                        papList.push({
                            medID: item.medID,
                            PapValue: +item.PapValue
                        });

                    }
                });

                groupedDataList.push({
                    CreatedDate: groupedData[key][0].CreatedDate,
                    ZoneName: groupedData[key][0].ZoneName,
                    DoctorsID: groupedData[key][0].DoctorsID,
                    DoctorsName: groupedData[key][0].DoctorsName,
                    Speciality: groupedData[key][0].Speciality,
                    HospitalName: groupedData[key][0].HospitalName,
                    HospitalCity: groupedData[key][0].hospitalCity,
                    Indication: groupedData[key][0].Indication,
                    EmpID: groupedData[key][0].EmpID,
                    NoOfPatients: patientList,
                    NoOfVials: vialsList,
                    NoOfStrips: stripList,
                    papValues: papList
                });

            }

            //console.log(groupedDataList)
            setReport(groupedDataList);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    const cols = [
        { field: 'CreatedDate', header: 'Date' },
        { field: 'ZoneName', header: 'Zone' },
        { field: 'DoctorsID', header: 'Customer Code' },
        { field: 'DoctorsName', header: 'Dr Name' },
        { field: 'Speciality', header: 'Speciality' },
        { field: 'HospitalName', header: 'Hospital Name' },
        { field: 'HospitalCity', header: 'City' },
        { field: 'Indication', header: 'Indication' },
        { field: 'NoOfPatients', header: 'No Of Patients' },
        // { field: 'NoOfVials', header: 'No Of vials' },
        // { field: 'PapValue', header: 'Patients on TDR' }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

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

            const excelData = originalData.current;

            //console.log(excelData)

            const worksheet = xlsx.utils.json_to_sheet(excelData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'adminReport');
        });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, report);
                doc.save('products.pdf');
            });
        });
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            {/* <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" /> */}
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
            {/* <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" /> */}
        </div>
    );


    const getTotalPatients = (rowData) => {
        let oncycloPatient = [], revugamPatient = [], thymogamPatient = [];

        if (rowData.NoOfPatients.length > 0) {

            oncycloPatient = [...rowData.NoOfPatients.filter(item => {
                return item.medID === 35
            })]

            revugamPatient = [...rowData.NoOfPatients.filter(item => {
                return item.medID === 36
            })]

            thymogamPatient = [...rowData.NoOfPatients.filter(item => {
                return item.medID === 37
            })]
        }

        let filteredOncycloPatient = oncycloPatient.map(item => {
            return item.NoOfPatients
        })

        let filteredRevugamPatient = revugamPatient.map(item => {
            return item.NoOfPatients
        })

        let filteredThymogamPatient = thymogamPatient.map(item => {
            return item.NoOfPatients
        })

        filteredOncycloPatient = filteredOncycloPatient.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        filteredRevugamPatient = filteredRevugamPatient.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        filteredThymogamPatient = filteredThymogamPatient.reduce((accumulator, currentValue) => {
            return +accumulator + +currentValue;
        }, 0);

        return {
            Oncyclo: filteredOncycloPatient,
            Revugam: filteredRevugamPatient,
            Thymogam: filteredThymogamPatient
        };

    };

    const getTotalVials = (rowData) => {

        let oncycloVial = [], revugamVial = [], thymogamVial = [];

        // if (rowData.NoOfVials.length > 0) {

        oncycloVial = [...rowData.NoOfStrips.filter(item => {
            return item.medID === 35
        })]

        revugamVial = [...rowData.NoOfStrips.filter(item => {
            return item.medID === 36
        })]

        thymogamVial = [...rowData.NoOfVials.filter(item => {
            return item.medID === 37
        })]
        // }

        let filteredOncycloVial = oncycloVial.map(item => {
            return (item.NoOfStrips)
        })

        let filteredRevugamVial = revugamVial.map(item => {
            return (item.NoOfStrips)
        })

        let filteredThymogamVial = thymogamVial.map(item => {
            return (item.NoOfVials === -1 ? 0 : item.NoOfVials)
        });

        filteredOncycloVial = filteredOncycloVial.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        filteredRevugamVial = filteredRevugamVial.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        filteredThymogamVial = filteredThymogamVial.reduce((accumulator, currentValue) => {
            return +accumulator + +currentValue;
        }, 0);

        return {
            Oncyclo: filteredOncycloVial,
            Revugam: filteredRevugamVial,
            Thymogam: filteredThymogamVial
        };

    };

    const patientBodyTemplate = (rowData) => {
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
                        <tr>
                            <td>{getTotalPatients(rowData).Oncyclo}</td>
                            <td>{getTotalPatients(rowData).Revugam}</td>
                            <td>{getTotalPatients(rowData).Thymogam}</td>
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
                        <tr>
                            <td>{getTotalVials(rowData).Oncyclo}</td>
                            <td>{getTotalVials(rowData).Revugam}</td>
                            <td>{getTotalVials(rowData).Thymogam}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    };

    const dateBodyTamplate = (rowData) => {
        return (
            <>
                {rowData && new Date(rowData.CreatedDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </>
        );
    };

    const cityBodyTamplate = (rowData) => {
        return (
            <>
                <span>{rowData.hospitalCity && rowData.HospitalCity.length > 0 ? rowData.HospitalCity : '-NA-'}</span>
            </>
        );
    };

    const indicationBodyTamplate = (rowData) => {
        return (
            <>
                {rowData.Indication ? rowData.Indication : '-NA-'}
            </>
        );
    };


    const getPapPatients = (rowData) => {
        let oncycloPap = [], revugamPap = [], thymogamPap = [];

        if (rowData.papValues.length > 0) {

            oncycloPap = [...rowData.papValues.filter(item => {
                return item.medID === 35
            })]

            revugamPap = [...rowData.papValues.filter(item => {
                return item.medID === 36
            })]

            thymogamPap = [...rowData.papValues.filter(item => {
                return item.medID === 37
            })]
        }

        let filteredOncycloPap = oncycloPap.map(item => {
            return item.PapValue
        })

        let filteredRevugamPap = revugamPap.map(item => {
            return item.PapValue
        })

        let filteredThymogamPap = thymogamPap.map(item => {
            return item.PapValue
        })

        filteredOncycloPap = filteredOncycloPap.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        filteredRevugamPap = filteredRevugamPap.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        filteredThymogamPap = filteredThymogamPap.reduce((accumulator, currentValue) => {
            return +accumulator + +currentValue;
        }, 0);

        return {
            Oncyclo: filteredOncycloPap,
            Revugam: filteredRevugamPap,
            Thymogam: filteredThymogamPap
        };

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
                            <tr>
                                <td>{getPapPatients(rowData).Oncyclo}</td>
                                <td>{getPapPatients(rowData).Revugam}</td>
                                <td>{getPapPatients(rowData).Thymogam}</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            </>
        );
    };

    const getDetailByDrId = (id) => {

        setIsDetail(true);
        const data = originalData.current;

        const filteredData = data.filter(item => {
            return item.DoctorsID[0] === id;
        });

        setDrDetail(filteredData);
    };

    const actionBodyTamplate = (rowData) => {
        return (
            <>
                <Button label="Detial" onClick={() => { getDetailByDrId(rowData.DoctorsID) }} />
            </>
        );
    };

    const backHandler = () => {
        setIsDetail(false);
    };

    return (
        <>
            {!isDetail &&
                <div className="card p-3">
                    <h2>Admin Report</h2>
                    {report.length > 0 &&
                        <DataTable ref={dt} value={report} paginator rows={5} header={header} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No customers found." showGridlines>
                            <Column field="CreatedDate" header="Date" body={dateBodyTamplate} />
                            <Column field="ZoneName" header="Zone" />
                            <Column field="DoctorsID" header="Customer Code" />
                            <Column field="DoctorsName" header="Dr Name" />
                            <Column field="Speciality" header="Speciality" />
                            <Column field="HospitalName" header="Hospital Name" />
                            <Column field="HospitalCity" header="City" body={cityBodyTamplate} />
                            <Column field="Indication" header="Indication" body={indicationBodyTamplate} />
                            <Column field="NoOfPatients" header="No Patients" body={patientBodyTemplate} />
                            <Column field="NoOfVials" header="No Vials / Strips" body={vialBodyTemplate} />
                            <Column field="PapValue" header="Pap" body={papBodyTamplate} />
                            <Column field="action" header="Detail" body={actionBodyTamplate} />
                        </DataTable>
                    }

                    {isLoaderVisible && <Loader />}
                </div>
            }

            {isDetail && <DoctorDetail data={drDetail} onBackHandler={backHandler} />}
        </>
    )
};

export default AdminDashboard;