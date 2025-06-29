'use client'
import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import React from "react";
import FormMonitoring_PrinterScanner from "@/components/report_hardware/FormMonitoring_PrinterScanner";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const Monitoring_PrinterScanner = () => {
    const [Token,setToken] = useState('')
    const { t, i18n } = useTranslation()
    ;
    useEffect(() => {
       var key = GetToken()
       setToken(key)
       ;
    });
    return(
        <>
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                 <li>{t('Report')}</li>
                <Link href="/apps/report_hardware/monitoring_scanner/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Scanner Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoring_PrinterScanner IDReport="Report Monitoring Scanner" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`} 
                                    command={"%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"Get-PnpDevice -Class BarcodeScanner | Select-Object -Property FriendlyName, InstanceId, Status|Where-Object Status -eq 'OK'|ConvertTo-Csv -NoTypeInformation|Select -Skip 1|Out-String\""}
                                    />
        </>
    )
};

export default Monitoring_PrinterScanner;