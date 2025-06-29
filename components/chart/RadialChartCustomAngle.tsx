'úse client'
import React, { useState,Component } from "react";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import dynamic from "next/dynamic";
import IconBook from "../Icon/IconBook";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface RadialChartCustomAngleProps{
    data_labels: any,
    data_series: any,
    data_judul: string,
    data_height:number,
    ISMount:boolean,
}



const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
});

const RadialChartCustomAngle: React.FC<RadialChartCustomAngleProps> = ({data_labels,data_series,data_judul,data_height,ISMount}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

const multiChart: any = {
        series: [76, 67, 61, 90],
        options: {
        chart: {
            height: 390,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
                margin: 5,
                size: '20%',
                background: 'transparent',
                image: undefined,
            },
            dataLabels: {
                name: {
                show: false,
                },
                value: {
                show: false,
                }
            }
            }
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        legend: {
            show: true,
            floating: true,
            fontSize: '10px',
            position: 'right',
            offsetX: 160,
            offsetY: 10,
            labels: {
            useSeriesColors: true,
            },
            markers: {
            size: 0
            },
            formatter: function(seriesName: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
            vertical: 3
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
            legend: {
                show: false
            }
            }
        }]
        },
    
    
        
    };



return (
    <>
        {
            ISMount ? 
                    <div className="mb-5">
                        <ReactApexChart options={multiChart.options} series={multiChart.series} type="radialBar" height={data_height} />
                    </div>
                  
                
            : ''
        }
    </>
   
  );
}

export default RadialChartCustomAngle;