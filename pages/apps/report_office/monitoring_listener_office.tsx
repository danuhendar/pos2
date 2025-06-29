'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import FormMonitoringListenerOffice from "@/components/report_office/FormMonitoringListenerOffice";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const MonitoringListenerOffice = () => {
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
                 <li>{t('Report')}</li>
                <Link href="/apps/report_office/monitoring_listener_office/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Listener Office Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringListenerOffice IDReport="Report Monitoring Listener Office" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromOffice?Token=${Token}`}
                                    command={"powershell.exe -Command \"$status=Get-Service | Where-Object {$_.Name -eq 'AgentIDMService'} | Select-Object Status |Format-Table -HideTableHeaders|Out-String;$path=Get-WmiObject -Class Win32_Service -Filter \\\"Name = 'AgentIDMService'\\\" | Select-Object PathName|Format-Table -HideTableHeaders|Out-String;$p1='C:\\Program Files (x86)\\IDMListenerOffice\\';$p2='C:\\Program Files\\IDMListenerOffice\\';$rp='';$exe_service='';$exe_tray='';$pathEx1=Test-Path -Path $p1;if($pathEx1){$rp=$p1;$exe_service=-join($p1,'AgentIDMService.exe');$exe_tray=-join($p1,'IDMListenerOffice.exe');}else{$rp=$p2;$exe_service=-join($p2,'AgentIDMService.exe');$exe_tray=-join($p2,'IDMListenerOffice.exe');}$res_versi_service=(Get-Item $exe_service).VersionInfo.FileVersion;$res_versi_tray=(Get-Item $exe_tray).VersionInfo.FileVersion;Write-Host ''$status.ToUpper().Trim()' | '$path.Trim()' | '$res_versi_service' | '$res_versi_tray;exit;\""}
                                    />
        </>
    )
};

export default MonitoringListenerOffice;