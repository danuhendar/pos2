'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { GridColDef} from "@mui/x-data-grid";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertBinaryToText, GetFailedClient, GetID, GetSignature, GetToken, GetTotalFailedClient, SendHandleRowClick, WritePayload, get_branch_code, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, handleLogout, millisToMinutesAndSeconds, setTombolAmbilDataGagal, start, stop } from "@/lib/global";
import CardInfoProses from "../form/CardInfoProses";
import { useTranslation } from "react-i18next";
import DropDownBranch from "../dropdown/DropDownBranch";
import DropDownStation from "../dropdown/DropDownStation";
import ButtonFilter from "../button/ButtonFilter";
import ButtonReload from "../button/ButtonReload";
import { ReportMonitoringVersiOneClick } from "@/controller/report_hardware/MonitoringReportHardware";
import IconSend from "../Icon/IconSend";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";

interface FormMonitoringOneClickProps{
    url: string,
    command: string,
    IDReport: string,
}

const FormMonitoringOneClick: React.FC<FormMonitoringOneClickProps> = ({url,command,IDReport}) => {
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [IN_CMB_STATION,setStation] = useState("");
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
    const router = useRouter();
    const [stateCode,setStateCode] = useState(0);
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [options5,setOption5] = useState([]);
    const { t, i18n } = useTranslation();
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const isConnectedWS = useRef(0)
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
        }
        setTextButtonFilter('Process')
        setDataIP('');
    };

    const userSelectStation = (value:any) => {
        setStation(value.value);
        setTextButtonFilter('Process')
        setDataIP('');
    }
    
    const Def_Columns_ReportMonitoringVersiOneClick = (rows:any) =>{
        let columns : GridColDef[] = [
            { field: 'id', headerName: 'id',  flex: 1},
            { 
                field: 'CLICK_FOR_ACTION', headerName: 'CLICK_FOR_ACTION',  flex: 1,  width: 150, minWidth: 150, maxWidth: 150,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span id={'btn_refresh_' + cellValues.id} className={cellValues.value === 200 ? 'badge bg-primary cursor-pointer' : 'badge bg-danger cursor-pointer'}>
                            <a onClick={(event) => {
                                    NewhandleRowClick(event, cellValues,rows);
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
                field: 'KETERANGAN', headerName: 'KETERANGAN',  width: 240, minWidth: 240, maxWidth: 240,
                renderCell: (cellValues: any) => {
                    return (
                    <span className={cellValues.value === 'Succes' ?  'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            { field: 'REQUEST', headerName: 'REQUEST',  width: 250, minWidth: 250, maxWidth: 250},
            { field: 'RESPONSE', headerName: 'RESPONSE',  width: 250, minWidth: 250, maxWidth: 250},
            { field: 'KDCAB', headerName: 'KDCAB',   width: 60, minWidth: 60, maxWidth: 60},
            { field: 'KDTK', headerName: 'KDTK',  width: 80, minWidth: 80, maxWidth: 80},
            { field: 'NAMA', headerName: 'NAMA',  flex: 1,width: 250, minWidth: 250, maxWidth: 250},
            { field: 'STATION', headerName: 'STATION', width: 90, minWidth: 90, maxWidth: 90},
            { field: 'IP', headerName: 'IP',  width: 150, minWidth: 150, maxWidth: 250},
            { field: 'PRINTER', headerName: 'PRINTER',  flex: 1, width: 400, minWidth: 400, maxWidth: 400},
            { field: 'VERSI_PRINTER', headerName: 'VERSI_PRINTER',  flex: 1, width: 140, minWidth: 140, maxWidth: 140},
            { field: 'HARDWARE', headerName: 'HARDWARE',  flex: 1, width: 400, minWidth: 400, maxWidth: 400},
            { field: 'VERSI_HARDWARE', headerName: 'VERSI_HARDWARE',  flex: 1, width: 140, minWidth: 140, maxWidth: 140},
            { field: 'SOFTWARE', headerName: 'SOFTWARE',  flex: 1, width: 400, minWidth: 400, maxWidth: 400},
            { field: 'VERSI_SOFTWARE', headerName: 'VERSI_SOFTWARE',  flex: 1, width: 140, minWidth: 140, maxWidth: 140},
            { field: 'LAIN_LAIN', headerName: 'LAIN_LAIN',  flex: 1, width: 400, minWidth: 400, maxWidth: 400},
            { field: 'VERSI_LAIN_LAIN', headerName: 'VERSI_LAIN_LAIN',  flex: 1, width: 140, minWidth: 140, maxWidth: 140}
            
        ];
        let columnGroupingModel: any[] = [];
        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }

    const HandleClick2 = async () =>{
        if(TextButtonFilter === 'Proses' || TextButtonFilter === 'Process'){
            var counter_id = 0;
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setData_rows([]);
            setDataGagal('');
            setDataIP('');
            let in_counter = 0;
            start(in_counter,"timer");
            setStateCode(0);
            setClosedWS('');
            setLastResponse('');
            let rows = [];
            if(kdcab === ''){
                Swal.fire({
                    title: t("Warning"),
                    text: t("Select Branch Code"),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }else{
                const station = IN_CMB_STATION;
                var key = GetToken()
                let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                const param = WritePayload(kdcab,"",station,"","COMMAND",res_command,2,false,IDReport,key,IP,true,30);
                setTextButtonFilter('Please wait')
                const socket = new WebSocket(url);
                socket.binaryType = 'blob';
                // Connection Error
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
                    setisDisabled(false)
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                    isConnectedWS.current = 0
                });
                // Connection opened
                socket.addEventListener("open", (event) => {
                    socket.send(param);
                    isConnectedWS.current = 1
                    setLoadingButton(true)
                });
                // Connection close
                socket.addEventListener("close", (event) => {
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
                    setisDisabled(false)
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                    isConnectedWS.current = 0
                });
                // Listen for messages
                socket.addEventListener("message", async event => {
                    const data = await ConvertBinaryToText(event);
                    const parse_json = JSON.parse(data);
                    const code = parse_json.code;
                    const msg = parse_json.msg;
                    const countdata = parse_json.amountData;
                    setStateCode(code);
                    const tgl_kini = get_format_tanggal_jam();
                    setLastResponse(tgl_kini);
                    if(code === 200 || code === 209){
                            setProgress(code + '-' + msg);
                            setLoadingButton(true)
                             if(isConnectedWS.current === 0){
                                setisDisabled(false);
                            }else{
                                setisDisabled(true);
                            }
                            setLoading(true);
                            try{
                                const res_data = JSON.parse(parse_json.data);
                                const res_new = res_data;
                                var list_ip_failed = '';
                                var list_toko_failed = '';
                                var list_toko_sukses = '';
                                setTotalStation(countdata);
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
                                    const result = parse_data_inti.data;
                                    //-- MONITORING VERSI ONE CLICK --//
                                    const obj = ReportMonitoringVersiOneClick(false,0,[],res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result)
                                    rows.push(obj[0])
                                    if(res_data_code !== 200){
                                        if(list_toko_failed.includes(res_kdtk)){
                                            
                                        }else{
                                            list_toko_failed += res_kdtk+",";
                                        }
    
                                        if(list_ip_failed.includes(res_ip)){
    
                                        }else{
                                            list_ip_failed += res_ip+",";
                                        }
                                    }else{
                                        if(list_toko_sukses.includes(res_kdtk)){
                                            
                                        }else{
                                            list_toko_sukses += res_kdtk+",";
                                        }
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
                                
                                let arr_res_columns = Def_Columns_ReportMonitoringVersiOneClick(rows)
                                let columns = arr_res_columns[0];
                                let columnsGroupModel = arr_res_columns[1];
                                setData_columns(columns);  
                                var res_rows = AddID(rows);
                                setData_rows(res_rows);
                                setTextButtonFilter('Retrieve data failed'+' ('+arr_data_sukses_dan_gagal_from_Table[1]+')')
                                if(code === 209){
                                    setLoadingButton(false)
                                    setLoading(false);
                                    isConnectedWS.current = 0
                                }else{
                                    isConnectedWS.current = 1
                                }
                                
                            }catch(Ex){
                                console.log('error parsing : '+Ex.toString());
                                const val_gagal = GetTotalFailedClient('value_total_gagal')
                                setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                                setLoading(false);
                                setLoadingButton(false)
                            }
                    }else if(code === 201){
                        setProgress(code+"-"+msg);
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
    
                        setLoading(false);
                        setProgress('');
                        if(code === 403){
                            //-- redirect ke login --//
                            handleLogout();
                        }
                        setTextButtonFilter('Process')
                        isConnectedWS.current = 0
                    }
                });
                
            }
        // ------------------------- PROSES DATA GAGAL ------------------------- //      
        }else{
            const res_data_gagal = data_gagal;
            if(res_data_gagal !== ''){
                let in_counter = 0;
                start(in_counter,"timer");
                counter_id = 0;
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
                    const station = IN_CMB_STATION;
                    var key = GetToken()
                    let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                    const param = WritePayload(kdcab,res_data_gagal,station,"","COMMAND",res_command,4,false,IDReport,key,IP,true,30);
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
                        setTextButtonFilter('Process')
                        setisDisabled(false)
                        isConnectedWS.current = 0
                    });
                    // Connection opened
                    socket.addEventListener("open",()=>{
                        socket.send(param);
                        setLoadingButton(true)
                        isConnectedWS.current = 1
                    });
                    // Connection close
                    socket.addEventListener("close", (event: any) => {
                        console.log('connection close');
                        setLoading(false);
                        setProgress(t('Finished Session'))
                        stop();
                        setisDisabled(false)
                        setLoadingButton(false)
                        isConnectedWS.current = 0
                        const val_gagal = GetTotalFailedClient('value_total_gagal');
                        setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                    });

                    // Listen for messages
                    socket.addEventListener('message', async (event) => {
                        const data = ConvertBinaryToText(event);
                        const parse_json = JSON.parse(await data);
                        const code = parse_json.code;
                        const msg = parse_json.msg;
                        let rows = [];
                        if(code === 200 || code === 209){
                            setProgress(code+'-'+msg);
                            if(((msg.includes('Mohon di tunggu'))) || (msg.includes('Handletime kami Default')) ){

                            }else{
                                    setLoading(true);
                                    setDataProsentase(0)
                                    if(isConnectedWS.current === 0){
                                        setisDisabled(false)
                                    }else{
                                        setisDisabled(true)
                                    }
                                    try{
                                        const ubah_data_inti_json = JSON.stringify(parse_json.Data);
                                        const res_data = JSON.parse(ubah_data_inti_json);
                                        for (var o = 0; o < res_data.length; o++) {
                                            const ubah_json = JSON.stringify(res_data[o]);
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
                                            const result = parse_data_inti.data;
                                            let objIndex = data_rows.findIndex(((obj: { IP: any; }) => obj.IP == res_ip));
                                            ReportMonitoringVersiOneClick(true,objIndex,data_rows,res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result)
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
                                            if(msg.includes('Finis')){
                                                setLoading(false);
                                                isConnectedWS.current = 0
                                                setLoadingButton(false)
                                            }else{
                                                isConnectedWS.current = 1
                                            }
                                        }
                                    }catch(Ex){
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
                            setProgress(code+'-'+msg); 
                            isConnectedWS.current = 0
                        }else if(parse_json.code.toString() === '201'){
                            setProgress(code+"-"+msg);
                            setLoading(true);
                            isConnectedWS.current = 1
                        }else if(parse_json.code.toString().substring(0,1) === '4'){
                            setLoading(true);
                            setLoading(false);
                            setProgress('');                           
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
                            setTextButtonFilter('Process')
                            isConnectedWS.current = 0
                        }
                    });
                }
            }else{
                Swal.fire({
                    title: t("Information"),
                    text: "Tidak ada data yang gagal !",
                    icon: "info",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setLoading(false);
                setTextButtonFilter('Process')
                isConnectedWS.current = 0
            }
        }
    };
    const NewhandleRowClick = async (event:any, cellValues:any, data_prev:any) => {
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
            //console.log('id_btn : '+id_btn)
            start(in_counter, id_btn);
            setLoading(true);
            const myExample = document.getElementById(id_btn);
            //myExample.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" class="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>&nbsp;proses';
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
                        const objIndex = data_prev.findIndex(((obj: { id: any; }) => obj.id == row_id));
                        const res_data_inti = parse_data_inti[0].data.split('\r\n');
                        var res_nama_one_click_printer = ''; 
                        var res_versi_one_click_printer = '';
                        var res_nama_one_click_hardware = ''; 
                        var res_versi_one_click_hardware = '';

                        var res_nama_one_click_software = ''; 
                        var res_versi_one_click_software = '';

                        var res_nama_one_click_lain_lain = ''; 
                        var res_versi_one_click_lain_lain = '';

                        for(var i = 0;i<res_data_inti.length;i++){
                            
                                const res_nama_program = res_data_inti[i];
                                if(res_nama_program.includes(';')){
                                    if( (res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('PRINTER')){
                                        res_nama_one_click_printer = res_nama_program.split(';')[0]; 
                                        res_versi_one_click_printer = res_nama_program.split(';')[1];
                                    }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('HARDWARE')){
                                        res_nama_one_click_hardware = res_nama_program.split(';')[0]; 
                                        res_versi_one_click_hardware = res_nama_program.split(';')[1];
                                    }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('SOFTWARE')){
                                        res_nama_one_click_software = res_nama_program.split(';')[0]; 
                                        res_versi_one_click_software = res_nama_program.split(';')[1];
                                    }else{
                                        res_nama_one_click_lain_lain = res_nama_program.split(';')[0]; 
                                        res_versi_one_click_lain_lain = res_nama_program.split(';')[1];
                                    }
                                }else{
                                    var res_nama_one_click = ''; 
                                    if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('PRINTER')){
                                        res_nama_one_click_printer = res_nama_program; 
                                        res_versi_one_click_printer = '-';
                                    }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('HARDWARE')){
                                        res_nama_one_click_hardware = res_nama_program;
                                        res_versi_one_click_hardware = '-';
                                    }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('SOFTWARE')){
                                        res_nama_one_click_software = res_nama_program;
                                        res_versi_one_click_software = '-';
                                    }else{
                                        res_nama_one_click_lain_lain = res_nama_program;
                                        res_versi_one_click_lain_lain = '-';
                                    }
                                }          
                        }
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
                        data_prev[objIndex].PRINTER = res_nama_one_click_printer;
                        data_prev[objIndex].VERSI_PRINTER = res_versi_one_click_printer;
                        data_prev[objIndex].HARDWARE = res_nama_one_click_hardware;
                        data_prev[objIndex].VERSI_HARDWARE = res_versi_one_click_hardware;
                        data_prev[objIndex].SOFTWARE = res_nama_one_click_software;
                        data_prev[objIndex].VERSI_SOFTWARE = res_versi_one_click_software;
                        data_prev[objIndex].LAIN_LAIN = (res_nama_one_click_lain_lain == '' ? '-' : res_nama_one_click_lain_lain);
                        data_prev[objIndex].VERSI_LAIN_LAIN = res_nama_one_click_lain_lain;
                        //Log object to console again.
                        var rows = data_prev;
                        //-- parse hitung dari data yang terupdate --//
                        const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'KODE', false, false, false);
                        //console.log('arr_data_sukses_dan_gagal_from_Table : '+JSON.stringify(arr_data_sukses_dan_gagal_from_Table));
                        setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                        setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);

                    }else{
                        const objIndex = data_prev.findIndex(((obj: { id: any; }) => obj.id == row_id));
                        //console.log('objIndex : '+objIndex);
                        
                        //Log object to Console.
                        //console.log("Before update: ", data_prev[objIndex])

                        //Update object's name property.
                        
                        const res_data_inti = parse_data_inti[0].data.split('\r\n');
                        var res_nama_one_click_printer = ''; 
                        var res_versi_one_click_printer = '';
                        
                        var res_nama_one_click_hardware = ''; 
                        var res_versi_one_click_hardware = '';

                        var res_nama_one_click_software = ''; 
                        var res_versi_one_click_software = '';

                        var res_nama_one_click_lain_lain = ''; 
                        var res_versi_one_click_lain_lain = '';
                            
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
                        data_prev[objIndex].PRINTER = res_nama_one_click_printer;
                        data_prev[objIndex].VERSI_PRINTER = res_versi_one_click_printer;
                        data_prev[objIndex].HARDWARE = res_nama_one_click_hardware;
                        data_prev[objIndex].VERSI_HARDWARE = res_versi_one_click_hardware;
                        data_prev[objIndex].SOFTWARE = res_nama_one_click_software;
                        data_prev[objIndex].VERSI_SOFTWARE = res_versi_one_click_software;
                        data_prev[objIndex].LAIN_LAIN = (res_nama_one_click_lain_lain == '' ? '-' : res_nama_one_click_lain_lain)
                        data_prev[objIndex].VERSI_LAIN_LAIN = res_nama_one_click_lain_lain;
                        var rows = data_prev;
                        //-- parse hitung dari data yang terupdate --//
                        const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'KODE', false, false, false)
                        //console.log('arr_data_sukses_dan_gagal_from_Table : '+JSON.stringify(arr_data_sukses_dan_gagal_from_Table));
                        setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0])
                        setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1])
                    }    
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
    const HandleReloadClick = (idComponent:any) =>{
        try{
            setData_rows([]);
            router.reload();
        }catch(Ex){
            console.log('error : '+Ex.toString())
        }
    };
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode)
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
                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={t('Report One Click Monitoring')} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS), new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={DataProsentase} in_rows_spanning={false}  />  
                </>
            } />
        </>
    )
}
export default FormMonitoringOneClick;