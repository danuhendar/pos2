'use client'
import {  useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import config from '@/lib/config.json';
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertBinaryToText, GetFailedClient, GetSignature, GetToken, GetTotalFailedClient, WritePayload, WritePayloadAPI, get_branch_code, get_format_tanggal_jam, groupByMessageListeners, handleLogout, removeDuplicates, start, stop } from "@/lib/global";
import { ConvertDateFormat } from '../../lib/global';
import CardInfoProses from "../form/CardInfoProses";
import { useTranslation } from "react-i18next";
import DropDownBranch from "../dropdown/DropDownBranch";
import DatePicker from "../datepicker/DatePicker";
import ButtonFilter from "../button/ButtonFilter";
import IconSend from "../Icon/IconSend";
import ButtonReload from "../button/ButtonReload";
import { Report_Recon_Mtran_VS_SQLite } from "@/controller/report_software/MonitoringReportSoftware";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
interface FormRekonMtranSQLiteProps {
    url: string,
    command: string,
    IDReport: string,
    IS_Induk:string
}
const FormRekonMtranSQLite: React.FC<FormRekonMtranSQLiteProps> = ({ url, command, IDReport, IS_Induk }) => {
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [IN_CMB_STATION, setStation] = useState("");
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
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [stateCode,setStateCode] = useState(0);
    const curdate = get_format_tanggal_jam().substring(0,16);
    const [date2, setDate2] = useState<any>(curdate);
    const [date3, setDate3] = useState<any>(curdate);
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();
    const router = useRouter();
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
            setKODE_CABANG(arr_kode_cabang);
            setTextButtonFilter('Process')
            setDataIP('');
        }
    };

    const Def_Columns_RekonMtranSQLite = () => {
        let columns = [
            { field: 'id', headerName: 'id', flex: 1 },
            {
                field: 'KODE', headerName: 'KODE', width: 70, minWidth: 70, maxWidth: 70,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            {
                field: 'KETERANGAN', headerName: 'KETERANGAN', width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center',
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
            { field: 'NAMA', headerName: 'NAMA', flex: 0, width: 250, minWidth: 250, maxWidth: 250 },
            { field: 'STATION', headerName: 'STATION', width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center' },
            { field: 'IP', headerName: 'IP',flex: 0, width: 130, minWidth: 130, maxWidth: 130,headerAlign:'center',align:'center' },
            { field: 'HASIL', headerName: 'HASIL',flex: 1, width: 450, minWidth: 450,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 'Tidak ada selisih sales SQLITE' ?  'badge bg-success' : (cellValues.value.includes('bukan toko sqlite !') ? 'badge bg-warning' : 'badge bg-danger') }>{cellValues.value}</span>
                    )
                }
            },
        ];
        let columnGroupingModel: any[] = [];
        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }

    const HandleClick2 = async () => {
        if (TextButtonFilter === 'Proses' || TextButtonFilter === 'Process') {
            let in_counter = 0;
            start(in_counter, "timer");
            var res_total_gagal = 0;
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setData_rows([]);
            setDataGagal('');
            setDataIP('');
            setStateCode(0);
            let rows = [];
            if (kdcab === '') {
                Swal.fire({
                    title: t("Warning"),
                    text: t('Select Branch Code'),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            } else {
                const station = '01,02,03,04,05,06,07,08,09,10,11,12,13,22';
                var key = GetToken()
                const startDate = ConvertDateFormat(date2,false);
                const endDate = ConvertDateFormat(date3,false);
                var command = "%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"$filePath = 'd:\\backoff\\pos.net.exe'; $fileVersionInfo = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($filePath);$versionParts = $fileVersionInfo.FileVersion -split '\\.'; $majorVersion = [int]$versionParts[0];if ($majorVersion -ge 4) {$startDate = Get-Date '"+startDate+"';$endDate = Get-Date '"+endDate+"';$startDateFormatted = $startDate.ToString('yyyy-MM-dd'); $endDateFormatted = $endDate.ToString('yyyy-MM-dd');[void][system.reflection.Assembly]::LoadFrom('C:\\IDMCommandListeners\\MySql.Data.DLL');$registryPath = 'HKCU:\\Software\\INDOMARET\\POS.NET\\Database';$valueName = 'Server';$registryValue = Get-ItemProperty -Path $registryPath -Name $valueName -ErrorAction Stop; $ipInduk = $registryValue.$valueName;$mysql_server = $ipInduk;$mysql_user = 'edp';$mysql_password = 'cUm4l!h4t@datA';$dbName = 'pos';$Connection = New-Object -TypeName MySql.Data.MySqlClient.MySqlConnection;$Connection.ConnectionString = \"\\\"SERVER=$mysql_server;DATABASE=$dbName;UID=$mysql_user;PWD=$mysql_password\"\\\";$Connection.Open();$MYSQLCommand = New-Object MySql.Data.MySqlClient.MySqlCommand;$MYSQLDataAdapter = New-Object MySql.Data.MySqlClient.MySqlDataAdapter;$MYSQLDataSet = New-Object System.Data.DataSet;$MYSQLCommand.Connection=$Connection;$MYSQLCommand.CommandText=\"\\\"SELECT concat('POS.NET.BckJual',station,'.',date_format(tanggal,'%y%m%d'),shift,station,docno) FROM mtran WHERE tanggal between '$startDateFormatted' and '$endDateFormatted' GROUP BY station,shift,docno,tanggal\"\\\";$MYSQLDataAdapter.SelectCommand=$MYSQLCommand;$NumberOfDataSets=$MYSQLDataAdapter.Fill($MYSQLDataSet, 'data');$docno_mtran=$MYSQLDataSet.tables[0][0]; $FileAcuanMtran = $docno_mtran | ForEach-Object { $_.Item(0) };if (Test-Path 'E:\\') {$directoryPath = 'E:';} elseif (Test-Path 'D:\\') {$directoryPath = 'D:'} ;  $directoryFileNames = Get-ChildItem -Path $directoryPath -Recurse -Filter 'POS.NET.Bck*.*' | Where-Object {$dateString = ($_ | Select-Object -ExpandProperty Name) -replace '.*\\.(\\d{6})\\d*$', '$1'; try {$fileDate = [datetime]::ParseExact($dateString, 'yyMMdd', $null); return ($fileDate -ge $startDate -and $fileDate -le $endDate)} catch {return $false}}; $directoryFileNames = $directoryFileNames | Select-Object -ExpandProperty Name; $fileNotMtran = $directoryFileNames | Where-Object { $_ -notin $FileAcuanMtran };$currentTime = Get-Date;if ($fileNotMtran) {$fileNotMtranPaths = Get-ChildItem -Path $directoryPath -Recurse -File | Where-Object { $fileNotMtran -contains $_.Name -and ($currentTime - $_.LastWriteTime).TotalMinutes -gt 5 } | Select-Object FullName|ConvertTo-Csv -NotypeInformation|Select -Skip 1|Out-String;if ($fileNotMtranPaths){$fileNotMtranPaths} else {Write-Host 'Tidak ada selisih sales SQLITE'}} else {Write-Host 'Tidak ada selisih sales SQLITE'}} else {Write-Output 'bukan toko sqlite !'}\"";
                let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                const NoCheckDB = true;
                let resMaxSecondHandleProses_waktu_listeners_meresponse = 60;
                const param = WritePayload(kdcab, "", station, (IS_Induk === '1' ? IS_Induk : (IN_CMB_STATION === 'IS_Induk' ? '1' : '') ), "COMMAND", res_command, 2, false, IDReport, key, IP,NoCheckDB,resMaxSecondHandleProses_waktu_listeners_meresponse);
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
                    setLoading(false);
                    setProgress(t('Finished Session'))
                    setTextButtonFilter('Process')
                    setLoadingButton(false)
                    setisDisabled(false)
                    isConnectedWS.current = 1
                });

                // Connection opened
                socket.addEventListener("open", () => {
                    socket.send(param)
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
                    setLoading(true);
                    if (code === 200 || code === 209) {
                            setProgress(code + '-' + msg);
                            if(isConnectedWS.current === 0){
                                setisDisabled(false)
                            }else{
                                setisDisabled(true)
                            }
                            try {
                                const res_data = JSON.parse(rdata);
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
                                    //-- REKON MTRAN VS SQLite--//
                                    const obj = Report_Recon_Mtran_VS_SQLite(false,0,[],res_data_code,res_data_msg,res_kdcab,res_kdtk,res_nama,res_station,res_ip,res_request,res_response,result)
                                    rows.push(obj[0])
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
                                let arr_res_columns = Def_Columns_RekonMtranSQLite();
                                let columns  = arr_res_columns[0];
                                let columnGroupingModel = arr_res_columns[1];
                                setData_columns(columns);
                                setcolumnGroupingModel(columnGroupingModel);
                                let res_rows = AddID(rows);
                                setData_rows(res_rows);
                                setTextButtonFilter(t('Retrieve data failed')+' ('+res_total_gagal+')')
                                if (code === 209) {
                                    setLoading(false);
                                    isConnectedWS.current = 0
                                } else {
                                    isConnectedWS.current = 1
                                }
                            } catch (Ex) {
                                const val_gagal = GetTotalFailedClient('value_total_gagal')
                                setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                                setLoading(false)
                                setisDisabled(false)
                                setLoadingButton(false)
                            }
                    }
                    else if (code === 201) {
                        setProgress(code + "-" + msg);
                        setTextButtonFilter(t('Please wait'))
                        setLoading(true);
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
                        setTextButtonFilter(t('Process'))
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
                let rows = [];
                if (kdcab === '') {
                    Swal.fire({
                        title: t("Warning"),
                        text: t('Select Branch Code'),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                } else {
                    const station = '';
                    const startDate = ConvertDateFormat(date2,false);
                    const endDate = ConvertDateFormat(date3,false);
                    var comamnd = "%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"$filePath = 'd:\\backoff\\pos.net.exe'; $fileVersionInfo = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($filePath);$versionParts = $fileVersionInfo.FileVersion -split '\\.'; $majorVersion = [int]$versionParts[0];if ($majorVersion -ge 4) {$startDate = Get-Date '"+startDate+"';$endDate = Get-Date '"+endDate+"';$startDateFormatted = $startDate.ToString('yyyy-MM-dd'); $endDateFormatted = $endDate.ToString('yyyy-MM-dd');[void][system.reflection.Assembly]::LoadFrom('C:\\IDMCommandListeners\\MySql.Data.DLL');$registryPath = 'HKCU:\\Software\\INDOMARET\\POS.NET\\Database';$valueName = 'Server';$registryValue = Get-ItemProperty -Path $registryPath -Name $valueName -ErrorAction Stop; $ipInduk = $registryValue.$valueName;$mysql_server = $ipInduk;$mysql_user = 'edp';$mysql_password = 'cUm4l!h4t@datA';$dbName = 'pos';$Connection = New-Object -TypeName MySql.Data.MySqlClient.MySqlConnection;$Connection.ConnectionString = \"\\\"SERVER=$mysql_server;DATABASE=$dbName;UID=$mysql_user;PWD=$mysql_password\"\\\";$Connection.Open();$MYSQLCommand = New-Object MySql.Data.MySqlClient.MySqlCommand;$MYSQLDataAdapter = New-Object MySql.Data.MySqlClient.MySqlDataAdapter;$MYSQLDataSet = New-Object System.Data.DataSet;$MYSQLCommand.Connection=$Connection;$MYSQLCommand.CommandText=\"\\\"SELECT concat('POS.NET.BckJual',station,'.',date_format(tanggal,'%y%m%d'),shift,station,docno) FROM mtran WHERE tanggal between '$startDateFormatted' and '$endDateFormatted' GROUP BY station,shift,docno,tanggal\"\\\";$MYSQLDataAdapter.SelectCommand=$MYSQLCommand;$NumberOfDataSets=$MYSQLDataAdapter.Fill($MYSQLDataSet, 'data');$docno_mtran=$MYSQLDataSet.tables[0][0]; $FileAcuanMtran = $docno_mtran | ForEach-Object { $_.Item(0) };if (Test-Path 'E:\\') {$directoryPath = 'E:';} elseif (Test-Path 'D:\\') {$directoryPath = 'D:'} ;  $directoryFileNames = Get-ChildItem -Path $directoryPath -Recurse -Filter 'POS.NET.Bck*.*' | Where-Object {$dateString = ($_ | Select-Object -ExpandProperty Name) -replace '.*\\.(\\d{6})\\d*$', '$1'; try {$fileDate = [datetime]::ParseExact($dateString, 'yyMMdd', $null); return ($fileDate -ge $startDate -and $fileDate -le $endDate)} catch {return $false}}; $directoryFileNames = $directoryFileNames | Select-Object -ExpandProperty Name; $fileNotMtran = $directoryFileNames | Where-Object { $_ -notin $FileAcuanMtran };$currentTime = Get-Date;if ($fileNotMtran) {$fileNotMtranPaths = Get-ChildItem -Path $directoryPath -Recurse -File | Where-Object { $fileNotMtran -contains $_.Name -and ($currentTime - $_.LastWriteTime).TotalMinutes -gt 5 } | Select-Object FullName|ConvertTo-Csv -NotypeInformation|Select -Skip 1|Out-String;if ($fileNotMtranPaths){$fileNotMtranPaths} else {Write-Host 'Tidak ada selisih sales SQLITE'}} else {Write-Host 'Tidak ada selisih sales SQLITE'}} else {Write-Output 'bukan toko sqlite !'}";
                    let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                    var key = GetToken()
                    const param = WritePayload(kdcab, res_data_gagal, station, IS_Induk, "COMMAND", res_command, 4, false, IDReport, key, IP,true,30);
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
                        setLoading(false);
                        setProgress(t('Finished Session'));
                        setTextButtonFilter('Process')
                        isConnectedWS.current = 0
                    });
                    // Connection opened
                    socket.addEventListener("open", () => {
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
                        setLoadingButton(true)
                        if (code === 200 || code === 209) {
                            if(isConnectedWS.current === 0){
                                setisDisabled(false)
                            }else{
                                setisDisabled(true)
                            }
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
                                        const res_data_msg = parse_data_inti.msg
                                        const res_data_code = parse_data_inti.code
                                        const res_request = parse_data_inti.timerequest
                                        const res_response = parse_data_inti.timerespons
                                        const res_kdcab = parse_data_inti.kdcab;
                                        const res_kdtk = parse_data_inti.toko
                                        const res_nama = parse_data_inti.nama
                                        const res_station = parse_data_inti.station
                                        const res_ip = parse_data_inti.ip
                                        const result = parse_data_inti.data
                                        //-- REKON MTRAN VS SQLite--//
                                        const sp_record = (parse_data_inti.data.includes('No files') ? 'Tidak ada selisih sales SQLITE' : parse_data_inti.data.split('\r\n').join(','));
                                        const objIndex = data_rows.findIndex(((obj: { IP: any; }) => obj.IP == res_ip));
                                        Report_Recon_Mtran_VS_SQLite(true,objIndex,data_rows,res_data_code,res_data_msg,res_kdcab,res_kdtk,res_nama,res_station,res_ip,res_request,res_response,result)
                                        rows = data_rows;
                                        //-- parse hitung dari data yang terupdate --//
                                        const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'KODE', false, false, false);
                                        setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                                        setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
        
                                        const res_data_gagal_after_trigger = GetFailedClient(rows, 'KDCAB', false);
                                        setDataGagal(res_data_gagal_after_trigger);
                                        const res_ip_gagal_after_trigger = GetFailedClient(rows, 'KDCAB', true);
                                        setDataIP(res_ip_gagal_after_trigger);
                                        res_total_gagal =  arr_data_sukses_dan_gagal_from_Table[1];
                                        setTextButtonFilter(t('Retrieve data failed')+' ('+arr_data_sukses_dan_gagal_from_Table[1]+')')
                                        let arr_res_columns = Def_Columns_RekonMtranSQLite();
                                        let columns = arr_res_columns[0];
                                        let columnGroupingModel = arr_res_columns[1];
                                        setcolumnGroupingModel(columnGroupingModel);
                                        setData_columns(columns);
                                        let res_rows = AddID(rows);
                                        setData_rows(res_rows);
                                        setProgress(code + '-' + msg);
                                        if (code === 209) {
                                            setLoading(false)
                                            setisDisabled(false)
                                            setLoadingButton(false)
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
                            setLoading(false);  
                            setProgress(code + '-' + msg);
                            isConnectedWS.current = 0
                            setLoadingButton(false)
                        } else if (code === 201) {
                            setProgress(code + "-" + msg);
                            setLoading(true);
                            isConnectedWS.current = 0
                            setLoadingButton(true)
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
                setLoadingButton(false)
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
                                        <div className="grid grid-cols-2 gap-1">
                                            <div>
                                                <DatePicker in_mode={'single'} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg"} event={(date2) => setDate2(date2)} name_component={"Sales Periode"} idComponent={"txt_periode_awal"} isRtl={isRtl} in_date={date2} isEnableTime={false} date_format={"Y-m-d"} />
                                            </div>
                                            <div>
                                                <DatePicker in_mode={'single'} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg"} event={(date3) => setDate3(date3)} name_component={"Sales Periode"} idComponent={"txt_periode_akhir"} isRtl={isRtl} in_date={date3} isEnableTime={false} date_format={"Y-m-d"} />
                                            </div>
                                        </div>
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
                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, DETIL_LOG: false }} jenis_laporan={IDReport} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={DataProsentase} in_rows_spanning={false}  />
                </>   
            } />
        </>
    )
}
export default FormRekonMtranSQLite;