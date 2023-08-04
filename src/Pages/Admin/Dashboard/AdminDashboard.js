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
import { Divider } from 'primereact/divider';


const AdminDashboard = () => {

    const dt = useRef(null);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [report, setReport] = useState(true);
    const [drDetail, setDrDetail] = useState([]);
    const [isDetail, setIsDetail] = useState(false);
    const [tdr, setTdr] = useState([]);

    let originalData = useRef(null);

    const url = `${configData.SERVER_URL}/admin-report`;

    useEffect(() => {
        axios.get(url).then((resp) => {
            originalData.current = [...resp.data[0]];

            //console.log(originalData.current);

            const result = resp.data[0].map((item) => {
                //console.log(item)
                return {
                    //CreatedDate: item.CreatedDate,
                    CreatedDate: item.OrderDate[0],
                    ZoneName: item.ZoneName,
                    DoctorsID: item.DoctorsID[0],
                    DoctorsName: item.DoctorsName[0],
                    Speciality: item.Speciality[0],
                    HospitalName: item.HospitalName[0],
                    HospitalCity: item.hospitalCity,
                    Indication: item.Indication ? item.Indication[0] : '',
                    NoOfPatients: item.NoOfPatients,
                    //NoOfVials: item.NoOfVials + item.strips,
                    NoOfVials: item.NoOfVials,
                    NoOfStrips: item.strips,
                    PapValue: item.PapValue,
                    medID: item.medID,
                    EmpID: item.EmpID,
                    EmployeeName: item.EmployeeName
                };
            });

            //console.log(result)

            setIsLoaderVisible(false);

            const groupedData = groupByKey(result, 'DoctorsID');
            let groupedDataList = [];
            const groupedDataByKeyList = [];
            const tdrData = [];

            for (const key in groupedData) {
                groupedDataByKeyList.push(groupByKey(groupedData[key], 'CreatedDate'));
            }

            for (const item of groupedDataByKeyList) {
                for (const key in item) {

                    //console.log(item[key]);

                    let isTdr = false;

                    if (item[key].length === 3) {
                        let oncycloMed = item[key].find(item => item.medID === 35);
                        let revugamMed = item[key].find(item => item.medID === 36);
                        let thymogamMed = item[key].find(item => item.medID === 37);

                        // console.log(oncycloMed);
                        // console.log(oncycloMed ? parseInt(oncycloMed?.NoOfStrips) : 0)

                        // console.log(revugamMed);
                        // console.log(parseInt(revugamMed?.NoOfStrips));

                        // console.log(thymogamMed);
                        // console.log(thymogamMed?.NoOfVials);

                        if (oncycloMed && revugamMed && thymogamMed) {
                            if ((parseInt(oncycloMed?.NoOfStrips) > 0) && (parseInt(revugamMed?.NoOfStrips)) && (parseInt(thymogamMed?.NoOfVials))) {
                                isTdr = true;
                            }
                            //console.log('============================');
                        }
                    }

                    //console.log(isTdr);

                    if (isTdr) {
                        tdrData.push({
                            'EmployeeName': item[key][0].EmployeeName,
                            'drName': item[key][0].DoctorsName,
                            'noOfPatients': item[key][0].NoOfPatients,
                            //'tdr': item[key].length === 3 ? 'Yes' : 'No',
                            'tdr': item[key].length === 3 ? 'Yes' : 'No',
                            'date': new Date(item[key][0].CreatedDate).toLocaleDateString()
                        });
                    }



                }
            }

            const filteredTdr = tdrData.filter(item => item.tdr.toLowerCase() === "yes");

            //console.log(filteredTdr);

            setTdr(filteredTdr);

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

                //console.log(groupedData)
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
                    papValues: papList,
                    EmployeeName: groupedData[key][0].EmployeeName
                });

            }

            //console.log(groupedDataList);

            groupedDataList = groupedDataList.sort((a, b) => {
                let dateA = new Date(a.CreatedDate);
                let dateB = new Date(b.CreatedDate);
                return dateA - dateB;
            });



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

            //const excelData = originalData.current;

            const arrayData = [...report];



            // old requirement
            // const filteredData = arrayData.map(item => {

            //     const vialArrayList = item.NoOfVials.filter(v => v.medID === 37);

            //     const totalVials = vialArrayList.reduce((prevsValue, currentValue) => {
            //         return prevsValue + currentValue.NoOfVials;
            //     }, 0);

            //     const RevugamStripArrayList = item.NoOfStrips.filter(s => s.medID === 36 || s.medID === 38);

            //     const totalRevugamStrips = RevugamStripArrayList.reduce((prevsValue, currentValue) => {
            //         return prevsValue + currentValue.NoOfStrips;
            //     }, 0);

            //     const OncycloStripArrayList = item.NoOfStrips.filter(s => s.medID === 35 || s.medID === 35);

            //     const totalOncycloStrips = OncycloStripArrayList.reduce((prevsValue, currentValue) => {
            //         return prevsValue + currentValue.NoOfStrips;
            //     }, 0);

            //     // pap Value
            //     const thymogamPapArrayList = item.papValues.filter(p => p.medID === 37);

            //     const totalThymogamPap = thymogamPapArrayList.reduce((prevsValue, currentValue) => {
            //         return prevsValue + currentValue.PapValue;
            //     }, 0);

            //     const revugamPapArrayList = item.papValues.filter(p => p.medID === 36 || p.medID === 38);

            //     const totalRevugamPap = revugamPapArrayList.reduce((prevsValue, currentValue) => {
            //         return prevsValue + currentValue.PapValue;
            //     }, 0);


            //     const oncycloPapArrayList = item.papValues.filter(p => p.medID === 35);

            //     const totalOncycloPap = oncycloPapArrayList.reduce((prevsValue, currentValue) => {
            //         return prevsValue + currentValue.PapValue;
            //     }, 0);

            //     return {
            //         "CreatedDate": item.CreatedDate,
            //         "ZoneName": item.ZoneName,
            //         "DoctorsID": item.DoctorsID,
            //         "DoctorsName": item.DoctorsName,
            //         "Speciality": item.Speciality,
            //         "HospitalName": item.HospitalName,
            //         "Indication": getIndicationText(item.Indication),
            //         "EmpID": item.EmpID,
            //         "Oncyclo NoOfPatients": item.NoOfPatients[0].medID === 35 ? item.NoOfPatients[0].NoOfPatients : '-NA-',
            //         "Revugam NoOfPatients": (item.NoOfPatients[0].medID === 36 || item.NoOfPatients[0].medID === 38) ? item.NoOfPatients[0].NoOfPatients : '-NA-',
            //         "Thymogam NoOfPatients": item.NoOfPatients[0].medID === 37 ? item.NoOfPatients[0].NoOfPatients : '-NA-',
            //         //"NoOfVialsStrips": `Oncyclo ${totalOncycloStrips.toString()}, Revugam ${totalRevugamStrips.toString()}, Thymogam ${totalVials.toString()}`,
            //         //"papValues": `Oncyclo ${totalOncycloPap.toString()}, Revugam ${totalRevugamPap.toString()},  Thymogam ${totalThymogamPap.toString()}`,
            //         "OncycloStrips": `${totalOncycloStrips.toString()}`,
            //         "RevugamStrips": `${totalRevugamStrips.toString()}`,
            //         "ThymogamVials": `${totalVials.toString()}`,

            //         "OncycloPap": `${totalOncycloPap.toString()}`,
            //         "RevugamPap": `${totalRevugamPap.toString()}`,
            //         "ThymogamPap": `${totalThymogamPap.toString()}`,
            //         "EmployeeName": item.EmployeeName
            //     }
            // });


            // new requirement 
            const newData = originalData.current
            //console.log(newData);

            const newFilteredData = newData.map((item) => {

                //console.log(item);

                return {
                    "ZoneName": item.ZoneName,
                    "EmployeeName": item.EmployeeName,
                    "OrderDate": item.OrderDate[0],
                    "DoctorsName": item.DoctorsName[0],
                    "Speciality": item.Speciality[0],
                    "HospitalName": item.HospitalName[0],
                    "Indication": item.Indication ? getIndicationText(item.Indication[0]) : 0, //getIndicationText(item.Indication),

                    "Thymogam NoOfPatients": item.medID === 37 ? item.NoOfPatients : 0,
                    "Revugam NoOfPatients": (item.medID === 36 || item.medID === 38) ? item.NoOfPatients : 0,
                    "Oncyclo NoOfPatients": item.medID === 35 ? item.NoOfPatients : 0,

                    "ThymogamVials": item.medID === 37 ? item.NoOfVials : 0,
                    "RevugamStrips": (item.medID === 36 || item.medID === 38) ? item.strips : 0,
                    "OncycloStrips": item.medID === 35 ? item.strips : 0,

                    "ThymogamPap": item.medID === 37 ? item.PapValue : 0,
                    "RevugamPap": (item.medID === 36 || item.medID === 38) ? item.PapValue : 0,
                    "OncycloPap": item.medID === 35 ? item.PapValue : 0,
                }
            });



            console.log(newFilteredData);

            const worksheet = xlsx.utils.json_to_sheet(newFilteredData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });
            saveAsExcelFile(excelBuffer, 'adminReport');

        });
    };

    const exportExcelTdr = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(tdr);
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
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Dr Report</span>
            {/* <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" /> */}
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
            {/* <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" /> */}
        </div>
    );

    const tdrHeader = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Tdr Report</span>
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcelTdr} data-pr-tooltip="XLS" />
        </div>
    );


    const getTotalPatients = (rowData) => {
        let oncycloPatient = [], revugamPatient = [], thymogamPatient = [];

        if (rowData.NoOfPatients.length > 0) {

            oncycloPatient = [...rowData.NoOfPatients.filter(item => {
                return item.medID === 35
            })]

            revugamPatient = [...rowData.NoOfPatients.filter(item => {
                return item.medID === 36 || item.medID === 38
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
            return item.medID === 36 || item.medID === 38
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
                {rowData.Indication ? getIndicationText(rowData.Indication) : '-NA-'}
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
                return item.medID === 36 || item.medID === 38
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
                <Button label="Detail" onClick={() => { getDetailByDrId(rowData.DoctorsID) }} />
            </>
        );
    };

    const backHandler = () => {
        setIsDetail(false);
    };

    return (
        <>
            {!isDetail &&
                <>

                    <div className="card p-3">
                        {report.length > 0 &&
                            <DataTable ref={dt} value={report} paginator rows={5} header={header} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No customers found." showGridlines>
                                <Column field="CreatedDate" header="Date" body={dateBodyTamplate} />
                                <Column field="ZoneName" header="Zone" />
                                <Column field="EmployeeName" header="EmployeeName" />
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
                    <div className="card p-3">
                        <DataTable value={tdr} paginator rows={5} header={tdrHeader} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No customers found." showGridlines>
                            <Column field="date" header="Date" />
                            <Column field="drName" header="Doctor Name" />
                            <Column field="EmployeeName" header="EmployeeName" />
                            <Column field="noOfPatients" header="No Of Patients" />
                            <Column field="tdr" header="Tdr" />
                        </DataTable>
                    </div>
                </>
            }



            {isDetail && <DoctorDetail data={drDetail} onBackHandler={backHandler} />}


        </>
    )
};

export default AdminDashboard;