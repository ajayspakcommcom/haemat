import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DummyService } from '../../Service/DummyService';
import { Button } from 'primereact/button';
import './DoctorList.css';
import ProductContext from '../../Context/Product/ProductContext';

const DoctorList = () => {

    const [doctorList, setDoctorList] = useState(null);
    const navigate = useNavigate();
    const ctx = useContext(ProductContext);

    const goto = (obj, actionName) => {
        console.log(obj);
        console.log(actionName);
        navigate(`/product/${obj.id}/${actionName}`);
    };

    useEffect(() => {
        DummyService.getDoctors().then((respData) => {
            setDoctorList(respData);
        });
    }, []);

    const actionTemplate = (doctorList) => {
        return (
            <div className='action-btn'>
                <Button label="AA" raised onClick={() => { goto(doctorList, 'aa') }} /> <Button label="ITP" raised onClick={() => { goto(doctorList, 'itp') }} />
            </div>
        );
    };

    return (
        <>
            <div className="card p-5">
                <h2>Doctor List</h2>
                <DataTable value={doctorList} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No customers found.">
                    <Column field="code" header="Customer Code" />
                    <Column field="name" header="Name" />
                    <Column field="speciality" header="Speciality" />
                    <Column field="city" header="City" />
                    <Column field="state" header="State" />
                    <Column field="hospitalName" header="Hospital Name" />
                    <Column header="Action" body={actionTemplate} />
                </DataTable>
            </div>
        </>
    )
};

export default DoctorList;