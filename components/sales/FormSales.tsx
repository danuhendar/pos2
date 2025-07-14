'use client'
import {  use, useEffect,  useState } from "react";
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import {   get_data_local_storage, get_format_tanggal_jam, GetFormatCurrency, GetToken} from "@/lib/global";
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
import IconSearch from "../Icon/IconSearch";
import IconTrash from "../Icon/IconTrash";
import IconLogin from "../Icon/IconLogin";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import DatePicker from "../datepicker/DatePicker";
import IconSave from "../Icon/IconSave";
import IconChecks from "../Icon/IconChecks";
import IconX from "../Icon/IconX";
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
    const [mountedForm, setmountedForm] = useState(false);

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
        
        const columns = Def_Column_Transaksi_Inventory()
        setData_columns(columns)
        GetMasterGerai(res_host,res_PORT_LOGIN)
    },[]);

   
    const FormInputKodeGeraiMutasi  = (value: any) => {var val = value.value;setIN_KODE_GERAI(val); };
    const FormInputModal = (value: any) => {var val = value.target.value;var res_val = GetFormatCurrency(val.split(',').join('')); setIN_MODAL(res_val); };
    const FormInputNikPembuat = (value: any) => {var val = value.target.value;setIN_NIK_PEMBUAT(val); };
    const FormInputNamaPembuat = (value: any) => {var val = value.target.value;setIN_NAMA_PEMBUAT(val); };
    const FormInputUangLaci = (value: any) => {var val = value.target.value;var res_val = GetFormatCurrency(val.split(',').join('')); setIN_UANG_LACI(res_val); };
    const FormInputShift = (value: any) => {var val = value.value;setIN_SHIFT(val); GetPosInitialByKodeGerai() };
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
    const GetPosInitialByKodeGerai = () => {
        try{
            let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetPosInitialByKodeGerai`
            let param = {"IN_KODE_GERAI":IN_KODE_GERAI,"IN_SHIFT":IN_SHIFT}
            const Token = GetToken()
            setLoadingButton(true)
            setisDisabled(true)
            Posts(url,JSON.stringify(param),false,Token).then((response) => {
                const res_data = response;
                var code = res_data.code;
                var msg = res_data.msg;
                if(parseFloat(code) === 200){
                    var data_body = res_data.data;
                    if(data_body.length > 0){
                        setmountedForm(true)
                        setData_rows(data_body)
                    }else{
                        setmountedForm(false)
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
                            setmountedForm(true)
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
                    accessor: 'TANGGAL',
                    title: 'DATE'
                },
                {
                    accessor: 'KODE_INITIAL',
                    title: 'INITIAL CODE'
                },
                {
                    accessor: 'KODE_GERAI',
                    title: 'STORE'
                },
                {
                    accessor: 'NIK',
                    title: 'NIK'
                },
                {
                    accessor: 'NAMA',
                    title: 'USER'
                },
                {
                    accessor: 'SHIFT',
                    title: 'SHIFT'
                },
                {
                    accessor: 'IS_CLOSING_SHIFT',
                    title: 'IS CLOSING SHIFT',
                    render: ({ IS_CLOSING_SHIFT }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{IS_CLOSING_SHIFT === 1 ? <IconChecks className="text-success" /> : <IconX className="text-danger" />}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'WAKTU_CLOSING_SHIFT',
                    title: 'CLOSING SHIFT TIME',
                },
                {
                    accessor: 'IS_CLOSING_HARIAN',
                    title: 'IS CLOSING HARIAN',
                    render: ({ IS_CLOSING_HARIAN }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{IS_CLOSING_HARIAN === 1 ? <IconChecks className="text-success" /> : <IconX className="text-danger" />}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'WAKTU_CLOSING_HARIAN',
                    title: 'CLOSING HARIAN TIME',
                },
            ];
            return  cols;
    }

    const InsPosInitial = () => {
        try{
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
                    let url = `http://${IN_HOST}:${IN_PORT}/api/v2/InsPosInitial`
                    let param = {"IN_KODE_INITIAL":2025061101,"IN_KODE_GERAI":IN_KODE_GERAI,"IN_MODAL":IN_MODAL.split(',').join(''),"IN_UANG_LACI":IN_UANG_LACI.split(',').join(''),"IN_NIK":IN_NIK_PEMBUAT,"IN_NAMA":IN_NAMA_PEMBUAT,"IN_SHIFT":IN_SHIFT}
                    const Token = GetToken()
                    setLoadingButton(true)
                    setisDisabled(true)
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
                            setIN_SHIFT('')
                            setIN_KODE_GERAI('')
                            setIN_MODAL('')
                            setIN_UANG_LACI('')
                            setIN_NIK_PEMBUAT('')
                            setIN_NAMA_PEMBUAT('')
                            setDate2(curdate)
                            
                            GetPosInitialByKodeGerai()
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
            })
            
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
                    <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconLogin />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={"Input initial"} in_content={
                        <>
                        <div className="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>{t('Note: Please check your data input, because process data input can\'t try again!')}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-3 mt-3 lg:grid-cols-2 md:grid-cols-2">
                            <div>
                            <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={OptionsGerai} isSearchable={true} isMulti={false} event={FormInputKodeGeraiMutasi} name_component={"Gerai"} idComponent={"gerai"} />
                            </div>
                            <div className="w-1/5 mt-6">
                            <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Filter'} HandleClick={GetPosInitialByKodeGerai} />     
                            </div>
                        </div>
                        <div className={mountedForm ? "mt-6 panel rounded-3xl" : "mt-6 panel rounded-3xl hidden" }>
                            <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2">
                                <InputTextType   in_title={"Modal"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={false} event={FormInputModal} in_value={IN_MODAL} />
                                <InputTextType   in_title={"Uang Laci"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl text-right"} data_options={undefined} isDisabled={false} event={FormInputUangLaci} in_value={IN_UANG_LACI} />
                                <InputTextType   in_title={"Nik"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputNikPembuat} in_value={IN_NIK_PEMBUAT} />
                                <InputTextType   in_title={"Staff Name"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputNamaPembuat} in_value={IN_NAMA_PEMBUAT} />
                            </div>
                            <div className="grid grid-cols-1 gap-3 mt-3 lg:grid-cols-4 md:grid-cols-2">
                                <div>
                                    <DatePicker      is_time_24hr={true} in_mode={'single'} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg"} event={(date2) => setDate2(date2)} name_component={"Date"} idComponent={"txt_date"} isRtl={isRtl} in_date={date2} isEnableTime={true} date_format={"Y-m-d H:i"} />
                                </div>
                                <div>
                                    <DropDownGlobal  in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={OptionShift} isSearchable={true} isMulti={false} event={FormInputShift} name_component={"Shift"} idComponent={"shift"} />
                                </div>
                            </div>
                        </div>
                        {
                            mountedForm ?
                            <>
                            <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs mt-3' : 'btn btn-outline-success w-full rounded-full text-xs mt-3'} idComponent={"btn_save"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSave />} in_title_button={'Submit Initial'} HandleClick={InsPosInitial} />                             
                            {/* <label className="mt-3 text-xs text-gray-500 dark:text-white-light">{t('Note: Please check your data input, because process data input can\'t try again!')}</label> */}
                            
                            
                            <h5 className="mt-8 text-lg font-semibold dark:text-white-light">History Initial</h5>
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
                            </>
                            : 
                            ''
                        }


                        
                      </>
                    } />
                </>
            } />
        </>
    )
}
export default FormSales;