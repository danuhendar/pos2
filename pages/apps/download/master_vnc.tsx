'use client'
import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { IRootState } from "@/store";
import { Posts } from "@/lib/post";
import React from "react";
import FormDownload from "@/components/FormDownload";
import config from '@/lib/config.json';
import { DecodeAES, get_data_local_storage, handleLogout } from "@/lib/global";
import router from "next/router";
import { useTranslation } from "react-i18next";
//-- component menu --//
const Master_VNC = () => {
    const [loading, setLoading] = useState(false);
    const [HOST_API_RND,setHOST_API_RND] = useState('');
    const [PORT_API_RND,setPORT_API_RND] = useState('');
    const [optionsProgram,setOptionsProgram] = useState([]);
    const Token = useSelector((state: IRootState) => state.themeConfig.TokenRND);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        var rconfig = JSON.stringify(config);
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME;
        const res_host_ws = (config.api as any).HOSTNAME_WS;
        const res_host_api_edp_ho = (config.api as any).HOSTNAME_API_EDP_HO;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;
        const res_PORT_API_EDP_HO = (config.api as any).PORT_API_EDP_HO;

        const res_HOSTNAME_API_RND = (config.api as any).HOSTNAME_API_RND;
        const res_PORT_API_RND = (config.api as any).PORT_API_RND;

       
        
        setPORT_API_RND(res_PORT_API_RND);
        setHOST_API_RND(res_HOSTNAME_API_RND);
        const get_data = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
        const d = JSON.parse(get_data);
        const nik = d.nik;
        const nama = d.nama;
        GetMasterFile(res_HOSTNAME_API_RND);

        const handleRouteChange = (url:string) => {
            console.log(`App is changing to ${url}`)
            
        }
        router.events.on('routeChangeStart',handleRouteChange)

        return ()=>{
            router.events.off('routeChangeStart',handleRouteChange)
        }
        
     

       
        
    },[]);
    const GetMasterFile = (in_host_rnd:string) => {
        const url = `http://${in_host_rnd}:4646/user/GetMasterFile`;
        console.log('url : '+url)
        const param = {"":""};
        console.log('param : '+JSON.stringify(param))    
        setLoading(true);
        Posts(url,JSON.stringify(param),false,Token) .then(
                (response) => {
                    const res_data = response;
                    var code = res_data.code;
                    var msg = res_data.msg;
                    var rdata = res_data.data;
                    
                    if(parseFloat(code) === 200){
                        var arr_ = []
                        for(var i = 0;i<rdata.length;i++){
                            const obj = {"label":rdata[i].PATH.replace('file/',''),"value":rdata[i].PATH.replace('file/','')}
                            arr_.push(obj)
                        }
                        setOptionsProgram(arr_)
                    }else if(code.toString().substring(0,1) === '4'){
                        Swal.fire({
                            title: t("Warning"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        if(code === 401 && msg.includes("Invalid")){
                            handleLogout();
                        }
                    }else{
                        Swal.fire({
                            title: t("Warning"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    } 
                    setLoading(false);
                    
                }
        ).catch(
            (error) => {
                Swal.fire({
                    title: t("Warning"),
                    text: "Error mendapatkan data : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }
            
        );
    }
    return(
        <>
            
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
               <li>{t('Setting')}</li>
               
                <Link href="/apps/download/master_vnc/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Support System IDMCommand')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormDownload IDReport="Master Pendukung Sistem IDMCommand" target={optionsProgram} jenis={'VNC'} />
        </>
    )
};

export default Master_VNC;