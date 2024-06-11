import React from 'react';
import './ZonePerformanceByKam.scss';
import ZonePerformanceByKamItem from './ZonePerformanceByKamItem';

const ZonePerformanceByKam = (props) => {
    return (
        <div className="grid">
            <ZonePerformanceByKamItem
                zoneName="North"
                performer="Manish"
                numOfPatients={98}
                brand="Thymogam"
                pap={23}
            />

            <ZonePerformanceByKamItem
                zoneName="East"
                performer="Manish"
                numOfPatients={75}
                brand="Thymogam"
                pap={21}
            />

            <ZonePerformanceByKamItem
                zoneName="South"
                performer="Sanjay Dubey"
                numOfPatients={58}
                brand="Thymogam"
                pap={18}
            />

            <ZonePerformanceByKamItem
                zoneName="West"
                performer="Sanjay Dubey"
                numOfPatients={45}
                brand="Thymogam"
                pap={15}
            />
        </div>
    );
};

export default React.memo(ZonePerformanceByKam);
