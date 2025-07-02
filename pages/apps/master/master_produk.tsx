'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import FormMasterProduk from "@/components/master/FormMasterProduk";
//-- component menu --//
const MasterProduk = () => {
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
                 <li>{t('Master')}</li>
                <Link href="/apps/master/master_produk/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Product Master')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMasterProduk IDReport="Master Produk" 
                                    url={``}
                                    command={''}
                                    />
        </>
    )
};

export default MasterProduk;