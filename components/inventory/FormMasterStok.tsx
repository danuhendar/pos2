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
import ComponentsDatatablesAdvanced from "../table/ComponentsDatatablesAdvanced";
import withReactContent from "sweetalert2-react-content";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import Image from "next/image";
import IconBox from "../Icon/IconBox";
import IconShoppingBag from "../Icon/IconShoppingBag";
import IconCreditCard from "../Icon/IconCreditCard";
interface FormMasterStokProps {
    url: string,
    command: string,
    IDReport: string,
}
const FormMasterStok: React.FC<FormMasterStokProps> = ({ url, command, IDReport }) => {
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
    const [IN_TAHUN,setIN_TAHUN] = useState('')
    const [IN_BULAN,setIN_BULAN] = useState('')
    const [IN_KODE_GERAI,setIN_KODE_GERAI] = useState('')

    const [optionsTahun,setOptionsTahun] = useState([])
    const [optionsBulan,setOptionsBulan] = useState([])
    const [optionsGerai,setOptionsGerai] = useState([])

    const [IN_TAHUN_MUTASI,setIN_TAHUN_MUTASI] = useState('')
    const [IN_BULAN_MUTASI,setIN_BULAN_MUTASI] = useState('')
    const [IN_KODE_GERAI_MUTASI,setIN_KODE_GERAI_MUTASI] = useState('')

    const [optionsTahunMutasi,setOptionsTahunMutasi] = useState([])
    const [optionsBulanMutasi,setOptionsBulanMutasi] = useState([])
    const [optionsGeraiMutasi,setOptionsGeraiMutasi] = useState([])

    const [Tabs,setTabs] = useState<string>('master');

    const MySwal = withReactContent(Swal);
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        GetTahun()
        GetBulan()
        GetMasterGerai(res_host,res_PORT_LOGIN)
    },[]);

   
    const FormInputKodeGerai  = (value: any) => {var val = value.value;setIN_KODE_GERAI(val);  };
    const FormInputTahun = (value: any) => {var val = value.value;setIN_TAHUN(val);  }; 
    const FormInputBulan = (value: any) => {var val = value.value;setIN_BULAN(val);  }; 

    const FormInputKodeGeraiMutasi  = (value: any) => {var val = value.value;setIN_KODE_GERAI_MUTASI(val);  };
    const FormInputTahunMutasi = (value: any) => {var val = value.value;setIN_TAHUN_MUTASI(val);  }; 
    const FormInputBulanMutasi = (value: any) => {var val = value.value;setIN_BULAN_MUTASI(val);  }; 

    const GetTahun = () =>{
        var date = new Date()
        var tahun = date.getFullYear()
        var tahun_next = tahun+3
        var arr_ = []
        for(var i = tahun;i<tahun_next;i++){
            const obj = {"label":i,"value":i};
            arr_.push(obj)
        }
        setOptionsTahun(arr_)
        setOptionsTahunMutasi(arr_)
    }

    const GetBulan = () =>{
        var list_bulan = ["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"] 
        var arr_ = []
        for(var i = 1;i<=12;i++){
            var idx_bulan = list_bulan[i]
            const obj = {"label":idx_bulan,"value":i};
            arr_.push(obj)
        }
        setOptionsBulan(arr_)
        setOptionsBulanMutasi(arr_)
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

    const GetPosMasterStok = () => {
        setData_rows_Kategori([])
        setData_columns_Kategori([])
        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetPosMasterStok`
        let param = {"IN_TAHUN":IN_TAHUN,"IN_BULAN":IN_BULAN,"IN_KODE_GERAI":IN_KODE_GERAI}
        const Token = GetToken()
        setLoadingButton(true)
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                var rows = data_body[0].ROWS;
                if(rows.length > 0){
                    var res_rows = AddID(rows)
                    setData_rows_Kategori(res_rows)
                    var cols = Def_Column_MasterStok()
                    setData_columns_Kategori(cols)
                }else{
                    MySwal.fire({
                        title: t("Data Empty"),
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
            }else{
                Swal.fire({
                    title: t("Warning"),
                    text: ""+parseFloat(code)+"-"+msg,
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
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
            setLoadingButton(false)
        });
    }

      const GetPosMutasiStok = () => {
        setData_rows([])
        setData_columns([])
        let url = `http://${IN_HOST}:${IN_PORT}/api/v2/GetPosMutasiStok`
        let param = {"IN_TAHUN":IN_TAHUN_MUTASI,"IN_BULAN":IN_BULAN_MUTASI,"IN_KODE_GERAI":IN_KODE_GERAI_MUTASI}
        const Token = GetToken()
        setLoadingButton(true)
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                var rows = data_body[0].ROWS;
                if(rows.length > 0){
                    var res_rows = AddID(rows)
                    setData_rows(res_rows)
                    var cols = Def_Column_MutasiStok()
                    setData_columns(cols)
                }else{
                    MySwal.fire({
                        title: t("Data Empty"),
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
            }else{
                Swal.fire({
                    title: t("Warning"),
                    text: ""+parseFloat(code)+"-"+msg,
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
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
            setLoadingButton(false)
        });
    }
    

    const Def_Column_MasterStok = () => {
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
                    accessor: 'SALDO_AWAL',
                    title: 'SALDO_AWAL',
                    sortable: true,
                    render: ({ SALDO_AWAL }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-warning text-md`}>{SALDO_AWAL}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'BPB',
                    title: 'BPB',
                    sortable: true,
                    render: ({ BPB }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-success text-md`}>{BPB}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'SALES',
                    title: 'SALES',
                    sortable: true,
                    render: ({ SALES }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-danger text-md`}>{SALES}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'RUSAK',
                    title: 'RUSAK',
                    sortable: true,
                    render: ({ RUSAK }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-danger text-md`}>{RUSAK}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'HILANG',
                    title: 'HILANG',
                    sortable: true,
                    render: ({ HILANG }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-danger text-md`}>{HILANG}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'TRANSFER_GERAI',
                    title: 'TRANSFER_GERAI',
                    sortable: true,
                    render: ({ TRANSFER_GERAI }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-danger text-md`}>{TRANSFER_GERAI}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'BAP',
                    title: 'BAP',
                    sortable: true,
                    render: ({ BAP }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-danger text-md`}>{BAP}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'RETUR_SALES',
                    title: 'RETUR_SALES',
                    sortable: true,
                    render: ({ RETUR_SALES }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-success text-md`}>{RETUR_SALES}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'RETUR_DC',
                    title: 'RETUR_DC',
                    sortable: true,
                    render: ({ RETUR_DC }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-danger text-md`}>{RETUR_DC}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'RETUR_SUPPLIER',
                    title: 'RETUR_SUPPLIER',
                    sortable: true,
                    render: ({ RETUR_SUPPLIER }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-danger text-md`}>{RETUR_SUPPLIER}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'VOID_SALES',
                    title: 'VOID_SALES',
                    sortable: true,
                    render: ({ VOID_SALES }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-success text-md`}>{VOID_SALES}</div>
                        </div>
                    ),
                },
                {
                    accessor: 'SALDO_AKHIR',
                    title: 'SALDO_AKHIR',
                    sortable: true,
                    render: ({ SALDO_AKHIR }) => (
                        <div className="flex items-center gap-2">
                            <div className={`badge badge-outline-primary text-md`}>{SALDO_AKHIR}</div>
                        </div>
                    ),
                }
            ];
            return  cols;
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
    
    const CloseModal = ()=>{
        if(modal13){
            setModal13(false)
        }else{
            setModal14(false)
        }
        
    }
    const toggleTabs = (name: string) => {
        setTabs(name);
        if(name === 'master'){
            if(IN_TAHUN === '' || IN_BULAN === '' || IN_KODE_GERAI === ''){

            }else{
                GetPosMasterStok()
            }
        }else{
            if(IN_TAHUN_MUTASI  === '' || IN_BULAN_MUTASI  === '' || IN_KODE_GERAI_MUTASI === ''){

            }else{
                GetPosMutasiStok()
            }
        }
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
                                    onClick={() => toggleTabs('master')}
                                    className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${Tabs === 'master' ? '!border-primary text-primary' : ''}`}
                                >
                                    <IconBox />
                                    {t('Inventory Master')}
                                </button>
                            </li>
                            <li className="inline-block">
                                <button
                                    onClick={() => toggleTabs('mutasi')}
                                    className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${Tabs === 'mutasi' ? '!border-primary text-primary' : ''}`}
                                >
                                    <IconCreditCard />
                                     {t('Inventory Transaction')}
                                </button>
                            </li>
                        </ul>
                    </div>
                    {
                        Tabs === 'master' ? 
                        <>
                        <div className="flex flex-row items-start gap-3 mb-3">
                            <div>
                            <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={optionsTahun} isSearchable={true} isMulti={false} event={FormInputTahun} name_component={"Year"} idComponent={"tahun"} />
                            </div>
                            <div>
                            <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={optionsBulan} isSearchable={true} isMulti={false} event={FormInputBulan} name_component={"Month"} idComponent={"bulan"} />
                            </div>
                            <div>
                            <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={optionsGerai} isSearchable={true} isMulti={false} event={FormInputKodeGerai} name_component={"Gerai"} idComponent={"gerai"} />
                            </div>
                            <div>
                            <label>&nbsp;</label>
                            <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs mt-3' : 'btn btn-outline-success w-full rounded-full text-xs mt-3'} idComponent={"btn_refresh_master"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Refresh'} HandleClick={GetPosMasterStok} />
                            </div>
                        </div>
                        {
                            data_rows_Kategori.length > 0 ?
                            <ComponentsDatatablesAdvanced in_column_sort={'KODE_BARANG'} in_id={"dt1"} Datarow={data_rows_Kategori} DataColumns={data_columns_Kategori} />
                            :
                            ''
                        }
                        </>
                        : 
                        <>
                        <div className="flex flex-row items-start gap-3 mb-3">
                            <div>
                            <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={optionsTahun} isSearchable={true} isMulti={false} event={FormInputTahunMutasi} name_component={"Year"} idComponent={"tahun"} />
                            </div>
                            <div>
                            <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={optionsBulan} isSearchable={true} isMulti={false} event={FormInputBulanMutasi} name_component={"Month"} idComponent={"bulan"} />
                            </div>
                            <div>
                            <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={optionsGerai} isSearchable={true} isMulti={false} event={FormInputKodeGeraiMutasi} name_component={"Gerai"} idComponent={"gerai"} />
                            </div>
                            <div>
                            <label>&nbsp;</label>
                            <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs mt-3' : 'btn btn-outline-success w-full rounded-full text-xs mt-3'} idComponent={"btn_refresh_mutasi"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButton} in_title_button={'Refresh'} HandleClick={GetPosMutasiStok} />
                            </div>
                        </div>
                        {
                            data_rows.length > 0 ?
                            <ComponentsDatatablesAdvanced in_column_sort={'TANGGAL'} in_id={"dt2"} Datarow={data_rows} DataColumns={data_columns} />
                            :
                            ''
                        }
                        </>
                    }
                </>
            } />
        </>
    )
}
export default FormMasterStok;