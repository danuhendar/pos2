'use client'
import {  useEffect,  useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import { AddColumn, AddID, GetToken,  get_data_local_storage, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, removeDuplicates, setTombolAmbilDataGagal, start, stop } from "@/lib/global";
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
interface FormMasterSupplierProps {
    url: string,
    command: string,
    IDReport: string,
}
const FormMasterSupplier: React.FC<FormMasterSupplierProps> = ({ url, command, IDReport }) => {
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
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
    const [Title,setTitle] = useState('')
    
    const [IN_KODE_SUPPLIER,setIN_KODE_SUPPLIER] = useState('')
    const [IN_CONTENT,setIN_CONTENT] = useState('')
    const [IN_ALAMAT,setIN_ALAMAT] = useState('')
    const [IN_NO_HP,setIN_NO_HP] = useState('')

    const MySwal = withReactContent(Swal);
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
    },[]);

   
    const FormInputSupplier = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_KODE_SUPPLIER(val);  
    };
    const FormInputContent = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_CONTENT(val);  
    };
    const FormInputAlamat = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_ALAMAT(val);  
    };
    const FormInputNoHP = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_NO_HP(val);  
    };
 
    
    const DelData = (IN_KODE_SUPPLIER:any) => {
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
                const url = `http://${IN_HOST}:${IN_PORT}/api/v2/DelMasterSupplier`
                const param = {"IN_KODE_SUPPLIER":IN_KODE_SUPPLIER}
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
        setModal13(true)
        setIN_KODE_SUPPLIER('Auto Generated')
        setIN_CONTENT('')
        setIN_ALAMAT('')
        setIN_NO_HP('')
        setTitle('Form Add : '+IDReport)
    }
    const showModal = (IDReport:string,IN_KODE_SUPPLIER:string,IN_CONTENT:string,IN_ALAMAT:string,IN_NO_HP:string) => {
        setModal13(true)
        setIN_KODE_SUPPLIER(IN_KODE_SUPPLIER)
        setIN_CONTENT(IN_CONTENT)
        setIN_ALAMAT(IN_ALAMAT)
        setIN_NO_HP(IN_NO_HP)
        setTitle('Form : '+IDReport)
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
                let res_kode_supplier = ''
                let Token = GetToken()
                if(Title.includes('Add')){
                    console.log('kondisi 1')
                    const url_get_kode_supplier = `http://${IN_HOST}:${IN_PORT}/api/v2/GetKodeSupplier`
                    const param = {}
                    await Posts(url_get_kode_supplier,JSON.stringify(param),false,Token).then((response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        if(parseFloat(code) === 200){
                            var data_body = res_data.data;
                            res_kode_supplier = data_body[0].KODE_SUPPLIER
                        }else{
                            res_kode_supplier = 'Not Autorized'
                        }
                    });
                }else{
                    res_kode_supplier = IN_KODE_SUPPLIER
                }
                const url = `http://${IN_HOST}:${IN_PORT}/api/v2/InsMasterSupplier`
                const param = {"IN_KODE_SUPPLIER":res_kode_supplier,"IN_CONTENT":IN_CONTENT,"IN_ALAMAT":IN_ALAMAT,"IN_NO_HP":IN_NO_HP,"IN_OTORISATOR":InputNik}
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
    const Def_Column_MasterSupplier = () => {
        var cols = [
                {
                    accessor: 'id',
                    title: 'ACTION',
                    sortable: true,
                    render: ({ KODE_SUPPLIER,CONTENT,ALAMAT,NO_HP }) => (
                        <div className="flex flex-row gap-2">
                            <div className="mt-1">
                                <a onClick={() => {showModal(' Edit '+IDReport,KODE_SUPPLIER,CONTENT,ALAMAT,NO_HP)}} data-twe-toggle="tooltip" title="Edit Data">
                                    <span className="text-warning"><IconPencil  /></span>
                                </a>
                            </div>
                            <div className="mt-1">
                                <a onClick={() => {DelData(KODE_SUPPLIER)}} data-twe-toggle="tooltip" title="Delete Data">
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
                    accessor: 'KODE_SUPPLIER',
                    title: 'SUPPLIER CODE',
                    sortable: true,
                    render: ({ KODE_SUPPLIER }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{KODE_SUPPLIER}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'CONTENT',
                    title: 'NAME',
                    sortable: true,
                    render: ({ CONTENT }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{CONTENT}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'ALAMAT',
                    title: 'ADDRESS',
                    sortable: true,
                    render: ({ ALAMAT }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{ALAMAT}</div>
                        </div>
                    ),
                },
                 {
                    accessor: 'NO_HP',
                    title: 'PHONE',
                    sortable: true,
                    render: ({ NO_HP }) => (
                        <div className="flex items-center gap-2">
                            <div>
                                <a onClick={()=> CopyText(NO_HP)}><IconCopy className="text-primary"/></a>
                            </div>
                            <div className="font-semibold">{NO_HP}</div>
                            
                        </div>
                    ),
                },
            ];
            return  cols;
    }
    const GetData = (in_host:string,in_port:number) => {
        setData_rows([])
        setData_columns([])
        
        let url = ""
        let param = {}
        var cols = []
        if(IDReport === 'Master Supplier'){
            url = `http://${in_host}:${in_port}/api/v2/GetMasterSupplier`
            param = {"IN_KODE_SUPPLIER":"%"}
            cols = Def_Column_MasterSupplier()
        }else{

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
                var rows = data_body[0].ROWS;
                var res_rows = AddID(rows);
                setData_rows(res_rows);
                setData_columns(cols);
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
            if(IDReport === 'Master Supplier'){
                GetData(IN_HOST,IN_PORT)
            }
        } catch (Ex) {
            console.log('error : ' + Ex.toString())
        }
    };
    const CloseModal = ()=>{
        setModal13(false)
    }
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    return (
        <>
            <AntiScrapedShieldComponent in_content={
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
                        <ComponentsDatatablesAdvanced in_column_sort={'id'} in_id={"dt"} Datarow={data_rows} DataColumns={data_columns} />
                        :
                        ''
                    }
                    <ModalComponent in_size_modal={`panel animate__animated my-7 w-1/3 overflow-hidden rounded-3xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-sm font-bold"} in_title_modal={Title} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                        <div className="p-2">
                            <div className="mb-5">
                                <InputTextType   in_title={"Supplier Code"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputSupplier} in_value={IN_KODE_SUPPLIER} />
                                <InputTextType   in_title={"Name"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputContent} in_value={IN_CONTENT} />
                                <TextAreaComponent in_title={"Address"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} in_rows={4} in_cols={40} isDisabled={false} event={FormInputAlamat} in_value={IN_ALAMAT} />
                                <InputTextType   in_title={"Phone"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputNoHP} in_value={IN_NO_HP} />
                                
                            </div>
                            <div className="flex items-center justify-end gap-3 mt-8">
                                <ButtonAdd in_classname={'btn btn-outline-danger rounded-full text-xs'} idComponent={"btn_close"} isLoading={false} isDisabled={isDisabled} in_icon={<IconXCircle />} in_title_button={'Cancel'} HandleClick={CloseModal} />
                                <ButtonAdd in_classname={!isDark ? 'btn btn-primary rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_save"} isLoading={false} isDisabled={isDisabled} in_icon={<IconSave />} in_title_button={'Save'} HandleClick={InsData} />
                            </div>
                        </div>
                    } />
                </>
            } />
        </>
    )
}
export default FormMasterSupplier;