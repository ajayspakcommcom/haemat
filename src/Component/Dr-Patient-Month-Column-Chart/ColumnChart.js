import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { generateColorArray } from '../../Service/Common';
import './ColumnChart.css';

const ColumnChart = (props) => {

    const series = [
        {
            name: 'No Of Patients',
            data: [5, 10, 3, 6, 1, 5, 3, 5, 3, 1, 3, 10]
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
            dropShadow: {
                enabled: true
            }
        },

        colors: ['#feb019'],

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
            width: 1,
            colors: ['pink']
        },
        title: {
            text: 'Drs With Patient (Month On Month)',
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
            </div>
        </>
    );
};

export default ColumnChart;