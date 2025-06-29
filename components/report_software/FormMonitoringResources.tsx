'use client'
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { GridColumnGroupingModel } from "@mui/x-data-grid";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertBinaryToText, GenerateUniqNumber,  GetFailedClient, GetSignature, GetToken, GetTotalFailedClient, SendHandleRowClick, WritePayload, WritePayloadAPI, get_branch_code, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, handleLogout, removeDuplicates, start, stop } from "@/lib/global";
import withReactContent from "sweetalert2-react-content";
import { Posts } from "@/lib/post";
import CardInfoProses from "../form/CardInfoProses";
import { useTranslation } from "react-i18next";
import DropDownBranch from "../dropdown/DropDownBranch";
import DropDownStation from "../dropdown/DropDownStation";
import ButtonFilter from "../button/ButtonFilter";
import IconSend from "../Icon/IconSend";
import ButtonReload from "../button/ButtonReload";
import { Report_Monitoring_3_Aplikasi_Tertinggi, Report_Monitoring_Apps_Os_Crash, Report_Monitoring_Mysql_For_Posnet, Report_Monitoring_POS_Replikasi } from "@/controller/report_software/MonitoringReportSoftware";
import ModalComponent from "../modal/ModalComponent";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";

interface FormMonitoringResourcesProps {
    url: string,
    command: string,
    IDReport: string,
    IS_Induk:string
}

const FormMonitoringResources: React.FC<FormMonitoringResourcesProps> = ({ url, command, IDReport, IS_Induk }) => {
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [IN_CMB_STATION, setStation] = useState("");
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const [columnGroupingModel,setcolumnGroupingModel] = useState([]);
    const [columnGroupingModel_Detail,setcolumnGroupingModel_Detail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progressbar, setProgress] = useState('');
    const [total_station, setTotalStation] = useState(0);
    const [total_sukses, setTotalSukses] = useState(0);
    const [total_gagal, setTotalGagal] = useState(0);
    const [DataProsentase,setDataProsentase] = useState(0);
    const [data_gagal, setDataGagal] = useState('');
    const [IP, setDataIP] = useState('');
    const [HOST_API_EDP_HO,setHOST_API_EDP_HO] = useState('');
    const [PORT_API_EDP_HO,setPORT_API_EDP_HO] = useState('');
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [IN_HOST_WS, setHOSTWS] = useState('');
    const [IN_PORT_ADMINISTRASI,setPORT_ADMINISTRASI] = useState('');
    const [stateCode,setStateCode] = useState(0);
    const [modal13,setModal13] = useState(false);
    const [modal14,setModal14] = useState(false);
    const [ColumnsAppsOS,setColumnsAppsOS] = useState([]);
    const [DataRowsAppOS,setDataRowsAppOS] = useState([]);
    const [LoadingAppsOS,setLoadingAppsOS] = useState(false);
    const [progressbar_log, setProgressLOG] = useState('');
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();
    const [Title,setTitle] = useState('');
    const [TypeOSorAPPCrash,setTypeOSorAPPCrash] = useState('');
    const router = useRouter();
    const MySwal = withReactContent(Swal);
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const isConnectedWS = useRef(0)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
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
            setKODE_CABANG(arr_kode_cabang)
            setDataIP('');
        }
        setLoadingButton(false)
    };

    const userSelectStation = (value: any) => {
        setStation(value.value);
        setDataGagal('');
        setDataIP('');
        setStateCode(0);
        setLoadingButton(false)
    }

    const NewhandleRowClick = async (event:any, cellValues:any,in_type:string) => {
        try{
            var kdcab = "";
            var kdtk = "";
            var station = "";
            var row_id = "";
            var ip = "";
            var oscrash = '';
            var hard_reset = '';
            var unexpected = '';
            var idreport = IDReport;
            var res_name_apps = '';
            let titlebar = '';
            var res_detil_log = '';
            console.log('in_type :'+in_type)
            try {
                kdcab = cellValues.row.KDCAB;
                kdtk = cellValues.row.KDTK;
                station = cellValues.row.STATION;
                row_id = cellValues.row.id;
                ip = cellValues.row.IP;
                oscrash = cellValues.row.BSOD;
                hard_reset = cellValues.row.HARD_RESET;
                unexpected = cellValues.row.TIDAK_TERDETEKSI;

                if(in_type === 'APLIKASI_TERKENDALA_1'){
                    res_name_apps = cellValues.row.APLIKASI_TERKENDALA_1;
                }else if(in_type === 'APLIKASI_TERKENDALA_2'){
                    res_name_apps = cellValues.row.APLIKASI_TERKENDALA_2;
                }else if(in_type === 'APLIKASI_TERKENDALA_3'){
                    res_name_apps = cellValues.row.APLIKASI_TERKENDALA_3;
                }else if(in_type === 'PROGRAM_1'){
                    res_name_apps = cellValues.row.PROGRAM_1;
                    res_detil_log = cellValues.row.DETIL_LOG;
                }else if(in_type === 'PROGRAM_2'){
                    res_name_apps = cellValues.row.PROGRAM_2;
                    res_detil_log = cellValues.row.DETIL_LOG;
                }else if(in_type === 'PROGRAM_3'){
                    res_name_apps = cellValues.row.PROGRAM_3;
                    res_detil_log = cellValues.row.DETIL_LOG;
                }

            } catch (Ex) {
                kdcab = cellValues.row.KDCAB;
                kdtk = cellValues.KDTK;
                station = cellValues.STATION;
                row_id = cellValues.id;
                ip = cellValues.row.IP;
                oscrash = cellValues.row.BSOD;
                hard_reset = cellValues.row.HARD_RESET;
                unexpected = cellValues.row.TIDAK_TERDETEKSI;

                if(in_type === 'APLIKASI_TERKENDALA_1'){
                    res_name_apps = cellValues.row.APLIKASI_TERKENDALA_1;
                }else if(in_type === 'APLIKASI_TERKENDALA_2'){
                    res_name_apps = cellValues.row.APLIKASI_TERKENDALA_2;
                }else if(in_type === 'APLIKASI_TERKENDALA_3'){
                    res_name_apps = cellValues.row.APLIKASI_TERKENDALA_3;
                }else if(in_type === 'PROGRAM_1'){
                    res_name_apps = cellValues.row.PROGRAM_1;
                    res_detil_log = cellValues.row.DETIL_LOG;
                }else if(in_type === 'PROGRAM_2'){
                    res_name_apps = cellValues.row.PROGRAM_2;
                    res_detil_log = cellValues.row.DETIL_LOG;
                }else if(in_type === 'PROGRAM_3'){
                    res_name_apps = cellValues.row.PROGRAM_3;
                    res_detil_log = cellValues.row.DETIL_LOG;
                }
               
            }
            //-- MODAL PAGE untuk 3 aplikasi tertitinggi --//
            if(in_type.includes('PROGRAM_')){
                setModal14(true);
            }else{
                //-- MODAL PAGE untuk monitoring apps crash --//
                setModal13(true);
                setTypeOSorAPPCrash(in_type);
            }
            
            setColumnsAppsOS([]);
            setDataRowsAppOS([]);
            setLoadingAppsOS(true);
            if(in_type.includes('APLIKASI_TERKENDALA')){
                titlebar = kdcab+'/'+kdtk+'/'+station+'/'+ip+'/'+res_name_apps;
            }else if(in_type.includes('PROGRAM_')){
                titlebar = kdcab+'/'+kdtk+'/'+station+'/'+ip+'/';
            }else{
                titlebar = kdcab+'/'+kdtk+'/'+station+'/'+ip+'/'+in_type;
            }
            setTitle(titlebar);
            let res_command = "";
            if(in_type === 'BSOD'){
                res_command = "%systemroot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe \"$startDate=(Get-Date).AddDays(-1);[xml]$Xml='';Get-WinEvent -FilterHashtable @{LogName='System'; Id=41}|Where-Object{$_.TimeCreated -gt $startDate}|ForEach-Object{$data=$_.ToXml();$Xml=$data;$resBugcheckCode=$Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BugcheckCode'}|ft -HideTableHeaders -Wrap|Out-String;if($resBugcheckCode.ToString().Trim() -eq 'BugcheckCode 0'){}else{$hasil=-join($Xml.Event.System.TimeCreated.SystemTime,'|',$Xml.Event.System.EventID,'|',$Xml.Event.System.EventRecordID,'|',$Xml.Event.System.Channel,'|',$Xml.Event.System.Level,'|',$Xml.Event.System.Computer,'|',$resBugcheckCode.ToString().Trim());$hasil;}};\"";
            }else if(in_type === 'HARD_RESET'){
                res_command = "%systemroot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe \"$startDate=(Get-Date).AddDays(-3);[xml]$Xml='';Get-WinEvent -FilterHashtable @{LogName='System'; Id=41}|Where-Object{$_.TimeCreated -gt $startDate}|ForEach-Object{$data=$_.ToXml();$Xml=$data; $resPowerButtonTimestamp=$Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'PowerButtonTimestamp'}|ft -HideTableHeaders -Wrap|Out-String;if($resPowerButtonTimestamp.ToString().Trim() -eq 'PowerButtonTimestamp 0'){}else{$hasil=-join($Xml.Event.System.TimeCreated.SystemTime,'|',$Xml.Event.System.EventID,'|',$Xml.Event.System.EventRecordID,'|',$Xml.Event.System.Channel,'|',$Xml.Event.System.Level,'|',$Xml.Event.System.Computer,'|',$resPowerButtonTimestamp.ToString().Trim());$hasil;}};\"";
            }else if(in_type === 'TIDAK_TERDETEKSI'){
                res_command = "%systemroot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe \"$os_crash=0;$startDate=(Get-Date).AddDays(-3);[xml]$Xml='';Get-WinEvent -FilterHashtable @{LogName='System'; Id=41}|Where-Object{$_.TimeCreated -gt $startDate}|ForEach-Object{$data=$_.ToXml();$Xml=$data;$resBugcheckCode=$Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BugcheckCode'}|ft -HideTableHeaders -Wrap|Out-String;$resBugcheckParameter1 = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BugcheckParameter1'}|ft -HideTableHeaders -Wrap|Out-String;$resBugcheckParameter2 = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BugcheckParameter2'}|ft -HideTableHeaders -Wrap|Out-String;$resBugcheckParameter3 = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BugcheckParameter3'}|ft -HideTableHeaders -Wrap|Out-String;$resBugcheckParameter4 = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BugcheckParameter4'}|ft -HideTableHeaders -Wrap|Out-String;$resSleepInProgress = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'SleepInProgress'}|ft -HideTableHeaders -Wrap|Out-String;$resBootAppStatus = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'BootAppStatus'}|ft -HideTableHeaders -Wrap|Out-String;$resPowerButtonTimestamp = $Xml.Event.EventData.Data|Where-Object{$_.Name -eq 'PowerButtonTimestamp'}|ft -HideTableHeaders -Wrap|Out-String;if($resBugcheckCode.ToString().Trim() -eq 'BugcheckCode 0' -And $resBugcheckParameter1.ToString().Trim() -eq 'BugcheckParameter1 0x0' -And $resBugcheckParameter2.ToString().Trim() -eq 'BugcheckParameter2 0x0' -And $resBugcheckParameter3.ToString().Trim() -eq 'BugcheckParameter3 0x0' -And $resBugcheckParameter4.ToString().Trim() -eq 'BugcheckParameter4 0x0' -And $resSleepInProgress.ToString().Trim() -eq 'SleepInProgress 0' -And $resBootAppStatus.ToString().Trim() -eq 'BootAppStatus 0' -And $resPowerButtonTimestamp.ToString().Trim() -eq 'PowerButtonTimestamp 0'){$hasil=-join($Xml.Event.System.TimeCreated.SystemTime,'|',$Xml.Event.System.EventID,'|',$Xml.Event.System.EventRecordID,'|',$Xml.Event.System.Channel,'|',$Xml.Event.System.Level,'|',$Xml.Event.System.Computer,'|',$resBugcheckCode.ToString().Trim());$hasil;}else{}};\"";
            }else if(in_type.includes('APLIKASI_TERKENDALA')){
                res_command = "%systemroot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe \"$startDate=(Get-Date).AddDays(-3);function getListApp(){$list_app=Get-WinEvent -FilterHashtable @{logname = 'Application'; id = 1002,41}|Where-Object {$_.TimeCreated -gt $startDate -And $_.Message -like '*"+res_name_apps+"*'}|Select-Object TimeCreated,Id,LevelDisplayName,@{N='Message'; E={$_.Message}}|ConvertTo-Csv -NoTypeInformation -Delimiter '|'|Out-String;return $list_app};$r=getListApp;$r;\"";
            }else{

            }
            if(in_type.includes('PROGRAM_')){
                let sp = res_detil_log.split('"').join('').split('\r\n');
                let rows: SetStateAction<any[]> = [];
                    //-- program peringkat 1 --//
                    //-- pengambilan 1 --//
                    let p1_sp_field_1 = sp[0].split(',');
                    let p1_nama_program_1 = p1_sp_field_1[0];
                    let p1_memory_usage_1 = p1_sp_field_1[1];
                    let p1_waktu_pengambilan_1 = p1_sp_field_1[2];
                    let p1_jumlah_proses_1 = p1_sp_field_1[3];
                    let p1_res_path_1 = p1_sp_field_1[4].split('@{Path=').join('').split('}').join('');
                    //let p1_res_cpu_usage_1 = p1_sp_field_1[5];
                    //-- pengambilan 2 --//
                    let p1_sp_field_2 = sp[3].split(',');
                    let p1_memory_usage_2 = p1_sp_field_2[1];
                    let p1_waktu_pengambilan_2 = p1_sp_field_2[2];
                    let p1_jumlah_proses_2 = p1_sp_field_2[3];
                    let p1_res_path_2 = p1_sp_field_2[4].split('@{Path=').join('').split('}').join('');
                    //let p1_res_cpu_usage_2 = p1_sp_field_2[5];
                    //-- pengambilan 3 --//
                    let p1_sp_field_3 = sp[6].split(',');
                    let p1_memory_usage_3 = p1_sp_field_3[1];
                    let p1_waktu_pengambilan_3 = p1_sp_field_3[2];
                    let p1_jumlah_proses_3 = p1_sp_field_3[3];
                    let p1_res_path_3 = p1_sp_field_3[4].split('@{Path=').join('').split('}').join('');
                    //let p1_res_cpu_usage_3 = p1_sp_field_3[5];

                    //-- program peringkat 2 --//
                    //-- pengambilan 1 --//
                    let p2_sp_field_1 = sp[1].split(',');
                    let p2_nama_program_1 = p2_sp_field_1[0];
                    let p2_memory_usage_1 = p2_sp_field_1[1];
                    let p2_waktu_pengambilan_1 = p2_sp_field_1[2];
                    let p2_jumlah_proses_1 = p2_sp_field_1[3];
                    let p2_res_path_1 = p2_sp_field_1[4].split('@{Path=').join('').split('}').join('');
                    //let p2_res_cpu_usage_1 = p2_sp_field_1[5];
                    //-- pengambilan 2 --//
                    let p2_sp_field_2 = sp[4].split(',');
                    let p2_memory_usage_2 = p2_sp_field_2[1];
                    let p2_waktu_pengambilan_2 = p2_sp_field_2[2];
                    let p2_jumlah_proses_2 = p2_sp_field_2[3];
                    let p2_res_path_2 = p2_sp_field_2[4].split('@{Path=').join('').split('}').join('');
                    //let p2_res_cpu_usage_2 = p2_sp_field_2[5];
                    //-- pengambilan 3 --//
                    let p2_sp_field_3 = sp[7].split(',');
                    let p2_memory_usage_3 = p2_sp_field_3[1];
                    let p2_waktu_pengambilan_3 = p2_sp_field_3[2];
                    let p2_jumlah_proses_3 = p2_sp_field_3[3];
                    let p2_res_path_3 = p2_sp_field_3[4].split('@{Path=').join('').split('}').join('');
                    //let p2_res_cpu_usage_3 = p2_sp_field_3[5];

                    //-- program peringkat 3 --//
                    //-- pengambilan 1 --//
                    let p3_sp_field_1 = sp[2].split(',');
                    let p3_nama_program_1 = p3_sp_field_1[0];
                    let p3_memory_usage_1 = p3_sp_field_1[1];
                    let p3_waktu_pengambilan_1 = p3_sp_field_1[2];
                    let p3_jumlah_proses_1 = p3_sp_field_1[3];
                    let p3_res_path_1 = p3_sp_field_1[4].split('@{Path=').join('').split('}').join('');
                    //let p3_res_cpu_usage_1 = p3_sp_field_1[5];

                    //-- pengambilan 2 --//
                    let p3_sp_field_2 = sp[5].split(',');
                    let p3_memory_usage_2 = p3_sp_field_2[1];
                    let p3_waktu_pengambilan_2 = p3_sp_field_2[2];
                    let p3_jumlah_proses_2 = p3_sp_field_2[3];
                    let p3_res_path_2 = p3_sp_field_2[4].split('@{Path=').join('').split('}').join('');
                    //let p3_res_cpu_usage_2 = p3_sp_field_2[5];

                    //-- pengambilan 3 --//
                    let p3_sp_field_3 = sp[8].split(',');
                    let p3_memory_usage_3 = p3_sp_field_3[1];
                    let p3_waktu_pengambilan_3 = p3_sp_field_3[2];
                    let p3_jumlah_proses_3 = p3_sp_field_3[3];
                    let p3_res_path_3 = p3_sp_field_3[4].split('@{Path=').join('').split('}').join('');
                    //let p3_res_cpu_usage_3 = p3_sp_field_3[5];

                    //-- dokumentasi peringkat 1 --//
                    const obj1 = {"id":GenerateUniqNumber(),
                                "NAMA_PROGRAM":p1_nama_program_1,
                                "MEMORY_USAGE_1":p1_memory_usage_1,
                                "JUMLAH_PROSES_1":p1_jumlah_proses_1,
                                "WAKTU_PENGAMBILAN_1":p1_waktu_pengambilan_1,
                                "PATH_1":p1_res_path_1,
                                //"CPU_USAGE_1":p1_res_cpu_usage_1,

                                "MEMORY_USAGE_2":p1_memory_usage_2,
                                "JUMLAH_PROSES_2":p1_jumlah_proses_2,
                                "WAKTU_PENGAMBILAN_2":p1_waktu_pengambilan_2,
                                "PATH_2":p1_res_path_2,
                                //"CPU_USAGE_2":p1_res_cpu_usage_2,

                                "MEMORY_USAGE_3":p1_memory_usage_3,
                                "JUMLAH_PROSES_3":p1_jumlah_proses_3,
                                "WAKTU_PENGAMBILAN_3":p1_waktu_pengambilan_3,
                                "PATH_3":p1_res_path_3,
                                //"CPU_USAGE_3":p1_res_cpu_usage_3,
                    };
                    rows.push(obj1);
                    //-- dokumentasi peringkat 2 --//
                    const obj2 = {"id":GenerateUniqNumber(),
                                    "NAMA_PROGRAM":p2_nama_program_1,
                                    "MEMORY_USAGE_1":p2_memory_usage_1,
                                    "JUMLAH_PROSES_1":p2_jumlah_proses_1,
                                    "WAKTU_PENGAMBILAN_1":p2_waktu_pengambilan_1,
                                    "PATH_1":p2_res_path_1,
                                    //"CPU_USAGE_1":p2_res_cpu_usage_1,

                                    "MEMORY_USAGE_2":p2_memory_usage_2,
                                    "JUMLAH_PROSES_2":p2_jumlah_proses_2,
                                    "WAKTU_PENGAMBILAN_2":p2_waktu_pengambilan_2,
                                    "PATH_2":p2_res_path_2,
                                    //"CPU_USAGE_2":p2_res_cpu_usage_2,
                                    
                                    "MEMORY_USAGE_3":p2_memory_usage_3,
                                    "JUMLAH_PROSES_3":p2_jumlah_proses_3,
                                    "WAKTU_PENGAMBILAN_3":p2_waktu_pengambilan_3,
                                    "PATH_3":p2_res_path_3,
                                    //"CPU_USAGE_3":p2_res_cpu_usage_3,
                    };
                    rows.push(obj2);

                    //-- dokumentasi peringkat 2 --//
                    const obj3 = {"id":GenerateUniqNumber(),
                                    "NAMA_PROGRAM":p3_nama_program_1,
                                    "MEMORY_USAGE_1":p3_memory_usage_1,
                                    "JUMLAH_PROSES_1":p3_jumlah_proses_1,
                                    "WAKTU_PENGAMBILAN_1":p3_waktu_pengambilan_1,
                                    "PATH_1":p3_res_path_1,
                                    //"CPU_USAGE_1":p1_res_cpu_usage_3,

                                    "MEMORY_USAGE_2":p3_memory_usage_2,
                                    "JUMLAH_PROSES_2":p3_jumlah_proses_2,
                                    "WAKTU_PENGAMBILAN_2":p3_waktu_pengambilan_2,
                                    "PATH_2":p3_res_path_2,
                                    //"CPU_USAGE_2":p3_res_cpu_usage_3,
                                    
                                    "MEMORY_USAGE_3":p3_memory_usage_3,
                                    "JUMLAH_PROSES_3":p3_jumlah_proses_3,
                                    "WAKTU_PENGAMBILAN_3":p3_waktu_pengambilan_3,
                                    "PATH_3":p3_res_path_3,
                                    //"CPU_USAGE_3":p3_res_cpu_usage_3,
                    };
                    rows.push(obj3);
                
                let columns=[
                    { field: 'id', headerName: 'id', flex: 1 },
                    { field: 'NAMA_PROGRAM', headerName: 'PROGRAM', flex: 1, width: 130, minWidth: 130,headerAlign:'center',align:'center' },
                    { field: 'MEMORY_USAGE_1', headerName: 'MEMORY_USAGE(MB)', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center' },
                    { field: 'JUMLAH_PROSES_1', headerName: 'JUMLAH_PROSES', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
                    { field: 'WAKTU_PENGAMBILAN_1', headerName: 'WAKTU_PENGAMBILAN', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center' },
                    { field: 'PATH_1', headerName: 'PATH', flex: 0, width: 320, minWidth: 320, maxWidth: 320,headerAlign:'center',align:'center' },
                    
                    { field: 'MEMORY_USAGE_2', headerName: 'MEMORY_USAGE(MB)', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center' },
                    { field: 'JUMLAH_PROSES_2', headerName: 'JUMLAH_PROSES', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
                    { field: 'WAKTU_PENGAMBILAN_2', headerName: 'WAKTU_PENGAMBILAN', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center' },
                    { field: 'PATH_2', headerName: 'PATH', flex: 0, width: 320, minWidth: 320, maxWidth: 320,headerAlign:'center',align:'center' },
                    
                    { field: 'MEMORY_USAGE_3', headerName: 'MEMORY_USAGE(MB)', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center' },
                    { field: 'JUMLAH_PROSES_3', headerName: 'JUMLAH_PROSES', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
                    { field: 'WAKTU_PENGAMBILAN_3', headerName: 'WAKTU_PENGAMBILAN', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center' },
                    { field: 'PATH_3', headerName: 'PATH', flex: 0, width: 320, minWidth: 320, maxWidth: 320,headerAlign:'center',align:'center' },
                ]
                let columnGroupingModel: GridColumnGroupingModel = [
                    {
                        groupId: 'Internal',
                        description: '',
                        children: [{ field: 'id' }],
                    },

                    {
                        groupId: 'PENGAMBILAN : 1',headerAlign:'center',
                        children: [{ field: 'MEMORY_USAGE_1' }, { field: 'JUMLAH_PROSES_1' },  { field: 'WAKTU_PENGAMBILAN_1' },  { field: 'PATH_1' }],
                    },

                    {
                        groupId: 'PENGAMBILAN : 2',headerAlign:'center',
                        children: [{ field: 'MEMORY_USAGE_2' }, { field: 'JUMLAH_PROSES_2' },  { field: 'WAKTU_PENGAMBILAN_2' },  { field: 'PATH_2' }],
                    },

                    {
                        groupId: 'PENGAMBILAN : 3',headerAlign:'center',
                        children: [{ field: 'MEMORY_USAGE_3' }, { field: 'JUMLAH_PROSES_3' },  { field: 'WAKTU_PENGAMBILAN_3' },  { field: 'PATH_3' }],
                    },
                ];
                setColumnsAppsOS(columns);
                setcolumnGroupingModel_Detail(columnGroupingModel);
                setDataRowsAppOS(rows);
                setLoadingAppsOS(false);
            }else{
                const Token = GetToken()
                res_command = await GetSignature(IN_HOST, IN_PORT, Token, res_command) as string
                SendHandleRowClick(IDReport,kdcab,kdtk,station,res_command,Token).then((response) => {
                const res_data = response;
                var code = res_data.code;
                var msg = res_data.msg;
                var rdata = res_data.data;
                    let rows: SetStateAction<any[]> = [];
                    if(parseFloat(code) === 200){
                        var data_body = JSON.parse(rdata);
                        const res_data = data_body[0].data;
                        let columns=[];
                        if(in_type.includes('APLIKASI_TERKENDALA')){
                            const sp_record_res_data = res_data.split('"\r\n"');
                            for(var i = 1;i<sp_record_res_data.length;i++){
                                if(sp_record_res_data[i] !== ''){
                                        const sp_field = sp_record_res_data[i].split('|');
                                        const TimeCreated = sp_field[0].split('"').join('');
                                        const Id = sp_field[1].split('"').join('');
                                        const LevelDisplayName = sp_field[2].split('"').join('');
                                        const Message = sp_field[3].split('"').join('');
                                        let resMessage = Message;
                                        const obj = {"id":GenerateUniqNumber(),"TimeCreated":TimeCreated,"IdLog":Id,"LevelDisplayName":LevelDisplayName,"Message":resMessage};
                                        rows.push(obj);
                                }else{
                                    console.log('No Operation for Blank Record')
                                }
                            
                            }
                            columns=[
                                { field: 'id', headerName: 'id', flex: 0 ,width: 50, minWidth: 50, maxWidth: 50},
                                { field: 'TimeCreated', headerName: 'TimeCreated', flex: 0, width: 250, minWidth: 250, maxWidth: 250 },
                                { field: 'IdLog', headerName: 'IdLog', flex: 0, width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center' },
                                { field: 'LevelDisplayName', headerName: 'LevelDisplayName', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center' },
                                { field: 'Message', headerName: 'Message', flex: 1,  
                                    renderCell: (cellValues: any) => {
                                    return (
                                        in_type === 'BSOD' ? 
                                        <a  target="_blank" href="https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-code-reference2">
                                            <span data-twe-toggle="tooltip" title="Klik untuk melihat referensi BugCheckCode" className={'hover:cursor-pointer font-semibold underline underline-offset-4'}  >{cellValues.value}</span>
                                        </a>
                                        :
                                        <span className={'hover:cursor-pointer font-semibold underline underline-offset-4'}  >{cellValues.value}</span>
                                    );
                                }},
                            ]
                        
                        }else{
                            const sp_record_res_data = res_data.split('\r\n');
                            for(var i = 0;i<sp_record_res_data.length-1;i++){
                                if(sp_record_res_data[i] !== ''){
                                        const sp_field = sp_record_res_data[i].split('|');
                                        const TimeCreated = sp_field[0].split('"').join('');
                                        const Id = sp_field[1].split('"').join('');
                                        const EventRecordId = sp_field[2].split('"').join('');
                                        const Channel = sp_field[3].split('"').join('');
                                        const LevelDisplayName = sp_field[4].split('"').join('');
                                        const Computer = sp_field[5].split('"').join('');
                                        const Message = sp_field[6].split('"').join('');
                                        let resMessage = Message;
                                        
                                        const obj = {"id":GenerateUniqNumber(),"TimeCreated":TimeCreated,"IdLog":Id,"EventRecordId":EventRecordId,"Channel":Channel,"LevelDisplayName":LevelDisplayName,"Computer":Computer,"Message":resMessage};
                                        rows.push(obj);
                                }else{
                                    console.log('No Operation for Blank Record')
                                }
                            
                            }
                            columns=[
                                { field: 'id', headerName: 'id', flex: 0 ,width: 50, minWidth: 50, maxWidth: 50},
                                { field: 'TimeCreated', headerName: 'TimeCreated', flex: 0, width: 250, minWidth: 250, maxWidth: 250 },
                                { field: 'IdLog', headerName: 'IdLog', flex: 0, width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center' },
                                { field: 'EventRecordId', headerName: 'EventRecordId', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
                                { field: 'Channel', headerName: 'Channel', flex: 0, width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center' },
                                { field: 'LevelDisplayName', headerName: 'LevelDisplayName', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center' },
                                { field: 'Computer', headerName: 'Computer', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
                                { field: 'Message', headerName: 'Message', flex: 1,  headerAlign:'center',align:'center' ,
                                    renderCell: (cellValues: any) => {
                                    return (
                                        in_type === 'BSOD' ? 
                                        <a  target="_blank" href="https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-code-reference2">
                                            <span data-twe-toggle="tooltip" title="Klik untuk melihat referensi BugCheckCode" className={'hover:cursor-pointer font-semibold underline underline-offset-4 text-danger'}  >{cellValues.value}</span>
                                        </a>
                                        :
                                        <span className={'hover:cursor-pointer font-semibold underline underline-offset-4'}  >{cellValues.value}</span>
                                    );
                                }},
                            ]   
                        }
                        setLoadingAppsOS(false);
                        setColumnsAppsOS(columns);
                        setDataRowsAppOS(rows);
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
                        setLoadingAppsOS(false); 
                    }else{
                        Swal.fire({
                            title: t("Warning"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoadingAppsOS(false);
                    }
                }).catch(
                    (error) => {
                        Swal.fire({
                            title: t("Warning"),
                            text: 'Error Akses : '+error.toString(),
                            icon: "error",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoadingAppsOS(false);
                    }
                );
            }
        }catch(Ex){
            console.log('Error : '+Ex.toString())
            MySwal.fire({
                title: "Eror "+Ex.toString(),
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

    const Def_Columns_Report_Monitoring_Apps_Os_Crash = () => {
        let columns = [
            { field: 'id', headerName: 'id', flex: 1 },
            {
                field: 'KODE', headerName: 'KODE', width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            {
                field: 'KETERANGAN', headerName: 'KETERANGAN', width: 240, minWidth: 240, maxWidth: 240,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 'Succes' ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            { field: 'REQUEST', headerName: 'REQUEST', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'RESPONSE', headerName: 'RESPONSE', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
            { field: 'KDTK', headerName: 'KDTK', width: 80, minWidth: 80, maxWidth: 80 },
            { field: 'NAMA', headerName: 'NAMA', flex: 1, width: 250, minWidth: 250, maxWidth: 250 },
            { field: 'STATION', headerName: 'STATION', width: 90, minWidth: 90, maxWidth: 90 },
            { field: 'IP', headerName: 'IP',flex: 0, width: 130, minWidth: 130, maxWidth: 130 },
            { field: 'MEMORY_TERPASANG', headerName: 'MEMORY_TERPASANG', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center' },
            { field: 'MEMORY_TERBACA', headerName: 'MEMORY_TERBACA', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center' },
            { field: 'ARSITEKTUR', headerName: 'ARSITEKTUR', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
            { field: 'PROCESSOR', headerName: 'PROCESSOR', flex: 0, width: 350, minWidth: 350, maxWidth: 350 },
            
            { field: 'BSOD', headerName: 'BSOD', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            NewhandleRowClick(event, cellValues,"BSOD");
                        }} >
                        <span data-twe-toggle="tooltip" title="Klik untuk melihat detail log" className={'hover:cursor-pointer font-semibold underline underline-offset-4'}  >{cellValues.value}</span>
                        </a>
                        
                    );
                }
            },
            { field: 'HARD_RESET', headerName: 'HARD_RESET', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            NewhandleRowClick(event, cellValues,"HARD_RESET");
                        }} >
                        <span data-twe-toggle="tooltip" title="Klik untuk melihat detail log" className={'hover:cursor-pointer font-semibold underline underline-offset-4'}  >{cellValues.value}</span>
                        </a>
                    );
                }
            },
            { field: 'TIDAK_TERDETEKSI', headerName: 'TIDAK_TERDETEKSI', flex: 0, width: 160, minWidth: 160, maxWidth: 160,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            NewhandleRowClick(event, cellValues,"TIDAK_TERDETEKSI");
                        }} >
                        <span data-twe-toggle="tooltip" title="Klik untuk melihat detail log" className={'hover:cursor-pointer font-semibold underline underline-offset-4'}  >{cellValues.value}</span>
                        </a>
                    );
                }
            },
            { field: 'APLIKASI_TERKENDALA_1', headerName: 'PROGRAM', flex: 0, width: 160, minWidth: 160, maxWidth: 160,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            NewhandleRowClick(event, cellValues,"APLIKASI_TERKENDALA_1");
                        }} >
                        <span data-twe-toggle="tooltip" title="Klik untuk melihat detail log" className={'text-center text-danger dark:hover:text-white-light font-semibold hover:cursor-pointer underline underline-offset-4'}  >{cellValues.value}</span>
                        </a>
                    );
                }
            },
            { field: 'JUMLAH_CRASH_1', headerName: 'JUMLAH_CRASH', flex: 0, width: 160, minWidth: 160, maxWidth: 160,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={'text-center text-danger dark:hover:text-white-light font-semibold'}  >{cellValues.value}</span>
                    );
                }
            },
            { field: 'APLIKASI_TERKENDALA_2', headerName: 'PROGRAM', flex: 0, width: 160, minWidth: 160, maxWidth: 160,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            NewhandleRowClick(event, cellValues,"APLIKASI_TERKENDALA_2");
                        }} >
                        <span data-twe-toggle="tooltip" title="Klik untuk melihat detail log" className={'text-center text-warning dark:hover:text-white-light font-semibold hover:cursor-pointer underline underline-offset-4'}  >{cellValues.value}</span>
                        </a>
                    );
                }
            },
            { field: 'JUMLAH_CRASH_2', headerName: 'JUMLAH_CRASH', flex: 0, width: 160, minWidth: 160, maxWidth: 160,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                       
                        <span className={'text-center text-warning font-semibold'}  >{cellValues.value}</span>
                        
                    );
                }
            },
            { field: 'APLIKASI_TERKENDALA_3', headerName: 'PROGRAM', flex: 0, width: 160, minWidth: 160, maxWidth: 160,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            NewhandleRowClick(event, cellValues,"APLIKASI_TERKENDALA_3");
                        }} >
                        <span data-twe-toggle="tooltip" title="Klik untuk melihat detail log" className={'text-center text-dark dark:text-sky-100  font-semibold hover:cursor-pointer underline underline-offset-4'}  >{cellValues.value}</span>
                        </a>
                    );
                }
            },
            { field: 'JUMLAH_CRASH_3', headerName: 'JUMLAH_CRASH', flex: 0, width: 160, minWidth: 160, maxWidth: 160,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={'text-center text-dark dark:text-sky-100 font-semibold hover:cursor-pointer underline underline-offset-4'}  >{cellValues.value}</span>
                    );
                }
            },
        ];
        let columnGroupingModel = [
            {
                groupId: 'Internal',
                description: '',
                children: [{ field: 'id' }],
            },
            {
                groupId: '  ',
                children: [
                         {
                            groupId: 'IDENTITAS_TOKO',headerAlign:'center',
                            children: [
                                { field: 'KODE' }, { field: 'KETERANGAN' },  { field: 'KDCAB' }, { field: 'KDTK' }, { field: 'NAMA' }, { field: 'STATION' }, { field: 'IP' }, {field: 'REQUEST'}, {field: 'RESPONSE'},
                            ],  
                            
                         },
                         {
                            groupId: 'MEMORY',headerAlign:'center',
                            children: [
                                { field: 'MEMORY_TERPASANG'},{ field: 'MEMORY_TERBACA'},
                            ],  
                            
                         },
                         {
                            groupId: 'CPU',headerAlign:'center',
                            children: [
                                { field: 'ARSITEKTUR' }, { field: 'PROCESSOR' }
                            ],  
                            
                         },
                         {
                            groupId: 'OS / SYSTEM',headerAlign:'center',
                            children: [{ field: 'BSOD' }, { field: 'HARD_RESET' },{field: 'TIDAK_TERDETEKSI'}],
                        },
                ],
            },
            
            {
                groupId: '3 PROGRAM DENGAN CRASH TERTINGGI',headerAlign:'center',
                children: [
                        {
                            groupId: '1',headerAlign:'center',
                            children: [{ field: 'APLIKASI_TERKENDALA_1' }, { field: 'JUMLAH_CRASH_1' }],
                        },
                        {
                            groupId: '2',headerAlign:'center',
                            children: [{ field: 'APLIKASI_TERKENDALA_2' }, { field: 'JUMLAH_CRASH_2' }],
                        },
                        {
                            groupId: '3',headerAlign:'center',
                            children: [{ field: 'APLIKASI_TERKENDALA_3' }, { field: 'JUMLAH_CRASH_3' }],
                        },
                ],
            },
        ];

        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }

    const Def_Columns_Report_Monitoring_Mysql_for_Posnet = () => {
        let columns = [
            { field: 'id', headerName: 'id', flex: 1 },
            {
                field: 'KODE', headerName: 'KODE', width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            {
                field: 'KETERANGAN', headerName: 'KETERANGAN', width: 170, minWidth: 170, maxWidth: 170,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 'Succes' ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            { field: 'REQUEST', headerName: 'REQUEST', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'RESPONSE', headerName: 'RESPONSE', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
            { field: 'KDTK', headerName: 'KDTK', width: 80, minWidth: 80, maxWidth: 80 },
            { field: 'NAMA', headerName: 'NAMA', flex: 1, width: 250, minWidth: 250, maxWidth: 250 },
            { field: 'STATION', headerName: 'STATION', width: 90, minWidth: 90, maxWidth: 90 },
            { field: 'IP', headerName: 'IP',flex: 0, width: 130, minWidth: 130, maxWidth: 130 },
            { field: 'MEMORY_TERPASANG', headerName: 'MEMORY_TERPASANG', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center' },
            { field: 'MEMORY_TERBACA', headerName: 'MEMORY_TERBACA', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center' },    
            { field: 'ARSITEKTUR', headerName: 'ARSITEKTUR', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
            { field: 'PROCESSOR', headerName: 'PROCESSOR', flex: 0, width: 350, minWidth: 350, maxWidth: 350 },
            { field: 'MEDIA_TYPE', headerName: 'MEDIA_TYPE', flex: 0, width: 200, minWidth: 200, maxWidth: 200,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.toString() === 'SSD' ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            (
                                cellValues.value === '' ? <span className='badge bg-danger'>{t('UnIdentify')}</span> 
                                : 
                                <span className='badge bg-danger'>{cellValues.value}</span>
                            ) 
                            
                        }
                        </div>
                    )
                }
            },
            { field: 'LAST_INSTALL', headerName: 'LAST_INSTALL', flex: 0, width: 180, minWidth: 180, maxWidth: 180,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            <span className='badge bg-success'>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'VERSION_MYSQL', headerName: 'VERSION_MYSQL', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center' },
            { field: 'ARCH', headerName: 'ARCH', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
            { field: 'BINLOG_FORMAT', headerName: 'BINLOG_FORMAT', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.toString() === 'MIXED' ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <span className='badge bg-danger'>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'INNODB_BUFFER_POOL_SIZE', headerName: 'INNODB_BUFFER_POOL_SIZE', flex: 0, width: 200, minWidth: 200, maxWidth: 200,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.toString().includes('NOK') ? 
                            <span className='badge bg-danger'>{cellValues.value.split('-NOK').join('').split('-OK').join('')}</span>
                            :
                            <span className='badge bg-success'>{cellValues.value.split('-NOK').join('').split('-OK').join('')}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'MAX_CONNETIONS', headerName: 'MAX_CONNETIONS', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
            { field: 'TRX_COMMIT', headerName: 'TRX_COMMIT', flex: 0, width: 100, minWidth: 100, maxWidth: 100,headerAlign:'center',align:'center' },
            { field: 'ERROR_LOG', headerName: 'ERROR_LOG', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
            { field: 'MYSQL_BINLOG', headerName: 'MYSQL_BINLOG', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
            { field: 'MYSQL_IBDATA', headerName: 'MYSQL_IBDATA', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
            { field: 'DATABASE_ASING', headerName: 'DATABASE_ASING', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.toString() === '-' ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <span className='badge bg-danger'>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'DURASI_START_MYSQL', headerName: 'DURASI_START_MYSQL', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.toString().substring(3,5) === '00' || cellValues.value.toString().substring(3,5) === '01' || (cellValues.value.toString().substring(3,5) === '02' && parseFloat(cellValues.value.toString().substring(7,8)) === 0) ? 
                            
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <span className='badge bg-danger'>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'ERROR_INNODB', headerName: 'ERROR_INNODB', flex: 0, width: 250, minWidth: 250, maxWidth: 250,headerAlign:'left',align:'left',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                           
                            cellValues.value.toString().includes('NOK ERROR InnoDB') ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <span className='badge bg-danger'>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'LAST_WRITE_ERRLOG', headerName: 'LAST_WRITE_ERRLOG', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center' },
            { field: 'SIZE_ERRLOG', headerName: 'SIZE_ERRLOG (MB)', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center' },
            { field: 'GROWTH_ERRLOG', headerName: 'GROWTH_ERRLOG (MB)', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            parseFloat(cellValues.value.toString()) > 1 ? 
                            <span className='badge bg-danger'>{cellValues.value}</span>
                            :
                            <span className='badge bg-success'>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'TABLE_CORRUPT', headerName: 'TABLE_CORRUPT',width: 450, minWidth: 450, flex: 0,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.toString().includes('NO TABLE') || cellValues.value.toString() === '' ?
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <span className='badge bg-danger'>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'PATH_MYSQL_DATAFILE', headerName: 'PATH', flex: 0, width: 200, minWidth: 200, maxWidth: 200,headerAlign:'center',align:'center' },
            { field: 'SIZE_FOLDER', headerName: 'SIZE_FOLDER (GB)', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center' },
            { field: 'JUMLAH_TABLE_FOLDER_POS', headerName: 'JUMLAH_TABLE_FOLDER_POS', flex: 0, width: 220, minWidth: 220, maxWidth: 220,headerAlign:'center',align:'center' },
            { field: 'TANGGAL_TRF_DATA', headerName: 'TANGGAL', width: 180, minWidth: 180,flex: 0,headerAlign:'center',align:'center'},
            { field: 'MULAI_TRF_DATA', headerName: 'MULAI', width: 180, minWidth: 180,flex: 0,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            <span className='badge bg-dark'>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'SELESAI_TRF_DATA', headerName: 'SELESAI', width: 180, minWidth: 180,flex: 0,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            <span className='badge bg-dark'>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'DURASI', headerName: 'DURASI',width: 100, minWidth: 100, flex: 0,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.toString().includes('00:00:00') ?
                            <span className='badge bg-danger'>{cellValues.value}</span>
                            :
                            <span className='badge bg-success'>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            },
            { field: 'FILE_TRF_DATA_1', headerName: '1', flex: 0, width: 250, minWidth: 250, maxWidth: 250,headerAlign:'center',align:'center'},
            { field: 'FILE_TRF_DATA_2', headerName: '2', flex: 0, width: 250, minWidth: 250, maxWidth: 250,headerAlign:'center',align:'center'},
            { field: 'FILE_TRF_DATA_3', headerName: '3', flex: 0, width: 250, minWidth: 250, maxWidth: 250,headerAlign:'center',align:'center'},
            { field: 'REKOMENDASI', headerName: 'REKOMENDASI_PERBAIKAN',width: 180, minWidth: 180, flex: 0,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value.toString().includes('TIDAK PERLU') ?
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            cellValues.value.toString().includes('CABANG') ?
                            <span className='badge bg-warning'>{cellValues.value}</span>
                            :
                            cellValues.value.toString().includes('REGION') ?
                            <span className='badge bg-danger'>{cellValues.value}</span>
                            :
                            <span className='badge bg-info'>{cellValues.value}</span>
                        }
                        </div>
                    )
                }
            }
           
        ];
        let columnGroupingModel = [ {
                groupId: 'Internal',
                description: '',
                children: [{ field: 'id' }],
            },

            {
                groupId: ' ',
                children: [{ field: 'KODE' }, { field: 'KETERANGAN' },  { field: 'KDCAB' }, { field: 'KDTK' }, { field: 'NAMA' }, { field: 'STATION' }, { field: 'IP' }, {field: 'REQUEST'}, {field: 'RESPONSE'}],
            },

            {
                groupId: 'MEMORY',headerAlign:'center',
                children: [{ field: 'MEMORY_TERPASANG' }, { field: 'MEMORY_TERBACA' }],
            },
            {
                groupId: 'CPU',headerAlign:'center',
                children: [{ field: 'ARSITEKTUR' }, { field: 'PROCESSOR' }],
            },
            {
                groupId: 'LAIN-LAIN',headerAlign:'center',
                children: [{ field: 'MEDIA_TYPE' }, { field: 'LAST_INSTALL' }],
            },
            {
                groupId: 'MYSQL',headerAlign:'center',
                children: [{ field: 'VERSION_MYSQL' },
                                { field: 'ARCH' },
                                { field: 'BINLOG_FORMAT' },
                                { field: 'INNODB_BUFFER_POOL_SIZE' },
                                { field: 'MAX_CONNETIONS' },
                                { field: 'TRX_COMMIT' },
                                { field: 'ERROR_LOG' },
                                { field: 'MYSQL_BINLOG' },
                                { field: 'MYSQL_IBDATA' },
                                { field: 'DATABASE_ASING' },
                                { field: 'DURASI_START_MYSQL' },
                                { field: 'ERROR_INNODB' },
                ],
            },{
                groupId: 'TRANSFER_DATA',headerAlign:'center',
                children: [{ field: 'TANGGAL_TRF_DATA' },{ field: 'MULAI_TRF_DATA' },{ field: 'SELESAI_TRF_DATA' },{ field: 'DURASI' }],
            },{
                groupId: '3 FILE DENGAN DURASI TRANSFER DATA TERTINGGI (NAMAFILE(DURASI))',headerAlign:'center',
                children: [{ field: 'FILE_TRF_DATA_1' },{ field: 'FILE_TRF_DATA_2' },{ field: 'FILE_TRF_DATA_3' }],
            },
            {
                groupId: 'MYSQL_DATA_FILE',headerAlign:'center',
                children: [{ field: 'PATH_MYSQL_DATAFILE' },{ field: 'SIZE_FOLDER' },{ field: 'JUMLAH_TABLE_FOLDER_POS' }
                ],
            },{
                groupId: 'MYSQL_ERRLOG',headerAlign:'center',
                children: [{ field: 'LAST_WRITE_ERRLOG' },{ field: 'SIZE_ERRLOG' },{ field: 'GROWTH_ERRLOG' },{ field: 'TABLE_CORRUPT' }
                ],
            },
        ];

        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }

    const Def_Columns_Report_Monitoring_3_Aplikasi_Tertinggi = () => {
        let columns = [
            { field: 'id', headerName: 'id', flex: 1 },
            {
                field: 'KODE', headerName: 'KODE', width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            {
                field: 'KETERANGAN', headerName: 'KETERANGAN', width: 240, minWidth: 240, maxWidth: 240,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 'Succes' ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            { field: 'REQUEST', headerName: 'REQUEST', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'RESPONSE', headerName: 'RESPONSE', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
            { field: 'KDTK', headerName: 'KDTK', width: 80, minWidth: 80, maxWidth: 80 },
            { field: 'NAMA', headerName: 'NAMA', flex: 1, width: 250, minWidth: 250, maxWidth: 250 },
            { field: 'STATION', headerName: 'STATION', width: 90, minWidth: 90, maxWidth: 90 },
            { field: 'IP', headerName: 'IP',flex: 0, width: 130, minWidth: 130, maxWidth: 130 },                                
            { field: 'MEMORY_TERPASANG', headerName: 'MEMORY_TERPASANG', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center' },
            { field: 'MEMORY_TERBACA', headerName: 'MEMORY_TERBACA', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center' },
            { field: 'MEMORY_USAGE', headerName: 'MEMORY_USAGE', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center' },
            { field: 'ARSITEKTUR', headerName: 'ARSITEKTUR', flex: 0, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center' },
            { field: 'PROCESSOR', headerName: 'PROCESSOR', flex: 0, width: 350, minWidth: 350, maxWidth: 350 ,headerAlign:'center',align:'center' },
            { field: 'UPTIME', headerName: 'UPTIME', flex: 0, width: 180, minWidth: 180, maxWidth: 180 ,headerAlign:'center',align:'center' },
            
            
            { field: 'PROGRAM_1', headerName: 'PROGRAM', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            NewhandleRowClick(event, cellValues,"PROGRAM_1");
                        }} >
                        <span data-twe-toggle="tooltip" title="Klik untuk melihat detail log" className={'text-center text-danger dark:hover:text-white-light font-semibold hover:cursor-pointer underline underline-offset-4'}  >{cellValues.value}</span>
                        </a> 
                    );
                }
            },
            { field: 'MEMORY_USAGE_1', headerName: 'MEMORY_USAGE(MB)', flex: 0, width: 160, minWidth: 160, maxWidth: 160,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                         
                        <span className={'text-center text-danger dark:hover:text-white-light font-semibold'}  >{cellValues.value}</span>
                         
                    );
                }
            },
            { field: 'START_TIME_1', headerName: 'WAKTU_MULAI', flex: 0, width: 170, minWidth: 170, maxWidth: 170,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                         
                        <span  className={'text-center text-danger dark:hover:text-white-light font-semibold'}  >{cellValues.value}</span>
                         
                    );
                }
            },
            { field: 'DURASI_1', headerName: 'DURASI_BERJALAN', flex: 0, width: 170, minWidth: 170, maxWidth: 170,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                         
                        <span  className={'text-center text-danger dark:hover:text-white-light font-semibold'}  >{cellValues.value}</span>
                         
                    );
                }
            },
           
            //-- PROGRAM 2 --//
            { field: 'PROGRAM_2', headerName: 'PROGRAM', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            NewhandleRowClick(event, cellValues,"PROGRAM_2");
                        }} >
                        <span data-twe-toggle="tooltip" title="Klik untuk melihat detail log" className={'text-center text-primary dark:text-warning dark:hover:text-white-light font-semibold hover:cursor-pointer underline underline-offset-4'}  >{cellValues.value}</span>
                        </a>
                    );
                }
            },
            { field: 'MEMORY_USAGE_2', headerName: 'MEMORY_USAGE(MB)', flex: 0, width: 160, minWidth: 160, maxWidth: 160,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        
                        <span className={'text-center text-primary dark:text-warning dark:hover:text-white-light font-semibold'}  >{cellValues.value}</span>
                       
                    );
                }
            },
            { field: 'START_TIME_2', headerName: 'WAKTU_MULAI', flex: 0, width: 170, minWidth: 170, maxWidth: 170,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        
                        <span  className={'text-center text-primary dark:text-warning dark:hover:text-white-light font-semibold'}  >{cellValues.value}</span>
                       
                    );
                }
            },
            { field: 'DURASI_2', headerName: 'DURASI_BERJALAN', flex: 0, width: 170, minWidth: 170, maxWidth: 170,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                         
                        <span className={'text-center text-primary dark:text-warning dark:hover:text-white-light font-semibold'}  >{cellValues.value}</span>
                         
                    );
                }
            },
            
            //-- PROGRAM 3 --//
            { field: 'PROGRAM_3', headerName: 'PROGRAM', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            NewhandleRowClick(event, cellValues,"PROGRAM_3");
                        }} >
                        <span data-twe-toggle="tooltip" title="Klik untuk melihat detail log" className={'text-center text-dark dark:text-sky-100 dark:hover:text-white-light font-semibold hover:cursor-pointer underline underline-offset-4'}  >{cellValues.value}</span>
                        </a>
                    );
                }
            },
            { field: 'MEMORY_USAGE_3', headerName: 'MEMORY_USAGE(MB)', flex: 0, width: 160, minWidth: 160, maxWidth: 160,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        
                        <span  className={'text-center text-dark dark:text-sky-100 dark:hover:text-white-light font-semibold'}  >{cellValues.value}</span>
                       
                    );
                }
            },
            { field: 'START_TIME_3', headerName: 'WAKTU_MULAI', flex: 0, width: 170, minWidth: 170, maxWidth: 170,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        
                        <span className={'text-center text-dark dark:text-sky-100 dark:hover:text-white-light font-semibold'}  >{cellValues.value}</span>
                       
                    );
                }
            },
            { field: 'DURASI_3', headerName: 'DURASI_BERJALAN', flex: 0, width: 170, minWidth: 170, maxWidth: 170,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                         
                        <span  className={'text-center text-dark dark:text-sky-100 dark:hover:text-white-light font-semibold'}  >{cellValues.value}</span>
                         
                    );
                }
            },
            
            { field: 'DETIL_LOG', headerName: 'DETIL_LOG', flex: 0, width: 180, minWidth: 180, maxWidth: 180 ,headerAlign:'center',align:'center' },
        ];

        let columnGroupingModel = [
            {
                groupId: 'Internal',
                description: '',
                children: [{ field: 'id' }],
            },
            {
                groupId: '  ',
                children: [
                         {
                            groupId: 'IDENTITAS_TOKO',headerAlign:'center',
                            children: [
                                { field: 'KODE' }, { field: 'KETERANGAN' },  { field: 'KDCAB' }, { field: 'KDTK' }, { field: 'NAMA' }, { field: 'STATION' }, { field: 'IP' }, {field: 'REQUEST'}, {field: 'RESPONSE'},
                            ],  
                            
                         },
                         {
                            groupId: 'MEMORY',headerAlign:'center',
                            children: [
                                { field: 'MEMORY_TERPASANG'},{ field: 'MEMORY_TERBACA'},{ field: 'MEMORY_USAGE'},
                            ],  
                            
                         },
                         {
                            groupId: 'CPU',headerAlign:'center',
                            children: [
                                { field: 'ARSITEKTUR' }, { field: 'PROCESSOR' }, { field: 'UPTIME' }
                            ],  
                            
                         },
                ],
            },
            {
                groupId: '3 PROGRAM DENGAN MEMORY USAGE TERTINGGI',headerAlign:'center',
                children: [
                        {
                            groupId: '1',headerAlign:'center',
                            children: [{ field: 'PROGRAM_1' }, { field: 'MEMORY_USAGE_1' },{field:'START_TIME_1'},{field:'DURASI_1'}],
                        },
                        {
                            groupId: '2',headerAlign:'center',
                            children: [{ field: 'PROGRAM_2' }, { field: 'MEMORY_USAGE_2' },{field:'START_TIME_2'},{field:'DURASI_2'}],
                        },
                        {
                            groupId: '3',headerAlign:'center',
                            children: [{ field: 'PROGRAM_3' }, { field: 'MEMORY_USAGE_3' },{field:'START_TIME_3'},{field:'DURASI_3'}],
                        },
                ],
            },
        ];

        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }

    const Def_Columns_Report_Monitoring_POS_Replikasi = () => {
        let columns = [
            { field: 'id', headerName: 'id', flex: 1 },
            {
                field: 'KODE', headerName: 'KODE', width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            {
                field: 'KETERANGAN', headerName: 'KETERANGAN', width: 240, minWidth: 240, maxWidth: 240,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 'Succes' ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            { field: 'REQUEST', headerName: 'REQUEST', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'RESPONSE', headerName: 'RESPONSE', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
            { field: 'KDTK', headerName: 'KDTK', width: 80, minWidth: 80, maxWidth: 80 },
            { field: 'NAMA', headerName: 'NAMA', flex: 1, width: 250, minWidth: 250, maxWidth: 250 },
            { field: 'STATION', headerName: 'STATION', width: 90, minWidth: 90, maxWidth: 90 },
            { field: 'IP', headerName: 'IP',flex: 0, width: 130, minWidth: 130, maxWidth: 130 },                                
            { field: 'SERVICE', headerName: 'SERVICE', flex: 0, width: 250, minWidth: 250, maxWidth: 250,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value.includes('Service does NOT exist') || cellValues.value.includes('Error Get Service') ? 'badge bg-danger' : (cellValues.value === 'STOPPED' ? 'badge bg-warning': 'badge bg-success') }  >{cellValues.value}</span>
                    );
                }
            },
            { field: 'LOG', headerName: 'LOG', flex: 0, width: 250, minWidth: 250, maxWidth: 250 ,headerAlign:'center',align:'center' },
        ];

        let columnGroupingModel = [
            {
                groupId: 'Internal',
                description: '',
                children: [{ field: 'id' }],
            },

            {
                groupId: '  ',
                children: [
                         {
                            groupId: 'IDENTITAS_TOKO',headerAlign:'center',
                            children: [
                                { field: 'KODE' }, { field: 'KETERANGAN' },  { field: 'KDCAB' }, { field: 'KDTK' }, { field: 'NAMA' }, { field: 'STATION' }, { field: 'IP' }, {field: 'REQUEST'}, {field: 'RESPONSE'},
                            ],  
                            
                         },
                         {
                            groupId: 'POS_REPLIKASI',headerAlign:'center',
                            children: [
                                { field: 'SERVICE' }, { field: 'LOG' }
                            ],  
                            
                         },
                ],
            },
        ];

        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }
    const HandleClick2 = async () => {
        if (TextButtonFilter === 'Proses' || TextButtonFilter === 'Process') {
            let in_counter = 0;
            start(in_counter, "timer");
            const kdcab = IN_CMB_KODE_CABANG;
            var res_total_gagal = 0
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setData_rows([]);
            setDataGagal('');
            setDataIP('');
            setStateCode(0);
            setClosedWS('');
            setLastResponse('');
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
                const station = (IN_CMB_STATION === 'IS_Induk' ? '' : IN_CMB_STATION);
                var key = GetToken()
                console.log('command : '+command)
                let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                let NoCheckDB = true;
                let resMaxSecondHandleProses_waktu_listeners_meresponse = 60;
                if(IDReport === 'Report Monitoring Penggunaan Memory PC'){
                    resMaxSecondHandleProses_waktu_listeners_meresponse = 30;
                }else{
                    resMaxSecondHandleProses_waktu_listeners_meresponse = 60;
                }
                const param = WritePayload(kdcab, "", station, (IS_Induk === '1' ? IS_Induk : (station === 'IS_Induk' ? '1' : '') ), "COMMAND", res_command, 2, false, IDReport, key, IP,NoCheckDB,resMaxSecondHandleProses_waktu_listeners_meresponse);
                setTextButtonFilter(t('Please wait'))
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
                    setLoading(false);
                    setProgress(t('Finished Session'));
                    setTextButtonFilter(t('Process'))
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                    isConnectedWS.current = 0
                    setisDisabled(false)
                });

                // Connection opened
                socket.addEventListener("open", () => {
                    socket.send(param);
                    setTextButtonFilter('Please wait')
                    setLoadingButton(true)
                    setisDisabled(true)
                    isConnectedWS.current = 1
                });
                // Connection close
                socket.addEventListener("close", (event: any) => {
                    console.log('connection close');
                    setLoading(false);
                    stop();
                    setProgress(t('Finished Session'));
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
                    const tgl_kini = get_format_tanggal_jam();
                    setLastResponse(tgl_kini);
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
                    const tgl_kini = get_format_tanggal_jam();
                    setLastResponse(tgl_kini);
                    setLoading(true);
                    if (code === 200 || code === 209) {
                        setProgress(code + '-' + msg);
                        setLoadingButton(true)
                        if(isConnectedWS.current === 0){
                            setisDisabled(false)
                        }else{
                            setisDisabled(true)
                        }
                        try {
                            const res_data = JSON.parse(parse_json.data);
                            const res_new = res_data;
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
                                let result = parse_data_inti.data
                                if(res_kdtk === 'T71B' || res_kdtk === 'FFSH'){
                                    console.log('result : '+result)
                                }
                                //-- MONITORING APPS&OS CRASH --//
                                if(IDReport === 'Report Monitoring Apps & Os Crash'){
                                    const obj = Report_Monitoring_Apps_Os_Crash(false,0,[],res_data_code,res_data_msg,res_kdcab,res_kdtk,res_nama,res_station,res_ip,res_request,res_response,result);
                                    rows.push(obj[0])
                                //-- MONITORING MYSQLFORPOSNET --//
                                }else if(IDReport === 'Report Monitoring Mysql For Posnet'){
                                    const obj = Report_Monitoring_Mysql_For_Posnet(false,0,[],res_data_code,res_data_msg,res_kdcab,res_kdtk,res_nama,res_station,res_ip,res_request,res_response,result);
                                    rows.push(obj[0])
                                //-- MONITORING 3 APLIKASI TERTINGGI --//    
                                }else if(IDReport === 'Report Monitoring Penggunaan Memory PC'){
                                    const obj = Report_Monitoring_3_Aplikasi_Tertinggi(false,0,[],res_data_code,res_data_msg,res_kdcab,res_kdtk,res_nama,res_station,res_ip,res_request,res_response,result);
                                    rows.push(obj[0])
                                //-- MONITORING POS Replikasi --//
                                }else{
                                    const obj = Report_Monitoring_POS_Replikasi(false,0,[],res_data_code,res_data_msg,res_kdcab,res_kdtk,res_nama,res_station,res_ip,res_request,res_response,result);
                                    rows.push(obj[0])
                                } 
                            }
                            //-- parse hitung dari data yang terupdate --//
                            const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'KODE', false, false, false);
                            setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                            setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
                            //-- prosentase progressbar --//
                            var prosentase = Math.round(((arr_data_sukses_dan_gagal_from_Table[0] + arr_data_sukses_dan_gagal_from_Table[1]) / countdata) * 100);
                            setDataProsentase(prosentase)

                            const res_data_gagal_after_trigger = GetFailedClient(rows, 'KDCAB', false);
                            setDataGagal(res_data_gagal_after_trigger);
                            const res_ip_gagal_after_trigger = GetFailedClient(rows, 'KDCAB', true);
                            setDataIP(res_ip_gagal_after_trigger);
                            res_total_gagal =  arr_data_sukses_dan_gagal_from_Table[1];
                            //-- DEFINISI COLUMNS MONITORING APPS & OS CRASH --//
                            let columns: SetStateAction<any[]> = [];
                            let columnGroupingModel = [];
                            if(IDReport === 'Report Monitoring Apps & Os Crash'){
                                let arr_res_columns = Def_Columns_Report_Monitoring_Apps_Os_Crash();
                                columns = arr_res_columns[0];
                                columnGroupingModel = arr_res_columns[1];
                            //-- DEFINISI COLUMNS MONITORING MYSQL FOR POSNET --//    
                            }else if(IDReport === 'Report Monitoring Mysql For Posnet'){
                                let arr_res_columns = Def_Columns_Report_Monitoring_Mysql_for_Posnet();
                                columns = arr_res_columns[0];
                                columnGroupingModel = arr_res_columns[1];
                            //-- DEFINISI COLUMNS 3 APLIKASI TERTINGGI --//    
                            }else if(IDReport === 'Report Monitoring Penggunaan Memory PC'){
                                let arr_res_columns = Def_Columns_Report_Monitoring_3_Aplikasi_Tertinggi();
                                columns = arr_res_columns[0];
                                columnGroupingModel = arr_res_columns[1];                                    
                            //-- MONITORING POS REPLIKASI --//
                            }else{
                                let arr_res_columns = Def_Columns_Report_Monitoring_POS_Replikasi();
                                columns = arr_res_columns[0];
                                columnGroupingModel = arr_res_columns[1];        
                            }
                            setData_columns(columns);
                            let res_rows = AddID(rows);
                            setData_rows(res_rows);
                            setcolumnGroupingModel(columnGroupingModel);
                            setTextButtonFilter(t('Retrieve data failed')+' (' + res_total_gagal + ')')
                            if (code === 209) {
                                setLoading(false);
                                isConnectedWS.current = 0
                                setLoadingButton(false)
                            } else {
                                isConnectedWS.current = 1
                            }
                        } catch (Ex) {
                            console.log('error parsing : ' + Ex.toString())
                            const val_gagal = GetTotalFailedClient('value_total_gagal')
                            setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                            setLoading(false)
                            setisDisabled(false)
                            setLoadingButton(false)
                        }
                    }else if (code === 201) {
                        setLoading(true);
                        setLoadingButton(true)
                        isConnectedWS.current = 1
                    }else if (parse_json.code.toString().substring(0, 1) === '4') {
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
                        setisDisabled(false)
                        setTextButtonFilter('Process')
                        isConnectedWS.current = 0
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
                const res_data_gagal = data_gagal;
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
                    let param = WritePayload(kdcab, res_data_gagal, station, IS_Induk, "COMMAND", ""+res_command, 4, false, IDReport, key, IP,true,30);
                    console.log('param : '+param)
                    setTextButtonFilter(t('Please wait'))
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
                        setTextButtonFilter(t('Process'))
                        isConnectedWS.current = 0
                    });
                    // Connection opened
                    socket.addEventListener("open", () => {
                        socket.send(param)
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
                        let rows = []
                        if (code === 200 || code === 209) {
                            if (((msg.includes('Mohon di tunggu'))) || (msg.includes('Handletime kami Default'))) {
                                setProgress(code + '-' + msg);
                                setLoading(true);
                            } else {
                                try {
                                    const ubah_data_inti_json = JSON.stringify(parse_json.data);
                                    const res_data = JSON.parse(ubah_data_inti_json);
                                    for (var o = 0; o < res_data.length; o++) {
                                        const ubah_json = JSON.stringify(res_data[o])
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
                                        let result = parse_data_inti.data
                                        const objIndex = data_rows.findIndex(((obj: { IP: any; }) => obj.IP == res_ip));
                                        //-- MONITORING APPS&OS CRASH --//
                                        if(IDReport === 'Report Monitoring Apps & Os Crash'){
                                            Report_Monitoring_Apps_Os_Crash(true,objIndex,data_rows,res_data_code,res_data_msg,res_kdcab,res_kdtk,res_nama,res_station,res_ip,res_request,res_response,result);
                                            rows = data_rows
                                        //-- MONITORING MYSQLFORPOSNET --//
                                        }else if(IDReport === 'Report Monitoring Mysql For Posnet'){
                                            Report_Monitoring_Mysql_For_Posnet(true,objIndex,data_rows,res_data_code,res_data_msg,res_kdcab,res_kdtk,res_nama,res_station,res_ip,res_request,res_response,result);
                                            rows = data_rows
                                        //-- MONITORING 3 APLIKASI TERTINGGI --//    
                                        }else if(IDReport === 'Report Monitoring Penggunaan Memory PC'){
                                            Report_Monitoring_3_Aplikasi_Tertinggi(true,objIndex,data_rows,res_data_code,res_data_msg,res_kdcab,res_kdtk,res_nama,res_station,res_ip,res_request,res_response,result);
                                            rows = data_rows
                                        //-- MONITORING POS Replikasi --//
                                        }else{
                                            Report_Monitoring_POS_Replikasi(true,objIndex,data_rows,res_data_code,res_data_msg,res_kdcab,res_kdtk,res_nama,res_station,res_ip,res_request,res_response,result);
                                            rows = data_rows
                                        } 
                                        //-- failed listeners --//
                                        //-- parse hitung dari data yang terupdate --//
                                        const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'KODE', false, false, false);
                                        setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                                        setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
                                        const res_data_gagal_after_trigger = GetFailedClient(rows, 'KDCAB', false);
                                        setDataGagal(res_data_gagal_after_trigger);
                                        const res_ip_gagal_after_trigger = GetFailedClient(rows, 'KDCAB', true);
                                        setDataIP(res_ip_gagal_after_trigger);
                                        res_total_gagal = arr_data_sukses_dan_gagal_from_Table[1];
                                        var a_rows = removeDuplicates(rows);
                                        let res_rows = AddID(a_rows);
                                        setData_rows(res_rows);
                                        setTextButtonFilter(t('Retrieve data failed')+' (' + res_total_gagal + ')')
                                        if (code === 209) {
                                            setLoading(false);
                                            isConnectedWS.current = 0
                                        } else {
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
                        }else if(code ==- 209){
                            setProgress(code + "-" + msg);
                            setLoading(true);
                            setisDisabled(true)
                        } else if (parse_json.code.toString() === '201') {
                            setProgress(code + "-" + msg);
                            setLoading(true);
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
                            } else {

                            }
                            setLoading(false);
                            setProgress('');
                            setTextButtonFilter(t('Process'))
                        }
                    });
                }
            } else {
                setLoading(false);
                setTextButtonFilter(t('Process'))
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
    const CloseModal = () => {
        if(modal13){
            setModal13(false)
        }else{
            setModal14(false)
        }
        
    }
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
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
                                    {
                                        IS_Induk === '1' ? 
                                        <DropDownStation isInduk={true} in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={[]} isSearchable={true} isMulti={false} event={userSelectStation} />
                                        :
                                        <DropDownStation isInduk={false} in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={[]} isSearchable={true} isMulti={false} event={userSelectStation} />
                                    }
                                    <div className="mb-3">
                                        <div className="flex">
                                            <ButtonFilter in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_filter"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSend />} in_title_button={TextButtonFilter} HandleClick={HandleClick2} />
                                            &nbsp;
                                            <ButtonReload in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={false} isDisabled={false} HandleClick={HandleReloadClick} />
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <CardInfoProses total_station={total_station} total_sukses={total_sukses} total_gagal={total_gagal} in_classname_content={"mx-auto grid max-w-[900px] grid-cols-4 justify-items-center gap-3"} />
                </div>
                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, DETIL_LOG: false}} jenis_laporan={IDReport} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS), new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={DataProsentase} in_rows_spanning={false}  />
                <ModalComponent in_size_modal={`panel animate__animated my-7 w-full overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-sm font-bold"} in_title_modal={'Detail Log : '+Title} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                    <div className="p-2">
                        <div className="mb-5">
                        {
                            TypeOSorAPPCrash === 'BSOD' || TypeOSorAPPCrash === 'HARD_RESET' || TypeOSorAPPCrash === 'TIDAK_TERDETEKSI'  ? 
                            <DataTables  in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, TYPE: false }} jenis_laporan={'Data Log'} data_rows={DataRowsAppOS} data_columns={ColumnsAppsOS} isLoading={LoadingAppsOS} progressbar={progressbar_log} field_auto_sorting={'TimeCreated'} type_sorting={'desc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={false} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={0} in_rows_spanning={false} /> 
                            :
                            <DataTables  in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false,TYPE:false }} jenis_laporan={'Data Log'} data_rows={DataRowsAppOS} data_columns={ColumnsAppsOS} isLoading={LoadingAppsOS} progressbar={progressbar_log} field_auto_sorting={'TimeCreated'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={false} in_csvOptions={false} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={0} in_rows_spanning={false} /> 
                        }
                        </div>
                    </div>
                } />
                <ModalComponent in_size_modal={`panel animate__animated my-7 w-full overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-sm font-bold"} in_title_modal={'Detail Log : '+Title} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                    <div className="p-2">
                            <div className="mb-5">
                                <DataTables  in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false,TYPE:false }} jenis_laporan={'Data Log'} data_rows={DataRowsAppOS} data_columns={ColumnsAppsOS} isLoading={LoadingAppsOS} progressbar={progressbar_log} field_auto_sorting={'TimeCreated'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel_Detail} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={false} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={0} in_rows_spanning={false} />
                            </div>
                    </div>            
                } />
                </>
            }
            />
        </>
    )
}
export default FormMonitoringResources;