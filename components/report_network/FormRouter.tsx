'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import { AddID, ConvertBinaryToText, GetFailedClient, GetID, GetToken, GetTotalFailedClient, HitungSuksesDanGagalFomTable, SummaryValueOfArray, WritePayloadKoneksi, get_branch_code, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, start,stop } from "@/lib/global";
import CardInfoProses from "../form/CardInfoProses";
import { useTranslation } from "react-i18next";
import { SettingRouter_WDCP } from "@/controller/report_network/MonitoringReportNetwork";
import themeConfig from "@/theme.config";
import DropDownBranch from "../dropdown/DropDownBranch";
import ButtonReload from "../button/ButtonReload";
import ButtonFilter from "../button/ButtonFilter";
import IconSend from "../Icon/IconSend";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
interface FormRouterProps{
    url: string,
    station: string,
    IDReport: string,
}
const FormRouter: React.FC<FormRouterProps> = ({url,station,IDReport}) => {
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [data_rows,setData_rows] = useState([]);
    const [data_columns,setData_columns] = useState([]);
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
    const [options5,setOption5] = useState([]);
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const [stateCode,setStateCode] = useState(0);
    const { t, i18n } = useTranslation();
    const isConnectedWS = useRef(0)
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);

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
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        let arr_cabang = get_branch_code(false,false);
        setOption5(arr_cabang)
    },[]);
    
    const Def_Columns_Router = (rows:any) => {
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
            { field: 'REQUEST', headerName: 'REQUEST',  width: 125, minWidth: 150, maxWidth: 150},
            { field: 'RESPONSE', headerName: 'RESPONSE',  width: 125, minWidth: 150, maxWidth: 150},
            { field: 'KDCAB', headerName: 'KDCAB',   width: 60, minWidth: 60, maxWidth: 60},
            { field: 'KDTK', headerName: 'KDTK',  width: 80, minWidth: 80, maxWidth: 80},
            { field: 'NAMA', headerName: 'NAMA',  flex: 1,width: 250, minWidth: 250, maxWidth: 250},
            { field: 'STATION', headerName: 'STATION', width: 140, minWidth: 140, maxWidth: 140},
            { field: 'IP', headerName: 'IP',  width: 110, minWidth: 110, maxWidth: 250},
            { field: 'ARCHITECTURE_NAME', headerName: 'ARCHITECTURE_NAME',  width: 150, minWidth: 150, maxWidth: 150},
            { field: 'BAD_BLOCKS', headerName: 'BAD_BLOCKS',  width: 150, minWidth: 150, maxWidth: 150},
            { field: 'BOARD_NAME', headerName: 'BOARD_NAME',  flex: 1, width: 160, minWidth: 160, maxWidth: 160},
            { field: 'BUILD_TIME', headerName: 'BUILD_TIME',  flex: 1, width: 200, minWidth: 200, maxWidth: 200},
            { field: 'CPU_COUNT', headerName: 'CPU_COUNT',  flex: 1, width: 180, minWidth: 180, maxWidth: 180},
            { field: 'CPU_FREQUENCY', headerName: 'CPU_FREQUENCY',  flex: 1, width: 120, minWidth: 120, maxWidth: 120},
            { field: 'CPU_LOAD', headerName: 'CPU_LOAD',  flex: 1, width: 120, minWidth: 120, maxWidth: 120},
            { field: 'FACTORY_SOFTWARE', headerName: 'FACTORY_SOFTWARE',  flex: 1, width: 120, minWidth: 120, maxWidth: 120},
            { field: 'FREE_HDD_SPACE', headerName: 'FREE_HDD_SPACE',  flex: 1, width: 160, minWidth: 160, maxWidth: 160},
            { field: 'TOTAL_HDD_SPACE', headerName: 'TOTAL_HDD_SPACE',  flex: 1, width: 160, minWidth: 160, maxWidth: 160},
            { field: 'FREE_MEMORY', headerName: 'FREE_MEMORY',  flex: 1, width: 160, minWidth: 160, maxWidth: 160},
            { field: 'TOTAL_MEMORY', headerName: 'TOTAL_MEMORY',  flex: 1, width: 160, minWidth: 160, maxWidth: 160},
            { field: 'PLATFORM', headerName: 'PLATFORM',  flex: 1, width: 120, minWidth: 120, maxWidth: 120},
            { field: 'UPTIME', headerName: 'UPTIME',  flex: 1, width: 120, minWidth: 120, maxWidth: 120},
            { field: 'VERSION', headerName: 'VERSION',  flex: 1, width: 160, minWidth: 160, maxWidth: 160},
            { field: 'WRITE_SECT_SINCE_REBOOT', headerName: 'WRITE_SECT_SINCE_REBOOT',  flex: 1, width: 200, minWidth: 200, maxWidth: 200},
            { field: 'WRITE_SECT_TOTAL', headerName: 'WRITE_SECT_TOTAL',  flex: 1, width: 160, minWidth: 160, maxWidth: 160}
        ];
        const columnGroupingModel: GridColumnGroupingModel = [];
        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }

    const HandleClick2 = () =>{
        if(TextButtonFilter === 'Proses' ||  TextButtonFilter === 'Process'){
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setData_rows([]);
            let in_counter = 0;
            start(in_counter,"timer");
            let rows = []
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
                const param =  WritePayloadKoneksi(kdcab,"",station,3,key,IDReport);
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
                });
                // Connection opened
                socket.addEventListener("open", (event) => {
                    socket.send(param)
                    setTextButtonFilter('Please wait')
                    setLoadingButton(true)
                    setisDisabled(true)
                    isConnectedWS.current = 1
                });
                // Connection close
                socket.addEventListener("close", (event) => {
                    console.log('connection close');
                    setLoading(false);
                    setProgress(t('Finished Session'));
                    stop()
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
                    setLoadingButton(false)
                    isConnectedWS.current = 0
                });
                // Listen for messages
                socket.addEventListener("message", async(event) => {
                    const data = ConvertBinaryToText(event);
                    const parse_json = JSON.parse(await data);
                    const code = parse_json.code;
                    const msg = parse_json.msg;
                    const countdata = parse_json.amountData;
                    var total_gagal = 0;
                    var total_sukses = 0;
                    setStateCode(code);
                    if(code === 200 || code === 209){
                        setProgress(code + '-' + msg);
                        if(isConnectedWS.current === 0){
                            setisDisabled(false)
                        }else{
                            setisDisabled(true)
                        }
                        setLoading(true);
                        if((msg.includes('Mohon di tunggu'))){

                        }else{
                            try{
                                const res_data = JSON.parse(parse_json.data);
                                const res_new = res_data;
                                var list_toko_failed = '';
                                var list_toko_sukses = '';
                                var list_ip_failed = '';
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
                                    const obj = SettingRouter_WDCP(false,0,[],res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result)
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
                                        total_sukses = total_sukses+1;
                                        if(list_toko_sukses.includes(res_kdtk)){
                                        
                                        }else{
                                            list_toko_sukses += res_kdtk+",";
                                        }
                                    }   
                                }
                                //-- parse hitung dari data yang terupdate --//
                                const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows,'KODE',false,false,true);
                                setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                                setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
                                //-- prosentase progressbar --//
                                var prosentase = Math.round(((arr_data_sukses_dan_gagal_from_Table[0] + arr_data_sukses_dan_gagal_from_Table[1]) / countdata) * 100);
                                setDataProsentase(prosentase)
                                list_toko_failed = list_toko_failed.substring(0,(list_toko_failed.length-1));
                                setDataGagal(list_toko_failed);
                                list_ip_failed = list_ip_failed.substring(0,(list_ip_failed.length-1));
                                setDataIP(list_ip_failed);
                                //-- definisikan columns --//
                                let arr_res_columns = Def_Columns_Router(rows);
                                let columns = arr_res_columns[0];
                                let columnsGroupModel = arr_res_columns[1];
                                setData_columns(columns);
                                const res_rows = AddID(rows);
                                setData_rows(res_rows);
                                setTextButtonFilter('Retrieve data failed  ('+arr_data_sukses_dan_gagal_from_Table[1]+')')
                                //-- end of definisikan columns --//
                                if(code === 209){
                                    setLoading(false);
                                    isConnectedWS.current = 0
                                }else{
                                    isConnectedWS.current = 1
                                }
                            }catch(Ex){
                                console.log('Error : '+Ex.toString())
                                const val_gagal = GetTotalFailedClient('value_total_gagal')
                                setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                                setLoading(false)
                                setLoadingButton(false)
                            }
                        }
                    }else if(code === 201){
                        setProgress(code+"-"+msg);
                        setLoading(true);
                        isConnectedWS.current = 1
                    }else if(parse_json.code.toString().substring(0,1) === '4'){
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
        //----------------- PROSES DATA GAGAL ----------------//    
        }else{
            const res_data_gagal = data_gagal;
            setDataProsentase(0)
            if(res_data_gagal !== ''){
                let in_counter = 0;
                start(in_counter,"timer");
                const kdcab = IN_CMB_KODE_CABANG;
                let rows_concat = [];
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
                    const param =  WritePayloadKoneksi(kdcab,res_data_gagal,station,3,key,IDReport);
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
                    });
                    // Connection opened
                    socket.addEventListener("open",()=>{
                        socket.send(param);
                        setLoadingButton(true)
                        setisDisabled(true)
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
                        setisDisabled(false)
                        isConnectedWS.current = 0
                    });

                    // Listen for messages
                    socket.addEventListener('message', async (event) => {
                        const data = ConvertBinaryToText(event);
                        const parse_json = JSON.parse(await data);
                        const code = parse_json.code;
                        const msg = parse_json.msg;
                        if(code === 200 || code === 209){
                            setProgress(code+'-'+msg);
                            if(((msg.includes('Mohon di tunggu'))) || (msg === 'Handletime kami Default menjadi 3 detik ...') ){
                                
                            }else{
                                
                                setLoading(true);
                                try{
                                    const ubah_data_inti_json = JSON.stringify(parse_json.Data);
                                    const res_data = JSON.parse(ubah_data_inti_json);
                                    for (var o = 0; o < res_data.length; o++) {
                                            const ubah_json = JSON.stringify(res_data[o]);
                                            const parse_data_inti = JSON.parse(ubah_json);
                                            const id = (o+1);
                                            const res_data_code = parse_data_inti.code;
                                            const res_data_msg = parse_data_inti.msg;
                                            const res_request = parse_data_inti.timerequest;
                                            const res_response = parse_data_inti.timerespons;
                                            const res_kdcab = parse_data_inti.kdcab;
                                            const res_kdtk = parse_data_inti.toko;
                                            const res_nama = parse_data_inti.nama;
                                            const res_station = parse_data_inti.station;
                                            const res_ip = parse_data_inti.ip;
                                            const result = parse_data_inti.data;
                                            const objIndex = data_rows.findIndex(((obj: { IP: any; }) => obj.IP == res_ip));
                                            SettingRouter_WDCP(true,objIndex,data_rows,res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result)
                                            var rows = data_rows;
                                            //-- parse hitung dari data yang terupdate --//
                                            const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows,'KODE',false,false,true);
                                            setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                                            setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
                                            const res_data_gagal_after_trigger = GetFailedClient(rows,'KDCAB',false);
                                            setDataGagal(res_data_gagal_after_trigger);
                                            const res_ip_gagal_after_trigger = GetFailedClient(rows,'KDCAB',true);
                                            setDataIP(res_ip_gagal_after_trigger);
                                            setTextButtonFilter('Retrieve data failed ('+arr_data_sukses_dan_gagal_from_Table[1]+')')
                                            if (code === 209) {
                                                setLoading(false)
                                                setisDisabled(false)
                                                setLoadingButton(false)
                                                isConnectedWS.current = 0
                                            } else {
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
                        }else if(code === 201){
                            setProgress(code + "-" + msg);
                            setLoading(true);
                            setisDisabled(true)
                            isConnectedWS.current = 0
                        }else if(parse_json.code.toString().substring(0,1) === '4'){
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
                            setTextButtonFilter('Process')
                            setProgress('');
                        }
                    });
                }
            }else{
                setLoading(false);
                setTextButtonFilter('Process')
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
                    <div className="mb-3 w-1/2 h-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
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
                                    <DropDownBranch in_classname_title={"mt-9 mb-3"} in_classname_content={"w-full"} data_options={options5} isSearchable={true} isMulti={true} event={userSelectKodeCabang} />
                                    <div className="mb-14">
                                        <div className="flex">
                                            <ButtonFilter in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={GetID()} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSend />} in_title_button={TextButtonFilter} HandleClick={HandleClick2} />
                                            &nbsp;
                                            <ButtonReload in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={false} isDisabled={false} HandleClick={HandleReloadClick} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <CardInfoProses total_station={total_station} total_sukses={total_sukses} total_gagal={total_gagal} in_classname_content={"mx-auto grid max-w-[900px] grid-cols-4 justify-items-center gap-3"} />
                    </div>
                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={t('Report') + ' Monitoring ' + station.split('_').join(' ')} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={DataProsentase} in_rows_spanning={false}  />
                </>
            } />
        </>
    )
}
export default FormRouter;