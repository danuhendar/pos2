'úse client'
import React, { useState,Component } from "react";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import dynamic from "next/dynamic";
import IconBook from "../Icon/IconBook";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MultiColumnsChartProps{
    in_border:boolean,
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

const MultiColumnsChart: React.FC<MultiColumnsChartProps> = ({in_border,data_labels,data_series,data_color,data_options,data_judul,data_width_chart,data_type_chart,ISMount}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
const multiChart: any = {
        series: data_series,
        options: {
            chart: {
              type: 'bar',
              height: 350,
              events: {
                dataPointSelection: (event: any, chartContext: any, config: any) => {
                  console.log(chartContext, config);
                }
              },
            },

            
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
                fontFamily:  undefined,
                color:  '#263238'
              },
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
            colors:['#008FFB','#00E396','#FEB019','#FF4560','#775DD0','#3f51b5','#03a9f4','#4caf50','#f9ce1d','#FF9800','#33b2df','#546E7A','#d4526e','#13d8aa','#A5978B'],
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories:data_labels,
            },
            yaxis: {
              title: {
                text: 'Jumlah Station'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val: string) {
                  return "" + val + "  Station"
                }
              }
            },
            legend: {
              position: 'bottom',
              horizontalAlign: 'center',
            }
        }
    };



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
                      <div className="">
                          <ReactApexChart options={multiChart.options} series={multiChart.series} type="bar" />
                      </div>
                    
                    </div>
                   
                  :
                  <ReactApexChart options={multiChart.options} series={multiChart.series} type="bar" />
                }
                </>
                
            : ''
        }
    </>
   
  );
}

export default MultiColumnsChart;