import React from 'react';
import './ZonePerformanceByKam.scss';

const ZonePerformanceByKam = ({ zoneName, performer, numOfPatients, brand, pap }) => {
    return (
        <div className="col-3">
            <div className={`top-performer-wrapper ${zoneName.toLowerCase()}`}>
                <table>
                    <thead>
                        <tr>
                            <th><b>Zone</b></th>
                            <th>{zoneName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Kam</td>
                            <td>{performer}</td>
                        </tr>
                        <tr>
                            <td>No Of Patients</td>
                            <td>{numOfPatients}</td>
                        </tr>
                        <tr>
                            <td>Brand</td>
                            <td>{brand}</td>
                        </tr>
                        <tr>
                            <td>Pap</td>
                            <td>{pap}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default React.memo(ZonePerformanceByKam);
