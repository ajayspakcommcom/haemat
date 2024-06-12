import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { generateColorArray } from '../../Service/Common';
import './LineChart.css';
import { ChartBackground } from '../../Service/AppConstants';

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
            },
            background: ChartBackground,
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
                colors: '#fff',  // Change to any color you prefer
                useSeriesColors: false // Set to false unless you want the legend colors to match the series colors
            },
            fontSize: '12px',
            fontWeight: 400,
            markers: {
                //fillColors: ['red', 'blue', 'yellow'] // Optionally change marker colors if needed
            }
        },

        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            colors: '#feb019'
        },
        title: {
            text: 'Pap Value for Doctor',
            align: 'center',
            style: { fontWeight: 500, color: '#fff', fontSize: 12 },
            offsetY: 15
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
            xaxis: {
                lines: {
                    show: false // This will hide the x-axis lines across the chart
                }
            },
            yaxis: {
                lines: {
                    show: false // This will hide the y-axis lines across the chart
                }
            },
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: {
                    colors: [...generateColorArray(12, '#fff')],
                    fontSize: '12px',
                },
                offsetX: 0,
                offsetY: 0,
            }
        },
        yaxis: {
            title: {
                text: ''
            },
            tickAmount: 10,
            min: 0,
            max: 100,
            labels: {
                style: {
                    colors: ['#ffffff'],
                    fontSize: '12px',
                },
                offsetX: 0
            }
        },
    };

    return (
        <>
            <div id="chart">
                <ReactApexChart options={options} series={series} width={'100%'} height={400} />
            </div>
        </>
    );
};

export default LineChart;
