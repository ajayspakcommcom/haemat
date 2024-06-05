import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './PieChart.css';

const PieChart = (props) => {

    const series = [30, 40, 15, 15];

    const options = {
        chart: {
            zoom: {
                enabled: false
            },
            events: {
                click: function (event, chartContext, { seriesIndex, dataPointIndex, config }) {
                    console.log('Events:', event);
                }
            }
        },
        labels: ['North Zone', 'South Zone', 'East Zone', 'West Zone'],
        title: {
            text: 'Zone Wise Doctors And Patients',
            align: 'center',
            style: { fontWeight: 500, color: '#8c8c8c', fontSize: 12 }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    return (
        <>
            <div id="chart">
                <ReactApexChart options={options} series={series} type={'pie'} width={'100%'} height={500} />
            </div>
        </>
    );
};

export default PieChart;