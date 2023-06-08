import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../../Context/Product/ProductContext';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from "primereact/checkbox";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './Product.scss';
import axios from "axios";
import oncyclo from '../../Content/img/med/oncyclo.png';
import revugam from '../../Content/img/med/revugam.png';
import thymogam from '../../Content/img/med/thymogam.png';
import { getEmpId } from '../../Service/Common';
import LoginContext from '../../Context/Login/LoginContext';
import Thankyou from '../Thankyou.js/Thankyou';
import configData from '../../Config/Config.json';
import { InputNumber } from 'primereact/inputnumber';


const Product = () => {

    const ctx = useContext(ProductContext);
    const loginContext = useContext(LoginContext);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isThankyouPageVisible, setIsThankyouPageVisible] = useState(false);

    const params = useParams();

    //const brands = [{ key: '31' }, { key: '32' }, { key: '33' }];
    const [brands, setBrands] = useState([]);
    const url = `${configData.SERVER_URL}/getdoctordetails/${params.id}`;
    console.log(params);


    const [paramData, setParamData] = useState(params);
    const [drData, setDrData] = useState({});
    const [doctorList, setDoctorList] = useState(null);


    const [date, setDate] = useState(null);
    const [noOfPatient, setNoOfPatient] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [brandImgList, setBrandImgList] = useState([]);


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
                //return { name: '', key: item.key, placeholder: +item.key == 37 ? 'No of Vials' : 'No of Strips' }
                return { name: '', key: item.key, placeholder: +item.key == 37 ? 'Vials for Thymogam' : +item.key == 36 ? 'Strips for Revugam' : 'Strips for Oncyclo' }
            });
            return [...inputField];
        });
    };


    useEffect(() => {

        axios.get(url).then((resp) => {
            console.log(resp);
            setDrData(resp.data[0][0]);

            let imgList = [{ name: "oncyclo", url: oncyclo }, { name: "revugam", url: revugam }, { name: "thymogam", url: thymogam }];
            let brandList = resp.data[1].map((item) => {
                return { key: item.medID };
            });
            console.log(resp.data[1]);
            console.log(brandList);

            if (paramData.actionName == 'itp') {
                imgList = imgList.filter(item => item.name == 'thymogam');
                console.log(imgList);
                brandList = brandList.filter(item => item.key == 37);
            }

            console.log(brandList);
            setBrandImgList(imgList);
            setBrands(brandList);

        }).catch((err) => {
            console.log(err)
        });


    }, []);

    const saveData = (e) => {
        e.preventDefault();

        let medicineData = inputFields, drId = params.id, empId = loginContext.userData.empId ? loginContext.userData.empId : getEmpId(), endPoints = [];

        console.log(medicineData);

        if (!date) {
            alert('Please select the date');
            return;
        }

        if (!noOfPatient) {
            alert('Please fill no of Patients');
            return;
        }

        medicineData.forEach((item, indx) => {

            let itemObj = {
                doctorId: +drId,
                empID: +empId,
                medId: +item.key,
                orderDate: date ? date.toLocaleDateString() : date,
                NoOfVials: +item.key == 37 ? +item.name : -1,
                NoOfStrips: +item.key != 37 ? +item.name : null,
                NoOfPatients: +noOfPatient
            };
            endPoints.push(itemObj);
        });

        console.log(endPoints);
        setIsBtnDisabled(true);

        Promise.all(endPoints.map((endpoint) => axios.post(`${configData.SERVER_URL}/save-details/`, endpoint))).then(
            axios.spread((...allData) => {
                console.log({ allData });
                setIsBtnDisabled(false);
                setIsThankyouPageVisible(true);
            })
        );

    };

    const comeFromThankPageHandler = () => {
        setIsThankyouPageVisible(false);
    };

    return (
        <>
            <div className='card p-3 product-wrapper'>
                <div className='product-header'>

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
                                    <td>{drData.customerCode}</td>
                                    <td>{drData.specialtyName}</td>
                                    <td>{drData.cityName}</td>
                                    <td>{drData.StateName}</td>
                                    <td>{drData.hospitalName}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Divider />

            {!isThankyouPageVisible &&
                <form className='product-form' onSubmit={saveData}>
                    <h2>Please filled the data</h2>

                    <Calendar inputId="birth_date" value={date} onChange={(e) => setDate(e.value)} showIcon className='mb-4' />

                    <InputNumber value={noOfPatient} onChange={(e) => { setNoOfPatient(e.value) }} placeholder='No of Patients' />

                    <ul className='brand-wrapper'>
                        {brandImgList.map((word, index) => {
                            return <li key={index}><img src={word.url} alt={word.url} /></li>
                        })}
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

                    <div className="flex justify-content-start input-feild-wrapper">
                        {inputFields.map((input, index) => {
                            return (
                                <div key={index} id={input.key}>
                                    <InputText type='number' name='name' placeholder={input.placeholder} value={input.name} onChange={event => handleFormChange(index, event)} />
                                </div>
                            )
                        })}
                    </div>
                    <Button label="Save" className='save' disabled={isBtnDisabled} />
                </form>}

            {isThankyouPageVisible && <Thankyou onGoToDashboard={comeFromThankPageHandler} />}

        </>
    )
};

export default Product;