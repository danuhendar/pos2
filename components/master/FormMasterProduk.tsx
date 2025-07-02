'use client'
import {  useEffect,  useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import { AddColumn, AddID, GetFormatCurrency, GetToken,  get_data_local_storage, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, removeDuplicates, setTombolAmbilDataGagal, start, stop, textToBase64Barcode } from "@/lib/global";
import { useTranslation } from "react-i18next";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
import { Posts } from "@/lib/post";
import ButtonAdd from "../button/ButtonAdd";
import IconPlus from "../Icon/IconPlus";
import IconRefresh from "../Icon/IconRefresh";
import IconTrash from "../Icon/IconTrash";
import IconPencil from "../Icon/IconPencil";
import ComponentsDatatablesAdvanced from "../table/ComponentsDatatablesAdvanced";
import ModalComponent from "../modal/ModalComponent";
import InputTextType from "../form/InputTypeText";
import IconXCircle from "../Icon/IconXCircle";
import IconSave from "../Icon/IconSave";
import TextAreaComponent from "../form/TextAreaComponent";
import IconCopy from "../Icon/IconCopy";
import withReactContent from "sweetalert2-react-content";
import IconCircleCheck from "../Icon/IconCircleCheck";
import InputCheckBoxFilterType from "../form/InputCheckBoxFilterType";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import Image from "next/image";
import IconBox from "../Icon/IconBox";
import IconShoppingBag from "../Icon/IconShoppingBag";
interface FormMasterProdukProps {
    url: string,
    command: string,
    IDReport: string,
}
const FormMasterProduk: React.FC<FormMasterProdukProps> = ({ url, command, IDReport }) => {
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const [data_rows_Kategori,setData_rows_Kategori]= useState([]);
    const [data_columns_Kategori,setData_columns_Kategori]= useState([]);

    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const [IconButton,setIconButton] = useState(<IconRefresh />)
    const [modal13,setModal13] = useState(false)
    const [modal14,setModal14]= useState(false)
    const [Title,setTitle] = useState('')
    
    const [IN_KODE_KATEGORI,setIN_KODE_KATEGORI] = useState('')
    const [IN_KODE_GERAI,setIN_KODE_GERAI] = useState('')
    const [IN_KODE_BARANG,setIN_KODE_BARANG] = useState('')
    const [IN_CONTENT,setIN_CONTENT] = useState('')
    const [IN_KODE_SUPPLIER,setIN_KODE_SUPPLIER] = useState('')
    const [IN_SUPPLIER,setIN_SUPPLIER] = useState('')
    const [IN_SINGKATAN,setIN_SINGKATAN] = useState('')
    const [IN_HPP,setIN_HPP] = useState('')
    const [IN_HPP_LAST,setIN_HPP_LAST] = useState('')
    const [IN_HPP_LAST_2,setIN_HPP_LAST_2] = useState('')
    const [IN_GROSS,setIN_GROSS] = useState('')
    const [IN_SATUAN,setIN_SATUAN] = useState('')
    const [IN_VARIAN,setIN_VARIAN] = useState('')
    const [IN_BARCODE,setIN_BARCODE] = useState('')
    const [IN_IS_FIXED,setIN_IS_FIXED] = useState('')
    const [IN_IS_RETUR_SUPPLIER,setIN_IS_RETUR_SUPPLIER] = useState('')
    const [IN_CONTENT_KATEGORI,setIN_CONTENT_KATEGORI] = useState('')

    const [options6,setOptions6] = useState([])
    const [options7,setOptions7] = useState([])
    const [options8,setOptions8] = useState([])
    const [Tabs,setTabs] = useState<string>('kategori');

    const MySwal = withReactContent(Swal);
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
    },[]);

   
    const FormInputKodeGerai  = (value: any) => {var val = value.value;setIN_KODE_GERAI(val);  };
    const FormInputKodeBarang = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_KODE_BARANG(val);  };
    const FormInputContent = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_CONTENT(val);  };
    const FormInputKodeKategoriProduk = (value: any) => {var val = value.value;setIN_KODE_KATEGORI(val);  };
    const FormInputSupplier = (value: any) => {var val = value.value;setIN_KODE_SUPPLIER(val);  };
    const FormInputSingkatan = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_SINGKATAN(val);  };
    const FormInputHPP = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_HPP(val);  };
    const FormInputHPPLast = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_HPP_LAST(val);  };
    const FormInputHPPLast_2 = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_HPP_LAST_2(val);  };
    const FormInputGross = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_GROSS(val);  };
    const FormInputSatuan= (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_SATUAN(val);  };
    const FormInputVarian= (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_VARIAN(val);  };
    const FormInputBarcode= (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_BARCODE(val);  };
    const FormInputIS_Fixed= (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_IS_FIXED(val); console.log(val)  };
    const FormInputIS_Retur_Supplier = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_IS_RETUR_SUPPLIER(val);  };
    const FormInputKodeKategori = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_KODE_KATEGORI(val);  };
    const FormInputContentKategori = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_CONTENT_KATEGORI(val);  };

    const GetMasterKategoriProduk = (in_host:string,in_port:number) => {
        setOptions8([])
        let url = `http://${in_host}:${in_port}/api/v2/GetMasterKategoriProduk`
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
                for(var i = 0;i<rows.length;i++){
                    const obj = {"label":rows[i].CONTENT,"value":rows[i].KODE_KATEGORI}
                    arr_.push(obj)
                }
                setOptions8(arr_)
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
    const DelData = (IN_KODE_BARANG:any) => {
        Swal.fire({
            icon: "question",
            title: t("Confirmation"),
            text: t("Are you sure for")+" delete data?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
            padding: '2em',
            customClass: 'sweet-alerts'
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let url = ''
                let param = {}
                if(Tabs === 'produk'){
                    url = `http://${IN_HOST}:${IN_PORT}/api/v2/DelMasterProdukByKodeProduk`
                    param = {"IN_KODE_BARANG":IN_KODE_BARANG}
                }else{
                    url = `http://${IN_HOST}:${IN_PORT}/api/v2/DelMasterKategori`
                    param = {"IN_KODE_KATEGORI":IN_KODE_BARANG}
                }
              
                const Token = GetToken()
                Posts(url,JSON.stringify(param),false,Token).then((response) => {
                    const res_data = response;
                    var code = res_data.code;
                    var msg = res_data.msg;
                    if(parseFloat(code) === 200){
                        Swal.fire({
                            title: t("Infomration"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "success",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        GetData(IN_HOST,IN_PORT)
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
        })
    }
    const AddData = () => {
        if(Tabs === 'produk'){
            setModal13(true)
            setIN_KODE_GERAI('')
            setIN_KODE_BARANG('Auto Generate')
            setIN_CONTENT('')
            setIN_SUPPLIER('')
            setIN_SINGKATAN('')
            setIN_HPP('')
            setIN_HPP_LAST('')
            setIN_HPP_LAST_2('')
            setIN_GROSS('')
            setIN_SATUAN('')
            setIN_VARIAN('')
            setIN_BARCODE('')
            setIN_IS_FIXED('')
            setIN_IS_RETUR_SUPPLIER('')
            setTitle('Form Add : '+IDReport)
            GetMasterSupplier(IN_HOST,IN_PORT)
            GetMasterGerai(IN_HOST,IN_PORT)
            GetMasterKategoriProduk(IN_HOST,IN_PORT)
        }else{
            setModal14(true)
            setIN_CONTENT_KATEGORI('')
            setTitle('Form Add : Category')
            setIN_KODE_KATEGORI('Auto Generate')
        }
    }
    const showModalKategori = (IDReport:string,KODE_KATEGORI:string,CONTENT:string)=>{
        setModal14(true)
        setIN_KODE_KATEGORI(KODE_KATEGORI)
        setIN_CONTENT_KATEGORI(CONTENT)
        setTitle('Form : '+IDReport)
    }
    const showModal = (IDReport:string,KODE_KATEGORI:string,KODE_GERAI:string,KODE_BARANG:string,CONTENT:string,KODE_SUPPLIER:number,SUPPLIER:string,SINGKATAN:string,HPP:string,HPP_LAST:string,HPP_LAST_2:string,GROSS:string,SATUAN:string,VARIAN:string,BARCODE:string,IS_FIXED:string,IS_RETUR_SUPPLIER:string) => {
        setModal13(true)
        setIN_KODE_KATEGORI(KODE_KATEGORI)
        setIN_KODE_GERAI(KODE_GERAI)
        setIN_KODE_BARANG(KODE_BARANG)
        setIN_CONTENT(CONTENT)
        setIN_SUPPLIER(SUPPLIER)
        setIN_SINGKATAN(SINGKATAN)
        setIN_HPP(HPP)
        setIN_HPP_LAST(HPP_LAST)
        setIN_HPP_LAST_2(HPP_LAST_2)
        setIN_GROSS(GROSS)
        setIN_SATUAN(SATUAN)
        setIN_VARIAN(VARIAN)
        setIN_BARCODE(BARCODE)
        setIN_IS_FIXED(IS_FIXED)
        setIN_IS_RETUR_SUPPLIER(IS_RETUR_SUPPLIER)
        setTitle('Form : '+IDReport)
        GetMasterSupplier(IN_HOST,IN_PORT)
        GetMasterGerai(IN_HOST,IN_PORT)
        GetMasterKategoriProduk(IN_HOST,IN_PORT)
    }
    
    const InsData = () =>{
        Swal.fire({
            icon: "question",
            title: t("Confirmation"),
            text: t("Are you sure for")+" save data?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
            padding: '2em',
            customClass: 'sweet-alerts'
            }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const InputNik = get_data_local_storage('nik')
                let res_kode_barang = ''
                let res_kode_kategori = ''
                let Token = GetToken()
                if(Title.includes('Add')){
                    if(Tabs === 'produk'){
                        const url_get_kode_supplier = `http://${IN_HOST}:${IN_PORT}/api/v2/GetKodeBarang`
                        const param = {}
                        await Posts(url_get_kode_supplier,JSON.stringify(param),false,Token).then((response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            if(parseFloat(code) === 200){
                                var data_body = res_data.data;
                                res_kode_barang = data_body[0].KODE_BARANG
                            }else{
                                res_kode_barang = 'Not Autorized'
                            }
                        });
                    }else{
                        const url_get_kode_supplier = `http://${IN_HOST}:${IN_PORT}/api/v2/GetKodeKategori`
                        const param = {}
                        await Posts(url_get_kode_supplier,JSON.stringify(param),false,Token).then((response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            if(parseFloat(code) === 200){
                                var data_body = res_data.data;
                                res_kode_kategori = data_body[0].KODE_KATEGORI
                            }else{
                                res_kode_kategori = 'Not Autorized'
                            }
                        });
                    }
                   
                }else{
                    if(Tabs === 'produk'){
                        res_kode_barang = IN_KODE_BARANG
                    }else{
                        res_kode_kategori = IN_KODE_KATEGORI
                    }
                   
                }
                let url = ''
                let param = {}
                if(Tabs === 'produk'){
                    url = `http://${IN_HOST}:${IN_PORT}/api/v2/InsMasterProduk`
                    param = {"IN_KODE_BARANG":res_kode_barang,"IN_KODE_KATEGORI":IN_KODE_KATEGORI,"IN_KODE_SUPPLIER":IN_KODE_SUPPLIER,"IN_CONTENT":IN_CONTENT,"IN_SINGKATAN":IN_SINGKATAN,"IN_HPP":IN_HPP,"IN_GROSS":IN_GROSS,"IN_IS_RETUR_SUPPLIER":IN_IS_RETUR_SUPPLIER,"IN_VARIAN":IN_VARIAN,"IN_SATUAN":IN_SATUAN,"IN_IS_FIXED":IN_IS_FIXED,"IN_IS_AKTIF":1,"IN_BARCODE":IN_BARCODE,"IN_OTORISATOR":InputNik,"IN_KODE_GERAI":IN_KODE_GERAI}
                    //console.log(JSON.stringify(param))
                }else{
                    url = `http://${IN_HOST}:${IN_PORT}/api/v2/InsMasterKategoriProduk`
                    param = {"IN_KODE_KATEGORI":res_kode_kategori,"IN_CONTENT":IN_CONTENT_KATEGORI}
                    //console.log(JSON.stringify(param))
                }
               
                Posts(url,JSON.stringify(param),false,Token).then((response) => {
                    const res_data = response;
                    var code = res_data.code;
                    var msg = res_data.msg;
                    if(parseFloat(code) === 200){
                        Swal.fire({
                            title: t("Infomration"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "success",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        GetData(IN_HOST,IN_PORT)
                        CloseModal()
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
        })
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
    const Def_Column_MasterKategori = () => {
        var cols = [
                {
                    accessor: 'id',
                    title: 'ACTION',
                    sortable: true,
                    render: ({ KODE_KATEGORI,CONTENT}) => (
                        <div className="flex flex-row gap-2">
                            <div className="mt-1">
                                <a onClick={() => {showModalKategori(' Edit '+IDReport,KODE_KATEGORI,CONTENT)}} data-twe-toggle="tooltip" title="Edit Data">
                                    <span className="text-warning"><IconPencil  /></span>
                                </a>
                            </div>
                            <div className="mt-1">
                                <a onClick={() => {DelData(KODE_KATEGORI)}} data-twe-toggle="tooltip" title="Delete Data">
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
                    render: ({ id }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{id}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'KODE_KATEGORI',
                    title: 'CODE',
                    sortable: true,
                    render: ({ KODE_KATEGORI }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{KODE_KATEGORI}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'CONTENT',
                    title: 'CATEGORY',
                    sortable: true,
                    render: ({ CONTENT }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{CONTENT}</div>
                        </div>
                    ),
                }
            ];
            return  cols;
    }
    const Def_Column_MasterProduk = () => {
        var cols = [
                {
                    accessor: 'id',
                    title: 'ACTION',
                    sortable: true,
                    render: ({ KODE_KATEGORI,KODE_GERAI,KODE_BARANG,CONTENT,KODE_SUPPLIER,SUPPLIER,SINGKATAN,HPP,HPP_LAST,HPP_LAST_2,GROSS,SATUAN,VARIAN,BARCODE,IS_FIXED,IS_RETUR_SUPPLIER }) => (
                        <div className="flex flex-row gap-2">
                            <div className="mt-1">
                                <a onClick={() => {showModal(' Edit '+IDReport,KODE_KATEGORI,KODE_GERAI,KODE_BARANG,CONTENT,KODE_SUPPLIER,SUPPLIER,SINGKATAN,HPP,HPP_LAST,HPP_LAST_2,GROSS,SATUAN,VARIAN,BARCODE,IS_FIXED,IS_RETUR_SUPPLIER)}} data-twe-toggle="tooltip" title="Edit Data">
                                    <span className="text-warning"><IconPencil  /></span>
                                </a>
                            </div>
                            <div className="mt-1">
                                <a onClick={() => {DelData(KODE_BARANG)}} data-twe-toggle="tooltip" title="Delete Data">
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
                    render: ({ id }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{id}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'KODE_GERAI',
                    title: 'STORE CODE',
                    sortable: true,
                    render: ({ KODE_GERAI }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{KODE_GERAI}</div>
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
                    title: 'CONTENT',
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
                    accessor: 'SINGKATAN',
                    title: 'SINGKATAN',
                    sortable: true,
                    render: ({ SINGKATAN }) => (
                        <div className="flex items-center gap-2">
                            {/* <div>
                                <a onClick={()=> CopyText(NO_HP)}><IconCopy className="text-primary"/></a>
                            </div> */}
                            <div className="font-semibold">{SINGKATAN}</div>
                            
                        </div>
                    ),
                },
                {
                    accessor: 'HPP',
                    title: 'HPP',
                    sortable: true,
                    render: ({ HPP }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{GetFormatCurrency(HPP)}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'HPP_LAST',
                    title: 'HPP_LAST',
                    sortable: true,
                    render: ({ HPP_LAST }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{GetFormatCurrency(HPP_LAST)}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'HPP_LAST_2',
                    title: 'HPP_LAST_2',
                    sortable: true,
                    render: ({ HPP_LAST_2 }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{GetFormatCurrency(HPP_LAST_2)}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'GROSS',
                    title: 'GROSS',
                    sortable: true,
                    render: ({ GROSS }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{GetFormatCurrency(GROSS)}</div>
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
                            <Image alt="No Barcode" width={500} height={400} quality={10} src={textToBase64Barcode(BARCODE)} />
                        </div>
                    ),
                },
                {
                    accessor: 'IS_FIXED',
                    title: 'IS_FIXED',
                    sortable: true,
                    render: ({ IS_FIXED }) => (
                        <div className="flex items-center gap-2">
                            <span className={`text-${IS_FIXED === 1 ? 'success' : 'danger'} `}>{(IS_FIXED === 1 ? <IconCircleCheck /> : <IconXCircle /> )}</span>
                        </div>
                    ),
                },
                {
                    accessor: 'IS_RETUR_SUPPLIER',
                    title: 'IS_RETUR_SUPPLIER',
                    sortable: true,
                    render: ({ IS_RETUR_SUPPLIER }) => (
                        <div className="flex items-center gap-2">
                            <span className={`text-${IS_RETUR_SUPPLIER === 1 ? 'success' : 'danger'} `}>{(IS_RETUR_SUPPLIER === 1 ? <IconCircleCheck /> : <IconXCircle /> )}</span>
                        </div>
                    ),
                },
            ];
            return  cols;
    }
    const GetData = (in_host:string,in_port:number) => {
   
        
        let url = ""
        let param = {}
        var cols = []
        console.log(Tabs)
        if(Tabs === 'produk'){
            setData_rows([])
            setData_columns([])
            url = `http://${in_host}:${in_port}/api/v2/GetMasterProdukByKodeProdukAndKodeGerai`
            param = {"IN_KODE_BARANG":"%","IN_KODE_GERAI":"G%"}
            cols = Def_Column_MasterProduk()
        }else{
            setData_rows_Kategori([])
            setData_columns_Kategori([])
            url = `http://${in_host}:${in_port}/api/v2/GetMasterKategoriProduk`
            param = {"IN_KODE_KATEGORI":"%"}
            cols = Def_Column_MasterKategori()
        }
   
        const Token = GetToken()
        setLoading(true)
        setTextButtonFilter(t('Please wait'))
        setLoadingButton(true)
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                if(Tabs === 'kategori'){
                    var rows = data_body[0].ROWS
                    var res_rows = AddID(rows);
                    setData_rows_Kategori(res_rows);
                    setData_columns_Kategori(cols);
                }else{
                    var res_rows = AddID(data_body);
                    setData_rows(res_rows);
                    setData_columns(cols);
                }
               
                setLoading(false)
                setTextButtonFilter(t('Refresh'))
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
                setLoading(false)
                setTextButtonFilter(t('Refresh'))
                setLoadingButton(false)
            }else{
                Swal.fire({
                    title: t("Warning"),
                    text: ""+parseFloat(code)+"-"+msg,
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setLoading(false)
                setTextButtonFilter(t('Refresh'))
                setLoadingButton(false)
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
            setLoading(false)
            setTextButtonFilter(t('Refresh'))
            setLoadingButton(false)
        });
    }
    
    const RefreshData = () => {
        try {
            GetData(IN_HOST,IN_PORT)
        } catch (Ex) {
            console.log('error : ' + Ex.toString())
        }
    };

    
    const CloseModal = ()=>{
        if(modal13){
            setModal13(false)
        }else{
            setModal14(false)
        }
        
    }
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                    <div>
                        <ul className="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
                            <li className="inline-block">
                                <button
                                    onClick={() => toggleTabs('kategori')}
                                    className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${Tabs === 'kategori' ? '!border-primary text-primary' : ''}`}
                                >
                                    <IconBox />
                                    {t('Category Product')}
                                </button>
                            </li>
                            <li className="inline-block">
                                <button
                                    onClick={() => toggleTabs('produk')}
                                    className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${Tabs === 'produk' ? '!border-primary text-primary' : ''}`}
                                >
                                    <IconShoppingBag />
                                     {t('Product')}
                                </button>
                            </li>
                        </ul>
                    </div>
                    {
                        Tabs === 'kategori' ? 
                        <>
                        <div className="flex flex-row items-start gap-3 mb-3">
                            <div>
                            <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_filter"} isLoading={false} isDisabled={isDisabled} in_icon={<IconPlus />} in_title_button={'Add'} HandleClick={AddData} />
                            </div>
                            <div>
                            <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Refresh'} HandleClick={RefreshData} />
                            </div>
                        </div>
                        {
                            data_rows_Kategori.length > 0 ?
                            <ComponentsDatatablesAdvanced Datarow={data_rows_Kategori} DataColumns={data_columns_Kategori} />
                            :
                            ''
                        }
                        <ModalComponent in_size_modal={`panel animate__animated my-7 w-1/3 overflow-hidden rounded-3xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal14} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-sm font-bold"} in_title_modal={Title} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                            <div className="p-2">
                                <div className="mb-5">
                                    
                                    <InputTextType in_title={"Code Category"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputKodeKategori} in_value={IN_KODE_KATEGORI} />
                                    <InputTextType in_title={"Category"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputContentKategori} in_value={IN_CONTENT_KATEGORI} />
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-8">
                                    <ButtonAdd in_classname={'btn btn-outline-danger rounded-full text-xs'} idComponent={"btn_close"} isLoading={false} isDisabled={isDisabled} in_icon={<IconXCircle />} in_title_button={'Cancel'} HandleClick={CloseModal} />
                                    <ButtonAdd in_classname={!isDark ? 'btn btn-primary rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_save"} isLoading={false} isDisabled={isDisabled} in_icon={<IconSave />} in_title_button={'Save'} HandleClick={InsData} />
                                </div>
                            </div>
                        } />
                        </>
                        : 
                        <>
                        <div className="flex flex-row items-start gap-3 mb-3">
                            <div>
                            <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_filter"} isLoading={false} isDisabled={isDisabled} in_icon={<IconPlus />} in_title_button={'Add'} HandleClick={AddData} />
                            </div>
                            <div>
                            <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Refresh'} HandleClick={RefreshData} />
                            </div>
                        </div>
                        {
                            data_rows.length > 0 ?
                            <ComponentsDatatablesAdvanced Datarow={data_rows} DataColumns={data_columns} />
                            :
                            ''
                        }
                        <ModalComponent in_size_modal={`panel animate__animated my-7 w-2/3 overflow-hidden rounded-3xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-sm font-bold"} in_title_modal={Title} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                            <div className="p-2">
                                <div className="mb-5">
                                    <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options6} isSearchable={true} isMulti={false} event={FormInputSupplier} name_component={"Supplier"} idComponent={"supplier"} />
                                    <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options8} isSearchable={true} isMulti={false} event={FormInputKodeKategoriProduk} name_component={"Kategori"} idComponent={"kategori"} />                                                             
                                    <InputTextType in_title={"Kode Barang"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputKodeBarang} in_value={IN_KODE_BARANG} />
                                    <InputTextType in_title={"Item"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputContent} in_value={IN_CONTENT} />
                                    <InputTextType in_title={"Singkatan"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputSingkatan} in_value={IN_SINGKATAN} />
                                    <InputTextType in_title={"HPP"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputHPP} in_value={IN_HPP} />
                                    <InputTextType in_title={"Gross"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputGross} in_value={IN_GROSS} />
                                    
                                    
                                    <InputCheckBoxFilterType event={FormInputIS_Retur_Supplier} in_title={"IS Retur Supplier"} in_value_1={"1"} in_value_2={"0"} in_name_1={"Y"} in_name_2={"N"} in_name_component_1={"is_retur_supplier"} in_name_component_2={"is_retur_supplier"} />
                                    <InputTextType in_title={"Varian"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputVarian} in_value={IN_VARIAN} />
                                    <InputCheckBoxFilterType event={FormInputSatuan} in_title={"Satuan"} in_value_1={"KARTON"} in_value_2={"PCS"} in_name_1={"KARTON"} in_name_2={"PCS"} in_name_component_1={"satuan"} in_name_component_2={"satuan"} />
                                    <InputCheckBoxFilterType event={FormInputIS_Fixed} in_title={"IS Fixed Produk"} in_value_1={"1"} in_value_2={"0"} in_name_1={"Y"} in_name_2={"N"} in_name_component_1={"is_fixed_produk"} in_name_component_2={"is_fixed_produk"} />
                                    <InputTextType in_title={"Barcode"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputBarcode} in_value={IN_BARCODE} />
                                    <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options7} isSearchable={true} isMulti={false} event={FormInputKodeGerai} name_component={"Kode Gerai"} idComponent={"kode_gerai"} />

                                </div>
                                <div className="flex items-center justify-end gap-3 mt-8">
                                    <ButtonAdd in_classname={'btn btn-outline-danger rounded-full text-xs'} idComponent={"btn_close"} isLoading={false} isDisabled={isDisabled} in_icon={<IconXCircle />} in_title_button={'Cancel'} HandleClick={CloseModal} />
                                    <ButtonAdd in_classname={!isDark ? 'btn btn-primary rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_save"} isLoading={false} isDisabled={isDisabled} in_icon={<IconSave />} in_title_button={'Save'} HandleClick={InsData} />
                                </div>
                            </div>
                        } />
                        </>
                    }
                </>
            } />
        </>
    )
}
export default FormMasterProduk;