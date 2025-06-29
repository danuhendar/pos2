'use client'
import {  useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Select from 'react-select';
import Swal from 'sweetalert2';

import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import config from '@/lib/config.json';
import { DecodeAES } from "@/lib/global";
import { useTranslation } from "react-i18next";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "./shield/AntiScrapedShieldComponent";

interface FormDownloadProps{
    IDReport: string,
    target:any,
    jenis:string,
}

function get_data_local_storage(key:string){
    var menu = '';
    if (typeof window !== 'undefined' && window.localStorage) {
        // Perform localStorage action
        menu = localStorage.getItem(key);
        //console.log(menu)
    } 
    return menu;
}

const FormDownload: React.FC<FormDownloadProps> = ({IDReport,target,jenis}) => {
    const [IN_HOST, setHOST] = useState('');
    const { t, i18n } = useTranslation();
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        const data_login = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
        const arr_login = JSON.parse(data_login)
        const nik = arr_login.nik.toString();
        userSelectOtorisator(nik);
    },[]);

    const [IN_CMB_TARGET, setTarget] = useState({});
    const userSelectTarget = (value: any) => {
        if(value.length == 0){
            setTarget({});
        }else{
            const arr_val = {
                value:value.value,
                label:value.value
            };
            setTarget(arr_val);
        }
    };
    const options8 = target;
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [IN_DETAIL_OTORISATOR,setDetailOtorisator] = useState('');
    const userSelectOtorisator = (value: any) => {
        setDetailOtorisator(value);
    };
    
         
    const HandleClick = (idComponent:any) =>{
        const target = (IN_CMB_TARGET as any).value;
       
        if(target === ''){
            Swal.fire({
                title: t("Warning"),
                text: "Pilih master yang akan di download terlebih dahulu !",
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }else{
             
        }
    };
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                <div className="grid-cols-2 gap-3  md:grid-cols-2 mb-3 flex items-end justify-left">
                    <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
                        <div className="p-2 flex items-center flex-col sm:flex-row">
                            <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                            <form>
                                <div className="mb-3">
                                <div className="flex item-center font-semibold">   
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                    </svg>
                                    <h2 className="text-dark mt-1 ml-1 text-center text-1xl dark:text-white-light">Form Filter</h2>
                                </div>
                                </div>
                                <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Select Version Apps')}</label></div>
                                <div className="mb-3">
                                    <div className="w-full">
                                    <Select  value={IN_CMB_TARGET} className="w-full text-xs"
                                                        onChange={userSelectTarget} 
                                                        id="cmd_target" 
                                                        placeholder="Pilih Master" 
                                                        defaultValue={''}
                                                        options={options8}
                                                        isSearchable={true}
                                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="mt-4 mb-4 grid grid-cols-8 sm:grid-cols-1 gap-1">
                                        <div className="flex">
                                            <a href={"/file/"+(IN_CMB_TARGET as any).value} rel="noopener noreferrer"  id="btn_download_template"  target="_blank" className={!isDark ? 'btn btn-warning w-full rounded-full text-end text-xs' : 'btn btn-outline-warning w-full rounded-full text-xs'}>
                                                {t('Download')}
                                            </a>
                                        </div>
                                    </div>
                                
                                </div>
                            </form>
                            </div>
                        </div>
                    
                    </div>
                </div>
                </>
            } />
        </>
    )
}
export default FormDownload;