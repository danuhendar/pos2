import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import { useState, useEffect, Children, FC } from 'react';
import router, { useRouter } from 'next/router';
import IconCaretsDown from '@/components/Icon/IconCaretsDown';
import NewSidebarAkses from '../sidebar/NewSideBarAkses';

const Sidebar = () => {
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
        
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [router.pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3 bg-primary">
                        {/* <Link href="/" className="flex items-center main-logo shrink-0"> */}
                            {/* <img className="ml-[5px] w-8 flex-none" src="/assets/images/idm_200_71.svg" alt="logo" /> */}
                            <img className="w-20 ml-[5px] flex-none" src="/assets/images/idm_200_71.svg" alt="logo" />
                            <span className="align-middle text-1.5xl font-semibold ltr:ml-1.5 rtl:mr-1.5 text-white dark:text-white-light lg:inline">POS</span>
                        {/* </Link> */}
                        <button
                            type="button"
                            className="flex items-center w-8 h-8 transition duration-300 rounded-full collapse-icon hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto text-white rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                            <NewSidebarAkses />
                    </PerfectScrollbar>
                    {/* <div className="flex flex-row gap-3"> */}
                        <div className='relative space-y-0.7 p-4 py-0'>
                        <label className="-mt-4 text-xs text-center text-white-dark">Point of Sales V{useSelector((state: IRootState) => state.themeConfig.versi_app)}<br />PT. Indomarco Prismatama</label>
                        </div>
                    {/* </div> */}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
