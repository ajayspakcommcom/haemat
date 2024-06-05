import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './ColumnChart.css';

const ColumnChart = (props) => {

    const series = [{
        name: 'No Of Patients',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 80, 66, 78]
    },
    {
        name: 'No Of Vials',
        data: [76, 85, 99, 98, 87, 78, 91, 89, 94, 63, 35, 74]
    },
    {
        name: 'No Of Pap',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 78, 45, 89]
    }];

    const options = {
        chart: {
            zoom: {
                enabled: false
            },
            events: {
                click: function (event, chartContext, { seriesIndex, dataPointIndex, config }) {
                    console.log('Events:', event);
                    console.log('chartContext:', chartContext);
                    console.log('seriesIndex:', seriesIndex);
                    console.log('dataPointIndex:', dataPointIndex);
                    console.log('config:', config);
                    //console.log(`Clicked on series: ${config.series[series - 1].name}, data point index: ${dataPointIndex}, value: ${config.series[seriesIndex].data[dataPointIndex]}`);
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        title: {
            text: 'Drs Wise Patients And Progress (Monthly)',
            align: 'center',
            style: { fontWeight: 500, color: '#8c8c8c', fontSize: 12 }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
            title: {
                text: ''
            },
            tickAmount: 10,
            min: 0,
            max: 100
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return " " + val
                }
            }
        }
    };

    return (
        <>
            <div id="chart">
                <ReactApexChart options={options} series={series} type={'bar'} width={'100%'} height={400} />
                {/* <ReactApexChart options={{ title: { style: {  } } }} series={series} type={'bar'} width={'50%'} height={350} /> */}
            </div>
        </>
    );
};

export default ColumnChart;