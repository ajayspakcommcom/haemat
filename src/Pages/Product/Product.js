import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../../Context/Product/ProductContext';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from "primereact/checkbox";
import './Product.scss';


const Product = () => {

    const params = useParams();
    const brands = [{ key: '31' }, { key: '32' }, { key: '33' }];

    const [paramData, setParamData] = useState(params);
    const [doctorList, setDoctorList] = useState(null);
    const ctx = useContext(ProductContext);


    const [date, setDate] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const onBrandChange = (e) => {
        let _selectedBrands = [...selectedBrands];

        if (e.checked) {
            _selectedBrands.push(e.value);
        }
        else {
            _selectedBrands = _selectedBrands.filter(brand => brand.key !== e.value.key);
        }

        setSelectedBrands(_selectedBrands);
    };

    useEffect(() => {
    }, []);

    return (
        <>
            <div className='card p-3 product-wrapper'>
                <div className='product-header'>
                    <img src={require('../../Content/img/doctor.png')} />
                    <div className='content'>
                        <h2>{ctx.productData.name}({paramData.actionName})</h2>
                        <Divider />
                        <h3>About</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Customer Code</th>
                                    <th>Speciality</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Hospital Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{ctx.productData.code}</td>
                                    <td>{ctx.productData.speciality}</td>
                                    <td>{ctx.productData.city}</td>
                                    <td>{ctx.productData.state}</td>
                                    <td>{ctx.productData.hospitalName}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <form className='product-form'>
                <Calendar value={date} onChange={(e) => setDate(e.value)} />
                <ul className='brand-wrapper'>
                    <li><img src={require('../../Content/img/med/1.png')} /></li>
                    <li><img src={require('../../Content/img/med/1.png')} /></li>
                    <li><img src={require('../../Content/img/med/1.png')} /></li>
                </ul>

                {brands.map((brand) => {
                    return (
                        <div key={brand.key} className="flex align-items-center">
                            <Checkbox inputId={brand.key} name="brand" value={brand} onChange={onBrandChange} checked={selectedBrands.some((item) => item.key === brand.key)} />
                            <label htmlFor={brand.key} className="ml-2">{brand.name}</label>
                        </div>
                    );
                })}

                {JSON.stringify(selectedBrands)}

            </form>
        </>
    )
};

export default Product;