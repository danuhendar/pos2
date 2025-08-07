import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setHost, setHostRnd, setisHuman, setPageTitle, setPortAdministasi, setPortListener, setVersiApp, toggleRTL } from '../store/themeConfigSlice';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import { IRootState } from '@/store';
import { useTranslation } from 'react-i18next';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import AntiScrapedShieldComponent from '@/components/shield/AntiScrapedShieldComponent';
import { get_data_local_storage, GetID, GetToken } from '@/lib/global';
import InputTextType from '@/components/form/InputTypeText';
import ButtonAdd from '@/components/button/ButtonAdd';
import { Posts } from '@/lib/post';
import IconUsers from '@/components/Icon/IconUsers';
import IconDownload from '@/components/Icon/IconDownload';
import IconChecks from '@/components/Icon/IconChecks';

const SetUp2FA = () => {
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
    const [LoadingButton, setLoadingButton] = useState(false);
    const [IN_CODE, setIN_CODE] = useState('');
    const [IN_HOST, setIN_HOST] = useState(host);
    const [IN_PORT, setIN_PORT] = useState(port_listener);
    const [IN_USERNAME, setIN_USERNAME] = useState('');
    const [IN_IMAGE, setIN_IMAGE] = useState('');
    const { t, i18n } = useTranslation();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
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
    const FormInputCode = (e: any) => {
        const value = e.target.value;
        if (value.length <= 6) {
            setIN_CODE(value);
        }else {
            MySwal.fire({
                title: t("Code must be 6 digits"),
                toast: true,
                position: isRtl ? 'top-start' : 'top-end',
                showConfirmButton: false,
                timer: 5000,
                showCloseButton: true,
                customClass: {
                    popup: `color-warning`,
                },
            });
        }
    };

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
            setIN_HOST(host)
            setIN_PORT(port_administrasi)
            SetUp2FA(host,port_administrasi);
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

    const SetUp2FA = (host:string,in_port_administrasi:string) => {
        setLoadingButton(true);
       
        let url = `http://${host}:${in_port_administrasi}/api/v2/SetUp2FA`
        const IN_USERNAME = get_data_local_storage('nik')
        let param = {"IN_USERNAME":IN_USERNAME}
        const Token = GetToken()
        setLoadingButton(true)
        Posts(url,JSON.stringify(param),false,Token).then((response) => {
            const res_data = response;
            console.log(res_data)
            var code = res_data.code;
            var msg = res_data.msg;
            if(parseFloat(code) === 200){
                var data_body = res_data.data;
                setIN_IMAGE(data_body)
                setLoadingButton(false)
            }else if(code.toString().substring(0,1) === '4'){
                if(code === 401 && msg.includes("Invalid")){
                    
                }else{
                    Swal.fire({
                        title: t("Warning"),
                        text: ""+parseFloat(code)+"-"+msg,
                        icon: "warning",
                        padding: '2em',
                        customClass: 'sweet-alerts'
                    });
                }
                setLoadingButton(false)
            }else{
                Swal.fire({
                    title: t("Warning"),
                    text: ""+parseFloat(code)+"-"+msg,
                    icon: "warning",
                    padding: '2em',
                    customClass: 'sweet-alerts'
                });
                setLoadingButton(false)
            }
        }).catch((error) => {
            Swal.fire({
                title: t("Warning"),
                text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
            setLoadingButton(false)
        });
        
    }

    const DirectVerification = () => {
        router.push('/Verification');
    }

    const DownloadGoogleAuthenticator = () => {
        const userAgent = navigator.userAgent || navigator.vendor;

        if (/android/i.test(userAgent)) {
            // Android
            window.location.href = "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2";
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            // iOS
            window.location.href = "https://apps.apple.com/app/google-authenticator/id388497605";
        } else {
            // Fallback
            Swal.fire({
                title: t("Warning"),
                text: "401-Please open this page on your mobile device to download the app.",
                icon: "warning",
                padding: '2em',
                customClass: 'sweet-alerts'
            });
        }
    }
    // const handleToggle = () => {
    //     if (type==='password'){
    //        setIcon(eye);
    //        setType('text')
    //     } else {
    //        setIcon(eyeOff)
    //        setType('password')
    //     }
    // }
    
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
                                        <img src="/assets/images/pusat_layanan.png" alt="Logo" className="w-full" />
                                        {/* <p className="mt-2 text-sm font-bold leading-normal text-center text-primary">"Ceria Melayani Semangat Berprestasi"</p> */}
                                    </Link>
                                </div>
                            </div>
                            <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                               
                                <div className="w-full max-w-[440px] lg:mt-13">
                                    <div className="mb-10">
                                        <h1 className="text-3xl font-extrabold uppercase !leading-snug text-green-700 text-center md:text-4xl">SetUp 2FA</h1>
                                        <p className="text-base font-bold leading-normal text-center text-white-dark">{t('Scan QRCode with Google Authenticator')}</p>
                                    </div>
                                   
                                    <img src={IN_IMAGE} alt="2FA" className="w-1/2 mb-4 ml-28 h-100" />
                                   <ButtonAdd in_classname={!isDark ? 'btn btn-warning w-full rounded-full text-end text-xs mt-3' : 'btn btn-outline-warning w-full rounded-full text-xs mt-3'} idComponent={"btn_download"} isLoading={LoadingButton} isDisabled={false} in_icon={<IconDownload />} in_title_button={'Download Google Authenticator'} HandleClick={DownloadGoogleAuthenticator} />
                                   <ButtonAdd in_classname={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs mt-3' : 'btn btn-outline-success w-full rounded-full text-xs mt-3'} idComponent={"btn_refresh_master"} isLoading={LoadingButton} isDisabled={false} in_icon={<IconChecks />} in_title_button={'Verify'} HandleClick={DirectVerification} />
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
SetUp2FA.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};
export default SetUp2FA;