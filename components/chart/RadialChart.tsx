'úse client'
import React, { useState,Component } from "react";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import dynamic from "next/dynamic";
import IconBook from "../Icon/IconBook";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface RadialChartProps{
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

const RadialChart: React.FC<RadialChartProps> = ({data_labels,data_series,data_judul,data_height,ISMount}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

const multiChart: any = {
        series: data_series,
        options: {
            chart: {
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                hollow: {
                    size: '70',
                }
                },
            },
            labels: data_labels,
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

export default RadialChart;