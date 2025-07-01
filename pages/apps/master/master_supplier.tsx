'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import FormMasterSupplier from "@/components/master/FormMasterSupplier";
//-- component menu --//
const MasterSupplier = () => {
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
                <Link href="/apps/master/master_supplier/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Supplier Master')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMasterSupplier IDReport="Master Supplier" 
                                    url={``}
                                    command={''}
                                    />
        </>
    )
};

export default MasterSupplier;