'use client'
import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import React from "react";
import FormMonitoringOneClick from "@/components/report_hardware/FormMonitoringOneClick";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const List_Monitoring_Master_One_Click = () => { 
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
                <Link href="/apps/setting/update_personil/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('One Click Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringOneClick IDReport="Report Monitoring One Click" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                                    command={"%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"$psversion = $PSVersionTable.PSVersion.Major;if($psversion.Equals(2)){$directoryPath = '';$Networkpath = 'E:\\MASTER';$pathExists = Test-Path -Path $Networkpath;if($pathExists) {$directoryPath = 'e:\\master\\*one*click*.exe';}else{$directoryPath = 'd:\\master\\*one*lick*.exe'};cmd /r dir $directoryPath /s /b}else{$directoryPath = '';$directoryPathMaster = '';$Networkpath = 'E:\\MASTER';$pathExists = Test-Path -Path $Networkpath;if($pathExists) {$directoryPath = 'e:';$directoryPathMaster = 'e:\\master\\'}else{$directoryPath = 'd:';$directoryPathMaster = 'd:\\master\\'};$appNamePattern = '*ne*lick*.exe';$foundApplications = Get-ChildItem -Path $directoryPathMaster -Recurse -File | Where-Object { $_.Name -like $appNamePattern };if ($foundApplications.Count -gt 0) {foreach ($app in $foundApplications) {$versionInfo = $app.VersionInfo;Write-Host $($app.FullName)';'$($versionInfo.ProductVersion)}} else {Write-Host 'Tidak ada Program dengan pola : '$appNamePattern' pada : '$directoryPathMaster.' Mohon copykan ulang master'}}\""} />
        </>
    )
};

export default List_Monitoring_Master_One_Click;