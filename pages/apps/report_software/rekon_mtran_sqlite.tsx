'use client'
import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import React from "react";
import FormRekonMtranSQLite from "@/components/report_software/FormRekonMtranSQLite";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";

//-- component menu --//
const rekon_mtran_sqlite = () => {
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
                <Link href="/apps/report_software/rekon_mtran_sqlite/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Report')} {t('Recon Mtran SQLite')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormRekonMtranSQLite IDReport="Report Rekon Mtran SQLite" 
                                    IS_Induk={""}
                                    url={`ws://${themeConfig.host}:${themeConfig.port_listener}/sock/v1/ReportFromListener?Token=${Token}`}
                                    command={""}
                                    />
        </>
    )
};

export default rekon_mtran_sqlite;