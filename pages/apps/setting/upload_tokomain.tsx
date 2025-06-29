
import Link from "next/link";
import { useEffect, useState,Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconHome from '@/components/Icon/IconHome';
import Select from 'react-select';
import Swal from "sweetalert2";
import router from "next/router";
import { DataGrid, GridColDef, GridToolbar, GridValueGetter,GridRowsProp, GridRowSpacingParams, GridColumnGroupingModel } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IRootState } from "@/store";
import { Posts } from "@/lib/post";
import React from "react";
import IconEdit from '@/components/Icon/IconEdit';
import IconTrash from "@/components/Icon/IconTrash";
import { Dialog, Transition } from '@headlessui/react';
import IconX from "@/components/Icon/IconX";
import IconInbox from "@/components/Icon/IconInbox";
import IconCpuBolt from "@/components/Icon/IconCpuBolt";
import IconBox from "@/components/Icon/IconBox";
import IconAirplay from "@/components/Icon/IconAirplay";
import config from '@/lib/config.json';
import {AddID, ConvertBinaryToText, GenerateUniqNumber, GetFormatCurrency, GetID, GetToken, RemoveDuplicateArray, WritePayload, WritePayloadRealtime, WritePayloadRealtimeRouter, get_branch_code, get_format_tanggal_jam, handleLogout, removeItemOnceArray } from "@/lib/global";
import RadialChart from "@/components/chart/RadialChart";
import IconTrendingUp from "@/components/Icon/IconTrendingUp";
import IconBell from "@/components/Icon/IconBell";
import IconLogout from "@/components/Icon/IconLogout";
import IconDownload from "@/components/Icon/IconDownload";
import IconArrowForward from "@/components/Icon/IconArrowForward";
import IconMenuComponents from "@/components/Icon/Menu/IconMenuComponents";
import { Gets } from "@/lib/get";
import RadialChartCustomAngle from "@/components/chart/RadialChartCustomAngle";
import BarChart from "@/components/chart/BarChart";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import IconChecks from "@/components/Icon/IconChecks";
import withReactContent from 'sweetalert2-react-content';
import DataTables from "@/components/table/DataTables";
import IconServer from "@/components/Icon/IconServer";
import IconSend from "@/components/Icon/IconSend";
import IconPrinter from "@/components/Icon/IconPrinter";
import IconInfoHexagon from "@/components/Icon/IconInfoHexagon";
import IconRefresh from "@/components/Icon/IconRefresh";
import IconSettings from "@/components/Icon/IconSettings";
import IconEye from "@/components/Icon/IconEye";
import IconArchive from "@/components/Icon/IconArchive";
import IconClock from "@/components/Icon/IconClock";
import { DecodeAES } from '../../../lib/global';
import { useTranslation } from "react-i18next";
import { isNull } from "lodash";

const Upload_Tokomain = () => {
    
    const MySwal = withReactContent(Swal);

    const [tabs, setTabs] = useState<string>('data_tokomain');
    const [tabsRB, setTabsRB] = useState<string>('traffic_interface');
    const [loading, setLoading] = useState(false);
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [IN_CMB_KODE_CABANG_DEVICE,setKODE_CABANG_DEVICE] = useState('');
    const [KODE_CABANGSyncRouter,setKODE_CABANGSyncRouter] = useState('');
    const [KODE_TOKOSyncRouter,setKODE_TOKOSyncRouter] = useState('');
    

    const [active, setActive] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    const isTidakBolehInsert = useRef(false);
    const [isValidasiDevice, setIsValidasiDevice] = useState(false);
    const [data_rows,setData_rows] = useState([]);
    const [data_rows_upload,setData_rows_Upload] = useState([]);
    const [data_rows_device,setData_rows_device] = useState([]);
    const [columns_device,setColumns_device] = useState([]);
    const [IN_CMB_DEVICE,setCmbDevice] = useState("");
    const [modal13, setModal13] = useState(false);
    const [Isinput, setIsinput] = useState(true);
    
    const [IN_DETAIL_KDCAB,setDetailKdcab] = useState({});
    const [IN_DETAIL_TOKO,setDetailKdtk] = useState('');
    const [IN_DETAIL_NAMA,setDetailNama] = useState('');
    const [IN_DETAIL_STATION,setDetailStation] = useState({});
    const [IN_DETAIL_IP,setDetailIP] = useState('');
    const [IN_DETAIL_KONEKSI,setDetailKoneksi] = useState({});
    const [IN_DETAIL_IS_INDUK,setDetailIsInduk] = useState('');
    const [isCheckedISInduk,setIsCheckedISInduk] = useState(false);
    const [IN_NAMA_TOKO,setNAMA_TOKO] = useState('');
    const [modal14, setModal14] = useState(false);
    const [modal15, setModal15] = useState(false);
    const [isMounted,setIsMounted] = useState(false);
    

    const [DataSeriesCPU,setDataSeriesCPU] = useState([]);
    const [DataLabelsCPU,setDataLabelsCPU] = useState([]);

    const [DataSeriesMemory,setDataSeriesMemory] = useState([]);
    const [DataLabelsMemory,setDataLabelsMemory] = useState([]);

    const [DataSeriesDiskUsage,setDataSeriesDiskUsage] = useState([]);
    const [DataLabelsDiskUsage,setDataLabelsDiskUsage] = useState([]);

    const [data_rows_processlist,setDataRowsProcesslist] = useState([]);
    const [data_columns_processlist,setDataColumnsProcesslist] = useState([]);
    const [loading_processlist, setLoadingProcesslist] = useState(false);
    const [progressbar_processlist, setProgressProcesslist] = useState('');

    const [OSName,setOSName] = useState('');
    const [Architecture,setArchitecture] = useState('');
    const [BootTime,setBootTime] = useState('');
    const [UpTime,setUpTime] = useState('');
    const [Suhu,setSuhu] = useState(0);

    const [SentBytes,setSentBytes] = useState('');
    const [ReceivedBytes,setReceivedBytes] = useState('');

    const [SentThroughput,setSentThroughput] = useState('');
    const [ReceivedThroughput,setReceivedThroughput] = useState('');

    const [LastsBootTime,setLastsBootTime] = useState('');
    const [Processor,setProcessor] = useState('');
    const [MemoryTerpasang,setMemoryTerpasang] = useState('');
    const [ParamCellValues,setParamCellValue] = useState([]);
    const [isDisabledReconnect,setisDisabledReconnect] = useState(true);

    const [HOST_API_EDP_HO,setHOST_API_EDP_HO] = useState('');
    const [PORT_API_EDP_HO,setPORT_API_EDP_HO] = useState('');
    const [options10,setOptions10] = useState([]);
    const [isLoadingOptionKodeToko,setisLoadingOptionKodeToko] = useState(false);
    const [IsVisibleButtonDownloadPreviewDeviceStation,setIsVisibleButtonDownloadPreviewDeviceStation] = useState('visible');

    const [data_rows_io_1,setdata_rows_io_1] = useState([]);
    const [data_rows_view_log,setdata_rows_view_log] = useState([]);
    const [DataColumnViewLog,setDataColumnViewLog] = useState([]);
    const [data_rows_routing,setdata_rows_routing] = useState([]);
    const [data_rows_service,setdata_rows_service] = useState([]);
    const [data_columns_io_1,setdata_columns_io_1] = useState([]);
    const [loading_io_1,setloading_io_1] = useState(false);
 
    const [progressbar_io_1,setprogressbar_io_1] = useState('');


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

    
    const [FreeHDDRouter,setFreeHDDRouter] = useState('0');
    const [TotalHDDRouter,setTotalHDDRouter] = useState('0');
    const [UsageHDDRouter,setUsageHDDRouter] = useState('0');
    const [ProsentaseUsageHDDRouter,setProsentaseUsageHDDRouter] = useState([]);

    const [RXByteRouter,setRXByteRouter] = useState('0');
    const [TXByteRouter,setTXByteRouter] = useState('0');

    const [RXPacketRouter,setRXPacketRouter] = useState('0');
    const [TXPacketRouter,setTXPacketRouter] = useState('0');

    const isDisabledKoneksi = useRef(1);
    
   

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
    const [DataSeriesCPU_Temp,setDataSeriesCPU_Temp] = useState([0]);

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

    const [data_rows_interface_bridge,setdata_rows_interface_bridge] = useState([]);
    const [DataColumnInterfaceBridge,setDataColumnInterfaceBridge] = useState([]);

    const [data_rows_ip_setting,setdata_rows_ip_setting] = useState([]);
    const [DataColumnIPSetting,setDataColumnIPSetting] = useState([]);

    const [data_rows_interface_wireless,setdata_rows_interface_wireless] = useState([]);
    const [DataColumnInterfaceWireless,setDataColumnInterfaceWireless] = useState([]);

    
    const [data_rows_netwatch,setdata_rows_netwatch] = useState([]);
    const [DataColumnNetwatch,setDataColumnNetwatch] = useState([]);

    const [data_rows_log_sync,setData_rows_log_sync] = useState([]);
    const [columns_log_sync,setColumns_log_sync] = useState([]);
    const [loading_log_sync,setLoading_log_sync] = useState(false);
    const stateConnect = useRef(0);
    const { t, i18n } = useTranslation();
    
    function CustomNoRowsOverlay() {
        return (
          <StyledGridOverlay>
            <svg
              style={{ flexShrink: 0 }}
              width="240"
              height="200"
              viewBox="0 0 184 152"
              aria-hidden
              focusable="false"
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(24 31.67)">
                  <ellipse
                    className="ant-empty-img-5"
                    cx="67.797"
                    cy="106.89"
                    rx="67.797"
                    ry="12.668"
                  />
                  <path
                    className="ant-empty-img-1"
                    d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                  />
                  <path
                    className="ant-empty-img-2"
                    d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                  />
                  <path
                    className="ant-empty-img-3"
                    d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                  />
                </g>
                <path
                  className="ant-empty-img-3"
                  d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                />
                <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                  <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                  <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                </g>
              </g>
            </svg>
            <Box sx={{ mt: 1 }}>No Rows</Box>
          </StyledGridOverlay>
        );
    }

    const StyledGridOverlay = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        '& .ant-empty-img-1': {
          fill: (theme as any).palette.mode === 'light' ? '#aeb8c2' : '#262626',
        },
      }));

    const toggleTabs = (name: string) => {
        setTabs(name);
    };


    const toggleTabsRB = (name: string,IN_IPStationSelected:string) => {
        setTabsRB(name);
        if(name === 'view_log'){
            const url = `http://${IN_HOST}:7321/ReportFromRouter/v1/ViewLog`;
            const param = {"IP":IN_IPStationSelected};
            const Token = GetToken();
            setLoadingViewLog(true);
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
            const Token = GetToken();
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
            const Token = GetToken();
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
            const Token = GetToken();
            setLoadingInterfaceBridge(true);
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
            const Token = GetToken();
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

    var options6 = [ { value: '', label: '-- Pilih Device --' },
                      { value: 'TIMBANGAN', label: 'TIMBANGAN' },
                      { value: 'ROUTER', label: 'ROUTER / MODEM VSAT / STB' },
                      { value: 'MESIN_KOPI', label: 'MESINKOPI' },
                      { value: 'EDCBCA', label: 'EDCBCA' },
                      { value: 'EDCMANDIRI', label: 'EDCMANDIRI' },
                      { value: 'DVR', label: 'DVR' },
                      { value: 'DVR2', label: 'DVR2' },
                      { value: 'PAJAK', label: 'PAJAK' },
                    ];

    var options7 = [ 
                    { value: '01', label: '01' },
                    { value: '02', label: '02' },
                    { value: '03', label: '03' },
                    { value: '04', label: '04' },
                    { value: '05', label: '05' },
                    { value: '06', label: '06' },
                    { value: '07', label: '07' },
                    { value: '08', label: '08' },
                    { value: '09', label: '09' },
                    { value: '10', label: '10' },
                    { value: '12', label: '12' },{ value: '22', label: '22' },
                    { value: 'I1', label: 'I1' },
                    //{ value: 'STB', label: 'STB' },
                    { value: 'TIMBANGAN', label: 'TIMBANGAN' },
                    //{ value: 'RBWDCP', label: 'RBWDCP' },
                    //{ value: 'RBKONEKSI', label: 'RBKONEKSI' },
                    //{ value: 'MODEMVSAT', label: 'MODEMVSAT' },
                    { value: 'MESINKOPI', label: 'MESINKOPI' },
                    { value: 'EDCBCA', label: 'EDCBCA' },
                    { value: 'EDCMANDIRI', label: 'EDCMANDIRI' },
                    { value: 'DVR', label: 'DVR' },
                    { value: 'DVR2', label: 'DVR2' },
                    { value: 'PAJAK', label: 'PAJAK' },
                  ];                
    var options8 = [ { value: '', label: '-- Pilih IS_Induk --' },
                  { value: '1', label: 'Ya' },
                  { value: '0', label: 'Tidak' }
                ];    
                
    var options9 = [ { value: '', label: '-- Pilih Koneksi --' },
                    { value: 'ASTINET', label: 'ASTINET' },
                    { value: 'FIBERSTAR', label: 'FIBERSTAR' },
                    { value: 'VSAT', label: 'VSAT' },
                    { value: 'GSM', label: 'GSM' },
                    { value: 'XL', label: 'XL' },
                    { value: 'ICON', label: 'ICON' },
                    { value: 'TSEL-HO', label: 'TSEL-HO' },
                    { value: 'FO LAIN', label: 'FO LAIN' }
    ];
    
    


    const userSelectDevice = (value: any) => {
        //console.log(value.value);
        if(value.length === 0){
            setCmbDevice('')
          
        }else{
            setCmbDevice(value.value);
           
        }
        if(value.value === 'ROUTER'){
            setisVisible(false);
            setisSyncText('Ambil Data');
            setIsVisibleButtonDownloadPreviewDeviceStation('invisible');
        }else{
            setisVisible(true);
            setisSyncText('Preview Device Station');
            setIsVisibleButtonDownloadPreviewDeviceStation('visible');
        }
    };


    const userSelectIS_INDUK = () => {
        setIsCheckedISInduk(!isCheckedISInduk)
        if(isCheckedISInduk === true){
            
        }else{

        }
    }

    const userSelectKodeCabang = (value: any) => {
        if(value.length == 0){
            setKODE_CABANG('')
        }else{
            //console.log('value : '+JSON.stringify(value));
            var arr_kode_cabang = "";
            for(var i = 0;i<value.length;i++){
                //console.log(value[i].value);
                if(i === (value.length - 1 )){
                    arr_kode_cabang = arr_kode_cabang+value[i].value;
                }else{
                    arr_kode_cabang = arr_kode_cabang+value[i].value+",";
                }
                
            }

            setKODE_CABANG(arr_kode_cabang);
        }
    };

    const userSelectKodeCabangSyncRouter = (value: any) => {
        if(value.length == 0){
            setKODE_CABANGSyncRouter('')
        }else{
            
            //console.log('value : '+JSON.stringify(value));
            var arr_kode_cabang = value.value;
            //console.log(arr_kode_cabang)
            setKODE_CABANGSyncRouter(arr_kode_cabang);
            //-- get api all toko by cabang --//
            const url = `http://${IN_HOST}:7321/store/v1/ViewCabang`;
            const param = {"kdcab":arr_kode_cabang};
            const Token = GetToken();

                setisLoadingOptionKodeToko(true)

                Posts(url,JSON.stringify(param),false,Token) .then(
                         (response) => {
                             const res_data = response;
                             var code = res_data.code;
                             var msg = res_data.msg;
                             let res_data_rows_body=[];
                             if(parseFloat(code) === 200){
                                var data_body = JSON.parse(res_data.data);
                                
                               
                                for(var b = 0;b<data_body.length;b++){
                                    var arr_content = {
                                            'value': data_body[b].toko,
                                            'label': data_body[b].toko+':'+data_body[b].nama
                                    };
                                    
                                    res_data_rows_body.push(arr_content);
                                }

                                // console.log(JSON.stringify(res_data_rows_body))

                                let new_arr: React.SetStateAction<any[]> = RemoveDuplicateArray(res_data_rows_body);

                                // var arr_semua = {
                                //     'value': '',
                                //     'label': '-- Semua --'
                                // };
                                // new_arr.unshift(arr_semua);

                                // console.log(JSON.stringify(new_arr))
                                setOptions10(new_arr);
                                setisLoadingOptionKodeToko(false)
                               
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
                        console.log(error.toString())
                        Swal.fire({
                            title: t("Warning"),
                            text: "Error mendapatkan data "+arr_kode_cabang+": Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        
                     }
                     
                );
        }
    };

    const userSelectKodeTokoSyncRouter = (value: any) => {
        if(value.length == 0){
            setKODE_TOKOSyncRouter('')
        }else{
            //console.log('value : '+JSON.stringify(value));
            var arr_kode_toko = value.value;
            //console.log(arr_kode_cabang)
            setKODE_TOKOSyncRouter(arr_kode_toko);
        }
    };

    

    const userSelectDetailKdcab = (value: any) => {
        
        if(value.length == 0){
            setDetailKdcab('')
        }else{
            const arr_kdcab = {
                value:value.value,
                label:value.value
            };
            setDetailKdcab(arr_kdcab);
        }
    };

    const userSelectKodeToko = (event: { target: { value: any; }; }) => {
        var kdtk = event.target.value;
        setDetailKdtk(kdtk);
    };

    const userSelectNamaToko = (event: { target: { value: any; }; }) => {
        var nama = event.target.value; 
        setDetailNama(nama);
    };

    const userSelectIP = (event: { target: { value: any; }; }) => {
        var ip = event.target.value; 
        setDetailIP(ip);
    };
    const userSelectKoneksi = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            setDetailKoneksi('')
        }else{
            const arr_koneksi = {
                value:value.value,
                label:value.value
            };
            setDetailKoneksi(arr_koneksi);
        }
    };

    const userSelectDetailStation = (value: any) => {
        
        if(value.length == 0){
            setDetailStation('')
        }else{
            const arr_station = {
                value:value.value,
                label:value.value
            };
            setDetailStation(arr_station);
        }
    };
    
    

    const columns = [
        { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
        { 
            field: 'EDIT', headerName: 'EDIT',  flex: 1,  width: 120, minWidth: 120, maxWidth: 120,
            renderCell: (cellValues: any) => {
                return (
                
                    <div className="grid grid-cols-3">
                    <div>
                       
                    <a onClick={() => {handleRowDetailClick(cellValues)}} >
                    <IconEdit className={"text-yellow-500 font-medium"} />
                    </a>
                    </div>
                    <div>
                    <a className="danger" onClick={() => {
                        handleRowDeleteClick(event, cellValues,data_rows_device);
                    }} >
                    
                    <IconTrash className={"text-red-900 font-medium"} />
                    </a>
                    </div>
                    <div>
                    <a className="danger" onClick={() => {
                        showDetailToko(cellValues);
                    }} >
                    
                    <IconCpuBolt className={"text-green-900 font-medium"} />
                    </a>
                    </div>
                    </div>
                      
                      

                );
            }
        },
       
        { field: 'KDCAB', headerName: 'KDCAB',flex: 1},
        { field: 'TOKO', headerName: 'TOKO',flex: 1},
        { field: 'NAMA', headerName: 'NAMA', flex: 1},
        { field: 'STATION', headerName: 'STATION',flex: 1},
        { field: 'IP', headerName: 'IP',  flex: 1 },
        { field: 'KONEKSI', headerName: 'KONEKSI', flex: 1},
        { field: 'IS_INDUK', headerName: 'IS_INDUK',  flex: 1}

    ];

    const columns_upload = [
        { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50,},
        { field: 'KDCAB', headerName: 'KDCAB',   width: 80, minWidth: 80, maxWidth: 90},
        { field: 'TOKO', headerName: 'TOKO',  width: 80, minWidth: 80, maxWidth: 90},
        { field: 'NAMA', headerName: 'NAMA',  flex: 1,width: 300, minWidth: 300, maxWidth: 300},
        { field: 'STATION', headerName: 'STATION', width: 70, minWidth: 70, maxWidth: 70},
        { field: 'IP', headerName: 'IP',  width: 150, minWidth: 150, maxWidth: 150},
        { field: 'KONEKSI', headerName: 'KONEKSI',  width: 120, minWidth: 80, maxWidth: 120},
        { field: 'IS_INDUK', headerName: 'IS_INDUK',  flex: 1, width: 70, minWidth: 70, maxWidth: 70}
    ];

    const [IN_HOST, setHOST] = useState('');
    const [IN_HOST_WS, setHOSTWS] = useState('');
    const ref = useRef(0);
    const refwdcp = useRef(0);
    const is_disconnect = useRef(1);
    const [isVisible,setisVisible] = useState(true);
    const [isSyncText,setisSyncText] = useState('Preview Device Station');
    const [options5,setOption5] = useState([])

    useEffect(() => {
        var rconfig = JSON.stringify(config);
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME;
        const res_host_ws = (config.api as any).HOSTNAME_WS;
        const res_host_api_edp_ho = (config.api as any).HOSTNAME_API_EDP_HO;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;
        const res_PORT_API_EDP_HO = (config.api as any).PORT_API_EDP_HO;

        setHOST(res_host);
        setHOSTWS(res_host_ws);
        setPORT_API_EDP_HO(res_PORT_API_EDP_HO);
        setHOST_API_EDP_HO(res_host_api_edp_ho);
        let arr_ = get_branch_code(false,false);
        setOption5(arr_)
         
        const handleRouteChange = (url:string) => {
            console.log(`App is changing to ${url}`)
            stateConnect.current = 0;
           
        }
        router.events.on('routeChangeStart',handleRouteChange)

        return ()=>{
            router.events.off('routeChangeStart',handleRouteChange)
        }
    
    },[]);

    const HandleClick = (idComponent:string) =>{
        const myExample = document.getElementById(idComponent);
        myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')
        
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
            try{
                const url = `http://${IN_HOST}:7321/store/v1/ViewCabang`;
                const param = {"kdcab":kdcab};
                const Token = GetToken();
                    setLoading(true);
                    Posts(url,JSON.stringify(param),false,Token) .then(
                             (response) => {
                                 const res_data = response;
                                 var code = res_data.code;
                                 var msg = res_data.msg;
                                 
                                 if(parseFloat(code) === 200){
                                    var data_body = JSON.parse(res_data.data);
                                    var res_data_rows_body: React.SetStateAction<any[]> = [];
                                    setData_rows(res_data_rows_body);
                                    for(var b = 0;b<data_body.length;b++){
                                       var arr_content = {
                                                   'id':(b+1),
                                                   'EDIT':'',
                                                   'KDCAB':data_body[b].kdcab,
                                                   'TOKO': data_body[b].toko,
                                                   'NAMA':data_body[b].nama,
                                                   'STATION':data_body[b].station,
                                                   'IP':data_body[b].ip,
                                                   'KONEKSI':data_body[b].koneksi,
                                                   'IS_INDUK':data_body[b].is_induk
                                       };
                                       res_data_rows_body.push(arr_content);
                                    }
                                    setData_rows(res_data_rows_body);
                                   
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
                                 setLoading(false);
                                 myExample.innerHTML = 'Filter';
                             }
                     ).catch(
                         (error) => {
                            Swal.fire({
                                title: t("Warning"),
                                text: "Error mendapatkan data "+kdcab+": Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            myExample.innerHTML = 'Filter';
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
                 myExample.innerHTML = 'Filter';
             }

             setLoading(false);
        }
    };

    

    const HandleClickDevice = () =>{
        const kdcab = IN_CMB_KODE_CABANG_DEVICE;
        if(kdcab === ''){
            Swal.fire({
                title: t("Warning"),
                text: t("Select Branch Code"),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }else{
            try{
                const url = `http://${IN_HOST}:7321/store/v1/ViewCabang`;
                const param = {"kdcab":kdcab};
                const Token = GetToken();
                setLoading(true);
                     Posts(url,JSON.stringify(param),false,Token) .then(
                             (response) => {
                                 const res_data = response;
                                 var code = res_data.code;
                                 var msg = res_data.msg;
                                 if(parseFloat(code) === 200){
                                    var data_body = JSON.parse(res_data.data);
                                    var res_data_rows_body: React.SetStateAction<any[]> = [];
                                    setData_rows_device(res_data_rows_body);
                                    for(var b = 0;b<data_body.length;b++){
                                       var arr_content = {
                                                   'id':(b+1),
                                                   'EDIT':'',
                                                   'KDCAB':data_body[b].kdcab,
                                                   'TOKO': data_body[b].toko,
                                                   'NAMA':data_body[b].nama,
                                                   'STATION':data_body[b].station,
                                                   'IP':data_body[b].ip
                                       };
                                       res_data_rows_body.push(arr_content);
                                    }
                                    setData_rows_device(res_data_rows_body);
                                   
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
                                 setLoading(false);
                             }
                     ).catch(
                         (error) => alert(error)
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

             setLoading(false);
        }
    };

    const handleDelRowDevice = (cellValues:any, data_prev:any) =>{
        var kdcab = "";
        var toko = "";
        var nama = "";
        var station = "";
        var row_id = "";
        var ip = "";
        //console.log('cellValues : '+cellValues)
        try{
            kdcab =  cellValues.row.KDCAB;
            toko =  cellValues.row.TOKO;
            nama =  cellValues.row.NAMA;
            station = cellValues.row.STATION;
            row_id = cellValues.row.id;
            ip = cellValues.row.IP;
        }catch(Ex){
            kdcab =  cellValues.row.KDCAB;
            toko =  cellValues.KDTK;
            nama =  cellValues.row.NAMA;
            station = cellValues.STATION;
            row_id = cellValues.id;
            ip = cellValues.row.IP;
        }
        const objIndex = data_prev.findIndex(((obj: { id: any; }) => obj.id == row_id));
        //console.log('objIndex : '+objIndex);
        const idx = objIndex+1;
        var rows = data_prev;
        const copyWithoutFirstElement = rows.slice(idx);
        //console.log('rows : '+JSON.stringify(copyWithoutFirstElement));
        setData_rows_device(copyWithoutFirstElement);
        MySwal.fire({
            title: "Sukses Delete Data : "+kdcab+":"+toko+":"+station+":"+ip,
            toast: true,
            position: isRtl ? 'top-start' : 'top-end',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
            customClass: {
                popup: `color-success`,
            },
        });
    }
    
    
    const handlePreviewFile = (tipe:string,tipe_element_csv:string) => {
        if(isSyncText === 'Preview Device Station'){
            try{
                const reader = new FileReader();
                reader.onload = () => {
                    // @ts-ignore
                    var hasil = ""+reader.result;
                    var sp_record = hasil.split('\n');
                    var rows: React.SetStateAction<any[]> = [];
                    
                    if(tipe === 'tokomain')
                    {
                        setData_rows_Upload([]);
                        try{
                            for(var i = 1;i<sp_record.length;i++){
                            
                                const sp_field = sp_record[i].split(',');
                                const id = i;
                                try{
                                    const res_kdcab = sp_field[0];
                                    const res_kdtk = sp_field[1];
                                    const res_nama = sp_field[2];
                                    let res_replace_station = '';
                                    const res_station = sp_field[3].split('\r').join('').split('\r\n').join('').split('\n').join('').split("'").join('');
                                    if(res_station.toString().length === 1){
                                        res_replace_station = '0'+res_station;
                                    }else{
                                        res_replace_station = res_station;
                                    }
                                  
                                    const res_ip = sp_field[4].split('\r').join('').split('\r\n').join('').split('\n').join('').split("'").join('');;
                                    const res_koneksi = sp_field[5].split('\r').join('').split('\r\n').join('').split('\n').join('').split("'").join('');;
                                    const res_is_induk = sp_field[6].split('\r').join('').split('\r\n').join('').split('\n').join('').split("'").join('');;
                                    
                                    
                
                                    var arr_content = {
                                                        'id': id,           
                                                        'KDCAB':res_kdcab,
                                                        'TOKO':res_kdtk,
                                                        'NAMA':res_nama,
                                                        'STATION': res_replace_station,
                                                        'IP':res_ip,
                                                        'KONEKSI':res_koneksi,
                                                        'IS_INDUK':res_is_induk,
                                                    };
            
                                    if(res_kdcab === '' || res_kdtk === ''|| res_nama === ''|| res_replace_station === '' || res_ip === '' || res_is_induk === ''){
            
                                    }else{
                                        rows.push(arr_content); 
                                    }       
                                }catch(Ex){

                                }
                                       
                                
                            }
                            setData_rows_Upload(rows);
                        }catch(Ex){
                            MySwal.fire({
                                title: "Error : "+Ex.toString(),
                                toast: true,
                                position: isRtl ? 'top-start' : 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                showCloseButton: true,
                                customClass: {
                                    popup: `color-danger`,
                                },
                            });
                        }
                        
                    }
                    else
                    {
                        setData_rows_device([]);
                        for(var i = 1;i<sp_record.length;i++){
                        
                            const sp_field = sp_record[i].split(',');
                            const id = i;
                            const res_kdcab = sp_field[0];
                            const res_kdtk = sp_field[1];
                            const res_nama = sp_field[2];
                            const res_ip = sp_field[3];
                            const res_koneksi = sp_field[4];
        
                            var arr_content_device = {
                                                'id': id,        
                                                'KDCAB':res_kdcab,
                                                'TOKO':res_kdtk,
                                                'NAMA':res_nama,
                                                'STATION': IN_CMB_DEVICE,
                                                'IP':res_ip,
                                                'KONEKSI':res_koneksi,
                                                'IS_INDUK':"0",
                                            };
    
                            if(res_kdcab === '' || res_kdtk === ''|| res_nama === ''){
                
                            }else{
                                rows.push(arr_content_device);
                            }
                            
                            
                            
                        }
                        setData_rows_device(rows);
    
                        const columns_device = [
                            { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
                            { field: 'KDCAB', headerName: 'KDCAB',   width: 80, minWidth: 80, maxWidth: 90},
                            { field: 'TOKO', headerName: 'TOKO',  width: 80, minWidth: 80, maxWidth: 90},
                            { field: 'NAMA', headerName: 'NAMA',  width: 200, minWidth: 200, maxWidth: 200},
                            { field: 'STATION', headerName: 'STATION',  width: 200, minWidth: 200, maxWidth: 200},
                            { field: 'IP', headerName: 'IP',  width: 150, minWidth: 150, maxWidth: 150},
                            { 
                                field: 'KONEKSI', headerName: 'KONEKSI',  width: 200, minWidth: 200, maxWidth: 200,
                            },
                        ];
    
                        setColumns_device(columns_device);
                    }
                    
                };
                // start reading the file. When it is done, calls the onload event defined above.
                // @ts-ignore
                reader.readAsBinaryString(document.getElementById(tipe_element_csv).files[0]);
               
            }catch(Ex){
                Swal.fire({
                    title: t("Warning"),
                    text: "Error : "+Ex.toString(),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }

        //-- SYNC DATA FROM API EDP HO --//    
        }else{
            isDisabledKoneksi.current = 1;
            const kdcab_for_sync = KODE_CABANGSyncRouter; 
            //console.log('kdcab_for_sync : '+kdcab_for_sync);
            const kdtk_for_sync = KODE_TOKOSyncRouter; 
            //console.log('kdcab_for_sync : '+kdcab_for_sync);
            var is_tipe = 'cabang';
            var is_value = kdcab_for_sync;
            if(kdtk_for_sync === ''){
                is_tipe = 'cabang';
                is_value = kdcab_for_sync;
            }else{
                is_tipe = 'toko';
                is_value = kdtk_for_sync;
            }

            const myExample = document.getElementById('btn_filter');
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')
            const url = `http://${HOST_API_EDP_HO}:${PORT_API_EDP_HO}/koneksiservice/${is_tipe}/${is_value}`;
            setLoading(true);
            Gets(url,false,false).then(
                (response) => {
                    const ubah_json = JSON.stringify(response);
                    const res_data = JSON.parse(ubah_json);
                    var success = res_data.success;
                    setData_rows_device([]);
                    if(success){
                        var rows: React.SetStateAction<any[]> = [];
                        var data = res_data.data;
                        for(var i = 0;i<data.length;i++){
                            let res_kodetoko = (data[i].kodetoko) as string;
                            let res_namatoko = (data[i].namatoko) as string;
                            let res_koneksiutama = (data[i].koneksiutama) as string;
                            let res_iputama = (data[i].iputama) as string;
                            let res_ipwdcp = (data[i].ipwdcp) as string;
                            let res_ipstb = (data[i].ipstb) as string;
                            if((isNull(res_iputama)) || (res_iputama.toString().length <= 1)){
                                    MySwal.fire({
                                        title: t('There is IP not Valid on device station')+' ipkoneksi : '+res_kodetoko+'-'+res_namatoko,
                                        toast: true,
                                        position: isRtl ? 'top-start' : 'top-end',
                                        showConfirmButton: false,
                                        timer: 10000,
                                        showCloseButton: true,
                                        customClass: {
                                            popup: `color-warning`,
                                        },
                                    }); 
                            }else if( (isNull(res_ipwdcp)) || (res_ipwdcp.toString().length <= 1)){
                                    MySwal.fire({
                                        title: t('There is IP not Valid on device station')+' ipwdcp : '+res_kodetoko+'-'+res_namatoko,
                                        toast: true,
                                        position: isRtl ? 'top-start' : 'top-end',
                                        showConfirmButton: false,
                                        timer: 10000,
                                        showCloseButton: true,
                                        customClass: {
                                            popup: `color-warning`,
                                        },
                                    }); 
                            }else if((isNull(res_ipstb)) || (res_ipstb.toString().length <= 1)){
                                    MySwal.fire({
                                        title: t('There is IP not Valid on device station')+' ipstb : '+res_kodetoko+'-'+res_namatoko,
                                        toast: true,
                                        position: isRtl ? 'top-start' : 'top-end',
                                        showConfirmButton: false,
                                        timer: 10000,
                                        showCloseButton: true,
                                        customClass: {
                                            popup: `color-warning`,
                                        },
                                    }); 
                            }

                            let res_ipmodemvsat = '';
                            if(res_koneksiutama.includes('VSAT') || res_koneksiutama.includes('Vsat')){
                                res_ipmodemvsat = res_iputama;
                                var arr_content_device1 = {
                                    'id': GenerateUniqNumber(),
                                    'EDIT':'',        
                                    'KDCAB':kdcab_for_sync,
                                    'TOKO':res_kodetoko,
                                    'NAMA':res_namatoko,
                                    'STATION': 'MODEMVSAT',
                                    'IP':res_ipmodemvsat,
                                    'KONEKSI':res_koneksiutama,
                                    'IS_INDUK':"0",
                                };
    
                                rows.push(arr_content_device1);
                            }else{
                                var arr_content_device1 = {
                                    'id': GenerateUniqNumber(),
                                    'EDIT':'',        
                                    'KDCAB':kdcab_for_sync,
                                    'TOKO':res_kodetoko,
                                    'NAMA':res_namatoko,
                                    'STATION': 'RBKONEKSI',
                                    'IP':res_iputama,
                                    'KONEKSI':res_koneksiutama,
                                    'IS_INDUK':"0",
                                };
    
                                rows.push(arr_content_device1);
                            }

                            var arr_content_device = {
                                'id': GenerateUniqNumber(),
                                'EDIT':'',     
                                'KDCAB':kdcab_for_sync,
                                'TOKO':res_kodetoko,
                                'NAMA':res_namatoko,
                                'STATION': 'RBWDCP',
                                'IP':res_ipwdcp,
                                'KONEKSI':res_koneksiutama,
                                'IS_INDUK':"0",
                            };
                            rows.push(arr_content_device);

                            var arr_content_device2 = {
                                'id': GenerateUniqNumber(),
                                'EDIT':'',     
                                'KDCAB':kdcab_for_sync,
                                'TOKO':res_kodetoko,
                                'NAMA':res_namatoko,
                                'STATION': 'STB',
                                'IP':res_ipstb,
                                'KONEKSI':res_koneksiutama,
                                'IS_INDUK':"0",
                            };
                            rows.push(arr_content_device2);
                        }
                        setData_rows_device(rows);
                        setLoading(false);
                    }else{
                        setData_rows_device([]);
                        Swal.fire({
                            title: t("Warning"),
                            text: "Error mendapatkan data ip router, Silahkan hubungi administrator!",
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false);
                    }
                    
                    const columns_device = [
                        { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
                        { 
                            field: 'EDIT', headerName: 'EDIT',  width: 120, minWidth: 120, maxWidth: 120,
                            renderCell: (cellValues: any) => {
                                return (
                                    <div className="grid grid-cols-3 gap-1">
                                       
                                             
                                        <div>
                                            <a id={'btn_edit_'+cellValues.id}
                                                onClick={() => {
                                                    handleDelRowDevice(cellValues,rows);
                                            }} >
                                            
                                                <IconTrash className={"text-red-500 font-medium"} />
                                            </a>
                                        </div>

                                        <div>
                                            <a id={'btn_check_'+cellValues.id} style={{display: "none"}}
                                                onClick={() => {
                                                   
                                            }} >
                                            
                                                <IconChecks className={"text-green-500 font-medium"} />
                                            </a>
                                        </div>
                                        
                                       

                                       
                                    </div>
                                );
                            }
                        },
                        { field: 'KDCAB', headerName: 'KDCAB',   width: 80, minWidth: 80, maxWidth: 90},
                        { field: 'TOKO', headerName: 'TOKO',  width: 80, minWidth: 80, maxWidth: 90},
                        { field: 'NAMA', headerName: 'NAMA',  width: 200, minWidth: 200, maxWidth: 200},
                        { field: 'STATION', headerName: 'STATION',  width: 100, minWidth: 100, maxWidth: 100},
                        { field: 'IP', headerName: 'IP',  width: 200, minWidth: 200, maxWidth: 200},
                        { field: 'KONEKSI', headerName: 'KONEKSI',  width: 200, minWidth: 200, maxWidth: 200},
                    ];

                    setColumns_device(columns_device);
                    myExample.innerHTML = 'Ambil Data'; 
                }
            ).catch((error) => {
                myExample.innerHTML = 'Ambil Data';
                Swal.fire({
                    title: t("Warning"),
                    text: "Error GET Data: "+error.toString(),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }); 
        }
        
       
    }


    const handleValidasiTokomain = (in_data_rows:any) =>{
        try{
            const p = in_data_rows.length;
            var is_induk_dalam_satu_toko = false;
            var is_validasi = false;
            var res_kdtk = "";
            var res_is_induk = "";
            
            for(var i = 0;i<p;i++){
                const panjang_kdcab = in_data_rows[i].KDCAB.length;
                const panjang_kdtk = in_data_rows[i].TOKO.length;
                const panjang_station = in_data_rows[i].STATION.length;
                
                var IN_KDTK = in_data_rows[i].TOKO.split('\r').join('').split('\n').join('').split(' ').join('').trim();
                var IN_IS_INDUK = in_data_rows[i].IS_INDUK.split('\r').join('').split('\n').join('').split(' ').join('').trim();
                var ip = in_data_rows[i].IP.split('\r').join('').split('\n').join('').split(' ').join('').trim();

                if(panjang_kdcab === 4){
                    console.log('panjang kdcab : OK')
                    if(panjang_kdtk === 4){
                        console.log('panjang kdtk : OK')
                        if(panjang_station > 4 || panjang_station === 0 || panjang_station === 1){
                            const pesan = 'Panjang Station Tidak Sesuai pada toko : '+IN_KDTK+" - IP : "+ip+'. Apabila anda ingin melakukan input Station RBWDCP,RBKONEKSI,MODEMVSAT dan STB, Lakukan Proses Sync Device';
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+pesan,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            isTidakBolehInsert.current = true
                            break;
                        }else{
                            //-- cek is induk dalam 1 toko --//
                            if(IN_KDTK == res_kdtk){
                                // const objIndex = in_data_rows.findIndex(((obj: { KDTK: any; }) => obj.KDTK == IN_KDTK));
                                // console.log('found : '+objIndex);
                                if(IN_IS_INDUK === '1'){
                                    if(IN_IS_INDUK === res_is_induk){
                                        is_induk_dalam_satu_toko = true;
                                        isTidakBolehInsert.current = true
                                        const pesan = 'Tidak boleh ada IS_INDUK lebih dari 1 station dalam 1 toko';
                                        Swal.fire({
                                            title: t("Warning"),
                                            text: ""+pesan,
                                            icon: "warning",
                                            padding: '2em',
                                            customClass: 'sweet-alerts'
                                        });
                                        break;
                                    }else{
                                        is_induk_dalam_satu_toko = false
                                        isTidakBolehInsert.current = true
                                        //console.log('row : '+i+' is_induk_dalam_satu_toko : '+is_induk_dalam_satu_toko+' - '+IN_IS_INDUK+'  VS '+res_is_induk+' kondisi 2')
                                    }
                                    res_is_induk = IN_IS_INDUK;
                                }else{
                                    is_induk_dalam_satu_toko = false;
                                    isTidakBolehInsert.current = false
                                    //console.log('row : '+i+' is_induk_dalam_satu_toko : '+is_induk_dalam_satu_toko+' - '+IN_IS_INDUK+'  VS '+res_is_induk+' kondisi 3')
                                }
                                
                            }else{
                                is_induk_dalam_satu_toko = false;
                                res_is_induk = IN_IS_INDUK;
                                isTidakBolehInsert.current = false
                                //console.log('row : '+i+' is_induk_dalam_satu_toko : '+is_induk_dalam_satu_toko+' - '+IN_IS_INDUK+'  VS '+res_is_induk+' kondisi 4')
                            }
                            res_kdtk = IN_KDTK;
                        }
                    }else{
                        console.log('panjang kdtk : NOK')
                        const pesan = 'Panjang Kode Toko Tidak Sesuai pada toko : '+IN_KDTK+" - IP : "+ip;
                        Swal.fire({
                            title: t("Warning"),
                            text: ""+pesan,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        is_validasi = false;
                        isTidakBolehInsert.current = true
                        break;
                    }
                }else{
                    console.log('panjang kdcab : NOK')
                    const pesan = 'Panjang Kode Cabang Tidak Sesuai pada toko : '+IN_KDTK+" - IP : "+ip;
                    Swal.fire({
                        title: t("Warning"),
                        text: ""+pesan,
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    isTidakBolehInsert.current = true
                    break;
                }
            }
        }catch(Ex){
           console.log(Ex.toString())
        }
    }

    const handleUploadTokomain = (in_data_rows:any,in_type:string)=>{
        try{
            Swal.fire({
                title: t("Are you sure for")+" do "+in_type+"?",
                showDenyButton: true,
                icon: "question",
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    handleValidasiTokomain(in_data_rows);
                    if(isTidakBolehInsert.current === true){
                        
                    }else{
                        const url = `http://${IN_HOST}:7321/store/v1/UpdateTokoMain`;

                        var menu = DecodeAES(localStorage.getItem('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
                        const data_menu_local = JSON.parse(menu)
                        const nik = data_menu_local.nik;
                        var rows_param = [];
                        for(var a = 0;a<in_data_rows.length;a++){
                            const arr_param =   {
                                "user": nik,
                                "ip": in_data_rows[a].IP,
                                "is_induk": in_data_rows[a].IS_INDUK,
                                "kdcab":  in_data_rows[a].KDCAB.toString().toUpperCase(),
                                "koneksi": in_data_rows[a].KONEKSI,
                                "nama":  in_data_rows[a].NAMA.toString().toUpperCase(),
                                "recid": "",
                                "station":  in_data_rows[a].STATION,
                                "toko":  in_data_rows[a].TOKO.toString().toUpperCase(),
                            };
                            rows_param.push(arr_param);
                        }
                        const param =  rows_param;
                        console.log('param : '+JSON.stringify(param));
                        //-- akses validasi CheckTokoMainDevice --//
                        const url_cek_device = `http://${IN_HOST}:7321/store/v1/CheckTokoMainDevice`
                        const Token = GetToken();
                        Posts(url_cek_device,JSON.stringify(param),false,Token).then((respon_cek_device) => {
                            const res_cek_data_device = respon_cek_device;
                            var cek_device_code = res_cek_data_device.code;
                            var cek_device_msg = res_cek_data_device.msg;
                            var cek_device_data = JSON.parse(res_cek_data_device.data)
                            const ubah_json = JSON.stringify(cek_device_data);

                          
                            
                            if(cek_device_code === 200){
                                const p = JSON.parse(ubah_json)
                                const data_con = p[0].toko+'-'+p[0].nama+'-'+p[0].station
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+cek_device_code+"-"+cek_device_msg+'->'+data_con,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                })
                            }else{
                                // -- akses validasi CheckTokomain - -//
                                const url_cek = `http://${IN_HOST}:7321/store/v1/CheckTokoMain`
                                Posts(url_cek,JSON.stringify(param),false,Token).then((response_cek) => {
                                    // setData(response)
                                    const res_cek_data = response_cek;
                                    var cek_code = res_cek_data.code;
                                    var cek_msg = res_cek_data.msg;
                                    console.log(cek_code+'-'+cek_msg)
                                    if(cek_code === 200){
                                        Swal.fire({
                                            icon: "question",
                                            title: t("Confirmation"),
                                            text: ""+cek_msg+", "+t("Are you sure for")+" update data ?",
                                            showDenyButton: true,
                                            confirmButtonText: "Ya",
                                            denyButtonText: "Tidak",
                                            padding: '2em',
                                            customClass: 'sweet-alerts'
                                        }).then((result) => {
                                            
                                            if (result.isConfirmed) {
                                                Posts(url,JSON.stringify(param),false,Token) .then(
                                                        (response) => {
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
                                                                
                                                            }else if(code.toString().substring(0,1) === '4'){
                                                                
                                                                Swal.fire({
                                                                    title: t("Warning"),
                                                                    text: ""+parseFloat(code)+"-"+msg,
                                                                    icon: "warning",
                                                                    padding: '2em',
                                                                    customClass: 'sweet-alerts'
                                                                });
                
                                                                if(msg.includes('Token')){
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
                                                    (error) => alert(error)
                                                );   
                                            }
                                        });
                                    }else{
                                        Posts(url,JSON.stringify(param),false,Token) .then(
                                                (response) => {
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
                                                        
                                                    }else if(code.toString().substring(0,1) === '4'){
                                                        
                                                        Swal.fire({
                                                            title: t("Warning"),
                                                            text: ""+parseFloat(code)+"-"+msg,
                                                            icon: "warning",
                                                            padding: '2em',
                                                            customClass: 'sweet-alerts'
                                                        });

                                                        if(msg.includes('Token')){
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
                                            (error) => alert(error)
                                        );       
                                    }
                                });
                                
                            }

                        }).catch(
                            (error) => 
                                Swal.fire({
                                    title: t("Warning"),
                                    text: "Error : "+error.toString(),
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                })
                        ); 
                    }  
                } else if (result.isDenied) {
                  const res_msg = Isinput ? 'input' : 'upload';
                  //Swal.fire("Baik, silahkan atur ulang data yang akan di "+res_msg+". Terimakasih!", "", "info");
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
    }

    const handleValidasiDevice = (in_data_rows:any)=>{
        try{
            //console.log('in_data_rows : '+JSON.stringify(in_data_rows));
            //console.log('IN_CMB_DEVICE : '+IN_CMB_DEVICE);
            var is_validasi_device = false;
            if(IN_CMB_DEVICE === ''){
                is_validasi_device = true;
                //console.log('kondisi 1');
                setIsValidasiDevice(true);
            }else{
                is_validasi_device = false;
                //console.log('kondisi 2');
                setIsValidasiDevice(false);
            }
           
        }catch(Ex){

        }
    }

    const handleUploadDevice = (in_data_rows:any)=>{
        const myExample = document.getElementById('btn_upload_device');
        myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait');
        try{
                Swal.fire({
                    title: t("Are you sure for")+" upload data?",
                    icon: "question",
                    showDenyButton: true,
                    confirmButtonText: "Ya",
                    denyButtonText: "Tidak",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        if(IN_CMB_DEVICE === ''){
                            Swal.fire({
                                title: t("Warning"),
                                text: t("you must selected type device before upload"),
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            myExample.innerHTML = t('Upload Device Station')
                        }else{
                            const url = `http://${IN_HOST}:7321/store/v1/UpdateTokoMain`;
                            var menu = DecodeAES(localStorage.getItem('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
                            const data_menu_local = JSON.parse(menu)
                            const nik = data_menu_local.nik;
                            var rows_param = [];
                            for(var l = 0;l<in_data_rows.length;l++){
                                try{
                                    let station_from_api =  in_data_rows[l].STATION.split('\r').join('').split('\n').join('').split('\r\n').join('')
                                    let toko_from_api = in_data_rows[l].TOKO.split('\r').join('').split('\n').join('').split('\r\n').join('').toString().toUpperCase()
                                    let nama_from_api = (in_data_rows[l].NAMA === '' ? '' : in_data_rows[l].NAMA.split('\r').join('').split('\n').join('').split('\r\n').join('')).toString().toUpperCase()
                                    let ip_from_api = in_data_rows[l].IP.split('\r').join('').split('\n').join('').split('\r\n').join('')
                                  
                                            const arr_param =   {
                                                "user": nik,
                                                "ip": (in_data_rows[l].IP === '' ? '' : in_data_rows[l].IP.split('\r').join('').split('\n').join('').split('\r\n').join('')),
                                                "is_induk": "0",
                                                "kdcab":  in_data_rows[l].KDCAB.split('\r').join('').split('\n').join('').split('\r\n').join('').toString().toUpperCase(),
                                                "koneksi": in_data_rows[l].KONEKSI,
                                                "nama": nama_from_api,
                                                "recid": "",
                                                "station":  station_from_api,
                                                "toko":  toko_from_api,
                                            };
                                            rows_param.push(arr_param);
                                    
                                   
                                }catch(Ex){

                                }
                            }
                            const param =  rows_param;
                            //console.log('param : '+JSON.stringify(param));
                            //console.log('url : '+url);
                            const Token = GetToken();
                            //-- akses validasi CheckTokoMainDevice --//
                            const url_cek_device = `http://${IN_HOST}:7321/store/v1/CheckTokoMainDevice`
                            Posts(url_cek_device,JSON.stringify(param),false,Token).then((respon_cek_device) => {
                                const res_cek_data_device = respon_cek_device;
                                var cek_device_code = res_cek_data_device.code;
                                var cek_device_msg = res_cek_data_device.msg;
                                var cek_device_data = JSON.parse(res_cek_data_device.data)
                                const ubah_json = JSON.stringify(cek_device_data);

                                if(cek_device_code === 200){
                                    const p = JSON.parse(ubah_json)
                                    const data_con = p[0].toko+'-'+p[0].nama+'-'+p[0].station
                                    Swal.fire({
                                        title: t("Warning"),
                                        text: ""+cek_device_code+"-"+cek_device_msg+'->'+data_con,
                                        icon: "warning",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    })
                                    myExample.innerHTML = t('Upload Device Station')
                                }else if(cek_device_code.toString().substring(0,1) === '4'){
                                    Swal.fire({
                                        title: t("Warning"),
                                        text: ""+cek_device_code+"-"+cek_device_msg,
                                        icon: "warning",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    })
                                    if(cek_device_msg.includes('Token')){
                                        handleLogout();
                                    }
                                    myExample.innerHTML = t('Upload Device Station')
                                }else{
                                    //console.log('kondisi 1')
                                    // -- akses validasi CheckTokomain - -//
                                    const url_cek = `http://${IN_HOST}:7321/store/v1/CheckTokoMain`
                                    Posts(url_cek,JSON.stringify(param),false,Token).then((response_cek) => {
                                        // setData(response)
                                        const res_cek_data = response_cek;
                                        var cek_code = res_cek_data.code;
                                        var cek_msg = res_cek_data.msg;
                                        console.log(cek_code+'-'+cek_msg)
                                        if(cek_code === 200){
                                            Swal.fire({
                                                icon: "question",
                                                title: t("Confirmation"),
                                                text: ""+cek_msg+", "+t("Are you sure for")+" upload data ?",
                                                showDenyButton: true,
                                                confirmButtonText: "Ya",
                                                denyButtonText: "Tidak",
                                                padding: '2em',
                                                customClass: 'sweet-alerts'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
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
                                                                            myExample.innerHTML = t('Upload Device Station')
                                                                        }else if(code.toString().substring(0,1) === '4'){
                                                                            
                                                                            Swal.fire({
                                                                                title: t("Warning"),
                                                                                text: ""+parseFloat(code)+"-"+msg,
                                                                                icon: "warning",
                                                                                padding: '2em',
                                                                                customClass: 'sweet-alerts'
                                                                            });
                                                                            if(msg.includes('Token')){
                                                                                handleLogout();
                                                                            }
                                                                            myExample.innerHTML = t('Upload Device Station')
                                                                        
                                                                        }else{
                                                                            Swal.fire({
                                                                                title: t("Warning"),
                                                                                text: ""+parseFloat(code)+"-"+msg,
                                                                                icon: "warning",
                                                                                padding: '2em',
                                                                                customClass: 'sweet-alerts'
                                                                            });
                                                                            myExample.innerHTML = t('Upload Device Station')
                                                                        } 
                                                                    }
                                                            ).catch(
                                                                (error) => {
                                                                Swal.fire({
                                                                    title: t("Warning"),
                                                                    text: "Error Upload : "+error+"!",
                                                                    icon: "warning",
                                                                    padding: '2em',
                                                                    customClass: 'sweet-alerts'
                                                                });
                                                                myExample.innerHTML = t('Upload Device Station') 
                                                                }
                                                        );
                                                        
                                                        
                                                }
                                            });
                                        }else{
                                            Posts(url,JSON.stringify(param),false,Token) .then(
                                                    (response) => {
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
                                                            myExample.innerHTML = t('Upload Device Station')
                                                        }else if(code.toString().substring(0,1) === '4'){
                                                            
                                                            Swal.fire({
                                                                title: t("Warning"),
                                                                text: ""+parseFloat(code)+"-"+msg,
                                                                icon: "warning",
                                                                padding: '2em',
                                                                customClass: 'sweet-alerts'
                                                            });

                                                            if(msg.includes('Token')){
                                                                handleLogout();
                                                            }
                                                            myExample.innerHTML = t('Upload Device Station')
                                                        }else{
                                                            Swal.fire({
                                                                title: t("Warning"),
                                                                text: ""+parseFloat(code)+"-"+msg,
                                                                icon: "warning",
                                                                padding: '2em',
                                                                customClass: 'sweet-alerts'
                                                            });
                                                            myExample.innerHTML = t('Upload Device Station')
                                                        } 
                                                    }
                                            ).catch(
                                                (error) => {
                                                    console.log(error)
                                                    myExample.innerHTML = t('Upload Device Station')
                                                }
                                                
                                            );       
                                        }
                                    });
                                }
                            });
                        }

                    } else if (result.isDenied) {
                        //Swal.fire("Baik, silahkan atur ulang data yang akan di upload. Terimakasih!", "", "info");
                        myExample.innerHTML = t('Upload Device Station')
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
            myExample.innerHTML = t('Upload Device Station')
        }
    }

    const handleRowDeleteClick = (event :any, cellValues:any,data_prev:any)=>{
        try{
            Swal.fire({
                title: t("Are you sure for")+" "+t("delete data")+" ?",
                showDenyButton: true,
                icon: "question",
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const url = `http://${IN_HOST}:7321/store/v1/RemoveToko`;
                    const param =  {
                                        "ip":cellValues.row.IP.toString().split('\r').join('').split('\n').join(''),
                                        "kdcab":cellValues.row.KDCAB.toString().split('\r').join('').split('\n').join(''),
                                        "station":cellValues.row.STATION.toString().split('\r').join('').split('\n').join(''),
                                        "toko":cellValues.row.TOKO.toString().split('\r').join('').split('\n').join(''),
                                    }; 
                    console.log(JSON.stringify(param));        
                    const Token = GetToken();                                
                    Posts(url,JSON.stringify(param),false,Token).then(
                                (response) => {
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
                                        HandleClick('btn_filter');
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
                                    text: "Eror : "+error.toString(),
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                            }
                        );
                }else if(result.isDenied){
                    
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
    }

    const handleRowDetailClick = (cellValues:any)=>{
        if(cellValues === ''){
            setModal13(true);
            setIsinput(true);
            setDetailKdcab('');
            setDetailKdtk('');
            setDetailNama('');
            setDetailStation('');
            setDetailIP('');
            setDetailKoneksi('');
            setDetailIsInduk('');
            setIsCheckedISInduk(false);
        }else{
            try{
           
                if(cellValues.row.STATION === 'RBWDCP' || cellValues.row.STATION === 'RBKONEKSI' || cellValues.row.STATION === 'STB' || cellValues.row.STATION === 'MODEMVSAT'){
                    Swal.fire({
                        icon: "question",
                        title: t("Confirmation"),
                        text: t("This station only can be sync through device station menu, Are you sure for updated")+"?",
                        showDenyButton: true,
                        confirmButtonText: "Ya",
                        denyButtonText: "Tidak",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            toggleTabs('upload_device_station')
                            MySwal.fire({
                                title: t('OK, I will bring you on device stastion menu":"OK, I will bring you on device stastion menu'),
                                toast: true,
                                position: isRtl ? 'top-start' : 'top-end',
                                showConfirmButton: false,
                                timer: 10000,
                                showCloseButton: true,
                                customClass: {
                                    popup: `color-success`,
                                },
                            });
                        }
                    });
                    
                    
                }else{
                    setModal13(true);
                    console.log('cellValues : '+cellValues)
                    if(cellValues === ''){
                        setIsinput(true);
                        setDetailKdcab('');
                        setDetailKdtk('');
                        setDetailNama('');
                        setDetailStation('');
                        setDetailIP('');
                        setDetailKoneksi('');
                        setDetailIsInduk('');
                        setIsCheckedISInduk(false);
                    }else{
                        setIsinput(false);
                        const arr_kdcab = {
                            value:cellValues.row.KDCAB,
                            label:cellValues.row.KDCAB
                        };
                        setDetailKdcab(arr_kdcab);
                        setDetailKdtk(cellValues.row.TOKO);
                        setDetailNama(cellValues.row.NAMA);
                        
                        const arr_station = {
                                            value:cellValues.row.STATION,
                                            label:cellValues.row.STATION
                                            };
                        setDetailStation(arr_station);
    
                        setDetailIP(cellValues.row.IP);
    
                        const arr_koneksi = {
                            value:cellValues.row.KONEKSI,
                            label:cellValues.row.KONEKSI
                            };
                        setDetailKoneksi(arr_koneksi);
                        setDetailIsInduk(cellValues.row.IS_INDUK);
                        if(cellValues.row.IS_INDUK === '1'){
                            setIsCheckedISInduk(true);
                        }else{
                            setIsCheckedISInduk(false);
                        }
                    }
                    
                }
                
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
    }

    const showDetailToko = (cellValues:any) => {
        setParamCellValue(cellValues);
        setisDisabledReconnect(true);
        if(cellValues.row.STATION.substring(0,1) == '0' || cellValues.row.STATION == 'I1' || cellValues.row.STATION.substring(0,1) == '1' || cellValues.row.STATION.substring(0,1) == '2'){
            if(modal14){
                console.log('Tidak Perlu buka Modal')
            }else{
                console.log('Perlu buka Modal')
                setModal14(true);
            }
            try{
                
                setNAMA_TOKO(cellValues.row.TOKO+" / "+cellValues.row.NAMA.toString().split('/').join('')+" / "+cellValues.row.STATION+" / "+cellValues.row.IP+" / ");
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
                console.log('res_command : '+res_command);
                const param_per_toko = WritePayloadRealtime(cellValues.row.KDCAB,cellValues.row.TOKO,cellValues.row.STATION,'',"COMMAND",res_command,3,false,'Report Realtime Toko',key,cellValues.row.IP,3,30);
                //console.log('param_per_toko : '+param_per_toko);
                const url_per_toko = `ws://${IN_HOST}:7322/sock/v1/RealtimeFromListener`;
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
                    setProgressProcesslist(t('Sesi Selesai, silahkan tekan tombol reconnect'));
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
                                setprogressbar_io_1(t('Realtime Process Finished, Click Reconnect for starting processing realtime again'))
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
                                    handleLogout();
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
        }else if(cellValues.row.STATION === 'RBWDCP' || cellValues.row.STATION === 'RBKONEKSI'){
            if(modal15){
                console.log('Tidak Perlu buka Modal')
            }else{
                console.log('Perlu buka Modal')
                setModal15(true);
            }
            try{
                setStationSelected(cellValues.row.STATION);
                setIPStationSelected(cellValues.row.IP);
                setprogressbar_io_1('200');
                setISShowTraffic(false);
                setisTextTraffic('Traffic');
                setisDisabledButtonTraffic(true);
                setNAMA_TOKO(cellValues.row.TOKO+" / "+cellValues.row.NAMA.toString().split('/').join('')+" / "+cellValues.row.STATION+" / "+cellValues.row.IP+" / ");
                setIsMounted(true);
                var key = GetToken()
                //console.log('key : '+key);
                const res_command = "";
                //console.log('res_command : '+res_command);
                const param_per_toko = WritePayloadRealtimeRouter(cellValues.row.KDCAB,cellValues.row.TOKO,cellValues.row.STATION,key,cellValues.row.IP,30);
                console.log('param_per_toko : '+param_per_toko);
                const url_per_toko = `ws://${IN_HOST}:7322/sock/v1/ReportFromRouter/GetRouterDashboard`;
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
                    setProgressProcesslist('Sesi Selesai, silahkan tekan tombol reconnect!');
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

                                        const res_service = parse_data_inti_data.Servis;
                                         
                                        //console.log('res_service  : '+JSON.stringify(res_service))
                                        setdata_rows_service(res_service);

                                        //console.log('res_spec : '+JSON.stringify(res_spec));

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
                                        /*
                                        const res_view_log = parse_data_inti_data.ViewLog;
                                        const res_vlog = AddID(res_view_log);
                                        setdata_rows_view_log(res_vlog);

                                        const columns_view_log : GridColDef[] = [
                                            { field: 'id', headerName: 'id',  flex: 1},
                                            { field: 'time', headerName: 'time',  width: 200, minWidth: 200, maxWidth: 200},
                                            { field: 'topic', headerName: 'TOPIC',  width: 200, minWidth: 200, maxWidth: 200},
                                            { field: 'msg', headerName: 'MESSAGE',  width: 500, minWidth: 500, maxWidth: 500},
                                        ];
                                        setDataColumnViewLog(columns_view_log);
                                        */

                                        const res_engine =  parse_data_inti_data.Engine;
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
                                         
                                        //console.log('res_routing  : '+JSON.stringify(res_routing))
                                        setdata_rows_routing(res_routing);
                                    }
                                }
                            }catch(Ex){
                                console.log('error : '+Ex.toString());
                            }
                        }else if(code === 209){
                            setisDisabledReconnect(false);
                            setprogressbar_io_1(t('Realtime Process Finished, Click Reconnect for starting processing realtime again'))
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
                                handleLogout();
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
                text: "Station : "+cellValues.row.STATION+" "+t('Cannot displaying realtime process'),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }
        
        
    }

    const CloseModal = () =>{
        setModal14(false);
        //SendRealtime('','','','',true);
        ref.current = 0;
        setParamCellValue([]);
    }

    const CloseModalRouter = () =>{
        setModal15(false);
        //SendRealtime('','','','',true);
        refwdcp.current = 0;
        setParamCellValue([]);
    }

    const RebootPC = (IN_ParamCellValues:any) =>{
        const myExample = document.getElementById('btn_reboot_pc');
        Swal.fire({
            icon: "question",
            title: t("Confirmation"),
            text : t("Are you sure for")+" "+t("will reboot PC")+"?",
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
                        title: t("Check your connection or call administrator"),
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
                const Token = GetToken();
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
                                    setModal15(false);
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

    const showTraffic = (isText:string)=>{
        if(isText === 'Hide'){
            setisTextTraffic('Traffic');
            setISShowTraffic(false);
        }else{
            setisTextTraffic('Hide');
            setISShowTraffic(true);
        }
    }

    const ActionManageServices = (idComponent:any,idComponentLabel:any,IN_DataTokoSelected:any,IN_NAME:string,IN_STATUS:string) => {
        Swal.fire({
            icon: "question",
            title: t("Confirmation"),
            text:  t("Are you sure for")+" "+t("for manage this server")+"?",
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
                const Token = GetToken();
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
 
    
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return(
        <>
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    {t('Management')}&nbsp;{t('Store')}
                </li>
                <Link href="/apps/toko/tokomain" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Tokomain</span>
                </li>
                </Link>
            </ul>
            </div>

            <div className="pt-1">
                <div>
                    <ul className="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('data_tokomain')}
                                className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'data_tokomain' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconHome />
                                Data Tokomain
                            </button>
                        </li>
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('upload_tokomain')}
                                className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'upload_tokomain' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconAirplay />
                                {t('Upload')} PC Station
                            </button>
                        </li>
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('upload_device_station')}
                                className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'upload_device_station' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconBox />
                                {t('Upload')} Device Station
                            </button>
                        </li>
                    </ul>
                </div>
                {tabs === 'data_tokomain' ? (
                    <div>
                        <div className="mb-3 flex items-end justify-left">
                            <div className="max-w-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
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

                                        <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Branch Code')}</label></div>
                                        <div className="mb-3">
                                            <div className="w-full">
                                                <Select onChange={userSelectKodeCabang} id="cmb_kode_cabang" placeholder={t("Select Branch Code")} options={options5} isMulti isSearchable={true}/>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="flex">
                                                <button id="btn_filter" disabled={!active} onClick={() => {
                                                                                    HandleClick('btn_filter')
                                                                                }}  type="button" className={!isDark ? 'btn btn-primary w-full rounded-full text-end' : 'btn btn-outline-primary w-full rounded-full'}>
                                                    {t('Process')}
                                                </button>
                                                &nbsp;
                                                <button id="btn_input" disabled={!active} onClick={() => {
                                                                                    handleRowDetailClick("")
                                                                                }}  type="button" className={!isDark ? 'btn btn-success w-full rounded-full text-end' : 'btn btn-outline-success w-full rounded-full'}>
                                                    {t('Add')}
                                                </button>
                                            </div>
                                        </div>
                                   
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Data Tokomain'} data_rows={data_rows} data_columns={columns} isLoading={loading} progressbar={''} field_auto_sorting={'TOKO'} type_sorting={'asc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false}  />
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
                                                className={`panel animate__animated my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark ${
                                                    isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between bg-primary text-white px-5 py-3 dark:bg-[#121c2c]">
                                                    <h5 className="text-lg font-bold">Detail Toko</h5>
                                                    <button onClick={() => setModal13(false)} type="button" className="text-white-dark hover:text-dark">
                                                        <IconX />
                                                    </button>
                                                </div>
                                                <div className="p-5">
                                                   
                                                        <div className="mb-5">
                                                        <label>{t('Branch Code')}</label>
                                                                <div className="flex">
                                                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                                    <IconHome />
                                                                </div>
                                                                <Select className="w-full" onChange={userSelectDetailKdcab}  value={IN_DETAIL_KDCAB} placeholder={t("Select Branch Code")} options={options5} isSearchable={true}/>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                            <div className="mb-5">
                                                                <label>{t('Store')}</label>
                                                                <div className="flex">
                                                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] text-xs">
                                                                        <IconInbox />
                                                                    </div>
                                                                   
                                                                        <input type="text" placeholder="Kode Toko" onChange={userSelectKodeToko} value={IN_DETAIL_TOKO}  className="form-input ltr:rounded-l-none rtl:rounded-r-none text-xs" required /> 
                                                                    
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="mb-5">
                                                                <label>{t('Store')}{t('Name')}</label>
                                                                <div className="flex">
                                                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] text-xs">
                                                                        <IconEdit />
                                                                    </div>
                                                                  
                                                                        <input type="text" placeholder={t("Name")}  onChange={userSelectNamaToko} value={IN_DETAIL_NAMA} className="form-input ltr:rounded-l-none rtl:rounded-r-none text-xs" required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                            <div className="mb-5">
                                                                <label>{t('Station')}</label>
                                                                <div className="flex">
                                                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                                        <IconCpuBolt />
                                                                    </div>
                                                                   
                                                                        <Select value={IN_DETAIL_STATION} className="w-full text-xs"
                                                                            
                                                                        onChange={userSelectDetailStation} 
                                                                        id="cmb_device_station" 
                                                                        placeholder={t("Select Station")} 
                                                                        options={options7}
                                                                        isSearchable={true}
                                                                        />
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="mb-5">
                                                                <label>IP Address</label>
                                                                <div className="flex">
                                                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] ">
                                                                        <IconInbox />
                                                                    </div>
                                                                        <input type="text" placeholder="IP Address" onChange={userSelectIP} value={IN_DETAIL_IP} className="form-input ltr:rounded-l-none rtl:rounded-r-none text-xs" required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-5">
                                                            <label>{t('Connection Type')}</label>
                                                            <div className="flex">
                                                                <Select value={IN_DETAIL_KONEKSI} className="w-full" onChange={userSelectKoneksi} id="cmb_koneksi" placeholder={t("Select Connection")} options={options9} isSearchable={true} />
                                                            </div>
                                                        </div>
                                                        <div className="mb-5">
                                                            <label>IS Induk</label>
                                                            <div className="flex">
                                                            <label className="w-12 h-6 relative">
                                                                <input value={''} type="checkbox" checked={isCheckedISInduk} onChange={userSelectIS_INDUK} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="sw_is_induk" />
                                                                <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                                               
                                                            </label>
                                                            &emsp;
                                                            <label>{!isCheckedISInduk ? 'Tidak' : 'Ya'}</label>
                                                            </div>
                                                        </div>
                                                   
                                                    <div className="mt-8 flex items-center justify-end">
                                                        <button onClick={() => setModal13(false)} type="button" className="btn btn-outline-danger">
                                                            {t('Cancel')}
                                                        </button>
                                                        
                                                      
                                                        <button onClick={() => {
                                                                handleUploadTokomain([
                                                                    {
                                                                        "KDCAB": (IN_DETAIL_KDCAB as any).value,
                                                                        "TOKO": IN_DETAIL_TOKO,
                                                                        "NAMA": IN_DETAIL_NAMA,
                                                                        "STATION": (IN_DETAIL_STATION as any).value,
                                                                        "IP": IN_DETAIL_IP,
                                                                        "KONEKSI": (IN_DETAIL_KONEKSI as any).value,
                                                                        "IS_INDUK": !isCheckedISInduk ? '0' : '1'
                                                                    }
                                                                ],'input data baru')
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
                                                                                        <IconLogout className="w-10 h-10" />{t("Network Traffic Sent")}
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
                                                                                        {t("Network Traffic Received")}
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
                                                                                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">CPU {t('Temperature')}</div>
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
                                                                            {/* <div className="mt-2 flex items-center font-semibold">
                                                                                <IconCpuBolt className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                                                                Suhu CPU&emsp;&emsp;&emsp;&emsp;{Suhu < 50 ? <span className="badge bg-success">{Suhu}&ordm; C</span> : <span className="badge bg-danger">{Suhu}&ordm; C</span>}
                                                                            </div> */}
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
                                                        <button disabled={isDisabledReconnect} onClick={() => showDetailToko(ParamCellValues)} type="button" className={isDark ? 'mr-1 btn btn-outline-warning rounded-2xl' : 'mr-1 btn btn-warning rounded-2xl'}>
                                                            <IconRefresh />&nbsp;Reconnect
                                                        </button>

                                                        <button id="btn_reboot_pc" onClick={() => RebootPC(ParamCellValues)} type="button" className={isDark ? 'mr-1 btn btn-outline-danger rounded-2xl' : 'mr-1 btn btn-danger rounded-2xl'}>
                                                            <IconSettings />&nbsp;Reboot
                                                        </button>
                                                        
                                                        <button onClick={() => CloseModal()} type="button" className={isDark ? 'mr-1 btn btn-outline-secondary rounded-2xl' : 'mr-1 btn btn-secondary rounded-2xl'}>
                                                            <IconX  />&nbsp; Tutup Halaman
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
                                                                progressbar_io_1.toString().includes('Koneksi Bermasalah') ? 
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

                                                            <button disabled={isDisabledReconnect} onClick={() => showDetailToko(ParamCellValues)} type="button" className={isDark ? 'mr-1 btn btn-outline-warning rounded-2xl' : 'mr-1 btn btn-warning rounded-2xl'}>
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
                                                                                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'interface_wireless_setting' ? '!border-primary text-primary' : ''}`}
                                                                                        >
                                                                                            <IconBox />
                                                                                            Interface Wireless
                                                                                        </button>
                                                                                    </li>
                                                                                    <li className="inline-block">
                                                                                        <button
                                                                                            onClick={() => toggleTabsRB('netwatch', IPStationSelected)}
                                                                                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'netwatch' ? '!border-primary text-primary' : ''}`}
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
                                                                                            onClick={() => toggleTabsRB('routing',IPStationSelected)}
                                                                                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'routing' ? '!border-primary text-primary' : ''}`}
                                                                                        >
                                                                                            <IconBox />
                                                                                            Routing
                                                                                        </button>
                                                                                    </li>

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
                                                                                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'interface_wireless_setting' ? '!border-primary text-primary' : ''}`}
                                                                                        >
                                                                                            <IconBox />
                                                                                            Interface Wireless
                                                                                        </button>
                                                                                    </li>
                                                                                    <li className="inline-block">
                                                                                        <button
                                                                                            onClick={() => toggleTabsRB('netwatch', IPStationSelected)}
                                                                                            className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabsRB === 'netwatch' ? '!border-primary text-primary' : ''}`}
                                                                                        >
                                                                                            <IconClock />
                                                                                            Netwatch
                                                                                        </button>
                                                                                    </li>
                                                                                    
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
                                                                                                                    <td className="font-semibold"><button id={"btn_manage_"+i} onClick={() => {ActionManageServices('btn_manage_'+i,'lbl_service_'+i,ParamCellValues,data_rows_service[i].name,data_rows_service[i].disabled)}} className={isDark ? 'mr-1 btn btn-outline-primary rounded-2xl' : 'mr-1 btn btn-primary rounded-2xl'}>{data_rows_service[i].disabled === 'true' ? 'Enabled':'Disabled'}</button></td>
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
                                                                                        <div className="table-responsive snap-y">
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
                                                            : 
                                                            ''
                                                        } 
                                                    
                                                </div>
                                            </Dialog.Panel>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>      

                    </div>
                ) : (
                    ''
                )}
                {tabs === 'upload_tokomain' ? (
                <div>
                    <div className="mb-3 flex items-end justify-left">
                            <div className="max-w-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                <div className="p-2 flex items-center flex-col sm:flex-row">
                                    <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                                   
                                        <div className="mb-3">
                                        <div className="flex item-center font-semibold">   
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z" stroke="currentColor" strokeWidth="1.5"></path><path opacity="0.5" d="M6 18L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                            <h2 className="text-dark mt-1 ml-1 text-center text-1xl dark:text-white-light">{t('Upload File')}</h2>
                                        </div>
                                        </div>

                                       
                                        <div className="mb-1"><label htmlFor="dropdownLeftButton">Select File</label></div>
                                            <div className="mb-3">
                                                <div className="w-full">
                                                    <input accept=".csv" id="csvInputTokomain" type="file" className="form-control" />
                                                </div>
                                        </div>
                                        
                                        
                                        <div className="mb-3">
                                            <div className="flex flex-row gap-1">
                                                <button id="btn_filter"  onClick={() => {
                                                            handlePreviewFile('tokomain','csvInputTokomain')
                                                        }}  type="button" className={!isDark ? 'btn btn-primary w-full rounded-full text-end' : 'btn btn-outline-primary w-full rounded-full'}>
                                                    {t('Preview Tokomain')}
                                                </button>
                                                &nbsp;
                                               
                                                <a href={"/file/TOKOMAIN_TEMPLATE.csv"} rel="noopener noreferrer"  id="btn_download_template"  target="_blank" className={!isDark ? 'btn btn-warning w-full rounded-full text-end' : 'btn btn-outline-warning w-full rounded-full'}>
                                                    {t('Download Template')}
                                                </a>
                                                
                                            </div>
                                        </div>
                                                                   
                                   
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div className="mb-3 w-full">
                   
                        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                        <DataGrid
                            sx={{ fontSize: 12, boxShadow: 4,border: 0,fontFamily:"monospace" }}
                            rows={data_rows_upload}
                            columns={columns_upload}
                            initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                            }}
                            pageSizeOptions={[5, 10, 25, 50, 100]}
                            checkboxSelection={false}
                            density="compact"
                            columnVisibilityModel={{
                                id: false,
                            }}
                            loading = {isLoading}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                            
                        />
                        </ThemeProvider>

                       
                    </div>                 
                    <div className="mb-3">
                        <div className="flex">
                            <button id="btn_upload" disabled={!active} onClick={() => {
                                                                handleUploadTokomain(data_rows_upload,'upload')
                                                            }}  type="button" className="btn btn-success rounded-full w-full">
                                {t('Upload Tokomain')}
                            </button>
                        </div>
                    </div>     
                </div>
                ) : (
                 ''
                )}
                {
                    tabs === 'upload_device_station' ? (
                        <div>
                        <div className="mb-3 flex items-end justify-left">
                                <div className="max-w-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                    <div className="p-2 flex items-center flex-col sm:flex-row">
                                        <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                                       
                                            <div className="mb-3">
                                            <div className="flex item-center font-semibold">   
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z" stroke="currentColor" strokeWidth="1.5"></path><path opacity="0.5" d="M6 18L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                                <h2 className="text-dark mt-1 ml-1 text-center text-1xl dark:text-white-light">{t('Upload File')}</h2>
                                            </div>
                                            </div>

                                            
                                                <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Select Device for Upload')}</label></div>
                                                <div className="mb-3">
                                                    <div className="w-full">
                                                    <Select onChange={userSelectDevice} id="cmb_device_station" placeholder="Pilih Device Station" options={options6} isSearchable={true}/>
                                                    </div>
                                                </div>
                                            
                                            <div className={isVisible ? 'visible' : 'invisible'}>
                                                <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Browse File')}</label></div>
                                                <div className="mb-3">
                                                    <div className="w-full">
                                                    <input accept=".csv" id="csvInputDevice" type="file" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={!isVisible ? 'visible' : 'invisible'}>
                                                <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Select Branch')}</label></div>
                                                <div className="mb-3">
                                                    <div className="w-full">
                                                    <Select  onChange={userSelectKodeCabangSyncRouter} id="cmb_kode_cabang_upload_device" placeholder={t("Select Branch Code")} options={options5} isSearchable={true}/>
                                                    </div>
                                                </div>
                                                <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Select Store')}</label></div>
                                                <div className="mb-3">
                                                    <div className="w-full">
                                                    <Select isLoading={isLoadingOptionKodeToko} onChange={userSelectKodeTokoSyncRouter} id="cmb_kode_toko" placeholder="Pilih Kode Toko" options={options10} isSearchable={true}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <div className="flex">
                                                    <button id="btn_filter"  onClick={() => {
                                                                handlePreviewFile('device','csvInputDevice')
                                                            }}  type="button" className={!isDark ? 'btn btn-primary w-full rounded-full text-end' : 'btn btn-outline-primary w-full rounded-full'}>
                                                        {isSyncText}
                                                    </button>
                                                    &nbsp;
                                                
                                                    <a href={"/file/DEVICE_TEMPLATE.csv"} rel="noopener noreferrer"  id="btn_download_template"  target="_blank" className={!isDark ? 'btn btn-warning w-full rounded-full text-end '+IsVisibleButtonDownloadPreviewDeviceStation : 'btn btn-outline-warning w-full rounded-full '+IsVisibleButtonDownloadPreviewDeviceStation}>
                                                        {t('Download Template')}
                                                    </a>
                                                    
                                                </div>
                                            </div>
                                                                    
                                       
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className="mb-3 w-full">
                    
                            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                            <DataGrid
                                rowHeight={70}
                                sx={{ fontSize: 12, boxShadow: 4,border: 0,fontFamily:"monospace", '--DataGrid-overlayHeight': '300px'  }}
                                rows={data_rows_device}
                                columns={columns_device}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                    sorting: {sortModel: [{ field: 'TOKO' , sort: 'asc' }]},
                                }}
                                pageSizeOptions={[5, 10, 25, 50, 100]}
                                checkboxSelection={false}
                                density="compact"
                                columnVisibilityModel={{
                                    id: false,
                                }}
                                //components={{ Toolbar: GridToolbar,LoadingOverlay: LinearProgress }}
                                loading = {isLoading}
                                disableRowSelectionOnClick={false}
                                slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay  }}
                                        slotProps={{
                                        toolbar: {
                                            printOptions: { disableToolbarButton: true },
                                            csvOptions: { disableToolbarButton: true },
                                            showQuickFilter: true,
                                        },
                                }}
                                autoHeight={true}
                                showCellVerticalBorder={false}
                                showColumnVerticalBorder={false}
                                
                            />
                            </ThemeProvider>

                        
                        </div>                 
                        <div className="mb-3">
                            <div className="flex">
                                <button id="btn_upload_device" disabled={!active} onClick={() => {
                                                                   handleUploadDevice(data_rows_device)
                                                                }}  type="button" className="btn btn-success rounded-full w-full">
                                    {t('Upload Device Station')}
                                </button>
                            </div>
                        </div>     
                    </div>
                    ) : ''

                }

                {
                    tabs === 'log_sync_device' ? (
                        <div>
                        <div className="mb-3 flex items-end justify-left">
                                <div className="max-w-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                    <div className="p-2 flex items-center flex-col sm:flex-row">
                                        <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                                       
                                            <div className="mb-3">
                                            <div className="flex item-center font-semibold">   
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z" stroke="currentColor" strokeWidth="1.5"></path><path opacity="0.5" d="M6 18L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                                <h2 className="text-dark mt-1 ml-1 text-center text-1xl dark:text-white-light">Filter Log</h2>
                                            </div>
                                            </div>

                                            
                                                <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Select Branch')}</label></div>
                                                <div className="mb-3">
                                                    <div className="w-full">
                                                    <Select onChange={userSelectDevice} id="cmb_log_device_cabang" placeholder="Pilih Cabang" options={options5} isSearchable={true}/>
                                                    </div>
                                                </div>

                                            <div className="mb-3">
                                                <div className="flex">
                                                    <button id="btn_filter"  onClick={() => {
                                                                handlePreviewFile('device','csvInputDevice')
                                                            }}  type="button" className={!isDark ? 'btn btn-primary w-full rounded-full text-end' : 'btn btn-outline-primary w-full rounded-full'}>
                                                        Filter
                                                    </button>
                                                </div>
                                            </div>
                                                                    
                                       
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Data Log Sync Device Station'} data_rows={data_rows_log_sync} data_columns={columns_log_sync} isLoading={loading_log_sync} progressbar={''} field_auto_sorting={'ADDTIME'} type_sorting={'desc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false}  />
                    </div>
                    ) : ''

                }
            </div>

        </>
    )
};
export default Upload_Tokomain;