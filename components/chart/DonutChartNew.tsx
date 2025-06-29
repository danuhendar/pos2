'úse client'
import React, { useState,Component } from "react";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import dynamic from "next/dynamic";
import IconBook from "../Icon/IconBook";
const ReactApexChart  = dynamic(() => import("react-apexcharts"), { ssr: false });
// const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DonuChartProps{
    in_legend:any,
    in_border:boolean,
    data_labels: any,
    data_series: any,
    data_color:any,
    data_options:any,
    data_judul: string,
    data_width_chart:number,
    data_type_chart:any,
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

const DonutChart: React.FC<DonuChartProps> = ({in_legend,in_border,data_labels,data_series,data_color,data_options,data_judul,data_width_chart,data_type_chart,ISMount}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);


const aoption = {
    series: data_series,
            options: {
              chart: {
                type: 'donut',
              },
              responsive: [{
                breakpoint: 300,
                options: {
                  chart: {
                    width: 200
                  },
                }
              }]
    },
    labels: data_labels,//['OK','NOK CABANG INI','NOK ATTRIBUTE','NOK VERSI IDMCOMMANDLIBRARY','NOK SERVICE LISTENER','NOK VERSI SERVICE LISTENER', 'NOK VERSI LISTENER','TIMEOUT','ERROR COMMAND','NOK SUHU','NOK OSKEY'],
    colors:  data_color,
    dataLabels: {
      enabled: true
    },
    legend: in_legend,
    title: {
      text: data_judul,
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize:  '14px',
        fontWeight:  'bold',
        color:  '#263238'
      },
    },
    
};

data_options = aoption;
// console.log('data_options : '+JSON.stringify(data_options));


return (
    <>
            {
                ISMount ?
                    <> 
                    {
                      in_border ? 
                        <div className="mb-3 panel  bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                          <div className="mb-5 flex items-center justify-between">
                              <div className="flex item-center font-semibold">   
                                  <IconBook />
                                  <h2 className="text-dark ml-1 text-center text-1xl dark:text-white-light">{data_judul}</h2>
                              </div>
                          
                          </div>
                          <div className="mb-5">
                          <ReactApexChart options={data_options} series={data_series} type="donut"    />
                          </div>
                        </div>
                      :
                      <ReactApexChart options={data_options} series={data_series} type="donut" />
                    }
                    </>
                    
                    
                    : ''
            }
            
    </>
   
  );
}

export default DonutChart;