'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import FormVoidSales from "@/components/sales/FormVoidSales";
//-- component menu --//
const Void_Sales = () => {
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
                <Link href="/apps/sales/void_transaksi_sales/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Void Sales')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormVoidSales IDReport="Void Transaksi Sales" 
                                    url={``}
                                    jenis={'10'}
                                    />
        </>
    )
};

export default Void_Sales;