'use client'
import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import React from "react";
import FormMonitoring_PrinterScanner from "@/components/report_hardware/FormMonitoring_PrinterScanner";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";
//-- component menu --//
const Monitoring_PrinterScanner = () => {
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
                <Link href="/apps/report_hardware/monitoring_printer/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Printer Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoring_PrinterScanner IDReport="Report Monitoring Printer" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                                    command={"%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"function getConstPrinter(){$h1='';$gs=Get-ChildItem -Path 'env:'|Where-Object{$_.Name -like 'station'};$stf=$gs.Value;$rstf=-join(\\\"'\\\",$stf,\\\"'\\\");[void][system.reflection.Assembly]::LoadFrom('C:\\IDMCommandListeners\\MySql.Data.DLL');$rPh='HKCU:\\Software\\INDOMARET\\POS.NET\\Database';$vName='Server';$rgV=Get-ItemProperty -Path $rPh -Name $vName -ErrorAction Stop;$srv=$rgV.$vName;$Cn=New-Object -TypeName MySql.Data.MySqlClient.MySqlConnection;$Cn.ConnectionString=\"\\\"SERVER=$srv;DATABASE='pos';UID='edp';PWD='cUm4l!h4t@datA'\"\\\";$Cn.Open();$cm=New-Object MySql.Data.MySqlClient.MySqlCommand;$at=New-Object MySql.Data.MySqlClient.MySqlDataAdapter;$ds=New-Object System.Data.DataSet;$cm.Connection=$Cn;$cm.CommandTimeout=300;$cm.CommandText=\"\\\"SELECT CONVERT(IFNULL(v.SETTING,'FLAG TIDAK ADA'),CHAR) AS SETTING FROM (SELECT CONVERT(IFNULL(CONCAT(RKEY,'-',IF(DOCNO='1','SUDAH','BELUM')),'-'),CHAR) AS SETTING FROM const where RKEY = CONCAT('C',$rstf)) v;\"\\\";$at.SelectCommand=$cm;$Nm=$at.Fill($ds,'data');foreach($Dts in $ds.tables[0]){$h1=$Dts.SETTING}$Cn.Close();return $h1};function getPrinter(){$r='';$r=Get-WmiObject -Class Win32_Printer | Select-Object Name,Default,DriverName,PortName,Shared,ShareName,SystemName,PrinterStatus,@{Name=\\\"PrinterPaperNames\\\"; Expression={ $_.PrinterPaperNames -join \\\", \\\" }},@{Name=\\\"Setting\\\"; Expression={getConstPrinter}}|Where-Object {$_.Default -eq 'True' -Or $_.Shared -eq 'True'}|ConvertTo-Csv -Delimiter '|' -NoTypeInformation|Select -Skip 1;return $r}$pr=getPrinter;$pr;exit;\""}
                                    />
        </>
    )
};

export default Monitoring_PrinterScanner;