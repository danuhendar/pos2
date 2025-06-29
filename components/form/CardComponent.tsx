'use client'
import React, { Fragment, useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridColumnGroupingModel, GridEventListener, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";

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

interface CardComponentProps{
    in_style_font_judul:any,
    in_icon:any,
    in_nilai:any,
    in_style_card:string,
    in_style_font_content:string,
    in_judul:string
}

const CardComponent: React.FC<CardComponentProps> = ({in_style_font_judul,in_icon,in_nilai,in_style_card,in_style_font_content,in_judul}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode); 
    
    return ( <>
            <div className={in_style_card}>
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex item-center font-semibold">   
                        {in_icon}
                        <h2 className={in_style_font_judul}>{in_judul}</h2>
                    </div>
                
                </div>
                <div className="">
                    <h2 className={in_style_font_content}>{in_nilai}</h2>
                </div>
            </div>
        </>
    )
}

export default CardComponent;
