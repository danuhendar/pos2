'use client'
import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import router from 'next/router';
import config from '@/lib/config.json';
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertBinaryToText, get_format_tanggal_jam, handleLogout, millisToMinutesAndSeconds, setTombolAmbilDataGagal, start, stop,groupByValueAndCount2, removeItemByValue_ForMultidimensi, get_dateTimeDiff_second, get_branch_code, GetToken, GetTokenRND, DecodeAES, get_data_local_storage, AddColumn, WritePayloadWSOffice, WritePayloadWSRuangServer, removeDuplicates, writeXlsxWithImageBase64, writeImagePngToXlsx, embedPngImageExceljs } from "@/lib/global";
import { useTranslation } from "react-i18next";
import CardInfoProses from "../form/CardInfoProses";
import { Def_Columns_ReportMonitoringCCTVRuangServer, Def_Columns_ReportMonitoringUPSServer } from "@/controller/ColumnMonitoringRuangServer";
import { ReportUPSServer } from "@/controller/MonitoringRuangServer";
import { ConvertDateFormat } from '../../lib/global';
import DropDownBranch from "../dropdown/DropDownBranch";
import DatePicker from "../datepicker/DatePicker";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import ButtonReload from "../button/ButtonReload";
import ButtonFilter from "../button/ButtonFilter";
import IconSend from "../Icon/IconSend";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
interface ForMonitoringRuangServerProps {
    url: string,
    device: string,
    IDReport: string,
}
const ForMonitoringRuangServer: React.FC<ForMonitoringRuangServerProps> = ({ url, device, IDReport }) => {
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const [columnGroupingModel,setcolumnGroupingModel] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progressbar, setProgress] = useState('');
    const [isStopReload, setStopReload] = useState('0');
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [IN_HOST, setHOST] = useState('');
    const [HOST_API_RND, setHOST_API_RND] = useState('');
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();
    const [isTextButton,setisTextButton] = useState(false)
    const [InputNikPemohon,setInputNikPemohon] = useState('')
    const [InputNamaPemohon,setInputNamaPemohon] = useState('')
    const [total_station, setTotalStation] = useState(0);
    const [total_sukses, setTotalSukses] = useState(0);
    const [total_gagal, setTotalGagal] = useState(0);
    const [DataProsentase,setDataProsentase] = useState(0);
    const [data_gagal, setDataGagal] = useState('');
    const [stateCode,setStateCode] = useState(0);
    const [IN_SCHEDULER,setIN_SCHEDULER] = useState('')
    const [IN_CAMERA,setIN_CAMERA] = useState('')
    const [IN_TANGGAL,setIN_TANGGAL] = useState('')
    const [optionsScheduler,setoptionsScheduler] = useState([])
    const [optionsCamera,setoptionsCamera] = useState([])
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const isConnectedWS = useRef(0)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')

    useEffect(() => {
        var rconfig = JSON.stringify(config);
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;
        const res_host_rnd = (config.api as any).HOSTNAME_API_RND;
        setHOST_API_RND(res_host_rnd);
        setHOST(res_host);
        const get_data = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
        const d = JSON.parse(get_data);
        const nik = d.nik;
        setInputNikPemohon(nik)
        const nama = d.nama;
        setInputNamaPemohon(nama)
        let arr_cabang = get_branch_code(false,false);
        setOption5(arr_cabang)
        let arr_scheduler = [{"label":"-- Semua --","value":""},{"label":"06","value":"06"},{"label":"15","value":"15"},{"label":"23","value":"23"}]
        setoptionsScheduler(arr_scheduler)
        let arr_camera = []
        var obj = {"label":"-- Semua --","value":""}
        arr_camera.push(obj)
        for(var a = 1;a<=24;a++){
            let index_a = ''
            if(a<10){
                index_a = '0'+a
            }else{
                index_a = ''+a
            }
            var obj = {"label":index_a,"value":index_a}
            arr_camera.push(obj)
        }
        setoptionsCamera(arr_camera)
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
        }
    };

    const UserSelectCamera = (value: any) => {
        if (value.length == 0) {
            setIN_CAMERA('')
        } else {
            setIN_CAMERA(value.value);
        }
    };

    const HandleClick2 = () => {
        const idComponent = 'btn_filter'
        const myExample = document.getElementById(idComponent);
        if (myExample.innerHTML.includes('Proses') || myExample.innerHTML.includes('Process')) {
            let in_counter = 0;
            start(in_counter, "timer");
            var total_gagal = 0;
            var total_sukses = 0;
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setData_rows([]);
            setDataGagal('');
            setClosedWS('');
            setLastResponse('');
            var list_ip_failed = '';
            setStateCode(0);
            let rows= [];
            if (kdcab === '') {
                Swal.fire({
                    title: t("Warning"),
                    text: t("Select Branch Code"),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            } else {
                var key = GetToken()
                let param = ''
                let res_data_tanggal = ''
                if(IN_TANGGAL.toString().includes(',')){
                    const sp = IN_TANGGAL.toString().split(',')
                    for(var p = 0;p<sp.length;p++){
                        const conv_date = ConvertDateFormat(sp[p],false)
                        res_data_tanggal = res_data_tanggal+conv_date+','
                    }
                }else{
                    res_data_tanggal = ConvertDateFormat(IN_TANGGAL,false) === 'NaN-NaN-NaN' ? '' : ConvertDateFormat(IN_TANGGAL,false)
                }
                if(IDReport === 'Report CCTV Server'){
                    const obj = {
                        "kdcab": kdcab,
                        "tanggal": res_data_tanggal,
                        "scheduler": IN_SCHEDULER,
                        "camera": IN_CAMERA,
                        "token":key
                    }
                    param = JSON.stringify(obj);
                }else{
                    param = WritePayloadWSRuangServer(kdcab,IDReport,key,20,true,device);
                }
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
                    setisTextButton(false)
                    setTextButtonFilter('Process')
                    isConnectedWS.current = 0
                    setisDisabled(false)
                });
                // Connection opened
                socket.addEventListener("open", () => {
                    socket.send(param);
                    setLoading(true)
                    setisTextButton(true)
                    setTextButtonFilter('Please wait')
                    isConnectedWS.current = 1
                    setisDisabled(true)
                });
                // Connection close
                socket.addEventListener("close", (event: any) => {
                    console.log('connection close');
                    setLoading(false);
                    stop();
                    if(stateCode === 209){
                        setProgress(t('Finished Session'));
                    }else{
                        setProgress('Ulangi Proses');
                    }
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                    setisTextButton(false)
                    setTextButtonFilter('Process')
                    isConnectedWS.current = 0
                    setisDisabled(false)
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
                    setisTextButton(true)
                    if (code === 200 || code === 209) {
                            setProgress(code + '-' + msg);
                            if(isConnectedWS.current === 0){
                                setisDisabled(false)
                            }else{
                                setisDisabled(true)
                            }
                            try {
                                var list_toko_failed = '';
                                const res_data = JSON.parse(rdata);
                                const res_new = res_data;
                                var list_toko_sukses = '';
                                for (var o = 0; o < res_new.length; o++) {
                                    const ubah_json = JSON.stringify(res_new[o]);
                                    const parse_data_inti = JSON.parse(ubah_json);
                                    const res_data_msg = parse_data_inti.msg;
                                    const res_data_code = parse_data_inti.code;
                                    const res_kdcab = parse_data_inti.kdcab;
                                    const res_lokasi = parse_data_inti.lokasi;
                                    const res_ip = parse_data_inti.ip;
                                    if(IDReport === "Report UPS Server"){
                                        const res_request = parse_data_inti.timerequest;
                                        const res_response = parse_data_inti.timerespons;
                                        const res_id_report = parse_data_inti.idreport;
                                        const res_ping = parse_data_inti.ping;
                                        const res_computer_name = parse_data_inti.Computername;
                                        const res_data_in = parse_data_inti.data;
                                        const obj = ReportUPSServer(false,0,[],res_kdcab,res_lokasi,res_request,res_response,res_id_report,res_ping,res_computer_name,res_ip,res_data_code,res_data_msg,(res_data_in === '' ? '' : res_data_in));
                                        rows.push(obj[0])
                                    }else if(IDReport === 'Report CCTV Server'){
                                        const res_camera = parse_data_inti.camera
                                        const res_tanggal = parse_data_inti.updtime.split(' ')[0]
                                        const res_image = parse_data_inti.image
                                        const res_scheduler = parse_data_inti.scheduler
                                        const res_merk = parse_data_inti.merk
                                        const res_type = parse_data_inti.tipe
                                        let res_scheduler_06 = ''
                                        let res_scheduler_15 = ''
                                        let res_scheduler_23 = ''
                                        const identitas = res_camera +'_'+res_tanggal+'_'+kdcab+'_'+res_ip
                                        if(JSON.stringify(rows).includes(identitas)){
                                            let obj = {"ID_IDENTITAS":identitas,"CODE":res_data_code,"DESCRIPTION":res_data_msg,"UPDTIME":res_tanggal,"KDCAB":res_kdcab,"IP":res_ip,"LOCATION":res_lokasi,"CAMERA":res_camera,"MERK":res_merk,"TYPE":res_type,"SCHEDULER_06":res_scheduler_06,"SCHEDULER_15":res_scheduler_15,"SCHEDULER_23":res_scheduler_23}
                                            if(res_scheduler === '06'){
                                                res_scheduler_06 = (res_data_code === 200 ? res_image : res_data_code+"-"+res_data_msg)
                                                const objIndex = rows.findIndex(((obj: { ID_IDENTITAS: any; }) => obj.ID_IDENTITAS == identitas));
                                                //Update object's name property.
                                                rows[objIndex].SCHEDULER_06 = res_scheduler_06
                                            }else if(res_scheduler === '15'){
                                                res_scheduler_15 = (res_data_code === 200 ? res_image : res_data_code+"-"+res_data_msg)
                                                const objIndex = rows.findIndex(((obj: { ID_IDENTITAS: any; }) => obj.ID_IDENTITAS == identitas));
                                                //Update object's name property.
                                                rows[objIndex].SCHEDULER_15 = res_scheduler_15
                                            }else{
                                                res_scheduler_23 = (res_data_code === 200 ? res_image : res_data_code+"-"+res_data_msg)
                                                const objIndex = rows.findIndex(((obj: { ID_IDENTITAS: any; }) => obj.ID_IDENTITAS == identitas));
                                                //Update object's name property.
                                                rows[objIndex].SCHEDULER_23 = res_scheduler_23
                                            }
                                        }else{
                                            let obj = {}
                                            if(res_scheduler === '06'){
                                                res_scheduler_06 = (res_data_code === 200 ? res_image : res_data_code+"-"+res_data_msg)
                                                obj = {"ID_IDENTITAS":identitas,"CODE":res_data_code,"DESCRIPTION":res_data_msg,"UPDTIME":res_tanggal,"KDCAB":res_kdcab,"IP":res_ip,"LOCATION":res_lokasi,"CAMERA":res_camera,"MERK":res_merk,"TYPE":res_type,"SCHEDULER_06":res_scheduler_06,"SCHEDULER_15":res_scheduler_15,"SCHEDULER_23":res_scheduler_23}
                                            }else if(res_scheduler === '15'){
                                                res_scheduler_15 = (res_data_code === 200 ? res_image : res_data_code+"-"+res_data_msg)
                                                obj = {"ID_IDENTITAS":identitas,"CODE":res_data_code,"DESCRIPTION":res_data_msg,"UPDTIME":res_tanggal,"KDCAB":res_kdcab,"IP":res_ip,"LOCATION":res_lokasi,"CAMERA":res_camera,"MERK":res_merk,"TYPE":res_type,"SCHEDULER_06":res_scheduler_06,"SCHEDULER_15":res_scheduler_15,"SCHEDULER_23":res_scheduler_23}
                                            }else{
                                                res_scheduler_23 = (res_data_code === 200 ? res_image : res_data_code+"-"+res_data_msg)
                                                obj = {"ID_IDENTITAS":identitas,"CODE":res_data_code,"DESCRIPTION":res_data_msg,"UPDTIME":res_tanggal,"KDCAB":res_kdcab,"IP":res_ip,"LOCATION":res_lokasi,"CAMERA":res_camera,"MERK":res_merk,"TYPE":res_type,"SCHEDULER_06":res_scheduler_06,"SCHEDULER_15":res_scheduler_15,"SCHEDULER_23":res_scheduler_23}
                                            }
                                            rows.push(obj)
                                        }
                                    }
                                    if (res_data_code !== 200) {
                                        total_gagal = total_gagal + 1;
                                        if (list_toko_failed.includes(res_ip)) {

                                        } else {
                                            list_toko_failed += res_ip + ",";
                                        }
                                        setTotalGagal(total_gagal);

                                        if (list_ip_failed.includes(res_ip)) {

                                        } else {
                                            list_ip_failed += res_ip + ",";
                                        }
                                    } else {
                                        total_sukses = total_sukses + 1;
                                        if (list_toko_sukses.includes(res_ip)) {

                                        } else {
                                            list_toko_sukses += res_ip + ",";
                                        }
                                        setTotalSukses(total_sukses);
                                    }
                                }
                                let columns = [];
                                let columnsGroupModel = [];
                                if(IDReport === 'Report UPS Server'){
                                    let arr_res_columns = Def_Columns_ReportMonitoringUPSServer();
                                    columns = arr_res_columns[0];
                                    columnsGroupModel = arr_res_columns[1];
                                }else if(IDReport === 'Report CCTV Server'){
                                    let arr_res_columns = Def_Columns_ReportMonitoringCCTVRuangServer();
                                    columns = arr_res_columns[0];
                                    columnsGroupModel = arr_res_columns[1];
                                }
                                let res_rows = [];
                                var a_rows = removeDuplicates(rows);
                                res_rows = AddID(a_rows);
                                setData_rows(res_rows);
                                setData_columns(columns);
                                setcolumnGroupingModel(columnsGroupModel);
                                if (code === 209) {
                                    setLoading(false);
                                    setisTextButton(false)
                                } else {
                                    setLoading(true);
                                    setisTextButton(true)
                                }
                            } catch (Ex) {
                                console.log('error parsing : ' + Ex.toString())
                                setLoading(false)
                                setisTextButton(false)
                            }
                    }
                    else if (code === 201) {
                        setProgress(code + "-" + msg);
                        setLoading(true);
                    }else if (parse_json.code.toString().substring(0, 1) === '4') {
                        setLoading(true);
                        myExample.innerHTML = t('Process');
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
                        setisTextButton(false)
                    }
                });
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
    }
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                    <div className="grid-cols-2 gap-3  md:grid-cols-2 mb-3 flex items-end justify-left">
                        <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
                            <div className="p-2 flex items-center flex-col sm:flex-row">
                                <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                                        <div className={IDReport === 'Report CCTV Server' ? "mb-4" : "mb-11" }>
                                            <div className="flex item-center font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                                </svg>
                                                <h2 className="text-dark mt-1 ml-1 text-center text-1xl dark:text-white-light">Form Filter</h2>
                                            </div>
                                        </div>
                                        <DropDownBranch in_classname_title={"mb-3 mt-4"} in_classname_content={"w-full"} data_options={options5} isSearchable={true} isMulti={true} event={userSelectKodeCabang} />
                                        {
                                            IDReport === 'Report CCTV Server' ? 
                                            <>
                                            <div className="grid grid-cols-1 gap-3">
                                                <div>
                                                    <DatePicker in_mode={"multiple"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg text-xs"} event={(date: any) => setIN_TANGGAL(date)} name_component={"Periode"} idComponent={"txt_periode"} isRtl={isRtl} in_date={IN_TANGGAL} isEnableTime={false} date_format={"Y-m-d"} />
                                                </div>
                                                <div>
                                                    <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={optionsCamera} isSearchable={true} isMulti={false} event={UserSelectCamera} name_component={"Camera"} idComponent={"cmb_camera"} />
                                                </div>
                                            </div>                                                   
                                            </>
                                            :
                                            ''
                                        }
                                        <div className="mb-12">
                                            <div className="flex">
                                                <ButtonFilter in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_filter"} isLoading={isTextButton} isDisabled={isDisabled} in_icon={<IconSend />} in_title_button={"Process"} HandleClick={HandleClick2} />
                                                &nbsp;
                                                <ButtonReload in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={false} isDisabled={false} HandleClick={HandleReloadClick} />
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        {
                            IDReport === 'Report CCTV Server' ?
                            ''
                            :
                            <CardInfoProses total_station={total_station} total_sukses={total_sukses} total_gagal={total_gagal} in_classname_content={"mx-auto grid max-w-[900px] grid-cols-4 justify-items-center gap-3"} />
                        }
                    </div>
                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, ID_REPORT: false,MERK:false,TYPE:false,CODE:false,DESCRIPTION:false }} jenis_laporan={t('Report') + ' ' + IDReport.split('Report').join('')} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'CAMERA'} type_sorting={'asc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS), new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={IDReport === 'Report CCTV Server' ? 200 : 52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={DataProsentase} in_rows_spanning={false} />
                </>
            } />
        </>
    )
}
export default ForMonitoringRuangServer;