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
import { AddColumn, AddID, ConvertDateFormat, DecodeAES, get_data_local_storage, GetTokenRND } from "@/lib/global";
import DataTables from "@/components/table/DataTables";
import IconTrash from "@/components/Icon/IconTrash";
import { useTranslation } from "react-i18next";
import themeConfig from "@/theme.config";
//-- component menu --//
const Update_Program = () => {
   
    const [loading, setLoading] = useState(false);
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [active, setActive] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    const [data_rows,setData_rows] = useState([]);
    const [columns,setColumns] = useState([])

    const [modal13, setModal13] = useState(false);
    const [isDisabled,setIsDisabled] = useState(false);
    const [file, setFile] = useState(null);
    const [IN_DETAIL_VERSI,setIN_DETAIL_VERSI] = useState("");
    const [InputNIKPemohon,setInputNIKPemohon] = useState('')
    const [InputNAMAPemohon,setInputNAMAPemohon] = useState('')
    const [IN_DETAIL_NAMA_PROGRAM,set_IN_DETAIL_NAMA_PROGRAM] = useState('')

    const [IN_HOST, setHOST] = useState('');
    const [HOST_API_RND, setHOST_API_RND] = useState('');
    const Token = useSelector((state: IRootState) => state.themeConfig.TokenRND);
    const { t, i18n } = useTranslation();
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        const res_host_rnd = themeConfig.hostrnd
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
    
    const FormInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          return;
        }
        const f = e.target.files[0]
        setFile(f)
    }
    
 
    const FormInputNamaProgram = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_NAMA_PROGRAM(val);
    };

    const FormInputVersiProgram = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_DETAIL_VERSI(val);
    };

    const showModal = () =>{
        setModal13(true);
        setIN_DETAIL_VERSI('');
    }

    const delProgramBackoff = (cellValues:any) => {
        try{
            Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+" ingin menghapus program "+cellValues.row.NAMA_PROGRAM+" dari sistem ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let url = `http://192.168.131.104:4646/user/IDMConsole/DelProgramBackoff`;
                    console.log('url : '+url)
                        setLoading(true);
                        let res_id = cellValues.row.ID;
                        let param = {"IN_ID":res_id.toString(),"IN_NAMA_PROGRAM":cellValues.row.NAMA_PROGRAM,"IN_OTORISATOR":InputNIKPemohon}
                        const Token = GetTokenRND();
                        Posts(url,JSON.stringify(param),false,Token).then(
                                (response) => {
                                    const res_data = response;
                                    var code = res_data.code;
                                    var msg = res_data.msg;
                                    var data = res_data.data;
                                    
                                    if(parseFloat(code) === 200){
                                        Swal.fire({
                                            title: "Informasi",
                                            text: ""+parseFloat(code)+"-"+msg,
                                            icon: "success",
                                            padding: '2em',
                                            customClass: 'sweet-alerts'
                                        });
                                        setModal13(false);
                                        HandleGetProgramBackoff("btn_refresh")
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

    const HandleGetProgramBackoff = (idComponent:any) => {
        try{
            const myExample = document.getElementById(idComponent);
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')

            let url = `http://192.168.131.104:4646/user/IDMConsole/GetProgramBackoff`;
            let param = {"":""}
            console.log('url : '+url)
                setLoading(true);
                Posts(url,JSON.stringify(param),false,Token).then(
                        (response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                           
                            
                            if(parseFloat(code) === 200){
                                var data_body = res_data.data;
                                //console.log(JSON.stringify(data_body))
                             
                                var rows = data_body[0].ROWS;
                                //console.log(JSON.stringify(rows))
                                var cols = data_body[0].COLUMNS;
                                var res_rows = AddID(rows);
                                setData_rows(res_rows);
                                const item_new = { 
                                    field: 'ACTION', headerName: 'ACTION',  flex: 0,  width: 80, minWidth: 80, maxWidth: 80, align:'center',headerAlign: 'center',
                                    renderCell: (cellValues: any) => {
                                        return (
                                           <>
                                                <div className="flex flex-row gap-3 mt-2">
                                                    <div className="items-center">
                                                        <a onClick={() => {delProgramBackoff(cellValues)}} data-twe-toggle="tooltip" title="Hapus Program Backoff">
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
                                myExample.innerHTML = 'Refresh'
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
                                myExample.innerHTML = 'Refresh'
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                myExample.innerHTML = 'Refresh'
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

    const handleUploadProgram = (idComponent:any) => {
        try{
           
            const myExample = document.getElementById(idComponent);
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')

            let res_versi = IN_DETAIL_VERSI;
           
            const nama = file.name;
            const type = file.type;
            const size = file.size;
            const lastModified = ConvertDateFormat(file.lastModified,true);
            const versi = res_versi;

          

            const formData = new FormData();
            formData.append("IN_VERSI", res_versi);
            formData.append("IN_NAMA_PROGRAM", nama);
            formData.append("IN_TYPE", type);
            formData.append("IN_SIZE", size);
            formData.append("IN_LAST_MODIFIED", lastModified);
            formData.append("files", file);
            formData.append("IN_OTORISATOR", InputNAMAPemohon);
            

            let url = `http://192.168.131.104:4646/user/IDMConsole/InsProgramBackoff`;
            console.log('url : '+url)
                setLoading(true);
                PostsFile(url,formData,false).then(
                        (response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            var data = res_data.data;
                            
                            if(parseFloat(code) === 200){
                                Swal.fire({
                                    title: "Informasi",
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "success",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                HandleGetProgramBackoff("btn_refresh")
                                setModal13(false);
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
                                myExample.innerHTML = 'Simpan'
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
                        myExample.innerHTML = 'Simpan'
                    }
                    
                );
        }catch(Ex){

        }
    }
    return(
        <>  
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    {t('Setting')}
                </li>
                <Link href="/apps/setting/update_program/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Update Apps')}</span>
                </li>
                </Link>
            </ul>
            </div>

           
            <div className="grid grid-cols-8 gap-4 mt-4 mb-4 sm:grid-cols-5">
                
                    <div>
                        <button id="btn_show_modal"  onClick={
                            () => {showModal()}}
                         className={!isDark ? 'btn btn-success w-full rounded-full text-end' : 'btn btn-outline-success w-full rounded-full'}>Add</button>
                    </div>
                    <div>
                        <button disabled={isDisabled} 
                                    id="btn_refresh" 
                                    onClick={
                                        () => {HandleGetProgramBackoff("btn_refresh")}}
                                    className={!isDark ? 'btn btn-warning w-full rounded-full text-end' : 'btn btn-outline-warning w-full rounded-full'}>Refresh</button>
                    </div>
               
            </div>
           
            <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Master Data Program Backoff'} data_columns={columns} data_rows={data_rows} isLoading={false} progressbar={""} field_auto_sorting={""} type_sorting={undefined} iscolumns_grouping={false} arr_columnGroupingModel={undefined} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={true} in_printOptions={true} in_prosentase_progress={0} in_rows_spanning={false}  />
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
                                            <label>{t('Select')}</label>
                                            <div className="flex">
                                                <div className="w-full">
                                                    {/* <input onChange={(e) => setFile(e.target.files[0])}  accept=".zip" id="txt_nama_program" type="file" name="file" className="form-control" /> */}
                                                    <input onChange={FormInputFile}  accept=".zip" id="txt_nama_program" type="file" name="file" className="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div className="mb-5">
                                            <label>{t('Name of Apps')}</label>
                                            <div className="flex">
                                                <div className="w-full">
                                                <input onChange={FormInputNamaProgram} type="text" placeholder={t('Name of Apps')} value={IN_DETAIL_NAMA_PROGRAM} className="text-xs form-input" required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div className="mb-5">
                                            <label>{t('Version')}</label>
                                            <div className="flex">
                                                <div className="w-full">
                                                <input type="text" placeholder="Versi" onChange={FormInputVersiProgram} value={IN_DETAIL_VERSI} className="text-xs form-input" required />
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
                                                handleUploadProgram("btn_insert")
                                            }}  type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
    )
};
export default Update_Program;