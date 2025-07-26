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
import { set } from "lodash";
import IconLock from "../Icon/IconLock";
import withReactContent from "sweetalert2-react-content";
import IconBook from "../Icon/IconBook";

interface FormClosingProps {
    url: string,
    command: string,
    IDReport: string,
}
const FormClosing: React.FC<FormClosingProps> = ({ url, command, IDReport }) => {
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
    const MySwal = withReactContent(Swal);
     
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        
        const kode_gerai = get_data_local_storage('kode_gerai')
        if(kode_gerai === '%'){
            GetMasterGerai(res_host,res_PORT_LOGIN)
        }else{
            setIN_KODE_GERAI(kode_gerai)    
        }
        const op = [{"label":"1","value":"1"},{"label":"2","value":"2"},{"label":"3","value":"3"}]
        setOptionsShift(op)
    },[]);
    const FormInputKodeGerai = (value: any) => {var val = value.value;setIN_KODE_GERAI(val);};
    const FormInputShift = (value: any) => {var val = value.value;setIN_SHIFT(val);};

    const FormInputTanggalInitial = (value: any) => {var val = value;setIN_TANGGAL(val);};
    const FormInputKodeGeraiInitial  = (event: { target: { value: any; }; }) => {var val = event.target.value; setIN_KODE_GERAI_INITIAL(val);};
    const FormInputKodeInitial = (event: { target: { value: any; }; }) => {var val = event.target.value; setIN_KODE_INITIAL(val);};
    const FormInputNik = (event: { target: { value: any; }; }) => {var val = event.target.value; setIN_NIK(val);};
    const FormInputNama = (event: { target: { value: any; }; }) => {var val = event.target.value; setIN_NAMA(val);};
    const FormInputGrossSales =(event: { target: { value: any; }; }) => {var val = event.target.value; setIN_GROSS_SALES(val);};
    const FormInputDiskon = (event: { target: { value: any; }; }) => {var val = event.target.value; setIN_DISKON(val);};
    const FormInputNetSales = (event: { target: { value: any; }; }) => {var val = event.target.value; setIN_NET_SALES(val);};

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

    const GetPosInitialByKodeGeraiTanggalShift = () => {
        const url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetPosInitialByKodeGeraiTanggalShift`
        const param = {"IN_TANGGAL":ConvertDateFormat(date2,false),"IN_SHIFT":IN_SHIFT,"IN_KODE_GERAI":IN_KODE_GERAI}
        const Token = GetToken()
        setLoadingButton(true)
        setisDisabled(true)
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                setIN_TANGGAL(data_body[0].TANGGAL)
                setIN_KODE_INITIAL(data_body[0].KODE_INITIAL)
                setIN_KODE_GERAI_INITIAL(data_body[0].KODE_GERAI)
                setIN_NIK(data_body[0].NIK)
                setIN_NAMA(data_body[0].NAMA)
                setIN_GROSS_SALES(GetFormatCurrency(data_body[0].SALES))
                setIN_DISKON(GetFormatCurrency(data_body[0].DISKON))
                setIN_NET_SALES(GetFormatCurrency(data_body[0].SALESNET))
                setLoadingButton(false)
                setisDisabled(false)
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
                setIN_TANGGAL('')
                setIN_KODE_INITIAL('')
                setIN_KODE_GERAI_INITIAL('')
                setIN_NIK('')
                setIN_NAMA('')
                setIN_GROSS_SALES('')
                setIN_DISKON('')
                setIN_NET_SALES('')
               
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
    }
    const ClosingShift = () => {
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
                        const url = `http://${IN_HOST}:${IN_PORT}/api/v2/ClosingShift`
                        const param = {"IN_KODE_INITIAL":IN_KODE_INITIAL}
                        const Token = GetToken()
                        setLoadingButtonClosing(true)
                        setisDisabledClosing(true)
                        Posts(url,JSON.stringify(param),false,Token).then((response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            if(parseFloat(code) === 200){
                                Swal.fire({ 
                                    title: t("Success"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "success",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                setLoadingButtonClosing(false)
                                setisDisabledClosing(false)
                                setIN_TANGGAL('')
                                setIN_KODE_INITIAL('')
                                setIN_KODE_GERAI_INITIAL('')
                                setIN_NIK('')
                                setIN_NAMA('')
                                setIN_GROSS_SALES('')
                                setIN_DISKON('')
                                setIN_NET_SALES('')
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
                                setLoadingButtonClosing(false)
                                setisDisabledClosing(false)
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                setLoadingButtonClosing(false)
                                setisDisabledClosing(false)
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
                            setLoadingButtonClosing(false)
                            setisDisabledClosing(false)
                        });
                    }
        });
        
    }
    const ClosingHarian = () => {
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
                        const url = `http://${IN_HOST}:${IN_PORT}/api/v2/ClosingHarian`
                        const param = {"IN_KODE_INITIAL":IN_KODE_INITIAL}
                        const Token = GetToken()
                        setLoadingButtonClosing(true)
                        setisDisabledClosing(true)
                        Posts(url,JSON.stringify(param),false,Token).then((response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            if(parseFloat(code) === 200){
                                Swal.fire({ 
                                    title: t("Success"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "success",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                setLoadingButtonClosing(false)
                                setisDisabledClosing(false)
                                setIN_TANGGAL('')
                                setIN_KODE_INITIAL('')
                                setIN_KODE_GERAI_INITIAL('')
                                setIN_NIK('')
                                setIN_NAMA('')
                                setIN_GROSS_SALES('')
                                setIN_DISKON('')
                                setIN_NET_SALES('')
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
                                setLoadingButtonClosing(false)
                                setisDisabledClosing(false)
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                setLoadingButtonClosing(false)
                                setisDisabledClosing(false)
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
                            setLoadingButtonClosing(false)
                            setisDisabledClosing(false)
                        });
                    }
        });
        
    }
    

    const GetPosInitialByKodeGerai = () => {
        try{
            let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetPosInitialByKodeGerai`
            let param = {"IN_KODE_GERAI":IN_KODE_GERAI,"IN_SHIFT":"-","IN_TANGGAL":ConvertDateFormat(date2,false)}
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
                        setIN_TANGGAL(data_body[0].TANGGAL)
                        setIN_KODE_INITIAL(data_body[0].KODE_INITIAL)
                        setIN_KODE_GERAI_INITIAL(data_body[0].KODE_GERAI)
                        setIN_NIK(data_body[0].NIK)
                        setIN_NAMA(data_body[0].NAMA)
                        setIN_GROSS_SALES(GetFormatCurrency(data_body[0].SALES))
                        setIN_DISKON(GetFormatCurrency(data_body[0].DISKON))
                        setIN_NET_SALES(GetFormatCurrency(data_body[0].SALESNET))
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

    const GetData = () => {
        if(IDReport === 'Closing Harian'){
            GetPosInitialByKodeGerai();
        }else{
            GetPosInitialByKodeGeraiTanggalShift()
        }
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
                                IN_KODE_GERAI  !== '%' ?
                                <div>
                                <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options7} isSearchable={true} isMulti={false} event={FormInputKodeGerai} name_component={"Gerai"} idComponent={"gerai"} />
                                </div>
                                :
                                <div>
                                <InputTextType   in_title={"Gerai"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_KODE_GERAI} />
                                </div>
                            }
                            <div>
                            <DatePicker is_time_24hr={false} in_mode={'single'} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg"} event={(date2) => setDate2(date2)} name_component={"Date"} idComponent={"txt_date"} isRtl={isRtl} in_date={date2} isEnableTime={false} date_format={"Y-m-d"} />
                            </div>
                            {
                                IDReport === 'Closing Harian' ?
                                ''
                                :
                                <div>
                                <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={optionsShift} isSearchable={true} isMulti={false} event={FormInputShift} name_component={"Shift"} idComponent={"Shift"} />
                                </div>
                            }
                           
                            <div className="lg:mt-8 md:mt-8">
                            <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Filter'} HandleClick={GetData} />    
                            </div>
                        </div>
                      </>
                } />

                <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconPrinter />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={"Data "+IDReport} in_content={
                    <>
                    <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 xs:grid-cols-1">
                        <div>
                        <InputTextType   in_title={"Date"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputTanggalInitial} in_value={IN_TANGGAL} />
                        </div>
                        <div>
                        <InputTextType   in_title={"Initial Code"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputKodeInitial} in_value={IN_KODE_INITIAL} />
                        </div>
                        <div>
                        <InputTextType   in_title={"Gerai"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputKodeGeraiInitial} in_value={IN_KODE_GERAI_INITIAL} />
                        </div>
                        <div>
                        <InputTextType   in_title={"Nik"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputNik} in_value={IN_NIK} />
                        </div>
                        <div>
                        <InputTextType   in_title={"Nama"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputNama} in_value={IN_NAMA} />
                        </div>
                        <div>
                        <InputTextType   in_title={"Gross Sales"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputGrossSales} in_value={IN_GROSS_SALES} />
                        </div>
                        <div>
                        <InputTextType   in_title={"Diskon"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputDiskon} in_value={IN_DISKON} />
                        </div>
                        <div>
                        <InputTextType   in_title={"Net Sales"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputNetSales} in_value={IN_NET_SALES} />
                        </div>
                    </div>
                    <div className="lg:mt-8 md:mt-8">
                        {
                            IDReport === 'Closing Harian' ?
                            <ButtonAdd in_classname={!isDark ? 'btn btn-danger w-full rounded-full text-end text-xs' : 'btn btn-outline-danger w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButtonClosing} isDisabled={isDisabledClosing} in_icon={<IconBook />} in_title_button={'Closing Harian'} HandleClick={ClosingHarian} />    
                            :
                            <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButtonClosing} isDisabled={isDisabledClosing} in_icon={<IconLock />} in_title_button={'Closing Shift'} HandleClick={ClosingShift} />    
                        }
                    
                    </div>
                    </>
                } />
                </>
            } />
        </>
    )
}    
export default FormClosing;