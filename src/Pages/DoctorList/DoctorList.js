import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import './DoctorList.css';
import ProductContext from '../../Context/Product/ProductContext';
import axios from "axios";
import LoginContext from '../../Context/Login/LoginContext';
import { getEmpId } from '../../Service/Common';
import configData from '../../Config/Config.json';
import Loader from '../../Component/Loader/Loader';

const DoctorList = () => {

    const productContext = useContext(ProductContext);
    const loginContext = useContext(LoginContext);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);

    const [doctorList, setDoctorList] = useState(null);
    const url = `${configData.SERVER_URL}/getmydoctorlist/${loginContext.userData.empId ? loginContext.userData.empId : getEmpId()}`;

    const navigate = useNavigate();

    const goto = (obj, actionName) => {
        console.log(obj);
        navigate(`/product/${obj.doctorID}/${actionName}`);
        productContext.addProduct(obj);
    };



    useEffect(() => {
        axios.get(url).then((resp) => {

            const respData = resp.data.map((item) => {
                return {
                    customerCode: item.customerCode ? item.customerCode : '-NA-',
                    doctorName: item.doctorName ? item.doctorName : '-NA-',
                    specialtyName: item.specialtyName ? item.specialtyName : '-NA-',
                    cityName: item.cityName ? item.cityName : '-NA-',
                    StateName: item.StateName ? item.StateName : '-NA-',
                    hospitalName: item.hospitalName ? item.hospitalName : '-NA-',
                    doctorID: item.doctorID
                }
            });

            console.log(respData);
            console.log('====================================');
            console.log(resp.data);

            setDoctorList(respData);
            setIsLoaderVisible(false);
        }).catch((err) => {
            console.log(err)
        });
    }, []);

    const actionTemplate = (doctorList) => {
        return (
            <div className='action-btn'>
                <Button label="AA" raised onClick={() => { goto(doctorList, 'aa') }} />
                <Button label="ITP" raised onClick={() => { goto(doctorList, 'itp') }} />
            </div>
        );
    };

    return (
        <>
            {isLoaderVisible && <Loader />}
            <div className="card p-3">
                <h2>Doctor List</h2>
                <DataTable value={doctorList} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} emptyMessage="No customers found.">
                    <Column field="customerCode" header="Customer Code" />
                    <Column field="doctorName" header="Name" />
                    <Column field="specialtyName" header="Speciality" />
                    <Column field="cityName" header="City" />
                    <Column field="StateName" header="State" />
                    <Column field="hospitalName" header="Hospital Name" />
                    <Column header="Action" body={actionTemplate} />
                </DataTable>
            </div>
        </>
    )
};

export default DoctorList;