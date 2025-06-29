export function ReportServiceExcellent(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:any,res_station:any,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    var rows1: { CLICK_FOR_ACTION: any; KODE: any; KETERANGAN: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; OS:any,ARSITEKTUR:any,CPU_INFO: any; CPU_USAGE: any; MEMORY_USAGE: any; MEMORY_TERBACA:any, HDD_NAME:any;HDD_TOTAL: any; HDD_USED: any; HDD_FREE: any; HDD_HEALTH: any; MEDIA_TYPE:string, SETTING_HIBERNATE: any; UPS_STATUS: string; AKTIVASI_WINDOWS: any; PARTIAL_KEY_WINDOWS: any; LAST_INSTALL:string,LAN_SPEED: any; UPTIME: any; SUHU: number; BOOT_TIME: string; EDC_BCA_ON: any; EDC_BCA_OFF: any; EDC_BCA_LAST: any; EDC_MANDIRI_ON: any; EDC_MANDIRI_OFF: any; EDC_MANDIRI_LAST: any; REKOMENDASI_PERBAIKAN: string; STATUS_BSOD:string; FOLDER_BACKOFF_SHARING_MODE:string}[] = [];
    let res_os = '-';
    let res_arsitektur = '-';
    let res_cpu_info = '-';
    let res_cpu_usage = '-';
    let res_memory_usage = '-';
    let res_memory_terpasang = '-';
    let res_memory_terbaca = '-';
    let res_hdd_name = '-';
    let res_hdd_total = '-';
    let res_hdd_used = '-';
    let res_hdd_free = '-';
    let res_hdd_health = '-';
    let res_media_type = '-';
    let res_status_hibernate = '-';
    let res_ups_status = '-';
    let res_device_id_ups = '-';
    let res_lan_speed = '-';
    let res_uptime = '-';
    let res_status_aktivasi_windows = '-';
    let res_key_windows = '-';
    let res_last_install = '-';
    let res_suhu = 0;
    let res_boot_time = '-';
    let res_list_ip = '-';
    let res_edc_bca = '-';
    let edc_bca_setting = '-';
    let edc_bca_total_on = '-';
    let edc_bca_total_off = '-';
    let edc_bca_last_online = '-';
    let res_edc_mandiri = '-';
    let edc_mandiri_setting = '-';
    let edc_mandiri_total_on = '-';
    let edc_mandiri_total_off = '-';
    let edc_mandiri_last_online = '-';
    let res_edc_mti = '-';
    let edc_mti_setting = '-';
    let edc_mti_total_on = '-';
    let edc_mti_total_off = '-';
    let edc_mti_last_online = '-';
    let res_rekomendasi_perbaikan = '-';
    let res_status_jumlah_bsod = '-'
    let res_folder_backoff_sharing_mode = '-'
    if(is_proses_ulang){
        if(parse_data_inti.toString() === '2'){
            res_data_msg =  'Versi Powershell 2,Mohon Update!'
        }else if(parse_data_inti.toString().includes('NOK SE.dll')){
            res_data_msg = 'NOK SE,Mohon copykan SE.dll'
        }else if(parse_data_inti.toString() === 'Sudah di eksekusi'){
            res_data_msg = 'Mohon Update IDMCommandListeners!'
        }else if(parse_data_inti.toString().includes('Versi SE.dll Belum Update!')){
            res_data_msg = 'Versi SE.dll Belum Update!'
        }else if(parse_data_inti.toString() === '' && res_data_code === 200){
            res_data_code = 405
            res_data_msg = 'Blank'
        }else if(parse_data_inti.toString().includes('Job timed out after')){
            res_data_code = 406
            res_data_msg = 'Timeout Execute Command!'
        }else{
            try{
                const res_data_inti = parse_data_inti.toString().split('~');
                res_os = res_data_inti[0];
                res_arsitektur = res_data_inti[1];
                res_cpu_info = res_data_inti[2];
                res_cpu_usage =  (res_data_inti[3] !== '' ? res_data_inti[3] : '0');

                res_memory_usage = (res_data_inti[4] !== '' ? Math.ceil(res_data_inti[4])+'' : '0');
                res_memory_terpasang = (res_data_inti[5] !== '' ?  (res_data_inti[5].includes('MB') ? Math.ceil(parseFloat(res_data_inti[5].split(',').join('').split('MB').join('').trim()) / 1024)+' GB' : Math.ceil(res_data_inti[5])+' GB') : '0 GB');
                res_memory_terbaca = (res_data_inti[6] !== '' ? (res_data_inti[6].includes('MB') ? Math.ceil(parseFloat(res_data_inti[6].split(',').join('').split('MB').join('').trim()) / 1024)+' GB' : Math.ceil(res_data_inti[6])+' GB') : '0');
                
                res_hdd_name = (res_data_inti[7] !== '' ? res_data_inti[7] : '-');
                res_hdd_total = (res_data_inti[8] !== '' ? Math.round(res_data_inti[8])+' GB' : '0 GB');
                res_hdd_used = (res_data_inti[9] !== '' ? Math.round(res_data_inti[9])+' GB' : '0 GB');
                res_hdd_free = (res_data_inti[10] !== '' ? Math.round(res_data_inti[10])+' GB' : '0 GB');
                res_hdd_health = (res_data_inti[11] !== '' ? res_data_inti[11].split('Status').join('').split(' ').join('').split('OK').join('Healthy') : '-');
                res_media_type = res_data_inti[12];

                res_status_hibernate = res_data_inti[13];
                res_ups_status = (res_data_inti[14].includes('NOK') ? res_data_inti[14] : (res_data_inti[14] !== '' ? 'Terpasang: '+res_data_inti[14].split(' ')[0]+' Battery_Status: '+res_data_inti[14].split(' ')[1]+' Battery_Level: '+res_data_inti[14].split(' ')[2] : '-')) ;
                res_device_id_ups = (res_data_inti[15] !== '' ? res_data_inti[15] : '-');
                res_lan_speed = (res_data_inti[16] !== '' ? res_data_inti[16] : '-');
                res_uptime = (res_data_inti[17] !== '' ? res_data_inti[17] : '-');

                res_status_aktivasi_windows = (res_data_inti[18] !== '' ? res_data_inti[18] : '-');
                res_key_windows = '';
                const arr_key_windows = res_data_inti[19].split(':');
                const key1 = arr_key_windows[0];
                const key2 = arr_key_windows[1];
                if(key1 === key2){
                    res_key_windows = key1;
                }else if((key1 === '') && (key2 !== '')){
                    res_key_windows = key2;
                }else if(key1 !== '' && key2 !== ''){
                    if((key1 !== key2) && key2 !=='NOK Dll'){
                        res_key_windows = res_data_inti[19];
                    }else{
                        res_key_windows = key2;
                    }
                }else if((key1 !== '' && key2 ==='') || (key1 !== '' && key2 ==='NOK Dll')){
                    res_key_windows = key1;
                }

                let sp_last_install = res_data_inti[20].split('<DIR>          Windows').join('').split('Original Install Date:     ').join('').trim();
                res_last_install = sp_last_install
                
                res_suhu = (res_data_inti[21] !== '' ? parseFloat(res_data_inti[21]) : 0);
                res_boot_time = (res_data_inti[22] !== '' ? res_data_inti[22]+' Menit' : '-');
                res_list_ip = (res_data_inti[23] !== '' ? res_data_inti[23] : '-');
                
                if(res_data_inti[24].includes('NEB:N') && res_data_inti[24].includes('E01: ') || ( (res_data_inti[24].includes('E01:0.0.0.0')) ||(res_data_inti[24].includes('E01:127.0.0.1')) ) ){
                    edc_bca_setting = '-';
                    edc_bca_total_on = '0';
                    edc_bca_total_off = '0';
                    edc_bca_last_online = 'NOEDC-0000-00-00 00:00:00';
                
                }else{
                    res_edc_bca = res_data_inti[24].split(';');
                    edc_bca_setting = res_edc_bca[3];
                    edc_bca_total_on = (res_edc_bca[0].toString().includes('NOEDC') ? '0' : res_edc_bca[0]);
                    edc_bca_total_off = (res_edc_bca[1].toString().includes('NOEDC') ? '0' : res_edc_bca[1]);
                    edc_bca_last_online = (res_edc_bca[2].toString().includes('NOEDC') ? 'NOEDC-0000-00-00 00:00:00' : res_edc_bca[2].toString().toUpperCase());
                }

                if(res_data_inti[25].includes('NEM:N') && res_data_inti[25].includes('E02: ') || ( (res_data_inti[25].includes('E02:0.0.0.0')) ||(res_data_inti[25].includes('E02:127.0.0.1')) ) ){
                    edc_mandiri_setting = '-';
                    edc_mandiri_total_on = '0';
                    edc_mandiri_total_off = '0';
                    edc_mandiri_last_online = 'NOEDC-0000-00-00 00:00:00';                                               
                }else{
                    res_edc_mandiri = res_data_inti[25].split(';');
                    edc_mandiri_setting = res_edc_mandiri[3];
                    edc_mandiri_total_on = (res_edc_mandiri[0].toString().includes('NOEDC') ? '0' : res_edc_mandiri[0]);
                    edc_mandiri_total_off = (res_edc_mandiri[1].toString().includes('NOEDC') ? '0' : res_edc_mandiri[1]);
                    edc_mandiri_last_online = (res_edc_mandiri[2].toString().includes('NOEDC') ? 'NOEDC-0000-00-00 00:00:00' : res_edc_mandiri[2].toString().toUpperCase()); 
                }

                if(res_data_inti[26].includes('NEM:N') && res_data_inti[26].includes('E02: ') || ( (res_data_inti[26].includes('E02:0.0.0.0')) ||(res_data_inti[26].includes('E02:127.0.0.1')))  ){
                    edc_mti_setting = '-';
                    edc_mti_total_on = '0';
                    edc_mti_total_off = '0';
                    edc_mti_last_online = 'NOEDC-0000-00-00 00:00:00';                                               
                }else{
                    if(res_data_inti[26] !== ''){
                        res_edc_mti = res_data_inti[26].split(';');
                        edc_mti_setting = res_edc_mti[3];
                        edc_mti_total_on = (res_edc_mti[0].toString().includes('NOEDC') ? '0' : res_edc_mti[0]);
                        edc_mti_total_off = (res_edc_mti[1].toString().includes('NOEDC') ? '0' : res_edc_mti[1]);
                        edc_mti_last_online = (res_edc_mti[2].toString().includes('NOEDC') ? 'NOEDC-0000-00-00 00:00:00' : res_edc_mti[2].toString().toUpperCase()); 
                    }else{
                        edc_mti_setting = '-';
                        edc_mti_total_on = '0';
                        edc_mti_total_off = '0';
                        edc_mti_last_online = '-';   
                    }
                    
                }
                res_rekomendasi_perbaikan = (res_station === 'I1' ? 'BELUM MEMERLUKAN PERBAIKAN' : (res_data_inti[27] === '' ? '-' : (res_data_inti[27].includes('CABANG') ? res_data_inti[27].toString() : 'BELUM MEMERLUKAN PERBAIKAN')) )
                res_status_jumlah_bsod = (res_data_inti[28] === '' ? '-' : parseFloat(res_data_inti[28].split('\r\n').join('').split('|').join('')) > 2 ? 'NOK-Jumlah BSOD : '+res_data_inti[28].split('\r\n').join('').split('|').join('') : 'OK')
                res_folder_backoff_sharing_mode = (res_data_inti[29] === '' ? '-' : res_data_inti[29].split('"').join(''))
            }catch(Ex){
                console.log('Error : '+Ex.toString())
            }
        }
        //Update object's name property.
        data_rows[objIndex].CLICK_FOR_ACTION = res_data_msg;
        data_rows[objIndex].KODE = res_data_code;
        data_rows[objIndex].KETERANGAN = res_data_msg;
        data_rows[objIndex].REQUEST = res_request;
        data_rows[objIndex].RESPONSE = res_response;
        data_rows[objIndex].KDCAB = res_kdcab;
        data_rows[objIndex].KDTK =  res_kdtk;
        data_rows[objIndex].NAMA = res_nama;
        data_rows[objIndex].STATION = res_station;
        data_rows[objIndex].IP = res_ip;
        data_rows[objIndex].OS = res_os;
        data_rows[objIndex].ARSITEKTUR = res_arsitektur;
        data_rows[objIndex].CPU_INFO = res_cpu_info;
        data_rows[objIndex].CPU_USAGE = res_cpu_usage;
        data_rows[objIndex].MEMORY_USAGE = res_memory_usage;
        data_rows[objIndex].MEMORY_TERPASANG = res_memory_terpasang;
        data_rows[objIndex].MEMORY_TERBACA = res_memory_terbaca;
        data_rows[objIndex].HDD_NAME = res_hdd_name;
        data_rows[objIndex].HDD_TOTAL = res_hdd_total;
        data_rows[objIndex].HDD_USED = res_hdd_used;
        data_rows[objIndex].HDD_FREE = res_hdd_free;
        data_rows[objIndex].HDD_HEALTH = res_hdd_health;
        data_rows[objIndex].MEDIA_TYPE = res_media_type;
        data_rows[objIndex].SETTING_HIBERNATE = res_status_hibernate;
        data_rows[objIndex].UPS_STATUS = res_ups_status;
        data_rows[objIndex].DEVICE_ID = res_device_id_ups;
        data_rows[objIndex].LAN_SPEED = res_lan_speed;
        data_rows[objIndex].UPTIME = res_uptime;
        data_rows[objIndex].AKTIVASI_WINDOWS = res_status_aktivasi_windows;
        data_rows[objIndex].PARTIAL_KEY_WINDOWS = res_key_windows;
        data_rows[objIndex].LAST_INSTALL = res_last_install;
        data_rows[objIndex].SUHU = res_suhu;
        data_rows[objIndex].BOOT_TIME = res_boot_time;
        data_rows[objIndex].LIST_IP = res_list_ip;
        data_rows[objIndex].SETTING_BCA = edc_bca_setting;
        data_rows[objIndex].EDC_BCA_ON = edc_bca_total_on;
        data_rows[objIndex].EDC_BCA_OFF = edc_bca_total_off;
        data_rows[objIndex].EDC_BCA_LAST = edc_bca_last_online;
        data_rows[objIndex].SETTING_MANDIRI= edc_mandiri_setting;
        data_rows[objIndex].EDC_MANDIRI_ON = edc_mandiri_total_on;
        data_rows[objIndex].EDC_MANDIRI_OFF = edc_mandiri_total_off;
        data_rows[objIndex].EDC_MANDIRI_LAST = edc_mandiri_last_online;
        data_rows[objIndex].SETTING_MTI = edc_mti_setting;
        data_rows[objIndex].EDC_MTI_ON = edc_mti_total_on;
        data_rows[objIndex].EDC_MTI_OFF = edc_mti_total_off;
        data_rows[objIndex].EDC_MTI_LAST = edc_mti_last_online;
        data_rows[objIndex].REKOMENDASI_PERBAIKAN = res_rekomendasi_perbaikan;
        data_rows[objIndex].STATUS_BSOD = res_status_jumlah_bsod;
        data_rows[objIndex].FOLDER_BACKOFF_SHARING_MODE = res_folder_backoff_sharing_mode
    }else{
        if(parse_data_inti.toString() === '2'){
            res_data_msg =  'Versi Powershell 2,Mohon Update!'
        }else if(parse_data_inti.toString().includes('NOK SE.dll')){
            res_data_msg = 'NOK SE,Mohon copykan SE.dll'
        }else if(parse_data_inti.toString() === 'Sudah di eksekusi'){
            res_data_msg = 'Mohon Update IDMCommandListeners!'
        }else if(parse_data_inti.toString().includes('Versi SE.dll Belum Update!')){
            res_data_msg = 'Versi SE.dll Belum Update!'
        }else if(parse_data_inti.toString() === '' && res_data_code === 200){
            res_data_code = 405
            res_data_msg = 'Blank'
        }else if(parse_data_inti.toString().includes('Job timed out after')){
            res_data_code = 406
            res_data_msg = 'Timeout Execute Command!'
        }else{
            try{
                const res_data_inti = parse_data_inti.toString().split('~');
                res_os = res_data_inti[0];
                res_arsitektur = res_data_inti[1];
                res_cpu_info = res_data_inti[2];
                res_cpu_usage =  (res_data_inti[3] !== '' ? res_data_inti[3] : '0');

                res_memory_usage = (res_data_inti[4] !== '' ? Math.ceil(res_data_inti[4])+'' : '0');
                res_memory_terpasang = (res_data_inti[5] !== '' ?  (res_data_inti[5].includes('MB') ? Math.ceil(parseFloat(res_data_inti[5].split(',').join('').split('MB').join('').trim()) / 1024)+' GB' : Math.ceil(res_data_inti[5])+' GB') : '0 GB');
                res_memory_terbaca = (res_data_inti[6] !== '' ? (res_data_inti[6].includes('MB') ? Math.ceil(parseFloat(res_data_inti[6].split(',').join('').split('MB').join('').trim()) / 1024)+' GB' : Math.ceil(res_data_inti[6])+' GB') : '0');
                
                res_hdd_name = (res_data_inti[7] !== '' ? res_data_inti[7] : '-');
                res_hdd_total = (res_data_inti[8] !== '' ? Math.round(res_data_inti[8])+' GB' : '0 GB');
                res_hdd_used = (res_data_inti[9] !== '' ? Math.round(res_data_inti[9])+' GB' : '0 GB');
                res_hdd_free = (res_data_inti[10] !== '' ? Math.round(res_data_inti[10])+' GB' : '0 GB');
                res_hdd_health = (res_data_inti[11] !== '' ? res_data_inti[11].split('Status').join('').split(' ').join('').split('OK').join('Healthy') : '-');
                res_media_type = res_data_inti[12];

                res_status_hibernate = res_data_inti[13];
                res_ups_status = (res_data_inti[14].includes('NOK') ? res_data_inti[14] : (res_data_inti[14] !== '' ? 'Terpasang: '+res_data_inti[14].split(' ')[0]+' Battery_Status: '+res_data_inti[14].split(' ')[1]+' Battery_Level: '+res_data_inti[14].split(' ')[2] : '-')) ;
                res_device_id_ups = (res_data_inti[15] !== '' ? res_data_inti[15] : '-');
                res_lan_speed = (res_data_inti[16] !== '' ? res_data_inti[16] : '-');
                res_uptime = (res_data_inti[17] !== '' ? res_data_inti[17] : '-');

                res_status_aktivasi_windows = (res_data_inti[18] !== '' ? res_data_inti[18] : '-');
                res_key_windows = '';
                const arr_key_windows = res_data_inti[19].split(':');
                const key1 = arr_key_windows[0];
                const key2 = arr_key_windows[1];
                if(key1 === key2){
                    res_key_windows = key1;
                }else if((key1 === '') && (key2 !== '')){
                    res_key_windows = key2;
                }else if(key1 !== '' && key2 !== ''){
                    if((key1 !== key2) && key2 !=='NOK Dll'){
                        res_key_windows = res_data_inti[19];
                    }else{
                        res_key_windows = key2;
                    }
                }else if((key1 !== '' && key2 ==='') || (key1 !== '' && key2 ==='NOK Dll')){
                    res_key_windows = key1;
                }

                let sp_last_install = res_data_inti[20].split('<DIR>          Windows').join('').split('Original Install Date:     ').join('').trim();
                res_last_install = sp_last_install
                
                res_suhu = (res_data_inti[21] !== '' ? parseFloat(res_data_inti[21]) : 0);
                res_boot_time = (res_data_inti[22] !== '' ? res_data_inti[22]+' Menit' : '-');
                res_list_ip = (res_data_inti[23] !== '' ? res_data_inti[23] : '-');
                //-- EDC BCA --//
                if(res_data_inti[24].includes('NEB:N') && res_data_inti[24].includes('E01: ') || ( (res_data_inti[24].includes('E01:0.0.0.0')) ||(res_data_inti[24].includes('E01:127.0.0.1')) ||(res_data_inti[24].includes('NOEDC')) ) ){
                    edc_bca_setting = '-';
                    edc_bca_total_on = '0';
                    edc_bca_total_off = '0';
                    edc_bca_last_online = 'NOEDC-0000-00-00 00:00:00';
                
                }else{
                    res_edc_bca = res_data_inti[24].split(';');
                    edc_bca_setting = res_edc_bca[3];
                    edc_bca_total_on = (res_edc_bca[0].toString().includes('NOEDC') ? '0' : res_edc_bca[0]);
                    edc_bca_total_off = (res_edc_bca[1].toString().includes('NOEDC') ? '0' : res_edc_bca[1]);
                    edc_bca_last_online = (res_edc_bca[2].toString().includes('NOEDC') ? 'NOEDC-0000-00-00 00:00:00' : res_edc_bca[2].toString().toUpperCase());
                }
                //-- EDC MANDIRI --//
                if(res_data_inti[25].includes('NEM:N') && res_data_inti[25].includes('E02: ') || ( (res_data_inti[25].includes('E02:0.0.0.0')) ||(res_data_inti[25].includes('E02:127.0.0.1')) ||(res_data_inti[25].includes('NOEDC'))) ){
                    edc_mandiri_setting = '-';
                    edc_mandiri_total_on = '0';
                    edc_mandiri_total_off = '0';
                    edc_mandiri_last_online = 'NOEDC-0000-00-00 00:00:00';                                               
                }else{
                    res_edc_mandiri = res_data_inti[25].split(';');
                    edc_mandiri_setting = res_edc_mandiri[3];
                    edc_mandiri_total_on = (res_edc_mandiri[0].toString().includes('NOEDC') ? '0' : res_edc_mandiri[0]);
                    edc_mandiri_total_off = (res_edc_mandiri[1].toString().includes('NOEDC') ? '0' : res_edc_mandiri[1]);
                    edc_mandiri_last_online = (res_edc_mandiri[2].toString().includes('NOEDC') ? 'NOEDC-0000-00-00 00:00:00' : res_edc_mandiri[2].toString().toUpperCase()); 
                }

                //-- EDC MTI --//
                if(res_data_inti[26].includes('NEM:N') && res_data_inti[26].includes('E02: ') || ( (res_data_inti[26].includes('E02:0.0.0.0')) ||(res_data_inti[26].includes('E02:127.0.0.1')) ||(res_data_inti[26].includes('NOEDC')))){
                    edc_mti_setting = '-';
                    edc_mti_total_on = '0';
                    edc_mti_total_off = '0';
                    edc_mti_last_online = 'NOEDC-0000-00-00 00:00:00';                                               
                }else{
                    if(res_data_inti[26] !== ''){
                        res_edc_mti = res_data_inti[26].split(';');
                        edc_mti_setting = res_edc_mti[3];
                        edc_mti_total_on = (res_edc_mti[0].toString().includes('NOEDC') ? '0' : res_edc_mti[0]);
                        edc_mti_total_off = (res_edc_mti[1].toString().includes('NOEDC') ? '0' : res_edc_mti[1]);
                        edc_mti_last_online = (res_edc_mti[2].toString().includes('NOEDC') ? 'NOEDC-0000-00-00 00:00:00' : res_edc_mti[2].toString().toUpperCase()); 
                    }else{
                        edc_mti_setting = '-';
                        edc_mti_total_on = '0';
                        edc_mti_total_off = '0';
                        edc_mti_last_online = '-';   
                    }
                }
                res_rekomendasi_perbaikan = (res_station === 'I1' ? 'BELUM MEMERLUKAN PERBAIKAN' : (res_data_inti[27] === '' ? '-' : (res_data_inti[27].includes('CABANG') ? res_data_inti[27].toString() : 'BELUM MEMERLUKAN PERBAIKAN')) )
                res_status_jumlah_bsod = (res_data_inti[28] === '' ? '-' : parseFloat(res_data_inti[28].split('\r\n').join('').split('|').join('')) > 2 ? 'NOK-Jumlah BSOD : '+res_data_inti[28].split('\r\n').join('').split('|').join('') : 'OK')
                res_folder_backoff_sharing_mode = (res_data_inti[29] === '' ? '-' : res_data_inti[29].split('"').join(''))
            }catch(Ex){
                console.log('Error : '+Ex.toString())
            }
        }
        const arr_content = {
            'CLICK_FOR_ACTION': res_data_code,
            'KODE': res_data_code,
            'KETERANGAN': res_data_msg,
            'REQUEST':res_request,
            'RESPONSE':res_response,
            'KDCAB': res_kdcab,
            'KDTK': res_kdtk,
            'NAMA': res_nama,
            'STATION': res_station,
            'IP': res_ip,
            'OS':res_os,
            'ARSITEKTUR':res_arsitektur,
            'CPU_INFO':res_cpu_info,
            'CPU_USAGE':res_cpu_usage,
            'MEMORY_USAGE':res_memory_usage,
            'MEMORY_TERPASANG':res_memory_terpasang,
            'MEMORY_TERBACA':res_memory_terbaca,
            'HDD_NAME':res_hdd_name,
            'HDD_TOTAL':res_hdd_total,
            'HDD_USED':res_hdd_used,
            'HDD_FREE':res_hdd_free,
            'HDD_HEALTH':res_hdd_health,
            'MEDIA_TYPE':res_media_type,
            'SETTING_HIBERNATE':res_status_hibernate,
            'UPS_STATUS':res_ups_status,
            'DEVICE_ID':res_device_id_ups,
            'AKTIVASI_WINDOWS':res_status_aktivasi_windows,
            'PARTIAL_KEY_WINDOWS':res_key_windows,
            'LAST_INSTALL':res_last_install,
            'LAN_SPEED':res_lan_speed,
            'UPTIME':res_uptime,
            'SUHU':res_suhu,
            'BOOT_TIME':res_boot_time,
            'LIST_IP':res_list_ip,
            'SETTING_BCA':(edc_bca_setting === '0' ? '-' : edc_bca_setting),
            'EDC_BCA_ON':edc_bca_total_on,
            'EDC_BCA_OFF':edc_bca_total_off,
            'EDC_BCA_LAST':edc_bca_last_online,
            'SETTING_MANDIRI':(edc_mandiri_setting === '0' ? '-' : edc_mandiri_setting),
            'EDC_MANDIRI_ON':edc_mandiri_total_on,
            'EDC_MANDIRI_OFF':edc_mandiri_total_off,
            'EDC_MANDIRI_LAST':edc_mandiri_last_online,
            'SETTING_MTI':(edc_mti_setting === '0' ? '-' : edc_mti_setting),
            'EDC_MTI_ON':edc_mti_total_on,
            'EDC_MTI_OFF':edc_mti_total_off,
            'EDC_MTI_LAST':edc_mti_last_online,
            'REKOMENDASI_PERBAIKAN':res_rekomendasi_perbaikan,
            'STATUS_BSOD':res_status_jumlah_bsod,
            'FOLDER_BACKOFF_SHARING_MODE':res_folder_backoff_sharing_mode
        };
        rows1.push(arr_content);
    }
    
    return rows1;
}