import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './ColumnChart.css';
import { generateColorArray } from '../../Service/Common';

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
                colors: '#fff',  // Change to any color you prefer
                useSeriesColors: false // Set to false unless you want the legend colors to match the series colors
            },
            fontSize: '12px',
            fontWeight: 400,
            markers: {
                //fillColors: ['red', 'blue', 'yellow'] // Optionally change marker colors if needed
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
            style: { fontWeight: 500, color: '#fff', fontSize: 12 },
            offsetY: 15 // Adds 5 pixels of space above the title
        },
        grid: {
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
                {/* <ReactApexChart options={{ chart: { parentHeightOffset: 30 } }} series={series} type={'bar'} width={'50%'} height={350} /> */}
            </div>
        </>
    );
};

export default ColumnChart;