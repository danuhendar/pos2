'use client'

import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import React from "react";
import FormMonitoringResources from "@/components/report_software/FormMonitoringResources";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";

//-- component menu --//
const monitoring_penggunaan_program = () => {
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
                    <span>{t('Used of Memory Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringResources IDReport="Report Monitoring Penggunaan Memory PC"
                                    IS_Induk={""} 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                                    command={"%systemroot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe \"function getHardware(){$pn=Get-WmiObject Win32_PhysicalMemory;$tme=($pn|Measure-Object Capacity -Sum).Sum/1GB;$ws=Get-WmiObject Win32_OperatingSystem;$mv=$ws.TotalVisibleMemorySize / 1MB;$ar=$ws.OSArchitecture;$cfo=Get-WmiObject Win32_Processor;$cs=$($cfo.Name);$pM=($ws.TotalVisibleMemorySize-$ws.FreePhysicalMemory)/$ws.TotalVisibleMemorySize*100;$lBUT=[System.Management.ManagementDateTimeConverter]::ToDateTime($ws.LastBootUpTime);$upt=(Get-Date)-$lBUT;$sUp=''+$upt.Days+' hari '+$upt.Hours+' jam '+$upt.Minutes+' menit';$hl=-join($tme,'|',$mv,'|',$ar,'|',$cs,'|',$pM,'|',$sUp,'|');return $hl}function getPath($nama){$res_nama = -join($nama,'.exe');$r=Get-WmiObject Win32_Process|Where-Object -Property ProcessName -eq $res_nama | Select-Object ExecutablePath -First 1 |ft -HideTableHeaders|Out-String;return $r;}function ListAppUsage(){$File = 'C:\\IDMCommandListeners\\Scripts.csv';  Remove-Item $File;  $Header = 'ProcessName,Mem_MB';  Set-Content $File -Value $Header;$conc='';For ($i=1;$i -le 3;$i++){$get=get-process|Group-Object -Property ProcessName|%{[PSCustomObject]@{ProcessName=$_.Name;Mem_MB=[math]::Round(($_.Group|Measure-Object WorkingSet -Sum).Sum/1MB, 0);Tanggal=(Get-Date);JumlahProses=$_.Count;Path=(getPath($_.Name)).Trim();}}|sort -desc Mem_MB|Select-Object -First 3|ConvertTo-Csv -Delimiter ',' -NoTypeInformation|Select-Object -Skip 1|Out-String;get-process|Group-Object -Property ProcessName|%{ [PSCustomObject]@{ProcessName=$_.Name;Mem_MB=[math]::Round(($_.Group|Measure-Object WorkingSet -Sum).Sum/1MB, 0);}}|sort -desc Mem_MB|Select-Object -First 3|export-csv -append -path C:\\IDMCommandListeners\\Scripts.csv -Delimiter ',' -NoTypeInformation|Select -Skip 1;$conc += -join($get);  Start-Sleep -s 10;  };return $conc; };function get_selisih($date2){$date1 = Get-Date;$date_diff = New-TimeSpan -Start $date2 -End $date1;$r=-join($date_diff.Days,' Hari - ',$date_diff.Hours,':',$date_diff.Minutes,':',$date_diff.Seconds);return $r;}function getAvg(){$File = 'C:\\IDMCommandListeners\\Scripts.csv';$get=Import-Csv $File|Group-Object ProcessName|Select-Object @{Name='ProcessName'   ;Expression={$_.Values[0]}},@{Name='StartTime' ;Expression={(Get-Process $_.Name |Select Starttime -First 1|ft -HideTableHeaders|Out-String).Trim()}},@{Name='Durasi' ;Expression={get_selisih((Get-Process $_.Name |Select Starttime -First 1|ft -HideTableHeaders|Out-String).Trim()) }},@{Name='Mem_MB' ;Expression={[math]::Round(($_.Group|Measure-Object Mem_MB -Average).Average,2)}}|ConvertTo-Csv -NoTypeInformation|Select -Skip 1|Out-String;return $get;}$r=ListAppUsage;$g=getHardware;$h=getAvg;$j=$r;$c=-join($g,'',$h,'|',$j);$c;\""} 
                                    />
        </>
    )
};

export default monitoring_penggunaan_program;