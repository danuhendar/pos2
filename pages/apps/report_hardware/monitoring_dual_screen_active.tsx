'use client'

import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import React from "react";
import FormMonitoringDualScreenAktif from "@/components/report_hardware/FormMonitoringDualScreeenAktif";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const monitoring_dual_screen_active = () => {
    const [Token,setToken] = useState('')
    const { t, i18n } = useTranslation()
    ;
    useEffect(() => {
        var key = GetToken()
        setToken(key)
        
    });
    return(
        <>
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                 <li>{t('Report')}</li>
                <Link href="/apps/report_hardware/monitoring_dual_screen_active/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Dual Screeen Active Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringDualScreenAktif IDReport="Report Monitoring Dual Screen Aktif" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                                    command={"%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorBasicDisplayParams | ForEach-Object { $_ | Add-Member -MemberType NoteProperty -Name \"ComputerName\" -Value $env:COMPUTERNAME -PassThru } | ConvertTo-Csv -NoTypeInformation | Select -Skip 1\""}
                                    />
        </>
    )
};

export default monitoring_dual_screen_active;