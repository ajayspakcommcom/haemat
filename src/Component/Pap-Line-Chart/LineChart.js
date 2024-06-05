import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './LineChart.css';

const LineChart = (props) => {

    const series = [{
        name: "Patients",
        data: [20, 5, 2, 3, 6, 15, 11, 14, 9, 7, 3, 5]
    }];

    const options = {
        chart: {
            height: 350,
            type: 'line',
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
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Pap Value for Doctor',
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
    };

    return (
        <>
            <div id="chart">
                <ReactApexChart options={options} series={series} width={'100%'} height={500} />
            </div>
        </>
    );
};

export default LineChart;
