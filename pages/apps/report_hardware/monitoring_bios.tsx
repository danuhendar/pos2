'use client'
import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import React from "react";
import FormMonitoringBios from "@/components/report_hardware/FormMonitoringBios";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const Monitoring_bios = () => {
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
                <Link href="/apps/report_hardware/monitoring_bios/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('BIOS Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringBios IDReport="Report Monitoring BIOS" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                                    command={"%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"function getUUID(){$c='';$c=Get-CimInstance -ClassName Win32_ComputerSystemProduct | Select-Object UUID|Format-Table -HideTableHeaders|Out-String;return $c;}function getBIOS(){$sb=Get-WmiObject win32_bios|Select-Object Manufacturer,Name,@{Name='SerialNumber'; Expression={ if(($_.SerialNumber -eq 'To be filled by O.E.M.') -Or ($_.SerialNumber -eq 'System Serial Number') ){$guid=getUUID;$guid.Trim();}else{$_.SerialNUmber;} }},Version|ConvertTo-Csv -Delimiter ';' -NoTypeInformation|Select -Skip 1|Out-String; return $sb;}$r=getBIOS;$r;\""}
                                    />
        </>
    )
};

export default Monitoring_bios;