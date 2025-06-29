'use client'

import Link from "next/link";
import { useEffect, useState} from 'react';
import React from "react";
import FormRouter from "@/components/report_network/FormRouter";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const Router_Koneksi = () => {
    const [Token,setToken] = useState('')
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        var key = GetToken()
        setToken(key)
        
    });
    return(
        <>
            
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    {t('Report')} {t('Network')}
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('OS Router Version')}</span>
                </li>
                <Link href="/apps/report_network/versi_os_router/router_wdcp/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Connection Router')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormRouter IDReport="Report Versi OS Router Koneksi" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromRouter/GetRouterOS?Token=${Token}`}
                                    station={"RBKONEKSI"} />
        </>
    )
};

export default Router_Koneksi;