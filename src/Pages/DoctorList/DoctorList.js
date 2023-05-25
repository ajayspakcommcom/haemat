import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DummyService } from '../../Service/DummyService';

const DoctorList = () => {

    const [doctorList, setDoctorList] = useState(null);

    useEffect(() => {
        DummyService.getCustomersMedium().then((data) => {
            setDoctorList(data);
        });
    }, []);

    return (
        <>
            <h1>Doctor List</h1>
            <div className="card">
                <DataTable value={doctorList} emptyMessage="No customers found.">
                    <Column field="name" header="Name" />
                    <Column field="country.name" header="Country" />
                    <Column field="activity" header="Activity" />
                    <Column field="company" header="Company" />
                    <Column field="date" header="Date" />
                </DataTable>
            </div>
        </>
    )
};

export default DoctorList;