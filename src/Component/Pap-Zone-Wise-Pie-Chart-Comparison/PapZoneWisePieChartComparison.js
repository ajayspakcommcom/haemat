import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { generateColorArray } from '../../Service/Common';
import './PapZoneWisePieChartComparison.css';
import { Brand, Zone, ChartBackground } from '../../Service/AppConstants';

const PapZoneWisePieChartComparison = (props) => {

    const series = [30, 40, 15, 15];

    const options = {
        chart: {
            zoom: {
                enabled: false
            },
            events: {
                click: function (event, chartContext, { seriesIndex, dataPointIndex, config }) {

                    // console.clear();
                    // console.log('Events:', event);
                    // console.log('chartContext:', chartContext);
                    // console.log('seriesIndex:', seriesIndex);
                    // console.log('dataPointIndex:', dataPointIndex);
                    // console.log('config:', config);
                    //const selectedValue = config.series[seriesIndex][dataPointIndex];

                    console.log("config:", config);
                    console.log("config:", seriesIndex);
                    console.log("selectedValue:", config.series[dataPointIndex]);
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
                colors: '#fff',
                useSeriesColors: false
            },
            fontSize: '12px',
            fontWeight: 400,
            markers: {
                //fillColors: ['red', 'blue', 'yellow'] // Optionally change marker colors if needed
            }
        },
        labels: [Zone.North, Zone.East, Zone.South, Zone.West],
        // colors: ["#447b40", "#cc7870", "#e74ce4"],
        title: {
            text: 'Pap Value Zone Wise',
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
        }],
        plotOptions: {
            pie: {
                startAngle: 0,
                offsetX: 0,
                offsetY: 15,
            }
        }
    };

    return (
        <>
            <div id="chart">
                <ReactApexChart options={options} series={series} type={'pie'} width={'100%'} height={418} />
            </div>
        </>
    );
};

export default React.memo(PapZoneWisePieChartComparison);