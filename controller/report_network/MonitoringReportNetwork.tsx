import { GetID } from "@/lib/global";

export function ReportMonitoringRBWDCP(parse_data_inti:any){
    var rows1: { KDCAB: any; TOKO: any; NAMA: any;IPTOKOMAIN: any; IPROUTER: any; STATION:any, KONEKSI:any, TIMEROUTER: any; ADDTIME: any; VERSI: any; USERADMIN: number; USERNOADMIN: number; USEROVER_1: number; SSIDOVER_1: number; SSIDOVER_2: any; WDCP_N: any; WDCP_Y: any; WDCPWDS_Y: any; APKA_N: any; APKA_Y: any; APKAWDS_Y: any; PASSWDCP: any; MAC_0: any; MACKRG_2: any; MACLBH_2: any; TELNET_23: any; FTP_21: any; SSH_22: any; WWW_80: any; API_8278: any; APISSL_8279: any; WINBOX_8291: any; BRIDGE: any; FIREWALL: any; }[] = [];
    const data_body = parse_data_inti;
        for(var b = 0;b<data_body.length;b++){
            var arr_content = {
                        'KDCAB':data_body[b].kdcab,
                        'TOKO':data_body[b].toko,
                        'NAMA':data_body[b].nama,
                        'IPTOKOMAIN':data_body[b].IPTokomain,
                        'IPROUTER':data_body[b].IPRouter,
                        'STATION':data_body[b].station,
                        'KONEKSI':data_body[b].koneksi,
                        'TIMEROUTER':data_body[b].timerouter,
                        'ADDTIME':data_body[b].addtime,
                        'VERSI':data_body[b].versi,
                        'USERADMIN':parseFloat(data_body[b].useradmin),
                        'USERNOADMIN':parseFloat(data_body[b].usernonadmin),
                        'USEROVER_1':parseFloat(data_body[b].userover_1),
                        'SSIDOVER_1':parseFloat(data_body[b].ssidover_1),
                        'SSIDOVER_2':data_body[b].SsidOver_2,
                        'WDCP_N':data_body[b].Wdcp_n,
                        'WDCP_Y':data_body[b].Wdcp_y,
                        'WDCPWDS_Y':data_body[b].WdcpWds_y,
                        'APKA_N':data_body[b].Apka_n,
                        'APKA_Y':data_body[b].Apka_y,
                        'APKAWDS_Y':data_body[b].ApkaWds_y,
                        'PASSWDCP':data_body[b].PassWdcp,
                        'MAC_0':data_body[b].Mac_0,
                        'MACKRG_2':data_body[b].MacKrg_2,
                        'MACLBH_2':data_body[b].MacLbh_2,
                        'TELNET_23':data_body[b].Telnet_23,
                        'FTP_21':data_body[b].Ftp_21,
                        'SSH_22':data_body[b].Ssh_22,
                        'WWW_80':data_body[b].www_80,
                        'API_8278':data_body[b].Api_8728,
                        'APISSL_8279':data_body[b].ApiSSL_8729,
                        'WINBOX_8291':data_body[b].Winbox_8291,
                        'BRIDGE':data_body[b].Bridge,
                        'FIREWALL':data_body[b].Firewall,
            };
            rows1.push(arr_content);
        }
    return rows1;
}

export function SettingRouter_WDCP(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:any,res_station:any,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    let rows: { CLICK_FOR_ACTION: any; KODE: any; KETERANGAN: any; REQUEST: any; RESPONSE: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; ARCHITECTURE_NAME: any; BAD_BLOCKS: any; BOARD_NAME: any; BUILD_TIME: any; CPU_COUNT: any; CPU_FREQUENCY: any; CPU_LOAD: any; FACTORY_SOFTWARE: any; FREE_HDD_SPACE: any; TOTAL_HDD_SPACE: any; FREE_MEMORY: any; TOTAL_MEMORY: any; PLATFORM: any; UPTIME: any; VERSION: any; WRITE_SECT_SINCE_REBOOT: any; WRITE_SECT_TOTAL: any; }[] = [];
    if(is_proses_ulang){
        if(res_data_code === 200 && parse_data_inti !== ''){
            const parse_data_inti_router = JSON.parse(parse_data_inti);
            data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
            data_rows[objIndex].KODE = res_data_code;
            data_rows[objIndex].KETERANGAN = res_data_msg;
            data_rows[objIndex].REQUEST = res_request;
            data_rows[objIndex].RESPONSE = res_response;
            data_rows[objIndex].KDCAB = res_kdcab;
            data_rows[objIndex].KDTK =  res_kdtk;
            data_rows[objIndex].NAMA = res_nama;
            data_rows[objIndex].STATION = res_station;
            data_rows[objIndex].BOARD_NAME = parse_data_inti_router[0].board_name;
            data_rows[objIndex].BUILD_TIME = parse_data_inti_router[0].build_time;
            data_rows[objIndex].CPU = parse_data_inti_router[0].cpu;
            data_rows[objIndex].CPU_LOAD = parse_data_inti_router[0].cpu_load;
            data_rows[objIndex].FREE_HDD_SPACE = parse_data_inti_router[0].free_hdd_space;
            data_rows[objIndex].TOTAL_HDD_SPANCE = parse_data_inti_router[0].total_hdd_space;
            data_rows[objIndex].FREE_MEMORY = parse_data_inti_router[0].free_memory;
            data_rows[objIndex].TOTAL_MEMORY = parse_data_inti_router[0].total_memory;
            data_rows[objIndex].UPTIME = parse_data_inti_router[0].uptime;
            data_rows[objIndex].VERSION = parse_data_inti_router[0].version;
        }else{
            data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
            data_rows[objIndex].KODE = res_data_code;
            data_rows[objIndex].KETERANGAN = res_data_msg;
            data_rows[objIndex].REQUEST = res_request;
            data_rows[objIndex].RESPONSE = res_response;
            data_rows[objIndex].KDCAB = res_kdcab;
            data_rows[objIndex].KDTK =  res_kdtk;
            data_rows[objIndex].NAMA = res_nama;
            data_rows[objIndex].STATION = res_station;
            data_rows[objIndex].BOARD_NAME = '-';
            data_rows[objIndex].BUILD_TIME = '-';
            data_rows[objIndex].CPU = '-';
            data_rows[objIndex].CPU_LOAD = '-';
            data_rows[objIndex].FREE_HDD_SPACE = '-';
            data_rows[objIndex].TOTAL_HDD_SPANCE = '-';
            data_rows[objIndex].FREE_MEMORY = '-';
            data_rows[objIndex].TOTAL_MEMORY = '-';
            data_rows[objIndex].UPTIME = '-';
            data_rows[objIndex].VERSION = '-';
        }
    }else{
        if(res_data_code === 200){
            const parse_data_inti_router = JSON.parse(parse_data_inti);
            const arr_content = {
                'CLICK_FOR_ACTION':res_data_code,
                'KODE':res_data_code,
                'KETERANGAN':res_data_msg,
                'REQUEST':res_request,
                'RESPONSE':res_response,
                'KDCAB':res_kdcab,
                'KDTK': res_kdtk,
                'NAMA':res_nama,
                'STATION':res_station,
                'IP':res_ip,
                'ARCHITECTURE_NAME':parse_data_inti_router[0].architecture_name,
                'BAD_BLOCKS':parse_data_inti_router[0].bad_blocks,
                'BOARD_NAME':parse_data_inti_router[0].board_name,
                'BUILD_TIME':parse_data_inti_router[0].build_time,
                'CPU_COUNT':parse_data_inti_router[0].cpu_count,
                'CPU_FREQUENCY':parse_data_inti_router[0].cpu_frequency,
                'CPU_LOAD':parse_data_inti_router[0].cpu_load,
                'FACTORY_SOFTWARE':parse_data_inti_router[0].factory_software,
                'FREE_HDD_SPACE':parse_data_inti_router[0].free_hdd_space,
                'TOTAL_HDD_SPACE':parse_data_inti_router[0].total_hdd_space,
                'FREE_MEMORY':parse_data_inti_router[0].free_memory,
                'TOTAL_MEMORY':parse_data_inti_router[0].total_memory,
                'PLATFORM':parse_data_inti_router[0].platform,
                'UPTIME':parse_data_inti_router[0].uptime,
                'VERSION':parse_data_inti_router[0].version,
                'WRITE_SECT_SINCE_REBOOT':parse_data_inti_router[0].write_sect_since_reboot,
                'WRITE_SECT_TOTAL':parse_data_inti_router[0].write_sect_total
            };
            rows.push(arr_content);            
        //-- failed listeners --//
        }else{
            const uniq_number = GetID() //parseFloat(Math.floor(new Date().valueOf() * Math.random()).toString().substring(0,6));
            const arr_content = {
                // 'id':uniq_number,
                'CLICK_FOR_ACTION':res_data_code,
                'KODE':res_data_code,
                'KETERANGAN':res_data_msg,
                'REQUEST':res_request,
                'RESPONSE':res_response,
                'KDCAB':res_kdcab,
                'KDTK': res_kdtk,
                'NAMA':res_nama,
                'STATION':res_station,
                'IP':res_ip,
                'ARCHITECTURE_NAME':'-',
                'BAD_BLOCKS':'-',
                'BOARD_NAME':'-',
                'BUILD_TIME':'-',
                'CPU_COUNT':'-',
                'CPU_FREQUENCY':'-',
                'CPU_LOAD':'-',
                'FACTORY_SOFTWARE':'-',
                'FREE_HDD_SPACE':'-',
                'TOTAL_HDD_SPACE':'-',
                'FREE_MEMORY':'-',
                'TOTAL_MEMORY':'-',
                'PLATFORM':'-',
                'UPTIME':'-',
                'VERSION':'-',
                'WRITE_SECT_SINCE_REBOOT':'-',
                'WRITE_SECT_TOTAL':'-'
            };
            rows.push(arr_content);
        }
    }
    return rows;
}

export function SendConfigRouter(objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:any,res_station:any,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    try{
        if(res_data_code === 200 && parse_data_inti !== ''){
            const res_status = JSON.parse(parse_data_inti);
            const res_installscript = res_status.installscript;
            const res_installnetwatch = res_status.installnetwatch;
            const res_installschedule = res_status.installschedule;
            const res_installrunschedule = res_status.installrunschedule;
            const res_time_router = parse_data_inti.timerouter;
            const res_time_request = parse_data_inti.timerequest;
            const res_time_response = parse_data_inti.timerespons;
            
            
            data_rows[objIndex].KODE = res_data_code;
            data_rows[objIndex].KETERANGAN = res_data_msg;
            data_rows[objIndex].INSTALL_SCRIPT = (res_installscript !== '' ? res_installscript : '-');
            data_rows[objIndex].INSTALL_NETWATCH = (res_installnetwatch !== '' ? res_installnetwatch : '-');
            data_rows[objIndex].INSTALL_SCHEDULE = (res_installschedule !== '' ? res_installschedule : '-');
            data_rows[objIndex].INSTALL_RUNSCHEDULE = (res_installrunschedule !== '' ? res_installrunschedule : '-');
            data_rows[objIndex].TIME_ROUTER = (res_time_router !== '' ? res_time_router : '-');
            data_rows[objIndex].TIME_REQUEST = (res_time_request !== '' ? res_time_request : '-');
            data_rows[objIndex].TIME_RESPONSE = (res_time_response !== '' ? res_time_response : '-');
        }else{
            data_rows[objIndex].KODE = '0';
            data_rows[objIndex].KETERANGAN = 'ERROR';
            data_rows[objIndex].INSTALL_SCRIPT = 'NOK';
            data_rows[objIndex].INSTALL_NETWATCH = 'NOK';
            data_rows[objIndex].INSTALL_SCHEDULE = 'NOK';
            data_rows[objIndex].INSTALL_RUNSCHEDULE = 'NOK';
            data_rows[objIndex].TIME_ROUTER = 'NOK';
            data_rows[objIndex].TIME_REQUEST = 'NOK';
            data_rows[objIndex].TIME_RESPONSE = 'NOK';
        }
    }catch(Ex){
        
        data_rows[objIndex].KODE = '0';
        data_rows[objIndex].KETERANGAN = 'ERROR';
        data_rows[objIndex].INSTALL_SCRIPT = 'NOK';
        data_rows[objIndex].INSTALL_NETWATCH = 'NOK';
        data_rows[objIndex].INSTALL_SCHEDULE = 'NOK';
        data_rows[objIndex].INSTALL_RUNSCHEDULE = 'NOK';
        data_rows[objIndex].TIME_ROUTER = 'NOK';
        data_rows[objIndex].TIME_REQUEST = 'NOK';
        data_rows[objIndex].TIME_RESPONSE = 'NOK';
    }
}