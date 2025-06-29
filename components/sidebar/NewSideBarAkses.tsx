'use client'
import { useEffect, useState } from "react";
import router, { useRouter } from 'next/router';
import IconMenuForms from "../Icon/Menu/IconMenuForms";
import Link from "next/link";
import AnimateHeight from "react-animate-height";
import IconCaretDown from "../Icon/IconCaretDown";
import Swal from "sweetalert2";
import { isNull } from "lodash";
import config from '@/lib/config.json';
import {  get_data_local_storage, handleLogout } from "@/lib/global";
import IconDesktop from "../Icon/IconDesktop";
import IconPencil from "../Icon/IconPencil";
import IconBox from "../Icon/IconBox";
import IconSettings from "../Icon/IconSettings";
import IconShare from "../Icon/IconShare";
import IconLayoutGrid  from "../Icon/IconLayoutGrid";
import IconDownload from "../Icon/IconDownload";
import IconBarChart from "../Icon/IconBarChart";
import IconCpuBolt from "../Icon/IconCpuBolt";
import { DecodeAES } from '../../lib/global';
import { useTranslation } from "react-i18next";
import IconServer from "../Icon/IconServer";
import AntiScrapedShieldComponent from "../shield/AntiScrapedShieldComponent";

//-- component menu --//
const MenuItem = ({ name, route,icon }:{name:string,route:any,icon:any}) => {
    // Highlight menu item based on currently displayed route
    return (
        <li className="nav-item">
            <ul>
                <li className="nav-item">
                    <Link href={route} className="group">
                        <div className="flex items-center">
                            {icon}
                            <span className="text-black text-[10px] ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{name}</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </li>       

    )
}


export default function NewSidebarAkses() {
    const [isClient, setIsClient] = useState(false);
    const [IN_DATA,setData] = useState([]);
    const [showChild, setShowChild] = useState(false);
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [sub_currentMenu, setsub_currentMenu] = useState<string>('');
    const [IN_HOST, setHOST] = useState('');
    const [IN_PORT_ADMINISTASI, setPortAdministrasi] = useState('');
    const [IN_PORT_LOGIN, setPortLogin] = useState('');
    const [IN_PORT_LISTENER, setPortListener] = useState('');
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const toggleSubMenu = (value: string) => {
        setsub_currentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    
    

    const get_menu_api = () => {
        const d_menu = get_data_local_storage('lmenu');
        var rconfig = JSON.stringify(config);
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;

        if(d_menu == '' || isNull(d_menu)){
            try{
                handleLogout()
            }catch(Ex){
                Swal.fire({
                    icon: 'warning',
                    padding: '2em',
                    title: t("Warning"),
                    text: "Error : "+Ex.toString(),
                    customClass: 'sweet-alerts',
                    timer: 4000,
                    timerProgressBar: true,
                    showCancelButton: false,
                    showConfirmButton: false
                });
            }
         
        }else{
            //console.log('not save menu')
            const arr_d_menu = JSON.parse(d_menu)
            //console.log('arr_d_menu : '+JSON.stringify(arr_d_menu))
            setData(arr_d_menu)
        }

       

    };
    const { t, i18n } = useTranslation();
     //-- construct --//            
     useEffect(() => {
        setIsClient(true);
        get_menu_api()
    }, []);
    //-- return object component --//
    return (
        <>
            <AntiScrapedShieldComponent in_content={
                <>
                {
                    Object.keys(IN_DATA).map(
                        (key, i) => (
                            
                            <div key={i} className="mt-1">
                            
                            <ul className="relative space-y-0.5 p-4 py-0">
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === IN_DATA[i].rootmenu ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu(IN_DATA[i].rootmenu)}>
                                        <div className="flex items-center ">
                                            {
                                                IN_DATA[i].rootmenu.includes('DASHBOARD') ? 
                                                <IconDesktop className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('SETTING') ?
                                                <IconSettings className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('SPESIAL') ?
                                                <IconBox className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('HARDWARE') ?
                                                <IconCpuBolt className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('NETWORK') ?
                                                <IconShare className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('SOFTWARE') ?
                                                <IconLayoutGrid className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('DOWNLOAD') ?
                                                <IconDownload className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('OFFICE') ?
                                                <IconBarChart className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('SERVER') ?
                                                <IconServer className="shrink-0 group-hover:!text-primary" />
                                                :
                                                <IconPencil className="shrink-0 group-hover:!text-primary" />
                                            }
                                            
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark text-sm">{t(IN_DATA[i].rootmenu)}</span>
                                        </div>

                                        <div className={currentMenu !== IN_DATA[i].rootmenu  ? '-rotate-90 rtl:rotate-90' : ''}>
                                            <IconCaretDown />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === IN_DATA[i].rootmenu ? 'auto' : 0}>
                                    {
                                        Object.keys(IN_DATA[i].data).map(
                                            (key, b) => (
                                                <>
                                                {
                                                    IN_DATA[i].data[b].path != '' ?
                                                        //-- MENU --//
                                                        <>
                                                            <div key={b}>
                                                            <MenuItem name={t(IN_DATA[i].data[b].menu.toString().toUpperCase())} route={`/apps${IN_DATA[i].data[b].path.toString().toLowerCase()}`} icon={<IconMenuForms className="ml-2 shrink-0 group-hover:!text-primary" />}/> 
                                                            </div>
                                                        </>
                                                        : 
                                                        //-- SUB MENU --//
                                                        <li key={b} className="menu nav-item">
                                                                    <button type="button" className={`${sub_currentMenu === IN_DATA[i].data[b].menu ? 'active' : ''} nav-link group w-full`} onClick={() => toggleSubMenu(IN_DATA[i].data[b].menu)}>
                                                                        <div className="flex items-center">
                                                                            <IconMenuForms className="ml-2 shrink-0 group-hover:!text-primary" />
                                                                            <span className="text-black text-[10px]  ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t(IN_DATA[i].data[b].menu.toString().toUpperCase())}</span>
                                                                        </div>
                                                                        <div className={sub_currentMenu !== IN_DATA[i].data[b].menu ? '-rotate-90 rtl:rotate-90' : ''}>
                                                                            <IconCaretDown />
                                                                        </div>
                                                                    </button>
                                    
                                                                    <AnimateHeight duration={300} height={sub_currentMenu === IN_DATA[i].data[b].menu ? 'auto' : 0}>
                                                                        <ul className="text-gray-500 sub-menu">
                                                                            {
                                                                                Object.keys(IN_DATA[i].data[b].sub_menu).map(
                                                                                    (key,c) => (
                                                                                        <div className="flex place-items-start">
                                                                                            {
                                                                                                IN_DATA[i].data[b].menu.toString().substring(4,IN_DATA[i].data[b].menu.toString().length).split(' ').join('') === IN_DATA[i].data[b].sub_menu[c].menu.toString().split(' ').join('') ? 
                                                                                                    <MenuItem name={t(IN_DATA[i].data[b].sub_menu[c].nama.toString().toUpperCase())} 
                                                                                                        route={`/apps${IN_DATA[i].data[b].sub_menu[c].path.toString().toLowerCase()}`}
                                                                                                        icon={''}
                                                                                                    />
                                                                                                : 
                                                                                                ''
                                                                                            }
                                                                                        </div>
                                                                                    )
                                                                                )
                                                                            }
                                                                        </ul>
                                                                    </AnimateHeight>                                            
                                                        </li>
                                                }
                                                </>
                                            )
                                        )
                                    }
                                    </AnimateHeight>
                                </li>
                            </ul>
                        
                            
                            
                            </div>
                        )
                    )
                }
                </>
            } />
        </>
    )
}