'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertBinaryToText, GetFailedClient, GetID, GetSignature, GetToken, GetTotalFailedClient, HitungSuksesDanGagalFomTable, ListKey, SendHandleRowClick, SummaryValueOfArray, WritePayload, get_branch_code, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, setTombolAmbilDataGagal, start, stop } from "@/lib/global";
import CardInfoProses from "../form/CardInfoProses";
import { useTranslation } from "react-i18next";
import ButtonFilter from "../button/ButtonFilter";
import { ReportMonitoringVersiPowershell } from "@/controller/report_hardware/MonitoringReportHardware";
import ButtonReload from "../button/ButtonReload";
import DropDownBranch from "../dropdown/DropDownBranch";
import DropDownStation from "../dropdown/DropDownStation";
import IconSend from "../Icon/IconSend";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
interface FormVersiPowershellProps {
    url: string,
    command: string,
    IDReport: string,
}
const FormVersiPowershell: React.FC<FormVersiPowershellProps> = ({ url, command, IDReport }) => {
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [IN_CMB_STATION, setStation] = useState("");
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const [columnGroupingModel,setcolumnGroupingModel] = useState([]);
    const [isDisabled, setisDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progressbar, setProgress] = useState('');
    const [DataProsentase,setDataProsentase] = useState(0)
    const [total_station, setTotalStation] = useState(0);
    const [total_sukses, setTotalSukses] = useState(0);
    const [total_gagal, setTotalGagal] = useState(0);
    const [data_gagal, setDataGagal] = useState('');
    const [IP, setDataIP] = useState('');
    const [stateCode,setStateCode] = useState(0);
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [options5,setOption5] = useState([])
    const [LoadingButton,setLoadingButton] = useState(false)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const { t, i18n } = useTranslation();
    const isConnectedWS = useRef(0)
    const router = useRouter();
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);

    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        let arr_cabang = get_branch_code(false,false);
        setOption5(arr_cabang)
    },[]);

    const userSelectKodeCabang = (value: any) => {
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
            setisDisabled(false)
            setDataIP('');
        }
    };
    const userSelectStation = (value: any) => {
        setStation(value.value);
        setTextButtonFilter('Process')
        setisDisabled(false)
        setDataIP('');
    }
    const Def_Columns_ReportMonitoringVersiPowershell = (rows:any) =>{
            let columns = [
                { field: 'id', headerName: 'id', flex: 1 },
                {
                    field: 'CLICK_FOR_ACTION', headerName: 'CLICK_FOR_ACTION', flex: 1, width: 150, minWidth: 150, maxWidth: 150,align:'center',headerAlign:'center',
                    renderCell: (cellValues: any) => {
                        return (
                            <span id={'btn_refresh_' + cellValues.id} className={cellValues.value === 200 ? 'badge bg-primary cursor-pointer' : 'badge bg-danger cursor-pointer'}>
                                <a className="cursor-pointer" onClick={(event) => {
                                    NewhandleRowClick(cellValues, rows);
                                }} >
                                    Trigger
                                </a>
                            </span>
                        )
                    }
                },
                {
                    field: 'KODE', headerName: 'KODE', width: 80, minWidth: 80, maxWidth: 80,
                    renderCell: (cellValues: any) => {
                        return (
                            <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                        );
                    }
                },
                {
                    field: 'KETERANGAN', headerName: 'KETERANGAN', width: 240, minWidth: 240, maxWidth: 240,
                    renderCell: (cellValues: any) => {
                        return (
                            <span className={cellValues.value === 'Succes' ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                        );
                    }
                },
                { field: 'REQUEST', headerName: 'REQUEST', width: 170, minWidth: 170, maxWidth: 170 },
                { field: 'RESPONSE', headerName: 'RESPONSE', width: 170, minWidth: 170, maxWidth: 170 },
                { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
                { field: 'KDTK', headerName: 'KDTK', width: 80, minWidth: 80, maxWidth: 80 },
                { field: 'NAMA', headerName: 'NAMA', flex: 1, width: 250, minWidth: 250, maxWidth: 250 },
                { field: 'STATION', headerName: 'STATION', width: 90, minWidth: 90, maxWidth: 90 },
                { field: 'IP', headerName: 'IP', width: 150, minWidth: 150, maxWidth: 150 },
                { field: 'VERSI_POWERSHELL', headerName: 'VERSI_POWERSHELL', flex: 1, width: 220, minWidth: 220, maxWidth: 220 },
                { field: 'WINDOWS', headerName: 'WINDOWS', flex: 1, width: 300, minWidth: 300, maxWidth: 300 },
            ];
            let columnGroupingModel: any[] = [];
            let arr_ret = [columns,columnGroupingModel];
            return arr_ret;
    }
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
            start(in_counter, id_btn);
            setLoading(true);
            const myExample = document.getElementById(id_btn);
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
                    const parse_data_inti = JSON.parse(rdata);
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
                        const res_data_inti = parse_data_inti[0].data.split('|');
                        const objIndex = data_prev.findIndex(((obj: { id: any; }) => obj.id == row_id));
                        //Update object's name property.
                        data_prev[objIndex].id = parseFloat(row_id);
                        data_prev[objIndex].CLICK_FOR_ACTION = res_data_code;
                        data_prev[objIndex].KODE = res_data_code;
                        data_prev[objIndex].KETERANGAN = res_data_msg;
                        data_prev[objIndex].REQUEST = res_request;
                        data_prev[objIndex].RESPONSE = res_response;
                        data_prev[objIndex].KDCAB = res_kdcab;
                        data_prev[objIndex].KDTK = res_kdtk;
                        data_prev[objIndex].NAMA = res_nama;
                        data_prev[objIndex].STATION = res_station;
                        data_prev[objIndex].IP = res_ip;
                        try {
                            data_prev[objIndex].VERSI_POWERSHELL = res_data_inti[1];
                            data_prev[objIndex].WINDOWS = res_data_inti[0];

                        } catch (Ex) {
                            data_prev[objIndex].VERSI_POWERSHELL = '-';
                            data_prev[objIndex].WINDOWS = '-';
                        }
                        var rows = data_prev;
                    }else{
                        const res_data_inti = parse_data_inti[0].data.split('|');
                        const objIndex = data_prev.findIndex(((obj: { id: any; }) => obj.id == row_id));
                        //Update object's name property.
                        data_prev[objIndex].id = parseFloat(row_id);
                        data_prev[objIndex].CLICK_FOR_ACTION = res_data_code;
                        data_prev[objIndex].KODE = res_data_code;
                        data_prev[objIndex].KETERANGAN = res_data_msg;
                        data_prev[objIndex].REQUEST = res_request;
                        data_prev[objIndex].RESPONSE = res_response;
                        data_prev[objIndex].KDCAB = res_kdcab;
                        data_prev[objIndex].KDTK = res_kdtk;
                        data_prev[objIndex].NAMA = res_nama;
                        data_prev[objIndex].STATION = res_station;
                        data_prev[objIndex].IP = res_ip;
                        try {
                            data_prev[objIndex].VERSI_POWERSHELL = '-';
                            data_prev[objIndex].WINDOWS = '-';

                        } catch (Ex) {
                            data_prev[objIndex].VERSI_POWERSHELL = '-';
                            data_prev[objIndex].WINDOWS = '-';
                        }
                        var rows = data_prev;
                    }
                    //-- parse hitung dari data yang terupdate --//
                    const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'KODE', false, false, false)
                    setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0])
                    setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1])
                    Swal.fire({
                        title: t("Warning"),
                        text: code+'-'+msg,
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
    const HandleClick2 = async () => {
        if (TextButtonFilter === 'Proses' || TextButtonFilter === 'Process') {
            let in_counter = 0;
            start(in_counter, "timer");
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setData_rows([]);
            setDataGagal('');
            setDataIP('');
            var list_ip_failed = '';
            var list_toko_failed = '';
            setStateCode(0);
            setClosedWS('');
            setLastResponse('');
            let rows:any = [];
            if (kdcab === '') {
                Swal.fire({
                    title: t("Warning"),
                    text: t("Select Branch Code"),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            } else {
                const station = IN_CMB_STATION;
                var key = GetToken()
                let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                const param = WritePayload(kdcab, "", station, "", "COMMAND", res_command, 2, false, IDReport, key, IP,false,20);
                console.log('url : '+url)
                console.log('param : '+param)
                setisDisabled(true)
                setTextButtonFilter('Please wait')
                const socket = new WebSocket(url);
                socket.binaryType = 'blob';
                //Connection error
                socket.addEventListener("error", (event: any) => {
                    Swal.fire({
                        title: t("Warning"),
                        text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                        icon: "error",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setisDisabled(false)
                    setLoading(false);
                    setProgress(t('Finished Session'));
                    setTextButtonFilter('Process')
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                    isConnectedWS.current = 0
                });
                // Connection opened
                socket.addEventListener("open", () => {
                    socket.send(param);
                    setLoadingButton(true)
                    setTextButtonFilter('Please wait')
                    isConnectedWS.current = 1
                });
                // Connection close
                socket.addEventListener("close", (event: any) => {
                    console.log('connection close');
                    setisDisabled(false)
                    setLoading(false);
                    stop();
                    if(stateCode === 209){
                        setProgress(t('Finished Session'));
                    }else{
                        setProgress('Ulangi Proses')
                        setTextButtonFilter('Process')
                        setDataIP('')
                    }
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                    isConnectedWS.current = 0
                });
                // Listen for messages
                socket.addEventListener('message', async (event) => {
                    const data = ConvertBinaryToText(event);
                    const parse_json = JSON.parse(await data);
                    const code = parse_json.code;
                    const msg = parse_json.msg;
                    const countdata = parse_json.amountData;
                    setTotalStation(countdata);
                    setStateCode(code);
                    const tgl_kini = get_format_tanggal_jam();
                    setLastResponse(tgl_kini);
                    var total_gagal = 0;
                    var total_sukses = 0;
                    if (code === 200 || code === 209) {
                            setProgress(code + '-' + msg);
                            setLoading(true)
                            if(isConnectedWS.current === 0){
                                setisDisabled(false);
                            }else{
                                setisDisabled(true);
                            }
                            try {
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
                                    const res_kdtk = parse_data_inti.toko;
                                    const res_nama = parse_data_inti.nama;
                                    const res_station = parse_data_inti.station;
                                    const res_ip = parse_data_inti.ip;
                                    //-- MONITORING VERSI POWERSHELL --//
                                    const obj = ReportMonitoringVersiPowershell(false,0,[],res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,parse_data_inti.data)
                                    rows.push(obj[0])
                                    //-- REKAP DATA --//
                                    if (res_data_code !== 200) {
                                        total_gagal = total_gagal + 1;
                                        if (list_toko_failed.includes(res_kdtk)) {

                                        } else {
                                            list_toko_failed += res_kdtk + ",";
                                        }
                                        if (list_ip_failed.includes(res_ip)) {

                                        } else {
                                            list_ip_failed += res_ip + ",";
                                        }
                                    } else {
                                        total_sukses = total_sukses + 1;
                                        if (list_toko_sukses.includes(res_kdtk)) {

                                        } else {
                                            list_toko_sukses += res_kdtk + ",";
                                        }
                                    }
                                }
                                //-- parse hitung dari data yang terupdate --//
                                const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'KODE', false, false, false);
                                setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                                setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
                                //-- prosentase progressbar --//
                                var prosentase = Math.round(((arr_data_sukses_dan_gagal_from_Table[0] + arr_data_sukses_dan_gagal_from_Table[1]) / countdata) * 100);
                                setDataProsentase(prosentase)
                                //-- LIST TOKO FAILED --//
                                list_toko_failed = list_toko_failed.substring(0, (list_toko_failed.length - 1));
                                setDataGagal(list_toko_failed);
                                list_ip_failed = list_ip_failed.substring(0, (list_ip_failed.length - 1));
                                setDataIP(list_ip_failed);
                                //-- DEFINISI COLUMNS --//
                                let arr_res_columns = Def_Columns_ReportMonitoringVersiPowershell(rows);
                                let columns = arr_res_columns[0];
                                let columnsGroupModel = arr_res_columns[1];
                                setData_columns(columns)
                                var res_rows = AddID(rows)
                                setData_rows(res_rows)
                                setcolumnGroupingModel(columnGroupingModel);
                                setTextButtonFilter('Retrieve data failed '+' ('+arr_data_sukses_dan_gagal_from_Table[1]+')')
                                if (code === 209) {
                                    setLoading(false)
                                    isConnectedWS.current = 0
                                    setLoadingButton(false)
                                } else {
                                    setisDisabled(true)
                                    isConnectedWS.current = 1
                                }
                            } catch (Ex) {
                                console.log('error parsing : ' + Ex.toString())
                                const val_gagal = GetTotalFailedClient('value_total_gagal')
                                setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                                setLoading(false);
                                setLoadingButton(false)
                            }
                    }else if (code === 201) {
                        setProgress(code + "-" + msg)
                        setLoading(true)
                        setLoadingButton(true)
                        isConnectedWS.current = 1
                    }else if (parse_json.code.toString().substring(0, 1) === '4') {
                        setisDisabled(false)
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
                        setLoading(false);
                        setProgress('');
                        setTextButtonFilter('Process')
                        isConnectedWS.current = 0
                        setLoadingButton(false)
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
                    const station = IN_CMB_STATION;
                    var key = GetToken()
                    let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                    const param = WritePayload(kdcab, res_data_gagal, station, "", "COMMAND", res_command, 4, false, IDReport, key, IP,false,20);
                    setisDisabled(true)
                    setTextButtonFilter('Please wait')
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
                        setisDisabled(false)
                        setLoading(false);
                        setProgress(t('Finished Session'));
                        setTextButtonFilter('Process')
                        isConnectedWS.current = 0
                    });
                    // Connection opened
                    socket.addEventListener("open", () => {
                        socket.send(param);
                        isConnectedWS.current = 1
                    });
                    // Connection close
                    socket.addEventListener("close", (event: any) => {
                        console.log('connection close');
                        setisDisabled(false)
                        setLoading(false);
                        setProgress(t('Finished Session'));
                        stop();
                        isConnectedWS.current = 0
                    });
                    // Listen for messages
                    socket.addEventListener('message', async (event) => {
                        const data = ConvertBinaryToText(event);
                        const parse_json = JSON.parse(await data);
                        const code = parse_json.code;
                        const msg = parse_json.msg;
                        let rows = [];
                        if (code === 200 || code === 209) {
                            if (((msg.includes('Mohon di tunggu'))) || (msg.includes('Handletime kami Default'))) {
                                setProgress(code + '-' + msg);
                                setLoading(true);
                            } else {
                                if(isConnectedWS.current === 0){
                                    setisDisabled(false)
                                }else{
                                    setisDisabled(true)
                                }
                                try {
                                    const res_data = JSON.parse(parse_json.data);
                                    for (var o = 0; o < res_data.length; o++) {
                                        const ubah_json = JSON.stringify(res_data[o]);
                                        const parse_data_inti = JSON.parse(res_data);
                                        const res_data_msg = parse_data_inti.msg;
                                        const res_data_code = parse_data_inti.code;
                                        const res_request = parse_data_inti.timerequest;
                                        const res_response = parse_data_inti.timerespons;
                                        const res_kdcab = parse_data_inti.kdcab;
                                        const res_kdtk = parse_data_inti.toko;
                                        const res_nama = parse_data_inti.nama;
                                        const res_station = parse_data_inti.station;
                                        const res_ip = parse_data_inti.ip;
                                        const res_data_inti = parse_data_inti.data;
                                        let objIndex = data_rows.findIndex(((obj: { IP: any; }) => obj.IP == res_ip));
                                        ReportMonitoringVersiPowershell(true,objIndex,data_rows,res_kdcab,res_kdtk,res_nama,res_station,res_ip,res_request,res_response,IDReport,res_data_code,res_data_msg,(res_data_inti === '' ? '' : res_data_inti));
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
                                        setDataProsentase(0)
                                        setData_rows(rows);
                                        setTextButtonFilter('Retrieve data failed '+' ('+arr_data_sukses_dan_gagal_from_Table[1]+')')
                                        if (msg.includes('Finis')) {
                                            setLoading(false);
                                            setisDisabled(false);
                                            setProgress(code + '-' + msg);
                                            isConnectedWS.current = 0
                                        } else {
                                            setProgress(code + '-' + msg);
                                            isConnectedWS.current = 1
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
                            setisDisabled(false);
                            setProgress(code + '-' + msg);
                            setLoadingButton(false)
                            isConnectedWS.current = 0               
                        } else if (code === 201) {
                            setProgress(code + "-" + msg);
                            setLoading(true);
                            setLoadingButton(true)
                            isConnectedWS.current = 1
                        } else if (parse_json.code.toString().substring(0, 1) === '4') {
                            setisDisabled(true);
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
                            setLoading(false);
                            setProgress('');
                            isConnectedWS.current = 0
                            setTextButtonFilter('Process')
                        }
                    });
                }
            } else {
                setisDisabled(false);
                setLoading(false);
                setTextButtonFilter('Process')
                isConnectedWS.current = 0
            }
        }
    };
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
                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{id: false}} jenis_laporan={t('Report Version Powershell Monitoring')} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS),new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={DataProsentase} in_rows_spanning={false} />
                </>
            } />
        </>
    )
}
export default FormVersiPowershell;