'use client'

import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";

import { IRootState } from "@/store";
import { Posts} from "@/lib/post";
import React from "react";
import { Dialog, Transition } from '@headlessui/react';
import IconX from "@/components/Icon/IconX";
import config from '@/lib/config.json';
import { AddColumn, AddID, ConvertDateFormat, DecodeAES, GenerateUniqNumber, get_branch_code, get_data_local_storage, GetToken } from "@/lib/global";
import DataTables from "@/components/table/DataTables";
import IconTrash from "@/components/Icon/IconTrash";
import Select from 'react-select';
import IconEdit from "../Icon/IconEdit";
import { useTranslation } from "react-i18next";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
import themeConfig from "@/theme.config";
 

interface FormSegmentIPProps {
    url: string,
    command: string,
    IDReport: string,
}

//-- component menu --//
const FormSegmentIP: React.FC<FormSegmentIPProps> = ({ url, command, IDReport }) => {
    const [loading, setLoading] = useState(false);
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [active, setActive] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    const [data_rows,setData_rows] = useState([]);
    const [columns,setColumns] = useState([])

    const [modal13, setModal13] = useState(false);
    const [InputNIKPemohon,setInputNIKPemohon] = useState('')
    const [InputNAMAPemohon,setInputNAMAPemohon] = useState('')
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [HOST_API_RND, setHOST_API_RND] = useState('');
    const [IN_DETAIL_KODE_CABANG,setIN_DETAIL_KODE_CABANG] = useState('');
    const [IN_DETAIL_TAMBAH_LOKASI,setIN_DETAIL_TAMBAH_LOKASI] = useState('');
    const [IN_DETAIL_TAMBAH_SEGMENT_IP,setIN_DETAIL_TAMBAH_SEGMENT_IP] = useState('');
    const [isEdit,setisEdit] = useState(false)
    const [optionsLokasi,setoptionsLokasi] = useState([])
    const [LOKASI,setLOKASI] = useState('')
    const [options5,setOption5] = useState([])
    const { t, i18n } = useTranslation();
    useEffect(() => {
        var res_host = themeConfig.host
        var res_port = parseFloat(themeConfig.port_listener)
        setHOST(res_host);
        setPORT(res_port)
        const res_host_rnd = (config.api as any).HOSTNAME_API_RND;
        setHOST(res_host);
        setHOST_API_RND(res_host_rnd);
        
        const get_data = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
        const d = JSON.parse(get_data);
        const nik = d.nik;
        const nama = d.nama;
       
        setInputNIKPemohon(nik);
        setInputNAMAPemohon(nama);
        let arr_ = get_branch_code(false,false);
        setOption5(arr_)
    }, [])

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const showModal = (cellValues:any) =>{
        setModal13(true);
        setIN_DETAIL_KODE_CABANG('')
        setIN_DETAIL_TAMBAH_LOKASI('')
        setIN_DETAIL_TAMBAH_SEGMENT_IP('')
        if(cellValues === ''){
            setisEdit(false)
        }else{
            setisEdit(true)
            const kdcab = cellValues.row.KDCAB;
            const lokasi = cellValues.row.LOKASI;
            const segment = cellValues.row.SEGMENT;
            setIN_DETAIL_KODE_CABANG(kdcab)
            setIN_DETAIL_TAMBAH_LOKASI(lokasi)
            setIN_DETAIL_TAMBAH_SEGMENT_IP(segment)
        }
    }

    const get_lokasi = (val:string) => {
        const get_data = get_data_local_storage('segment');
        const p_get_data = JSON.parse(get_data);
        let arr_ = []
        for(var i = 0;i<p_get_data.length;i++){
            var kdcab = p_get_data[i].kdcab;
            var label = p_get_data[i].label;
            var value = p_get_data[i].value;
            if(kdcab === val){
                const obj = {"label":label,"value":value}
                arr_.push(obj)
            }
            
        }
        setoptionsLokasi(arr_)
    }

    const HandleClick = (idComponent:any) => {
        try{
            const myExample = document.getElementById(idComponent);
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')

            let url = `http://${IN_HOST}:${IN_PORT}/segment/v1/ViewSegment`;
            let param = {"kdcab":IN_CMB_KODE_CABANG === '' ? IN_DETAIL_KODE_CABANG : IN_CMB_KODE_CABANG,"Lokasi":LOKASI.split('|')[0],"Segment":LOKASI.split('|')[1],"Updid":""}
            console.log('url : '+url)
            console.log(JSON.stringify(param))
            setLoading(true);
            setData_rows([]);
            const Token = GetToken()
            Posts(url,JSON.stringify(param),false,Token).then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        var parse_data = response.data;
                        
                        
                        if(parseFloat(code) === 200){
                            var d = JSON.parse(parse_data);
                            var res_data_rows_body: React.SetStateAction<any[]> = [];
                            for(var o = 0;o<d.length;o++){
                                const uniq_number = GenerateUniqNumber();
                                var arr_content = {
                                    'id':uniq_number,
                                    'EDIT':'',
                                    'KDCAB':d[o].kdcab,
                                    'LOKASI': d[o].lokasi,
                                    'SEGMENT':d[o].segment.trim(),
                                    'UPDTIME':d[o].updtime,
                                    'UPDID':d[o].updid,
                                };
                                res_data_rows_body.push(arr_content);
                            }
                            setData_rows(res_data_rows_body);

                            const column_data = [
                                { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
                                { field: 'EDIT', headerName: 'EDIT',   width: 80, minWidth: 80, maxWidth: 80,
                                renderCell: (cellValues: any) => {
                                    return (
                                        <>
                                        <a onClick={() => {showModal(cellValues)}} >
                                        <IconEdit className={"text-yellow-500 font-medium"} />
                                        </a>
                                        &nbsp;
                                        <a onClick={() => {HandleRemoveSegment(cellValues)}} >
                                        <IconTrash className={"text-danger font-medium"} />
                                        </a>
                                        </>
                                        
                                    );
                                }
                                },
                                { field: 'KDCAB', headerName: 'KDCAB',    flex:0,width: 80, minWidth: 80, maxWidth: 90},
                                { field: 'LOKASI', headerName: 'LOKASI',  flex:1,width: 150, minWidth: 150},
                                { field: 'SEGMENT', headerName: 'SEGMENT',  flex:0,width: 180, minWidth: 180},
                                { field: 'UPDTIME', headerName: 'UPDTIME',   flex:0,width: 180, minWidth: 180, maxWidth: 180},
                                { field: 'UPDID', headerName: 'UPDID',   flex:0,width: 150, minWidth: 150, maxWidth: 150},
                            ];
                            setColumns(column_data);
                            myExample.innerHTML = 'Filter'
                        }else if(code.toString().substring(0,1) === '4'){
                            if(code === 401 && msg.includes("Invalid")){
                               
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
                    myExample.innerHTML = 'Refresh'
                }
                
            );
        }catch(Ex){

        }
    }

    const HandleRemoveSegment = (cellValues:any) => {
        try{
            Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+" akan menghapus segment?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let IN_KODE_CABANG = cellValues.row.KDCAB;
                    let IN_LOKASI = cellValues.row.LOKASI;
                    let IN_SEGMENT = cellValues.row.SEGMENT;
                    let IN_UPDID = cellValues.row.UPDID;
                    let url = `http://${IN_HOST}:${IN_PORT}/segment/v1/RemoveSegment`;
                    let param = {"kdcab":IN_KODE_CABANG,"Lokasi":IN_LOKASI,"Segment":IN_SEGMENT,"Updid":IN_UPDID}
                    console.log('url : '+url)
                    console.log('param : '+param)
                        setLoading(true);
                        setData_rows([]);
                        const Token = GetToken()
                        Posts(url,JSON.stringify(param),false,Token).then(
                                (response) => {
                                    const res_data = response;
                                    var code = res_data.code;
                                    var msg = res_data.msg;
                                    var parse_data = response.data;

                                    if(parseFloat(code) === 200){
                                        Swal.fire({
                                            title: t("Information"),
                                            text: ""+parseFloat(code)+"-"+msg,
                                            icon: "success",
                                            padding: '2em',
                                            customClass: 'sweet-alerts'
                                        });
                                        HandleClick("btn_filter");
                                    }else if(code.toString().substring(0,1) === '4'){
                                        if(code === 401 && msg.includes("Invalid")){
                                            
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

    const handleUpdateSegment = (IN_KODE_CABANG:string,IN_LOKASI:string,IN_SEGMENT:string) => {
        try{
            Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+" akan menginput segment baru ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let url = `http://${IN_HOST}:${IN_PORT}/segment/v1/UpdateSegment`;
                    let param = {
                        "kdcab":IN_KODE_CABANG,
                        "Lokasi":IN_LOKASI.trim(),
                        "Segment":IN_SEGMENT.trim().split('_').join(''),
                        "Updid":InputNIKPemohon
                    }
                      
                   // console.log('url : '+url)
                        setLoading(true);
                        setData_rows([]);
                        const Token = GetToken()
                        Posts(url,JSON.stringify(param),false,Token).then(
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
                                        setisEdit(false) 
                                        setModal13(false)
                                        HandleClick("btn_filter");
                                    }else if(code.toString().substring(0,1) === '4'){
                                        if(code === 401 && msg.includes("Invalid")){
                                           
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

    const userSelectKodeCabang = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            setKODE_CABANG('')
        }else{
            //console.log('value : '+JSON.stringify(value));
            setKODE_CABANG(value.value);
            //console.log(value.value)
            get_lokasi(value.value)
        }
    };

    const userSelectLokasi = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            setLOKASI('')
        }else{
            //console.log('value : '+JSON.stringify(value));
            
            setLOKASI(value.value);
        }
    };
    

    
    const userKodeCabangForInput = (value: any) => {
        setIN_DETAIL_KODE_CABANG(value.value);
    };

    const userKodeCabangForEdit = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_DETAIL_KODE_CABANG(val);
    };

    const userLokasi = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_DETAIL_TAMBAH_LOKASI(val);
    };
    const userSegmentIP = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_DETAIL_TAMBAH_SEGMENT_IP(val);
    };

    return(
        <>
            <AntiScrapedShieldComponent in_content={
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
                                            <Select onChange={userSelectKodeCabang} id="cmb_kode_cabang" placeholder={t("Select Branch Code")} options={options5} isSearchable={true}/>
                                        </div>
                                    </div>
                                    <div className="mb-1"><label htmlFor="dropdownLeftButton">Lokasi</label></div>
                                    <div className="mb-3">
                                        <div className="w-full">
                                            <Select onChange={userSelectLokasi} id="cmb_kode_cabang" placeholder="Pilih Lokasi" options={optionsLokasi} isSearchable={true}/>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="grid grid-cols-8 gap-1 mt-4 mb-4 sm:grid-cols-2">
                        
                                            <div className="flex">
                                                <button id="btn_filter" disabled={!active} onClick={() => {
                                                                                    HandleClick('btn_filter')
                                                                                }}  type="button" className={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'}>
                                                    {t('Filter')}
                                                </button>
                                            
                                            </div>
                                            <div  className="flex">
                                            <button id="btn_input" disabled={!active} onClick={() => {
                                                                                    showModal('')
                                                                                }}  type="button" className={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'}>
                                                    {t('Add')}
                                                </button>
                                            </div>                                   
                                        
                                        </div>
                                    
                                    </div>
                                
                                </div>
                            </div>
                        
                        </div>
                    </div>
                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Master Data Segment IP'} data_columns={columns} data_rows={data_rows} isLoading={false} progressbar={""} field_auto_sorting={""} type_sorting={undefined} iscolumns_grouping={false} arr_columnGroupingModel={undefined} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={true} in_printOptions={true} in_prosentase_progress={0} in_rows_spanning={false}  />
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
                                        <div className="flex items-center justify-between bg-primary px-5 py-3 text-white dark:bg-[#121c2c]">
                                            <h5 className="text-lg font-bold">Form Upload Segment IP</h5>
                                            <button onClick={() => setModal13(false)} type="button" className="text-white hover:text-dark">
                                                <IconX />
                                            </button>
                                        </div>
                                        <div className="p-5">

                                                <div className="grid grid-cols-1 gap-1">
                                                    <div className="mb-5">
                                                    <label>{t('Select Branch')}</label>
                                                        {
                                                            isEdit ?
                                                            <input disabled={true} type="text" placeholder="Kode Cabang"  onChange={userKodeCabangForEdit}  value={IN_DETAIL_KODE_CABANG} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                            :
                                                            <Select onChange={userKodeCabangForInput} id="cmb_kode_cabang" placeholder={t("Select Branch Code")} options={options5} isSearchable={true}/> 
                                                        }
                                                        {/* <input type="text" placeholder="Kode Cabang"  onChange={userKodeCabang}  value={IN_DETAIL_KODE_CABANG} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required /> */}
                                                    </div>                                          
                                                </div>

                                                <div className="grid grid-cols-1 gap-1">
                                                    <div className="mb-5">
                                                    <label>{t('Location')}</label>
                                                        <input type="text" placeholder="Lokasi"  onChange={userLokasi}  value={IN_DETAIL_TAMBAH_LOKASI} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                    </div>                                          
                                                </div>
                                                <div className="grid grid-cols-1 gap-1">
                                                    <div className="col-span-2 mb-5">
                                                        <label>Segment IP</label>
                                                        <div className="flex">
                                                            <input type="text" placeholder="Segment IP"  onChange={userSegmentIP}  value={IN_DETAIL_TAMBAH_SEGMENT_IP} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-end mt-1">
                                                <button onClick={() => setModal13(false)} type="button" className="btn btn-outline-danger">
                                                    {t('Cancel')}
                                                </button>
                                                <button id="btn_simpan" onClick={() =>  handleUpdateSegment(IN_DETAIL_KODE_CABANG,IN_DETAIL_TAMBAH_LOKASI,IN_DETAIL_TAMBAH_SEGMENT_IP)}  type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    {t('Submit')}
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
export default FormSegmentIP;