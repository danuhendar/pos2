'use client'
import {  useEffect,  useRef,  useState } from "react";
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
import CardComponent from "../form/CardComponent";
import IconSearch from "../Icon/IconSearch";
import IconPrinter from "../Icon/IconPrinter";
import { useReactToPrint } from 'react-to-print';
import PriceTag from "../form/PriceTag";
interface FormMasterPriceTagProps {
    url: string,
    command: string,
    IDReport: string,
}
const FormMasterPriceTag: React.FC<FormMasterPriceTagProps  > = ({ url, command, IDReport }) => {
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
	const [ISCOMBO_GERAI,setIN_ISCOMBO_GERAI] = useState(false)
    
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        GetMasterKategoriProduk(res_host,res_PORT_LOGIN)
        const kode_gerai = get_data_local_storage('kode_gerai')
        if(kode_gerai === '%' || kode_gerai === ''){
            GetMasterGerai(res_host,res_PORT_LOGIN)
			setIN_ISCOMBO_GERAI(true)
        }else{
            setIN_KODE_GERAI(kode_gerai)    
			setIN_ISCOMBO_GERAI(false)
        }
        
    },[]);

    const FormInputKategori = (value: any) => {var val = value.value;setIN_KATEGORI(val);  };
    const FormInputKodeGerai = (value: any) => {var val = value.value;setIN_KODE_GERAI(val);};
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: 'Price Tags',
        pageStyle: `
        @page {
            size: auto;
            margin: 10mm;
        }
        body {
            font-family: sans-serif;
        }
        `,
    });

    const GetMasterKategoriProduk = (in_host:string,in_port:number) => {
        let url = `http://${in_host}:${in_port}/api/v2/GetMasterKategoriProduk`
        let param = {"IN_KODE_KATEGORI":"%"}
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
                    const obj = {"label":rows[i].CONTENT,"value":rows[i].KODE_KATEGORI}
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

    const GetMasterProdukByKodeKategori = () => {
        const url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetMasterProdukByKodeKategori`
        const param = {"IN_KODE_KATEGORI":IN_KATEGORI,"IN_KODE_GERAI":IN_KODE_GERAI}
        const Token = GetToken()
      
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                setData_rows(data_body)
              
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

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconSearch />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={"Generate PriceTag"} in_content={
                        <>
                        <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1">
                            {
                                ISCOMBO_GERAI ?
                                <div>
                                <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options7} isSearchable={true} isMulti={false} event={FormInputKodeGerai} name_component={"Gerai"} idComponent={"gerai"} />
                                </div>
                                :
                                <div>
                                <InputTextType   in_title={"Gerai"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_KODE_GERAI} />
                                </div>
                            }
                            <div>
                            <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options6} isSearchable={true} isMulti={false} event={FormInputKategori} name_component={"Category"} idComponent={"kategori"} />
                            </div>
                            <div className="lg:mt-8 md:mt-8">
                            <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Filter'} HandleClick={GetMasterProdukByKodeKategori} />    
                            </div>
                        </div>
                      </>
                } />

                <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconPrinter />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={"Data PriceTag"} in_content={
                    <>
                    <div className="p-4">
                    <button
                        className="px-4 py-2 mb-4 text-white bg-blue-600 rounded"
                        onClick={handlePrint}
                    >
                        Print Price Tags
                    </button>

                    <div ref={printRef} className="grid grid-cols-3 gap-2">
                         {
                            Object.keys(data_rows).map(
                                (key, i) => (
                                    <>
                                    <PriceTag name={data_rows[i].SINGKATAN} price={GetFormatCurrency(data_rows[i].GROSS)} barcode={data_rows[i].BARCODE} />
                                    </>
                                )
                            )
                        }
                        
                        
                    </div>
                    </div>   
                    </>
                } />
                </>
            } />
        </>
    )
}
export default FormMasterPriceTag;