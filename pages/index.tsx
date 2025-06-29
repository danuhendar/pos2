import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setHost, setHostRnd, setisHuman, setPageTitle, setPortAdministasi, setPortListener, setVersiApp, toggleRTL } from '../store/themeConfigSlice';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import { IRootState } from '@/store';
import { useTranslation } from 'react-i18next';
import IconMail from '@/components/Icon/IconMail';
import IconLockDots from '@/components/Icon/IconLockDots';
import ButtonLogin from '@/components/ButtonLogin';

import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import AntiScrapedShieldComponent from '@/components/shield/AntiScrapedShieldComponent';
import { GetID } from '@/lib/global';
import IconUser from '@/components/Icon/IconUser';

const LoginCover = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const host = useSelector((state: IRootState) => state.themeConfig.host);
    const hostrnd = useSelector((state: IRootState) => state.themeConfig.hostrnd);
    const port_login = useSelector((state: IRootState) => state.themeConfig.port_login);
    const port_administrasi = useSelector((state: IRootState) => state.themeConfig.port_administrasi);
    const port_listener = useSelector((state: IRootState) => state.themeConfig.port_listener);
    const versi_app = useSelector((state: IRootState) => state.themeConfig.versi_app);
    const [getnavigator,setnavigator] = useState(false)
    const MySwal = withReactContent(Swal);

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState('');
    useEffect(() => {
        dispatch(setPageTitle('POS'))
        setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
        const msgauth = themeConfig.MessageAuth
        if(msgauth !== ''){
            MySwal.fire({
                title: msgauth,
                toast: true,
                position: isRtl ? 'top-start' : 'top-end',
                showConfirmButton: false,
                icon: 'warning',
                iconColor: '#fff',
                timer: 10000,
                showCloseButton: true,
                customClass: {
                    popup: `color-danger`,
                },
            });
        }else{
            dispatch(setHost(host))
            dispatch(setPortListener(port_listener))
            dispatch(setHostRnd(hostrnd))
            dispatch(setPortAdministasi(port_administrasi))
            dispatch(setVersiApp(versi_app))
        }
        setnavigator(navigator.webdriver)
        const handleMouseMove = () => {
            dispatch(setisHuman('1'))
            if (!navigator.webdriver) {
                //-- if wbdriver true , it's running using bot --//
                dispatch(setisHuman('1'))
            }
        };
        //document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            //document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    const { t, i18n } = useTranslation();
    const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
    }
    return (
        <>
        <AntiScrapedShieldComponent in_content={
            <>
                <div>
                    <div className="absolute inset-0">
                        <img src="/assets/images/auth/bg-gradient.png" alt="image" className="object-cover w-full h-full" />
                    </div>
                    <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                        <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                        <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                        <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                        <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />

                        <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md shadow-[10px_2px_10px_-8px_rgba(67,97,238,0.44)] dark:bg-black/50 lg:min-h-[500px] lg:flex-row lg:gap-10 xl:gap-0">
                            <div className="relative hidden w-full items-center justify-center linear-gradient(to right, rgb(251, 146, 60), rgb(251, 113, 133)) p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[20deg] rtl:xl:skew-x-[-20deg]">
                                <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                                <div className="ltr:xl:-skew-x-[20deg] rtl:xl:skew-x-[20deg] mb-14">
                                    <Link href="/" className="block w-48 ms-10 lg:w-72">
                                        <img src="/assets/images/web-development-online-marketplace-e-commerce-online-shopping-web-design-web-design-6b2f0e4fc6a600375f1376e86f37d2c8.png" alt="Logo" className="w-full" />
                                        {/* <p className="mt-2 text-sm font-bold leading-normal text-center text-primary">"Ceria Melayani Semangat Berprestasi"</p> */}
                                    </Link>
                                </div>
                            </div>
                            <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                                <div className="flex items-center w-full gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                                    <Link href="/" className="items-end block w-48 lg:hidden">
                                        <img src="/assets/images/idm_200_71.svg" alt="Logo" className="w-full" />
                                    </Link>
                                </div>
                                <div className="w-full max-w-[440px] lg:mt-13">
                                    <div className="mb-10">
                                        <h1 className="text-3xl font-extrabold uppercase !leading-snug text-green-700 text-center md:text-4xl">Point of Sales</h1>
                                        <p className="text-base font-bold leading-normal text-center text-white-dark">{t('Enter username and password your HRIS Account')}</p>
                                    </div>
                                    <div>
                                        <label htmlFor="Email" className="text-center">{t('Username')}</label>
                                        <div className="relative text-white-dark">
                                            <input onChange={e => { setUsername(e.currentTarget.value); } } value={Username} type="text" placeholder="Input NIK" className="text-center form-input ps-10 placeholder:text-white-dark rounded-xl" />
                                            <span className="absolute -translate-y-1/2 start-4 top-1/2">
                                                <IconUser fill={true} />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="Password" className="text-center">{t('Password')}</label>
                                        <div className="relative text-white-dark">
                                            <input onChange={e => { setPassword(e.currentTarget.value); } } value={Password} type={type} placeholder="Input Password" className="text-center form-input ps-10 placeholder:text-white-dark rounded-xl" />
                                            <span className="absolute -translate-y-1/2 start-4 top-1/2">
                                                <IconLockDots fill={true} />
                                            </span>
                                            <span className="absolute mt-2 end-9" onClick={handleToggle}>
                                                <Icon className="absolute mr-10" icon={icon} size={25} />
                                            </span>
                                        </div>
                                    </div>
                                    <ButtonLogin url={`http://${host}:${port_login}/api/v2/Login`} param={JSON.stringify({ "IN_USERNAME":Username,"IN_PASSWORD":Password,"IN_FROM":'POS'})} idComponent={GetID()} idAlert={'alert_login'} isBot={getnavigator} />
                                    <div className="text-center dark:text-white">
                                        {/* {t('Download User Guide IDMConsoleV2')}&nbsp;
                                        <Link href={'/file/JUKLAK_IDMCONSOLEV2.rar'} className="underline transition text-primary hover:text-black dark:hover:text-white">
                                            {t('Here')} !
                                        </Link> */}
                                    </div>
                                </div>
                                <p className="absolute w-full text-xs text-center bottom-6 dark:text-white">© 2025.Point of Sales V{versi_app}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        } />
        </>
    );
};
LoginCover.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default LoginCover;
