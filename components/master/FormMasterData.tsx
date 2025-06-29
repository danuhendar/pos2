'use client'
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { GridEventListener } from "@mui/x-data-grid";
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import { AddColumn, AddID, ConvertBinaryToText, GenerateUniqNumber, GetFailedClient, GetSignature, GetToken, GetTotalFailedClient, HitungSuksesDanGagalFomTable, ListKey, SendHandleRowClick, SendHandleRowClickOffice, SummaryValueOfArray, WritePayload, WritePayloadWSOffice, get_branch_code, get_data_local_storage, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, removeDuplicates, setTombolAmbilDataGagal, start, stop } from "@/lib/global";
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
import { Posts } from "@/lib/post";
import ButtonAdd from "../button/ButtonAdd";
import IconPlus from "../Icon/IconPlus";
import IconRefresh from "../Icon/IconRefresh";
import IconTrash from "../Icon/IconTrash";
import IconPencil from "../Icon/IconPencil";
interface FormMasterDataProps {
    url: string,
    command: string,
    IDReport: string,
}
const FormMasterData: React.FC<FormMasterDataProps> = ({ url, command, IDReport }) => {
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [IN_KODE_GERAI,setIN_KODE_GERAI] = useState("");
    const [IN_CONTENT,setIN_CONTENT] = useState("");
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
    const [IP, setDataIP] = useState('');
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const isConnectedWS = useRef(0)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const [IconButton,setIconButton] = useState(<IconPlus />)
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        //let arr_cabang = get_branch_code(false,false);
        //setOption5(arr_cabang)
        GetMasterGerai(res_host,res_PORT_LOGIN)
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

    const DelData = (cellValues:any) => {
        Swal.fire({
            icon: "question",
            title: t("Confirmation"),
            text: t("Are you sure for")+" delete data?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
            padding: '2em',
            customClass: 'sweet-alerts'
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const url = `http://${IN_HOST}:${IN_PORT}/api/v2/DelMasterGerai`
                const param = {"IN_KODE_GERAI":cellValues.row.KODE_GERAI}
                const Token = GetToken()
                Posts(url,JSON.stringify(param),false,Token).then((response) => {
                    const res_data = response;
                    var code = res_data.code;
                    var msg = res_data.msg;
                    if(parseFloat(code) === 200){
                        Swal.fire({
                            title: t("Infomration"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "success",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    }else if(code.toString().substring(0,1) === '4'){
                        if(code === 401 && msg.includes("Invalid")){
                            
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
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
                }).catch((error) => {
                    Swal.fire({
                        title: t("Warning"),
                        text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                });
            }
        })
    }
    const showModal = (IDReport:string,cellValues:any) => {
        
    }
    const InsData = () =>{
        Swal.fire({
            icon: "question",
            title: t("Confirmation"),
            text: t("Are you sure for")+" save data?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
            padding: '2em',
            customClass: 'sweet-alerts'
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const InputNik = get_data_local_storage('nik')
                const url = `http://${IN_HOST}:${IN_PORT}/api/v2/DelMasterGerai`
                const param = {"IN_KODE_CABANG":IN_CMB_KODE_CABANG,"IN_KODE_GERAI":IN_KODE_GERAI,"IN_CONTENT":IN_CONTENT,"IN_IS_AKTIF":1,"IN_OTORISATOR":InputNik}
                const Token = GetToken()
                Posts(url,JSON.stringify(param),false,Token).then((response) => {
                    const res_data = response;
                    var code = res_data.code;
                    var msg = res_data.msg;
                    if(parseFloat(code) === 200){
                        Swal.fire({
                            title: t("Infomration"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "success",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    }else if(code.toString().substring(0,1) === '4'){
                        if(code === 401 && msg.includes("Invalid")){
                            
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
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
                }).catch((error) => {
                    Swal.fire({
                        title: t("Warning"),
                        text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                });
            }
        })
    }
    const GetMasterGerai = (in_host:string,in_port:number) => {
        const url = `http://${in_host}:${in_port}/api/v2/GetMasterGerai`
        const param = {"IN_KODE_CABANG":"%","IN_IS_AKTIF":"%"}
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                var rows = data_body[0].ROWS;
                console.log(rows)
                var cols = data_body[0].COLUMNS;
                var res_rows = AddID(rows);
                setData_rows(res_rows);
                const item_new = { 
                    field: 'ACTION', headerName: 'ACTION',  flex: 0,  width: 90, minWidth: 90, maxWidth: 90, align:'center',headerAlign: 'center',
                    renderCell: (cellValues: any) => {
                        return (
                            <>
                            <div className="flex flex-row gap-2">
                                <div className="mt-1">
                                    <a onClick={() => {showModal('Edit '+IDReport,cellValues)}} data-twe-toggle="tooltip" title="Edit Data">
                                        <span className="text-warning"><IconPencil  /></span>
                                    </a>
                                </div>
                                <div className="mt-1">
                                    <a onClick={() => {DelData(cellValues)}} data-twe-toggle="tooltip" title="Delete Data">
                                        <span className="text-danger"><IconTrash  /></span>
                                    </a>
                                </div>
                            </div>
                            </>
                        );
                    }
                };
                AddColumn(cols,item_new);
                setData_columns(cols);
                setLoading(false)
            }else if(code.toString().substring(0,1) === '4'){
                if(code === 401 && msg.includes("Invalid")){
                    
                }else{
                    Swal.fire({
                        title: t("Warning"),
                        text: ""+parseFloat(code)+"-"+msg,
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
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
        }).catch((error) => {
            Swal.fire({
                title: t("Warning"),
                text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        });
    }
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
                    <div className="flex flex-row items-start gap-3 mb-3">
                        <div>
                        <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_filter"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Add'} HandleClick={null} />
                        </div>
                        <div>
                        <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconRefresh />} in_title_button={'Refresh'} HandleClick={null} />
                        </div>
                    </div>
                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, ID_REPORT: false }} jenis_laporan={t('Report') + ' ' + IDReport.split('Report').join('')} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS), new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={false} in_printOptions={false} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={clickTable} in_prosentase_progress={DataProsentase} in_rows_spanning={false} />
                </>
            } />
        </>
    )
}
export default FormMasterData;