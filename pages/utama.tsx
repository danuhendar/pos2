import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setIsAuthenticated, setMessageAuth, setPageTitle, setToken } from '../store/themeConfigSlice';
import Link from 'next/link';
import { handleLogout } from '@/lib/global';
import { useTranslation } from 'react-i18next';
const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('POS'));
    });
    const [isMounted, setIsMounted] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const { t, i18n } = useTranslation();
    useEffect(() => {
        setIsMounted(true);
        if(themeConfig.isAuthenticated){
            console.log('OK')
        }else{
            handleLogout()
        }
    },[]);
    return (
        <>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/" className="text-primary hover:underline">
                            {t('Dashboard')}
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Point of Sales</span>
                    </li>
                </ul>

                <div className="flex items-center justify-center mt-2 mb-1">
                    <div className="grid sm:grid-cols-2 xs:grid-cols-1">
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
