'use client'
import {  useEffect,  useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import { AddColumn, AddID, ConvertBinaryToText, GenerateUniqNumber, GetFailedClient, GetSignature, GetToken, GetTotalFailedClient, HitungSuksesDanGagalFomTable, ListKey, SendHandleRowClick, SendHandleRowClickOffice, SummaryValueOfArray, WritePayload, WritePayloadWSOffice, get_branch_code, get_data_local_storage, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, removeDuplicates, setTombolAmbilDataGagal, start, stop } from "@/lib/global";
import { useTranslation } from "react-i18next";
import IconSend from "../Icon/IconSend";
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
interface FormMasterStoreProps {
    url: string,
    command: string,
    IDReport: string,
}
const FormMasterStore: React.FC<FormMasterStoreProps> = ({ url, command, IDReport }) => {
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
    const [IN_BRANCH,setIN_BRANCH] = useState('G001')
    const [IN_STORE,setIN_STORE] = useState('')
    const [IN_CONTENT,setIN_CONTENT] = useState('')
    const [CheckedISActive,setCheckedISActive] = useState(false)
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
    },[]);

    const FormInputBranch = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_BRANCH(val);  
    };
    const FormInputStore = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_STORE(val);  
    };
    const FormInputContent = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setIN_CONTENT(val);  
    };
    const FormISActive = (event: { target: { value: any; }; }) => {
        setCheckedISActive(!CheckedISActive);  
        console.log(!CheckedISActive)
    };
    
    
    const DelData = (IN_KODE_GERAI:any) => {
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
                const url = `http://${IN_HOST}:${IN_PORT}/api/v2/DelMasterGerai`
                const param = {"IN_KODE_GERAI":IN_KODE_GERAI}
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
        setIN_STORE('')
        setIN_CONTENT('')
        setCheckedISActive(false)
        setTitle('Form Add : '+IDReport)
    }
    const showModal = (IDReport:string,IN_KODE_GERAI:string,IN_CONTENT:string,IN_STATUS:string) => {
        setModal13(true)
        setIN_STORE(IN_KODE_GERAI)
        setIN_CONTENT(IN_CONTENT)
        const res_is_active = (IN_STATUS === 'AKTIF' ? true : false)
        setCheckedISActive(res_is_active)
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
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const InputNik = get_data_local_storage('nik')
                const url = `http://${IN_HOST}:${IN_PORT}/api/v2/InsMasterGerai`
                const param = {"IN_KODE_CABANG":IN_BRANCH,"IN_KODE_GERAI":IN_STORE,"IN_CONTENT":IN_CONTENT,"IN_IS_AKTIF":(CheckedISActive ? 1 : 0),"IN_OTORISATOR":InputNik}
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
    const Def_Column_MasterGerai = () => {
        var cols = [
                {
                    accessor: 'id',
                    title: 'ACTION',
                    sortable: true,
                    render: ({ KODE_GERAI,CONTENT,STATUS }) => (
                        <div className="flex flex-row gap-2">
                            <div className="mt-1">
                                <a onClick={() => {showModal(' Edit '+IDReport,KODE_GERAI,CONTENT,STATUS)}} data-twe-toggle="tooltip" title="Edit Data">
                                    <span className="text-warning"><IconPencil  /></span>
                                </a>
                            </div>
                            <div className="mt-1">
                                <a onClick={() => {DelData(KODE_GERAI)}} data-twe-toggle="tooltip" title="Delete Data">
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
                    title: 'STORE',
                    sortable: true,
                    render: ({ KODE_GERAI }) => (
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{KODE_GERAI}</div>
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
                    accessor: 'STATUS',
                    title: 'STATUS',
                    render: ({STATUS}) => <span className={`${STATUS === 'AKTIF' ? 'badge badge-outline-success' : 'badge badge-outline-danger'}`}>{STATUS}</span>,
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
        if(IDReport === 'Master Store'){
            url = `http://${in_host}:${in_port}/api/v2/GetMasterGerai`
            param = {"IN_KODE_CABANG":"%","IN_IS_AKTIF":"%"}
            cols = Def_Column_MasterGerai()
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
            if(IDReport === 'Master Store'){
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
                                <InputTextType in_title={"Branch"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={FormInputBranch} in_value={IN_BRANCH} />
                                <InputTextType in_title={"Store"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputStore} in_value={IN_STORE} />
                                <InputTextType in_title={"Name"} in_classname_title={"mb-3"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputContent} in_value={IN_CONTENT} />
                                <label>IS Active</label>
                                <label className="relative w-12 h-6">
                                    <input checked={CheckedISActive} onChange={FormISActive} type="checkbox" className="absolute z-10 w-full h-full opacity-0 cursor-pointer custom_switch peer" id="custom_switch_checkbox1" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
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
export default FormMasterStore;