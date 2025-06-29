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
import { AddColumn, AddID, ConvertDateFormat, DecodeAES, get_branch_code, get_data_local_storage } from "@/lib/global";
import DataTables from "@/components/table/DataTables";
import Select from 'react-select';
import IconTrash from "@/components/Icon/IconTrash";
import IconPencil from "@/components/Icon/IconPencil";
import DataTablesColourCell from "@/components/table/DataTablesColurCell";
import { useTranslation } from "react-i18next";
 

//-- component menu --//
const Shortcut = () => {
   
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(true);
    const [data_rows,setData_rows] = useState([]);
    const [columns,setColumns] = useState([])

    const [modal13, setModal13] = useState(false);
    const [Isinput, setIsinput] = useState(true);
    const [file, setFile] = useState(null);
    const [IN_DETAIL_VERSI,setIN_DETAIL_VERSI] = useState("");
    const [InputNIKPemohon,setInputNIKPemohon] = useState('')
    const [InputNAMAPemohon,setInputNAMAPemohon] = useState('')
    const [TipeShortcut,setTipeShortcut] = useState('');

    const [IN_HOST, setHOST] = useState('');
    const [HOST_API_RND, setHOST_API_RND] = useState('');
    const [options5,setOptions5] = useState([]);
    const [LoadingTipeShortcut,setLoadingTipeShortcut] = useState(false)
    const [judul_modal,setjudul_modal] = useState('')
    const [DETAIL_TIPE_SHORTCUT,set_DETAIL_TIPE_SHORTCUT] = useState('')
    const [DETAIL_NAMA_SHORTCUT,set_DETAIL_NAMA_SHORTCUT] = useState('')
    const [DETAIL_KETERANGAN,set_DETAIL_KETERANGAN] = useState('')
    const [DETAIL_SCRIPT_COMMAND_CHECK,set_DETAIL_SCRIPT_COMMAND_CHECK] = useState('')
    const [DETAIL_SCRIPT_COMMAND_EXECUTE,set_DETAIL_SCRIPT_COMMAND_EXECUTE] = useState('')
    const [DETAIL_IS_AKTIF,set_DETAIL_IS_AKTIF] = useState('')
    const [DETAIL_OTORISATOR,set_DETAIL_OTORISATOR] = useState('')
    
    const [isCheckedISAktif,setisCheckedISAktif] = useState(false)
    const [CMB_DETAIL_TIPE_SHORTCUT,set_CMB_DETAIL_TIPE_SHORTCUT] = useState({})
    const [IDShortcut,setIDShortcut] = useState('')
    const [optionsKodeCabang,setoptionsKodeCabang] = useState([])
    const Token = useSelector((state: IRootState) => state.themeConfig.TokenRND);
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
        GetTipeShortcut(res_host_rnd)
        let arr_ = get_branch_code(true,false);
        setoptionsKodeCabang(arr_)
    }, [])

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    
    
    const userSelectTipeShortcut = (value: any) => {
        if(value.length == 0){
            setTipeShortcut('')
        }else{
            setTipeShortcut(value.value);
        }
    };

 

     
    const FormSelecttipeShortcut = (value: any) => {
        if(value.length == 0){
            set_DETAIL_TIPE_SHORTCUT('')
        }else{
            set_DETAIL_TIPE_SHORTCUT(value.value);
        }
    };

    const FormSelecttipeShortcutInput = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_DETAIL_TIPE_SHORTCUT(val);  
    };

 
    const FormSelectKeterangan = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_DETAIL_KETERANGAN(val);
    };

    const FormInputNamaShortcut = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_DETAIL_NAMA_SHORTCUT(val);
    };
 
    const FormInputScriptCommandCheck = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_DETAIL_SCRIPT_COMMAND_CHECK(val);
    };

    const FormInputScriptCommandExecute = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_DETAIL_SCRIPT_COMMAND_EXECUTE(val);
    };
 
    const FormSelectISAktif = () => {
        setisCheckedISAktif(!isCheckedISAktif)
    }

    const [DETAIL_BRANCH_COVERAGE,set_DETAIL_BRANCH_COVERAGE] = useState('')
    const FormCoverage = (value: any) => {
        try{
            var arr = "";
            if(value[0].label === '-- Semua --'){
                for(var i = 0;i<value.length;i++){
                    //console.log(value[i].value);
                    if(i === (value.length - 1 )){
                        arr = arr+value[i].value;
                    }else{
                        arr = arr+value[i].value+",";
                    }
                    
                }
                arr = arr+",REG1,REG2,REG3,REG4,HO";
                console.log(arr);
            }else{
                for(var i = 0;i<value.length;i++){
                    //console.log(value[i].value);
                    if(i === (value.length - 1 )){
                        arr = arr+value[i].value;
                    }else{
                        arr = arr+value[i].value+",";
                    }
                    
                }
                arr = arr;
                console.log(arr);
            }
           
          
            set_DETAIL_BRANCH_COVERAGE(arr);
        }catch(Ex){
            console.log(Ex.toString())
        }
            
           
           
    }; 

    


    const showModal = (in_judul:string,cellValues:any) =>{
        setModal13(true);
        setIN_DETAIL_VERSI('');
        setjudul_modal(in_judul);
        if(in_judul.includes('Input')){
            setIDShortcut('')
            setisCheckedISAktif(false);
            setIsinput(true)
        }else{
            const id = cellValues.row.ID
            const tipe_shortcut = cellValues.row.TIPE
            setIDShortcut(id)
            GetShortcutById(id);
            setIsinput(false)
            set_DETAIL_TIPE_SHORTCUT(tipe_shortcut)
        }
    }
    
    const GetTipeShortcut = (in_host:string) => {
        try{
            
                    let url = `http://${in_host}:4646/user/IDMConsole/GetTipeShortcut`;
                    console.log('url : '+url)
                        setLoadingTipeShortcut(true);
                        let param = {"":""}
                        Posts(url,JSON.stringify(param),false,Token).then(
                                (response) => {
                                    const res_data = response;
                                    var code = res_data.code;
                                    var msg = res_data.msg;
                                    var data = res_data.data;
                                    
                                    if(parseFloat(code) === 200){
                                        let arr = [];
                                        for(var i = 0;i<data.length;i++){
                                            const obj ={ value: data[i].KODE, label:  data[i].CONTENT} 
                                            arr.push(obj)
                                        }
                                        setOptions5(arr);
                                        setLoadingTipeShortcut(false)
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
                                    setLoadingTipeShortcut(false)
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
              
        }catch(Ex){

        }
    }

    const InsShortcut = (idComponent:any,IN_BRANCH_COVERAGE:string,IN_TIPE:string,IN_NAMA:string,IN_KETERANGAN:string,IN_CHECK:String,IN_EXECUTE:string,IN_IS_AKT:string,IN_OTORISATOR:string) => {
        try{
            const myExample = document.getElementById(idComponent);
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')
            
            Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+" ingin menyimpan shortcut ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                 
                    let url = `http://${HOST_API_RND}:4646/user/IDMConsole/InsShortcut`;
                    console.log('url : '+url)
                        
                        let param = {"IN_ID":IDShortcut,"IN_BRANCH_COVERAGE":IN_BRANCH_COVERAGE,"IN_TIPE":IN_TIPE,"IN_NAMA":IN_NAMA,"IN_KETERANGAN":IN_KETERANGAN,"IN_SCRIPT_COMMAND_CHECK":IN_CHECK,"IN_SCRIPT_COMMAND_EXECUTE":IN_EXECUTE,"IN_IS_AKTIF":(isCheckedISAktif ? 1 : 0),"IN_OTORISATOR":IN_OTORISATOR}
                        console.log(JSON.stringify(param))
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
                                        GetShortcut("btn_filter")
                                        myExample.innerHTML = 'Simpan'
                                        set_DETAIL_TIPE_SHORTCUT('')
                                        set_DETAIL_NAMA_SHORTCUT('')
                                        set_DETAIL_KETERANGAN('')
                                        set_DETAIL_SCRIPT_COMMAND_CHECK('')
                                        set_DETAIL_SCRIPT_COMMAND_EXECUTE('')


                                        setisCheckedISAktif(false)
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

    const DelShortcut = (cellValues:any) => {
        try{
            Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+" ingin menghapus shortcut dengan Nama :  "+cellValues.row.NAMA+" dari sistem ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let url = `http://${HOST_API_RND}:4646/user/IDMConsole/DelShortcut`;
                    console.log('url : '+url)
                        setLoading(true);
                        let res_id = cellValues.row.ID;
                        let param = {"IN_ID":res_id.toString()}
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
                                        
                                        GetShortcut("btn_filter")
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

    const GetShortcutById = (IN_ID:string) => {
        let url = `http://${HOST_API_RND}:4646/user/IDMConsole/GetShortcutById`;
        let param = {"IN_ID":IN_ID}
           
            Posts(url,JSON.stringify(param),false,Token).then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        if(parseFloat(code) === 200){
                            var data_body = res_data.data;
                            //set_DETAIL_TIPE_SHORTCUT(data_body[0].TIPE)
                            set_DETAIL_NAMA_SHORTCUT(data_body[0].NAMA)
                            set_DETAIL_KETERANGAN(data_body[0].KETERANGAN)
                            set_DETAIL_OTORISATOR(data_body[0].OTORISATOR)
                            set_DETAIL_SCRIPT_COMMAND_CHECK(data_body[0].SCRIPT_COMMAND_CHECK)
                            set_DETAIL_SCRIPT_COMMAND_EXECUTE(data_body[0].SCRIPT_COMMAND_EXECUTE)
                            const res_is_aktif = (data_body[0].IS_AKTIF === 'OK' ? true : false)
                            setisCheckedISAktif(res_is_aktif)
                            //console.log(data_body[0].COVERAGE)
                            //set_DETAIL_BRANCH_COVERAGE(data_body[0].COVERAGE)
                            
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

    const GetShortcut = (idComponent:any) => {
        try{
            setIDShortcut('')
            const myExample = document.getElementById(idComponent);
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')

            let url = `http://${HOST_API_RND}:4646/user/IDMConsole/GetShortcut`;
            let param = {"IN_TIPE":TipeShortcut}
            console.log('url : '+url)
            console.log('param : '+JSON.stringify(param))
                setLoading(true);
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
                                                <div className="mr-2">
                                                    <a onClick={() => {showModal('Edit Shortcut',cellValues)}} data-twe-toggle="tooltip" title="Edit Shortcut">
                                                            <span className="text-warning"><IconPencil  /></span>
                                                    </a>
                                                </div>
                                                <div className="mr-2">
                                                    <a onClick={() => {DelShortcut(cellValues)}} data-twe-toggle="tooltip" title="Hapus Shortcut">
                                                        <span className="text-danger"><IconTrash  /></span>
                                                    </a>
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
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    {t('Setting')}
                </li>
                <Link href="/apps/setting/update_program/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Shortcut')}</span>
                </li>
                </Link>
            </ul>
            </div>
                        <div className="flex items-end mb-3 justify-left">
                            <div className="max-w-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
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

                                        <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Type')} {t('Shortcut')}</label></div>
                                        <div className="mb-3">
                                            <div className="w-full">
                                                <Select onChange={userSelectTipeShortcut} id="cmb_tipe_shortcut" placeholder="Pilih Shortcut" options={options5} isSearchable={true}/>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="flex">
                                                <button id="btn_filter" disabled={!active} onClick={() => {
                                                                                    GetShortcut('btn_filter')
                                                                                }}  type="button" className={!isDark ? 'btn btn-primary w-full rounded-full text-end' : 'btn btn-outline-primary w-full rounded-full'}>
                                                    Filter
                                                </button>
                                                &nbsp;
                                                <button id="btn_input" disabled={!active} onClick={() => {
                                                                                    showModal("Input Shortcut Baru",'')
                                                                                }}  type="button" className={!isDark ? 'btn btn-success w-full rounded-full text-end' : 'btn btn-outline-success w-full rounded-full'}>
                                                    
                                                    {t('Add')}
                                                </button>
                                            </div>
                                        </div>
                                   
                                    </div>
                                </div>
                            </div>
                        </div>    
            
           
            <DataTablesColourCell in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Master Data Shortcut'} data_columns={columns} data_rows={data_rows} isLoading={false} progressbar={""} field_auto_sorting={"ID"} type_sorting={"desc"} iscolumns_grouping={false} arr_columnGroupingModel={undefined} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={true} in_printOptions={true} in_is_same_colouring_all_rows={false} in_name_column_cek={"IS_AKTIF"}  />
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
                                            <label>{t('Type')}&nbsp;{t('Shortcut')}</label>
                                            <div className="flex">
                                                <div className="w-full">
                                                {
                                                    Isinput ? 
                                                    <Select onChange={FormSelecttipeShortcut} id="cmb_tipe_short" placeholder="Select Shortcut" options={options5} isSearchable={true}/>    
                                                    :
                                                    <input disabled={true} type="text" placeholder="Tipe Shortcut" onChange={FormSelecttipeShortcutInput} value={DETAIL_TIPE_SHORTCUT} className="form-input ltr:rounded-l-none rtl:rounded-r-none text-xs  disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed" required />
                                                }
                                                
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label>{t('Coverage')}</label>
                                            <div className="flex">
                                                <div className="w-full">
                                                <Select onChange={FormCoverage} id="cmb_coverage" placeholder="Select Coverage" options={optionsKodeCabang} isMulti isSearchable={true}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label>{t('Name')}</label>
                                            <div className="flex">
                                                <div className="w-full">
                                                <input type="text" placeholder={t('Name')} onChange={FormInputNamaShortcut} value={DETAIL_NAMA_SHORTCUT} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label>{t('Description')}</label>
                                            <div className="flex">
                                                <div className="w-full">
                                                <input type="text" placeholder="Keterangan" onChange={FormSelectKeterangan} value={DETAIL_KETERANGAN} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="mb-5">
                                            <label>{t('Script Command Check')}</label>
                                            <div className="flex">
                                                <div className="w-full">
                                                <textarea  rows={10} cols={50} placeholder={t('Script Command Check')} onChange={FormInputScriptCommandCheck} value={DETAIL_SCRIPT_COMMAND_CHECK} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required></textarea>
                                                {/* <input type="text" placeholder="Script Command Check" onChange={FormInputScriptCommandCheck} value={DETAIL_SCRIPT_COMMAND_CHECK} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label>{t('Script Command Execute')}</label>
                                            <div className="flex">
                                                <div className="w-full">
                                                <textarea  rows={10} cols={50} placeholder={t('Script Command Execute')} onChange={FormInputScriptCommandExecute} value={DETAIL_SCRIPT_COMMAND_EXECUTE} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required></textarea>    
                                                {/* <input type="text" placeholder="Script Command Execute" onChange={FormInputScriptCommandExecute} value={DETAIL_SCRIPT_COMMAND_EXECUTE} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                       
                                        <div className="mb-5">
                                                <label>{t('IS Active')}</label>
                                                <label className="relative w-12 h-6">
                                                    <input onChange={FormSelectISAktif} checked={isCheckedISAktif}  type="checkbox" className="absolute z-10 w-full h-full opacity-0 cursor-pointer custom_switch peer" id="custom_switch_checkbox1" />
                                                    <span className="outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300"></span>
                                                </label>
                                        </div> 
                                    </div>

                                    

                                    </form>
                                    <div className="flex items-center justify-end mt-8">
                                        <button onClick={() => setModal13(false)} type="button" className="btn btn-outline-danger">
                                            {t('Cancel')}
                                        </button>
                                        <button  id="btn_insert" onClick={() => {
                                                InsShortcut("btn_insert",DETAIL_BRANCH_COVERAGE,DETAIL_TIPE_SHORTCUT,DETAIL_NAMA_SHORTCUT,DETAIL_KETERANGAN,DETAIL_SCRIPT_COMMAND_CHECK,DETAIL_SCRIPT_COMMAND_EXECUTE,DETAIL_IS_AKTIF,InputNIKPemohon)
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

export default Shortcut;

