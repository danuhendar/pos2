'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import FormDasboardIDMCommandListeners from "@/components/dashboard/FormDasboardIDMCommandListeners";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import themeConfig from "@/theme.config";

//-- component menu --//
const StreamingCCTV = () => {
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
                <Link href="/apps/dashboard/streaming_cctv/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Streaming CCTV')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <iframe
                src="http://192.168.131.61:8083/"
                style={{ width: '100%', height: '500px', border: 'none' }}
                allowFullScreen
                allow="autoplay"
            />
        </>
    )
};

export default StreamingCCTV;