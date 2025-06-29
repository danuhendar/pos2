'use client'
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { GridEventListener } from "@mui/x-data-grid";
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import { AddID, ConvertBinaryToText, GenerateUniqNumber, GetFailedClient, GetSignature, GetToken, GetTotalFailedClient, HitungSuksesDanGagalFomTable, ListKey, SendHandleRowClick, SendHandleRowClickOffice, SummaryValueOfArray, WritePayload, WritePayloadWSOffice, get_branch_code, get_data_local_storage, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, removeDuplicates, setTombolAmbilDataGagal, start, stop } from "@/lib/global";
import CardInfoProses from "../form/CardInfoProses";
import {ReportMonitoringListenerOffice,ReportHardwareInfo, ReportInstallasiTrendMicro} from "../../controller/MonitoringListenerOffice";
import { Def_Columns_ReportMonitoringHardwareInfo, Def_Columns_ReportMonitoringListenerOffice } from "@/controller/ColumnMonitoringListenerOffice";
import { Def_Columns_ReportInstallasiTrendMicro } from '../../controller/ColumnMonitoringListenerOffice';
import { isNull } from "lodash";
import { useTranslation } from "react-i18next";
import DropDownBranch from "../dropdown/DropDownBranch";
import ButtonReload from "../button/ButtonReload";
import ButtonFilter from '../button/ButtonFilter';
import IconSend from "../Icon/IconSend";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
interface FormMonitoringListenerOfficeProps {
    url: string,
    command: string,
    IDReport: string,
}
const FormMonitoringListenerOffice: React.FC<FormMonitoringListenerOfficeProps> = ({ url, command, IDReport }) => {
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [IN_CMB_LOKASI, setLokasi] = useState("");
    const [optionsLokasi,setoptionsLokasi] = useState([])
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const [columnGroupingModel,setcolumnGroupingModel] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progressbar, setProgress] = useState('');
    const [total_station, setTotalStation] = useState(0);
    const [total_sukses, setTotalSukses] = useState(0);
    const [total_gagal, setTotalGagal] = useState(0);
    const [DataProsentase,setDataProsentase] = useState(0);
    const [data_gagal, setDataGagal] = useState('');
    const [IP, setDataIP] = useState('');
    const [stateCode,setStateCode] = useState(0);
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();
    const router = useRouter();
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const isConnectedWS = useRef(0)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const [IconButton,setIconButton] = useState(<IconSend />)
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        let arr_cabang = get_branch_code(false,false);
        setOption5(arr_cabang)
    },[]);

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

    const userSelectKodeCabang = (value: any) => {
        setoptionsLokasi([])
        if (value.length == 0) {
            setKODE_CABANG('')
        } else {
            var arr_kode_cabang = "";
            for (var i = 0; i < value.length; i++) {
                if (i === (value.length - 1)) {
                    arr_kode_cabang = arr_kode_cabang + value[i].value;
                } else {
                    arr_kode_cabang = arr_kode_cabang + value[i].value + ",";
                }
            }
            setKODE_CABANG(arr_kode_cabang);
            setTextButtonFilter('Process')
            setIconButton(<IconSend />)
            setDataIP('');
            get_lokasi(arr_kode_cabang)
        }
    };

    const HandleClick2 = async () => {
        if (TextButtonFilter === 'Proses' || TextButtonFilter === 'Process') {
            let in_counter = 0;
            start(in_counter, "timer");
            var total_gagal = 0;
            var total_sukses = 0;
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setData_rows([]);
            setDataGagal('');
            setDataIP('');
            setClosedWS('');
            setLastResponse('');
            var list_ip_failed = '';
            setStateCode(0);
            let rows = [];
            if (kdcab === '') {
                Swal.fire({
                    title: t("Warning"),
                    text: t("Select Branch Code"),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            } else {
                const lokasi = '';
                var key = GetToken()
                const NoCheckDB = true;
                console.log('command handle : '+command)
                let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                const param = WritePayloadWSOffice(kdcab,"cmd",res_command,IDReport,key,20,lokasi,NoCheckDB);
                setTextButtonFilter('Please wait')
                setLoadingButton(true)
                const socket = new WebSocket(url);
                socket.binaryType = 'blob';
                //Connection error
                socket.addEventListener("error", (event: any) => {
                    Swal.fire({
                        title: t("Warning"),
                        text: t("401-Error UnAutorized, Check your connection or call administrator!"),
                        icon: "error",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setLoading(false)
                    setisDisabled(false)
                    setProgress(t('Finished Session'));
                    setTextButtonFilter('Process')
                    setLoadingButton(false)
                    isConnectedWS.current = 0
                    setIconButton(<IconSend />)
                });
                // Connection opened
                socket.addEventListener("open", () => {
                    socket.send(param);
                    setLoadingButton(true)
                    setisDisabled(true)
                    setIconButton(null)
                    isConnectedWS.current = 1
                });
                // Connection close
                socket.addEventListener("close", (event: any) => {
                    console.log('connection close');
                    setLoading(false);
                    stop();
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                    setTextButtonFilter('Process')
                    setLoadingButton(false)
                    setIconButton(null)
                    setisDisabled(false)
                    isConnectedWS.current = 0   
                });
                // Listen for messages
                socket.addEventListener('message', async (event) => {
                    const data = ConvertBinaryToText(event);
                    const parse_json = JSON.parse(await data);
                    const code = parse_json.code;
                    const msg = parse_json.msg;
                    const rdata = parse_json.data;
                    const countdata = parse_json.amountData;
                    setTotalStation(countdata);
                    setStateCode(code);
                    if (code === 200 || code === 209) {
                            setProgress(code + '-' + msg);
                            setLoading(true);
                            if(isConnectedWS.current === 0){
                                setisDisabled(false)
                            }else{
                                setisDisabled(true)
                            }
                            try {
                                var list_toko_failed = '';
                                const res_data = JSON.parse(parse_json.data);
                                const res_new = res_data;
                                var list_toko_sukses = '';
                                for (var o = 0; o < res_new.length; o++) {
                                    const ubah_json = JSON.stringify(res_new[o]);
                                    const parse_data_inti = JSON.parse(ubah_json);
                                    const res_data_msg = parse_data_inti.msg;
                                    const res_data_code = parse_data_inti.code;
                                    const res_request = parse_data_inti.timerequest;
                                    const res_response = parse_data_inti.timerespons;
                                    const res_kdcab = parse_data_inti.kdcab;
                                    const res_lokasi = parse_data_inti.lokasi;
                                    const res_id_report = parse_data_inti.idreport;
                                    const res_computer_name = parse_data_inti.Computername;
                                    const res_ip = parse_data_inti.ip;
                                    const res_ping = parse_data_inti.ping;
                                    const res_data = parse_data_inti.data;
                                    if(IDReport === "Report Monitoring Listener Office"){
                                        const obj = ReportMonitoringListenerOffice(false,0,[],res_kdcab,res_lokasi,res_request,res_response,res_id_report,res_computer_name,res_ip,res_ping,res_data_code,res_data_msg,(res_data === '' ? '' : res_data));
                                        rows.push(obj[0])
                                    }else if(IDReport === "Report Hardware Info"){
                                        const obj = ReportHardwareInfo(false,0,[],res_kdcab,res_lokasi,res_request,res_response,res_id_report,res_computer_name,res_ip,res_ping,res_data_code,res_data_msg,(res_data === '' ? '' : res_data));
                                        rows.push(obj[0])                                       
                                    }else if(IDReport === "Report Installasi Trend Micro"){
                                        const obj =  ReportInstallasiTrendMicro(false,0,[],res_kdcab,res_lokasi,res_request,res_response,res_id_report,res_computer_name,res_ip,res_ping,res_data_code,res_data_msg,(res_data === '' ? '' : res_data)); 
                                        rows.push(obj[0]) 
                                    }
                                    if (res_data_code !== 200) {
                                        total_gagal = total_gagal + 1;
                                        if (list_toko_failed.includes(res_ip)) {

                                        } else {
                                            list_toko_failed += res_ip + ",";
                                        }
                                        setTotalGagal(total_gagal);
                                        if (list_ip_failed.includes(res_ip)) {

                                        } else {
                                            list_ip_failed += res_ip + ",";
                                        }
                                    } else {
                                        total_sukses = total_sukses + 1;
                                        if (list_toko_sukses.includes(res_ip)) {

                                        } else {
                                            list_toko_sukses += res_ip + ",";
                                        }
                                        setTotalSukses(total_sukses);
                                    }
                                }
                                // //-- parse hitung dari data yang terupdate --//
                                const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners((IDReport === 'Report Monitoring Listener Office' ? rows : (IDReport === 'Report Hardware Info' ? rows : rows ) ), 'KODE', false, false, false);
                                setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                                setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
                                //-- prosentase progressbar --//
                                var prosentase = Math.round(((arr_data_sukses_dan_gagal_from_Table[0] + arr_data_sukses_dan_gagal_from_Table[1]) / countdata) * 100);
                                setDataProsentase(prosentase)
                                const res_data_gagal_after_trigger = GetFailedClient((IDReport === 'Report Monitoring Listener Office' ? rows : (IDReport === 'Report Hardware Info' ? rows : rows ) ), 'KDCAB', false);
                                setDataGagal(res_data_gagal_after_trigger);
                                const res_ip_gagal_after_trigger = GetFailedClient((IDReport === 'Report Monitoring Listener Office' ? rows : (IDReport === 'Report Hardware Info' ? rows : rows )  ), 'KDCAB', true);
                                setDataIP(res_ip_gagal_after_trigger)
                                let columns = [];
                                let columnsGroupModel = [];
                                if(IDReport === 'Report Monitoring Listener Office'){
                                    let arr_res_columns = Def_Columns_ReportMonitoringListenerOffice();
                                    columns = arr_res_columns[0];
                                    columnsGroupModel = arr_res_columns[1];
                                }else if(IDReport === 'Report Hardware Info'){    
                                    let arr_res_columns = Def_Columns_ReportMonitoringHardwareInfo();
                                    columns = arr_res_columns[0];
                                    columnsGroupModel = arr_res_columns[1];
                                }else if(IDReport === 'Report Installasi Trend Micro'){
                                    let arr_res_columns = Def_Columns_ReportInstallasiTrendMicro();
                                    columns = arr_res_columns[0];
                                    columnsGroupModel = arr_res_columns[1];
                                }
                                let res_rows = [];
                                var a_rows = removeDuplicates(rows);
                                res_rows = AddID(a_rows);
                                setData_rows(res_rows);
                                setData_columns(columns);
                                setcolumnGroupingModel(columnsGroupModel);
                                setTextButtonFilter('Retrieve data failed (' + total_gagal + ')')
                                if (code === 209) {
                                    setLoading(false)
                                    setLoadingButton(false)
                                    setisDisabled(false)
                                    isConnectedWS.current = 0
                                } else {
                                    setLoading(true)
                                    isConnectedWS.current = 1
                                }
                            } catch (Ex) {
                                console.log(code+'-'+msg+' -> '+rdata);
                                console.log('error parsing : ' + Ex.toString())
                            }
                    }
                    else if (code === 201) {
                        setProgress(code + "-" + msg);
                        setLoading(true);
                        setLoadingButton(true)
                        setisDisabled(true)
                        isConnectedWS.current = 1
                    }
                    else if (parse_json.code.toString().substring(0, 1) === '4') {
                        setLoading(true);
                        Swal.fire({
                            title: t("Warning"),
                            text: "" + parseFloat(code) + "-" + msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        if (code === 403) {
                            //-- redirect ke login --//
                            handleLogout();
                        }
                        setLoading(false)
                        setProgress('')
                        setisDisabled(false)
                        setTextButtonFilter('Process')
                        setIconButton(<IconSend />)
                    }
                });
            }
        // ------------------------- PROSES DATA GAGAL ------------------------- //    
        } else {
            const res_data_gagal = data_gagal;
            if (res_data_gagal !== '') {
                let in_counter = 0;
                start(in_counter, "timer");
                const kdcab = IN_CMB_KODE_CABANG;
                if (kdcab === '') {
                    Swal.fire({
                        title: t("Warning"),
                        text: t("Select Branch Code"),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                } else {
                    const lokasi = IN_CMB_LOKASI;
                    var key = GetToken()
                    let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                    const param = WritePayload(kdcab, res_data_gagal, lokasi, "", "cmd", res_command, 4, false, IDReport, key, IP,false,20);
                    console.log(command)
                    console.log(url)
                    console.log(param)

                    const socket = new WebSocket(url);
                    socket.binaryType = 'blob';
                    //Connection error
                    socket.addEventListener("error", (event) => {
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
                        setLoadingButton(false)
                        isConnectedWS.current = 0   
                    });

                    // Connection opened
                    socket.addEventListener("open", () => {
                        socket.send(param);
                        setTextButtonFilter('Please wait')
                        setLoadingButton(true)
                        isConnectedWS.current = 1
                    });
                    // Connection close
                    socket.addEventListener("close", (event: any) => {
                        console.log('connection close');
                        setLoading(false);
                        setProgress(t('Finished Session'));
                        stop();
                        const val_gagal = GetTotalFailedClient('value_total_gagal');
                        setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                        setLoadingButton(false)
                        isConnectedWS.current = 0
                    });

                    // Listen for messages
                    socket.addEventListener('message', async (event) => {
                        const data = ConvertBinaryToText(event);
                        const parse_json = JSON.parse(await data);
                        const code = parse_json.code;
                        const msg = parse_json.msg;
                        let rows: SetStateAction<any[]> = [];
                        if (code === 200 || code === 209) {
                            if (((msg.includes('Mohon di tunggu'))) || (msg.includes('Handletime kami Default'))) {
                                setProgress(code + '-' + msg);
                                setLoading(true);
                            } else {
                                try {
                                    const res_data = JSON.parse(parse_json.data);
                                    const res_new = res_data;
                                    for (var o = 0; o < res_new.length; o++) {
                                        const ubah_json = JSON.stringify(res_new[o]);
                                        const parse_data_inti = JSON.parse(ubah_json);
                                        const res_data_msg = parse_data_inti.msg;
                                        const res_data_code = parse_data_inti.code;
                                        const res_request = parse_data_inti.timerequest;
                                        const res_response = parse_data_inti.timerespons;
                                        const res_kdcab = parse_data_inti.kdcab;
                                        const res_lokasi = parse_data_inti.lokasi;
                                        const res_id_report = parse_data_inti.idreport;
                                        const res_computer_name = parse_data_inti.Computername;
                                        const res_ip = parse_data_inti.ip;
                                        const res_ping = parse_data_inti.ping;
                                        const res_data = parse_data_inti.data;
                                        let objIndex = data_rows.findIndex(((obj: { IP: any; }) => obj.IP == res_ip));
                                        if(IDReport === "Report Monitoring Listener Office"){
                                            ReportMonitoringListenerOffice(true,objIndex,data_rows,res_kdcab,res_lokasi,res_request,res_response,res_id_report,res_computer_name,res_ip,res_ping,res_data_code,res_data_msg,(res_data === '' ? '' : res_data));
                                        }else if(IDReport === "Report Hardware Info"){
                                            ReportHardwareInfo(true,objIndex,data_rows,res_kdcab,res_lokasi,res_request,res_response,res_id_report,res_computer_name,res_ip,res_ping,res_data_code,res_data_msg,(res_data === '' ? '' : res_data)); 
                                        }else if(IDReport === "Report Installasi Trend Micro"){
                                            ReportInstallasiTrendMicro(true,objIndex,data_rows,res_kdcab,res_lokasi,res_request,res_response,res_id_report,res_computer_name,res_ip,res_ping,res_data_code,res_data_msg,(res_data === '' ? '' : res_data)); 
                                        }
                                        rows = data_rows;
                                        //-- failed listeners --//
                                        //-- parse hitung dari data yang terupdate --//
                                        const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'KODE', false, false, false);
                                        setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                                        setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
                                        const res_data_gagal_after_trigger = GetFailedClient(rows, 'KDCAB', false);
                                        setDataGagal(res_data_gagal_after_trigger);
                                        const res_ip_gagal_after_trigger = GetFailedClient(rows, 'KDCAB', true);
                                        setDataIP(res_ip_gagal_after_trigger);
                                        setTextButtonFilter('Retrieve data failed ('+arr_data_sukses_dan_gagal_from_Table[1]+')')
                                        if (msg.includes('Finis')) {
                                            setLoading(false);
                                            setProgress(code + '-' + msg);
                                            setData_rows(rows);
                                        } else {
                                            setProgress(code + '-' + msg);
                                            setData_rows(rows);
                                        }
                                    }
                                } catch (Ex) {
                                    if(code === 209){
                                        const val_gagal = GetTotalFailedClient('value_total_gagal')
                                        setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                                        setLoading(false)
                                        setisDisabled(false)
                                        setLoadingButton(false)
                                        isConnectedWS.current = 0
                                    }
                                }
                            }
                        }else if(code === 209){
                            setLoading(false);
                            setProgress(code + '-' + msg);   
                            isConnectedWS.current = 0    
                        } else if (code === 201) {
                            setProgress(code + "-" + msg);
                            setLoading(true);
                            isConnectedWS.current = 1
                        } else if (parse_json.code.toString().substring(0, 1) === '4') {
                            setLoading(true);
                            Swal.fire({
                                title: t("Warning"),
                                text: "" + parseFloat(code) + "-" + msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            if (code === 403) {
                                //-- redirect ke login --//
                                handleLogout();
                            }
                            setLoading(false)
                            setProgress('')
                            setisDisabled(false)
                            isConnectedWS.current = 0
                            setTextButtonFilter('Process')
                        }
                    });
                }
            } else {
                setLoading(false);
                setTextButtonFilter('Process')
            }
        }
    };
    const clickTable : GridEventListener<'rowClick'> = (
        params, // GridRowParams
        event, // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
      ) => {
        NewhandleRowClick(params,IDReport,command,data_rows,IN_CMB_LOKASI)
    };
    const NewhandleRowClick = async (cellValues:any,IDReport:string,command:string,data_prev:any,lokasi:string) => {
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
                let in_counter = 0;
                const myExample = document.getElementById(id_btn);
                if(isNull(myExample)){
                    
                }else{
                    start(in_counter, id_btn);
                    setLoading(true);
                    const Token = GetToken()
                    // console.log('command : '+command)
                    let res_command = await GetSignature(IN_HOST, IN_PORT, Token, command) as string
                    SendHandleRowClickOffice('cmd',IDReport,kdcab,kdtk,station,res_command,30,lokasi,ip,Token).then((response) => {
                        const res_data = response;
                        // console.log('data : '+JSON.stringify(res_data))
                        var code = res_data.code;
                        var msg = res_data.msg;
                        var rdata = res_data.data;
                        const objIndex = data_prev.findIndex(((obj: { id: any; }) => obj.id == row_id));
                        const res_new = JSON.parse(rdata);
                        for (var o = 0; o < res_new.length; o++) {
                            const ubah_json = JSON.stringify(res_new[o]);
                            const parse_data_inti = JSON.parse(ubah_json);
                            const res_data_msg = parse_data_inti.msg;
                            const res_data_code = parse_data_inti.code;
                            const res_request = parse_data_inti.timerequest;
                            const res_response = parse_data_inti.timerespons;
                            const res_kdcab = parse_data_inti.kdcab;
                            const res_lokasi = parse_data_inti.lokasi;
                            const res_id_report = parse_data_inti.idreport;
                            const res_computer_name = parse_data_inti.Computername;
                            const res_ip = parse_data_inti.ip;
                            const res_ping = parse_data_inti.ping;
                            const res_data = parse_data_inti.data;
                            if(IDReport === "Report Monitoring Listener Office"){
                                ReportMonitoringListenerOffice(true,objIndex,data_rows,res_kdcab,res_lokasi,res_request,res_response,res_id_report,res_computer_name,res_ip,res_ping,res_data_code,res_data_msg,(res_data === '' ? '' : res_data));
                            }else if(IDReport === "Report Hardware Info"){
                                ReportHardwareInfo(true,objIndex,data_rows,res_kdcab,res_lokasi,res_request,res_response,res_id_report,res_computer_name,res_ip,res_ping,res_data_code,res_data_msg,(res_data === '' ? '' : res_data)); 
                            }else if(IDReport === "Report Installasi Trend Micro"){
                                ReportInstallasiTrendMicro(true,objIndex,data_rows,res_kdcab,res_lokasi,res_request,res_response,res_id_report,res_computer_name,res_ip,res_ping,res_data_code,res_data_msg,(res_data === '' ? '' : res_data)); 
                            }
                            try{
                                stop();
                            }catch(Ex){}
                            setLoading(false);
                            myExample.innerHTML = 'Trigger';
                            Swal.fire({
                                title: t("Warning"),
                                text: code+'-'+msg,
                                icon: "success",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                        }
                    }).catch((error) => {
                        console.log(error.toString())
                        Swal.fire({
                            title: t("Warning"),
                            text: "Error : "+error.toString(),
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        stop();
                        setLoading(false);
                        myExample.innerHTML = 'Trigger';
                    });
                }
            } catch (Ex) {
               console.log(Ex.toString())
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
            try{
                stop();
            }catch(Ex){}
           setLoading(false);
        }
    }
    const HandleReloadClick = () => {
        try {
            setData_rows([]);
            router.reload();
        } catch (Ex) {
            console.log('error : ' + Ex.toString())
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
                                        <div className="mb-11">
                                            <div className="flex item-center font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                                </svg>
                                                <h2 className="text-dark mt-1 ml-1 text-center text-1xl dark:text-white-light">Form Filter</h2>
                                            </div>
                                        </div>
                                        <DropDownBranch in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options5} isSearchable={true} isMulti={true} event={userSelectKodeCabang} />
                                        <div className="mb-14">
                                            <div className="flex">
                                                <ButtonFilter in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_filter"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={TextButtonFilter} HandleClick={HandleClick2} />
                                                &nbsp;
                                                <ButtonReload in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={false} isDisabled={false} HandleClick={HandleReloadClick} />
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <CardInfoProses total_station={total_station} total_sukses={total_sukses} total_gagal={total_gagal} in_classname_content={"mx-auto grid max-w-[900px] grid-cols-4 justify-items-center gap-3"} />
                    </div>
                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, ID_REPORT: false }} jenis_laporan={t('Report') + ' ' + IDReport.split('Report').join('')} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS), new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={clickTable} in_prosentase_progress={DataProsentase} in_rows_spanning={false} />
                </>
            } />
        </>
    )
}
export default FormMonitoringListenerOffice;