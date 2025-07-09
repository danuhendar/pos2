'use client'
import { Fragment, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Select from 'react-select';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import config from '@/lib/config.json';
import { AddID, ConvertBinaryToText, GetFailedClient, GetID, GetToken, GetTotalFailedClient, HitungSuksesDanGagalFomTable, SummaryValueOfArray, WritePayloadKoneksi, WritePayloadSetRouter, get_branch_code, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, start,stop } from "@/lib/global";
import IconSend from "../Icon/IconSend";
import { Posts } from "@/lib/post";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";
import CardInfoProses from "../form/CardInfoProses";
import DropDownBranch from "../dropdown/DropDownBranch";
import ButtonReload from "../button/ButtonReload";
import ButtonFilter from "../button/ButtonFilter";
import ModalComponent from "../modal/ModalComponent";
import IconSettings from "../Icon/IconSettings";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import InputTextType from "../form/InputTypeText";
import themeConfig from "@/theme.config";
import { SendConfigRouter } from "@/controller/report_network/MonitoringReportNetwork";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";


interface FormMonitoringConfigWDCPProps{
    url: string,
    station: string,
    IDReport: string,
}
var options6 = [ { value: '+07:00', label: '+07:00' },{ value: '+08:00', label: '+08:00' },{ value: '+09:00', label: '+09:00' }];
const FormMonitoringConfigWDCP: React.FC<FormMonitoringConfigWDCPProps> = ({url,station,IDReport}) => {
    const MySwal = withReactContent(Swal);
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [data_rows,setData_rows] = useState([]);
    const [data_columns,setData_columns] = useState([]);
    const [columnGroupingModel,setcolumnGroupingModel] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progressbar,setProgress] = useState('');
    const [total_station,setTotalStation] = useState(0);
    const [total_sukses,setTotalSukses] = useState(0);
    const [total_gagal,setTotalGagal] = useState(0);
    const [DataProsentase,setDataProsentase] = useState(0);
    const [IP,setDataIP] = useState('');
    const [FormKodeToko,setFormKodeToko] = useState('');
    const [FormNamaToko,setFormNamaToko] = useState('');
    const [FormIP,setFormIP] = useState('');
    const [FormIp_Routing_CDC,setFormIp_Routing_CDC] = useState('');
    const [Formip_routing_VSAT,setFormIp_Routing_VSAT] = useState('');
    const [FormIp_Routing_Dawuan,setFormIp_Routing_Dawuan] = useState('');
    const [FormIp_Routing_CBN,setFormIp_Routing_CBN] = useState('');
    
    const [FOrmTimeZoneRouter,setTimeZoneRouter] = useState('');
    const [FOrmServerNTP_1,setFormServerNTP_1] = useState('');
    const [FOrmServerNTP_2,setFormServerNTP_2] = useState('');
    const [option_form_toko,setoption_form_toko] = useState([]);

    const [modal13, setModal13] = useState(false);
    const [stateCode,setStateCode] = useState(0);
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();
    const router = useRouter();
    const [LoadingButton,setLoadingButton] = useState(false)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const [isDisabled,setisDisabled] = useState(false)
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
            setDataIP('');
        }
    };
    
    const userFormSelectKodeToko = (value: any) => {
        if(JSON.stringify(value).includes('Semua')){
            var all_data = option_form_toko;
            var arr_kode_toko = "";
            var arr_nama_toko = "";
            var arr_ip = "";
            for(var i = 0;i<all_data.length;i++){
                if(all_data[i].value.split(':')[0] !== ''){
                    arr_kode_toko = arr_kode_toko+all_data[i].value.split(':')[0]+",";
                    arr_nama_toko = arr_nama_toko+all_data[i].label.split(':')[1]+",";
                    arr_ip = arr_ip+all_data[i].value.split(':')[1]+",";
                }
            }
            setFormKodeToko(arr_kode_toko);
            setFormNamaToko(arr_nama_toko.split('undefined').join(''));
            setFormIP(arr_ip);
        }else{
            var arr_kode_toko = "";
            var arr_nama_toko  = "";
            var arr_ip = "";
            if(i === (value.length - 1 )){
                arr_kode_toko = value[0].value.split(':')[1];
            }else{
                for(var i = 0;i<value.length;i++){
                    if(value[i].value.split(':')[0] !== ''){
                        arr_kode_toko = arr_kode_toko+value[i].value.split(':')[0]+",";
                        arr_nama_toko = arr_nama_toko+value[i].label.split(':')[1]+",";
                        arr_ip = arr_ip+value[i].value.split(':')[1]+",";
                    }
                }
            }
            setFormKodeToko(arr_kode_toko);
            setFormNamaToko(arr_nama_toko.split('undefined').join(''));
            setFormIP(arr_ip);
        }
    };
 
    const userFormSelectTimeZone = (value:any)=>{
        if(value.length == 0){
            setTimeZoneRouter('')
        }else{
            var arr_station = value.value;
            setTimeZoneRouter(arr_station);
        }
    }
    const FormInputRoutingIPCDC = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setFormIp_Routing_CDC(val);  
    };
    const FormInputRoutingIPVSAT = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setFormIp_Routing_VSAT(val);  
    };
    const FormInputRoutingIPDawuan = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setFormIp_Routing_Dawuan(val);  
    };
    const FormInputRoutingIPCBN = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setFormIp_Routing_CBN(val);  
    };
    const FormInputServerNTP1 = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setFormServerNTP_1(val);  
    };
      const FormInputServerNTP2 = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setFormServerNTP_2(val);  
    };
    
    const HandleClick2 = () =>{
        if(TextButtonFilter === 'Proses' || TextButtonFilter === 'Process'){
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            let in_counter = 0;
            start(in_counter,"timer");
            var list_ip_failed = '';
            var list_toko_failed = '';
            var total_gagal = 0;
            var total_sukses = 0;
            setStateCode(0);
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
                const param =  WritePayloadSetRouter(FormIP.substring(0,(FormIP.length - 1)),FormIp_Routing_CDC,FormIp_Routing_Dawuan,Formip_routing_VSAT,kdcab,FOrmServerNTP_1,FOrmServerNTP_2,station,FOrmTimeZoneRouter,key,FormKodeToko.substring(0,(FormKodeToko.length-1)),true,FormIp_Routing_CBN);
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
                    setLoadingButton(false)
                    stop();
                    isConnectedWS.current = 0
                });
                
                // Connection opened
                socket.addEventListener("open", (event) => {
                    socket.send(param);
                    console.log(param)
                    setTextButtonFilter('Please wait')
                    setLoadingButton(true)
                    isConnectedWS.current = 1
                });
                // Connection close
                socket.addEventListener("close", (event) => {
                    console.log('connection close');
                    setLoading(false);
                    stop();
                    setTextButtonFilter('Process')
                    setisDisabled(false)
                    setLoadingButton(false)
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
                    setLoadingButton(true)
                    if (code === 200 || code === 209) {
                        setProgress(code + '-' + msg);
                        console.log(code+' - '+msg)
                        setLoading(true);
                        if (((msg.includes('Mohon di tunggu'))) || (msg.includes('Handletime kami Default'))) {
                         
                        } else {
                            if(isConnectedWS.current === 0){
                                setisDisabled(false)
                            }else{
                                setisDisabled(true)
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
                                    const res_kdcab = parse_data_inti.kdcab;
                                    const res_kdtk = parse_data_inti.toko;
                                    const res_nama = parse_data_inti.nama;
                                    const res_station = parse_data_inti.station;
                                    const res_ip = parse_data_inti.ip;
                                    const result = parse_data_inti.data;
                                    const objIndex = data_rows.findIndex(((obj: { IP: any; }) => obj.IP == res_ip));
                                    SendConfigRouter(objIndex,data_rows,res_kdcab,res_kdtk,res_nama,res_ip,res_station,'','',IDReport,res_data_code,res_data_msg,result)
                                        
                                    if(res_data_code === 200){
                                        total_sukses = total_sukses + 1;
                                        setTotalSukses(total_sukses);
                                        if (list_toko_sukses.includes(res_kdtk)) {

                                        } else {
                                            list_toko_sukses += res_kdtk + ",";
                                        }
                                    }else{
                                        total_gagal = total_gagal + 1;
                                        setTotalGagal(total_gagal);
                                        if (list_toko_failed.includes(res_kdtk)) {

                                        } else {
                                            list_toko_failed += res_kdtk + ",";
                                        }

                                        if (list_ip_failed.includes(res_ip)) {

                                        } else {
                                            list_ip_failed += res_ip + ",";
                                        }
                                    }
                                }

                                if (code === 209) {
                                    setLoading(false);
                                    setProgress(code + '-' + msg);
                                    setLoadingButton(false)
                                    setTextButtonFilter('Process')
                                } else {
                                    setProgress(code + '-' + msg);
                                }
                                
                            } catch (Ex) {
                                console.log('error parsing : ' + Ex.toString())
                                setLoading(false)
                            }
                        }
                    }
                    else if(code === 201) {
                        setProgress(code + "-" + msg);
                        setLoading(true);
                    }else if(code === 400) {
                        setLoading(true);
                        for(var k = 0;k<data_rows.length;k++){
                            const idx_kdtk = data_rows[k].KDTK;
                            if(msg.includes(idx_kdtk)){
                                const objIndex = data_rows.findIndex(((obj: { KDTK: any; }) => obj.KDTK == idx_kdtk));
                                data_rows[objIndex].STATUS = 'Data kosong';
                            }
                        }
                        setLoading(false);
                        setProgress('');
                    }else if(code === 402){
                        handleLogout();
                    }else{

                    }
                });
            }
        //----------------- PROSES DATA GAGAL ----------------//    
        }else{
        
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

    const handleRowDetailClick = ()=>{
        try{
            setModal13(true);
            setData_rows([]);
            GetTokoByBranch(IN_CMB_KODE_CABANG);
            setTimeZoneRouter('');
            setFormServerNTP_1('');
            setFormServerNTP_2('');
            setFormKodeToko('');

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

    const Def_Column_Setting_Configurasi = (is_setting_device:boolean,rows:any) => {
        let arr_ret = []
        if(is_setting_device){
            const columns: GridColDef[] = [
                { field: 'id', headerName: 'id', flex: 1 },
                { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
                { field: 'KDTK', headerName: 'KDTK', width: 60, minWidth: 60, maxWidth: 60 },
                { field: 'NAMA', headerName: 'NAMA', width: 180, minWidth: 180, maxWidth: 180 },
                { field: 'IP', headerName: 'IP', width: 120, minWidth: 120, maxWidth: 120 },
                { field: 'TIMEZONE_ROUTER', headerName: 'TIMEZONE_ROUTER', width: 150, minWidth: 150, maxWidth: 150 },
                { field: 'SERVER_NTP_1', headerName: 'SERVER_NTP_1', width: 150, minWidth: 150, maxWidth: 150 },
                { field: 'SERVER_NTP_2', headerName: 'SERVER_NTP_2', width: 150, minWidth: 150, maxWidth: 150 },
                { field: 'KODE', headerName: 'KODE', width: 60, minWidth: 60, maxWidth: 60,
                    renderCell: (cellValues: any) => {
                        return (
                        <span className={cellValues.value === 200 ?  'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                        );
                    }
                },
                { field: 'KETERANGAN', headerName: 'KETERANGAN', width: 280, minWidth: 280, maxWidth: 280,
                    renderCell: (cellValues: any) => {
                        return (
                        <span className={cellValues.value === 'Succes' ?  'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                        );
                    }
                },
                { field: 'INSTALL_SCRIPT', headerName: 'INSTALL_SCRIPT', width: 150, minWidth: 150, maxWidth: 150,
                    renderCell: (cellValues: any) => {
                        return (
                                <span className={cellValues.value !== 'BELUM PROSES' ?  (cellValues.value !== 'NOK' ? 'badge bg-success':  'badge bg-danger')  : 'badge bg-danger'}>
                                    {cellValues.value}
                                </span>
                        )
                    }
                },
                { field: 'INSTALL_NETWATCH', headerName: 'INSTALL_NETWATCH', width: 150, minWidth: 150, maxWidth: 150,
                    renderCell: (cellValues: any) => {
                        return (
                            
                            <span className={cellValues.value !== 'BELUM PROSES' ?  (cellValues.value !== 'NOK' ? 'badge bg-success':  'badge bg-danger')  : 'badge bg-danger'}>
                                {cellValues.value}
                            </span>
                        )
                    }
                },
                { field: 'INSTALL_SCHEDULE', headerName: 'INSTALL_SCHEDULE', width: 150, minWidth: 150, maxWidth: 150,
                    renderCell: (cellValues: any) => {
                        return (
                            
                            <span className={cellValues.value !== 'BELUM PROSES' ?  (cellValues.value !== 'NOK' ? 'badge bg-success':  'badge bg-danger')  : 'badge bg-danger'}>
                                {cellValues.value}
                            </span>
                            
                        )
                    }
                },
                { field: 'INSTALL_RUNSCHEDULE', headerName: 'INSTALL_RUNSCHEDULE', width: 170, minWidth: 170, maxWidth: 170,
                    renderCell: (cellValues: any) => {
                        return (
                            
                            <span className={cellValues.value !== 'BELUM PROSES' ?  (cellValues.value !== 'NOK' ? 'badge bg-success':  'badge bg-danger')  : 'badge bg-danger'}>
                                {cellValues.value}
                            </span>
                        )
                    }
                },
                { field: 'TIME_ROUTER', headerName: 'TIME_ROUTER', width: 180, minWidth: 180, maxWidth: 180 },
                { field: 'TIME_REQUEST', headerName: 'TIME_REQUEST', width: 180, minWidth: 180, maxWidth: 180 },
                { field: 'TIME_RESPONSE', headerName: 'TIME_RESPONSE', width: 180, minWidth: 180, maxWidth: 180 },
            ];

            const columnGroupingModel: GridColumnGroupingModel = [
                {
                    groupId: 'Internal',
                    description: '',
                    children: [{ field: 'id' }],
                },

                {
                    groupId: ' ',
                    children: [{ field: 'KDCAB' },{ field: 'KDTK' }, { field: 'NAMA' },   { field: 'IP' }, { field: 'TIMEZONE_ROUTER' }, { field: 'SERVER_NTP_1' }, { field: 'SERVER_NTP_2' }],
                },
                {
                    groupId: 'RESPONSE_ROUTER',
                    children: [{field:'KODE'},{field:'KETERANGAN'},{ field: 'INSTALL_SCRIPT' },{ field: 'INSTALL_NETWATCH' },{ field: 'INSTALL_SCHEDULE' },{ field: 'INSTALL_RUNSCHEDULE' }, { field: 'TIME_ROUTER' }, { field: 'TIME_REQUEST' }, { field: 'TIME_RESPONSE' }],
                }
            ];
            arr_ret = [columns,columnGroupingModel];
        }else{
            const columns: GridColDef[] = [
                    { field: 'id', headerName: 'id', flex: 1 },
                    { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
                    { field: 'KDTK', headerName: 'KDTK', width: 60, minWidth: 60, maxWidth: 60 },
                    { field: 'NAMA', headerName: 'NAMA', width: 180, minWidth: 180, maxWidth: 180 },
                    { field: 'IP', headerName: 'IP', width: 120, minWidth: 120, maxWidth: 120 },
                    { field: 'IP_ROUTING_CDC', headerName: 'IP_ROUTING_CDC', width: 150, minWidth: 150, maxWidth: 150 },
                    { field: 'IP_ROUTING_VSAT', headerName: 'IP_ROUTING_VSAT', width: 150, minWidth: 150, maxWidth: 150 },
                    { field: 'IP_ROUTING_DAWUAN', headerName: 'IP_ROUTING_DAWUAN', width: 180, minWidth: 180, maxWidth: 180 },
                    { field: 'IP_ROUTING_CBN', headerName: 'IP_ROUTING_CBN', width: 180, minWidth: 180, maxWidth: 180 },
                    { field: 'TIMEZONE_ROUTER', headerName: 'TIMEZONE_ROUTER', width: 150, minWidth: 150, maxWidth: 150 },
                    { field: 'SERVER_NTP_1', headerName: 'SERVER_NTP_1', width: 150, minWidth: 150, maxWidth: 150 },
                    { field: 'SERVER_NTP_2', headerName: 'SERVER_NTP_2', width: 150, minWidth: 150, maxWidth: 150 },
                    { field: 'KODE', headerName: 'KODE', width: 60, minWidth: 60, maxWidth: 60,
                        renderCell: (cellValues: any) => {
                            return (
                            <span className={cellValues.value === 200 ?  'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                            );
                        }
                    },
                    { field: 'KETERANGAN', headerName: 'KETERANGAN', width: 280, minWidth: 280, maxWidth: 280,
                        renderCell: (cellValues: any) => {
                            return (
                            <span className={cellValues.value === 'Succes' ?  'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                            );
                        }
                    },
                    { field: 'INSTALL_SCRIPT', headerName: 'INSTALL_SCRIPT', width: 150, minWidth: 150, maxWidth: 150,
                        renderCell: (cellValues: any) => {
                            return (
                                
                                    <span className={cellValues.value !== 'BELUM PROSES' ?  (cellValues.value !== 'NOK' ? 'badge bg-success':  'badge bg-danger')  : 'badge bg-danger'}>
                                        <div id={'script_' + cellValues.id}>
                                        {cellValues.value}
                                        </div>
                                    </span>
                                
                                
                            )
                        }
                    },
                    { field: 'INSTALL_NETWATCH', headerName: 'INSTALL_NETWATCH', width: 150, minWidth: 150, maxWidth: 150,
                        renderCell: (cellValues: any) => {
                            return (
                                
                                <span className={cellValues.value !== 'BELUM PROSES' ?  (cellValues.value !== 'NOK' ? 'badge bg-success':  'badge bg-danger')  : 'badge bg-danger'}>
                                        <div id={'netwatch_' + cellValues.id}>
                                        {cellValues.value}
                                        </div>
                                    </span>
                                
                                
                            )
                        }
                    },
                    { field: 'INSTALL_SCHEDULE', headerName: 'INSTALL_SCHEDULE', width: 150, minWidth: 150, maxWidth: 150,
                        renderCell: (cellValues: any) => {
                            return (
                                
                                <span className={cellValues.value !== 'BELUM PROSES' ?  (cellValues.value !== 'NOK' ? 'badge bg-success':  'badge bg-danger')  : 'badge bg-danger'}>
                                        <div id={'schedule_' + cellValues.id}>
                                        {cellValues.value}
                                        </div>
                                    </span>
                            )
                        }
                    },
                    { field: 'INSTALL_RUNSCHEDULE', headerName: 'INSTALL_RUNSCHEDULE', width: 170, minWidth: 170, maxWidth: 170,
                        renderCell: (cellValues: any) => {
                            return (
                                
                                <span className={cellValues.value !== 'BELUM PROSES' ?  (cellValues.value !== 'NOK' ? 'badge bg-success':  'badge bg-danger')  : 'badge bg-danger'}>
                                        <div id={'runschedule_' + cellValues.id}>
                                        {cellValues.value}
                                        </div>
                                    </span>
                            )
                        }
                    },
                    { field: 'TIME_ROUTER', headerName: 'TIME_ROUTER', width: 180, minWidth: 180, maxWidth: 180 },
                    { field: 'TIME_REQUEST', headerName: 'TIME_REQUEST', width: 180, minWidth: 180, maxWidth: 180 },
                    { field: 'TIME_RESPONSE', headerName: 'TIME_RESPONSE', width: 180, minWidth: 180, maxWidth: 180 },
                ];

                const columnGroupingModel: GridColumnGroupingModel = [
                    {
                        groupId: 'Internal',
                        description: '',
                        children: [{ field: 'id' }],
                    },

                    {
                        groupId: ' ',
                        children: [{ field: 'KDCAB' },{ field: 'KDTK' }, { field: 'NAMA' },   { field: 'IP' },{ field: 'IP_ROUTING_CDC' }, ,{ field: 'IP_ROUTING_VSAT' },{ field: 'IP_ROUTING_DAWUAN' },{ field: 'IP_ROUTING_CBN' },{ field: 'TIMEZONE_ROUTER' }, { field: 'SERVER_NTP_1' }, { field: 'SERVER_NTP_2' }],
                    },
                
                    {
                        groupId: 'RESPONSE_ROUTER',
                        children: [{ field: 'KODE' },{ field: 'KETERANGAN' },{ field: 'INSTALL_SCRIPT' },{ field: 'INSTALL_NETWATCH' },{ field: 'INSTALL_SCHEDULE' },{ field: 'INSTALL_RUNSCHEDULE' }, { field: 'TIME_ROUTER' }, { field: 'TIME_REQUEST' }, { field: 'TIME_RESPONSE' }],
                    }
                ];
            arr_ret = [columns,columnGroupingModel];
        }
        return arr_ret;
    }

    const SetDataKonfigurasi = (IN_CMB_KODE_CABANG:string,FormKodeToko:any,FormNamaToko:any,FormIP:any,FOrmTimeZoneRouter:string,FOrmServerNTP_1:string,FOrmServerNTP_2:string,FormIp_Routing_CDC:string,Formip_routing_VSAT:string,FormIp_Routing_Dawuan:string,FormIp_Routing_CBN:string) =>{
        if(station === 'RBWDCP'){
            if(FOrmServerNTP_1 === '' || FOrmServerNTP_2 === '' || FOrmTimeZoneRouter === '' || FormKodeToko === ''){
                Swal.fire({
                    title: t("Warning"),
                    text: "Parameter tidak boleh ada yang kosong!",
                    icon: "error",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }else{
                setData_rows([]);
                const length_kdtk = FormKodeToko.split(',');
                const length_nama = FormNamaToko.split(',');
                const length_ip = FormIP.split(',');
                var rows = [];
                for(var i = 0;i<length_kdtk.length;i++){
                    const res_kdtk = length_kdtk[i];
                    const res_ip = length_ip[i];
                    const res_nama = length_nama[i];
                    if(res_kdtk !== ''){
                        const arr_content = {
                            'KDCAB':IN_CMB_KODE_CABANG,
                            'KDTK':res_kdtk,
                            'NAMA':res_nama,
                            'IP':res_ip,
                            'TIMEZONE_ROUTER':FOrmTimeZoneRouter,
                            'SERVER_NTP_1':FOrmServerNTP_1,
                            'SERVER_NTP_2':FOrmServerNTP_2,
                            'KODE':0,
                            'KETERANGAN':'BELUM PROSES',
                            'INSTALL_SCRIPT':'BELUM PROSES',
                            'INSTALL_NETWATCH':'BELUM PROSES',
                            'INSTALL_SCHEDULE':'BELUM PROSES',
                            'INSTALL_RUNSCHEDULE':'BELUM PROSES',
                            'TIME_ROUTER':'-',
                            'TIME_REQUEST':'-',
                            'TIME_RESPONSE':'-'
                        };
                        rows.push(arr_content);
                    }else{

                    }
                }
                let arr_res_columns = Def_Column_Setting_Configurasi(true,rows)
                let columns = arr_res_columns[0];
                let columnsGroupModel = arr_res_columns[1];  
                setLoading(false);
                setData_columns(columns);
                setcolumnGroupingModel(columnsGroupModel);
                var res_rows = AddID(rows);
                setData_rows(res_rows);
                MySwal.fire({
                    title: "Konfigurasi telah disiapkan, Mohon Cek Kembali Konfigurasi",
                    toast: true,
                    position: isRtl ? 'top-start' : 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: `color-success`,
                    },
                });
                setModal13(false);
            }
        }else{
            
            if(FOrmServerNTP_1 === '' || FOrmServerNTP_2 === '' || FOrmTimeZoneRouter === '' || FormKodeToko === '' || FormIp_Routing_CDC === '' || Formip_routing_VSAT === ''|| FormIp_Routing_Dawuan === ''){
                Swal.fire({
                    title: t("Warning"),
                    text: "Parameter tidak boleh ada yang kosong!",
                    icon: "error",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }else{
                setData_rows([]);
                const length_kdtk = FormKodeToko.split(',');
                const length_nama = FormNamaToko.split(',');
                const length_ip = FormIP.split(',');
                var rows = [];
                for(var i = 0;i<length_kdtk.length;i++){
                    const res_kdtk = length_kdtk[i];
                    const res_ip = length_ip[i];
                    const res_nama = length_nama[i];
                    if(res_kdtk !== ''){
                        const arr_content = {
                            'KDCAB':IN_CMB_KODE_CABANG,
                            'KDTK':res_kdtk,
                            'NAMA':res_nama,
                            'IP':res_ip,
                            'IP_ROUTING_CDC':FormIp_Routing_CDC,
                            'IP_ROUTING_VSAT':Formip_routing_VSAT,
                            'IP_ROUTING_DAWUAN':FormIp_Routing_Dawuan,
                            'IP_ROUTING_CBN':FormIp_Routing_CBN,
                            'TIMEZONE_ROUTER':FOrmTimeZoneRouter,
                            'SERVER_NTP_1':FOrmServerNTP_1,
                            'SERVER_NTP_2':FOrmServerNTP_2,
                            'KODE':'0',
                            'KETERANGAN':'BELUM PROSES',
                            'INSTALL_SCRIPT':'BELUM PROSES',
                            'INSTALL_NETWATCH':'BELUM PROSES',
                            'INSTALL_SCHEDULE':'BELUM PROSES',
                            'INSTALL_RUNSCHEDULE':'BELUM PROSES',
                            'TIME_ROUTER':'-',
                            'TIME_REQUEST':'-',
                            'TIME_RESPONSE':'-'
                        };
                        rows.push(arr_content);
                    }else{

                    }
                
                }

                let arr_res_columns = Def_Column_Setting_Configurasi(false,rows)
                let columns = arr_res_columns[0];
                let columnsGroupModel = arr_res_columns[1];  
                setData_columns(columns);
                setLoading(false);
                setcolumnGroupingModel(columnsGroupModel);
                var res_rows = AddID(rows);
                setData_rows(res_rows);
                MySwal.fire({
                    title: "Konfigurasi telah disiapkan, Mohon Cek Kembali Konfigurasi",
                    toast: true,
                    position: isRtl ? 'top-start' : 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: `color-success`,
                    },
                });
                setModal13(false);
            }
        }
    }
    const GetTokoByBranch = (in_kdcab:string) =>{
        try{
            const url = `http://${IN_HOST}:${IN_PORT}/store/v1/ViewCabang`;
            const param = {kdcab:in_kdcab};
            const Token = GetToken()
            Posts(url,JSON.stringify(param),false,Token).then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        try{
                            if(parseFloat(code) === 200){
                                var data_body = JSON.parse(res_data.data);
                                var res_data_rows_body = [];
                                var arr_content1 = {
                                    'label':'-- Semua Toko --',
                                    'value':'',
                                };
                                res_data_rows_body.push(arr_content1);
                                let jumlah_ip_wdcp = 0;
                                for(var b = 0;b<data_body.length;b++){
                                    let res_station = data_body[b].station.toString();
                                    let res_toko = data_body[b].toko.toString();
                                    
                                    if(res_station === 'RBWDCP' || res_station === 'RBKONEKSI'){
                                        let objIndex_RBKONEKSI = data_body.findIndex(
                                            (obj: { toko: any; station: any; }) => obj.toko === res_toko && obj.station === 'RBKONEKSI'
                                        );

                                        if(objIndex_RBKONEKSI === -1){
                                            if(res_station === 'RBWDCP'){
                                                var arr_content = {
                                                    'label':data_body[b].toko+':'+data_body[b].nama,
                                                    'value':data_body[b].toko+':'+data_body[b].ip,
                                                };
                                                res_data_rows_body.push(arr_content);
                                                jumlah_ip_wdcp = jumlah_ip_wdcp+1;
                                                console.log('res_toko : '+res_toko+' - '+objIndex_RBKONEKSI+' Add IP RBWDCP 1')
                                            }
                                           
                                        }else{
                                            if(station === 'RBKONEKSI'){
                                                if(res_station === 'RBKONEKSI'){
                                                    var arr_content = {
                                                        'label':data_body[b].toko+':'+data_body[b].nama,
                                                        'value':data_body[b].toko+':'+data_body[b].ip,
                                                    };
                                                    res_data_rows_body.push(arr_content);
                                                    jumlah_ip_wdcp = jumlah_ip_wdcp+1;
                                                    console.log('res_toko : '+res_toko+' - '+objIndex_RBKONEKSI+' station : '+station+' Add IP RBKONEKSI')
                                                }
                                              
                                            }else if(station === 'RBWDCP'){
                                                if(res_station === 'RBWDCP'){
                                                    var arr_content = {
                                                        'label':data_body[b].toko+':'+data_body[b].nama,
                                                        'value':data_body[b].toko+':'+data_body[b].ip,
                                                    };
                                                    res_data_rows_body.push(arr_content);
                                                    jumlah_ip_wdcp = jumlah_ip_wdcp+1;
                                                    console.log('res_toko : '+res_toko+' - '+objIndex_RBKONEKSI+' station : '+station+' Add IP RBWDCP 2')
                                                }
                                            }
                                        }
                                       
                                    }else{
                                       
                                    }
                                }
                                if(jumlah_ip_wdcp === 0){
                                    Swal.fire({
                                        title: t("Warning"),
                                        text: "Tokomain dengan Station "+station+" Tidak ada, mohon lakukan singkron pada menu 1.2 Upload Tokomain!",
                                        icon: "warning",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    });
                                    setModal13(false);
                                }
                                setoption_form_toko(res_data_rows_body);
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
                
            );
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error Get Toko : "+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            }); 
        }
    }
    const CloseModal = () => {
        setModal13(false)
    }
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <>
        <AntiScrapedShieldComponent in_content={
            <>
                <div className="grid-cols-2 gap-3  md:grid-cols-2 mb-3 flex items-end justify-left">
                    <div className="mb-3 w-1/2 h-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
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
                                    <div className="mb-2">
                                        <div className="mt-2.5 grid grid-cols-1 gap-1 mb-2.5">
                                            <ButtonFilter in_icon={<IconSettings />} in_title_button={'Setting'} in_classname={!isDark ? 'btn btn-warning w-full rounded-full text-end text-xs' : 'btn btn-outline-warning w-full rounded-full text-xs'} idComponent={GetID()} isLoading={false} isDisabled={false} HandleClick={handleRowDetailClick} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-1">
                                            <div>
                                                <ButtonFilter in_icon={<IconSend />} in_title_button={TextButtonFilter} in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={GetID()} isLoading={LoadingButton} isDisabled={isDisabled} HandleClick={HandleClick2} />
                                            </div>
                                            <div>
                                                <ButtonReload in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={false} isDisabled={false} HandleClick={HandleReloadClick} />
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                    </div>
                    <CardInfoProses total_station={total_station} total_sukses={total_sukses} total_gagal={total_gagal} in_classname_content={"mx-auto grid max-w-[900px] grid-cols-4 justify-items-center gap-3"} />
                    </div>
                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Monitoring Config Router ' + station.split('_').join(' ')} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'KDTK'} type_sorting={'asc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={DataProsentase} in_rows_spanning={false}  />
                    <ModalComponent in_size_modal={`panel animate__animated my-7 w-1/3 overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-sm font-bold"} in_title_modal={t('Form') + ' ' + t('Router')} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                    <div className="p-2">
                        <div className="mb-3"><label htmlFor="dropdownLeftButton">{t('Store')}</label></div>
                        <div className="mb-3">
                            <div className="w-full">
                                <Select onChange={userFormSelectKodeToko} id="cmb_kode_Toko" placeholder={t('Select Store')} options={option_form_toko} isMulti isSearchable={true} />
                            </div>
                        </div>
                        {station === 'RBWDCP' ?
                            <div className="grid grid-cols-1 gap-1">
                                <div>
                                    <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options6} isSearchable={true} isMulti={false} event={userFormSelectTimeZone} name_component={"Time Zone Router"} idComponent={"cmb_timezone"} />
                                </div>
                            </div>
                            :
                            <div className="grid grid-cols-2 gap-1">
                                <div>
                                    <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options6} isSearchable={true} isMulti={false} event={userFormSelectTimeZone} name_component={"Time Zone Router"} idComponent={"cmb_timezone"} />
                                </div>
                                <div>
                                    <InputTextType   in_title={"IP Routing CDC"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark rounded-xl"} data_options={undefined} isDisabled={false} event={FormInputRoutingIPCDC} in_value={FormIp_Routing_CDC} />
                                </div>
                            </div>
                        }
                        {station === 'RBWDCP' ? '' :
                            <div className="grid grid-cols-2 gap-1">
                                <div>
                                    <InputTextType   in_title={"IP Routing VSAT"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark rounded-xl"} data_options={undefined} isDisabled={false} event={FormInputRoutingIPVSAT} in_value={Formip_routing_VSAT} />
                                </div>
                                <div>
                                    <InputTextType   in_title={"IP Routing Dawuan"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark rounded-xl"} data_options={undefined} isDisabled={false} event={FormInputRoutingIPDawuan} in_value={FormIp_Routing_Dawuan} />
                                </div>
                                <div>
                                    <InputTextType   in_title={"IP Routing CBN"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark rounded-xl"} data_options={undefined} isDisabled={false} event={FormInputRoutingIPCBN} in_value={FormIp_Routing_CBN} />
                                </div>
                            </div>}
                        <div className="grid grid-cols-2 gap-1">
                            <div>
                                <InputTextType   in_title={"Server NTP 1"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark rounded-xl"} data_options={undefined} isDisabled={false} event={FormInputServerNTP1} in_value={FOrmServerNTP_1} />
                            </div>
                            <div>
                                <InputTextType   in_title={"Server NTP 2"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark rounded-xl"} data_options={undefined} isDisabled={false} event={FormInputServerNTP2} in_value={FOrmServerNTP_2} />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-end">
                            <ButtonFilter in_classname={"btn btn-outline-danger"} idComponent={""} isLoading={false} isDisabled={false} HandleClick={CloseModal} in_icon={undefined} in_title_button={"Cancel"} />
                            <button id="btn_send" onClick={() => {
                                station === 'RBWDCP' ?
                                    SetDataKonfigurasi(IN_CMB_KODE_CABANG, FormKodeToko, FormNamaToko, FormIP, FOrmTimeZoneRouter, FOrmServerNTP_1, FOrmServerNTP_2, FormIp_Routing_CDC, Formip_routing_VSAT, FormIp_Routing_Dawuan, FormIp_Routing_CBN)
                                    :
                                    SetDataKonfigurasi(IN_CMB_KODE_CABANG, FormKodeToko, FormNamaToko, FormIP, FOrmTimeZoneRouter, FOrmServerNTP_1, FOrmServerNTP_2, FormIp_Routing_CDC, Formip_routing_VSAT, FormIp_Routing_Dawuan, FormIp_Routing_CBN);
                            } }
                                type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                {t('Submit') + ' ' + t('Configuration')}
                            </button>
                        </div>
                    </div>
                }  /> 
            </>
        } />
        </>
    )
}
export default FormMonitoringConfigWDCP;