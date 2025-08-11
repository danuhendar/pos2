'use client'
import {   useEffect,  useRef,  useState } from "react";
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import {   AddID, GenerateUniqNumber, get_data_local_storage, get_dateTimeDiff_second, get_format_tanggal_jam, get_format_tanggal_jam_format_indo, GetFormatCurrency, GetID, GetToken, groupByValueAndCount, summarizeJSONObjectByValue, validateNumber} from "@/lib/global";
import { useTranslation } from "react-i18next";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
import { Posts } from "@/lib/post";
import ButtonAdd from "../button/ButtonAdd";
import IconRefresh from "../Icon/IconRefresh";
import withReactContent from "sweetalert2-react-content";
import CardComponent from "../form/CardComponent";
import InputTextType from "../form/InputTypeText";
import { DataTable } from "mantine-datatable";
import IconLogin from "../Icon/IconLogin";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import DatePicker from "../datepicker/DatePicker";
import IconSave from "../Icon/IconSave";
import IconChecks from "../Icon/IconChecks";
import IconX from "../Icon/IconX";
import IconShoppingCart from "../Icon/IconShoppingCart";
import { useRouter } from "next/router";
import IconPlus from "../Icon/IconPlus";
import IconPlusCircle from "../Icon/IconPlusCircle";
import { Button } from "@mui/base";
import IconBox from "../Icon/IconBox";
import IconCreditCard from "../Icon/IconCreditCard";
import IconSend from "../Icon/IconSend";
import InputTextTypeKeyDown from "../form/InputTypeTextKeyDown";
import { Input } from "postcss";
import IconDollarSignCircle from "../Icon/IconDollarSignCircle";
import { set } from "lodash";
import ModalComponent from "../modal/ModalComponent";
import ComponentsDatatablesAdvanced from "../table/ComponentsDatatablesAdvanced";
import IconXCircle from "../Icon/IconXCircle";
import IconCopy from "../Icon/IconCopy";
import IconTrash from "../Icon/IconTrash";
import { useReactToPrint } from 'react-to-print';
import Receipt from "./PrintReceipt";
import IconPrinter from "../Icon/IconPrinter";
import Select from 'react-select';

interface FormSalesProps {
    url: string,
    jenis: string,
    IDReport: string,
}
const FormSales: React.FC<FormSalesProps> = ({ url, jenis, IDReport }) => {
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const { t, i18n } = useTranslation();
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const [IconButton,setIconButton] = useState(<IconRefresh />)
    const [IN_NIK_PEMBUAT,setIN_NIK_PEMBUAT] = useState('')
    const [IN_NAMA_PEMBUAT,setIN_NAMA_PEMBUAT] = useState('')
    const [OptionShift,setOptionShift] = useState([
        { value: '1', label: 'Shift 1' },
        { value: '2', label: 'Shift 2' },
        { value: '3', label: 'Shift 3' }
    ]);
    const [IN_SHIFT,setIN_SHIFT] = useState('')
    const curdate = get_format_tanggal_jam().substring(0,16)
    const [date2, setDate2] = useState<any>(curdate)
    


    const [OptionsGerai,setOptionsGerai] = useState([])
    const [IN_BARCODE,setIN_BARCODE] = useState('')
    const [IN_KODE_GERAI,setIN_KODE_GERAI] = useState('')
    const [IN_IS_GERAI,setIN_IS_GERAI] = useState('')
    const [arr_input_item, setarr_input_item] = useState([]);
    const [IN_KODE_BARANG,setIN_KODE_BARANG] = useState('')
    const [IN_DESKRIPSI,setIN_DESKRIPSI] = useState('')
    const [IN_SATUAN,setIN_SATUAN] = useState('')
    const [IN_QTY,setIN_QTY] = useState('')
    const [IN_HPP,setIN_HPP] = useState('')
    const [IN_GROSS,setIN_GROSS] = useState('')
    const [IN_KODE_INITIAL,setIN_KODE_INITIAL] = useState('')
    const [OptionMetodePembayaran,setOptionMetodePembayaran] = useState([])
    const [IN_METODE_PEMBAYARAN,setIN_METODE_PEMBAYARAN] = useState('')
    const [IN_TOTAL_BELANJA,setIN_TOTAL_BELANJA] = useState('')
    const [IN_BAYAR,setIN_BAYAR] = useState('')
    const [IN_KEMBALIAN,setIN_KEMBALIAN] = useState('')
    const [IN_GENERATE_KODE_TRANSAKSI_INVENTORY,setIN_GENERATE_KODE_TRANSAKSI_INVENTORY] = useState('')
    const [OptionBank,setOptionBank] = useState([])

    const [IN_BANK,setIN_BANK] = useState('')
    const [TotalBelanja,setTotalBelanja] = useState('0')
    const [TotalPPN,setTotalPPN] = useState('0')
    const [BiayaOngkir,setBiayaOngkir] = useState('0')
    const [DiskonMarketPlace,setDiskonMarketPlace] = useState('0')
    const [TotalDiscount,setTotalDiscount] = useState('0')
    const [GrandTotal,setGrandTotal] = useState('0')
    const [IN_DISKON,setIN_DISKON] = useState('0')
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const MySwal = withReactContent(Swal);
    const router = useRouter();
    const [modal13, setModal13] = useState(false);
    const [Title, setTitle] = useState('Master Produk');
    const [data_rows_produk, setData_rows_produk] = useState([]);
    const [data_columns_produk, setData_columns_produk] = useState([]);
    const [LoadingButtonPayment,setLoadingButtonPayment] = useState(false)
    const [isDisabledButtonPayment,setisDisabledButtonPayment] = useState(false)
    const [IN_NIK_INITIAL,setIN_NIK_INITIAL] = useState('')
    const [IN_NAMA_INITIAL,setIN_NAMA_INITIAL] = useState('')
    const [IN_UANG_MODAL,setIN_UANG_MODAL] = useState('')
    const [IN_UANG_LACI,setIN_UANG_LACI] = useState('')
    const [LoadingButtonSubmit,setLoadingButtonSubmit] = useState(false)
    const [isDisabledButtonSubmit,setisDisabledButtonSubmit] = useState(false)
    const [IN_SHIFT_INITIAL,setIN_SHIFT_INITIAL] = useState('')
    const [IN_IS_CASH,setIN_IS_CASH] = useState(false)
    const [IN_ALAMAT,setIN_ALAMAT] = useState('')
    const [IN_NAMA_GERAI,setIN_NAMA_GERAI] = useState('')
    const receiptRef = useRef();
    const [dummyData, setDummyData] = useState({
        items: []
    });

    const [isEnabledContentSales, setIsEnabledContentSales] = useState(false);
    const [is_clear_metode_pembayaran, setIsClearMetodePembayaran] = useState(true);
    const [is_clear_bank, setIsClearBank] = useState(true);
    const [IN_NO_WHATSAPP,setIN_NO_WHATSAPP] = useState('')

    const defaultOption = { value: "", label: "-- Select Method --" }; // Your default
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const defaultOptionVia = { value: "", label: "-- Select Via --" }; // Your default
    const [selectedBankOption, setSelectedBankOption] = useState(defaultOptionVia);



    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        const InputNikPemohon = get_data_local_storage('nik');
        setIN_NIK_PEMBUAT(InputNikPemohon)
        setIN_NIK_INITIAL(InputNikPemohon)
        const InputNamaPemohon = get_data_local_storage('nama');
        setIN_NAMA_PEMBUAT(InputNamaPemohon)
        setIN_NAMA_INITIAL(InputNamaPemohon)
        const is_gerai = get_data_local_storage('is_gerai');
        setIN_IS_GERAI(is_gerai)
       
        const kode_gerai = get_data_local_storage('kode_gerai');
        setIN_KODE_GERAI(kode_gerai)
        if(is_gerai === '1'){
            GetPosInitialByKodeGerai(res_host,res_PORT_LOGIN,kode_gerai)
            GetMasterGeraiByKodeGerai(res_host,res_PORT_LOGIN,kode_gerai);
        }else{
           
        }
        const columns = Def_Column_Transaksi_Inventory()
        setData_columns(columns)
        GetMasterGerai(res_host,res_PORT_LOGIN)
        GetMasterKategoriPembayaran(res_host,res_PORT_LOGIN);
        const column_master_produk = Def_Column_Master_Produk()
        setData_columns_produk(column_master_produk)
    },[]);

   
    const FormInputKodeGeraiMutasi  = (value: any) => {
        var val = value.value; 
        var sp_val = val.split('|'); 
        var kode_gerai = sp_val[0]; 
        setIN_KODE_GERAI(kode_gerai); 
        var nama_gerai = sp_val[1]; 
        setIN_NAMA_GERAI(nama_gerai); 
        var alamat = sp_val[2]; 
        setIN_ALAMAT(alamat); 
        if(IDReport === 'Initial'){

        }else{
            GetPosInitialByKodeGerai(IN_HOST,IN_PORT,kode_gerai)
        }
        
    };
    const FormInputInitialCode = (event: { target: { value: any; }; }) => {var val = event.target.value; setIN_KODE_INITIAL(val); };
    const FormInputAlamat  = (event: { target: { value: any; }; }) => {var val = event.target.value; setIN_ALAMAT(val); };
    const FormInputItem = (value: any) => {var val = value.target.value;setIN_BARCODE(val); };
    const FormInputDeskripsi = (value: any) => {var val = value.target.value;setIN_DESKRIPSI(val); };
    const FormInputSatuan = (value: any) => {var val = value.target.value;setIN_SATUAN(val); };
    const FormInputQty  = (event: { target: { value: any; }; }) => {var val = event.target.value;const validate_number = validateNumber(val);setIN_QTY(validate_number);  };
    const FormInputHPP = (value: any) => {var val = value.target.value;setIN_HPP(val); };
    const FormInputGross = (value: any) => {var val = value.target.value;setIN_GROSS(val); };
    const FormInputMetodePembayaran = (value: any) => {
        console.log('val metode pembayaran : '+value.value)
        var val = value.value;
       
        if(val === null){
            console.log('kondisi null')
        }else{
            setSelectedOption(value);
            setIN_METODE_PEMBAYARAN(val);
            GetMasterPembayaran(val);
            if(val === 'CASH'){
                // Do something for cash payment
                setIN_IS_CASH(true)
                setIN_BANK('CASH')
            }else{
                setIN_IS_CASH(false)
            }
        }
        
    };
    const FormInputKodeBarang = (value: any) => {var val = value.target.value;setIN_KODE_BARANG(val); };
    const FormInputTotalBelanja = (value: any) => {var val = value.target.value;setIN_TOTAL_BELANJA(val); };
    const FormInputDiskonMarketPlace = (value: any) => {
        var val = value.target.value;const validate_number = validateNumber(val); const val_currency = GetFormatCurrency(validate_number); setDiskonMarketPlace(val_currency);
        const res_grand_total_final = parseFloat(TotalBelanja.split(',').join('')) 
                                        - parseFloat(TotalDiscount.split(',').join(''))
                                        - parseFloat((val === '' ? '0' : val.split(',').join('') ) )
                                        + parseFloat((BiayaOngkir === '' ? '0' : BiayaOngkir.split(',').join('') ) )
        setGrandTotal(isNaN(res_grand_total_final) ? '0' : GetFormatCurrency(res_grand_total_final.toString()));
    }
    const FormInputBiayaOngkir = (value: any) => {
        var val = value.target.value;
        const validate_number = validateNumber(val);
        const val_currency = GetFormatCurrency(validate_number);
        //console.log(val_currency);
        setBiayaOngkir(val_currency === '' ? '0' : val_currency);
        const res_grand_total_final = parseFloat(TotalBelanja.split(',').join('')) 
                                        - parseFloat(TotalDiscount.split(',').join('')) 
                                        - parseFloat(DiskonMarketPlace.split(',').join('')) 
                                        + parseFloat(val.split(',').join(''))

        setGrandTotal(isNaN(res_grand_total_final) ? '0' : GetFormatCurrency(res_grand_total_final.toString()));
        //-- calculate bayar --//
        const bayar = parseFloat(IN_BAYAR.split(',').join(''))
        const grand_total = parseFloat(GrandTotal.split(',').join(''))
        if(bayar < grand_total){
            MySwal.fire({
                title: t("Payment must be greater than or equal to the Grand Total"),
                toast: true,
                position: isRtl ? 'top-start' : 'top-end',
                showConfirmButton: false,
                timer: 5000,
                showCloseButton: true,
                customClass: {
                    popup: `color-warning`,
                },
            });
            setIN_KEMBALIAN('0');
            setisDisabledButtonPayment(true)
            return;
        }else{
            const res_kembalian = bayar - grand_total;
            //console.log('res_kembalian : '+res_kembalian)
            setIN_KEMBALIAN(GetFormatCurrency(res_kembalian.toString()));
            setisDisabledButtonPayment(false)
        }
    }
    const FormInputBayar = (value: any) => {var val = value.target.value;const validate_number = validateNumber(val); const val_currency = GetFormatCurrency(validate_number);
        setIN_BAYAR(val_currency); 
        const bayar = parseFloat(val_currency.split(',').join(''))
        const grand_total = parseFloat(GrandTotal.split(',').join(''))
        if(bayar < grand_total){
            MySwal.fire({
                title: t("Payment must be greater than or equal to the Grand Total"),
                toast: true,
                position: isRtl ? 'top-start' : 'top-end',
                showConfirmButton: false,
                timer: 5000,
                showCloseButton: true,
                customClass: {
                    popup: `color-warning`,
                },
            });
            setIN_KEMBALIAN('0');
            setisDisabledButtonPayment(true)
            return;
        }else{
            const res_kembalian = bayar - grand_total;
            //console.log('res_kembalian : '+res_kembalian)
            setIN_KEMBALIAN(GetFormatCurrency(res_kembalian.toString()));
            setisDisabledButtonPayment(false)
        }
       
    }
    const FormInputKembalian = (value: any) => {var val = value.target.value;setIN_KEMBALIAN(val); };
    const FormInputBank = (value: any) => {
        var val = value.value;
        setIN_BANK(val); 
        setSelectedBankOption(value);
    };
    const FormInputDiskon = (value: any) => {var val = value.target.value;const validate_number = validateNumber(val); const val_currency = GetFormatCurrency(validate_number); setIN_DISKON(val_currency); };
    const FormInputNikInitial = (value: any) => {var val = value.target.value;setIN_NIK_INITIAL(val); };
    const FormInputNamaInitial = (value: any) => {var val = value.target.value;setIN_NAMA_INITIAL(val); };
    const FormInputUangModal = (value: any) => {var val = value.target.value;const validate_number = validateNumber(val); const val_currency = GetFormatCurrency(validate_number); setIN_UANG_MODAL(val_currency); };
    const FormInputUangLaci = (value: any) => {var val = value.target.value;const validate_number = validateNumber(val); const val_currency = GetFormatCurrency(validate_number);setIN_UANG_LACI(val_currency); };
    const FormInputShiftInitial = (value: any) => {var val = value.value;setIN_SHIFT_INITIAL(val); };
    const FormInputNoWhatsApp = (value: any) => {var val = value.target.value;setIN_NO_WHATSAPP(val); };
    const SubmitPayment = () => {
        input4Ref.current.focus();
    }
    const KeyItem = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            // Move focus to input 2
            input2Ref.current.focus();
            GetMasterProdukByBarcode();
        }
    }
    const CopyText = (Text:string) => {
        navigator.clipboard.writeText(Text);
        MySwal.fire({
            title: "Text was copied!",
            toast: true,
            position: isRtl ? 'top-start' : 'top-end',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
            customClass: {
                popup: `color-success`,
            },
        });
    }

    const GetMasterPembayaran = (in_val:string) => {
        setOptionBank([])
        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetMasterPembayaran`
        let param = {"IN_KODE_KATEGORI":in_val,"IN_KODE_BAYAR":"%"}
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                var rows = data_body[0].ROWS;
                var arr_ = []
                arr_.push({"label":"-- Select Option --","value":""})
                for(var i = 0;i<rows.length;i++){
                    const obj = {"label":rows[i].CONTENT,"value":rows[i].CONTENT}
                    arr_.push(obj)
                }
                setOptionBank(arr_)
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
    const GetMasterKategoriPembayaran = (in_host:string,in_port:number) => {
        setOptionMetodePembayaran([])
        let url = `http://${in_host}:${in_port}/api/v2/GetMasterKategoriPembayaran`
        let param = {"IN_KODE_KATEGORI":"%"}
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                var rows = data_body[0].ROWS;
                var arr_ = []
                arr_.push({"label":"-- Select Option --","value":""})
                for(var i = 0;i<rows.length;i++){
                    const obj = {"label":rows[i].CONTENT,"value":rows[i].KODE_KATEGORI}
                    arr_.push(obj)
                }
                setOptionMetodePembayaran(arr_)
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
                    const obj = {"label":rows[i].KODE_GERAI+'-'+rows[i].CONTENT,"value":rows[i].KODE_GERAI+'|'+rows[i].CONTENT+'|'+rows[i].ALAMAT}
                    arr_.push(obj)
                }
                setOptionsGerai(arr_)
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
    const GetMasterGeraiByKodeGerai = (in_host:string,in_port:number,in_kode_gerai:string) => {
       
        let url = `http://${in_host}:${in_port}/api/v2/GetMasterGeraiByKodeGerai`
        let param = {"IN_KODE_GERAI":in_kode_gerai}
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                setIN_ALAMAT(data_body[0].ALAMAT)
                
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
    const GetMasterProdukByBarcode = () => {
        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetMasterProdukByBarcode`
        let param = {"IN_BARCODE":IN_BARCODE,"IN_KODE_GERAI":IN_KODE_GERAI}
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token).then(async (response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                if(data_body.length === 1)
                {
                    setIN_KODE_BARANG(data_body[0].KODE_BARANG)
                    setIN_DESKRIPSI(data_body[0].CONTENT)
                    setIN_SATUAN(data_body[0].SATUAN)
                    setIN_HPP(data_body[0].HPP)
                    setIN_GROSS(data_body[0].GROSS)
                    setIN_QTY('1')
                    AddList(data_body[0].KODE_BARANG,data_body[0].SATUAN,data_body[0].CONTENT,'1',data_body[0].HPP,data_body[0].GROSS,IN_DISKON === '' ? '0' : IN_DISKON.split(',').join(''));
                    setIN_KODE_BARANG('')
                    setIN_DESKRIPSI('')
                    setIN_SATUAN('')
                    setIN_QTY('')
                    setIN_HPP('')
                    setIN_GROSS('')
                    setIN_BARCODE('')
                    setIN_DISKON('')
                    input1Ref.current.focus();
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
    const GetPosInitialByKodeGerai = (in_host:string,in_port:number,in_kode_gerai:string) => {
        try{
            let url = `http://${in_host}:${in_port}/api/v2/GetPosInitialByKodeGerai`
            let param = {"IN_KODE_GERAI":in_kode_gerai,"IN_SHIFT":IN_SHIFT,"IN_TANGGAL":get_format_tanggal_jam().substring(0,10)}
            const Token = GetToken()
            setLoadingButton(true)
            setisDisabled(true)
            Posts(url,JSON.stringify(param),false,Token).then((response) => {
                const res_data = response;
                console.log(res_data)
                var code = res_data.code;
                var msg = res_data.msg;
                if(parseFloat(code) === 200){
                    var data_body = res_data.data;
                    if(data_body.length > 0){
                       setIN_KODE_INITIAL(data_body[0].KODE_INITIAL)
                       setIN_SHIFT(data_body[0].SHIFT)
                       setIsEnabledContentSales(true)
                    }else{
                        Swal.fire({
                            title: t("Warning"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        router.push('/apps/sales/initial/')
                    }
                    
                    setLoadingButton(false)
                    setisDisabled(false)
                }else if(code.toString().substring(0,1) === '4'){
                    if(code === 401 && msg.includes("Invalid")){
                        Swal.fire({
                            title: t("Warning"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    }else if(code === 403){
                        if(IN_SHIFT === ''){
                            MySwal.fire({
                                title: t(""+parseFloat(code)+"-"+msg),
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
                                title: t("Data initial for shift "+IN_SHIFT+" not found!"),
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
                        //router.push('/apps/sales/closing_shift/')
                        setIsEnabledContentSales(false)
                        
                    }else{
                        // Swal.fire({
                        //     title: t("Warning"),
                        //     text: ""+parseFloat(code)+"-"+msg,
                        //     icon: "warning",
                        //     padding: '2em',
                        //     customClass: 'sweet-alerts'
                        // });
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
            });
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

    const recalculateTotals = (IN_DATA_ROWS:any) => {
        
        //-- summary --//
        // Filter hanya data dengan PRICE valid
        const valid_price = IN_DATA_ROWS.filter((item: { PRICE: number; }) => item.PRICE !== null && !isNaN(item.PRICE));
        // Hitung total harga (PRICE * QTY)
        const res_grand_total = valid_price.reduce((acc: number, item: { PRICE: string; }) => {
            const price = parseFloat(item.PRICE);
            return acc + price;
        }, 0);
        //console.log('res_grand_total : ',res_grand_total)
        // Hitung total diskon
        const valid_diskon = IN_DATA_ROWS.filter((item: { DISKON: number; }) => item.DISKON !== null && !isNaN(item.DISKON));
        const res_total_diskon = valid_diskon.reduce((acc: number, item: { DISKON: string; }) => {
            const diskon = parseFloat(item.DISKON);
            return acc + diskon;
        }, 0);
        //console.log('res_total_diskon : ',res_total_diskon)
        const res_subtotal =  res_grand_total + res_total_diskon
        const res_grand_total_final = res_grand_total + parseFloat(BiayaOngkir.split(',').join(''))
        //console.log('res_subtotal : ',res_subtotal)
        setTotalBelanja(GetFormatCurrency(res_subtotal.toString()))
        setTotalDiscount(GetFormatCurrency(res_total_diskon.toString()))
        setGrandTotal(GetFormatCurrency(res_grand_total_final.toString()))
    };
    const deleteRow = (idToRemove: number) => {
        setData_rows((prev) => {
            const updated = prev.filter((row) => row.id !== idToRemove);
            recalculateTotals(updated); // recalculate after filtering
            return updated;
        });
        setarr_input_item((prev) => {
            const updated = prev.filter((item) => item.id !== idToRemove); 
            return updated;
        });
    };    
    const Def_Column_Transaksi_Inventory = () => {
        var cols = [
                {
                    accessor: 'ACTION',
                    title: '#',
                    render: (row:any) => (
                    <button className="text-danger"
                        onClick={() => deleteRow(row.id)}
                    >
                        <IconTrash />
                    </button>
                    ),
                },
                {
                    accessor: 'KODE_BARANG',
                    title: 'CODE ITEM',
                },
                {
                    accessor: 'DESKRIPSI',
                    title: 'DESCRIPTION'
                },
                {
                    accessor: 'SATUAN',
                    title: 'SATUAN'
                },
                {
                    accessor: 'QTY',
                    title: 'QTY',
                },
                {
                    accessor: 'GROSS',
                    title: 'GROSS'
                },
                {
                    accessor: 'DISKON',
                    title: 'DISCOUNT',
                },
                {
                    accessor: 'PRICE',
                    title: 'AMOUNT'
                },
               
            ];
            return  cols;
    }

    const Def_Column_Master_Produk = () => {
        var cols = [
                {
                    accessor: 'id',
                    title: 'ID',
                    sortable: true,
                    render: ({ id }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{id}</div>
                        </div>
                    ),
                },
                
                {
                    accessor: 'KATEGORI',
                    title: 'CATEGORY',
                    sortable: true,
                    render: ({ KATEGORI }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{KATEGORI}</div>
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
                    accessor: 'CONTENT',
                    title: 'DESCRIPTION',
                    sortable: true,
                    render: ({ CONTENT }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{CONTENT}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'SUPPLIER',
                    title: 'SUPPLIER',
                    sortable: true,
                    render: ({ SUPPLIER }) => (
                        <div className="flex items-center gap-2">
                            {/* <div>
                                <a onClick={()=> CopyText(NO_HP)}><IconCopy className="text-primary"/></a>
                            </div> */}
                            <div className="font-semibold">{SUPPLIER}</div>
                            
                        </div>
                    ),
                },
                {
                    accessor: 'SATUAN',
                    title: 'SATUAN',
                    sortable: true,
                    render: ({ SATUAN }) => (
                        <div className="flex items-center gap-2">
                            {/* <div className="font-semibold">{SATUAN}</div> */}
                            <span className={`badge badge-outline-${SATUAN === 'KARTON' ? 'success' : 'danger'} `}>{SATUAN}</span>
                        </div>
                    ),
                },
                {
                    accessor: 'VARIAN',
                    title: 'VARIAN',
                    sortable: true,
                    render: ({ VARIAN }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{VARIAN}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'BARCODE',
                    title: 'BARCODE',
                    sortable: true,
                    render: ({ BARCODE }) => (
                        <div className="flex items-center gap-2">
                            <div>
                                <a onClick={()=> CopyText(BARCODE)}><IconCopy className="text-primary"/></a>
                            </div>
                            <div className="font-semibold">{BARCODE}</div>
                            
                        </div>
                    ),
                },
            ];
            return  cols;
    }

    const CreateNewOrder = () => {
        setarr_input_item([])
        //setIN_METODE_PEMBAYARAN(null)
        setSelectedOption(defaultOption); // 🔹 reset state
        setSelectedBankOption(defaultOptionVia);
        setData_rows([])
        setIN_BARCODE('')
        setIN_KODE_BARANG('')
        setIN_DESKRIPSI('')
        setIN_SATUAN('')
        setIN_QTY('')
        setIN_HPP('')
        setIN_GROSS('')
        setIN_DISKON('')
        setTotalBelanja('0')
        setTotalDiscount('0')
        setGrandTotal('0')
        setIN_TOTAL_BELANJA('')
        setIN_BAYAR('')
        setIN_KEMBALIAN('')
        setBiayaOngkir('0')
        setIN_BANK('')
        setIN_METODE_PEMBAYARAN('')
        setIN_SHIFT('')
        setDiskonMarketPlace('0')
        setIN_BARCODE('')
        setIN_GENERATE_KODE_TRANSAKSI_INVENTORY('')
        try{
            input1Ref.current.focus();
        }catch(Ex){
            console.log('input1Ref not found')
        }
        MySwal.fire({
            title: t("Please, Input New Order!"),
            toast: true,
            position: isRtl ? 'top-start' : 'top-end',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: true,
            customClass: {
                popup: `color-success`,
            },
        });
        
    }

    const AddList = (res_kode_barang:string,res_satuan:string,res_deskripsi:string,res_qty:string,res_hpp:string,res_gross:string,res_diskon:string) => {
        try{
            //-- scan barcode --//
            const objIndex = data_rows.findIndex(((obj: { KODE_BARANG: any; }) => obj.KODE_BARANG == res_kode_barang));
            var qty_before = 0
            try{
                qty_before  = parseFloat(data_rows[objIndex].QTY.split(',').join(''));
            }catch(Ex){
                qty_before = 0
            }
            
            res_qty = (parseFloat(res_qty.split(',').join('')) + qty_before).toString();
            const res_amount = (parseFloat(res_qty.split(',').join('')) * parseFloat(res_gross.split(',').join('')) ) - parseFloat(res_diskon.split(',').join(''));
            
            // console.log('objIndex',objIndex)
            //-- cek apakah item sudah ada di list --//
            //-- jika item belum ada di list --//
            if(objIndex === -1){
                console.log('objIndex : '+objIndex+' belum ada di list')
                if(res_kode_barang !== '' || res_satuan !== '' || res_deskripsi !== '' || res_qty !== '' || res_hpp !== '' || res_gross !== ''){
                    const obj = {"KODE_BARANG":res_kode_barang,"DESKRIPSI":res_deskripsi,"SATUAN":res_satuan,"QTY":res_qty,"DISKON":res_diskon,"PRICE":res_amount,"GROSS":res_gross}
                    arr_input_item.push(obj)
                    console.log(JSON.stringify(arr_input_item))
                }else{

                }
                const res_rows = AddID(arr_input_item)
                setData_rows(res_rows)
                //-- jika item sudah ada di list --//
            }else{
                //-- update qty, diskon, price --//
                data_rows[objIndex].id = GenerateUniqNumber();
                data_rows[objIndex].KODE_BARANG = res_kode_barang;
                data_rows[objIndex].DESKRIPSI = res_deskripsi;
                data_rows[objIndex].SATUAN = res_satuan;

              
                
                data_rows[objIndex].QTY = res_qty;
                data_rows[objIndex].DISKON = res_diskon;
                data_rows[objIndex].PRICE = res_amount;
                data_rows[objIndex].GROSS = res_gross;
                // var rows = data_rows;
                // setData_rows(rows)
            }

           
            //-- summary --//
            // Filter hanya data dengan PRICE valid
            const valid_price = arr_input_item.filter(item => item.PRICE !== null && !isNaN(item.PRICE));
            // Hitung total harga (PRICE * QTY)
            const res_grand_total = valid_price.reduce((acc, item) => {
                const price = parseFloat(item.PRICE);
                return acc + price;
            }, 0);
            //console.log('res_grand_total',res_grand_total)
            // Hitung total diskon
            const valid_diskon = arr_input_item.filter(item => item.DISKON !== null && !isNaN(item.DISKON));
            // Hitung total harga (PRICE * QTY)
            const res_total_diskon = valid_diskon.reduce((acc, item) => {
                const diskon = parseFloat(item.DISKON);
                return acc + diskon;
            }, 0);
            //console.log('res_total_diskon',res_total_diskon)
            const res_subtotal =  res_grand_total + res_total_diskon
            const res_grand_total_final = res_grand_total + parseFloat(BiayaOngkir.split(',').join(''))
            //console.log('res_subtotal',res_subtotal)
            setTotalBelanja(GetFormatCurrency(res_subtotal.toString()))
            setTotalDiscount(GetFormatCurrency(res_total_diskon.toString()))
            setGrandTotal(GetFormatCurrency(res_grand_total_final.toString()))
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

    const GetMasterProdukByKodeGerai = () => {
        setData_rows_produk([])
        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetMasterProdukByKodeProdukAndKodeGerai`
        let param = {"IN_KODE_BARANG":"%","IN_KODE_GERAI":IN_KODE_GERAI}
        
        const Token = GetToken()
        setLoadingButton(true)
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                var res_rows = AddID(data_body);
                setData_rows_produk(res_rows);
                setLoadingButton(false)
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
                setTextButtonFilter(t('Refresh'))
                setLoadingButton(false)
                setModal13(false);
            }else{
                Swal.fire({
                    title: t("Warning"),
                    text: ""+parseFloat(code)+"-"+msg,
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                
                setTextButtonFilter(t('Refresh'))
                setLoadingButton(false)
                setModal13(false);
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
            setTextButtonFilter(t('Refresh'))
            setLoadingButton(false)
            setModal13(false);
        });
    }

    const CloseModal = async () => {
        setModal13(false);
        input1Ref.current.focus();
        try{
            const text = await navigator.clipboard.readText();
            if(text !== ''){
                setIN_BARCODE(text);
                setIN_DESKRIPSI('')
                setIN_KODE_BARANG('')
                setIN_SATUAN('')
                setIN_QTY('')
                setIN_HPP('')
                setIN_GROSS('')
                setIN_DISKON('')
            }else{
                setIN_BARCODE('');
            }
        }catch(Ex){
            console.log(Ex)
        }
    }

    const ShowMasterProduk = () => {
        setModal13(true);
        GetMasterProdukByKodeGerai()
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
    const GenerateReceiptStruk = (in_no_struk:string) => {
        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GenerateReceiptStruk`
        let param = {"IN_NO_STRUK": in_no_struk}
        const Token = GetToken()
        //console.log(JSON.stringify(param))
        setLoadingButtonPayment(true)
        setisDisabledButtonPayment(true)
        Posts(url,JSON.stringify(param),false,Token).then(async (response) => {
 
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = 'receipt_'+get_format_tanggal_jam_format_indo().split('-').join('').split(':').join('')+'_'+in_no_struk+'.pdf'; // file name
            document.body.appendChild(a);
            a.click();
            a.remove();
            setLoadingButtonPayment(false)
            setisDisabledButtonPayment(false)
        
        }).catch((error) => {
            console.log(error)
            Swal.fire({
                title: t("Warning"),
                text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setLoadingButtonPayment(false)
            setisDisabledButtonPayment(false)
        });
    }
    const InsPosTransaksiSales = () => {
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
                try{
                    GetGenerateKodeTransaksiInventory().then((d)=>{
                        const kode_transaksi_inventory = d;
                        var today = new Date();
                        var bulan = today.getMonth()+1;
                        var detail = [];
                        for(var i = 0;i<data_rows.length;i++){
                            const obj = {
                                "IN_KODE_BARANG": data_rows[i].KODE_BARANG,
                                "IN_DESKRIPSI": data_rows[i].DESKRIPSI,
                                "IN_SATUAN": data_rows[i].SATUAN,
                                "IN_HPP": data_rows[i].GROSS,
                                "IN_PPN": "0",
                                "IN_GROSS": data_rows[i].GROSS,
                                "IN_QTY": data_rows[i].QTY,
                                "IN_DISKON": data_rows[i].DISKON,
                                "IN_PRICE": data_rows[i].PRICE,
                                "IN_IS_HADIAH": 0,
                                "IN_KODE_PROMO": 0,
                                "IN_IS_RETUR_ITEM": 0
                            }
                            detail.push(obj)
                        }
                        const r = {
                                // items: [
                                // { name: 'Indomie Goreng', qty: 2, gross:1000, price: 2000 },
                                // { name: 'Teh Botol', qty: 1, gross:4000,price: 4000 },
                                // ],
                                items: detail,
                            };
                            console.log(JSON.stringify(r))
                            setDummyData(r);
                            setIN_GENERATE_KODE_TRANSAKSI_INVENTORY(kode_transaksi_inventory.toString());
                            let url = `http://${IN_HOST}:${IN_PORT}/api/v2/InsPosTransaksiSales`
                            let param = {
                                            "IN_KODE_INITIAL": IN_KODE_INITIAL,
                                            "IN_KODE_GERAI": IN_KODE_GERAI,
                                            "IN_JENIS": jenis,
                                            "IN_TANGGAL": get_format_tanggal_jam(),
                                            "IN_TAHUN": get_format_tanggal_jam().substring(0,4),
                                            "IN_BULAN": bulan,
                                            "IN_METODE_BAYAR": IN_METODE_PEMBAYARAN,
                                            "IN_TOTAL_BELANJA": GrandTotal.split(',').join(''),
                                            "IN_DISKON_MARKET_PLACE": DiskonMarketPlace.split(',').join(''),
                                            "IN_BIAYA_ONGKIR": BiayaOngkir.split(',').join(''),
                                            "IN_BAYAR": IN_BAYAR.split(',').join(''),
                                            "IN_KEMBALIAN": IN_KEMBALIAN.split(',').join(''),
                                            "IN_IS_STATUS": 1,
                                            "IN_OTORISATOR_VOID": "-",
                                            "IN_APP": themeConfig.versi_app,
                                            "IN_BANK": IN_BANK,
                                            "IN_NIK_PEMBUAT":IN_NIK_PEMBUAT,
                                            "IN_KODE_TRANSAKSI_INVENTORY":kode_transaksi_inventory,
                                            "IN_NO_WHATSAPP":IN_NO_WHATSAPP,
                                            "IN_DETAIL":detail
                                        }
                            const Token = GetToken()
                            //console.log(JSON.stringify(param))
                            setLoadingButtonPayment(true)
                            setisDisabledButtonPayment(true)
                            Posts(url,JSON.stringify(param),false,Token).then((response) => {
                                const res_data = response;
                                var code = res_data.code;
                                var msg = res_data.msg;
                                if(parseFloat(code) === 200){
                                    //-- generate struk online --//
                                    var res_no_struk = res_data.data;
                                   
                                    Swal.fire({
                                        title: t("Information"),
                                        text: ""+parseFloat(code)+"-"+msg,
                                        icon: "success",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    });
                                    console.log('res_no_struk :'+res_no_struk)
                                    GenerateReceiptStruk(res_no_struk)
                                    CreateNewOrder()
                                    setLoadingButtonPayment(false)
                                    setisDisabledButtonPayment(false)
                                }else if(code.toString().substring(0,1) === '4'){
                                    if(code === 401 && msg.includes("Invalid")){
                                        Swal.fire({
                                            title: t("Warning"),
                                            text: ""+parseFloat(code)+"-"+msg,
                                            icon: "warning",
                                            padding: '2em',
                                            customClass: 'sweet-alerts'
                                        });
                                    }else if(code === 403){
                                        if(IN_SHIFT === ''){
                                            MySwal.fire({
                                                title: t(""+parseFloat(code)+"-"+msg),
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
                                                title: t("Data initial for shift "+IN_SHIFT+" not found!"),
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
                                    }else{
                                        Swal.fire({
                                            title: t("Warning"),
                                            text: ""+parseFloat(code)+"-"+msg,
                                            icon: "warning",
                                            padding: '2em',
                                            customClass: 'sweet-alerts'
                                        });
                                    }
                                    
                                    setLoadingButtonPayment(false)
                                    setisDisabledButtonPayment(false)
                                }else{
                                    Swal.fire({
                                        title: t("Warning"),
                                        text: ""+parseFloat(code)+"-"+msg,
                                        icon: "warning",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    });
                                    setLoadingButtonPayment(false)
                                    setisDisabledButtonPayment(false)
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
                                setLoadingButtonPayment(false)
                                setisDisabledButtonPayment(false)
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
                    });
                }catch(Ex){
                    Swal.fire({
                        title: t("Warning"),
                        text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setLoadingButtonPayment(false)
                    setisDisabledButtonPayment(false)
                }
            }
        });
    }
    const InsPosInitial = () => {
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
                try{
                     
                        
                        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/InsPosInitial`
                        let param = {"IN_KODE_INITIAL":"","IN_KODE_GERAI":IN_KODE_GERAI,"IN_MODAL":IN_UANG_MODAL.split(",").join(""),"IN_UANG_LACI":IN_UANG_LACI.split(",").join(""),"IN_NIK":IN_NIK_INITIAL,"IN_NAMA":IN_NAMA_INITIAL,"IN_SHIFT":IN_SHIFT_INITIAL}
                        const Token = GetToken()
                        console.log(JSON.stringify(param))
                        setLoadingButtonSubmit(true)
                        setisDisabledButtonSubmit(true)
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
                                setLoadingButtonSubmit(false)
                                setisDisabledButtonSubmit(false)
                            }else if(code.toString().substring(0,1) === '4'){
                                if(code === 401 && msg.includes("Invalid")){
                                    Swal.fire({
                                        title: t("Warning"),
                                        text: ""+parseFloat(code)+"-"+msg,
                                        icon: "warning",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    });
                                }else if(code === 403){
                                    if(IN_SHIFT === ''){
                                        MySwal.fire({
                                            title: t(""+parseFloat(code)+"-"+msg),
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
                                            title: t("Data initial for shift "+IN_SHIFT+" not found!"),
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
                                 
                                }
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                setLoadingButtonSubmit(false)
                                setisDisabledButtonSubmit(false)
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                setLoadingButtonSubmit(false)
                                setisDisabledButtonSubmit(false)
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
                            setLoadingButtonSubmit(false)
                            setisDisabledButtonSubmit(false)
                        });
                }catch(Ex){
                    Swal.fire({
                        title: t("Warning"),
                        text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setLoadingButtonSubmit(false)
                    setisDisabledButtonSubmit(false)
                }
            }
        });
    }

    const InsPendingSales = () => {
        Swal.fire({
            icon: "question",
            title: t("Confirmation"),
            text: t("Are you sure for")+" "+t("save data to pending sales")+" ?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
            padding: '2em',
            customClass: 'sweet-alerts'
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try{
                    //-- proses simpan data pending sales --//
                    GetGenerateKodeTransaksiInventory().then((d)=>{
                        const kode_transaksi_inventory = d;
                        var today = new Date();
                        var bulan = today.getMonth()+1;
                        var detail = [];
                        for(var i = 0;i<data_rows.length;i++){
                            const obj = {
                                "IN_KODE_BARANG": data_rows[i].KODE_BARANG,
                                "IN_DESKRIPSI": data_rows[i].DESKRIPSI,
                                "IN_SATUAN": data_rows[i].SATUAN,
                                "IN_HPP": data_rows[i].GROSS,
                                "IN_PPN": "0",
                                "IN_GROSS": data_rows[i].GROSS,
                                "IN_QTY": data_rows[i].QTY,
                                "IN_DISKON": data_rows[i].DISKON,
                                "IN_PRICE": data_rows[i].PRICE,
                                "IN_IS_HADIAH": 0,
                                "IN_KODE_PROMO": 0,
                                "IN_IS_RETUR_ITEM": 0
                            }
                            detail.push(obj)
                        }
                        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/InsPosTransaksiSales`
                        let param = {
                                        "IN_KODE_INITIAL": IN_KODE_INITIAL,
                                        "IN_KODE_GERAI": IN_KODE_GERAI,
                                        "IN_JENIS": jenis,
                                        "IN_TANGGAL": get_format_tanggal_jam(),
                                        "IN_TAHUN": get_format_tanggal_jam().substring(0,4),
                                        "IN_BULAN": bulan,
                                        "IN_METODE_BAYAR": (IN_METODE_PEMBAYARAN === '' ? '0' : IN_METODE_PEMBAYARAN),
                                        "IN_TOTAL_BELANJA": (GrandTotal === '' ? '0' : GrandTotal.split(',').join('')),
                                        "IN_BAYAR": (IN_BAYAR === '' ? '0' : IN_BAYAR.split(',').join('')),
                                        "IN_KEMBALIAN": (IN_KEMBALIAN === '' ? '0' : IN_KEMBALIAN.split(',').join('')),
                                        "IN_IS_STATUS": 0,
                                        "IN_OTORISATOR_VOID": "-",
                                        "IN_APP": themeConfig.versi_app,
                                        "IN_BANK": (IN_BANK === '' ? '0' : IN_BANK.split(',').join('')),
                                        "IN_NIK_PEMBUAT":IN_NIK_PEMBUAT,
                                        "IN_KODE_TRANSAKSI_INVENTORY":kode_transaksi_inventory,
                                        "IN_DETAIL":detail
                                    }
                        const Token = GetToken()
                        console.log(JSON.stringify(param))
                        setLoadingButtonPayment(true)
                        setisDisabledButtonPayment(true)
                        Posts(url,JSON.stringify(param),false,Token).then((response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            if(parseFloat(code) === 200){
                                var data_body = res_data.data;
                                Swal.fire({
                                    title: t("Information"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "success",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                CreateNewOrder()
                                
                                setLoadingButtonPayment(false)
                                setisDisabledButtonPayment(false)
                            }else if(code.toString().substring(0,1) === '4'){
                                if(code === 401 && msg.includes("Invalid")){
                                    Swal.fire({
                                        title: t("Warning"),
                                        text: ""+parseFloat(code)+"-"+msg,
                                        icon: "warning",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    });
                                }else if(code === 403){
                                    if(IN_SHIFT === ''){
                                        MySwal.fire({
                                            title: t(""+parseFloat(code)+"-"+msg),
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
                                            title: t("Data initial for shift "+IN_SHIFT+" not found!"),
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
                                }
                                
                                setLoadingButtonPayment(false)
                                setisDisabledButtonPayment(false)
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                setLoadingButtonPayment(false)
                                setisDisabledButtonPayment(false)
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
                            setLoadingButtonPayment(false)
                            setisDisabledButtonPayment(false)
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
                    });
                }catch(Ex){
                    Swal.fire({
                        title: t("Warning"),
                        text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    setLoadingButtonSubmit(false)
                    setisDisabledButtonSubmit(false)
                }
            }
        });
    }
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                    <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={IDReport === 'Initial' ? <IconLogin /> : <IconShoppingCart />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={IDReport} in_content={
                        <>
                        <div className="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>{t('Note: Please check your data input, because process data input can\'t try again!')}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-3 mt-3 lg:grid-cols-3 md:grid-cols-3">
                            {
                                IN_IS_GERAI === '0' ?
                                <>
                                <div>
                                <DropDownGlobal in_is_clear={false}in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={OptionsGerai} isSearchable={true} isMulti={false} event={FormInputKodeGeraiMutasi} name_component={"Gerai"} idComponent={"gerai"} />
                                </div>
                                <div>
                                <InputTextType in_title={"Address"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputAlamat} in_value={IN_ALAMAT} />
                                </div>
                                {
                                    IDReport === 'Initial' ?
                                    ''
                                    :
                                    <div>
                                        <InputTextType in_title={"Initial Code"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputInitialCode} in_value={IN_KODE_INITIAL} />
                                    </div>
                                }
                               
                                </>
                                :
                                <>
                                <div>
                                <InputTextType in_title={"Gerai"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputKodeGeraiMutasi} in_value={IN_KODE_GERAI} />
                                </div>
                                <div>
                                <InputTextType in_title={"Address"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputAlamat} in_value={IN_ALAMAT} />
                                </div>
                                {
                                    IDReport === 'Initial' ?
                                    ''
                                    :
                                    <div>
                                        <InputTextType in_title={"Initial Code"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputInitialCode} in_value={IN_KODE_INITIAL} />
                                    </div>
                                }
                                </>
                            }
                            {
                                IDReport === 'Initial' ?
                                <div>
                                <DropDownGlobal in_is_clear={false}in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={OptionShift} isSearchable={true} isMulti={false} event={FormInputShiftInitial} name_component={"Shift Initial"} idComponent={"ShiftInitial"} />
                                </div>
                                :
                                ''
                            }
                        </div>
                        {
                            IDReport === 'Initial' ?
                            <>
                            <div className="grid grid-cols-1 gap-3 mt-3 lg:grid-cols-2 md:grid-cols-2">
                                <div>
                                <InputTextType in_title={"Nik"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputNikInitial} in_value={IN_NIK_INITIAL} />
                                </div>
                                <div>
                                <InputTextType in_title={"Nama"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputNamaInitial} in_value={IN_NAMA_INITIAL} />
                                </div>                            
                                <div>
                                <InputTextType in_title={"Modal"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={false} event={FormInputUangModal} in_value={IN_UANG_MODAL} />
                                </div>
                                <div>
                                <InputTextType in_title={"Uang Laci"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={false} event={FormInputUangLaci} in_value={IN_UANG_LACI} />
                                </div>
                            </div>
                            <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_submit_initial"} isLoading={LoadingButtonSubmit} isDisabled={isDisabledButtonSubmit} in_icon={<IconLogin />} in_title_button={'Submit Initial'} HandleClick={InsPosInitial} />
                            </>
                            :
                            <>
                            {
                                isEnabledContentSales ? 
                                <>
                                <div className="grid grid-cols-3 grid-rows-2 gap-3 mt-3 lg:grid-cols-3 md:grid-cols-2">
                                    <div className="col-span-2 row-span-2">
                                    <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconPlusCircle />} in_style_card={"panel rounded-3xl"} in_judul={"Input Item"} in_content={
                                        <>
                                        <div className="mt-3 datatables">
                                            <DataTable
                                                noRecordsText="No results match your search query"
                                                highlightOnHover
                                                className="table-hover whitespace-nowrap"
                                                records={data_rows}
                                                columns={data_columns}
                                                minHeight={200}
                                            />
                                        </div>
                                        <div className="grid gap-3 lg:grid-cols-1 md:grid-cols-1">
                                                <div className="space-y-2 ltr:text-right rtl:text-left">
                                                    <div className="flex items-center text-lg">
                                                        <div className="flex-1">Subtotal :</div>
                                                        <div className="w-[37%]">{TotalBelanja}</div>
                                                    </div>
                                                    <div className="flex items-center text-lg">
                                                        <div className="flex-1">Tax :</div>
                                                        <div className="w-[37%]">{TotalPPN}</div>
                                                    </div>
                                                    <div className="flex items-center text-lg">
                                                        <div className="flex-1">Discount :</div>
                                                        <div className="w-[37%]">{TotalDiscount}</div>
                                                    </div>
                                                    <div className="flex items-center text-lg">
                                                        <div className="flex-1">Shipping :</div>
                                                        <div className="w-[37%]">{BiayaOngkir}</div>
                                                    </div>
                                                    <div className="flex items-center text-xl font-semibold">
                                                        <div className="flex-1">Grand Total :</div>
                                                        <div className="w-[37%]">{GrandTotal}</div>
                                                    </div>
                                            </div>
                                        </div> 
                                        <div className="grid grid-cols-1 gap-3 mt-3 lg:grid-cols-3 md:grid-cols-3">
                                            <div>
                                                <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_buat_sales_baru"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconRefresh />} in_title_button={'Create New Order'} HandleClick={CreateNewOrder} />
                                            </div>
                                            <div>
                                                <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_pending"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSave />} in_title_button={'Pending Sales'} HandleClick={InsPendingSales} />
                                            </div>
                                            <div>
                                                <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_add_item"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSend />} in_title_button={'Submit Payment'} HandleClick={SubmitPayment} />
                                            </div>
                                        </div>
                                        </>
                                    }
                                    />
                                    </div>
                                    
                                    <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconPlusCircle />} in_style_card={"panel rounded-3xl"} in_judul={"Input Item"} in_content={
                                        <>
                                        <div className="grid gap-3 lg:grid-cols-1 md:grid-cols-1 sm-grid-cols-1">
                                            <div className="col-span-2">
                                            <InputTextTypeKeyDown   in_title={"Item"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={false} event={FormInputItem} in_value={IN_BARCODE} in_ref={input1Ref} in_event_keydown={KeyItem} />
                                            </div>
                                            <div className="sm:grid-cols-1">
                                            <InputTextType   in_title={"Kode Barang"} in_classname_title={""} in_classname_content={"w-full hidden"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-xs hidden"} data_options={undefined} isDisabled={true} event={FormInputKodeBarang} in_value={IN_KODE_BARANG} />
                                            <InputTextType   in_title={"Description"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={true} event={FormInputDeskripsi} in_value={IN_DESKRIPSI} />    
                                            </div>
                                            <div className="sm:grid-cols-1">
                                            <InputTextType   in_title={"Satuan"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={true} event={FormInputSatuan} in_value={IN_SATUAN} />
                                            </div>
                                            <div className="sm:col-span-1">
                                            <InputTextTypeKeyDown   in_title={"Qty"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={false} event={FormInputQty} in_value={IN_QTY} in_ref={input2Ref} in_event_keydown={KeyItem} />
                                            </div>
                                            
                                            <div className="sm:col-span-1">
                                            <InputTextTypeKeyDown   in_title={"Diskon"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={false} event={FormInputDiskon} in_value={IN_DISKON} in_ref={input3Ref} in_event_keydown={KeyItem} />
                                            </div>
                                            <InputTextType   in_title={"HPP"} in_classname_title={""} in_classname_content={"w-full hidden"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-xs hidden"} data_options={undefined} isDisabled={true} event={FormInputHPP} in_value={IN_HPP} />
                                            <InputTextType   in_title={"GROSS"} in_classname_title={""} in_classname_content={"w-full hidden"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-xs hidden"} data_options={undefined} isDisabled={true} event={FormInputGross} in_value={IN_GROSS} />
                                        </div>
                                        <div>
                                            <ButtonAdd in_classname={!isDark ? 'btn btn-warning w-full rounded-full text-end text-xs' : 'btn btn-outline-warning w-full rounded-full text-xs'} idComponent={"btn_list_item"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconBox />} in_title_button={'Master Produk'} HandleClick={ShowMasterProduk} />
                                        </div>
                                    
                                        </>
                                    } />
                                     
                                    {/* INPUT PAYMENT */}
                                    <div className="">
                                    <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconCreditCard />} in_style_card={"panel rounded-3xl h-auto"} in_judul={"Input Payment"} in_content={
                                        <>
                                        <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-2">
                                            <div className="sm:grid-cols-1">
                                            <InputTextTypeKeyDown   in_title={"Discount Market Place"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={false} event={FormInputDiskonMarketPlace} in_value={DiskonMarketPlace} in_ref={input4Ref} in_event_keydown={null}/>
                                            </div>
                                            <div  className="sm:grid-cols-1">
                                            <InputTextTypeKeyDown   in_title={"Shipping"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={false} event={FormInputBiayaOngkir} in_value={BiayaOngkir} in_ref={null} in_event_keydown={null}/>
                                            </div>
                                            <div  className="sm:grid-cols-1">
                                            <InputTextTypeKeyDown   in_title={"Payment"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={false} event={FormInputBayar} in_value={IN_BAYAR} in_ref={null} in_event_keydown={FormInputBayar}/>
                                            </div>
                                            <div  className="sm:grid-cols-1">
                                            <InputTextType   in_title={"Cashback"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={true} event={FormInputKembalian} in_value={IN_KEMBALIAN} />
                                            </div>
                                        </div>
                                        <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-2">
                                            <div>
                                            {/* <DropDownGlobal 
                                                in_is_clear={is_clear_metode_pembayaran} 
                                                in_classname_title={"mb-1 mt-5 text-xs"} 
                                                in_classname_content={"w-full text-xs"} 
                                                data_options={OptionMetodePembayaran} 
                                                isSearchable={true} 
                                                isMulti={false} 
                                                event={FormInputMetodePembayaran} 
                                                name_component={"Method"} 
                                                idComponent={"metode_pembayaran"} />
                                            */}
                                                <div className={"mb-1 mt-5 text-xs"}><label htmlFor={GetID()}>{t("Method")}</label></div>
                                                <div className="mb-3">
                                                    <div className={"w-full text-xs"}>
                                                        <Select
                                                            onChange={FormInputMetodePembayaran}
                                                            id={"metode_pembayaran"}
                                                            placeholder={t("Select Method")}
                                                            options={OptionMetodePembayaran}
                                                            isMulti={false}
                                                            isSearchable={true}
                                                            isClearable={false}
                                                            value={selectedOption}
                                                            //defaultValue={defaultOption}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                            {/* <DropDownGlobal 
                                                in_is_clear={is_clear_bank} 
                                                in_classname_title={IN_IS_CASH ? "mb-1 mt-5 text-xs hidden" : "mb-1 mt-5 text-xs"} 
                                                in_classname_content={IN_IS_CASH ? "w-full text-xs hidden" : "w-full text-xs"} 
                                                data_options={OptionBank} 
                                                isSearchable={true} 
                                                isMulti={false} 
                                                event={FormInputBank} 
                                                name_component={"Payment via"} 
                                                idComponent={"payment_via"} /> */}
                                                <div className={"mb-1 mt-5 text-xs"}><label htmlFor={GetID()}>{t("Payment via")}</label></div>
                                                <div className="mb-3">
                                                    <div className={"w-full text-xs"}>
                                                        <Select
                                                            onChange={FormInputBank}
                                                            id={"payment_via"}
                                                            placeholder={t("Select Via")}
                                                            options={OptionBank}
                                                            isMulti={false}
                                                            isSearchable={true}
                                                            isClearable={false}
                                                            value={selectedBankOption}
                                                            //defaultValue={defaultOption}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                            <InputTextType   in_title={"No.WhatsApp (Ex. 6281216854443)"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={false} event={FormInputNoWhatsApp} in_value={IN_NO_WHATSAPP} />
                                            </div>
                                        </div>
                                        <div className="grid gap-3 lg:grid-cols-1 md:grid-cols-1">
                                            <div>
                                            <ButtonAdd in_classname={!isDark ? 'btn btn-danger w-full rounded-full text-end text-xs' : 'btn btn-outline-danger w-full rounded-full text-xs'} idComponent={"btn_payment"} isLoading={LoadingButtonPayment} isDisabled={isDisabledButtonPayment} in_icon={<IconDollarSignCircle />} in_title_button={'Payment'} HandleClick={InsPosTransaksiSales} />
                                            </div>
                                            {/* <div>
                                            <ButtonAdd in_classname={!isDark ? 'btn btn-info w-full rounded-full text-end text-xs' : 'btn btn-outline-info w-full rounded-full text-xs'} idComponent={"btn_cetak_struk"} isLoading={LoadingButtonPayment} isDisabled={isDisabledButtonPayment} in_icon={<IconPrinter />} in_title_button={'Print Receipt'} HandleClick={GetHandlePrint} />
                                            </div> */}
                                        </div>
                                        </>
                                    } />
                                    </div>
                                </div>
                                {/* OPEN MODAL MASTER PRODUK */}
                                <ModalComponent in_size_modal={`panel animate__animated my-7 w-full overflow-hidden rounded-3xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-sm font-bold"} in_title_modal={Title} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                                    <div className="p-2">
                                        <ButtonAdd in_classname={'btn btn-outline-danger rounded-full text-xs'} idComponent={"btn_refresh"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconRefresh />} in_title_button={'Refresh'} HandleClick={GetMasterProdukByKodeGerai} />
                                        <div className="mb-5">
                                            {
                                                data_rows_produk.length > 0 ?
                                                <ComponentsDatatablesAdvanced in_column_sort={'id'} in_id={"dt"} Datarow={data_rows_produk} DataColumns={data_columns_produk} />
                                                :
                                                ''
                                            }
                                        </div>
                                        <div className="flex items-center justify-end gap-3 mt-8">
                                            <ButtonAdd in_classname={'btn btn-outline-danger rounded-full text-xs'} idComponent={"btn_close"} isLoading={false} isDisabled={isDisabled} in_icon={<IconXCircle />} in_title_button={'Cancel'} HandleClick={CloseModal} />
                                        </div>
                                    </div>
                                } />
                                </>
                                :
                                ``
                            }
                            </>
                        }        
                        
                      </>
                    } />
                </>
            } />
        </>
    )
}
export default FormSales;