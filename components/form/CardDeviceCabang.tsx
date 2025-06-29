'use client'
import React, { Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import {  GridColDef, GridColumnGroupingModel, GridEventListener, GridToolbar } from '@mui/x-data-grid';
import {  createTheme, styled } from '@mui/material/styles';
import {  useSelector } from "react-redux";
import { filter, isUndefined } from 'lodash';
import { IRootState } from "@/store";
import IconRefresh from "../Icon/IconRefresh";
import IconCpuBolt from "../Icon/IconCpuBolt";
import { Dialog, Transition } from '@headlessui/react';
import IconSend from "../Icon/IconSend";
import IconX from "../Icon/IconX";
import IconBox from "../Icon/IconBox";
import DataTables from "../table/DataTables";
import Swal from "sweetalert2";
import { AddID, ConvertBinaryToText, get_format_tanggal_jam, GetFormatCurrency, handleLogout, WritePayloadRealtimeRouter,WritePayloadRealtime,WritePayload, GetID, GetToken, GenerateUniqNumber, get_dateTimeDiff_second } from "@/lib/global";
import { Posts } from "@/lib/post";
import config from '@/lib/config.json';
import withReactContent from 'sweetalert2-react-content';
import { useTranslation } from "react-i18next";
import IconSettings from "../Icon/IconSettings";
import DonutChartNew from "../chart/DonutChartNew";
import IconAirplay from "../Icon/IconAirplay";
import IconArchive from "../Icon/IconArchive";
import IconArrowForward from "../Icon/IconArrowForward";
import IconBell from "../Icon/IconBell";
import IconClock from "../Icon/IconClock";
import IconDownload from "../Icon/IconDownload";
import IconHome from "../Icon/IconHome";
import IconInfoHexagon from "../Icon/IconInfoHexagon";
import IconLogout from "../Icon/IconLogout";
import IconPrinter from "../Icon/IconPrinter";
import IconServer from "../Icon/IconServer";
import IconTrendingUp from "../Icon/IconTrendingUp";
import IconMenuComponents from "../Icon/Menu/IconMenuComponents";
import RadialChart from "../chart/RadialChart";
import themeConfig from "@/theme.config";

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

interface CardDeviceCabangProps{
    in_IDReport:string,
    in_station:string,
    jenis_laporan: string,
    in_data_labels:any,
    in_data_rows: any,
    in_data_summary:any,
    in_data_table:any,
    isLoading: boolean,
    isVisible:boolean,
    in_filter_kdcab:string
}

const CardDeviceCabang: React.FC<CardDeviceCabangProps> = ({in_IDReport,in_station,jenis_laporan,in_data_labels,in_data_rows,in_data_summary,in_data_table,isLoading,isVisible,in_filter_kdcab}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
const [modal13, setModal13] = useState(false);
const [modal14, setModal14] = useState(false);
const [modal15, setModal15] = useState(false);
const [modal16, setModal16] = useState(false);
const [tabsRB, setTabsRB] = useState<string>('traffic_interface');
const [IN_DATA_STATION,setIN_DATA_STATION] = useState('');
const [IN_DATA_KONDISI,setIN_DATA_KONDISI] = useState('');



const [IN_DATA_ROWS,setIN_DATA_ROWS] = useState([]);
const [IN_DATA_COLUMNS,setIN_DATA_COLUMNS] = useState([]);
const [IN_LOADING,setIN_LOADING] = useState(false);
const [IN_HOST, setHOST] = useState('');
const [IN_HISTORY_IP_VALUE,setIN_HISTORY_IP_VALUE] = useState('');
const [IN_DATA_ROWS_HISTORY,setIN_DATA_ROWS_HISTORY] = useState([]);
const [IN_DATA_COLUMNS_HISTORY,setIN_DATA_COLUMNS_HISTORY] = useState([]);

const [IN_INTERVAL_AKHIR,setIN_INTERVAL_AKHIR] = useState('');
const [IN_INTERVAL_AWAL,setIN_INTERVAL_AWAL] = useState('');
const [IN_INTERVAL_RANGE_TIME,setIN_INTERVAL_RANGE_TIME] = useState('');

const [IN_DOWNTIME_AKHIR,setIN_DOWNTIME_AKHIR] = useState('');
const [IN_DOWNTIME_AWAL,setIN_DOWNTIME_AWAL] = useState('');
const [IN_DOWNTIME_RANGE_TIME,setIN_DOWNTIME_RANGE_TIME] = useState('');

const [IN_SHOW_HISTORY,setIN_SHOW_HISTORY] = useState('invisible');
const [IN_LOADING_DATA_HISTORY_DETAIL,setIN_LOADING_DATA_HISTORY_DETAIL] = useState(false);

const ref_station = useRef('');
const ref_kondisi = useRef('');

const [IN_NAMA_TOKO,setNAMA_TOKO] = useState('');
const [isMounted,setIsMounted] = useState(false);
const ref = useRef(0);
const refwdcp = useRef(0);
const is_disconnect = useRef(1);
const [isDisabledReconnect,setisDisabledReconnect] = useState(true);


const [data_rows_io_1,setdata_rows_io_1] = useState([]);
const [data_rows_service,setdata_rows_service] = useState([]);
const [data_rows_view_log,setdata_rows_view_log] = useState([]);
const [DataColumnViewLog,setDataColumnViewLog] = useState([]);
const [data_rows_routing,setdata_rows_routing] = useState([]);

const [data_rows_interface_bridge,setdata_rows_interface_bridge] = useState([]);
const [DataColumnInterfaceBridge,setDataColumnInterfaceBridge] = useState([]);

const [data_rows_ip_setting,setdata_rows_ip_setting] = useState([]);
const [DataColumnIPSetting,setDataColumnIPSetting] = useState([]);

const [data_rows_interface_wireless,setdata_rows_interface_wireless] = useState([]);
const [DataColumnInterfaceWireless,setDataColumnInterfaceWireless] = useState([]);

const [data_rows_netwatch,setdata_rows_netwatch] = useState([]);
const [DataColumnNetwatch,setDataColumnNetwatch] = useState([]);



const [BoardName,setBoardName] = useState('');
const [UptimeRouter,setUptimeRouter] = useState('');
const [CPUName,setCPUName] = useState('');
const [VersionFirmwareRouter,setVersionFirmwareRouter] = useState('');
const [BuildTime,setBuildTime] = useState('');
const [DateRouter,setDateRouter] = useState('');
const [TimeRouter,setTimeRouter] = useState('');
const [ModelRouter,setModelRouter] = useState('');
const [CPULoadRouter,setCPULoadRouter]= useState([]);
const [NTPRouter,setNTPRouter] = useState('');
const [FreeMemoryRouter,setFreeMemoryRouter] = useState('0');
const [TotalMemoryRouter,setTotalMemoryRouter] = useState('0');
const [UsageMemoryRouter,setUsageMemoryRouter] = useState('0');
const [ProsentaseUsageMemoryRouter,setProsentaseUsageMemoryRouter] = useState([]);

const [DataSeriesCPU,setDataSeriesCPU] = useState([]);
const [DataLabelsCPU,setDataLabelsCPU] = useState([]);

const [DataSeriesMemory,setDataSeriesMemory] = useState([]);
const [DataLabelsMemory,setDataLabelsMemory] = useState([]);

const [DataSeriesDiskUsage,setDataSeriesDiskUsage] = useState([]);
const [DataLabelsDiskUsage,setDataLabelsDiskUsage] = useState([]);

const [FreeHDDRouter,setFreeHDDRouter] = useState('0');
const [TotalHDDRouter,setTotalHDDRouter] = useState('0');
const [UsageHDDRouter,setUsageHDDRouter] = useState('0');
const [ProsentaseUsageHDDRouter,setProsentaseUsageHDDRouter] = useState([]);

const [data_engine_wdcp,setdata_engine_wdcp] = useState('-');
const [data_schedule_wdcp,setschedule_wdcp] = useState('-');
const [data_startat_wdcp,setdata_startat_wdcp] = useState('-');
const [data_interval_wdcp,setdata_interval_wdcp] = useState('-');


const [data_engine_koneksi,setdata_engine_kooneksi] = useState('-');
const [data_schedule_koneksi,setschedule_koneksi] = useState('-');
const [data_startat_koneksi,setdata_startat_koneksi] = useState('-');
const [data_interval_koneksi,setdata_interval_koneksi] = useState('-');
const [data_engine_device,setdata_engine_device] = useState('-');
const [data_schedule_device,setschedule_device] = useState('-');
const [data_startat_device,setdata_startat_device] = useState('-');
const [data_interval_device,setdata_interval_device] = useState('-');


const [ISShowTraffic,setISShowTraffic] = useState(false);
const [isTextTraffic,setisTextTraffic] = useState('Traffic');
const [isDisabledButtonTraffic,setisDisabledButtonTraffic] = useState(true);
const [IPStationSelected,setIPStationSelected] = useState('');
const [StationSelected,setStationSelected] = useState('');
const [LoadingViewLog,setLoadingViewLog] = useState(false);

const [LoadingInterfaceWirelessSetting,setLoadingInterfaceWirelessSetting] = useState(false);
const [LoadingIPSetting,setLoadingIPSetting] = useState(false);
const [LoadingInterfaceBridge,setLoadingInterfaceBridge] = useState(false);
const [LoadingNetwatch,setLoadingNetwatch] = useState(false);

const [progressbar_io_1,setprogressbar_io_1] = useState('');
const [DataTokoSelected,setDataTokoSelected]  = useState([]);

const [data_rows_processlist,setDataRowsProcesslist] = useState([]);
const [data_columns_processlist,setDataColumnsProcesslist] = useState([]);
const [loading_processlist, setLoadingProcesslist] = useState(false);
const [progressbar_processlist, setProgressProcesslist] = useState('');
const [OSName,setOSName] = useState('');
const [Architecture,setArchitecture] = useState('');
const [BootTime,setBootTime] = useState('');
const [UpTime,setUpTime] = useState('');
const [Suhu,setSuhu] = useState(0);
const [DataSeriesCPU_Temp,setDataSeriesCPU_Temp] = useState([0]);



const [SentBytes,setSentBytes] = useState('');
const [ReceivedBytes,setReceivedBytes] = useState('');

const [SentThroughput,setSentThroughput] = useState('');
const [ReceivedThroughput,setReceivedThroughput] = useState('');

const [LastsBootTime,setLastsBootTime] = useState('');
const [Processor,setProcessor] = useState('');
const [MemoryTerpasang,setMemoryTerpasang] = useState('');
const stateConnect = useRef(0);
const [IN_JUDUL_FORM,setIN_JUDUL_FORM] = useState('')
const { t, i18n } = useTranslation();
const [Progress,setProgress] = useState('')
const [ClosedWS,setClosedWS] = useState('')
const [LastResponse,setLastResponse] = useState('');
const MySwal = withReactContent(Swal);
const [Token,setToken] = useState('')

useEffect(() => {
    var key = GetToken()
    setToken(key)
    const res_host = themeConfig.host
    const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
    setHOST(res_host);
});

const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

const ColumnCardTableDevice = [
    { field: 'id', headerName: 'id',   flex: 1},
    { field: 'kdcab', headerName: 'KDCAB',  flex: 1,
        renderCell: (cellValues: any) => {
            return (
            <span className={"text-decoration-line: underline cursor-pointer text-default"}>
                    <>
                    <a onClick={(event) => {
                            ref_kondisi.current = 'KDCAB'; 
                            showDetail_StatusStation(cellValues,'')
                        }} >
                    {cellValues.value}</a>
                    </>
            </span>

        )}
    },
    { field: 'station', headerName: 'STATION',  flex: 1,
        renderCell: (cellValues: any) => {
            return (
            <span className={"text-decoration-line: underline cursor-pointer text-default"}>
                    <>
                    <a onClick={(event) => {
                            ref_kondisi.current = 'STATION'; 
                            //showDetail_StatusStation(cellValues,'')
                            showDetail_StatusStationWS(cellValues,'')
                        }} >
                    {cellValues.value}</a>
                    </>
            </span>

        )}
    },
    { field: 'up', headerName: 'UP', flex: 1,
        renderCell: (cellValues: any) => {
            return (
            <span className={"text-decoration-line: underline cursor-pointer text-success"}>
                    <>
                    <a onClick={(event) => {
                            ref_kondisi.current = 'UP'; 
                            showDetail_StatusStation(cellValues,'')
                        }} >
                    {cellValues.value}</a>
                    </>
            </span>

        )}
    },
    { field: 'down', headerName: 'DOWN', flex: 1,
         renderCell: (cellValues: any) => {
            return (
            <span className={"text-decoration-line: underline cursor-pointer text-danger"}>
                    <>
                    <a onClick={(event) => {               
                            ref_kondisi.current = 'DOWN';
                            showDetail_StatusStation(cellValues,'')
                        }} >
                    {cellValues.value}</a>
                    </>

            </span>

        )}
    },
    { field: 'wrong_time', headerName: 'WRONG_TIME', flex: 1,
    renderCell: (cellValues: any) => {
        return (
        <span className={"text-decoration-line: underline cursor-pointer text-warning"}>
                <>
                <a onClick={(event) => {
                       ref_kondisi.current = 'WRONG_TIME'; 
                       showDetail_StatusStation(cellValues,'')
                    }} >
                {cellValues.value}</a>
                </>

        </span>

    )}
    },
    { field: 'no_report', headerName: 'NO_REPORT', flex: 1,
    renderCell: (cellValues: any) => {
        return (
        <span className={"text-decoration-line: underline cursor-pointer text-default"}>
                <>
                <a onClick={(event) => {
                      ref_kondisi.current = 'NO REPORT';
                      showDetail_StatusStation(cellValues,'')
                    }} >
                {cellValues.value}</a>
                </>

        </span>

    )}
    },
];

const ColumnCardTableKoneksi = [
    { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
    { field: 'kdcab', headerName: 'KDCAB',   flex:1,
        renderCell: (cellValues: any) => {
            return (
            <span className={"text-decoration-line: underline cursor-pointer text-default"}>
                    <>
                    <a onClick={(event) => {
                            ref_kondisi.current = 'KDCAB'; 
                            showDetail_StatusStation(cellValues,'')
                        }} >
                    {cellValues.value}</a>
                    </>
            </span>

        )}
    },
    { field: 'jenis_koneksi', headerName: 'JENIS', flex:1,
        renderCell: (cellValues: any) => {
            return (
            <span className={"text-decoration-line: underline cursor-pointer text-default"}>
                    <>
                    <a onClick={(event) => {
                            ref_kondisi.current = 'STATION'; 
                            showDetail_StatusStation(cellValues,'')
                        }} >
                    {cellValues.value}</a>
                    </>
            </span>

        )}
    },
    { field: 'up', headerName: 'UP',  flex:1,
        renderCell: (cellValues: any) => {
            return (
            <span className={"text-decoration-line: underline cursor-pointer text-success"}>
                    <>
                    <a onClick={(event) => {
                            ref_kondisi.current = 'UP'; 
                            showDetail_StatusStation(cellValues,'')
                        }} >
                    {cellValues.value}</a>
                    </>
            </span>

        )}
    },
    { field: 'down', headerName: 'DOWN',  flex:1,
        renderCell: (cellValues: any) => {
            return (
            <span className={"text-decoration-line: underline cursor-pointer text-danger"}>
                    <>
                    <a onClick={(event) => {               
                            ref_kondisi.current = 'DOWN';
                            showDetail_StatusStation(cellValues,'')
                        }} >
                    {cellValues.value}</a>
                    </>
            </span>

        )}
    },
    { field: 'wrong_time', headerName: 'WRONG_TIME', flex:1,
    renderCell: (cellValues: any) => {
        return (
        <span className={"text-decoration-line: underline cursor-pointer text-warning"}>
                <>
                <a onClick={(event) => {
                    ref_kondisi.current = 'WRONG_TIME'; 
                    showDetail_StatusStation(cellValues,'')
                    }} >
                {cellValues.value}</a>
                </>
        </span>

    )}
    },
    { field: 'no_report', headerName: 'NO_REPORT', flex:1,
    renderCell: (cellValues: any) => {
        return (
        <span className={"text-decoration-line: underline cursor-pointer text-default"}>
                <>
                <a onClick={(event) => {
                    ref_kondisi.current = 'NO_REPORT';
                    showDetail_StatusStation(cellValues,'')
                    }} >
                {cellValues.value}</a>
                </>
        </span>

    )}
    },
];


const showTraffic = (isText:string)=>{
    if(isText === 'Hide'){
        setisTextTraffic('Traffic');
        setISShowTraffic(false);
    }else{
        setisTextTraffic('Hide');
        setISShowTraffic(true);
    }
}

const toggleTabsRB = (name: string,IN_IPStationSelected:string) => {
    setTabsRB(name);
    if(name === 'view_log'){
        const url = `http://${IN_HOST}:7321/ReportFromRouter/v1/ViewLog`;
        const param = {"IP":IN_IPStationSelected};
        setLoadingViewLog(true);
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token) .then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        
                        if(parseFloat(code) === 200){
                            var data_body = JSON.parse(res_data.data);
                            var res_data_body = AddID(data_body);
                            setdata_rows_view_log(res_data_body);
                            const columns_view_log : GridColDef[] = [
                                { field: 'id', headerName: 'id',  flex: 1},
                                { field: 'time', headerName: 'time',  width: 200, minWidth: 200, maxWidth: 200},
                                { field: 'topic', headerName: 'TOPIC',  width: 200, minWidth: 200, maxWidth: 200},
                                { field: 'msg', headerName: 'MESSAGE',  width: 800, minWidth: 800, maxWidth: 800},
                            ];
                            setDataColumnViewLog(columns_view_log);
                            setLoadingViewLog(false);
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
                            setLoadingViewLog(false);
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setLoadingViewLog(false);
                        }
                    }
        ).catch(
                (error) => {
                    Swal.fire({
                        title: t("Warning"),
                        text: t("Error Get Data"),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setLoadingViewLog(false);
                }
                
        );
    }else if(name === 'interface_wireless_setting'){
        const url = `http://${IN_HOST}:7321/ReportFromRouter/v1/InterfaceWireless`;
        const param = {"ip":IN_IPStationSelected};
        const Token = GetToken()
        setLoadingInterfaceWirelessSetting(true);
        Posts(url,JSON.stringify(param),false,Token) .then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        
                        if(parseFloat(code) === 200){
                            var data_body = JSON.parse(res_data.data);
                            console.log(JSON.stringify(data_body))
                            var arrayVal: { id: string; PARAMETER: string; NILAI: any; }[] = [];
                            Object.keys(data_body).forEach(
                                key => arrayVal.push({"id":GetID(),"PARAMETER":Object.keys(data_body[key]).toString(),"NILAI":Object.values(data_body[key])[0]})  
                            );
                            console.log(JSON.stringify(arrayVal))
                            const columns_interfaceWireless : GridColDef[] = [
                                { field: 'id', headerName: 'id',  flex: 1},
                                { field: 'PARAMETER', headerName: 'PARAMETER',flex: 1},
                                { field: 'NILAI', headerName: 'NILAI',  flex: 1},                             
                            ];
                            setdata_rows_interface_wireless(arrayVal);
                            setDataColumnInterfaceWireless(columns_interfaceWireless);
                            setLoadingInterfaceWirelessSetting(false);
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
                            setLoadingInterfaceWirelessSetting(false);
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setLoadingInterfaceWirelessSetting(false);
                        }
                    }
        ).catch(
                (error) => {
                    Swal.fire({
                        title: t("Warning"),
                        text: t("Error Get Data"),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setLoadingInterfaceWirelessSetting(false);
                }
                
        );
    }else if(name === 'ip_setting'){
        const url = `http://${IN_HOST}:7321/ReportFromRouter/v1/IPSetting`;
        const param = {"ip":IN_IPStationSelected};
        const Token = GetToken()
        setLoadingIPSetting(true);
        Posts(url,JSON.stringify(param),false,Token) .then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        
                        if(parseFloat(code) === 200){
                            var data_body = JSON.parse(res_data.data);
                            //console.log(JSON.stringify(data_body))
                            var arrayVal: { id: string; PARAMETER: string; NILAI: any; }[] = [];
                            Object.keys(data_body).forEach(
                                key => arrayVal.push({"id":GetID(),"PARAMETER":Object.keys(data_body[key]).toString(),"NILAI":Object.values(data_body[key])[0]})  
                            );
                            //console.log(JSON.stringify(arrayVal))
                            const columns_ip_setting : GridColDef[] = [
                                { field: 'id', headerName: 'id',  flex: 1},
                                { field: 'PARAMETER', headerName: 'PARAMETER', flex: 1},
                                { field: 'NILAI', headerName: 'NILAI', flex: 1},
                            ];
                            setdata_rows_ip_setting(arrayVal);
                            setDataColumnIPSetting(columns_ip_setting);
                            setLoadingIPSetting(false);
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
                            setLoadingIPSetting(false);
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setLoadingIPSetting(false);
                        }
                    }
        ).catch(
                (error) => {
                    Swal.fire({
                        title: t("Warning"),
                        text: t("Error Get Data"),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setLoadingIPSetting(false);
                }     
        );
    }else if(name === 'interface_bridge'){
        const url = `http://${IN_HOST}:7321/ReportFromRouter/v1/InterfaceBridge`;
        const param = {"ip":IN_IPStationSelected};
        setLoadingInterfaceBridge(true);
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token) .then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        
                        if(parseFloat(code) === 200){
                            var data_body = JSON.parse(res_data.data);
                            console.log(JSON.stringify(data_body))
                            var arrayVal: { id: string; PARAMETER: string; NILAI: any; }[] = [];
                            Object.keys(data_body).forEach(
                                key => arrayVal.push({"id":GetID(),"PARAMETER":Object.keys(data_body[key]).toString(),"NILAI":Object.values(data_body[key])[0]})  
                            );
                            console.log(JSON.stringify(arrayVal))
                            // setdata_rows_view_log(res_data_body);
                            const columns_interface_bridge : GridColDef[] = [
                                { field: 'id', headerName: 'id',  flex: 1},
                                { field: 'PARAMETER', headerName: 'PARAMETER', flex: 1},
                                { field: 'NILAI', headerName: 'NILAI',  flex: 1 },
                            ];
                            setdata_rows_interface_bridge(arrayVal);
                            setDataColumnInterfaceBridge(columns_interface_bridge);
                            setLoadingInterfaceBridge(false);
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
                            setLoadingInterfaceBridge(false);
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setLoadingInterfaceBridge(false);
                        }
                    }
        ).catch(
                (error) => {
                    Swal.fire({
                        title: t("Warning"),
                        text: t("Error Get Data"),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setLoadingInterfaceBridge(false);
                }
                
        );
        
    }else if(name === 'netwatch'){
        const url = `http://${IN_HOST}:7321/ReportFromRouter/v1/Netwatch`;
        const param = {"ip":IN_IPStationSelected};
        const Token = GetToken()
        setLoadingNetwatch(true);
        Posts(url,JSON.stringify(param),false,Token) .then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        
                        if(parseFloat(code) === 200){
                            var data_body = JSON.parse(res_data.data);
                            console.log('body : '+JSON.stringify(data_body))
                            
                            //console.log(JSON.stringify(arrayVal))
                            // setdata_rows_view_log(res_data_body);
                            const columns_interface_bridge : GridColDef[] = [
                                { field: 'id', headerName: 'id',  flex: 1},
                                { field: 'disabled', headerName: 'DISABLED', flex: 1},
                                // { field: 'down_script', headerName: 'DOWNSCRIPT', flex: 1},
                                // { field: 'up_script', headerName: 'UP_SCRIPT',  flex: 1 },
                                { field: 'since', headerName: 'SINCE',  flex: 1 },
                                { field: 'host', headerName: 'HOST',  flex: 1 },
                                { field: 'comment', headerName: 'COMMENT',  flex: 1 },
                                { field: 'status', headerName: 'STATUS',  flex: 1 },
                                { field: 'interval', headerName: 'INTERVAL',  flex: 1 },
                                { field: 'timeout', headerName: 'TIMEOUT',  flex: 1 },
                            ];
                            const res_rows = AddID(data_body);
                            setdata_rows_netwatch(res_rows);
                            setDataColumnNetwatch(columns_interface_bridge);
                            setLoadingNetwatch(false);
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
                            setLoadingNetwatch(false);
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setLoadingNetwatch(false);
                        }
                    }
        ).catch(
                (error) => {
                    Swal.fire({
                        title: t("Warning"),
                        text: t("Error Get Data"),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setLoadingNetwatch(false);
                }
                
        );
        
    }
};


const showDetail_History_PerIP = (IN_VALUE:any) => {
    setModal15(false);
    setIN_HISTORY_IP_VALUE(IN_VALUE.row.IP);
    setIN_SHOW_HISTORY('visible');
    setIN_LOADING_DATA_HISTORY_DETAIL(true);
    
    try{

        let url = '';
        if(in_IDReport === 'Monitoring Device'){
            url = `http://${IN_HOST}:7321/ReportFromRouter/v1/Report/History/:MonitoringDevice?Token=${Token}`;
        }else if(in_IDReport === 'Monitoring Koneksi'){
            url = `http://${IN_HOST}:7321/ReportFromRouter/v1/Report/History/:MonitoringKoneksi?Token=${Token}`;
        }else{
            url = `http://${IN_HOST}:7321/ReportFromRouter/v1/Report/History/:MonitoringWDCP?Token=${Token}`;
        }

        const param = {
            "IP":IN_VALUE.row.IP,
            "KDCAB":IN_VALUE.row.KDCAB
        };
            Posts(url,JSON.stringify(param),false,Token) .then(
                     (response) => {
                         const res_data = response;
                         var code = res_data.code;
                         var msg = res_data.msg;
                         if(parseFloat(code) === 200){
                            var data_body = JSON.parse(res_data.data);
                            var res_data_rows_body: React.SetStateAction<any[]> = [];
                            setIN_DATA_ROWS_HISTORY(res_data_rows_body);
                            for(var b = 0;b<data_body.length;b++){
                                if(data_body[b].Jenis === 'Detail'){
                                        var arr_content = {
                                                    'id':(b+1),
                                                    'AWAL':data_body[b].awal,
                                                    'AKHIR':data_body[b].akhir,
                                                    'RANGE_TIME': data_body[b].range_time
                                        };
                                        res_data_rows_body.push(arr_content);
                                }else if(data_body[b].Jenis === 'Interval'){
                                    setIN_INTERVAL_AKHIR(data_body[b].akhir);
                                    setIN_INTERVAL_AWAL(data_body[b].awal);
                                    setIN_INTERVAL_RANGE_TIME(data_body[b].range_time);
                                }else if(data_body[b].Jenis === 'Downtime'){
                                    setIN_DOWNTIME_AKHIR(data_body[b].akhir);
                                    setIN_DOWNTIME_AWAL(data_body[b].awal);
                                    setIN_DOWNTIME_RANGE_TIME(data_body[b].range_time);
                                }
                               
                            }
                            setIN_DATA_ROWS_HISTORY(res_data_rows_body);

                            const columns = [
                                { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
                                { field: 'AWAL', headerName: 'AWAL',   width: 160, minWidth: 160, maxWidth: 160},
                                { field: 'AKHIR', headerName: 'AKHIR',  width: 160, minWidth: 160, maxWidth: 160},
                                { field: 'RANGE_TIME', headerName: 'RANGE_TIME',  width: 150, minWidth: 150, maxWidth: 150},
                            ];

                            setIN_DATA_COLUMNS_HISTORY(columns);
                            setIN_SHOW_HISTORY('visible');
                            setIN_LOADING_DATA_HISTORY_DETAIL(false);
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
                        
                        
                     }
             ).catch(
                 (error) => {
                    Swal.fire({
                        title: t("Warning"),
                        text: "Error mendapatkan data Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                   
                 }
                 
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

const showDetail_StatusStationWS = (jenis_koneksi_or_station:any,ini_kdcab:any) => {
    try{
        setModal13(true);
        let IN_STATION = '';
        let IN_KDCAB = '';
        setLastResponse('');
        
        if(in_station === 'RBWDCP'){
            IN_STATION =  jenis_koneksi_or_station.row.station
            IN_KDCAB =  in_filter_kdcab
        }else{
            IN_STATION = jenis_koneksi_or_station.row.jenis_koneksi
            IN_KDCAB = in_filter_kdcab
        }
        const IN_STATUS = (ref_kondisi.current === 'STATION' || ref_kondisi.current === 'KDCAB' ? '' : ref_kondisi.current);

        if(IN_STATUS === 'KDCAB'){
            setIN_JUDUL_FORM('Detail All Station')
        }else{
            setIN_JUDUL_FORM('Detail '+IN_STATUS.trim()+' Station : '+IN_STATION.trim())
        }
        setIN_DATA_KONDISI(IN_STATUS);
        setIN_DATA_STATION(IN_STATION);
        
        var rows1: { ADDTIME: any; TIMEROUTER: any;KDCAB: string; TOKO: string; NAMA: string; STATION: string; IP: string; KONEKSI:string;  STATUS_NETWORK: string; UPTIME: string; DOWNTIME:string,SLA:number}[] = [];
        var rows2: { ADDTIME: any; TIMEROUTER: any;KDCAB: string; TOKO: string; NAMA: string; IP: string; KONEKSI:string; JENIS_KONEKSI:string; STATUS_NETWORK:string; UPTIME: string; DOWNTIME:string,SLA:number; JENIS_PROVIDER:string; ROUTE_JALUR_CBN:string; JALUR_CBN:string; ROUTE_JALUR_CDC:string; JALUR_CDC:string; ROUTE_JALUR_DAWUAN:string; JALUR_DAWUAN:string; ROUTE_JALUR_VSAT:string; JALUR_VSAT:string}[] = [];
        setIN_DATA_ROWS([])
        setIN_DATA_COLUMNS([])
        
        var key = GetToken()
        const payload = {
            "kdcab":IN_KDCAB,
            "station":IN_STATION,
            "status":IN_STATUS,
            "Token":key
        };
        const param = JSON.stringify(payload);
        const url = `ws://${IN_HOST}:7322/sock/v1/ReportFromRouter/Report/Detail/:MonitoringDevice?Token=${Token}`;
        console.log('url : '+url);
        const socket = new WebSocket(url);
        socket.binaryType = 'blob';
        //Connection error
        socket.addEventListener("error", (event: any) => {
            setIN_LOADING(false);
            setProgress(t('Finished Session'));
            stateConnect.current = 0;
            const tgl_kini = get_format_tanggal_jam();
            setClosedWS(tgl_kini)
            setLastResponse(tgl_kini);
        });

        // Connection opened
        socket.addEventListener("open", () => {
            socket.send(param);
            console.log('param : ' + param);
            setIN_LOADING(true)
            stateConnect.current = 1;
        });
        // Connection close
        socket.addEventListener("close", (event: any) => {
            console.log('connection close');
            //console.log(stateConnect.current)
            if(stateConnect.current === 1){
                stop();
                stateConnect.current = 1;
                const tgl_kini = get_format_tanggal_jam();
                setLastResponse(tgl_kini);
            }else{
                setProgress(t('Finished Session'));
                stop();
                stateConnect.current = 1;
                const tgl_kini = get_format_tanggal_jam();
                setLastResponse(tgl_kini);
            }
            setIN_LOADING(false)
            
        });

        // Listen for messages
        socket.addEventListener('message', async (event) => {
            const data = ConvertBinaryToText(event);
            const parse_json = JSON.parse(await data);
            const code = parse_json.code;
            const msg = parse_json.msg;
            //console.log(code+' - '+msg)
            const rdata = parse_json.data;
            //console.log(rdata)
            const countdata = parse_json.amountData;
            setProgress(code+'-'+msg)
            if(in_station === 'RBWDCP'){
                if(parseFloat(code) === 200 || parseFloat(code) === 209){
                try{
                    var data_body = JSON.parse(rdata)
                    console.log('jumlah data : '+data_body.length)
                    for(var b = 0;b<data_body.length;b++){
                        var arr_content = {
                                    //'id':GenerateUniqNumber(),
                                    'ADDTIME':data_body[b].addtime,
                                    'TIMEROUTER':data_body[b].timerouter,
                                    'KDCAB':data_body[b].kdcab,
                                    'TOKO': data_body[b].toko,
                                    'NAMA':data_body[b].nama,                                         
                                    'IP':data_body[b].ip,
                                    'STATION':data_body[b].station,
                                    'KONEKSI':data_body[b].koneksi,
                                    'STATUS_NETWORK':data_body[b].status_network,
                                    'UPTIME':data_body[b].uptime,
                                    'DOWNTIME':data_body[b].downtime,
                                    'SLA':data_body[b].sla
                        };

                        var index = rows1.map(function(o) {return o.IP;}).indexOf(data_body[b].ip);
                        if(index === -1){
                            rows1.push(arr_content);
                            var res_rows = AddID(rows1)
                            setIN_DATA_ROWS(res_rows);
                        }else{
                            console.log('ada pada index : '+index+' IP : '+data_body[b].ip)
                        }
                       
                    }
                    
                    
                    const columns = [
                        { field: 'id', headerName: 'id',   flex: 0,  width: 50, minWidth: 50, maxWidth: 50},
                        { field: 'ADDTIME', headerName: 'ADDTIME',  width: 160, minWidth: 160, maxWidth: 160},
                        { field: 'TIMEROUTER', headerName: 'TIMEROUTER',  width: 160, minWidth: 160, maxWidth: 160},
                        { field: 'KDCAB', headerName: 'KDCAB',   width: 60, minWidth: 60, maxWidth: 60},
                        { field: 'TOKO', headerName: 'TOKO',  width: 60, minWidth: 60, maxWidth: 60},
                        { field: 'NAMA', headerName: 'NAMA',  width: 120, minWidth: 120, maxWidth: 120},
                        { field: 'IP', headerName: 'IP',  width: 110, minWidth: 80, maxWidth: 110,

                            renderCell: (cellValues: any) => {
                                return (   
                                    <div>
                                    <a data-twe-toggle="tooltip" title={t("Click for detail dashboard")} className="text-decoration-line: underline cursor-pointer text-success" onClick={(event) => {
                                            show_Dashboard_Router(cellValues,in_station);  
                                            setDataTokoSelected(cellValues);
                                    }}>{cellValues.value}
                                    </a>
                                    </div>
                                );
                            }
                        },
                        { field: 'STATION', headerName: 'STATION',  width: 120, minWidth: 120, maxWidth: 120},
                        { field: 'KONEKSI', headerName: 'KONEKSI',  width: 120, minWidth: 120, maxWidth: 120},
                        { field: 'STATUS_NETWORK', headerName: 'STATUS_NETWORK',  width: 120, minWidth: 120, maxWidth: 120,
                            renderCell: (cellValues: any) => {
                                return (   
                                    <>
                                    <span className={cellValues.value.toString().toLowerCase() === 'up' ? 'badge bg-success' : 'badge bg-danger'}>
                                    {cellValues.value}
                                    </span>
                                    </>
                                );
                            }
                        },
                        { field: 'UPTIME', headerName: 'UPTIME',  width: 80, minWidth: 80, maxWidth: 80},
                        { field: 'DOWNTIME', headerName: 'DOWNTIME', width: 80, minWidth: 80, maxWidth: 80},
                        { field: 'SLA', headerName: 'SLA',  flex: 1,
                            renderCell: (cellValues: any) => {
                                return (   
                                    <div>
                                    <a data-twe-toggle="tooltip" title="Klik untuk melihat dashbord router!" className="text-decoration-line: underline cursor-pointer text-success" onClick={(event) => {
                                            showDetail_History_PerIP(cellValues);     
                                    }}>{cellValues.value}
                                    </a>
                                    </div>
                                );
                            }
                        }
                    ];

                    setIN_DATA_COLUMNS(columns);
                    
                    if(parseFloat(code) === 209){
                        setIN_LOADING(false)
                    }else{
                        
                    }
                    
                }catch(ExParse){

                }    
                
            }else{
                
            }
        }else{
            if(parseFloat(code) === 200  || parseFloat(code) === 209){ 
                try{    
                    var data_body = JSON.parse(rdata)
                    for(var b = 0;b<data_body.length;b++){
                        var arr_content1 = {
                                    'id':GenerateUniqNumber(),
                                    'ADDTIME':data_body[b].addtime,
                                    'TIMEROUTER':data_body[b].timerouter,
                                    'KDCAB':data_body[b].kdcab,
                                    'TOKO': data_body[b].toko,
                                    'NAMA':data_body[b].nama,                                         
                                    'IP':data_body[b].ip,
                                    'KONEKSI':data_body[b].koneksi,
                                    'JENIS_KONEKSI':data_body[b].jenis_koneksi,
                                    'STATUS_NETWORK':data_body[b].status_network,
                                    'UPTIME':data_body[b].uptime,
                                    'DOWNTIME':data_body[b].downtime,
                                    'SLA':data_body[b].sla,
                                    'JENIS_PROVIDER':data_body[b].jenis_provider,
                                    'ROUTE_JALUR_CBN':(data_body[b].route_tunnel_cbn !== '' ? data_body[b].route_tunnel_cbn : '-'),
                                    'JALUR_CBN':(isUndefined(data_body[b].tunnel_cbn) ? '-' : data_body[b].tunnel_cbn),
                                    
                                    'ROUTE_JALUR_CDC':(data_body[b].route_tunnel_cdc !== '' ? data_body[b].route_tunnel_cdc : '-'),
                                    'JALUR_CDC':(isUndefined(data_body[b].tunnel_cdc) ? '-' : data_body[b].tunnel_cdc),
        
                                    'ROUTE_JALUR_DAWUAN':(data_body[b].route_tunnel_dawuhan !== '' ? data_body[b].route_tunnel_dawuhan: '-'),
                                    'JALUR_DAWUAN':(isUndefined(data_body[b].tunnel_dawuan) ? '-' : data_body[b].tunnel_dawuan),
        
                                    'ROUTE_JALUR_VSAT':(data_body[b].route_tunnel_vsat !== '' ? data_body[b].route_tunnel_vsat : '-'),
                                    'JALUR_VSAT':(isUndefined(data_body[b].tunnel_vsat) ? '-' : data_body[b].tunnel_vsat)
                        };
                        rows2.push(arr_content1);
                    }
                    setIN_DATA_ROWS(rows2);
        
                    const columns = [
                        { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
                        { field: 'ADDTIME', headerName: 'ADDTIME',  width: 160, minWidth: 160, maxWidth: 160},
                        { field: 'TIMEROUTER', headerName: 'TIMEROUTER',  width: 160, minWidth: 160, maxWidth: 160},
                        { field: 'KDCAB', headerName: 'KDCAB',   width: 60, minWidth: 60, maxWidth: 60},
                        { field: 'TOKO', headerName: 'TOKO',  width: 60, minWidth: 60, maxWidth: 60},
                        { field: 'NAMA', headerName: 'NAMA',  width: 120, minWidth: 120, maxWidth: 120},
                        { field: 'IP', headerName: 'IP',  width: 110, minWidth: 80, maxWidth: 110,
        
                            renderCell: (cellValues: any) => {
                                return (   
                                    <div>
                                    <a data-twe-toggle="tooltip" title="Klik untuk melihat dashbord realtime!" className="text-decoration-line: underline cursor-pointer text-success" onClick={(event) => {
                                            show_Dashboard_Router(cellValues,in_station);  
                                            setDataTokoSelected(cellValues);
                                    }}>{cellValues.value}
                                    </a>
                                    </div>
                                );
                            }
                        },
                        { field: 'KONEKSI', headerName: 'KONEKSI',  width: 120, minWidth: 120, maxWidth: 120},
                        { field: 'STATUS_NETWORK', headerName: 'STATUS_NETWORK',   width: 150, minWidth: 150, maxWidth: 150,
                            renderCell: (cellValues: any) => {
                                return (   
                                    <>
                                    <span className={cellValues.value=== 'up' ? 'badge bg-success' : 'badge bg-danger'}>
                                    {cellValues.value}
                                    </span>
                                    </>
                                );
                            }
                        },
                        { field: 'UPTIME', headerName: 'UPTIME',  width: 80, minWidth: 80, maxWidth: 80},
                        { field: 'DOWNTIME', headerName: 'DOWNTIME', width: 80, minWidth: 80, maxWidth: 80},
                        { field: 'SLA', headerName: 'SLA',  flex: 1, width: 80, minWidth: 80, maxWidth: 80,
                            renderCell: (cellValues: any) => {
                                return (   
                                    <div>
                                    <a data-twe-toggle="tooltip" title="Klik untuk melihat dashbord router!" className="text-decoration-line: underline cursor-pointer text-success" onClick={(event) => {
                                            showDetail_History_PerIP(cellValues);     
                                    }}>{cellValues.value}
                                    </a>
                                    </div>
                                );
                            }
                        },
                        { field: 'JENIS_PROVIDER', headerName: 'PROVIDER',  width: 180, minWidth: 180, maxWidth: 180},
                        { field: 'ROUTE_JALURL_CBN', headerName: 'ROUTE_JALUR_CBN', width: 280, minWidth: 280, maxWidth: 280},
                        { field: 'JALUR_CBN', headerName: 'JALUR_CBN',  width: 180, minWidth: 180, maxWidth: 180},
        
                        { field: 'ROUTE_JALUR_CDC', headerName: 'ROUTE_JALUR_CDC',   width: 280, minWidth: 280, maxWidth: 280},
                        { field: 'JALUR_CDC', headerName: 'JALUR_CDC',  width: 180, minWidth: 180, maxWidth: 180},
        
                        { field: 'ROUTE_JALUR_DAWUAN', headerName: 'ROUTE_JALUR_DAWUAN',  width: 280, minWidth: 280, maxWidth: 280},
                        { field: 'JALUR_DAWUAN', headerName: 'JALUR_DAWUAN',  width: 180, minWidth: 180, maxWidth: 180},
        
                        { field: 'ROUTE_JALUR_VSAT', headerName: 'ROUTE_JALUR_VSAT',  width: 280, minWidth: 280, maxWidth: 280},
                        { field: 'JALUR_VSAT', headerName: 'JALUR_VSAT',  width: 180, minWidth: 180, maxWidth: 180}
                    ];
        
                    setIN_DATA_COLUMNS(columns);
                    if(parseFloat(code) === 209){
                        setIN_LOADING(false)
                    }else{
                        setIN_LOADING(true)
                    }
                }catch(ExcParse){
                    
                }
                
            }
        }
    });
    }catch(Ex){
        console.log(Ex.toString())
        Swal.fire({
            title: t("Warning"),
            text: "Error : "+Ex.toString(),
            icon: "warning",
            padding: '2em',
            customClass: 'sweet-alerts'
       });
       setIN_LOADING(false);
    }
    
}

const showDetail_StatusStation = (jenis_koneksi_or_station:any,ini_kdcab:any) => {
    try{
    const IN_STATUS = ref_kondisi.current;
    let IN_STATION = '';
    let IN_KDCAB = '';
    
    if(in_station === 'RBWDCP'){
        IN_STATION =  jenis_koneksi_or_station.row.station;
        IN_KDCAB =  jenis_koneksi_or_station.row.kdcab;
    }else{
        IN_STATION = jenis_koneksi_or_station.row.jenis_koneksi;
        IN_KDCAB = jenis_koneksi_or_station.row.kdcab;
    }
    setModal13(true);
    if(IN_STATUS === 'KDCAB'){
        setIN_JUDUL_FORM('Detail All Station')
    }else{
        setIN_JUDUL_FORM('Detail '+IN_STATUS+' Station : '+IN_STATION)
    }
    setIN_DATA_KONDISI(IN_STATUS);
    setIN_DATA_STATION(IN_STATION);
    

    setIN_DATA_ROWS([]);
    setIN_SHOW_HISTORY('invisible');
    
        let url = '';
        let param;
        if(in_IDReport === 'Monitoring Device'){
            url = `http://${IN_HOST}:7321/ReportFromRouter/v1/Report/Detail/:MonitoringDevice?Token=${Token}`;
            param = {
                "kdcab":IN_KDCAB,//in_filter_kdcab,
                "station":(IN_STATUS === 'KDCAB' ? '' : IN_STATION),
                "status":(IN_STATUS === 'KDCAB' || IN_STATUS === 'STATION' ? '' : IN_STATUS)
            };
        }else if(in_IDReport === 'Monitoring Koneksi'){
            url = `http://${IN_HOST}:7321/ReportFromRouter/v1/Report/Detail/:MonitoringKoneksi?Token=${Token}`;
            param = {
                "kdcab":IN_KDCAB,//in_filter_kdcab,
                "station":(IN_STATUS === 'KDCAB' ? '' : (IN_STATUS === 'STATION' ? '' : IN_STATION)),
                "status":(IN_STATUS === 'KDCAB' || IN_STATUS === 'STATION' ? '' : IN_STATUS)
            };
           
        }else{
            url = `http://${IN_HOST}:7321/ReportFromRouter/v1/Report/Detail/:MonitoringWDCP?Token=${Token}`;
            param = {
                "kdcab":IN_KDCAB,//in_filter_kdcab,
                "station":(IN_STATUS === 'KDCAB' ? '' : (IN_STATUS === 'STATION' ? '' : IN_STATION)),
                "status":(IN_STATUS === 'KDCAB' || IN_STATUS === 'STATION' ? '' : IN_STATUS)
            };
        }
        
        setIN_LOADING(true);  
        console.log('url : '+url);
        console.log(param);
        Posts(url,JSON.stringify(param),false,Token) .then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        if(parseFloat(code) === 200){
                        var data_body = JSON.parse(res_data.data);
                        var res_data_rows_body: React.SetStateAction<any[]> = [];
                        setIN_DATA_ROWS(res_data_rows_body);
                        // console.log('detail per ip : '+JSON.stringify(data_body));
                        if(in_station === 'RBWDCP'){
                            for(var b = 0;b<data_body.length;b++){
                                var arr_content = {
                                            'id':(b+1),
                                            'ADDTIME':data_body[b].addtime,
                                            'TIMEROUTER':data_body[b].timerouter,
                                            'KDCAB':data_body[b].kdcab,
                                            'TOKO': data_body[b].toko,
                                            'NAMA':data_body[b].nama,                                         
                                            'IP':data_body[b].ip,
                                            'STATION':data_body[b].station,
                                            'KONEKSI':data_body[b].koneksi,
                                            'STATUS_NETWORK':data_body[b].status_network,
                                            'UPTIME':data_body[b].uptime,
                                            'DOWNTIME':data_body[b].downtime,
                                            'SLA':data_body[b].sla
                                };
                                res_data_rows_body.push(arr_content);
                            }
                           
                            setIN_DATA_ROWS(res_data_rows_body);
    
                            const columns = [
                                { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
                                { field: 'ADDTIME', headerName: 'ADDTIME',  width: 160, minWidth: 160, maxWidth: 160},
                                { field: 'TIMEROUTER', headerName: 'TIMEROUTER',  width: 160, minWidth: 160, maxWidth: 160},
                                { field: 'KDCAB', headerName: 'KDCAB',   width: 60, minWidth: 60, maxWidth: 60},
                                { field: 'TOKO', headerName: 'TOKO',  width: 60, minWidth: 60, maxWidth: 60},
                                { field: 'NAMA', headerName: 'NAMA',  width: 120, minWidth: 120, maxWidth: 120},
                                { field: 'IP', headerName: 'IP',  width: 110, minWidth: 80, maxWidth: 110,
    
                                    renderCell: (cellValues: any) => {
                                        return (   
                                            <div>
                                            <a data-twe-toggle="tooltip" title={t("Click for detail dashboard")} className="text-decoration-line: underline cursor-pointer text-success" onClick={(event) => {
                                                    show_Dashboard_Router(cellValues,IN_STATION);  
                                                    setDataTokoSelected(cellValues);
                                            }}>{cellValues.value}
                                            </a>
                                            </div>
                                        );
                                    }
                                },
                                { field: 'STATION', headerName: 'STATION',  width: 120, minWidth: 120, maxWidth: 120},
                                { field: 'KONEKSI', headerName: 'KONEKSI',  width: 120, minWidth: 120, maxWidth: 120},
                                { field: 'STATUS_NETWORK', headerName: 'STATUS_NETWORK',  width: 120, minWidth: 120, maxWidth: 120,
                                    renderCell: (cellValues: any) => {
                                        return (   
                                            <>
                                            <span className={cellValues.value.toString().toLowerCase() === 'up' ? 'badge bg-success' : 'badge bg-danger'}>
                                            {cellValues.value}
                                            </span>
                                            </>
                                        );
                                    }
                                },
                                { field: 'UPTIME', headerName: 'UPTIME',  width: 80, minWidth: 80, maxWidth: 80},
                                { field: 'DOWNTIME', headerName: 'DOWNTIME', width: 80, minWidth: 80, maxWidth: 80},
                                { field: 'SLA', headerName: 'SLA',  flex: 1, width: 80, minWidth: 80, maxWidth: 80,
                                    renderCell: (cellValues: any) => {
                                        return (   
                                            <div>
                                            <a data-twe-toggle="tooltip" title="Klik untuk melihat dashbord router!" className="text-decoration-line: underline cursor-pointer text-success" onClick={(event) => {
                                                    showDetail_History_PerIP(cellValues);     
                                            }}>{cellValues.value}
                                            </a>
                                            </div>
                                        );
                                    }
                                }
                            ];
    
                            setIN_DATA_COLUMNS(columns);
                        }else{
                            for(var b = 0;b<data_body.length;b++){
                                var arr_content1 = {
                                            'id':(b+1),
                                            'ADDTIME':data_body[b].addtime,
                                            'TIMEROUTER':data_body[b].timerouter,
                                            'KDCAB':data_body[b].kdcab,
                                            'TOKO': data_body[b].toko,
                                            'NAMA':data_body[b].nama,                                         
                                            'IP':data_body[b].ip,
                                            'KONEKSI':data_body[b].koneksi,
                                            'JENIS_KONEKSI':data_body[b].jenis_koneksi,
                                            'STATUS_NETWORK':data_body[b].status_network,
                                            'UPTIME':data_body[b].uptime,
                                            'DOWNTIME':data_body[b].downtime,
                                            'SLA':data_body[b].sla,
                                            'JENIS_PROVIDER':data_body[b].jenis_provider,
                                            'ROUTE_JALUR_CBN':(data_body[b].route_tunnel_cbn !== '' ? data_body[b].route_tunnel_cbn : '-'),
                                            'JALUR_CBN':(isUndefined(data_body[b].tunnel_cbn) ? '-' : data_body[b].tunnel_cbn),
                                            
                                            'ROUTE_JALUR_CDC':(data_body[b].route_tunnel_cdc !== '' ? data_body[b].route_tunnel_cdc : '-'),
                                            'JALUR_CDC':(isUndefined(data_body[b].tunnel_cdc) ? '-' : data_body[b].tunnel_cdc),

                                            'ROUTE_JALUR_DAWUAN':(data_body[b].route_tunnel_dawuhan !== '' ? data_body[b].route_tunnel_dawuhan: '-'),
                                            'JALUR_DAWUAN':(isUndefined(data_body[b].tunnel_dawuan) ? '-' : data_body[b].tunnel_dawuan),

                                            'ROUTE_JALUR_VSAT':(data_body[b].route_tunnel_vsat !== '' ? data_body[b].route_tunnel_vsat : '-'),
                                            'JALUR_VSAT':(isUndefined(data_body[b].tunnel_vsat) ? '-' : data_body[b].tunnel_vsat)
                                            
                                };
                                res_data_rows_body.push(arr_content1);
                            }
                            setIN_DATA_ROWS(res_data_rows_body);
    
                            const columns = [
                                { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
                                { field: 'ADDTIME', headerName: 'ADDTIME',  width: 160, minWidth: 160, maxWidth: 160},
                                { field: 'TIMEROUTER', headerName: 'TIMEROUTER',  width: 160, minWidth: 160, maxWidth: 160},
                                { field: 'KDCAB', headerName: 'KDCAB',   width: 60, minWidth: 60, maxWidth: 60},
                                { field: 'TOKO', headerName: 'TOKO',  width: 60, minWidth: 60, maxWidth: 60},
                                { field: 'NAMA', headerName: 'NAMA',  width: 120, minWidth: 120, maxWidth: 120},
                                { field: 'IP', headerName: 'IP',  width: 110, minWidth: 80, maxWidth: 110,
    
                                    renderCell: (cellValues: any) => {
                                        return (   
                                            <div>
                                            <a data-twe-toggle="tooltip" title="Klik untuk melihat dashbord realtime!" className="text-decoration-line: underline cursor-pointer text-success" onClick={(event) => {
                                                    show_Dashboard_Router(cellValues,IN_STATION);  
                                                    setDataTokoSelected(cellValues);
                                            }}>{cellValues.value}
                                            </a>
                                            </div>
                                        );
                                    }
                                },
                                { field: 'KONEKSI', headerName: 'KONEKSI',  width: 120, minWidth: 120, maxWidth: 120},
                                
                                
                               

                                { field: 'STATUS_NETWORK', headerName: 'STATUS_NETWORK',   width: 150, minWidth: 150, maxWidth: 150,
                                    renderCell: (cellValues: any) => {
                                        return (   
                                            <>
                                            <span className={cellValues.value=== 'up' ? 'badge bg-success' : 'badge bg-danger'}>
                                            {cellValues.value}
                                            </span>
                                            </>
                                        );
                                    }
                                },
                                { field: 'UPTIME', headerName: 'UPTIME',  width: 80, minWidth: 80, maxWidth: 80},
                                { field: 'DOWNTIME', headerName: 'DOWNTIME', width: 80, minWidth: 80, maxWidth: 80},
                                { field: 'SLA', headerName: 'SLA',  flex: 1, width: 80, minWidth: 80, maxWidth: 80,
                                    renderCell: (cellValues: any) => {
                                        return (   
                                            <div>
                                            <a data-twe-toggle="tooltip" title="Klik untuk melihat dashbord router!" className="text-decoration-line: underline cursor-pointer text-success" onClick={(event) => {
                                                    showDetail_History_PerIP(cellValues);     
                                            }}>{cellValues.value}
                                            </a>
                                            </div>
                                        );
                                    }
                                },
                                { field: 'JENIS_PROVIDER', headerName: 'PROVIDER',  width: 180, minWidth: 180, maxWidth: 180},
                                { field: 'ROUTE_JALURL_CBN', headerName: 'ROUTE_JALUR_CBN', width: 280, minWidth: 280, maxWidth: 280},
                                { field: 'JALUR_CBN', headerName: 'JALUR_CBN',  width: 180, minWidth: 180, maxWidth: 180},

                                { field: 'ROUTE_JALUR_CDC', headerName: 'ROUTE_JALUR_CDC',   width: 280, minWidth: 280, maxWidth: 280},
                                { field: 'JALUR_CDC', headerName: 'JALUR_CDC',  width: 180, minWidth: 180, maxWidth: 180},

                                { field: 'ROUTE_JALUR_DAWUAN', headerName: 'ROUTE_JALUR_DAWUAN',  width: 280, minWidth: 280, maxWidth: 280},
                                { field: 'JALUR_DAWUAN', headerName: 'JALUR_DAWUAN',  width: 180, minWidth: 180, maxWidth: 180},

                                { field: 'ROUTE_JALUR_VSAT', headerName: 'ROUTE_JALUR_VSAT',  width: 280, minWidth: 280, maxWidth: 280},
                                { field: 'JALUR_VSAT', headerName: 'JALUR_VSAT',  width: 180, minWidth: 180, maxWidth: 180}
                            ];
    
                            setIN_DATA_COLUMNS(columns);
                        }
                        
                        
                        }else if(code.toString().substring(0,1) === '4'){
                            Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                            });
                            setModal13(false);
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
                        setIN_LOADING(false);
                    
                    }
            ).catch(
                (error) => {
                    //console.log(error);
                    Swal.fire({
                        title: t("Warning"),
                        text: "Error mendapatkan data Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setIN_LOADING(false);
                }
                
            );
    }catch(Ex){
        Swal.fire({
             title: t("Warning"),
             text: "Error : "+Ex.toString(),
             icon: "warning",
             padding: '2em',
             customClass: 'sweet-alerts'
        });
        setIN_LOADING(false);
    }
}

const show_Dashboard_Router = (IN_VALUE:any,IN_ST:any) => {
     
    
    if(IN_ST.substring(0,1) === '0' || IN_ST === 'I1' || IN_ST.substring(0,1) === '1' || IN_ST.substring(0,1) === '2'){
        if(modal14){
            console.log('Tidak Perlu buka Modal')
        }else{
            console.log('Perlu buka Modal')
            setModal14(true);
        }
        try{
            
            setNAMA_TOKO(IN_VALUE.row.TOKO+" / "+IN_VALUE.row.NAMA.toString().split('/').join('')+" / "+IN_ST+" / "+IN_VALUE.row.IP+" / ");
            setArchitecture('-');
            setBootTime('-');
            setDataRowsProcesslist([]);
            setLoadingProcesslist(false);
            setProgressProcesslist('');
            setOSName('-');
            setUpTime('-');
            setLastsBootTime('-');
            setSuhu(0);
            setSentBytes('0');
            setReceivedBytes('0');
            setSentThroughput('0');
            setReceivedThroughput('0');
            setDataSeriesCPU([0]);
            setDataSeriesCPU_Temp([0]);
            setDataSeriesDiskUsage([0]);
            setDataSeriesMemory([0]);
            setProcessor('-');
            setMemoryTerpasang('-');

            setIsMounted(true);
            var key = GetToken()
            //console.log('key : '+key);
            const res_command = "%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"$processlist = Get-Process | %{'{0}|{1}|{2}~' -f $_.ProcessName,[math]::Round($_.CPU,2),[math]::Round($_.WS/1MB)};$cpuInfo = Get-WmiObject Win32_PerfFormattedData_PerfOS_Processor | Where-Object { $_.Name -eq '_Total' };$cpuUsage = $cpuInfo.PercentProcessorTime;$osInfo = Get-WmiObject Win32_OperatingSystem;$percentageMemoryUsage = [math]::Round(($osInfo.TotalVisibleMemorySize - $osInfo.FreePhysicalMemory) / $osInfo.TotalVisibleMemorySize * 100, 2);$diskDriveInfo = Get-WmiObject Win32_DiskDrive;foreach ($disk in $diskDriveInfo) {$hddmodel=$($disk.Model)};$totalCapacity = 0;$totalUsedSpace = 0;$totalFreeSpace = 0;$drives = Get-WmiObject Win32_LogicalDisk;foreach ($drive in $drives) {$capacity = $drive.Size;$freeSpace = $drive.FreeSpace;$usedSpace = $capacity - $freeSpace;$totalCapacity += $capacity;$totalUsedSpace += $usedSpace;$totalFreeSpace += $freeSpace};$totalCapacityGB = [math]::Round($totalCapacity / 1GB, 2);$totalUsedSpaceGB = [math]::Round($totalUsedSpace / 1GB, 2);$totalFreeSpaceGB = [math]::Round($totalFreeSpace / 1GB, 2);$system = Get-WmiObject Win32_OperatingSystem;$lastBootUpTime =[System.Management.ManagementDateTimeConverter]::ToDateTime($system.LastBootUpTime);$uptime = (Get-Date) - $lastBootUpTime;$boottime=Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Diagnostics-Performance/Operational'; Id=100,108,110} -MaxEvents 1 |ForEach-Object {$eventXml = ([xml]$_.ToXml()).Event; [math]::round(([int64]($eventXml.EventData.Data | Where-Object {$_.Name -eq 'BootTime'}).InnerXml)/1000/60,2) ; }; $arsitektur = (Get-WmiObject Win32_OperatingSystem).OSArchitecture;$os_name = (Get-WmiObject Win32_OperatingSystem).Caption;$dll = 'C:\\IDMCommandListeners\\LibreHardwareMonitorLib.dll';Add-Type -LiteralPath $dll;$monitor = [LibreHardwareMonitor.Hardware.Computer]::new();$monitor.IsCPUEnabled = $true;$monitor.Open();foreach ($sensor in $monitor.Hardware.Sensors) {if ($sensor.SensorType -eq 'Temperature' -and $sensor.Name -eq 'CPU Package'){$temp = $sensor.Value; break;}}$monitor.Close();$network = '-';$counters = '\\Network interface(*)\\Bytes sent/sec','\\Network interface(*)\\Bytes received/sec';$network_throughput = Get-Counter -Counter $counters -MaxSamples 1 -SampleInterval 1 -ov d | Select-object -ExpandProperty CounterSamples | Select-Object -Property @{Name = 'Count'; Expression = {[math]::Round($_.cookedValue/1024)}} | ConvertTo-Csv -NoTypeInformation | Select -Skip 1;$system = Get-WmiObject Win32_OperatingSystem;$lastBootUpTime =[System.Management.ManagementDateTimeConverter]::ToDateTime($system.LastBootUpTime);$RescpuInfo = Get-WmiObject Win32_Processor;$cpu_processor=$($RescpuInfo.Name);$physicalMemoryInfo = Get-WmiObject Win32_PhysicalMemory;$totalPhysicalMemory = ($physicalMemoryInfo | Measure-Object Capacity -Sum).Sum / 1GB;Write-Host 'LastBootTime : '$lastBootUpTime;Write-Host 'ResProcesslist : '$processlist ' ResCPUUsage : '$cpuUsage' ResMemoryUsage : '$percentageMemoryUsage' ResDiskUsage : '([math]::Round(($totalUsedSpaceGB / $totalCapacityGB * 100),2))' ResUptimePC : '$uptime' ResBootTime : '$boottime' ResSuhu : '$temp' ResArsitektur : '$arsitektur' ResOSName : '$os_name' ResNetwork : '$network' ResThroughput : '$network_throughput' ResLastBootTime : '$lastBootUpTime' ResProcessor : '$cpu_processor' ResMemoryTerpasang : '$totalPhysicalMemory;\"";
            //console.log('res_command : '+res_command);
            const param_per_toko = WritePayloadRealtime(IN_VALUE.row.KDCAB,IN_VALUE.row.TOKO,'','',"COMMAND",res_command,3,false,'Report Realtime Toko',key,IN_VALUE.row.IP,3,30);
            //console.log('param_per_toko : '+param_per_toko);
            const url_per_toko = `ws://${IN_HOST}:7322/sock/v1/RealtimeFromListener?Token=${key}`;
            //SendRealtime(url_per_toko,param_per_toko,cellValues.row.TOKO,cellValues.row.IP,false);
            let socket = new WebSocket(url_per_toko);
            socket.binaryType = 'blob';
            is_disconnect.current = 0;
            // Connection opened
            socket.addEventListener("open", (event) => {
                console.log('param : '+param_per_toko);
                socket.send(param_per_toko);
                ref.current = 1;
                stateConnect.current = 1;
                console.log('send message');
            });

            // Connection Error
            socket.addEventListener("error", (event) => {
                is_disconnect.current = 1;
                stateConnect.current = 0;
                setisDisabledReconnect(false);
            });

            // Connection close
            socket.addEventListener("close", (event) => {
                setProgressProcesslist('Sesi Selesai, silahkan tekan tombol reconnect!');
                setisDisabledReconnect(false);
                if(ref.current === 0){
                    console.log('connection close ref '+ref.current);
                    is_disconnect.current = 1;
                }else{
                    console.log('connection close ref '+ref.current);   
                }

                stateConnect.current = 0;
                
            });

            // Listen for messages
            socket.addEventListener("message", async(event) => {
                if(ref.current === 0){
                    console.log('kondisi 1, Disconnect/Close');
                    socket.close();
                    console.log('Disconnect by User');
                }else{
                    //console.log('kondisi 2, Still open')
                    if(stateConnect.current === 0){
                        socket.close()
                    }else{
                        const data = ConvertBinaryToText(event);
                        const parse_json = JSON.parse(await data);
                        const code = parse_json.code;
                        const msg = parse_json.msg;
                        console.log('code : '+code+' msg : '+msg);
                        setProgressProcesslist(code+'-'+msg);
                        if(code === 200){
                            try{
                                
                                const res_data = JSON.parse(parse_json.data);
                                const res_new = res_data;
                                for (var o = 0; o < res_new.length; o++) {
                                    const ubah_json = JSON.stringify(res_new[o]);
                                    const parse_data_inti = JSON.parse(ubah_json);
                                    const data_inti_code = parse_data_inti.code;
                                    const data_inti_msg = parse_data_inti.msg;
                                    const data_inti_data = parse_data_inti.data;
                                    
                                    if(data_inti_code === 200 ){
                                        const index_awal_processlist = data_inti_data.toString().indexOf('ResProcesslist :  ');
                                        const index_akhir_processlist = data_inti_data.toString().indexOf('ResCPUUsage');
                                        const data_processlist = data_inti_data.substring(index_awal_processlist,index_akhir_processlist).replace('ResProcesslist :  ','');
                                        const sp_enter = data_processlist.split('~');
                                        let arr_data_process = [];
                                        for(var p = 0;p<sp_enter.length;p++){
                                            const data_per_process = sp_enter[p].split('|');
                                            const nama_process = data_per_process[0];
                                            const cpu_usage = data_per_process[1];
                                            const memory_usage = data_per_process[2];
                                            if(nama_process === ''){
    
                                            }else{
                                                const arr_process =  {id:p,NAMA:nama_process,CPU_USAGE:cpu_usage,MEMORY_USAGE:memory_usage};
                                                arr_data_process.push(arr_process);
                                            }
                                            
                                        }
    
                                        setDataRowsProcesslist(arr_data_process);
                                        const columns_process : GridColDef[] = [
                                            { field: 'id', headerName: 'id',  flex: 1},
                                            { field: 'NAMA', headerName: 'NAMA',  width: 200, minWidth: 200, maxWidth: 200},
                                            { field: 'CPU_USAGE', headerName: 'CPU_USAGE',  width: 100, minWidth: 100, maxWidth: 100},
                                            { field: 'MEMORY_USAGE', headerName: 'MEMORY_USAGE',  width: 95, minWidth: 95, maxWidth: 95},
                                        ];
                                        setDataColumnsProcesslist(columns_process);
    
                                        //console.log('data_inti_data : '+data_inti_data);
                                        //-- tampilkan data cpu usage percentage --//
                                        const index_awal_cpu_usage = data_inti_data.toString().indexOf('ResCPUUsage : ');
                                        //console.log('index_awal_cpu_usage : '+index_awal_cpu_usage);
                                        const index_akhir_cpu_usage = data_inti_data.toString().indexOf('ResMemoryUsage : ');
                                        //console.log('index_akhir_cpu_usage : '+index_akhir_cpu_usage);
                                        const data_cpu_usage = data_inti_data.substring(index_awal_cpu_usage,index_akhir_cpu_usage).replace('ResCPUUsage :  ','').split(' ').join('');
                                        let res_data_cpu_usage = 0;
                                        if(data_cpu_usage === ''){
                                            res_data_cpu_usage = 0;
                                        }else{
                                            res_data_cpu_usage = parseFloat(data_cpu_usage);
                                        }
                                        //console.log('res_data_cpu_usage : '+res_data_cpu_usage);
                                        setDataLabelsCPU(['CPU Usage']);
                                        setDataSeriesCPU([res_data_cpu_usage]);
    
                                        //-- tampilkan data memory Usage --//
                                        const index_awal_memory_usage = data_inti_data.toString().indexOf('ResMemoryUsage : ');
                                        //console.log('index_awal_memory_usage : '+index_awal_memory_usage);
                                        const index_akhir_memory_usage = data_inti_data.toString().indexOf('ResDiskUsage : ');
                                        //console.log('index_akhir_memory_usage : '+index_akhir_memory_usage);
                                        const data_memory_usage = data_inti_data.substring(index_awal_memory_usage,index_akhir_memory_usage).replace('ResMemoryUsage','').replace(':','').split(' ').join('');
                                        //console.log('data_memory_usage : '+data_memory_usage);
                                        let res_data_memory_usage = 0;
                                        if(data_memory_usage === ''){
                                            res_data_memory_usage = 0;
                                        }else{
                                            res_data_memory_usage = parseFloat(data_memory_usage);
                                        }
                                        //console.log('res_data_memory_usage : '+res_data_memory_usage);
                                        setDataLabelsMemory(['Memory Usage'])
                                        setDataSeriesMemory([res_data_memory_usage])
    
                                        //-- tampilkan data disk Usage --//
                                        const index_awal_disk_usage = data_inti_data.toString().indexOf('ResDiskUsage : ');
                                        //console.log('index_awal_disk_usage : '+index_awal_disk_usage);
                                        const index_akhir_disk_usage = data_inti_data.toString().indexOf('ResUptimePC : ');
                                        //console.log('index_akhir_disk_usage : '+index_akhir_disk_usage);
                                        const data_disk_usage = data_inti_data.substring(index_awal_disk_usage,index_akhir_disk_usage).replace('ResDiskUsage :  ','').split(' ').join('');
                                        let res_data_disk_usage = 0;
                                        if(data_disk_usage === ''){
                                            res_data_disk_usage = 0;
                                        }else{
                                            res_data_disk_usage = parseFloat(data_disk_usage);
                                        }
                                        //console.log('res_data_disk_usage : '+res_data_disk_usage);
                                        setDataLabelsDiskUsage(['Disk Usage'])
                                        setDataSeriesDiskUsage([res_data_disk_usage])
    
                                        //-- identitas pc --//
                                        const index_awal_boottime = data_inti_data.toString().indexOf('ResBootTime');
                                        //console.log('index_awal_boottime : '+index_awal_boottime);
                                        const index_akhir_boottime = data_inti_data.toString().indexOf('ResSuhu');
                                        //console.log('index_akhir_boottime : '+index_akhir_boottime);
                                        const data_boot_time = data_inti_data.substring(index_awal_boottime,index_akhir_boottime).replace('ResBootTime','').replace(':','').split(' ').join('');
                                        //console.log('data_boot_time : '+data_boot_time);
                                        let res_data_boot_time = '';
                                        if(data_boot_time === ''){
                                            res_data_boot_time = '0 Menit';
                                        }else{
                                            res_data_boot_time = data_boot_time+' Menit';
                                        }
                                        //console.log('res_data_boot_time : '+res_data_boot_time);
                                        setBootTime(res_data_boot_time);
    
                                        const index_awal_architecture = data_inti_data.toString().indexOf('ResArsitektur');
                                        //console.log('index_awal_architecture : '+index_awal_architecture);
                                        const index_akhir_architecture = data_inti_data.toString().indexOf('ResOSName');
                                        //console.log('index_akhir_architecture : '+index_akhir_architecture);
                                        const data_architecture = data_inti_data.substring(index_awal_architecture,index_akhir_architecture).replace('ResArsitektur','').replace(':','').split(' ').join('');
                                        //console.log('data_architecture : '+data_architecture);
                                        let res_data_architecture = '';
                                        if(data_architecture === ''){
                                            res_data_architecture = '';
                                        }else{
                                            res_data_architecture = data_architecture;
                                        }
                                        //console.log('res_data_architecture : '+res_data_architecture);
                                        setArchitecture(res_data_architecture);
    
    
                                        const index_awal_uptime = data_inti_data.toString().indexOf('ResUptimePC');
                                        //console.log('index_awal_osname : '+index_awal_osname);
                                        const index_akhir_uptime = data_inti_data.toString().indexOf('ResBootTime');
                                        //console.log('index_akhir_osname : '+index_akhir_osname);
                                        const data_uptime = data_inti_data.substring(index_awal_uptime,index_akhir_uptime).replace('ResUptimePC','').replace(':','').split(' ').join('');
                                        //console.log('data_osname : '+data_osname);
                                        let res_data_uptime = '';
                                        if(data_uptime === ''){
                                            res_data_uptime = '';
                                        }else{
                                            res_data_uptime = data_uptime;
                                        }
                                        //console.log('res_data_osname : '+res_data_osname);
                                        setUpTime(res_data_uptime);
    
                                        const index_awal_suhu = data_inti_data.toString().indexOf('ResSuhu');
                                        //console.log('index_awal_osname : '+index_awal_osname);
                                        const index_akhir_suhu = data_inti_data.toString().indexOf('ResArsitektur');
                                        //console.log('index_akhir_osname : '+index_akhir_osname);
                                        const data_suhu = data_inti_data.substring(index_awal_suhu,index_akhir_suhu).replace('ResSuhu','').replace(':','').split(' ').join('');
                                        //console.log('data_osname : '+data_osname);
                                        let res_data_suhu = 0;
                                        if(data_suhu === ''){
                                            res_data_suhu = 0;
                                        }else{
                                            res_data_suhu = parseFloat(data_suhu);
                                        }
                                        //console.log('res_data_osname : '+res_data_osname);
                                        
                                        setSuhu(res_data_suhu);
    
                                        const index_awal_osname = data_inti_data.toString().indexOf('ResOSName');
                                        //console.log('index_awal_osname : '+index_awal_osname);
                                        const index_akhir_osname = data_inti_data.toString().indexOf('ResNetwork');
                                        //console.log('index_akhir_osname : '+index_akhir_osname);
                                        const data_osname = data_inti_data.substring(index_awal_osname,index_akhir_osname).replace('ResOSName','').replace(':','').split(' ').join('');
                                        //console.log('data_osname : '+data_osname);
                                        let res_data_osname = '';
                                        if(data_osname === ''){
                                            res_data_osname = '';
                                        }else{
                                            res_data_osname = data_osname;
                                        }
                                        //console.log('res_data_osname : '+res_data_osname);
                                        setOSName(res_data_osname);
    
                                        try{
                                            const index_awal_throughput = data_inti_data.toString().indexOf('ResThroughput');
                                            //console.log('index_awal_throughput : '+index_awal_throughput);
                                            const index_akhir_throughput = data_inti_data.toString().indexOf('ResLastBootTime')
                                            //console.log('index_akhir_throughput : '+index_akhir_throughput);
                                            const data_throughput = data_inti_data.substring(index_awal_throughput,index_akhir_throughput).replace('ResThroughput','').replace(':','').split(' ').join('');
                                            //console.log('data_throughput : '+data_throughput);
                                            let res_data_throughput = '';
                                            if(data_throughput === ''){
                                                setSentThroughput('0');
                                                setReceivedThroughput('0');
                                            }else{
    
                                                res_data_throughput = data_throughput;
                                                const res_throughput_sentbytes = res_data_throughput.split('""')[0].split('"').join('');
                                                const res_throughput_receivedbytes = res_data_throughput.split('""')[1].split('"').join('');
    
                                                //console.log('res_throughput_sentbytes : '+res_throughput_sentbytes)
                                                //console.log('res_throughput_receivedbytes : '+res_throughput_receivedbytes)
                                                setSentThroughput(res_throughput_sentbytes);
                                                setReceivedThroughput(res_throughput_receivedbytes);
                                            }
                                        }catch(Ex){
                                            setSentThroughput('0');
                                            setReceivedThroughput('0');
                                        }

                                        //-- get time last bootime --//
                                        try{
                                            const index_awal_last_boot_time = data_inti_data.toString().indexOf('ResLastBootTime');
                                            //console.log('index_awal_last_boot_time : '+index_awal_last_boot_time);
                                            const index_akhir_last_boot_time = data_inti_data.toString().indexOf('ResProcessor');
                                            //console.log('index_akhir_last_boot_time : '+index_akhir_last_boot_time);
                                            const data_last_boot_time = data_inti_data.substring(index_awal_last_boot_time,index_akhir_last_boot_time).replace('ResLastBootTime : ','');
                                            //console.log('data_last_boot_time : '+data_last_boot_time);
                                            let res_data_last_boot_time = '';
                                            if(data_last_boot_time === ''){
                                                res_data_last_boot_time = '';
                                                setLastsBootTime('0');
                                            }else{
                                                res_data_last_boot_time = data_last_boot_time;
                                                const res_last_boot_time = res_data_last_boot_time;
                                                //console.log('res_last_boot_time : '+res_last_boot_time)
                                                setLastsBootTime(res_last_boot_time);
                                            }
                                        }catch(Ex){
                                            setLastsBootTime('0');
                                        }

                                        //-- get time processor --//
                                        try{
                                            const index_awal_processor = data_inti_data.toString().indexOf('ResProcessor');
                                            //console.log('index_awal_processor : '+index_awal_processor);
                                            const index_akhir_processor = data_inti_data.toString().indexOf('ResMemoryTerpasang');
                                            //console.log('index_akhir_processor : '+index_akhir_processor);
                                            const data_processor = data_inti_data.substring(index_awal_processor,index_akhir_processor).replace('ResProcessor : ','');
                                            //console.log('data_processor : '+data_processor);
                                            let res_data_processor = '';
                                            if(data_processor === ''){
                                                res_data_processor = '';
                                                setProcessor('0');
                                            }else{
                                                res_data_processor = data_processor;
                                                //console.log('res_data_processor : '+res_data_processor)
                                                setProcessor(res_data_processor);
                                            }
                                        }catch(Ex){
                                            setProcessor('0');
                                        }

                                        //-- get memory terpasang --//
                                        try{
                                            const index_awal_memory_terpasang = data_inti_data.toString().indexOf('ResMemoryTerpasang');
                                            //console.log('index_awal_memory_terpasang : '+index_awal_memory_terpasang);
                                            const index_akhir_memory_terpasang = data_inti_data.toString().length;
                                            //console.log('index_akhir_memory_terpasang : '+index_akhir_memory_terpasang);
                                            const data_memory_terpasang = data_inti_data.substring(index_awal_memory_terpasang,index_akhir_memory_terpasang).replace('ResMemoryTerpasang : ','');
                                            //console.log('data_memory_terpasang : '+data_memory_terpasang);
                                            let res_data_memory_terpasang = '';
                                            if(data_memory_terpasang === ''){
                                                res_data_memory_terpasang = '';
                                                setMemoryTerpasang('0');
                                            }else{
                                                res_data_memory_terpasang = data_memory_terpasang;
                                                //console.log('res_data_memory_terpasang : '+res_data_memory_terpasang)
                                                setMemoryTerpasang(res_data_memory_terpasang);
                                            }
                                        }catch(Ex){
                                            setMemoryTerpasang('0');
                                        }
    
                                    }
                                }
                            }catch(Ex){
                                console.log('error : '+Ex.toString());
                            }
                        }else if(code === 209){
                            setisDisabledReconnect(false);
                            setProgressProcesslist('Sesi Selesai, Silahkan tekan tombol Reconnect!')
                        }else if(code.toString().substring(0,1) === '4'){
                            Swal.fire({
                                title: t("Warning"),
                                text: ''+code+'-'+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            if(code === 403){
                                //-- redirect ke login --//
                                // handleLogout();
                            }else{
        
                            }
                        }
                    }
                    
                }
            });
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }
    }else if(IN_ST=== 'RBWDCP' || IN_ST === 'RBKONEKSI' || IN_ST.toString().toLowerCase().includes('koneksi') || IN_ST.toString().toLowerCase().includes('unknown')){
        if(modal16){
            console.log('Tidak Perlu buka Modal')
        }else{
            console.log('Perlu buka Modal')
            setModal16(true);
        }
        try{
            setStationSelected(IN_ST);
            setIPStationSelected(IN_VALUE.row.IP);
            setprogressbar_io_1('200');
            setISShowTraffic(false);
            setisTextTraffic('Traffic');
            setisDisabledButtonTraffic(true);
            setNAMA_TOKO(IN_VALUE.row.TOKO+" / "+IN_VALUE.row.TOKO.split('/').join('')+" / "+IN_ST+" / "+IN_VALUE.row.IP);
            setIsMounted(true);
            var key = GetToken()
            //console.log('key : '+key);
            const res_command = "";
            //console.log('res_command : '+res_command);
            const param_per_toko = WritePayloadRealtimeRouter(IN_VALUE.row.KDCAB,IN_VALUE.row.TOKO,IN_VALUE.row.STATION,key,IN_VALUE.row.IP,30);
            console.log('param_per_toko : '+param_per_toko);
            const url_per_toko = `ws://${IN_HOST}:7322/sock/v1/ReportFromRouter/GetRouterDashboard?Token=${key}`;
            console.log('url_per_toko : '+url_per_toko);
            //SendRealtime(url_per_toko,param_per_toko,cellValues.row.TOKO,cellValues.row.IP,false);
            let socket = new WebSocket(url_per_toko);
            socket.binaryType = 'blob';
            // Connection opened
            socket.addEventListener("open", (event) => {
                socket.send(param_per_toko);
                refwdcp.current = 1;
                console.log('refwdcp : '+refwdcp.current);
            });

            // Connection Error
            socket.addEventListener("error", (event) => {
                is_disconnect.current = 1;
                setisDisabledReconnect(false);
                setprogressbar_io_1('Koneksi bermasalah');
            });

            // Connection close
            socket.addEventListener("close", (event) => {
                
                setisDisabledReconnect(false);
                if(refwdcp.current === 0){
                    console.log('connection close ref '+ref.current);
                    is_disconnect.current = 1;
                    
                }else{
                    console.log('connection close ref '+ref.current);   
                }
                setprogressbar_io_1('Sesi Selesai, silahkan tekan tombol reconnect!');
                
            });

            // Listen for messages
            socket.addEventListener("message", async(event) => {
                if(refwdcp.current === 0){
                    console.log('kondisi 1, Disconnect/Close');
                    socket.close();
                    console.log('Disconnect by User');
                    setprogressbar_io_1('Disconnect by User');
                }else{
                    //console.log('kondisi 2, Still open')
                    const data = ConvertBinaryToText(event);
                    const parse_json = JSON.parse(await data);
                    const code = parse_json.code;
                    const msg = parse_json.msg;
                    const rdata = parse_json.data;
                    console.log('code : '+code+' msg : '+msg);
                    //console.log('rdata : '+rdata);

                    setprogressbar_io_1(get_format_tanggal_jam()+'  '+code+'-'+msg);
                    if(code == 200){
                        try{
                            setisDisabledButtonTraffic(false);
                            const res_data = JSON.parse(parse_json.data);
                            const res_new = res_data;
                            for (var o = 0; o < res_new.length; o++) {
                                const ubah_json = JSON.stringify(res_new[o]);
                                const parse_data_inti = JSON.parse(ubah_json);
                                const data_inti_code = parse_data_inti.code;
                                const data_inti_msg = parse_data_inti.msg;
                                const data_inti_data = parse_data_inti.data;
                                //console.log('data_inti_data : '+data_inti_data);
                                if(data_inti_code === 200){
                                    //console.log('data inti : '+data_inti_data);
                                    const parse_data_inti_data = JSON.parse(data_inti_data);
                                    const res_spec = parse_data_inti_data.Spec;
                                    //console.log('res_spec : '+JSON.stringify(res_spec));

                                    const res_service = parse_data_inti_data.Servis;
                                         
                                    //console.log('res_service  : '+JSON.stringify(res_service))
                                    setdata_rows_service(res_service);


                                    const res_boardname = res_spec.board_name;
                                    setBoardName(res_boardname);
                                    //console.log('res_boardname : '+res_boardname);
                                    
                                    const res_uptime_router = res_spec.uptime;
                                    setUptimeRouter(res_uptime_router);
                                    //console.log('res_uptime_router : '+res_uptime_router);
                                    
                                    const res_cpuname = res_spec.cpu;
                                    setCPUName(res_cpuname);
                                    //console.log('res_cpuname : '+res_cpuname);

                                    const res_version = res_spec.version;
                                    setVersionFirmwareRouter(res_version);
                                    //console.log('res_version : '+res_version);

                                    const res_build_time = res_spec.build_time;
                                    setBuildTime(res_build_time);
                                    //console.log('res_build_time : '+res_build_time);

                                    const res_date = res_spec.date;
                                    setDateRouter(res_date);
                                    //console.log('res_date : '+res_date);

                                    const res_time = res_spec.time;
                                    setTimeRouter(res_time);

                                    setDataLabelsCPU(['CPU Load']);
                                    const res_cpu_load = res_spec.cpu_load;
                                    let state_cpu_load = [res_cpu_load];
                                    setCPULoadRouter(state_cpu_load);

                                    const res_model = res_spec.model;
                                    setModelRouter(res_model);
                                    //console.log('res_model : '+res_model);

                                    const res_NTP = res_spec.Ntp;
                                    const res_ntp_enabled = res_NTP.ntp_enabled
                                    setNTPRouter(res_ntp_enabled);
                                    //console.log('res_ntp_enabled : '+res_ntp_enabled);

                                    const res_free_memory = parseFloat(res_spec.free_memory) / 1024 / 1024;
                                    setFreeMemoryRouter(''+res_free_memory.toFixed(0));
                                    //console.log('res_free_memory : '+res_free_memory)

                                    const res_total_memory = parseFloat(res_spec.total_memory) / 1024 / 1024;
                                    setTotalMemoryRouter(''+res_total_memory.toFixed(0));
                                    //console.log('res_total_memory : '+res_total_memory);

                                    const res_use_memory = (res_total_memory - res_free_memory);
                                    setUsageMemoryRouter(''+res_use_memory.toFixed(0));
                                    //console.log('res_use_memory : '+res_use_memory)

                                    setDataLabelsMemory(['Memory Usage'])
                                    const res_prosentase_memory_usage = (res_free_memory /  res_total_memory) * 100;
                                    setProsentaseUsageMemoryRouter([res_prosentase_memory_usage.toFixed(2)]);
                                    //console.log('res_prosentase_memory_usage : '+res_prosentase_memory_usage.toFixed(2));

                                   
                                    const res_free_hdd = parseFloat(res_spec.free_hdd_space) / 1024 / 1024;
                                    setFreeHDDRouter(''+res_free_hdd.toFixed(0));
                                    //console.log('res_free_hdd : '+res_free_hdd);

                                    const res_total_hdd =  parseFloat(res_spec.total_hdd_space) / 1024 / 1024;
                                    setTotalHDDRouter(''+res_total_hdd.toFixed(0));
                                    //console.log('res_total_hdd : '+res_total_hdd.toFixed(0))

                                    const res_use_hdd = (res_total_hdd - res_free_hdd);
                                    setUsageHDDRouter(''+res_use_hdd.toFixed(0));
                                    //console.log('res_use_hdd : '+res_use_hdd)

                                    setDataLabelsDiskUsage(['Disk Usage'])
                                    const res_prosentase_hdd_usage =  (res_free_hdd /  res_total_hdd * 100);
                                    setProsentaseUsageHDDRouter([''+res_prosentase_hdd_usage.toFixed(2)]);
                                    //console.log('res_prosentase_hdd_usage : '+res_prosentase_hdd_usage.toFixed(2));

                                    const res_interface = parse_data_inti_data.Interface;
                                    const res_r = AddID(res_interface);
                                    setdata_rows_io_1(res_r);
                                   

                                    const res_engine = parse_data_inti_data.Engine;
                                    //-- wdcp
                                    const engine_wdcp = (res_engine.engine_wdcp === '' ? '-': res_engine.engine_wdcp);
                                    //console.log('engine_wdcp : '+engine_wdcp);
                                    setdata_engine_wdcp(engine_wdcp);
                                    
                                    const schedule_wdcp = (res_engine.schedule_wdcp === '' ? '-' : res_engine.schedule_wdcp);
                                    //console.log('schedule_wdcp : '+schedule_wdcp);
                                    setschedule_wdcp(schedule_wdcp);

                                    const startat_wdcp = (res_engine.startat_wdcp === '' ? '-' : res_engine.startat_wdcp);
                                    //console.log('startat_wdcp : '+startat_wdcp);
                                    setdata_startat_wdcp(startat_wdcp);
                                    
                                    const interval_wdcp = (res_engine.interval_wdcp === '' ? '-' : res_engine.interval_wdcp);
                                    //console.log('interval_wdcp : '+interval_wdcp);
                                    setdata_interval_wdcp(interval_wdcp);
                                    
                                    //-- koneksi
                                    const engine_koneksi = (res_engine.engine_koneksi === '' ? '-' : res_engine.engine_koneksi);
                                    //console.log('engine_koneksi : '+engine_koneksi);
                                    setdata_engine_kooneksi(engine_koneksi);

                                    const schedule_koneksi = (res_engine.schedule_koneksi === '' ? '-' : res_engine.schedule_koneksi);
                                    //console.log('schedule_koneksi : '+schedule_koneksi);
                                    setschedule_koneksi(schedule_koneksi);

                                    const startat_koneksi = (res_engine.startat_koneksi === '' ? '-' : res_engine.startat_koneksi);
                                    //console.log('startat_koneksi : '+startat_wdcp);
                                    setdata_startat_koneksi(startat_koneksi);

                                    const interval_koneksi = (res_engine.interval_koneksi === '' ? '-' : res_engine.interval_koneksi);
                                    //console.log('interval_koneksi : '+interval_koneksi);
                                    setdata_interval_koneksi(interval_koneksi);

                                    //-- device
                                    const engine_device = (res_engine.engine_device === '' ? '-' : res_engine.engine_device);
                                    //console.log('engine_device : '+engine_device);
                                    setdata_engine_device(engine_device);

                                    
                                    const schedule_device = (res_engine.schedule_device === '' ? '-' : res_engine.schedule_device);
                                    //console.log('schedule_device : '+schedule_device);
                                    setschedule_device(schedule_device);

                                    const startat_device = (res_engine.startat_device === '' ? '-' : res_engine.startat_device);
                                    //console.log('startat_device : '+startat_device);
                                    setdata_startat_device(startat_device);

                                    const interval_device = (res_engine.interval_device === '' ? '-' : res_engine.interval_device);
                                    //console.log('interval_device : '+interval_device);
                                    setdata_interval_device(interval_device);


                                    const res_routing = JSON.parse(parse_data_inti_data.Routing);
                                    setdata_rows_routing(res_routing);

                                }
                            }
                        }catch(Ex){
                            console.log('error : '+Ex.toString());
                        }
                    }else if(code === 209){
                        setisDisabledReconnect(false);
                        setprogressbar_io_1('Proses Realtime Selesai, Klik Reconnect untuk memulai Realtime kembali!')
                    }else if(code.toString().substring(0,1) === '4'){
                        Swal.fire({
                            title: t("Warning"),
                            text: ''+code+'-'+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        if(code === 403){
                            //-- redirect ke login --//
                            //handleLogout();
                        }else{
    
                        }
                    }
                }
            });
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }
    }else{
        Swal.fire({
            title: t("Information"),
            text: "Station : "+IN_ST+" tidak dapat menampilkan data realtime",
            icon: "warning",
            padding: '2em',
            customClass: 'sweet-alerts'
        });
    }
    
}

const CloseModalRouter = () =>{
    setModal16(false);
    refwdcp.current = 0;
}
const CloseModal = () =>{
    setModal14(false);
    //SendRealtime('','','','',true);
    ref.current = 0;
    //setParamCellValue([]);
}

const RebootPC = (IN_ParamCellValues:any) =>{
    const myExample = document.getElementById('btn_reboot_pc');
    Swal.fire({
        icon: "question",
        title: t("Confirmation"),
        text: t("Are you sure for")+" akan me-reboot PC?",
        showDenyButton: true,
        confirmButtonText: "Ya",
        denyButtonText: "Tidak",
        padding: '2em',
        customClass: 'sweet-alerts'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')

            const IP = IN_ParamCellValues.row.IP;
            const TOKO = IN_ParamCellValues.row.TOKO;
            const KDCAB = IN_ParamCellValues.row.KDCAB;
            const STATION = IN_ParamCellValues.row.STATION;
            var key = GetToken()
            const command = "shutdown /r -t 5";
            const IDReport = "TASK_MANAGER_PC";
            const param = WritePayload(KDCAB, TOKO, STATION, "", "COMMAND", command, 2, false, IDReport, key, IP,true,20);
            const url_ws = `ws://${IN_HOST}:7322/sock/v1/ReportFromListener`;
            const socket = new WebSocket(url_ws);
            socket.binaryType = 'blob';
            //Connection error
            socket.addEventListener("error", (event: any) => {
                MySwal.fire({
                    title: "Error Koneksi dengan Server, Hubungi administrator!",
                    toast: true,
                    position: isRtl ? 'top-start' : 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: `color-danger`,
                    },
                });
                myExample.innerHTML = <IconSettings />+'Reboot';
            });

            // Connection opened
            socket.addEventListener("open", () => {
                socket.send(param);
                console.log('param : ' + param);
            });
            // Connection close
            socket.addEventListener("close", (event: any) => {
                console.log('connection close');
                myExample.innerHTML = <IconSettings />+'Reboot';
            });

            // Listen for messages
            socket.addEventListener('message', async (event) => {
                const data = ConvertBinaryToText(event);
                const parse_json = JSON.parse(await data);
                const code = parse_json.code;
                const msg = parse_json.msg;
                const rdata = parse_json.data;
                const countdata = parse_json.amountData;

                if (code === 209) {
                    try {
                        const res_data = JSON.parse(parse_json.data);
                        Swal.fire({
                            title: t("Information"),
                            text: code+'- Sukses Restart PC',
                            icon: "success",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setModal14(false);
                        myExample.innerHTML = <IconSettings />+'Reboot';
                    }catch(Ex){
                        myExample.innerHTML = <IconSettings />+'Reboot';
                    }
                    
                }
            });
        }else{

        }
    });
}

const RebootRouter = (IN_IPStationSelected:string) =>{
    Swal.fire({
        icon: "question",
        title: t("Confirmation"),
        text: t("Are you sure for")+" akan me-reboot perangkat?",
        showDenyButton: true,
        confirmButtonText: "Ya",
        denyButtonText: "Tidak",
        padding: '2em',
        customClass: 'sweet-alerts'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const url = `http://${IN_HOST}:7321/ReportFromRouter/v1/Reboot`;
            const param = {"IP":IN_IPStationSelected};
            //console.log('param : '+JSON.stringify(param));
            const Token = GetToken()
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
                                setModal16(false);
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
                        }
            ).catch(
                    (error) => {
                        Swal.fire({
                            title: t("Warning"),
                            text: t("Error Get Data"),
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

const ActionManageServices = (idComponent:any,idComponentLabel:any,IN_DataTokoSelected:any,IN_NAME:string,IN_STATUS:string) => {
    Swal.fire({
        icon: "question",
        title: t("Confirmation"),
        text: t("Are you sure for")+" akan memanage service tersebut?",
        showDenyButton: true,
        confirmButtonText: "Ya",
        denyButtonText: "Tidak",
        padding: '2em',
        customClass: 'sweet-alerts'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const myExample = document.getElementById(idComponent);
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')
            const labelComp = document.getElementById(idComponentLabel);
            console.log('labelComp : '+labelComp.innerText)
            let res_task = '';
            if(labelComp.innerText === 'false'){
                res_task = 'Disable'
            }else{
                res_task = 'Enable';
            }
            let concat_res_ip = IN_DataTokoSelected.row.IP+"|172.24.52.14";//JSON.stringify(IN_DataTokoSelected)
           
            //console.log('p : '+concat_res_ip);
            const url = `http://${IN_HOST}:7321/ReportFromRouter/v1/ManageService`;
            const param = {"ip":concat_res_ip,"task":res_task.toLowerCase(),"command":IN_NAME};
            //console.log('param : '+JSON.stringify(param));
            const Token = GetToken()
            Posts(url,JSON.stringify(param),false,Token) .then(
                        (response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            let isDisabled = '';
                            const rdata = JSON.parse(res_data.data);
                            for(var i = 0;i<rdata.length;i++){
                                if(rdata[i].disabled === 'false' || rdata[i].disabled === 'true'){
                                    isDisabled = rdata[i].disabled
                                    console.log('isDisabled : '+isDisabled)
                                }
                            }
                            
                            if(parseFloat(code) === 200){
                                Swal.fire({
                                    title: t("Information"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "success",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                myExample.innerHTML = res_task
                                labelComp.innerText = isDisabled
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
                                myExample.innerHTML = (IN_STATUS === 'true' ? 'Enabled':'Disabled')
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                myExample.innerHTML = (IN_STATUS === 'true' ? 'Enabled':'Disabled')
                            }
                        }
            ).catch(
                    (error) => {
                        myExample.innerHTML = IN_STATUS
                        Swal.fire({
                            title: t("Warning"),
                            text: t("Error Get Data"),
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

//-- RETURN MAIN COMPONENT --//
return (
    <>
        <div className={isVisible ? 'visible':'invisble'}>
            <div className="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-3">
                <div className="p-2 flex items-center flex-col sm:flex-row">
                    <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                        <form>
                            <div className="mb-3">
                                <div className="flex item-center font-semibold">
                                    <IconCpuBolt />
                                    <h2 className="text-dark -mt-0.6 ml-1 text-center text-1xl dark:text-white-light">{jenis_laporan}</h2>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className={in_station === 'RBWDCP' ? "grid grid-cols-3 gap-3" : "grid grid-cols-3 gap-3" }>
                                    <div className={in_station === 'RBWDCP' ? "col-span-2" : "col-span-2" }>
                                        {/* <MultiColumnsChart in_border={false} data_labels={in_data_labels} data_series={in_data_rows} data_options={''} data_judul={"Detail Per Device"} data_width_chart={0} data_type_chart={''} data_color={[]} ISMount={true} /> */}
                                        {
                                            in_station === 'RBWDCP' ? 
                                            <>
                                            <div className="col-span-3">
                                                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={t('Device Report')} data_rows={in_data_table} data_columns={in_station === 'RBWDCP' ? ColumnCardTableDevice : ColumnCardTableKoneksi} isLoading={false} progressbar={''} field_auto_sorting={'station'} type_sorting={'asc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={40} isDisableBorder={false} sizeBorderRadius={5} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={''} in_csvOptions={false} in_printOptions={true} in_prosentase_progress={0} in_rows_spanning={false}  />
                                            </div>
                                            </>
                                            :
                                            <div className="col-span-3">
                                                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={t('Connection Report')} data_rows={in_data_table} data_columns={in_station === 'RBWDCP' ? ColumnCardTableDevice : ColumnCardTableKoneksi} isLoading={false} progressbar={''} field_auto_sorting={'jenis_koneksi'} type_sorting={'asc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={false} sizeBorderRadius={5} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={''} in_csvOptions={false} in_printOptions={true} in_prosentase_progress={0} in_rows_spanning={false}  />
                                            </div>
                                        }
                                    </div>
                                    {
                                        in_station === 'RBWDCP' ? 
                                        <>
                                            <DonutChartNew data_judul={t("Device Summary")} in_legend={{'position': 'bottom',show: false}} in_border={false} data_labels={in_data_labels} data_series={in_data_summary} data_color={['#0ab354','#d9534f','#f0ad4e','#f7f7f7']} data_options={undefined} data_width_chart={0} data_type_chart={undefined} ISMount={true}  /> 
                                        </>
                                        :
                                        <>
                                            <DonutChartNew data_judul={t("Connection Summary")} in_legend={{'position': 'bottom',show: false}} in_border={false} data_labels={in_data_labels} data_series={in_data_summary} data_color={['#0ab354','#d9534f','#f0ad4e','#f7f7f7']} data_options={undefined} data_width_chart={0} data_type_chart={undefined} ISMount={true}  /> 
                                        </>
                                    }

                                   
                                  
                                    
                                </div>

                                

                            </div>
                        </form>
                    </div>
                </div>

            </div>
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
                    <div className="flex min-h-screen items-start justify-center px-4 text-xs">
                    <Dialog.Panel
                        className={`panel animate__animated my-7 w-full overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${
                            isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'
                        }`}
                    >
                            <div className="flex items-center justify-between bg-primary px-5 py-3 dark:bg-[#121c2c]">
                                <div className="flex flex-row gap-3">
                                    <div>
                                    <IconBox className="text-white" />
                                    </div>
                                    <div className="">
                                        <h5 className="text-sm font-bold text-white"> {IN_JUDUL_FORM} </h5>
                                    </div>
                                </div>
                                <button onClick={() => setModal13(false)} type="button" className="text-white-dark hover:text-dark">
                                    <IconX />
                                </button>
                            </div>
                            <div className="p-5">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className={IN_SHOW_HISTORY === 'invisible' ? "col-span-3" : "col-span-2" }>
                                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Report Station'} data_rows={IN_DATA_ROWS} data_columns={IN_DATA_COLUMNS} isLoading={IN_LOADING} progressbar={Progress} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS), new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={true} in_prosentase_progress={0} in_rows_spanning={false} />
                                    </div>                                    
                                    {
                                        IN_SHOW_HISTORY === 'invisible' ? '' 
                                        : 
                                        <div>
                                            {
                                                IN_LOADING_DATA_HISTORY_DETAIL ? <div className="text-center mt-48"><span className="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span><br />Mohon Tunggu!</div> 
                                                : 
                                                <>
                                                
                                                    <div className="flex justify-between">
                                                        <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1">Interval</div>
                                                    </div>

                                                    <div className="flex items-center font-semibold mb-3">
                                                        <span className="badge bg-success">{IN_INTERVAL_AWAL} - {IN_INTERVAL_AKHIR} / {IN_INTERVAL_RANGE_TIME}</span>
                                                    </div>
                                                <div><DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Report History'} data_rows={IN_DATA_ROWS_HISTORY} data_columns={IN_DATA_COLUMNS_HISTORY} isLoading={IN_LOADING} progressbar={''} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-1/3 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={40} isDisableBorder={false} sizeBorderRadius={4} row_per_page={[5]} in_showQuickFilter={false} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false} /></div>
                                                {/* <div className="panel border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none w-full rounded-2xl -mt-2"> */}
                                                    <div className="flex justify-between -mt-3">
                                                        <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1">Downtime</div>
                                                    </div>
                                                    <div className="flex items-center font-semibold">
                                                        <span className="badge bg-danger">{IN_DOWNTIME_AWAL} - {IN_DOWNTIME_AKHIR} / {IN_DOWNTIME_RANGE_TIME}</span>
                                                    </div>
                                                    {/* <div className="flex items-center font-semibold">
                                                    Awal&emsp;&emsp;&emsp;&nbsp;&nbsp;<span className="badge bg-success">{IN_DOWNTIME_AWAL}</span>
                                                        &emsp;Akhir&emsp;<span className="badge bg-success">{IN_DOWNTIME_AKHIR}</span>
                                                    </div>
                                                    <div className="flex items-center font-semibold">
                                                        Range Time&nbsp;<span className="badge bg-success">{IN_DOWNTIME_RANGE_TIME}</span>
                                                    </div> */}
                                                {/* </div> */}
                                                </>
                                            }
                                        </div>
                                    }
                                    
                                        
                                    
                                    
                                </div>
                                    
                                
                                <div className="mt-3 flex items-center justify-end">
                                    <button onClick={() => setModal13(false)} type="button" className="btn btn-outline-danger">
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>

        <Transition appear show={modal14} as={Fragment}>
            <Dialog as="div" open={modal14} onClose={() => setModal14(false)}>
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
                    <div className="flex min-h-screen items-start justify-center px-4 text-xs">
                        <Dialog.Panel
                            className={`panel animate__animated my-7 w-4/5 overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${
                                isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'
                            }`}
                        >
                            <div className="flex items-center justify-between bg-primary px-5 py-3 dark:bg-[#121c2c]">
                                <div className="col-span-3">
                                    <h5 className="text-sm font-bold text-white-light">{IN_NAMA_TOKO}</h5>
                                </div>
                                <button onClick={() => CloseModal() } type="button" className="text-white-dark hover:text-dark">
                                    <IconX />
                                </button>
                            </div>
                            <div className="p-5">
                                
                                    <div className="grid grid-cols-2 gap-3">
                                        {
                                            progressbar_processlist.toString().includes('Succes') ? 
                                            <>
                                            <div className="mb-3 text-white">
                                                <div className="grid grid-cols-3 gap-1">
                                                    <div>
                                                        <RadialChart data_labels={DataLabelsCPU} data_series={DataSeriesCPU} data_judul={"CPU Usage"} data_height={200} ISMount={isMounted} />
                                                    </div>
                                                    <div>
                                                        <RadialChart data_labels={DataLabelsMemory} data_series={DataSeriesMemory} data_judul={"Memory Usage"} data_height={200} ISMount={isMounted} />
                                                    </div>
                                                    <div>
                                                        <RadialChart data_labels={DataLabelsDiskUsage} data_series={DataSeriesDiskUsage} data_judul={"Disk Usage"} data_height={200} ISMount={isMounted} />
                                                    </div>
                                                </div>
                                            </div>
                                            </>
                                            :
                                            <span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>

                                        }
                                        {
                                            progressbar_processlist.toString().includes('Succes') ? 
                                            <>
                                            <div className="mt-6 mb-3 text-white">
                                                <div className="grid grid-cols-2 gap-3">
                                                        <div className="panel bg-gradient-to-r from-purple-500 to-purple-400 w-full rounded-2xl">
                                                            <div className="flex justify-between">
                                                                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">
                                                                    <IconLogout className="w-10 h-10" />Network Traffic Sent
                                                                </div>
                                                            </div>
                                                            <div className="mt-5 flex items-center">
                                                                <div className="text-xl font-bold ltr:mr-3 rtl:ml-3">{SentThroughput}</div>
                                                                <div className="badge bg-white/30">Kbps</div>
                                                            </div>
                                                        </div>
                                                    

                                                    
                                                        <div className="panel bg-gradient-to-r from-blue-500 to-blue-400 w-full rounded-2xl">
                                                            <div className="flex justify-between">
                                                                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">
                                                                    <IconDownload className="w-10 h-10" />
                                                                    Network Traffic Received
                                                                </div>
                                                            </div>
                                                            <div className="mt-5 flex items-center">
                                                                <div className="text-xl font-bold ltr:mr-3 rtl:ml-3">{ReceivedThroughput}</div>
                                                                <div className="badge bg-white/30">Kbps</div>
                                                            </div>
                                                        </div>
                                                    

                                                    
                                                </div>
                                            </div>
                                            </>
                                            :
                                            <span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>

                                        }
                                        
                                    </div>
                                    <div className="grid grid-rows-3 grid-flow-col gap-3">
                                        {/* GRID 1 */}
                                        {
                                            progressbar_processlist.toString().includes('Succes') ? 
                                            <>
                                            <div className="mb-0 row-span-3">
                                                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Process List'} data_rows={data_rows_processlist} data_columns={data_columns_processlist} isLoading={loading_processlist} progressbar={progressbar_processlist} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={36} isDisableBorder={false} sizeBorderRadius={4} row_per_page={[10]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false}  />
                                            </div>
                                            </>
                                            :
                                            <span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>
                                        }
                                        
                                        {/* GRID 2 */}
                                        {
                                            progressbar_processlist.toString().includes('Succes') ? 
                                            <>
                                            <div className="col-span-2">
                                                    
                                                    <div className="mb-3 w-full text-end"> 
                                                        <span className="badge bg-success">Response Server : {progressbar_processlist}</span>
                                                    </div>

                                                    

                                                    <div className="panel border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none w-full rounded-2xl">
                                                        <div className="flex justify-between">
                                                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">CPU Suhu</div>
                                                        </div>
                                                        {Suhu < 50 ? <div className="text-center text-5xl text-success">{Suhu}&ordm; C</div> : <div className="text-center text-5xl text-danger">{Suhu}&ordm; C</div>}
                                                    </div>
                                            </div>
                                            </>
                                            :
                                            <span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>
                                        }
                                        {/* GRID 3 */}
                                        {
                                            progressbar_processlist.toString().includes('Succes') ? 
                                            <>
                                            <div className="text-white row-span-2 col-span-2">
                                                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400 w-full rounded-2xl">
                                                        <div className="flex justify-between">
                                                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Identitas PC</div>
                                                        </div>
                                                        <div className="mt-5 flex items-center">
                                                            <div className="text-xl font-bold ltr:mr-3 rtl:ml-3">{OSName}</div>
                                                            <div className="badge bg-white/30">{Architecture}</div>
                                                        </div>
                                                        <div className="mt-2 flex items-center font-semibold">
                                                            <IconArrowForward className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                            Last System Up&emsp;<span className="badge bg-warning">{LastsBootTime}</span>
                                                        </div>
                                                        <div className="flex items-center font-semibold">
                                                            <IconBell className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                            Last BootTime&emsp;&emsp;<span className="badge bg-warning">{BootTime}</span>
                                                        </div>
                                                        <div className="flex items-center font-semibold">
                                                            <IconTrendingUp className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                            UpTime&emsp;&emsp;&emsp;&emsp;&emsp;<span className="badge bg-success">{UpTime.split('.')[0]}</span>
                                                        </div>
                                                        <div className="flex items-center font-semibold">
                                                            <IconCpuBolt className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                            Proccesor&emsp;&emsp;&emsp;&emsp;<span className="badge bg-success">{Processor}</span>
                                                        </div>
                                                        <div className="flex items-center font-semibold  mb-3">
                                                            <IconMenuComponents className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                            Memory Install&emsp;&nbsp;&nbsp;<span className="badge bg-success">{MemoryTerpasang}&nbsp;GB</span>
                                                        </div>
                                                    </div>
                                            </div>
                                            </>
                                        
                                        :
                                        <span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>
                                    }
                                    </div>

                                <div className="flex items-center justify-end mt-2">
                                    <button disabled={isDisabledReconnect} onClick={() => show_Dashboard_Router(DataTokoSelected,StationSelected)} type="button" className={isDark ? 'mr-1 btn btn-outline-warning rounded-2xl' : 'mr-1 btn btn-warning rounded-2xl'}>
                                        <IconRefresh />&nbsp;Reconnect
                                    </button>

                                    <button id="btn_reboot_pc" onClick={() => RebootPC(DataTokoSelected)} type="button" className={isDark ? 'mr-1 btn btn-outline-danger rounded-2xl' : 'mr-1 btn btn-danger rounded-2xl'}>
                                        <IconSettings />&nbsp;Reboot
                                    </button>
                                    
                                    <button onClick={() => CloseModal()} type="button" className={isDark ? 'mr-1 btn btn-outline-secondary rounded-2xl' : 'mr-1 btn btn-secondary rounded-2xl'}>
                                        <IconX  />&nbsp; Close Page
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>

        <Transition appear show={modal15} as={Fragment}>
            <Dialog as="div" open={modal15} onClose={() => setModal15(false)}>
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
                <div id="fadein_right_modal1" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-start justify-center px-4">
                        <Dialog.Panel
                            className={`panel animate__animated my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark ${
                                isRtl ? 'animate__fadeInLeft' : 'animate__fadeInRight'
                            }`}
                        >
                            <div className="flex items-center justify-between bg-primary px-5 py-3 dark:bg-[#121c2c]">
                                <h5 className="text-lg font-bold text-white">History Device IP : {IN_HISTORY_IP_VALUE}</h5>
                                <button onClick={() => setModal15(false)} type="button" className="text-white-dark hover:text-dark">
                                    <IconX />
                                </button>
                            </div>
                            <div className="p-5">
                            <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Report Station'} data_rows={IN_DATA_ROWS_HISTORY} data_columns={IN_DATA_COLUMNS_HISTORY} isLoading={IN_LOADING} progressbar={''} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={false} sizeBorderRadius={4} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={false} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false} />
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>

        <Transition appear show={modal16} as={Fragment}>
            <Dialog as="div" open={modal16} onClose={() => setModal16(false)}>
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
                    <div className="flex min-h-screen items-start justify-center px-4 text-xs">
                        <Dialog.Panel
                            className={`panel animate__animated my-7 w-4/5 overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${
                                isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'
                            }`}
                        >
                            <div className="flex items-center justify-between bg-primary px-5 py-3 dark:bg-[#121c2c]">
                                <div className="col-span-3">
                                    <h5 className="text-sm font-bold text-white-light">{IN_NAMA_TOKO}</h5>
                                </div>
                                <button onClick={() => CloseModalRouter() } type="button" className="text-white-dark hover:text-dark">
                                    <IconX />
                                </button>
                            </div>
                            <div className="p-5">
                                
                                    {
                                        progressbar_io_1 !== '' ? 
                                        <>
                                        {
                                            progressbar_io_1.toString().includes('Koneksi Bermasalah') || progressbar_io_1.toString().includes('Selesai')  ? 
                                            <div className="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light mb-3">
                                                <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                                                    <IconInfoHexagon />
                                                </span>
                                                <span className="ltr:pr-2 rtl:pl-2">
                                                    {"Respon dari Server! : "+progressbar_io_1}
                                                </span>
                                                <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                                </button>
                                            </div> 
                                            :
                                            <div className="flex items-center p-3.5 rounded text-success bg-success-light dark:bg-success-dark-light mb-3">
                                                <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                                                    <IconInfoHexagon />
                                                </span>
                                                <span className="ltr:pr-2 rtl:pl-2">
                                                    {"Respon dari Server! : "+progressbar_io_1}
                                                </span>
                                                <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                                </button>
                                            </div> 
                                        }
                                        
                                        </>
                                        : ''
                                    }
                                    <div className="grid grid-cols-3 gap-3">
                                        {/* GRID 1 IDENTITAS ROUTER */}
                                        <div className="col-start-1 col-span-3">
                                            {
                                                progressbar_io_1.toString().includes('Succes') || progressbar_io_1.toString().includes('Reconnect') ? 
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="text-dark dark:text-white-light bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                                <div className="panel rounded-2xl">
                                                                    <div className="flex justify-between">
                                                                        <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1 mb-5">
                                                                            <div className="grid grid-cols-4 gap3">
                                                                                <div>
                                                                                    <IconCpuBolt />
                                                                                </div>    
                                                                                <div className="col-span-3 -ml-4 -mt-1">
                                                                                    Spesifikasi Router
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                <div className="table-responsive w-full">
                                                                <table>
                                                                    <tr>
                                                                        <td>Board Name</td>
                                                                        <td>:</td>
                                                                        <td><span className="dark:text-[#e95f2b] font-bold text-sm text-black">{BoardName}</span></td>

                                                                        
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Build Time</td>
                                                                        <td>:</td>
                                                                        <td><span className="dark:text-[#e95f2b] font-bold text-sm text-black">{BuildTime}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Uptime Router</td>
                                                                        <td>:</td>
                                                                        <td><span className="dark:text-[#e95f2b] font-bold text-sm text-black">{UptimeRouter}</span></td>

                                                                        
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Date</td>
                                                                        <td>:</td>
                                                                        <td><span className="dark:text-[#e95f2b] font-bold text-sm text-black">{DateRouter}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Time</td>
                                                                        <td>:</td>
                                                                        <td><span className="dark:text-[#e95f2b] font-bold text-sm text-black">{TimeRouter}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>CPU Name</td>
                                                                        <td>:</td>
                                                                        <td><span className="dark:text-[#e95f2b] font-bold text-sm text-black">{CPUName}</span></td>

                                                                        
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Model</td>
                                                                        <td>:</td>
                                                                        <td><span className="dark:text-[#e95f2b] font-bold text-sm text-black">{ModelRouter}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Version</td>
                                                                        <td>:</td>
                                                                        <td><span className="dark:text-[#e95f2b] font-bold text-sm text-black">{VersionFirmwareRouter}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>NTP</td>
                                                                        <td>:</td>
                                                                        <td><span className="dark:text-[#e95f2b] font-bold text-sm text-black">{NTPRouter}</span></td>
                                                                    </tr>
                                                                </table>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="text-dark dark:text-white-light bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                                <div className="panel rounded-2xl">
                                                                    <div className="flex justify-between">
                                                                        <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1 mb-5">
                                                                            <div className="grid grid-cols-4 gap3">
                                                                                <div>
                                                                                    <IconCpuBolt />
                                                                                </div>    
                                                                                <div className="col-span-1 -ml-10 -mt-0.5">
                                                                                    Router Usage
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                <div className="table-responsive w-full grid grid-cols-3 gap-2">
                                                                    <div>
                                                                        <RadialChart data_labels={DataLabelsMemory} data_series={ProsentaseUsageMemoryRouter} data_judul={"Memory Usage"} data_height={200} ISMount={isMounted} />
                                                                    </div>
                                                                    <div>
                                                                        <RadialChart data_labels={DataLabelsCPU} data_series={CPULoadRouter} data_judul={"CPU Usage"} data_height={200} ISMount={isMounted} />
                                                                    </div>
                                                                    <div>
                                                                        <RadialChart data_labels={DataLabelsDiskUsage} data_series={ProsentaseUsageHDDRouter} data_judul={"HDD Usage"} data_height={200} ISMount={isMounted} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                : 
                                                <>
                                                {
                                                    
                                                    progressbar_io_1.toString().includes('209') ? 
                                                    ''
                                                    :
                                                    <span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>
                                                }
                                                </>
                                            }
                                        </div>

                                        <div>
                                            {
                                                progressbar_io_1.toString().includes('Succes') || progressbar_io_1.toString().includes('Reconnect') ? 
                                                <div className="text-white">
                                                    <div className="panel bg-gradient-to-r from-stone-700 to-stone-500 w-full rounded-2xl">
                                                            <div className="flex justify-between">
                                                                <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1 mb-5">
                                                                    <div className="grid grid-cols-4 gap3">
                                                                        <div>
                                                                            <IconServer />
                                                                        </div>    
                                                                        <div className="col-span-3 ml-2 -mt-1">
                                                                        WDCP
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        <div className="table-responsive w-full">
                                                        <table>
                                                            <tr>
                                                                <td>Engine WDCP</td>
                                                                <td>:</td>
                                                                <td><span className="text-white font-bold text-sm">{data_engine_wdcp === '' ? '-' : data_engine_wdcp}</span></td>

                                                                <td>Schedule</td>
                                                                <td>:</td>
                                                                <td><span className="text-white font-bold text-sm">{data_schedule_wdcp}</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Start At WDCP</td>
                                                                <td>:</td>
                                                                <td><span className="text-white font-bold text-sm">{data_startat_wdcp}</span></td>

                                                                <td>Interval WDCP</td>
                                                                <td>:</td>
                                                                <td><span className="text-white font-bold text-sm">{data_interval_wdcp}</span></td>
                                                            </tr>
                                                        </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <>
                                                {
                                                    
                                                    progressbar_io_1.toString().includes('209') ? 
                                                    ''
                                                    :
                                                    <span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>
                                                }
                                                </>
                                            }
                                        </div>
                                        <div>
                                            {
                                                progressbar_io_1.toString().includes('Succes') || progressbar_io_1.toString().includes('Reconnect') ? 
                                                <div className="text-white">
                                                        <div className="panel bg-gradient-to-r from-green-700 to-green-500 w-full rounded-2xl">
                                                            <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1 mb-5">
                                                                <div className="grid grid-cols-4 gap3">
                                                                    <div>
                                                                        <IconSend />
                                                                    </div>    
                                                                    <div className="col-span-3 -ml-11 -mt-1">
                                                                    Koneksi
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        <div className="table-responsive w-full">
                                                            <table>
                                                                <tr>
                                                                    <td>Engine Koneksi</td>
                                                                    <td>:</td>
                                                                    <td><span className="text-white font-bold text-sm">{data_engine_koneksi === '' ? '-' : data_engine_koneksi}</span></td>

                                                                    <td>Schedule</td>
                                                                    <td>:</td>
                                                                    <td><span className="text-white font-bold text-sm">{data_schedule_koneksi === '' ? '-' : data_schedule_koneksi}</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Start At Koneksi</td>
                                                                    <td>:</td>
                                                                    <td><span className="text-white font-bold text-sm">{data_startat_koneksi === '' ? '-' : data_startat_koneksi}</span></td>

                                                                    <td>Interval Koneksi</td>
                                                                    <td>:</td>
                                                                    <td><span className="text-white font-bold text-sm">{data_interval_koneksi === '' ? '-' : data_interval_koneksi}</span></td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <>
                                                {
                                                    
                                                    progressbar_io_1.toString().includes('209') ? 
                                                    ''
                                                    :
                                                    <span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>
                                                }
                                                </>
                                            }
                                        </div>
                                        
                                        <div>
                                            {
                                                progressbar_io_1.toString().includes('Succes') || progressbar_io_1.toString().includes('Reconnect') ? 
                                                <div className="text-white">
                                                    <div className="panel bg-gradient-to-r from-fuchsia-800 to-fuchsia-500 w-full rounded-2xl">
                                                        <div className="flex justify-between">
                                                            <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1 mb-5">
                                                                <div className="grid grid-cols-4 gap3">
                                                                    <div>
                                                                        <IconPrinter />
                                                                    </div>    
                                                                    <div className="col-span-3 ml-2 -mt-1">
                                                                    Device
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="table-responsive w-full">
                                                            <table>
                                                                <tr>
                                                                    <td>Engine Device</td>
                                                                    <td>:</td>
                                                                    <td><span className="text-white font-bold text-sm">{data_engine_device === '' ? '-' : data_engine_device}</span></td>

                                                                    <td>Schedule</td>
                                                                    <td>:</td>
                                                                    <td><span className="text-white font-bold text-sm">{data_schedule_device}</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Start At Koneksi</td>
                                                                    <td>:</td>
                                                                    <td><span className="text-white font-bold text-sm">{data_startat_device}</span></td>

                                                                    <td>Interval Koneksi</td>
                                                                    <td>:</td>
                                                                    <td><span className="text-white font-bold text-sm">{data_interval_device}</span></td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <>
                                                {
                                                    
                                                    progressbar_io_1.toString().includes('209') ? 
                                                    ''
                                                    :
                                                    <span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>
                                                }
                                                </>
                                            }
                                        </div>
                                        
                                    </div>

                                    <div className="flex items-center justify-start mt-2">
                                        <button disabled={isDisabledButtonTraffic}  onClick={() => showTraffic(isTextTraffic)} type="button" className={isDark ? 'mr-1 btn btn-outline-primary rounded-2xl' : 'mr-1 btn btn-primary rounded-2xl'}>
                                            <IconTrendingUp />&nbsp;{isTextTraffic}
                                        </button>

                                        <button disabled={isDisabledReconnect} onClick={() => show_Dashboard_Router(DataTokoSelected,StationSelected)} type="button" className={isDark ? 'mr-1 btn btn-outline-warning rounded-2xl' : 'mr-1 btn btn-warning rounded-2xl'}>
                                            <IconRefresh />&nbsp;Reconnect
                                        </button>
                                        
                                        <button onClick={() => RebootRouter(IPStationSelected)} type="button" className={isDark ? 'mr-1 btn btn-outline-danger rounded-2xl' : 'mr-1 btn btn-danger rounded-2xl'}>
                                            <IconSettings />&nbsp;Reboot
                                        </button>
                                        <button onClick={() => CloseModalRouter()} type="button" className={isDark ? 'mr-1 btn btn-outline-dark rounded-2xl' : 'mr-1 btn btn-dark rounded-2xl'}>
                                            <IconX  />&nbsp; Tutup Halaman
                                        </button>
                                    </div>
                                                    
                                    {
                                        ISShowTraffic ? 
                                        <>
                                        {  
                                            progressbar_io_1.toString().includes('Succes') || progressbar_io_1.toString().includes('Reconnect') ? 
                                                <>
                                                <div className="pt-1">
                                                    <div>
                                                        <ul className="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
                                                            <li className="inline-block">
                                                                <button
                                                                    onClick={() => toggleTabsRB('traffic_interface',IPStationSelected)}
                                                                    className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'traffic_interface' ? '!border-primary text-primary' : ''}`}
                                                                >
                                                                    <IconHome />
                                                                    Traffic Interface
                                                                </button>
                                                            </li>
                                                            <li className="inline-block">
                                                                <button
                                                                    onClick={() => toggleTabsRB('view_log',IPStationSelected)}
                                                                    className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'view_log' ? '!border-primary text-primary' : ''}`}
                                                                >
                                                                    <IconAirplay />
                                                                    View Log
                                                                </button>
                                                            </li>
                                                            <li className="inline-block">
                                                                <button
                                                                    onClick={() => toggleTabsRB('servis',IPStationSelected)}
                                                                    className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'servis' ? '!border-primary text-primary' : ''}`}
                                                                >
                                                                    <IconArchive />
                                                                    Servis
                                                                </button>
                                                            </li>
                                                            
                                                            {
                                                                StationSelected === 'RBWDCP' ?
                                                                <>
                                                                <li className="inline-block">
                                                                        <button
                                                                            onClick={() => toggleTabsRB('interface_bridge', IPStationSelected)}
                                                                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'interface_bridge' ? '!border-primary text-primary' : ''}`}
                                                                        >
                                                                            <IconBox />
                                                                            Interface Bridge
                                                                        </button>
                                                                </li> 
                                                                <li className="inline-block">
                                                                        <button
                                                                            onClick={() => toggleTabsRB('ip_setting', IPStationSelected)}
                                                                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'ip_setting' ? '!border-primary text-primary' : ''}`}
                                                                        >
                                                                            <IconBox />
                                                                            IP Setting
                                                                        </button>
                                                                </li>
                                                                <li className="inline-block">
                                                                    <button
                                                                        onClick={() => toggleTabsRB('interface_wireless_setting', IPStationSelected)}
                                                                        className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'routing' ? '!border-primary text-primary' : ''}`}
                                                                    >
                                                                        <IconBox />
                                                                        Interface Wireless
                                                                    </button>
                                                                </li>
                                                                <li className="inline-block">
                                                                    <button
                                                                        onClick={() => toggleTabsRB('netwatch', IPStationSelected)}
                                                                        className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'routing' ? '!border-primary text-primary' : ''}`}
                                                                    >
                                                                        <IconClock />
                                                                        Netwatch
                                                                    </button>
                                                                </li>
                                                                </>
                                                               
                                                                :
                                                                <>
                                                                <li className="inline-block">
                                                                    <button
                                                                        onClick={() => toggleTabsRB('routing', IPStationSelected)}
                                                                        className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'routing' ? '!border-primary text-primary' : ''}`}
                                                                    >
                                                                        <IconBox />
                                                                        Routing
                                                                    </button>
                                                                </li>
                                                                <>
                                                                <li className="inline-block">
                                                                        <button
                                                                            onClick={() => toggleTabsRB('interface_bridge', IPStationSelected)}
                                                                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'interface_bridge' ? '!border-primary text-primary' : ''}`}
                                                                        >
                                                                            <IconBox />
                                                                            Interface Bridge
                                                                        </button>
                                                                </li> 
                                                                <li className="inline-block">
                                                                        <button
                                                                            onClick={() => toggleTabsRB('ip_setting', IPStationSelected)}
                                                                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'ip_setting' ? '!border-primary text-primary' : ''}`}
                                                                        >
                                                                            <IconBox />
                                                                            IP Setting
                                                                        </button>
                                                                </li>
                                                                <li className="inline-block">
                                                                    <button
                                                                        onClick={() => toggleTabsRB('interface_wireless_setting', IPStationSelected)}
                                                                        className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'routing' ? '!border-primary text-primary' : ''}`}
                                                                    >
                                                                        <IconBox />
                                                                        Interface Wireless
                                                                    </button>
                                                                </li>
                                                                <li className="inline-block">
                                                                    <button
                                                                        onClick={() => toggleTabsRB('netwatch', IPStationSelected)}
                                                                        className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'routing' ? '!border-primary text-primary' : ''}`}
                                                                    >
                                                                        <IconClock />
                                                                        Netwatch
                                                                    </button>
                                                                </li>
                                                                </>
                                                                </>

                                                            }
                                                            
                                                        </ul>
                                                    </div>

                                                    {
                                                        tabsRB === 'traffic_interface' ? 
                                                            <div>
                                                                {/* TRAFFIC INTERFACE */}
                                                                <div className="panel mt-3 text-dark dark:text-white-light bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                                    <div className="flex justify-between">
                                                                        <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1 mb-5">
                                                                            <div className="grid grid-cols-4 gap3">
                                                                                <div>
                                                                                    <IconTrendingUp />
                                                                                </div>    
                                                                                <div className="col-span-3 ml-2 -mt-1">
                                                                                Traffic Interface
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="table-responsive">
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                <th>NAME</th>
                                                                                <th>RX (Byte)</th>
                                                                                <th>TX (Byte)</th>
                                                                                <th>RX Packet (Byte)</th>
                                                                                <th>TX Packet (Byte)</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {
                                                            
                                                                                Object.keys(data_rows_io_1).map(
                                                                                    (key, i) => (
                                                                                        <>
                                                                                        {
                                                                                                <tr>
                                                                                                <td className="font-semibold">{GetFormatCurrency(data_rows_io_1[i].name)}</td>
                                                                                                <td className="font-semibold text-end text-sm text-succes">{GetFormatCurrency(data_rows_io_1[i].rx_byte)}</td>
                                                                                                <td className="font-semibold text-end text-sm text-danger">{GetFormatCurrency(data_rows_io_1[i].tx_byte)}</td>
                                                                                                <td className="font-semibold text-end text-sm text-success">{GetFormatCurrency(data_rows_io_1[i].rx_packet)}</td>
                                                                                                <td className="font-semibold text-end text-sm text-danger">{GetFormatCurrency(data_rows_io_1[i].tx_packet)}</td>
                                                                                                </tr>
                                                                                        }
                                                                                        </>
                                                                                    )
                                                                                )
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        
                                                        :
                                                        ''
                                                    }

                                                    {
                                                        tabsRB === 'view_log' ? 
                                                            <div>
                                                                {/* VIEW LOG */}
                                                                    <div className="table-responsive">
                                                                        <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'View Log'} data_rows={data_rows_view_log} data_columns={DataColumnViewLog} isLoading={LoadingViewLog} progressbar={''} field_auto_sorting={'time'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false}  />
                                                                    </div>
                                                            </div>
                                                        
                                                        :
                                                        ''
                                                    }

                                                    {
                                                        tabsRB === 'servis' ? 
                                                            <div>
                                                                {/* ROUTING */}
                                                                <div className="panel mt-3 text-dark dark:text-white-light bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                                    <div className="flex justify-between">
                                                                        <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1 mb-5">
                                                                            <div className="grid grid-cols-4 gap3">
                                                                                <div>
                                                                                    <IconTrendingUp />
                                                                                </div>    
                                                                                <div className="col-span-3 ml-2 -mt-1">
                                                                                Servis
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="table-responsive snap-y">
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                <th>Action</th>
                                                                                <th>Name</th>
                                                                                <th>Address</th>
                                                                                <th>Port</th>
                                                                                <th>IS_Disabled</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {

                                                                                Object.keys(data_rows_service).map(
                                                                                    (key, i) => (
                                                                                        <>
                                                                                        {
                                                                                                <tr>
                                                                                                <td className="font-semibold"><button id={"btn_manage_"+i} onClick={() => {ActionManageServices('btn_manage_'+i,'lbl_service_'+i,DataTokoSelected,data_rows_service[i].name,data_rows_service[i].disabled)}} className={isDark ? 'mr-1 btn btn-outline-primary rounded-2xl' : 'mr-1 btn btn-primary rounded-2xl'}>{data_rows_service[i].disabled === 'true' ? 'Enabled':'Disabled'}</button></td>
                                                                                                <td className="font-semibold">{data_rows_service[i].name}</td>
                                                                                                <td className="font-semibold text-end text-sm text-succes">{data_rows_service[i].address}</td>
                                                                                                <td className="font-semibold text-end text-sm text-danger">{data_rows_service[i].port}</td>
                                                                                                <td className={data_rows_service[i].disabled === 'false' ? 'font-semibold text-end text-sm text-success' : 'font-semibold text-end text-sm text-danger'}><label id={"lbl_service_"+i}>{data_rows_service[i].disabled}</label></td>
                                                                                                </tr>
                                                                                        }
                                                                                        </>
                                                                                    )
                                                                                )
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        
                                                        :
                                                        ''
                                                    }

                                                    {
                                                        tabsRB === 'routing' ? 
                                                            <div>
                                                                {/* ROUTING */}
                                                                <div className="panel mt-3 text-dark dark:text-white-light bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                                    <div className="flex justify-between">
                                                                        <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1 mb-5">
                                                                            <div className="grid grid-cols-4 gap3">
                                                                                <div>
                                                                                    <IconTrendingUp />
                                                                                </div>    
                                                                                <div className="col-span-3 ml-2 -mt-1">
                                                                                Routing
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="table-responsive overflow-auto">
                                                                        <table>
                                                                            <thead>
                                                                                <tr>
                                                                                <th>Active</th>
                                                                                <th>Address</th>
                                                                                <th>Connect</th>
                                                                                <th>Distance</th>
                                                                                <th>Dynamic</th>
                                                                                <th>Gateway</th>
                                                                                <th>GW Status</th>
                                                                                <th>Static</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {

                                                                                Object.keys(data_rows_routing).map(
                                                                                    (key, i) => (
                                                                                        <>
                                                                                        {
                                                                                                <tr>
                                                                                                <td className="font-semibold">{data_rows_routing[i].active}</td>
                                                                                                <td className="font-semibold text-end text-sm text-succes">{data_rows_routing[i].address}</td>
                                                                                                <td className="font-semibold text-end text-sm text-danger">{data_rows_routing[i].connect}</td>
                                                                                                <td className="font-semibold text-end text-sm text-danger">{data_rows_routing[i].distance}</td>
                                                                                                <td className="font-semibold text-end text-sm text-danger">{data_rows_routing[i].dynamic}</td>
                                                                                                <td className="font-semibold text-end text-sm text-danger">{data_rows_routing[i].gateway}</td>
                                                                                                <td className="font-semibold text-end text-sm text-danger">{data_rows_routing[i].gwstatus}</td>
                                                                                                <td className="font-semibold text-end text-sm text-danger">{data_rows_routing[i].static}</td>
                                                                                                </tr>
                                                                                        }
                                                                                        </>
                                                                                    )
                                                                                )
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        
                                                        :
                                                        ''
                                                    }

                                                    {
                                                        tabsRB === 'interface_wireless_setting' ? 
                                                            <div>
                                                                {/* INTERFACE WIRELESS SETTING */}
                                                                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Interface Wireless'} data_rows={data_rows_interface_wireless} data_columns={DataColumnInterfaceWireless} isLoading={LoadingInterfaceWirelessSetting} progressbar={''} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false}  />  
                                                            </div>
                                                        :
                                                        ''
                                                    }

                                                    {
                                                        tabsRB === 'interface_bridge' ? 
                                                            <div>
                                                                {/* INTERFACE BRIDGE */}
                                                                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Interface Bridge'} data_rows={data_rows_interface_bridge} data_columns={DataColumnInterfaceBridge} isLoading={LoadingInterfaceBridge} progressbar={''} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false}  /> 
                                                            </div>
                                                        
                                                        :
                                                        ''
                                                    }

                                                    {
                                                        tabsRB === 'ip_setting' ? 
                                                            <div>
                                                                {/* IP SETTING */}
                                                                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'IP Setting'} data_rows={data_rows_ip_setting} data_columns={DataColumnIPSetting} isLoading={LoadingIPSetting} progressbar={''} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false}  /> 
                                                            </div>
                                                        :
                                                        ''
                                                    }

                                                    {
                                                        tabsRB === 'netwatch' ? 
                                                            <div>
                                                                {/* NETWATCH */}
                                                                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Netwatch'} data_rows={data_rows_netwatch} data_columns={DataColumnNetwatch} isLoading={LoadingNetwatch} progressbar={''} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false}  /> 
                                                            </div>
                                                        :
                                                        ''
                                                    }


                                                </div>    
                                                </>
                                            :
                                            <div className="mb-5">
                                                <span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>
                                            </div>
                                        }
                                        </>
                                        
                                        
                                        // <div className="mt-3">
                                        //     <div className="table-responsive">
                                                
                                        //     </div>
                                        //     {/* <DataTables jenis_laporan={'Interface'} data_rows={data_rows_io_1} data_columns={data_columns_io_1} isLoading={loading_io_1} progressbar={progressbar_io_1} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={36} isDisableBorder={false} sizeBorderRadius={4} row_per_page={[10]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false}   /> */}
                                        // </div>
                                        : 
                                        ''
                                    } 
                                
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>      
    </>
  );
}

export default CardDeviceCabang;