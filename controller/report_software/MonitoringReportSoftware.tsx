export function ReportMonitoringProgramBackoff(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:any,res_station:any,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any,arr_list_program_server:any){
    let rows1: { 
            CLICK_FOR_ACTION:number,
            KODE:number; 
            KETERANGAN:string;
            REQUEST:string; 
            RESPONSE:string;
            KDCAB:string;
            NAMA:string,
            STATION:string,
            IP:string,
            NAMA_FILE:string,
            PATH_TOKO:string,
            VERSI_TOKO:string,
            SIZE_BYTES_TOKO:string,
            LAST_MODIFIED_TOKO:string,
            PATH_SERVER:string,
            VERSI_SERVER:string,
            SIZE_BYTES_SERVER:string,
            LAST_MODIFIED_SERVER:string,
            STATUS:string
    }[] = [];
    let res_nama_file = '-'
    let res_path_toko = '-'
    let res_versi_toko = '-'
    let res_size_bytes_toko = '-'
    let res_last_modified_toko = '-'
    let res_path_server = '-'
    let res_versi_server = '-'
    let res_size_bytes_server = '-'
    let res_last_modified_server = '-'
    let res_status = '-'
    if(is_proses_ulang){
        if(res_data_code === 200 && parse_data_inti !== ''){
            if(parse_data_inti.includes('error : An error occurred') || parse_data_inti.includes('Error : ')){
                data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = 'Error Command';
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_request
                data_rows[objIndex].KDCAB = res_kdcab
                data_rows[objIndex].KDTK = res_kdtk
                data_rows[objIndex].NAMA = res_station
                data_rows[objIndex].STATION = res_station
                data_rows[objIndex].IP = res_ip
                data_rows[objIndex].NAMA_FILE = res_nama_file
                data_rows[objIndex].PATH_TOKO = res_path_toko
                data_rows[objIndex].VERSI_TOKO = res_versi_toko
                data_rows[objIndex].SIZE_BYTES_TOKO = res_size_bytes_toko
                data_rows[objIndex].PATH_SERVER = res_path_server
                data_rows[objIndex].VERSI_SERVER = res_versi_server
                data_rows[objIndex].SIZE_BYTES_SERVER = res_size_bytes_server
                data_rows[objIndex].LAST_MODIFIED_SERVER = res_last_modified_server
                data_rows[objIndex].STATUS = res_status
            }else{
                try{   
                    const sp_record =  parse_data_inti.split('\n');
                    for(var p = 0;p<sp_record.length;p++){
                        const res_data_inti = sp_record[p].split('|');
                        const objIndex_list_server = arr_list_program_server.findIndex(((obj: { namaprogram: any; }) => obj.namaprogram == res_data_inti[0]));
                        //console.log('index : '+objIndex_list_server+' - length : '+arr_list_program_server.length+' -  namaprogram_server : '+JSON.stringify(arr_list_program_server[objIndex_list_server]))
                        if(objIndex_list_server !== -1){
                            const ubah_json_list_server = JSON.stringify(arr_list_program_server[objIndex_list_server]);
                            const parse_list_server = JSON.parse(ubah_json_list_server);
                            let namaprogram_server = parse_list_server.namaprogram;
                            //console.log('namaprogram_server : '+namaprogram_server);
                            let size_server = parse_list_server.size;
                            let versi_server = parse_list_server.versi;
                            let datemodified_server = parse_list_server.datemodified;
                            res_nama_file = res_data_inti[0]
                            res_versi_toko = res_data_inti[1]
                            res_last_modified_toko = res_data_inti[2]
                            res_size_bytes_toko =  res_data_inti[4]
                            res_path_toko = res_data_inti[3]
                            res_path_server = res_data_inti[3]
                            res_size_bytes_server = parse_list_server.size;
                            res_versi_server = parse_list_server.versi;
                            res_last_modified_server = parse_list_server.datemodified;
                            let res_versi = '';
                            if(res_data_inti[1].toString().trim() === versi_server.toString().trim()){
                                res_versi = 'VERSI:OK';
                            }else if(res_data_inti[1].toString().trim().split('.').join('') > versi_server.toString().trim().split('.').join('')){
                                res_versi = 'VERSI:MELEBIHI SERVER';
                            }else{
                                res_versi = 'VERSI:NOK';
                            }

                            let res_size = '';
                            if(res_data_inti[4].toString().trim() === size_server.toString().trim()){
                                res_size = 'SIZE:OK';
                            }else{
                                res_size = 'SIZE:NOK';
                            }
                            res_status = res_versi+'|'+res_size;
                            const result = data_rows.filter((_: any, index: number) => index !== objIndex);
                            console.log('result : '+JSON.stringify(result))
                            const arr_content = {
                                'CLICK_FOR_ACTION': res_data_code,
                                'KODE': res_data_code,
                                'KETERANGAN': res_data_msg,
                                'REQUEST': res_request,
                                'RESPONSE': res_response,
                                'KDCAB': res_kdcab,
                                'KDTK': res_kdtk,
                                'NAMA':res_nama,
                                'STATION': res_station,
                                'IP':res_ip,
                                'NAMA_FILE':res_nama_file,
                                'PATH_TOKO': res_path_toko,
                                'VERSI_TOKO': res_versi_toko,
                                'SIZE_BYTES_TOKO': res_size_bytes_toko,
                                'LAST_MODIFIED_TOKO':res_last_modified_toko,
                                'PATH_SERVER': res_path_server,
                                'VERSI_SERVER': res_versi_server,
                                'SIZE_BYTES_SERVER': res_size_bytes_server,
                                'LAST_MODIFIED_SERVER':res_last_modified_server,
                                'STATUS':res_status,
                            };
                            result.push(arr_content);
                            rows1 = result
                        }
                    }
                }catch(Ex){
                    data_rows[objIndex].CLICK_FOR_ACTION = 406;
                    data_rows[objIndex].KODE = 406;
                    data_rows[objIndex].KETERANGAN ='Error Parsing';
                    data_rows[objIndex].REQUEST = res_request
                    data_rows[objIndex].RESPONSE = res_request
                    data_rows[objIndex].KDCAB = res_kdcab
                    data_rows[objIndex].KDTK = res_kdtk
                    data_rows[objIndex].NAMA = res_station
                    data_rows[objIndex].STATION = res_station
                    data_rows[objIndex].IP = res_ip
                    data_rows[objIndex].NAMA_FILE = res_nama_file
                    data_rows[objIndex].PATH_TOKO = res_path_toko
                    data_rows[objIndex].VERSI_TOKO = res_versi_toko
                    data_rows[objIndex].SIZE_BYTES_TOKO = res_size_bytes_toko
                    data_rows[objIndex].LAST_MODIFIED_TOKO = res_last_modified_toko
                    data_rows[objIndex].PATH_SERVER = res_path_server
                    data_rows[objIndex].VERSI_SERVER = res_versi_server
                    data_rows[objIndex].SIZE_BYTES_SERVER = res_size_bytes_server
                    data_rows[objIndex].LAST_MODIFIED_SERVER = res_last_modified_server
                    data_rows[objIndex].STATUS = res_status
                }
            }
        }else{
            data_rows[objIndex].CLICK_FOR_ACTION = 405;
            data_rows[objIndex].KODE = 405;
            data_rows[objIndex].KETERANGAN ='Error Commmand';
            data_rows[objIndex].REQUEST = res_request
            data_rows[objIndex].RESPONSE = res_request
            data_rows[objIndex].KDCAB = res_kdcab
            data_rows[objIndex].KDTK = res_kdtk
            data_rows[objIndex].NAMA = res_station
            data_rows[objIndex].STATION = res_station
            data_rows[objIndex].IP = res_ip
            data_rows[objIndex].NAMA_FILE = res_nama_file
            data_rows[objIndex].PATH_TOKO = res_path_toko
            data_rows[objIndex].VERSI_TOKO = res_versi_toko
            data_rows[objIndex].SIZE_BYTES_TOKO = res_size_bytes_toko
            data_rows[objIndex].LAST_MODIFIED_TOKO = res_last_modified_toko
            data_rows[objIndex].PATH_SERVER = res_path_server
            data_rows[objIndex].VERSI_SERVER = res_versi_server
            data_rows[objIndex].SIZE_BYTES_SERVER = res_size_bytes_server
            data_rows[objIndex].LAST_MODIFIED_SERVER = res_last_modified_server
            data_rows[objIndex].STATUS = res_status
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            try{
                 const sp_record =  parse_data_inti.split('\n');
                    for(var p = 0;p<sp_record.length;p++){
                        const res_data_inti = sp_record[p].split('|');
                        const objIndex_list_server = arr_list_program_server.findIndex(((obj: { namaprogram: any; }) => obj.namaprogram == res_data_inti[0]));
                        //console.log('index : '+objIndex_list_server+' - length : '+arr_list_program_server.length+' -  namaprogram_server : '+JSON.stringify(arr_list_program_server[objIndex_list_server]))
                        if(objIndex_list_server !== -1){
                            const ubah_json_list_server = JSON.stringify(arr_list_program_server[objIndex_list_server]);
                            const parse_list_server = JSON.parse(ubah_json_list_server);
                            let namaprogram_server = parse_list_server.namaprogram;
                            let res_versi = '';
                            res_nama_file = res_data_inti[0]
                            res_versi_toko = res_data_inti[1]
                            res_last_modified_toko = res_data_inti[2]
                            res_size_bytes_toko =  res_data_inti[4]
                            res_path_toko = res_data_inti[3]
                            res_path_server = res_data_inti[3]
                            res_size_bytes_server = parse_list_server.size;
                            res_versi_server = parse_list_server.versi;
                            res_last_modified_server = parse_list_server.datemodified;

                            if(res_data_inti[1].toString().trim() === res_versi_server.toString().trim()){
                                res_versi = 'VERSI:OK';
                            }else if(res_data_inti[1].toString().trim().split('.').join('') > res_versi_server.toString().trim().split('.').join('')){
                                res_versi = 'VERSI:MELEBIHI SERVER';
                            }else{
                                res_versi = 'VERSI:NOK';
                            }

                            let res_size = '';
                            if(res_data_inti[4].toString().trim() === res_size_bytes_server.toString().trim()){
                                res_size = 'SIZE:OK';
                            }else{
                                res_size = 'SIZE:NOK';
                            }
                            res_status = res_versi+'|'+res_size;
                            const arr_content = {
                                'CLICK_FOR_ACTION': res_data_code,
                                'KODE': res_data_code,
                                'KETERANGAN': res_data_msg,
                                'REQUEST': res_request,
                                'RESPONSE': res_response,
                                'KDCAB': res_kdcab,
                                'KDTK': res_kdtk,
                                'NAMA':res_nama,
                                'STATION': res_station,
                                'IP':res_ip,
                                'NAMA_FILE':res_nama_file,
                                'PATH_TOKO': res_path_toko,
                                'VERSI_TOKO': res_versi_toko,
                                'SIZE_BYTES_TOKO': res_size_bytes_toko,
                                'LAST_MODIFIED_TOKO':res_last_modified_toko,
                                'PATH_SERVER': res_path_server,
                                'VERSI_SERVER': res_versi_server,
                                'SIZE_BYTES_SERVER': res_size_bytes_server,
                                'LAST_MODIFIED_SERVER':res_last_modified_server,
                                'STATUS':res_status,
                            };
                            rows1.push(arr_content);
                        }
                    }
            }catch(Ex){
                const arr_content = {
                    'CLICK_FOR_ACTION': 405,
                    'KODE': 405,
                    'KETERANGAN': 'Error Parsing',
                    'REQUEST': res_request,
                    'RESPONSE': res_response,
                    'KDCAB': res_kdcab,
                    'KDTK': res_kdtk,
                    'NAMA':res_nama,
                    'STATION': res_station,
                    'IP':res_ip,
                    'NAMA_FILE':res_nama_file,
                    'PATH_TOKO': res_path_toko,
                    'VERSI_TOKO': res_versi_toko,
                    'SIZE_BYTES_TOKO': res_size_bytes_toko,
                    'LAST_MODIFIED_TOKO':res_last_modified_toko,
                    'PATH_SERVER': res_path_server,
                    'VERSI_SERVER': res_versi_server,
                    'SIZE_BYTES_SERVER': res_size_bytes_server,
                    'LAST_MODIFIED_SERVER':res_last_modified_server,
                    'STATUS':res_status,
                };
                rows1.push(arr_content);
            }
            
        }else{
            const arr_content = {
                'CLICK_FOR_ACTION': res_data_code,
                'KODE': res_data_code,
                'KETERANGAN': res_data_msg,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA':res_nama,
                'STATION': res_station,
                'IP':res_ip,
                'NAMA_FILE':res_nama_file,
                'PATH_TOKO': res_path_toko,
                'VERSI_TOKO': res_versi_toko,
                'SIZE_BYTES_TOKO': res_size_bytes_toko,
                'LAST_MODIFIED_TOKO':res_last_modified_toko,
                'PATH_SERVER': res_path_server,
                'VERSI_SERVER': res_versi_server,
                'SIZE_BYTES_SERVER': res_size_bytes_server,
                'LAST_MODIFIED_SERVER':res_last_modified_server,
                'STATUS':res_status,
            };
            rows1.push(arr_content);
        }
    }
    return rows1;
}

export function Report_Monitoring_Apps_Os_Crash(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_data_code:number,res_data_msg:string,res_kdcab:string,res_kdtk:string,res_nama:string,res_station:string,res_ip:string,res_request:string,res_response:string,parse_data_inti:any){
    let rows1: { KODE: any; KETERANGAN: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; REQUEST: any; RESPONSE: any; MEMORY_TERPASANG: string; MEMORY_TERBACA: string; ARSITEKTUR: string; PROCESSOR: string; BSOD: number; HARD_RESET: number; TIDAK_TERDETEKSI: number;  APLIKASI_TERKENDALA_1: string; JUMLAH_CRASH_1:number,APLIKASI_TERKENDALA_2: string; JUMLAH_CRASH_2:number, APLIKASI_TERKENDALA_3: string; JUMLAH_CRASH_3:number }[] = [];

    let res_os_crash = 0;
    let res_hard_reset = 0;
    let res_unexpected = 0;
    let res_app_1,res_app_2,res_app_3 = '';
    let res_crash_1 = 0;let res_crash_2 = 0;let res_crash_3 = 0;
    if(is_proses_ulang){
        if (res_data_code === 200) {
            const sp_record =  parse_data_inti.split('|');
            const res_memory_terpasang = sp_record[0]+" GB";
            const res_memory_terbaca = Math.ceil(sp_record[1])+" GB";
            const res_arsitektur = sp_record[2];
            const res_processor = sp_record[3];
            let res_os_crash = '';
            const os_crash = sp_record[4];
            res_os_crash = os_crash === '' ? '-' : os_crash;
            let res_hard_reset = '';
            const hard_reset = sp_record[5];
            res_hard_reset = hard_reset === '' ? '-' : hard_reset;

            let res_unexpected = '';
            const unexpected = sp_record[6];
            res_unexpected = unexpected === '' ? '-' : unexpected;
            let res_app_1,res_app_2,res_app_3 = '';
            let res_crash_1,res_crash_2,res_crash_3 = '';
            try{
                const app = sp_record[7].split('Count Name').join('').split('----- ----').join('').split('The program').join(') ').split(' ').join('').trim().split('\r\n');//sp_record[6].split('Name').join('').split('----').join('').split('The program').join('').trim().split('\r\n')
                if(app.length === 3){
                    let app_1 = app[0] === '' ? '-' : app[0].includes('Theshellstopped') ? '-' : ''+(app[0].includes('.EXE') ? app[0].split('.EXE')[0].trim() : app[0].split('.exe')[0].trim() );
                    let app_2 = app[1] === '' ? '-' : app[1].includes('Theshellstopped') ? '-' : ''+(app[1].includes('.EXE') ? app[1].split('.EXE')[0].trim() : app[1].split('.exe')[0].trim() );
                    let app_3 = app[2] === '' ? '-' : app[2].includes('Theshellstopped') ? '-' : ''+(app[2].includes('.EXE') ? app[2].split('.EXE')[0].trim() : app[2].split('.exe')[0].trim() );
                    
                    res_crash_1 = app_1.split(')')[0];
                    res_app_1 = (app_1 === '-' ? '-' : app_1.split(')')[1]);

                    res_crash_2 = app_2.split(')')[0];
                    res_app_2 = (app_2 === '-' ? '-' : app_2.split(')')[1]);

                    res_crash_3 = app_3.split(')')[0];
                    res_app_3 = (app_3 === '-' ? '-' : app_3.split(')')[1]);

                }else if(app.length === 2){
                    let app_1 = app[0] === '' ? '-' : app[0].includes('Theshellstopped') ? '-' : ''+(app[0].includes('.EXE') ? app[0].split('.EXE')[0].trim() : app[0].split('.exe')[0].trim() );
                    let app_2 = app[1] === '' ? '-' : app[1].includes('Theshellstopped') ? '-' : ''+(app[1].includes('.EXE') ? app[1].split('.EXE')[0].trim() : app[1].split('.exe')[0].trim() );
                    
                    res_crash_1 = app_1.split(')')[0];
                    res_app_1 = (app_1 === '-' ? '-' : app_1.split(')')[1]);

                    res_crash_2 = app_2.split(')')[0];
                    res_app_2 = (app_2 === '-' ? '-' : app_2.split(')')[1]);
                    
                    res_app_3 = '-'
                    res_crash_3 = '-'
                }else if(app.length === 1){
                    let app_1 = app[0] === '' ? '-' : app[0].includes('Theshellstopped') ? '-' : ''+(app[0].includes('.EXE') ? app[0].split('.EXE')[0].trim() : app[0].split('.exe')[0].trim() );
                    res_crash_1 = app_1.split(')')[0];
                    res_app_1 = (app_1 === '-' ? '0' : app_1.split(')')[1]);

                    res_app_2 = '-'
                    res_crash_2 = '-'
                    res_app_3 = '-'
                    res_crash_3 = '-'
                }else{
                    res_app_1 = '-'
                    res_crash_1 = '-'
                    res_app_2 = '-'
                    res_crash_2 = '-'
                    res_app_3 = '-'
                    res_crash_3 = '-'
                }
            }catch(Ex){
                console.log('TOKO : '+res_kdtk)
                console.log('Error ListApp : '+Ex.toString())
                console.log('response : '+sp_record[7])
                res_app_1 = '-'
                res_crash_1 = '-'
                res_app_2 = '-'
                res_crash_2 = '-'
                res_app_3 = '-'
                res_crash_3 = '-'
            }
            data_rows[objIndex].KODE = res_data_code;
            data_rows[objIndex].KETERANGAN = res_data_msg;
            
            data_rows[objIndex].KDCAB = res_kdcab;
            data_rows[objIndex].KDTK = res_kdtk;
            data_rows[objIndex].NAMA = res_nama;
            data_rows[objIndex].STATION = res_station;
            data_rows[objIndex].IP = res_ip;
            data_rows[objIndex].REQUEST = res_request;
            data_rows[objIndex].RESPONSE = res_response;
            data_rows[objIndex].MEMORY_TERPASANG = res_memory_terpasang;
            data_rows[objIndex].MEMORY_TERBACA = res_memory_terbaca;
            data_rows[objIndex].ARSITEKTUR = res_arsitektur;
            data_rows[objIndex].PROCESSOR = res_processor;
            data_rows[objIndex].OS_CRASH = res_os_crash;
            data_rows[objIndex].HARD_RESET = res_hard_reset;
            data_rows[objIndex].UNEXPECTED = res_unexpected;
            data_rows[objIndex].APLIKASI_TERKENDALA_1 = res_app_1;
            data_rows[objIndex].JUMLAH_CRASH_1 = res_crash_1;
            data_rows[objIndex].APLIKASI_TERKENDALA_2 = res_app_2;
            data_rows[objIndex].JUMLAH_CRASH_2 = res_crash_2;
            data_rows[objIndex].APLIKASI_TERKENDALA_3 = res_app_3;
            data_rows[objIndex].JUMLAH_CRASH_3 = res_crash_3;
            //-- failed listeners --//
        } else {
            data_rows[objIndex].KODE = res_data_code;
            data_rows[objIndex].KETERANGAN = res_data_msg;
            data_rows[objIndex].KDCAB = res_kdcab;
            data_rows[objIndex].KDTK = res_kdtk;
            data_rows[objIndex].NAMA = res_nama;
            data_rows[objIndex].STATION = res_station;
            data_rows[objIndex].IP = res_ip;
            data_rows[objIndex].REQUEST = res_request;
            data_rows[objIndex].RESPONSE = res_response;
            data_rows[objIndex].MEMORY_TERPASANG = '-';
            data_rows[objIndex].MEMORY_TERBACA = '-';
            data_rows[objIndex].ARSITEKTUR = '-';
            data_rows[objIndex].PROCESSOR = '-';
            data_rows[objIndex].OS_CRASH = '-';
            data_rows[objIndex].HARD_RESET = '-';
            data_rows[objIndex].UNEXPECTED = '-';
            data_rows[objIndex].APLIKASI_TERKENDALA_1 = '-';
            data_rows[objIndex].JUMLAH_CRASH_1 = '-';
            data_rows[objIndex].APLIKASI_TERKENDALA_2 = '-';
            data_rows[objIndex].JUMLAH_CRASH_2 = '-';
            data_rows[objIndex].APLIKASI_TERKENDALA_3 = '-';
            data_rows[objIndex].JUMLAH_CRASH_3 = '-';
        }
    
    }else{
        if (res_data_code === 200) {
            const sp_record =  parse_data_inti.split('|');
            const res_memory_terpasang = sp_record[0]+" GB";
            const res_memory_terbaca = Math.ceil(sp_record[1])+" GB";
            const res_arsitektur = sp_record[2];
            const res_processor = sp_record[3];
            
            const os_crash = sp_record[4];
            res_os_crash = os_crash === '' ? 0 : (isNaN(parseFloat(os_crash)) ? 0 : parseFloat(os_crash));
            
            const hard_reset = sp_record[5];
            res_hard_reset = hard_reset === '' ? 0 : (isNaN(parseFloat(hard_reset)) ? 0 : parseFloat(hard_reset));

            const unexpected = sp_record[6];
            res_unexpected = unexpected === '' ? 0 : (isNaN(parseFloat(unexpected)) ? 0 : parseFloat(unexpected));
            
            try{
            const app = sp_record[7].split('Count Name').join('').split('----- ----').join('').split('The program').join(') ').split(' ').join('').trim().split('\r\n');//sp_record[6].split('Name').join('').split('----').join('').split('The program').join('').trim().split('\r\n')
            
            if(app.length === 3){
                let app_1 = app[0] === '' ? '-' : app[0].includes('Theshellstopped') ? '-' : ''+(app[0].includes('.EXE') ? app[0].split('.EXE')[0].trim() : app[0].split('.exe')[0].trim() );
                let app_2 = app[1] === '' ? '-' : app[1].includes('Theshellstopped') ? '-' : ''+(app[1].includes('.EXE') ? app[1].split('.EXE')[0].trim() : app[1].split('.exe')[0].trim() );
                let app_3 = app[2] === '' ? '-' : app[2].includes('Theshellstopped') ? '-' : ''+(app[2].includes('.EXE') ? app[2].split('.EXE')[0].trim() : app[2].split('.exe')[0].trim() );
                
                res_crash_1 = isNaN(parseFloat(app_1.split(')')[0])) ? 0 : parseFloat(app_1.split(')')[0]);
                res_app_1 = (app_1 === '-' ? '-' : app_1.split(')')[1]);
                res_crash_2 = isNaN(parseFloat(app_2.split(')')[0])) ? 0 : parseFloat(app_2.split(')')[0]);
                res_app_2 = (app_2 === '-' ? '-' : app_2.split(')')[1]);
                res_crash_3 = isNaN(parseFloat(app_3.split(')')[0])) ? 0 : parseFloat(app_3.split(')')[0]);
                res_app_3 = (app_3 === '-' ? '-' : app_3.split(')')[1]);
            }else if(app.length === 2){
                let app_1 = app[0] === '' ? '-' : app[0].includes('Theshellstopped') ? '-' : ''+(app[0].includes('.EXE') ? app[0].split('.EXE')[0].trim() : app[0].split('.exe')[0].trim() );
                let app_2 = app[1] === '' ? '-' : app[1].includes('Theshellstopped') ? '-' : ''+(app[1].includes('.EXE') ? app[1].split('.EXE')[0].trim() : app[1].split('.exe')[0].trim() );
                
                res_crash_1 = isNaN(parseFloat(app_1.split(')')[0])) ? 0 : parseFloat(app_1.split(')')[0]);
                res_app_1 = (app_1 === '-' ? '-' : app_1.split(')')[1]);

                res_crash_2 = isNaN(parseFloat(app_2.split(')')[0])) ? 0 : parseFloat(app_2.split(')')[0]);
                res_app_2 = (app_2 === '-' ? '-' : app_2.split(')')[1]);
                
                res_app_3 = '-'
                res_crash_3 = 0
            }else if(app.length === 1){
                let app_1 = app[0] === '' ? '-' : app[0].includes('Theshellstopped') ? '-' : ''+(app[0].includes('.EXE') ? app[0].split('.EXE')[0].trim() : app[0].split('.exe')[0].trim() );
                res_crash_1 = isNaN(parseFloat(app_1.split(')')[0])) ? 0 : parseFloat(app_1.split(')')[0]);
                res_app_1 = (app_1 === '-' ? '-' : app_1.split(')')[1]);
                res_app_2 = '-'
                res_crash_2 = 0
                res_app_3 = '-'
                res_crash_3 = 0
            }else{
                res_app_1 = '-'
                res_crash_1 = 0
                res_app_2 = '-'
                res_crash_2 = 0
                res_app_3 = '-'
                res_crash_3 = 0
            }
        
            }catch(Ex){
                console.log('Error ListApp : '+Ex.toString())
                console.log('response : '+sp_record[7])
                res_app_1 = '-'
                res_crash_1 = 0
                res_app_2 = '-'
                res_crash_2 = 0
                res_app_3 = '-'
                res_crash_3 = 0
            }

            //console.log('toko : '+res_kdtk+' res_station : '+res_station+' res_crash_1 : '+res_crash_1+' ISNaN : '+isNaN(res_crash_1))
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN': res_data_msg,
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'MEMORY_TERPASANG': res_memory_terpasang,
                'MEMORY_TERBACA':res_memory_terbaca,
                'ARSITEKTUR': res_arsitektur,
                'PROCESSOR': res_processor,
                'BSOD': res_os_crash,
                'HARD_RESET': res_hard_reset,
                'TIDAK_TERDETEKSI': res_unexpected,
                'APLIKASI_TERKENDALA_1': res_app_1,
                'JUMLAH_CRASH_1': res_crash_1,
                'APLIKASI_TERKENDALA_2': res_app_2,
                'JUMLAH_CRASH_2':res_crash_2,
                'APLIKASI_TERKENDALA_3': res_app_3,
                'JUMLAH_CRASH_3':res_crash_3,
            };
            rows1.push(arr_content);      
            //-- failed listeners --//
        } else {
            //const uniq_number = parseFloat(Math.floor(new Date().valueOf() * Math.random()).toString().substring(0,6));
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN': res_data_msg,
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'MEMORY_TERPASANG': '-',
                'MEMORY_TERBACA':'-',
                'ARSITEKTUR': '-',
                'PROCESSOR': '-',
                'BSOD': res_os_crash,
                'HARD_RESET': res_hard_reset,
                'TIDAK_TERDETEKSI':res_unexpected,
                'APLIKASI_TERKENDALA_1': res_app_1,
                'JUMLAH_CRASH_1':res_crash_1,
                'APLIKASI_TERKENDALA_2': res_app_2,
                'JUMLAH_CRASH_2':res_crash_2,
                'APLIKASI_TERKENDALA_3': res_app_3,
                'JUMLAH_CRASH_3':res_crash_3,
            };
            rows1.push(arr_content);
        }
    }
    return rows1;
}

export function Report_Monitoring_Mysql_For_Posnet(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_data_code:number,res_data_msg:string,res_kdcab:string,res_kdtk:string,res_nama:string,res_station:string,res_ip:string,res_request:string,res_response:string,parse_data_inti:any){
    let rows2: { KODE: any; KETERANGAN: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; REQUEST: any; RESPONSE: any; MEMORY_TERPASANG: string; MEMORY_TERBACA: string; ARSITEKTUR: string; PROCESSOR: string; MEDIA_TYPE:string,LAST_INSTALL:string, VERSION_MYSQL:string,ARCH:string,BINLOG_FORMAT:string,INNODB_BUFFER_POOL_SIZE:string,MAX_CONNETIONS:string,TRX_COMMIT:string,ERROR_LOG:string,MYSQL_BINLOG:string,MYSQL_IBDATA:string,DATABASE_ASING:string,ERROR_INNODB:string,TANGGAL_TRF_DATA:string,DURASI:string,FILE_TRF_DATA_1:string,FILE_TRF_DATA_2:string,FILE_TRF_DATA_3:string,PATH_MYSQL_DATAFILE: string,SIZE_FOLDER:number,JUMLAH_TABLE_FOLDER_POS:number,LAST_WRITE_ERRLOG:string,SIZE_ERRLOG:string,GROWTH_ERRLOG:string,TABLE_CORRUPT:string,DURASI_START_MYSQL:string,REKOMENDASI:string}[] = [];     
    let res_version_mysql = '-';
    let res_version_compile_os = '-';
    let res_binlog_format = '-';
    let res_innodb_buffer_pool_size = '-';
    let res_key_buffer_size = '-';
    let res_sort_buffer_size = '-';
    let res_buffer_size = '-';
    let res_max_connections = '-';
    let res_trx_commit = '-';
    let res_error_log = '-';
    let res_mysql_binlog = '-';
    let res_mysql_ibdata = '-';
    let res_database_asing = '-';
    let res_tanggal_trf_data = '-';
    let res_mulai_trf_data = '-';
    let res_selesai_trf_data = '-';
    let res_durasi = '-';
    let res_keterangan_trf_data = '-';
    let res_file_trf_data_1 = '-'
    let res_file_trf_data_2 = '-'
    let res_file_trf_data_3 = '-'
    let res_durasi_start_mysql = '00:00:00';

    let res_path_mysql_datafile = '-';
    let res_size_folder = 0;
    let res_jumlah_file_folder_pos = 0;
    let res_last_write_errlog = '-';
    let res_size_errlog = '-';
    let res_errlog_growth = '-';
    let res_table_corrupt = '-';
    let res_last_install = '-';
    let res_error_innodb = '-';
    let rekomendasi = '-'
    let res_rekomendasi = '-';
        if(is_proses_ulang){
            if (res_data_code === 200) {
                const sp_record =  parse_data_inti.split('|');
                const res_memory_terpasang = sp_record[0]+" GB";
                const res_memory_terbaca = Math.ceil(sp_record[1])+" GB";
                const res_arsitektur = sp_record[2];
                const res_processor = sp_record[3];
                const res_media_type = sp_record[4];
                try{
                    res_last_install = sp_record[5].split('Original Install Date:     ').join('').trim();
                }catch(ExcLastInstall){
                    res_last_install = '0000-00-00 00:00:00'
                }
                
                
                res_version_mysql = sp_record[6] === '' ? '-' : sp_record[6];
                res_version_compile_os = sp_record[7] === '' ? '-' : sp_record[7];
                res_binlog_format= sp_record[8] === '' ? '-' : sp_record[8];
                res_innodb_buffer_pool_size = ''
                if(Math.ceil(sp_record[1]) < 4 && parseFloat(sp_record[9].split(' MB').join('')) === 256 ){
                    res_innodb_buffer_pool_size =  sp_record[9] === '' ? '0' : sp_record[9]+'-'+'OK'
                }else if( (Math.ceil(sp_record[1]) === 4 || Math.ceil(sp_record[1]) < 8) && parseFloat(sp_record[9].split(' MB').join('')) === 512 ){
                    res_innodb_buffer_pool_size =  sp_record[9] === '' ? '0' : sp_record[9]+'-'+'OK'
                }else if( (Math.ceil(sp_record[1]) > 7) && parseFloat(sp_record[9].split(' MB').join('')) === 1024){
                    res_innodb_buffer_pool_size =  sp_record[9] === '' ? '0' : sp_record[9]+'-'+'OK'
                }else{
                    res_innodb_buffer_pool_size = sp_record[9] === '' ? '0' : sp_record[9]+'-'+'NOK'
                }
                
                res_max_connections = sp_record[10] === '' ? '0' : sp_record[10];
                res_trx_commit = sp_record[11] === '' ? '0' : sp_record[11];
                res_error_log = sp_record[12] === '' ? '-' : sp_record[12];
                res_mysql_binlog = sp_record[13] === '' ? '-' : sp_record[13];
                res_mysql_ibdata = sp_record[14] === '' ? '-' : sp_record[14];
                res_database_asing = sp_record[15] === '' ? '-' : sp_record[15];
                res_durasi_start_mysql = ''
                if(sp_record[16] === '0' || sp_record[16] === '')
                {
                    res_durasi_start_mysql =  '00:00:00'
                }
                else if(sp_record[16].includes('.'))
                {
                    res_durasi_start_mysql = sp_record[16].split('.')[1]
                }
                else
                {
                    res_durasi_start_mysql = sp_record[16]
                }
                
                
                res_tanggal_trf_data = sp_record[17] === '' ? '0000-00-00' : sp_record[17];
                res_mulai_trf_data = sp_record[18] === '' ? '00:00:00' : sp_record[18];
                res_selesai_trf_data = sp_record[19] === '' ? '00:00:00' : sp_record[19];
                res_durasi = sp_record[20] === '' ? '00:00:00' : sp_record[20];
                res_keterangan_trf_data = sp_record[21] === '' ? '-' : sp_record[21];
                try{
                        let sp_keterangan_trf_data =  sp_record[21].split(',')
                        res_file_trf_data_1 = sp_keterangan_trf_data[0].split(' ').join('')
                        res_file_trf_data_2 = sp_keterangan_trf_data[1].split(' ').join('')
                        res_file_trf_data_3 = sp_keterangan_trf_data[2].split(' ').join('')
                            
                }catch(Ex){
                        console.log('error : '+Ex.toString())
                        res_file_trf_data_1 = '-'
                        res_file_trf_data_2 = '-'
                        res_file_trf_data_3 = '-'
                }
                
                try{
                    res_path_mysql_datafile = sp_record[22] === '' ? '-' : sp_record[22];
                }catch(Ex_PathMysqlDataFile){
                    res_path_mysql_datafile = '';
                }

                try{
                    res_size_folder = sp_record[23] === '' ? 0 : Math.ceil(sp_record[23]);
                }catch(ExSizeFolderPos){
                    res_size_folder = 0;
                }

                try{
                    if(sp_record[24] === '' || sp_record[24].toString().length === 0){
                        res_jumlah_file_folder_pos = 0;
                    }else{
                        res_jumlah_file_folder_pos = parseFloat(sp_record[24]);
                    }
                    
                }catch(ExcJumlahFileFolderPos){
                    res_jumlah_file_folder_pos = 0
                }
                
                //-- ----------------------------------------------------------------- //
                let conv_size_errlog = 0
                try{
                    const data_errlog = sp_record[25].split('"').join('').split(',');
                    res_last_write_errlog = sp_record[25] === '' ? '-' :  data_errlog[1];
                    conv_size_errlog =  parseFloat(data_errlog[0])/1024/1024;
                    res_size_errlog = sp_record[25] === '' ? '-' : conv_size_errlog.toFixed(2);
                }catch(ExcSizeerrlog){
                    conv_size_errlog = 0
                    res_size_errlog = '0'
                }
            
                
                let data_errlog_last = 0;
                let hitung_growth = '0';
                try{
                    data_errlog_last = sp_record[26] === '' ? 0 : parseFloat(sp_record[26].split('"').join(''))/1024/1024;
                    hitung_growth = ''+(data_errlog_last === 0  ? '0.00' : ( parseFloat((conv_size_errlog - data_errlog_last).toFixed(2)) < 0 ? '0.00' : (conv_size_errlog - data_errlog_last).toFixed(2)  ));
                }catch(Ex_err_last){
                    data_errlog_last = 0
                    hitung_growth = '0'
                }
                
                
                res_errlog_growth = hitung_growth;
                try{
                    if(sp_record[27] === '' || sp_record[27].toString().length === 0){
                        res_table_corrupt = '-';
                    }else{
                        res_table_corrupt = sp_record[27];
                    }
                    
                }catch(ExcTableCorrupt){
                    res_table_corrupt = '-';
                }

                try{
                    res_error_innodb = ''
                    if(sp_record[28] === '' || sp_record[28].toString().length === 0){
                        res_error_innodb = '-'
                    }else{
                        res_error_innodb = sp_record[28]
                    }
                }catch(ExcErrorInnoDB){
                    res_error_innodb = '-';
                }

                try{
                    //rekomendasi
                    //-- durasi start mysql > 2 menit
                    if(res_durasi_start_mysql.toString().substring(3,5) === '00' || res_durasi_start_mysql.toString().substring(3,5) === '01' || (res_durasi_start_mysql.toString().substring(3,5) === '02' && parseFloat(res_durasi_start_mysql.toString().substring(7,8)) === 0)){
                        rekomendasi += ','                            
                    }else{
                        rekomendasi += 'CABANG,'
                    }
                    //-- growth errlog --//
                    if(parseFloat(res_errlog_growth) > 1){
                        rekomendasi += 'REGION,'
                    }else{
                        rekomendasi += 'CABANG,'
                    }
                    //-- tidak ada table corrupt --//
                    if(res_table_corrupt === '-' || res_table_corrupt === ''){
                        rekomendasi += 'CABANG,'
                    }else{
                        rekomendasi += 'REGION,'
                    }
                    //-- skema DB tidak standar --//
                    if(res_database_asing === '-'){
                        rekomendasi += 'CABANG,'
                    }else{
                        rekomendasi += 'REGION,'
                    }
                    //-- setting binlog_format --//
                    if(res_binlog_format === 'MIXED'){
                        rekomendasi += 'CABANG,'
                    }else{
                        rekomendasi += 'REGION,'
                    }
                    //-- setting innodb buffer pool size --//
                    if(res_innodb_buffer_pool_size.includes('-OK')){
                        rekomendasi += 'CABANG,'
                    }else{
                        rekomendasi += 'REGION,'
                    }
                }catch(ExcErrorRekomendasi){
                    rekomendasi = '-'
                }

                if(rekomendasi.includes('REGION')){
                    res_rekomendasi = 'REGION'
                }else{
                    if(res_durasi_start_mysql.toString().substring(3,5) === '00' || res_durasi_start_mysql.toString().substring(3,5) === '01' || (res_durasi_start_mysql.toString().substring(3,5) === '02' && parseFloat(res_durasi_start_mysql.toString().substring(7,8)) === 0)){
                        res_rekomendasi = 'TIDAK PERLU'                            
                    }else{
                        res_rekomendasi = 'CABANG'
                    }
                }
                

                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = res_data_msg;
                data_rows[objIndex].KDCAB = res_kdcab;
                data_rows[objIndex].KDTK = res_kdtk;
                data_rows[objIndex].NAMA = res_nama;
                data_rows[objIndex].STATION = res_station;
                data_rows[objIndex].IP = res_ip;
                data_rows[objIndex].REQUEST = res_request;
                data_rows[objIndex].RESPONSE = res_response;
                data_rows[objIndex].MEMORY_TERPASANG = '-';
                data_rows[objIndex].MEMORY_TERBACA = '-';
                data_rows[objIndex].ARSITEKTUR = '-';
                data_rows[objIndex].PROCESSOR = '-';

                data_rows[objIndex].VERSION_MYSQL = res_version_mysql;
                data_rows[objIndex].ARCH = res_arsitektur;
                data_rows[objIndex].PROCESSOR = res_arsitektur;
                data_rows[objIndex].MEDIA_TYPE = res_media_type;
                data_rows[objIndex].LAST_INSTALL = res_last_install;
                data_rows[objIndex].BINLOG_FORMAT = res_binlog_format;
                data_rows[objIndex].INNODB_BUFFER_POOL_SIZE = res_innodb_buffer_pool_size;
                data_rows[objIndex].MAX_CONNETIONS = res_max_connections;
                data_rows[objIndex].TRX_COMMIT =res_trx_commit;
                data_rows[objIndex].ERROR_LOG = res_error_log;
                data_rows[objIndex].MYSQL_BINLOG = res_mysql_binlog;
                data_rows[objIndex].MYSQL_IBDATA = res_mysql_ibdata;
                data_rows[objIndex].DATABASE_ASING = res_database_asing;
                data_rows[objIndex].DURASI_START_MYSQL = res_durasi_start_mysql;
                data_rows[objIndex].ERROR_INNODB = res_error_innodb;
                
                data_rows[objIndex].LAST_WRITE_ERRLOG = res_last_write_errlog;
                data_rows[objIndex].SIZE_ERRLOG = res_size_errlog;
                data_rows[objIndex].GROWTH_ERRLOG = res_errlog_growth;
                data_rows[objIndex].TABLE_CORRUPT = res_table_corrupt === '-' ? 'NO TABLE CORRUPT' : res_table_corrupt;
                data_rows[objIndex].PATH_MYSQL_DATAFILE = res_path_mysql_datafile;
                
                data_rows[objIndex].SIZE_FOLDER = res_size_folder;
                data_rows[objIndex].JUMLAH_FILE_FOLDER_POS = res_jumlah_file_folder_pos;

                data_rows[objIndex].TANGGAL_TRF_DATA = res_tanggal_trf_data;
                data_rows[objIndex].MULAI_TRF_DATA = res_mulai_trf_data;
                data_rows[objIndex].SELESAI_TRF_DATA = res_selesai_trf_data;
                data_rows[objIndex].DURASI = res_durasi;
                data_rows[objIndex].FILE_TRF_DATA_1 = res_file_trf_data_1;
                data_rows[objIndex].FILE_TRF_DATA_2 = res_file_trf_data_2;
                data_rows[objIndex].FILE_TRF_DATA_3 = res_file_trf_data_1;
                data_rows[objIndex].REKOMENDASI = res_rekomendasi;
                //-- failed listeners --//
            } else {
                //const uniq_number = parseFloat(Math.floor(new Date().valueOf() * Math.random()).toString().substring(0,6));
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = res_data_msg;
                data_rows[objIndex].KDCAB = res_kdcab;
                data_rows[objIndex].KDTK = res_kdtk;
                data_rows[objIndex].NAMA = res_nama;
                data_rows[objIndex].STATION = res_station;
                data_rows[objIndex].IP = res_ip;
                data_rows[objIndex].REQUEST = res_request;
                data_rows[objIndex].RESPONSE = res_response;
                data_rows[objIndex].MEMORY_TERPASANG = '-';
                data_rows[objIndex].MEMORY_TERBACA = '-';
                data_rows[objIndex].ARSITEKTUR = '-';
                data_rows[objIndex].PROCESSOR = '-';

                data_rows[objIndex].VERSION_MYSQL = res_version_mysql;
                data_rows[objIndex].ARCH = '-';
                data_rows[objIndex].PROCESSOR = '-';
                data_rows[objIndex].MEDIA_TYPE = '-';
                data_rows[objIndex].LAST_INSTALL = res_last_install;
                data_rows[objIndex].BINLOG_FORMAT = res_binlog_format;
                data_rows[objIndex].INNODB_BUFFER_POOL_SIZE = res_innodb_buffer_pool_size;
                data_rows[objIndex].MAX_CONNETIONS = res_max_connections;
                data_rows[objIndex].TRX_COMMIT =res_trx_commit;
                data_rows[objIndex].ERROR_LOG = res_error_log;
                data_rows[objIndex].MYSQL_BINLOG = res_mysql_binlog;
                data_rows[objIndex].MYSQL_IBDATA = res_mysql_ibdata;
                data_rows[objIndex].DATABASE_ASING = res_database_asing;
                data_rows[objIndex].DURASI_START_MYSQL = res_durasi_start_mysql;
                data_rows[objIndex].LAST_WRITE_ERRLOG = res_last_write_errlog;
                data_rows[objIndex].SIZE_ERRLOG = res_size_errlog;
                data_rows[objIndex].GROWTH_ERRLOG = res_errlog_growth;
                data_rows[objIndex].TABLE_CORRUPT = res_table_corrupt === '-' ? 'NO TABLE CORRUPT' : res_table_corrupt;
                data_rows[objIndex].PATH_MYSQL_DATAFILE = res_path_mysql_datafile;
                
                data_rows[objIndex].SIZE_FOLDER = res_size_folder;
                data_rows[objIndex].JUMLAH_FILE_FOLDER_POS = res_jumlah_file_folder_pos;

                data_rows[objIndex].TANGGAL_TRF_DATA = res_tanggal_trf_data;
                data_rows[objIndex].MULAI_TRF_DATA = res_mulai_trf_data;
                data_rows[objIndex].SELESAI_TRF_DATA = res_selesai_trf_data;
                data_rows[objIndex].DURASI = res_durasi;
                data_rows[objIndex].FILE_TRF_DATA_1 = res_file_trf_data_1;
                data_rows[objIndex].FILE_TRF_DATA_2 = res_file_trf_data_2;
                data_rows[objIndex].FILE_TRF_DATA_3 = res_file_trf_data_1;
                data_rows[objIndex].REKOMENDASI = res_rekomendasi;
            }
        }else{
            try{
                if (res_data_code === 200) {
                if(parse_data_inti.includes('Sudah di eksekusi') || parse_data_inti.includes('ANDA TIDAK MEMILIKI HAK AKSES') || parse_data_inti.includes('OTP INVALID'))
                {
                    const arr_content = {
                        'KODE': 406,
                        'KETERANGAN': 'Cek Versi Listener',
                        'KDCAB': res_kdcab,
                        'KDTK': res_kdtk,
                        'NAMA': res_nama,
                        'STATION': res_station,
                        'IP': res_ip,
                        'REQUEST': res_request,
                        'RESPONSE': res_response,
                        'MEMORY_TERPASANG': '-',
                        'MEMORY_TERBACA':'-',
                        'ARSITEKTUR': '-',
                        'PROCESSOR': '-',
                        'MEDIA_TYPE':'-',
                        'LAST_INSTALL':'-',
                        'VERSION_MYSQL': '-',
                        'ARCH': '-',
                        'BINLOG_FORMAT':'-',
                        'INNODB_BUFFER_POOL_SIZE': '-',
                        'MAX_CONNETIONS':'-',
                        'TRX_COMMIT':'-',
                        'ERROR_LOG':'-',
                        'MYSQL_BINLOG':'-',
                        'MYSQL_IBDATA':'-',
                        'DATABASE_ASING':'-',
                        'DURASI_START_MYSQL':'00:00:00',
                        'ERROR_INNODB':'-',
        
                        'LAST_WRITE_ERRLOG':'-',
                        'SIZE_ERRLOG':'0',
                        'GROWTH_ERRLOG':'0',
                        'TABLE_CORRUPT':'-',
                        
                        'PATH_MYSQL_DATAFILE':'-',
                        'SIZE_FOLDER':0,
                        'JUMLAH_TABLE_FOLDER_POS':0,
                        
                        'TANGGAL_TRF_DATA':'00-00-00',
                        'MULAI_TRF_DATA':'00:00:00',
                        'SELESAI_TRF_DATA':'00:00:00',
                        'DURASI':'00:00:00',
                        'FILE_TRF_DATA_1':'-',
                        'FILE_TRF_DATA_2':'-',
                        'FILE_TRF_DATA_3':'-',
                        'REKOMENDASI':res_rekomendasi
                        
                    };
                    rows2.push(arr_content);
                }
                else
                {
                    const sp_record =  parse_data_inti.split('|');
                    const res_memory_terpasang = sp_record[0]+" GB";
                    const res_memory_terbaca = Math.ceil(sp_record[1])+" GB";
                    const res_arsitektur = sp_record[2];
                    const res_processor = sp_record[3];
                    const res_media_type = sp_record[4];
                    try{
                        res_last_install = sp_record[5].split('Original Install Date:     ').join('').trim();
                    }catch(ExcLastInstall){
                        res_last_install = '0000-00-00 00:00:00'
                    }
                    
                    
                    res_version_mysql = sp_record[6] === '' ? '-' : sp_record[6];
                    res_version_compile_os = sp_record[7] === '' ? '-' : sp_record[7];
                    res_binlog_format= sp_record[8] === '' ? '-' : sp_record[8];
                    res_innodb_buffer_pool_size = ''
                    if(Math.ceil(sp_record[1]) < 4 && parseFloat(sp_record[9].split(' MB').join('')) === 256 ){
                        res_innodb_buffer_pool_size =  sp_record[9] === '' ? '0' : sp_record[9]+'-'+'OK'
                    }else if( (Math.ceil(sp_record[1]) === 4 || Math.ceil(sp_record[1]) < 8) && parseFloat(sp_record[9].split(' MB').join('')) === 512 ){
                        res_innodb_buffer_pool_size =  sp_record[9] === '' ? '0' : sp_record[9]+'-'+'OK'
                    }else if( (Math.ceil(sp_record[1]) > 7) && parseFloat(sp_record[9].split(' MB').join('')) === 1024){
                        res_innodb_buffer_pool_size =  sp_record[9] === '' ? '0' : sp_record[9]+'-'+'OK'
                    }else{
                        res_innodb_buffer_pool_size = sp_record[9] === '' ? '0' : sp_record[9]+'-'+'NOK'
                    }
                    
                    res_max_connections = sp_record[10] === '' ? '0' : sp_record[10];
                    res_trx_commit = sp_record[11] === '' ? '0' : sp_record[11];
                    res_error_log = sp_record[12] === '' ? '-' : sp_record[12];
                    res_mysql_binlog = sp_record[13] === '' ? '-' : sp_record[13];
                    res_mysql_ibdata = sp_record[14] === '' ? '-' : sp_record[14];
                    res_database_asing = sp_record[15] === '' ? '-' : sp_record[15];
                    res_durasi_start_mysql = ''
                    if(sp_record[16] === '0' || sp_record[16] === '')
                    {
                        res_durasi_start_mysql =  '00:00:00'
                    }
                    else if(sp_record[16].includes('.'))
                    {
                        res_durasi_start_mysql = sp_record[16].split('.')[1]
                    }
                    else
                    {
                        res_durasi_start_mysql = sp_record[16]
                    }
                    
                    
                    res_tanggal_trf_data = sp_record[17] === '' ? '0000-00-00' : sp_record[17];
                    res_mulai_trf_data = sp_record[18] === '' ? '00:00:00' : sp_record[18];
                    res_selesai_trf_data = sp_record[19] === '' ? '00:00:00' : sp_record[19];
                    res_durasi = sp_record[20] === '' ? '00:00:00' : sp_record[20];
                    res_keterangan_trf_data = sp_record[21] === '' ? '-' : sp_record[21];
                    try{
                            let sp_keterangan_trf_data =  sp_record[21].split(',')
                            res_file_trf_data_1 = sp_keterangan_trf_data[0].split(' ').join('')
                            res_file_trf_data_2 = sp_keterangan_trf_data[1].split(' ').join('')
                            res_file_trf_data_3 = sp_keterangan_trf_data[2].split(' ').join('')
                                
                    }catch(Ex){
                            console.log('error : '+Ex.toString())
                            res_file_trf_data_1 = '-'
                            res_file_trf_data_2 = '-'
                            res_file_trf_data_3 = '-'
                    }
                    
                    try{
                        res_path_mysql_datafile = sp_record[22] === '' ? '-' : sp_record[22];
                    }catch(Ex_PathMysqlDataFile){
                        res_path_mysql_datafile = '';
                    }

                    try{
                        res_size_folder = sp_record[23] === '' ? 0 : Math.ceil(sp_record[23]);
                    }catch(ExSizeFolderPos){
                        res_size_folder = 0;
                    }

                    try{
                        if(sp_record[24] === '' || sp_record[24].toString().length === 0){
                            res_jumlah_file_folder_pos = 0;
                        }else{
                            res_jumlah_file_folder_pos = parseFloat(sp_record[24]);
                        }
                        
                    }catch(ExcJumlahFileFolderPos){
                        res_jumlah_file_folder_pos = 0
                    }
                    
                    //-- ----------------------------------------------------------------- //
                    let conv_size_errlog = 0
                    try{
                        const data_errlog = sp_record[25].split('"').join('').split(',');
                        res_last_write_errlog = sp_record[25] === '' ? '-' :  data_errlog[1];
                        conv_size_errlog =  parseFloat(data_errlog[0])/1024/1024;
                        res_size_errlog = sp_record[25] === '' ? '-' : conv_size_errlog.toFixed(2);
                    }catch(ExcSizeerrlog){
                        conv_size_errlog = 0
                        res_size_errlog = '0'
                    }
                
                    
                    let data_errlog_last = 0;
                    let hitung_growth = '0';
                    try{
                        data_errlog_last = sp_record[26] === '' ? 0 : parseFloat(sp_record[26].split('"').join(''))/1024/1024;
                        hitung_growth = ''+(data_errlog_last === 0  ? '0.00' : ( parseFloat((conv_size_errlog - data_errlog_last).toFixed(2)) < 0 ? '0.00' : (conv_size_errlog - data_errlog_last).toFixed(2)  ));
                    }catch(Ex_err_last){
                        data_errlog_last = 0
                        hitung_growth = '0'
                    }
                    
                    
                    res_errlog_growth = hitung_growth;
                    try{
                        if(sp_record[27] === '' || sp_record[27].toString().length === 0){
                            res_table_corrupt = '-';
                        }else{
                            res_table_corrupt = sp_record[27];
                        }
                        
                    }catch(ExcTableCorrupt){
                        res_table_corrupt = '-';
                    }

                    try{
                        res_error_innodb = ''
                        if(sp_record[28] === '' || sp_record[28].toString().length === 0){
                            res_error_innodb = '-'
                        }else{
                            res_error_innodb = sp_record[28]
                        }
                    }catch(ExcErrorInnoDB){
                        res_error_innodb = '-';
                    }

                    try{
                        //rekomendasi
                        //-- durasi start mysql > 2 menit
                        if(res_durasi_start_mysql.toString().substring(3,5) === '00' || res_durasi_start_mysql.toString().substring(3,5) === '01' || (res_durasi_start_mysql.toString().substring(3,5) === '02' && parseFloat(res_durasi_start_mysql.toString().substring(7,8)) === 0)){
                            rekomendasi += ','                            
                        }else{
                            rekomendasi += 'CABANG,'
                        }
                        //-- growth errlog --//
                        if(parseFloat(res_errlog_growth) > 1){
                            rekomendasi += 'REGION,'
                        }else{
                            rekomendasi += 'CABANG,'
                        }
                        //-- tidak ada table corrupt --//
                        if(res_table_corrupt === '-' || res_table_corrupt === ''){
                            rekomendasi += 'CABANG,'
                        }else{
                            rekomendasi += 'REGION,'
                        }
                        //-- skema DB tidak standar --//
                        if(res_database_asing === '-'){
                            rekomendasi += 'CABANG,'
                        }else{
                            rekomendasi += 'REGION,'
                        }
                        //-- setting binlog_format --//
                        if(res_binlog_format === 'MIXED'){
                            rekomendasi += 'CABANG,'
                        }else{
                            rekomendasi += 'REGION,'
                        }
                        //-- setting innodb buffer pool size --//
                        if(res_innodb_buffer_pool_size.includes('-OK')){
                            rekomendasi += 'CABANG,'
                        }else{
                            rekomendasi += 'REGION,'
                        }
                    }catch(ExcErrorRekomendasi){
                        rekomendasi = '-'
                    }

                    if(rekomendasi.includes('REGION')){
                        res_rekomendasi = 'REGION'
                    }else{
                        if(res_durasi_start_mysql.toString().substring(3,5) === '00' || res_durasi_start_mysql.toString().substring(3,5) === '01' || (res_durasi_start_mysql.toString().substring(3,5) === '02' && parseFloat(res_durasi_start_mysql.toString().substring(7,8)) === 0)){
                            res_rekomendasi = 'TIDAK PERLU'                            
                        }else{
                            res_rekomendasi = 'CABANG'
                        }
                    }
                    
                    
                    const arr_content = {
                        'KODE': res_data_code,
                        'KETERANGAN': res_data_msg,
                        'KDCAB': res_kdcab,
                        'KDTK': res_kdtk,
                        'NAMA': res_nama,
                        'STATION': res_station,
                        'IP': res_ip,
                        'REQUEST': res_request,
                        'RESPONSE': res_response,
                        'MEMORY_TERPASANG': res_memory_terpasang,
                        'MEMORY_TERBACA':res_memory_terbaca,
                        'ARSITEKTUR': res_arsitektur,
                        'PROCESSOR': res_processor,
                        'MEDIA_TYPE':res_media_type,
                        'LAST_INSTALL':res_last_install,
                        'VERSION_MYSQL': res_version_mysql,
                        'ARCH': res_version_compile_os,
                        'BINLOG_FORMAT':res_binlog_format,
                        'INNODB_BUFFER_POOL_SIZE': res_innodb_buffer_pool_size,
                        'MAX_CONNETIONS':res_max_connections,
                        'TRX_COMMIT':res_trx_commit,
                        'ERROR_LOG':res_error_log,
                        'MYSQL_BINLOG':res_mysql_binlog,
                        'MYSQL_IBDATA':res_mysql_ibdata,
                        'DATABASE_ASING':res_database_asing,
                        'DURASI_START_MYSQL':res_durasi_start_mysql,
                        'ERROR_INNODB':res_error_innodb,

                        'LAST_WRITE_ERRLOG':res_last_write_errlog,
                        'SIZE_ERRLOG':res_size_errlog,
                        'GROWTH_ERRLOG':res_errlog_growth,
                        'TABLE_CORRUPT':res_table_corrupt === '-' || res_table_corrupt === '' ? 'NO TABLE CORRUPT' : res_table_corrupt,
                        
                        'PATH_MYSQL_DATAFILE':res_path_mysql_datafile,
                        'SIZE_FOLDER':res_size_folder,
                        'JUMLAH_TABLE_FOLDER_POS':res_jumlah_file_folder_pos,

                        'TANGGAL_TRF_DATA':res_tanggal_trf_data,
                        'MULAI_TRF_DATA':res_mulai_trf_data,
                        'SELESAI_TRF_DATA':res_selesai_trf_data,
                        'DURASI':res_durasi,
                        'FILE_TRF_DATA_1':res_file_trf_data_1,
                        'FILE_TRF_DATA_2':res_file_trf_data_2,
                        'FILE_TRF_DATA_3':res_file_trf_data_3,
                        'REKOMENDASI':res_rekomendasi
                    };
                    rows2.push(arr_content);      
                }
                
                //-- failed listeners --//
            } else {
                const arr_content = {
                    'KODE': res_data_code,
                    'KETERANGAN': res_data_msg,
                    'KDCAB': res_kdcab,
                    'KDTK': res_kdtk,
                    'NAMA': res_nama,
                    'STATION': res_station,
                    'IP': res_ip,
                    'REQUEST': res_request,
                    'RESPONSE': res_response,
                    'MEMORY_TERPASANG': '-',
                    'MEMORY_TERBACA':'-',
                    'ARSITEKTUR': '-',
                    'PROCESSOR': '-',
                    'MEDIA_TYPE':'-',
                    'LAST_INSTALL':'-',
                    'VERSION_MYSQL': res_version_mysql,
                    'ARCH': res_version_compile_os,
                    'BINLOG_FORMAT':res_binlog_format,
                    'INNODB_BUFFER_POOL_SIZE': res_innodb_buffer_pool_size,
                    'MAX_CONNETIONS':res_max_connections,
                    'TRX_COMMIT':res_trx_commit,
                    'ERROR_LOG':res_error_log,
                    'MYSQL_BINLOG':res_mysql_binlog,
                    'MYSQL_IBDATA':res_mysql_ibdata,
                    'DATABASE_ASING':res_database_asing,
                    'DURASI_START_MYSQL':(res_durasi_start_mysql === '' ? '-' : res_durasi_start_mysql),
                    'ERROR_INNODB':res_error_innodb,
                    'LAST_WRITE_ERRLOG':res_last_write_errlog,
                    'SIZE_ERRLOG':res_size_errlog,
                    'GROWTH_ERRLOG':res_errlog_growth,
                    'TABLE_CORRUPT':res_table_corrupt === '-' || res_table_corrupt === '' ? 'NO TABLE CORRUPT' : res_table_corrupt,
                    
                    'PATH_MYSQL_DATAFILE':res_path_mysql_datafile,
                    'SIZE_FOLDER':res_size_folder,
                    'JUMLAH_TABLE_FOLDER_POS':res_jumlah_file_folder_pos,
                    
                    'TANGGAL_TRF_DATA':res_tanggal_trf_data,
                    'MULAI_TRF_DATA':res_mulai_trf_data,
                    'SELESAI_TRF_DATA':res_selesai_trf_data,
                    'DURASI':res_durasi,
                    'FILE_TRF_DATA_1':res_file_trf_data_1,
                    'FILE_TRF_DATA_2':res_file_trf_data_2,
                    'FILE_TRF_DATA_3':res_file_trf_data_3,
                    'REKOMENDASI':res_rekomendasi
                };
                rows2.push(arr_content);
            }
        }catch(Ex){
            console.log(Ex.toString())
            const arr_content = {
                'KODE': 405,
                'KETERANGAN': 'Error Command',
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'MEMORY_TERPASANG': '-',
                'MEMORY_TERBACA':'-',
                'ARSITEKTUR': '-',
                'PROCESSOR': '-',
                'MEDIA_TYPE':'-',
                'LAST_INSTALL':'-',
                'VERSION_MYSQL': '-',
                'ARCH': '-',
                'BINLOG_FORMAT':'-',
                'INNODB_BUFFER_POOL_SIZE': '-',
                'MAX_CONNETIONS':'-',
                'TRX_COMMIT':'-',
                'ERROR_LOG':'-',
                'MYSQL_BINLOG':'-',
                'MYSQL_IBDATA':'-',
                'DATABASE_ASING':'-',
                'DURASI_START_MYSQL':'00:00:00',
                'ERROR_INNODB':'-',

                'LAST_WRITE_ERRLOG':'-',
                'SIZE_ERRLOG':'0',
                'GROWTH_ERRLOG':'0',
                'TABLE_CORRUPT':'-',
                
                'PATH_MYSQL_DATAFILE':'-',
                'SIZE_FOLDER':0,
                'JUMLAH_TABLE_FOLDER_POS':0,
                
                'TANGGAL_TRF_DATA':'00-00-00',
                'MULAI_TRF_DATA':'00:00:00',
                'SELESAI_TRF_DATA':'00:00:00',
                'DURASI':'00:00:00',
                'FILE_TRF_DATA_1':'-',
                'FILE_TRF_DATA_2':'-',
                'FILE_TRF_DATA_3':'-',
                'REKOMENDASI':'-'
                
            };
            rows2.push(arr_content);
        }
        }
        

    return rows2;
}

export function Report_Monitoring_3_Aplikasi_Tertinggi(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_data_code:number,res_data_msg:string,res_kdcab:string,res_kdtk:string,res_nama:string,res_station:string,res_ip:string,res_request:string,res_response:string,parse_data_inti:any){
    let rows3: { KODE: any; KETERANGAN: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; REQUEST: any; RESPONSE: any; MEMORY_TERPASANG: any; MEMORY_TERBACA: any; MEMORY_USAGE:any, ARSITEKTUR: any; PROCESSOR: any;UPTIME:any, PROGRAM_1:any,MEMORY_USAGE_1:number,START_TIME_1:any,DURASI_1:any, PROGRAM_2:any,MEMORY_USAGE_2:number,START_TIME_2:any,DURASI_2:any, PROGRAM_3:any,MEMORY_USAGE_3:number,START_TIME_3:any,DURASI_3:any,DETIL_LOG:any}[] = [];    
    let res_app_1 = '-';
    let res_durasi_1 = '-';
    let res_memory_usage_1 = 0;
    let res_start_time_1 = '';
    let res_path_1 = '';
    let res_app_2 = '-';
    let res_durasi_2 = '-';
    let res_path_2 = '';
    let res_memory_usage_2 = 0;
    let res_start_time_2 = '';
    let res_app_3 = '-';
    let res_durasi_3 = '-';
    let res_memory_usage_3 = 0;
    let res_start_time_3 = '';
    let res_path_3 = '';
    let res_memory_terpasang = '-';
    let res_memory_terbaca = '-';
    let res_arsitektur = '-';
    let res_processor = '-';
    let res_memory_usage ='-';
    let res_uptime = '-';
    let res_detil_log = '';

    if(is_proses_ulang){
        if (res_data_code === 200) {
            const sp_record =  parse_data_inti.split('|');
            res_memory_terpasang = sp_record[0]+" GB";
            res_memory_terbaca = Math.ceil(sp_record[1])+" GB";
            res_arsitektur = sp_record[2];
            res_processor = sp_record[3];
            res_memory_usage = sp_record[4];
            res_uptime = sp_record[5];
            let res_apps = sp_record[6];
            res_detil_log = sp_record[7];
            try{
                var sp_data = res_apps.split('\r\n');                                                       
                res_app_1 = sp_data[0].split(',')[0].split('"').join('');
                res_start_time_1 = sp_data[0].split(',')[1].split('"').join(''); 
                res_durasi_1 = sp_data[0].split(',')[2].split('"').join(''); 
                res_memory_usage_1 = Math.ceil(sp_data[0].split(',')[3].split('"').join(''));
                res_app_2 = sp_data[1].split(',')[0].split('"').join('');
                res_start_time_2 = sp_data[1].split(',')[1].split('"').join(''); 
                res_durasi_2 = sp_data[1].split(',')[2].split('"').join(''); 
                res_memory_usage_2 = Math.ceil(sp_data[1].split(',')[3].split('"').join(''));
                res_app_3 = sp_data[2].split(',')[0].split('"').join('');
                res_start_time_3 = sp_data[2].split(',')[1].split('"').join(''); 
                res_durasi_3 = sp_data[2].split(',')[2].split('"').join(''); 
                res_memory_usage_3 = Math.ceil(sp_data[2].split(',')[3].split('"').join(''));
            }catch(Ex){
                console.log('Error ListApp : '+Ex.toString())
                res_app_1 = '0';
                res_app_2 = '0';
                res_app_3 = '0';
            }
            data_rows[objIndex].KODE = res_data_code;
            data_rows[objIndex].KETERANGAN = res_data_msg;
            data_rows[objIndex].KDCAB = res_kdcab;
            data_rows[objIndex].KDTK = res_kdtk;
            data_rows[objIndex].NAMA = res_nama;
            data_rows[objIndex].STATION = res_station;
            data_rows[objIndex].IP = res_ip;
            data_rows[objIndex].REQUEST = res_request;
            data_rows[objIndex].RESPONSE = res_response;
            data_rows[objIndex].MEMORY_TERPASANG = res_memory_terpasang;
            data_rows[objIndex].MEMORY_TERBACA = res_memory_terbaca;
            data_rows[objIndex].MEMORY_USAGE = res_memory_usage;
            data_rows[objIndex].ARSITEKTUR = res_arsitektur;
            data_rows[objIndex].PROCESSOR = res_processor;
            data_rows[objIndex].UPTIME = res_uptime;
            data_rows[objIndex].PROGRAM_1 = res_app_1;
            data_rows[objIndex].MEMORY_USAGE_1 = res_memory_usage_1;
            data_rows[objIndex].START_TIME_1 = res_start_time_1;
            data_rows[objIndex].DURASI_1 = res_durasi_1;
            
            data_rows[objIndex].PROGRAM_2 = res_app_2;
            data_rows[objIndex].MEMORY_USAGE_2 = res_memory_usage_2;
            data_rows[objIndex].START_TIME_2 = res_start_time_2;
            data_rows[objIndex].DURASI_2 = res_durasi_2;

            data_rows[objIndex].PROGRAM_3 = res_app_3;
            data_rows[objIndex].MEMORY_USAGE_3 = res_memory_usage_3;
            data_rows[objIndex].START_TIME_3 = res_start_time_3;
            data_rows[objIndex].DURASI_3 = res_durasi_3;
            //-- failed listeners --//
        } else {
            data_rows[objIndex].KODE = res_data_code;
            data_rows[objIndex].KETERANGAN = res_data_msg;
            data_rows[objIndex].KDCAB = res_kdcab;
            data_rows[objIndex].KDTK = res_kdtk;
            data_rows[objIndex].NAMA = res_nama;
            data_rows[objIndex].STATION = res_station;
            data_rows[objIndex].IP = res_ip;
            data_rows[objIndex].REQUEST = res_request;
            data_rows[objIndex].RESPONSE = res_response;
            data_rows[objIndex].MEMORY_TERPASANG = res_memory_terpasang;
            data_rows[objIndex].MEMORY_TERBACA = res_memory_terbaca;
            data_rows[objIndex].MEMORY_USAGE = res_memory_usage;
            data_rows[objIndex].ARSITEKTUR = res_arsitektur;
            data_rows[objIndex].PROCESSOR = res_processor;
            data_rows[objIndex].UPTIME = res_uptime;
            data_rows[objIndex].PROGRAM_1 = res_app_1;
            data_rows[objIndex].MEMORY_USAGE_1 = res_memory_usage_1;
            data_rows[objIndex].START_TIME_1 = res_start_time_1;
            data_rows[objIndex].DURASI_1 = res_durasi_1;
            
            data_rows[objIndex].PROGRAM_2 = res_app_2;
            data_rows[objIndex].MEMORY_USAGE_2 = res_memory_usage_2;
            data_rows[objIndex].START_TIME_2 = res_start_time_2;
            data_rows[objIndex].DURASI_2 = res_durasi_2;

            data_rows[objIndex].PROGRAM_3 = res_app_3;
            data_rows[objIndex].MEMORY_USAGE_3 = res_memory_usage_3;
            data_rows[objIndex].START_TIME_3 = res_start_time_3;
            data_rows[objIndex].DURASI_3 = res_durasi_3;
        }
    }else{
        if (res_data_code === 200) {
            const sp_record =  parse_data_inti.split('|');
            res_memory_terpasang = sp_record[0]+" GB";
            res_memory_terbaca = Math.ceil(sp_record[1])+" GB";
            res_arsitektur = sp_record[2];
            res_processor = sp_record[3];
            res_memory_usage = Math.round(sp_record[4])+" %";
            res_uptime = sp_record[5];
            let res_apps = sp_record[6];
            res_detil_log = sp_record[7];
            try{
                    var sp_data = res_apps.split('\r\n');
                    
                    res_app_1 = sp_data[0].split(',')[0].split('"').join('');
                    res_start_time_1 = sp_data[0].split(',')[1].split('"').join(''); 
                    res_durasi_1 = sp_data[0].split(',')[2].split('"').join(''); 
                    res_memory_usage_1 = Math.ceil(sp_data[0].split(',')[3].split('"').join(''));
                    //res_path_1 = sp_data[0].split(',')[4].split('"').join('').split('@{Path=').join('').split('}').join(''); 
                    // console.log('res_app_1 : '+res_app_1);
                    // console.log('res_start_time_1 : '+res_start_time_1);
                    // console.log('res_durasi_1 : '+res_durasi_1);
                    // console.log('res_memory_usage_1 : '+res_memory_usage_1);
                    
                    res_app_2 = sp_data[1].split(',')[0].split('"').join('');
                    res_start_time_2 = sp_data[1].split(',')[1].split('"').join(''); 
                    res_durasi_2 = sp_data[1].split(',')[2].split('"').join(''); 
                    res_memory_usage_2 = Math.ceil(sp_data[1].split(',')[3].split('"').join(''));
                    //res_path_2 = sp_data[1].split(',')[4].split('"').join('').split('@{Path=').join('').split('}').join('');; 

                    // console.log('res_app_2 : '+res_app_2);
                    // console.log('res_start_time_2 : '+res_start_time_2);
                    // console.log('res_durasi_2 : '+res_durasi_2);
                    // console.log('res_memory_usage_2 : '+res_memory_usage_2);

                    res_app_3 = sp_data[2].split(',')[0].split('"').join('');
                    res_start_time_3 = sp_data[2].split(',')[1].split('"').join(''); 
                    res_durasi_3 = sp_data[2].split(',')[2].split('"').join(''); 
                    res_memory_usage_3 = Math.ceil(sp_data[2].split(',')[3].split('"').join(''));
                    //res_path_3 = sp_data[2].split(',')[4].split('"').join('').split('@{Path=').join('').split('}').join('');; 

                    // console.log('res_app_3 : '+res_app_3);
                    // console.log('res_start_time_3 : '+res_start_time_3);
                    // console.log('res_durasi_3 : '+res_durasi_3);
                    // console.log('res_memory_usage_3 : '+res_memory_usage_3);
                    // console.log('==================================================')

                // }
        
            }catch(Ex){
                console.log('Error ListApp : '+Ex.toString())
                res_app_1 = '0';
                res_app_2 = '0';
                res_app_3 = '0';
            }

            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN': res_data_msg,
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'MEMORY_TERPASANG': res_memory_terpasang,
                'MEMORY_TERBACA':res_memory_terbaca,
                'MEMORY_USAGE': res_memory_usage,
                'ARSITEKTUR': res_arsitektur,
                'PROCESSOR': res_processor,
                'UPTIME': res_uptime,
                'PROGRAM_1': res_app_1,
                'MEMORY_USAGE_1': res_memory_usage_1,
                'START_TIME_1': res_start_time_1,
                'DURASI_1': res_durasi_1,
                //'PATH_1':res_path_1,
                'PROGRAM_2': res_app_2,
                'MEMORY_USAGE_2': res_memory_usage_2,
                'START_TIME_2': res_start_time_2,
                'DURASI_2': res_durasi_2,
                //'PATH_2':res_path_2,
                'PROGRAM_3': res_app_3,
                'MEMORY_USAGE_3': res_memory_usage_3,
                'START_TIME_3': res_start_time_3,
                'DURASI_3': res_durasi_3,
                //'PATH_3':res_path_3,
                'DETIL_LOG':res_detil_log
            };
            rows3.push(arr_content);      
            //-- failed listeners --//
        } else {
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN': res_data_msg,
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'MEMORY_TERPASANG': res_memory_terpasang,
                'MEMORY_TERBACA':res_memory_terbaca,
                'MEMORY_USAGE': res_memory_usage,
                'ARSITEKTUR': res_arsitektur,
                'PROCESSOR': res_processor,
                'UPTIME': res_uptime,
                'PROGRAM_1': res_app_1,
                'MEMORY_USAGE_1': res_memory_usage_1,
                'START_TIME_1': res_start_time_1,
                'DURASI_1': res_durasi_1,
                //'PATH_1':res_path_1,
                'PROGRAM_2': res_app_2,
                'MEMORY_USAGE_2': res_memory_usage_2,
                'START_TIME_2': res_start_time_2,
                'DURASI_2': res_durasi_2,
                //'PATH_2':res_path_2,
                'PROGRAM_3': res_app_3,
                'MEMORY_USAGE_3': res_memory_usage_3,
                'START_TIME_3': res_start_time_3,
                'DURASI_3': res_durasi_3,
                //'PATH_3':res_path_3,
                'DETIL_LOG':res_detil_log
            };
            rows3.push(arr_content);      
        }
    }
    return rows3;
}

export function Report_Monitoring_POS_Replikasi(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_data_code:number,res_data_msg:string,res_kdcab:string,res_kdtk:string,res_nama:string,res_station:string,res_ip:string,res_request:string,res_response:string,parse_data_inti:any){
    let rows4: {KODE: any; KETERANGAN: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; REQUEST: any; RESPONSE: any;SERVICE:any,LOG:any}[] = [];
    let res_service = '-';
    let res_log = '-';
    if(is_proses_ulang){
        
            if (res_data_code === 200) {
                const sp_record =  parse_data_inti.data.split('|');
                res_service = sp_record[0];
                res_log =  sp_record[1];
                
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = res_data_msg;
                data_rows[objIndex].KDCAB = res_kdcab;
                data_rows[objIndex].KDTK = res_kdtk;
                data_rows[objIndex].NAMA = res_nama;
                data_rows[objIndex].STATION = res_station;
                data_rows[objIndex].IP = res_ip;
                data_rows[objIndex].REQUEST = res_request;
                data_rows[objIndex].RESPONSE = res_response;
                data_rows[objIndex].SERVICE = res_service;
                data_rows[objIndex].LOG = res_log;
                rows4 = data_rows; 
                //-- failed listeners --//
            } else {
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = res_data_msg;
                data_rows[objIndex].KDCAB = res_kdcab;
                data_rows[objIndex].KDTK = res_kdtk;
                data_rows[objIndex].NAMA = res_nama;
                data_rows[objIndex].STATION = res_station;
                data_rows[objIndex].IP = res_ip;
                data_rows[objIndex].REQUEST = res_request;
                data_rows[objIndex].RESPONSE = res_response;
                data_rows[objIndex].SERVICE = res_service;
                data_rows[objIndex].LOG = res_log;
                rows4 = data_rows; 
            }
    }else{
        try{
            if (res_data_code === 200) {
                if(parse_data_inti.includes('Sudah di eksekusi') || parse_data_inti.includes('ANDA TIDAK MEMILIKI HAK AKSES') || parse_data_inti.includes('OTP INVALID'))
                {
                    const arr_content = {
                        'KODE': 406,
                        'KETERANGAN': 'Cek Versi Listener',
                        'KDCAB': res_kdcab,
                        'KDTK': res_kdtk,
                        'NAMA': res_nama,
                        'STATION': res_station,
                        'IP': res_ip,
                        'REQUEST': res_request,
                        'RESPONSE': res_response,
                        'SERVICE': '-',
                        'LOG':'-'
                    };
                    rows4.push(arr_content);
                }
                else
                {
                    const sp_record =  parse_data_inti.split('|');
                    const res_status = sp_record[0]
                    const res_log = sp_record[1]
                    
                    const arr_content = {
                        'KODE': res_data_code,
                        'KETERANGAN': res_data_msg,
                        'KDCAB': res_kdcab,
                        'KDTK': res_kdtk,
                        'NAMA': res_nama,
                        'STATION': res_station,
                        'IP': res_ip,
                        'REQUEST': res_request,
                        'RESPONSE': res_response,
                        'SERVICE': res_status,
                        'LOG':res_log,
                    };
                    rows4.push(arr_content);      
                }
                
                //-- failed listeners --//
            } else {
                const arr_content = {
                    'KODE': res_data_code,
                    'KETERANGAN': res_data_msg,
                    'KDCAB': res_kdcab,
                    'KDTK': res_kdtk,
                    'NAMA': res_nama,
                    'STATION': res_station,
                    'IP': res_ip,
                    'REQUEST': res_request,
                    'RESPONSE': res_response,
                    'SERVICE': '-',
                    'LOG':'-',
                };
                rows4.push(arr_content);
            }
        }catch(Ex){
            console.log(Ex.toString())
            const arr_content = {
                'KODE': 405,
                'KETERANGAN': 'Error Command',
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'SERVICE': '-',
                'LOG':'-'
            };
            rows4.push(arr_content);
        }
    }
    return rows4;
}

export function Report_Recon_Mtran_VS_SQLite(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_data_code:number,res_data_msg:string,res_kdcab:string,res_kdtk:string,res_nama:string,res_station:string,res_ip:string,res_request:string,res_response:string,parse_data_inti:any){
    let rows: { KODE: any; KETERANGAN: any; REQUEST:string, RESPONSE:string; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; HASIL: string;}[] = [];
    let res_hasil = '-';
    if(is_proses_ulang){
        res_hasil = (parse_data_inti.includes('No files') ? 'Tidak ada selisih sales SQLITE' : (parse_data_inti === '' ? '-' : parse_data_inti.split('\r\n').join(',')) );
        data_rows[objIndex].KODE = res_data_code;
        data_rows[objIndex].KETERANGAN = res_data_msg;
        data_rows[objIndex].REQUEST = res_request
        data_rows[objIndex].RESPONSE = res_request
        data_rows[objIndex].KDCAB = res_kdcab
        data_rows[objIndex].KDTK = res_kdtk
        data_rows[objIndex].NAMA = res_station
        data_rows[objIndex].STATION = res_station
        data_rows[objIndex].IP = res_ip
        data_rows[objIndex].STATUS = res_hasil
    }else{
        const sp_record = (parse_data_inti.includes('No files') ? 'Tidak ada selisih sales SQLITE' : (parse_data_inti === '' ? '-' : parse_data_inti.split('\r\n').join(',')) );
        if(res_data_code === 200){
            res_hasil = sp_record;
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN': res_data_msg,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'HASIL': res_hasil
            };
            rows.push(arr_content);      
        }else{
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN': res_data_msg,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'HASIL': res_hasil
            };
            rows.push(arr_content);      
        }
    }
    return rows;
}