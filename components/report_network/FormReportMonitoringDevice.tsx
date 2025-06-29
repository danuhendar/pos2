'use client'
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Select from 'react-select';
import Swal from 'sweetalert2';
import router from 'next/router';
import config from '@/lib/config.json';
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertBinaryToText, GenerateUniqNumber, GetFailedClient, GetID, GetToken, GetTotalFailedClient, HitungSuksesDanGagalFomTable, ListKey, SummaryValueOfArray, WritePayload, WritePayloadKoneksi, get_branch_code, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, setTombolAmbilDataGagal, start, stop } from "@/lib/global";
import IconClock from "../Icon/IconClock";
import CardDeviceCabang from "../form/CardDeviceCabang";
import IconChrome from "../Icon/IconChrome";
import IconRefresh from "../Icon/IconRefresh";
import IconBox from "../Icon/IconBox";;
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";
import themeConfig from "@/theme.config";
import DropDownBranch from "../dropdown/DropDownBranch";
import { Button } from "@mui/material";
import ButtonReload from "../button/ButtonReload";
import ButtonFilter from "../button/ButtonFilter";
import IconSend from "../Icon/IconSend";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";

interface FormReportMonitoringDeviceProps {
    url: string,
    IDReport: string,
    station: string,
}

const FormReportMonitoringDevice: React.FC<FormReportMonitoringDeviceProps> = ({ url, IDReport,station }) => {
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [IN_CMB_STATION, setStation] = useState("");
    const [data_rows, setData_rows] = useState([]);
    const [active, setActive] = useState(true);
    const [active_reload, setActiveReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progressbar, setProgress] = useState('');
    const [prosentase_progressbar, setprosentase_progressbar] = useState('0%');
    const [progressbar_time, setProgressbar_time] = useState('');
    const [isStopReload, setStopReload] = useState('0');
    const [stateIsMultiKdcab,setstateIsMultiKdcab] = useState(true);
    const [IP, setDataIP] = useState('');
    const [Visible,setVisible] = useState(false);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const MySwal = withReactContent(Swal);
    const stateConnect = useRef(0);
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [options5,setOption5] = useState([])
    const router = useRouter();
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled, setisDisabled] = useState(false);
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const { t, i18n } = useTranslation();
    const isConnectedWS = useRef(0)

    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        let arr_ = get_branch_code(false,false);
        setOption5(arr_)
        const handleRouteChange = (url:string) => {
            console.log(`App is changing to ${url}`)
            stateConnect.current = 0;
        }
        router.events.on('routeChangeStart',handleRouteChange)

        return ()=>{
            router.events.off('routeChangeStart',handleRouteChange)
        }
    },[]);


    const userSelectKodeCabang = (value: any) => {
        try{
            if(JSON.stringify(value).includes('Semua')){
                setstateIsMultiKdcab(false)
            }else{
                setstateIsMultiKdcab(true)
            }
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
        }catch(Ex){

        }
       
    };
    var counter_id = 0;
    const HandleClick2 = () => {
        if (TextButtonFilter === 'Proses' || TextButtonFilter === 'Process') {
            let in_counter = 0;
            start(in_counter, "timer");
            counter_id = 0;
            const kdcab = IN_CMB_KODE_CABANG;
            setData_rows([]);
            setVisible(false);
            setLoading(false);
            setprosentase_progressbar('0%');
            let summary_res_up = 0;
            let summary_res_down = 0;
            let summary_res_wrong_time = 0;
            let summary_res_no_report = 0;
            setClosedWS('');
            setLastResponse('');
            let arr_table: {kdcab: any; station: any; down: any; up: any; no_report: any; wrong_time: any; }[] = [];
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
                const payload = {
                    "kdcab":kdcab,
                    "Token":key
                };
                const param = JSON.stringify(payload);
                setTextButtonFilter('Please wait')
                const socket = new WebSocket(url);
                socket.binaryType = 'blob';
                //Connection error
                socket.addEventListener("error", (event: any) => {
                    setLoading(false);
                    setProgress(t('Finished Session'))
                    setprosentase_progressbar('100%')
                    setTextButtonFilter('Process')
                    setisDisabled(false)
                    stateConnect.current = 0;
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                });

                // Connection opened
                socket.addEventListener("open", () => {
                    socket.send(param);
                    setTextButtonFilter('Please wait')
                    setisDisabled(true)
                    setLoadingButton(true)
                    stateConnect.current = 1;
                });
                // Connection close
                socket.addEventListener("close", (event: any) => {
                    console.log('connection close');
                    //console.log(stateConnect.current)
                    if(stateConnect.current === 1){
                        setLoading(false);
                        setProgress(t('Finished Session'));
                        setprosentase_progressbar('100%');
                        stop();
                        setisDisabled(false)
                        setTextButtonFilter('Process')
                        stateConnect.current = 1;
                    }else{
                        setProgress(t('Finished Session'));
                        setprosentase_progressbar('100%');
                        stop();
                        setisDisabled(false)
                        setTextButtonFilter('Process')
                        stateConnect.current = 1;
                    }
                });
                // Listen for messages
                socket.addEventListener('message', async (event) => {
                    const data = ConvertBinaryToText(event);
                    const parse_json = JSON.parse(await data);
                    const code = parse_json.code;
                    const msg = parse_json.msg;
                    console.log(code+' - '+msg)
                    const rdata = parse_json.data;
                    const countdata = parse_json.amountData;
                    if(stateConnect.current === 0){
                        socket.close()
                    }else{
                        const tgl_kini = get_format_tanggal_jam();
                        setLastResponse(tgl_kini);
                        if (code === 200 || code === 209) {
                            setProgress(code + '-' + msg);
                            setLoading(true);
                            try {
                                if(code === 200){
                                    const res_data = JSON.parse(parse_json.data);
                                    const res_new = res_data;
                                    var arr_series = [];
                                    var counter_kdcab = '';
                                    for(var i = 0;i<res_new.length;i++){
                                        const res_kdcab = res_new[i].kdcab;
                                        const res_station = res_new[i].station;
                                        const res_up = res_new[i].up;
                                        const res_down = res_new[i].down;
                                        const res_no_report = res_new[i].no_report;
                                        const res_wrong_time = res_new[i].wrong_time;
                                        if(kdcab.includes(',')){
                                            try{
                                                
                                                if(res_station !== 'STB'){
                                                    const obj_record = {"kdcab":res_kdcab,"station":res_station,"down":res_down,"up":res_up,"no_report":res_no_report,"wrong_time":res_wrong_time};
                                                    arr_table.push(obj_record)
                                                }else{
                                                    const obj_record = {"kdcab":res_kdcab,"station":res_station,"down":res_down,"up":res_up,"no_report":res_no_report,"wrong_time":res_wrong_time};
                                                    arr_table.push(obj_record)
                                                    //console.log('new code : ' + code + ' msg : ' + msg);
                                                    var arr_summary = [summary_res_up,summary_res_down,summary_res_wrong_time,summary_res_no_report];
                                                    //console.log('summary : '+res_kdcab+' - '+JSON.stringify(arr_summary))
                                                    var res_arr_table = AddID(arr_table);
                                                    //console.log('table : '+res_kdcab+' - '+JSON.stringify(res_arr_table))
                                                    const obj_per_cabang = {"jenis_laporan":"Device All","summary":arr_summary,"table":res_arr_table};
                                                    var arr_concat = [obj_per_cabang]
                                                    //console.log('arr_concat : '+JSON.stringify(arr_concat))
                                                    //console.log('===============================================')
                                                    setData_rows(arr_concat);   
                                                    // arr_series = []
                                                    // arr_summary = []
                                                }

                                                summary_res_up += parseFloat(res_up)
                                                summary_res_down += parseFloat(res_down)
                                                summary_res_wrong_time += parseFloat(res_wrong_time)
                                                summary_res_no_report += parseFloat(res_no_report)
                                            }catch(Ex){
                                                counter_kdcab = res_kdcab;
                                                console.log('ERROR : '+Ex.toString())
                                            }

                                        }else{
                                            try{
                                                
                                                if(res_station !== 'STB'){
                                                    const obj_record = {"id":GenerateUniqNumber(),"kdcab":res_kdcab,"station":res_station,"down":res_down,"up":res_up,"no_report":res_no_report,"wrong_time":res_wrong_time};
                                                    arr_table.push(obj_record)
                                                }else{
                                                    const obj_record = {"kdcab":res_kdcab,"station":res_station,"down":res_down,"up":res_up,"no_report":res_no_report,"wrong_time":res_wrong_time};
                                                    arr_table.push(obj_record)
                                                    //console.log('new code : ' + code + ' msg : ' + msg);
                                                    var arr_summary = [summary_res_up,summary_res_down,summary_res_wrong_time,summary_res_no_report];
                                                    //console.log('summary : '+res_kdcab+' - '+JSON.stringify(arr_summary))
                                                    var res_arr_table = AddID(arr_table);
                                                    //console.log('table : '+res_kdcab+' - '+JSON.stringify(res_arr_table))
                                                    const obj_per_cabang = {"jenis_laporan":"Device All","summary":arr_summary,"table":res_arr_table};
                                                    var arr_concat = [obj_per_cabang]
                                                    //console.log('arr_concat : '+JSON.stringify(arr_concat))
                                                    //console.log('===============================================')
                                                    setData_rows(arr_concat);   
                                                }

                                                summary_res_up += parseFloat(res_up)
                                                summary_res_down += parseFloat(res_down)
                                                summary_res_wrong_time += parseFloat(res_wrong_time)
                                                summary_res_no_report += parseFloat(res_no_report)
                                            }catch(Ex){
                                                counter_kdcab = res_kdcab;
                                            }   
                                        }
                                        //-- END OF LOOP --//
                                        
                                    }
                                }else if(code === 209){
                                    setLoading(false);
                                    setprosentase_progressbar('100%');
                                    stop();
                                    setTextButtonFilter('Process');
                                    setLoadingButton(false)
                                    stateConnect.current = 1;
                                }else{

                                }
                                setProgressbar_time(get_format_tanggal_jam());
                            } catch (Ex) {
                                console.log('error parsing '+code+' - '+msg+' : ' + Ex.toString())
                                if (code === 209) {
                                    setLoading(false);
                                    setTextButtonFilter('Process');
                                    setisDisabled(false)
                                    setLoadingButton(false)
                                } else {
                                   
                                }
                            }
                        
                    }
                    else if (code === 201) {
                        setProgress(code + "-" + msg);
                        setLoading(true);
                    }
                    else if (parse_json.code.toString().substring(0, 1) === '4') {
                        setLoading(true);
                        setTextButtonFilter('Process');
                        setProgress(parseFloat(code) + "-" + msg);
                        setprosentase_progressbar('100%');
                        MySwal.fire({
                            title:  parseFloat(code) + "-" + msg,
                            toast: true,
                            position: isRtl ? 'top-start' : 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            showCloseButton: true,
                            customClass: {
                                popup: `color-danger`,
                            },
                        });
                        if (code === 403) {
                            Swal.fire({
                                title: t("Warning"),
                                text: "" + parseFloat(code) + "-" + msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            //-- redirect ke login --//
                            handleLogout();
                        } else {

                        }
                        setTextButtonFilter('Process')
                        setisDisabled(false)
                        setLoading(false)
                        setLoadingButton(false)
                        setProgress('');
                    }
                }

            });
        }
        // ------------------------- PROSES DATA GAGAL ------------------------- //    
        } else {
           
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
                                <DropDownBranch in_classname_title={"mt-9 mb-3"} in_classname_content={"w-full"} data_options={options5} isSearchable={true} isMulti={stateIsMultiKdcab} event={userSelectKodeCabang} />
                                <div className="mb-14">
                                    <div className="flex">
                                        <ButtonFilter in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={GetID()} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSend />} in_title_button={TextButtonFilter} HandleClick={HandleClick2} />
                                        &nbsp;
                                        <ButtonReload in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_filter"} isLoading={false} isDisabled={false} HandleClick={HandleReloadClick} />
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                    <div className="p-4">
                        <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                            <form>
                            <div className="mb-3.5">
                                    <div className="flex item-center font-semibold">
                                        <IconClock />
                                        <h2 className="text-dark -mt-0.5 ml-1 text-center text-1xl dark:text-white-light">Progress Data</h2>
                                    </div>
                            </div>
                            <br />
                            <div className="flex flex-col space-y-5">
                                <div className="flex items-center">
                                    <div className="h-9 w-9">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light">
                                            <IconChrome className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div className="w-full flex-initial px-3">
                                        <div className="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                            <h6>Timer Process :</h6>
                                            
                                            <div id="timer" className="text-md text-right text-warning md:text-md">
                                                <label>00:00</label>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="h-9 w-9">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning/10 text-warning dark:bg-warning dark:text-white-light">
                                            <IconBox className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div className="w-full flex-initial px-3">
                                        <div className="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                            <h6>Last Data Server :</h6>
                                            
                                                <div id="progress_time" className="text-md text-right text-success sm:text-md">
                                                    <label>{(progressbar_time === '' ? '0000-00-00 00:00:00' : progressbar_time)}</label>
                                                </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="h-9 w-9">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger/10 text-danger dark:bg-danger dark:text-white-light">
                                            <IconRefresh className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div className="w-full flex-initial px-3">
                                        <div className="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                            <h6>Progress :</h6>
                                             
                                                <div id="progress_message" className="text-md text-right text-success sm:text-md">
                                                <label>{progressbar}{'|'}{(get_dateTimeDiff_second(new Date(ClosedWS),new Date(LastResponse))) === 'NaN' ? '0 Detik' : get_dateTimeDiff_second(new Date(ClosedWS),new Date(LastResponse))}</label>
                                                </div>
                                            
                                        </div>
                                        <div>
                                            <div className="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                                <div
                                                    className="relative h-full w-full rounded-full bg-gradient-to-r from-[#a71d31] to-[#3f0d12] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                                    style={{ width: prosentase_progressbar }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {data_rows.length === 0 ? '' : 
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                {
                    data_rows.length === 0 ? '' : 
                        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                            {
                                data_rows.map(
                                    
                                    (key, i) => (
                                        <>
                                        <CardDeviceCabang in_data_table={data_rows[i].table} in_data_summary={data_rows[i].summary} in_data_labels={['UP','DOWN','WRONG TIME','NO REPORT']}  in_IDReport={IDReport} in_station={station} jenis_laporan={data_rows[i].jenis_laporan} in_data_rows={data_rows[i].table} isLoading={loading} isVisible={true} in_filter_kdcab={IN_CMB_KODE_CABANG} /> 
                                        </>
                                    )
                                )
                            }
                        </div> 
                }
            </div> }
            </>
        } />
        </>
    )
}
export default FormReportMonitoringDevice;