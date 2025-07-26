'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import FormTerimaBarangMasuk from "@/components/inventory/FormTerimaBarangMasuk";
import FormRetur from "@/components/inventory/FormRetur";
//-- component menu --//
const Retur_DC = () => {
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
                 <li>{t('Transaction')}</li>
                <Link href="/apps/inventory/retur_dc/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Retur to Distribution Center')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormRetur IDReport="Retur Item" 
                                    url={``}
                                    jenis={'8'}
                                    />
        </>
    )
};

export default Retur_DC;