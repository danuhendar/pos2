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
import { Posts } from "@/lib/post";
import React from "react";
import FormWhitelistIP from "@/components/setting/FormWhitelistIP";
import config from '@/lib/config.json';
import { useTranslation } from "react-i18next";
//-- component menu --//
const Whitelist_ip = () => {
    const [tabs, setTabs] = useState<string>('data_tokomain');
    const [loading, setLoading] = useState(false);
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [active, setActive] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    const [data_rows,setData_rows] = useState([]);
    const [modal13, setModal13] = useState(false);
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

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
     
    const options8 = [
        {value:'PC',label:'PC'},
        {value:'PC IKIOS',label:'PC IKIOS'},
    ];

    const [IN_HOST, setHOST] = useState('');
    const { t, i18n } = useTranslation();
    useEffect(() => {
        var rconfig = JSON.stringify(config);
       
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME_WS;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;
        //const res_host = (config.api as any).HOSTNAME;
        setHOST(res_host);
    });

    return(
        <>
            
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
               <li>{t('Setting')}</li>
                <Link href="/apps/dashboard/whitelist_ip/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> {t('Whitelist IP')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormWhitelistIP IDReport="Whitelist IP" 
                                    url={`http://${IN_HOST}:7321/v1/GetsegmentIPWhitelist`} 
                                    command={""}
                                    />
        </>
    )
};

export default Whitelist_ip;