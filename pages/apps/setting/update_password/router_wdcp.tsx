'use client'

import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconUser from '@/components/Icon/IconUser';
import Select, { OptionsOrGroups } from 'react-select';
import Swal from "sweetalert2";

import { DataGrid, GridColDef, GridToolbar, GridValueGetter,GridRowsProp, GridRowSpacingParams } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IRootState } from "@/store";
import React from "react";
import FormPassword from "@/components/setting/FormPassword";
import { useTranslation } from "react-i18next";

//-- component menu --//
const Router_Koneksi = () => {
    const options8 = [
        {value:'RBWDCP',label:'RBWDCP'}
    ];
    const { t, i18n } = useTranslation();
    return(
        <>
            
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
               <li>{t('Setting')}</li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                {t('Update Password')}
                </li>
                <Link href="/apps/setting/router_wdcp/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Router WDCP</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormPassword IDReport="Master Data Router WDCP" target={options8} jenis={'API Router'} />
        </>
    )
};

export default Router_Koneksi;