'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import config from '@/lib/config.json';
import { AddID, ConvertBinaryToText, GetID, GetToken, WritePayloadKoneksi, get_branch_code, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, setTombolAmbilDataGagal, start, stop } from "@/lib/global";
import DataTablesColourCell from "../table/DataTablesColurCell";
import { useTranslation } from "react-i18next";
import DropDownBranch from "../dropdown/DropDownBranch";
import ButtonFilter from "../button/ButtonFilter";
import IconSend from "../Icon/IconSend";
import { ReportMonitoringRBWDCP } from "@/controller/report_network/MonitoringReportNetwork";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";

interface FormReportMonitoringWDCPProps {
    url: string,
    IDReport: string,
    station: string,
}
const FormReportMonitoringWDCP: React.FC<FormReportMonitoringWDCPProps> = ({ url, IDReport,station }) => {
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progressbar, setProgress] = useState('');

    const [total_station, setTotalStation] = useState(0);
    const [total_sukses, setTotalSukses] = useState(0);
    const [total_gagal, setTotalGagal] = useState(0);
    const [IP, setDataIP] = useState('');
    const [Visible,setVisible] = useState(false);
    const [stateCode,setStateCode] = useState(0);
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
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
            setDataIP('');
        }
    };

    const Def_Column_Monitoring_RBWDCP = (rows:any)=> {
        const columns = [
            { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
            { field: 'KDCAB', headerName: 'KDCAB',  width: 60, minWidth: 60, maxWidth: 60},
            { field: 'TOKO', headerName: 'TOKO',  width: 60, minWidth: 60, maxWidth: 60},
            { field: 'NAMA', headerName: 'NAMA',  width: 200, minWidth: 200, maxWidth: 200},
            { field: 'IPTOKOMAIN', headerName: 'IPTOKOMAIN',  width: 130, minWidth: 130, maxWidth: 130},
            { field: 'IPROUTER', headerName: 'IPROUTER',  width: 130, minWidth: 130, maxWidth: 130},
            { field: 'STATION', headerName: 'STATION',  width: 100, minWidth: 100, maxWidth: 100},
            { field: 'KONEKSI', headerName: 'KONEKSI',  width: 120, minWidth: 120, maxWidth: 120},
            { field: 'TIMEROUTER', headerName: 'TIMEROUTER',  width: 155, minWidth: 155, maxWidth: 150},
            { field: 'ADDTIME', headerName: 'ADDTIME',  width: 155, minWidth: 155, maxWidth: 155},
            { field: 'VERSI', headerName: 'VERSI',  width: 150, minWidth: 150, maxWidth: 150},
            { field: 'USERADMIN', headerName: 'USERADMIN',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'USERNOADMIN', headerName: 'USERNOADMIN',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'USEROVER_1', headerName: 'USEROVER_1',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'SSIDOVER_1', headerName: 'SSIDOVER_1',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'SSIDOVER_2', headerName: 'SSIDOVER_2',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'WDCP_N', headerName: 'WDCP_N',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'WDCP_Y', headerName: 'WDCP_Y',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'WDCPWDS_Y', headerName: 'WDCPWDS_Y',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'APKA_N', headerName: 'APKA_N',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'APKA_Y', headerName: 'APKA_Y',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'APKAWDS_Y', headerName: 'APKAWDS_Y',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'PASSWDCP', headerName: 'PASSWDCP',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'MAC_0', headerName: 'MAC_0',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'MACKRG_2', headerName: 'MACKRG_2',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'MACLBH_2', headerName: 'MACLBH_2',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'TELNET_23', headerName: 'TELNET_23',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'FTP_21', headerName: 'FTP_21',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'SSH_22', headerName: 'SSH_22',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'WWW_80', headerName: 'WWW_80',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'API_8278', headerName: 'API_8278',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'APISSL_8279', headerName: 'APISSL_8279',  width: 100, minWidth: 100, maxWidth: 100,headerAlign:'center',align:'center'},
            { field: 'WINBOX_8291', headerName: 'WINBOX_8291',  width: 100, minWidth: 100, maxWidth: 100,headerAlign:'center',align:'center'},
            { field: 'BRIDGE', headerName: 'BRIDGE',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
            { field: 'FIREWALL', headerName: 'FIREWALL',  width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},   
        ];
        let columnGroupingModel = []
        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }
 
    const HandleClick2 = () =>{
        if(TextButtonFilter === 'Proses' || TextButtonFilter === 'Process'){
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setData_rows([]);
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
                let rows = []
                setVisible(false);
                setLoading(true);
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
                    setVisible(true);
                    setProgress(t('Finished Session'));
                    setLoadingButton(false)
                });
                // Connection opened
                socket.addEventListener("open", (event) => {
                    socket.send(param);
                    setLoadingButton(true)
                    setisDisabled(true)
                    setTextButtonFilter('Please wait')
                    isConnectedWS.current = 1
                });
                // Connection close
                socket.addEventListener("close", (event) => {
                    console.log('connection close');
                    setLoading(false);
                    setVisible(true);
                    setProgress(t('Finished Session'));
                    setLoadingButton(false)
                    setTextButtonFilter('Process')
                    isConnectedWS.current = 0
                });
                // Listen for messages
                socket.addEventListener("message", async(event) => {
                    const data = ConvertBinaryToText(event);
                    const parse_json = JSON.parse(await data);
                    const code = parse_json.code;
                    const msg = parse_json.msg;
                    const tgl_kini = get_format_tanggal_jam();
                    setLastResponse(tgl_kini);
                    if(code === 200 || code === 209){
                            console.log(code+'->'+msg)
                            setProgress(code+'-'+msg);
                            setLoading(true)
                            if(isConnectedWS.current === 0){
                                setLoadingButton(false)
                                setisDisabled(false)
                            }else{
                                setLoadingButton(true)
                                setisDisabled(true)
                            }
                            try{
                                //-- MONITORING RBWDCP --//
                                const res_data = JSON.parse(parse_json.data)
                                const obj = ReportMonitoringRBWDCP(res_data)
                                for(var a = 0;a<obj.length;a++){
                                    rows.push(obj[a])
                                }
                                let arr_res_columns = Def_Column_Monitoring_RBWDCP(rows)
                                let columns = arr_res_columns[0];
                                setData_columns(columns);
                                const res_rows = AddID(rows);
                                setData_rows(res_rows);
                                if(code === 209){
                                    setLoading(false);
                                    setLoadingButton(false)
                                    setisDisabled(false)
                                    setVisible(true);
                                    isConnectedWS.current = 0
                                }else{
                                    setProgress(code+'-'+msg); 
                                    setVisible(true);
                                    setLoading(false);
                                    isConnectedWS.current = 1
                                }
                            }catch(Ex){
                                console.log('Error : '+Ex.toString())
                                if(code === 209){
                                    setLoading(false)
                                    setLoadingButton(false)
                                    setisDisabled(false)
                                    setVisible(true)
                                    setTextButtonFilter('Process')
                                    isConnectedWS.current = 0
                                }
                            }
                    }else if(code === 201){
                        setLoading(true);
                        setisDisabled(true)
                        isConnectedWS.current = 1
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
                        setTextButtonFilter('Process')
                        setLoading(false);
                        setProgress('');
                    }
                });
                
            }
        //----------------- PROSES DATA GAGAL ----------------//    
        }else{
             
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
                                <DropDownBranch in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options5} isSearchable={true} isMulti={true} event={userSelectKodeCabang} />
                                <div className="mb-3">
                                    <div className="flex">
                                        <ButtonFilter in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={GetID()} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSend />} in_title_button={TextButtonFilter} HandleClick={HandleClick2} />
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <DataTablesColourCell in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={t('Report WDCP Monitoring')} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'TOKO'} type_sorting={'asc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(),new Date())} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={4} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_is_same_colouring_all_rows={false} in_name_column_cek={"VERSI"}  />
            </>
        } />
        </>
    )
}
export default FormReportMonitoringWDCP;