'use client'
import {  useEffect,  useRef,  useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import { AddColumn, AddID, get_data_local_storage, get_format_tanggal_jam, GetToken, removeItemByValue, removeItemOnceArray, validateNumber} from "@/lib/global";
import { useTranslation } from "react-i18next";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
import { Posts } from "@/lib/post";
import ButtonAdd from "../button/ButtonAdd";
import IconRefresh from "../Icon/IconRefresh";
import ComponentsDatatablesAdvanced from "../table/ComponentsDatatablesAdvanced";
import withReactContent from "sweetalert2-react-content";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import IconBox from "../Icon/IconBox";
import IconCreditCard from "../Icon/IconCreditCard";
import CardComponent from "../form/CardComponent";
import InputTextType from "../form/InputTypeText";
import { Textarea } from "@mantine/core";
import TextAreaComponent from "../form/TextAreaComponent";
import DatePicker from "../datepicker/DatePicker";
import InputCheckBoxFilterType from "../form/InputCheckBoxFilterType";
import InputTextTypeKeyDown from "../form/InputTypeTextKeyDown";
import IconTrash from "../Icon/IconTrash";
interface FormTerimaBarangMasukProps {
    url: string,
    command: string,
    IDReport: string,
}
const FormTerimaBarangMasuk: React.FC<FormTerimaBarangMasukProps> = ({ url, command, IDReport }) => {
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const [data_rows_Kategori,setData_rows_Kategori]= useState([]);
    const [data_columns_Kategori,setData_columns_Kategori]= useState([]);

    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const [IconButton,setIconButton] = useState(<IconRefresh />)
    const [IN_TAHUN,setIN_TAHUN] = useState('')
    const [IN_BULAN,setIN_BULAN] = useState('')

    const [optionsTahun,setOptionsTahun] = useState([])
    const [optionsItem,setoptionsItem] = useState([])
    const [optionsGerai,setOptionsGerai] = useState([])
    const [options6,setOptions6] = useState([])

    const [IN_TAHUN_MUTASI,setIN_TAHUN_MUTASI] = useState('')
    const [IN_BULAN_MUTASI,setIN_BULAN_MUTASI] = useState('')
    

    const [optionsTahunMutasi,setOptionsTahunMutasi] = useState([])
    const [optionsBulanMutasi,setOptionsBulanMutasi] = useState([])
    const [optionsGeraiMutasi,setOptionsGeraiMutasi] = useState([])
    const [IN_KODE_TRANSAKSI,setIN_KODE_TRANSAKSI] = useState('')
    const [IN_JENIS,setIN_JENIS] = useState(2)
    const [IN_KETERANGAN,setIN_KETERANGAN] = useState('')
    const [IN_ASAL,setIN_ASAL] = useState('')
    const [IN_TUJUAN,setIN_TUJUAN] = useState('')
    const curdate = get_format_tanggal_jam().substring(0,16);
    const [date2, setDate2] = useState<any>(curdate);
    const [IN_NIK_PEMBUAT,setIN_NIK_PEMBUAT] = useState('')
    const [IN_RESULT_SELECTED_MANUAL,setIN_RESULT_SELECTED_MANUAL] = useState('')
    const [IN_KODE_BARANG,setIN_KODE_BARANG] = useState('')
    const [IN_DESKRIPSI,setIN_DESKRIPSI] = useState('')
    const [IN_SATUAN,setIN_SATUAN] = useState('')
    const [IN_QTY,setIN_QTY] = useState('')
    const [IN_METODE,setIN_METODE] = useState('')
    const [IN_BARCODE,setIN_BARCODE] = useState('')
    const [IN_RESULT_SCAN_KODE_BARANG,setIN_RESULT_SCAN_KODE_BARANG] = useState('')
    const [IN_RESULT_SCAN_DESKRIPSI,setIN_RESULT_SCAN_DESKRIPSI] = useState('')
    const [IN_RESULT_SCAN_SATUAN,setIN_RESULT_SCAN_SATUAN] = useState('')
    const arr_input_item = []

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
    },[]);

   
    const FormInputKodeTransaksi = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_KODE_TRANSAKSI(val);  };
    const FormInputKeterangan  = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_KETERANGAN(val);  };

    const FormInputKodeGeraiMutasi  = (value: any) => {var val = value.value;setIN_TUJUAN(val); GetMasterProdukByKodeProdukAndKodeGerai(val+"%") };
    const FormInputSupplier = (value: any) => {var val = value.value;setIN_ASAL(val);  };
    const FormInputNikPembuat = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_NIK_PEMBUAT(val);  };
    const FormInputItem = (value: any) => {var val = value.value;setIN_RESULT_SELECTED_MANUAL(val);   };
    const FormInputSelectMetodeItem = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_METODE(val);  };
    // const FormInputScanBarcode = (event: { target: { value: any; }; }) => {
    //     var val = event.target.value;setIN_BARCODE(val);  
        
    // };
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const KeyDown = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            // Move focus to input 2
            input2Ref.current.focus();
            GetMasterProdukByBarcode();
        }
    };
    const FormInputScanBarcode = (event: { key: string; target: { value: any; }; }) => {
        var val = event.target.value;
        console.log(val)
        setIN_BARCODE(val);
    };
    const FormInputQty  = (event: { target: { value: any; }; }) => {var val = event.target.value;const validate_number = validateNumber(val);setIN_QTY(validate_number);  };
    const FormInputResultScanKodeBarang = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_RESULT_SCAN_KODE_BARANG(val);  };
    const FormInputResultScanDeskripsi = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_RESULT_SCAN_DESKRIPSI(val);  };
    const FormInputResultScanSatuan = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_RESULT_SCAN_SATUAN(val);  };
     

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
                    const obj = {"KODE_BARANG":res_kode_barang,"DESKRIPSI":res_deskripsi,"SATUAN":res_satuan,"QTY":res_qty}
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
                const obj = {"KODE_BARANG":res_kode_barang,"DESKRIPSI":res_deskripsi,"SATUAN":res_satuan,"QTY":res_qty}
                arr_input_item.push(obj)
            }
            console.log(JSON.stringify(arr_input_item))
            const res_rows = AddID(arr_input_item)
            setData_rows(res_rows);
            const columns = Def_Column_Terima_Barang()
            setData_columns(columns)
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

    const RemoveItem = (id:number) => {
        let arr = removeItemOnceArray(data_rows,id)
        console.log(arr)
        setData_rows(arr);
    }

    const Def_Column_Terima_Barang = () => {
        var cols = [
                {
                    accessor: 'id',
                    title: 'ACTION',
                    sortable: true,
                    render: ({  id }) => (
                        <div className="flex flex-row gap-2">
                            <div className="mt-1">
                                <a onClick={() => {RemoveItem(id)}} data-twe-toggle="tooltip" title="Delete Data">
                                    <span className="text-danger"><IconTrash  /></span>
                                </a>
                            </div>
                        </div>
                    ),
                },
                {
                    accessor: 'id',
                    title: 'ID',
                    sortable: true,
                    render: ({  id }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{id}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'KODE_BARANG',
                    title: 'CODE ITEM',
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
                },
            ];
            return  cols;
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
                        <div className="grid gap-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 ">
                            <div>
                            <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options6} isSearchable={true} isMulti={false} event={FormInputSupplier} name_component={"Supplier"} idComponent={"supplier"} />
                            </div>
                            <div>
                            <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={optionsGerai} isSearchable={true} isMulti={false} event={FormInputKodeGeraiMutasi} name_component={"Gerai"} idComponent={"gerai"} />
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
                        <InputCheckBoxFilterType event={FormInputSelectMetodeItem} in_title={"Metode Input"} in_value_1={"1"} in_value_2={"0"} in_name_1={"Scan"} in_name_2={"Select Item"} in_name_component_1={"is_metode"} in_name_component_2={"is_metode"} />                
                        <div className="grid gap-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 ">
                            <div className={IN_METODE === '1' ? "" : "hidden"}>
                            <InputTextTypeKeyDown in_title={"Scan Barcode"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputScanBarcode} in_value={IN_BARCODE} in_ref={input1Ref} in_event_keydown={KeyDown} />
                            </div>
                            <div className={IN_METODE === '0' ? "" : "hidden"}>
                            <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={optionsItem} isSearchable={true} isMulti={false} event={FormInputItem} name_component={"Item"} idComponent={"item"} />
                            </div>
                            <div className={IN_METODE === '' ? "hidden" : ""}>
                                <InputTextTypeKeyDown in_title={"Qty"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={false} event={FormInputQty} in_value={IN_QTY} in_ref={input2Ref} in_event_keydown={null} />                        
                            </div>
                            <InputTextType in_title={"Kode Barang"} in_classname_title={"mb-1"} in_classname_content={"w-full hidden"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputResultScanKodeBarang} in_value={IN_RESULT_SCAN_KODE_BARANG}/>
                            <InputTextType in_title={"Deskripsi"} in_classname_title={"mb-1"} in_classname_content={"w-full hidden"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputResultScanDeskripsi} in_value={IN_RESULT_SCAN_DESKRIPSI}/>
                            <InputTextType in_title={"Satuan"} in_classname_title={"mb-1"} in_classname_content={"w-full hidden"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputResultScanSatuan} in_value={IN_RESULT_SCAN_SATUAN}/>
                        </div>
                        <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Add'} HandleClick={AddList} />
                        {
                            data_rows.length > 0 ?
                            <ComponentsDatatablesAdvanced in_column_sort={'id'} in_id={"dt"} Datarow={data_rows} DataColumns={data_columns} />
                            :
                            ''
                        }
                        {/* <ComponentsDatatablesAdvanced in_column_sort={'id'} in_id={"dt"} Datarow={data_rows} DataColumns={data_columns} /> */}
                             
                      </>
                    } />
                </>
            } />
        </>
    )
}
export default FormTerimaBarangMasuk;