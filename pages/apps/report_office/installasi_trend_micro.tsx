'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import FormMonitoringListenerOffice from "@/components/report_office/FormMonitoringListenerOffice";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const Installasi_Trend_Micro = () => {
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
                <Link href="/apps/report_office/installasi_trendmicro/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                 <span>{t('Trend Micro Installation')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringListenerOffice IDReport="Report Installasi Trend Micro" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromOffice?Token=${Token}`}
                                    command={"powershell.exe \"$vs= $PSVersionTable.PSVersion.Major;if($vs.Equals(2)){Write-Host '2';}else{function getPathTrendMicro($serviceName){$j='';$service=Get-CimInstance -ClassName Win32_Service -Filter \\\"Name = '$serviceName'\\\";$j=$service.PathName;return $j;}function getStatusService($serviceName){$h='';$service=Get-CimInstance -ClassName Win32_Service -Filter \\\"Name = '$serviceName'\\\";if ($service.State -eq 'Running') {$h='Running';}else{$h='Stopped';}return $h;}$res_ds_agent = '';try{$res_ds_agent=getStatusService('ds_agent');}catch{$res_ds_agent = 'not found';}$res_ds_monitor = '';try{$res_ds_monitor=getStatusService('ds_monitor');}catch{$res_ds_monitor='not found';}$res_ds_notifier='';try{$res_ds_notifier=getStatusService('ds_notifier');}catch{$res_ds_notifier='not found';}$res_Amsp='';try{$res_Amsp=getStatusService('Amsp');}catch{$res_Amsp='not found';}function get(){$ws=Get-WmiObject Win32_OperatingSystem;$os=$ws.Caption;$ar=$ws.OSArchitecture;$cTot=Get-WmiObject Win32_PerfFormattedData_PerfOS_Processor|Where-Object{$_.Name -eq '_Total'};$cpr=$cTot.PercentProcessorTime;$pM=($ws.TotalVisibleMemorySize-$ws.FreePhysicalMemory)/$ws.TotalVisibleMemorySize*100;$pathTrendMicro='';$dsa_path=getPathTrendMicro('ds_agent');$dsm_path=getPathTrendMicro('ds_monitor');$dsn_path=getPathTrendMicro('ds_notifier');$amsp_path=getPathTrendMicro('Amsp');if(-not([string]::IsNullOrEmpty($dsa_path))){$pathTrendMicro=$dsa_path;}elseif(-not([string]::IsNullOrEmpty($dsm_path))){$pathTrendMicro=$dsm_path;}elseif(-not([string]::IsNullOrEmpty($dsn_path))){$pathTrendMicro=$dsn_path;}else{$pathTrendMicro=$amsp_path;}$hl=''+$os+'~'+$ar+'~'+$cpr+'~'+$pM+'~'+$pathTrendMicro+'~'+$res_ds_agent+'~'+$res_ds_monitor+'~'+$res_ds_notifier+'~'+$res_Amsp;return $hl;}$r=get;$r;}exit;\""}
                                    />
        </>
    )
};

export default Installasi_Trend_Micro;