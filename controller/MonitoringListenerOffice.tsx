export function ReportMonitoringListenerOffice(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_lokasi:string,res_request:string,res_response:string,res_id_report:string,res_computer_name:string,res_ip:any,res_ping:string,res_data_code:number,res_data_msg:string,parse_data_inti:any) { 
    let rows1: { 
            KODE:number; 
            KETERANGAN:string;
            REQUEST:string; 
            RESPONSE:string;
            KDCAB:string; 
            LOKASI:string; 
            ID_REPORT:string;
            COMPUTER_NAME:string;
            IP:any;
            PING:string;
            STATUS:string;
            PATH:string,
            VERSI_SERVICE:string
            VERSI_TRAY:string
    }[] = [];
    if(is_proses_ulang){
        if(res_data_code === 200 && parse_data_inti !== ''){
            if(parse_data_inti.length === 2){
                data_rows[objIndex].KODE = res_data_code
                data_rows[objIndex].KETERANGAN = 'Powershell V2'
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_response
                data_rows[objIndex].KDCAB = res_kdcab
                //data_rows[objIndex].LOKASI = res_lokasi
                data_rows[objIndex].ID_REPORT = res_id_report
                data_rows[objIndex].COMPUTER_NAME = res_computer_name
                data_rows[objIndex].IP = res_ip
                data_rows[objIndex].PING = res_ping
                data_rows[objIndex].STATUS = '-'
                data_rows[objIndex].PATH = '-'
                data_rows[objIndex].VERSI_SERVICE = '-'
                data_rows[objIndex].VERSI_TRAY = '-'
                
            }else if(parse_data_inti.includes('error : An error occurred') || parse_data_inti.includes('Error : ')){
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = 'Error Command';
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_request
                data_rows[objIndex].KDCAB = res_kdcab
                //data_rows[objIndex].LOKASI = res_lokasi
                data_rows[objIndex].ID_REPORT = res_id_report
                data_rows[objIndex].COMPUTER_NAME = res_computer_name
                data_rows[objIndex].IP = res_ip
                data_rows[objIndex].PING = res_ping
                data_rows[objIndex].STATUS = '-'
                data_rows[objIndex].PATH = '-'
                data_rows[objIndex].VERSI_SERVICE = '-'
                data_rows[objIndex].VERSI_TRAY = '-'
            }else{
                let sp_res = parse_data_inti.split('|');
                try{
                    let is_running =  sp_res[0]
                    let path = sp_res[1]
                    let versi_service = sp_res[2];
                    let versi_tray = sp_res[3];

                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request
                    data_rows[objIndex].RESPONSE = res_request
                    data_rows[objIndex].KDCAB = res_kdcab
                    //data_rows[objIndex].LOKASI = res_lokasi
                    data_rows[objIndex].ID_REPORT = res_id_report
                    data_rows[objIndex].COMPUTER_NAME = res_computer_name
                    data_rows[objIndex].IP = res_ip
                    data_rows[objIndex].PING = res_ping
                    data_rows[objIndex].STATUS = is_running.trim()
                    data_rows[objIndex].PATH = path.trim()
                    data_rows[objIndex].VERSI_SERVICE = versi_service
                    data_rows[objIndex].VERSI_TRAY = versi_tray
                }catch(Ex){
                    data_rows[objIndex].KODE = 405;
                    data_rows[objIndex].KETERANGAN = 'Error Parsing';
                    data_rows[objIndex].REQUEST = res_request
                    data_rows[objIndex].RESPONSE = res_request
                    data_rows[objIndex].KDCAB = res_kdcab
                    data_rows[objIndex].LOKASI = res_lokasi
                    data_rows[objIndex].ID_REPORT = res_id_report
                    data_rows[objIndex].COMPUTER_NAME = res_computer_name
                    data_rows[objIndex].IP = res_ip
                    data_rows[objIndex].PING = res_ping
                    data_rows[objIndex].STATUS = '-'
                    data_rows[objIndex].PATH = '-'
                    data_rows[objIndex].VERSI_SERVICE = '-'
                    data_rows[objIndex].VERSI_TRAY = '-'
                }
                
            }
        }else{
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = 'Error Command';
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_request
                data_rows[objIndex].KDCAB = res_kdcab
                //data_rows[objIndex].LOKASI = res_lokasi
                data_rows[objIndex].ID_REPORT = res_id_report
                data_rows[objIndex].COMPUTER_NAME = res_computer_name
                data_rows[objIndex].IP = res_ip
                data_rows[objIndex].PING = res_ping
                data_rows[objIndex].STATUS = '-'
                data_rows[objIndex].PATH = '-'
                data_rows[objIndex].VERSI_SERVICE = '-'
                data_rows[objIndex].VERSI_TRAY = '-'
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            let sp_res = parse_data_inti.split('|');
            try{
                let is_running =  sp_res[0]
                let path = sp_res[1]
                let versi_service = sp_res[2];
                let versi_tray = sp_res[3];
                const arr_content = {
                    'KODE': res_data_code,
                    'KETERANGAN': res_data_msg,
                    'REQUEST': res_request,
                    'RESPONSE': res_response,
                    'KDCAB': res_kdcab,
                    'LOKASI': res_lokasi,
                    'ID_REPORT': res_id_report,
                    'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                    'IP': res_ip,
                    'PING': res_ping,
                    'STATUS': (parse_data_inti === '' ? '-' : is_running.trim()),
                    'PATH': (parse_data_inti === '' ? '-' : path.trim()),
                    'VERSI_SERVICE': (parse_data_inti === '' ? '-' : versi_service),
                    'VERSI_TRAY': (parse_data_inti === '' ? '-' : versi_tray),
                };
                rows1.push(arr_content);
            }catch(Ex){
                const arr_content = {
                    'KODE': 405,
                    'KETERANGAN': 'Error Parsing',
                    'REQUEST': res_request,
                    'RESPONSE': res_response,
                    'KDCAB': res_kdcab,
                    'LOKASI': res_lokasi,
                    'ID_REPORT': res_id_report,
                    'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                    'IP': res_ip,
                    'PING': res_ping,
                    'STATUS': '-',
                    'PATH': '-',
                    'VERSI_SERVICE': '-',
                    'VERSI_TRAY': '-',
                };
                rows1.push(arr_content);
            }
            
        }else{
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN': res_data_msg,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'KDCAB': res_kdcab,
                'LOKASI': res_lokasi,
                'ID_REPORT': res_id_report,
                'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                'IP': res_ip,
                'PING': res_ping,
                'STATUS': '-',
                'PATH': '-',
                'VERSI_SERVICE': '-',
                'VERSI_TRAY': '-',
            };
            rows1.push(arr_content);
        }
    }
    
    return rows1;
}



export function ReportHardwareInfo(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_lokasi:string,res_request:string,res_response:string,res_id_report:string,res_computer_name:string,res_ip:any,res_ping:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    let rows1: { 
            KODE:number; 
            KETERANGAN:string;
            REQUEST:string; 
            RESPONSE:string;
            KDCAB:string; 
            LOKASI:string; 
            ID_REPORT:string;
            COMPUTER_NAME:string;
            IP:any;
            PING:string;
            OS:string;
            ARSITEKTUR:string;
            CPU_NAME:string,
            CPU_USAGE:any,
            CPU_TEMPERATURE:string,
            MEMORY_USAGE:any,
            TOTAL_MEMORY:any,
            MEMORY_TERBACA:any,
            HDD_NAME:string,
            HDD_TOTAL:any,
            HDD_TERPAKAI:any,
            HDD_FREE:any,
            UPS_STATUS:string,
            DEVICE_ID:string,
            UPTIME:string,
            AKTIVASI_WINDOWS:string,
            KEY_WINDOWS:string,
            BOOT_TIME:string,
            INTERFACE:string,
            RECEIVED:string,
            SENT:string
    }[] = [];
    if(is_proses_ulang){
        if(res_data_code === 200 && parse_data_inti !== ''){
            if(parse_data_inti.length === 2){
                data_rows[objIndex].KODE = res_data_code
                data_rows[objIndex].KETERANGAN = 'Powershell V2'
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_response
                data_rows[objIndex].KDCAB = res_kdcab
                //data_rows[objIndex].LOKASI = res_lokasi
                data_rows[objIndex].ID_REPORT = res_id_report
                data_rows[objIndex].COMPUTER_NAME = res_computer_name
                data_rows[objIndex].IP = res_ip
                data_rows[objIndex].PING = res_ping
                data_rows[objIndex].OS = ''
                data_rows[objIndex].ARSITEKTUR = ''
                data_rows[objIndex].CPU_NAME = ''
                data_rows[objIndex].CPU_USAGE = ''
                data_rows[objIndex].CPU_TEMPERATURE = ''
                data_rows[objIndex].MEMORY_USAGE = ''
                data_rows[objIndex].TOTAL_MEMORY = ''
                data_rows[objIndex].MEMORY_TERBACA = ''
                data_rows[objIndex].HDD_NAME = ''
                data_rows[objIndex].HDD_TOTAL = ''
                data_rows[objIndex].HDD_TERPAKAI = ''
                data_rows[objIndex].HDD_FREE = ''
                data_rows[objIndex].UPS_STATUS = ''
                data_rows[objIndex].DEVICE_ID = ''
                data_rows[objIndex].UPTIME = ''
                data_rows[objIndex].KEY_WINDOWS = ''
                data_rows[objIndex].AKTIVASI_WINDOWS = ''
                data_rows[objIndex].BOOT_TIME = ''
                data_rows[objIndex].INTERFACE = ''
                data_rows[objIndex].RECEIVED = ''
                data_rows[objIndex].SENT = ''
            }else if(parse_data_inti.includes('error : An error occurred') || parse_data_inti.includes('Error : ')){
                console.log('error : '+parse_data_inti)
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = 'Error Command';
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_request
                data_rows[objIndex].KDCAB = res_kdcab
                // data_rows[objIndex].LOKASI = res_lokasi
                data_rows[objIndex].ID_REPORT = res_id_report
                data_rows[objIndex].COMPUTER_NAME = res_computer_name
                data_rows[objIndex].IP = res_ip
                data_rows[objIndex].PING = res_ping
                data_rows[objIndex].OS = ''
                data_rows[objIndex].ARSITEKTUR = ''
                data_rows[objIndex].CPU_NAME = ''
                data_rows[objIndex].CPU_USAGE = ''
                data_rows[objIndex].CPU_TEMPERATURE = ''
                data_rows[objIndex].MEMORY_USAGE = ''
                data_rows[objIndex].TOTAL_MEMORY = ''
                data_rows[objIndex].MEMORY_TERBACA = ''
                data_rows[objIndex].HDD_NAME = ''
                data_rows[objIndex].HDD_TOTAL = ''
                data_rows[objIndex].HDD_TERPAKAI = ''
                data_rows[objIndex].HDD_FREE = ''
                data_rows[objIndex].UPS_STATUS = ''
                data_rows[objIndex].DEVICE_ID = ''
                data_rows[objIndex].UPTIME = ''
                data_rows[objIndex].KEY_WINDOWS = ''
                data_rows[objIndex].AKTIVASI_WINDOWS = ''
                data_rows[objIndex].BOOT_TIME = ''
                data_rows[objIndex].INTERFACE = ''
                data_rows[objIndex].RECEIVED = ''
                data_rows[objIndex].SENT = ''
            }else{
                try{
                    let sp = parse_data_inti.split('~')
                    let res_OS = sp[0]
                    let res_ARSITEKTUR = sp[1]
                    let res_CPU_NAME = sp[2]
                    let res_CPU_USAGE = sp[3]
                    let res_CPU_TEMPERATURE  = sp[16]
                    let res_MEMORY_USAGE = parseFloat(''+Math.ceil(sp[4]))
                    let res_TOTAL_MEMORY = sp[5]
                    let res_MEMORY_TERBACA = parseFloat(''+Math.ceil(sp[6]))
                    let res_HDD_NAME = sp[7]
                    let res_HDD_TOTAL = parseFloat(''+Math.ceil(sp[8]))
                    let res_HDD_TERPAKAI = parseFloat(''+Math.ceil(sp[9]))
                    let res_HDD_FREE = parseFloat(''+Math.ceil(sp[10]))
                    let res_UPS_STATUS = sp[11]
                    let res_DEVICE_ID = sp[12]
                    let res_UPTIME = sp[13]
                    let res_AKTIVASI_WINDOWS  = sp[14]
                    let res_KEY_WINDOWS  = (sp[15].toString().includes('-') && sp[15].toString().includes('NOK DLL') ? sp[15].split(':NOK DLL').join('') : sp[15])
                    let res_BOOT_TIME  = sp[17]
                    let res_network_data = sp[18]
                    let sp_res_network_data_1 = ''
                    let res_interface = ''
                    let res_received = ''
                    let res_sent = ''
                    try{
                        sp_res_network_data_1 = res_network_data.split('\r\n')[0]
                        let sp_res = sp_res_network_data_1.split(',');
                        res_interface = sp_res[0].split('"').join('')
                        res_received = sp_res[1].split('"').join('')
                        res_sent = sp_res[2].split('"').join('')
                    }catch(Ex){
                        sp_res_network_data_1 = res_network_data;
                        let sp_res = sp_res_network_data_1.split(',');
                        res_interface = sp_res[0].split('"').join('')
                        res_received = sp_res[1].split('"').join('')
                        res_sent = sp_res[2].split('"').join('')
                    }
                    
                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request
                    data_rows[objIndex].RESPONSE = res_request
                    data_rows[objIndex].KDCAB = res_kdcab
                    // data_rows[objIndex].LOKASI = res_lokasi
                    data_rows[objIndex].ID_REPORT = res_id_report
                    data_rows[objIndex].COMPUTER_NAME = res_computer_name
                    data_rows[objIndex].IP = res_ip
                    data_rows[objIndex].PING = res_ping
                    data_rows[objIndex].OS = res_OS
                    data_rows[objIndex].ARSITEKTUR = res_ARSITEKTUR
                    data_rows[objIndex].CPU_NAME = res_CPU_NAME
                    data_rows[objIndex].CPU_USAGE = res_CPU_USAGE
                    data_rows[objIndex].CPU_TEMPERATURE = res_CPU_TEMPERATURE
                    data_rows[objIndex].MEMORY_USAGE = res_MEMORY_USAGE
                    data_rows[objIndex].TOTAL_MEMORY = res_TOTAL_MEMORY
                    data_rows[objIndex].MEMORY_TERBACA = res_MEMORY_TERBACA
                    data_rows[objIndex].HDD_NAME = res_HDD_NAME
                    data_rows[objIndex].HDD_TOTAL = res_HDD_TOTAL
                    data_rows[objIndex].HDD_TERPAKAI = res_HDD_TERPAKAI
                    data_rows[objIndex].HDD_FREE = res_HDD_FREE
                    data_rows[objIndex].UPS_STATUS = res_UPS_STATUS
                    data_rows[objIndex].DEVICE_ID = res_DEVICE_ID
                    data_rows[objIndex].UPTIME = res_UPTIME
                    data_rows[objIndex].KEY_WINDOWS = res_KEY_WINDOWS
                    data_rows[objIndex].AKTIVASI_WINDOWS = res_AKTIVASI_WINDOWS
                    data_rows[objIndex].BOOT_TIME = res_BOOT_TIME
                    data_rows[objIndex].INTERFACE = res_interface
                    data_rows[objIndex].RECEIVED = res_received
                    data_rows[objIndex].SENT = res_sent
                }catch(Ex){
                    data_rows[objIndex].KODE = 405;
                    data_rows[objIndex].KETERANGAN = 'Error Parsing';
                    data_rows[objIndex].REQUEST = res_request
                    data_rows[objIndex].RESPONSE = res_request
                    data_rows[objIndex].KDCAB = res_kdcab
                    // data_rows[objIndex].LOKASI = res_lokasi
                    data_rows[objIndex].ID_REPORT = res_id_report
                    data_rows[objIndex].COMPUTER_NAME = res_computer_name
                    data_rows[objIndex].IP = res_ip
                    data_rows[objIndex].PING = res_ping
                    data_rows[objIndex].OS = ''
                    data_rows[objIndex].ARSITEKTUR = ''
                    data_rows[objIndex].CPU_NAME = ''
                    data_rows[objIndex].CPU_USAGE = ''
                    data_rows[objIndex].CPU_TEMPERATURE = ''
                    data_rows[objIndex].MEMORY_USAGE = ''
                    data_rows[objIndex].TOTAL_MEMORY = ''
                    data_rows[objIndex].MEMORY_TERBACA = ''
                    data_rows[objIndex].HDD_NAME = ''
                    data_rows[objIndex].HDD_TOTAL = ''
                    data_rows[objIndex].HDD_TERPAKAI = ''
                    data_rows[objIndex].HDD_FREE = ''
                    data_rows[objIndex].UPS_STATUS = ''
                    data_rows[objIndex].DEVICE_ID = ''
                    data_rows[objIndex].UPTIME = ''
                    data_rows[objIndex].KEY_WINDOWS = ''
                    data_rows[objIndex].AKTIVASI_WINDOWS = ''
                    data_rows[objIndex].BOOT_TIME = ''
                    data_rows[objIndex].INTERFACE = ''
                    data_rows[objIndex].RECEIVED = ''
                    data_rows[objIndex].SENT = ''
                }
            }
        }else{
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = 'Error Command';
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_request
                data_rows[objIndex].KDCAB = res_kdcab
                // data_rows[objIndex].LOKASI = res_lokasi
                data_rows[objIndex].ID_REPORT = res_id_report
                data_rows[objIndex].COMPUTER_NAME = res_computer_name
                data_rows[objIndex].IP = res_ip
                data_rows[objIndex].PING = res_ping
                data_rows[objIndex].OS = ''
                data_rows[objIndex].ARSITEKTUR = ''
                data_rows[objIndex].CPU_NAME = ''
                data_rows[objIndex].CPU_USAGE = ''
                data_rows[objIndex].CPU_TEMPERATURE = ''
                data_rows[objIndex].MEMORY_USAGE = ''
                data_rows[objIndex].TOTAL_MEMORY = ''
                data_rows[objIndex].MEMORY_TERBACA = ''
                data_rows[objIndex].HDD_NAME = ''
                data_rows[objIndex].HDD_TOTAL = ''
                data_rows[objIndex].HDD_TERPAKAI = ''
                data_rows[objIndex].HDD_FREE = ''
                data_rows[objIndex].UPS_STATUS = ''
                data_rows[objIndex].DEVICE_ID = ''
                data_rows[objIndex].UPTIME = ''
                data_rows[objIndex].KEY_WINDOWS = ''
                data_rows[objIndex].AKTIVASI_WINDOWS = ''
                data_rows[objIndex].BOOT_TIME = ''
                data_rows[objIndex].INTERFACE = ''
                data_rows[objIndex].RECEIVED = ''
                data_rows[objIndex].SENT = ''
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            //console.log(parse_data_inti)
            if(parse_data_inti.length === 2){
                const arr_content = {
                    'KODE': res_data_code,
                    'KETERANGAN': 'Powershell V2',
                    'REQUEST': res_request,
                    'RESPONSE': res_response,
                    'KDCAB': res_kdcab,
                    'LOKASI': res_lokasi,
                    'ID_REPORT': res_id_report,
                    'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                    'IP': res_ip,
                    'PING': res_ping,
                    'OS': '-',
                    'ARSITEKTUR': '-',
                    'CPU_NAME': '-',
                    'CPU_USAGE': 0,
                    'CPU_TEMPERATURE': '-',
                    'MEMORY_USAGE': 0,
                    'TOTAL_MEMORY': 0,
                    'MEMORY_TERBACA': 0,
                    'HDD_NAME': '-',
                    'HDD_TOTAL': 0,
                    'HDD_TERPAKAI': 0,
                    'HDD_FREE': 0,
                    'UPS_STATUS': '-',
                    'DEVICE_ID': '-',
                    'UPTIME': '-',
                    'KEY_WINDOWS': '-',
                    'AKTIVASI_WINDOWS': '-',
                    'BOOT_TIME': '-',
                    'INTERFACE':'-',
                    'RECEIVED':'-',
                    'SENT':'-'
                };
                rows1.push(arr_content);
            }else if(parse_data_inti.includes('error : An error occurred') || parse_data_inti.includes('Error : ')){
                const arr_content = {
                    'KODE': res_data_code,
                    'KETERANGAN': 'Error Command',
                    'REQUEST': res_request,
                    'RESPONSE': res_response,
                    'KDCAB': res_kdcab,
                    'LOKASI': res_lokasi,
                    'ID_REPORT': res_id_report,
                    'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                    'IP': res_ip,
                    'PING': res_ping,
                    'OS': '-',
                    'ARSITEKTUR': '-',
                    'CPU_NAME': '-',
                    'CPU_USAGE': 0,
                    'CPU_TEMPERATURE': '-',
                    'MEMORY_USAGE': 0,
                    'TOTAL_MEMORY': 0,
                    'MEMORY_TERBACA': 0,
                    'HDD_NAME': '-',
                    'HDD_TOTAL': 0,
                    'HDD_TERPAKAI': 0,
                    'HDD_FREE': 0,
                    'UPS_STATUS': '-',
                    'DEVICE_ID': '-',
                    'UPTIME': '-',
                    'KEY_WINDOWS': '-',
                    'AKTIVASI_WINDOWS': '-',
                    'BOOT_TIME': '-',
                    'INTERFACE':'-',
                    'RECEIVED':'-',
                    'SENT':'-'
                };
                rows1.push(arr_content);
            }else{
                try{
                    let sp = parse_data_inti.split('~')
                    let res_OS = sp[0]
                    let res_ARSITEKTUR = sp[1]
                    let res_CPU_NAME = sp[2]
                    let res_CPU_USAGE = sp[3]
                    let res_CPU_TEMPERATURE  = sp[16]
                    let res_MEMORY_USAGE = parseFloat(''+Math.ceil(sp[4]))
                    let res_TOTAL_MEMORY = sp[5]
                    let res_MEMORY_TERBACA = parseFloat(''+Math.ceil(sp[6]))
                    let res_HDD_NAME = sp[7]
                    let res_HDD_TOTAL = parseFloat(''+Math.ceil(sp[8]))
                    let res_HDD_TERPAKAI = parseFloat(''+Math.ceil(sp[9]))
                    let res_HDD_FREE = parseFloat(''+Math.ceil(sp[10]))
                    let res_UPS_STATUS = sp[11]
                    let res_DEVICE_ID = sp[12]
                    let res_UPTIME = sp[13]
                    let res_AKTIVASI_WINDOWS  = sp[14]
                    let res_KEY_WINDOWS  = (sp[15].toString().includes('-') && sp[15].toString().includes('NOK DLL') ? sp[15].split(':NOK DLL').join('') : sp[15])
                    let res_BOOT_TIME  = sp[17]
                    let res_network_data = sp[18]
                    let sp_res_network_data_1 = ''
                    let res_interface = ''
                    let res_received = ''
                    let res_sent = ''
                    try{
                        sp_res_network_data_1 = res_network_data.split('\r\n')[0]
                        let sp_res = sp_res_network_data_1.split(',');
                        res_interface = sp_res[0].split('"').join('')
                        res_received = sp_res[1].split('"').join('')
                        res_sent = sp_res[2].split('"').join('')
                    }catch(Ex){
                        sp_res_network_data_1 = res_network_data;
                        let sp_res = sp_res_network_data_1.split(',');
                        res_interface = sp_res[0].split('"').join('')
                        res_received = sp_res[1].split('"').join('')
                        res_sent = sp_res[2].split('"').join('')
                    }
                    

                    const arr_content = {
                        'KODE': res_data_code,
                        'KETERANGAN': res_data_msg,
                        'REQUEST': res_request,
                        'RESPONSE': res_response,
                        'KDCAB': res_kdcab,
                        'LOKASI': res_lokasi,
                        'ID_REPORT': res_id_report,
                        'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                        'IP': res_ip,
                        'PING': res_ping,
                        'OS': (parse_data_inti === '' ? '-' : res_OS),
                        'ARSITEKTUR': (parse_data_inti === '' ? '-' : res_ARSITEKTUR),
                        'CPU_NAME': (parse_data_inti === '' ? '-' : res_CPU_NAME),
                        'CPU_USAGE': (parse_data_inti === '' ? '-' : res_CPU_USAGE),
                        'CPU_TEMPERATURE': (parse_data_inti === '' ? '-' : res_CPU_TEMPERATURE),
                        'MEMORY_USAGE': (parse_data_inti === '' ? '-' : res_MEMORY_USAGE),
                        'TOTAL_MEMORY': (parse_data_inti === '' ? '-' : res_TOTAL_MEMORY),
                        'MEMORY_TERBACA': (parse_data_inti === '' ? '-' : res_MEMORY_TERBACA),
                        'HDD_NAME': (parse_data_inti === '' ? '-' : res_HDD_NAME),
                        'HDD_TOTAL': (parse_data_inti === '' ? '-' : res_HDD_TOTAL),
                        'HDD_TERPAKAI': (parse_data_inti === '' ? '-' : res_HDD_TERPAKAI),
                        'HDD_FREE': (parse_data_inti === '' ? '-' : res_HDD_FREE),
                        'UPS_STATUS': (parse_data_inti === '' ? '-' : res_UPS_STATUS),
                        'DEVICE_ID': (parse_data_inti === '' ? '-' : res_DEVICE_ID),
                        'UPTIME': (parse_data_inti === '' ? '-' : res_UPTIME),
                        'KEY_WINDOWS': (parse_data_inti === '' ? '-' : res_KEY_WINDOWS),
                        'AKTIVASI_WINDOWS': (parse_data_inti === '' ? '-' : res_AKTIVASI_WINDOWS),
                        'BOOT_TIME': (parse_data_inti === '' ? '-' : res_BOOT_TIME),
                        'INTERFACE': (parse_data_inti === '' ? '-' : res_interface),
                        'RECEIVED': (parse_data_inti === '' ? '-' : res_received),
                        'SENT': (parse_data_inti === '' ? '-' : res_sent),
                    };
                    rows1.push(arr_content);
                }catch(Ex){
                    const arr_content = {
                        'KODE': 405,
                        'KETERANGAN': 'Error Parsing',
                        'REQUEST': res_request,
                        'RESPONSE': res_response,
                        'KDCAB': res_kdcab,
                        'LOKASI': res_lokasi,
                        'ID_REPORT': res_id_report,
                        'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                        'IP': res_ip,
                        'PING': res_ping,
                        'OS': '-',
                        'ARSITEKTUR': '-',
                        'CPU_NAME': '-',
                        'CPU_USAGE': 0,
                        'CPU_TEMPERATURE': '-',
                        'MEMORY_USAGE': 0,
                        'TOTAL_MEMORY': 0,
                        'MEMORY_TERBACA': 0,
                        'HDD_NAME': '-',
                        'HDD_TOTAL': 0,
                        'HDD_TERPAKAI': 0,
                        'HDD_FREE': 0,
                        'UPS_STATUS': '-',
                        'DEVICE_ID': '-',
                        'UPTIME': '-',
                        'KEY_WINDOWS': '-',
                        'AKTIVASI_WINDOWS': '-',
                        'BOOT_TIME': '-',
                        'INTERFACE':'-',
                        'RECEIVED':'-',
                        'SENT':'-',
                    };
                    rows1.push(arr_content);
                }
                
            }
            
        }else{
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN': res_data_msg,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'KDCAB': res_kdcab,
                'LOKASI': res_lokasi,
                'ID_REPORT': res_id_report,
                'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                'IP': res_ip,
                'PING': res_ping,
                'OS': '-',
                'ARSITEKTUR': '-',
                'CPU_NAME': '-',
                'CPU_USAGE': 0,
                'CPU_TEMPERATURE': '-',
                'MEMORY_USAGE': 0,
                'TOTAL_MEMORY': 0,
                'MEMORY_TERBACA': 0,
                'HDD_NAME': '-',
                'HDD_TOTAL': 0,
                'HDD_TERPAKAI': 0,
                'HDD_FREE': 0,
                'UPS_STATUS': '-',
                'DEVICE_ID': '-',
                'UPTIME': '-',
                'KEY_WINDOWS': '-',
                'AKTIVASI_WINDOWS': '-',
                'BOOT_TIME': '-',
                'INTERFACE':'-',
                'RECEIVED':'-',
                'SENT':'-',
            };
            rows1.push(arr_content);
        }
    }
    return rows1;
}

export function ReportInstallasiTrendMicro(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_lokasi:string,res_request:string,res_response:string,res_id_report:string,res_computer_name:string,res_ip:any,res_ping:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    let rows1: { 
            KODE:number; 
            KETERANGAN:string;
            REQUEST:string; 
            RESPONSE:string;
            KDCAB:string; 
            LOKASI:string; 
            ID_REPORT:string;
            COMPUTER_NAME:string;
            IP:any;
            PING:string;
            OS:string;
            ARCH:string,
            CPU_USAGE:number,
            MEMORY_USAGE:number,
            PATH:string,
            DEEP_SECURITY_AGENT:string;
            DEEP_SECURITY_MONITOR:string;
            DEEP_SECURITY_NOTIFIER:string;
            SOLUTION_PLATFORM:string;
            
    }[] = [];
    if(is_proses_ulang){
        if(res_data_code === 200 && parse_data_inti !== ''){
            if(parse_data_inti.length === 2){
                data_rows[objIndex].KODE = res_data_code
                data_rows[objIndex].KETERANGAN = 'Powershell V2'
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_response
                data_rows[objIndex].KDCAB = res_kdcab
                //data_rows[objIndex].LOKASI = res_lokasi
                data_rows[objIndex].ID_REPORT = res_id_report
                data_rows[objIndex].COMPUTER_NAME = res_computer_name
                data_rows[objIndex].IP = res_ip
                data_rows[objIndex].PING = res_ping
                data_rows[objIndex].OS = '-'
                data_rows[objIndex].ARCH = '-'
                data_rows[objIndex].CPU_USAGE = 0
                data_rows[objIndex].MEMORY_USAGE = 0
                data_rows[objIndex].PATH = ''
                data_rows[objIndex].DEEP_SECURITY_AGENT = '-'
                data_rows[objIndex].DEEP_SECURITY_MONITOR = '-'
                data_rows[objIndex].DEEP_SECURITY_NOTIFIER = '-'
                data_rows[objIndex].SOLUTION_PLATFORM = '-'
            }else if(parse_data_inti.includes('error : An error occurred') || parse_data_inti.includes('Error : ') || parse_data_inti.includes('powershell.exe')){
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = 'Error Command';
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_request
                data_rows[objIndex].KDCAB = res_kdcab
                //data_rows[objIndex].LOKASI = res_lokasi
                data_rows[objIndex].ID_REPORT = res_id_report
                data_rows[objIndex].COMPUTER_NAME = res_computer_name
                data_rows[objIndex].IP = res_ip
                data_rows[objIndex].PING = res_ping
                data_rows[objIndex].OS = '-'
                data_rows[objIndex].ARCH = '-'
                data_rows[objIndex].CPU_USAGE = 0
                data_rows[objIndex].MEMORY_USAGE = 0
                data_rows[objIndex].PATH = ''
                data_rows[objIndex].DEEP_SECURITY_AGENT = '-'
                data_rows[objIndex].DEEP_SECURITY_MONITOR = '-'
                data_rows[objIndex].DEEP_SECURITY_NOTIFIER = '-'
                data_rows[objIndex].SOLUTION_PLATFORM = '-'
            }else{
                try{
                    let sp = parse_data_inti.split('~')
                    let res_OS = sp[0]
                    let res_ARCH = sp[1]
                    let res_CPU_USAGE = sp[2]
                    let res_MEMORY_USAGE = Math.ceil(sp[3])
                    let res_PATH = '';
                    if(sp[4].includes('Deep')){
                        res_PATH = sp[4].split('Deep')[0].split('"').join('')
                    }else{
                        res_PATH = sp[4].split('AMSP')[0].split('"').join('')
                    }
                    let res_DEEP_SECURITY_AGENT = sp[5]
                    let res_DEEP_SECURITY_MONITOR = sp[6]
                    let res_DEEP_SECURITY_NOTIFIER = sp[7]
                    let res_SOLUTION_PLATFORM = sp[8]

                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request
                    data_rows[objIndex].RESPONSE = res_request
                    data_rows[objIndex].KDCAB = res_kdcab
                    //data_rows[objIndex].LOKASI = res_lokasi
                    data_rows[objIndex].ID_REPORT = res_id_report
                    data_rows[objIndex].COMPUTER_NAME = res_computer_name
                    data_rows[objIndex].IP = res_ip
                    data_rows[objIndex].PING = res_ping
                    data_rows[objIndex].OS = res_OS
                    data_rows[objIndex].ARCH = res_ARCH
                    data_rows[objIndex].CPU_USAGE = res_CPU_USAGE
                    data_rows[objIndex].MEMORY_USAGE = res_MEMORY_USAGE
                    data_rows[objIndex].PATH = (res_PATH === '' ? '-' : res_PATH)
                    data_rows[objIndex].DEEP_SECURITY_AGENT = (res_PATH === '' ? '-' : res_DEEP_SECURITY_AGENT)
                    data_rows[objIndex].DEEP_SECURITY_MONITOR =  (res_PATH === '' ? '-' : res_DEEP_SECURITY_MONITOR)
                    data_rows[objIndex].DEEP_SECURITY_NOTIFIER =  (res_PATH === '' ? '-' : res_DEEP_SECURITY_NOTIFIER)
                    data_rows[objIndex].SOLUTION_PLATFORM =  (res_PATH === '' ? '-' : res_SOLUTION_PLATFORM)
                }catch(Ex){
                    data_rows[objIndex].KODE = 405;
                    data_rows[objIndex].KETERANGAN = 'Error Parsing';
                    data_rows[objIndex].REQUEST = res_request
                    data_rows[objIndex].RESPONSE = res_request
                    data_rows[objIndex].KDCAB = res_kdcab
                    data_rows[objIndex].LOKASI = res_lokasi
                    data_rows[objIndex].ID_REPORT = res_id_report
                    data_rows[objIndex].COMPUTER_NAME = res_computer_name
                    data_rows[objIndex].IP = res_ip
                    data_rows[objIndex].PING = res_ping
                    data_rows[objIndex].OS = '-'
                    data_rows[objIndex].ARCH = '-'
                    data_rows[objIndex].CPU_USAGE = 0
                    data_rows[objIndex].MEMORY_USAGE = 0
                    data_rows[objIndex].PATH = ''
                    data_rows[objIndex].DEEP_SECURITY_AGENT = '-'
                    data_rows[objIndex].DEEP_SECURITY_MONITOR = '-'
                    data_rows[objIndex].DEEP_SECURITY_NOTIFIER = '-'
                    data_rows[objIndex].SOLUTION_PLATFORM = '-'
                }
                
            }
        }else{
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = 'Error Command';
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_request
                data_rows[objIndex].KDCAB = res_kdcab
                //data_rows[objIndex].LOKASI = res_lokasi
                data_rows[objIndex].ID_REPORT = res_id_report
                data_rows[objIndex].COMPUTER_NAME = res_computer_name
                data_rows[objIndex].IP = res_ip
                data_rows[objIndex].PING = res_ping
                data_rows[objIndex].OS = '-'
                data_rows[objIndex].ARCH = '-'
                data_rows[objIndex].CPU_USAGE = 0
                data_rows[objIndex].MEMORY_USAGE = 0
                data_rows[objIndex].PATH = ''
                data_rows[objIndex].DEEP_SECURITY_AGENT = '-'
                data_rows[objIndex].DEEP_SECURITY_MONITOR = '-'
                data_rows[objIndex].DEEP_SECURITY_NOTIFIER = '-'
                data_rows[objIndex].SOLUTION_PLATFORM = '-'
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            //console.log(parse_data_inti)
            if(parse_data_inti.length === 2){
                const arr_content = {
                    'KODE': res_data_code,
                    'KETERANGAN': 'Powershell V2',
                    'REQUEST': res_request,
                    'RESPONSE': res_response,
                    'KDCAB': res_kdcab,
                    'LOKASI': res_lokasi,
                    'ID_REPORT': res_id_report,
                    'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                    'IP': res_ip,
                    'PING': res_ping,
                    'OS': '-',
                    'ARCH': '-',
                    'CPU_USAGE': 0,
                    'MEMORY_USAGE': 0,
                    'PATH': '-',
                    'DEEP_SECURITY_AGENT': '-',
                    'DEEP_SECURITY_MONITOR': '-',
                    'DEEP_SECURITY_NOTIFIER': '-',
                    'SOLUTION_PLATFORM': '-',
                };
                rows1.push(arr_content);
            }else if(parse_data_inti.includes('error : An error occurred') || parse_data_inti.includes('Error : ') || parse_data_inti.includes('powershell.exe')){
                const arr_content = {
                    'KODE': res_data_code,
                    'KETERANGAN': 'Error Command',
                    'REQUEST': res_request,
                    'RESPONSE': res_response,
                    'KDCAB': res_kdcab,
                    'LOKASI': res_lokasi,
                    'ID_REPORT': res_id_report,
                    'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                    'IP': res_ip,
                    'PING': res_ping,
                    'OS': '-',
                    'ARCH': '-',
                    'CPU_USAGE': 0,
                    'MEMORY_USAGE': 0,
                    'PATH': '-',
                    'DEEP_SECURITY_AGENT': '-',
                    'DEEP_SECURITY_MONITOR': '-',
                    'DEEP_SECURITY_NOTIFIER': '-',
                    'SOLUTION_PLATFORM': '-',
                };
                rows1.push(arr_content);
            }else{
                try{
                    let sp = parse_data_inti.split('~')
                    let res_OS = sp[0]
                    let res_ARCH = sp[1]
                    let res_CPU_USAGE = sp[2]
                    let res_MEMORY_USAGE = Math.ceil(sp[3])
                    let res_PATH = '';
                    if(sp[4].includes('Deep')){
                        res_PATH = sp[4].split('Deep')[0].split('"').join('')
                    }else{
                        res_PATH = sp[4].split('AMSP')[0].split('"').join('')
                    }
                    let res_DEEP_SECURITY_AGENT = sp[5]
                    let res_DEEP_SECURITY_MONITOR = sp[6]
                    let res_DEEP_SECURITY_NOTIFIER = sp[7]
                    let res_SOLUTION_PLATFORM = sp[8]
                    const arr_content = {
                        'KODE': res_data_code,
                        'KETERANGAN': res_data_msg,
                        'REQUEST': res_request,
                        'RESPONSE': res_response,
                        'KDCAB': res_kdcab,
                        'LOKASI': res_lokasi,
                        'ID_REPORT': res_id_report,
                        'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                        'IP': res_ip,
                        'PING': res_ping,
                        'OS': res_OS,
                        'ARCH': res_ARCH,
                        'CPU_USAGE': res_CPU_USAGE,
                        'MEMORY_USAGE': res_MEMORY_USAGE,
                        'PATH': (res_PATH === '' ? '-' : res_PATH),
                        'DEEP_SECURITY_AGENT': (res_PATH === '' ? '-' : res_DEEP_SECURITY_AGENT),
                        'DEEP_SECURITY_MONITOR': (res_PATH === '' ? '-' : res_DEEP_SECURITY_MONITOR),
                        'DEEP_SECURITY_NOTIFIER': (res_PATH === '' ? '-' : res_DEEP_SECURITY_NOTIFIER),
                        'SOLUTION_PLATFORM': (res_PATH === '' ? '-' : res_SOLUTION_PLATFORM),
                    };
                    rows1.push(arr_content);
                }catch(Ex){
                    const arr_content = {
                        'KODE': 405,
                        'KETERANGAN': 'Error Parsing',
                        'REQUEST': res_request,
                        'RESPONSE': res_response,
                        'KDCAB': res_kdcab,
                        'LOKASI': res_lokasi,
                        'ID_REPORT': res_id_report,
                        'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                        'IP': res_ip,
                        'PING': res_ping,
                        'OS': '-',
                        'ARCH': '-',
                        'CPU_USAGE': 0,
                        'MEMORY_USAGE': 0,
                        'PATH': '-',
                        'DEEP_SECURITY_AGENT': '-',
                        'DEEP_SECURITY_MONITOR': '-',
                        'DEEP_SECURITY_NOTIFIER': '-',
                        'SOLUTION_PLATFORM': '-',
                    };
                    rows1.push(arr_content);
                }   
            }
        }else{
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN': res_data_msg,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'KDCAB': res_kdcab,
                'LOKASI': res_lokasi,
                'ID_REPORT': res_id_report,
                'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                'IP': res_ip,
                'PING': res_ping,
                'OS': '-',
                'ARCH': '-',
                'CPU_USAGE': 0,
                'MEMORY_USAGE': 0,
                'PATH': '-',
                'DEEP_SECURITY_AGENT': '-',
                'DEEP_SECURITY_MONITOR': '-',
                'DEEP_SECURITY_NOTIFIER': '-',
                'SOLUTION_PLATFORM': '-',
            };
            rows1.push(arr_content);
        }
    }

    return rows1;
}