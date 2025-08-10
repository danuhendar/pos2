'use client'
import {  useEffect,  useRef,  useState } from "react";
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import {  AddID, GenerateUniqNumber, get_data_local_storage, get_format_tanggal_jam, GetToken, removeItemByValue, removeItemByValue_ForMultidimensi, removeItemOnceArray, validateNumber} from "@/lib/global";
import { useTranslation } from "react-i18next";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
import { Posts } from "@/lib/post";
import ButtonAdd from "../button/ButtonAdd";
import IconRefresh from "../Icon/IconRefresh";
import withReactContent from "sweetalert2-react-content";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import IconBox from "../Icon/IconBox";
import CardComponent from "../form/CardComponent";
import InputTextType from "../form/InputTypeText";
import TextAreaComponent from "../form/TextAreaComponent";
import DatePicker from "../datepicker/DatePicker";
import InputCheckBoxFilterType from "../form/InputCheckBoxFilterType";
import InputTextTypeKeyDown from "../form/InputTypeTextKeyDown";
import { DataTable } from "mantine-datatable";
import IconSave from "../Icon/IconSave";
import { set } from 'lodash';
interface FormReturProps {
    url: string,
    jenis: string,
    IDReport: string,
}
const FormRetur: React.FC<FormReturProps> = ({ url, jenis, IDReport }) => {
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const { t, i18n } = useTranslation();
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const [IconButton,setIconButton] = useState(<IconRefresh />)

    const [optionsItem,setoptionsItem] = useState([])
    const [optionsGerai,setOptionsGerai] = useState([])
    const [options6,setOptions6] = useState([])
    const [options7,setOptions7] = useState([])
    const [optionsGeraiMutasi,setOptionsGeraiMutasi] = useState([])
    const [IN_KODE_TRANSAKSI,setIN_KODE_TRANSAKSI] = useState('')
    const [IN_KETERANGAN,setIN_KETERANGAN] = useState('')
    const [IN_ASAL,setIN_ASAL] = useState('')
    const [IN_TUJUAN,setIN_TUJUAN] = useState('')
    const curdate = get_format_tanggal_jam().substring(0,16);
    const [date2, setDate2] = useState<any>(curdate);
    const [IN_NIK_PEMBUAT,setIN_NIK_PEMBUAT] = useState('')
    const [IN_RESULT_SELECTED_MANUAL,setIN_RESULT_SELECTED_MANUAL] = useState('')
    const [IN_QTY,setIN_QTY] = useState('')
    const [IN_METODE,setIN_METODE] = useState('')
    const [IN_METODE_RETUR,setIN_METODE_RETUR] = useState('9') // 9 = Retur to Supplier, 8 = Retur to Distribution Center   
    const [IN_BARCODE,setIN_BARCODE] = useState('')
    const [IN_RESULT_SCAN_KODE_BARANG,setIN_RESULT_SCAN_KODE_BARANG] = useState('')
    const [IN_RESULT_SCAN_DESKRIPSI,setIN_RESULT_SCAN_DESKRIPSI] = useState('')
    const [IN_RESULT_SCAN_SATUAN,setIN_RESULT_SCAN_SATUAN] = useState('')
    const [arr_input_item,setarr_input_item] = useState([])
    const [isCheck1,setisCheck1] = useState(false)
    const [isCheck2,setisCheck2] = useState(false)
    const [isCheck3,setisCheck3] = useState(false)
    const [isCheck4,setisCheck4] = useState(false)

    const MySwal = withReactContent(Swal);
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        GetMasterGerai(res_host,res_PORT_LOGIN)
        GetMasterSupplier(res_host,res_PORT_LOGIN)
        const InputNikPemohon = get_data_local_storage('nik');
        setIN_NIK_PEMBUAT(InputNikPemohon)
        const columns = Def_Column_Terima_Barang()
        setData_columns(columns)
        GetMasterCabang(res_host,res_PORT_LOGIN)
    },[]);

   
    const FormInputKodeTransaksi = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_KODE_TRANSAKSI(val);  };
    const FormInputKeterangan  = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_KETERANGAN(val);  };

    const FormInputKodeGeraiMutasi  = (value: any) => {var val = value.value;setIN_TUJUAN(val); GetMasterProdukByKodeProdukAndKodeGerai(val+"%") };
    const FormInputSupplier = (value: any) => {var val = value.value;setIN_ASAL(val);  };

    
    const FormInputNikPembuat = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_NIK_PEMBUAT(val);  };
    const FormInputItem = (value: any) => {var val = value.value;setIN_RESULT_SELECTED_MANUAL(val);   };
    const FormInputDC = (value: any) => {var val = value.value;setIN_ASAL(val);  };
    const FormInputSelectMetodeItem = (event: { target: { value: any; }; }) => {
        var val = event.target.value;setIN_METODE(val); 
        if(val === '1'){
            setisCheck3(true)
            setisCheck4(false)
        } else if(val === '0'){
            setisCheck3(false)
            setisCheck4(true)
        }
    };
    const FormInputSelectMetodeRetur = (event: { target: { value: any; }; }) => {
        var val = event.target.value;setIN_METODE_RETUR(val);  
        if(val === '9'){
            setisCheck1(true)
            setisCheck2(false)
        }else if(val === '8'){
            setisCheck1(false)
            setisCheck2(true)
        }
    };
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const KeyDown = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            // Move focus to input 2
            input2Ref.current.focus();
            GetMasterProdukByBarcode();
        }
    };
    const KeyDownQty = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            AddList()
            setIN_BARCODE('')
            setIN_QTY('')
            // Move focus to input 2
            input1Ref.current.focus();
        }
    };
    const FormInputScanBarcode = (event: { key: string; target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_BARCODE(val);
    };
    const FormInputQty  = (event: { target: { value: any; }; }) => {var val = event.target.value;const validate_number = validateNumber(val);setIN_QTY(validate_number);  };
    const FormInputResultScanKodeBarang = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_RESULT_SCAN_KODE_BARANG(val);  };
    const FormInputResultScanDeskripsi = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_RESULT_SCAN_DESKRIPSI(val);  };
    const FormInputResultScanSatuan = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_RESULT_SCAN_SATUAN(val);  };
     
    const GetMasterCabang = (in_host:string,in_port:number) => {
        setOptions7([])
        let url = `http://${in_host}:${in_port}/api/v2/GetMasterCabang`
        let param = {"":""}
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                var rows = data_body[0].ROWS
                var arr_ = []
                for(var i = 0;i<rows.length;i++){
                    const value_result = rows[i].KODE_CABANG
                    const obj = {"label":rows[i].CONTENT,"value":value_result}
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
    const GetMasterProdukByKodeProdukAndKodeGerai = (in_kode_gerai:string) => {
        setoptionsItem([])
        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetMasterProdukByKodeProdukAndKodeGerai`
        let param = {"IN_KODE_BARANG":"%","IN_KODE_GERAI":in_kode_gerai}
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                var arr_ = []
                for(var i = 0;i<data_body.length;i++){
                    const value_result = data_body[i].KODE_BARANG+"|"+data_body[i].CONTENT+"|"+data_body[i].SATUAN
                    const obj = {"label":data_body[i].CONTENT+"-"+data_body[i].SATUAN,"value":value_result}
                    arr_.push(obj)
                }
                setoptionsItem(arr_)
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

    const GetMasterSupplier = (in_host:string,in_port:number) => {
        setOptions6([])
        let url = `http://${in_host}:${in_port}/api/v2/GetMasterSupplier`
        let param = {"IN_KODE_SUPPLIER":"%"}
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
                    const obj = {"label":rows[i].CONTENT,"value":rows[i].KODE_SUPPLIER}
                    arr_.push(obj)
                }
                setOptions6(arr_)
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
    
    const GetMasterGerai = (in_host:string,in_port:number) => {
        setOptionsGerai([])
        setOptionsGeraiMutasi([])
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
                    const obj = {"label":rows[i].KODE_GERAI+'-'+rows[i].CONTENT,"value":rows[i].KODE_GERAI}
                    arr_.push(obj)
                }
                setOptionsGerai(arr_)
                setOptionsGeraiMutasi(arr_)
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

    const GetMasterProdukByBarcode = async () => {
        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetMasterProdukByBarcode`
        let param = {"IN_BARCODE":IN_BARCODE,"IN_KODE_GERAI":IN_TUJUAN}
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                if(data_body.length === 1)
                {
                    setIN_RESULT_SCAN_KODE_BARANG(data_body[0].KODE_BARANG)
                    setIN_RESULT_SCAN_DESKRIPSI(data_body[0].CONTENT)
                    setIN_RESULT_SCAN_SATUAN(data_body[0].SATUAN)
                    
                }else if(data_body.length > 1){
                     MySwal.fire({
                        title: t("Data Item More Than 1, Check Item or Select Item Manually"),
                        toast: true,
                        position: isRtl ? 'top-start' : 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        showCloseButton: true,
                        customClass: {
                            popup: `color-warning`,
                        },
                    });
                }else{
                     MySwal.fire({
                        title: t("Data Empty"),
                        toast: true,
                        position: isRtl ? 'top-start' : 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        showCloseButton: true,
                        customClass: {
                            popup: `color-warning`,
                        },
                    });
                }
              
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

    const AddList = () => {
        try{
            const metode_input = IN_METODE
            if(metode_input === "1"){
                //-- scan barcode --//
                const res_kode_barang = IN_RESULT_SCAN_KODE_BARANG
                const res_satuan = IN_RESULT_SCAN_SATUAN
                const res_deskripsi = IN_RESULT_SCAN_DESKRIPSI
                const res_qty = IN_QTY
                if(res_kode_barang !== ''){
                    const obj = {"IN_KODE_BARANG":res_kode_barang,"IN_DESKRIPSI":res_deskripsi,"IN_SATUAN":res_satuan,"IN_QTY":res_qty}
                    arr_input_item.push(obj)
                }else{

                }
            }else{
                //-- input manual --//
                const result_selected_manual = IN_RESULT_SELECTED_MANUAL.split('|')
                const res_kode_barang = result_selected_manual[0] 
                const res_satuan = result_selected_manual[2]
                const res_deskripsi = result_selected_manual[1]
                const res_qty = IN_QTY
                const obj = {"ACTION":GenerateUniqNumber(),"IN_KODE_BARANG":res_kode_barang,"IN_DESKRIPSI":res_deskripsi,"IN_SATUAN":res_satuan,"IN_QTY":res_qty}
                arr_input_item.push(obj)
            }
            const res_rows = AddID(arr_input_item)
            setData_rows(res_rows)
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }
    }

    const deleteRow = (idToRemove: number) => {
        setData_rows((prev) => prev.filter((data_rows) => data_rows.id !== idToRemove));
    };    

    const Def_Column_Terima_Barang = () => {
        var cols = [
                {
                    accessor: 'ACTION',
                    title: 'ACTION',
                    render: (row:any) => (
                    <button className="text-danger"
                        onClick={() => deleteRow(row.id)}
                    >
                        {t('Delete')}
                    </button>
                    ),
                },
                {
                    accessor: 'id',
                    title: 'ID'
                },
                {
                    accessor: 'IN_KODE_BARANG',
                    title: 'CODE ITEM'
                },
                {
                    accessor: 'IN_DESKRIPSI',
                    title: 'DESCRIPTION'
                },
                {
                    accessor: 'IN_SATUAN',
                    title: 'SATUAN'
                },
                {
                    accessor: 'IN_QTY',
                    title: 'QTY'
                },
            ];
            return  cols;
    }

    const GetGenerateKodeTransaksiInventory = () => {
        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetGenerateKodeTransaksiInventory`
        let param = {}
        const Token = GetToken()
        return new Promise((resolve,reject)=>{
            Posts(url,JSON.stringify(param),false,Token).then((response) => {
                const res_data = response;
                var code = res_data.code;
                var msg = res_data.msg;
                if(parseFloat(code) === 200){
                    var data_body = res_data.data;
                    if(data_body.length === 1)
                    {
                        resolve(data_body[0].KODE_TRANSAKSI)
                    }else{
                       reject()
                    }
                }
            }).catch((error) => {
                reject(error)
            });
        });
        
    }

    const InsPosTransaksiInventory = () =>{
        Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+" "+t("save data")+" ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    GetGenerateKodeTransaksiInventory().then((d)=>{
                        const kode_transaksi_inventory = d;
                        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/InsPosTransaksiInventory`
                        const date = new Date(date2)
                        const tahun = date.getFullYear()
                        const bulan = date.getMonth()
                        let param = {"IN_KODE_TRANSAKSI":kode_transaksi_inventory,"IN_JENIS":IN_METODE_RETUR,"IN_KETERANGAN":IN_KETERANGAN,"IN_ASAL":IN_TUJUAN,"IN_TUJUAN":IN_ASAL,"IN_TANGGAL":date2,"IN_TAHUN":tahun,"IN_BULAN":bulan,"IN_IS_STATUS":1,"IN_OTORISATOR":"POSAPP","IN_NIK_PEMBUAT":IN_NIK_PEMBUAT,"IN_DETAIL":data_rows}
                        console.log(JSON.stringify(param))
                        const Token = GetToken()
                        setLoadingButton(true)
                        setisDisabled(true) 
                        Posts(url,JSON.stringify(param),false,Token).then((response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            if(parseFloat(code) === 200){
                                Swal.fire({
                                    title: t("Information"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "success",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                setLoadingButton(false)
                                setisDisabled(false) 
                                setData_rows([])
                                setIN_KETERANGAN('')
                                setIN_RESULT_SCAN_KODE_BARANG('')
                                setIN_RESULT_SCAN_DESKRIPSI('')
                                setIN_RESULT_SCAN_SATUAN('')
                                setIN_RESULT_SELECTED_MANUAL('')
                                setarr_input_item([])
                                setisCheck1(false)
                                setisCheck2(false)
                                setisCheck3(false)
                                setisCheck4(false)
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
                            }
                        }).catch((error) => {
                            Swal.fire({
                                title: t("Warning"),
                                text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setLoadingButton(false)
                            setisDisabled(false)
                        });
                    }).catch((e)=>{
                        Swal.fire({
                            title: t("Warning"),
                            text: "401-Error : Generate Kode, Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoadingButton(false)
                        setisDisabled(false)
                    })
                }
        });
    }

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                    <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconBox />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={"Input Received Item"} in_content={
                        <>
                        <InputTextType   in_title={"Code Transaction"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputKodeTransaksi} in_value={IN_KODE_TRANSAKSI} />
                        <TextAreaComponent in_title={"Description"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} isDisabled={false} event={FormInputKeterangan} in_value={IN_KETERANGAN} in_rows={4} in_cols={30} />
                    
                        <InputCheckBoxFilterType isCheck_1={isCheck1} isCheck_2={isCheck2}  event={FormInputSelectMetodeRetur} in_title={"Type Retur"} in_value_1={"9"} in_value_2={"8"} in_name_1={"Retur to Supplier"} in_name_2={"Retur to Distribution Center"} in_name_component_1={"is_tipe_retur"} in_name_component_2={"is_tipe_retur"} />                
                        
                        <div className="grid gap-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 ">
                            <div>
                            <DropDownGlobal in_is_clear={false}in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={optionsGerai} isSearchable={true} isMulti={false} event={FormInputKodeGeraiMutasi} name_component={"Gerai"} idComponent={"gerai"} />
                            </div>
                            <div>
                                {
                                    IN_METODE_RETUR === '8' ? 
                                    <DropDownGlobal in_is_clear={false}in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options7} isSearchable={true} isMulti={false} event={FormInputDC} name_component={"Distribution Center"} idComponent={"DC"} />
                                    :
                                    <DropDownGlobal in_is_clear={false}in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options6} isSearchable={true} isMulti={false} event={FormInputSupplier} name_component={"Supplier"} idComponent={"supplier"} />
                                }
                            </div>
                            
                        </div>

                        <div className="grid gap-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 ">
                            <div>
                            <DatePicker is_time_24hr={true} in_mode={'single'} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg"} event={(date2) => setDate2(date2)} name_component={"Date"} idComponent={"txt_date"} isRtl={isRtl} in_date={date2} isEnableTime={true} date_format={"Y-m-d H:i"} />
                            </div>
                            <div>
                            <InputTextType in_title={"Operator"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputNikPembuat} in_value={IN_NIK_PEMBUAT} />
                            </div>
                        </div>
                        <InputCheckBoxFilterType isCheck_1={isCheck3} isCheck_2={isCheck4}  event={FormInputSelectMetodeItem} in_title={"Metode Input"} in_value_1={"1"} in_value_2={"0"} in_name_1={"Scan"} in_name_2={"Select Item"} in_name_component_1={"is_metode"} in_name_component_2={"is_metode"} />                
                        <div className="grid gap-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 ">
                            <div className={IN_METODE === '1' ? "" : "hidden"}>
                            <InputTextTypeKeyDown in_title={"Scan Barcode"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputScanBarcode} in_value={IN_BARCODE} in_ref={input1Ref} in_event_keydown={KeyDown} />
                            </div>
                            <div className={IN_METODE === '0' ? "" : "hidden"}>
                            <DropDownGlobal in_is_clear={false}in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={optionsItem} isSearchable={true} isMulti={false} event={FormInputItem} name_component={"Item"} idComponent={"item"} />
                            </div>
                            <div className={IN_METODE === '' ? "hidden" : ""}>
                                <InputTextTypeKeyDown in_title={"Qty"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={false} event={FormInputQty} in_value={IN_QTY} in_ref={input2Ref} in_event_keydown={KeyDownQty} />                        
                            </div>
                            <InputTextType in_title={"Kode Barang"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputResultScanKodeBarang} in_value={IN_RESULT_SCAN_KODE_BARANG}/>
                            <InputTextType in_title={"Deskripsi"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputResultScanDeskripsi} in_value={IN_RESULT_SCAN_DESKRIPSI}/>
                            <InputTextType in_title={"Satuan"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputResultScanSatuan} in_value={IN_RESULT_SCAN_SATUAN}/>
                        </div>
                        <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Add'} HandleClick={AddList} />
                        <div className="mt-6 panel rounded-3xl">
                            <div id="dt" className="datatables">
                                    <DataTable
                                        noRecordsText="No results match your search query"
                                        highlightOnHover
                                        className="table-hover whitespace-nowrap"
                                        records={data_rows}
                                        columns={data_columns}
                                        minHeight={200}
                                    />
                            </div>
                        </div>
                        <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_save"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSave />} in_title_button={'Save'} HandleClick={InsPosTransaksiInventory} />                             
                      </>
                    } />
                </>
            } />
        </>
    )
}
export default FormRetur;