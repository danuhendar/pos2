'use client'

import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid, GridColDef, GridToolbar, GridValueGetter,GridRowsProp, GridRowSpacingParams } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IRootState } from "@/store";
import { Posts } from "@/lib/post";
import React from "react";
import FormPassword from "@/components/setting/FormPassword";
import { useTranslation } from "react-i18next";

//-- component menu --//
const Router_Koneksi = () => {
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

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const { t, i18n } = useTranslation();
    const options8 = [
        {value:'RBKONEKSI',label:'RBKONEKSI'}
    ];
    return(
        <>
            
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
               <li>{t('Setting')}</li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    {t('Update Password')}
                </li>
                <Link href="/apps/setting/router_koneksi/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Router Connection')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormPassword IDReport="Data Router Koneksi" target={options8} jenis={'API Router'} />
        </>
    )
};

export default Router_Koneksi;