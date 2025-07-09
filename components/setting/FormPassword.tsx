'use client'
import { Fragment, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Select from 'react-select';
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import { Posts } from "@/lib/post";
import IconCpuBolt from "../Icon/IconCpuBolt";
import IconEdit from "../Icon/IconEdit";
import IconInbox from "../Icon/IconInbox";
import IconUser from "../Icon/IconUser";
import IconX from "../Icon/IconX";
import { Dialog, Transition } from '@headlessui/react';
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import config from '@/lib/config.json';
import { AddID, ConvertBinaryToText, DecodeAES, get_branch_code, get_format_tanggal_jam, GetID, GetSignature, GetToken, handleLogout, WritePayload } from "@/lib/global";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";
import IconCircleCheck from "../Icon/IconCircleCheck";
import IconSend from "../Icon/IconSend";
import CardInfoProses from "../form/CardInfoProses";
import IconChecks from "../Icon/IconChecks";
import IconGlobe from "../Icon/IconGlobe";
import IconXCircle from "../Icon/IconXCircle";
import themeConfig from "@/theme.config";
import DropDownBranch from "../dropdown/DropDownBranch";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import ButtonReload from "../button/ButtonReload";
import ButtonFilter from "../button/ButtonFilter";
import IconSearch from "../Icon/IconSearch";
import ModalComponent from "../modal/ModalComponent";
import InputTextType from "../form/InputTypeText";
import DropDownStation from "../dropdown/DropDownStation";
import DropDownStore from "../dropdown/DropDownStore";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";
import ButtonAdd from "../button/ButtonAdd";

interface FormPasswordProps{
    IDReport: string,
    target:any,
    jenis:string,
}

function get_data_local_storage(key:string){
    var menu = '';
    if (typeof window !== 'undefined' && window.localStorage) {
        // Perform localStorage action
        menu = localStorage.getItem(key);
        //console.log(menu)
    }
      
    return menu;
   
}

const FormPassword: React.FC<FormPasswordProps> = ({IDReport,target,jenis}) => {
    const [tabs, setTabs] = useState<string>('ubah_password');
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [loading, setLoading] = useState(false);
    const [data_rows,setData_rows] = useState([]);
    const [data_rows_target_bc,setData_rows_target_bc] = useState([]);
    const [columns_target_bc,setcolumns_target_bc] = useState([])
    const [DataIP,setDataIP] = useState('');
    const [ClosedWS,setClosedWS] = useState('');
    const [LastResponse,setLastResponse] = useState('');
    const [modal13, setModal13] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [active, setActive] = useState(true);

    const MySwal = withReactContent(Swal);

    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT, setPORT] = useState(0);
    const [IN_PORTWS,setPORTWS] = useState(0);

    const [options5,setOption5] = useState([]);
    const [options10,setOptions10] = useState([]);
    
    const { t, i18n } = useTranslation();
    const [IsValMulti,setIsValMulti] = useState(true);
    const [KODE_TOKO_TARGET_BC,setKODE_TOKO_TARGET_BC] = useState('')
    const [progressbar,setProgress] = useState('');
    const [KODE_CABANG_TARGET_BC,setKODE_CABANG_TARGET_BC] = useState('')
    const ref_kode_cabang = useRef('')
    const [JABATAN,setJABATAN] = useState('')
    const [PassKini,setPassKini] = useState('')
    const [Token,setToken] = useState('')
    
    const [IN_CMB_TARGET, setTarget] = useState({});
    const [IN_CMB_TARGET_BC, setTargetBC] = useState({});
    
    const [isDisabled,setIsDisabled] = useState(false);
    const [LoadingButton,setLoadingButton] = useState(false);
    const [TextButtonFilter,setTextButtonFilter] = useState('Send')
    const isConnectedWS = useRef(0)
    const [stateCode,setStateCode] = useState(0);
    const [DetailData,setDetailData] = useState('')
    
    
    useEffect(() => {
        var key = GetToken()
        setToken(key)
        var res_host = themeConfig.host
        var res_port = parseFloat(themeConfig.port_listener)
        var res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host);
        setPORT(res_PORT_LOGIN)
        setPORTWS(res_port)
        let arr_cabang = get_branch_code(false,false);
        setOption5(arr_cabang) 
        setOptions10(arr_cabang) 
        const data_login = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
        const arr_login = JSON.parse(data_login)
        const nik = arr_login.nik.toString()
        const jabatan = arr_login.jabatan.toString()
        setJABATAN(jabatan)
        userSelectOtorisator(nik);
        
    },[]);
    
    const userSelectTarget = (value: any) => {
        if(value.length == 0){
            setTarget({});
        }else{
            const arr_val = {
                value:value.value,
                label:value.value
            };
            setTarget(arr_val);
        }
    };

    const userSelectTargetBC = (value: any) => {
        if(value.length == 0){
            setTargetBC({});
        }else{
            setTargetBC(value.value);
            const target = value.value
            const kdcab = ref_kode_cabang.current;
            const url = `http://${IN_HOST}:${IN_PORT}/auth/v1/GetPassword`;
            //-- get nik for param get_menu --//
            const param = JSON.stringify({"kdcab":kdcab,"Jenis":jenis,"Target":target});
            const Token = GetToken()
            Posts(url,param,false,Token).then(
                (response) => {
                    let rows: React.SetStateAction<any[]> = [];
                    var parse_data = response.data;
                    var code = response.code;
                    var msg = response.msg;
                    
                    if(code === 200){
                        setLoading(true);
                        var d = JSON.parse(parse_data);
                        let pass_kini = d[0].pass
                        setPassKini(pass_kini)
                        console.log(pass_kini)
                    }else if(code.toString().substring(0,1) === '4'){
                        Swal.fire({
                            title: t("Warning"),
                            text: "Info : "+code+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false);
                        if(code === 401 && msg.includes("Invalid")){
                            handleLogout();
                        }
                    }else{
                        Swal.fire({
                            title: t("Warning"),
                            text: "Info : "+code+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false);
                    }
                }).catch((error) =>  {
                        Swal.fire({
                            title: t("Warning"),
                            text: "Error : "+error.toString(),
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false)
                    }
                );
        }

    };
    
    const [Isinput, setIsinput] = useState(true);
    const [IN_DETAIL_CMB_BRANCH_COVERAGE,setCmbBranchCoverage] = useState('');
    const userSelectCmbBranchCoverage = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setCmbBranchCoverage(val);
    };

    const [IN_CMB_INPUT_BRANCH, setIN_CMB_INPUT_BRANCH] = useState({});
    const [IN_KDCAB_ALL,setIN_KDCAB_ALL] = useState('');
    const userSelectBranch = (value: any) => {
        if(value.length == 0){
            setIN_CMB_INPUT_BRANCH({});
        }else{
            const arr_val = {
                value:value.value,
                label:value.value
            };
            setIN_CMB_INPUT_BRANCH(arr_val);
            setIN_KDCAB_ALL(value.value.toString())
        }

    };


    
    const [isDisabledKdcab,setISDisableKdcab] = useState(false);
    const userSelectDisabledKdcab = (value: boolean) => {
        setISDisableKdcab(value);
    };
    //const [options8,setOption8] = useState([]);
    const options8 = target;
    var columns = [];
    if(jenis == 'VNC'){
        columns = [
            { field: 'id', headerName: 'id',  flex: 1},
            { 
                field: 'EDIT', headerName: 'EDIT',  flex: 1,  width: 110, minWidth: 110, maxWidth: 110,
                renderCell: (cellValues: any) => {
                    return (
                    <>
                   <div className="grid grid-cols-2">
                        <div>
                            
                        <a onClick={() => {setDetailData(cellValues);handleRowDetailClick()}} >
                        <IconEdit className={"text-yellow-500 font-medium"} />
                        </a>
                        </div>
                       </div>
                    </>
                    
    
                    
                    );
                }
            },
            { field: 'KDCAB', headerName: 'KODE CABANG',  width: 120, minWidth: 120, maxWidth: 120},
            { field: 'JENIS', headerName: 'JENIS',  width: 140, minWidth: 140, maxWidth: 140},
            { field: 'TARGET', headerName: 'TARGET',  width: 140, minWidth: 140, maxWidth: 140},
            { field: 'PASS', headerName: 'PASSWORD',  width: 250, minWidth: 250, maxWidth: 250},
            { field: 'ADDID', headerName: 'ADDID', flex:1}
    
        ];

       
    }else{
        columns = [
            { field: 'id', headerName: 'id',  flex: 1},
            { 
                field: 'EDIT', headerName: 'EDIT',  flex: 0,  width: 110, minWidth: 110, maxWidth: 110,
                renderCell: (cellValues: any) => {
                    return (
                    <>
                        <div className="grid grid-cols-2">
                            <div>
                                <a onClick={() => {setDetailData(cellValues);handleRowDetailClick()}} >
                                    <IconEdit className={"text-yellow-500 font-medium"} />
                                </a>
                            </div>
                       </div>
                    </>
                    );
                }
            },
            { field: 'KDCAB', headerName: 'KODE CABANG',  width: 120, minWidth: 120, maxWidth: 120},
            { field: 'JENIS', headerName: 'JENIS',  width: 100, minWidth: 100, maxWidth: 100},
            { field: 'TARGET', headerName: 'TARGET',  width: 100, minWidth: 100, maxWidth: 100},
            { field: 'USER', headerName: 'USER',  width: 140, minWidth: 140, maxWidth: 140},
            { field: 'PASS', headerName: 'PASSWORD', flex:1},
            { field: 'PORT', headerName: 'PORT',  width: 80, minWidth: 80, maxWidth: 80},
            { field: 'ADDID', headerName: 'ADDID',  width: 110, minWidth: 110, maxWidth: 110}
    
        ];
    }
    

    const [IN_DETAIL_LOKASI, setLokasi] = useState({});
    
    const [IN_DETAIL_BRANCH,setDetailBranch] = useState('');
    
    const [IN_DETAIL_PASSWORD,setPassword] = useState('');
    const userSelectPassword = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setPassword(val);
    };

    const [IN_DETAIL_NAMA, setNama] = useState('');
    const userSelectNama = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setNama(val);
    };

    const [options9,setOptiosn9] = useState([]);
    const [IN_DETAIL_USER, setUser] = useState('');
    const userSelectUSER = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        //console.log('val_user : '+val);
        setUser(val);
    };
    const [IN_DETAIL_PORT, setPort] = useState('');
    const userSelectPort = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        setPort(val);
    };

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [IN_DETAIL_OTORISATOR,setDetailOtorisator] = useState('');
    const userSelectOtorisator = (value: any) => {
        setDetailOtorisator(value);
    };
    
    const handleRowDetailClick = ()=>{
        var cellValues:any = DetailData;
        console.log('cellValues : '+cellValues)
        try{
            setModal13(true);
            const data_login = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
            const arr_login = JSON.parse(data_login);
            setCmbBranchCoverage('');
            
            if(cellValues === ''){
                setIsinput(true);
                const a = target;
                userSelectTarget(a);
                setLokasi('');
                const branch_local = arr_login.branch;
                setDetailBranch(branch_local);
                userSelectDisabledKdcab(false);
            }else{
                setIsinput(false);
                setLokasi(cellValues.row.LOKASI);
                setCmbBranchCoverage(cellValues.row.KDCAB);
                const arr_target = {
                    value:cellValues.row.TARGET,
                    label:cellValues.row.TARGET
                };
                setTarget(arr_target);
                setPassword(cellValues.row.PASS);
                userSelectDisabledKdcab(true);
                if(target === 'VNC'){

                }else{
                    setUser(cellValues.row.USER);
                    setPort(cellValues.row.PORT);
                }
            }
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }
    }

    const userSelectKodeCabang = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            setKODE_CABANG('')
        }else{
            //console.log('value : '+JSON.stringify(value));
            var arr_kode_cabang = "";
            for(var i = 0;i<value.length;i++){
                //console.log(value[i].value);
                if(i === (value.length - 1 )){
                    arr_kode_cabang = arr_kode_cabang+value[i].value;
                }else{
                    arr_kode_cabang = arr_kode_cabang+value[i].value+",";
                }
                
            }
            setKODE_CABANG(arr_kode_cabang);
        }
    };

    const HandleClick = () =>{
        const target = (IN_CMB_TARGET as any).value;
        const kdcab = IN_CMB_KODE_CABANG;
        const url = `http://${IN_HOST}:${IN_PORT}/auth/v1/GetPassword`;
        //-- get nik for param get_menu --//
        const param = JSON.stringify({"kdcab":kdcab,"Jenis":jenis,"Target":target});
        console.log('param : '+param)
        if(kdcab === '' || target === ''){
            Swal.fire({
                title: t("Warning"),
                text: "Pilih kode cabang / target terlebih dahulu !",
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }else{
             
            setData_rows([]);
            setActive(true);
            const myExample = document.getElementById('btn_filter');
            myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')
            const Token = GetToken()
            Posts(url,param,false,Token).then(
                (response) => {
                    let rows: React.SetStateAction<any[]> = [];
                    var parse_data = response.data;
                    var code = response.code;
                    var msg = response.msg;
                    
                    if(code === 200){
                        setLoading(true);
                        var d = JSON.parse(parse_data);
                       
                       
                        if(d.kdcab === '' && d.jenis === '' && d.target === '' && d.pass === '' && d.nik === ''){
                            setData_rows([]);
                            Swal.fire({
                                icon: "question",
                                title: t("Confirmation"),
                                text: t('Password not yet before'),
                                showDenyButton: true,
                                confirmButtonText: "Ya",
                                denyButtonText: "Tidak",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                              }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    handleRowDetailClick();
                                    setDetailData('')
                                }else{
                                    MySwal.fire({
                                        title: t('Thanks for your confirmation, If you want add password, you can push ADD BUTTON'),
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
                            });
                        }else{
                            if(d.length > 1){
                                for(var o = 0;o<d.length;o++){
                                    const uniq_number = parseFloat(Math.floor(new Date().valueOf() * Math.random()).toString().substring(0,6));
                                    var arr_content = {};
                                    if(jenis == 'VNC'){
                                        arr_content = {
                                            'id':uniq_number,
                                            'EDIT':'',
                                            'KDCAB':d[o].kdcab,
                                            'JENIS':d[o].jenis,
                                            'TARGET':d[o].target,
                                            'PASS': d[o].pass,
                                            'ADDID':d[o].nik
                                        }; 
                                    }else{
                                        arr_content = {
                                            'id':uniq_number,
                                            'EDIT':'',
                                            'KDCAB':d[o].kdcab,
                                            'JENIS':d[o].jenis,
                                            'TARGET':d[o].target,
                                            'USER':d[o].user,
                                            'PASS': d[o].pass,
                                            'PORT': d[o].port,
                                            'ADDID':d[o].nik
                                        }; 
                                    }
                                    rows.push(arr_content);
                                }
                            }else{
                                const uniq_number = parseFloat(Math.floor(new Date().valueOf() * Math.random()).toString().substring(0,6));
                                var arr_content = {};
                                if(jenis == 'VNC'){
                                    arr_content = {
                                        'id':uniq_number,
                                        'EDIT':'',
                                        'KDCAB':d[0].kdcab,
                                        'JENIS':d[0].jenis,
                                        'TARGET':d[0].target,
                                        'PASS': d[0].pass,
                                        'ADDID':d[0].nik
                                    }; 
                                }else{
                                    arr_content = {
                                        'id':uniq_number,
                                        'EDIT':'',
                                        'KDCAB':d[0].kdcab,
                                        'JENIS':d[0].jenis,
                                        'TARGET':d[0].target,
                                        'USER':d[0].user,
                                        'PASS': d[0].pass,
                                        'PORT': d[0].port,
                                        'ADDID':d[0].nik
                                    }; 
                                }
                                rows.push(arr_content);
                            }
                            console.log(JSON.stringify(rows))
                            setData_rows(rows);
                        }
                        setLoading(false);
                        myExample.innerHTML = 'Filter';
                    }else if(code.toString().substring(0,1) === '4'){
                        Swal.fire({
                            title: t("Warning"),
                            text: "Info : "+code+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false);
                        if(code === 401 && msg.includes("Invalid")){
                            handleLogout();
                        }
                    }else{
                        Swal.fire({
                            title: t("Warning"),
                            text: "Info : "+code+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false);
                        myExample.innerHTML = 'Filter';
                    }
                }).catch((error) =>  {
                        Swal.fire({
                            title: t("Warning"),
                            text: "Error : "+error.toString(),
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setLoading(false)
                    }
                );
                
            
        }
    };

    const handleinsPassword = (in_param:any,type:string)  => { 
        const Jenis = in_param.Jenis;
        let Kdcab = '';
        if(jenis === 'SQL'){
            Kdcab = (IN_KDCAB_ALL === '' ? IN_DETAIL_CMB_BRANCH_COVERAGE : IN_KDCAB_ALL );
        }else{
            Kdcab =  (Isinput ? in_param.Kdcab.value : in_param.Kdcab);
        }
       
        
        const User = in_param.User;
        const Pass = in_param.Pass;
        const Target = in_param.Target;
        const Port = in_param.Port;
        const Nik = in_param.Nik;
        const res_param = {"Kdcab":Kdcab ,"Jenis":Jenis,"User":User,"Pass":Pass,"Target":Target,"Port":Port,"Nik":Nik}
            Swal.fire({
                title: t("Are you sure for")+" save data password?",
                showDenyButton: true,
                icon: "question",
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
                padding: '2em',
                customClass: 'sweet-alerts'
            }).then((result) => {
                if (result.isConfirmed) {
                    const url = `http://${IN_HOST}:${IN_PORT}/auth/v1/UpdatePassword`;
                    const param = JSON.stringify(res_param);
                    console.log('res_param : '+param)
                    const Token = GetToken()
                    Posts(url,param,false,Token).then(
                        (response) => {
                            let rows: React.SetStateAction<any[]> = [];
                            var code = response.code;
                            var msg = response.msg;
                            if(code === 200){
                                Swal.fire({
                                    title: t("Information"),
                                    text: ""+code+"-"+msg,
                                    icon: "success",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                })
                                HandleClick();
                                setModal13(false);
                            }else{
                                Swal.fire({
                                    title: t("Warning"),
                                    text: ""+code+"-"+msg,
                                    icon: "warning",
                                    padding: '2em',
                                    customClass: 'sweet-alerts'
                                })
                            }
                    }).catch((error) =>  
                        Swal.fire({
                            title: t("Warning"),
                            text: "Error : "+error.toString(),
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        })
                    );
                }else{
    
                }
            });
    }

    const toggleTabs = (name: string) => {
        setTabs(name);
    };

     const userSelectTipeFilter = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        if(val === 'per_cabang'){
            setIsValMulti(true);
        }else{
            setIsValMulti(false);           
        }
    }

    const userSelectStore = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            setKODE_TOKO_TARGET_BC('')
        }else{
            var arr_kode_toko = "";
            for(var i = 0;i<value.length;i++){
                //console.log(value[i].value);
                if(i === (value.length - 1 )){
                    arr_kode_toko = arr_kode_toko+value[i].value;
                }else{
                    arr_kode_toko = arr_kode_toko+value[i].value+",";
                }
            }
            setKODE_TOKO_TARGET_BC(arr_kode_toko);
        }
    };

    const userSelectKodeCabangTargetBC = (value:any) => {
            setPassKini('')
            if(value.value.length > 4){
                Swal.fire({
                    title: t("Warning"),
                    text: "Warning :  Kode Cabang tidak sesuai!",
                    icon: "error",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }else{
                console.log('kondisi 2.2')
                setKODE_CABANG_TARGET_BC(value.value)
                ref_kode_cabang.current = value.value
                //console.log('ref_kode_cabang : '+ref_kode_cabang)
                //-- GET LIST TOKO --//
                const kdcab_param = value.value
                const url = `http://${IN_HOST}:${IN_PORT}/store/v1/ViewCabang`;
                const param = {kdcab:kdcab_param};
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
                                    
                                    var arr_content1 = {
                                        'label':'-- Semua Toko --',
                                        'value':'',
                                    };
                                    arr_concat.push(arr_content1);
                                    for(var b = 0;b<data_body.length;b++){
                                        if(data_body[b].station.toString() === '01'){
                                            //const obj_value = {"KDTK":data_body[b].toko,"NAMA":data_body[b].nama,"STATION":data_body[b].station,"IP":data_body[b].ip,"RESPONSE":"BELUM PROSES"}
                                            var arr_content = {
                                                'label':data_body[b].toko+':'+data_body[b].nama,
                                                'value':data_body[b].toko,
                                            };
                                            arr_concat.push(arr_content);
                                        }else{
                                        
                                        }
                                    }
                                    setOptiosn9(arr_concat);
                                    setKODE_TOKO_TARGET_BC('');
                                
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
    const SendBroadCast = () =>{
        try{
            setData_rows_target_bc([]);
            setDataIP('');
            setClosedWS('');
            setLastResponse('');
            const kdcab = KODE_CABANG_TARGET_BC;
            var rows: { KODE: any; KETERANGAN: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; RESPONSE:string}[] = [];
            if (kdcab === '') {
                Swal.fire({
                    title: t("Warning"),
                    text: t("Select Branch Code"),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }else if(PassKini === ''){
                Swal.fire({
                    title: t("Warning"),
                    text: t("Your Pass still null, Please select Branch code or Station  Target"),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            } else {
                Swal.fire({
                    icon: "question",
                    title: t("Confirmation"),
                    text: t("Are you sure for")+" update vnc password?",
                    showDenyButton: true,
                    confirmButtonText: "Ya",
                    denyButtonText: "Tidak",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    setLoadingButton(true)
                    const get_data = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
                    const d = JSON.parse(get_data);
                    let station = '';
                    if(IN_CMB_TARGET_BC === 'PC'){
                        station = '01,02,03,04,05,06,07,08,09,10,11,12,13,14,22';
                    }else{
                        station = 'I1';
                    }
                    let kdtk = KODE_TOKO_TARGET_BC;
                    let noCheckDB = false;
                    let maxSecondHandle = 120
                    let newpass = PassKini
                    let command = "%systemroot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe \"$pl='C:\\IDMCommandListeners\\';$vs= $PSVersionTable.PSVersion.Major;if($vs -eq 2){Write-Host '2';}else{$prodsedll='1.1.7.0';$vlist=Get-Content -Path 'C:\\IDMCommandListeners\\version.txt';$rvlist=$vlist.Replace('.','');if($rvlist -lt 424){Write-Host 'NOK Versi IDMCommandListeners'}else{$dF=''+$pl+'SE.dll';add-type -path $dF;if(Test-Path $dF){$vdll=(Get-Item C:\\IDMCommandListeners\\SE.dll).VersionInfo|Select-Object ProductVersion|Format-Table -HideTableHeader|Out-String;if([int]$vdll.Trim().Replace('.','') -lt [int]$prodsedll.Trim().Replace('.','')){Write-Host 'Versi SE.dll Belum Update!'}else{$path=Get-WmiObject -Class Win32_Service -Filter \\\"Name = 'uvnc_service'\\\" | Select-Object PathName|Format-Table -HideTableHeaders|Out-String;$rpath=$path.Trim().Replace('WinVNC.exe','').Replace(' -service','');$jpath=Join-Path -Path $rpath.Substring(1,$rpath.Length-2) -ChildPath 'UltraVNC.ini';$passwdToko=Get-Content $jpath | Where-Object { $_ -match \\\"^Passwd\\s*=\\\" };try{$newEncryptedPasswd=[SE.Class1]::EncryptPassword('"+newpass+"');$content=Get-Content $jpath;$content=$content -replace '^Passwd\\s*=.*', \\\"Passwd=$newEncryptedPasswd\\\";Set-Content -Path $jpath -Value $content;cmd /c net stop uvnc_service;cmd /c taskkill /f /im winvnc*;cmd /c net start uvnc_service;Write-Host 'Password updated in UltraVNC'}catch{Write-Host 'Error updated Password UltraVNC'}}}}}exit;\"";
                    let res_command = await GetSignature(IN_HOST, IN_PORT, Token, command) as string
                    let IP = ""
                    let url = `ws://${IN_HOST}:${IN_PORTWS}/sock/v1/ReportFromListener?Token=${Token}`
                    const param = WritePayload(kdcab, kdtk, station, "", "COMMAND", res_command, 2, false, IDReport, Token, IP,noCheckDB,maxSecondHandle);
                    setActive(false);
                    const socket = new WebSocket(url);
                    socket.binaryType = 'blob';
                    //Connection error
                    socket.addEventListener("error", (event: any) => {
                        Swal.fire({
                            title: t("Warning"),
                            text: t("401-Error UnAutorized, Check your connection or call administrator!"),
                            icon: "error",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                        setActive(true);
                        setLoading(false);
                        setIsDisabled(false)
                        setLoadingButton(false);
                        setProgress(t('Finished Session'));
                        setTextButtonFilter('Send')
                        const tgl_kini = get_format_tanggal_jam();
                        setClosedWS(tgl_kini)
                        isConnectedWS.current = 0
                    });

                    // Connection opened
                    socket.addEventListener("open", () => {
                        socket.send(param);
                        console.log(param)
                        setLoadingButton(true)
                        setIsDisabled(true)
                        setTextButtonFilter('Please wait')
                        isConnectedWS.current = 1
                    });
                    // Connection close
                    socket.addEventListener("close", (event: any) => {
                        console.log('connection close');
                        setIsDisabled(false)
                        setLoading(false);
                        setLoadingButton(false)
                        stop();
                        if(stateCode === 209){
                            setProgress(t('Finished Session'));
                        }else{
                            setProgress('Ulangi Proses')
                            setTextButtonFilter('Process')
                            setDataIP('')
                        }
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
                        const rdata = parse_json.data;
                        const countdata = parse_json.amountData;
                        const tgl_kini = get_format_tanggal_jam();
                        setLastResponse(tgl_kini);
                        if (code === 200 || code === 209) {
                                setProgress(code + '-' + msg);
                                setStateCode(code)
                                setLoading(true);
                                if(isConnectedWS.current === 0){
                                    setIsDisabled(false)
                                }else{
                                    setIsDisabled(true)
                                }
                                try {
                                    const res_data = JSON.parse(rdata);
                                    const res_new =  res_data;
                                    var list_toko_sukses = '';
                                    for (var o = 0; o < res_new.length; o++) {
                                        const ubah_json = JSON.stringify(res_new[o]).split('\r\n').join(' ');
                                        const parse_data_inti = JSON.parse(ubah_json);

                                        const res_data_msg = parse_data_inti.msg;
                                        const res_data_code = parse_data_inti.code;
                                        const res_request = parse_data_inti.timerequest;
                                        const res_response = parse_data_inti.timerespons;
                                        const res_kdcab = parse_data_inti.kdcab;
                                        const res_kdtk = parse_data_inti.toko;
        
                                        const res_nama = parse_data_inti.nama;
                                        const res_station = parse_data_inti.station;
                                        const res_ip = parse_data_inti.ip;
                                        let res_hasil = '-';

                                        if(parse_data_inti.data.toString() === '2'){
                                            const arr_content = {
                                                'KODE': res_data_code,
                                                'KETERANGAN': 'Versi Powershell 2,Mohon Update!',
                                                'REQUEST':res_request,
                                                'RESPONSE':res_response,
                                                'KDCAB': res_kdcab,
                                                'KDTK': res_kdtk,
                                                'NAMA': res_nama,
                                                'STATION': res_station,
                                                'IP': res_ip,
                                                'RESULT': '-'
                                            };
                                            rows.push(arr_content);
                                        }else if(parse_data_inti.data.toString() === 'Sudah di eksekusi'){
                                            const arr_content = {
                                                'KODE': res_data_code,
                                                'KETERANGAN': 'Mohon Update IDMCommandListeners!',
                                                'REQUEST':res_request,
                                                'RESPONSE':res_response,
                                                'KDCAB': res_kdcab,
                                                'KDTK': res_kdtk,
                                                'NAMA': res_nama,
                                                'STATION': res_station,
                                                'IP': res_ip,
                                                'RESULT': '-'
                                            };
                                            rows.push(arr_content);
                                        }else if(parse_data_inti.data.toString().includes('Versi SE.dll Belum Update!')){
                                            const arr_content = {
                                                'KODE': res_data_code,
                                                'KETERANGAN': 'Versi SE.dll Belum Update!',
                                                'REQUEST':res_request,
                                                'RESPONSE':res_response,
                                                'KDCAB': res_kdcab,
                                                'KDTK': res_kdtk,
                                                'NAMA': res_nama,
                                                'STATION': res_station,
                                                'IP': res_ip,
                                                'RESULT': '-'
                                            };
                                            rows.push(arr_content);
                                        }else if(parse_data_inti.data.toString().includes('NOK SE.dll')){
                                            const arr_content = {
                                                'KODE': res_data_code,
                                                'KETERANGAN': 'NOK SE,Mohon copykan SE.dll',
                                                'REQUEST':res_request,
                                                'RESPONSE':res_response,
                                                'KDCAB': res_kdcab,
                                                'KDTK': res_kdtk,
                                                'NAMA': res_nama,
                                                'STATION': res_station,
                                                'IP': res_ip,
                                                'RESULT': '-'
                                            };
                                            rows.push(arr_content);
                                        }else{
                                            try{
                                                const res_data_inti = parse_data_inti.data.toString()
                                                res_hasil = (res_data_inti.toString().includes('Password updated in UltraVNC') ? 'OK' : res_data_inti )
                                            }catch(Ex){
                                                console.log('Error : '+Ex.toString())
                                                res_hasil = Ex.toString()
                                            }

                                            if (res_data_code === 200) {
                                                const arr_content = {
                                                    'KODE': res_data_code,
                                                    'KETERANGAN': res_data_msg,
                                                    'REQUEST':res_request,
                                                    'RESPONSE':res_response,
                                                    'KDCAB': res_kdcab,
                                                    'KDTK': res_kdtk,
                                                    'NAMA': res_nama,
                                                    'STATION': res_station,
                                                    'IP': res_ip,
                                                    'RESULT': res_hasil
                                                };
                                                rows.push(arr_content);      
                                                //-- failed listeners --//
                                            } else {
                                                //const uniq_number = parseFloat(Math.floor(new Date().valueOf() * Math.random()).toString().substring(0,6));
                                                const arr_content = {
                                                    'KODE': res_data_code,
                                                    'KETERANGAN':res_data_msg,
                                                    'REQUEST':res_request,
                                                    'RESPONSE':res_response,
                                                    'KDCAB': res_kdcab,
                                                    'KDTK': res_kdtk,
                                                    'NAMA': res_nama,
                                                    'STATION': res_station,
                                                    'IP': res_ip,
                                                    'RESULT': res_hasil
                                                };
                                                rows.push(arr_content);
                                            }
                                        }
                                    }
                                    const columns = [ { field: 'id', headerName: 'id', flex: 1 },
                                                        { field: 'KODE', headerName: 'KODE',  width: 90, minWidth: 90, maxWidth: 90, headerAlign:'center',align:'center',  flex:0,
                                                            renderCell: (cellValues: any) => {
                                                                return (
                                                                    <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                                                                );
                                                            }
                                                        },
                                                        { field: 'KETERANGAN', headerName: 'KETERANGAN',  width: 250, minWidth: 250, maxWidth: 250, headerAlign:'center',align:'center',  flex:0,
                                                            renderCell: (cellValues: any) => {
                                                                return (
                                                                    <span className={cellValues.value === 'Succes' ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                                                                );
                                                            }
                                                        },
                                                        { field: 'REQUEST', headerName: 'REQUEST', width: 180, minWidth: 180, maxWidth: 180,   flex:0 },
                                                        { field: 'RESPONSE', headerName: 'RESPONSE', width: 180, minWidth: 180, maxWidth: 180,  flex:0 },
                                                        { field: 'KDCAB', headerName: 'KDCAB', width: 90,  flex:0 },
                                                        { field: 'KDTK', headerName: 'KDTK', width: 90,  flex:0 },
                                                        { field: 'NAMA', headerName: 'NAMA', width: 130, minWidth: 130, maxWidth: 130,  flex:0 },
                                                        { field: 'STATION', headerName: 'STATION',width: 90, minWidth: 90, maxWidth: 90, headerAlign:'center',align:'center', flex:0 },
                                                        { field: 'IP', headerName: 'IP', width: 165, minWidth: 165, maxWidth: 165,  flex:0 },
                                                        { field: 'RESULT', headerName: 'RESULT', flex:0,width: 250, minWidth: 250, maxWidth: 250, 
                                                            renderCell: (cellValues: any) => {
                                                                return (
                                                                    <span className={cellValues.value.toString().includes('OK') ? 'badge bg-success' : 'badge bg-danger'}  >{cellValues.value}</span>
                                                                );
                                                            }
                                                        }
                                                    ]
                                    if (code === 209) {
                                        setLoading(false);
                                        setActive(true);
                                        setProgress(code + '-' + msg);
                                        setcolumns_target_bc(columns);
                                        var res_rows = AddID(rows);
                                        setData_rows_target_bc(res_rows);
                                        setLoadingButton(false)
                                        isConnectedWS.current = 0
                                    } else {
                                        setProgress(code + '-' + msg);
                                        setcolumns_target_bc(columns);
                                        var res_rows = AddID(rows);
                                        setData_rows_target_bc(res_rows);
                                        isConnectedWS.current = 1
                                    }
                                } catch (Ex) {
                                    console.log('error parsing : ' + Ex.toString())
                                }
                        }
                        else if (code === 201) {
                            setProgress(code + "-" + msg);
                            setLoading(true);
                            isConnectedWS.current = 1
                        }
                        else if (parse_json.code.toString().substring(0, 1) === '4') {
                            setActive(true);
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
                            } else {

                            }
                            setLoadingButton(false)
                            setLoading(false)
                            setIsDisabled(false)
                            setTextButtonFilter('Send')
                            isConnectedWS.current = 0
                        }

                    });
                        
                    }
                });
            }
            // ------------------------- PROSES DATA GAGAL ------------------------- //
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            })
            setLoadingButton(false)
            setLoading(false)
            setIsDisabled(false)
            setTextButtonFilter('Send')
            isConnectedWS.current = 0
        }     
    }
    const CloseModal = () => {
        setModal13(false)
    }
    return (
        <>
        <AntiScrapedShieldComponent in_content={
            <>
                <div className="pt-1">
                    <div>
                        <ul className="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
                            <li className="inline-block">
                                <button onClick={() => toggleTabs('ubah_password')} className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'ubah_password' ? '!border-primary text-primary' : ''}`}>
                                <IconCircleCheck />{t('Change Password')}
                                </button>
                            </li>
                            {
                                JABATAN !== 'SUPPORT' && JABATAN !== 'OFFICER' ?
                                <li className={jenis === 'VNC' ? "inline-block visible" : "inline-block invisible"}>
                                    <button
                                        onClick={() => toggleTabs('broadcast_toko')}
                                        className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${tabs === 'broadcast_toko' ? '!border-primary text-primary' : ''}`}
                                    >
                                        <IconGlobe />
                                        {t('Broadcast Password VNC to Store')}
                                    </button>
                                </li>
                                :
                                ''
                            }
                            
                        </ul>
                    </div>
                    {
                        tabs === 'ubah_password' ? 
                        <>
                        <div className="flex items-end grid-cols-1 gap-3 mb-3 md:grid-cols-1 justify-left">
                            <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-3">
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
                                        <DropDownBranch in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options5} isSearchable={true} isMulti={true} event={userSelectKodeCabang} />
                                        <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options8} isSearchable={true} isMulti={false} event={userSelectTarget} name_component={"Target"} idComponent={""} />
                                        <div className="mb-3">
                                            <div className="grid grid-cols-8 gap-3 mt-4 mb-4 sm:grid-cols-2">
                                                <ButtonFilter in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_filter"} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSearch />} in_title_button={"Filter"} HandleClick={HandleClick} />
                                                <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'} idComponent={""} isLoading={false} isDisabled={false} HandleClick={handleRowDetailClick} in_icon={undefined} in_title_button={"Add"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>      
                            </div>
                        </div>
                        <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={IDReport} data_columns={columns} data_rows={data_rows} isLoading={false} progressbar={""} field_auto_sorting={""} type_sorting={undefined} iscolumns_grouping={false} arr_columnGroupingModel={undefined} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false}  />
                        <ModalComponent in_size_modal={`panel animate__animated my-7 w-4/5 overflow-hidden rounded-xl border-0 p-0 text-black dark:text-white-dark ${isRtl ? 'animate__fadeInRight' : 'animate__fadeInLeft'}`} state_modal={modal13} event_close_modal={CloseModal} isRtl={isRtl} in_classname_title_modal={"text-lg font-bold text-white"} in_title_modal={'Detail Password'} isBC={false} TipeBC={""} progressbarData={""} data_rows_detail={null} data_columns_detail={null} loadingDetail={false} in_content_not_bc={
                            <div className="p-5">    
                                    <div className="mb-3">
                                        <label>Kode Cabang</label>
                                            <div className="flex">
                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                <IconUser />
                                            </div>
                                            {
                                            Isinput ?   
                                            <DropDownGlobal in_classname_title={""} in_classname_content={""} data_options={options5} isSearchable={true} isMulti={false} event={userSelectBranch} name_component={"Select Branch Code"} idComponent={"cmb_kode_cabang_input"} />        
                                            :
                                            <InputTextType   in_title={""} in_classname_title={""} in_classname_content={""} in_classname_sub_content={"text-xs form-input ltr:rounded-l-none rtl:rounded-r-none"} data_options={undefined} isDisabled={false} event={userSelectCmbBranchCoverage} in_value={IN_DETAIL_CMB_BRANCH_COVERAGE} /> 
                                            }
                                            </div>
                                    </div>
                                    <div className="mb-3">
                                        <label>Jenis</label>
                                        <div className="flex">
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] text-xs">
                                                <IconInbox />
                                            </div>
                                            <InputTextType   in_title={""} in_classname_title={""} in_classname_content={""} in_classname_sub_content={"text-xs form-input ltr:rounded-l-none rtl:rounded-r-none"} data_options={undefined} isDisabled={true} event={userSelectNama} in_value={jenis} />
                                        </div>
                                    </div>
                                    {
                                        jenis == 'VNC' ? '' : 
                                        <div className="mb-3">
                                            <label>User</label>
                                            <div className="flex">
                                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] text-xs">
                                                    <IconEdit />
                                                </div>
                                                <InputTextType   in_title={""} in_classname_title={""} in_classname_content={""} in_classname_sub_content={"text-xs form-input ltr:rounded-l-none rtl:rounded-r-none"} data_options={undefined} isDisabled={false} event={userSelectUSER} in_value={IN_DETAIL_USER} />
                                            </div>
                                        </div>
                                    }
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <div className="flex">
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] text-xs">
                                                <IconEdit />
                                            </div>
                                            <InputTextType   in_title={""} in_classname_title={""} in_classname_content={""} in_classname_sub_content={"text-xs form-input ltr:rounded-l-none rtl:rounded-r-none"} data_options={undefined} isDisabled={false} event={userSelectPassword} in_value={IN_DETAIL_PASSWORD} />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label>Target</label>
                                            <div className="flex">
                                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                    <IconCpuBolt />
                                                </div>
                                                <DropDownGlobal in_classname_title={""} in_classname_content={""} data_options={options8} isSearchable={true} isMulti={false} event={userSelectTarget} name_component={""} idComponent={""} />
                                            </div>
                                    </div>
                                    {
                                        jenis == 'VNC' ? '' : 
                                        <div className="mb-3">
                                            <label>Port</label>
                                            <div className="flex">
                                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] text-xs">
                                                    <IconEdit />
                                                </div>
                                                <InputTextType   in_title={""} in_classname_title={""} in_classname_content={""} in_classname_sub_content={"text-xs form-input ltr:rounded-l-none rtl:rounded-r-none"} data_options={undefined} isDisabled={false} event={userSelectPort} in_value={IN_DETAIL_PORT} />
                                            </div>
                                        </div>
                                    }
                                <div className="flex items-center justify-end mt-8">
                                    <button onClick={() => setModal13(false)} type="button" className="btn btn-outline-danger">
                                        {t('Cancel')}
                                    </button>
                                    <button onClick={() => {
                                            handleinsPassword(
                                                {
                                                    "Kdcab": (Isinput ? IN_CMB_INPUT_BRANCH : IN_DETAIL_CMB_BRANCH_COVERAGE),
                                                    "Jenis": jenis,
                                                    "User": IN_DETAIL_USER,
                                                    "Pass": IN_DETAIL_PASSWORD,
                                                    "Target": (IN_CMB_TARGET as any).value,
                                                    "Port": IN_DETAIL_PORT,
                                                    "Nik": IN_DETAIL_OTORISATOR,
                                                }
                                            ,'input data baru')
                                        }}  type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                        {t('Submit')}
                                    </button>
                                </div>
                            </div>
                        } />
                        </>
                        :
                        <>
                        {
                            JABATAN !== 'SUPPORT' && JABATAN !== 'OFFICER' ? 
                            <>
                            <div className="flex items-end grid-cols-2 gap-3 mb-3 md:grid-cols-2 justify-left">
                                <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-3">
                                    <div className="flex flex-col items-center p-2 sm:flex-row">
                                        <div className="flex-1 pr-4 text-center ltr:sm:pl-4 rtl:sm:pr-1 sm:text-left">
                                        
                                            <div className="mb-3">
                                            <div className="flex font-semibold item-center">   
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                                </svg>
                                                <h2 className="mt-1 ml-1 text-center text-dark text-1xl dark:text-white-light">{t('Form Target Broadcast to Store')}</h2>
                                            </div>
                                            </div>

                                            <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Filter Type')}</label></div>
                                            <div className="mb-3">
                                                <div className="w-full">
                                                <label className="flex items-center cursor-pointer">
                                                    <div>
                                                        <label className="flex items-center cursor-pointer">
                                                            <input onChange={userSelectTipeFilter} type="radio" name="custom_radio2" className="form-radio" value={'per_cabang'} defaultChecked />
                                                            <span className="text-white-dark">{t('Branch')}</span>
                                                        </label>
                                                    </div>
                                                    <div className="ml-5">
                                                        <label className="flex items-center cursor-pointer">
                                                            <input onChange={userSelectTipeFilter} type="radio" name="custom_radio2" className="form-radio" value={'per_toko'} />
                                                            <span className="text-white-dark">{t('Some Store')}</span>
                                                        </label>
                                                    </div>
                                                </label>
                                                </div>
                                            </div>
                                            <DropDownBranch in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options10} isSearchable={true} isMulti={false} event={userSelectKodeCabangTargetBC} />
                                            <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options8} isSearchable={true} isMulti={false} event={userSelectTargetBC} name_component={"Station"} idComponent={""} />
                                            {
                                                IsValMulti ? 
                                                ''
                                                :
                                                <>
                                                <DropDownStore in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options9} isSearchable={true} isMulti={true} event={userSelectStore} />
                                                </>
                                            }
                                            <label className="text-sm italic">*) {t("Your Password VNC")} : {PassKini}</label>
                                            <div className="mb-3">
                                                <div className="grid grid-cols-8 gap-1 mt-4 mb-4 sm:grid-cols-2">
                                                    <div className="flex">
                                                        <ButtonFilter in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={GetID()} isLoading={LoadingButton} isDisabled={isDisabled} in_icon={<IconSend />} in_title_button={TextButtonFilter} HandleClick={SendBroadCast} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>      
                                </div>
                            </div>
                            <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false }} jenis_laporan={'Target Broadcast VNC'} data_columns={columns_target_bc} data_rows={data_rows_target_bc} isLoading={false} progressbar={progressbar} field_auto_sorting={""} type_sorting={undefined} iscolumns_grouping={false} arr_columnGroupingModel={undefined} isHiddenID={false} timelapsed={""} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={0} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={false} in_prosentase_progress={0} in_rows_spanning={false}  />
                            </>
                            :
                            <>
                            <div className="relative flex items-center border p-3.5 rounded text-danger bg-danger-light border-danger ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-danger-dark-light">
                                <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                                    <IconXCircle />
                                </span>
                                <span className="ltr:pr-2 rtl:pl-2">
                                    <strong className="ltr:mr-1 rtl:ml-1">{t('Warning')}!</strong>{t('Access Denied')}
                                </span>
                            </div>
                            </>
                        }
                        </>
                    }
                </div>
            </>
        } />
        </>
    )
}
export default FormPassword;