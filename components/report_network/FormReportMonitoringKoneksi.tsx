'use client'
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Select from 'react-select';
import Swal from 'sweetalert2';
import router from 'next/router';
import config from '@/lib/config.json';
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertBinaryToText, GenerateUniqNumber, GetFailedClient, GetToken, GetTotalFailedClient, HitungSuksesDanGagalFomTable, ListKey, SummaryValueOfArray, WritePayload, WritePayloadKoneksi, get_branch_code, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, setTombolAmbilDataGagal, start, stop } from "@/lib/global";
import CardDeviceCabang from "../form/CardDeviceCabang";
import IconCpuBolt from "../Icon/IconCpuBolt";
import IconChrome from "../Icon/IconChrome";
import IconBox from "../Icon/IconBox";
import IconRefresh from "../Icon/IconRefresh";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";




interface FormReportMonitoringKoneksiProps {
    url: string,
    IDReport: string,
    station: string,
}

const options6 = [
    { value: '', label: '-- Semua Station --' },
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },
    { value: '12', label: '12' },{ value: '22', label: '22' },
    { value: 'I1', label: 'I1' },
];

const FormReportMonitoringKoneksi: React.FC<FormReportMonitoringKoneksiProps> = ({ url, IDReport,station }) => {
    const [IN_DATA, setData] = useState("");
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [IN_CMB_STATION, setStation] = useState("");
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const [columnGroupingModel,setcolumnGroupingModel] = useState([]);
    const [active, setActive] = useState(true);
    const [active_reload, setActiveReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progressbar, setProgress] = useState('');
    const [progressbar_time, setProgressbar_time] = useState('');
    const [prosentase_progressbar,setprosentase_progressbar] = useState('0%');
    const [isStopReload, setStopReload] = useState('0');

    const [total_station, setTotalStation] = useState(0);
    const [total_sukses, setTotalSukses] = useState(0);
    const [total_gagal, setTotalGagal] = useState(0);
    const [data_gagal, setDataGagal] = useState('');
    const [stateIsMultiKdcab,setstateIsMultiKdcab] = useState(true);
    const [IP, setDataIP] = useState('');
    const [Visible,setVisible] = useState(false);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const MySwal = withReactContent(Swal);
    const stateConnect = useRef(0);
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();

     

    const router = useRouter();
    const [IN_HOST, setHOST] = useState('');
    useEffect(() => {
        var rconfig = JSON.stringify(config);
        //console.log('config : '+rconfig);
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;
        //const res_host = (config.api as any).HOSTNAME;
        setHOST(res_host);
        let arr_cabang = get_branch_code(false,false);
        setOption5(arr_cabang)
            
        //setData_columns(columns);
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
        //console.log(value);
        try{
            //console.log('label : '+JSON.stringify(value));
            if(JSON.stringify(value).includes('Semua')){
                setstateIsMultiKdcab(false)
            }else{
                setstateIsMultiKdcab(true)
            }
            if (value.length == 0) {
                setKODE_CABANG('')
                console.log('kondisi 1')
            } else {
                console.log('kondisi 2')
                //console.log('value : '+JSON.stringify(value));
                var arr_kode_cabang = "";
                for (var i = 0; i < value.length; i++) {
                    //console.log(value[i].value);
                    if (i === (value.length - 1)) {
                        arr_kode_cabang = arr_kode_cabang + value[i].value;
                    } else {
                        arr_kode_cabang = arr_kode_cabang + value[i].value + ",";
                    }
    
                }
                setKODE_CABANG(arr_kode_cabang);
                const myExample = document.getElementById('btn_filter');
                myExample.innerHTML = t('Process');
                setDataIP('');
            }
        }catch(Ex){

        }
    };
    const HandleClick2 = (idComponent: any) => {
        const myExample = document.getElementById(idComponent);
        if (myExample.innerHTML === 'Proses' || myExample.innerHTML === 'Process') {
            let in_counter = 0;
            start(in_counter, "timer");
            var list_toko_sukses_before = '';
            var res_list_kirim = '';
            var terima = 0;
            setprosentase_progressbar('0%');
            var prosentasi_prog = 0;

            let summary_up = 0;
            let summary_down = 0;
            let summary_wrong_time = 0;
            let summary_no_report = 0;


            let arr_summary: number[] = [];
            let arr_summary_detail:number[] = [];
            let arr_series: any[] = [];
            let arr_concat = [];

            
            const kdcab = IN_CMB_KODE_CABANG;
            setData_rows([]);
            setVisible(false);
            setLoading(false);
            setClosedWS('');
            setLastResponse('');
            
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
                setActive(false);
                setActiveReload(true);
                setStopReload('0');
                
                myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')
                const socket = new WebSocket(url);
                socket.binaryType = 'blob';
                //Connection error
                socket.addEventListener("error", (event: any) => {
                    setActive(true);
                    setActiveReload(false);
                    setLoading(false);
                    setProgress(t('Finished Session'));
                    myExample.innerHTML = t('Process');
                    stateConnect.current = 0;
                    const tgl_kini = get_format_tanggal_jam();
                    setClosedWS(tgl_kini)
                });

                // Connection opened
                socket.addEventListener("open", () => {
                    socket.send(param);
                    stateConnect.current = 1;
                    //console.log('param : ' + param);
                });
                // Connection close
                socket.addEventListener("close", (event: any) => {
                    console.log('connection close');
                    if(stateConnect.current === 1){
                        setActive(true);
                        setActiveReload(false);
                        setLoading(false);
                        setProgress(t('Finished Session'));
                        stop();
                        myExample.innerHTML = t('Process');
                        stateConnect.current = 0;
                        const tgl_kini = get_format_tanggal_jam();
                        setClosedWS(tgl_kini)
                    }else{

                    }
                   
                });

                // Listen for messages
                socket.addEventListener('message', async (event) => {
                    const data = ConvertBinaryToText(event);
                    const parse_json = JSON.parse(await data);
                    const code = parse_json.code;
                    const msg = parse_json.msg;
                    const rdata = parse_json.data;
                    const countdata = parse_json.amountData;

                    if(stateConnect.current === 0){
                        socket.close();
                    }else{
                        console.log('code : ' + code + ' msg : ' + msg);
                        const tgl_kini = get_format_tanggal_jam();
                        setLastResponse(tgl_kini);
                        //console.log('rdata : '+rdata);
                        if (code === 200 || code === 209) {
                                
                                setProgress(code + '-' + msg);
                                setActive(false);
                                setLoading(true);
                                try {
                                    //console.log('data : '+parse_json.data);
                                    if(code === 200){
                                        const res_data = JSON.parse(parse_json.data);
                                        const res_new = res_data;
                                        // var arr_series = [];
                                        // var arr_summary = [];
                                        console.log('Panjang data : '+res_new.length)
                                        for(var i = 0;i<res_new.length;i++){
                                            // var arr_concat = [];
                                            const res_jenis_koneksi = res_new[i].jenis_koneksi;
                                            const res_kdcab = res_new[i].kdcab;

                                            const res_down = (parseFloat(res_new[i].down)) as number;
                                            const res_no_report = (parseFloat(res_new[i].no_report)) as number;
                                            const res_up = (parseFloat(res_new[i].up)) as number;
                                            const res_wrong_time = (parseFloat(res_new[i].wrong_time)) as number;

                                            // const res_via_cbn_down = (parseFloat(res_new[i].via_cbn_down)) as number;
                                            // const res_via_cbn_up = (parseFloat(res_new[i].via_cbn_up)) as number;
                                            // const res_via_cdc_down = (parseFloat(res_new[i].via_cdc_down)) as number;
                                            // const res_via_cdc_up = (parseFloat(res_new[i].via_cdc_up)) as number;
                                            // const res_via_dawuhan_down = (parseFloat(res_new[i].via_dawuhan_down)) as number;
                                            // const res_via_dawuhan_up = (parseFloat(res_new[i].via_dawuhan_up)) as number;
                                            // const res_via_vsat_down = (parseFloat(res_new[i].via_vsat_down)) as number;
                                            // const res_via_vsat_up = (parseFloat(res_new[i].via_vsat_up)) as number;

                                            if(res_new.length > 2){
                                                if(res_jenis_koneksi !== 'unknown'){
                                                    var arr_obj_per_cabang = {'kdcab':res_kdcab,'jenis_koneksi':res_jenis_koneksi,'up':res_up,'down':res_down,'wrong_time':res_wrong_time,'no_report':res_no_report}
                                                    arr_series.push(arr_obj_per_cabang)
                                                }else{
                                                    var arr_obj_per_cabang = {'kdcab':res_kdcab,'jenis_koneksi':res_jenis_koneksi,'up':res_up,'down':res_down,'wrong_time':res_wrong_time,'no_report':res_no_report}
                                                    arr_series.push(arr_obj_per_cabang)
                                                    arr_summary = [summary_up,summary_down,summary_wrong_time,summary_no_report];
                                                    var res_arr_series = AddID(arr_series);
                                                    const obj_per_cabang = {"jenis_laporan":"Koneksi All","summary_header":arr_summary,"summary_detail":res_arr_series};
                                                    var arr_concat = [obj_per_cabang];
                                                    setData_rows(arr_concat);
                                                    console.log('arr_concat : '+JSON.stringify(arr_concat))
                                                
                                                }
                                            }else if(res_new.length === 1){
                                                var arr_obj_per_cabang = {'kdcab':res_kdcab,'jenis_koneksi':res_jenis_koneksi,'up':res_up,'down':res_down,'wrong_time':res_wrong_time,'no_report':res_no_report}
                                                arr_series.push(arr_obj_per_cabang)
                                                arr_summary = [summary_up,summary_down,summary_wrong_time,summary_no_report];
                                                var res_arr_series = AddID(arr_series);
                                                const obj_per_cabang = {"jenis_laporan":"Koneksi All","summary_header":arr_summary,"summary_detail":res_arr_series};
                                                var arr_concat = [obj_per_cabang];
                                                setData_rows(arr_concat);
                                                console.log('arr_concat : '+JSON.stringify(arr_concat))
                                            }else if(res_new.length === 2){
                                                if(i === (res_new.length-1)){
                                                    var arr_obj_per_cabang = {'kdcab':res_kdcab,'jenis_koneksi':res_jenis_koneksi,'up':res_up,'down':res_down,'wrong_time':res_wrong_time,'no_report':res_no_report}
                                                    arr_series.push(arr_obj_per_cabang)
                                                    arr_summary = [summary_up,summary_down,summary_wrong_time,summary_no_report];
                                                    var res_arr_series = AddID(arr_series);
                                                    const obj_per_cabang = {"jenis_laporan":"Koneksi All","summary_header":arr_summary,"summary_detail":res_arr_series};
                                                    var arr_concat = [obj_per_cabang];
                                                    setData_rows(arr_concat);
                                                    console.log('arr_concat : '+JSON.stringify(arr_concat))
                                                }else{
                                                    var arr_obj_per_cabang = {'kdcab':res_kdcab,'jenis_koneksi':res_jenis_koneksi,'up':res_up,'down':res_down,'wrong_time':res_wrong_time,'no_report':res_no_report}
                                                    arr_series.push(arr_obj_per_cabang)
                                                }
                                                
                                            }
                                            
                                            
                                            summary_up = summary_up+res_up;
                                            summary_down = summary_down+res_down;
                                            summary_wrong_time = summary_wrong_time+res_wrong_time;
                                            summary_no_report = summary_no_report+res_no_report;
                                        }

                                    }else if(code === 209){
                                        setLoading(false);
                                        setActive(true);
                                        setActiveReload(false);
                                        console.log('code : ' + code + ' msg : ' + msg);
                                        setprosentase_progressbar('100%');
                                        stop();
                                        myExample.innerHTML = t('Process');
                                        stateConnect.current = 1;
                                    }else{

                                    }
                                    setProgressbar_time(get_format_tanggal_jam());
                                } catch (Ex) {
                                    console.log('error parsing : ' + Ex.toString())
                                }
                            
                        }
                        else if (code === 201) {
                            setProgress(code + "-" + msg);
                            setLoading(true);
                        }
                        else if (parse_json.code.toString().substring(0, 1) === '4') {
                            setActive(true);
                            setLoading(true);
                            myExample.innerHTML = t('Process');
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
                            if(code === 403){
                                //-- redirect ke login --//
                                handleLogout();
                            }else{

                            }
                            setLoading(false);
                            setProgress('');
                        }
                    }
                });
            }

            // ------------------------- PROSES DATA GAGAL ------------------------- //    
        } else {
           
        }
    };

    const HandleReloadClick = (idComponent: any) => {
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

            <div className="grid-cols-2 gap-3  md:grid-cols-2 mb-3 flex items-end justify-left">
                <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
                    <div className="p-2 flex items-center flex-col sm:flex-row">
                        <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                            <form>
                                <div className="mb-3">
                                    <div className="flex item-center font-semibold">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                        </svg>
                                        <h2 className="text-dark mt-1 ml-1 text-center text-1xl dark:text-white-light">Form Filter</h2>
                                    </div>
                                </div>

                                <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Branch Code')}</label></div>
                                <div className="mb-3">
                                    <div className="w-full">
                                        <Select
                                            onChange={userSelectKodeCabang}
                                            id="cmb_kode_cabang"
                                            placeholder={t("Select Branch Code")}
                                            options={options5}
                                            isMulti={stateIsMultiKdcab}
                                            isSearchable={true}

                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="flex">
                                        <button id="btn_filter" disabled={!active} onClick={() => {
                                            HandleClick2('btn_filter')
                                        }} type="button" className={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'}>
                                            &nbsp;{t('Process')}
                                        </button>

                                        &nbsp;
                                        <button id="btn_reload" disabled={!active_reload} onClick={() => {
                                            setStopReload('1')
                                            HandleReloadClick('btn_filter')
                                        }} type="button" className={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'}>
                                            {t('Repeat Process')}
                                        </button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                    <div className="p-4">
                        <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                            <form>
                                <div className="mb-3.5">
                                    <div className="flex item-center font-semibold">
                                        <IconCpuBolt />
                                        <h2 className="text-dark -mt-0.5 ml-1 text-center text-1xl dark:text-white-light">{t('Data Progress')}</h2>
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
                                                <h6>{t('Time Process')}:</h6>
                                                
                                                <div id="timer" className="text-lg text-right text-warning sm:text-lg">
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
                                                <h6>{t('Last Data Server')} :</h6>
                                                
                                                    <div id="progress_time" className="text-lg text-right text-success sm:text-lg">
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
                                                <h6>{t('Progress')} :</h6>
                                                
                                                    <div id="progress_message" className="text-lg text-right text-success sm:text-lg">
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
            <div>
                {/* <label>{'Data ALL : '+JSON.stringify(data_rows)}</label> */}
                {
                    data_rows.length === 0 ? '' : 
                        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                            {
                                data_rows.map(
                                    
                                    (key, i) => (
                                        <>
                                        <CardDeviceCabang in_data_table={data_rows[i].summary_detail} in_data_summary={data_rows[i].summary_header} in_data_labels={['UP','DOWN','WRONG TIME','NO REPORT']}  in_IDReport={IDReport} in_station={station} jenis_laporan={data_rows[i].jenis_laporan} in_data_rows={data_rows[i].summary_detail} isLoading={loading} isVisible={true} in_filter_kdcab={IN_CMB_KODE_CABANG} /> 
                                        </>
                                    
                                        
                                    )
                                )
                            }
                        </div> 
                }
            </div>
            
        </>
    )
}

export default FormReportMonitoringKoneksi;