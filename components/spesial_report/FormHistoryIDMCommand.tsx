'use client'
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import DataTables from "../table/DataTables";
import config from '@/lib/config.json';
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { AddID, ConvertDateFormat, get_format_tanggal_jam, get_format_tanggal_jam_substract, groupByMessageListeners, groupByValueAndCount, handleLogout, millisToMinutesAndSeconds, setTombolAmbilDataGagal, start, stop,groupByValueAndCount2, removeItemByValue_ForMultidimensi, get_dateTimeDiff_second, get_branch_code, GetToken, GetTokenRND } from "@/lib/global";
import { Posts } from "@/lib/post";
import 'flatpickr/dist/flatpickr.css';
import { createTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import DropDownBranch from '../dropdown/DropDownBranch';
import DropDownStore from "../dropdown/DropDownStore";
import DropDownGlobal from "../dropdown/DropDownGlobal";
import DatePicker from "../datepicker/DatePicker";
import InputTextType from "../form/InputTypeText";
import ButtonFilter from "../button/ButtonFilter";
import IconSend from "../Icon/IconSend";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";

interface FormHistoryIDMCommandProps {
    url: string,
    command: string,
    IDReport: string,
}

const FormHistoryIDMCommand: React.FC<FormHistoryIDMCommandProps> = ({ url, command, IDReport }) => {
    const [IN_CMB_KODE_CABANG, setKODE_CABANG] = useState("");
    const [data_rows, setData_rows] = useState([]);
    const [data_columns, setData_columns] = useState([]);
    const [columnGroupingModel,setcolumnGroupingModel] = useState([]);
    const [active, setActive] = useState(true);
    const [progressbar, setProgress] = useState('');
    
    const [option_form_toko,setoption_form_toko] = useState([]);
    const [FormKodeToko,setFormKodeToko] = useState('');
    const [Formtugas,setFormTugas] = useState('');
    const curdate_sub_1_hour = get_format_tanggal_jam_substract(1).substring(0,16);
    const curdate = get_format_tanggal_jam().substring(0,16);
     
    const [date2, setDate2] = useState<any>(curdate_sub_1_hour);
    const [date3, setDate3] = useState<any>(curdate);
    const [IN_NIK,setIN_NIK] = useState('');
    const [FormSumber,setFormSumber] = useState('');
    const [Visible,setVisible] = useState(false);
    const [IN_HOST, setHOST] = useState('');
    const [HOST_API_RND, setHOST_API_RND] = useState('');
    const [options5,setOption5] = useState([]);const { t, i18n } = useTranslation();
    const [isTextButton,setisTextButton] = useState(false)
    const [IsValMulti,setIsValMulti] = useState(true);

    var options4 = [{ value: '', label: '-- '+t('All')+' --' },{ value: 'IDMCommander', label: 'IDMCommander' },{ value: 'IDMCommandListeners', label: 'IDMCommandListeners' },];
    var options_tugas = [{ value: '', label: '-- '+t('All')+' --' },{ value: 'COMMAND', label: 'COMMAND' },{ value: 'SQL', label: 'SQL' },{ value: 'CHAT', label: 'CHAT' },{ value: 'VNC', label: 'VNC' },{ value: 'PING', label: 'PING' },{ value: 'UPLOAD', label: 'UPLOAD' },{ value: 'DOWNLOAD', label: 'DOWNLOAD' },{ value: 'BC_COMMAND', label: 'BC_COMMAND' },{ value: 'BC_SQL', label: 'BC_SQL' },{ value: 'BC_MESSAGE', label: 'BC_MESSAGE' },{ value: 'TUTUP_SHIFT_ULANG', label: 'TUTUP_SHIFT_ULANG' },{ value: 'CLOSING_HARIAN_ULANG', label: 'CLOSING_HARIAN_ULANG' },{ value: 'R-SQLITE', label: 'R-SQLITE' },{ value: 'KONEK RB', label: 'KONEK RB' },{ value: 'MTC', label: 'MTC' }];

    useEffect(() => {
        var rconfig = JSON.stringify(config);
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;
        const res_host_rnd = (config.api as any).HOSTNAME_API_RND;
        setHOST_API_RND(res_host_rnd);
        setHOST(res_host);
        let arr_cabang = get_branch_code(false,false);
        setOption5(arr_cabang)
    },[]);

    const GetTokoByBranch = (in_kdcab:string) =>{
        try{
            const url = `http://${IN_HOST}:7321/store/v1/ViewCabang`;
            const param = {kdcab:in_kdcab};
            const Token = GetToken()
            Posts(url,JSON.stringify(param),false,Token).then(
                    (response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        try{
                            if(parseFloat(code) === 200){
                                var data_body = JSON.parse(res_data.data);
                                var res_data_rows_body = [];
                                if(IsValMulti){
                                    var arr_content1 = {
                                        'label':'-- '+t('All Store')+' --',
                                        'value':'',
                                    };
                                    res_data_rows_body.push(arr_content1);
                                }else{
                                    
                                }
                                for(var b = 0;b<data_body.length;b++){
                                    if(data_body[b].station.toString() === '01'){
                                        var arr_content = {
                                            'label':data_body[b].toko+':'+data_body[b].nama,
                                            'value':data_body[b].toko+':'+data_body[b].ip,
                                        };
                                        res_data_rows_body.push(arr_content);
                                    }else{
                                       
                                    }
                                }
                                setoption_form_toko(res_data_rows_body);
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
                
            );
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error Get Toko : "+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            }); 
        }
    }
    
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
            var arr_concat = [];           
            var arr_content1 = {
                'label':'-- '+t('All Store')+' --',
                'value':'%',
            };
            arr_concat.push(arr_content1);
            setoption_form_toko(arr_concat);
        }else{
            if(value.value.length > 4){
                Swal.fire({
                    title: t("Warning"),
                    text: t('Warning')+" : "+t('Select Branch Code')+" !",
                    icon: "error",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }else{
               GetTokoByBranch(value.value)
            }
        }
    };

    const userSelectNik = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        const re = /^[0-9\b]+$/;
        if (val=== '' || re.test(val)) {
           setIN_NIK(val);
        }
       
    }

    const userFormSelectKodeToko = (value: any) => {
        if(JSON.stringify(value).includes('All') || JSON.stringify(value).includes('Semua')){
            setFormKodeToko('');
        }else{
            const kdtk = value.value.toString().split(':')[0];
            setFormKodeToko(kdtk);
        }
        setActive(true);
    };

    const userSelectSumber = (value:any) => {
        if(JSON.stringify(value).includes('All') || JSON.stringify(value).includes('Semua')){
            setFormSumber('');
        }else{
            setFormSumber(value.value);
        }
    }

    const userSelectTugas = (value:any) => {
        if(JSON.stringify(value).includes('All') || JSON.stringify(value).includes('Semua')){
            setFormTugas('');
        }else{
            setFormTugas(value.value);
        }
    }

    const userSelectTipeFilter = (event: { target: { value: any; }; }) => {
        var val = event.target.value;
        if(val === 'per_cabang'){
            setIsValMulti(true);
            var res_data_rows_body = [];
            if(IsValMulti){
                var arr_content1 = {
                    'label':'-- '+t('All Store')+' --',
                    'value':'',
                };
                res_data_rows_body.push(arr_content1);
                console.log('kondisi 1')
            }else{
                console.log('kondisi 2')
            }
            setoption_form_toko(res_data_rows_body);
        }else{
            setIsValMulti(false);
           
        }
    }
    
    const GetHistoryLogIDMCommand = () => {
        try{
            const kdcab =  (FormKodeToko === '' ? IN_CMB_KODE_CABANG : '%')
            const task = Formtugas
            const source = (FormSumber === '' ? '%' : FormSumber)
            const tgl_awal = ConvertDateFormat(date2,false)
            const tgl_akhir = ConvertDateFormat(date3,false)
            const nik = (IN_NIK === '' ? '%' : IN_NIK)
            const toko = (FormKodeToko === '' ? '%' : FormKodeToko)
            const param = {"IN_KODE_CABANG":kdcab,"IN_TASK":task,"IN_SOURCE":source,"IN_TANGGAL_AWAL":tgl_awal,"IN_TANGGAL_AKHIR":tgl_akhir,"IN_NIK":nik,"IN_KODE_TOKO":toko}
            let url = `http://${HOST_API_RND}:4646/user/IDMConsole/GetHistoryLogIDMCommand`;
            setisTextButton(true)
            setVisible(false)
            const TokenRND = GetTokenRND()
            Posts(url,JSON.stringify(param),false,TokenRND).then((response) => {
                        const res_data = response;
                        var code = res_data.code;
                        var msg = res_data.msg;
                        if(parseFloat(code) === 200){
                            var data_body = res_data.data
                            var rows = data_body[0].ROWS
                            var cols = data_body[0].COLUMNS
                            var res_rows = AddID(rows)
                            setData_rows(res_rows) 
                            setData_columns(cols)
                            setisTextButton(false)
                            setVisible(true)
                        }else if(code.toString().substring(0,1) === '4'){
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });

                            if(msg.includes('Token')){
                                handleLogout();
                            }
                            setisTextButton(false)
                            setVisible(false)
                        }else{
                            Swal.fire({
                                title: t("Warning"),
                                text: ""+parseFloat(code)+"-"+msg,
                                icon: "warning",
                                padding: '2em',
                                customClass: 'sweet-alerts'
                            });
                            setisTextButton(false)
                            setVisible(false)
                        } 
            }).catch((error) => {
                Swal.fire({
                    title: t("Warning"),
                    text: "Error :"+t('Check your connection or call administrator'),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setisTextButton(false)
                setVisible(false)
            });
        }catch(Ex){
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+Ex.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setisTextButton(false)
            setVisible(false)
        }
    }
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                    <div className="grid gap-3">
                        <div className="row-span-3 mb-3 w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none mt-10">
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
                                        <div className="grid grid-cols-2 gap-3 mt-10">
                                            <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Filter Type')}</label></div>
                                            <div className="mb-3">
                                                <div className="w-full">
                                                <label className="flex items-center cursor-pointer">
                                                    <div>
                                                        <label className="flex items-center cursor-pointer">
                                                            <input onChange={userSelectTipeFilter} type="radio" name="custom_radio2" className="form-radio" value={'per_cabang'} defaultChecked />
                                                            <span className="text-white-dark">{t('Branch Code')}</span>
                                                        </label>
                                                    </div>
                                                    <div className="ml-5">
                                                        <label className="flex items-center cursor-pointer">
                                                            <input onChange={userSelectTipeFilter} type="radio" name="custom_radio2" className="form-radio" value={'per_toko'} />
                                                            <span className="text-white-dark">{t('Store')}</span>
                                                        </label>
                                                    </div>
                                                </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <DropDownBranch in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={options5} isSearchable={true} isMulti={  (IsValMulti ? true : false ) } event={userSelectKodeCabang} />
                                            </div>
                                            <div>
                                                <DropDownStore in_classname_title={"mb-1"} in_classname_content={"w-full"} data_options={option_form_toko} isSearchable={true} isMulti={false} event={userFormSelectKodeToko} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <DatePicker in_mode={'single'} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg"} event={(date2) => setDate2(date2)} name_component={"End Periode"} idComponent={"txt_end_periode"} isRtl={isRtl} in_date={date2} isEnableTime={false} date_format={"Y-m-d"} />
                                            </div>
                                            <div>
                                                <DatePicker in_mode={'single'} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg"} event={(date3) => setDate3(date3)} name_component={"End Periode"} idComponent={"txt_end_periode"} isRtl={isRtl} in_date={date3} isEnableTime={false} date_format={"Y-m-d"} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            <InputTextType   in_title={"Nik User"} in_classname_title={"mb-1"} in_classname_content={"w-full"} in_classname_sub_content={"form-input rounded-lg text-xs"} data_options={undefined} isDisabled={false} event={userSelectNik} in_value={IN_NIK} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <div>
                                                <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options4} isSearchable={true} isMulti={false} event={userSelectSumber} name_component={"Resources"} idComponent={"cmb_resources"} />
                                            </div>
                                            <div>
                                                <DropDownGlobal in_classname_title={"mb-3"} in_classname_content={"w-full"} data_options={options_tugas} isSearchable={true} isMulti={false} event={userSelectTugas} name_component={"Task"} idComponent={"cmb_tugas"} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="flex">
                                                <ButtonFilter in_icon={<IconSend />} in_title_button={'Process'} in_classname={!isDark ? 'btn btn-primary w-full rounded-full text-end text-xs' : 'btn btn-outline-primary w-full rounded-full text-xs'} idComponent={"btn_filter"} isLoading={isTextButton} isDisabled={false} HandleClick={GetHistoryLogIDMCommand} />
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        Visible ? 
                        <div>
                            <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, ID: false }} jenis_laporan={'Report Log IDMCommander'} data_rows={data_rows} data_columns={data_columns} isLoading={false} progressbar={progressbar} field_auto_sorting={'LAST_REPORT'} type_sorting={'desc'} iscolumns_grouping={true} arr_columnGroupingModel={columnGroupingModel} isHiddenID={false} timelapsed={get_dateTimeDiff_second(new Date(null), new Date(null))} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} in_csvOptions={true} in_printOptions={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_prosentase_progress={0} in_rows_spanning={false} />
                        </div>
                        :
                        ''
                    }
                </>
            } />
        </>
    )
}
export default FormHistoryIDMCommand;