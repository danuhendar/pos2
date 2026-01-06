'use client'
import {  useEffect,  useState } from "react";
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import {   get_data_local_storage, GetToken} from "@/lib/global";
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
interface FormVoidTransaksiInventoryProps {
    url: string,
    jenis: string,
    IDReport: string,
}
const FormVoidTransaksiInventory: React.FC<FormVoidTransaksiInventoryProps> = ({ url, jenis, IDReport }) => {
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
    const [IN_TANGGAL_TRANSAKSI,setIN_TANGGAL_TRANSAKSI] = useState('')
    const [IN_ASAL,setIN_ASAL] = useState('')
    const [IN_TUJUAN,setIN_TUJUAN] = useState('')
    const [IN_KETERANGAN,setIN_KETERANGAN] = useState('')
    const [IN_JENIS_TRANSAKSI,setIN_JENIS_TRANSAKSI] = useState('')
    const [arr_input_item,setarr_input_item] = useState([])

    const MySwal = withReactContent(Swal);
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        const InputNikPemohon = get_data_local_storage('nik');
        setIN_NIK_PEMBUAT(InputNikPemohon)
        const columns = Def_Column_Transaksi_Inventory()
        setData_columns(columns)
    },[]);

   
    const FormInputKodeTransaksi = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_KODE_TRANSAKSI(val);  };
    
    const GetDataTransaksiInventoryByKodeTransaksi = () => {
        try{
            let url = `https://${IN_HOST}/api/v2/GetDataTransaksiInventoryByKodeTransaksi`
            let param = {"IN_KODE_TRANSAKSI":IN_KODE_TRANSAKSI}
            const Token = GetToken()
            Posts(url,JSON.stringify(param),false,Token).then((response) => {
                const res_data = response;
                var code = res_data.code;
                var msg = res_data.msg;
                if(parseFloat(code) === 200){
                    var data_body = res_data.data;
                    var summary = data_body[0].SUMMARY
                    setIN_JENIS_TRANSAKSI(summary[0].JENIS_TRANSAKSI)
                    setIN_KETERANGAN(summary[0].KETERANGAN)
                    setIN_ASAL(summary[0].ASAL)
                    setIN_TUJUAN(summary[0].TUJUAN)
                    setIN_TANGGAL_TRANSAKSI(summary[0].TANGGAL)
                    setIN_NIK_PEMBUAT(summary[0].NIK_PEMBUAT)


                    var detail =  data_body[0].DETAIL
                    setData_rows(detail)
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
                    accessor: 'ID',
                    title: 'ID'
                },
                {
                    accessor: 'KODE_TRANSAKSI',
                    title: 'CODE TRANSACTION'
                },
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
            ];
            return  cols;
    }

    
    const DelPosTransaksiInventory = () =>{
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
                        let url = `https://${IN_HOST}/api/v2/DelPosTransaksiInventory`
                        let param = {"IN_KODE_TRANSAKSI":IN_KODE_TRANSAKSI}
                        console.log(JSON.stringify(param))
                        const Token = GetToken()
                        setLoadingButton(true)
                        setisDisabled(true) 
                        Posts(url,JSON.stringify(param),false,Token).then((response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            if(parseFloat(code) === 200){
                                Swal.fire({
                                    title: t("Information"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "success",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                setLoadingButton(false)
                                setisDisabled(false) 
                                setData_rows([])
                                setarr_input_item([])
                                setIN_JENIS_TRANSAKSI('')
                                setIN_KETERANGAN('')
                                setIN_ASAL('')
                                setIN_TUJUAN('')
                                setIN_TANGGAL_TRANSAKSI('')
                                setIN_NIK_PEMBUAT('')
                                setIN_KODE_TRANSAKSI('')
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
        });
    }

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                    <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconSearch />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={"Search Transaction by Code"} in_content={
                        <>
                        <InputTextType   in_title={"Code Transaction"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputKodeTransaksi} in_value={IN_KODE_TRANSAKSI} />
                        <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Filter'} HandleClick={GetDataTransaksiInventoryByKodeTransaksi} />
                        <div className="mt-6 panel rounded-3xl">
                            <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2">
                                <InputTextType   in_title={"Type Transaction"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_JENIS_TRANSAKSI} />
                                <InputTextType   in_title={"Description"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_KETERANGAN} />
                                <InputTextType   in_title={"Source"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_ASAL} />
                                <InputTextType   in_title={"Destination"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_TUJUAN} />
                                <InputTextType   in_title={"Date Transaction"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_TANGGAL_TRANSAKSI} />
                                <InputTextType   in_title={"Nik User"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_NIK_PEMBUAT} />    
                            </div>
                            
                            <div id="dt" className="datatables">
                                    <DataTable
                                        noRecordsText="No results match your search query"
                                        highlightOnHover
                                        className="table-hover whitespace-nowrap"
                                        records={data_rows}
                                        columns={data_columns}
                                        minHeight={200}
                                    />
                            </div>
                        </div>
                        <ButtonAdd in_classname={!isDark ? 'btn btn-danger w-full rounded-full text-end text-xs mt-3' : 'btn btn-outline-danger w-full rounded-full text-xs mt-3'} idComponent={"btn_save"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconTrash />} in_title_button={'Void'} HandleClick={DelPosTransaksiInventory} />                             
                      </>
                    } />
                </>
            } />
        </>
    )
}
export default FormVoidTransaksiInventory;