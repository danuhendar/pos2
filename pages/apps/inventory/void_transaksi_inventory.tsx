'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import React from "react";
import { useTranslation } from "react-i18next";
import { GetToken } from "@/lib/global";
import FormTerimaBarangMasuk from "@/components/inventory/FormTerimaBarangMasuk";
import FormRetur from "@/components/inventory/FormRetur";
import FormVoidTransaksiInventory from "@/components/inventory/FormVoidTransaksiInventory";
//-- component menu --//
const Void_Transaksi_Inventory = () => {
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
                <Link href="/apps/inventory/void_transaksi_inventory/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Void Transaction Inventory')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormVoidTransaksiInventory IDReport="Void Transaksi Inventory" 
                                    url={``}
                                    jenis={'8'}
                                    />
        </>
    )
};

export default Void_Transaksi_Inventory;