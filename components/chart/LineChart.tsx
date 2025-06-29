'úse client'
import React, { useState,Component } from "react";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface LineChartProps{
    in_icon:any,
    in_name:string,
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

const LineChart: React.FC<LineChartProps> = ({in_icon,in_name,data_labels,data_series,data_color,data_options,data_judul,data_width_chart,data_type_chart,ISMount}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const barChart: any = {
        series: [
            {
                name: in_name,
                data:data_series,
            },
        ],
        options: {
            chart: {
                height: 500,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: '',
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: data_labels,
              }
        },
    };



return (
    <>
        {
            ISMount ? 

                <div className="mb-3 panel  bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex item-center font-semibold">   
                            {in_icon}
                            <h2 className="text-dark ml-1 text-center text-1xl dark:text-white-light">{data_judul}</h2>
                        </div>
                      
                    </div>
                    <div className="mb-5">
                        <ReactApexChart series={barChart.series} options={barChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="line" width={data_width_chart} height={190} />
                    </div>
                  
                </div>
            : ''
        }
    </>
   
  );
}

export default LineChart;