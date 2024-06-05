import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './ColumnChart.css';

const ColumnChart = (props) => {

    const series = [
        {
            name: 'No Of Patients',
            data: [1, 2, 0, 1, 1, 3, 1, 5, 3, 1, 3, 1]
        }
    ];

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
            },
            background: '#262d47',
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
            text: 'Drs With Patient (Month On Month)',
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
                {/* <ReactApexChart options={{chart: }} series={series} type={'bar'} width={'50%'} height={350} /> */}
            </div>
        </>
    );
};

export default ColumnChart;