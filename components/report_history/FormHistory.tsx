'use client'
import {  useEffect,  useRef,  useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import { AddColumn, AddID, ConvertDateFormat, CopyText, GetFormatCurrency, GetToken,  get_data_local_storage, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, removeDuplicates, setTombolAmbilDataGagal, start, stop, textToBase64Barcode } from "@/lib/global";
import { useTranslation } from "react-i18next";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
import { Posts, PostsDownload } from "@/lib/post";
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
import IconBox from "../Icon/IconBox";
// import html2pdf from 'html2pdf.js';
// import html2pdf from 'html2pdf.js';
// const html2pdf = dynamic(() => import('html2pdf.js'), { ssr: false });
// We'll import html2pdf dynamically inside the function instead of here.
import IconDownload from "../Icon/IconDownload";
import IconSend from "../Icon/IconSend";
import IconCopy from "../Icon/IconCopy";
import ModalComponent from "../modal/ModalComponent";
import { set } from "lodash";


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
    const [Title,setTitle] = useState('')
    const [data_rows_detail_transaksi_inventory, setData_rows_detail_transaksi_inventory] = useState([]);
    const [data_columns_detail_transaksi_inventory, setData_columns_detail_transaksi_inventory] = useState([]);
    const [modal13,setModal13] = useState(false);
    const [modal14,setModal14] = useState(false);
    const [URL_GENERATE_STRUK,setURL_GENERATE_STRUK] = useState('')
    const [IN_NO_STRUK,setIN_NO_STRUK] = useState('')

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
        console.log('kode_gerai : '+kode_gerai)
        if(kode_gerai === '%'){
            console.log('kondisi 1')
            GetMasterGerai(res_host,res_PORT_LOGIN)
        }else{
            console.log('kondisi 2')
            setIN_KODE_GERAI(kode_gerai)    
        }
    },[]);
    const FormInputKodeGerai = (value: any) => {var val = value.value;var sp = val.split('|');setIN_KODE_GERAI(sp[0]); setIN_NAMA_GERAI(sp[1]); setIN_ALAMAT(sp[2]);};
    const GetMasterGerai = (in_host:string,in_port:number) => {
        setOptions7([])
        let url = `https://${in_host}/api/v2/GetMasterGerai`
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
    
    const def_Column_HistoryInventory = () => {
        var cols = [
                
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
                    accessor: 'KODE_TRANSAKSI',
                    title: 'TRANSACTION CODE',
                    sortable: true,
                    render: ({ KODE_TRANSAKSI }) => (
                        <div className="flex items-center gap-2">
                            <div>
                                <a onClick={()=> CopyText(KODE_TRANSAKSI,isRtl)}><IconCopy className="text-primary"/></a>
                            </div>
                            <div className="font-semibold">
                                <a onClick={() => {showModalDetailTransaksiInventory('Detail Transaksi Inventory : #'+KODE_TRANSAKSI,KODE_TRANSAKSI)}} data-twe-toggle="tooltip" title="Detail Data Transaksi Inventory" className="text-primary hover:underline">
                                    {KODE_TRANSAKSI}
                                </a>
                            </div>
                            
                        </div>
                    ),
                },
                {
                    accessor: 'JENIS_TRANSAKSI',
                    title: 'TYPE',
                    sortable: true,
                    render: ({ JENIS_TRANSAKSI }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{JENIS_TRANSAKSI}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'KETERANGAN',
                    title: 'DESCRIPTION',
                    sortable: true,
                    render: ({ KETERANGAN }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{KETERANGAN}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'ASAL',
                    title: 'SOURCE',
                    sortable: true,
                    render: ({ ASAL }) => (
                        <div className="flex items-center gap-2">
                            {/* <div>
                                <a onClick={()=> CopyText(NO_HP)}><IconCopy className="text-primary"/></a>
                            </div> */}
                            <div className="font-semibold">{ASAL}</div>
                            
                        </div>
                    ),
                },
                {
                    accessor: 'TUJUAN',
                    title: 'DESTINATION',
                    sortable: true,
                    render: ({ TUJUAN }) => (
                        <div className="flex items-center gap-2">
                            {/* <div>
                                <a onClick={()=> CopyText(NO_HP)}><IconCopy className="text-primary"/></a>
                            </div> */}
                            <div className="font-semibold">{TUJUAN}</div>
                        </div>
                    ),
                },
        
                {
                    accessor: 'NAMA',
                    title: 'STAFF',
                    sortable: true,
                    render: ({ NAMA }) => (
                        <div className="flex items-center gap-2">
                           <div className="font-semibold">{NAMA}</div>
                        </div>
                    ),
                },
               
            ];
            return  cols;
    }

    const GenerateReceiptStruk = (
        in_no_struk:string,
        in_tanggal:string,
        in_send_wa:boolean
    ) => {
        setIN_NO_STRUK('')
        if(!in_send_wa){
            setModal14(true)
            const url = `https://${IN_HOST}/api/v2/GenerateReceiptStrukForPreview/${in_no_struk}`
            setURL_GENERATE_STRUK(url)
            setIN_NO_STRUK(in_no_struk)
        }else{
            let url = `https://${IN_HOST}/api/v2/GenerateReceiptStruk`
            let param = {"IN_NO_STRUK": in_no_struk,"IN_SEND_WA":in_send_wa}
            const Token = GetToken()
            //console.log(JSON.stringify(param))
            setLoadingButtonReprint(true)
            const NameFile = 'receipt_'+in_tanggal.split('-').join('').split(':').join('')+'_'+in_no_struk+'.pdf'; // file name
            PostsDownload(url,JSON.stringify(param),false,Token,NameFile).then((response) => {
                    if(response.code && response.code.toString().substring(0,1) === '4'){
                        Swal.fire({
                            title: t("Error"),
                            text: response.msg || t("Failed to generate receipt"),
                            icon: "error",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    }else{
                        Swal.fire({
                            title: t("Success"),
                            text: t("Struk Online Berhasil dibuat!"),
                            icon: "success",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    }
                    
                
            setLoadingButtonReprint(false)
            }).catch((error) => {
                console.log(error)
                Swal.fire({
                    title: t("Warning"),
                    text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setLoadingButtonReprint(false)
            });
        }
        
    }

    const Def_Column_HistorySales = () => {
        var cols = [
                {
                    accessor: 'NO_STRUK',
                    title: '#',
                    sortable: true,
                    render: ({ TANGGAL,NO_STRUK,TOTAL_BELANJA,GRAND_TOTAL,DISKON_MARKET_PLACE,DISKON_ITEM,BIAYA_ONGKIR,BAYAR,KEMBALIAN,STATUS }) => (
                        <div className="flex items-center gap-2">
                            {
                               STATUS === 'OK' ?
                               <>
                               <div className="flex flex-row gap-2">
                                <button className="rounded-full btn btn-warning btn-sm" onClick={() => GenerateReceiptStruk(NO_STRUK,TANGGAL,false)}>
                                    {
                                        isLoadingButtonReprint ? 
                                        t('Please wait...')
                                        :
                                        <IconDownload />
                                    }
                                </button>
                                <button className="rounded-full btn btn-info btn-sm" onClick={() => GenerateReceiptStruk(NO_STRUK,TANGGAL,true)}>
                                    {
                                        isLoadingButtonReprint ? 
                                        t('Please wait...')
                                        :
                                        <IconSend />
                                    }
                                </button>
                               </div>
                               </>
                             
                               :
                               STATUS === 'PENDING' ?
                                 <span className="text-warning">{'Pending'}</span>
                                 :
                                 <span className="text-danger">{'Void'}</span>
                            }
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
                            <div>
                                <a onClick={()=> CopyText(NO_STRUK,isRtl)}><IconCopy className="text-primary"/></a>
                            </div>
                            <div className="font-semibold">
                                {NO_STRUK}
                            </div>
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

    const GetHistory = () => {
        setLoadawal(false)
        let url = ''
        const rdate = date2
        let in_periode_awal = ''
        let in_periode_akhir = ''
        if(rdate.length === 2){
           in_periode_awal = ConvertDateFormat(rdate[0],false)
           in_periode_akhir = ConvertDateFormat(rdate[1],false)
        }else{
            in_periode_awal = ConvertDateFormat(rdate,false)
            in_periode_akhir = ConvertDateFormat(rdate,false)
        }
        let param = {}
        if(IDReport === 'History Sales'){
            setIN_NO_STRUK('')
            url = `https://${IN_HOST}/api/v2/GetHistorySales`
            param = {"IN_PERIODE_AWAL":in_periode_awal,"IN_PERIODE_AKHIR":in_periode_akhir,"IN_KODE_GERAI":IN_KODE_GERAI}
        }else if(IDReport === 'History Inventory'){
            url = `https://${IN_HOST}/api/v2/GetHistoryInventory`
            param = {"IN_PERIODE_AWAL":in_periode_awal,"IN_PERIODE_AKHIR":in_periode_akhir,"IN_KODE_GERAI":IN_KODE_GERAI}
        }
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
                var cols = [] 
                if(IDReport === 'History Sales'){
                    cols = Def_Column_HistorySales()
                }else if(IDReport === 'History Inventory'){
                    cols = def_Column_HistoryInventory()
                }
                setData_columns(cols)
                setLoadingButton(false)
                setisDisabled(false)
                setLoadingContent(false)
            }else if(code.toString().substring(0,1) === '4'){
                if(code === 401 && msg.includes("Invalid")){
                    Swal.fire({
                        title: t("Warning"),
                        text: ""+parseFloat(code)+"-"+msg,
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
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

    const Def_Columns_Transaksi_Inventory_Detail = () => {
        var cols = [
                {
                    accessor: 'KODE_TRANSAKSI',
                    title: 'CODE',
                    sortable: true,
                    render: ({ KODE_TRANSAKSI }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{KODE_TRANSAKSI}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'KODE_BARANG',
                    title: 'ITEM CODE',
                    sortable: true,
                    render: ({ KODE_BARANG }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{KODE_BARANG}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'DESKRIPSI',
                    title: 'DESCRIPTION',
                    sortable: true,
                    render: ({ DESKRIPSI }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{DESKRIPSI}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'SATUAN',
                    title: 'SATUAN',
                    sortable: true,
                    render: ({ SATUAN }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{SATUAN}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'QTY',
                    title: 'QTY',
                    sortable: true,
                    render: ({ QTY }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{QTY}</div>
                        </div>
                    ),
                }
            ];
            return  cols;
    }

    const showModalDetailTransaksiInventory = (in_title:string,in_kode_transaksi:string) => {
        setModal13(true)
        setTitle(in_title)
        setData_rows_detail_transaksi_inventory([])
        let url = `https://${IN_HOST}/api/v2/GetHistoryInventoryDetail`
        let param = {"IN_KODE_TRANSAKSI":in_kode_transaksi}
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                setData_rows_detail_transaksi_inventory(data_body)
                var cols = Def_Columns_Transaksi_Inventory_Detail() 
                setData_columns_detail_transaksi_inventory(cols)
            }else if(code.toString().substring(0,1) === '4'){
                if(code === 401 && msg.includes("Invalid")){
                    Swal.fire({
                        title: t("Warning"),
                        text: ""+parseFloat(code)+"-"+msg,
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
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
            console.log(error)
            Swal.fire({
                title: t("Warning"),
                text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        });
    }
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
                <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconPaperclip />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={"Filter Report "+IDReport} in_content={
                        <>
                        <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1">
                            {
                                IN_KODE_GERAI  === '%' || IN_KODE_GERAI === '' ?
                                <div>
                                <DropDownGlobal in_is_clear={false}in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options7} isSearchable={true} isMulti={false} event={FormInputKodeGerai} name_component={"Gerai"} idComponent={"gerai"} />
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
                            <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Filter'} HandleClick={GetHistory} />    
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
                                </>
                            } />
                        }
                        </>
                    }
                    
                    <ModalComponent in_size_modal={`panel animate__animated my-7 w-2/3 overflow-hidden rounded-3xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-sm font-bold"} in_title_modal={Title} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                            <div className="p-2">
                                <div className="mb-5">
                                    {
                                    data_rows_detail_transaksi_inventory.length > 0 ?
                                    <ComponentsDatatablesAdvanced in_column_sort={'id'} in_id={"dt1"} Datarow={data_rows_detail_transaksi_inventory} DataColumns={data_columns_detail_transaksi_inventory} />
                                    :
                                    ''
                                    }
                                    
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-8">
                                    <ButtonAdd in_classname={'btn btn-outline-danger rounded-full text-xs'} idComponent={"btn_close"} isLoading={false} isDisabled={isDisabled} in_icon={<IconXCircle />} in_title_button={'Cancel'} HandleClick={CloseModal} />
                                </div>
                            </div>
                    } />
                    {/* MODAL STRUK ONLINE */}
                    <ModalComponent in_size_modal={`panel animate__animated my-7 w-1/3 h-1/2 overflow-hidden rounded-3xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal14} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-sm font-bold"} in_title_modal={"Receipt/Struk Preview #"+IN_NO_STRUK} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                            <div className="p-2">
                                <div className="mb-1">
                                        <iframe
                                            src={URL_GENERATE_STRUK} // 👈 your API endpoint
                                            title="Receipt/Struk Sales Preview"
                                            width="100%"
                                            height="470px"
                                            style={{ border: "none" }}
                                        />
                                </div>
                            </div>
                    } />
                </>
            } />
        </>
    )
}
export default FormHistory;