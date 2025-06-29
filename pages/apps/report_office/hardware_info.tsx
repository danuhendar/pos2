'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import FormMonitoringListenerOffice from "@/components/report_office/FormMonitoringListenerOffice";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const HardwareInfo = () => {
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
                <Link href="/apps/report_office/hardware_info/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>{t('Hardware Infomation')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringListenerOffice IDReport="Report Hardware Info" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromOffice?Token=${Token}`}
                                    command={"powershell.exe \"$vs= $PSVersionTable.PSVersion.Major;if($vs.Equals(2)){Write-Host '2';}else{function getPath(){$h='';$serviceName = 'AgentIDMService';$service=Get-WmiObject Win32_Service -Filter \\\"Name='$serviceName'\\\";if ($service){$h=$($service.PathName).Replace('AgentIDMService.exe','');}else{$h='not found';}return $h;}$r=getPath;$pls=$r;$li='C:\\Windows\\System32\\slmgr.vbs';function get(){$d1=Get-WmiObject -Class Win32_Battery;$ws=Get-WmiObject Win32_OperatingSystem;$os=$ws.Caption;$ar=$ws.OSArchitecture;$cfo=Get-WmiObject Win32_Processor;$cs=$($cfo.Name);$cTot=Get-WmiObject Win32_PerfFormattedData_PerfOS_Processor|Where-Object{$_.Name -eq '_Total'};$cpr=$cTot.PercentProcessorTime;$pM=($ws.TotalVisibleMemorySize-$ws.FreePhysicalMemory)/$ws.TotalVisibleMemorySize*100;$pn=Get-WmiObject Win32_PhysicalMemory;$tme=($pn|Measure-Object Capacity -Sum).Sum/1GB;$tps=$ws.TotalVisibleMemorySize/1024/1024;$do=Get-WmiObject Win32_DiskDrive;foreach($disk in $do){$hml=$($disk.Model)};$t_cap=0;$t_use=0;$t_free=0;$dvs=Get-WmiObject Win32_LogicalDisk;foreach($dr in $dvs){$cpy=$dr.Size;$frSp=$dr.FreeSpace;$usp=$cpy-$frSp;$t_cap+=$cpy;$t_use+=$usp;$t_free+=$frSp};$tcp=$t_cap/1GB;$tse=$t_use/1GB;$tfr=$t_free/1GB;$rup='';if($d1){$sS=$d1.Status;$bs=$d1.BatteryStatus;$bcr=$d1.EstimatedChargeRemaining;$rup=$sS+' '+$bs+' '+$bcr+'%'}else{$rup='NOK'};$lBUT=[System.Management.ManagementDateTimeConverter]::ToDateTime($ws.LastBootUpTime);$upt=(Get-Date)-$lBUT;$sUp=''+$upt.Days+' hari '+$upt.Hours+' jam '+$upt.Minutes+' menit';$Awn=(cscript /Nologo $li /xpr)|Out-String;$lc=(Get-WmiObject -query 'select * FROM SoftwareLicensingService').OA3xOriginalProductKey;$l2=$dFP=-join($pls,'OS_KeyDLL.dll');if(Test-Path $dFP){add-type -path $dFP;$dID=[OS_KeyDLL.OS_KeyGet]::GetRegistryDigitalProductId();$l2=[OS_KeyDLL.OS_KeyGet]::WInnKeyFinder($dID);}else{$l2='NOK DLL';}$pKy=$lc+':'+$l2;$em='';$dll=-join($pls,'LibreHardwareMonitorLib.dll');if(Test-Path $dll){Add-Type -LiteralPath $dll;$mr=[LibreHardwareMonitor.Hardware.Computer]::new();$mr.IsCPUEnabled=$true;$mr.Open();foreach($ssr in $mr.Hardware.Sensors){if($ssr.SensorType -eq'Temperature' -and $ssr.Name -eq'CPU Package'){$em=$ssr.Value;break;}}$mr.Close();}else{$em='NOK DLL'}$rbt='';try{$bt=Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Diagnostics-Performance/Operational';Id=100,108,110}-MaxEvents 1|ForEach-Object{$eventXml=([xml]$_.ToXml()).Event;[math]::round(([int64]($eventXml.EventData.Data|Where-Object{$_.Name -eq 'BootTime'}).InnerXml)/1000/60,2);}$rbt=$bt;}catch{$rbt='No Event';}$network='';try{$network=Get-CimInstance -ClassName Win32_PerfFormattedData_Tcpip_NetworkInterface | Select-Object Name,BytesReceivedPersec,BytesSentPersec|ConvertTo-Csv -NoTypeInformation|Select -Skip 1|Out-String;}catch{$network='Not Detected,0,0'}$hl=''+$os+'~'+$ar+'~'+$cs+'~'+$cpr+'~'+$pM+'~'+$tme+'~'+$tps+'~'+$hml+'~'+$tcp+'~'+$tse+'~'+$tfr+'~'+$rup+'~'+$d1.DeviceID+'~'+$sUp+'~'+$aWn.Trim()+'~'+$pKy+'~'+$em+'~'+$rbt+'~'+$network+'~';return $hl;}$r=get;$r;exit;}\""}
                                    />
        </>
    )
};

export default HardwareInfo;