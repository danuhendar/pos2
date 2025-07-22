'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import FormHistory from "@/components/report_history/FormHistory";

//-- component menu --//
const HistorySales = () => {
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
                 <li>{t('Report Sales')}</li>
                <Link href="/apps/report_sales/history_sales/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('History Sales')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormHistory IDReport="History Sales" 
                                    url={``}
                                    command={''}
                                    />
        </>
    )
};

export default HistorySales;