import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../../Context/Product/ProductContext';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from "primereact/checkbox";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './Product.scss';


const Product = () => {


    const ctx = useContext(ProductContext);

    const params = useParams();
    const brands = [{ key: '31' }, { key: '32' }, { key: '33' }];

    const [paramData, setParamData] = useState(params);
    const [doctorList, setDoctorList] = useState(null);

    const [date, setDate] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([]);


    //const [inputFields, setInputFields] = useState([{ name: '', key: '31' }, { name: '', key: '32' }, { name: '', key: '33' }]);
    const [inputFields, setInputFields] = useState([]);

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        console.log(data);
    }

    const onBrandChange = (e) => {
        let _selectedBrands = [...selectedBrands];
        if (e.checked) {
            _selectedBrands.push(e.value);
        }
        else {
            _selectedBrands = _selectedBrands.filter(brand => brand.key !== e.value.key);
        }
        setSelectedBrands(_selectedBrands);

        setInputFields((prevState) => {
            let inputField = _selectedBrands.map((item) => {
                return { name: '', key: item.key, placeholder: 'Enter Value' }
            });
            return [...inputField];
        });
    };

    useEffect(() => {
    }, []);

    const saveData = (e) => {
        e.preventDefault();
        let dataObj = {
            date: date,
            brands: selectedBrands,
            textField: inputFields
        };

        console.log(dataObj);
    };

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
            <Divider />
            <form className='product-form' onSubmit={saveData}>
                <h2>Please filled the data</h2>
                <Calendar value={date} onChange={(e) => setDate(e.value)} />
                <ul className='brand-wrapper'>
                    <li><img src={require('../../Content/img/med/1.png')} /></li>
                    <li><img src={require('../../Content/img/med/1.png')} /></li>
                    <li><img src={require('../../Content/img/med/1.png')} /></li>
                </ul>

                <div className="flex justify-content-around checkbox-field-wrapper">
                    {brands.map((brand) => {
                        return (
                            <div key={brand.key}>
                                <Checkbox inputId={brand.key} name="brand" value={brand} onChange={onBrandChange} checked={selectedBrands.some((item) => item.key === brand.key)} />
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-content-around input-feild-wrapper">
                    {inputFields.map((input, index) => {
                        return (
                            <div key={index} id={input.key}>
                                <InputText name='name' placeholder={input.placeholder} value={input.name} onChange={event => handleFormChange(index, event)} />
                            </div>
                        )
                    })}
                </div>

                <Button label="Save" className='save' />

            </form>
        </>
    )
};

export default Product;