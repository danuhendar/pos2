'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import FormMonitoringConfigRouterWDCP from "@/components/report_network/FormMonitoringConfigRouterWDCP";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";

//-- component menu --//
const Monitoring_Config_Router_WDCP = () => {
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
                <li>
                {t('Report')} {t('Network')} / {t('Router Configuration')}
                </li>
                <Link href="/apps/report_network/config_router/monitoring_wdcp/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('WDCP Configuration Monitoring')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringConfigRouterWDCP IDReport="Monitoring Config WDCP" 
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/SettingRouter/:MonitoringWDCP?Token=${Token}`}
                                    station={"RBWDCP"} />
        </>
    )
};
export default Monitoring_Config_Router_WDCP;