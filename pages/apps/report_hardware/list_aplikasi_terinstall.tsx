import FormListProgramTerInstall from "@/components/report_hardware/FormListProgramTerInstall";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";

const List_Aplikasi_Terinstall = () => {
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
                    {t('Report')}
                </li>
                <Link href="/apps/report_hardware/list_aplikasi_terinstall" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Installed Apps')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormListProgramTerInstall 
                        url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                        command={"%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"$psversion = $PSVersionTable.PSVersion.Major;if($psversion.Equals(2)){Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName,DisplayVersion | ConvertTo-Csv -NoTypeInformation;}else{Get-Package | Select-Object Name,Version,ProviderName,Source | ConvertTo-Csv -NoTypeInformation;}exit;\""}
                        IDReport={"Report Aplikasi TerInstall"}
            />
        </>
    )
};

export default List_Aplikasi_Terinstall;