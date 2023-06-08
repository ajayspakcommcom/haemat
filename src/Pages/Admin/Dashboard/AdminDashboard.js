import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './AdminDashboard.css';
import { Button } from 'primereact/button';
import Loader from '../../../Component/Loader/Loader';


const AdminDashboard = () => {

    const dt = useRef(null);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);



    const adminReport = [
        {
            "doctorID": 1000,
            "customerCode": "CC001",
            "doctorName": "Dr. John Smith",
            "specialtyName": "Cancer",
            "cityName": "Mumbai",
            "StateName": "ANDHRA PRADESH",
            "hospitalName": "Mumbai Hospital"
        },
        {
            "doctorID": 1001,
            "customerCode": "CC002",
            "doctorName": "Dr. Sarah Johnson",
            "specialtyName": "Diabetes",
            "cityName": "Delhi",
            "StateName": "ASSAM",
            "hospitalName": "Delhi Medical Center"
        },
        {
            "doctorID": 1002,
            "customerCode": "CC003",
            "doctorName": "Dr. Michael Williams",
            "specialtyName": "Hypertension",
            "cityName": "Bangalore",
            "StateName": "BIHAR",
            "hospitalName": "Bangalore General Hospital"
        },
        {
            "doctorID": 1003,
            "customerCode": "CC004",
            "doctorName": "Dr. Jessica Brown",
            "specialtyName": "Arthritis",
            "cityName": "Chennai",
            "StateName": "CHATTISGARH",
            "hospitalName": "Chennai Medical Center"
        },
        {
            "doctorID": 1004,
            "customerCode": "CC005",
            "doctorName": "Dr. David Wilson",
            "specialtyName": "Cancer",
            "cityName": "Hyderabad",
            "StateName": "DELHI",
            "hospitalName": "Hyderabad Hospital"
        },
        {
            "doctorID": 1005,
            "customerCode": "CC006",
            "doctorName": "Dr. Emily Davis",
            "specialtyName": "Diabetes",
            "cityName": "Kolkata",
            "StateName": "GOA",
            "hospitalName": "Kolkata General"
        },
        {
            "doctorID": 1006,
            "customerCode": "CC007",
            "doctorName": "Dr. Daniel Thompson",
            "specialtyName": "Hypertension",
            "cityName": "Ahmedabad",
            "StateName": "GUJARAT",
            "hospitalName": "Ahmedabad Medical Center"
        },
        {
            "doctorID": 1007,
            "customerCode": "CC008",
            "doctorName": "Dr. Olivia Clark",
            "specialtyName": "Arthritis",
            "cityName": "Jaipur",
            "StateName": "HARYANA",
            "hospitalName": "Jaipur Regional Hospital"
        },
        {
            "doctorID": 1008,
            "customerCode": "CC009",
            "doctorName": "Dr. William Rodriguez",
            "specialtyName": "Cancer",
            "cityName": "Pune",
            "StateName": "JAMMU",
            "hospitalName": "Pune Hospital"
        },
        {
            "doctorID": 1009,
            "customerCode": "CC010",
            "doctorName": "Dr. Sophia Martinez",
            "specialtyName": "Diabetes",
            "cityName": "Chandigarh",
            "StateName": "JHARKHAND",
            "hospitalName": "Chandigarh Medical Center"
        },
        {
            "doctorID": 1010,
            "customerCode": "CC011",
            "doctorName": "Dr. Ethan Thompson",
            "specialtyName": "Hypertension",
            "cityName": "Lucknow",
            "StateName": "KARNATAKA",
            "hospitalName": "Lucknow Medical Center"
        },
        {
            "doctorID": 1011,
            "customerCode": "CC012",
            "doctorName": "Dr. Ava Anderson",
            "specialtyName": "Arthritis",
            "cityName": "Jaipur",
            "StateName": "KERALA",
            "hospitalName": "Jaipur Hospital"
        },
        {
            "doctorID": 1012,
            "customerCode": "CC013",
            "doctorName": "Dr. James Garcia",
            "specialtyName": "Cancer",
            "cityName": "Bhopal",
            "StateName": "MADHYA PRADESH",
            "hospitalName": "Bhopal Medical Center"
        },
        {
            "doctorID": 1013,
            "customerCode": "CC014",
            "doctorName": "Dr. Mia Hernandez",
            "specialtyName": "Diabetes",
            "cityName": "Kochi",
            "StateName": "MAHARASHTRA",
            "hospitalName": "Kochi General"
        },
        {
            "doctorID": 1014,
            "customerCode": "CC015",
            "doctorName": "Dr. Benjamin Khan",
            "specialtyName": "Hypertension",
            "cityName": "Mysore",
            "StateName": "Nepal BSV",
            "hospitalName": "Mysore Hospital"
        }
    ];

    const cols = [
        { field: 'customerCode', header: 'Customer Code' },
        { field: 'doctorName', header: 'Doctor Name' },
        { field: 'specialtyName', header: 'Speciality' },
        { field: 'cityName', header: 'City' },
        { field: 'StateName', header: 'State' },
        { field: 'hospitalName', header: 'Hospital Name' }
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
            const worksheet = xlsx.utils.json_to_sheet(adminReport);
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

                doc.autoTable(exportColumns, adminReport);
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
            {/* {isLoaderVisible && <Loader />} */}
            <div className="card p-3">
                <h2>Admin Report</h2>
                <DataTable ref={dt} value={adminReport} paginator rows={5} header={header} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No customers found.">
                    <Column field="customerCode" header="Customer Code" />
                    <Column field="doctorName" header="Name" />
                    <Column field="specialtyName" header="Speciality" />
                    <Column field="cityName" header="City" />
                    <Column field="StateName" header="State" />
                    <Column field="hospitalName" header="Hospital Name" />
                </DataTable>
            </div>
        </>
    )
};

export default AdminDashboard;