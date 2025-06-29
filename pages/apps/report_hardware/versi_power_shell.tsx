'use client'
import Link from "next/link";
import { useEffect, useState} from 'react';
import React from "react";
import FormVersiPowershell from "@/components/report_hardware/FormVersiPowershell";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const Versi_Power_shell = () => {
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
                <Link href="/apps/report_hardware/versi_power_shell/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Powershell Version Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormVersiPowershell IDReport="Report Monitoring Versi Powershell" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                                    command={"%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"$ps = $PSVersionTable.PSVersion;$os = (Get-WmiObject -class Win32_OperatingSystem).Caption;Write-Host $os'|'$ps;exit;\""}
                                    />
        </>
    )
};
export default Versi_Power_shell;