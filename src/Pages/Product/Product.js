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
import revugam25 from '../../Content/img/med/revugam-25.png';
import thymogam from '../../Content/img/med/thymogam.png';
import { formatDate, getEmpId } from '../../Service/Common';
import LoginContext from '../../Context/Login/LoginContext';
import Thankyou from '../Thankyou.js/Thankyou';
import configData from '../../Config/Config.json';
import { InputNumber } from 'primereact/inputnumber';
import Loader from '../../Component/Loader/Loader';
import { v4 as uuid } from 'uuid';



const Product = () => {

    const ctx = useContext(ProductContext);
    const loginContext = useContext(LoginContext);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isThankyouPageVisible, setIsThankyouPageVisible] = useState(false);
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);

    const entry_id = uuid();


    const params = useParams();

    const [brands, setBrands] = useState([]);

    //const url = `${configData.SERVER_URL}/getdoctordetails/${params.id}`;

    const url = `${configData.SERVER_URL}/home/kamdocdetail/${params.id}`;

    const [paramData, setParamData] = useState(params);
    const [drData, setDrData] = useState({});
    const [doctorList, setDoctorList] = useState(null);


    const [date, setDate] = useState(null);
    const [noOfPatient, setNoOfPatient] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [brandImgList, setBrandImgList] = useState([]);

    const [inputFields, setInputFields] = useState([]);
    const [papInputFields, papSetInputFields] = useState([]);


    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const papHandleFormChange = (index, event) => {
        let data = [...papInputFields];
        data[index][event.target.name] = event.target.value;
        papSetInputFields(data);
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

            const previousData = [...prevState];

            let inputField = _selectedBrands.map((item) => {
                return { name: '', key: item.key, placeholder: +item.key === 37 ? 'Total Vials for Thymogam' : +item.key === 36 ? 'Total Strips for Revugam' : +item.key === 38 ? 'Total Strips for 25 Revugam' : 'Total Strips for Oncyclo' }
            });

            inputField.forEach((inputItem) => {
                previousData.forEach((prevItem) => {
                    if (prevItem.key === inputItem.key) {
                        inputItem.name = prevItem.name;
                    } else {
                        inputItem.name = inputItem.name;
                    }
                });
            });

            return [...inputField];
        });



        papSetInputFields((prevState) => {

            const previousData = [...prevState];

            let papInputField = _selectedBrands.map((item) => {
                return { name: '', key: item.key, placeholder: +item.key === 37 ? 'Vials for Pap Thymogam' : +item.key === 36 ? 'Strips for Pap Revugam' : +item.key === 38 ? 'Strips for Pap 25 Revugam' : 'Strips for Pap Oncyclo' }
            });

            papInputField.forEach((inputItem) => {
                previousData.forEach((prevItem) => {
                    if (prevItem.key === inputItem.key) {
                        inputItem.name = prevItem.name;
                    } else {
                        inputItem.name = inputItem.name;
                    }
                });
            });

            console.log(papInputField);

            return [...papInputField];
        });

    };



    useEffect(() => {

        axios.post(url).then(async (resp) => {

            console.log(resp);

            setDrData(resp.data.Data);

            //let imgList = [{ name: "oncyclo", url: oncyclo }, { name: "revugam", url: revugam }, { name: "thymogam", url: thymogam }];
            let imgList = [{ name: "oncyclo", url: oncyclo }, { name: "revugam", url: revugam }, { name: "revugam25", url: revugam25 }, { name: "thymogam", url: thymogam }];



            async function fetchDataAsync() {
                return new Promise((resolve, reject) => {
                    //axios.post('http://160.153.155.222/plesk-site-preview/api.haemat.com/api/home/kammedicinelist').then((data) => resolve(data.data.Data));
                    axios.post(`${configData.SERVER_URL}/home/kammedicinelist`).then((data) => resolve(data.data.Data));
                });
            }

            let brandListData = await fetchDataAsync();

            let brandList = brandListData.map((item) => {
                return { key: item.medID };
            });

            // brandList = resp.data[1].map((item) => {
            //     return { key: item.medID };
            // });

            console.log(imgList);
            console.log(brandList);

            // if (paramData.actionName === 'itp') {
            //     imgList = imgList.filter(item => item.name === 'revugam');
            //     imgList[0].url = revugam25;
            //     brandList = brandList.filter(item => item.key === 36);
            // }


            if (paramData.actionName === 'itp') {
                imgList = imgList.filter(item => item.name === 'revugam' || item.name === 'revugam25');
                brandList = brandList.filter(item => item.key === 36 || item.key === 38);
            } else if (paramData.actionName === 'aa') {
                imgList = imgList.filter(item => item.name !== 'revugam25');
                brandList = brandList.filter(item => item.key !== 38);
            } else {
                console.log('tdr');
                imgList = imgList.filter(item => item.name !== 'revugam25');
                brandList = brandList.filter(item => item.key !== 38);

                setInputFields([{ "name": "", "key": 37, "placeholder": "Total Vials for Thymogam" }, { "name": "", "key": 36, "placeholder": "Total Strips for Revugam" }, { "name": "", "key": 35, "placeholder": "Total Strips for Oncyclo" }]);
                papSetInputFields([{ "name": "", "key": 37, "placeholder": "Vials for Pap Thymogam" }, { "name": "", "key": 36, "placeholder": "Strips for Pap Revugam" }, { "name": "", "key": 35, "placeholder": "Strips for Pap Oncyclo" }]);

            }

            setBrandImgList(imgList.reverse());
            setBrands(brandList.reverse());
            setIsLoaderVisible(false);

        }).catch((err) => {
            console.log(err)
        });




    }, []);

    const saveData = (e) => {
        e.preventDefault();


        let medicineData = inputFields, drId = params.id, empId = loginContext.userData.empId ? loginContext.userData.empId : getEmpId(), endPoints = [], papMedicineData = papInputFields;

        console.log(medicineData);
        console.log(papMedicineData);

        if (!date) {
            alert('Please select the date');
            return;
        }

        console.log(noOfPatient)

        if (noOfPatient === null) {
            alert('Please fill no of Patients');
            return;
        }

        medicineData.forEach((item, indx) => {
            let papVal;
            papMedicineData.forEach((papItem) => {
                if (item.key === papItem.key) {
                    papVal = papItem.name;
                }
            });

            let itemObj = {
                doctorId: +drId,
                empID: +empId,
                medId: +item.key,
                orderDate: date,
                NoOfVials: +item.key === 37 ? +item.name : -1,
                NoOfStrips: +item.key !== 37 ? +item.name : 0,
                NoOfPatients: +noOfPatient,
                papValue: +papVal,
                indication: paramData.actionName,
                EntryID: entry_id
            };
            endPoints.push(itemObj);
        });

        const entryDate = endPoints[0].orderDate.getDate();

        endPoints.map((item) => {
            // item.orderDate = new Date(item.orderDate.setDate(entryDate)).toISOString().split('T')[0];
            // item.orderDate = new Date(item.orderDate).toISOString().split('T')[0];
            item.orderDate = formatDate(item.orderDate);
            return item;
        });

        setIsBtnDisabled(true);
        setIsLoaderVisible(true);

        Promise.all(endPoints.map((endpoint) => axios.post(`${configData.SERVER_URL}/home/KamAddOrder`, endpoint))).then(
            axios.spread((...allData) => {
                console.log({ allData });
                setIsBtnDisabled(false);
                setIsThankyouPageVisible(true);
                setIsLoaderVisible(false);
            })
        );

    };

    const comeFromThankPageHandler = () => {
        setIsThankyouPageVisible(false);
    };

    return (
        <>
            {isLoaderVisible && <Loader />}
            <div className='card p-3 product-wrapper'>
                <div className='product-header'>

                    <div className='content'>
                        <h2>{paramData.actionName === 'tdr' ? 'TDR' : paramData.actionName === 'aa' ? 'Aplastic Anaemia' : 'Immune Thrombocytopenic Purpura'}</h2>
                        <Divider />
                        <h3>About</h3>
                        <table id='table-header'>
                            <thead>
                                <tr>
                                    <th>Customer Code</th>
                                    <th>Doctor Name</th>
                                    <th>Speciality</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Hospital Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{drData.customerCode ? drData.customerCode : '-NA-'}</td>
                                    <td>{drData.doctorName ? drData.doctorName : '-NA-'}</td>
                                    <td>{drData.specialtyName ? drData.specialtyName : '-NA-'}</td>
                                    <td>{drData.cityName ? drData.cityName : '-NA-'}</td>
                                    <td>{drData.StateName ? drData.StateName : '-NA-'}</td>
                                    <td>{drData.hospitalName ? drData.hospitalName : '-NA-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Divider />

            {!isThankyouPageVisible &&
                <form className='product-form' onSubmit={saveData}>
                    <h2>Please fill the data</h2>

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
                                    {paramData.actionName !== 'tdr' && <Checkbox inputId={brand.key} name="brand" value={brand} onChange={onBrandChange} checked={selectedBrands.some((item) => item.key === brand.key)} />}
                                    {paramData.actionName === 'tdr' && <Checkbox inputId={brand.key} name="brand" value={brand} checked={true} disabled />}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-content-start input-feild-wrapper">
                        {inputFields.map((input, index) => {
                            return (
                                <>
                                    <div key={index} id={input.key}>
                                        <InputText type='number' name='name' placeholder={input.placeholder} value={input.name} onChange={event => handleFormChange(index, event)} />
                                    </div>
                                </>
                            )
                        })}
                    </div>

                    <div className="flex justify-content-start input-feild-wrapper">
                        {papInputFields.map((input, index) => {
                            return (
                                <>
                                    <div key={Math.random()} id={'pap-' + input.key}>
                                        <InputText type='number' name='name' placeholder={input.placeholder} value={input.name} onChange={event => papHandleFormChange(index, event)} />
                                    </div>
                                </>
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