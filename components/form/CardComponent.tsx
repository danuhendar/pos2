'use client'
import React, { Fragment, useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridColumnGroupingModel, GridEventListener, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

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
    in_style_card:string,
    in_content:any,
    in_judul:string
}

const CardComponent: React.FC<CardComponentProps> = ({in_style_font_judul,in_icon,in_style_card,in_content,in_judul}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode); 
const { t, i18n } = useTranslation();
    return ( <>
            <div className={in_style_card}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex font-semibold item-center">   
                        {in_icon}
                        <h2 className={in_style_font_judul}>&nbsp;{t(in_judul)}</h2>
                    </div>
                
                </div>
                {in_content}
            </div>
        </>
    )
}

export default CardComponent;
