import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IRootState } from '../../store';
import { toggleLocale, toggleTheme, toggleSidebar, toggleRTL, setToken, setIsAuthenticated,setMessageAuth } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import IconMenu from '@/components/Icon/IconMenu';
import IconLogout from '@/components/Icon/IconLogout';
import { get_data_local_storage, handleLogout } from '@/lib/global';
import IconLaptop from '../Icon/IconLaptop';
import IconMoon from '../Icon/IconMoon';
import IconSun from '../Icon/IconSun';
import { DecodeAES } from '../../lib/global';
import Dropdown from '../Dropdown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuApps from '../Icon/Menu/IconMenuApps';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuMore from '../Icon/Menu/IconMenuMore';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconSettings from '../Icon/IconSettings';
import IconBox from '../Icon/IconBox';
import IconCreditCard from '../Icon/IconCreditCard';
import IconBook from '../Icon/IconBook';
import IconTrendingUp from '../Icon/IconTrendingUp';
import IconDroplet from '../Icon/IconDroplet';
import IconPencil from '../Icon/IconPencil';

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [IN_DATA,setData] = useState([]);
    useEffect(() => {
        
        
        
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }

            let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
            for (let i = 0; i < allLinks.length; i++) {
                const element = allLinks[i];
                element?.classList.remove('active');
            }
            selector?.classList.add('active');

            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [router.pathname]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    
    const [flag, setFlag] = useState('');
    const { t, i18n } = useTranslation();
    const [IN_USERNAME,setUSERNAME] = useState('');

    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    useEffect(() => {
        setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
    });
    useEffect(() => {
        var menu = '';
        try{
            if (typeof window !== 'undefined' && window.localStorage) {
                // Perform localStorage action
                try{
                    menu = localStorage.getItem('lmenu');
                    //console.log(menu)
                    if(menu !== ''){
                        const data_menu_local = JSON.parse(menu)
                        const nama = get_data_local_storage('nama');
                        setUSERNAME(nama);
                        setData(data_menu_local)
                    }else{
                        dispatch(setMessageAuth(t('Error login, try again')))
                        router.push('/')
                    }
                }catch(Ex1){
                    console.log(Ex1.toString())
                    dispatch(setMessageAuth(t('User didn\'t Login')))
                    router.push('/')
                }
            }
        }catch(Ex){
            console.log('error : '+Ex.toString())
            dispatch(setMessageAuth('User tidak melakukan Login'))
            router.push('/')
        }
    }, []);

    const EvtLogout = () => {
        dispatch(setIsAuthenticated())
        dispatch(setMessageAuth(''))
        handleLogout()
    }

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

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''} `}>
            <div className="shadow-2xl">
                <div className="relative flex w-full items-center bg-primary  px-5 py-2.5 dark:bg-primary">
                    <div className="flex items-center justify-between horizontal-logo ltr:mr-2 rtl:ml-2 lg:hidden">
                        {/* <Link href="#" className="flex items-center main-logo shrink-0"> */}
                            {/* <img className="inline w-8 ltr:-ml-1 rtl:-mr-1" src="/assets/images/logo.svg" alt="logo" /> */}
                            <img className="w-28 ml-[5px] flex-none" src="/assets/images/idm_200_71.svg" alt="logo" />
                            <span className="hidden align-middle text-2xl  font-semibold  transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline text-white">Point of Sales | </span>
                        {/* </Link> */}
                        <button
                            type="button"
                            className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
                            <label className="mt-2 text-sm text-bold text-white-light">{t('Welcome')}, {IN_USERNAME}</label>
                        </div>
                        <div>
                            {themeConfig.theme === 'light' ? (
                                <button
                                    className={`${
                                        themeConfig.theme === 'light' &&
                                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => dispatch(toggleTheme('dark'))}
                                >
                                    <IconSun />
                                </button>
                            ) : (
                                ''
                            )}
                            {themeConfig.theme === 'dark' && (
                                <button
                                    className={`${
                                        themeConfig.theme === 'dark' &&
                                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => dispatch(toggleTheme('system'))}
                                >
                                    <IconMoon />
                                </button>
                            )}
                            {themeConfig.theme === 'system' && (
                                <button
                                    className={`${
                                        themeConfig.theme === 'system' &&
                                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => dispatch(toggleTheme('light'))}
                                >
                                    <IconLaptop />
                                </button>
                            )}
                        </div>
                        <div className="dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                button={flag && <img className="object-cover w-5 h-5 rounded-full" src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="flag" />}
                            >
                                <ul className="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                    {themeConfig.languageList.map((item: any) => {
                                        return (
                                            <li key={item.code}>
                                                <button
                                                    type="button"
                                                    className={`flex w-full hover:text-primary ${i18n.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                    onClick={() => {
                                                        dispatch(toggleLocale(item.code));
                                                        i18n.changeLanguage(item.code);
                                                        setLocale(item.code);
                                                    }}
                                                >
                                                    <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="object-cover w-5 h-5 rounded-full" />
                                                    <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Dropdown>
                        </div>
                        <div className="flex dropdown shrink-0">
                            <Link onClick={
                                    EvtLogout
                                } className="btn btn-outline-warning btn-sm text-white-light" href={'/'}>
                                <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />&nbsp;{t('Logout')}
                            </Link>    
                        </div>
                    </div>
                </div>

                {/* horizontal menu */}
                <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white px-6 py-1.5 font-semibold text-black rtl:space-x-reverse dark:border-[#191e3a] dark:bg-black dark:text-white-dark lg:space-x-1.5 xl:space-x-8">
                    <>
                    {
                    Object.keys(IN_DATA).map(
                        (key, i) => (
                            <li className="relative menu nav-item" key={i}>
                                <button type="button" className="nav-link">
                                    <div className="flex items-center">
                                        {
                                                IN_DATA[i].rootmenu.includes('DASHBOARD') ? 
                                                <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('MASTER DATA') ?
                                                <IconSettings className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('INVENTORY') ?
                                                <IconBox className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('SALES') ?
                                                <IconCreditCard className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('ACCOUNTING') ?
                                                <IconBook className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('REPORT SALES') ?
                                                <IconTrendingUp className="shrink-0 group-hover:!text-primary" />
                                                :
                                                IN_DATA[i].rootmenu.includes('REPORT INVENTORY') ?
                                                <IconDroplet className="shrink-0 group-hover:!text-primary" />
                                                :
                                                <IconPencil className="shrink-0 group-hover:!text-primary" />
                                        }
                                        <span className="px-1">{t(IN_DATA[i].rootmenu)}</span>
                                    </div>
                                    <div className="right_arrow">
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <ul className="sub-menu">
                                {
                                        
                                        Object.keys(IN_DATA[i].data).map(
                                            (key, b) => (
                                                <>
                                                {
                                                    IN_DATA[i].data[b].path != '' ?
                                                        //-- MENU --//
                                                        <>
                                                            <li className="text-xs">
                                                                <Link href={`${IN_DATA[i].data[b].path.toString().toLowerCase()}`}>{t(IN_DATA[i].data[b].menu.toString().toUpperCase())}</Link>
                                                            </li>
                                                        </>
                                                        :
                                                        //-- SUB MENU --//
                                                        ''
                                                }
                                                </>
                                            )
                                        )
                                }
                                </ul>
                                
                            </li>
                        )
                    )}
                    </>
                    {/* <li className="relative menu nav-item">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuDashboard className="shrink-0" />
                                <span className="px-1">{t('dashboard')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <Link href="/">{t('sales')}</Link>
                            </li>
                            <li>
                                <Link href="/analytics">{t('analytics')}</Link>
                            </li>
                            <li>
                                <Link href="/finance">{t('finance')}</Link>
                            </li>
                            <li>
                                <Link href="/crypto">{t('crypto')}</Link>
                            </li>
                        </ul>
                    </li> */}
                </ul>
            </div>
        </header>
    );
};

export default Header;
