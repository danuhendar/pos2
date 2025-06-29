'use client'
import React, { Fragment, useEffect, useRef, useState } from "react";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import IconX from "../Icon/IconX";

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

interface AlertComponentProps{
   in_icon:any,
   in_info_header:string,
   in_info_detail:string,
   in_style_alert:any
}

const AlertComponent: React.FC<AlertComponentProps> = ({in_icon,in_info_header,in_info_detail,in_style_alert}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode); 

    return ( <>
            {/* "relative flex items-center border p-3.5 rounded text-success bg-success-light border-success ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-success-dark-light" */}
            <div className={in_style_alert}>
                <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                    {in_icon}
                </span>
                <span className="ltr:pr-2 rtl:pl-2">
                    <strong className="ltr:mr-1 rtl:ml-1">{in_info_header}</strong>{in_info_detail}
                </span>
                <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                    <IconX />
                </button>
            </div>
        </>
    )
}

export default AlertComponent;