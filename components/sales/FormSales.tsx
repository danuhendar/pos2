'use client'
import {   useEffect,  useRef,  useState } from "react";
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import {   AddID, GenerateUniqNumber, get_data_local_storage, get_format_tanggal_jam, GetFormatCurrency, GetToken, groupByValueAndCount, summarizeJSONObjectByValue, validateNumber} from "@/lib/global";
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
import IconMenuTodo from "../Icon/Menu/IconMenuTodo";
import { set } from "lodash";

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
    const [IN_KODE_TRANSAKSI,setIN_KODE_TRANSAKSI] = useState('')
    const [IN_NIK_PEMBUAT,setIN_NIK_PEMBUAT] = useState('')
    const [IN_NAMA_PEMBUAT,setIN_NAMA_PEMBUAT] = useState('')
    const [IN_MODAL,setIN_MODAL] = useState('')
    const [OptionShift,setOptionShift] = useState([
        { value: '1', label: 'Shift 1' },
        { value: '2', label: 'Shift 2' },
        { value: '3', label: 'Shift 3' }
    ]);
    const [IN_SHIFT,setIN_SHIFT] = useState('')
    const curdate = get_format_tanggal_jam().substring(0,16);
    const [date2, setDate2] = useState<any>(curdate);
    const [IN_UANG_LACI,setIN_UANG_LACI] = useState('')
    


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
    const [OptionBank,setOptionBank] = useState([
        { value: 'BCA', label: 'BCA' },
        { value: 'BNI', label: 'BNI' },
        { value: 'BRI', label: 'BRI' },
        { value: 'MANDIRI', label: 'MANDIRI' },
        { value: 'BSI', label: 'BSI' },
        { value: 'DANA', label: 'DANA' },
        { value: 'OVO', label: 'OVO' },
        { value: 'GOPAY', label: 'GOPAY' },
        { value: 'LINKAJA', label: 'LINKAJA' }
    ]);
    const [IN_BANK,setIN_BANK] = useState('')
    const [TotalBelanja,setTotalBelanja] = useState('0')
    const [TotalPPN,setTotalPPN] = useState('0')
    const [BiayaOngkir,setBiayaOngkir] = useState('0')
    const [TotalDiscount,setTotalDiscount] = useState('0')
    const [GrandTotal,setGrandTotal] = useState('0')
    const [IN_DISKON,setIN_DISKON] = useState('0')
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const MySwal = withReactContent(Swal);
    const router = useRouter();

    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        const InputNikPemohon = get_data_local_storage('nik');
        setIN_NIK_PEMBUAT(InputNikPemohon)
        const InputNamaPemohon = get_data_local_storage('nama');
        setIN_NAMA_PEMBUAT(InputNamaPemohon)
        const is_gerai = get_data_local_storage('is_gerai');
        setIN_IS_GERAI(is_gerai)
       
        const kode_gerai = get_data_local_storage('kode_gerai');
        setIN_KODE_GERAI(kode_gerai)
         if(is_gerai === '1'){
             GetPosInitialByKodeGerai(res_host,res_PORT_LOGIN,kode_gerai)
        }else{
           
        }
        const columns = Def_Column_Transaksi_Inventory()
        setData_columns(columns)
        GetMasterGerai(res_host,res_PORT_LOGIN)
        const OptionMetodePembayaran = [
            { value: 'CASH', label: 'CASH' },
            { value: 'DEBIT', label: 'DEBIT' },
            { value: 'KREDIT', label: 'KREDIT' },
            { value: 'TRANSFER', label: 'TRANSFER' },
            { value: 'QRIS', label: 'QRIS' }
        ];
        setOptionMetodePembayaran(OptionMetodePembayaran)
       
    },[]);

   
    const FormInputKodeGeraiMutasi  = (value: any) => {var val = value.value;setIN_KODE_GERAI(val); GetPosInitialByKodeGerai(IN_HOST,IN_PORT,val)};
    // const FormInputModal = (value: any) => {var val = value.target.value;var res_val = GetFormatCurrency(val.split(',').join('')); setIN_MODAL(res_val); };
    // const FormInputNikPembuat = (value: any) => {var val = value.target.value;setIN_NIK_PEMBUAT(val); };
    // const FormInputNamaPembuat = (value: any) => {var val = value.target.value;setIN_NAMA_PEMBUAT(val); };
    // const FormInputUangLaci = (value: any) => {var val = value.target.value;var res_val = GetFormatCurrency(val.split(',').join('')); setIN_UANG_LACI(res_val); };
    // const FormInputShift = (value: any) => {var val = value.value;setIN_SHIFT(val); GetPosInitialByKodeGerai() };
    const FormInputItem = (value: any) => {var val = value.target.value;setIN_BARCODE(val); };
    const FormInputDeskripsi = (value: any) => {var val = value.target.value;setIN_DESKRIPSI(val); };
    const FormInputSatuan = (value: any) => {var val = value.target.value;setIN_SATUAN(val); };
    const FormInputQty  = (event: { target: { value: any; }; }) => {var val = event.target.value;const validate_number = validateNumber(val);setIN_QTY(validate_number);  };
    const FormInputHPP = (value: any) => {var val = value.target.value;setIN_HPP(val); };
    const FormInputGross = (value: any) => {var val = value.target.value;setIN_GROSS(val); };
    const FormInputMetodePembayaran = (value: any) => {var val = value.value;setIN_METODE_PEMBAYARAN(val); };
    const FormInputKodeBarang = (value: any) => {var val = value.target.value;setIN_KODE_BARANG(val); };
    const FormInputTotalBelanja = (value: any) => {var val = value.target.value;setIN_TOTAL_BELANJA(val); };
    const FormInputBiayaOngkir = (value: any) => {
        var val = value.target.value;
        const validate_number = validateNumber(val);
        const val_currency = GetFormatCurrency(validate_number);
        setBiayaOngkir(val_currency);
    }
    const FormInputBayar = (value: any) => {var val = value.target.value;const validate_number = validateNumber(val); const val_currency = GetFormatCurrency(validate_number);setIN_BAYAR(val_currency); };
    const FormInputKembalian = (value: any) => {var val = value.target.value;setIN_KEMBALIAN(val); };
    const FormInputBank = (value: any) => {var val = value.value;setIN_BANK(val); };
    const FormInputDiskon = (value: any) => {var val = value.target.value;const validate_number = validateNumber(val); const val_currency = GetFormatCurrency(validate_number); setIN_DISKON(val_currency); };
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
    const KeyAddList = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            // Move focus to input 3
            input1Ref.current.focus();
            AddList();
            setIN_BARCODE('')
            setIN_KODE_BARANG('')
            setIN_DESKRIPSI('')
            setIN_SATUAN('')
            setIN_QTY('')
            setIN_HPP('')
            setIN_GROSS('')
            setIN_DISKON('')
        }
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
                    const obj = {"label":rows[i].KODE_GERAI+'-'+rows[i].CONTENT,"value":rows[i].KODE_GERAI}
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
    const GetMasterProdukByBarcode = async () => {
        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetMasterProdukByBarcode`
        let param = {"IN_BARCODE":IN_BARCODE,"IN_KODE_GERAI":IN_KODE_GERAI}
        const Token = GetToken()
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
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
            let param = {"IN_KODE_GERAI":in_kode_gerai,"IN_SHIFT":IN_SHIFT}
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

    const Def_Column_Transaksi_Inventory = () => {
        var cols = [
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
    const CreateNewOrder = () => {
        setarr_input_item([])
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
    }

    const AddList = () => {
        try{
            //-- scan barcode --//
            const res_kode_barang = IN_KODE_BARANG
            const res_satuan = IN_SATUAN
            const res_deskripsi = IN_DESKRIPSI
            const res_qty = IN_QTY
            const res_hpp = IN_HPP
            const res_gross = IN_GROSS
            const res_diskon = IN_DISKON === '' ? '0' : IN_DISKON.split(',').join('')
            const res_amount = (parseFloat(res_qty.split(',').join('')) * parseFloat(res_gross.split(',').join('')) ) - parseFloat(res_diskon.split(',').join(''));
            const objIndex = data_rows.findIndex(((obj: { KODE_BARANG: any; }) => obj.KODE_BARANG == res_kode_barang));
            console.log('objIndex',objIndex)
            //-- cek apakah item sudah ada di list --//
            //-- jika item belum ada di list --//
            if(objIndex === -1){
                if(res_kode_barang !== '' || res_satuan !== '' || res_deskripsi !== '' || res_qty !== '' || res_hpp !== '' || res_gross !== ''){
                    const obj = {"KODE_BARANG":res_kode_barang,"DESKRIPSI":res_deskripsi,"SATUAN":res_satuan,"QTY":res_qty,"DISKON":res_diskon,"PRICE":res_amount,"GROSS":res_gross}
                    arr_input_item.push(obj)
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
            console.log('res_grand_total',res_grand_total)
            // Hitung total diskon
            const valid_diskon = arr_input_item.filter(item => item.DISKON !== null && !isNaN(item.DISKON));
            // Hitung total harga (PRICE * QTY)
            const res_total_diskon = valid_diskon.reduce((acc, item) => {
                const diskon = parseFloat(item.DISKON);
                return acc + diskon;
            }, 0);
            console.log('res_total_diskon',res_total_diskon)
            const res_subtotal =  res_grand_total + res_total_diskon
            console.log('res_subtotal',res_subtotal)
            setTotalBelanja(GetFormatCurrency(res_subtotal.toString()))
            setTotalDiscount(GetFormatCurrency(res_total_diskon.toString()))
            setGrandTotal(GetFormatCurrency(res_grand_total.toString()))  
            
           
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
                        <div className="grid grid-cols-1 gap-3 mt-3 lg:grid-cols-2 md:grid-cols-2">
                            {
                                IN_IS_GERAI === '0' ?
                                <div>
                                <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={OptionsGerai} isSearchable={true} isMulti={false} event={FormInputKodeGeraiMutasi} name_component={"Gerai"} idComponent={"gerai"} />
                                </div>
                                :
                                <div>
                                <InputTextType in_title={"Gerai"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputKodeGeraiMutasi} in_value={IN_KODE_GERAI} />
                                </div>
                            } 
                            {/* <div className="w-1/5 mt-6">
                            <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Filter'} HandleClick={GetPosInitialByKodeGerai} />     
                            </div> */}
                        </div>
                   
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
                                            {/* <div className="flex items-center text-lg">
                                                <div className="flex-1">Shipping Rate :</div>
                                                <div className="w-[37%]">
                                                    <InputTextType in_title={""} in_classname_title={""} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={false} event={FormInputBiayaOngkir} in_value={BiayaOngkir} />
                                                </div>
                                            </div> */}
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
                                        <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_pending"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSave />} in_title_button={'Pending Sales'} HandleClick={null} />
                                    </div>
                                    <div>
                                        <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_add_item"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSend />} in_title_button={'Submit Payment'} HandleClick={SubmitPayment} />
                                    </div>
                                </div>
                                </>
                            }
                            />
                            </div>
                            <div>
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
                                    <InputTextTypeKeyDown   in_title={"Qty"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={false} event={FormInputQty} in_value={IN_QTY} in_ref={input2Ref} in_event_keydown={KeyAddList} />
                                    </div>
                                    
                                    <div className="sm:col-span-1">
                                    <InputTextTypeKeyDown   in_title={"Diskon"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={false} event={FormInputDiskon} in_value={IN_DISKON} in_ref={input3Ref} in_event_keydown={KeyAddList} />
                                    </div>
                                    <InputTextType   in_title={"HPP"} in_classname_title={""} in_classname_content={"w-full hidden"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-xs hidden"} data_options={undefined} isDisabled={true} event={FormInputHPP} in_value={IN_HPP} />
                                    <InputTextType   in_title={"GROSS"} in_classname_title={""} in_classname_content={"w-full hidden"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-xs hidden"} data_options={undefined} isDisabled={true} event={FormInputGross} in_value={IN_GROSS} />
                                    <div>
                                        <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_add_item"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconPlusCircle />} in_title_button={'Add'} HandleClick={AddList} />
                                    </div>
                                    <div>
                                        <ButtonAdd in_classname={!isDark ? 'btn btn-warning w-full rounded-full text-end text-xs' : 'btn btn-outline-warning w-full rounded-full text-xs'} idComponent={"btn_list_item"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconBox />} in_title_button={'Master Produk'} HandleClick={null} />
                                    </div>
                                </div>
                                </>
                            } />
                            </div>
                           <div>
                            <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconCreditCard />} in_style_card={"panel rounded-3xl"} in_judul={"Input Payment"} in_content={
                                <>
                                <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-2">
                                    <div  className="sm:grid-cols-1">
                                    <InputTextTypeKeyDown   in_title={"Payment"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={false} event={FormInputBayar} in_value={IN_BAYAR} in_ref={input4Ref} in_event_keydown={FormInputBayar}/>
                                    </div>
                                    <div  className="m:grid-cols-1">
                                    <InputTextType   in_title={"Cashback"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right text-xs"} data_options={undefined} isDisabled={true} event={FormInputKembalian} in_value={IN_KEMBALIAN} />
                                    </div>
                                </div>
                                <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-2">
                                    <div>
                                    <DropDownGlobal  in_classname_title={"mb-1 mt-5 text-xs"} in_classname_content={"w-full text-xs"} data_options={OptionMetodePembayaran} isSearchable={true} isMulti={false} event={FormInputMetodePembayaran} name_component={"Method"} idComponent={"metode_pembayaran"} />
                                    </div>
                                    <div>
                                    <DropDownGlobal  in_classname_title={"mb-1 mt-5 text-xs"} in_classname_content={"w-full text-xs"} data_options={OptionBank} isSearchable={true} isMulti={false} event={FormInputBank} name_component={"Bank"} idComponent={"bank"} />
                                    </div>
                                </div>
                                <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-2">
                                    <div className="col-span-2">
                                    <ButtonAdd in_classname={!isDark ? 'btn btn-danger w-full rounded-full text-end text-xs' : 'btn btn-outline-danger w-full rounded-full text-xs'} idComponent={"btn_payment"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconDollarSignCircle />} in_title_button={'Payment'} HandleClick={null} />
                                    </div>
                                </div>
                                </>
                            } />
                           </div>
                        </div>
                      </>
                    } />
                </>
            } />
        </>
    )
}
export default FormSales;