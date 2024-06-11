import React from 'react';
import './ZonePerformanceByBrand.scss';
import ZonePerformanceByBrandItem from './ZonePerformanceByBrandItem';


const ZonePerformanceByBrand = (props) => {
    return (
        <div className="grid">

            <ZonePerformanceByBrandItem
                zoneName="North"
                performer="Manish"
                numOfPatients={98}
                brand="Thymogam"
                pap={23}
            />

            <ZonePerformanceByBrandItem
                zoneName="East"
                performer="Manish"
                numOfPatients={75}
                brand="Revugam 50"
                pap={21}
            />

            <ZonePerformanceByBrandItem
                zoneName="South"
                performer="Sanjay Dubey"
                numOfPatients={58}
                brand="Revugam 25"
                pap={18}
            />

            <ZonePerformanceByBrandItem
                zoneName="West"
                performer="Sanjay Dubey"
                numOfPatients={45}
                brand="Oncyclo"
                pap={15}
            />

        </div>
    );
};

export default React.memo(ZonePerformanceByBrand);
