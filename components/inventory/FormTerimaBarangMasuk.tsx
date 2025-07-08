'use client'
import {  useEffect,  useRef,  useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import { AddColumn, AddID, get_data_local_storage, get_format_tanggal_jam, GetToken} from "@/lib/global";
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
    const [IN_KODE_BARANG,setIN_KODE_BARANG] = useState('')
    const [IN_DESKRIPSI,setIN_DESKRIPSI] = useState('')
    const [IN_SATUAN,setIN_SATUAN] = useState('')
    const [IN_QTY,setIN_QTY] = useState('')
    const [IN_METODE,setIN_METODE] = useState('')
    const [IN_BARCODE,setIN_BARCODE] = useState('')


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
    const FormInputItem = (value: any) => {var val = value.value;setIN_KODE_BARANG(val);  };
    const FormInputSelectMetodeItem = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_METODE(val);  };
    // const FormInputScanBarcode = (event: { target: { value: any; }; }) => {
    //     var val = event.target.value;setIN_BARCODE(val);  
        
    // };
    const input2Ref = useRef(null);
    const FormInputScanBarcode = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter pressed!');
            // Lakukan sesuatu, seperti submit form atau panggil fungsi lainnya
            var val = event.target.value;setIN_BARCODE(val);  
            input2Ref.current.focus(); // Pindah ke input kedua
        }
    };
    const FormInputQty  = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_QTY(val);  };
    
     

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
                    const obj = {"label":data_body[i].CONTENT,"value":data_body[i].KODE_BARANG}
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

    
    const Def_Column_MutasiStok = () => {
        var cols = [
                // {
                //     accessor: 'id',
                //     title: 'ID',
                //     sortable: true,
                //     render: ({ id }) => (
                //         <div className="flex items-center gap-2">
                //             <div className="font-semibold">{id}</div>
                //         </div>
                //     ),
                // },
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
                    accessor: 'GERAI',
                    title: 'GERAI',
                    sortable: true,
                    render: ({ GERAI }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{GERAI}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'KODE_BARANG',
                    title: 'CODE',
                    sortable: true,
                    render: ({ KODE_BARANG }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{KODE_BARANG}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'DESKRIPSI',
                    title: 'CONTENT',
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
                    accessor: 'JENIS',
                    title: 'JENIS',
                    sortable: true,
                    render: ({ JENIS }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-${JENIS === 'BPB' || JENIS === 'RETUR SALES' || JENIS === 'VOID'  ? 'success' : 'danger'} `}>{JENIS}</div>
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
                {
                    accessor: 'OTORISATOR',
                    title: 'OTORISATOR',
                    sortable: true,
                    render: ({ OTORISATOR }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{OTORISATOR}</div>
                        </div>
                    ),
                }
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
                        <InputTextType in_title={"Code Transaction"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputKodeTransaksi} in_value={IN_KODE_TRANSAKSI} />
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
                            <InputTextType in_title={"Scan Barcode"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputScanBarcode} in_value={IN_BARCODE} />
                            </div>
                            <div className={IN_METODE === '0' ? "" : "hidden"}>
                            <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={optionsItem} isSearchable={true} isMulti={false} event={FormInputItem} name_component={"Item"} idComponent={"item"} />
                            </div>
                            <div className={IN_METODE === '' ? "hidden" : ""}>
                                <InputTextType in_title={"Qty"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={false} event={FormInputQty} in_value={IN_QTY} in_ref={input2Ref} />                        
                            </div>
                        </div>
                        
                      </>
                    } />
                </>
            } />
        </>
    )
}
export default FormTerimaBarangMasuk;