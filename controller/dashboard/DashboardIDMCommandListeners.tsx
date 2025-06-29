export function ReportStatusListeners(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:string,res_station:string,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any,conf_versi_listener:string,conf_versi_service_listener:string,conf_versi_idm_library:string,conf_versi_attribute:string,conf_versi_suhu:string,conf_versi_oskey:string,conf_versi_se:string,ok:number,nok_se:number,nok_oskey:number,nok_suhu:number,nok_file_cabang_ini:number,nok_versi_attribut:number,nok_versi_idmlibrary:number,nok_service_listener:number,nok_versi_service_listener:number,nok_versi_listener:number){
    let rows3: { KODE: any; KETERANGAN: any; REQUEST: any; RESPONSE: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; VERSI_LISTENER:string,VERSI_SERVICE_LISTENER:string,SERVICE_LISTENER:string,VERSI_IDMLIBRARY:string,FILE_CABANG_INI:string,VERSI_ATTRIBUTE:string,VERSI_SUHU:string,VERSI_OSKEY:string,VERSI_SE:string,STATUS:string}[] = [];
    let versi_listener = '-'
    let versi_listener_service = '-'
    let service_listener = '-'
    let versi_idmlibrary = '-'
    let file_cabang_ini = '-'
    let res_file_cabang_ini = '-'
    let versi_attribute = '-'
    let versi_suhu = '-'
    let versi_oskey = '-'
    let versi_se = '-'
    let status = '-'
    if(is_proses_ulang){
        if(res_data_code === 200 && parse_data_inti !== ''){
            if(parse_data_inti.includes('error : An error occurred') || parse_data_inti.includes('Error : ')){
                data_rows[objIndex].CLICK_FOR_ACTION = 405;
                data_rows[objIndex].KODE = 405;
                data_rows[objIndex].KETERANGAN = 'Error  Command';
                data_rows[objIndex].REQUEST = res_request;
                data_rows[objIndex].RESPONSE = res_response;
                data_rows[objIndex].KDCAB = res_kdcab;
                data_rows[objIndex].KDTK =  res_kdtk;
                data_rows[objIndex].NAMA = res_nama;
                data_rows[objIndex].STATION = res_station;
                data_rows[objIndex].IP = res_ip;
                data_rows[objIndex].VERSI_LISTENER = versi_listener;
                data_rows[objIndex].VERSI_SERVICE_LISTENER = versi_listener_service;
                data_rows[objIndex].SERVICE_LISTENER = service_listener;
                data_rows[objIndex].VERSI_IDMLIBRARY = versi_idmlibrary;
                data_rows[objIndex].FILE_CABANG_INI = file_cabang_ini;
                data_rows[objIndex].VERSI_ATTRIBUTE = versi_attribute;
                data_rows[objIndex].VERSI_SUHU = versi_suhu;
                data_rows[objIndex].VERSI_OSKEY = versi_oskey;
                data_rows[objIndex].VERSI_SE = versi_se;
                data_rows[objIndex].STATUS = status;
            }else{
                const res_data_inti = parse_data_inti.split(';');
                versi_listener = res_data_inti[0].trim();
                versi_listener_service = res_data_inti[1].split(':')[1].split(' ').join('').trim();
                service_listener = res_data_inti[2].split(':')[1].split(' ').join('').trim().toString().toUpperCase();
                versi_idmlibrary = res_data_inti[3].split(':')[1].split(' ').join('').trim();
                file_cabang_ini = res_data_inti[4].split(':')[1].split(' ').join('').trim();
                res_file_cabang_ini = file_cabang_ini;
                versi_attribute = res_data_inti[5].split('Versi attribute : ":"').join('').split('"').join('').split(' ').join('').trim();
                versi_suhu = res_data_inti[6].split(':')[1].split(' ').join('').trim();
                versi_oskey = res_data_inti[7].split(':')[1].split(' ').join('').trim().split('\r\n').join('').split('\n').join('').trim();
                versi_se = res_data_inti[8].split(':')[1].split(' ').join('').trim().split('\r\n').join('').split('\n').join('').trim();
                status = '';
                if(versi_listener.includes(conf_versi_listener)){
                    ok++;
                    
                    if(versi_listener_service === conf_versi_service_listener){
                        if(service_listener === 'RUNNING'){
                            if(versi_idmlibrary === conf_versi_idm_library){
                                if(versi_attribute === conf_versi_attribute){
                                    if(file_cabang_ini === res_kdcab || (file_cabang_ini.toString().toLowerCase() === res_kdcab.toString().toLowerCase() )){
                                        if(versi_suhu === conf_versi_suhu){
                                                if(versi_oskey.includes(conf_versi_oskey)){
                                                    
                                                    let for_simulasi_versi_se_toko = versi_se.split('.').join('')
                                                    let for_simulasi_conf_versi_se = conf_versi_se.split('.').join('')
                                                    if(versi_se.includes(conf_versi_se)){
                                                        status = 'OK';
                                                    }else if(parseFloat(for_simulasi_versi_se_toko) > parseFloat(for_simulasi_conf_versi_se)){
                                                        status = 'OK-SIMULASI SE'
                                                    }else{
                                                        status = 'NOK SE'
                                                        nok_se++;
                                                    }
                                                }else{
                                                    status = 'NOK LIBRARY OSKEY';
                                                    nok_oskey++;
                                                }
                                        }else{
                                            status = 'NOK LIBRARY SUHU';
                                            nok_suhu++;
                                        }
                                        
                                    }else{
                                        status = 'NOK CABANG INI';
                                        res_file_cabang_ini = 'NOK-'+file_cabang_ini;
                                        nok_file_cabang_ini++;
                                    }
                                }else{
                                    status = 'NOK ATTRIBUTE';
                                    nok_versi_attribut++;
                                }
                            }else{
                                status = 'NOK VERSI IDMCOMMANDLIBRARY';
                                nok_versi_idmlibrary++;
                            }
                        }else{
                            status = 'NOK SERVICE LISTENER';
                            nok_service_listener++;
                        }
                    }else{
                        status = 'NOK VERSI SERVICE LISTENER';
                        nok_versi_service_listener++;
                    }
                }else{
                    status = 'NOK VERSI LISTENER';
                    nok_versi_listener++;
                    
                }
            }
        }else{
            data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
            data_rows[objIndex].KODE = res_data_code;
            data_rows[objIndex].KETERANGAN =res_data_msg;
            data_rows[objIndex].REQUEST = res_request
            data_rows[objIndex].RESPONSE = res_request
            data_rows[objIndex].KDCAB = res_kdcab
            data_rows[objIndex].KDTK = res_kdtk
            data_rows[objIndex].NAMA = res_station
            data_rows[objIndex].STATION = res_station
            data_rows[objIndex].IP = res_ip
            data_rows[objIndex].VERSI_LISTENER = versi_listener;
            data_rows[objIndex].VERSI_SERVICE_LISTENER = versi_listener_service;
            data_rows[objIndex].SERVICE_LISTENER = service_listener;
            data_rows[objIndex].VERSI_IDMLIBRARY = versi_idmlibrary;
            data_rows[objIndex].FILE_CABANG_INI = file_cabang_ini;
            data_rows[objIndex].VERSI_ATTRIBUTE = versi_attribute;
            data_rows[objIndex].VERSI_SUHU = versi_suhu;
            data_rows[objIndex].VERSI_OSKEY = versi_oskey;
            data_rows[objIndex].VERSI_SE = versi_se;
            data_rows[objIndex].STATUS = status;
            rows3 = data_rows;
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            const res_data_inti = parse_data_inti.split(';');
            versi_listener = res_data_inti[0].trim();
            versi_listener_service = res_data_inti[1].split(':')[1].split(' ').join('').trim();
            service_listener = res_data_inti[2].split(':')[1].split(' ').join('').trim().toString().toUpperCase();
            versi_idmlibrary = res_data_inti[3].split(':')[1].split(' ').join('').trim();
            file_cabang_ini = res_data_inti[4].split(':')[1].split(' ').join('').trim();
            res_file_cabang_ini = file_cabang_ini;
            versi_attribute = res_data_inti[5].split('Versi attribute : ":"').join('').split('"').join('').split(' ').join('').trim();
            versi_suhu = res_data_inti[6].split(':')[1].split(' ').join('').trim();
            versi_oskey = res_data_inti[7].split(':')[1].split(' ').join('').trim().split('\r\n').join('').split('\n').join('').trim();
            versi_se = res_data_inti[8].split(':')[1].split(' ').join('').trim().split('\r\n').join('').split('\n').join('').trim();
            status = '';
            if(versi_listener.includes(conf_versi_listener)){
                ok++;
                
                if(versi_listener_service === conf_versi_service_listener){
                    if(service_listener === 'RUNNING'){
                        if(versi_idmlibrary === conf_versi_idm_library){
                            if(versi_attribute === conf_versi_attribute){
                                if(file_cabang_ini === res_kdcab || (file_cabang_ini.toString().toLowerCase() === res_kdcab.toString().toLowerCase() )){
                                    if(versi_suhu === conf_versi_suhu){
                                            if(versi_oskey.includes(conf_versi_oskey)){
                                                
                                                let for_simulasi_versi_se_toko = versi_se.split('.').join('')
                                                let for_simulasi_conf_versi_se = conf_versi_se.split('.').join('')
                                                if(versi_se.includes(conf_versi_se)){
                                                    status = 'OK';
                                                }else if(parseFloat(for_simulasi_versi_se_toko) > parseFloat(for_simulasi_conf_versi_se)){
                                                    status = 'OK-SIMULASI SE'
                                                }else{
                                                    status = 'NOK SE'
                                                    nok_se++;
                                                }
                                            }else{
                                                status = 'NOK LIBRARY OSKEY';
                                                nok_oskey++;
                                            }
                                    }else{
                                        status = 'NOK LIBRARY SUHU';
                                        nok_suhu++;
                                    }
                                    
                                }else{
                                    status = 'NOK CABANG INI';
                                    res_file_cabang_ini = 'NOK-'+file_cabang_ini;
                                    nok_file_cabang_ini++;
                                }
                            }else{
                                status = 'NOK ATTRIBUTE';
                                nok_versi_attribut++;
                            }
                        }else{
                            status = 'NOK VERSI IDMCOMMANDLIBRARY';
                            nok_versi_idmlibrary++;
                        }
                    }else{
                        status = 'NOK SERVICE LISTENER';
                        nok_service_listener++;
                    }
                }else{
                    status = 'NOK VERSI SERVICE LISTENER';
                    nok_versi_service_listener++;
                }
            }else{
                status = 'NOK VERSI LISTENER';
                nok_versi_listener++;
                
            }

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
                'VERSI_LISTENER':(versi_listener === '' ? 'Program tidak ada' : versi_listener),
                'VERSI_SERVICE_LISTENER':(versi_listener_service === '' ? 'Program tidak ada' : versi_listener_service),
                'SERVICE_LISTENER':service_listener.toString().toUpperCase(),
                'VERSI_IDMLIBRARY':versi_idmlibrary,
                'FILE_CABANG_INI':res_file_cabang_ini,
                'VERSI_ATTRIBUTE':versi_attribute,
                'VERSI_SUHU':(versi_suhu === '' ? 'Program tidak ada' : versi_suhu),
                'VERSI_OSKEY':(versi_oskey === '' ? 'Program tidak ada' : versi_oskey),
                'VERSI_SE':(versi_se === '' ? 'Program tidak ada' : versi_se),
                'STATUS':status
            };
            rows3.push(arr_content); 
            //-- failed listeners --//
        } else {
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
                'VERSI_LISTENER':(versi_listener === '' ? 'Program tidak ada' : versi_listener),
                'VERSI_SERVICE_LISTENER':(versi_listener_service === '' ? 'Program tidak ada' : versi_listener_service),
                'SERVICE_LISTENER':service_listener.toString().toUpperCase(),
                'VERSI_IDMLIBRARY':versi_idmlibrary,
                'FILE_CABANG_INI':res_file_cabang_ini,
                'VERSI_ATTRIBUTE':versi_attribute,
                'VERSI_SUHU':(versi_suhu === '' ? 'Program tidak ada' : versi_suhu),
                'VERSI_OSKEY':(versi_oskey === '' ? 'Program tidak ada' : versi_oskey),
                'VERSI_SE':(versi_se === '' ? 'Program tidak ada' : versi_se),
                'STATUS':status
            };
            rows3.push(arr_content); 
        }
    }
    return rows3;
}