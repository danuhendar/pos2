'use client'
import { Posts } from "@/lib/post";
import { useRouter } from 'next/router';
import Swal from "sweetalert2";
import { encryptString, handleSave } from "@/lib/global";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import { setIsAuthenticated } from "@/store/themeConfigSlice";
import { useTranslation } from "react-i18next";
import AntiScrapeShield from "anti-scrape-shield";
import AntiScrapedShieldComponent from "./shield/AntiScrapedShieldComponent";

interface ButtonLoginProps{
    url: string,
    param: string,
    idComponent:string,
    idAlert:string,
    isBot:boolean
}

const ButtonLogin: React.FC<ButtonLoginProps> = ({url,param,idComponent,idAlert,isBot}) => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const host = useSelector((state: IRootState) => state.themeConfig.host);
    const host_rnd = useSelector((state: IRootState) => state.themeConfig.hostrnd);
    const port_login = useSelector((state: IRootState) => state.themeConfig.port_login);
    const isHuman = useSelector((state: IRootState) => state.themeConfig.isHuman);
    
    const authRND = (in_nik:string) => {
        //console.log('host_rnd : '+host_rnd)
        let url_rnd = `http://${host}:${port_login}/`;
        let param = JSON.stringify({"IN_USERNAME":in_nik})
        Posts(url_rnd,param,true,'').then((response) => {
            var res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                const p_content = res_data.data
                const data_token = p_content.TOKEN
                const en_data_token = encryptString(data_token,'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
                handleSave('ot',en_data_token,false)
                handleSave('rot',p_content.REFRESH_TOKEN,false)
                handleSave('lmenu',JSON.stringify(p_content.MENU),false)
                handleSave('nik',p_content.NIK,false)
                handleSave('nama',p_content.NAMA,false)
                handleSave('unit',p_content.UNIT,false)
                handleSave('bagian',p_content.BAGIAN,false)
                handleSave('id_periode',p_content.ID_PERIODE,false)
                handleSave('menu','horizontal',false)
                router.push('/utama');
            }else{
                Swal.fire({
                    title: t("Warning"),
                    text: "Error AuthService : "+code+"-"+msg,
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }
        }).catch((error) => {
            Swal.fire({
                title: t("Warning"),
                text: "Error AuthService : "+error.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        });
    }
    const auth = (url:string,param:string,token:string) => {
        const myExample = document.getElementById(idComponent);
        const parse_param = JSON.parse(param);
        Posts(url,param,false,token).then((response) => {
            var res_data = response;
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                const data_api = res_data.data;
                const parse_data = JSON.parse(data_api);
                const ubah_json = JSON.stringify(parse_data);
                const c = JSON.parse(ubah_json);
                const d = c.Menu;
                const e = d;
                const parse_e = JSON.parse(e);
                const menu =  parse_e.Menu;
                var arr_rootmenu = [];
                var arr_menu = [];
                var arr_path = [];
                var arr_sub_menu = [];
                var res_rootmenu = '';
                var res_menu = '';
                for(var i = 0;i<menu.length;i++){
                    if(menu[i].rootmenu !== res_rootmenu){
                        arr_rootmenu.push(menu[i].rootmenu);
                    }else{

                    }
                    
                    if(menu[i].arr_menu !== menu){
                        arr_menu.push(menu[i].rootmenu.substring(0,1)+"."+menu[i].menu.split('.').join(' '));
                        arr_path.push(menu[i].path);
                        arr_sub_menu.push(menu[i].submenu);
                    }else{

                    }

                    res_rootmenu = menu[i].rootmenu;
                    res_menu = menu[i].menu;
                }

                var sort_rootmenu = arr_rootmenu.sort();
                arr_rootmenu = [];
                for(var r = 0;r<sort_rootmenu.length;r++){
                    if(sort_rootmenu[r] !== res_rootmenu){
                        arr_rootmenu.push(sort_rootmenu[r]);
                    }else{

                    }

                    res_rootmenu = sort_rootmenu[r];
                }
                sort_rootmenu = arr_rootmenu;
                var res_arr_rootmenu = [];
                for(var k = 0;k<sort_rootmenu.length;k++){
                    var root_menu = sort_rootmenu[k].substring(0,1);
                    var arr_concat_record_menu = [];
                    var arr_concat_record_sub_menu = [];
                    var data_sub_menu: any[] = [];
                    var counter = 1;
                    for(var l = 0;l<arr_menu.length;l++){
                        var arr_menu_temp_for_sort = [];
                        var a = arr_menu[l].substring(0,1);
                        var b = arr_menu[l].substring(0,4).substring(0,4).split(' ').join('').split('.').join('');
                        if(a === root_menu){
                            //-- submenu --//
                            if((arr_menu[l] === arr_menu[l+1])){
                                var arr_record_sub_menu = {nama:arr_sub_menu[l],path:arr_path[l],kode_menu:arr_menu[l].substring(0,4).split(' ').join('').split('.').join(''),menu:arr_menu[l].substring(4,arr_menu[l].length)};
                                data_sub_menu.push(arr_record_sub_menu);
                            //-- menu --//    
                            }else{
                                var data_path = '';
                                if(arr_sub_menu[l] === ''){
                                    data_path = arr_path[l];
                                    data_sub_menu = [];
                                }else{
                                    data_path = '';
                                    var arr_record_sub_menu = {nama:arr_sub_menu[l],path:arr_path[l],kode_menu:arr_menu[l].substring(0,4).split(' ').join('').split('.').join(''),menu:arr_menu[l].substring(4,arr_menu[l].length)};
                                    data_sub_menu.push(arr_record_sub_menu);
                                }
                                const search_item = ' ';
                                const index_start = arr_menu[l].indexOf(search_item);
                                const nama_menu = (b)+" "+
                                                    arr_menu[l].substring(index_start,arr_menu[l].length);
                                
                                var arr_record_menu = {menu:nama_menu,path:data_path,sub_menu:data_sub_menu};
                                arr_concat_record_menu.push(arr_record_menu);
                                counter = counter + 1;
                            }
                        }else{

                        }
                    }
                    var srt_arr_record_menu = arr_concat_record_menu.sort((a, b) => {
                        if (a.menu > b.menu) {
                          return 1;
                        } else if (a.menu < b.menu) {
                          return -1;
                        } else if ( a.menu > b.menu){
                          return 1;
                        } else if (a.menu < b.menu) {
                          return -1;
                        } else if (a.menu > b.menu) {
                          return 1;
                        } else if (a.menu < b.menu) {
                          return -1;
                        }
                        return 0;
                    });
                    var record_rootmenu = {rootmenu:sort_rootmenu[k],data:srt_arr_record_menu};
                    res_arr_rootmenu.push(record_rootmenu);
                }
                const save_menu = encryptString(JSON.stringify(res_arr_rootmenu),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
                handleSave('lmenu',save_menu,false)
                const Identitas_user = c.user;
                const parse_Identitas_user = JSON.parse(Identitas_user);
                const identitas_nik = parse_Identitas_user.nik;
                const identitas_nama = parse_Identitas_user.nama;
                const identitas_jabatan = parse_Identitas_user.jabatan;
                const identitas_lokasi = parse_Identitas_user.lokasi;
                const identitas_divisi = parse_Identitas_user.divisi;
                const identitas_branch = parse_Identitas_user.branch;
                const p_Identitas_branch = JSON.parse(identitas_branch);
                const arr_data_login = {'nik':identitas_nik,'nama':identitas_nama,'jabatan':identitas_jabatan,'lokasi':identitas_lokasi,"branch":p_Identitas_branch[0].kode,"divisi":identitas_divisi};
                const en_arr_data_login = encryptString(JSON.stringify(arr_data_login),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
                handleSave('login',en_arr_data_login,false);
                const res_status_nik = c.user;
                const res_data_status_nik = JSON.parse(res_status_nik);
                
                var options_cabang = [];
                const parse_branch_code = JSON.parse(res_data_status_nik.branchCoverage);
                //-- all cabang --//
                var list_kdcab = [];
                for(var x = 0;x<parse_branch_code.length;x++){
                    if(parse_branch_code[x].kode.substring(0,1) === 'G'){
                        var arr1 = parse_branch_code[x].kode;
                        list_kdcab.push(arr1);
                    }else{
        
                    }
                }
                var arr = {value:list_kdcab,label:'-- Semua --'};
                options_cabang.push(arr);
                //-- per cabang --//
                for(var z = 0;z<parse_branch_code.length;z++){
                    if(parse_branch_code[z].kode.substring(0,1) === 'G'){
                        const nama = parse_branch_code[z].nama;
                        const kode = parse_branch_code[z].kode;
                        const obj_cabang = {'value':kode,'label':nama};
                        options_cabang.push(obj_cabang);
                    }else{
        
                    }
                }
                var en_branch_coverage = encryptString(JSON.stringify(options_cabang),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
                handleSave('branch_coverage',en_branch_coverage,false);
                //-- segment --//
                let arr_segment = [];
                const parse_data_segment = JSON.parse(c.Segment);
                for(var n = 0;n<parse_data_segment.length;n++){
                    const lokasi = parse_data_segment[n].lokasi
                    const segment = parse_data_segment[n].segment
                    const kdcab = parse_data_segment[n].kdcab
                    const obj = {"label":lokasi,"value":lokasi+'|'+segment,"kdcab":kdcab}
                    arr_segment.push(obj)
                }
                handleSave('segment',JSON.stringify(arr_segment),false)
                router.push('/idmcommand');
            }else{
                Swal.fire({
                    title: t("Warning"),
                    text: ""+code+"-"+msg,
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                myExample.innerHTML = t('Login');
            }
        }).catch((error) => {
            myExample.innerHTML = t('Login');
            Swal.fire({
                title: t("Warning"),
                text: "Error : "+error.toString(),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        });
    }
    const HandleClick = () => {
        const myExample = document.getElementById(idComponent);
        if(isBot){
            myExample.innerHTML = t('Login')
            Swal.fire({
                title: t("Warning"),
                text: t("Access Denied"),
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }else{
            if(isHuman){
                const parse_param = JSON.parse(param)
                const nik_param = parse_param.IN_USERNAME
                myExample.innerHTML = '<svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>&nbsp;'+t('Please Wait')
                Posts(url,param,true,'').then((response) => {
                    const res_data = response;
                    var code = res_data.code;
                    if(parseFloat(code) === 200){
                        if (typeof window !== "undefined" && window.localStorage) {
                            const data_api = res_data.data;
                            console.log('menu : '+JSON.stringify(data_api.MENU))
                            const en_token = encryptString(data_api.TOKEN,'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
                            const en_refresh_token = encryptString(data_api.REFRESH_TOKEN,'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN')
                            handleSave('ot',en_token,false)
                            handleSave('rot',en_refresh_token,false)
                            handleSave('lmenu',JSON.stringify(data_api.MENU),false)
                            handleSave('nik',data_api.NIK,false)
                            handleSave('nama',data_api.NAMA,false)
                            handleSave('unit',data_api.UNIT,false)
                            handleSave('bagian',data_api.BAGIAN,false)
                            handleSave('id_periode',data_api.ID_PERIODE,false)
                            handleSave('menu','horizontal',false)
                            dispatch(setIsAuthenticated());
                            router.push('/utama');
                        }
                    }else if(code.toString().substring(0,1) === '4'){
                        const msg = res_data.msg;
                        myExample.innerHTML = t('Login')
                        Swal.fire({
                            title: t("Warning"),
                            text: ""+parseFloat(code)+"-"+msg,
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    }else{
                        myExample.innerHTML = t('Login')
                        Swal.fire({
                            title: t("Warning"),
                            text: "Error code 0, Hubungi administrator",
                            icon: "warning",
                            padding: '2em',
                            customClass: 'sweet-alerts'
                        });
                    } 
                }).catch((error) => {
                    myExample.innerHTML = t('Login')
                    Swal.fire({
                        title: t("Warning"),
                        text: "Error : "+error.toString(),
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                });
            }else{
                myExample.innerHTML = t('Login')
                Swal.fire({
                    title: t("Warning"),
                    text: t("Access Denied"),
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
            }
        }
        
    }
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <button id={idComponent} onClick={() => {
                    HandleClick()
                }} type="submit" className="btn bg-green-700 text-white !mt-3 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] rounded-3xl">
                    {t('Login')}
                </button>
            } />
        </>
    )
}
export default ButtonLogin