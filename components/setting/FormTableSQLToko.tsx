'use client'

import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";

import { IRootState } from "@/store";
import { Posts, PostsFile } from "@/lib/post";
import React from "react";
import { Dialog, Transition } from '@headlessui/react';
import IconX from "@/components/Icon/IconX";
import config from '@/lib/config.json';
import { AddColumn, AddID, ConvertDateFormat, DecodeAES, get_branch_code, get_data_local_storage, GetTokenRND } from "@/lib/global";
import Select from 'react-select';
import IconTrash from "@/components/Icon/IconTrash";
import IconPencil from "@/components/Icon/IconPencil";
import DataTablesColourCell from "@/components/table/DataTablesColurCell";
import { useTranslation } from "react-i18next";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
 
interface FormTableSQLTokoProps {
    url: string,
    command: string,
    IDReport: string,
}
//-- component menu --//
const FormTableSQLToko: React.FC<FormTableSQLTokoProps> = ({ url, command, IDReport }) => {
   
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(true);
    const [data_rows,setData_rows] = useState([]);
    const [columns,setColumns] = useState([])

    const [modal13, setModal13] = useState(false);
    const [Isinput, setIsinput] = useState(true);;
    const [InputNIKPemohon,setInputNIKPemohon] = useState('')
    const [InputNAMAPemohon,setInputNAMAPemohon] = useState('')
    

    const [IN_HOST, setHOST] = useState('');
    const [HOST_API_RND, setHOST_API_RND] = useState('');
    const [options5,setOptions5] = useState([]);
    const [LoadingTipeShortcut,setLoadingTipeShortcut] = useState(false)
    const [judul_modal,setjudul_modal] = useState('')
    const [DETAIL_ID_TABLE,set_DETAIL_ID_TABLE] = useState('')
    const [DETAIL_NAMA_TABLE,set_DETAIL_NAMA_TABLE] = useState('')
    const [DETAIL_SCRIPT_SQL,set_DETAIL_SCRIPT_SQL] = useState('')
    const [DETAIL_ISI_TABLE,set_DETAIL_ISI_TABLE] = useState('')
    const [DETAIL_TRIGGER,set_DETAIL_TRIGGER] = useState('')
    const [IDShortcut,setIDShortcut] = useState('')
    const { t, i18n } = useTranslation();
    
    
    useEffect(() => {
        var rconfig = JSON.stringify(config);
        //console.log('config : '+rconfig);
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;
        const res_host_rnd = (config.api as any).HOSTNAME_API_RND;
        setHOST(res_host);
        setHOST_API_RND(res_host_rnd);
        
        const get_data = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
        const d = JSON.parse(get_data);
        const nik = d.nik;
        const nama = d.nama;
       
        setInputNIKPemohon(nik);
        setInputNAMAPemohon(nama);

    }, [])

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    
    
    const FormInputIDTable = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_DETAIL_ID_TABLE(val);  
    };

 
    const FormInputNamaTable = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_DETAIL_NAMA_TABLE(val);
    };

    const FormInputScriptTable = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_DETAIL_SCRIPT_SQL(val);
    };
 
    const FormInputIsiTable = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_DETAIL_ISI_TABLE(val);
    };

    const FormInputTrigger = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_DETAIL_TRIGGER(val);
    };

    
    const showModal = (in_judul:string,cellValues:any) =>{
        setModal13(true);
        setjudul_modal(in_judul);
        if(in_judul.includes('Input')){
            setIDShortcut('')
            set_DETAIL_ID_TABLE('')
            set_DETAIL_ISI_TABLE('')
            set_DETAIL_NAMA_TABLE('')
            set_DETAIL_SCRIPT_SQL('')
            set_DETAIL_TRIGGER('')
            setIsinput(true)
        }else{
            const id = cellValues.row.ID
            const tipe_shortcut = cellValues.row.TIPE
            GetTableSQLToko(id)
            GetTableSQLTokoById(id);
            setIsinput(false)
        }
    }

    const InsTableSQLToko = (idComponent:any,IN_DETAIL_ID_TABLE:string,IN_DETAIL_NAMA_TABLE:string,IN_DETAIL_SCRIPT_SQL:string,IN_DETAIL_ISI_TABLE:string,IN_DETAIL_TRIGGER:string,IN_OTORISATOR:string) => {
        try{
            const myExample = document.getElementById(idComponent);
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')
            
            Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+" ingin menyimpan table sql toko ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                 
                    let url = `http://${HOST_API_RND}:4646/user/IDMConsole/InsTableSQLToko`;
                    console.log('url : '+url)
                        
                        let param = {"IN_ID":IDShortcut,"IN_NAMA_TABLE":IN_DETAIL_NAMA_TABLE,"IN_SCRIPT_SQL":IN_DETAIL_SCRIPT_SQL,"IN_CONTENT_TABLE":IN_DETAIL_ISI_TABLE,"IN_CONTENT_TRIGGER":IN_DETAIL_TRIGGER,"IN_OTORISATOR":IN_OTORISATOR}
                        console.log(JSON.stringify(param))
                        const Token = GetTokenRND()
                        Posts(url,JSON.stringify(param),false,Token).then(
                                (response) => {
                                    const res_data = response;
                                    var code = res_data.code;
                                    var msg = res_data.msg;
                                    var data = res_data.data;
                                    
                                    if(parseFloat(code) === 200){
                                        Swal.fire({
                                            title: t("Information"),
                                            text: ""+parseFloat(code)+"-"+msg,
                                            icon: "success",
                                            padding: '2em',
                                            customClass: 'sweet-alerts'
                                        });
                                        
                                        setModal13(false);
                                        GetTableSQLToko("btn_filter")
                                        myExample.innerHTML = 'Simpan'
                                        set_DETAIL_ID_TABLE('')
                                        set_DETAIL_ISI_TABLE('')
                                        set_DETAIL_NAMA_TABLE('')
                                        set_DETAIL_SCRIPT_SQL('')
                                        set_DETAIL_TRIGGER('')
                                    }else if(code.toString().substring(0,1) === '4'){
                                        if(code === 401 && msg.includes("Invalid")){
                                            //RefreshToken();
                                        }else{
                                            Swal.fire({
                                                title: t("Warning"),
                                                text: ""+parseFloat(code)+"-"+msg,
                                                icon: "warning",
                                                padding: '2em',
                                                customClass: 'sweet-alerts'
                                            });
                                        }
                                        myExample.innerHTML = 'Simpan'
                                        
                                    }else{
                                        Swal.fire({
                                            title: t("Warning"),
                                            text: ""+parseFloat(code)+"-"+msg,
                                            icon: "warning",
                                            padding: '2em',
                                            customClass: 'sweet-alerts'
                                        });
                                        
                                    } 
                                    myExample.innerHTML = 'Simpan'
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
            });
            
        }catch(Ex){

        }
    }

    const DelTableSQLToko = (cellValues:any) => {
        try{
            Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+" ingin menghapus Table SQL Toko dengan Nama :  "+cellValues.row.NAMA_TABLE+" dari sistem ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let url = `http://${HOST_API_RND}:4646/user/IDMConsole/DelTableSQLToko`;
                    console.log('url : '+url)
                        setLoading(true);
                        let res_id = cellValues.row.ID;
                        let param = {"IN_ID":res_id.toString()}
                        const Token = GetTokenRND()
                        Posts(url,JSON.stringify(param),false,Token).then(
                                (response) => {
                                    const res_data = response;
                                    var code = res_data.code;
                                    var msg = res_data.msg;
                                    var data = res_data.data;
                                    
                                    if(parseFloat(code) === 200){
                                        Swal.fire({
                                            title: t("Information"),
                                            text: ""+parseFloat(code)+"-"+msg,
                                            icon: "success",
                                            padding: '2em',
                                            customClass: 'sweet-alerts'
                                        });
                                        
                                        GetTableSQLToko("btn_filter")
                                    }else if(code.toString().substring(0,1) === '4'){
                                        if(code === 401 && msg.includes("Invalid")){
                                            //RefreshToken();
                                        }else{
                                            Swal.fire({
                                                title: t("Warning"),
                                                text: ""+parseFloat(code)+"-"+msg,
                                                icon: "warning",
                                                padding: '2em',
                                                customClass: 'sweet-alerts'
                                            });
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
            });
            
        }catch(Ex){

        }
    }

    const GetTableSQLTokoById = (IN_ID:string) => {
        let url = `http://${HOST_API_RND}:4646/user/IDMConsole/GetTableSQLTokoById`;
        let param = {"IN_ID":IN_ID}
        const Token = GetTokenRND()
            Posts(url,JSON.stringify(param),false,Token).then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        if(parseFloat(code) === 200){
                            var data_body = res_data.data;
                            //set_DETAIL_TIPE_SHORTCUT(data_body[0].TIPE)
                            set_DETAIL_ID_TABLE(data_body[0].ID)
                            set_DETAIL_NAMA_TABLE(data_body[0].NAMA_TABLE)
                            set_DETAIL_SCRIPT_SQL(data_body[0].SCRIPT_SQL)
                            set_DETAIL_ISI_TABLE(data_body[0].CONTENT_TABLE)
                            set_DETAIL_TRIGGER(data_body[0].CONTENT_TRIGGER)
                        }else if(code.toString().substring(0,1) === '4'){
                            if(code === 401 && msg.includes("Invalid")){
                                //RefreshToken();
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
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

    const GetTableSQLToko = (idComponent:any) => {
        try{
            setIDShortcut('')
            const myExample = document.getElementById(idComponent);
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')

            let url = `http://${HOST_API_RND}:4646/user/IDMConsole/GetTableSQLToko`;
            let param = {"":""}
            console.log('url : '+url)
            console.log('param : '+JSON.stringify(param))
                setLoading(true);
                const Token = GetTokenRND()
                Posts(url,JSON.stringify(param),false,Token).then(
                        (response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            if(parseFloat(code) === 200){
                                var data_body = res_data.data;
                                var rows = data_body[0].ROWS;
                                var cols = data_body[0].COLUMNS;
                                var res_rows = AddID(rows);
                                setData_rows(res_rows);
                                const item_new = { 
                                    field: 'ACTION', headerName: 'ACTION',  flex: 0,  width: 90, minWidth: 90, maxWidth: 90, align:'center',headerAlign: 'center',
                                    renderCell: (cellValues: any) => {
                                        return (
                                           <>
                                                <div className="grid grid-cols-2">
                                                    <div>
                                                        <a onClick={() => {showModal('Edit Table SQL',cellValues)}} data-twe-toggle="tooltip" title="Edit Shortcut">
                                                                <span className="text-warning"><IconPencil  /></span>
                                                        </a>
                                                    </div>
                                                    <div>
                                                        <a onClick={() => {DelTableSQLToko(cellValues)}} data-twe-toggle="tooltip" title="Hapus Shortcut">
                                                            <span className="text-danger"><IconTrash  /></span>
                                                        </a>
                                                    </div>
                                                </div>
                                                
                                           </>
                                        );
                                    }
                                };
                                AddColumn(cols,item_new);
                                setColumns(cols);
                                setLoading(false)
                                myExample.innerHTML = 'Filter'
                            }else if(code.toString().substring(0,1) === '4'){
                                if(code === 401 && msg.includes("Invalid")){
                                    //RefreshToken();
                                }else{
                                    Swal.fire({
                                        title: t("Warning"),
                                        text: ""+parseFloat(code)+"-"+msg,
                                        icon: "warning",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    });
                                }
                                myExample.innerHTML = 'Filter'
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                myExample.innerHTML = 'Filter'
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
                        myExample.innerHTML = 'Filter'
                    }
                    
                );
        }catch(Ex){

        }
    }
 
    return(
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                <div className="flex items-end mb-3 justify-left">
                    <div className="max-w-[30rem] w-full  dark:shadow-none">
                        <div className="mb-3">
                            <div className="flex">
                                <button id="btn_filter" disabled={!active} onClick={() => {
                                                                    GetTableSQLToko('btn_filter')
                                                                }}  type="button" className={!isDark ? 'btn btn-primary w-full rounded-full text-end' : 'btn btn-outline-primary w-full rounded-full'}>
                                    {t('Refresh')}
                                </button>
                                &nbsp;
                                <button id="btn_input" disabled={!active} onClick={() => {
                                                                    showModal("Input Table Baru",'')
                                                                }}  type="button" className={!isDark ? 'btn btn-success w-full rounded-full text-end' : 'btn btn-outline-success w-full rounded-full'}>
                                    {t('Add')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <DataTablesColourCell in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Master Data Table SQL Toko'} data_columns={columns} data_rows={data_rows} isLoading={false} progressbar={""} field_auto_sorting={"ID"} type_sorting={"desc"} iscolumns_grouping={false} arr_columnGroupingModel={undefined} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={true} in_printOptions={true} in_is_same_colouring_all_rows={true} in_name_column_cek={""}  />
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
                                    className={`panel animate__animated my-8 w-full max-w-5xl overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${
                                        isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'
                                    }`}
                                >
                                    <div className="flex items-center justify-between px-5 py-3 bg-primary dark:bg-primary">
                                        <h5 className="text-lg font-bold text-white">{judul_modal}</h5>
                                        <button onClick={() => setModal13(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <form>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="mb-5">
                                                <label>ID</label>
                                                <div className="flex">
                                                    <input disabled={true} type="text" placeholder="Auto Generate" onChange={FormInputIDTable} value={DETAIL_ID_TABLE} className="form-input ltr:rounded-l-none rtl:rounded-r-none text-xs  disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed" required />
                                                </div>
                                            </div>
                                            <div className="mb-5">
                                                <label>Table Name</label>
                                                <div className="flex">
                                                    <div className="w-full">
                                                    <input type="text" placeholder="Nama Table" onChange={FormInputNamaTable} value={DETAIL_NAMA_TABLE} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-5">
                                                <label>Script SQL</label>
                                                <div className="flex">
                                                    <div className="w-full">
                                                    <textarea  rows={10} cols={50} placeholder="Script SQL" onChange={FormInputScriptTable} value={DETAIL_SCRIPT_SQL} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-5">
                                                <label>Content of Table</label>
                                                <div className="flex">
                                                    <div className="w-full">
                                                    <textarea  rows={10} cols={50} placeholder="Isi Table" onChange={FormInputIsiTable} value={DETAIL_ISI_TABLE} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-5">
                                                <label>Trigger</label>
                                                <div className="flex">
                                                    <div className="w-full">
                                                    <textarea  rows={10} cols={50} placeholder="Isi Trigger" onChange={FormInputTrigger} value={DETAIL_TRIGGER} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required></textarea>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                        </form>
                                        <div className="flex items-center justify-end mt-8">
                                            <button onClick={() => setModal13(false)} type="button" className="btn btn-outline-danger">
                                                Cancel
                                            </button>
                                            <button  id="btn_insert" onClick={() => {
                                                    InsTableSQLToko("btn_insert",DETAIL_ID_TABLE,DETAIL_NAMA_TABLE,DETAIL_SCRIPT_SQL,DETAIL_ISI_TABLE,DETAIL_TRIGGER,InputNIKPemohon)
                                                }}  type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                </>   
            } />
        </>
    )
};

export default FormTableSQLToko;

