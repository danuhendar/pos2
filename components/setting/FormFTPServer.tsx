'use client'

import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";

import { IRootState } from "@/store";
import { Posts } from "@/lib/post";
import React from "react";
import { Dialog, Transition } from '@headlessui/react';
import IconX from "@/components/Icon/IconX";
import config from '@/lib/config.json';
import { AddColumn, AddID, DecodeAES, get_branch_code, get_data_local_storage, GetTokenRND } from "@/lib/global";
import Select from 'react-select';
import IconTrash from "@/components/Icon/IconTrash";
import IconPencil from "@/components/Icon/IconPencil";
import DataTablesColourCell from "@/components/table/DataTablesColurCell";
import { useTranslation } from "react-i18next";
import IconSend from "../Icon/IconSend";
import DataTables from "../table/DataTables";
import IconXCircle from "../Icon/IconXCircle";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
 
interface FormFTPServerProps {
    url: string,
    command: string,
    IDReport: string,
}

//-- component menu --//
const FormFTPServer: React.FC<FormFTPServerProps> = ({ url, command, IDReport }) => {
   
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(true);
    const [data_rows,setData_rows] = useState([]);
    const [columns,setColumns] = useState([])

    const [modal13, setModal13] = useState(false);
    const [Isinput, setIsinput] = useState(true);;
    const [InputNIKPemohon,setInputNIKPemohon] = useState('')
    const [InputNAMAPemohon,setInputNAMAPemohon] = useState('')
    const [Divisi,setDivisi] = useState('')
    

    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [HOST_API_RND, setHOST_API_RND] = useState('');
    const [options5,setOption5] = useState([])
    const [judul_modal,setjudul_modal] = useState('')
    const [IN_DETAIL_KDCAB,set_IN_DETAIL_KDCAB] = useState('')
    const [IN_DETAIL_HOST,set_IN_DETAIL_HOST] = useState('')
    const [IN_DETAIL_USERNAME,set_IN_DETAIL_USERNAME] = useState('')
    const [IN_DETAIL_PASSWORD,set_IN_DETAIL_PASSWORD] = useState('')
    const [IN_DETAIL_PORT,set_IN_DETAIL_PORT] = useState('')
    const { t, i18n } = useTranslation();
    const [isTextButton,setisTextButton] = useState(false)
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    
    
    useEffect(() => {
       var res_host = themeConfig.host
        var res_port = parseFloat(themeConfig.port_listener)
        var res_host_rnd = themeConfig.hostrnd
        setHOST(res_host);
        setPORT(res_port)
        setHOST_API_RND(res_host_rnd);
        
        const get_data = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
        const d = JSON.parse(get_data);
        const nik = d.nik;
        const nama = d.nama;
        const lokasi = d.lokasi;
        const divisi  = d.divisi;
        setDivisi(divisi)
       
        setInputNIKPemohon(nik);
        setInputNAMAPemohon(nama);
        if(lokasi === 'EDP HO'){
            let arr_ = []
            arr_.push({'label':'-- Semua --',value:'%'})
            let arrdata = get_branch_code(true,false);
            for(var i = 0;i<arrdata.length;i++){
                arr_.push(arrdata[i])
            }
            setOption5(arr_)
        }else if(lokasi === 'REGION'){
            let arr_ = get_branch_code(false,true);
            setOption5(arr_)
        }else{
            let arr_ = get_branch_code(false,false);
            setOption5(arr_)
        }
    }, [])

    

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const FormInputKodeCabang = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_KDCAB(val);  
    };

    const FormInputHost = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_HOST(val);  
    };

 
    const FormInputUsername = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_USERNAME(val);
    };

    const FormInputPassword = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_PASSWORD(val);
    };
 
    const FormInputPort = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_PORT(val);
    };

    
    const userSelectKodeCabangInput = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            set_IN_DETAIL_KDCAB('')
        }else{
            //console.log('value : '+JSON.stringify(value));
            set_IN_DETAIL_KDCAB(value.value);
        }
    };

    const userSelectKodeCabang = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            setKODE_CABANG('')
        }else{
            //console.log('value : '+JSON.stringify(value));
            setKODE_CABANG(value.value);
        }
    };

    const showModal = (in_judul:string,cellValues:any) =>{
        setModal13(true);
        setjudul_modal(in_judul);
        if(in_judul.includes('Input')){
            set_IN_DETAIL_KDCAB('')
            set_IN_DETAIL_HOST('')
            set_IN_DETAIL_USERNAME('')
            set_IN_DETAIL_PASSWORD('')
            set_IN_DETAIL_PORT('')
            setIsinput(true)
        }else{
            const res_host = cellValues.row.HOST
            const res_username = cellValues.row.USERNAME
            const res_password = cellValues.row.PASSWORD
            const res_port = cellValues.row.PORT
            GetFTPServer(IN_CMB_KODE_CABANG)
            setIsinput(false)
            //set_IN_DETAIL_KDCAB('')
            set_IN_DETAIL_HOST(res_host)
            set_IN_DETAIL_USERNAME(res_username)
            set_IN_DETAIL_PASSWORD(res_password)
            set_IN_DETAIL_PORT(res_port)
        }
    }

    const InsFTPServer = (IN_DETAIL_KDCAB:string,IN_DETAIL_HOST:string,IN_DETAIL_USERNAME:string,IN_DETAIL_PASSWORD:string,IN_DETAIL_PORT:string,IN_OTORISATOR:string) => {
        try{
           
            Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+t(' Save ')+" ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                 
                    let url = `http://${HOST_API_RND}:4646/user/IDMConsole/InsFTPServer`;
                    console.log('url : '+url)
                        
                        let param = {"IN_KODE_CABANG":IN_DETAIL_KDCAB,"IN_HOST":IN_DETAIL_HOST,"IN_USERNAME":IN_DETAIL_USERNAME,"IN_PASSWORD":IN_DETAIL_PASSWORD,"IN_PORT":IN_DETAIL_PORT,"IN_OTORISATOR":IN_OTORISATOR}
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
                                        GetFTPServer(IN_DETAIL_KDCAB)
                                        set_IN_DETAIL_KDCAB('')
                                        set_IN_DETAIL_HOST('')
                                        set_IN_DETAIL_USERNAME('')
                                        set_IN_DETAIL_PASSWORD('')
                                        set_IN_DETAIL_PORT('')
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
                                    text: error.toString(),
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                
                            }
                            
                        );
                }
            });
            
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }
    }

    const DelFTPServer = (cellValues:any) => {
        try{
            Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+" "+t('Delete')+" ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let url = `http://${HOST_API_RND}:4646/user/IDMConsole/DelFTPServer`;
                    console.log('url : '+url)
                        setLoading(true);
                        let res_kdcab = cellValues.row.KDCAB;
                        let param = {"IN_KODE_CABANG":res_kdcab.toString()}
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
                                        
                                        GetFTPServer(IN_DETAIL_KDCAB)
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
                                    text:t('401-Error UnAutorized, Check your connection or call administrator!'),
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

    const GetFTPServer = (IN_KODE_CABANG:string) => {
        try{
            let url = `http://${HOST_API_RND}:4646/user/IDMConsole/GetFTPServer`;
            let param = {"IN_KODE_CABANG":(IN_KODE_CABANG === '' ? '%' : IN_KODE_CABANG+'%')}
            console.log('url : '+url)
            console.log('param : '+JSON.stringify(param))
                setLoading(true);
                setisTextButton(true)
                const Token = GetTokenRND()
                Posts(url,JSON.stringify(param),false,Token).then(
                        (response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            if(parseFloat(code) === 200){
                                var data_body = res_data.data;
                                var rows = data_body[0].ROWS;
                                console.log(rows)
                                var cols = data_body[0].COLUMNS;
                                var res_rows = AddID(rows);
                                setData_rows(res_rows);
                                const item_new = { 
                                    field: 'ACTION', headerName: 'ACTION',  flex: 0,  width: 90, minWidth: 90, maxWidth: 90, align:'center',headerAlign: 'center',
                                    renderCell: (cellValues: any) => {
                                        return (
                                           <>
                                            <div className="flex flex-row gap-2">
                                                <div className="mt-1">
                                                    <a onClick={() => {showModal('Edit Data FTP Server',cellValues)}} data-twe-toggle="tooltip" title="Edit Data">
                                                        <span className="text-warning"><IconPencil  /></span>
                                                    </a>
                                                </div>
                                                <div className="mt-1">
                                                    <a onClick={() => {DelFTPServer(cellValues)}} data-twe-toggle="tooltip" title="Delete Data">
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
                                setisTextButton(false)
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
                        setLoading(false)
                    }
                    
                );
        }catch(Ex){

        }
    }
 
    return(
       <>
        <AntiScrapedShieldComponent in_content={
            <>
                {   
                    Divisi.includes('ADMINISTRATOR') ? 
                    <>
                    <div className="flex items-end grid-cols-2 gap-3 mb-3 md:grid-cols-2 justify-left">
                        <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
                            <div className="flex flex-col items-center p-2 sm:flex-row">
                                <div className="flex-1 pr-4 text-center ltr:sm:pl-4 rtl:sm:pr-1 sm:text-left">
                                    
                                    <div className="mb-3">
                                    <div className="flex font-semibold item-center">   
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                        </svg>
                                        <h2 className="mt-1 ml-1 text-center text-dark text-1xl dark:text-white-light">Form Filter</h2>
                                    </div>
                                    </div>

                                    <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Branch Code')}</label></div>
                                    <div className="mb-3">
                                        <div className="w-full">
                                            <Select onChange={userSelectKodeCabang} id="cmb_kode_cabang" placeholder={t("Select Branch Code")} options={options5} isMulti={false} isSearchable={true}/>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex">
                                            <button id="btn_filter" disabled={!active} onClick={() => {
                                                                                GetFTPServer(IN_CMB_KODE_CABANG)
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
                                            <button id="btn_input" disabled={!active} onClick={() => {
                                                                                showModal('Input','')
                                                                            }}  type="button" className={!isDark ? 'btn btn-success w-full rounded-full text-end' : 'btn btn-outline-success w-full rounded-full'}>
                                                {t('Add')}
                                            </button>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        
                        </div>
                    </div>
                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Master Data FTP Server'} data_columns={columns} data_rows={data_rows} isLoading={false} progressbar={""} field_auto_sorting={"ID"} type_sorting={"desc"} iscolumns_grouping={false} arr_columnGroupingModel={undefined} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={true} in_printOptions={true} in_prosentase_progress={0} in_rows_spanning={false} />
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
                                        className={`panel animate__animated my-8 w-full max-w-2xl overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${
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
                                                    <label>Cabang</label>
                                                    <div className="flex">
                                                        <div className="w-full">
                                                        {
                                                            Isinput ?
                                                            <Select onChange={userSelectKodeCabangInput} id="cmb_kode_cabang" placeholder={t("Select Branch Code")} options={options5} isMulti={false} isSearchable={true}/>
                                                            :
                                                            <input type="text" placeholder={t('Select Branch')} onChange={FormInputKodeCabang} value={IN_DETAIL_KDCAB} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                        }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-5">
                                                    <label>{t('Host')}</label>
                                                    <div className="flex">
                                                        <div className="w-full">
                                                        <input type="text" placeholder={t('Host')} onChange={FormInputHost} value={IN_DETAIL_HOST} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-5">
                                                    <label>{t('Username')}</label>
                                                    <div className="flex">
                                                        <div className="w-full">
                                                        <input type="text" placeholder={t('Username')} onChange={FormInputUsername} value={IN_DETAIL_USERNAME} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-5">
                                                    <label>Password</label>
                                                    <div className="flex">
                                                        <div className="w-full">
                                                        <input type="text" placeholder={t('Password')} onChange={FormInputPassword} value={IN_DETAIL_PASSWORD} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div className="mb-5">
                                                    <label>Port</label>
                                                    <div className="flex">
                                                        <div className="w-full">
                                                        <input type="text" placeholder={t('Port')} onChange={FormInputPort} value={IN_DETAIL_PORT} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
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
                                                        InsFTPServer(IN_DETAIL_KDCAB,IN_DETAIL_HOST,IN_DETAIL_USERNAME,IN_DETAIL_PASSWORD,IN_DETAIL_PORT,InputNIKPemohon)
                                                    }}  type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                
                                                    {
                                                        isTextButton  ? 
                                                        <>
                                                        <span className="inline-block w-5 h-5 align-middle border-4 border-transparent rounded-full animate-spin border-l-white-light"></span>&nbsp;{t('Please Wait')}
                                                        </>
                                                        :
                                                        <>
                                                        <IconSend />&nbsp; {t('Submit')}
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
        } />
       </> 
       
    )
};
export default FormFTPServer;