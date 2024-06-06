import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { generateColorArray } from '../../Service/Common';
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
            dropShadow: {
                enabled: true
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetX: 10,
            offsetY: -5,
            labels: {
                colors: '#fff',
                useSeriesColors: false
            },
            fontSize: '12px',
            fontWeight: 400,
            markers: {
                //fillColors: ['red', 'blue', 'yellow'] // Optionally change marker colors if needed
            }
        },
        labels: ['North Zone', 'South Zone', 'East Zone', 'West Zone'],
        // colors: ["#447b40", "#cc7870", "#e74ce4"],
        title: {
            text: 'Zone Wise Doctors And Patients',
            align: 'center',
            style: { fontWeight: 500, color: '#fff', fontSize: 12, marginBottom: '15px' },
            offsetY: 15
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#fff', // Change label color
                    fontSize: '14px' // Change label font size
                }
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
                {/* <ReactApexChart options={{ legend: {} }} series={series} type={'pie'} width={'100%'} height={400} /> */}
            </div>
        </>
    );
};

export default PieChart;