'use client'
import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import React from "react";
import FormMonitoringResources from "@/components/report_software/FormMonitoringResources";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const monitoring_apps_dan_os_crash = () => {
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
                <Link href="/apps/report_software/monitoring_apps_dan_os_crash/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Apps & Os Crash Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringResources IDReport="Report Monitoring Apps & Os Crash"
                                    IS_Induk={""} 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                                    //-- verifikasi bsod hari ini --//
                                    command={"%systemroot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe \"function getHardware(){$pn=Get-WmiObject Win32_PhysicalMemory;$tme=($pn|Measure-Object Capacity -Sum).Sum/1GB;$ws=Get-WmiObject Win32_OperatingSystem;$mv=$ws.TotalVisibleMemorySize/1MB;$ar=$ws.OSArchitecture;$cfo=Get-WmiObject Win32_Processor;$cs=$($cfo.Name);$hl=-join($tme,'|',$mv,'|',$ar,'|',$cs,'|');return $hl}function getOSCrash(){$os_crash=0;$hard_reset=0;$unexpected=0;$startDate=(Get-Date).AddDays(-3);[xml]$Xml='';Get-WinEvent -LogName System|Where-Object{ $_.Id -eq 41 -And $_.TimeCreated -gt $startDate}|ForEach-Object{$data=$_.ToXml();$Xml=$data;$resBugcheckCode=$Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BugcheckCode'}|ft -HideTableHeaders -Wrap|Out-String;if($resBugcheckCode.ToString().Trim() -eq 'BugcheckCode 0' -Or $resBugcheckCode.ToString().Trim() -eq ''){}else{if($_.TimeCreated -ge (Get-Date).AddDays(-1)){$os_crash++;}else{};}$resPowerButtonTimestamp = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'PowerButtonTimestamp'}|ft -HideTableHeaders -Wrap|Out-String;if($resPowerButtonTimestamp.ToString().Trim() -eq 'PowerButtonTimestamp 0' -Or $resPowerButtonTimestamp.ToString().Trim() -eq ''){}else{$hard_reset++;}$resBugcheckParameter1 = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BugcheckParameter1'}|ft -HideTableHeaders -Wrap|Out-String;$resBugcheckParameter2=$Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BugcheckParameter2'}|ft -HideTableHeaders -Wrap|Out-String;$resBugcheckParameter3 = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BugcheckParameter3'}|ft -HideTableHeaders -Wrap|Out-String;$resBugcheckParameter4 = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BugcheckParameter4'}|ft -HideTableHeaders -Wrap|Out-String;$resSleepInProgress = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'SleepInProgress'}|ft -HideTableHeaders -Wrap|Out-String;$resBootAppStatus = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BootAppStatus'}|ft -HideTableHeaders -Wrap|Out-String;if($resBugcheckCode.ToString().Trim() -eq 'BugcheckCode 0' -And $resBugcheckParameter1.ToString().Trim() -eq 'BugcheckParameter1 0x0' -And $resBugcheckParameter2.ToString().Trim() -eq 'BugcheckParameter2 0x0' -And $resBugcheckParameter3.ToString().Trim() -eq 'BugcheckParameter3 0x0' -And $resBugcheckParameter4.ToString().Trim() -eq 'BugcheckParameter4 0x0' -And $resSleepInProgress.ToString().Trim() -eq 'SleepInProgress 0' -And $resBootAppStatus.ToString().Trim() -eq 'BootAppStatus 0' -And $resPowerButtonTimestamp.ToString().Trim() -eq 'PowerButtonTimestamp 0'){$unexpected++;}else{}};$hasil=-join('',$os_crash,'|',$hard_reset,'|',$unexpected);return  $hasil;}function getListApp(){$startDate=(Get-Date).AddDays(-3);$list_app=Get-WinEvent -FilterHashtable @{logname = 'Application'; id = 1002,41}|Where-Object {$_.TimeCreated -gt $startDate}|Group-Object -Property {$_.Message.Substring(0,40)}|sort -desc Count|Select-Object Count,Name -First 3|Out-String;return $list_app}$g=getHardware;$h=getOSCrash;$j=getListApp;$c=-join($g,'',$h,'|',$j);$c;exit;\""}
                                    />
        </>
    )
};
export default monitoring_apps_dan_os_crash;