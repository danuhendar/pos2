'úse client'
import React, { useState,Component } from "react";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import dynamic from "next/dynamic";
import IconBook from "../Icon/IconBook";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });




interface BarChartProps{
    data_labels: any,
    data_series: any,
    data_color:any,
    data_options:any,
    data_judul: string,
    data_width_chart:number,
    data_type_chart:string,
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

const BarChart: React.FC<BarChartProps> = ({data_labels,data_series,data_color,data_options,data_judul,data_width_chart,data_type_chart,ISMount}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const barChart: any = {
        series: [
            {
                name: 'Versi',
                data:data_series,
            },
        ],
        options: {
            dataLabels: {
                enabled: false,
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: data_color,
            xaxis: {
                categories: data_labels,
                axisBorder: {
                    color: isDark ? '#3b3f5c' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: false,
                reversed: false,
            },
            grid: {
                borderColor: isDark ? '#3b3f5c' : '#e0e6ed',
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 3,
                    barHeight: '70%'
                },
            },
            fill: {
                opacity: 0.8,
            },
        },
    };



return (
    <>
        {
            ISMount ? 

                <div className="mb-3 panel  bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex item-center font-semibold">   
                            <IconBook />
                            <h2 className="text-dark ml-1 text-center text-1xl dark:text-white-light">{data_judul}</h2>
                        </div>
                      
                    </div>
                    <div className="mb-5">
                        <ReactApexChart series={barChart.series} options={barChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="bar" width={data_width_chart} height={190} />
                    </div>
                  
                </div>
            : ''
        }
    </>
   
  );
}

export default BarChart;