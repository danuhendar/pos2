'use client'
import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import React from "react";
import FormMonitoringProgramBackoff from "@/components/report_software/FormMonitoringProgramBackoff";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const monitoring_program_backoff = () => {
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
                <Link href="/apps/report_software/monitoring_program_backoff/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Backoff Apps Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringProgramBackoff IDReport="Report Monitoring Program Backoff" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                                    command={"%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"$psversion = $PSVersionTable.PSVersion.Major;if($psversion.Equals(2)){Write-Host 'Not Support V2|Not Support V2|Not Support V2|Not Support V2|Not Support V2';}else{$matchingVariables = Get-ChildItem -Path 'env:' | Where-Object { $_.Name -like 'station' };$station='';foreach ($variable in $matchingVariables) {$station=$variable.Value};if($station -eq 'I1'){$directoryPath = 'D:\\I-KIOSK\\';}else{$Networkpath = 'E:\\';$pathExists = Test-Path -Path $Networkpath;if($pathExists) {$directoryPath = 'e:\\CAD\\BACKOFF\\';}else{$directoryPath = 'd:\\BACKOFF\\';}}Get-ChildItem $directoryPath  -Recurse -Include *.dll,*.exe -File | Foreach-Object {$fileName = $_.Name.ToUpper();$versi = (Get-Item $directoryPath).VersionInfo.FileVersion;$last_modified =  $_.LastWriteTime;$fileSize = $_.Length;Write-Host $fileName'|'$versi'|'$last_modified'|'$directoryPath'|'$fileSize;exit;}}"}
                                    />
        </>
    )
};

export default monitoring_program_backoff;