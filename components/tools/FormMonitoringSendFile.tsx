'use client'
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { IRootState } from "@/store";
import { Posts } from "@/lib/post";
import React from "react";
import { AddColumn, AddID, DecodeAES,  get_branch_code, get_data_local_storage, GetTokenRND, handleLogout, start,stop } from "@/lib/global";
import withReactContent from "sweetalert2-react-content";
import IconSend from "../Icon/IconSend";
import { useTranslation } from "react-i18next";
import IconXCircle from "../Icon/IconXCircle";
import DataTables from "../table/DataTables";
import { getSocket,disconnectSocket } from "@/lib/socket";
import pako from "pako";
import IconCircleCheck from '../Icon/IconCircleCheck';
import themeConfig from '@/theme.config';
import DropDownBranch from '../dropdown/DropDownBranch';
import ButtonReload from '../button/ButtonReload';
import ButtonFilter from '../button/ButtonFilter';
import { Modal } from '@mui/material';
import ModalComponent from '../modal/ModalComponent';
import AntiScrapedShieldComponent from '../shield/AntiScrapedShieldComponent';

interface FormMonitoringSendFileProps {
    url: string,
    command: string,
    IDReport: string,
}

//-- component menu --//
const FormMonitoringSendFile: React.FC<FormMonitoringSendFileProps> = ({ url, command, IDReport }) => {
    const MySwal = withReactContent(Swal);
    const [isTextButton, setisTextButton] = useState(false);
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [LoadingOptionToko, setLoadingOptionToko] = useState(false);
    const [InputNIKPemohon,setInputNIKPemohon] = useState('')
    const [InputNAMAPemohon,setInputNAMAPemohon] = useState('')
    const [Divisi,setDivisi] = useState('')

    const [IN_HOST, setHOST] = useState('')
    const [IN_PORT, setPORT] = useState(0)
    const [isDisabled,setisDisabled] = useState(false)
    const [TextButtonFilter, setTextButtonFilter] = useState('')
    const [HOST_API_RND, setHOST_API_RND] = useState('')
    const [options5,setOption5] = useState([])
    const [LokasiUser,setLokasiUser] = useState('')
    const { t, i18n } = useTranslation();

    const [DataProsentase,setDataProsentase] = useState(0)
    const [columnGroupingModel,setcolumnGroupingModel] = useState([])
    const [data_rows,setData_rows] = useState([])
    const data_table = useRef([])
    const [data_columns,setData_columns] = useState([])
    const [loading, setLoading] = useState(false)
    const [progressbar,setProgress] = useState('')
    const [DataSummary,setDataSummary] = useState([])
    const [modal13,setModal13] = useState(false)
    const [LoadingLog,setLoadingLog] = useState(false)
    const [progressbar_log,setprogressbar_log] = useState('')
    const [Title,setTitle] = useState('')
    const [DataRowLog,setDataRowLog] = useState([])
    const [ColumnsLog,setColumnsLog] = useState([])
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    let socket = getSocket();
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        const res_host_rnd = themeConfig.hostrnd
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        setHOST(res_host);
        setHOST_API_RND(res_host_rnd);
        
        const get_data = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
        const d = JSON.parse(get_data);
        const nik = d.nik;
        const nama = d.nama;
        const divisi = d.divisi
        setInputNIKPemohon(nik);
        setInputNAMAPemohon(nama);
        setDivisi(divisi);
        const lokasi = d.lokasi;
        setLokasiUser(lokasi)
        
        if(lokasi === 'EDP HO'){
            let arr_cabang = get_branch_code(true,false);
            setOption5(arr_cabang)
        }else if(lokasi === 'REGIONAL'){
            let arr_cabang = get_branch_code(false,true);
            setOption5(arr_cabang)
        }else if(lokasi === 'CABANG'){
            let arr_cabang = get_branch_code(false,false);
            setOption5(arr_cabang)
        }

        if (!socket) return; //if socket is not initialized, return.
            
            socket.on('connect', () => {
                console.log('Connected to server');
                setProgress('Connected to server');
            });
        
            socket.on('disconnect', () => {
                console.log('Disconnected from server');
                setProgress('Disconnected from server');
            });
        
            return () => {
                socket.off('connect');
                socket.off('message');
                socket.off('disconnect');
                disconnectSocket();
            };
    }, [])
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const GetData = () => {
        try{
            setisTextButton(true)
            setisDisabled(true)
            setTextButtonFilter('Please wait')
            var isConnected = socket.connected
            if(isConnected){
                socket.off('connect');
                socket.off('message');
                socket.off('disconnect');
                disconnectSocket();
            }else{
                
            }

            socket = getSocket()
            var param = {"LOCATION":IN_CMB_KODE_CABANG,"CONTENT":"Monitoring Send File","SOCK_EVENT":"IDMCONSOLE_MONITORING_SEND_FILE_"+IN_CMB_KODE_CABANG}
            socket.emit('message',JSON.stringify(param))
            setProgress('Send Param to server');
            var key_event = "IDMCONSOLE_MONITORING_SEND_FILE_"+IN_CMB_KODE_CABANG;

            let columns = [ 
                { field: 'id', headerName: 'id',   width: 80, minWidth: 80, maxWidth: 80},
                { field: 'KDREG', headerName: 'LOCATION',   width: 80, minWidth: 80, maxWidth: 80},
                { field: 'KDCAB', headerName: 'BRANCH',  width: 80, minWidth: 80, maxWidth: 80},
                { field: 'NAMA', headerName: 'NAME',  flex: 1},
                { field: 'CLIENT', headerName: 'CLIENT',  flex: 0,width: 120, minWidth: 120, maxWidth: 120,headerAlign:'left',align:'right',
                    renderCell: (cellValues: any) => {
                        return (
                            <a onClick={() => {
                                NewhandleRowClick(cellValues,"ALL");
                            }} >
                            <span data-twe-toggle="tooltip" title={t("click for detail Log")} className={'hover:cursor-pointer font-semibold underline underline-offset-4 dark:text-orange-500 text-orange-700'}  >{cellValues.value}</span>
                            </a>
                            // <span className='badge bg-orange-700'>{cellValues.value}</span>
                        );
                    }
                },
                { field: 'QUEUE', headerName: 'QUEUE',  flex: 0,width: 120, minWidth: 120, maxWidth: 120,headerAlign:'left',align:'right',
                    renderCell: (cellValues: any) => {
                        return (
                            <a onClick={() => {
                                NewhandleRowClick(cellValues,"QUEUE");
                            }} >
                            <span data-twe-toggle="tooltip" title={t("click for detail Log")} className={'hover:cursor-pointer font-semibold underline underline-offset-4 text-primary'}  >{cellValues.value}</span>
                            </a>
                            //<span className='badge bg-primary'>{cellValues.value}</span>
                        );
                    }
                },
                { field: 'SUCCESS', headerName: 'SUCCESS',  flex: 0,width: 120, minWidth: 120, maxWidth: 120,headerAlign:'left',align:'right',
                    renderCell: (cellValues: any) => {
                        return (
                            <a onClick={() => {
                                NewhandleRowClick(cellValues,"SUCCESS");
                            }} >
                            <span data-twe-toggle="tooltip" title={t("click for detail Log")} className={'hover:cursor-pointer font-semibold underline underline-offset-4 text-success'}  >{cellValues.value}</span>
                            </a>
                            //<span className='badge bg-success'>{cellValues.value}</span>
                        );
                    }
                },
                { field: 'LISTENER_NOK', headerName: 'LISTENER_NOK',  flex: 0,width: 120, minWidth: 120, maxWidth: 120,headerAlign:'left',align:'right',
                    renderCell: (cellValues: any) => {
                        return (
                            <a onClick={() => {
                                NewhandleRowClick(cellValues,"LISTENER_NOK");
                            }} >
                            <span data-twe-toggle="tooltip" title={t("click for detail Log")} className={'hover:cursor-pointer font-semibold underline underline-offset-4 text-danger'}  >{cellValues.value}</span>
                            </a>
                            // <span className='badge bg-danger'>{cellValues.value}</span>
                        );
                    }
                },
                { field: 'FAILED', headerName: 'FAILED',  flex: 0,width: 120, minWidth: 120, maxWidth: 120,headerAlign:'left',align:'right',
                    renderCell: (cellValues: any) => {
                        return (
                            <a onClick={() => {
                                NewhandleRowClick(cellValues,"FAILED");
                            }} >
                            <span data-twe-toggle="tooltip" title={t("click for detail Log")} className={'hover:cursor-pointer font-semibold underline underline-offset-4 text-yellow-700 dark:text-warning'}  >{cellValues.value}</span>
                            </a>
                            //<span className='badge bg-warning'>{cellValues.value}</span>
                        );
                    }
                },
                { field: 'PERCENT_PROGRESS', headerName: 'PERCENT_PROGRESS',  flex: 0,width: 150, minWidth: 150, maxWidth: 150,headerAlign:'left',align:'right',
                    renderCell: (cellValues: any) => {
                        return (
                            <a onClick={() => {
                                NewhandleRowClick(cellValues,"ALL");
                            }} >
                            <span data-twe-toggle="tooltip" title={t("click for detail Log")} className={'hover:cursor-pointer font-semibold underline underline-offset-4 dark:text-white light:text-dark'}  >{(cellValues.value === '' ? 0 : cellValues.value)}</span>
                            </a>
                            // <span className='badge bg-dark'>{cellValues.value}</span>
                        );
                    }
                },
            ]
            setData_columns(columns)
            let arr_: any[] = []
            socket.on(key_event,async (arg) => {
                const data = arg
                const text = await new Response(data).text();
                if(text.toString().includes('Last Data')){
                    stop()
                    setProgress(t('Process')+' '+t('Done')+' '+text.toString())
                    setTextButtonFilter('Process')
                    setisTextButton(false)
                    setisDisabled(false)
                }else if(text.toString().includes('Please')){
                    setProgress(t(text.toString()))
                    setTimeout(() => {
                        console.log(text.toString())
                    },5000)
                }else{
                    setisTextButton(false)
                    setisDisabled(false)
                    setTextButtonFilter('Process')
                    try{
                        //console.log(text)
                        const decompressedData = pako.ungzip(data, { to: 'string' }); // or to: 'Uint8Array' for binary data
                        //console.log('decompressedData : '+decompressedData)
                        const parse_data = JSON.parse(decompressedData);
                        const info = parse_data.INFO
                        const rows = parse_data.ROWS
                        const summary = parse_data.SUMMARY
                        setDataSummary(summary)
                        //console.log(summary)
                        //console.log('jumlah data_rows : '+data_rows.length)
                        if(arr_.length === 0){
                            for(var o=0;o<rows.length;o++){
                                arr_.push(rows[o])
                            }
                        
                            var res_rows = AddID(arr_)
                            setData_rows(res_rows)
                            data_table.current = res_rows
                        }else{
                            for(var o=0;o<rows.length;o++){
                                const loop_kdcab = rows[o].KDCAB
                                //console.log(loop_kdcab)
                                const loop_kdreg = rows[o].KDREG
                                const loop_nama = rows[o].NAMA
                                const loop_queue = rows[o].QUEUE
                                const loop_success = rows[o].SUCCESS
                                const loop_listener_nok = rows[o].LISTENER_NOK
                                const loop_failed = rows[o].FAILED
                                const loop_percent_progress = rows[o].PERCENT_PROGRESS

                                const objIndex = data_table.current.findIndex((obj: { KDCAB: any; }) => obj.KDCAB == loop_kdcab);
                                // console.log('ObjIndex : '+objIndex)
                                // console.log(data_table.current[objIndex])
                                data_table.current[objIndex].KDREG = loop_kdreg;
                                data_table.current[objIndex].KDCAB = loop_kdcab;
                                data_table.current[objIndex].NAMA = loop_nama;
                                data_table.current[objIndex].QUEUE = loop_queue;
                                data_table.current[objIndex].SUCCESS = loop_success;
                                data_table.current[objIndex].LISTENER_NOK = loop_listener_nok;
                                data_table.current[objIndex].FAILED = loop_failed;
                                data_table.current[objIndex].PERCENT_PROGRESS = loop_percent_progress;
                                
                                var res_rows = data_table.current;
                                setData_rows(res_rows)
                            }   
                        }
                        setProgress(info)
                    }catch(Exc){
                        console.log(Exc.toString())
                    }
                }
            });
            
        }catch(Ex){
            setProgress(Ex.toString())
        }
    }

    const userSelectKodeCabang = (value: any) => {
        setKODE_CABANG(value.value)
    };

    const ResetData = () => {
        try{
             Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+" reset data?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const url = `http://${HOST_API_RND}:4646/user/ResetMasterUpdate`;
                    const param = {"IN_LOCATION":IN_CMB_KODE_CABANG};
                    const Token = GetTokenRND()
                    Posts(url,JSON.stringify(param),false,Token).then(
                            (response) => {
                                const res_data = response;
                                var code = res_data.code;
                                var msg = res_data.msg;
                                try{
                                    if(parseFloat(code) === 200){
                                        Swal.fire({
                                            title: t("Information"),
                                            text: ""+parseFloat(code)+"-"+msg,
                                            icon: "success",
                                            padding: '2em',
                                            customClass: 'sweet-alerts'
                                        });
                                        GetData()
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
                                }catch(Ex){
                                    console.log(Ex.toString())
                                }
                                
                            }
                    ).catch(
                        (error) => {
                            Swal.fire({
                                title: t("Warning"),
                                text: "Error : "+error.toString(),
                                icon: "error",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setLoadingOptionToko(false)
                            
                        }
                    );
                }
            });
        }catch(Ex){
            setProgress(Ex.toString())
        }
    }

    const NewhandleRowClick = (cellValues:any,IN_STATUS:string) => {
        try{
            setModal13(true)
            setTitle(IN_STATUS)
            const kdreg = cellValues.row.KDREG
            const kdcab = cellValues.row.KDCAB
            const url = `http://${HOST_API_RND}:4646/user/IDMConsole/GetDetailLogSendFile`;
            const param = {"IN_KDREG":kdreg,"IN_KDCAB":kdcab,"IN_STATUS":IN_STATUS};
            const Token = GetTokenRND()
            setLoadingLog(true)
            Posts(url,JSON.stringify(param),false,Token).then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        try{
                            if(parseFloat(code) === 200){
                                var data_body = res_data.data;
                                var rows = data_body[0].ROWS;
                                var cols = data_body[0].COLUMNS;
                                var columngroup = data_body[0].COLUMNS_GROUP
                                var res_rows = AddID(rows)
                                setDataRowLog(res_rows)
                                setColumnsLog(cols)
                                setcolumnGroupingModel(columngroup)
                                setLoadingLog(false)
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
                                setModal13(false)
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                setModal13(false)
                            }
                        }catch(Ex){
                            console.log(Ex.toString())
                        }
                        
                    }
            ).catch(
                (error) => {
                    Swal.fire({
                        title: t("Warning"),
                        text: "Error : "+error.toString(),
                        icon: "error",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setModal13(false)
                    setLoadingLog(false)
                }
            );
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+Ex.toString(),
                icon: "error",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setLoadingLog(false)
            setModal13(false)
        }
    }
    const CloseModal = () => {
        setModal13(false)
    }
    return(
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                {
                    Divisi.includes('ADMINISTRATOR') ? 
                    <>
                    <div className="grid grid-cols-2 gap-3">
                            <div className="row-span-3 mb-3 w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
                                <div className="p-2 flex items-center flex-col sm:flex-row">
                                    <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                                            <div className="mb-3">
                                                <div className="flex item-center font-semibold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                                    </svg>
                                                    <h2 className="text-dark mt-1 ml-1 text-center text-1xl dark:text-white-light">Form Filter</h2>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1">
                                                <DropDownBranch in_classname_title={"mb-1"} in_classname_content={'w-full'} data_options={options5} isSearchable={true} isMulti={false} event={userSelectKodeCabang} />
                                            </div>
                                            <div className="mb-3">
                                                <div className="flex flex-row gap-3">
                                                    <ButtonFilter in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={''} isLoading={isTextButton} isDisabled={isDisabled} in_icon={<IconSend />} in_title_button={'Process'} HandleClick={GetData} />
                                                    <ButtonReload in_classname={!isDark ? 'btn btn-warning w-full rounded-full text-end text-xs' : 'btn btn-outline-warning w-full rounded-full text-xs'} idComponent={''} isLoading={false} isDisabled={false} HandleClick={ResetData} />
                                                </div>
                                            </div>
                                    </div>
                                </div> 
                            </div>
                            <div className="row-span-3 mb-3 w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
                                <div className="p-2 flex items-center flex-col sm:flex-row">
                                    <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                                            <div className="mb-3">
                                                <div className="flex item-center font-semibold">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                                    </svg>
                                                    <h2 className="text-dark mt-1 ml-1 text-center text-1xl dark:text-white-light">Summary</h2>
                                                </div>
                                            </div>
                                            <div className="relative mt-3">
                                                <div className="absolute -bottom-9 h-24 w-24 ltr:-right-12 rtl:-left-12">
                                                    <IconCircleCheck className="text-success opacity-20 w-full h-full" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                                                    
                                                    <div>
                                                        <div className="">Total Client</div>
                                                        <div className="mt-2 text-2xl font-semibold dark:text-orange-500 text-orange-700">{DataSummary.length === 0 ? 0 : DataSummary[0].SUM_CLIENT}</div>
                                                    </div>
                                                    <div>
                                                        <div className="">Total Queue</div>
                                                        <div className="mt-2 text-2xl font-semibold text-primary">{DataSummary.length === 0 ? 0 : DataSummary[0].SUM_QUEUE}</div>
                                                    </div>
                                                    <div>
                                                        <div className="">Total Success</div>
                                                        <div className="mt-2 text-2xl font-semibold text-success">{DataSummary.length === 0 ? 0 : DataSummary[0].SUM_SUCCESS}</div>
                                                    </div>
                                                    <div>
                                                        <div className="">Total Listener NOK</div>
                                                        <div className="mt-2 text-2xl font-semibold text-danger">{DataSummary.length === 0 ? 0 : DataSummary[0].SUM_LISTENER_NOK}</div>
                                                    </div>
                                                    <div>
                                                        <div className="">Total Failed</div>
                                                        <div className="mt-2 text-2xl font-semibold text-warning">{DataSummary.length === 0 ? 0 : DataSummary[0].SUM_FAILED}</div>
                                                    </div>
                                                    <div>
                                                        <div className="">% Progress</div>
                                                        <div className="mt-2 text-2xl font-semibold dark:text-white light:text-dark">{DataSummary.length === 0 ? 0 : DataSummary[0].SUM_PERCENT_PROGRESS} %</div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                        <div className="mb-3 mt-5">
                            <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Report Monitoring Send File'} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'KDCAB'} type_sorting={'asc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={'NaN'} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={DataProsentase} in_rows_spanning={false}  />  
                        </div>
                        <ModalComponent in_size_modal={`panel animate__animated my-7 w-full overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-sm font-bold"} in_title_modal={'Log Detail Send File : '+Title} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                            <div className="p-5">
                                <div className="mb-5">
                                    <DataTables  in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, TYPE: false }} jenis_laporan={'Data Log'} data_rows={DataRowLog} data_columns={ColumnsLog} isLoading={LoadingLog} progressbar={progressbar_log} field_auto_sorting={'KDTK'} type_sorting={'asc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={false} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={0} in_rows_spanning={false} /> 
                                </div>
                            </div>
                        }
                        />
                        </>
                        :
                        <>
                        <div className="relative flex items-center border p-3.5 rounded text-danger bg-danger-light border-danger ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-danger-dark-light">
                            <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                                <IconXCircle />
                            </span>
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">{t('Warning')}!</strong>{t('Access Denied')}
                            </span>
                        </div>
                    </>
                }
                </>
            } />
        </>
    )
};
export default FormMonitoringSendFile;