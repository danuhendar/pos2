import { IRootState } from "@/store";
import { useSelector } from "react-redux/es/hooks/useSelector";

export function get_host(){
    const host = useSelector((state: IRootState) => state.themeConfig.host);
    return host;
}

export function get_hostname_ws(){
    const host = useSelector((state: IRootState) => state.themeConfig.host_ws);
    return host;
}

export function get_port_login(){
    const port_login = useSelector((state: IRootState) => state.themeConfig.port_login);
    return port_login;
}

export function get_port_administrasi(){
    const port_administrasi = useSelector((state: IRootState) => state.themeConfig.port_administrasi);
    return port_administrasi;
}

export function get_port_listener(){
    const port_listener = useSelector((state: IRootState) => state.themeConfig.port_listener);
    return port_listener;
}