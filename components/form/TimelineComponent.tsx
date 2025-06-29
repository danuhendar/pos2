'use client'
import React, { Fragment, useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridColumnGroupingModel, GridEventListener, GridToolbar, GridValueGetter } from '@mui/x-data-grid';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import IconHome from "../Icon/IconHome";
import IconArchive from "../Icon/IconArchive";
import IconBox from "../Icon/IconBox";
import IconEdit from "../Icon/IconEdit";
import IconChecks from "../Icon/IconChecks";
import IconThumbUp from "../Icon/IconThumbUp";

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

interface TimelineComponentProps{
    in_data:any,
}

const TimelineComponent: React.FC<TimelineComponentProps> = ({in_data}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode); 
const [activeStepProgress, setactiveStepProgress] = useState<any>(1);
    return ( <>
            <div>
                <label>List Approval</label>
                <div className="mb-1">
                    <div className="max-w-[900px] mx-auto">
                        {/* RECORD */}
                        {
                            Object.keys(in_data).map(
                                (key, i) => (
                                    <>
                                    <div key={i} className="flex">
                                        <p className="text-[#3b3f5c] dark:text-white-light min-w-[58px] max-w-[100px] text-xs font-semibold py-2.5">{in_data[i].CREATE_DATE}</p>
                                        {
                                            i === 0 ? <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-danger before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-danger after:rounded-full"></div>
                                            :
                                            i === 1 ? <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-warning before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-warning after:rounded-full"></div> 
                                            :
                                            i === 2 ? <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-primary before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-primary after:rounded-full"></div> 
                                            :
                                            i === 3 ? <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-success before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-success after:rounded-full"></div>
                                            :
                                            <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-info before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-info after:rounded-full"></div> 
                                        }
                                        <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                            <p className="text-[#3b3f5c] dark:text-[#e95f2b] font-semibold text-[10px]">{in_data[i].NOTE}</p>
                                            <p className="dark:text-white-light text-white-dark text-[10px] font-bold self-center min-w-[100px] max-w-[100px]">{in_data[i].OTORISATOR}</p>
                                        </div>
                                    </div>
                                    </>
                                )
                            )
                        }
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default TimelineComponent;