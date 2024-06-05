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
            },
            background: '#262d47',
        },
        labels: ['North Zone', 'South Zone', 'East Zone', 'West Zone'],
        title: {
            text: 'Zone Wise Doctors And Patients',
            align: 'center',
            style: { fontWeight: 500, color: '#8c8c8c', fontSize: 12 }
        },
        legend: {
            position: 'bottom', // Set the position of the legend (top, bottom, left, or right)
            horizontalAlign: 'center', // Align the legend horizontally (left, center, or right)
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 400,
            markers: {
                width: 10,
                height: 10,
            }
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
                <ReactApexChart options={options} series={series} type={'pie'} width={'100%'} height={400} />
            </div>
        </>
    );
};

export default PieChart;