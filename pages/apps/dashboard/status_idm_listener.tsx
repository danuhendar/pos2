'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import FormDasboardIDMCommandListeners from "@/components/dashboard/FormDasboardIDMCommandListeners";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";

//-- component menu --//
const DashboardListeners = () => {
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
                <li>
                   {t('Dashboard')}
                </li>
                <Link href="/apps/dashboard/status_idm_listeners/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Status IDMCommandListeners')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormDasboardIDMCommandListeners IDReport="Report Status IDMCommandListeners" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                                    command={"%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"$psversion = $PSVersionTable.PSVersion.Major;$versi_listener = (Get-Item 'C:\\IDMCommandListeners\\IDMCommandListenersApp.exe').VersionInfo.FileVersion;$ip=Get-NetIPAddress -InterfaceAlias 'Ethernet' -AddressFamily IPv4 -PrefixLength '27' | Select-Object IPAddress|ft -HideTableHeaders|Out-String;$rip=-join(\\\"\"\\\",$ip.Trim(),\\\"\"\\\");$jpath='D:\\Backoff\\captunet\\listIPReplikasi.ini';$ip_pos_rep=Get-Content $jpath|Where-Object { $_ -match $rip};$concat_versi_listener='';if(-not([string]::IsNullOrEmpty($ip_pos_rep)) ){$concat_versi_listener=-join($versi_listener,' (',$ip_pos_rep,')');}else{$concat_versi_listener=$versi_listener;}$versi_idmlibrary = (Get-Item 'C:\\IDMCommandListeners\\IDMCommandLibrary.dll').VersionInfo.FileVersion;$matchingVariables = Get-ChildItem -Path 'env:' | Where-Object { $_.Name -like 'station' };$station = '';$directoryPath='';$serviceRegPath = 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\monitorservice';$directoryPath = Get-ItemProperty -Path $serviceRegPath | Select-Object -ExpandProperty ImagePath;$directoryPath = $directoryPath.Trim('\\\"');$versi_monitor_service = (Get-Item $directoryPath).VersionInfo.FileVersion;$ServiceName = 'MonitorService';$is_running_monitor_service='';if($psversion.Equals(2)){$service = cmd /r sc query monitorservice;if($service -match 'RUNNING'){$is_running_monitor_service='RUNNING'}else{$is_running_monitor_service='STOPPED'}}else{$monitor_service = Get-Service -Name $ServiceName;$is_running_monitor_service = $monitor_service.Status;}$isi_cabang_ini = (Get-Content -Path 'C:\\IDMCommandListeners\\cabang.ini');$isi_attribute =  (Get-Content -Path 'C:\\IDMCommandListeners\\attribute');$convert_attribute = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($isi_attribute));$positionfirstspace = $convert_attribute.IndexOf('VERSI_ATTR');$versi_suhu = (Get-Item 'C:\\IDMCommandListeners\\LibreHardwareMonitorLib.dll').VersionInfo.FileVersion;$versi_attribute = ($convert_attribute.Substring($positionfirstspace).Replace('VERSI_ATTR','').Replace('}',''));$versi_suhu='';$testpath_suhu=(Test-Path -path 'C:\\IDMCommandListeners\\LibreHardwareMonitorLib.dll');if($testpath_suhu){$versi_suhu=(Get-Item 'C:\\IDMCommandListeners\\LibreHardwareMonitorLib.dll').VersionInfo.FileVersion}else{$versi_suhu='Program tidak ada'}$versi_oskey = '';$testpath_os=(Test-Path -path 'C:\\IDMCommandListeners\\OS_KeyDLL.dll');if($testpath_os){$versi_oskey = (Get-Item 'C:\\IDMCommandListeners\\OS_KeyDLL.dll').VersionInfo.FileVersion}else{$versi_oskey='Program tidak ada'};$versi_se='';$testpath_se=(Test-Path -path 'C:\\IDMCommandListeners\\SE.dll');if($testpath_se){$versi_se= (Get-Item 'C:\\IDMCommandListeners\\SE.dll').VersionInfo.FileVersion}else{$versi_se='Program tidak ada'};$concat_versi_listener+ ';Versi MonitorService : ' + $versi_monitor_service + '; Service IDMCommandListeners : ' + $is_running_monitor_service + '; Versi IDMCommandLibrary : ' + $versi_idmlibrary + '; cabang.ini : ' + $isi_cabang_ini +  ';Versi attribute : ' + $versi_attribute + '; Versi Suhu : ' + $versi_suhu + ';Versi OSKey: ' + $versi_oskey+';Versi SE:'+$versi_se;exit;\""} />
        </>
    )
};

export default DashboardListeners;