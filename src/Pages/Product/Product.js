import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { DummyService } from '../../Service/DummyService';

const Product = () => {

    const params = useParams();
    const [doctorList, setDoctorList] = useState(null);

    useEffect(() => {
        DummyService.getDoctors().then((respData) => {
            setDoctorList(respData);
        });

    }, []);

    return (
        <>
            <h2>Product</h2>
        </>
    )
};

export default Product;