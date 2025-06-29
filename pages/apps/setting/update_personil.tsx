'use client'

import Link from "next/link";
import { useEffect, useState,Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconUser from '@/components/Icon/IconUser';
import Select, { OptionsOrGroups } from 'react-select';
import Swal from "sweetalert2";

import { DataGrid, GridColDef, GridToolbar, GridValueGetter,GridRowsProp, GridRowSpacingParams } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IRootState } from "@/store";
import { Posts } from "@/lib/post";
import React from "react";
import IconEdit from '@/components/Icon/IconEdit';
import IconPlus from "@/components/Icon/IconPlus";
import IconTrash from "@/components/Icon/IconTrash";
import { Dialog, Transition } from '@headlessui/react';
import IconX from "@/components/Icon/IconX";
import IconInbox from "@/components/Icon/IconInbox";
import IconCpuBolt from "@/components/Icon/IconCpuBolt";
import IconAirplay from "@/components/Icon/IconAirplay";
import { Deletes } from "@/lib/delete";
import config from '@/lib/config.json';
import { DecodeAES, get_data_local_storage, GetToken, handleLogout } from "@/lib/global";
import DataTables from "@/components/table/DataTables";
import { useTranslation } from "react-i18next";

//-- component menu --//
const Update_Personil = () => {
    
    const [tabs, setTabs] = useState<string>('data_tokomain');
    const [loading, setLoading] = useState(false);
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [active, setActive] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    const [data_rows,setData_rows] = useState([]);

    const [modal13, setModal13] = useState(false);
    const [Isinput, setIsinput] = useState(true);
    const [in_branch, setBranch] = useState('');
    const [options7,setOption7] = useState([]);
    const [options8,setOption8] = useState([]);
    const [options9,setOption9] = useState([]);
    const [options10,setOption10] = useState([]);
    const [isDisabled,setIsDisabled] = useState(false);
    const { t, i18n } = useTranslation();

    const [IN_HOST, setHOST] = useState('');
    
    
    const [IN_DETAIL_NIK, setNik] = useState('');
    const userSelectNik = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setNik(val);
    };

    const [IN_DETAIL_NAMA, setNama] = useState('');
    const userSelectNama = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setNama(val);
    };


    const [IN_DETAIL_LOKASI, setLokasi] = useState({});
    const userSelectLokasi = (value:any) => {
        // var val = event.target.value;
        // setLokasi(val);
        if(value.length == 0){
            setLokasi({});
        }else{
            const arr_val = {
                value:value.value,
                label:value.value
            };
            setLokasi(arr_val);
        }
    };
    
    
    const [IN_DETAIL_JABATAN, setJabatan] = useState({});
    const userSelectJabatan = (value: any) => {
        if(value.length == 0){
            setJabatan({});
        }else{
            const arr_val = {
                value:value.value,
                label:value.value.split('-')[0]
            };
            setJabatan(arr_val);
        }
        //console.log('jabatan : '+value.value)

        
        var arr_concat = [];
        if(value.value.includes('|')){
            const list_divisi = value.value.split('-')[1].split('|');
            for(var i =0;i<list_divisi.length;i++){
                //console.log('divisi : '+list_divisi[i]);
                var arr_content = {value: list_divisi[i], label: list_divisi[i]};
                arr_concat.push(arr_content)
            }
            
        }else{
            var nilai = value.value.split('-')[1];
            var arr_content = {value:nilai, label:nilai};
            arr_concat.push(arr_content)
            //console.log('kondisi 2 '+nilai);
        }

        setOption8(arr_concat);
        

    };
    const [IN_DETAIL_DIVISI,setDivisi] = useState({});
    const userSelectDivisi = (value:any)=> {
        if(value.length == 0){
            setDivisi({});
        }else{
            const arr_val = {
                value:value.value,
                label:value.value
            };
            setDivisi(arr_val);
        }
    }
    

    const [IN_DETAIL_WHATSAPP,setWhatsApp] = useState('');
    const userSelectWhatsApp = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setWhatsApp(val);
    };
    const [IN_DETAIL_CHAT_ID_TELEGRAM,setChatIDTelgram] = useState('');
    const userSelectChatIDTelegram = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setChatIDTelgram(val);
    };
    const [IN_DETAIL_NIK_ATASAN,setNikAtasan] = useState('');
    const userSelectNikAtasan = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setNikAtasan(val);
    };

    
    const [IN_DETAIL_BRANCH,setDetailBranch] = useState('');
    const userSelectDetailBranch = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setDetailBranch(val);
    };
    const [IN_DETAIL_BRANCH_COVERAGE,setBranchCoverage] = useState('');
    const userSelectBranchCoverage = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setBranchCoverage(val);
    };

    const [isCheckedCustom,setIsCheckCustom] = useState(false);
    const userSelectISCustom= (event: { target: { value: any; }; }) => {
        setIsCheckCustom(!isCheckedCustom)
    };

    const [IN_DETAIL_CMB_BRANCH_COVERAGE,setCmbBranchCoverage] = useState([]);
    const userSelectCmbBranchCoverage = (value: any) => {
          const arr_concat = value;
          setCmbBranchCoverage(arr_concat);
    };
    
    const handleRowDeleteClick = (cellValues:any)=>{

        var rconfig = JSON.stringify(config);
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;

        Swal.fire({
            title: t("Are you sure for")+" delete data?",
            showDenyButton: true,
            icon: "question",
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
            padding: '2em',
            customClass: 'sweet-alerts'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `http://${res_host}:7321/employee/v1/RemoveUser`;
                const param =  {"Nik":cellValues.row.NIK};
                const Token = GetToken();
                Posts(url,JSON.stringify(param),false,Token).then((response) => {
                                // setData(response)
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
                                    handleRefresh();
                                    setModal13(false);
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
                }).catch(
                    (error) => {
                        Swal.fire({
                            title: t("Warning"),
                            text: "Eror : "+error.toString(),
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    }
                );
            }else{
                 
            }
        });
    }    
    
    const handleRowDetailClick = (cellValues:any)=>{
        //console.log('CellValue : '+cellValues);
        var rconfig = JSON.stringify(config);
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;

        try{
            setModal13(true);
            const data_login = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
            const arr_login = JSON.parse(data_login);
            setCmbBranchCoverage([]);
            if(cellValues === ''){
                setIsinput(true);
                setNik('');
                setNama('');

                const arr_jabatan = {
                    value:'-',
                    label:'-- Pilih Jabatan --'
                    };
                setJabatan(arr_jabatan);


                setLokasi('');
                setDivisi('');
                setWhatsApp('');
                setChatIDTelgram('');
                setNikAtasan('');
                setNikAtasan('');

                
                const branch_local = arr_login.branch;
                setDetailBranch(branch_local);

                 // //-- get position by nik --//
                const url = `http://${res_host}:7321/employee/v1/GetPosition`;
                //-- get nik for param get_menu --//
                
                //console.log('data_login : '+data_login);
                
                const nik = arr_login.nik;
                const param = JSON.stringify({"Nik":nik});
                //console.log('param : '+param);
            
                setOption10([]);
                setOption7([]);
                //console.log('param_in_branch : '+param_in_branch);
                const Token = GetToken()
                Posts(url,param,false,Token).then((response) => {
                        let rows: React.SetStateAction<any[]> = [];
                        var code = response.code;
                        var msg = response.msg;
                        if(code === 200){
                            var parse_data = response.data;
                            var d = JSON.parse(parse_data);
                            var res_lokasi = '';
                            var rows_lokasi: React.SetStateAction<any[]> = [];
                            for(var i = 0;i<d.length;i++){
                                const jabatan = d[i].jabatan;
                                const divisi = d[i].divisi;
                                var arr_content = {
                                    "value":jabatan+'-'+divisi,
                                    "label":jabatan
                                };

                                rows.push(arr_content);

                                //console.log(JSON.stringify(rows_lokasi)+" VS "+d[i].lokasi);
                                if(JSON.stringify(rows_lokasi).includes(d[i].lokasi)){
                                    console.log('No add Lokasi')
                                }else{
                                    var arr_lokasi = {
                                        "value":d[i].lokasi,
                                        "label":d[i].lokasi
                                    };
                                    rows_lokasi.push(arr_lokasi);
                                }
                               
                            }
                            setOption7(rows);
                            setOption10(rows_lokasi);
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: "Info : "+code+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            })
                        }
                    }).catch((error) =>  
                        Swal.fire({
                            title: t("Warning"),
                            text: "Error : "+error.toString(),
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        })
                    );
               


            }else{
                setIsinput(false);
                setNik(cellValues.row.NIK);
                setNama(cellValues.row.NAMA);
                const arr_jabatan = {
                    value:cellValues.row.JABATAN,
                    label:cellValues.row.JABATAN
                    };
                setJabatan(arr_jabatan);
                // setLokasi(cellValues.row.LOKASI);
                const url = `http://${res_host}:7321/employee/v1/GetPosition`;
                //-- get nik for param get_menu --//
                
                //console.log('data_login : '+data_login);
                
                const nik = arr_login.nik;
                const param = JSON.stringify({"Nik":nik});
                const Token = GetToken()
                Posts(url,param,false,Token).then((response) => {
                    let rows: React.SetStateAction<any[]> = [];
                    var code = response.code;
                    var msg = response.msg;
                    if(code === 200){
                        var parse_data = response.data;
                        var d = JSON.parse(parse_data);
                        var res_lokasi = '';
                        var rows_lokasi: React.SetStateAction<any[]> = [];
                        for(var i = 0;i<d.length;i++){
                            const jabatan = d[i].jabatan;
                            const divisi = d[i].divisi;
                            var arr_content = {
                                "value":jabatan+'-'+divisi,
                                "label":jabatan
                            };

                            rows.push(arr_content);

                            //console.log(JSON.stringify(rows_lokasi)+" VS "+d[i].lokasi);
                            if(JSON.stringify(rows_lokasi).includes(d[i].lokasi)){
                                console.log('No add Lokasi')
                            }else{
                                var arr_lokasi = {
                                    "value":d[i].lokasi,
                                    "label":d[i].lokasi
                                };
                                rows_lokasi.push(arr_lokasi);
                            }
                           
                        }
                        setOption7(rows);
                        setOption10(rows_lokasi);
                    }else{
                        Swal.fire({
                            title: t("Warning"),
                            text: "Info : "+code+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        })
                    }
                }).catch((error) =>  
                    Swal.fire({
                        title: t("Warning"),
                        text: "Error : "+error.toString(),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    })
                );

                setWhatsApp(cellValues.row.WHATSAPP);
                setChatIDTelgram(cellValues.row.CHAT_ID_TELEGRAM);
                setNikAtasan(cellValues.row.NIK_ATASAN);
                setDetailBranch(cellValues.row.BRANCH);
                setBranchCoverage(cellValues.row.COVERAGE);
                const arr_divisi = {
                    value:cellValues.row.DIVISI,
                    label:cellValues.row.DIVISI
                }
                setDivisi(arr_divisi);
            }


            const url_get_branch = `http://${IN_HOST}:7321/employee/v1/GetBranch`;
               
                const local_nik = arr_login.nik;
                const param_get_branch = JSON.stringify({"Nik":local_nik});
                const Token = GetToken()
                Posts(url_get_branch,param_get_branch,false,Token).then(
                    (response) => {
                        var code = response.code;
                        var msg = response.msg;
                        if(code === 200){
                            var parse_data = response.data;
                            var d = JSON.parse(parse_data);
                            //console.log('d : '+JSON.stringify(d));
                            var get_branch = JSON.parse(d.BranchCoverage);
                            //console.log('get_branch : '+get_branch.length);
                            var res_branch = '';
                            var arr_branch = [];
                            for(var i = 0;i<get_branch.length;i++){
                                const data_branch = get_branch[i].kode;
                                if(i != (get_branch.length-1)){
                                    res_branch = res_branch+data_branch+",";
                                }else{
                                    res_branch = res_branch+data_branch;
                                }

                                const arr_content = {value:data_branch,label:data_branch};
                                arr_branch.push(arr_content);
                                setOption9(arr_branch);
                            }
                            
                            
                            
                            //console.log('res_branch : '+res_branch);
                            setCmbBranchCoverage(arr_branch);
                            
                            
                          
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: "Info : "+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            })
                        }
                        
                    }
                ).catch((error) =>  
                    Swal.fire({
                        title: t("Warning"),
                        text: "Error : "+error.toString(),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    })
                );

        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }

        

    }

    const handleinsPersonil = (in_param:any,type:string,idComponent:string) =>{

      
        const myExample = document.getElementById(idComponent);
        myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')

        const nik = in_param.nik;
        const nama = in_param.nama;
        const jabatan = in_param.jabatan;
        const lokasi = in_param.lokasi;
        const chatidtelegram = in_param.chatidtelegram;
        const branchCoverage = in_param.branchCoverage;
        const branch = in_param.branch;
        if(nik == '' || nama == '' || jabatan == '' || lokasi == '' || jabatan == '' || chatidtelegram == '' || branchCoverage == '' || branch == ''){
            Swal.fire({
                title: t("Warning"),
                text: "Lengkapi pengisinan form user",
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            })
        }else{
            Swal.fire({
                title: t("Are you sure for")+" save data user?",
                showDenyButton: true,
                icon: "question",
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
            }).then((result) => {
                if (result.isConfirmed) {
                    const url = `http://${IN_HOST}:7321/employee/v1/UpdateUser`;
                    console.log(url);
                    const list_branch = in_param.branchCoverage;
                    var concat_list_branch = "";
                    for(var a = 0;a<list_branch.length;a++){
                        const res_list_branch = list_branch[a].value;
                    
                        if(a != (list_branch.length - 1)){
                            concat_list_branch = concat_list_branch+res_list_branch+",";
                        }else{
                            concat_list_branch = concat_list_branch+res_list_branch;
                        }
                    }
                    in_param.branchCoverage = concat_list_branch;
                    const param = JSON.stringify(in_param);
                    const Token = GetToken()
                    Posts(url,param,false,Token).then(
                        (response) => {
                            let rows: React.SetStateAction<any[]> = [];
                            var code = response.code;
                            var msg = response.msg;
                            if(code === 200){
                                Swal.fire({
                                    title: t("Information"),
                                    text: ""+code+"-"+msg,
                                    icon: "success",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                })
                                handleRefresh();
                                setModal13(false);
                                myExample.innerHTML = 'Simpan';
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+code+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                myExample.innerHTML = 'Simpan';
                            }
                            
                            
                    }).catch((error) => {
                        myExample.innerHTML = 'Simpan';
                        Swal.fire({
                            title: t("Warning"),
                            text: "Error : "+error.toString(),
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    });
                }else{
    
                }
            });
           
        } 
    }
    

    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });
    
    const lightTheme = createTheme({
        palette: {
          mode: 'light',
        },
    });


    const columns = [
        { field: 'id', headerName: 'id',  flex: 1},
        { 
            field: 'EDIT', headerName: 'EDIT',  flex: 1,  width: 110, minWidth: 110, maxWidth: 110,
            renderCell: (cellValues: any) => {
                return (
                <>
               <div className="grid grid-cols-2">
                    <div>
                       
                    <a onClick={() => {handleRowDetailClick(cellValues)}} >
                    <IconEdit className={"text-yellow-500 font-medium"} />
                    </a>
                    </div>
                    <div>
                    <a className="danger" onClick={() => {
                        handleRowDeleteClick(cellValues);
                    }} >
                    
                    <IconTrash className={"text-red-900 font-medium"} />
                    </a>
                    </div>

                   
                   </div>
                </>
                

                
                );
            }
        },
        { field: 'BRANCH', headerName: 'BRANCH',  width: 70, minWidth: 70, maxWidth: 70},
        { field: 'COVERAGE', headerName: 'COVERAGE',  width: 250, minWidth: 250, maxWidth: 250},
        { field: 'NIK', headerName: 'NIK',  width: 90, minWidth: 90, maxWidth: 90},
        { field: 'NAMA', headerName: 'NAMA',  width: 200, minWidth: 200, maxWidth: 200},
        { field: 'JABATAN', headerName: 'JABATAN',  width: 150, minWidth: 150, maxWidth: 150},
        { field: 'LOKASI', headerName: 'LOKASI',  width: 80, minWidth: 80, maxWidth: 80},
        { field: 'DIVISI', headerName: 'DIVISI',  width: 190, minWidth: 190, maxWidth: 190},
        { field: 'WHATSAPP', headerName: 'WHATSAPP',  width: 150, minWidth: 150, maxWidth: 150},
        { field: 'CHAT_ID_TELEGRAM', headerName: 'CHAT_ID_TELEGRAM',  width: 150, minWidth: 150, maxWidth: 150},
        { field: 'NIK_ATASAN', headerName: 'NIK_ATASAN',  width: 90, minWidth: 90, maxWidth: 90},
        { field: 'STATUS', headerName: 'STATUS',  width: 120, minWidth: 120, maxWidth: 120,
            renderCell: (cellValues: any) => {
                return (
                <span id={'btn_refresh_'+cellValues.id}  className={cellValues.value === 'Aktif' ?  'badge bg-success' : 'badge bg-danger'}>{cellValues.value}</span>

                );
            }
        }

    ];

    
    // Highlight menu item based on currently displayed route
    //-- get data menu from API --//
    var rconfig = JSON.stringify(config);
    let student = JSON.parse(rconfig);
    const res_host = (config.api as any).HOSTNAME;
    const url = `http://${res_host}:7321/employee/v1/ViewBranchAllUser`;
    //-- get nik for param get_menu --//
    
    //console.log('data_login : '+data_login);
    let handleApi: () => void;
    
    try{
    const data_login = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
    const arr_login = JSON.parse(data_login)
    const branch = arr_login.branch;
    const param = JSON.stringify({"Branch":branch});
    //console.log('param : '+param);
    const Token = GetToken();
    handleApi = () => 
            //console.log('param_in_branch : '+param_in_branch);
            
            Posts(url,param,false,Token).then(
                (response) => {
                    let rows: React.SetStateAction<any[]> = [];
                    var parse_data = response.data;
                    var code = response.code;
                    var msg = response.msg;
                    const myExample = document.getElementById('btn_refresh');
                    if(code === 200){
                        var d = JSON.parse(parse_data);
                        setLoading(true);
                        
                        myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')
                        
                        for(var i =0;i<d.length;i++){
                            var arr_content = {
                                'id':(i+1),
                                'EDIT':'',
                                'BRANCH':d[i].branch,
                                'COVERAGE':d[i].branchCoverage,
                                'NIK': d[i].nik,
                                'NAMA':d[i].nama,
                                'JABATAN':d[i].jabatan,
                                'LOKASI':d[i].lokasi,
                                'DIVISI':d[i].divisi,
                                'WHATSAPP':d[i].noWhatsapp,
                                'CHAT_ID_TELEGRAM':d[i].chatidtelegram,
                                'NIK_ATASAN':d[i].nikatasan,
                                'STATUS':(d[i].is_aktif == 1 ? 'Aktif' : 'Suspend')
                            };
                
                            rows.push(arr_content);
                        }

                        setData_rows(rows);
                        setLoading(false);
                        myExample.innerHTML = 'Refresh';
                    }else{
                        Swal.fire({
                            title: t("Warning"),
                            text: "Info : "+code+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false);
                        myExample.innerHTML = 'Refresh';
                    }
                    
                    
                }).catch((error) =>  
                    Swal.fire({
                        title: t("Warning"),
                        text: "Error : "+error.toString(),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    })
                );
                //setLoading(false)
                
    }catch(Ex){
        console.log(Ex.toString())
    }

    const handleRefresh = () => {
        try{
            setData_rows([]);
            setIsDisabled(true);
            const myExample = document.getElementById('btn_refresh');
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')
            const data_login = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');                
            const arr_login = JSON.parse(data_login)
            const branch = arr_login.branch;
            const param = JSON.stringify({"Branch":branch});
            
           
           
                    //console.log('param_in_branch : '+param_in_branch);
                    const Token = GetToken();
                    Posts(url,param,false,Token).then(
                        (response) => {
                            var code = response.code;
                            var msg = response.msg;
                            if(code === 200){
                                let rows: React.SetStateAction<any[]> = [];
                                var parse_data = response.data;
                                var d = JSON.parse(parse_data);
                                setLoading(true);
                                
                                for(var i =0;i<d.length;i++){
                                    var arr_content = {
                                        'id':(i+1),
                                        'EDIT':'',
                                        'BRANCH':d[i].branch,
                                        'COVERAGE':d[i].branchCoverage,
                                        'NIK': d[i].nik,
                                        'NAMA':d[i].nama,
                                        'JABATAN':d[i].jabatan,
                                        'LOKASI':d[i].lokasi,
                                        'DIVISI':d[i].divisi,
                                        'WHATSAPP':d[i].whatsapp,
                                        'CHAT_ID_TELEGRAM':d[i].chatidtelegram,
                                        'NIK_ATASAN':d[i].nikatasan,
                                        'STATUS':(d[i].is_aktif == 1 ? 'Aktif' : 'Suspend')
                                    };
                        
                                    rows.push(arr_content);
                                }
            
                                setData_rows(rows);
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: "Info : "+code+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                })
                            }
                            
                            setLoading(false);
                            setIsDisabled(false);
                            myExample.innerHTML = 'Refresh';
                            
                        }).catch((error) =>  
                            Swal.fire({
                                title: t("Warning"),
                                text: "Error : "+error.toString(),
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            })
                        );
                        //setLoading(false)
                              
            }catch(Ex){
                console.log(Ex.toString())
            }
    };
    
    useEffect(() => {
        handleApi();
        var rconfig = JSON.stringify(config);
        //console.log('config : '+rconfig);
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;
        //const res_host = (config.api as any).HOSTNAME;
        setHOST(res_host);
    }, [])

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return(
        <>
            
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    {t('Setting')}
                </li>
                <Link href="/apps/setting/update_personil/" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Update Personel')}</span>
                </li>
                </Link>
            </ul>
            </div>

           
            <div className="grid grid-cols-8 gap-4 mt-4 mb-4 sm:grid-cols-5">
                
                    <div>
                        <button  onClick={
                            () => {handleRowDetailClick('')}}
                         className={!isDark ? 'btn btn-success w-full rounded-full text-end' : 'btn btn-outline-success w-full rounded-full'}>Tambah User</button>
                    </div>
                    <div>
                        <button disabled={isDisabled} 
                                    id="btn_refresh" 
                                    onClick={handleRefresh} 
                                    className={!isDark ? 'btn btn-warning w-full rounded-full text-end' : 'btn btn-outline-warning w-full rounded-full'}>Refresh</button>
                    </div>
               
            </div>
           
            <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Master Data User'} data_columns={columns} data_rows={data_rows} isLoading={false} progressbar={""} field_auto_sorting={""} type_sorting={undefined} iscolumns_grouping={false} arr_columnGroupingModel={undefined} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={true} in_printOptions={true} in_prosentase_progress={0} in_rows_spanning={false}  />
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
                                    <h5 className="text-lg font-bold text-white-light">{t('Detail User')}</h5>
                                    <button onClick={() => setModal13(false)} type="button" className="text-white-light hover:text-dark">
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                <form>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div className="mb-5">
                                            <label>Nik</label>
                                                <div className="flex">
                                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                    <IconUser />
                                                </div>
                                                <input type="text" placeholder="Nik" onChange={userSelectNik} value={IN_DETAIL_NIK}  className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label>{t('Name')}</label>
                                            <div className="flex">
                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] text-xs">
                                                    <IconInbox />
                                                </div>
                                                
                                                    <input type="text" placeholder="Nama" onChange={userSelectNama} value={IN_DETAIL_NAMA}  className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required /> 
                                            </div>
                                        </div>

                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        
                                        <div className="mb-5">
                                            <label>{t('Position')}</label>
                                            <div className="flex">
                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] text-xs">
                                                    <IconEdit />
                                                </div>
                                                
                                                <Select value={IN_DETAIL_JABATAN} className="w-full text-xs"
                                                        
                                                        onChange={userSelectJabatan} 
                                                        id="cmb_device_station" 
                                                        placeholder="Pilih Jabatan" 
                                                        options={options7}
                                                        isSearchable={true}
                                                        />
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label>{t('Division')}</label>
                                            <div className="flex">
                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                    <IconCpuBolt />
                                                </div>
                                                
                                                    <Select value={IN_DETAIL_DIVISI} className="w-full text-xs"
                                                        
                                                    onChange={userSelectDivisi} 
                                                    id="cmb_divisi" 
                                                    placeholder="Pilih Divisi" 
                                                    options={options8}
                                                    isSearchable={true}
                                                    />
                                                
                                            </div>
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        
                                        <div className="mb-5">
                                            <label>{t('Location')}</label>
                                            <div className="flex">
                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] text-xs">
                                                    <IconEdit />
                                                </div>
                                                
                                                {/* <input type="text" placeholder="Lokasi" onChange={userSelectLokasi} value={IN_DETAIL_LOKASI} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required /> */}
                                                <Select  value={IN_DETAIL_LOKASI} className="w-full text-xs"
                                                        
                                                        onChange={userSelectLokasi} 
                                                        id="cmb_device_station" 
                                                        placeholder="Pilih Lokasi" 
                                                        options={options10}
                                                        isSearchable={true}
                                                        />
                                                    
                                            </div>
                                        </div>

                                    

                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        
                                        <div className="mb-5">
                                            <label>{t('WhatsApp Number')}</label>
                                            <div className="flex">
                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] ">
                                                    <IconInbox />
                                                </div>
                                                    <input type="text" placeholder={t('WhatsApp Number')} onChange={userSelectWhatsApp} value={IN_DETAIL_WHATSAPP} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label>{t('Chat ID Telegram')}</label>
                                            <div className="flex">
                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] ">
                                                    <IconAirplay />
                                                </div>
                                            <input type="text" placeholder={t('Chat ID Telegram')} onChange={userSelectChatIDTelegram} value={IN_DETAIL_CHAT_ID_TELEGRAM} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                            </div>
                                        </div>

                                    </div>
                                    
                                    <div className="mb-5">
                                        <label>Nik Supervisor/Manager</label>
                                        <div className="flex">
                                        <input type="text" placeholder="Nik Supervisor/Manager" onChange={userSelectNikAtasan} value={IN_DETAIL_NIK_ATASAN} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <label>{t('Branch')}</label>
                                        <div className="flex">
                                        <input type="text" disabled placeholder={t('Branch')} onChange={userSelectDetailBranch} value={IN_DETAIL_BRANCH} className="text-xs form-input ltr:rounded-l-none rtl:rounded-r-none" required />
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="col-span-3 mb-5">
                                        <label>{t('Branch Coverage')}</label>
                                        <div className="flex">
                                            <Select  onChange={userSelectCmbBranchCoverage} value={IN_DETAIL_CMB_BRANCH_COVERAGE}  className="w-full text-xs" id="cmb_branch_coverage" placeholder="Pilih Branch Coverage" options={options9} isMulti isSearchable={true}/>
                                        </div>
                                    </div>
                                </form>
                                    <div className="flex items-center justify-end mt-8">
                                        <button onClick={() => setModal13(false)} type="button" className="btn btn-outline-danger">
                                        {t('Cancel')}
                                        </button>
                                        <button  id="btn_insert" onClick={() => {
                                                handleinsPersonil(
                                                    {
                                                        "nik": IN_DETAIL_NIK,
                                                        "nama": IN_DETAIL_NAMA,
                                                        "jabatan": ( (IN_DETAIL_JABATAN as any).value.toString().includes('-') ? (IN_DETAIL_JABATAN as any).value.split('-')[0] : (IN_DETAIL_JABATAN as any).value),
                                                        "lokasi": (IN_DETAIL_LOKASI as any).value,
                                                        "divisi": (IN_DETAIL_DIVISI as any).value,
                                                        "noWhatsapp": IN_DETAIL_WHATSAPP,
                                                        "chatidtelegram": IN_DETAIL_CHAT_ID_TELEGRAM,
                                                        "nikatasan": IN_DETAIL_NIK_ATASAN,
                                                        "nikupdate": IN_DETAIL_NIK,
                                                        "branch": IN_DETAIL_BRANCH,
                                                        "branchCoverage": IN_DETAIL_CMB_BRANCH_COVERAGE,
                                                        "is_aktif":"1"
                                                    }
                                                ,'input data baru','btn_insert')
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

export default Update_Personil;

