'use client'
import {   useEffect,  useState } from "react";
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import {   AddID, get_data_local_storage, get_format_tanggal_jam, GetFormatCurrency, GetToken, validateNumber} from "@/lib/global";
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
       
    },[]);

   
    const FormInputKodeGeraiMutasi  = (value: any) => {var val = value.value;setIN_KODE_GERAI(val); GetPosInitialByKodeGerai(IN_HOST,IN_PORT,val)};
    // const FormInputModal = (value: any) => {var val = value.target.value;var res_val = GetFormatCurrency(val.split(',').join('')); setIN_MODAL(res_val); };
    // const FormInputNikPembuat = (value: any) => {var val = value.target.value;setIN_NIK_PEMBUAT(val); };
    // const FormInputNamaPembuat = (value: any) => {var val = value.target.value;setIN_NAMA_PEMBUAT(val); };
    // const FormInputUangLaci = (value: any) => {var val = value.target.value;var res_val = GetFormatCurrency(val.split(',').join('')); setIN_UANG_LACI(res_val); };
    // const FormInputShift = (value: any) => {var val = value.value;setIN_SHIFT(val); GetPosInitialByKodeGerai() };
    const FormInputItem = (value: any) => {var val = value.target.value;setIN_KODE_BARANG(val); };
    const FormInputDeskripsi = (value: any) => {var val = value.target.value;setIN_DESKRIPSI(val); };
    const FormInputSatuan = (value: any) => {var val = value.target.value;setIN_SATUAN(val); };
    const FormInputQty  = (event: { target: { value: any; }; }) => {var val = event.target.value;const validate_number = validateNumber(val);setIN_QTY(validate_number);  };
    const FormInputHPP = (value: any) => {var val = value.target.value;setIN_HPP(val); };
    const FormInputGross = (value: any) => {var val = value.target.value;setIN_GROSS(val); };
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
                    title: 'CODE ITEM'
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
                    title: 'QTY'
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

    const AddList = () => {
        try{
            
            
            //-- scan barcode --//
            const res_kode_barang = IN_KODE_BARANG
            const res_satuan = IN_SATUAN
            const res_deskripsi = IN_DESKRIPSI
            const res_qty = IN_QTY
            const res_hpp = IN_HPP
            const res_gross = IN_GROSS
            if(res_kode_barang !== '' || res_satuan !== '' || res_deskripsi !== '' || res_qty !== '' || res_hpp !== '' || res_gross !== ''){
                const obj = {"KODE_BARANG":res_kode_barang,"DESKRIPSI":res_deskripsi,"SATUAN":res_satuan,"QTY":res_qty,"DISKON":"0","PRICE":res_hpp,"GROSS":res_gross}
                arr_input_item.push(obj)
            }else{

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
                        <div className="grid grid-cols-1 gap-3 mt-3 lg:grid-cols-3 md:grid-cols-2">
                            <div className="col-span-2 mt-6 panel rounded-3xl">
                                <h5 className="mt-2 text-lg font-semibold dark:text-white-light">Table Item</h5>
                                <div id="dt" className="mt-3 datatables">
                                    <DataTable
                                        noRecordsText="No results match your search query"
                                        highlightOnHover
                                        className="table-hover whitespace-nowrap"
                                        records={data_rows}
                                        columns={data_columns}
                                        minHeight={200}
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-3 mt-3 lg:grid-cols-2 md:grid-cols-2">
                                    <div>
                                        <ButtonAdd in_classname={!isDark ? 'btn btn-danger w-full rounded-full text-end text-xs' : 'btn btn-outline-danger w-full rounded-full text-xs'} idComponent={"btn_pending"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSave />} in_title_button={'Pending Sales'} HandleClick={null} />
                                    </div>
                                    <div>
                                        <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_list_item"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconBox />} in_title_button={'Open Master Produk'} HandleClick={null} />
                                    </div>
                                </div>
                                
                            </div>
                            <div className="mt-6 panel rounded-3xl">
                                <div className="grid gap-3 lg:grid-cols-1 md:grid-cols-2">
                                    <InputTextType   in_title={"Item"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={false} event={FormInputItem} in_value={IN_KODE_BARANG} />
                                    <InputTextType   in_title={"Description"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={true} event={FormInputDeskripsi} in_value={IN_DESKRIPSI} />
                                    <InputTextType   in_title={"Satuan"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={true} event={FormInputSatuan} in_value={IN_SATUAN} />
                                    <InputTextType   in_title={"Qty"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={false} event={FormInputQty} in_value={IN_QTY} />
                                    <InputTextType   in_title={"HPP"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputHPP} in_value={IN_HPP} />
                                    <InputTextType   in_title={"GROSS"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputGross} in_value={IN_GROSS} />
                                    <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_add_item"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconPlusCircle />} in_title_button={'Add Item'} HandleClick={AddList} />
                                </div>
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