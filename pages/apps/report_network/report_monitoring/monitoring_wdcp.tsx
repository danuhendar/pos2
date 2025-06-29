'use client'

import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import FormReportMonitoringWDCP from "@/components/report_network/FormReportMonitoringWDCP";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const Report_Device = () => {
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
                {t('Report')} {t('Network')} / {t('Report')} {t('Monitoring')}
                </li>
                <Link href="apps/report_network/report_monitoring/monitoring_wdcp" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('WDCP Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormReportMonitoringWDCP IDReport="Monitoring WDCP" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromRouter/Report/:MonitoringWDCP?Token=${Token}`} 
                                    station={"RBWDCP"} />
        </>
    )
};

export default Report_Device;