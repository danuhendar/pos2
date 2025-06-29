import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark, setVersiListener, setVersiServiceListener, setVersiAttribute, setVersiIDMLibrary, setisHuman } from './store/themeConfigSlice';

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
        //-- locale
        const locale = localStorage.getItem('i18nextLng') || themeConfig.locale;
        dispatch(toggleLocale(locale));
        i18n.changeLanguage(locale);
        dispatch(setVersiListener(themeConfig.versi_listener));
        dispatch(setVersiServiceListener(themeConfig.versi_service_listener));
        dispatch(setVersiIDMLibrary(themeConfig.versi_idm_library));
        dispatch(setVersiAttribute(themeConfig.versi_attribute));
        //-- disabled right click--//
        // const handleContextMenu = (e) => {
        //     e.preventDefault();
        // };
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
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark, themeConfig.versi_listener,themeConfig.versi_service_listener,themeConfig.versi_idm_library,themeConfig.versi_attribute,themeConfig.isHuman]);
    return (
        <div
            className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section relative font-nunito text-sm font-normal antialiased`}
        >
            {children}
        </div>
    );
}
export default App;
