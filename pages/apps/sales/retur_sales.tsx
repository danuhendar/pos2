'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import FormReturSales from "@/components/sales/FormReturSales";
//-- component menu --//
const Retur_Sales = () => {
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
                <Link href="/apps/sales/retur_sales/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Retur Sales')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormReturSales IDReport="Retur Sales" 
                                    url={``}
                                    jenis={'7'}
                                    />
        </>
    )
};

export default Retur_Sales;