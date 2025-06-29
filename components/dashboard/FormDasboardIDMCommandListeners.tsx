'use client'
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { GridColDef, GridColumnGroupingModel, GridEventListener } from "@mui/x-data-grid";
import config from '@/lib/config.json';
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertBinaryToText, GetFailedClient, GetID, GetSignature, GetToken, GetTotalClientByStatus, GetTotalFailedClient, ListKey, SendHandleRowClick, SummaryValueOfArray, WritePayload, WritePayloadAPI, get_branch_code, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByMessageListeners_PerCabang, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds,start,stop } from "@/lib/global";
import BarChart from "../chart/BarChart";
import MultiColumnsChart from "../chart/MultiColumnsChart";
import { isNull, isUndefined } from "lodash";
import DonutChartNew from "../chart/DonutChartNew";
import CardInfoProses from "../form/CardInfoProses";
import { useTranslation } from "react-i18next";
import ButtonFilter from "../button/ButtonFilter";
import ButtonReload from "../button/ButtonReload";
import DropDownBranch from "../dropdown/DropDownBranch";
import DropDownStation from "../dropdown/DropDownStation";
import { ReportStatusListeners } from "@/controller/dashboard/DashboardIDMCommandListeners";
import IconSend from "../Icon/IconSend";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";

interface FormDasboardIDMCommandListenersProps{
    url: string,
    command: string,
    IDReport: string,
}

const FormDasboardIDMCommandListeners: React.FC<FormDasboardIDMCommandListenersProps> = ({url,command,IDReport}) => {
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [IN_CMB_STATION,setStation] = useState("");
    const [columnGroupingModel,setcolumnGroupingModel] = useState([]);
    const [data_rows,setData_rows] = useState([]);
    const [data_columns,setData_columns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progressbar,setProgress] = useState('');
    const [total_station,setTotalStation] = useState(0);
    const [total_sukses,setTotalSukses] = useState(0);
    const [total_gagal,setTotalGagal] = useState(0);
    const [DataProsentase,setDataProsentase] = useState(0);
    const [data_gagal,setDataGagal] = useState('');
    const [IP,setDataIP] = useState('');
    const [stateCode,setStateCode] = useState(0);
    const [data_CountVersiCurrent,setDataCountVersiCurrent] = useState(0);
    const [data_CountVersiLast,setDataCountVersiLast] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [DataSeriesStatus,setDataSeriesStatus] = useState([]);
    const [DataLabelsStatus,setDataLabelsStatus] = useState([]);
    const [DataOptionsVersi,setDataOptionsVersi] = useState({});
    const [DataOptionsStatus,setDataOptionsStatus] = useState({});
    const [DataWidthChart,setDataWidthChart] = useState(0);
    const [DataTypeChart,setDataTypeChart] = useState('');
    const [DataColor,setDataColor] = useState([]);

    const [DataLabelsVersi,setDataLabelsVersi] = useState([]);
    const [DataSeriesVersi,setDataSeriesVersi] = useState([]);
    const [DataColorVersi,setDataColorVersi] = useState([]);
    
    const [DataLabelsPerCabang,setDataLabelsPerCabang] = useState([]);
    const [DataSeriesPerCabang,setDataSeriesPerCabang] = useState([]);

    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const router = useRouter();
    const conf_versi_listener = useSelector((state: IRootState) => state.themeConfig.versi_listener);
    const conf_versi_service_listener = useSelector((state: IRootState) => state.themeConfig.versi_service_listener);
    const conf_versi_idm_library = useSelector((state: IRootState) => state.themeConfig.versi_idm_library);
    const conf_versi_attribute = useSelector((state: IRootState) => state.themeConfig.versi_attribute);
    const conf_versi_suhu = useSelector((state: IRootState) => state.themeConfig.versi_suhu);
    const conf_versi_oskey = useSelector((state: IRootState) => state.themeConfig.versi_oskey);
    const conf_versi_se = useSelector((state: IRootState) => state.themeConfig.versi_se);
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const isConnectedWS = useRef(0)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        let arr_cabang = get_branch_code(false,false);
        setOption5(arr_cabang)
    },[]);
    const userSelectKodeCabang = (value: any) => {
        if(value.length == 0){
            setKODE_CABANG('')
        }else{
            var arr_kode_cabang = "";
            for(var i = 0;i<value.length;i++){
                if(i === (value.length - 1 )){
                    arr_kode_cabang = arr_kode_cabang+value[i].value;
                }else{
                    arr_kode_cabang = arr_kode_cabang+value[i].value+",";
                }
                
            }
            setKODE_CABANG(arr_kode_cabang);
            setTextButtonFilter('Process')
            setDataIP('');
        }
    };

    const userSelectStation = (value:any) => {
        setStation(value.value);
        setTextButtonFilter('Process')
        setDataGagal('');
        setDataIP('');
        setStateCode(0)
    }

    const Def_Columns_ReportSatusListeners = (rows:any) => {
        const columns : GridColDef[] = [
            { field: 'id', headerName: 'id',  flex: 1},
            { 
                field: 'CLICK_FOR_ACTION', headerName: 'CLICK_FOR_ACTION',  flex: 1,  width: 150, minWidth: 150, maxWidth: 150,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span id={'btn_refresh_' + cellValues.id} className={cellValues.value === 200 ? 'badge bg-primary cursor-pointer' : 'badge bg-danger cursor-pointer'}>
                            <a onClick={(event) => {
                            }} >
                                Trigger
                            </a>
                        </span>
                    )
                }
            },
            { 
                field: 'KODE', headerName: 'KODE',  width: 80, minWidth: 80, maxWidth: 80,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                    <span className={cellValues.value === 200 ?  'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            { 
                field: 'KETERANGAN', headerName: 'KETERANGAN',  width: 240, minWidth: 240, maxWidth: 240,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                    <span className={cellValues.value === 'Succes' ?  'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            { field: 'REQUEST', headerName: 'REQUEST',  width: 200, minWidth: 200, maxWidth: 200},
            { field: 'RESPONSE', headerName: 'RESPONSE',  width: 200, minWidth: 200, maxWidth: 200},
            { field: 'KDCAB', headerName: 'KDCAB',   width: 60, minWidth: 60, maxWidth: 60},
            { field: 'KDTK', headerName: 'KDTK',  width: 80, minWidth: 80, maxWidth: 80},
            { field: 'NAMA', headerName: 'NAMA',  flex: 1,width: 250, minWidth: 250, maxWidth: 250},
            { field: 'STATION', headerName: 'STATION', width: 90, minWidth: 90, maxWidth: 90},
            { field: 'IP', headerName: 'IP',  width: 130, minWidth: 130, maxWidth: 130,
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            <span>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'VERSI_LISTENER', headerName: 'VERSI_LISTENER',  flex: 1, width: 260, minWidth: 260, maxWidth: 260,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.includes(conf_versi_listener) ? 
                            <span className={cellValues.value.includes('IP') ? 'badge bg-primary' : 'badge bg-success'}>{cellValues.value}</span>
                            :
                            <a className="btn btn-danger rounded-xl badge cursor-pointer hover:bg-yellow-400  focus:outline-none focus:ring" data-twe-toggle="tooltip">{cellValues.value}</a>
                        }
                        </div>
                    )
                }
            },
            { field: 'VERSI_SERVICE_LISTENER', headerName: 'VERSI_SERVICE_LISTENER',  flex: 1, width: 220, minWidth: 220, maxWidth: 220,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.includes(conf_versi_service_listener) ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <a className="btn btn-danger rounded-xl badge cursor-pointer hover:bg-yellow-400  focus:outline-none focus:ring" data-twe-toggle="tooltip">{cellValues.value}</a>
                        }
                        </div>
                    )
                }
            },
            { field: 'SERVICE_LISTENER', headerName: 'SERVICE_LISTENER',  flex: 1, width: 220, minWidth: 220, maxWidth: 220,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.toString().toUpperCase().includes('RUNNING') ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <a className="btn btn-danger rounded-xl badge cursor-pointer hover:bg-yellow-400  focus:outline-none focus:ring" data-twe-toggle="tooltip">{cellValues.value}</a>
                        }
                        </div>
                    )
                }
            },
            { field: 'VERSI_IDMLIBRARY', headerName: 'VERSI_IDMLIBRARY',  flex: 1, width: 220, minWidth: 220, maxWidth: 220,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.includes(conf_versi_idm_library) ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <a className="btn btn-danger rounded-xl badge cursor-pointer hover:bg-yellow-400  focus:outline-none focus:ring" data-twe-toggle="tooltip">{cellValues.value}</a>
                        }
                        </div>
                        
                    )
                }
            },
            { field: 'FILE_CABANG_INI', headerName: 'FILE_CABANG_INI',  flex: 1, width: 220, minWidth: 220, maxWidth: 220,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value.includes('NOK') ?  'badge bg-danger' : 'badge bg-success'}>{cellValues.value}</span>
                    )
                }
            },
            { field: 'VERSI_ATTRIBUTE', headerName: 'VERSI_ATTRIBUTE',  flex: 1, width: 220, minWidth: 220, maxWidth: 220,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.includes(conf_versi_attribute) ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <a className="btn btn-danger rounded-xl badge cursor-pointer hover:bg-yellow-400  focus:outline-none focus:ring" data-twe-toggle="tooltip" >{cellValues.value}</a>
                        }
                        </div>
                        
                    )
                }
            },
            { field: 'VERSI_SUHU', headerName: 'LibreHardwareMonitor.dll',  flex: 1, width: 220, minWidth: 220, maxWidth: 220,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.includes(conf_versi_suhu) ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <a className="btn btn-danger rounded-xl badge cursor-pointer hover:bg-yellow-400  focus:outline-none focus:ring" data-twe-toggle="tooltip" >{cellValues.value}</a>
                        }
                        </div>
                    )
                }
            },
            { field: 'VERSI_OSKEY', headerName: 'OS_KeyDLL.dll',  flex: 1, width: 220, minWidth: 220, maxWidth: 220,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.includes(conf_versi_oskey) ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <a className="btn btn-danger rounded-xl badge cursor-pointer hover:bg-yellow-400  focus:outline-none focus:ring" data-twe-toggle="tooltip">{cellValues.value}</a>
                        }
                        </div>
                    )
                }
            },
            { field: 'VERSI_SE', headerName: 'SE.dll',  flex: 1, width: 220, minWidth: 220, maxWidth: 220,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.includes(conf_versi_se) ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <span className="badge bg-danger rounded-xl badge cursor-pointer hover:bg-yellow-400  focus:outline-none focus:ring" data-twe-toggle="tooltip">{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'STATUS', headerName: 'STATUS',  flex: 1, width: 330, minWidth: 330, maxWidth: 330,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 'OK' ?  'badge bg-success' : (cellValues.value.includes('SIMULASI') ? 'badge bg-warning' : 'badge bg-danger') }>{cellValues.value}</span>
                    )
                }
            },
        ];
        const columnGroupingModel: GridColumnGroupingModel = [
            {
            groupId: 'Internal',
            description: '',
            children: [{ field: 'id' }],
            },

            {
                groupId: ' ',
                children: [{ field: 'CLICK_FOR_ACTION' },{ field: 'KODE' }, { field: 'KETERANGAN' },  {field: 'REQUEST'}, {field: 'RESPONSE'}, { field: 'KDCAB' }, { field: 'KDTK' }, { field: 'NAMA' }, { field: 'STATION' }, { field: 'IP' }],
            },
        
            {
                groupId: 'IDMCommandListenersApp.exe',headerAlign:'center',
                children: [{ field: 'VERSI_LISTENER' }, { field: 'VERSI_SERVICE_LISTENER' }, { field: 'SERVICE_LISTENER' }],
            },
            {
                groupId: 'IDMCommandLibrary.dll',headerAlign:'center',
                children: [{ field: 'VERSI_IDMLIBRARY' }],
            },

            {
                groupId: 'File cabang.ini & attribute',headerAlign:'center',
                children: [{ field: 'FILE_CABANG_INI' },{ field: 'VERSI_ATTRIBUTE' }],
            },

            {
                groupId: 'File Dll Pendukung',headerAlign:'center',
                children: [{ field: 'VERSI_SUHU' },{ field: 'VERSI_OSKEY' },{ field: 'VERSI_SE' }],
            },
        ];
        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }

    const clickTable : GridEventListener<'rowClick'> = (
            params, // GridRowParams
            event, // MuiEvent<React.MouseEvent<HTMLElement>>
            details, // GridCallbackDetails
        ) => {
        NewhandleRowClick(params,data_rows)
    };

    const NewhandleRowClick = async (cellValues:any, data_prev:any) => {
        let in_counter = 0;
        try {
            var kdcab = "";
            var kdtk = "";
            var station = "";
            var row_id = "";
            var id_btn = "";
            var ip = "";
            try {
                kdcab = cellValues.row.KDCAB;
                kdtk = cellValues.row.KDTK;
                station = cellValues.row.STATION;
                row_id = cellValues.row.id;
                id_btn = 'btn_refresh_' + cellValues.row.id;
                ip = cellValues.row.IP;
            } catch (Ex) {
                kdcab = cellValues.row.KDCAB;
                kdtk = cellValues.KDTK;
                station = cellValues.STATION;
                row_id = cellValues.id;
                id_btn = 'btn_refresh_' + cellValues.id;
                ip = cellValues.row.IP;
            }
            const myExample = document.getElementById(id_btn);
            if(isNull(myExample)){
                console.log('NOK');
            }else{
                start(in_counter, id_btn);
                setLoading(true);
                setDataProsentase(0)
                const list = myExample.classList;
                list.remove("bg-primary");
                list.add("bg-warning");
                const Token = GetToken()
                let res_command = await GetSignature(IN_HOST, IN_PORT, Token, command) as string
                SendHandleRowClick(IDReport,kdcab,kdtk,station,res_command,Token).then((response) => {
                    const res_data = response;
                    var code = res_data.code;
                    var msg = res_data.msg;
                    var rdata = res_data.data;
                    
                    if(parseFloat(code) === 200){
                        var parse_data_inti = JSON.parse(rdata);
                        const res_data_code = parse_data_inti[0].code;
                        const res_data_msg = parse_data_inti[0].msg;
                        const res_request = parse_data_inti[0].timerequest;
                        const res_response = parse_data_inti[0].timerespons;
                        const res_kdcab = parse_data_inti[0].kdcab;
                        const res_kdtk = parse_data_inti[0].toko;
                        const res_nama = parse_data_inti[0].nama;
                        const res_station = parse_data_inti[0].station;
                        const res_ip = parse_data_inti[0].ip;
                        if(res_data_code === 200){
                            const res_data_inti = parse_data_inti[0].data.split(';');
                            const versi_listener = res_data_inti[0];
                            const versi_listener_service = res_data_inti[1].split(':')[1].split('\r\n').join('').split('\r').join('').split(' ').join('');
                            const service_listener = res_data_inti[2].split(':')[1].trim().toString().toUpperCase();
                            const versi_idmlibrary = res_data_inti[3].split(':')[1].split('\r\n').join('').split('\r').join('').split(' ').join('');
                        
                            let file_cabang_ini = res_data_inti[4].split(':')[1].split(' ').join('').trim();
                            let res_file_cabang_ini = file_cabang_ini;
                            
                            const versi_attribute = res_data_inti[5].split('Versi attribute : ":"').join('').split('"').join('');
                            const versi_suhu = res_data_inti[6].split(':')[1].split('\r\n').join('').split('\r').join('').split(' ').join('');
                            const versi_oskey = res_data_inti[7].split(':')[1].split('\r\n').join('').split('\r').join('').split(' ').join('');
                            const versi_se = res_data_inti[7].split(':')[1].split('\r\n').join('').split('\r').join('').split(' ').join('');
                            var status = '';
                            if(versi_listener.includes(conf_versi_listener)){
                                if(versi_listener_service === conf_versi_service_listener){
                                    if(service_listener.includes('RUNNING')){
                                        if(versi_idmlibrary === conf_versi_idm_library){
                                            if(versi_attribute === conf_versi_attribute){
                                                
                                                if(file_cabang_ini === res_kdcab || (file_cabang_ini.toString().toLowerCase() === res_kdcab.toString().toLowerCase() )){
                                                    res_file_cabang_ini = ''+file_cabang_ini;
                                                    if(versi_suhu === conf_versi_suhu){
                                                        if(versi_oskey.includes(conf_versi_oskey)){
                                                                            
                                                            let for_simulasi_versi_se_toko = versi_se.split('.').join('')
                                                            let for_simulasi_conf_versi_se = conf_versi_se.split('.').join('')
                                                            if(versi_se.includes(conf_versi_se)){
                                                                status = 'OK';
                                                            }else if(parseFloat(for_simulasi_versi_se_toko) > parseFloat(for_simulasi_conf_versi_se)){
                                                                status = 'OK-SIMULASI SE'
                                                            }else{
                                                                status = 'NOK SE'
                                                            }
                                                        }else{
                                                            status = 'NOK LIBRARY OSKEY';
                                                            
                                                        }
                                                    }else{
                                                        status = 'NOK LIBRARY SUHU';
                                                        
                                                    }
                                                }else{
                                                    status = 'NOK CABANG INI';
                                                    res_file_cabang_ini = 'NOK-'+file_cabang_ini;
                                                    
                                                }
                                            }else{
                                                status = 'NOK ATTRIBUTE';
                                            }
                                        }else{
                                            status = 'NOK VERSI IDMCOMMANDLIBRARY';
                                            console.log(versi_idmlibrary+'VS'+conf_versi_idm_library)
                                        }
                                    }else{
                                        status = 'NOK SERVICE LISTENER';
                                        console.log(service_listener)    
                                    }
                                }else{
                                    status = 'NOK VERSI SERVICE LISTENER';
                                    console.log(versi_listener_service+' VS '+conf_versi_service_listener)
                                }
                            }else{
                                status = 'NOK VERSI';
                                console.log(versi_listener+' VS '+conf_versi_listener)
                            }
                            const objIndex = data_prev.findIndex(((obj: { id: any; }) => obj.id == row_id));
                            //Update object's name property.
                            data_prev[objIndex].id = parseFloat(row_id);
                            data_prev[objIndex].CLICK_FOR_ACTION = res_data_code;
                            data_prev[objIndex].KODE = res_data_code;
                            data_prev[objIndex].KETERANGAN = res_data_msg;
                            data_prev[objIndex].REQUEST = res_request;
                            data_prev[objIndex].RESPONSE = res_response;
                            data_prev[objIndex].KDCAB = res_kdcab;
                            data_prev[objIndex].KDTK =  res_kdtk;
                            data_prev[objIndex].NAMA = res_nama;
                            data_prev[objIndex].STATION = res_station;
                            data_prev[objIndex].IP = res_ip;
                            data_prev[objIndex].VERSI_LISTENER = versi_listener;
                            data_prev[objIndex].VERSI_SERVICE_LISTENER = versi_listener_service;
                            data_prev[objIndex].SERVICE_LISTENER = service_listener;
                            data_prev[objIndex].VERSI_IDMLIBRARY = versi_idmlibrary;
                            data_prev[objIndex].FILE_CABANG_INI = res_file_cabang_ini;
                            data_prev[objIndex].VERSI_ATTRIBUTE = versi_attribute;
                            data_prev[objIndex].VERSI_SUHU = versi_suhu;
                            data_prev[objIndex].VERSI_OSKEY = versi_oskey;
                            data_prev[objIndex].STATUS = status;
                            var rows = data_prev;
                        }else{
                            const objIndex = data_prev.findIndex(((obj: { id: any; }) => obj.id == row_id));
                            data_prev[objIndex].id = parseFloat(row_id);
                            data_prev[objIndex].LISTENER = res_data_msg;
                            data_prev[objIndex].REQUEST = res_request;
                            data_prev[objIndex].RESPONSE = res_response;
                            data_prev[objIndex].KDCAB = res_kdcab;
                            data_prev[objIndex].KDTK =  res_kdtk;
                            data_prev[objIndex].NAMA = res_nama;
                            data_prev[objIndex].STATION = res_station;
                            data_prev[objIndex].IP = res_ip;
                            data_prev[objIndex].VERSI_LISTENER = "-";
                            data_prev[objIndex].VERSI_SERVICE_LISTENER = "-";
                            data_prev[objIndex].SERVICE_LISTENER = "-";
                            data_prev[objIndex].VERSI_IDMLIBRARY = "-";
                            data_prev[objIndex].FILE_CABANG_INI = "-";
                            data_prev[objIndex].VERSI_ATTRIBUTE = "-";
                            data_prev[objIndex].VERSI_SUHU = "-";
                            data_prev[objIndex].VERSI_OSKEY = "-";
                            data_prev[objIndex].STATUS = "-";
                            var rows = data_prev;
                        }
                        Swal.fire({
                            title: t("Warning"),
                            text: res_data_code+'-'+res_data_msg,
                            icon: "success",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false);
                        stop();
                        myExample.innerHTML = 'Trigger';
                        list.remove("bg-warning");
                        list.add("bg-primary");
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
                        setLoading(false); 
                        stop()
                        myExample.innerHTML = 'Trigger';
                        list.remove("bg-warning");
                        list.add("bg-primary");
                    }else{
                        Swal.fire({
                            title: t("Warning"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false);
                        myExample.innerHTML = 'Trigger';
                        list.remove("bg-warning");
                        list.add("bg-primary");
                    }

                }).catch((error) => {
                    Swal.fire({
                        title: t("Warning"),
                        text: "Error : "+error.toString(),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    stop()
                    setLoading(false);
                    myExample.innerHTML = 'Trigger';
                    list.remove("bg-warning");
                    list.add("bg-primary");
                });
            }
        } catch (Ex) {
            Swal.fire({
                icon: 'error',
                padding: '2em',
                title: t("Warning"),
                text: "Error : " + Ex.toString(),
                customClass: 'sweet-alerts',
                timer: 30000,
                timerProgressBar: true,
                showCancelButton: false,
                showConfirmButton: false
            });
        }
    }
    const HandleClick2 = async () =>{
        if(TextButtonFilter === 'Proses' || TextButtonFilter === 'Process'){
            let in_counter = 0;
            start(in_counter,"timer");
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setDataGagal('');
            setDataIP('');
            setStateCode(0)
            setData_rows([]);
            setIsMounted(false);
            setClosedWS('');
            setLastResponse('');
            var ok = 0;
            var nok_versi_listener = 0;
            var nok_versi_service_listener = 0;
            var nok_service_listener = 0;
            var nok_versi_idmlibrary = 0;
            var nok_file_cabang_ini = 0;
            var nok_versi_attribut = 0;
            var nok_suhu = 0;
            var nok_oskey = 0;
            var nok_se = 0;
            var total_gagal = 0;
            var list_ip_failed = '';
            var list_toko_failed = '';
            if(kdcab === ''){
                Swal.fire({
                    title: t("Warning"),
                    text: t("Select Branch Code"),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }else{
                let rows = []
                const station = IN_CMB_STATION;
                var key = GetToken()
                let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                console.log('command : '+command)
                const param = WritePayload(kdcab,"",station,"","COMMAND",res_command,2,false,IDReport,key,IP,true,30);
                setTextButtonFilter('Please wait')
                const socket = new WebSocket(url);
                socket.binaryType = 'blob';
                //Connection error
                socket.addEventListener("error",(event) => {              
                    Swal.fire({
                        title: t("Warning"),
                        text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                        icon: "error",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setLoading(false);
                    setProgress(t('Finished Session'));
                    setTextButtonFilter('Process')
                    isConnectedWS.current = 0
                    setisDisabled(false)
                });
                // Connection opened
                socket.addEventListener("open",()=>{
                    socket.send(param);
                    setTextButtonFilter('Please wait')
                    setLoadingButton(true)
                    isConnectedWS.current = 1
                });
                // Connection close
                socket.addEventListener("close", (event: any) => {
                    console.log('connection close');
                    setLoading(false);
                    stop();
                    if(stateCode === 209){
                        setProgress(t('Finished Session'));
                        const val_gagal = GetTotalFailedClient('value_total_gagal')
                        setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                    }else{
                        setProgress('Ulangi Proses')
                        setTextButtonFilter('Process')
                        setDataIP('')
                    }
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                    isConnectedWS.current = 0
                    setisDisabled(false)
                    setLoadingButton(false)
                });
                // Listen for messages
                socket.addEventListener('message', async (event) => {
                    const data = ConvertBinaryToText(event);
                    const parse_json = JSON.parse(await data);
                    const code = parse_json.code;
                    const msg = parse_json.msg;
                    const countdata = parse_json.amountData;
                    setStateCode(code);
                    const tgl_kini = get_format_tanggal_jam();
                    setLastResponse(tgl_kini);
                    const data_row_id_failed : SetStateAction<any[]> = [];
                    if(code === 200 || code === 209){
                            setProgress(code+'-'+msg); 
                            if(isConnectedWS.current === 0){
                                setisDisabled(false)
                                setLoadingButton(false)
                            }else{
                                setisDisabled(true)
                            }
                            setIsMounted(true);
                            setLoading(true);
                            try{
                                const res_data = JSON.parse(parse_json.data);
                                const res_new = res_data;
                                setTotalStation(countdata);
                                for (var o = 0; o < res_new.length; o++) {
                                    const ubah_json = JSON.stringify(res_new[o])
                                    const parse_data_inti = JSON.parse(ubah_json)
                                    const res_data_msg = parse_data_inti.msg
                                    const res_data_code = parse_data_inti.code
                                    const res_request = parse_data_inti.timerequest
                                    const res_response = parse_data_inti.timerespons
                                    const res_kdcab = parse_data_inti.kdcab
                                    const res_kdtk = parse_data_inti.toko
                                    const res_nama = parse_data_inti.nama
                                    const res_station = parse_data_inti.station
                                    const res_ip = parse_data_inti.ip
                                    let result =  parse_data_inti.data
                                    const obj = ReportStatusListeners(false,0,[],res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result,conf_versi_listener,conf_versi_service_listener,conf_versi_idm_library,conf_versi_attribute,conf_versi_suhu,conf_versi_oskey,conf_versi_se,ok,nok_se,nok_oskey,nok_suhu,nok_file_cabang_ini,nok_versi_attribut,nok_versi_idmlibrary,nok_service_listener,nok_versi_service_listener,nok_versi_listener);
                                    rows.push(obj[0])
                                    if(res_data_code !== 200){
                                        total_gagal = total_gagal+1;
                                        if(list_toko_failed.includes(res_kdtk)){
                                        
                                        }else{
                                            list_toko_failed += res_kdtk+",";
                                        }

                                        if(list_ip_failed.includes(res_ip)){
                                        
                                        }else{
                                            list_ip_failed += res_ip+",";
                                        }
                                    }else{
                                       
                                    }
                                }
                                //-- parse hitung dari data yang terupdate --//
                                const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows,'KODE',false,false,false);
                                setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                                setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
                                //-- prosentase progressbar --//
                                var prosentase = Math.round(((arr_data_sukses_dan_gagal_from_Table[0] + arr_data_sukses_dan_gagal_from_Table[1]) / countdata) * 100);
                                setDataProsentase(prosentase)
                                list_toko_failed = list_toko_failed.substring(0,(list_toko_failed.length-1));
                                setDataGagal(list_toko_failed);
                                list_ip_failed = list_ip_failed.substring(0,(list_ip_failed.length-1));
                                setDataIP(list_ip_failed);
                                let columns = []
                                let arr_res_columns = Def_Columns_ReportSatusListeners(rows);
                                columns = arr_res_columns[0];
                                const res_rows = AddID(rows);
                                setData_columns(columns);
                                setData_rows(res_rows);
                                setTextButtonFilter('Retrieve data failed ('+arr_data_sukses_dan_gagal_from_Table[1]+')')
                                setcolumnGroupingModel(columnGroupingModel);
                                if(code === 209){
                                    setLoading(false);
                                    isConnectedWS.current = 0
                                }else{
                                    isConnectedWS.current = 1
                                }
                                //-- passing param for chart --//
                                var raw_total_ok = GetTotalClientByStatus(rows,'KDCAB','STATUS','OK');
                                const res_total_ok = SummaryValueOfArray(raw_total_ok);
                                
                                var raw_nok_file_cabang_ini = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK CABANG INI');
                                const res_nok_file_cabang_ini = SummaryValueOfArray(raw_nok_file_cabang_ini);

                                var raw_nok_attribute = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK ATTRIBUTE');
                                const res_nok_attribute = SummaryValueOfArray(raw_nok_attribute);
                            
                                var raw_nok_idmcommandLibrary = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK VERSI IDMCOMMANDLIBRARY');
                                const res_nok_idmcommandLibrary  = SummaryValueOfArray(raw_nok_file_cabang_ini);
                            
                                var raw_nok_service_listener = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK SERVICE LISTENER');
                                const res_nok_service_listener  = SummaryValueOfArray(raw_nok_service_listener);

                                var raw_nok_versi_listener = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK VERSI LISTENER');
                                const res_nok_versi_listener  = SummaryValueOfArray(raw_nok_versi_listener);
                            
                                var raw_timeout = GetTotalClientByStatus(rows,'KDCAB','STATUS','TIMEOUT');
                                const res_timeout  = SummaryValueOfArray(raw_timeout);
                            
                                var raw_error_command = GetTotalClientByStatus(rows,'KDCAB','STATUS','ERROR COMMAND');
                                const res_error_command  = SummaryValueOfArray(raw_error_command);

                                var raw_nok_suhu = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK SUHU');
                                const res_nok_suhu  = SummaryValueOfArray(raw_nok_suhu);

                                var raw_nok_se = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK SE');
                                const res_nok_se  = SummaryValueOfArray(raw_nok_se);

                                var raw_nok_oskey = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK OSKEY');
                                const res_nok_oskey  = SummaryValueOfArray(raw_nok_oskey);

                                const arr_labels = ['OK',
                                                    'NOK CABANG INI',
                                                    'NOK ATTRIBUTE',
                                                    'NOK VERSI IDMCOMMANDLIBRARY',
                                                    'NOK SERVICE LISTENER',
                                                    'NOK VERSI SERVICE LISTENER',
                                                    'NOK VERSI LISTENER',
                                                    'TIMEOUT',
                                                    'ERROR COMMAND',
                                                    'NOK SUHU',
                                                    'NOK OSKEY',
                                                    'NOK SE'
                                                ];
                                setDataLabelsStatus(arr_labels);
                                const arr_series =[res_total_ok,
                                                    res_nok_file_cabang_ini,
                                                    res_nok_attribute,
                                                    res_nok_idmcommandLibrary,
                                                    res_nok_service_listener,
                                                    res_nok_service_listener,
                                                    res_nok_versi_listener,
                                                    res_timeout,
                                                    res_error_command,
                                                    res_nok_suhu,
                                                    res_nok_oskey,
                                                    res_nok_se
                                ];
                                
                                setDataSeriesStatus(arr_series);
                                setDataWidthChart(400);
                                const type_chart = 'donut';
                                setDataTypeChart(type_chart);
                                const arr_color = ['#008FFB', '#fc7303', '#775DD0','#13d8aa','#5C4742','#D7263D','#F9C80E','#546E7A','#6e0678','#19abb0','#f086a1'];
                                setDataColor(arr_color);
                                //-- grafik versi bar --//
                                const data_labels_versi = [conf_versi_listener, 'BELUM UPDATE', 'TIDAK REPORT'];
                                setDataLabelsVersi(data_labels_versi);
                                const group_value_versi_listener = groupByValueAndCount(rows,'VERSI_LISTENER');
                                let res_count_versi_current = 0;
                                let res_count_versi_last = 0;
                                let res_timeoutfor_chart = 0;
                                for (const key in group_value_versi_listener) {
                                const in_key_data = key;
                                    if(in_key_data === conf_versi_listener){
                                        res_count_versi_current = group_value_versi_listener[in_key_data]
                                    }else if(in_key_data === ''){
                                        res_timeoutfor_chart = group_value_versi_listener[in_key_data]
                                    }else{
                                        res_count_versi_last = group_value_versi_listener[in_key_data]
                                    }
                                }
                                setDataCountVersiCurrent(res_count_versi_current);
                                setDataCountVersiLast(res_count_versi_last);
                                const data_series_versi = [res_count_versi_current, res_count_versi_last, res_timeoutfor_chart];
                                setDataSeriesVersi(data_series_versi);
                                //-- grafik per cabang --//
                                const res_total_station = groupByMessageListeners_PerCabang(rows,'KDCAB',true,false,false);
                                const res_success = groupByMessageListeners_PerCabang(rows,'KDCAB',false,true,false);
                                const summary_success = SummaryValueOfArray(res_success);
                                var res_hitung_gagal = [];
                                for(var p = 0;p<res_total_station.length;p++){
                                    var hitung_gagal = res_total_station[p] - res_success[p];
                                    res_hitung_gagal.push(hitung_gagal);
                                }
                                if(isUndefined(res_success)){

                                }else{
                                    const data_labels_cabang = groupByValueAndCount(rows,'KDCAB');
                                    const res_data_labels_cabang = ListKey(data_labels_cabang,true);
                                    setDataLabelsPerCabang(res_data_labels_cabang);
                                    const total_station = {name:'Total Station',data:res_total_station};
                                    const total_online = {name:'Online',data:res_success};
                                    const total_offline = {name:'Offline',data:res_hitung_gagal};
                                    const data_series_cabang = [total_station,total_online,total_offline];
                                    setDataSeriesPerCabang(data_series_cabang);
                                }
                            }catch(Ex){console.log('Error : '+Ex.toString())}
                    }else if(code === 201){
                        setProgress(code+"-"+msg);
                        setLoading(true);
                        isConnectedWS.current = 1
                    }else if(parse_json.code.toString().substring(0,1) === '4'){
                        setLoading(true);
                        Swal.fire({
                            title: t("Warning"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        if(code === 403){
                            //-- redirect ke login --//
                            socket.close();
                            handleLogout();
                        }
                        setTextButtonFilter('Process')
                        setLoading(false);
                        setProgress('');
                    }
                });
            
            }
         //-- PROSES DATA GAGAL --//   
        }else{
            setDataProsentase(0)
            var ok = 0;
            const res_data_gagal = data_gagal;
            const res_ip_Failed = IP;
            if(res_data_gagal !== ''){
                let in_counter = 0;
                start(in_counter,"timer");
                var res_list_kirim = '';
                let counter_id = 0;
                const kdcab = IN_CMB_KODE_CABANG;
                if(kdcab === ''){
                    Swal.fire({
                        title: t("Warning"),
                        text: t("Select Branch Code"),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                }else{
                    var key = GetToken()
                    let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                    const param = WritePayload(kdcab,'','',"","COMMAND",res_command,4,false,IDReport,key,res_ip_Failed,true,30);
                    console.log(param)
                    setTextButtonFilter('Please wait')
                    const socket = new WebSocket(url);
                    socket.binaryType = 'blob';
                    //Connection error
                    socket.addEventListener("error",(event: any) => {          
                        Swal.fire({
                            title: t("Warning"),
                            text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                            icon: "error",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false);
                        setProgress(t('Finished Session'));
                        setTextButtonFilter('false')
                        isConnectedWS.current = 0
                        setisDisabled(false)
                    });
                    // Connection opened
                    socket.addEventListener("open",()=>{
                        socket.send(param);
                        setLoadingButton(true)
                        setTextButtonFilter('Please wait')
                        isConnectedWS.current = 1
                    });
                    // Connection close
                    socket.addEventListener("close", (event: any) => {
                        console.log('connection close');
                        setLoading(false);
                        setProgress(t('Finished Session'));
                        stop();
                        const val_gagal = GetTotalFailedClient('value_total_gagal')
                        setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                        isConnectedWS.current = 0
                        setisDisabled(false)
                        setLoadingButton(false)
                    });
                    // Listen for messages
                    socket.addEventListener('message', async (event) => {
                        const data = ConvertBinaryToText(event);
                        const parse_json = JSON.parse(await data);
                        const code = parse_json.code;
                        const msg = parse_json.msg;
                        let rows: SetStateAction<any[]> = [];
                        if(code === 200 || code === 209){
                            setProgress(code+'-'+msg);
                            setLoading(true);
                            if(((msg.includes('Mohon di tunggu'))) || (msg.includes('Handletime kami Default')) ){
                               
                            }else{  
                                const res_data = JSON.parse(parse_json.data);
                                const res_new = res_data;
                                for (var o = 0; o < res_new.length; o++) {
                                    const ubah_json = JSON.stringify(res_new[o]);
                                    const parse_data_inti = JSON.parse(ubah_json);
                                    const res_data_msg = parse_data_inti.msg
                                    const res_data_code = parse_data_inti.code
                                    const res_request = parse_data_inti.timerequest
                                    const res_response = parse_data_inti.timerespons
                                    const res_kdcab = parse_data_inti.kdcab
                                    const res_kdtk = parse_data_inti.toko
                                    const res_nama = parse_data_inti.nama
                                    const res_station = parse_data_inti.station
                                    const res_ip = parse_data_inti.ip
                                    let result = parse_data_inti.data
                                    const objIndex = data_rows.findIndex(((obj: { IP: any; }) => obj.IP == res_ip));
                                    ReportStatusListeners(true,objIndex,data_rows,res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result,conf_versi_listener,conf_versi_service_listener,conf_versi_idm_library,conf_versi_attribute,conf_versi_suhu,conf_versi_oskey,conf_versi_se,ok,nok_se,nok_oskey,nok_suhu,nok_file_cabang_ini,nok_versi_attribut,nok_versi_idmlibrary,nok_service_listener,nok_versi_service_listener,nok_versi_listener);
                                    rows = data_rows;
                                    //-- parse hitung dari data yang terupdate --//
                                    const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows,'KODE',false,false,false);
                                    setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                                    setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);

                                    const res_data_gagal_after_trigger = GetFailedClient(rows,'KDCAB',false);
                                    setDataGagal(res_data_gagal_after_trigger);
                                    const res_ip_gagal_after_trigger = GetFailedClient(rows,'KDCAB',true);
                                    setDataIP(res_ip_gagal_after_trigger);
                                    setData_rows(rows);
                                    setTextButtonFilter('Retrieve data failed'+' ('+arr_data_sukses_dan_gagal_from_Table[1]+')')
                                    if(code === 209){
                                        setLoading(false)
                                    }else{
                                        setLoading(true)
                                    }
                                    //-- passing param for chart --//
                                    var raw_total_ok = GetTotalClientByStatus(rows,'KDCAB','STATUS','OK');
                                    const res_total_ok = SummaryValueOfArray(raw_total_ok);
                                    
                                    var raw_nok_file_cabang_ini = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK CABANG INI');
                                    const res_nok_file_cabang_ini = SummaryValueOfArray(raw_nok_file_cabang_ini);

                                    var raw_nok_attribute = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK ATTRIBUTE');
                                    const res_nok_attribute = SummaryValueOfArray(raw_nok_attribute);
                                
                                    var raw_nok_idmcommandLibrary = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK VERSI IDMCOMMANDLIBRARY');
                                    const res_nok_idmcommandLibrary  = SummaryValueOfArray(raw_nok_file_cabang_ini);
                                
                                    var raw_nok_service_listener = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK SERVICE LISTENER');
                                    const res_nok_service_listener  = SummaryValueOfArray(raw_nok_service_listener);

                                    var raw_nok_versi_listener = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK VERSI LISTENER');
                                    const res_nok_versi_listener  = SummaryValueOfArray(raw_nok_versi_listener);

                                    var raw_nok_se = GetTotalClientByStatus(rows,'KDCAB','STATUS','NOK SE');
                                    const res_nok_se  = SummaryValueOfArray(raw_nok_se);
                                
                                    var raw_timeout = GetTotalClientByStatus(rows,'KDCAB','STATUS','TIMEOUT');
                                    const res_timeout  = SummaryValueOfArray(raw_timeout);
                                
                                    var raw_error_command = GetTotalClientByStatus(rows,'KDCAB','STATUS','ERROR COMMAND');
                                    const res_error_command  = SummaryValueOfArray(raw_error_command);
                                
                                    const arr_series =[res_total_ok,res_nok_file_cabang_ini,res_nok_attribute,res_nok_idmcommandLibrary,res_nok_service_listener,res_nok_service_listener,res_nok_versi_listener,res_timeout,res_error_command,res_nok_se];
                                    setDataSeriesStatus(arr_series);
                                    setDataWidthChart(400);
                                    const type_chart = 'pie';
                                    setDataTypeChart(type_chart);
                                    const arr_color = ['#008FFB', '#fc7303', '#775DD0','#13d8aa','#5C4742','#D7263D','#F9C80E','#546E7A','#6e0678'];
                                    setDataColor(arr_color);

                                    //-- grafik versi bar --//
                                    const data_labels_versi = [conf_versi_listener, 'BELUM UPDATE', 'TIDAK REPORT'];
                                    setDataLabelsVersi(data_labels_versi);
                                    const group_value_versi_listener = groupByValueAndCount(rows,'VERSI_LISTENER');
                                    let res_count_versi_current = 0;
                                    let res_count_versi_last = 0;
                                    let res_timeoutfor_chart = 0;
                                    for (const key in group_value_versi_listener) {
                                        const in_key_data = key;
                                        if(in_key_data === conf_versi_listener){
                                            res_count_versi_current = group_value_versi_listener[in_key_data]
                                        }else if(in_key_data === ''){
                                            res_timeoutfor_chart = group_value_versi_listener[in_key_data]
                                        }else{
                                            res_count_versi_last = group_value_versi_listener[in_key_data]
                                        }
                                    }
                                    setDataCountVersiCurrent(res_count_versi_current);
                                    setDataCountVersiLast(res_count_versi_last);
                                    const data_series_versi = [res_count_versi_current, res_count_versi_last, res_timeoutfor_chart];
                                    setDataSeriesVersi(data_series_versi)
                                }
                            }
                        }else if(parse_json.code.toString() === '201'){
                            setProgress(code+"-"+msg);
                            setLoading(true);
                            isConnectedWS.current = 1
                        }else if(parse_json.code.toString().substring(0,1) === '4'){
                            setLoading(true);
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            if(code === 403){
                                //-- redirect ke login --//
                                handleLogout();
                            }
                            setLoading(false);
                            setProgress('');
                            setTextButtonFilter('Process')
                            isConnectedWS.current = 0
                        }
                    });
                }
            }else{
                setLoading(false);
                setTextButtonFilter('Process')
                isConnectedWS.current = 0
            }
        }
    };
    const HandleReloadClick = () =>{
        try{
            setData_rows([]);
            router.reload();
        }catch(Ex){
            console.log('error : '+Ex.toString())
        }
    };
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    return (
        <>
        <AntiScrapedShieldComponent in_content={
            <>
            <div className="grid-cols-2 gap-3  md:grid-cols-2 mb-3 flex items-end justify-left">
                <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
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
                                <DropDownBranch in_classname_title={'mb-1'} in_classname_content={'w-full'} data_options={options5} isSearchable={true} isMulti={true} event={userSelectKodeCabang} />
                                <DropDownStation isInduk={false} in_classname_title={'mb-1'} in_classname_content={'w-full'} data_options={[]} isSearchable={true} isMulti={false} event={userSelectStation} />
                                <div className="mb-3">
                                    <div className="flex">
                                    <ButtonFilter in_icon={<IconSend />} in_title_button={TextButtonFilter} isDisabled={isDisabled} in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={GetID()} isLoading={LoadingButton} HandleClick={HandleClick2} />
                                    &nbsp;
                                    <ButtonReload isDisabled={false} in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={false} HandleClick={HandleReloadClick} />
                                    </div>
                                </div>
                            </div>
                        </div> 
                </div>
                <CardInfoProses total_station={total_station} total_sukses={total_sukses} total_gagal={total_gagal} in_classname_content={"mx-auto grid max-w-[900px] grid-cols-4 justify-items-center gap-3"} />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <MultiColumnsChart in_border={true} data_labels={DataLabelsPerCabang} data_series={DataSeriesPerCabang} data_options={''} data_judul={t("Summary Branch")} data_width_chart={DataWidthChart} data_type_chart={''} data_color={[]} ISMount={isMounted} />
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {/* GRAFIK STATUS IDMCOMMANDLISTENER */}
                <DonutChartNew in_legend={{'position': 'right',show: true}} in_border={true}  data_labels={DataLabelsStatus} data_series={DataSeriesStatus} data_options={DataOptionsStatus} data_judul={t("Rekap Status Listener")} data_width_chart={DataWidthChart} data_type_chart={DataTypeChart.toString()} data_color={DataColor} ISMount={isMounted} />
                {/* GRAFIK REKAP VERSI IDMCOMMANDLISTENER */}
                <BarChart   data_labels={DataLabelsVersi} data_series={DataSeriesVersi} data_options={DataOptionsVersi} data_judul={t("Summary Version Listener")} data_width_chart={DataWidthChart} data_type_chart={''} data_color={DataColorVersi} ISMount={isMounted} />
            </div>
            <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Report Monitoring Status IDMCommandListeners'} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS), new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={clickTable} in_prosentase_progress={DataProsentase} in_rows_spanning={false}  />  
            </>
        } />
        </>
    )
}
export default FormDasboardIDMCommandListeners;