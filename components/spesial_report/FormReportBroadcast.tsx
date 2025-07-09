'use client'
import { SetStateAction, useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import config from '@/lib/config.json';
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertDateFormat,get_format_tanggal_jam, get_format_tanggal_jam_substract,handleLogout, start, stop, get_dateTimeDiff_second, get_branch_code, GetTokenRND, DecodeAES, get_data_local_storage, AddColumn } from "@/lib/global";
import { Posts } from "@/lib/post";
import IconSend from "../Icon/IconSend";
import { useTranslation } from "react-i18next";
import IconFolderPlus from "../Icon/IconFolderPlus";
import withReactContent from "sweetalert2-react-content";
import { getSocket, disconnectSocket } from "@/lib/socket";
import pako from 'pako';
import ButtonFilter from "../button/ButtonFilter";
import DropDownBranch from "../dropdown/DropDownBranch";
import InputTextType from "../form/InputTypeText";
import DatePicker from "../datepicker/DatePicker";
import ModalComponent from "../modal/ModalComponent";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";

interface FormReportBroadcastProps {
    url: string,
    command: string,
    IDReport: string,
}

const FormReportBroadcast: React.FC<FormReportBroadcastProps> = ({ url, command, IDReport }) => {
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const [data_rows_detail, setData_rows_detail] = useState([]);
    const [data_columns_detail, setData_columns_detail] = useState([]);
    const [JudulForm,setJudulForm] = useState('')
    const [TipeBC,setTipeBC] = useState('')
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [progressbar, setProgress] = useState('');
    const [loadingDetail, setLoadingDetail] = useState(false);

    const curdate_sub_1_hour = get_format_tanggal_jam_substract(1).substring(0,16);
    const curdate = get_format_tanggal_jam().substring(0,16);
     
    const [date2, setDate2] = useState<any>(curdate_sub_1_hour);
    const [Visible,setVisible] = useState(false);
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [IN_HOST, setHOST] = useState('');
    const [HOST_API_RND, setHOST_API_RND] = useState('');
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();
    
    const [isTextButton,setisTextButton] = useState(false)
    const [LokasiUser,setLokasiUser] = useState('')
    const [InputNikPemohon,setInputNikPemohon] = useState('')
    const [InputNamaPemohon,setInputNamaPemohon] = useState('')
    const [KeyEvent,setKeyEvent] = useState('')
    const [modal13,setModal13] = useState(false)
    const MySwal = withReactContent(Swal);
    let socket = getSocket();

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
        const lokasi = d.lokasi;
        setLokasiUser(lokasi)
        if(lokasi === 'EDP HO'){
            let arr_cabang = get_branch_code(true,false);
            setOption5(arr_cabang)
        }else if(lokasi === 'REGIONAL'){
            let arr_cabang = get_branch_code(false,true);
            setOption5(arr_cabang)
        }else if(lokasi === 'CABANG'){
            let arr_cabang = get_branch_code(false,false);
            setOption5(arr_cabang)
        }

        if (!socket) return; //if socket is not initialized, return.
    
        socket.on('connect', () => {
          console.log('Connected to server');
          setProgress('Connected to server');
        });
    
        socket.on('disconnect', () => {
          console.log('Disconnected from server');
          setProgress('Disconnected from server');
        });
    
        return () => {
          socket.off('connect');
          socket.off('message');
          socket.off('disconnect');
          disconnectSocket();
        };

    },[]);

    const userSelectKodeCabang = (value: any) => {
        setKODE_CABANG(value.value)
    };
 
    const showModal = (cellValues:any) => {
        setModal13(true);
        var lokasi = cellValues.row.LOCATION
        var nik = cellValues.row.NIK
        var nama = cellValues.row.NAMA
        var id = cellValues.row.SUB_ID.toString().substring(0,12)
        var sub_id = cellValues.row.SUB_ID
        var ip = cellValues.row.IP
        var tipe_bc = cellValues.row.TIPE_BC
        setTipeBC(tipe_bc)
        var concat = lokasi+'/'+nik+'/'+nama+'/'+sub_id
        var periode = ConvertDateFormat(date2,false).split('-').join('')
        setJudulForm(concat)
        setData_columns_detail([])
        setData_rows_detail([])
        
        var key_event = "IDMCONSOLE_BROADCAST_REPORT_DETAIL_"+tipe_bc+"_"+id+"_"+sub_id
        setKeyEvent(key_event)
        if(tipe_bc === 'BC_SQL'){
            if(socket.connected){
                console.log('No Add Connection ')
            }else{
                // Add a connect listener
                socket = getSocket();
                console.log('Add Connection ')
            }
           
        }else{

        }
        try{
            const param = {"IN_ID":id,"IN_SUB_ID":sub_id,"IN_TANGGAL":periode,"IN_NIK":nik,"IN_LOKASI":lokasi,"IN_TIPE_BC":tipe_bc}
            let url = `http://${HOST_API_RND}:4646/user/IDMConsole/GetBroadcastDetail`;
            setLoadingDetail(true)
            const TokenRND = GetTokenRND()
            setProgress('Mohon tunggu proses ambil data')
            Posts(url,JSON.stringify(param),false,TokenRND).then((response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        setProgress(code+'-'+msg)
                        if(parseFloat(code) === 200){
                            var data_body = res_data.data
                            if(tipe_bc === 'BC_SQL'){
                                var counter = 0
                                setProgress(t('Information')+' '+t('Please wait'))
                                start(0,'lbl_timer')
                                let arr_: any[] = []
                                let columns: SetStateAction<any[]> = []
                                socket.on(key_event,async (arg) => {
                                        const data = arg
                                        const text = await new Response(data).text();
                                        console.log('response :'+text.toString())
                                        if(text.toString().includes('Last Data')){
                                            stop()
                                            setProgress(t('Process')+' '+t('Done')+' '+text.toString())
                                        }else if(text.toString().includes('Please wait')){
                                            setProgress(t(text.toString()))
                                            setTimeout(() => {
                                                //console.log(text.toString())
                                            },5000)
                                        }else{
                                            try{
                                                const decompressedData = text.toString()//pako.ungzip(data, { to: 'string' }); // or to: 'Uint8Array' for binary data
                                                const parse_data = JSON.parse(decompressedData);
                                                const info = parse_data[0].INFO;
                                                const size = parse_data[0].SIZE;
                                                const rows = parse_data[0].ROWS;
                                                columns = parse_data[0].COLUMNS
                                                for(var o=0;o<rows.length;o++){
                                                    arr_.push(rows[o])
                                                }
                                                setData_columns_detail(columns)
                                                var res_rows = AddID(arr_)
                                                console.log()
                                                setData_rows_detail(res_rows)
                                                setProgress(info+' / '+size)
                                            }catch(Exc){
                                                console.log(Exc.toString())
                                            }
                                        }
                                });
                            }else{
                                var rows = data_body[0].ROWS
                                var cols = data_body[0].COLUMNS
                                var res_rows = AddID(rows)
                                setData_rows_detail(res_rows) 
                                setData_columns_detail(cols)
                            }
                            setLoadingDetail(false)
                        }else if(code.toString().substring(0,1) === '4'){
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });

                            if(msg.includes('Token')){
                                handleLogout();
                            }
                            setLoadingDetail(false)
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setLoadingDetail(false)
                        } 
            }).catch((error) => {
                Swal.fire({
                    title: t("Warning"),
                    text: "Error :"+t('Check your connection or call administrator'),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setLoadingDetail(false)
            });
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setLoadingDetail(false)
        }
    }

    const GetReportBroadcast = () => {
        try{
            const IN_PERIODE = ConvertDateFormat(date2,false)
            const param = {"IN_KODE_CABANG":(IN_CMB_KODE_CABANG === 'EDP HO' ? 'HO' : IN_CMB_KODE_CABANG.split('RE0').join('REG')),"IN_NIK_USER":InputNikPemohon,"IN_PERIODE":IN_PERIODE}
            let url = `http://${HOST_API_RND}:4646/user/IDMConsole/GetBroadcastHeader`;
            setisTextButton(true)
            setVisible(false)
            const TokenRND = GetTokenRND()
            Posts(url,JSON.stringify(param),false,TokenRND).then((response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        if(parseFloat(code) === 200){
                            var data_body = res_data.data
                            var rows = data_body[0].ROWS
                            var cols = data_body[0].COLUMNS
                            var res_rows = AddID(rows)
                            setData_rows(res_rows) 
                            const item_new = { 
                                    field: 'DETAIL', headerName: 'DETAIL',  flex: 0,  width: 65, minWidth: 65, maxWidth: 65, align:'center',headerAlign: 'center',
                                    renderCell: (cellValues: any) => {
                                        return (
                                            <>
                                                <div className="mt-1">
                                                    <a onClick={() => {showModal(cellValues)}} data-twe-toggle="tooltip" title="Detail Report">
                                                        <span className="text-black dark:text-white"><IconFolderPlus  /></span>
                                                    </a>
                                                </div>
                                            </>
                                        );
                                    }
                                };
                            AddColumn(cols,item_new);
                            setData_columns(cols)
                            setisTextButton(false)
                            setVisible(true)
                        }else if(code.toString().substring(0,1) === '4'){
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });

                            if(msg.includes('Token')){
                                handleLogout();
                            }
                            setisTextButton(false)
                            setVisible(false)
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setisTextButton(false)
                            setVisible(false)
                        } 
            }).catch((error) => {
                Swal.fire({
                    title: t("Warning"),
                    text: "Error :"+t('Check your connection or call administrator'),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setisTextButton(false)
                setVisible(false)
            });
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setisTextButton(false)
            setVisible(false)
        }
    }

    const Disconnect = () => {
        setModal13(false)
        var param = {"LOCATION":IN_CMB_KODE_CABANG,"CONTENT":"Disconnect","SOCK_EVENT":KeyEvent}
        console.log(JSON.stringify(param))
        socket.emit('message',JSON.stringify(param))
        disconnectSocket()
        console.log('Send Message Disconnect to server')
    }

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                <div className="grid gap-3">
                    <div className="row-span-3 mb-3 w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
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
                                    <div className="flex flex-row gap-3">
                                        <div>
                                            <DatePicker in_mode={'single'} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg"} event={(date2) => setDate2(date2)} name_component={"Periode"} idComponent={"txt_periode"} isRtl={isRtl} in_date={date2} isEnableTime={false} date_format={"Y-m-d"} />
                                        </div>
                                        <div>
                                            <InputTextType   in_title={"Nik"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg text-sm text-right bg-dark-light"} data_options={undefined} isDisabled={false} event={undefined} in_value={InputNikPemohon} />
                                        </div>
                                        <div>
                                            <DropDownBranch in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options5} isSearchable={true} isMulti={false} event={userSelectKodeCabang} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex">
                                            <ButtonFilter in_icon={<IconSend />} in_title_button={'Process'} in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_filter"} isLoading={isTextButton} isDisabled={!active} HandleClick={GetReportBroadcast} />
                                        </div>
                                    </div>
                            </div>
                        </div>

                    </div>
                </div>
                {
                    Visible ? 
                    <div>
                        <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, ID: false, SUB_ID: false, LOCATION: false }} jenis_laporan={'Report Log IDMCommander'} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={''} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={null} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS), new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={0} in_rows_spanning={false}  />
                    </div>
                    :
                    ''
                }
                <ModalComponent state_modal={modal13} event_close_modal={Disconnect} isRtl={isRtl} in_classname_title_modal={"text-sm font-bold"} in_title_modal={t('Detail') + ' ' + t('Broadcast') + ':' + (JudulForm)} isBC={true} TipeBC={TipeBC} progressbarData={progressbar} data_rows_detail={data_rows_detail} data_columns_detail={data_columns_detail} loadingDetail={loadingDetail} in_content_not_bc={undefined} in_size_modal={`panel animate__animated my-7 w-4/5 overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} />
                </>
            } /> 
        </>
    )
}
export default FormReportBroadcast;