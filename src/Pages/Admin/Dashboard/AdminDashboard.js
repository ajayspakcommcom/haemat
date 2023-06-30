import React, { useRef, useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './AdminDashboard.css';
import { Button } from 'primereact/button';
import Loader from '../../../Component/Loader/Loader';
import axios from "axios";
import configData from '../../../Config/Config.json';
import { groupDataByKey } from '../../../Service/Common';


const AdminDashboard = () => {

    const dt = useRef(null);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [report, setReport] = useState(true);

    const url = `${configData.SERVER_URL}/admin-report`;

    useEffect(() => {
        axios.get(url).then((resp) => {
            console.log(resp.data[0]);
            console.log('=========================')

            const result = resp.data[0].map((item) => {
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
                    NoOfVials: item.NoOfVials,
                    PapValue: item.PapValue
                };
            });

            setIsLoaderVisible(false)

            setReport(result)
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
        { field: 'NoOfVials', header: 'No Of vials' },
        { field: 'PapValue', header: 'Patients on TDR' }
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
            const worksheet = xlsx.utils.json_to_sheet(report);
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
            <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
        </div>
    );

    return (
        <>
            <div className="card p-3">
                <h2>Admin Report</h2>
                {
                    report.length > 0 && <DataTable ref={dt} value={report} paginator rows={5} header={header} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No customers found.">
                        <Column field="CreatedDate" header="Date" />
                        <Column field="ZoneName" header="Zone" />
                        <Column field="DoctorsID" header="Customer Code" />
                        <Column field="DoctorsName" header="Dr Name" />
                        <Column field="Speciality" header="Speciality" />
                        <Column field="HospitalName" header="Hospital Name" />
                        <Column field="HospitalCity" header="City" />
                        <Column field="Indication" header="Indication" />
                        <Column field="NoOfPatients" header="No Patients" />
                        <Column field="NoOfVials" header="No Vials" />
                        <Column field="PapValue" header="Patients on TDR" />
                    </DataTable>
                }

                {isLoaderVisible && <Loader />}
            </div>
        </>
    )
};

export default AdminDashboard;