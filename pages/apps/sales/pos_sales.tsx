'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import FormSales from "@/components/sales/FormSales";
//-- component menu --//
const Pos_Sales = () => {
    const [Token,setToken] = useState('')
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        var key = GetToken()
        setToken(key)
        
    });
    return(
        <>
            {/* <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                 <li>{t('Sales')}</li>
                <Link href="/apps/sales/pos_sales/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('POS Sales')}</span>
                </li>
                </Link>
            </ul>
            </div> */}
            <FormSales IDReport="Pos Sales" 
                                    url={``}
                                    jenis={'2'}
                                    />
        </>
    )
};

export default Pos_Sales;