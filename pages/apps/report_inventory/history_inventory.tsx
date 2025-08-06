'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import FormHistory from "@/components/report_history/FormHistory";

//-- component menu --//
const HistoryInventory = () => {
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
                 <li>{t('Report Inventory')}</li>
                <Link href="/apps/report_inventory/history_inventory/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('History Inventory')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormHistory IDReport="History Inventory" 
                                    url={``}
                                    command={''}
                                    />
        </>
    )
};

export default HistoryInventory;