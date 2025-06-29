'use client'

import Link from "next/link";
import { useEffect, useState,Fragment, useRef } from 'react';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { IRootState } from "@/store";
import { Posts } from "@/lib/post";
import React from "react";
import { Dialog, Transition } from '@headlessui/react';
import IconX from "@/components/Icon/IconX";
import config from '@/lib/config.json';
import { DecodeAES, GenerateUniqNumber, get_branch_code, get_data_local_storage, GetID, GetToken, GetTokenRND, removeItemByValue } from "@/lib/global";
import Select from 'react-select';
import IconTrash from "@/components/Icon/IconTrash";
import { useTranslation } from "react-i18next";
import IconSend from "../Icon/IconSend";
import DataTables from "../table/DataTables";
import IconServer from "../Icon/IconServer";
import generateUniqueId from "generate-unique-id";
import withReactContent from "sweetalert2-react-content";
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import Icon from "react-icons-kit";
import { first } from "lodash";
import IconPencil from "../Icon/IconPencil";
import { GridColDef } from "@mui/x-data-grid";
import themeConfig from "@/theme.config";
import DropDownBranch from "../dropdown/DropDownBranch";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import ModalComponent from "../modal/ModalComponent";
 
interface FormDeviceServerProps {
    url: string,
    command: string,
    IDReport: string,
}

//-- component menu --//
const FormDeviceServer: React.FC<FormDeviceServerProps> = ({ url, command, IDReport }) => {
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(true);
    const [data_rows,setData_rows] = useState([]);
    const [columns,setColumns] = useState([])

    const [modal13, setModal13] = useState(false);
    const [modal14, setModal14] = useState(false);
    const [Isinput, setIsinput] = useState(true);;
    const [InputNIKPemohon,setInputNIKPemohon] = useState('')
    const [InputNAMAPemohon,setInputNAMAPemohon] = useState('')
    

    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [IN_PORTWS, setPORTWS] = useState(0);
    const [HOST_API_RND, setHOST_API_RND] = useState('');
    const [options5,setOption5] = useState([])
    const [options6,setOptions6] = useState([])
    const [options7,setOptions7] = useState([])
    const [judul_modal,setjudul_modal] = useState('')
    const [IN_DETAIL_KDCAB,set_IN_DETAIL_KDCAB] = useState('')
    const [IN_DETAIL_LOCATION,set_IN_DETAIL_LOCATION] = useState('')
    const [IN_DETAIL_MERK,set_IN_DETAIL_MERK] = useState('')
    const [IN_DETAIL_TYPE,set_IN_DETAIL_TYPE] = useState('')
    const [IN_DETAIL_IP,set_IN_DETAIL_IP] = useState('')
    const [IN_DETAIL_PORT_RTSP,set_IN_DETAIL_PORT_RTSP] = useState(0)
    const [IN_DETAIL_USER,set_IN_DETAIL_USER] = useState('')
    const [IN_DETAIL_PASSWORD,set_IN_DETAIL_PASSWORD] = useState('')
    const [IN_DETAIL_JUMLAH_KAMERA,set_IN_DETAIL_JUMLAH_KAMERA] = useState(0)
    const [IsShowInformation,setIsShowInformation] = useState(false)

    const [data_rows_camera,setdata_rows_camera] = useState([])
    const [columns_camera,setcolumns_camera] = useState([])

    const [IN_DETAIL_KDCAB_DEVICE,set_IN_DETAIL_KDCAB_DEVICE] = useState('')
    const [IN_DETAIL_LOKASI_DEVICE,set_IN_DETAIL_LOKASI_DEVICE] = useState('')
    const [IN_DETAIL_IP_DEVICE,set_IN_DETAIL_IP_DEVICE] = useState('')
    const [IN_DETAIL_MODEL_DEVICE,set_IN_DETAIL_MODEL_DEVICE] = useState('')
    const [IN_DETAIL_TIPE_DEVICE,set_IN_DETAIL_TIPE_DEVICE] = useState('')

    const { t, i18n } = useTranslation();
    const [isTextButton,setisTextButton] = useState(false)
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [Device,setDevice]= useState('')
    const [TotalCCTV,setTotalCCTV] = useState(0)
    const [TotalUPS,setTotalUPS] = useState(0)
    const [TotalServerDC,setTotalServerDC] = useState(0)
    const [ShowcardSummary,setShowCardSummary] = useState(false)
    const [icon, setIcon] = useState(eyeOff);
    const [type, setType] = useState('password');
    const ref_data_detail = useRef([]);

    useEffect(() => {
        var res_host = themeConfig.host
        var res_port = parseFloat(themeConfig.port_listener)
        var res_port_login = parseFloat(themeConfig.port_login)
        var res_host_rnd = themeConfig.hostrnd
        setHOST(res_host)
        setPORT(res_port_login)
        setPORTWS(res_port)
        setHOST_API_RND(res_host_rnd)
        
        const get_data = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
        const d = JSON.parse(get_data);
        const nik = d.nik;
        const nama = d.nama;
        const lokasi = d.lokasi;
        setInputNIKPemohon(nik);
        setInputNAMAPemohon(nama);
        let arr_ = get_branch_code(false,false);
        setOption5(arr_)
        var tipe = [{"label":"CCTV RUANG SERVER","value":"CCTV_RUANG_SERVER"},{"label":"UPS RUANG SERVER","value":"UPS"},{"label":"RACK SERVER","value":"RACK_SERVER"}]
        setOptions6(tipe)
    }, [])
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    
    const handleToggle = () => {
        if (type==='password'){
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }
    
    const FormInputKodeCabang = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_KDCAB(val);  
    };

    const FormInputLocation = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_LOCATION(val);  
    };

    const FormInputLocationDevice = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_LOKASI_DEVICE(val);  
    };

 
    const FormInputMerk = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_MERK(val);
    };

    const FormInputType = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_TYPE(val);
    };
 
    const FormInputIP = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_IP(val);
    };

    const FormInputPortRTSP = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_PORT_RTSP(val);
    };

    const FormInputUser = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_USER(val);
    };

    const FormInputPassword = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_PASSWORD(val);
    };

    const FormInputJumlahKamera = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_JUMLAH_KAMERA(val);
    };

    const userSelectKodeCabangInput = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            set_IN_DETAIL_KDCAB('')
        }else{
            var arr_kode_cabang = "";
            for (var i = 0; i < value.length; i++) {
                //console.log(value[i].value);
                if (i === (value.length - 1)) {
                    arr_kode_cabang = arr_kode_cabang + value[i].value;
                } else {
                    arr_kode_cabang = arr_kode_cabang + value[i].value + ",";
                }

            }
            //console.log(arr_kode_cabang)
            set_IN_DETAIL_KDCAB(arr_kode_cabang);
        }
    };

    const userSelectKodeCabangInputDevice = (value:any) => {
         //console.log(value);
         if(value.length == 0){
            set_IN_DETAIL_KDCAB_DEVICE('')
        }else{
            var arr_kode_cabang = "";
            for (var i = 0; i < value.length; i++) {
                //console.log(value[i].value);
                if (i === (value.length - 1)) {
                    arr_kode_cabang = arr_kode_cabang + value[i].value;
                } else {
                    arr_kode_cabang = arr_kode_cabang + value[i].value + ",";
                }

            }
            console.log(arr_kode_cabang)
            set_IN_DETAIL_KDCAB_DEVICE(arr_kode_cabang);
        }
    }

    const FormInputKodeCabangDevice = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_KDCAB_DEVICE(val);
        console.log(val)
    };

    const userSelectKodeCabang = (value: any) => {
            
            var d = value.value
            if(d.length === 4){
                setKODE_CABANG(d);
            }else{
                var arr_kode_cabang = ""
                for(var i = 0;i<d.length;i++){
                    if(i === (d.length - 1 )){
                        arr_kode_cabang = arr_kode_cabang+d[i];
                    }else{
                        arr_kode_cabang = arr_kode_cabang+d[i]+",";
                    }
                }
                setKODE_CABANG(arr_kode_cabang);
            }
    };
    const userSelectDevice = (value: any) => {
        if(value.length == 0){
            setDevice('')
        }else{
            setDevice(value.value);
            set_IN_DETAIL_TIPE_DEVICE(value.value)
        }
    };

    const FormInputDeviceServer  = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_TIPE_DEVICE(val);
    };

    const FormInputModel = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_MODEL_DEVICE(val);
    };
    
    const FormInputIPDevice = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_IP_DEVICE(val);
    };

    const showModalDeviceRuangServer = (res_input:boolean,in_judul:string,cellValues:any,tipe_device:string) => {
        setModal14(true)
        setjudul_modal(in_judul)
        if(res_input){
            setIsinput(true)
            set_IN_DETAIL_KDCAB_DEVICE('')
            set_IN_DETAIL_LOKASI_DEVICE('')
            set_IN_DETAIL_MERK('')
            set_IN_DETAIL_MODEL_DEVICE('')
            console.log(tipe_device)
            set_IN_DETAIL_TIPE_DEVICE(tipe_device)
            set_IN_DETAIL_IP_DEVICE('')
        }else{
            setIsinput(false)
            const data_kdcab = cellValues.row.KDCAB
            const data_lokasi = cellValues.row.LOKASI
            const data_ip = cellValues.row.IP
            const data_port = cellValues.row.PORT
            const data_merk = cellValues.row.MERK
            const data_tipe = cellValues.row.DEVICE
            const data_model = cellValues.row.MODEL
            set_IN_DETAIL_KDCAB_DEVICE(data_kdcab)
            set_IN_DETAIL_LOKASI_DEVICE(data_lokasi)
            set_IN_DETAIL_MERK(data_merk)
            set_IN_DETAIL_MODEL_DEVICE(data_model)
            set_IN_DETAIL_TIPE_DEVICE(data_tipe)
            set_IN_DETAIL_IP_DEVICE(data_ip)
        }
    }

    const showModalCCTVRuangServer = (res_input:boolean,in_judul:string,cellValues:any) =>{
        setModal13(true)
        setIsShowInformation(false)
        setjudul_modal(in_judul)
        if(res_input){
            set_IN_DETAIL_KDCAB('')
            setIsinput(true)
            set_IN_DETAIL_LOCATION('')
            set_IN_DETAIL_MERK('')
            set_IN_DETAIL_PORT_RTSP(0)
            set_IN_DETAIL_PASSWORD('')
            set_IN_DETAIL_USER('')
            set_IN_DETAIL_TYPE('')
            set_IN_DETAIL_JUMLAH_KAMERA(0)
        }else{
            setIsinput(false)
            const data_kdcab = cellValues.row.KDCAB
            const data_lokasi = cellValues.row.LOKASI
            const data_ip = cellValues.row.IP
            const data_port = cellValues.row.PORT
            const data_merk = cellValues.row.MERK
            const data_tipe = cellValues.row.TIPE
            const data_password = cellValues.row.PASSWORD
            const data_user = cellValues.row.USER

            set_IN_DETAIL_KDCAB(data_kdcab)
            set_IN_DETAIL_LOCATION(data_lokasi)
            set_IN_DETAIL_MERK(data_merk)
            set_IN_DETAIL_PORT_RTSP(data_port)
            set_IN_DETAIL_PASSWORD(atob(data_password))
            set_IN_DETAIL_USER(data_user)
            set_IN_DETAIL_TYPE(data_tipe)
            set_IN_DETAIL_IP(data_ip)
            let url = `http://${IN_HOST}:${IN_PORT}/Device/v1/CctvRuangServer/:View`;
            let param = {"kdcab":IN_CMB_KODE_CABANG}
            const Token = GetToken()
            Posts(url,JSON.stringify(param),false,Token).then(
                (response) => {
                    const res_data = response;
                    var code = res_data.code;
                    var msg = res_data.msg;
                    var data = res_data.data;
                    
                    if(parseFloat(code) === 200){
                        var p = JSON.parse(data)
                        let arr_ = []
                        
                        for(var a = 0;a<p.length;a++){
                            const id = GenerateUniqNumber()
                            const recid = p[a].recid
                            const kdcab = p[a].kdcab
                            const lokasi = p[a].lokasi
                            const ip = p[a].ip
                            const camera = p[a].camera
                            const path = p[a].path
                            if(data_lokasi === lokasi && data_ip === ip){
                                const obj = {"id":GenerateUniqNumber(),"HAPUS":"","CAMERA_ID":camera,"PATH":path}
                                arr_.push(obj)
                            }else{

                            }
                        }
                        set_IN_DETAIL_JUMLAH_KAMERA(arr_.length)
                        setIsShowInformation(true)
                        setdata_rows_camera(arr_)
                        ref_data_detail.current = arr_;
                        let arr_columns_ = [
                            { field: 'id', headerName: 'id', flex: 0 },
                            {
                                field: 'HAPUS', headerName: 'HAPUS', flex: 1, width: 150, minWidth: 150, maxWidth: 150,align:'center',headerAlign:'center',
                                renderCell: (cellValues: any) => {
                                    return (
                                        <>
                                        <div className="mr-2 mt-1">
                                            <a onClick={() => {DelRowCamera(cellValues)}} data-twe-toggle="tooltip" title="Edit Shortcut">
                                                    <span className="text-danger"><IconTrash  /></span>
                                            </a>
                                        </div>
                                        </>
                                    )
                                }
                            },
                            {
                                field: 'CAMERA_ID', headerName: 'CAMERA_ID', width: 100, minWidth: 100, maxWidth: 100
                            },
                            {
                                field: 'PATH', headerName: 'PATH',flex:1,
                                renderCell: (cellValues: any) => {
                                    return (
                                        <input onChange={e => { setDataPath(e.currentTarget.value,cellValues); }}  type="text" placeholder="rtsp://admin:123456@192.168.XXX.XXX:XXX//Streaming//channels//201"  value={cellValues.value} className="text-xs form-input" required />
                                    )
                                }
                            },
                        ];
                        setcolumns_camera(arr_columns_)
                    }
            });


        }
    }

    const GenerateJumlahKamera = (in_jumlah_kamera:number) => {
        if(in_jumlah_kamera === 0){
            MySwal.fire({
                title: t('Enter amount of cameras'),
                toast: true,
                position: isRtl ? 'top-start' : 'top-end',
                showConfirmButton: false,
                icon: 'warning',
                iconColor: '#fff',
                timer: 5000,
                showCloseButton: true,
                customClass: {
                    popup: `color-danger`,
                },
            });
            setIsShowInformation(false)
        }else{
            setIsShowInformation(true)
            let arr_ = []
            for(var i = 1;i<=in_jumlah_kamera;i++){
                const obj = {"id":GetID(),"HAPUS":"-","CAMERA_ID":i.toString(),"PATH":"-"}
                arr_.push(obj)
            }
            setdata_rows_camera(arr_)
            ref_data_detail.current = arr_;

            let arr_columns_ = [
                { field: 'id', headerName: 'id', flex: 0 },
                {
                    field: 'HAPUS', headerName: 'HAPUS', flex: 1, width: 150, minWidth: 150, maxWidth: 150,align:'center',headerAlign:'center',
                    renderCell: (cellValues: any) => {
                        return (
                            <div className="mr-2">
                                <a onClick={() => {DelRowCamera(cellValues)}} data-twe-toggle="tooltip" title="Edit Shortcut">
                                        <span className="text-danger"><IconTrash  /></span>
                                </a>
                            </div>
                        )
                    }
                },
                {
                    field: 'CAMERA_ID', headerName: 'CAMERA_ID', width: 100, minWidth: 100, maxWidth: 100
                },
                {
                    field: 'PATH', headerName: 'PATH',flex:1,
                    renderCell: (cellValues: any) => {
                        return (
                            <input onChange={e => { setDataPath(e.currentTarget.value,cellValues); }}  type="text" placeholder="/Streaming/channels/<camera>02"  value={cellValues.row.value} className="text-xs form-input" required />
                        )
                    }
                },
            ];
            setcolumns_camera(arr_columns_)
        }
        
    }

    const setDataPath = (val:string,cellValues:any) => {
        try{
            const camera_id = cellValues.row.CAMERA_ID
            const objIndex = ref_data_detail.current.findIndex(((obj: { CAMERA_ID: number; }) => obj.CAMERA_ID == camera_id));
            ref_data_detail.current[objIndex].PATH = val;
            setdata_rows_camera(ref_data_detail.current)
        }catch(Ex){
            MySwal.fire({
                title: Ex.toString(),
                toast: true,
                position: isRtl ? 'top-start' : 'top-end',
                showConfirmButton: false,
                icon: 'warning',
                iconColor: '#fff',
                timer: 5000,
                showCloseButton: true,
                customClass: {
                    popup: `color-danger`,
                },
            });
        }
       
    }

    const DelRowCamera = (cellValues:any) => {
        let id = cellValues.row.CAMERA_ID;
        console.log('id hapus : '+id)
        const data = ref_data_detail.current;
        let arr_new_ = []
        for(var i = 0;i<data.length;i++){
            const res_camera_id = data[i].CAMERA_ID
            const res_path = data[i].PATH
            const res_id = data[i].id
            if(res_camera_id === id){
                
            }else{
                const obj = {"id":res_id,"HAPUS":"-","CAMERA_ID":res_camera_id.toString(),"PATH":res_path}
                arr_new_.push(obj)
            }
        }
        setdata_rows_camera(arr_new_)
        ref_data_detail.current = arr_new_
    }

    const InsCctvRuangServer = (IN_DETAIL_KDCAB:string,IN_DETAIL_LOCATION:string,IN_DETAIL_MERK:string,IN_DETAIL_TYPE:string,IN_DETAIL_IP:string,IN_DETAIL_PORT_RTSP:number,in_ref_data_detail:any,IN_DETAIL_USER:string,IN_DETAIL_PASSWORD:string,IN_OTORISATOR:string,IN_DEVICE:string) => {
        try{
             Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+t(' Save ')+" ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    
                        let arr_channel = []
                        for(var i = 0;i<in_ref_data_detail.current.length;i++){
                            const obj = {"camera":in_ref_data_detail.current[i].CAMERA_ID,"path":in_ref_data_detail.current[i].PATH}
                            arr_channel.push(obj)
                        }
                        let url = `http://${IN_HOST}:${IN_PORT}/Device/v1/CctvRuangServer/:Update`;
                        console.log('url : '+url)    
                        let param = {"kdcab":IN_DETAIL_KDCAB,"lokasi":IN_DETAIL_LOCATION,"merk":IN_DETAIL_MERK,"tipe":IN_DETAIL_TYPE,"ip":IN_DETAIL_IP,"port":IN_DETAIL_PORT_RTSP,"channels":arr_channel,"user":IN_DETAIL_USER,"pass":IN_DETAIL_PASSWORD,"updid":IN_OTORISATOR}
                        console.log(JSON.stringify(param))
                        const Token = GetToken()
                            Posts(url,JSON.stringify(param),false,Token).then(
                                    (response) => {
                                        const res_data = response;
                                        var code = res_data.code;
                                        var msg = res_data.msg;
                                        var data = res_data.data;
                                        
                                        if(parseFloat(code) === 200){
                                            Swal.fire({
                                                title: t("Information"),
                                                text: ""+parseFloat(code)+"-"+msg,
                                                icon: "success",
                                                padding: '2em',
                                                customClass: 'sweet-alerts'
                                            });
                                            
                                            setModal13(false);
                                            set_IN_DETAIL_PORT_RTSP(0)
                                            set_IN_DETAIL_JUMLAH_KAMERA(0)
                                            set_IN_DETAIL_KDCAB('')
                                            set_IN_DETAIL_LOCATION('')
                                            set_IN_DETAIL_MERK('')
                                            set_IN_DETAIL_USER('')
                                            set_IN_DETAIL_PASSWORD('')
                                            set_IN_DETAIL_TYPE('')
                                            set_IN_DETAIL_IP('')
                                            setIsinput(false)
                                            GetDataRuangServer(IN_DETAIL_KDCAB,IN_DEVICE)
                                        }else if(code.toString().substring(0,1) === '4'){
                                            if(code === 401 && msg.includes("Invalid")){
                                                //RefreshToken();
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
                                    }
                            ).catch(
                                (error) => {
                                    Swal.fire({
                                        title: t("Warning"),
                                        text: error.toString(),
                                        icon: "warning",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    });
                            });
                }
            });
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }
    }

    const InsDeviceRuangServer = (IN_DETAIL_KDCAB_DEVICE:string,IN_DETAIL_LOKASI_DEVICE:string,IN_DETAIL_TIPE_DEVICE:string,IN_DETAIL_MODEL_DEVICE:string,IN_DETAIL_IP_DEVICE:string,IN_OTORISATOR:string,IN_DEVICE:string) => {
        try{
            Swal.fire({
               icon: "question",
               title: t("Confirmation"),
               text: t("Are you sure for")+t(' Save ')+" ?",
               showDenyButton: true,
               confirmButtonText: "Ya",
               denyButtonText: "Tidak",
               padding: '2em',
               customClass: 'sweet-alerts'
               }).then((result) => {
               /* Read more about isConfirmed, isDenied below */
               if (result.isConfirmed) {
                       let url = `http://${IN_HOST}:${IN_PORT}/Device/v1/DeviceRuangServer/:Update`;
                       console.log('url : '+url)    
                       let param = {"kdcab":IN_DETAIL_KDCAB_DEVICE,"lokasi":IN_DETAIL_LOKASI_DEVICE,"ip":IN_DETAIL_IP_DEVICE,"model":IN_DETAIL_MODEL_DEVICE,"device":IN_DETAIL_TIPE_DEVICE,"updid":IN_OTORISATOR}
                       console.log(JSON.stringify(param))
                       const Token = GetToken()
                           Posts(url,JSON.stringify(param),false,Token).then(
                                   (response) => {
                                       const res_data = response;
                                       var code = res_data.code;
                                       var msg = res_data.msg;
                                       var data = res_data.data;
                                       
                                       if(parseFloat(code) === 200){
                                           Swal.fire({
                                               title: t("Information"),
                                               text: ""+parseFloat(code)+"-"+msg,
                                               icon: "success",
                                               padding: '2em',
                                               customClass: 'sweet-alerts'
                                           });
                                           
                                           setModal14(false);
                                           set_IN_DETAIL_KDCAB_DEVICE('')
                                           set_IN_DETAIL_LOKASI_DEVICE('')
                                           set_IN_DETAIL_IP_DEVICE('')
                                           set_IN_DETAIL_MODEL_DEVICE('')
                                           set_IN_DETAIL_TIPE_DEVICE('')
                                           setIsinput(false)
                                           GetDataRuangServer(IN_DETAIL_KDCAB_DEVICE,IN_DEVICE)
                                       }else if(code.toString().substring(0,1) === '4'){
                                           if(code === 401 && msg.includes("Invalid")){
                                               //RefreshToken();
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
                                       
                                   }
                           ).catch(
                               (error) => {
                                   Swal.fire({
                                       title: t("Warning"),
                                       text: error.toString(),
                                       icon: "warning",
                                       padding: '2em',
                                       customClass: 'sweet-alerts'
                                   });
                                   
                               }
                           );
                   
               }
           });
       }catch(Ex){
           Swal.fire({
               title: t("Warning"),
               text:t('401-Error UnAutorized, Check your connection or call administrator!'),
               icon: "warning",
               padding: '2em',
               customClass: 'sweet-alerts'
           });
       }
    }

    

    const GetDataRuangServer = (IN_CMB_KODE_CABANG:string,IN_DEVICE:string) => {
        try{
            if(IN_DEVICE === 'CCTV_RUANG_SERVER'){
                let url = `http://${IN_HOST}:${IN_PORT}/Device/v1/CctvRuangServer/:View`;
                console.log('url : '+url)    
                let param = {"kdcab":IN_CMB_KODE_CABANG}
                console.log(JSON.stringify(param))
                const Token = GetToken()
                setisTextButton(true)
                Posts(url,JSON.stringify(param),false,Token).then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        var data = res_data.data;
                        
                        if(parseFloat(code) === 200){
                            var p = JSON.parse(data)
                            let arr_ = []
                            for(var a = 0;a<p.length;a++){
                                const id = GenerateUniqNumber()
                                const recid = p[a].recid
                                const kdcab = p[a].kdcab
                                const lokasi = p[a].lokasi
                                const ip = p[a].ip
                                const port = p[a].port
                                const merk = p[a].merk
                                const tipe = p[a].tipe
                                const camera = p[a].camera
                                const path = p[a].path
                                const user = p[a].user
                                const pass = btoa(p[a].pass)
                                const updtime = p[a].updtime
                                const updid = p[a].updid
                                const obj = {"id":id,"ACTION":lokasi,"RECID":recid,"KDCAB":kdcab,"LOKASI":lokasi,"IP":ip,"PORT":port,"MERK":merk,"TIPE":tipe,"CAMERA":camera,"PATH":path,"USER":user,"PASSWORD":pass,"LAST_UPDATE":updtime,"OTORISATOR":updid}
                                arr_.push(obj)
                            }
                            setData_rows(arr_)
                            let arr_columns_: GridColDef[] = [
                                { field: 'id', headerName: 'id', flex: 0 },
                                {
                                    field: 'ACTION', headerName: 'ACTION', flex: 0, width: 80, minWidth: 80, maxWidth: 80,align:'center',headerAlign:'center',
                                    renderCell: (cellValues: any) => {
                                        return (
                                                <>
                                                <div className="flex flex-row gap-1 mt-2">
                                                    <div className="mr-2">
                                                        <a onClick={() => {showModalCCTVRuangServer(false,'Edit Data',cellValues)}} data-twe-toggle="tooltip" title="Edit Data">
                                                                <span className="text-warning"><IconPencil  /></span>
                                                        </a>
                                                    </div>
                                                    <div className="mr-2">
                                                        <a onClick={() => {DelDataCCTV(cellValues)}} data-twe-toggle="tooltip" title="Delete Data">
                                                            <span className="text-danger"><IconTrash  /></span>
                                                        </a>
                                                    </div>
                                                </div>
                                                </>
                                        )
                                    }
                                },
                                {
                                    field: 'RECID', headerName: 'RECID', width: 70, minWidth: 70, maxWidth: 70,headerAlign:'left',align:'right'
                                },
                                {
                                    field: 'KDCAB', headerName: 'KDCAB', width: 70, minWidth: 70, maxWidth: 70,headerAlign:'center',align:'center',flex:0,
                                
                                    // rowSpanValueGetter: (value, row) => {
                                    //     return row ? `${row.KDCAB}-${row.LOKASI}-${row.IP}-${row.PORT}-${row.MERK}-${row.TIPE}` : value;
                                    // },
                                },
                                {
                                    field: 'LOKASI', headerName: 'LOKASI', width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'IP', headerName: 'IP', width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'PORT', headerName: 'PORT', width: 80, minWidth: 80, maxWidth: 80,headerAlign:'left',align:'right'
                                },
                                {
                                    field: 'MERK', headerName: 'MERK', width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'TIPE', headerName: 'TIPE', width: 100, minWidth: 100, maxWidth: 100,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'CAMERA', headerName: 'CAMERA', width: 80, minWidth: 80, maxWidth: 80,headerAlign:'left',align:'right'
                                },
                                {
                                    field: 'PATH', headerName: 'PATH', width: 250, minWidth: 250, maxWidth: 250,headerAlign:'left',align:'left'
                                },
                                {
                                    field: 'USER', headerName: 'USER', width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'PASSWORD', headerName: 'PASSWORD', width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'LAST_UPDATE', headerName: 'LAST_UPDATE', width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'OTORISATOR', headerName: 'OTORISATOR', width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center'
                                },
                            ];
                            setColumns(arr_columns_)
                            setisTextButton(false)
                        }else if(code.toString().substring(0,1) === '4'){
                            if(code === 401 && msg.includes("Invalid")){
                                //RefreshToken();
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                            }
                            setisTextButton(false)
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });  
                            setisTextButton(false)
                        }    
                    }
                ).catch(
                    (error) => {
                        Swal.fire({
                            title: t("Warning"),
                            text: error.toString(),
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setisTextButton(false)
                    }
                );
            }else{
                let url = `http://${IN_HOST}:${IN_PORT}/Device/v1/DeviceRuangServer/:View`;
                console.log('url : '+url)    
                let param = {"kdcab":IN_CMB_KODE_CABANG,"lokasi":"",
                    "device":"UPS",
                }
                console.log(JSON.stringify(param))
                const Token = GetToken()
                setisTextButton(true)
                Posts(url,JSON.stringify(param),false,Token).then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        var data = res_data.data;
                        console.log(data)
                        if(parseFloat(code) === 200){
                            var p = JSON.parse(data)
                            let arr_ = []
                            for(var a = 0;a<p.length;a++){
                                const id = GenerateUniqNumber()
                                const recid = p[a].recid
                                const kdcab = p[a].kdcab
                                const lokasi = p[a].lokasi
                                const ip = p[a].ip
                                const device = p[a].device
                                const model = p[a].model
                                const updtime = p[a].updtime
                                const updid = p[a].updid
                                const obj = {"id":id,"ACTION":lokasi,"RECID":recid,"KDCAB":kdcab,"LOKASI":lokasi,"IP":ip,"DEVICE":device,"MODEL":model,"LAST_UPDATE":updtime,"OTORISATOR":updid}
                                arr_.push(obj)
                            }
                            setData_rows(arr_)
                            let arr_columns_: GridColDef[] = [
                                { field: 'id', headerName: 'id', flex: 0 },
                                {
                                    field: 'ACTION', headerName: 'ACTION', flex: 0, width: 80, minWidth: 80, maxWidth: 80,align:'center',headerAlign:'center',
                                    renderCell: (cellValues: any) => {
                                        return (
                                                <>
                                                <div className="flex flex-row gap-1 mt-2">
                                                    <div className="mr-2">
                                                        <a onClick={() => {showModalDeviceRuangServer(false,'Edit Data',cellValues,'')}} data-twe-toggle="tooltip" title="Edit Data">
                                                                <span className="text-warning"><IconPencil  /></span>
                                                        </a>
                                                    </div>
                                                    <div className="mr-2">
                                                        <a onClick={() => {DelDataDeviceRuangServer(cellValues)}} data-twe-toggle="tooltip" title="Delete Data">
                                                            <span className="text-danger"><IconTrash  /></span>
                                                        </a>
                                                    </div>
                                                </div>
                                                </>
                                        )
                                    }
                                },
                                {
                                    field: 'RECID', headerName: 'RECID', width: 70, minWidth: 70, maxWidth: 70,headerAlign:'left',align:'right'
                                },
                                {
                                    field: 'KDCAB', headerName: 'KDCAB', width: 70, minWidth: 70, maxWidth: 70,headerAlign:'center',align:'center',flex:0,
                                },
                                {
                                    field: 'LOKASI', headerName: 'LOKASI', width: 240, minWidth: 240, maxWidth: 240,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'IP', headerName: 'IP', width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'DEVICE', headerName: 'DEVICE', width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'MODEL', headerName: 'MODEL', width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'LAST_UPDATE', headerName: 'LAST_UPDATE', width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center'
                                },
                                {
                                    field: 'OTORISATOR', headerName: 'OTORISATOR', width: 120, minWidth: 120, maxWidth: 120,headerAlign:'center',align:'center'
                                },
                            ];
                            setColumns(arr_columns_)
                            setisTextButton(false)
                        }else if(code.toString().substring(0,1) === '4'){
                            if(code === 401 && msg.includes("Invalid")){
                                //RefreshToken();
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });
                            }
                            setisTextButton(false)
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });  
                            setisTextButton(false)
                        }    
                    }
                ).catch(
                    (error) => {
                        Swal.fire({
                            title: t("Warning"),
                            text: error.toString(),
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setisTextButton(false)
                    }
                );
            }
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setisTextButton(false)
        }
    }

    const DelDataDeviceRuangServer = (cellValues:any) => {
        try{
            Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+' '+t('delete data')+" ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const res_kdcab = cellValues.row.KDCAB
                    const res_lokasi = cellValues.row.LOKASI
                    const res_ip = cellValues.row.IP
                    const res_model = cellValues.row.MODEL
                    const res_device = cellValues.row.DEVICE
                    let url = `http://${IN_HOST}:${IN_PORT}/Device/v1/DeviceRuangServer/:Remove`;
                    console.log('url : '+url)    
                    let param = {"kdcab":res_kdcab,"lokasi":res_lokasi,"ip":res_ip,"device":res_device,"model":res_model,"updid":InputNIKPemohon}
                    console.log(JSON.stringify(param))
                    const Token = GetToken()
                    setisTextButton(true)
                    Posts(url,JSON.stringify(param),false,Token).then(
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
                                GetDataRuangServer(IN_CMB_KODE_CABANG,Device)
                                setisTextButton(false)
                            }else if(code.toString().substring(0,1) === '4'){
                                if(code === 401 && msg.includes("Invalid")){
                                    //RefreshToken();
                                }else{
                                    Swal.fire({
                                        title: t("Warning"),
                                        text: ""+parseFloat(code)+"-"+msg,
                                        icon: "warning",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    });
                                }
                                setisTextButton(false)
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });  
                                setisTextButton(false)
                            }    
                        }
                    ).catch(
                        (error) => {
                            Swal.fire({
                                title: t("Warning"),
                                text: error.toString(),
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setisTextButton(false)
                        }
                    );
                }
            });
            
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setisTextButton(false)
        }
    }

    const DelDataCCTV = (cellValues:any) =>{
        try{
            Swal.fire({
                icon: "question",
                title: t("Confirmation"),
                text: t("Are you sure for")+' '+t('delete data')+" ?",
                showDenyButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const res_kdcab = cellValues.row.KDCAB
                    const res_lokasi = cellValues.row.LOKASI
                    const res_ip = cellValues.row.IP
                    const res_port = cellValues.row.PORT
                    const res_user = cellValues.row.USER
                    const res_pass = atob(cellValues.row.PASSWORD)
                    let url = `http://${IN_HOST}:${IN_PORT}/Device/v1/CctvRuangServer/:Remove`;
                    let param = {"kdcab":res_kdcab,"lokasi":res_lokasi,"merk":"-","tipe":"-","ip":res_ip,"port":res_port,"user":res_user,"pass":res_pass,"updid":InputNIKPemohon}
                    const Token = GetToken()
                    setisTextButton(true)
                    Posts(url,JSON.stringify(param),false,Token).then(
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
                                GetDataRuangServer(IN_CMB_KODE_CABANG,Device)
                                setisTextButton(false)
                            }else if(code.toString().substring(0,1) === '4'){
                                if(code === 401 && msg.includes("Invalid")){
                                    //RefreshToken();
                                }else{
                                    Swal.fire({
                                        title: t("Warning"),
                                        text: ""+parseFloat(code)+"-"+msg,
                                        icon: "warning",
                                        padding: '2em',
                                        customClass: 'sweet-alerts'
                                    });
                                }
                                setisTextButton(false)
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+parseFloat(code)+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                });  
                                setisTextButton(false)
                            }    
                        }
                    ).catch(
                        (error) => {
                            Swal.fire({
                                title: t("Warning"),
                                text: error.toString(),
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setisTextButton(false)
                        }
                    );
                }
            });
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text:t('401-Error UnAutorized, Check your connection or call administrator!'),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setisTextButton(false)
        }
    }
    const CloseModal = () => {
        setModal13(false)
        setModal14(false)
    }
    return(
        <>
            <div className="flex items-end grid-cols-2 gap-3 mb-3 md:grid-cols-2 justify-left">
                <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
                    <div className="flex flex-col items-center p-2 sm:flex-row">
                        <div className="flex-1 pr-4 text-center ltr:sm:pl-4 rtl:sm:pr-1 sm:text-left">
                            
                            <div className="mb-3">
                            <div className="flex font-semibold item-center">   
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                </svg>
                                <h2 className="mt-1 ml-1 text-center text-dark text-1xl dark:text-white-light">Form Filter</h2>
                            </div>
                            </div>
                            <DropDownBranch in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options5} isSearchable={true} isMulti={false} event={userSelectKodeCabang} />
                            <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options6} isSearchable={true} isMulti={false} event={userSelectDevice} name_component={"Select Device"} idComponent={""} />
                            <div className="mb-3">
                                <div className="flex">
                                    <button id="btn_filter" disabled={!active} onClick={() => {
                                                                       GetDataRuangServer(IN_CMB_KODE_CABANG,Device)
                                                                    }}  type="button" className={!isDark ? 'btn btn-primary w-full rounded-full text-end' : 'btn btn-outline-primary w-full rounded-full'}>
                                    
                                        {
                                            isTextButton  ? 
                                            <>
                                            <span className="inline-block w-5 h-5 align-middle border-4 border-transparent rounded-full animate-spin border-l-white-light"></span>&nbsp;{t('Please Wait')}
                                            </>
                                            :
                                            <>
                                            <IconSend />&nbsp; {t('Filter')}
                                            </> 
                                        }
                                    </button>
                                    &nbsp;
                                    <button id="btn_input" disabled={!active} onClick={() => {
                                                                        Device === 'CCTV_RUANG_SERVER' ? showModalCCTVRuangServer(true,t('Add')+' Data','') : showModalDeviceRuangServer(true,t('Add')+' Data','',IN_DETAIL_TIPE_DEVICE)
                                                                    }}  type="button" className={!isDark ? 'btn btn-success w-full rounded-full text-end' : 'btn btn-outline-success w-full rounded-full'}>
                                        {t('Add')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    ShowcardSummary ? 
                    <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
                        <div className="flex flex-col items-center p-2 sm:flex-row">
                            <div className="flex-1 pr-4 text-center ltr:sm:pl-4 rtl:sm:pr-1 sm:text-left">
                                
                                <div className="mb-3">
                                    <div className="flex font-semibold item-center">   
                                        <IconServer className="w-6 h-6" />
                                        <h2 className="mt-1 ml-1 text-center text-dark text-1xl dark:text-white-light">Summary Device Server</h2>
                                    </div>
                                </div>
                                
                                <div className="grid gap-6 xl:grid-flow-row">
                                    {/*  Previous Statement  */}
                                        <div className="relative mt-11">
                                            <div className="absolute -bottom-2 h-24 w-24 ltr:-right-5 rtl:-left-12">
                                                <IconServer className="text-success opacity-20 w-full h-full" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                                                <div>
                                                    <div className="text-primary text-lg">CCTV</div>
                                                    <div className="mt-2 text-5xl font-semibold">{TotalCCTV}</div>
                                                </div>
                                                <div>
                                                    <div className="text-primary text-lg">UPS</div>
                                                    <div className="mt-2 text-5xl font-semibold">{TotalUPS}</div>
                                                </div>
                                                <div>
                                                    <div className="text-primary text-lg">Server DC</div>
                                                    <div className="mt-2 text-5xl font-semibold">{TotalServerDC}</div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
            <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, RECID: false, USER: false, PASSWORD: false }} jenis_laporan={'Master Data ' + t('Device Server')} data_columns={columns} data_rows={data_rows} isLoading={false} progressbar={""} field_auto_sorting={"ID"} type_sorting={"desc"} iscolumns_grouping={false} arr_columnGroupingModel={undefined} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={true} in_printOptions={true} in_prosentase_progress={0} in_rows_spanning={false} />
            <ModalComponent in_size_modal={`panel animate__animated my-7 w-4/5 overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-lg font-bold text-white"} in_title_modal={judul_modal} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
               <div className="p-5">
                    <form>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="mb-5">
                            <label>Cabang</label>
                            <div className="flex">
                                <div className="w-full">
                                    {
                                        Isinput ?
                                        <Select onChange={userSelectKodeCabangInput} id="cmb_kode_cabang" placeholder={t("Select Branch Code")} options={options5} isMulti={true} isSearchable={true}/>
                                        :
                                        <input disabled={true} type="text" placeholder={t('Select Branch')} onChange={FormInputKodeCabang} value={IN_DETAIL_KDCAB} className="text-xs form-input" required />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">                
                        <div className="mb-5">
                            <label>{t('Location')}</label>
                            <div className="flex">
                                <div className="w-full">
                                <input type="text" placeholder={t('Location')} onChange={FormInputLocation} value={IN_DETAIL_LOCATION} className="text-xs form-input" required />
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label>{t('Merk')}</label>
                            <div className="flex">
                                <div className="w-full">
                                <input type="text" placeholder={t('Merk')} onChange={FormInputMerk} value={IN_DETAIL_MERK} className="text-xs form-input" required />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label>{t('Type')}</label>
                            <div className="flex">
                                <div className="w-full">
                                <input type="text" placeholder={t('Type')} onChange={FormInputType} value={IN_DETAIL_TYPE} className="text-xs form-input" required />
                                </div>
                            </div>
                        </div> 
                        <div className="mb-5">
                            <label>{t('IP')}</label>
                            <div className="flex">
                                <div className="w-full">
                                <input type="text" placeholder={t('IP')} onChange={FormInputIP} value={IN_DETAIL_IP} className="text-xs form-input" required />
                                </div>
                            </div>
                        </div> 
                        <div className="mb-5 col-span-2">
                            <label>{t('Port RTSP')}</label>
                            <div className="flex">
                                <div className="w-full">
                                <input type="url" placeholder="Port RTSP" onChange={FormInputPortRTSP} value={IN_DETAIL_PORT_RTSP} className="text-xs form-input" required />
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                            <div className="mb-5">
                                <label>{t('User')}</label>
                                <div className="flex">
                                    <div className="w-full">
                                    <input type="text" placeholder={t('User')} onChange={FormInputUser} value={IN_DETAIL_USER} className="text-xs form-input" required />
                                    </div>
                                </div>
                            </div> 
                            <div className="mb-5">
                                <label>{t('Password')}</label>
                                <div className="flex">
                                    <div className="w-full">
                                    <input type={type} placeholder={t('Password')} onChange={FormInputPassword} value={IN_DETAIL_PASSWORD} className="text-xs form-input" required />
                                    <span className="absolute mt-1 end-14" onClick={handleToggle}>
                                        <Icon className="absolute mr-10" icon={icon} size={25}/>
                                    </span>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="mb-5">
                            <hr />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="mb-5">
                            <label>{t('Enter the number of cameras')}</label>
                            <div className="flex">
                                <div className="w-full">
                                <input type="text" placeholder={t('Enter the number of cameras')} onChange={FormInputJumlahKamera} value={IN_DETAIL_JUMLAH_KAMERA} className="form-input text-right" required />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label>&nbsp;</label>
                            <div className="flex">
                                <div className="w-full">
                                <button onClick={()=>GenerateJumlahKamera(IN_DETAIL_JUMLAH_KAMERA)} type="button" className="btn btn-outline-warning">
                                    {t('Enter')}
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        IsShowInformation ? 
                        <>
                        <div className="flex items-center p-3.5 rounded text-white bg-primary mt-3 mb-3">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">{t('Information')}!</strong> {t('Enter every Path of cameras')}
                            </span>
                            <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
                                <IconX />
                            </button>
                        </div>
                        <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={t('List Camera')} data_columns={columns_camera} data_rows={data_rows_camera} isLoading={false} progressbar={""} field_auto_sorting={"CAMERA_ID"} type_sorting={"asc"} iscolumns_grouping={false} arr_columnGroupingModel={undefined} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={false} sizeBorderRadius={3} row_per_page={[20, 30, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={true} in_prosentase_progress={0} in_rows_spanning={false} />
                        </>
                        :
                        ''
                    }
                    
                    

                    </form>
                    <div className="flex items-center justify-end mt-8">
                        <button onClick={() => setModal13(false)} type="button" className="btn btn-outline-danger">
                            {t('Cancel')}
                        </button>
                        <button  id="btn_insert" onClick={() => {
                                InsCctvRuangServer(IN_DETAIL_KDCAB,IN_DETAIL_LOCATION,IN_DETAIL_MERK,IN_DETAIL_TYPE,IN_DETAIL_IP,IN_DETAIL_PORT_RTSP,ref_data_detail,IN_DETAIL_USER,IN_DETAIL_PASSWORD,InputNIKPemohon,Device)
                            }}  type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                            
                            {
                                isTextButton  ? 
                                <>
                                <span className="inline-block w-5 h-5 align-middle border-4 border-transparent rounded-full animate-spin border-l-white-light"></span>&nbsp;{t('Please Wait')}
                                </>
                                :
                                <>
                                <IconSend />&nbsp; {t('Submit')}
                                </> 
                            }
                        </button>
                    </div>
                </div>
            } /> 
            <ModalComponent in_size_modal={`panel animate__animated my-7 w-4/5 overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal14} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-lg font-bold text-white"} in_title_modal={judul_modal} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                <div className="p-5">
                    <div className="grid grid-cols-1 gap-3">
                        <div className="mb-5">
                            <label>Cabang</label>
                            <div className="flex">
                                <div className="w-full">
                                    {
                                        Isinput ?
                                        <Select onChange={userSelectKodeCabangInputDevice} id="cmb_kode_cabang" placeholder={t("Select Branch Code")} options={options5} isMulti={true} isSearchable={true}/>
                                        :
                                        <input disabled={true} type="text" placeholder={t('Select Branch')} onChange={FormInputKodeCabangDevice} value={IN_DETAIL_KDCAB_DEVICE} className="text-xs form-input" required />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">                
                        <div className="mb-5">
                            <label>{t('Location')}</label>
                            <div className="flex">
                                <div className="w-full">
                                <input type="text" placeholder={t('Location')} onChange={FormInputLocationDevice} value={IN_DETAIL_LOKASI_DEVICE} className="text-xs form-input" required />
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label>{t('Device')}</label>
                            <div className="flex">
                                <div className="w-full">
                                    <input disabled={true} type="text" placeholder={t('Select Device Server')} onChange={FormInputDeviceServer} value={IN_DETAIL_TIPE_DEVICE} className="text-xs form-input" required />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label>{t('Model')}</label>
                            <div className="flex">
                                <div className="w-full">
                                <input type="text" placeholder={t('Model')} onChange={FormInputModel} value={IN_DETAIL_MODEL_DEVICE} className="text-xs form-input" required />
                                </div>
                            </div>
                        </div> 
                        <div className="mb-5">
                            <label>{t('IP')}</label>
                            <div className="flex">
                                <div className="w-full">
                                <input type="text" placeholder={t('IP')} onChange={FormInputIPDevice} value={IN_DETAIL_IP_DEVICE} className="text-xs form-input" required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-8">
                        <button onClick={() => setModal14(false)} type="button" className="btn btn-outline-danger">
                            {t('Cancel')}
                        </button>
                        <button  id="btn_insert" onClick={() => {
                                InsDeviceRuangServer(IN_DETAIL_KDCAB_DEVICE,IN_DETAIL_LOKASI_DEVICE,IN_DETAIL_TIPE_DEVICE,IN_DETAIL_MODEL_DEVICE,IN_DETAIL_IP_DEVICE,InputNIKPemohon,Device)
                            }}  type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                            
                            {
                                isTextButton  ? 
                                <>
                                <span className="inline-block w-5 h-5 align-middle border-4 border-transparent rounded-full animate-spin border-l-white-light"></span>&nbsp;{t('Please Wait')}
                                </>
                                :
                                <>
                                <IconSend />&nbsp; {t('Submit')}
                                </> 
                            }
                        </button>
                    </div>
                </div>
            } />
        </>
    )
};
export default FormDeviceServer;