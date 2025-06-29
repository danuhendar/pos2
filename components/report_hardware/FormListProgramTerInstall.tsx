'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { useSelector } from "react-redux";
import { GridColDef} from "@mui/x-data-grid";
import { IRootState } from "@/store";
import { AddID, ConvertBinaryToText, GenerateUniqNumber, GetFailedClient, GetID, GetSignature, GetToken, GetTotalFailedClient, SummaryValueOfArray, WritePayload, convertSec, get_branch_code, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, handleLogout, millisToMinutesAndSeconds, removeItemOnceArray, start,stop, susun_ulang_data } from "@/lib/global";
import { useTranslation } from "react-i18next";
import CardInfoProses from "../form/CardInfoProses";
import ButtonFilter from "../button/ButtonFilter";
import ButtonReload from "../button/ButtonReload";
import DropDownBranch from "../dropdown/DropDownBranch";
import DropDownStation from "../dropdown/DropDownStation";
import { ReportInstalledProgram } from "@/controller/report_hardware/MonitoringReportHardware";
import IconSend from "../Icon/IconSend";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";

interface FormProgramTerInstallProps{
    url: string,
    command: string,
    IDReport: string,
}
const FormProgramTerInstall: React.FC<FormProgramTerInstallProps> = ({url,command,IDReport}) => {
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [IN_CMB_STATION,setStation] = useState("");
    const [data_rows,setData_rows] = useState([]);
    const [data_columns,setData_columns] = useState([]);
    const [active_reload,setActiveReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progressbar,setProgress] = useState('');
    const [isStopReload,setStopReload] = useState('0');
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
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const isConnectedWS = useRef(0)
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
        setisDisabled(false)
        setTextButtonFilter('Process')
    }
    const Def_Columns_Program_Install = (rows:any) => {
        let columns : GridColDef[] = [
            { field: 'id', headerName: 'id',  flex: 1},
            { 
                field: 'KODE', headerName: 'KODE',  width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                    <span className={cellValues.value === 200 ?  'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            { 
                field: 'KETERANGAN', headerName: 'KETERANGAN',  width: 240, minWidth: 240, maxWidth: 240,headerAlign:'center',align:'center',
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
            { field: 'STATION', headerName: 'STATION', width: 60, minWidth: 60, maxWidth: 60},
            { field: 'IP', headerName: 'IP',  width: 110, minWidth: 110, maxWidth: 110},
            { field: 'NAMA_PROGRAM', headerName: 'NAMA_PROGRAM',  flex: 1, width: 400, minWidth: 400, maxWidth: 400},
            { field: 'VERSI', headerName: 'VERSI',  flex: 1, width: 100, minWidth: 200, maxWidth: 200}
        ];
        let columnGroupingModel: any[] = [];
        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }
    var counter_id = 0;
    const HandleClick2 = async () =>{
        if(TextButtonFilter === 'Proses' || TextButtonFilter === 'Process'){
            var res_total_gagal = 0;
            var res_total_sukses = 0;
            counter_id = 0;
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setData_rows([]);
            setDataGagal('');
            setDataIP('');
            let in_counter = 0;
            start(in_counter,"timer");
            let rows = [];
            setStateCode(0);
            setClosedWS('');
            setLastResponse('');
            if(kdcab === ''){
                Swal.fire({
                    title: t("Warning"),
                    text: t("Select Branch Code"),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }else{
                var list_toko_sukses = '';
                var list_ip_failed = '';
                const station = IN_CMB_STATION;
                var key = GetToken()
                console.log(command)
                let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                const param = WritePayload(kdcab,"",station,"","COMMAND",res_command,3,false,IDReport,key,IP,true,30)
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
                    isConnectedWS.current = 0
                    setisDisabled(false)
                    setLoadingButton(false)
                });
                // Connection opened
                socket.addEventListener("open", (event) => {
                    socket.send(param);
                    isConnectedWS.current = 1
                });
                // Connection close
                socket.addEventListener("close", (event) => {
                    console.log('connection close');
                    setLoading(false);
                    stop();
                    setTextButtonFilter('Process')
                    setDataIP('')
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                    isConnectedWS.current = 0
                    setisDisabled(false)
                    setLoadingButton(false)
                });
                // Listen for messages
                socket.addEventListener("message",async (event) => {
                    const data = ConvertBinaryToText(event);
                    const parse_json = JSON.parse(await data);
                    const code = parse_json.code;
                    const msg = parse_json.msg;
                    const countdata = parse_json.amountData;
                    var total_gagal = 0;
                    setStateCode(code);
                    const tgl_kini = get_format_tanggal_jam();
                    setLastResponse(tgl_kini);
                    if(code === 200 || code === 209){
                        setProgress(code + '-' + msg);
                        if(isConnectedWS.current === 0){
                            setisDisabled(false)
                        }else{
                            setLoadingButton(true)
                            setisDisabled(true)
                        }
                        setLoading(true);
                        try{
                            const res_data = JSON.parse(parse_json.data);
                            const res_new = res_data;
                            var list_toko_failed = '';
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
                                const obj = ReportInstalledProgram(false,0,[],res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result);
                                for(var a = 0;a<obj.length;a++){
                                    rows.push(obj[a])
                                }
                                if(res_data_code !== 200){
                                    if(list_toko_failed.includes(res_ip)){
                                    
                                    }else{
                                        list_toko_failed += res_ip+",";
                                        res_total_gagal = res_total_gagal+1;
                                        setTotalGagal(res_total_gagal);
                                    }
                                    if(list_ip_failed.includes(res_ip)){

                                    }else{
                                        list_ip_failed += res_ip+",";
                                    }
                                }else{
                                    if(list_toko_sukses.includes(res_ip)){
                                    
                                    }else{
                                        list_toko_sukses += res_ip+","
                                        res_total_sukses = res_total_sukses+1
                                        setTotalSukses(res_total_sukses);
                                    }
                                }
                            }
                            //-- prosentase progressbar --//
                            var prosentase = Math.round(((res_total_sukses + res_total_gagal) / countdata) * 100);
                            setDataProsentase(prosentase)
                            const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'IP', false, false, false);
                            list_toko_failed = list_toko_failed.substring(0,(list_toko_failed.length-1));
                            setDataGagal(list_toko_failed);
                            list_ip_failed = list_ip_failed.substring(0,(list_ip_failed.length-1));
                            setDataIP(list_ip_failed);
                            let columns = []
                            let arr_res_columns = Def_Columns_Program_Install(rows);
                            columns = arr_res_columns[0];
                            const res_rows = AddID(rows);
                            setData_rows(res_rows);
                            setData_columns(columns);
                            
                            if(code === 209){
                                setLoading(false);
                                isConnectedWS.current = 0
                                setTextButtonFilter('Process')
                            }else{
                                setTotalSukses(msg.split('/')[1].split('/')[0]);
                                isConnectedWS.current = 1
                            }
                        }catch(Ex){
                            setLoading(false)
                        }
                    }else if(code === 201){
                        setLoading(true)
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
                        isConnectedWS.current = 0
                        setTextButtonFilter('Process')
                    }
                }); 
            }
        // ------------------------- PROSES DATA GAGAL ------------------------- //        
        }else{
            let rows = [];
            setLoading(true);
            setTextButtonFilter('Please wait')
            setData_rows([]);
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
                    const param = WritePayload(kdcab,res_data_gagal,station,"","COMMAND",res_command,3,false,IDReport,key,IP,true,30);
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
                        setisDisabled(false)
                        isConnectedWS.current = 0
                    });
                    // Connection opened
                    socket.addEventListener("open",()=>{
                        socket.send(param);
                        isConnectedWS.current = 1
                    });
                    // Connection close
                    socket.addEventListener("close", (event: any) => {
                        console.log('connection close');
                        setLoading(false);
                        setProgress(t('Finished Session'))
                        stop();
                        isConnectedWS.current = 0
                        setisDisabled(false)
                        const val_gagal = GetTotalFailedClient('value_total_gagal')
                        setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                    });
                    // Listen for messages
                    socket.addEventListener('message', async (event) => {
                        const data = ConvertBinaryToText(event);
                        const parse_json = JSON.parse(await data);
                        const code = parse_json.code;
                        const msg = parse_json.msg;
                        const countdata = parse_json.amountData;
                        if(code === 200 || code === 209){
                            setProgress(code + '-' + msg);
                            if(isConnectedWS.current === 0){
                                setisDisabled(false)
                            }else{
                                setisDisabled(true)
                            }
                            setLoading(true);
                            try{
                                const res_data = JSON.parse(parse_json.data);
                                const res_new = res_data;
                                var list_toko_failed = '';
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
                                    const obj = ReportInstalledProgram(false,0,[],res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result);
                                    for(var a = 0;a<obj.length;a++){
                                        rows.push(obj[a])
                                    }
                                    if(res_data_code !== 200){
                                        if(list_toko_failed.includes(res_ip)){
                                        
                                        }else{
                                            list_toko_failed += res_ip+",";
                                            res_total_gagal = res_total_gagal+1;
                                            setTotalGagal(res_total_gagal);
                                        }
                                        if(list_ip_failed.includes(res_ip)){

                                        }else{
                                            list_ip_failed += res_ip+",";
                                        }
                                    }else{
                                        if(list_toko_sukses.includes(res_ip)){
                                        
                                        }else{
                                            list_toko_sukses += res_ip+","
                                            res_total_sukses = res_total_sukses+1
                                            setTotalSukses(res_total_sukses);
                                        }
                                    }
                                }
                                //-- prosentase progressbar --//
                                var prosentase = Math.round(((res_total_sukses + res_total_gagal) / countdata) * 100);
                                setDataProsentase(prosentase)
                                const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'IP', false, false, false);
                                list_toko_failed = list_toko_failed.substring(0,(list_toko_failed.length-1));
                                setDataGagal(list_toko_failed);
                                list_ip_failed = list_ip_failed.substring(0,(list_ip_failed.length-1));
                                setDataIP(list_ip_failed);
                                let columns = []
                                let arr_res_columns = Def_Columns_Program_Install(rows);
                                columns = arr_res_columns[0];
                                setData_columns(columns);
                                const res_rows = AddID(rows);
                                setData_rows(res_rows);
                                setTextButtonFilter('Retrieve data failed'+' ('+total_gagal+')')
                                if(code === 209){
                                    setLoading(false);
                                    isConnectedWS.current = 0
                                }else{
                                    setTotalSukses(msg.split('/')[1].split('/')[0]);
                                    isConnectedWS.current = 1
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
                        }else if(code === 201){
                            setProgress(code+"-"+msg)
                            setLoading(true)
                            isConnectedWS.current = 1
                        }else if(code.toString().substring(0,1) === '4'){
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
    const HandleReloadClick = (idComponent:any) =>{
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
                                    <ButtonFilter in_icon={<IconSend />} in_title_button={TextButtonFilter} isDisabled={isDisabled} in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_filter"} isLoading={LoadingButton} HandleClick={HandleClick2} />
                                    &nbsp;
                                    <ButtonReload isDisabled={false} in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={false} HandleClick={HandleReloadClick} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CardInfoProses total_station={total_station} total_sukses={total_sukses} total_gagal={total_gagal} in_classname_content={"mx-auto grid max-w-[900px] grid-cols-4 justify-items-center gap-3"} />
                    </div>
                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={t('Report Installed Apps')} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS), new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={DataProsentase} in_rows_spanning={false}  />
                </>
            } />
        </>
    )
}
export default FormProgramTerInstall;