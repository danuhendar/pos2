'use client'
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertBinaryToText, GetID, GetSignature, GetToken, GetTotalFailedClient, HitungSuksesDanGagalFomTable, ListKey, SummaryValueOfArray, WritePayload, get_branch_code, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, removeDuplicates, setTombolAmbilDataGagal, start, stop } from "@/lib/global";
import { Gets } from "@/lib/get";
import CardInfoProses from "../form/CardInfoProses";
import { useTranslation } from "react-i18next";
import DropDownBranch from "../dropdown/DropDownBranch";
import DropDownStation from "../dropdown/DropDownStation";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import ButtonFilter from "../button/ButtonFilter";
import ButtonReload from "../button/ButtonReload";
import { ReportMonitoringProgramBackoff } from "@/controller/report_software/MonitoringReportSoftware";
import IconSend from "../Icon/IconSend";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";

interface FormMonitoringProgramBackoffProps {
    url: string,
    command: string,
    IDReport: string,
}

const FormMonitoringProgramBackoff: React.FC<FormMonitoringProgramBackoffProps> = ({ url, command, IDReport }) => {
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
    const [IN_HOST_RND, setHOST_RND] = useState('');
    const [IN_PORT_ADMINISTRASI,setPORT_ADMINISTRASI] = useState('');
    const [List_Data_program, setList_Data_program] = useState([]);
    const [Data_program, setData_program] = useState('');
    const [IN_Program,setProgram] = useState('');
    const [IN_List_ProgramServer,setIN_List_ProgramServer] = useState([]);
    const [stateCode,setStateCode] = useState(0);
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();

    const router = useRouter();
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const isConnectedWS = useRef(0)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        const res_PORT_ADMINISTRASI = themeConfig.port_administrasi
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        setHOST_RND(res_PORT_ADMINISTRASI)
        setPORT_ADMINISTRASI(res_PORT_ADMINISTRASI)
        let arr_cabang = get_branch_code(false,false);
        setOption5(arr_cabang)  
    },[]);

    const get_list_program = () => {
       if(`${IN_HOST}` === ''){

       }else{
            const url_list_program =  `http://${IN_HOST}:${IN_PORT_ADMINISTRASI}/v1/VersiProgramBackoff`;
            Gets(url_list_program,false,false).then((response) => {
                    const ubah_json = JSON.stringify(response);
                    const res_data = JSON.parse(ubah_json);
                    var code = res_data.code;
                    var ddata = res_data.data;
                    console.log(ddata);
                    if(code === 200){
                        var data = JSON.parse(res_data.data);
                        var arr_nama_program: SetStateAction<any[]> = [];
                        var arr_list_program_server: SetStateAction<any[]> = [];
                        var str_program = '';
                        // const obj_nama_program = {value:'',label:'-- Semua --'};
                        // arr_nama_program.push(obj_nama_program);
                        for(var p = 0;p<data.length;p++){
                            const nama_program = data[p].namaprogram.toString().toUpperCase();
                            const versi = data[p].versi;
                            const size = data[p].size;
                            const datemodified = data[p].datemodified;
                            const obj_nama_program = {value:nama_program,label:nama_program};
                            arr_nama_program.push(obj_nama_program);
                            
                            if(p === (data.length - 1)){
                                str_program = str_program + nama_program;
                            }else{
                                str_program = str_program + nama_program+',';
                            }

                            const obj_list_program_server = {'namaprogram':nama_program.toString().toUpperCase(),'versi':versi,'size':size,'datemodified':datemodified};
                            arr_list_program_server.push(obj_list_program_server);
                        }
                        setList_Data_program(arr_nama_program);
                        setData_program(str_program);
                        setIN_List_ProgramServer(arr_list_program_server);
                    }else{
                        Swal.fire({
                            title: t("Warning"),
                            text: t('Error Get Data'),
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    }
                }
            ).catch((error) => {
                Swal.fire({
                    title: t("Warning"),
                    text: "Error : "+error.toString(),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            });
       }
    }

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
    const userSelectStation = (value: any) => {
        setStation(value.value);
        get_list_program();
        setDataIP('');
    }
    const userSelectNamaProgram = (value:any) => {
        var list_ip_failed = '';
        setDataIP(list_ip_failed);
        setProgram(value.value);
        setTextButtonFilter('Process')
        setDataIP('');
    }
    const Def_Columns_Monitoring_Program_Backoff = (rows:any) => {
        const columns: GridColDef[] = [
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
            { field: 'REQUEST', headerName: 'REQUEST', width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'RESPONSE', headerName: 'RESPONSE', width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
            { field: 'KDTK', headerName: 'KDTK', width: 80, minWidth: 80, maxWidth: 80 },
            { field: 'NAMA', headerName: 'NAMA', flex: 1, width: 250, minWidth: 250, maxWidth: 250 },
            { field: 'STATION', headerName: 'STATION', width: 90, minWidth: 90, maxWidth: 90 },
            { field: 'IP', headerName: 'IP', width: 150, minWidth: 150, maxWidth: 150 },
            { field: 'NAMA_FILE', headerName: 'NAMA_FILE', flex: 1, width: 220, minWidth: 220, maxWidth: 220 },
            { field: 'PATH_TOKO', headerName: 'PATH', width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'VERSI_TOKO', headerName: 'VERSI', flex: 1, width: 130, minWidth: 130, maxWidth: 130 },
            { field: 'SIZE_BYTES_TOKO', headerName: 'SIZE_BYTES', flex: 1, width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'LAST_MODIFIED_TOKO', headerName: 'LAST_MODIFIED', width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'VERSI_SERVER', headerName: 'VERSI', flex: 1, width: 130, minWidth: 130, maxWidth: 130 },
            { field: 'LAST_MODIFIED_SERVER', headerName: 'LAST_MODIFIED', width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'SIZE_BYTES_SERVER', headerName: 'SIZE_BYTES', flex: 1, width: 170, minWidth: 170, maxWidth: 170 },                                    
            {
                field: 'STATUS', headerName: 'STATUS', width: 240, minWidth: 240, maxWidth: 240,
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 'VERSI:OK|SIZE:OK' ? 'badge bg-green-800 dark:bg-success' : 'badge bg-red-800 dark:bg-danger'}  >{cellValues.value}</span>
                    );
                }
            },
        ];

        const columnGroupingModel: GridColumnGroupingModel = [
            {
                groupId: 'Internal',
                description: '',
                children: [{ field: 'id' }],
            },

            {
                groupId: ' ',
                children: [{ field: 'KODE' }, { field: 'KETERANGAN' },  { field: 'KDCAB' }, { field: 'KDTK' }, { field: 'NAMA' }, { field: 'STATION' }, { field: 'IP' }, {field: 'REQUEST'}, {field: 'RESPONSE'},{field: 'NAMA_FILE'}],
            },

            {
                groupId: 'TOKO',
                children: [{ field: 'PATH_TOKO' }, { field: 'VERSI_TOKO' }, { field: 'SIZE_BYTES_TOKO' }, { field: 'LAST_MODIFIED_TOKO' }],
            },
            {
                groupId: 'SERVER',
                children: [{ field: 'VERSI_SERVER' }, { field: 'SIZE_BYTES_SERVER' }, { field: 'LAST_MODIFIED_SERVER' }],
            },
            {
                groupId: '  ',
                children: [{ field: 'STATUS' }],
            },
        ];
        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }
    var counter_id = 0;
    const HandleClick2 = async () => {
        if (TextButtonFilter === 'Proses' ||TextButtonFilter === 'Process') {
            let in_counter = 0;
            start(in_counter, "timer");
            counter_id = 0;
            var res_total_gagal = 0;
            var res_total_sukses = 0;
            var list_toko_sukses = '';
            var list_ip_failed = '';
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setData_rows([]);
            setDataGagal('');
            setDataIP('');
            setStateCode(0);
            setClosedWS('');
            setLastResponse('');
            let rows = []
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
                const select_program = IN_Program;
                var key = GetToken()
                var res_command = '';
                var tipe = '';
                if(select_program === ''){
                    tipe = 'SEMUA';
                    var list_program = "'"+Data_program.split(",").join("','")+"'";
                    const repl_command = command;
                    res_command = await GetSignature(IN_HOST, IN_PORT, key, repl_command) as string
                }else{
                    var list_program = "'"+select_program+"'";
                    tipe = list_program;
                    const repl_command = command.replace("*.dll,*.exe",list_program).replace("$directoryPath = 'd:\\BACKOFF\\';","$directoryPath = 'd:\\BACKOFF\\"+list_program.split("'").join('')+"';").replace("$directoryPath = 'e:\\CAD\\BACKOFF\\';","$directoryPath = 'E:\\CAD\\BACKOFF\\"+list_program.split("'").join('')+"';").replace("$directoryPath = 'D:\\I-KIOSK\\';","$directoryPath = 'D:\\I-KIOSK\\"+list_program.split("'").join('')+"';");
                    res_command = await GetSignature(IN_HOST, IN_PORT, key, repl_command) as string
                }
                const param = WritePayload(kdcab, "", station, "", "COMMAND", res_command, 2, false, IDReport+'_'+tipe, key, IP,true,30);
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
                    setProgress(t('Finished Session'));
                    setTextButtonFilter('Process')
                    setisDisabled(false)
                    isConnectedWS.current = 0
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
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
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                    isConnectedWS.current = 0
                    setisDisabled(false)
                    setLoadingButton(false)
                });
                // Listen for messages
                socket.addEventListener('message', async (event) => {
                    const data = ConvertBinaryToText(event);
                    const parse_json = JSON.parse(await data);
                    const code = parse_json.code;
                    const msg = parse_json.msg;
                    console.log(code+' - '+msg)
                    const countdata = parse_json.amountData;
                    setTotalStation(countdata);
                    setStateCode(code);
                    const tgl_kini = get_format_tanggal_jam();
                    setLastResponse(tgl_kini);
                    if (code === 200 || code === 209) {
                            setProgress(code + '-' + msg);
                            if(isConnectedWS.current === 0){
                                setisDisabled(false)
                            }else{
                                setisDisabled(true)
                            }
                            setLoading(true);
                            try {
                                const res_data = JSON.parse(parse_json.data);
                                const res_new = res_data;
                                var list_toko_failed = '';
                                var arr_list_program_server = IN_List_ProgramServer;
                                for (var o = 0; o < res_new.length; o++) {
                                    const ubah_json = JSON.stringify(res_new[o]);
                                    const parse_data_inti = JSON.parse(ubah_json);
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
                                    //-- MONITORING PROGRAM BACKOFF --//
                                    const obj = ReportMonitoringProgramBackoff(false,0,[],res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result,arr_list_program_server)
                                    for(var a = 0;a<obj.length;a++){
                                        rows.push(obj[a])
                                    }
                                    //-- parse hitung dari data yang terupdate --//
                                    if(res_data_code !== 200){
                                        if(list_toko_failed.includes(res_kdtk)){
                                        
                                        }else{
                                            list_toko_failed += res_kdtk+",";
                                            res_total_gagal = res_total_gagal+1;
                                        }
                                        if(list_ip_failed.includes(res_ip)){

                                        }else{
                                            list_ip_failed += res_ip+",";
                                            setTotalGagal(res_total_gagal);
                                        }
                                    }else{
                                        if(list_toko_sukses.includes(res_kdtk)){
                                        
                                        }else{
                                            list_toko_sukses += res_kdtk+",";
                                            res_total_sukses = res_total_sukses+1;
                                            setTotalSukses(res_total_sukses);
                                        }
                                    }
                                }
                                //-- prosentase progressbar --//
                                var prosentase = Math.round(((res_total_sukses + res_total_gagal) / countdata) * 100);
                                setDataProsentase(prosentase)
                                list_toko_failed = list_toko_failed.substring(0, (list_toko_failed.length - 1));
                                setDataGagal(list_toko_failed);
                                list_ip_failed = list_ip_failed.substring(0, (list_ip_failed.length - 1));
                                setDataIP(list_ip_failed);
                                
                                let arr_res_columns = Def_Columns_Monitoring_Program_Backoff(rows)
                                let columns = arr_res_columns[0];
                                let columnsGroupModel = arr_res_columns[1];  
                                setData_columns(columns);    
                                var res_rows = AddID(rows);
                                setData_rows(res_rows);
                                setcolumnGroupingModel(columnsGroupModel);
                                setTextButtonFilter('Retrieve data failed (' + res_total_gagal + ')')
                                if (code === 209) {
                                    setLoading(false);
                                    isConnectedWS.current = 0
                                } else {
                                    isConnectedWS.current = 1
                                }
                            } catch (Ex) {
                                console.log(code+' -> '+Ex.toString())
                                const val_gagal = GetTotalFailedClient('value_total_gagal')
                                setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                                setLoading(false)
                                setisDisabled(false)
                                setLoadingButton(false)
                            }
                    }else if (code === 201) {
                        setProgress(code + "-" + msg);
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
                        } else {

                        }
                        setLoading(false);
                        setProgress('');
                        setTextButtonFilter('Process')
                        isConnectedWS.current = 0
                    }
                });
            }
            // ------------------------- PROSES DATA GAGAL ------------------------- //    
        } else {
            setLoading(false);
            setTextButtonFilter('Process')
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
                                    <DropDownBranch in_classname_title={"Branch Code"} in_classname_content={"mb-1"} data_options={options5} isSearchable={true} isMulti={true} event={userSelectKodeCabang} />
                                    <div className="grid grid-cols-2 gap-1">
                                        <div>
                                            <DropDownStation isInduk={false} in_classname_title={"Station"} in_classname_content={"mb-1"} data_options={[]} isSearchable={true} isMulti={false} event={userSelectStation} />
                                        </div>
                                        <div>
                                            <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={List_Data_program} isSearchable={true} isMulti={false} event={userSelectNamaProgram} name_component={"apps"} idComponent={"cmb_program"} />
                                        </div>
                                    </div>
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
                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={t('Report Apps Backoff Monitoring')} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS), new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={DataProsentase} in_rows_spanning={false}  />
                </>
            } />
        </>
    )
}
export default FormMonitoringProgramBackoff;