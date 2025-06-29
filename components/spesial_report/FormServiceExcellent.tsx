'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { AddID, ConvertBinaryToText, GetFailedClient, GetID, GetSignature, GetToken, GetTotalFailedClient, SendHandleRowClick, WritePayload, get_branch_code, get_data_local_storage, get_dateTimeDiff_second, get_format_tanggal_jam, groupByMessageListeners, handleLogout, start,stop  } from "@/lib/global";
import { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import { Posts } from "@/lib/post";
import DataTablesColourCell from "../table/DataTablesColurCell";
import { useTranslation } from "react-i18next";
import IconSend from "../Icon/IconSend";
import InputCheckBoxFilterType from "../form/InputCheckBoxFilterType";
import DropDownBranch from "../dropdown/DropDownBranch";
import DropDownStore from "../dropdown/DropDownStore";
import DropDownStation from "../dropdown/DropDownStation";
import ButtonReload from "../button/ButtonReload";
import ButtonFilter from "../button/ButtonFilter";
import { ReportServiceExcellent } from "@/controller/spesial_report/ServiceExcellent";
import CardInfoProses from "../form/CardInfoProses";
import ModalComponent from "../modal/ModalComponent";
import withReactContent from "sweetalert2-react-content";
import themeConfig from "@/theme.config";
import AntiScrapeShield from "anti-scrape-shield";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";

interface FormServiceExcellentProps{
    url: string,
    command: string,
    command_gagal:string,
    IDReport: string,
}
const FormServiceExcellent: React.FC<FormServiceExcellentProps> = ({url,command,command_gagal,IDReport}) => {
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [IN_CMB_KODE_TOKO,setKODE_TOKO] = useState("");
    const [IN_CMB_STATION,setStation] = useState("");
    const [data_rows,setData_rows] = useState([]);
    const [data_columns,setData_columns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading_edc, setLoadingEDC] = useState(false);
    const [progressbar,setProgress] = useState('');
    const [total_station,setTotalStation] = useState(0);
    const [total_sukses,setTotalSukses] = useState(0);
    const [total_gagal,setTotalGagal] = useState(0);
    const [DataProsentase,setDataProsentase] = useState(0);
    const [data_gagal,setDataGagal] = useState('');
    const [IP,setDataIP] = useState('');
    const [modal13, setModal13] = useState(false);
    const [data_rows_edc,setDataRowsEDC] = useState([]);
    const [data_columns_edc,setDataColumnsEDC] = useState([]);
    const [progressbar_edc, setProgressEDC] = useState('');
    const [columnGroupingModel,setcolumnGroupingModel] = useState([]);
    const [IsValMulti,setIsValMulti] = useState(true);
    const [options7,setoptions7] = useState([]);
    const router = useRouter();
    const [stateCode,setStateCode] = useState(0);
    const [NamaEDC,setNamaEDC] = useState('');
    const [NamaToko,setNamaToko] = useState('');
    const [isStatusEDC,setisStatusEDC] = useState('');
    const [LastResponse,setLastResponse] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [options5,setOption5] = useState([]);
    const { t, i18n } = useTranslation();
    const [LoadingButton,setLoadingButton] = useState(false)
    const [isDisabled,setisDisabled] = useState(false)
    const isConnectedWS = useRef(0)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const [IconButtonFilter,setIconButtonFilter] = useState(<IconSend />)
    const MySwal = withReactContent(Swal);
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        let arr_cabang = get_branch_code(false,false);
        setOption5(arr_cabang)
    },[]);
    const userSelectKodeCabang = (value: any) => {
        if(IsValMulti){
            var arr_kode_cabang = "";
            for(var i = 0;i<value.length;i++){
                if(i === (value.length - 1 )){
                    arr_kode_cabang = arr_kode_cabang+value[i].value;
                }else{
                    arr_kode_cabang = arr_kode_cabang+value[i].value+",";
                }
            }
            setKODE_CABANG(arr_kode_cabang);
            setTextButtonFilter('Process')
            setDataIP('');
            var arr_concat = [];           
            var arr_content1 = {
                'label':'-- '+t('All Store')+' --',
                'value':'',
            };
            arr_concat.push(arr_content1);
           setoptions7(arr_concat);
        }else{
            if(value.value.length > 4){
                Swal.fire({
                    title: t("Warning"),
                    text: t("Select Branch Code"),
                    icon: "error",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }else{
                setKODE_CABANG(value.value)
                //-- GET LIST TOKO --//
                const url = `http://${IN_HOST}:7321/store/v1/ViewCabang`;
                const param = {kdcab:value.value};
                const Token = GetToken()
                Posts(url,JSON.stringify(param),false,Token).then(
                        (response) => {
                            const res_data = response;
                            var code = res_data.code;
                            var msg = res_data.msg;
                            try{
                                if(parseFloat(code) === 200){
                                    var data_body = JSON.parse(res_data.data);
                                    var arr_concat = [];
                                    if(IsValMulti){
                                        var arr_content1 = {
                                            'label':'-- '+t('All Store')+' --',
                                            'value':'',
                                        };
                                        arr_concat.push(arr_content1);
                                    }else{

                                    }
                                    for(var b = 0;b<data_body.length;b++){
                                        if(data_body[b].station.toString() === '01'){
                                            var arr_content = {
                                                'label':data_body[b].toko+':'+data_body[b].nama,
                                                'value':data_body[b].toko,
                                            };
                                            arr_concat.push(arr_content);
                                        }else{
                                        
                                        }
                                    }
                                    setoptions7(arr_concat);
                                    setKODE_TOKO('');
                                
                                }else if(code.toString().substring(0,1) === '4'){    
                                    Swal.fire({
                                        title: t("Warning"),
                                        text: ""+parseFloat(code)+"-"+msg,
                                        icon: "warning",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    });
                                    if(code === 401 && msg.includes("Invalid")){
                                    handleLogout();
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
                            }catch(Ex){
                                console.log(Ex.toString())
                            }  
                        }
                ).catch(
                    (error) => {
                        Swal.fire({
                            title: t("Warning"),
                            text: "Error : "+error.toString(),
                            icon: "error",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    }
                );
            }
        }
    };
    const userSelectKodeToko = (value: any) => {
        if(IsValMulti){
            var arr_kode_toko = "";
            for(var i = 0;i<value.length;i++){
                if(i === (value.length - 1 )){
                    arr_kode_toko = arr_kode_toko+value[i].value;
                }else{
                    arr_kode_toko = arr_kode_toko+value[i].value+",";
                }
            }
            setKODE_TOKO(arr_kode_toko);
            setTextButtonFilter('Process')
            setDataIP('');
        }else{
            setKODE_TOKO(value.value);
        }
    };
    const userSelectStation = (value:any) => {
        setStation(value.value);
        setDataGagal('');
        setDataIP('');
        setTextButtonFilter('Process')
    }
    const userSelectTipeFilter = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        if(val === 'per_cabang'){
            setIsValMulti(true);
            setoptions7([]);
        }else{
            setIsValMulti(false);
        }
    }
    const Def_Column_Service_Excellent = (rows:any) => {
        const columns: GridColDef[] = [
            { field: 'id', headerName: 'id', flex: 1 },
            {
                field: 'CLICK_FOR_ACTION', headerName: 'CLICK_FOR_ACTION', flex: 0, width: 150, minWidth: 150, maxWidth: 150,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span id={'btn_refresh_' + cellValues.id} className={cellValues.value === 200 ? 'badge bg-primary cursor-pointer' : 'badge bg-danger cursor-pointer'}>
                            <a className="cursor-pointer" onClick={(event) => {
                                NewhandleRowClick(event, cellValues, rows);
                            }} >
                                Trigger
                            </a>
                        </span>
                    )
                }
            },
            {
                field: 'KODE', headerName: 'KODE', width: 80, minWidth: 80, maxWidth: 80,
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            {
                field: 'KETERANGAN', headerName: 'KETERANGAN', width: 240, minWidth: 240, maxWidth: 240,
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 'Succes' ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            { field: 'REQUEST', headerName: 'REQUEST',  width: 170, minWidth: 170, maxWidth: 170},
            { field: 'RESPONSE', headerName: 'RESPONSE',  width: 170, minWidth: 170, maxWidth: 170},
            { field: 'KDCAB', headerName: 'KDCAB',   width: 80, minWidth: 80, maxWidth: 80},
            { field: 'KDTK', headerName: 'KDTK',  width: 80, minWidth: 80, maxWidth: 80},
            { field: 'NAMA', headerName: 'NAMA',  flex: 1,width: 250, minWidth: 250, maxWidth: 250},
            { field: 'STATION', headerName: 'STATION', width: 80, minWidth: 80, maxWidth: 80},
            { field: 'IP', headerName: 'IP',  width: 110, minWidth: 80, maxWidth: 110},
            { field: 'OS', headerName: 'OS',  flex: 1, width: 200, minWidth: 200, maxWidth: 200},
            { field: 'ARSITEKTUR', headerName: 'ARSITEKTUR',  flex: 1, width: 120, minWidth: 120, maxWidth: 120,align:'center',headerAlign:'center'},
            { field: 'CPU_INFO', headerName: 'CPU_INFO',  flex: 1, width: 350, minWidth: 350, maxWidth: 350},
            { field: 'CPU_USAGE', headerName: 'CPU_USAGE (%)',  flex: 1, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center'},
            { field: 'MEMORY_USAGE', headerName: 'MEMORY_USAGE (%)',  flex: 1, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center'},
            { field: 'MEMORY_TERPASANG', headerName: 'MEMORY_TERPASANG',  flex: 1, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center'},
            { field: 'MEMORY_TERBACA', headerName: 'MEMORY_TERBACA',  flex: 1, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center'},
            { field: 'HDD_NAME', headerName: 'HDD_NAME',  flex: 1, width: 200, minWidth: 200, maxWidth: 200,align:'center',headerAlign:'center'},
            { field: 'HDD_TOTAL', headerName: 'HDD_TOTAL',  flex: 1, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center'},
            { field: 'HDD_USED', headerName: 'HDD_USED',  flex: 1, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center'},
            { field: 'HDD_FREE', headerName: 'HDD_FREE',  flex: 1, width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center'},
            { field: 'HDD_HEALTH', headerName: 'HDD_HEALTH',  flex: 1, width: 100, minWidth: 100, maxWidth: 100,headerAlign:'center',align:'center'},
            { field: 'MEDIA_TYPE', headerName: 'TIPE', flex: 1, width: 190, minWidth: 190, maxWidth: 190,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <div>
                        {
                            cellValues.value === 'SSD' || cellValues.value === 'HDD' ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            (
                                cellValues.value === '' ? <span className='badge bg-danger'>{t('UnIdentify')}</span> 
                                : 
                                <span className='badge bg-danger'>{cellValues.value}</span>
                            ) 
                        }
                        </div>
                    )
                }
            },
            { field: 'SETTING_HIBERNATE', headerName: 'SETTING_HIBERNATE',  flex: 1, width: 200, minWidth: 200, maxWidth: 200},
            { field: 'UPS_STATUS', headerName: 'UPS_STATUS',  flex: 1, width: 400, minWidth: 400, maxWidth: 400},
            { field: 'DEVICE_ID', headerName: 'DEVICE_ID',  flex: 0, width: 200, minWidth: 200, maxWidth: 200},
            { field: 'AKTIVASI_WINDOWS', headerName: 'AKTIVASI_WINDOWS',  flex: 1, width: 550, minWidth: 550, maxWidth: 550},
            { field: 'PARTIAL_KEY_WINDOWS', headerName: 'PARTIAL_KEY_WINDOWS',  flex: 1, width: 250, minWidth: 250, maxWidth: 250},
            { field: 'LAST_INSTALL', headerName: 'LAST_INSTALL',  flex: 1, width: 250, minWidth: 250, maxWidth: 250,align:'center',headerAlign:'center'},
            { field: 'LAN_SPEED', headerName: 'LAN_SPEED',  flex: 1, width: 120, minWidth: 120, maxWidth: 120,align:'right',headerAlign:'center'},
            { field: 'UPTIME', headerName: 'UPTIME',  flex: 1, width: 220, minWidth: 220, maxWidth: 220},
            { field: 'SUHU', headerName: 'SUHU °C',  flex: 1, width: 100, minWidth: 100, maxWidth: 100,align:'right',headerAlign:'center'},
            { field: 'BOOT_TIME', headerName: 'BOOT_TIME',  flex: 1, width: 100, minWidth: 100, maxWidth: 100,align:'center',headerAlign:'center'},
            { field: 'LIST_IP', headerName: 'LIST_IP',  flex: 0, width: 220, minWidth: 220, maxWidth: 220},
            { field: 'SETTING_BCA', headerName: 'SETTING_BCA',  flex: 1, width: 450, minWidth: 450, maxWidth: 450},
            { field: 'EDC_BCA_ON', headerName: 'ON (kali)',  flex: 1, width: 90, minWidth: 90, maxWidth: 90, align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            show_Detail_Log_EDC(cellValues,'BCA','ONLINE');
                    }} data-twe-toggle="tooltip" title="Klik untuk melihat detail log EDC Online!" className="text-center text-success hover:text-white-light hover:cursor-pointer underline underline-offset-4">{cellValues.value}</a>
                    );
                }
            },
            { field: 'EDC_BCA_OFF', headerName: 'OFF (kali)',  flex: 1, width: 90, minWidth: 90, maxWidth: 90, align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            show_Detail_Log_EDC(cellValues,'BCA','OFFLINE');
                    }} data-twe-toggle="tooltip" title="Klik untuk melihat detail log EDC Offline!" className="text-center text-danger hover:text-white-light hover:cursor-pointer underline underline-offset-4">{cellValues.value}</a>
                    );
                }
            },
            { field: 'EDC_BCA_LAST', headerName: 'LAST',  flex: 1,  width: 450, minWidth: 450, maxWidth: 450,
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            show_Detail_Log_EDC(cellValues,'BCA','ALL');
                    }} data-twe-toggle="tooltip" title="Klik untuk melihat detail log EDC All Status!" className={cellValues.value.includes('ONLINE') ? 'badge bg-success  hover:cursor-pointer' : (cellValues.value.includes('OFFLINE') ? 'badge bg-warning' : 'badge bg-danger  hover:cursor-pointer')}  >{cellValues.value}</a>
                    );
                }
            },
            
            { field: 'SETTING_MANDIRI', headerName: 'SETTING_MANDIRI',   flex: 1, width: 450, minWidth: 450, maxWidth: 450},
            { field: 'EDC_MANDIRI_ON', headerName: 'ON (kali)',  flex: 1, width: 140, minWidth: 140, maxWidth: 140, align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            show_Detail_Log_EDC(cellValues,'MANDIRI','ONLINE');
                    }} data-twe-toggle="tooltip" title="Klik untuk melihat detail log EDC Online!" className="text-center text-success hover:text-white-light hover:cursor-pointer underline underline-offset-4">{cellValues.value}</a>
                    );
                }
            },
            { field: 'EDC_MANDIRI_OFF', headerName: 'OFF (kali)',  flex: 1, width: 140, minWidth: 140, maxWidth: 140,align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            show_Detail_Log_EDC(cellValues,'MANDIRI','OFFLINE');
                    }} data-twe-toggle="tooltip" title="Klik untuk melihat detail log EDC Offline!" className="text-center text-danger hover:text-white-light hover:cursor-pointer underline underline-offset-4">{cellValues.value}</a>
                    );
                }
            },
            { field: 'EDC_MANDIRI_LAST', headerName: 'LAST',  flex: 1, width: 450, minWidth: 450, maxWidth: 450,
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            show_Detail_Log_EDC(cellValues,'MANDIRI','ALL');
                    }} data-twe-toggle="tooltip" title="Klik untuk melihat detail log EDC All Status!" className={cellValues.value.includes('ONLINE') ? 'badge bg-success  hover:cursor-pointer' : (cellValues.value.includes('OFFLINE') ? 'badge bg-warning  hover:cursor-pointer' : 'badge bg-danger  hover:cursor-pointer')}  >{cellValues.value}</a>
                    );
                }
            },
            { field: 'SETTING_MTI', headerName: 'SETTING_MTI',   flex: 1, width: 450, minWidth: 450, maxWidth: 450},
            { field: 'EDC_MTI_ON', headerName: 'ON (kali)',  flex: 1, width: 140, minWidth: 140, maxWidth: 140, align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            show_Detail_Log_EDC(cellValues,'MTI','ONLINE');
                    }} data-twe-toggle="tooltip" title="Klik untuk melihat detail log EDC Online!" className="text-center text-success hover:text-white-light hover:cursor-pointer underline underline-offset-4">{cellValues.value}</a>
                    );
                }
            },
            { field: 'EDC_MTI_OFF', headerName: 'OFF (kali)',  flex: 1, width: 140, minWidth: 140, maxWidth: 140,align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            show_Detail_Log_EDC(cellValues,'MTI','OFFLINE');
                    }} data-twe-toggle="tooltip" title="Klik untuk melihat detail log EDC Offline!" className="text-center text-danger hover:text-white-light hover:cursor-pointer underline underline-offset-4">{cellValues.value}</a>
                    );
                }
            },
            { field: 'EDC_MTI_LAST', headerName: 'LAST',  flex: 1, width: 450, minWidth: 450, maxWidth: 450,
                renderCell: (cellValues: any) => {
                    return (
                        <a onClick={(event) => {
                            show_Detail_Log_EDC(cellValues,'MTI','ALL');
                    }} data-twe-toggle="tooltip" title="Klik untuk melihat detail log EDC All Status!" className={cellValues.value.includes('ONLINE') ? 'badge bg-success  hover:cursor-pointer' : (cellValues.value.includes('OFFLINE') ? 'badge bg-warning  hover:cursor-pointer' : 'badge bg-danger  hover:cursor-pointer')}  >{cellValues.value}</a>
                    );
                }
            },
            { field: 'REKOMENDASI_PERBAIKAN', headerName: 'REKOMENDASI_PERBAIKAN',  flex: 0, width: 350, minWidth: 350, maxWidth: 350,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                            cellValues.value.includes('CABANG') ? 
                            <span className='badge bg-danger'>{cellValues.value}</span>
                            :
                            <span className='badge bg-success'>{cellValues.value}</span>
                    );
                }
            },
            { field: 'STATUS_BSOD', headerName: 'STATUS_BSOD',  flex: 0, width: 200, minWidth: 200, maxWidth: 200,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                            cellValues.value.includes('CABANG') ? 
                            <span className='badge bg-danger'>{cellValues.value}</span>
                            :
                            <span className='badge bg-success'>{cellValues.value}</span>
                    );
                }
            },
            { field: 'FOLDER_BACKOFF_SHARING_MODE', headerName: 'FOLDER_BACKOFF_SHARING_MODE',  flex: 0, width: 250, minWidth: 250, maxWidth: 250,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                            cellValues.value.includes('FullControl') ? 
                            <span className='badge bg-success'>{cellValues.value}</span>
                            :
                            <span className='badge bg-danger'>{cellValues.value}</span>
                    );
                }
            } 
        ];
        const columnGroupingModel: GridColumnGroupingModel = [
            {
            groupId: 'Internal',
            description: '',
            children: [{ field: 'id' }],
            },

            {
                groupId: ' ',
                children: [{ field: 'CLICK_FOR_ACTION' },{ field: 'KODE' }, { field: 'KETERANGAN' },   { field: 'KDCAB' }, { field: 'KDTK' }, { field: 'NAMA' }, { field: 'STATION' }, { field: 'IP' }, { field: 'REQUEST' }, { field: 'RESPONSE' }],
            },
        
            {
                groupId: 'CPU',headerAlign:'center',
                children: [{ field: 'OS' },{ field: 'ARSITEKTUR' },{ field: 'CPU_INFO' }, { field: 'CPU_USAGE' }],
            },
            {
                groupId: 'MEMORY',headerAlign:'center',
                children: [{ field: 'MEMORY_USAGE' }, { field: 'MEMORY_TERPASANG' },{field: 'MEMORY_TERBACA'}],
            },
            {
                groupId: 'HDD',headerAlign:'center',
                children: [{ field: 'HDD_NAME' },{ field: 'HDD_TOTAL' }, { field: 'HDD_USED' }, { field: 'HDD_FREE' },{field: 'HDD_HEALTH'},{field: 'MEDIA_TYPE'}],
            },
            {
                groupId: 'UPS',headerAlign:'center',
                children: [{ field: 'SETTING_HIBERNATE' }, { field: 'UPS_STATUS' }, { field: 'DEVICE_ID' }],
            },
            {
                groupId: 'WINDOWS',headerAlign:'center',
                children: [{field:'AKTIVASI_WINDOWS'}, {field: 'PARTIAL_KEY_WINDOWS'},{field: 'LAST_INSTALL'}],
            },
            {
                groupId: 'LAIN_LAIN',headerAlign:'center',
                children: [{ field: 'LAN_SPEED' }, { field: 'UPTIME' },{ field: 'SUHU' },{ field: 'BOOT_TIME' },{ field: 'LIST_IP' },],
            },
            {
                groupId: 'EDC_BCA',headerAlign:'center',
                children: [{ field: 'SETTING_BCA' },{ field: 'EDC_BCA_ON' }, { field: 'EDC_BCA_OFF' },{ field: 'EDC_BCA_LAST' }],
            },
            {
                groupId: 'EDC_MANDIRI',headerAlign:'center',
                children: [{ field: 'SETTING_MANDIRI' },{ field: 'EDC_MANDIRI_ON' }, { field: 'EDC_MANDIRI_OFF' },{ field: 'EDC_MANDIRI_LAST' }],
            },
            {
                groupId: 'EDC_MTI',headerAlign:'center',
                children: [{ field: 'SETTING_MTI' },{ field: 'EDC_MTI_ON' }, { field: 'EDC_MTI_OFF' },{ field: 'EDC_MTI_LAST' }],
            },
            {
                groupId: 'PREVENTIF',headerAlign:'center',
                children: [{ field: 'REKOMENDASI_PERBAIKAN' },{ field: 'STATUS_BSOD' }, { field: 'FOLDER_BACKOFF_SHARING_MODE' }],
            },
        ];
        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
    }
    const HandleClick2 = async () => {
        if (TextButtonFilter === 'Proses' || TextButtonFilter === 'Process') {
            let in_counter = 0;
            start(in_counter, "timer");
            const kdcab = IN_CMB_KODE_CABANG;
            setTotalStation(0);
            setTotalGagal(0);
            setTotalSukses(0);
            setData_rows([]);
            setDataGagal('');
            setDataIP('');
            setClosedWS('');
            setLastResponse('');
            var list_ip_failed = '';
            var list_toko_failed = '';
            setStateCode(0);
            let rows = [];
            if (kdcab === '') {
                Swal.fire({
                    title: t("Warning"),
                    text: t("Select Branch Code"),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            } else {
                const station = IN_CMB_STATION;
                var key = GetToken()
                let kdtk = '';
                let noCheckDB = false;
                let maxSecondHandle = 120
                let isStartFilter = false
                if(IsValMulti){
                    if(kdcab === 'G029' || kdcab === 'G260'){
                        noCheckDB = true;
                    }else{
                        noCheckDB = false;
                    }
                    kdtk = "";
                    maxSecondHandle = 120
                    isStartFilter = true
                }else{
                    noCheckDB = true;
                    kdtk = IN_CMB_KODE_TOKO;
                    maxSecondHandle = 160
                    if(kdtk === ''){
                        isStartFilter = false
                    }else{
                        isStartFilter = true
                    }
                }
                //-- jika Flag isStartFilter = true, lanjutkan pada proses pengambilan data SE --//
                if(isStartFilter){
                    setTextButtonFilter('Please wait')
                    console.log(command)
                    let res_command = await GetSignature(IN_HOST, IN_PORT, key, command) as string
                    const param = WritePayload(kdcab, kdtk, station, "", "COMMAND", res_command, 2, false, IDReport, key, IP,noCheckDB,maxSecondHandle);
                    const socket = new WebSocket(url);
                    socket.binaryType = 'blob';
                    //Connection error
                    socket.addEventListener("error", (event: any) => {
                        Swal.fire({
                            title: t("Warning"),
                            text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                            icon: "error",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setisDisabled(false)
                        setLoading(false);
                        setProgress(t('Finished Session'));
                        setTextButtonFilter('Process')
                        const tgl_kini = get_format_tanggal_jam();
                        setClosedWS(tgl_kini)
                        stop()
                        isConnectedWS.current = 0
                        
                    });
                    // Connection opened
                    socket.addEventListener("open", () => {
                        socket.send(param);
                        setLoadingButton(true)
                        setTextButtonFilter('Please wait')
                        isConnectedWS.current = 1
                    });
                    // Connection close
                    socket.addEventListener("close", (event: any) => {
                        console.log('connection close');
                        setLoading(false);
                        stop();
                        setDataProsentase(0)
                        if(stateCode === 209){
                            setProgress(t('Finished Session'));
                            const val_gagal = GetTotalFailedClient('value_total_gagal')
                            setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                        }else{
                            setProgress('Ulangi Proses')
                            setTextButtonFilter('Process')
                            setDataIP('')
                        }
                        setisDisabled(false)
                        setLoadingButton(false)
                        const tgl_kini = get_format_tanggal_jam();
                        setClosedWS(tgl_kini)
                        isConnectedWS.current = 0
                    });
                    // Listen for messages
                    socket.addEventListener('message', async (event) => {
                        const data = ConvertBinaryToText(event);
                        const parse_json = JSON.parse(await data);
                        const code = parse_json.code;
                        const msg = parse_json.msg;
                        const countdata = parse_json.amountData;
                        setTotalStation(countdata);
                        setStateCode(code);
                        const tgl_kini = get_format_tanggal_jam();
                        setLastResponse(tgl_kini);
                        var total_gagal = 0;
                        var total_sukses = 0;
                        if (code === 200 || code === 209) {
                                setProgress(code + '-' + msg);
                                setLoading(true)
                                if(isConnectedWS.current === 0){
                                    setisDisabled(false);
                                }else{
                                    setisDisabled(true);
                                }
                                const rdata = parse_json.data;
                                try {
                                    const res_data = JSON.parse(rdata);
                                    const res_new =  res_data;
                                    var list_toko_sukses = '';
                                    for (var o = 0; o < res_new.length; o++) {
                                        const ubah_json = JSON.stringify(res_new[o]).split('\r\n').join(' ');
                                        const parse_data_inti = JSON.parse(ubah_json);
                                        const res_data_msg = parse_data_inti.msg
                                        const res_data_code = parse_data_inti.code
                                        const res_request = parse_data_inti.timerequest
                                        const res_response = parse_data_inti.timerespons
                                        const res_kdcab = parse_data_inti.kdcab
                                        const res_kdtk = parse_data_inti.toko
                                        const res_nama = parse_data_inti.nama
                                        const res_station = parse_data_inti.station
                                        const res_ip = parse_data_inti.ip
                                        let result = parse_data_inti.data
                                        //-- REPORT SERVICE EXCELLENT --//
                                        const obj = ReportServiceExcellent(false,0,[],res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result)
                                        rows.push(obj[0])
                                        //-- rekap data --//
                                        if (res_data_code !== 200) {
                                            total_gagal = total_gagal + 1;
                                            if (list_toko_failed.includes(res_kdtk)) {

                                            } else {
                                                list_toko_failed += res_kdtk + ",";
                                            }
                                            if (list_ip_failed.includes(res_ip)) {

                                            } else {
                                                list_ip_failed += res_ip + ",";
                                            }
                                        }else if(res_data_code === 200 && (result === '' || result.includes("Job timed out after"))){
                                            total_gagal = total_gagal + 1;
                                            if (list_toko_failed.includes(res_kdtk)) {

                                            } else {
                                                list_toko_failed += res_kdtk + ",";
                                            }
                                            if (list_ip_failed.includes(res_ip)) {

                                            } else {
                                                list_ip_failed += res_ip + ",";
                                            }
                                        } else {
                                            total_sukses = total_sukses + 1;
                                            if (list_toko_sukses.includes(res_kdtk)) {

                                            } else {
                                                list_toko_sukses += res_kdtk + ",";
                                            }
                                        }
                                    }
                                    //-- parse hitung dari data yang terupdate --//
                                    const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'KODE', false, false, false);
                                    setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                                    setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
                                    if(IsValMulti){
                                        //-- prosentase progressbar --//
                                        var prosentase = Math.round(((arr_data_sukses_dan_gagal_from_Table[0] + arr_data_sukses_dan_gagal_from_Table[1]) / countdata) * 100);
                                        setDataProsentase(prosentase)
                                    }else{
                                        setDataProsentase(0)
                                    }
                                    list_toko_failed = list_toko_failed.substring(0, (list_toko_failed.length - 1));
                                    setDataGagal(list_toko_failed);
                                    list_ip_failed = list_ip_failed.substring(0, (list_ip_failed.length - 1));
                                    setDataIP(list_ip_failed);
                                    let arr_res_columns = Def_Column_Service_Excellent(rows)
                                    const columns = arr_res_columns[0];
                                    const columnGroupingModel = arr_res_columns[1];
                                    setData_columns(columns);
                                    setcolumnGroupingModel(columnGroupingModel);
                                    setTextButtonFilter('Retrieve data failed ('+arr_data_sukses_dan_gagal_from_Table[1]+')')
                                    var res_rows = AddID(rows);
                                    setData_rows(res_rows);
                                    if (code === 209) {
                                        setLoading(false);
                                        setLoadingButton(false)
                                        setisDisabled(false)
                                        isConnectedWS.current = 0
                                    } else {
                                        setLoadingButton(true)
                                        isConnectedWS.current = 1
                                    }
                                } catch (Ex) {
                                    console.log('error parsing : '+Ex.toString());
                                    const val_gagal = GetTotalFailedClient('value_total_gagal')
                                    setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                                    setLoading(false);
                                    setLoadingButton(false)
                                }
                        }else if (code === 201) {
                            setProgress(code + "-" + msg);
                            setLoading(true);
                            setLoadingButton(true)
                            setisDisabled(true)
                            isConnectedWS.current = 1
                        }else if (parse_json.code.toString().substring(0, 1) === '4') {
                            Swal.fire({
                                title: t("Warning"),
                                text: "" + parseFloat(code) + "-" + msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            if (code === 403) {
                                //-- redirect ke login --//
                                handleLogout();
                            }
                            setLoading(false);
                            setProgress('');
                            setTextButtonFilter('Process')
                            isConnectedWS.current = 0
                        }
                    });
                //-- jika Flag isStartFilter = false, Informasikan untuk mengisi kode toko --//    
                }else{
                    MySwal.fire({
                        title: t('Before Processing Service Excellent Report, Please Select Store'),
                        toast: true,
                        position: isRtl ? 'top-start' : 'top-end',
                        showConfirmButton: false,
                        timer: 10000,
                        showCloseButton: true,
                        customClass: {
                            popup: `color-danger`,
                        },
                    });
                    setTextButtonFilter('Process')
                    setLoading(false)
                    setProgress('')
                    setLoadingButton(false)
                }
            }
        // ------------------------- PROSES DATA GAGAL ------------------------- //    
        } else {
            const res_data_gagal = data_gagal;
            if (res_data_gagal !== '') {
                let in_counter = 0;
                start(in_counter, "timer");
                const kdcab = IN_CMB_KODE_CABANG;
                if (kdcab === '') {
                    Swal.fire({
                        title: t("Warning"),
                        text: t("Select Branch Code"),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                } else {
                    const station = IN_CMB_STATION;
                    var key = GetToken()
                    let res_command = await GetSignature(IN_HOST, IN_PORT, key, command_gagal) as string
                    const param = WritePayload(kdcab, "", station, "", "COMMAND", res_command, 4, false, IDReport, key, IP,true,70);
                    setTextButtonFilter('Please wait')
                    const socket = new WebSocket(url);
                    socket.binaryType = 'blob';
                    //Connection error
                    socket.addEventListener("error", (event) => {
                        Swal.fire({
                            title: t("Warning"),
                            text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                            icon: "error",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setProgress(t('Finished Session'));
                        setTextButtonFilter('Process')
                        isConnectedWS.current = 0
                        setLoadingButton(false)
                        setisDisabled(false)
                    });
                    // Connection opened
                    socket.addEventListener("open", () => {
                        socket.send(param);
                        console.log(param)
                        setTextButtonFilter('Please wait')
                        setLoadingButton(true)
                        isConnectedWS.current = 1
                        setisDisabled(true)
                    });
                    // Connection close
                    socket.addEventListener("close", (event: any) => {
                        console.log('connection close');
                        setLoading(false);
                        setProgress(t('Finished Session'));
                        stop();
                        const val_gagal = GetTotalFailedClient('value_total_gagal')
                        setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                        setLoadingButton(false)
                        setisDisabled(false)
                        isConnectedWS.current = 0
                    });
                    // Listen for messages
                    socket.addEventListener('message', async (event) => {
                        const data = ConvertBinaryToText(event);
                        const parse_json = JSON.parse(await data);
                        const code = parse_json.code;
                        const msg = parse_json.msg;
                        let rows = [];
                        console.log(code + '-' + msg)
                        if (code === 200 || code === 209) {
                              setProgress(code + '-' + msg);
                              setLoading(true);
                            if (((msg.includes('Mohon di tunggu'))) || (msg.includes('Handletime kami Default'))) {
                        
                            } else {
                                if(isConnectedWS.current === 0){
                                    setisDisabled(false)
                                }else{
                                    setisDisabled(true)
                                }
                                try {
                                    const res_data = JSON.parse(parse_json.data);
                                    const res_new =  res_data;
                                    for (var o = 0; o < res_new.length; o++) {
                                        const ubah_json = JSON.stringify(res_new[o])
                                        const parse_data_inti = JSON.parse(ubah_json)
                                        let res_data_msg = parse_data_inti.msg
                                        let res_data_code = parse_data_inti.code
                                        let res_request = parse_data_inti.timerequest
                                        let res_response = parse_data_inti.timerespons
                                        let res_kdcab = parse_data_inti.kdcab
                                        let res_kdtk = parse_data_inti.toko
                                        let res_nama = parse_data_inti.nama
                                        let res_station = parse_data_inti.station
                                        let res_ip = parse_data_inti.ip
                                        let result = parse_data_inti.data
                                        let objIndex = data_rows.findIndex(((obj: { IP: any; }) => obj.IP == res_ip));
                                        ReportServiceExcellent(true,objIndex,data_rows,res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result);
                                        rows = data_rows;
                                        //-- failed listeners --//
                                        //-- parse hitung dari data yang terupdate --//
                                        const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'KODE', false, false, false);
                                        setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                                        setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
                                        const res_data_gagal_after_trigger = GetFailedClient(rows, 'KDCAB', false);
                                        setDataGagal(res_data_gagal_after_trigger);
                                        const res_ip_gagal_after_trigger = GetFailedClient(rows, 'KDCAB', true);
                                        setDataIP(res_ip_gagal_after_trigger);
                                        setDataProsentase(0)
                                        setTextButtonFilter('Retrieve data failed ('+arr_data_sukses_dan_gagal_from_Table[1]+')')
                                        if (code === 209) {
                                            setLoading(false);
                                            setData_rows(rows);
                                            isConnectedWS.current = 0
                                        } else {
                                            setProgress(code + '-' + msg);
                                            setData_rows(rows);
                                        }
                                    }
                                } catch (Ex) {
                                    if(code === 209){
                                        const val_gagal = GetTotalFailedClient('value_total_gagal')
                                        setTextButtonFilter('Retrive Data Failed'+' ('+val_gagal+')')
                                        setLoading(false)
                                        setisDisabled(false)
                                        setLoadingButton(false)
                                        isConnectedWS.current = 0
                                    }
                                }
                            }
                        } else if (code === 201) {
                            setProgress(code + "-" + msg);
                            setLoading(true);
                            isConnectedWS.current = 1
                        } else if (parse_json.code.toString().substring(0, 1) === '4') {
                            setLoading(true);
                            Swal.fire({
                                title: t("Warning"),
                                text: "" + parseFloat(code) + "-" + msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            if (code === 403) {
                                //-- redirect ke login --//
                                handleLogout();
                            }
                            setLoading(false);
                            setProgress('');
                            setTextButtonFilter('Process')
                            isConnectedWS.current = 0
                        }
                    });
                }
            } else {
                setLoading(false);
                setTextButtonFilter('Process')
                isConnectedWS.current = 0
            }
        }
    }; 
    const NewhandleRowClick = async (event:any, cellValues:any, data_prev:any) => {
        let in_counter = 0;
        var kdcab = "";
        var kdtk = "";
        var station = "";
        var row_id = "";
        var id_btn = "";
        var ip = "";
        var idreport = IDReport;
        try {
            kdcab = cellValues.row.KDCAB;
            kdtk = cellValues.row.KDTK;
            station = cellValues.row.STATION;
            row_id = cellValues.row.id;
            id_btn = 'btn_refresh_' + cellValues.row.id;
            ip = cellValues.row.IP;
        } catch (Ex) {
            kdcab = cellValues.row.KDCAB;
            kdtk = cellValues.KDTK;
            station = cellValues.STATION;
            row_id = cellValues.id;
            id_btn = 'btn_refresh_' + cellValues.id;
            ip = cellValues.row.IP;
        }
        start(in_counter, id_btn);
        setLoading(true);
        const myExample = document.getElementById(id_btn);
        const list = myExample.classList;
        list.remove("bg-primary");
        list.add("bg-warning");
        const Token = GetToken()
        setDataProsentase(0)
        let res_command = await GetSignature(IN_HOST, IN_PORT, Token, command) as string
        SendHandleRowClick(idreport,kdcab,kdtk,station,res_command,Token).then((response) => {
            const res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            var rdata = res_data.data;
            if(parseFloat(code) === 200){
                var data_body = JSON.parse(rdata);
                var res_data_code = data_body[0].code;
                var res_data_msg = data_body[0].msg;
                var parse_data_inti = data_body[0].data;
                const res_request = data_body[0].timerequest;
                const res_response = data_body[0].timerespons;
                const res_kdcab = data_body[0].kdcab;
                const res_kdtk = data_body[0].toko;
                const res_nama = data_body[0].nama;
                const res_station = data_body[0].station;
                const res_ip = data_body[0].ip;
                let result = data_body[0].data
                let objIndex = data_prev.findIndex(((obj: { IP: any; }) => obj.IP == res_ip));
                ReportServiceExcellent(true,objIndex,data_prev,res_kdcab,res_kdtk,res_nama,res_ip,res_station,res_request,res_response,IDReport,res_data_code,res_data_msg,result);
                var rows = data_prev;
                //-- parse hitung dari data yang terupdate --//
                const arr_data_sukses_dan_gagal_from_Table = groupByMessageListeners(rows, 'KODE', false, false, false);
                setTotalSukses(arr_data_sukses_dan_gagal_from_Table[0]);
                setTotalGagal(arr_data_sukses_dan_gagal_from_Table[1]);
                Swal.fire({
                    title: t("Warning"),
                    text: code+'-'+msg,
                    icon: "success",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setLoading(false);
                stop();
                myExample.innerHTML = 'Trigger';
                list.remove("bg-warning");
                list.add("bg-primary");
            }else if(code.toString().substring(0,1) === '4'){
                Swal.fire({
                    title: t("Warning"),
                    text: ""+parseFloat(code)+"-"+msg,
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                if(code === 401 && msg.includes("Invalid")){
                    handleLogout();
                }
                stop();
                setLoading(false); 
                myExample.innerHTML = 'Trigger';
                list.remove("bg-warning");
                list.add("bg-primary");
            }else{
                Swal.fire({
                    title: t("Warning"),
                    text: ""+parseFloat(code)+"-"+msg,
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setLoading(false);
                myExample.innerHTML = 'Trigger';
                list.remove("bg-warning");
                list.add("bg-primary");
            }
        }).catch((error) => {
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+error.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            stop()
            setLoading(false);
            myExample.innerHTML = 'Trigger';
            list.remove("bg-warning");
            list.add("bg-primary");
        });
    }
    const HandleReloadClick = () =>{
        try{
            setData_rows([]);
            router.reload();
        }catch(Ex){
            console.log('error : '+Ex.toString())
        }
    };
    const show_Detail_Log_EDC = async (cellValues:any,in_nama_edc:string,in_is_status_edc:string) =>{
        try{
            setModal13(true);
            setDataRowsEDC([]);
            setLoadingEDC(true);
            setisStatusEDC(in_is_status_edc.toUpperCase());
            setNamaEDC(in_nama_edc.toUpperCase());
            const kdcab = cellValues.row.KDCAB;
            const kdtk = cellValues.row.KDTK;
            const station = cellValues.row.STATION;
            const ip_toko = cellValues.row.IP;
            const list_ip_toko = cellValues.row.LIST_IP;
            setNamaToko(kdcab+"-"+kdtk+"-"+station)
            let query = "";
            let filter_online_offline = '';
            if(in_is_status_edc === 'ONLINE'){
                filter_online_offline = "HAVING TYPE = 'ONLINE'";
            }else if(in_is_status_edc === 'OFFLINE'){
                filter_online_offline = "HAVING TYPE != 'ONLINE'";
            }else{
                filter_online_offline = "";
            }
            if(in_nama_edc === 'BCA'){
                query = "\"\\\"SELECT jenisEDC, tipe_trx, station_EDC,COM,IP,IP_sender, DATE_FORMAT(responsetime,'%Y-%m-%d %H:%i:%s') AS responsetime,IF(response RLIKE 'SYSTEM MALFUNCTION|CRC SALAH|TIDAK TERIMA RESPONSE DARI HOST|OK|00BANK|MELAMPAUI LIMIT|SALDO TIDAK|SALAH PIN|AKTIVASI ULANG|DO NOT HONOR|SUCCESS', 'ONLINE', 'OFFLINE') AS TYPE,IF(response RLIKE 'SYSTEM MALFUNCTION|CRC SALAH|TIDAK TERIMA RESPONSE DARI HOST|OK|00BANK|MELAMPAUI LIMIT|SALDO TIDAK|SALAH PIN|AKTIVASI ULANG|DO NOT HONOR|SUCCESS', CONCAT('ONLINE-',response), IF(response RLIKE 'TIME OUT|aborted|TIDAK TERIMA RESPONSE DARI EDC|DITOLAK|ERROR HOST|The specified|RESPONSE DARI EDC|The semaphore|Given|THE DEVICE|A device|Access|ERROR|THE PORT', response, response)) response FROM heartbeat_edc  WHERE jenisEDC RLIKE 'BCA' AND (SUBSTRING_INDEX(REPLACE(IP_SENDER,'fe80::5efe:',''),'%',1) IN("+list_ip_toko.split('"').join("'")+") )  AND DATE(responsetime)=(SELECT cast(MAX(date(responsetime)) as char) FROM heartbeat_edc WHERE jenisedc RLIKE'BCA' AND (IP_SENDER IN("+list_ip_toko.split('"').join("'")+") ) AND YEAR(responsetime)=YEAR(NOW())) "+filter_online_offline+";\"\\\"";
            }else if(in_nama_edc === 'MANDIRI'){
                query = "\"\\\"SELECT jenisEDC, tipe_trx, station_EDC,COM,IP,IP_sender, DATE_FORMAT(responsetime,'%Y-%m-%d %H:%i:%s') AS responsetime,IF(response RLIKE 'SYSTEM MALFUNCTION|CRC SALAH|TIDAK TERIMA RESPONSE DARI HOST|OK|00BANK|MELAMPAUI LIMIT|SALDO TIDAK|SALAH PIN|AKTIVASI ULANG|DO NOT HONOR|SUCCESS', 'ONLINE', 'OFFLINE') AS TYPE,IF(response RLIKE 'SYSTEM MALFUNCTION|CRC SALAH|TIDAK TERIMA RESPONSE DARI HOST|OK|00BANK|MELAMPAUI LIMIT|SALDO TIDAK|SALAH PIN|AKTIVASI ULANG|DO NOT HONOR|SUCCESS', CONCAT('ONLINE-',response), IF(response RLIKE 'TIME OUT|aborted|TIDAK TERIMA RESPONSE DARI EDC|DITOLAK|ERROR HOST|The specified|RESPONSE DARI EDC|The semaphore|Given|THE DEVICE|A device|Access|ERROR|THE PORT', response, response)) response FROM heartbeat_edc WHERE jenisEDC RLIKE 'MANDIRI' AND (SUBSTRING_INDEX(REPLACE(IP_SENDER,'fe80::5efe:',''),'%',1) IN("+list_ip_toko.split('"').join("'")+")  )  AND date(responsetime)=(SELECT cast(MAX(date(responsetime)) as char) FROM heartbeat_edc WHERE jenisedc RLIKE'MANDIRI' AND (IP_SENDER IN("+list_ip_toko.split('"').join("'")+") ) AND YEAR(responsetime)=YEAR(NOW())) "+filter_online_offline+" ;\"\\\"";
            }else{
                query = "\"\\\"SELECT jenisEDC, tipe_trx, station_EDC,COM,IP,IP_sender, DATE_FORMAT(responsetime,'%Y-%m-%d %H:%i:%s') AS responsetime,IF(response RLIKE 'SYSTEM MALFUNCTION|CRC SALAH|TIDAK TERIMA RESPONSE DARI HOST|OK|00BANK|MELAMPAUI LIMIT|SALDO TIDAK|SALAH PIN|AKTIVASI ULANG|DO NOT HONOR|SUCCESS', 'ONLINE', 'OFFLINE') AS TYPE,IF(response RLIKE 'SYSTEM MALFUNCTION|CRC SALAH|TIDAK TERIMA RESPONSE DARI HOST|OK|00BANK|MELAMPAUI LIMIT|SALDO TIDAK|SALAH PIN|AKTIVASI ULANG|DO NOT HONOR|SUCCESS', CONCAT('ONLINE-',response), IF(response RLIKE 'TIME OUT|aborted|TIDAK TERIMA RESPONSE DARI EDC|DITOLAK|ERROR HOST|The specified|RESPONSE DARI EDC|The semaphore|Given|THE DEVICE|A device|Access|ERROR|THE PORT', response, response)) response FROM heartbeat_edc WHERE jenisEDC RLIKE 'MTI' AND (SUBSTRING_INDEX(REPLACE(IP_SENDER,'fe80::5efe:',''),'%',1) IN("+list_ip_toko.split('"').join("'")+")  )  AND date(responsetime)=(SELECT cast(MAX(date(responsetime)) as char) FROM heartbeat_edc WHERE jenisedc RLIKE'MTI' AND (IP_SENDER IN("+list_ip_toko.split('"').join("'")+") ) AND YEAR(responsetime)=YEAR(NOW())) "+filter_online_offline+" ;\"\\\"";
            }
            
            const res_command_query = "%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"[void][system.reflection.Assembly]::LoadFrom('C:\\IDMCommandListeners\\MySql.Data.DLL');$registryPath='HKCU:\\Software\\INDOMARET\\POS.NET\\Database';$vName='Server';$regVal=Get-ItemProperty -Path $registryPath -Name $vName -ErrorAction Stop;$ipInduk=$regVal.$vName;$server=$ipInduk;$mysql_user = 'edp';$mysql_password = 'cUm4l!h4t@datA';$dbName = 'pos';$Connection = New-Object -TypeName MySql.Data.MySqlClient.MySqlConnection;$Connection.ConnectionString = \"\\\"SERVER=$server;DATABASE=$dbName;UID=$mysql_user;PWD=$mysql_password\"\\\";$Connection.Open();$MYSQLCommand = New-Object MySql.Data.MySqlClient.MySqlCommand;$MYSQLDataAdapter = New-Object MySql.Data.MySqlClient.MySqlDataAdapter;$MYSQLDataSet = New-Object System.Data.DataSet;$MYSQLCommand.Connection=$Connection;$MYSQLCommand.CommandText="+query+";$MYSQLDataAdapter.SelectCommand=$MYSQLCommand;$NumberOfDataSets=$MYSQLDataAdapter.Fill($MYSQLDataSet, 'data');$data_from = '';foreach($DataSet in $MYSQLDataSet.tables[0]){$data_record = -join($DataSet.jenisEDC,'&',$DataSet.tipe_trx,'&',$DataSet.station_EDC,'&',$DataSet.COM,'&',$DataSet.IP,'&',$DataSet.IP_sender,'&',$DataSet.responsetime,'&',$DataSet.TYPE,'&',$DataSet.response,'~');$data_from = -join($data_from,$data_record)}Write-Host $data_from;$Connection.Close();\"";
            const key = GetToken()
            const resIDReport = "Detail Log EDC";
            let res_command = await GetSignature(IN_HOST, IN_PORT, key, res_command_query) as string
            const param = WritePayload(kdcab, "", "", "", "COMMAND", res_command, 2, false, resIDReport, key, ip_toko,true,20);
            const socket = new WebSocket(url);
            socket.binaryType = 'blob';
            //Connection error
            socket.addEventListener("error", (event: any) => {
                Swal.fire({
                    title: t("Warning"),
                    text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                    icon: "error",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            });
            // Connection opened
            socket.addEventListener("open", () => {
                socket.send(param);
            });
            // Connection close
            socket.addEventListener("close", (event: any) => {
                console.log('connection close');
                setProgressEDC('Sesi Selesai');
            });
            // Listen for messages
            socket.addEventListener('message', async (event) => {
                const data = ConvertBinaryToText(event);
                const parse_json = JSON.parse(await data);
                const code = parse_json.code;
                const msg = parse_json.msg;
                const rdata = parse_json.data;
                const countdata = parse_json.amountData;
                setProgressEDC(code+'-'+msg);
                try{
                    const res_data = JSON.parse(rdata);
                    const res_new =  res_data;
                    for (var o = 0; o < res_new.length; o++) {
                        const ubah_json = JSON.stringify(res_new[o]);
                        const parse_data_inti = JSON.parse(ubah_json);
                        const res_result = parse_data_inti.data.toString().split('~');
                        let arr_data = [];
                        for(var i = 0;i<(res_result.length-1);i++){
                            const field = res_result[i].split('&');
                            const jenis_edc = field[0];
                            const tipe_trx = field[1];
                            const stationEDC = field[2];
                            const COM = field[3];
                            const IP = field[4];
                            const IP_sender = field[5];
                            const responsetime = field[6];
                            const type = field[7];
                            const response = field[8];
                            const obj_record = {"JENIS_EDC":jenis_edc,"TIPE_TRX":tipe_trx,"STATION_EDC":stationEDC,"COM":COM,"IP":IP,"IP_SENDER":IP_sender,"RESPONSE_TIME":responsetime,"TYPE":type,"RESPONSE":response};
                            if(jenis_edc !== ''){
                                arr_data.push(obj_record);
                            }
                        }
                        const columns: GridColDef[] = [
                            { field: 'id', headerName: 'id', flex: 1 },
                            { field: 'JENIS_EDC', headerName: 'JENIS_EDC',  width: 130, minWidth: 130, maxWidth: 130,  flex:0},
                            { field: 'TIPE_TRX', headerName: 'TIPE_TRX',  width: 130, minWidth: 130, maxWidth: 130,  flex:0},
                            { field: 'STATION_EDC', headerName: 'STATION_EDC', width: 110,  flex:0 },
                            { field: 'COM', headerName: 'COM', width: 90,  flex:0 },
                            { field: 'IP', headerName: 'IP', width: 130, minWidth: 130, maxWidth: 130,  flex:0 },
                            { field: 'IP_SENDER', headerName: 'IP_SENDER',width: 130, minWidth: 130, maxWidth: 130,  flex:0 },
                            { field: 'RESPONSE_TIME', headerName: 'RESPONSE_TIME', width: 165, minWidth: 165, maxWidth: 165,  flex:0 },
                            { field: 'TYPE', headerName: 'TYPE', flex:1, hideable:false },
                            { field: 'RESPONSE', headerName: 'RESPONSE', flex:1 },
                        ];
                        const columnGroupingModel: GridColumnGroupingModel = [];
                        if(code === 200){
                            const res_rows = AddID(arr_data);
                            setDataRowsEDC(res_rows);
                            setDataColumnsEDC(columns);
                        }else if(code === 209){
                            const res_rows = AddID(arr_data);
                            setDataRowsEDC(res_rows);
                            setDataColumnsEDC(columns);
                            setLoadingEDC(false);
                        }
                    }
                }catch(Ex){
                    console.log('error parsing : '+Ex.toString())
                }  
            });
        }catch(Ex){
            Swal.fire({
                icon: 'error',
                padding: '2em',
                title: t("Warning"),
                text: "Error : " + Ex.toString(),
                customClass: 'sweet-alerts',
                timer: 30000,
                timerProgressBar: true,
                showCancelButton: false,
                showConfirmButton: false
            });
        }
    }
    const CloseModal = () => {
        setModal13(false)
    }
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                    <div className="grid-cols-2 gap-3  md:grid-cols-2 mb-3 flex items-end justify-left">
                        <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
                                <div className="p-2 flex items-center flex-col sm:flex-row">
                                    <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                                        <div className="mb-3">
                                        <div className="flex item-center font-semibold">   
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                            </svg>
                                            <h2 className="text-dark mt-1 ml-1 text-center text-1xl dark:text-white-light">Form Filter</h2>
                                        </div>
                                        </div>
                                        <InputCheckBoxFilterType event={userSelectTipeFilter} />
                                        <DropDownBranch in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options5} isSearchable={true} isMulti={IsValMulti} event={userSelectKodeCabang} />
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><DropDownStore in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options7} isSearchable={true} isMulti={false} event={userSelectKodeToko} /></div>
                                            <div><DropDownStation in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={[]} isSearchable={true} isMulti={false} isInduk={false} event={userSelectStation} /></div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="flex">
                                                <ButtonFilter in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={GetID()} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={IconButtonFilter} in_title_button={TextButtonFilter} HandleClick={HandleClick2} />
                                                &nbsp;
                                                <ButtonReload in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={GetID()} isLoading={false} isDisabled={false} HandleClick={HandleReloadClick} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <CardInfoProses total_station={total_station} total_sukses={total_sukses} total_gagal={total_gagal} in_classname_content={"mx-auto grid max-w-[900px] grid-cols-4 justify-items-center gap-3 mb-16"} />
                    </div>
                    <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{id: false,PROCESSLIST: false}} jenis_laporan={'Report Service Excellent'} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'STATION'} type_sorting={'asc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(ClosedWS),new Date(LastResponse))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5,10,25,50,100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={DataProsentase} in_rows_spanning={false}  />
                    <ModalComponent in_size_modal={`panel animate__animated my-7 w-4/5 overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-lg font-bold text-white"} in_title_modal={'Detail Log EDC : '+NamaEDC+' Status : '+isStatusEDC+' '+t("Store")+' : '+NamaToko} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                        <div className="p-5">
                            <div className="mb-5">
                                <DataTablesColourCell  in_is_same_colouring_all_rows={false} in_name_column_cek={"TYPE"} in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false,TYPE:false }} jenis_laporan={'Data EDC'} data_rows={data_rows_edc} data_columns={data_columns_edc} isLoading={loading_edc} progressbar={progressbar_edc} field_auto_sorting={'RESPONSE_TIME'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} />
                            </div>
                        </div>
                    } />
                </>
            } />
        </>
    )
}
export default FormServiceExcellent;