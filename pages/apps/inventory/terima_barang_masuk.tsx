'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import FormTerimaBarangMasuk from "@/components/inventory/FormTerimaBarangMasuk";
//-- component menu --//
const TerimaBarangMasuk = () => {
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
                <Link href="/apps/inventory/terima_barang_masuk/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Inventory Receive Item')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormTerimaBarangMasuk IDReport="Terima Barang Masuk   " 
                                    url={``}
                                    command={''}
                                    />
        </>
    )
};

export default TerimaBarangMasuk;