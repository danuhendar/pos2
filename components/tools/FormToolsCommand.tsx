'use client'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { IRootState } from "@/store";
import { Posts } from "@/lib/post";
import React from "react";
import { DecodeAES, get_branch_code, get_data_local_storage, GetSignature, GetToken, handleLogout, SendHandleRowClick, SendHandleRowClickOffice, start,stop } from "@/lib/global";
import withReactContent from "sweetalert2-react-content";
import IconSend from "../Icon/IconSend";
import { useTranslation } from "react-i18next";
import IconXCircle from "../Icon/IconXCircle";
import themeConfig from "@/theme.config";
import DropDownBranch from '../dropdown/DropDownBranch';
import DropDownGlobal from '../dropdown/DropDownGlobal';
import InputTextType from '../form/InputTypeText';
import DropDownStore from '../dropdown/DropDownStore';
import DropDownStation from '../dropdown/DropDownStation';
import AntiScrapedShieldComponent from '../shield/AntiScrapedShieldComponent';
 

interface FormToolsCommandProps {
    url: string,
    command: string,
    IDReport: string,
}

//-- component menu --//
const FormToolsCommand: React.FC<FormToolsCommandProps> = ({ url, command, IDReport }) => {
    const MySwal = withReactContent(Swal);
    const [isTextButton, setisTextButton] = useState(false);
    const [IN_CMB_KODE_CABANG,setKODE_CABANG] = useState("");
    const [active, setActive] = useState(true);
    const [LoadingOptionToko, setLoadingOptionToko] = useState(false);
    const [InputNIKPemohon,setInputNIKPemohon] = useState('')
    const [InputNAMAPemohon,setInputNAMAPemohon] = useState('')
    const [Divisi,setDivisi] = useState('')

    const [IN_HOST, setHOST] = useState('')
    const [IN_PORT, setPORT] = useState(0)
    const [options5,setOptions5] = useState([])
    const [optionsLokasi,setoptionsLokasi] = useState([])
    const [TOKO,setTOKO] = useState('')
    const [optionsToko,setoptionsToko] = useState([])
    const [STATION,setSTATION] = useState('')
    const [optionsStation,setoptionsStation] = useState([])
    
    const [LOKASI,setLOKASI] = useState('')
    const [IN_DETAIL_IP,set_IN_DETAIL_IP] = useState('')
    const [IN_DETAIL_COMMAND,set_IN_DETAIL_COMMAND] = useState('')
    const [Type,setType] = useState('')
    const [ResultCommand,setResultCommand] = useState('')
    const [HistoryCommand,setHistoryCommand] = useState('')
    const [ResponseMessage,setResponseMessage] = useState('')
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        const res_host = themeConfig.host
        const res_PORT_LOGIN = parseFloat(themeConfig.port_login)
        setHOST(res_host)
        setPORT(res_PORT_LOGIN)
        setHOST(res_host);
        const get_data = DecodeAES(get_data_local_storage('login'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
        const d = JSON.parse(get_data);
        const nik = d.nik;
        const nama = d.nama;
        const divisi = d.divisi
        setInputNIKPemohon(nik);
        setInputNAMAPemohon(nama);
        setDivisi(divisi);
        let arr_ = get_branch_code(false,false);
        setOptions5(arr_)
    }, [])

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const get_lokasi = (val:string) => {
        const get_data = get_data_local_storage('segment');
        const p_get_data = JSON.parse(get_data);
        let arr_ = []
        for(var i = 0;i<p_get_data.length;i++){
            var kdcab = p_get_data[i].kdcab;
            var label = p_get_data[i].label;
            var value = p_get_data[i].value;
            if(kdcab === val){
                const obj = {"label":label,"value":value}
                arr_.push(obj)
            }
            
        }
        setoptionsLokasi(arr_)
    } 
    const get_toko = (IN_KDCAB:string) => {
        //-- GET LIST TOKO --//
        const url = `http://${IN_HOST}:${IN_PORT}/store/v1/ViewCabang`;
        const param = {kdcab:IN_KDCAB};
        setLoadingOptionToko(true)
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
                            for(var b = 0;b<data_body.length;b++){
                                if(data_body[b].station.toString() === '01'){
                                    //console.log(data_body[b].station.toString().trim()+" VS "+station.trim())
                                    var arr_content = {
                                        'label':data_body[b].toko+':'+data_body[b].nama,
                                        'value':data_body[b].toko,
                                    };
                                    arr_concat.push(arr_content);
                                }else{
                                
                                }
                            }
                            setoptionsToko(arr_concat)
                            setLoadingOptionToko(false)
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
                            setLoadingOptionToko(false)
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setLoadingOptionToko(false)
                        }
                    }catch(Ex){
                        console.log(Ex.toString())
                        setLoadingOptionToko(false)
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
                setLoadingOptionToko(false)
                
            }
        );
                    
    }

    const userSelectToko = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            setTOKO('')
        }else{
            //console.log('value : '+JSON.stringify(value));
            setTOKO(value.value);
            const options6 = [
                { value: '01', label: '01' },
                { value: '02', label: '02' },
                { value: '03', label: '03' },
                { value: '04', label: '04' },
                { value: '05', label: '05' },
                { value: '06', label: '06' },
                { value: '07', label: '07' },
                { value: '08', label: '08' },
                { value: '09', label: '09' },
                { value: '10', label: '10' },
                { value: '12', label: '12' },{ value: '22', label: '22' },
                { value: 'I1', label: 'I1' },
            ];
            setoptionsStation(options6)
        }
    };

    const userSelectStation = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            setSTATION('')
        }else{
            //console.log('value : '+JSON.stringify(value));
            setSTATION(value.value);
        }
    };
    

    const userSelectKodeCabang = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            setKODE_CABANG('')
        }else{
            //console.log('value : '+JSON.stringify(value));
            setKODE_CABANG(value.value);
            //console.log(value.value)
            if(Type === 'office'){
                get_lokasi(value.value)
            }else{
                get_toko(value.value)
            }
            
        }
    };

    const userSelectLokasi = (value: any) => {
        //console.log(value);
        if(value.length == 0){
            setLOKASI('')
        }else{
            //console.log('value : '+JSON.stringify(value));
            setLOKASI(value.value);
        }
    };

    const FormInputIP = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        set_IN_DETAIL_IP(val);
    };
    
    const FormInputCommand = (event: {target: {value:any;};}) => {
        var val = event.target.value;
        set_IN_DETAIL_COMMAND(val);
    }

    const FormInputResult = (event: {target: {value:any;};}) => {
        var val = event.target.value;
        setResultCommand(val);
    }
    const FormHistoryCommand = (event: {target: {value:any;};}) => {
        var val = event.target.value;
        setHistoryCommand(val);
    }
    
    
    const HandleClick = async (idComponent:any,event:any,kdcab:string,kdtk:string,station:string,lokasi:string,ip:string,in_command:string) => {
        try{
            if (event.key === 'F9' || event === '') {
                setisTextButton(true)
                let in_counter = 0;
                start(in_counter, "timer");
                setResponseMessage('')
                if(Type === 'office'){
                    const res_lokasi = lokasi.split('|')[0]
                    const Token = GetToken()
                    console.log('in_command : '+in_command)
                    let res_command = await GetSignature(IN_HOST, IN_PORT, Token, in_command) as string
                    SendHandleRowClickOffice('cmd',IDReport,kdcab,kdtk,station,res_command,60,res_lokasi,ip,Token).then((response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        var rdata = res_data.data;
                        setResponseMessage('Res : '+code+'-'+msg.toString().toUpperCase())
                        //console.log(code+"-"+msg+"-"+rdata)
                    
                        const res_new = JSON.parse(rdata);
                        //console.log('OK')
                        for (var o = 0; o < res_new.length; o++) {
                            const ubah_json = JSON.stringify(res_new[o]);
                            const parse_data_inti = JSON.parse(ubah_json);
                            const res_data_msg = parse_data_inti.msg;
                            const res_data_code = parse_data_inti.code;
                            const res_request = parse_data_inti.timerequest;
                            const res_response = parse_data_inti.timerespons;
                            const res_kdcab = parse_data_inti.kdcab;
                            const res_lokasi = parse_data_inti.lokasi;
                            const res_id_report = parse_data_inti.idreport;
                            const res_computer_name = parse_data_inti.Computername;
                            const res_ip = parse_data_inti.ip;
                            const res_ping = parse_data_inti.ping;
                            const res_data = parse_data_inti.data;
                            setResultCommand(res_data)
                            setisTextButton(false);
                            
                            var history_cmd = HistoryCommand+in_command+'\r\n==============================\r\n';
                            setHistoryCommand(history_cmd);
                            stop();
                            set_IN_DETAIL_COMMAND('')

                            MySwal.fire({
                                title: code+'-'+msg,
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
                        
                    }).catch((error) => {
                        MySwal.fire({
                            title: error.toString(),
                            toast: true,
                            position: isRtl ? 'top-start' : 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            showCloseButton: true,
                            customClass: {
                                popup: `color-success`,
                            },
                        });
                        setisTextButton(false);   
                        stop();    
                    });
                }else{
                    const Token = GetToken()
                    let res_command = await GetSignature(IN_HOST, IN_PORT, Token, in_command) as string
                    SendHandleRowClick(IDReport,kdcab,kdtk,station,res_command,Token).then((response: any) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        var rdata = res_data.data;
                        setResponseMessage('Res : '+code+'-'+msg.toString().toUpperCase())
                        if(parseFloat(code) === 200){
                            var parse_data_inti = JSON.parse(rdata);
                            const res_data_code = parse_data_inti[0].code;
                            const res_data_msg = parse_data_inti[0].msg;
                            const res_request = parse_data_inti[0].timerequest;
                            const res_response = parse_data_inti[0].timerespons;
                            const res_kdcab = parse_data_inti[0].kdcab;
                            const res_kdtk = parse_data_inti[0].toko;
                            const res_nama = parse_data_inti[0].nama;
                            const res_station = parse_data_inti[0].station;
                            const res_ip = parse_data_inti[0].ip;
                            const res_data_inti = parse_data_inti[0].data;
                            //console.log('res_data_inti : '+res_data_inti)
                            setResultCommand(res_data_inti)
                            setisTextButton(false); 
                            var history_cmd = HistoryCommand+in_command+'\r\n==============================\r\n';
                            setHistoryCommand(history_cmd);
                            stop();
                            set_IN_DETAIL_COMMAND('')

                            MySwal.fire({
                                title: code+'-'+msg,
                                toast: true,
                                position: isRtl ? 'top-start' : 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                showCloseButton: true,
                                customClass: {
                                    popup: `color-success`,
                                },
                            });
                            setisTextButton(false); 
                        }else if(code.toString().substring(0,1) === '4'){
                            MySwal.fire({
                                title: msg.toString(),
                                toast: true,
                                position: isRtl ? 'top-start' : 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                showCloseButton: true,
                                customClass: {
                                    popup: `color-success`,
                                },
                            });
                            if(code === 401 && msg.includes("Invalid")){
                                handleLogout();
                            }
                            setisTextButton(false); 
                            stop();
                        }else{
                            MySwal.fire({
                                title: code+'-'+msg,
                                toast: true,
                                position: isRtl ? 'top-start' : 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                showCloseButton: true,
                                customClass: {
                                    popup: `color-success`,
                                },
                            });
                            setisTextButton(false);
                            stop();
                        }

                    }).catch((error) => {
                        MySwal.fire({
                            title: error.toString(),
                            toast: true,
                            position: isRtl ? 'top-start' : 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            showCloseButton: true,
                            customClass: {
                                popup: `color-success`,
                            },
                        });
                        setisTextButton(false);
                        stop();
                    });
                }
            }else{

            }
        }catch(Ex){
            MySwal.fire({
                title: Ex.toString(),
                toast: true,
                position: isRtl ? 'top-start' : 'top-end',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                },
            });
            stop();
        }    
            
    }

    const handleClickTipe = (in_type:string) => {
        setType(in_type)
        if(in_type === 'office'){
            setoptionsStation([])
            setoptionsToko([])
        }else{
            setKODE_CABANG('')
            setLOKASI('')
            setoptionsToko([])
            setoptionsStation([])
        }
    }

    return(
        <>
        <AntiScrapedShieldComponent in_content={
            <>
            {
                Divisi.includes('ADMINISTRATOR') ? 
                <>
                {/* FORM HASIL COMMAND */}
                <div className="flex items-end gap-3 justify-left">
                <div className="w-2/3">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="mt-3"><label htmlFor="dropdownLeftButton">Result</label></div>
                        
                        <div className="flex flex-row gap-3 mt-3 text-right ml-9">
                            <label htmlFor="dropdownLeftButton"><div className="sm:text-md">Waktu Eksekusi :</div></label>
                            <label htmlFor="dropdownLeftButton"><div id="timer" className="text-warning sm:text-md">00:00</div></label>
                            <label htmlFor="dropdownLeftButton" className="text-success sm:text-md">{ResponseMessage}</label>
                        </div>
                    </div>
                    
                    <div className=""> 
                        <textarea disabled={true}  rows={10} cols={50} placeholder="" onChange={FormInputResult} value={ResultCommand} className="text-sm text-white bg-black rounded-lg form-input" required></textarea>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="mt-3"><label htmlFor="dropdownLeftButton">History Command</label></div>
                    <div className=""> 
                    <textarea disabled={false}  rows={10} cols={50} placeholder="" onChange={FormHistoryCommand} value={HistoryCommand} className="text-sm text-white bg-black rounded-lg form-input" required></textarea>
                    </div>
                </div>
                </div>
                <div className="flex items-end justify-left">
                    {/* FORM INPUT COMMAND */}
                    <div className="mb-3 w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-3">
                        <div className="flex flex-col items-center p-2 sm:flex-row">
                            <div className="flex-1 pr-4 text-center ltr:sm:pl-4 rtl:sm:pr-1 sm:text-left">
                                <div className="flex flex-row gap-8">
                                    <div>
                                        <div className="mb-1"><label htmlFor="dropdownLeftButton">Tipe</label></div>
                                        <div className="mb-3">
                                            <div className="w-full">
                                            <label className="inline-flex">
                                                <input onChange={() => handleClickTipe('office')} type="radio" name="default_radio" value={'office'}  className="form-radio" />
                                                <span>Listener Office</span>
                                            </label>

                                            <label className="inline-flex ml-3">
                                                <input onChange={() => handleClickTipe('toko')} type="radio" name="default_radio"  value={'toko'}  className="form-radio text-success" />
                                                <span>Listener Toko</span>
                                            </label>
                                            </div>
                                        </div>
                                    </div>
                                    {Type === 'office' ? 
                                    <>
                                    <div>
                                      <DropDownBranch in_classname_title={"mb-1"} in_classname_content={'w-full'} data_options={options5} isSearchable={true} isMulti={false} event={userSelectKodeCabang} />
                                    </div>
                                    <div>
                                        <DropDownGlobal in_classname_title={"mb-1"} in_classname_content={'w-full'} data_options={optionsLokasi} isSearchable={true} isMulti={false} event={userSelectLokasi} name_component={'Location'} idComponent={''} />
                                    </div>
                                    <div>
                                        <InputTextType   in_title={'IP'} in_classname_title={'mb-1'} in_classname_content={'w-full'} in_classname_sub_content={'text-sm rounded-lg form-input'} data_options={[]} isDisabled={false} event={FormInputIP} in_value={IN_DETAIL_IP} />
                                    </div>
                                    </>
                                    : 
                                    <>
                                    <div>
                                      <DropDownBranch in_classname_title={"mb-1"} in_classname_content={'w-full'} data_options={options5} isSearchable={true} isMulti={false} event={userSelectKodeCabang} />
                                    </div>
                                    <div>
                                        <DropDownStore in_classname_title={"mb-1"} in_classname_content={'w-full'} data_options={optionsToko} isSearchable={true} isMulti={false} event={userSelectToko} />
                                    </div>
                                    <div>
                                        <DropDownStation in_classname_title={"mb-1"} in_classname_content={'w-full'} data_options={optionsStation} isSearchable={true} isMulti={false} isInduk={false} event={userSelectStation} />
                                    </div>
                                    </>
                                    }
                                
                                </div>

                                <div className="mb-1"><label htmlFor="dropdownLeftButton">Command</label></div>
                                <div className="mb-3">
                                    <div className="w-full">
                                        <textarea  rows={4} cols={50} placeholder="Ketik command"  onKeyDown={() => {
                                                                                HandleClick('btn_filter',event,IN_CMB_KODE_CABANG,TOKO,STATION,LOKASI,IN_DETAIL_IP,IN_DETAIL_COMMAND)
                                                                            }} 
                                                                            onChange={FormInputCommand} value={IN_DETAIL_COMMAND} className="text-xs rounded-lg form-input" required></textarea>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <div className="grid grid-cols-8 gap-1 mt-4 mb-4 sm:grid-cols-1">
                    
                                        <div className="flex">
                                            <button id="btn_filter" disabled={!active} 
                                                                            onClick={() => {
                                                                                HandleClick('btn_filter','',IN_CMB_KODE_CABANG,TOKO,STATION,LOKASI,IN_DETAIL_IP,IN_DETAIL_COMMAND)
                                                                            }}  type="button" className={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'}>
                                                
                                                {
                                                    isTextButton  ? 
                                                    <>
                                                    <span className="inline-block w-5 h-5 align-middle border-4 border-transparent rounded-full animate-spin border-l-white-light"></span>&nbsp;Mohon tunggu
                                                    </>
                                                    :
                                                    <>
                                                    <IconSend />&nbsp;Execute (F9)
                                                    </> 
                                                }
                                            </button>
                                            
                                        
                                        </div>
                                    </div>
                                
                                </div>
                            
                            </div>
                        </div>
                    
                    </div>
                </div>
                </>
                :
                <div className="relative flex items-center border p-3.5 rounded text-danger bg-danger-light border-danger ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-danger-dark-light">
                    <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                        <IconXCircle />
                    </span>
                    <span className="ltr:pr-2 rtl:pl-2">
                        <strong className="ltr:mr-1 rtl:ml-1">{t('Warning')}!</strong>{t('Access Denied')}
                    </span>
                </div>
            }
            </>
        } />
        </>
    )
};
export default FormToolsCommand;