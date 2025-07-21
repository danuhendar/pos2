'use client'
import {  useEffect,  useState } from "react";
import Swal from 'sweetalert2';
import { IRootState } from "@/store";
import {  useSelector } from "react-redux";
import {   get_bulan, get_data_local_storage, get_format_tanggal_jam, get_tahun, GetToken} from "@/lib/global";
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
interface FormVoidSalesProps {
    url: string,
    jenis: string,
    IDReport: string,
}
const FormVoidSales: React.FC<FormVoidSalesProps> = ({ url, jenis, IDReport }) => {
    const [data_rows, setData_rows] = useState([])
    const [data_columns, setData_columns] = useState([])
    const { t, i18n } = useTranslation()
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
    const [IN_KETERANGAN_VOID,setIN_KETERANGAN_VOID] = useState('')

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
    const FormInputKeteranganVOID = (event: { target: { value: any; }; }) => {var val = event.target.value;setIN_KETERANGAN_VOID(val);  };
    const GetDataTransaksiInventoryByNoStruk = () => {
        try{
            let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetDataTransaksiInventoryByNoStruk`
            let param = {"IN_NO_STRUK":IN_KODE_TRANSAKSI}
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

    const GetGenerateKodeTransaksiInventory = () => {
        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetGenerateKodeTransaksiInventory`
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
                    GetGenerateKodeTransaksiInventory().then((d)=>{
                        const kode_transaksi_inventory = d;
                        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/VoidPosTransaksiSales`
                        var tanggal_void = get_format_tanggal_jam()
                        var tahun = get_tahun()
                        var bulan = get_bulan()
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
                                "IN_DISKON": 0,
                                "IN_PRICE": 0,
                                "IN_IS_HADIAH": 0,
                                "IN_KODE_PROMO": 0,
                                "IN_IS_RETUR_ITEM": 0
                            }
                            detail.push(obj)
                        }
                        let param = {
                                        "IN_NOSTRUK": IN_KODE_TRANSAKSI,
                                        "IN_KODE_GERAI": IN_ASAL,
                                        "IN_JENIS": parseFloat(jenis),
                                        "IN_TANGGAL":tanggal_void,
                                        "IN_TAHUN": tahun,
                                        "IN_BULAN": bulan,
                                        "IN_OTORISATOR_VOID": IN_NIK_PEMBUAT,
                                        "IN_APP": themeConfig.versi_app,
                                        "IN_KODE_TRANSAKSI": kode_transaksi_inventory,
                                        "IN_NIK_PEMBUAT": IN_NIK_PEMBUAT,
                                        "IN_KETERANGAN": IN_KETERANGAN_VOID,
                                        "IN_DETAIL": detail
                                    }
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
                                setIN_KETERANGAN_VOID('')
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
                    <CardComponent in_style_font_judul={"text-md font-semibold dark:text-white-light"} in_icon={<IconSearch />} in_style_card={"mt-6 panel rounded-3xl"} in_judul={"Search Transaction by Code"} in_content={
                        <>
                        <InputTextType   in_title={"No Struk"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputKodeTransaksi} in_value={IN_KODE_TRANSAKSI} />
                        <ButtonAdd in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_reload"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Filter'} HandleClick={GetDataTransaksiInventoryByNoStruk} />
                        <div className="mt-6 panel rounded-3xl">
                            <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2">
                                <InputTextType   in_title={"Type Transaction"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_JENIS_TRANSAKSI} />
                                <InputTextType   in_title={"Description"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_KETERANGAN} />
                                <InputTextType   in_title={"Source"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_ASAL} />
                                <InputTextType   in_title={"Destination"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_TUJUAN} />
                                <InputTextType   in_title={"Date Transaction"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_TANGGAL_TRANSAKSI} />
                                <InputTextType   in_title={"Nik User"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={true} event={null} in_value={IN_NIK_PEMBUAT} />    
                                <InputTextType   in_title={"Keterangan VOID"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input placeholder:text-white-dark disabled:bg-gray-200 rounded-3xl"} data_options={undefined} isDisabled={false} event={FormInputKeteranganVOID} in_value={IN_KETERANGAN_VOID} />    
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
export default FormVoidSales;