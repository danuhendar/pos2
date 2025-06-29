'use client'

import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import React from "react";
import FormMonitoringResources from "@/components/report_software/FormMonitoringResources";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";

//-- component menu --//
const monitoring_pos_replikasi = () => {
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
                <Link href="/apps/report_software/monitoring_pos_replikasi/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('MysqlForPosNet Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringResources IDReport="Report Monitoring POS Replikasi" 
                                    IS_Induk={"1"}
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                                    command={"%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"try{$serviceName = 'captunetsvc';if (Get-Service | Where-Object { $_.Name -eq $serviceName }) {$service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue|Select-Object Status|ft -HideTableHeaders|Out-String;$hasil=-join($service.Trim().ToUpper(),'|');$hasil;} else {Write-Host 'Service does NOT exist.|';}}catch{Write-Host 'Error Get Service|'}\""}
                                    />
        </>
    )
};

export default monitoring_pos_replikasi;