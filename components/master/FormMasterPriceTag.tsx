'use client'
import {  useEffect,  useRef,  useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import { AddColumn, AddID, GetFormatCurrency, GetToken,  get_data_local_storage, get_dateTimeDiff_second, get_format_tanggal_jam, get_format_tanggal_jam_format_indo, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, removeDuplicates, setTombolAmbilDataGagal, start, stop, textToBase64Barcode } from "@/lib/global";
import { useTranslation } from "react-i18next";
import themeConfig from "@/theme.config";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
import { Posts, PostsDownload } from "@/lib/post";
import ButtonAdd from "../button/ButtonAdd";
import IconPlus from "../Icon/IconPlus";
import IconRefresh from "../Icon/IconRefresh";
import InputTextType from "../form/InputTypeText";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import CardComponent from "../form/CardComponent";
import IconSearch from "../Icon/IconSearch";
import IconPrinter from "../Icon/IconPrinter";
import { useReactToPrint } from 'react-to-print';
import PriceTag from "../form/PriceTag";
import InputCheckBoxFilterType from "../form/InputCheckBoxFilterType";
import { set } from "lodash";
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
    const [options8,setOptions8] = useState([])
    const [IN_KATEGORI,setIN_KATEGORI] = useState([])
    const [IN_KODE_GERAI,setIN_KODE_GERAI] = useState('')
	const [ISCOMBO_GERAI,setIN_ISCOMBO_GERAI] = useState(false)
    const [IN_TIPE,setIN_TIPE] = useState(0)
    const [IN_KODE_BARANG,setIN_KODE_BARANG] = useState('')
    const [IN_QTY_CETAK,setIN_QTY_CETAK] = useState(0)
    const [isCheckTipeAllProduk,setisCheckTipeAllProduk] = useState(false)
    const [isCheckTipeOneProduk,setisCheckTipeOneProduk] = useState(false)
    
    
    
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

    const FormInputKategori = (value: any) => {
        var val = value.value;
        setIN_KATEGORI(val);
        GetMasterProdukByKodeKategori(val)  
    };
    const FormInputKodeGerai = (value: any) => {var val = value.value;setIN_KODE_GERAI(val);};
    const FormInputSelectTipePriceTag = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        if(val === '1'){
            setisCheckTipeAllProduk(true)
            setisCheckTipeOneProduk(false)
            setIN_TIPE(1)
            setIN_QTY_CETAK(0)
            setIN_KODE_BARANG('')
        }else{
            setisCheckTipeAllProduk(false)
            setisCheckTipeOneProduk(true)
            setIN_TIPE(2)
        }
    };
    const FormInputQtyCetak = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        if(val === '' || val === null || val === undefined){
            setIN_QTY_CETAK(0)
        }
        else{
            setIN_QTY_CETAK(parseFloat(val))
        }
    }
    const FormInputProduk = (value: any) => {
        var val = value.value;setIN_KODE_BARANG(val);
    };

    const GetMasterProdukByKodeKategori = (val_kategori:string) => {
        setOptions8([])
        let url = `https://${IN_HOST}/api/v2/GetMasterProdukByKodeKategori`
        let param = {"IN_KODE_KATEGORI":val_kategori,"IN_KODE_GERAI":IN_KODE_GERAI}
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
    
    const GetMasterKategoriProduk = (in_host:string,in_port:number) => {
        let url = `https://${IN_HOST}/api/v2/GetMasterKategoriProduk`
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
        let url = `https://${IN_HOST}/api/v2/GetMasterGerai`
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

    const GetMasterPricetag = () => {
        const url = `https://${IN_HOST}/api/v2/GetMasterPricetag`
        const param = {"IN_KODE_KATEGORI":IN_KATEGORI,"IN_KODE_GERAI":IN_KODE_GERAI,"IN_TIPE":IN_TIPE,"IN_KODE_BARANG":IN_KODE_BARANG,"IN_QTY_CETAK":IN_QTY_CETAK}
        const Token = GetToken()
        const Namafile = `pricetag_${get_format_tanggal_jam_format_indo().split('-').join('').split(':').join('')}_${IN_KODE_GERAI}.pdf`
        setLoadingButton(true)
        PostsDownload(url,JSON.stringify(param),false,Token,Namafile).then((response) => {
            if(response){
                Swal.fire({
                    title: t("Success"),
                    text: t("Pricetag Berhasil dibuat!"),
                    icon: "success",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }
            setLoadingButton(false)
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
                        <InputCheckBoxFilterType isCheck_1={isCheckTipeAllProduk} isCheck_2={isCheckTipeOneProduk}  event={FormInputSelectTipePriceTag} in_title={"Type Pricetag"} in_value_1={"1"} in_value_2={"2"} in_name_1={"Print All Produk"} in_name_2={"Print One Product"} in_name_component_1={"is_tipe_pricetag"} in_name_component_2={"is_tipe_pricetag"} /> 
                        <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">
                            
                            {
                                ISCOMBO_GERAI ?
                                <div>
                                <DropDownGlobal in_is_clear={false}in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options7} isSearchable={true} isMulti={false} event={FormInputKodeGerai} name_component={"Gerai"} idComponent={"gerai"} />
                                </div>
                                :
                                <div>
                                <InputTextType   in_title={"Gerai"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_KODE_GERAI} />
                                </div>
                            }
                            <div>
                            <DropDownGlobal in_is_clear={false}in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options6} isSearchable={true} isMulti={false} event={FormInputKategori} name_component={"Category"} idComponent={"kategori"} />
                            </div>
                            {
                                IN_TIPE === 1 ?
                                ''
                                :
                                <>
                                <div>
                                <DropDownGlobal in_is_clear={false}in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options8} isSearchable={true} isMulti={false} event={FormInputProduk} name_component={"Product"} idComponent={"product"} />
                                </div>
                                <div>
                                <InputTextType   in_title={"Print Qty"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputQtyCetak} in_value={""+IN_QTY_CETAK} />
                                </div>
                                </>
                              
                            }
                        </div>

                        <div className="lg:mt-8 md:mt-8">
                            <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Filter'} HandleClick={GetMasterPricetag} />    
                        </div>
                      </>
                } />
                </>
            } />
        </>
    )
}
export default FormMasterPriceTag;