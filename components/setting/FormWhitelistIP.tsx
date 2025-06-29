'use client'
import { Fragment, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Select from 'react-select';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import IconUserPlus from "../Icon/IconUserPlus";
import config from '@/lib/config.json';
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertBinaryToText, GenerateUniqNumber, GetFailedClient, GetID, GetToken, GetTotalFailedClient, HitungSuksesDanGagalFomTable, ListKey, SummaryValueOfArray, WritePayload, get_branch_code, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, setTombolAmbilDataGagal, start, stop } from "@/lib/global";
import { Posts } from "@/lib/post";
import { removeItemByValue } from '../../lib/global';
import IconEdit from "../Icon/IconEdit";
import { Dialog, Transition } from "@headlessui/react";
import IconX from "../Icon/IconX";
import IconHome from "../Icon/IconHome";
import IconInbox from "../Icon/IconInbox";
import IconTrash from "../Icon/IconTrash";
import { useTranslation } from "react-i18next";
import DropDownBranch from "../dropdown/DropDownBranch";
import ButtonFilter from "../button/ButtonFilter";
import IconSearch from "../Icon/IconSearch";
import ButtonReload from "../button/ButtonReload";
import ButtonAdd from "../button/ButtonAdd";
import IconChecks from "../Icon/IconChecks";
import themeConfig from "@/theme.config";
import ModalComponent from "../modal/ModalComponent";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
interface FormWhitelistIPProps {
    url: string,
    command: string,
    IDReport: string,
}

var options2 = [{value:'IDMCOMMANDER',label:'IDMCOMMANDER'},{value:'IDMCOMMANDLISTENERS',label:'IDMCOMMANDLISTENERS'}];
const FormWhitelistIP: React.FC<FormWhitelistIPProps> = ({ url, command, IDReport }) => {
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [IN_CMB_STATION, setStation] = useState("");
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const [columnGroupingModel,setcolumnGroupingModel] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Visible,setVisible] = useState(false);
    const [progressbar, setProgress] = useState('');
    const [isStopReload, setStopReload] = useState('0');
    const [modal13, setModal13] = useState(false);
    const [IN_DETAIL_KDCAB,setDetailKdcab] = useState({});
    const [IN_DETAIL_JENIS,setDetailJenis] = useState({});
    const [IN_DETAIL_SEGMENT,setDetailSegment] = useState(''); 
    const [IN_OTORISATOR,setDetailOtorisator] = useState('');
    const [IN_TAMBAH_IP,setTambahIP] = useState('');
    const [data_rows_detail,setData_rows_detail] = useState([]);
    const ref_data_detail = useRef([]);
    const [data_columns_detail,setData_columns_detail] = useState([]);
    const [loading_detail,setLoading_detail] = useState(false);
    const [options5,setOption5] = useState([]);
    const { t, i18n } = useTranslation();
    const [LoadingButton,setLoadingButton] = useState(false)
    const [TextButtonFilter,setTextButtonFilter] = useState('Process')
    const [isDisabled, setisDisabled] = useState(false);
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        //setData_columns(columns);
        let arr_cabang = get_branch_code(true,false);
        setOption5(arr_cabang)
    },[]);

    
    const userSelectDetailOtorisator = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setDetailOtorisator(val);
    };
    
    const userTambahIP = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setTambahIP(val);
    };


    const userSelectDetailKdcab = (value: any) => {
        try{
            if(JSON.stringify(value).includes('{')){
                setDetailKdcab(value);
            }else{
                const arr_kdcab = {
                    value:value,
                    label:value
                };
                setDetailKdcab(arr_kdcab);
            }
        }catch(Ex){
            console.log('Error : '+Ex.toString())
        }
    };

    const userSelectDetailJenis = (value: any) => {
        try{
            if(JSON.stringify(value).includes('{')){
                setDetailJenis(value);
            }else{
                const arr_kdcab = {
                    value:value,
                    label:value
                };
                setDetailJenis(arr_kdcab);
            }
        }catch(Ex){
            console.log('Error : '+Ex.toString())
        }
        
    };

    const userSelectKodeCabang = (value: any) => {
        if (value.length == 0) {
            setKODE_CABANG('')
        } else {
            var arr_kode_cabang = value.value;
            setKODE_CABANG(arr_kode_cabang);
            setTextButtonFilter('Process')
            setisDisabled(false)
            setLoadingButton(false)
        }
    };

    const userSelectStation = (value: any) => {
        setStation(value.value);
    }

    const userReload = (value: any) => {
        setStopReload(value.value);
    }

    const column_data = [
        { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
        { field: 'EDIT', headerName: 'EDIT',   width: 80, minWidth: 80, maxWidth: 80,
        renderCell: (cellValues: any) => {
            return (
                <a onClick={() => {handleRowClick(cellValues)}} >
                <IconEdit className={"text-yellow-500 font-medium"} />
                </a>
            );
        }
        },
        { field: 'KDCAB', headerName: 'KDCAB',   width: 80, minWidth: 80, maxWidth: 90},
        { field: 'JENIS', headerName: 'JENIS',  width: 150, minWidth: 150, maxWidth: 150},
        { field: 'LIST_SEGMENT_IP', headerName: 'LIST_SEGMENT_IP',  width: 638, minWidth: 638, maxWidth: 638},
        { field: 'OTORISATOR', headerName: 'OTORISATOR',  width: 100, minWidth: 100, maxWidth: 100},
    ];


    var counter_id = 0;

    const get_data = ()=>{
        const kdcab = IN_CMB_KODE_CABANG;
        try{
                
            setLoading(true)
            setLoadingButton(true)
            setisDisabled(true)
            setVisible(false)
            const url = `http://${IN_HOST}:${IN_PORT}/v1/GetsegmentIPWhitelist`;
            const param = {"kdcab":kdcab};
            const Token = GetToken()
                Posts(url,JSON.stringify(param),false,Token) .then(
                         (response) => {
                             const res_data = response;
                             var code = res_data.code;
                             var msg = res_data.msg;
                             
                             if(parseFloat(code) === 200){
                                var data_body = JSON.parse(res_data.data);
                                var res_data_rows_body: React.SetStateAction<any[]> = [];
                                setData_rows(res_data_rows_body);
                                for(var b = 0;b<data_body.length;b++){
                                   var arr_content = {
                                               'id':(b+1),
                                               'EDIT':'',
                                               'KDCAB':data_body[b].kdcab,
                                               'JENIS': data_body[b].jenis,
                                               'LIST_SEGMENT_IP':data_body[b].list_segment_ip,
                                               'OTORISATOR':data_body[b].otorisator
                                   };
                                   res_data_rows_body.push(arr_content);
                                }
                                setData_rows(res_data_rows_body);
                                setData_columns(column_data);
                                setVisible(true);
                                setLoading(false);
                                setLoadingButton(false)
                                setisDisabled(false)
                               
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
                                 setVisible(false)
                                 setLoading(false)
                                 setLoadingButton(false)
                                 setisDisabled(false)
                             } 
                            
                             setTextButtonFilter('Process')
                            
                         }
                 ).catch(
                     (error) => {
                        Swal.fire({
                            title: t("Warning"),
                            text: "Error mendapatkan data "+kdcab+": Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setTextButtonFilter('Process')
                        setVisible(false)
                        setLoading(false)
                        setLoadingButton(false)
                        setisDisabled(false)
                     }
                     
                 );
         }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setTextButtonFilter('Process')
            setLoading(false)
            setLoadingButton(false)
            setisDisabled(false)
         }
    }
    const HandleClick2 = () => {
        setTextButtonFilter('Please wait')
        const kdcab = IN_CMB_KODE_CABANG;
        if(kdcab === ''){
            Swal.fire({
                title: t("Warning"),
                text: t("Select Branch Code"),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setTextButtonFilter('Process')
        }else{
            get_data(); 
        }
    };

    const handleRowClick = (cellValues: any) => {
        console.log('cellValues : '+cellValues)
        setModal13(true);
        if(cellValues !== ''){
            const res_kdcab = cellValues.row.KDCAB;
            const res_jenis = cellValues.row.JENIS;
            
            const res_otorisator = cellValues.row.OTORISATOR;
            userSelectDetailKdcab(res_kdcab);
            userSelectDetailJenis(res_jenis);
            setDetailOtorisator(res_otorisator);
            setLoading_detail(true);

            
            const res_list_segment_ip = cellValues.row.LIST_SEGMENT_IP;
            setDetailSegment(res_list_segment_ip);
            const p = JSON.parse(res_list_segment_ip);
            const LIST_IP = p.LIST_IP;
            let arr_concat = [];
            for(var i = 0;i<LIST_IP.length;i++){
                const a = {
                        'id': GenerateUniqNumber(),
                        'HAPUS': '',
                        'IP':LIST_IP[i]
                }
                arr_concat.push(a);
            }
            
            setData_rows_detail(arr_concat);
            ref_data_detail.current = arr_concat;
        }else{
            setData_rows_detail([]);
            ref_data_detail.current = [];
        }
        

        const columns_detail = [
            { field: 'id', headerName: 'id',   flex: 1,  width: 50, minWidth: 50, maxWidth: 50},
            { field: 'HAPUS', headerName: 'HAPUS', width: 80, minWidth: 80, maxWidth: 80,
            renderCell: (cellValues: any) => {
                return (
                    <a onClick={() => {RemoveIP(cellValues)}} >
                    <IconTrash className={"text-red-500 font-medium"} />
                    </a>
                );
            }
            },
            { field: 'IP', headerName: 'IP',  width: 370, minWidth: 370, maxWidth: 370},
        ];
        setData_columns_detail(columns_detail);
        setLoading_detail(false);
    }

    const RemoveIP = (param:any) =>{
        try{
            const data = ref_data_detail.current;
            const objIndex = data.findIndex(((obj: { IP: any; }) => obj.IP == param.row.IP));
            let arr_concat = [];
            for(var i = 0;i<data.length;i++){
                const cek_ip = data[i].IP;
                if(cek_ip === param.row.IP){
                    //console.log('Tidak add')
                }else{
                    const a = {
                        'id':data[i].id,
                        'HAPUS': '',
                        'IP':data[i].IP
                    }
                    arr_concat.push(a);
                }
            }
            setData_rows_detail(arr_concat);
            ref_data_detail.current = arr_concat;
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: ""+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
           });
        }
    }

    const AddIP = (param:any) =>{
        if(param === '' || param.toString().length < 6 || (param.toString().includes('.') === false)){
            Swal.fire({
                title: "Masukan alamat IP dengan benar!!!",
                toast: true,
                position: isRtl ? 'top-start' : 'top-end',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                customClass: {
                    popup: `color-danger`,
                },
            });
        }else{
            const data = data_rows_detail;
            let arr_concat = [];
            for(var i = 0;i<data.length;i++){
                const res_ip = data[i].IP;
                const a = {
                    'HAPUS': '',
                    'IP':res_ip
                }
                arr_concat.push(a);
            }
            const add = {
                'HAPUS': '',
                'IP':param
            }
            arr_concat.push(add);
            var res_rows = AddID(arr_concat);
            setData_rows_detail(res_rows);
            ref_data_detail.current = res_rows;
            Swal.fire({
                title: "Sukses Tambah IP, Lakukan Simpan untuk update ke server!",
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
        
    }

    const handleInsWhitelistIP = (param:any) =>{
        Swal.fire({
            icon: "question",
            title: t("Confirmation"),
            text: t("Are you sure for")+" akan mengupdate listener?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
            padding: '2em',
            customClass: 'sweet-alerts'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const idComponent = "btn_simpan";
                const myExample = document.getElementById(idComponent);
                myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')
                
                try{
                    const url = `http://${IN_HOST}:${IN_PORT}/v1/SetsegmentIPWhitelist`;
                    const jenis = param[0].jenis;
                    const kdcab = param[0].kdcab.value;
                
                    const list = param[0].list_segment_ip;
                    let arr_concat = [];
                    for(var o = 0;o<list.length;o++){
                        const res_ip = list[o].IP;
                        arr_concat.push(res_ip);
                    }
                    const objIp = {'LIST_IP':arr_concat};
                    const otorisator = param[0].otorisator;
                    const res_param = {"jenis":jenis,"kdcab":kdcab,"list_segment_ip":objIp,"otorisator":otorisator};
                    console.log('param : '+JSON.stringify(res_param))
                    console.log('url : '+url)
                    const Token = GetToken()
                        Posts(url,JSON.stringify(res_param),false,Token) .then(
                                (response) => {
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
                                    setModal13(false);
                                    get_data();
                                    myExample.innerHTML = 'Simpan'
                                    
                                    }else if(code.toString().substring(0,1) === '4'){
                                        Swal.fire({
                                            title: t("Warning"),
                                            text: ""+parseFloat(code)+"-"+msg,
                                            icon: "warning",
                                            padding: '2em',
                                            customClass: 'sweet-alerts'
                                        });
                                        myExample.innerHTML = 'Simpan'
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
                                        myExample.innerHTML = 'Simpan'
                                    } 
                                    
                                }
                        ).catch(
                            (error) => {
                                Swal.fire({
                                    title: t("Warning"),
                                    text: "Error operasi data Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                                myExample.innerHTML = 'Simpan' 
                            }
                        );
                }catch(Ex){
                    Swal.fire({
                        title: t("Warning"),
                        text: "Error : "+Ex.toString(),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                    myExample.innerHTML = 'Simpan'
                }
            }else{

            }
        });
    }
    const CloseModal = () =>{
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
                                <DropDownBranch in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options5} isSearchable={true} isMulti={false} event={userSelectKodeCabang} />
                                <div className="mb-3">
                                    <div className="flex">
                                        <ButtonFilter in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={'btn_filter'} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSearch />} in_title_button={TextButtonFilter} HandleClick={HandleClick2} />
                                        &nbsp;
                                        <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={"btn_input"} isLoading={false} isDisabled={false} in_icon={<IconChecks />} in_title_button={"Add"} HandleClick={handleRowClick} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    loading ?
                    <>
                    <div className="text-center mt-10"><span className="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span><br />Mohon Tunggu!</div> 
                    </>
                    :
                    ''
                }
                {
                    Visible ? 
                    <div>
                        <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{id: false}} jenis_laporan={'Master Data Whitelist IP IDMCommand'} data_rows={data_rows} data_columns={data_columns} isLoading={loading} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true}  in_csvOptions={true} in_printOptions={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={0} in_rows_spanning={false} />
                    </div>
                    :
                    ''
                }
                <ModalComponent in_size_modal={`panel animate__animated my-7 w-4/5 overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-lg font-bold text-white"} in_title_modal={"Add/Edit Whitelist IP"} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                        <div className="p-5">          
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="mb-5">
                                    <label>Lokasi</label>
                                            <div className="flex">
                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                <IconHome />
                                            </div>
                                            <Select className="w-full" onChange={userSelectDetailKdcab}  value={IN_DETAIL_KDCAB} placeholder={t("Select Branch Code")} options={options5} isSearchable={true}/>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <label>Jenis</label>
                                        <div className="flex">
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] text-xs">
                                                <IconInbox />
                                            </div>
                                            <Select className="w-full" onChange={userSelectDetailJenis}  value={IN_DETAIL_JENIS} placeholder="Pilih jenis" options={options2} isSearchable={true}/>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label>Otorisator</label>
                                    <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            <IconUserPlus />
                                        </div>
                                        
                                        <input type="text" placeholder="Otorisator"  onChange={userSelectDetailOtorisator}  value={IN_OTORISATOR} className="form-input ltr:rounded-l-none rtl:rounded-r-none text-xs" required />
                                        
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-1">
                                    <div className="mb-5 col-span-2">
                                        <label>Tambah IP</label>
                                        <div className="flex">
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                <IconUserPlus />
                                            </div>
                                            <input type="text" placeholder="Tambah IP"  onChange={userTambahIP}  value={IN_TAMBAH_IP} className="form-input ltr:rounded-l-none rtl:rounded-r-none text-xs" required />
                                        </div>
                                    </div>
                                    <div className="mb-5 mt-4.5">
                                    <button className="btn btn-success w-full" onClick={() => AddIP(IN_TAMBAH_IP)}>Tambah</button>
                                    </div>
                                </div>
                                <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{id: false}} jenis_laporan={'Detail Data Whitelist IP IDMCommand'} data_rows={data_rows_detail} data_columns={data_columns_detail} isLoading={loading_detail} progressbar={''} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={''} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={false} in_csvOptions={false} in_printOptions={false} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={0} in_rows_spanning={false} />
                                <div className="mt-1 flex items-center justify-end">
                                    <ButtonAdd in_classname={"btn btn-outline-danger"} idComponent={""} isLoading={false} isDisabled={false} HandleClick={CloseModal} in_icon={undefined} in_title_button={"Cancel"} />
                                    <button id="btn_simpan" onClick={() => {
                                            handleInsWhitelistIP([
                                                {
                                                    "jenis": (IN_DETAIL_JENIS as any).value,
                                                    "kdcab": IN_DETAIL_KDCAB,
                                                    "list_segment_ip": data_rows_detail,
                                                    "otorisator": IN_OTORISATOR
                                                }
                                            ])
                                        }}  type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                        Simpan
                                    </button>
                                </div>
                        </div>
                    } />
                </>
            } />
        </>
    )
}
export default FormWhitelistIP;