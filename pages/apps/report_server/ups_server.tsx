'use client'
import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import FormMonitoringRuangServer from "@/components/report_ruang_server/FormMonitoringRuangServer";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const Ruang_Server = () => {
    const [Token,setToken] = useState('')
    const { t, i18n } = useTranslation()
    
    useEffect(() => {
        var key = GetToken()
        setToken(key)
        
    });
    return(
        <>
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>{t('Report')}</li>
                <Link href="/apps/report_ruang_server/UPSServer/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>{t('Server Room')} / {t('UPSServer')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringRuangServer IDReport="Report UPS Server" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromSNMP/GetDeviceInfo/:GetUpsServer?Token=${Token}`} 
                                    device={"UPS"}
                                    />
        </>
    )
};

export default Ruang_Server;