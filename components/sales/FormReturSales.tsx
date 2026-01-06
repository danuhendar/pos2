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
import { add, set } from "lodash";
import IconLock from "../Icon/IconLock";
import withReactContent from "sweetalert2-react-content";
import IconBook from "../Icon/IconBook";
import IconTrash from "../Icon/IconTrash";
import { DataTable } from "mantine-datatable";
import TextAreaComponent from "../form/TextAreaComponent";
import IconSave from "../Icon/IconSave";

interface FormReturSalesProps {
    url: string,
    jenis: string,
    IDReport: string,
}
const FormReturSales: React.FC<FormReturSalesProps> = ({ url, jenis, IDReport }) => {
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
    const [optionsShift,setOptionsShift] = useState([])
    const [options7,setOptions7] = useState([])
    const [IN_SHIFT,setIN_SHIFT] = useState('')
    const [IN_KODE_GERAI,setIN_KODE_GERAI] = useState('')
    const [IN_IS_GERAI,setIN_IS_GERAI] = useState('')
    const curdate = get_format_tanggal_jam().substring(0,16);
    const [date2, setDate2] = useState<any>(curdate);
    const [IN_TANGGAL,setIN_TANGGAL] = useState('')
    const [IN_KODE_INITIAL, setIN_KODE_INITIAL] = useState('')
    const [IN_KODE_GERAI_INITIAL, setIN_KODE_GERAI_INITIAL] = useState('')
    const [IN_NIK, setIN_NIK] = useState('')
    const [IN_NAMA, setIN_NAMA] = useState('')
    const [IN_GROSS_SALES, setIN_GROSS_SALES] = useState('')
    const [IN_DISKON, setIN_DISKON] = useState('')
    const [IN_NET_SALES, setIN_NET_SALES] = useState('')
    const [LoadingButtonClosing,setLoadingButtonClosing] = useState(false)
    const [isDisabledClosing,setisDisabledClosing] = useState(false)    
    const [IN_NO_STRUK, setIN_NO_STRUK] = useState('')
    const [TotalBelanja, setTotalBelanja] = useState('0')
    const [TotalPPN, setTotalPPN] = useState('0')
    const [TotalDiscount, setTotalDiscount] = useState('0')
    const [BiayaOngkir, setBiayaOngkir] = useState('0')
    const [GrandTotal, setGrandTotal] = useState('0')  
    const [IN_KETERANGAN_RETUR, setIN_KETERANGAN_RETUR] = useState('')
    const [LoadingButtonSave,setLoadingButtonSave] = useState(false)
    const [isDisabledSave,setisDisabledSave] = useState(false)
    const [isContentDataSales, setisContentDataSales] = useState(false);
    const [IN_NIK_PEMBUAT, setIN_NIK_PEMBUAT] = useState('')
    const [IN_NAMA_PEMBUAT, setIN_NAMA_PEMBUAT] = useState('')
    const MySwal = withReactContent(Swal);
     
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        const InputNikPemohon = get_data_local_storage('nik');
        setIN_NIK_PEMBUAT(InputNikPemohon)
     
        const InputNamaPemohon = get_data_local_storage('nama');
        setIN_NAMA_PEMBUAT(InputNamaPemohon)
         
        const kode_gerai = get_data_local_storage('kode_gerai')
        const is_gerai = get_data_local_storage('is_gerai')
        setIN_IS_GERAI(is_gerai)
        if(is_gerai === '0'){
            GetMasterGerai(res_host,res_PORT_LOGIN)
        }else{
            setIN_KODE_GERAI(kode_gerai)    
        }

        // const op = [{"label":"1","value":"1"},{"label":"2","value":"2"},{"label":"3","value":"3"}]
        // setOptionsShift(op)
        const cols = Def_Column_Transaksi_Inventory();
        setData_columns(cols)
    },[]);

    // Detect any change in the array
    useEffect(() => {
        console.log("Array updated:", data_rows);
        // You can also trigger calculations or events here
        //-- calcutate total after delete row --//
        var total_belanja = 0;
        var total_ppn = 0;
        var total_diskon = 0;
        var biaya_ongkir = 0;
        var grand_total = 0;
        for(var i = 0;i<data_rows.length;i++){
         
       
            
            total_ppn += parseFloat(data_rows[i].PPN);
            total_diskon += parseFloat(data_rows[i].DISKON);
            biaya_ongkir += parseFloat(data_rows[i].BIAYA_ONGKIR);
            total_belanja += parseFloat(data_rows[i].PRICE);
            
        }
        setTotalBelanja(GetFormatCurrency(""+(total_belanja)))
        setTotalPPN(GetFormatCurrency(""+total_ppn))
        setTotalDiscount(GetFormatCurrency(""+total_diskon))        
        setGrandTotal(GetFormatCurrency(""+(total_belanja - (total_diskon + total_ppn))))
        //-- end calculate total --//
    }, [data_rows]);
    
    const FormInputKodeGerai = (value: any) => {var val = value.value;setIN_KODE_GERAI(val);};
    const FormInputNoStruk = (event: { target: { value: any; }; }) => {var val = event.target.value; setIN_NO_STRUK(val);};
    const FormInputKeteranganRetur = (event: { target: { value: any; }; }) => {var val = event.target.value; setIN_KETERANGAN_RETUR(val);};
    
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
                    const obj = {"label":rows[i].KODE_GERAI+'-'+rows[i].CONTENT,"value":rows[i].KODE_GERAI}
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

    const deleteRow = (idToRemove: number) => {
        console.log('deleteRow : '+idToRemove)
        setData_rows((prev) => prev.filter((data_rows) => data_rows.id !== idToRemove));
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
                    accessor: 'id',
                    title: 'ID',
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
                    title: 'GROSS',
                    render: ({ GROSS }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{GetFormatCurrency(GROSS)}</div>
                            
                        </div>
                    ),
                },
                {
                    accessor: 'DISKON',
                    title: 'DISCOUNT',
                    render: ({ DISKON }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{GetFormatCurrency(DISKON)}</div>

                        </div>
                    ),
                },
                {
                    accessor: 'PRICE',
                    title: 'AMOUNT',
                    render: ({ PRICE }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{GetFormatCurrency(PRICE)}</div>
                        </div>
                    ),
                },
            ];
            return  cols;
    } 

    const GetDataTransaksiInventoryByNoStruk = () => {
        setData_rows([])
        setisContentDataSales(false);
        let url = `https://${IN_HOST}/api/v2/GetDataTransaksiInventoryByNoStruk`
        let param = {"IN_NO_STRUK":IN_NO_STRUK,"IN_IS_STATUS":"1","IN_JENIS":parseFloat(jenis)}
        const Token = GetToken()
        setLoadingButton(true)
        setisDisabled(true)
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                var rows = data_body[0].DETAIL;
                var res_rows = AddID(rows);
                var total_belanja = 0;
                var total_ppn = 0;
                var total_diskon = 0;
                var biaya_ongkir = 0;
                var grand_total = 0;
                for(var i = 0;i<res_rows.length;i++){
                    total_belanja += parseFloat(res_rows[i].GROSS);
                    total_ppn += parseFloat(res_rows[i].PPN);
                    total_diskon += parseFloat(res_rows[i].DISKON);
                    biaya_ongkir += parseFloat(res_rows[i].BIAYA_ONGKIR);
                    grand_total += parseFloat(res_rows[i].PRICE);
                }
                setTotalBelanja(GetFormatCurrency(""+total_belanja))
                setTotalPPN(GetFormatCurrency(""+total_ppn))
                setTotalDiscount(GetFormatCurrency(""+total_diskon))
                setBiayaOngkir(GetFormatCurrency(""+biaya_ongkir))
                setGrandTotal(GetFormatCurrency(""+grand_total))
                
                
                setData_rows(res_rows)
                setLoadingButton(false)
                setisDisabled(false)
                setisContentDataSales(true)
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
    }
    const GetGenerateKodeTransaksiInventory = () => {
        let url = `https://${IN_HOST}/api/v2/GetGenerateKodeTransaksiInventory`
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
    const InsPosReturSales = () => {
        Swal.fire({
            title: t("Confirmation"),
            text: t("Are you sure want to save this data?"),
            icon: "question",
            showCancelButton: true,
            padding: '2em',
            customClass: 'sweet-alerts',
            confirmButtonText: t("Yes"),
            cancelButtonText: t("No"),
        }).then((result) => {
            if (result.isConfirmed) {
                GetGenerateKodeTransaksiInventory().then((d)=>{
                    const kode_transaksi_inventory = d;
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
                    let url = `https://${IN_HOST}/api/v2/InsPosReturSales`
                    let param = {"IN_KODE_TRANSAKSI":kode_transaksi_inventory,"IN_NO_STRUK":IN_NO_STRUK,"IN_KETERANGAN_RETUR":IN_KETERANGAN_RETUR,"IN_JENIS":parseFloat(jenis),"IN_DETAIL":detail,"IN_KODE_GERAI":IN_KODE_GERAI,"IN_TANGGAL":get_format_tanggal_jam(),"IN_NIK_PEMBUAT":IN_NIK_PEMBUAT,"IN_NAMA_PEMBUAT":IN_NAMA_PEMBUAT,"IN_OTORISATOR":themeConfig.versi_app}
                    console.log("param : "+JSON.stringify(param))
                    console.log("url : "+url)
                    const Token = GetToken()
                    setLoadingButtonSave(true)
                    setisDisabledSave(true)
                    Posts(url,JSON.stringify(param),false,Token).then((response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        if(parseFloat(code) === 200){
                            MySwal.fire({
                                title: t("Success"),
                                text: t("Data has been saved successfully!"),
                                icon: "success",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setIN_NO_STRUK('')
                            setIN_KETERANGAN_RETUR('')
                            setData_rows([])
                            setTotalBelanja('0')
                            setTotalPPN('0')
                            setTotalDiscount('0')
                            setBiayaOngkir('0')
                            setGrandTotal('0')
                            setLoadingButtonSave(false)
                            setisDisabledSave(false)
                            setisContentDataSales(false);
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
                        setLoadingButtonSave(false)
                        setisDisabledSave(false)
                    }).catch((error) => {
                        Swal.fire({
                            title: t("Warning"),
                            text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoadingButtonSave(false)
                        setisDisabledSave(false)
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
                
            }
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
                        <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 xs:grid-cols-1">
                            {
                                IN_IS_GERAI  === '0' ?
                                <div>
                                <DropDownGlobal in_is_clear={false}in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options7} isSearchable={true} isMulti={false} event={FormInputKodeGerai} name_component={"Gerai"} idComponent={"gerai"} />
                                </div>
                                :
                                <div>
                                <InputTextType   in_title={"Gerai"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_KODE_GERAI} />
                                </div>
                            }
                            <div>
                            <InputTextType   in_title={"Tanggal"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl cursor-not-allowed"} data_options={undefined} isDisabled={true} event={null} in_value={ConvertDateFormat(date2,false)} />
                            </div>
                            <div>
                            <InputTextType   in_title={"No. Struk"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputNoStruk} in_value={IN_NO_STRUK} />
                            </div>
                            <div className="lg:mt-8 md:mt-8">
                            <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Filter'} HandleClick={GetDataTransaksiInventoryByNoStruk} />    
                            </div>
                        </div>
                      </>
                } />
                {
                    isContentDataSales ?
                    <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconPrinter />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={"Data Sales"} in_content={
                        <>
                        {
                            data_rows.length > 0 ?
                            <>
                            <div className="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
                                <span className="ltr:pr-2 rtl:pl-2">
                                    <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>{t('Note: Remove item from cart, if item was returned!')}
                                </span>
                            </div>
                            
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
                        
                            <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-1">
                                <div>
                                    <TextAreaComponent in_title={"Description Return Sales"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} isDisabled={false} event={FormInputKeteranganRetur} in_value={IN_KETERANGAN_RETUR} in_rows={4} in_cols={30} />
                                </div>
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
                                
                                    <div className="flex items-center text-xl font-semibold">
                                        <div className="flex-1">Grand Total :</div>
                                        <div className="w-[37%]">{GrandTotal}</div>
                                    </div>
                                </div>
                            </div>
                            <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs mt-3' : 'btn btn-outline-success w-full rounded-full text-xs mt-3'} idComponent={"btn_save"} isLoading={LoadingButtonSave} isDisabled={isDisabledSave} in_icon={<IconSave />} in_title_button={'Save'} HandleClick={InsPosReturSales} />
                            </>
                            :
                            ''
                        }
                        </>
                    } />
                    :
                    ''                    
                }
                
                </>
            } />
        </>
    )
}    
export default FormReturSales;