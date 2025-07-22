'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import FormSales from "@/components/sales/FormSales";
import FormClosing from "@/components/sales/FormClosing";
//-- component menu --//
const Closing_Shift = () => {
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
                 <li>{t('Sales')}</li>
                <Link href="/apps/sales/closing_shift/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Closing Shift')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormClosing IDReport="Closing Shift" 
                                    url={``}
                                    command={''}
                                    />
        </>
    )
};

export default Closing_Shift;