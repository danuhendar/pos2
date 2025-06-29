import { createSlice } from '@reduxjs/toolkit';
import themeConfig from '../theme.config';

const initialState = {
    isDarkMode: false,
    sidebar: false,
    theme: themeConfig.theme,
    menu: themeConfig.menu,
    layout: themeConfig.layout,
    rtlClass: themeConfig.rtlClass,
    animation: themeConfig.animation,
    navbar: themeConfig.navbar,
    locale: themeConfig.locale,
    semidark: themeConfig.semidark,
    languageList: [
        // { code: 'zh', name: 'Chinese' },
        // { code: 'da', name: 'Danish' },
        { code: 'en', name: 'English' },
        { code: 'id', name: 'Indonesia' },
        // { code: 'fr', name: 'French' },
        // { code: 'de', name: 'German' },
        // { code: 'el', name: 'Greek' },
        // { code: 'hu', name: 'Hungarian' },
        // { code: 'it', name: 'Italian' },
        // { code: 'ja', name: 'Japanese' },
        // { code: 'pl', name: 'Polish' },
        // { code: 'pt', name: 'Portuguese' },
        // { code: 'ru', name: 'Russian' },
        // { code: 'es', name: 'Spanish' },
        // { code: 'sv', name: 'Swedish' },
        // { code: 'tr', name: 'Turkish' },
        // { code: 'ae', name: 'Arabic' },
    ],
    host: themeConfig.host,
    hostrnd: themeConfig.hostrnd,
    host_ws: themeConfig.host_ws,
    port_login: themeConfig.port_login,
    port_administrasi: themeConfig.port_administrasi,
    port_listener: themeConfig.port_listener,
    versi_listener: themeConfig.versi_listener,
    versi_service_listener: themeConfig.versi_service_listener,
    versi_idm_library: themeConfig.versi_idm_library,
    versi_attribute: themeConfig.versi_attribute,
    versi_app:themeConfig.versi_app,
    versi_suhu:themeConfig.versi_suhu,
    versi_oskey:themeConfig.versi_oskey,
    versi_se:themeConfig.versi_se,
    Token:themeConfig.Token,
    TokenRND:themeConfig.TokenRND,
    isAuthenticated:false,
    MessageAuth:themeConfig.MessageAuth,
    isHuman:false
};

const themeConfigSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        toggleTheme(state, { payload }) {
            payload = payload || state.theme; // light | dark | system
            localStorage.setItem('theme', payload);
            state.theme = payload;
            if (payload === 'light') {
                state.isDarkMode = false;
            } else if (payload === 'dark') {
                state.isDarkMode = true;
            } else if (payload === 'system') {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    state.isDarkMode = true;
                } else {
                    state.isDarkMode = false;
                }
            }

            if (state.isDarkMode) {
                document.querySelector('body')?.classList.add('dark');
            } else {
                document.querySelector('body')?.classList.remove('dark');
            }
        },
        toggleMenu(state, { payload }) {
            payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
            state.sidebar = false; // reset sidebar state
            localStorage.setItem('menu', payload);
            state.menu = payload;
        },
        toggleLayout(state, { payload }) {
            payload = payload || state.layout; // full, boxed-layout
            localStorage.setItem('layout', payload);
            state.layout = payload;
        },
        toggleRTL(state, { payload }) {
            payload = payload || state.rtlClass; // rtl, ltr
            localStorage.setItem('rtlClass', payload);
            state.rtlClass = payload;
            document.querySelector('html')?.setAttribute('dir', state.rtlClass || 'ltr');
        },
        toggleAnimation(state, { payload }) {
            payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
            payload = payload?.trim();
            localStorage.setItem('animation', payload);
            state.animation = payload;
        },
        toggleNavbar(state, { payload }) {
            payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
            localStorage.setItem('navbar', payload);
            state.navbar = payload;
        },
        toggleSemidark(state, { payload }) {
            payload = payload === true || payload === 'true' ? true : false;
            localStorage.setItem('semidark', payload);
            state.semidark = payload;
        },
        toggleLocale(state, { payload }) {
            payload = payload || state.locale;
            localStorage.setItem('i18nextLng', payload);
            state.locale = payload;
        },
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },

        setPageTitle(state, { payload }) {
            document.title = `${payload}`;
        },
        
        setHost(state, { payload }) {
            state.host = `${payload}`;
        },

        setHostRnd(state, { payload }) {
            state.hostrnd = `${payload}`;
        },

        setPortLogin(state, { payload }) {
            state.port_login = `${payload}`;
        },

        setPortAdministasi(state, { payload }) {
            state.port_administrasi = `${payload}`;
        },

        setPortListener(state, { payload }) {
            state.port_listener = `${payload}`;
        },
        setVersiListener(state, { payload }) {
            state.versi_listener = `${payload}`;
        },
        setVersiServiceListener(state, { payload }) {
            state.versi_service_listener = `${payload}`;
        },
        setVersiIDMLibrary(state, { payload }) {
            state.versi_idm_library = `${payload}`;
        },
        setVersiAttribute(state, { payload }) {
            state.versi_attribute = `${payload}`;
        },
        setVersiApp(state, { payload }) {
            state.versi_app = `${payload}`;
        },
        setVersiSuhu(state, { payload }) {
            state.versi_suhu = `${payload}`;
        },
        setVersiSE(state, { payload }) {
            state.versi_se = `${payload}`;
        },
        setToken(state, { payload }) {
             state.Token =  `${payload}`;
        },
        setTokenRND(state, { payload }) {
            state.TokenRND =  `${payload}`;
       },
       setIsAuthenticated(state){
            state.isAuthenticated = !state.isAuthenticated
       },
       setMessageAuth(state, { payload }) {
            state.MessageAuth =  `${payload}`;
       }, 
       setisHuman(state, { payload }) {
            if (payload === '1') {
                state.isHuman =  true;
            }else{
                state.isHuman = false;
            }    
       },
    },
});

export const { toggleTheme, toggleMenu, toggleLayout, toggleRTL, toggleAnimation, toggleNavbar, toggleSemidark, toggleLocale, toggleSidebar, setPageTitle, setHost, setHostRnd, setPortLogin, setPortAdministasi, setPortListener,setVersiListener,setVersiServiceListener,setVersiIDMLibrary,setVersiAttribute,setVersiApp,setVersiSuhu,setVersiSE,setToken,setTokenRND,setIsAuthenticated,setMessageAuth,setisHuman } = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
