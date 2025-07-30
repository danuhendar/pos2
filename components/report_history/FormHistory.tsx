'use client'
import {  useEffect,  useRef,  useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import { AddColumn, AddID, ConvertDateFormat, GetFormatCurrency, GetToken,  get_data_local_storage, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, removeDuplicates, setTombolAmbilDataGagal, start, stop, textToBase64Barcode } from "@/lib/global";
import { useTranslation } from "react-i18next";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
import { Posts } from "@/lib/post";
import ButtonAdd from "../button/ButtonAdd";
import IconRefresh from "../Icon/IconRefresh";
import ComponentsDatatablesAdvanced from "../table/ComponentsDatatablesAdvanced";
import InputTextType from "../form/InputTypeText";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import CardComponent from "../form/CardComponent";
import IconPrinter from "../Icon/IconPrinter";
import IconPaperclip from "../Icon/IconPaperclip";
import DatePicker from "../datepicker/DatePicker";
import IconCircleCheck from "../Icon/IconCircleCheck";
import IconXCircle from "../Icon/IconXCircle";
import { useReactToPrint } from "react-to-print";
import Receipt from "../sales/PrintReceipt";
import { set } from "lodash";
import IconLoader from "../Icon/IconLoader";
import IconWheel from "../Icon/IconWheel";
import IconBox from "../Icon/IconBox";

interface FormHistoryProps {
    url: string,
    command: string,
    IDReport: string,
}
const FormHistory: React.FC<FormHistoryProps> = ({ url, command, IDReport }) => {
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const [IconButton,setIconButton] = useState(<IconRefresh />)
    const [options6,setOptions6] = useState([])
    const [options7,setOptions7] = useState([])
    const [IN_KATEGORI,setIN_KATEGORI] = useState([])
    const [IN_KODE_GERAI,setIN_KODE_GERAI] = useState('')
    const curdate = get_format_tanggal_jam().substring(0,16);
    const [date2, setDate2] = useState<any>(curdate);

    const [IN_NAMA_GERAI,setIN_NAMA_GERAI] = useState('')
    const [IN_ALAMAT,setIN_ALAMAT] = useState('')
    const [IN_NAMA_PEMBUAT,setIN_NAMA_PEMBUAT] = useState('')
    const [IN_SHIFT,setIN_SHIFT] = useState('')
    const [IN_BAYAR,setIN_BAYAR] = useState('')
    const [IN_KEMBALIAN,setIN_KEMBALIAN] = useState('')
    const [IN_TANGGAL_STRUK,setIN_TANGGAL_STRUK] = useState('')
    const [IN_GENERATE_KODE_TRANSAKSI_INVENTORY,setIN_GENERATE_KODE_TRANSAKSI_INVENTORY] = useState('')
    const [GrandTotal,setGrandTotal] = useState('0');
    const receiptRef = useRef();
    const [dummyData, setDummyData] = useState({
        items: []
    });
    const [isLoadingButtonReprint, setLoadingButtonReprint] = useState(false);
    const [isLoadingContent,setLoadingContent] = useState(false);
    const [isLoadawal,setLoadawal] = useState(true);

    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        const kode_gerai = get_data_local_storage('kode_gerai')
        if(kode_gerai === '%'){
            GetMasterGerai(res_host,res_PORT_LOGIN)
        }else{
            setIN_KODE_GERAI(kode_gerai)    
        }
    },[]);
    const FormInputKodeGerai = (value: any) => {var val = value.value;var sp = val.split('|');setIN_KODE_GERAI(sp[0]); setIN_NAMA_GERAI(sp[1]); setIN_ALAMAT(sp[2]);};
    const GetMasterGerai = (in_host:string,in_port:number) => {
        setOptions7([])
        let url = `http://${in_host}:${in_port}/api/v2/GetMasterGerai`
        let param = {"IN_KODE_CABANG":"%","IN_IS_AKTIF":"%"}
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                var rows = data_body[0].ROWS;
                var arr_ = []
                for(var i = 0;i<rows.length;i++){
                    const obj = {"label":rows[i].KODE_GERAI+'-'+rows[i].CONTENT,"value":rows[i].KODE_GERAI+"|"+rows[i].CONTENT+"|"+rows[i].ALAMAT}
                    arr_.push(obj)
                }
                setOptions7(arr_)
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

    const handlePrint = useReactToPrint({
        content: () => receiptRef.current,
    });

    const GetHandlePrint = (no_struk:string,total_belanja:number,bayar:number,kembalian:number) => {
        setLoadingButtonReprint(true)
        const in_bayar = GetFormatCurrency(""+bayar)
        console.log("in_bayar : "+in_bayar)
        const in_kembali = GetFormatCurrency(""+kembalian)
        console.log("in_kembali : "+in_kembali)
        const in_no_struk = no_struk
        console.log("in_no_struk : "+in_no_struk)
        const in_total_belanja = GetFormatCurrency(""+total_belanja)
        console.log("in_total_belanja : "+in_total_belanja)
        const url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetDataTransaksiInventoryByNoStruk`
        const param = {"IN_NO_STRUK":no_struk,"IN_IS_STATUS":"1"}
        const Token = GetToken()
        setLoadingButton(true)
        setisDisabled(true)
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                var summary = data_body[0].SUMMARY;
                console.log(JSON.stringify(summary))
                console.log('nama_pembuat : '+summary[0].NAMA_PEMBUAT)
                setIN_NAMA_PEMBUAT(summary[0].NAMA_PEMBUAT)
                setIN_SHIFT(summary[0].SHIFT)
                console.log('shift : '+summary[0].SHIFT)
                setIN_TANGGAL_STRUK(summary[0].TANGGAL)
                console.log('tanggal : '+summary[0].TANGGAL)
                var rdetail = data_body[0].DETAIL;
                var detail = [];
                for(var i = 0;i<rdetail.length;i++){
                    const obj = {
                        "IN_KODE_BARANG": rdetail[i].KODE_BARANG,
                        "IN_DESKRIPSI": rdetail[i].DESKRIPSI,
                        "IN_SATUAN": rdetail[i].SATUAN,
                        "IN_HPP": rdetail[i].GROSS,
                        "IN_PPN": "0",
                        "IN_GROSS": rdetail[i].GROSS,
                        "IN_QTY": rdetail[i].QTY,
                        "IN_DISKON": rdetail[i].DISKON,
                        "IN_PRICE": rdetail[i].PRICE,
                        "IN_IS_HADIAH": 0,
                        "IN_KODE_PROMO": 0,
                        "IN_IS_RETUR_ITEM": 0
                    }
                    detail.push(obj)
                }
                if(detail.length > 0){ 
                    const r = {
                        items: detail,
                    };
                    console.log(JSON.stringify(r))
                    setDummyData(r);
                    setIN_GENERATE_KODE_TRANSAKSI_INVENTORY(in_no_struk)
                    setIN_BAYAR(in_bayar)
                    setIN_KEMBALIAN(in_kembali)
                    setGrandTotal(in_total_belanja)
                    setTimeout(() => {
                        if(receiptRef.current){
                            console.log("handlePrint()")
                            handlePrint()
                        }else{
                            console.log("receiptRef.current is null")
                        }
                    }, 3000);        
                    
                }else{
                    Swal.fire({
                        title: t("Warning"),
                        text: "Data tidak ditemukan!",
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                }
                setLoadingButton(false)
                setisDisabled(false)   
                setLoadingButtonReprint(false)
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
                setLoadingButton(false)
                setisDisabled(false)
                setLoadingButtonReprint(false)
            }else{
                Swal.fire({
                    title: t("Warning"),
                    text: ""+parseFloat(code)+"-"+msg,
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setLoadingButton(false)
                setisDisabled(false)
                setLoadingButtonReprint(false)
            }
        }).catch((error) => {
            console.log(error)
            Swal.fire({
                title: t("Warning"),
                text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setLoadingButton(false)
            setisDisabled(false)
            setLoadingButtonReprint(false)
        });
       

    }

    const Def_Column_HistorySales = () => {
        var cols = [
                {
                    accessor: 'NO_STRUK',
                    title: '#',
                    sortable: true,
                    render: ({ TANGGAL,NO_STRUK,TOTAL_BELANJA,BAYAR,KEMBALIAN,STATUS }) => (
                        <div className="flex items-center gap-2">
                            {
                               STATUS === 'OK' ?
                               <button className="rounded-full btn btn-primary btn-sm" onClick={() => GetHandlePrint(NO_STRUK,TOTAL_BELANJA,BAYAR,KEMBALIAN)}>
                                    {
                                        isLoadingButtonReprint ? 
                                        t('Please wait...')
                                        :
                                        <IconPrinter />
                                    }
                                </button>
                               :
                               STATUS === 'PENDING' ?
                                 <span className="text-warning">{'Pending'}</span>
                                 :
                                 <span className="text-danger">{'Void'}</span>
                            }
                            
                            {/* <div className="font-semibold">{NO_STRUK}</div> */}
                        </div>
                    ),
                },
                {
                    accessor: 'TANGGAL',
                    title: 'DATE',
                    sortable: true,
                    render: ({ TANGGAL }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{TANGGAL}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'KODE_INITIAL',
                    title: 'INITIAL CODE',
                    sortable: true,
                    render: ({ KODE_INITIAL }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{KODE_INITIAL}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'NO_STRUK',
                    title: 'NO_STRUK',
                    sortable: true,
                    render: ({ NO_STRUK }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{NO_STRUK}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'METODE_BAYAR',
                    title: 'PAYMENT METHOD',
                    sortable: true,
                    render: ({ METODE_BAYAR }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{METODE_BAYAR}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'BANK',
                    title: 'BANK',
                    sortable: true,
                    render: ({ BANK }) => (
                        <div className="flex items-center gap-2">
                            {/* <div>
                                <a onClick={()=> CopyText(NO_HP)}><IconCopy className="text-primary"/></a>
                            </div> */}
                            <div className="font-semibold">{BANK}</div>
                            
                        </div>
                    ),
                },
                {
                    accessor: 'TOTAL_BELANJA',
                    title: 'AMOUNT',
                    sortable: true,
                    render: ({ TOTAL_BELANJA }) => (
                        <div className="flex items-center gap-2">
                            {/* <div>
                                <a onClick={()=> CopyText(NO_HP)}><IconCopy className="text-primary"/></a>
                            </div> */}
                            <div className="font-semibold">{GetFormatCurrency(TOTAL_BELANJA)}</div>
                            
                        </div>
                    ),
                },
                {
                    accessor: 'BAYAR',
                    title: 'PAYMENT',
                    sortable: true,
                    render: ({ BAYAR}) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{GetFormatCurrency(BAYAR)}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'KEMBALIAN',
                    title: 'CASHBACK',
                    sortable: true,
                    render: ({ KEMBALIAN }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{GetFormatCurrency(KEMBALIAN)}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'STATUS',
                    title: 'STATUS',
                    sortable: true,
                    render: ({ STATUS }) => (
                        <div className="flex items-center gap-2">
                            {
                               STATUS === 'OK' ?
                               <span className="text-success">{<IconCircleCheck />}</span> 
                               :
                               STATUS === 'PENDING' ?
                                 <span className="text-warning">{<IconBox />}</span>
                                 :
                                 <span className="text-danger">{<IconXCircle />}</span>
                            }
                        </div>
                    ),
                },
                {
                    accessor: 'JUMLAH_ITEM',
                    title: 'QTY',
                    sortable: true,
                    render: ({ JUMLAH_ITEM }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{GetFormatCurrency(JUMLAH_ITEM)}</div>
                        </div>
                    ),
                },
            ];
            return  cols;
    }

    const GetHistorySales = () => {
        setLoadawal(false)
        const url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetHistorySales`
        const rdate = date2
        const in_periode_awal = ConvertDateFormat(rdate[0],false)
        const in_periode_akhir = ConvertDateFormat(rdate[1],false)
        const param = {"IN_PERIODE_AWAL":in_periode_awal,"IN_PERIODE_AKHIR":in_periode_akhir,"IN_KODE_GERAI":IN_KODE_GERAI}
        console.log(JSON.stringify(param))
        const Token = GetToken()
        setLoadingButton(true)
        setisDisabled(true)
        setLoadingContent(true)
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                setData_rows(data_body)
                var cols = Def_Column_HistorySales()
                setData_columns(cols)
                setLoadingButton(false)
                setisDisabled(false)
                setLoadingContent(false)
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
                setLoadingButton(false)
                setisDisabled(false)
                setLoadingContent(false)
            }else{
                Swal.fire({
                    title: t("Warning"),
                    text: ""+parseFloat(code)+"-"+msg,
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setLoadingButton(false)
                setisDisabled(false)
                setLoadingContent(false)
            }
        }).catch((error) => {
            console.log(error)
            Swal.fire({
                title: t("Warning"),
                text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setLoadingButton(false)
            setisDisabled(false)
            setLoadingContent(false)
        });
    }

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconPaperclip />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={"Filter Report "+IDReport} in_content={
                        <>
                        <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1">
                            {
                                IN_KODE_GERAI  !== '%' ?
                                <div>
                                <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options7} isSearchable={true} isMulti={false} event={FormInputKodeGerai} name_component={"Gerai"} idComponent={"gerai"} />
                                </div>
                                :
                                <div>
                                <InputTextType   in_title={"Gerai"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_KODE_GERAI} />
                                </div>
                            }
                            <div>
                            <DatePicker is_time_24hr={false} in_mode={'range'} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg"} event={(date2) => setDate2(date2)} name_component={"Date"} idComponent={"txt_date"} isRtl={isRtl} in_date={date2} isEnableTime={false} date_format={"Y-m-d"} />
                            </div>
                            <div className="lg:mt-8 md:mt-8">
                            <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Filter'} HandleClick={GetHistorySales} />    
                            </div>
                        </div>
                      </>
                } />
                
                    {
                        isLoadawal ?
                        ''
                        :
                        <>
                        {
                            isLoadingContent ?
                            <div className="flex items-center justify-center w-full h-[300px]">
                                <span className="inline-block w-12 h-12 m-auto mb-10 align-middle border-4 border-transparent rounded-full animate-spin border-l-primary"></span>
                            </div>
                            
                            :
                            <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconPrinter />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={"Data "+IDReport} in_content={
                                <>
                                {
                                    data_rows.length > 0 ?
                                    <ComponentsDatatablesAdvanced in_column_sort={'id'} in_id={"dt"} Datarow={data_rows} DataColumns={data_columns} />
                                    :
                                    ''
                                }
                                <div className="hidden">
                                    <Receipt ref={receiptRef} data={dummyData} in_kode_gerai={IN_KODE_GERAI} in_name_gerai={IN_NAMA_GERAI} in_alamat={IN_ALAMAT} in_nama={IN_NAMA_PEMBUAT} in_shift={IN_SHIFT} in_bayar={IN_BAYAR} in_kembali={IN_KEMBALIAN} in_no_struk={IN_GENERATE_KODE_TRANSAKSI_INVENTORY} in_total_belanja={GrandTotal} in_tanggal_struk={IN_TANGGAL_STRUK} />
                                </div>
                                </>
                            } />
                        }
                        </>
                    }
                    

                
                
                </>
            } />
        </>
    )
}
export default FormHistory;