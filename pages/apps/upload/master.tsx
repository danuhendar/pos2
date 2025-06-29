'use client'
import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { IRootState } from "@/store";
import { Posts, PostsFile } from "@/lib/post";
import React from "react";
import FormDownload from "@/components/FormDownload";
import config from '@/lib/config.json';
import { AddColumn, AddID, ConvertDateFormat, DecodeAES, get_data_local_storage, handleLogout } from "@/lib/global";
import router from "next/router";
import { useTranslation } from "react-i18next";
import IconSend from "@/components/Icon/IconSend";
import DataTables from "@/components/table/DataTables";
import { Dialog, Transition } from '@headlessui/react';
import IconX from "@/components/Icon/IconX";
import fs from 'fs';
import path from 'path';
import IconPencil from "@/components/Icon/IconPencil";
import IconXCircle from "@/components/Icon/IconXCircle";
import { Input } from "postcss";
// import Client from 'ssh2-sftp-client';

//-- component menu --//
const Master_Upload = () => {
    const [loading, setLoading] = useState(false);
    const [HOST_API_RND,setHOST_API_RND] = useState('');
    const [PORT_API_RND,setPORT_API_RND] = useState('');
    const [optionsProgram,setOptionsProgram] = useState([]);
    const Token = useSelector((state: IRootState) => state.themeConfig.TokenRND);
    const [isTextButton,setisTextButton] = useState(false)
    const [active, setActive] = useState(true)
    const [data_rows,setData_rows] = useState([])
    const [data_columns,setData_columns] = useState([])
    const [InputNAMAPemohon,setInputNAMAPemohon] = useState('')
    const [modal13, setModal13] = useState(false)
    const [file, setFile] = useState(null)
    const [IN_DETAIL_APPS,setIN_DETAIL_APPS] = useState('')
    const [IN_DETAIL_KODE_FILE,setIN_DETAIL_KODE_FILE] = useState('')
    const [isInput,setisInput] = useState(false)
    const [Divisi,setDivisi] = useState('')
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
        const divisi = d.divisi
        setInputNAMAPemohon(nama)
        setDivisi(divisi)
        

        const handleRouteChange = (url:string) => {
            console.log(`App is changing to ${url}`)
            
        }
        router.events.on('routeChangeStart',handleRouteChange)

        return ()=>{
            router.events.off('routeChangeStart',handleRouteChange)
        }
        
    },[]);

    const FormInputApps = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_DETAIL_APPS(val);
    };

    const FormInputKode = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_DETAIL_KODE_FILE(val);
    };


    const GetMaster = () => {
        const url = `http://${HOST_API_RND}:4646/user/IDMConsole/GetMasterPendukung`;
        console.log('url : '+url)
        const param = {"":""};
        console.log('param : '+JSON.stringify(param))    
        setLoading(true)
        setisTextButton(true)
        Posts(url,JSON.stringify(param),false,Token) .then(
                (response) => {
                    const res_data = response;
                    var code = res_data.code;
                    var msg = res_data.msg;
                    var rdata = res_data.data;
                    
                    if(parseFloat(code) === 200){
                        var data_body = res_data.data;
                        //console.log(JSON.stringify(data_body))
                        
                        var rows = data_body[0].ROWS;
                        //console.log(JSON.stringify(rows))
                        var cols = data_body[0].COLUMNS;
                        var res_rows = AddID(rows);
                        setData_rows(res_rows);
                        const item_new = { 
                            field: 'ACTION', headerName: 'ACTION',  flex: 0,  width: 100, minWidth: 100, maxWidth: 100, align:'center',headerAlign: 'center',
                            renderCell: (cellValues: any) => {
                                return (
                                    <>
                                        <div className="mr-2 flex flex-row gap-3">
                                            <div>
                                            <a onClick={() => {showModalInput(cellValues)}} data-twe-toggle="tooltip" title="Hapus Program Backoff">
                                                <span className="text-success"><IconPencil  /></span>
                                            </a>
                                            </div>
                                            <div>
                                            <a onClick={() => {InsNonAktif(cellValues)}} data-twe-toggle="tooltip" title="Non Aktif">
                                                
                                                <span className="text-danger"><IconXCircle  /></span>
                                            </a>
                                            </div>
                                        </div>
                                    </>
                                );
                            }
                        };
                        AddColumn(cols,item_new);
                        setData_columns(cols);
                        setLoading(false)
                        setisTextButton(false)
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
                        setLoading(false)
                        setisTextButton(false)
                    }else{
                        Swal.fire({
                            title: t("Warning"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    } 
                    setLoading(false)
                    setisTextButton(false)
                }
        ).catch(
            (error) => {
                Swal.fire({
                    title: t("Warning"),
                    text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setLoading(false)
                setisTextButton(false)
            }
            
        );
    }

    const InsUploadMaster = async () => {
        const nama = file.name;
        const type = file.type;
        // const size = file.size;
        // const path = file.fullPath;
        const lastModified = ConvertDateFormat(file.lastModified,true);
        const formData = new FormData();
        //console.log(nama)
        
        formData.append("IN_KODE_FILE", IN_DETAIL_KODE_FILE);
        formData.append("IN_CONTENT", IN_DETAIL_APPS);
        formData.append("IN_PATH", 'file/'+nama);
        formData.append("IN_IS_AKTIF", '1');
        formData.append("files", file);
        formData.append("IN_LAST_MODIFIED", lastModified);
        formData.append("IN_OTORISATOR", InputNAMAPemohon);
            

        const url = `http://${HOST_API_RND}:4646/user/IDMConsole/InsUploadMasterPendukung`;
        console.log('url : '+url) 
        setisTextButton(true);
        setActive(true)
        PostsFile(url,formData,false) .then(
                (response) => {
                    const res_data = response;
                    var code = res_data.code;
                    var msg = res_data.msg;
                    var rdata = res_data.data;
                    
                    if(parseFloat(code) === 200){
                        Swal.fire({
                            title: t("Information"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "success",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setisTextButton(false)
                        setActive(false)
                        setModal13(false)
                        GetMaster()
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
                    setisTextButton(false)
                }
        ).catch(
            (error) => {
                Swal.fire({
                    title: t("Warning"),
                    text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setisTextButton(false)
            }
            
        );
        
    }

    const InsNonAktif = (cellValues:any) => {
         let kode_file = cellValues.row.KODE_FILE;
         let nama_file = cellValues.row.APPS;
         let is_aktif = cellValues.row.IS_AKTIF;
         Swal.fire({
            icon: "question",
            title: t("Confirmation"),
            text: t("Are you sure for")+" "+(is_aktif === 1 ? t("disable") : t("enable") )+" "+nama_file+" ?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
            padding: '2em',
            customClass: 'sweet-alerts'
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                
                const url = `http://${HOST_API_RND}:4646/user/IDMConsole/InsNonAktifMaster`;
                console.log('url : '+url)
                const param = {"IN_KODE_FILE":kode_file,"IN_IS_AKTIF":is_aktif,"IN_OTORISATOR":InputNAMAPemohon};
                console.log('param : '+JSON.stringify(param))    
                setLoading(true)
                setisTextButton(true)
                Posts(url,JSON.stringify(param),false,Token) .then(
                        (response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            
                            if(parseFloat(code) === 200){
                                Swal.fire({
                                    title: t("Information"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "success",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                GetMaster()
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
                                setLoading(false)
                                setisTextButton(false)
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                            } 
                            setLoading(false)
                            setisTextButton(false)
                        }
                ).catch(
                    (error) => {
                        Swal.fire({
                            title: t("Warning"),
                            text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false)
                        setisTextButton(false)
                    }
                    
                );
            }
        });
        
    }

    const showModalInput = (cellValues:any) => {
        if(cellValues === ''){
            console.log('kondisi 1')
            setisInput(true)
            setIN_DETAIL_KODE_FILE('')
            setIN_DETAIL_APPS('')
        }else{
            setisInput(false)
            console.log('kondisi 2')
            console.log(cellValues.row.KODE_FILE)
            setIN_DETAIL_KODE_FILE(cellValues.row.KODE_FILE)
            setIN_DETAIL_APPS(cellValues.row.APPS)
        }
        setModal13(true)
        
    }

   

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    
    return(
        <>
            
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>{t('Upload')}</li>
                <Link href="/apps/download/master/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Upload Master')}</span>
                </li>
                </Link>
            </ul>
            </div>
            {
                
                Divisi.includes('ADMINISTRATOR') ? 
                <>
                <div className="mb-3">
                    <div className="mt-4 mb-4 w-1/2">
                        <div className="flex">
                        <button id="btn_filter" onClick={() => {
                                                            GetMaster()
                                                        }}  type="button" className={!isDark ? 'btn btn-primary w-full rounded-full text-end' : 'btn btn-outline-primary w-full rounded-full'}>
                        
                            {
                                isTextButton  ? 
                                <>
                                <span className="inline-block w-5 h-5 align-middle border-4 border-transparent rounded-full animate-spin border-l-white-light"></span>&nbsp;{t('Please Wait')}
                                </>
                                :
                                <>
                                <IconSend />&nbsp; {t('Filter')}
                                </> 
                            }
                        </button>
                        &nbsp;
                        <button  onClick={() => {showModalInput('')}}  type="button" className={!isDark ? 'btn btn-success w-full rounded-full text-end' : 'btn btn-outline-success w-full rounded-full'}>
                            {t('Add')}
                        </button>
                        </div>
                    </div>
                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Master Support IDMCommand'} data_columns={data_columns} data_rows={data_rows} isLoading={false} progressbar={""} field_auto_sorting={""} type_sorting={undefined} iscolumns_grouping={false} arr_columnGroupingModel={undefined} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={true} in_printOptions={true} in_prosentase_progress={0} in_rows_spanning={false}  />
                </div>

                <Transition appear show={modal13} as={Fragment}>
                    <Dialog as="div" open={modal13} onClose={() => setModal13(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div id="fadein_up_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60 text-xs">
                            <div className="flex items-start justify-center min-h-screen px-4 text-xs">
                                <Dialog.Panel
                                    className={`panel animate__animated my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark ${
                                        isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'
                                    }`}
                                >
                                    <div className="flex items-center justify-between px-5 py-3 bg-primary">
                                        <h5 className="text-lg font-bold text-white-light">{t('Upload New Apps')}</h5>
                                        <button onClick={() => setModal13(false)} type="button" className="text-white-light hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                    <form>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <div className="mb-5">
                                                <label>{t('Name of Apps')}</label>
                                                <div className="flex">
                                                    <div className="w-full">
                                                        <input onChange={
                                                                (e) => setFile(e.target.files[0])
                                                        }  accept=".exe,.dll,.zip" id="txt_nama_program" type="file" name="file" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <div className="mb-5">
                                                <label>{t('Kode')}</label>
                                                <div className="flex">
                                                    <div className="w-full">
                                                    <input disabled={true} type="text" placeholder={isInput ? 'Auto Generate' : 'Kode'} onChange={FormInputKode} value={IN_DETAIL_KODE_FILE} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <div className="mb-5">
                                                <label>{t('Apps')}</label>
                                                <div className="flex">
                                                    <div className="w-full">
                                                    <input type="text" placeholder="Apps" onChange={FormInputApps} value={IN_DETAIL_APPS} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                        <div className="flex items-center justify-end mt-8">
                                            <button onClick={() => setModal13(false)} type="button" className="btn btn-outline-danger">
                                                {t('Cancel')}
                                            </button>
                                            <button  id="btn_insert" onClick={() => {
                                                    InsUploadMaster()
                                                }}  type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            
                                                {
                                                    isTextButton  ? 
                                                    <>
                                                    <span className="inline-block w-5 h-5 align-middle border-4 border-transparent rounded-full animate-spin border-l-white-light"></span>&nbsp;{t('Please Wait')}
                                                    </>
                                                    :
                                                    <>
                                                    {t('Submit')}
                                                    </> 
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                </>
                :
                <div className="relative flex items-center border p-3.5 rounded text-danger bg-danger-light border-danger ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-danger-dark-light">
                    <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                        <IconXCircle />
                    </span>
                    <span className="ltr:pr-2 rtl:pl-2">
                        <strong className="ltr:mr-1 rtl:ml-1">{t('Warning')}!</strong>{t('Access Denied')}
                    </span>
                </div>

            }
            
                        
        </>
    )
};

export default Master_Upload;