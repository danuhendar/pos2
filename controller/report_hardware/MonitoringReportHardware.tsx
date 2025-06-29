export function ReportMonitoringVersiPowershell(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:any,res_station:any,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
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
            VERSI_POWERSHELL:string,
            WINDOWS:string
    }[] = [];
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
                data_rows[objIndex].VERSI_POWERSHELL = '-'
                data_rows[objIndex].WINDOWS = '-'
            }else{
                
                try{
                    let sp_res = parse_data_inti    
                    const res_data_inti = sp_res.split('|');
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
                    data_rows[objIndex].VERSI_POWERSHELL = res_data_inti[1]
                    data_rows[objIndex].WINDOWS = res_data_inti[0]
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
                    data_rows[objIndex].VERSI_POWERSHELL ='-'
                    data_rows[objIndex].WINDOWS = '-'
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
                data_rows[objIndex].VERSI_POWERSHELL ='-'
                data_rows[objIndex].WINDOWS = '-'
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            
            try{
                let sp_res = parse_data_inti
                const res_data_inti = sp_res.split('|');
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
                    'VERSI_POWERSHELL': res_data_inti[1],
                    'WINDOWS': res_data_inti[0],
                };
                rows1.push(arr_content);
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
                    'VERSI_POWERSHELL': '-',
                    'WINDOWS': '-',
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
                'VERSI_POWERSHELL': '-',
                'WINDOWS': '-',
            };
            rows1.push(arr_content);
        }
    }
    
    return rows1;
}

export function ReportMonitoringVersiOneClick(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:any,res_station:any,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    let rows1: { 
            CLICK_FOR_ACTION:number,
            KODE:number; 
            KETERANGAN:string;
            REQUEST:string; 
            RESPONSE:string;
            KDCAB:string;
            KDTK:string;
            NAMA:string,
            STATION:string,
            IP:string,
            PRINTER:string,
            VERSI_PRINTER:string,
            HARDWARE:string,
            VERSI_HARDWARE:string,
            SOFTWARE:string,
            VERSI_SOFTWARE:string,
            LAIN_LAIN:string,
            VERSI_LAIN_LAIN:string
    }[] = [];
    var res_nama_one_click_printer = '-'; 
    var res_versi_one_click_printer = '-';
    
    var res_nama_one_click_hardware = '-'; 
    var res_versi_one_click_hardware = '-';

    var res_nama_one_click_software = '-'; 
    var res_versi_one_click_software = '-';

    var res_nama_one_click_lain_lain = '-'; 
    var res_versi_one_click_lain_lain = '-';
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
                data_rows[objIndex].PRINTER = res_nama_one_click_printer
                data_rows[objIndex].VERSI_PRINTER = res_versi_one_click_printer
                data_rows[objIndex].HARDWARE = res_nama_one_click_hardware
                data_rows[objIndex].VERSI_HARDWARE = res_nama_one_click_hardware
                data_rows[objIndex].SOFTWARE = res_nama_one_click_software
                data_rows[objIndex].VERSI_SOFTWARE = res_versi_one_click_software
                data_rows[objIndex].LAIN_LAIN = res_nama_one_click_lain_lain
                data_rows[objIndex].VERSI_LAIN_LAIN = res_versi_one_click_lain_lain
            }else{
                try{
                    let sp_res = parse_data_inti    
                    const repl = sp_res.split('\n').join('|')
                    const res_data_inti = repl.split('|');
                    for(var i = 0;i<res_data_inti.length;i++){              
                        const res_nama_program = res_data_inti[i];
                        if(res_nama_program.includes(';')){
                            //console.log('kondisi 1')
                            if( (res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('PRINTER')){
                                res_nama_one_click_printer = res_nama_program.split(';')[0]; 
                                res_versi_one_click_printer = res_nama_program.split(';')[1];
                                //console.log('res_nama_one_click_printer : '+res_nama_one_click_printer);
                                //console.log('res_versi_one_click_printer : '+res_versi_one_click_printer);
                            }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('HARDWARE')){
                                res_nama_one_click_hardware = res_nama_program.split(';')[0]; 
                                res_versi_one_click_hardware = res_nama_program.split(';')[1];
                                //console.log('res_nama_one_click_hardware : '+res_nama_one_click_hardware);
                                //console.log('res_versi_one_click_hardware : '+res_versi_one_click_hardware);
                            }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('SOFTWARE')){
                                res_nama_one_click_software = res_nama_program.split(';')[0]; 
                                res_versi_one_click_software = res_nama_program.split(';')[1];
                                //console.log('res_nama_one_click_software : '+res_nama_one_click_software);
                                //console.log('res_versi_one_click_software : '+res_versi_one_click_software);
                            }else{
                                res_nama_one_click_lain_lain = res_nama_program.split(';')[0]; 
                                res_versi_one_click_lain_lain = res_nama_program.split(';')[1];
                                //console.log('res_nama_one_click_lain_lain : '+res_nama_one_click_lain_lain);
                                //console.log('res_versi_one_click_lain_lain : '+res_versi_one_click_lain_lain);
                            }
                        }else{
                            //console.log('kondisi 2')
                            var res_nama_one_click = ''; 
                            if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('PRINTER')){
                                res_nama_one_click_printer = res_nama_program; 
                                res_versi_one_click_printer = '-';
                            }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('HARDWARE')){
                                res_nama_one_click_hardware = res_nama_program;
                                res_versi_one_click_hardware = '-';
                            }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('SOFTWARE')){
                                res_nama_one_click_software = res_nama_program;
                                res_versi_one_click_software = '-';
                            }else{
                                res_nama_one_click_lain_lain = res_nama_program;
                                res_versi_one_click_lain_lain = '-';
                            }
                        }          
                    }
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
                    data_rows[objIndex].PRINTER = res_nama_one_click_printer
                    data_rows[objIndex].VERSI_PRINTER = res_versi_one_click_printer
                    data_rows[objIndex].HARDWARE = res_nama_one_click_hardware
                    data_rows[objIndex].VERSI_HARDWARE = res_versi_one_click_hardware
                    data_rows[objIndex].SOFTWARE = res_nama_one_click_software
                    data_rows[objIndex].VERSI_SOFTWARE = res_versi_one_click_software
                    data_rows[objIndex].LAIN_LAIN = res_nama_one_click_lain_lain
                    data_rows[objIndex].VERSI_LAIN_LAIN = res_versi_one_click_lain_lain
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
                    data_rows[objIndex].PRINTER = res_nama_one_click_printer
                    data_rows[objIndex].VERSI_PRINTER = res_versi_one_click_printer
                    data_rows[objIndex].HARDWARE = res_nama_one_click_hardware
                    data_rows[objIndex].VERSI_HARDWARE = res_versi_one_click_hardware
                    data_rows[objIndex].SOFTWARE = res_nama_one_click_software
                    data_rows[objIndex].VERSI_SOFTWARE = res_versi_one_click_software
                    data_rows[objIndex].LAIN_LAIN = res_nama_one_click_lain_lain
                    data_rows[objIndex].VERSI_LAIN_LAIN = res_versi_one_click_lain_lain
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
                data_rows[objIndex].PRINTER = res_nama_one_click_printer
                data_rows[objIndex].VERSI_PRINTER = res_versi_one_click_printer
                data_rows[objIndex].HARDWARE = res_nama_one_click_hardware
                data_rows[objIndex].VERSI_HARDWARE = res_nama_one_click_hardware
                data_rows[objIndex].SOFTWARE = res_nama_one_click_software
                data_rows[objIndex].VERSI_SOFTWARE = res_versi_one_click_software
                data_rows[objIndex].LAIN_LAIN = res_nama_one_click_lain_lain
                data_rows[objIndex].VERSI_LAIN_LAIN = res_versi_one_click_lain_lain
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            
            try{
                let sp_res = parse_data_inti
                const repl = sp_res.split('\n').join('|')
                const res_data_inti = repl.split('|');
                for(var i = 0;i<res_data_inti.length;i++){              
                    const res_nama_program = res_data_inti[i];
                    if(res_nama_program.includes(';')){
                        //console.log('kondisi 1')
                        if( (res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('PRINTER')){
                            res_nama_one_click_printer = res_nama_program.split(';')[0]; 
                            res_versi_one_click_printer = res_nama_program.split(';')[1];
                            //console.log('res_nama_one_click_printer : '+res_nama_one_click_printer);
                            //console.log('res_versi_one_click_printer : '+res_versi_one_click_printer);
                        }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('HARDWARE')){
                            res_nama_one_click_hardware = res_nama_program.split(';')[0]; 
                            res_versi_one_click_hardware = res_nama_program.split(';')[1];
                            //console.log('res_nama_one_click_hardware : '+res_nama_one_click_hardware);
                            //console.log('res_versi_one_click_hardware : '+res_versi_one_click_hardware);
                        }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('SOFTWARE')){
                            res_nama_one_click_software = res_nama_program.split(';')[0]; 
                            res_versi_one_click_software = res_nama_program.split(';')[1];
                            //console.log('res_nama_one_click_software : '+res_nama_one_click_software);
                            //console.log('res_versi_one_click_software : '+res_versi_one_click_software);
                        }else{
                            res_nama_one_click_lain_lain = res_nama_program.split(';')[0]; 
                            res_versi_one_click_lain_lain = res_nama_program.split(';')[1];
                            //console.log('res_nama_one_click_lain_lain : '+res_nama_one_click_lain_lain);
                            //console.log('res_versi_one_click_lain_lain : '+res_versi_one_click_lain_lain);
                        }
                    }else{
                        //console.log('kondisi 2')
                        var res_nama_one_click = ''; 
                        if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('PRINTER')){
                            res_nama_one_click_printer = res_nama_program; 
                            res_versi_one_click_printer = '-';
                        }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('HARDWARE')){
                            res_nama_one_click_hardware = res_nama_program;
                            res_versi_one_click_hardware = '-';
                        }else if((res_nama_program.includes('\\MASTER\\') || (res_nama_program.includes('\\Master\\')) || (res_nama_program.includes('\\master\\')) ) && res_nama_program.includes('SOFTWARE')){
                            res_nama_one_click_software = res_nama_program;
                            res_versi_one_click_software = '-';
                        }else{
                            res_nama_one_click_lain_lain = res_nama_program;
                            res_versi_one_click_lain_lain = '-';
                        }
                    }          
                }
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
                    'PRINTER': res_nama_one_click_printer,
                    'VERSI_PRINTER': res_versi_one_click_printer,
                    'HARDWARE':res_nama_one_click_hardware,
                    'VERSI_HARDWARE':res_versi_one_click_hardware,
                    'SOFTWARE':res_nama_one_click_software,
                    'VERSI_SOFTWARE':res_versi_one_click_software,
                    'LAIN_LAIN':res_nama_one_click_lain_lain,
                    'VERSI_LAIN_LAIN':res_versi_one_click_lain_lain
                };
                rows1.push(arr_content);
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
                    'PRINTER': res_nama_one_click_printer,
                    'VERSI_PRINTER': res_versi_one_click_printer,
                    'HARDWARE':res_nama_one_click_hardware,
                    'VERSI_HARDWARE':res_versi_one_click_hardware,
                    'SOFTWARE':res_nama_one_click_software,
                    'VERSI_SOFTWARE':res_versi_one_click_software,
                    'LAIN_LAIN':res_nama_one_click_lain_lain,
                    'VERSI_LAIN_LAIN':res_versi_one_click_lain_lain,

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
                'PRINTER': res_nama_one_click_printer,
                'VERSI_PRINTER': res_versi_one_click_printer,
                'HARDWARE':res_nama_one_click_hardware,
                'VERSI_HARDWARE':res_versi_one_click_hardware,
                'SOFTWARE':res_nama_one_click_software,
                'VERSI_SOFTWARE':res_versi_one_click_software,
                'LAIN_LAIN':res_nama_one_click_lain_lain,
                'VERSI_LAIN_LAIN':res_versi_one_click_lain_lain,
            };
            rows1.push(arr_content);
        }
    }
    
    return rows1;
}

export function ReportMonitoringDualScreenAktif(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:any,res_station:any,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    let rows1: { 
            CLICK_FOR_ACTION:number,
            KODE:number; 
            KETERANGAN:string;
            REQUEST:string; 
            RESPONSE:string;
            KDCAB:string;
            KDTK:string;
            NAMA:string,
            STATION:string,
            IP:string,
            COMPUTER_NAME:string,
            DISPLAY_TRANSFER_CHARACTERISTIC:string,
            INSTANCE_NAME:string,
            MAX_HORIZONTAL_IMAGE_SIZE:string,
            MAX_VERTICAL_IMAGE_SIZE:string,
            SUPPORT_DISPLAY_FEATURE:string,
            VIDEO_INPUT_TYPE:string,
            PC_COMPUTER_NAME:string,
            COMPUTER_NAME_2:string,
            ACTIVE_2:string,
            DISPLAY_TRANSFER_CHARACTERISTIC_2:string,
            INSTANCE_NAME_2:string,
            MAX_HORIZONTAL_IMAGE_SIZE_2:string,
            MAX_VERTICAL_IMAGE_SIZE_2:string,
            SUPPORT_DISPLAY_FEATURE_2:string,
            VIDEO_INPUT_TYPE_2:string,
            PC_COMPUTER_NAME_2:string
    }[] = [];
    var res_COMPUTER_NAME = '-'; 
    var res_DISPLAY_TRANSFER_CHARACTERISTIC = '-';
    var res_INSTANCE_NAME = '-'; 
    var res_MAX_HORIZONTAL_IMAGE_SIZE = '-';
    var res_SUPPORT_DISPLAY_FEATURE = '-'; 
    var res_VIDEO_INPUT_TYPE = '-';
    var res_PC_COMPUTER_NAME = '-'; 
    var res_ACTIVE = '-';
    var res_DISPLAY_TRANSFER_CHARACTERISTIC = '-';
    var res_INSTANCE_NAME = '-';
    var res_MAX_HORIZONTAL_IMAGE_SIZE = '-';
    var res_MAX_VERTICAL_IMAGE_SIZE = '-';
    var res_SUPPORT_DISPLAY_FEATURE = '-';
    var res_VIDEO_INPUT_TYPE = '-';
    var res_PC_COMPUTER_NAME = '-';

    var res_COMPUTER_NAME_2 = '-';
    var res_ACTIVE_2 = '-';
    var res_DISPLAY_TRANSFER_CHARACTERISTIC_2 = '-';
    var res_INSTANCE_NAME_2 = '-';
    var res_MAX_HORIZONTAL_IMAGE_SIZE_2 = '-';
    var res_MAX_VERTICAL_IMAGE_SIZE_2 = '-';
    var res_SUPPORT_DISPLAY_FEATURE_2 = '-';
    var res_VIDEO_INPUT_TYPE_2 = '-';
    var res_PC_COMPUTER_NAME_2 = '-';

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
                data_rows[objIndex].COMPUTER_NAME =  res_COMPUTER_NAME
                data_rows[objIndex].ACTIVE_2 = res_ACTIVE;
                data_rows[objIndex].DISPLAY_TRANSFER_CHARACTERISTIC =  res_DISPLAY_TRANSFER_CHARACTERISTIC
                data_rows[objIndex].INSTANCE_NAME = res_INSTANCE_NAME
                data_rows[objIndex].MAX_HORIZONTAL_IMAGE = res_MAX_HORIZONTAL_IMAGE_SIZE
                data_rows[objIndex].MAX_VERTICAL_IMAGE =  res_MAX_VERTICAL_IMAGE_SIZE
                data_rows[objIndex].SUPPORT_DISPLAY_FEATURE =  res_SUPPORT_DISPLAY_FEATURE
                data_rows[objIndex].VIDEO_INPUT_TYPE = res_VIDEO_INPUT_TYPE;
                data_rows[objIndex].PS_COMPUTERNAME =  res_PC_COMPUTER_NAME;

                data_rows[objIndex].ACTIVE_2 = res_ACTIVE_2;
                data_rows[objIndex].DISPLAY_TRANSFER_CHARACTERISTIC_2 = res_DISPLAY_TRANSFER_CHARACTERISTIC_2;
                data_rows[objIndex].INSTANCE_NAME_2 = res_INSTANCE_NAME_2;
                data_rows[objIndex].MAX_HORIZONTAL_IMAGE_2 = res_MAX_VERTICAL_IMAGE_SIZE_2;
                data_rows[objIndex].MAX_VERTICAL_IMAGE_2 = res_MAX_VERTICAL_IMAGE_SIZE_2;
                data_rows[objIndex].SUPPORT_DISPLAY_FEATURE_2 = res_SUPPORT_DISPLAY_FEATURE_2;
                data_rows[objIndex].VIDEO_INPUT_TYPE_2 = res_VIDEO_INPUT_TYPE_2;
                data_rows[objIndex].PS_COMPUTERNAME_2 = res_COMPUTER_NAME_2;
            }else{
               const raw_data_inti = parse_data_inti.split('\r\n');
               try{
                    const res_data_inti = raw_data_inti[0].split(',');
                    const res_data_inti_2 = raw_data_inti[1].split(',');
                    data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request;
                    data_rows[objIndex].RESPONSE = res_response;
                    data_rows[objIndex].KDCAB = res_kdcab;
                    data_rows[objIndex].KDTK =  res_kdtk;
                    data_rows[objIndex].NAMA = res_nama;
                    data_rows[objIndex].STATION = res_station;
                    data_rows[objIndex].IP = res_ip;
                    data_rows[objIndex].COMPUTER_NAME =  res_data_inti[0].split('"').join('');
                    data_rows[objIndex].ACTIVE =  res_data_inti[1].split('"').join('');
                    data_rows[objIndex].DISPLAY_TRANSFER_CHARACTERISTIC =  res_data_inti[2].split('"').join('');
                    data_rows[objIndex].INSTANCE_NAME =  res_data_inti[3].split('"').join('');
                    data_rows[objIndex].MAX_HORIZONTAL_IMAGE =  res_data_inti[4].split('"').join('');
                    data_rows[objIndex].MAX_VERTICAL_IMAGE =  res_data_inti[5].split('"').join('');
                    data_rows[objIndex].SUPPORT_DISPLAY_FEATURE =  res_data_inti[6].split('"').join('');
                    data_rows[objIndex].VIDEO_INPUT_TYPE =  res_data_inti[7].split('"').join('');
                    data_rows[objIndex].PS_COMPUTERNAME =  res_data_inti[8].split('"').join('');

                    data_rows[objIndex].ACTIVE_2 = res_data_inti_2[0].split('"').join('');;
                    data_rows[objIndex].DISPLAY_TRANSFER_CHARACTERISTIC_2 = res_data_inti_2[1].split('"').join('');;
                    data_rows[objIndex].INSTANCE_NAME_2 = res_data_inti_2[3].split('"').join('');;
                    data_rows[objIndex].MAX_HORIZONTAL_IMAGE_2 = res_data_inti_2[4].split('"').join('');;
                    data_rows[objIndex].MAX_VERTICAL_IMAGE_2 = res_data_inti_2[5].split('"').join('');;
                    data_rows[objIndex].SUPPORT_DISPLAY_FEATURE_2 = res_data_inti_2[6].split('"').join('');;
                    data_rows[objIndex].VIDEO_INPUT_TYPE_2 = res_data_inti_2[7].split('"').join('');;
                    data_rows[objIndex].PS_COMPUTERNAME_2 = res_data_inti_2[8].split('"').join('');;
                    rows1 = data_rows;
                    // setData_rows(rows);
                }catch(Ex){
                    const res_data_inti = raw_data_inti[0].split(',');
                        
                    data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request;
                    data_rows[objIndex].RESPONSE = res_response;
                    data_rows[objIndex].KDCAB = res_kdcab;
                    data_rows[objIndex].KDTK =  res_kdtk;
                    data_rows[objIndex].NAMA = res_nama;
                    data_rows[objIndex].STATION = res_station;
                    data_rows[objIndex].IP = res_ip;
                    data_rows[objIndex].COMPUTER_NAME =  res_data_inti[0].split('"').join('');
                    data_rows[objIndex].ACTIVE =  res_data_inti[1].split('"').join('');
                    data_rows[objIndex].DISPLAY_TRANSFER_CHARACTERISTIC =  res_data_inti[2].split('"').join('');
                    data_rows[objIndex].INSTANCE_NAME =  res_data_inti[3].split('"').join('');
                    data_rows[objIndex].MAX_HORIZONTAL_IMAGE =  res_data_inti[4].split('"').join('');
                    data_rows[objIndex].MAX_VERTICAL_IMAGE =  res_data_inti[5].split('"').join('');
                    data_rows[objIndex].SUPPORT_DISPLAY_FEATURE =  res_data_inti[6].split('"').join('');
                    data_rows[objIndex].VIDEO_INPUT_TYPE =  res_data_inti[7].split('"').join('');
                    data_rows[objIndex].PS_COMPUTERNAME =  res_data_inti[8].split('"').join('');

                    data_rows[objIndex].ACTIVE_2 = '-';
                    data_rows[objIndex].DISPLAY_TRANSFER_CHARACTERISTIC_2 = '-';
                    data_rows[objIndex].INSTANCE_NAME_2 ='-';
                    data_rows[objIndex].MAX_HORIZONTAL_IMAGE_2 ='-';
                    data_rows[objIndex].MAX_VERTICAL_IMAGE_2 = '-';
                    data_rows[objIndex].SUPPORT_DISPLAY_FEATURE_2 = '-';
                    data_rows[objIndex].VIDEO_INPUT_TYPE_2 = '-';
                    data_rows[objIndex].PS_COMPUTERNAME_2 = '-';
                    rows1 = data_rows;
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
                data_rows[objIndex].COMPUTER_NAME =  res_COMPUTER_NAME
                data_rows[objIndex].ACTIVE_2 = res_ACTIVE;
                data_rows[objIndex].DISPLAY_TRANSFER_CHARACTERISTIC =  res_DISPLAY_TRANSFER_CHARACTERISTIC
                data_rows[objIndex].INSTANCE_NAME = res_INSTANCE_NAME
                data_rows[objIndex].MAX_HORIZONTAL_IMAGE = res_MAX_HORIZONTAL_IMAGE_SIZE
                data_rows[objIndex].MAX_VERTICAL_IMAGE =  res_MAX_VERTICAL_IMAGE_SIZE
                data_rows[objIndex].SUPPORT_DISPLAY_FEATURE =  res_SUPPORT_DISPLAY_FEATURE
                data_rows[objIndex].VIDEO_INPUT_TYPE = res_VIDEO_INPUT_TYPE;
                data_rows[objIndex].PS_COMPUTERNAME =  res_PC_COMPUTER_NAME;

                data_rows[objIndex].ACTIVE_2 = res_ACTIVE_2;
                data_rows[objIndex].DISPLAY_TRANSFER_CHARACTERISTIC_2 = res_DISPLAY_TRANSFER_CHARACTERISTIC_2;
                data_rows[objIndex].INSTANCE_NAME_2 = res_INSTANCE_NAME_2;
                data_rows[objIndex].MAX_HORIZONTAL_IMAGE_2 = res_MAX_VERTICAL_IMAGE_SIZE_2;
                data_rows[objIndex].MAX_VERTICAL_IMAGE_2 = res_MAX_VERTICAL_IMAGE_SIZE_2;
                data_rows[objIndex].SUPPORT_DISPLAY_FEATURE_2 = res_SUPPORT_DISPLAY_FEATURE_2;
                data_rows[objIndex].VIDEO_INPUT_TYPE_2 = res_VIDEO_INPUT_TYPE_2;
                data_rows[objIndex].PS_COMPUTERNAME_2 = res_COMPUTER_NAME_2;
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            const raw_data_inti = parse_data_inti.split('\r\n');
            try{
                const res_data_inti = raw_data_inti[0].split(',');
                const res_data_inti_2 = raw_data_inti[1].split(',');
                res_COMPUTER_NAME =  res_data_inti[0].split('"').join('');
                res_ACTIVE =  res_data_inti[1].split('"').join('');
                res_DISPLAY_TRANSFER_CHARACTERISTIC = res_data_inti[2].split('"').join('');
                res_INSTANCE_NAME = res_data_inti[3].split('"').join('');
                res_MAX_HORIZONTAL_IMAGE_SIZE = res_data_inti[4].split('"').join('');
                res_MAX_VERTICAL_IMAGE_SIZE = res_data_inti[5].split('"').join('');
                res_SUPPORT_DISPLAY_FEATURE = res_data_inti[6].split('"').join('');
                res_VIDEO_INPUT_TYPE = res_data_inti[7].split('"').join('');
                res_PC_COMPUTER_NAME = res_data_inti[8].split('"').join('');

                res_COMPUTER_NAME_2 =  res_data_inti_2[0].split('"').join('');
                res_ACTIVE_2 =  res_data_inti_2[1].split('"').join('');
                res_DISPLAY_TRANSFER_CHARACTERISTIC_2 = res_data_inti_2[2].split('"').join('');
                res_INSTANCE_NAME_2 = res_data_inti_2[3].split('"').join('');
                res_MAX_HORIZONTAL_IMAGE_SIZE_2 = res_data_inti_2[4].split('"').join('');
                res_MAX_VERTICAL_IMAGE_SIZE_2 = res_data_inti_2[5].split('"').join('');
                res_SUPPORT_DISPLAY_FEATURE_2 = res_data_inti_2[6].split('"').join('');
                res_VIDEO_INPUT_TYPE_2 = res_data_inti_2[7].split('"').join('');
                res_PC_COMPUTER_NAME_2 = res_data_inti_2[8].split('"').join('');
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
                    'COMPUTER_NAME':res_COMPUTER_NAME,
                    'ACTIVE':res_ACTIVE,
                    'DISPLAY_TRANSFER_CHARACTERISTIC':res_DISPLAY_TRANSFER_CHARACTERISTIC,
                    'INSTANCE_NAME':res_INSTANCE_NAME,
                    'MAX_HORIZONTAL_IMAGE_SIZE':res_MAX_HORIZONTAL_IMAGE_SIZE,
                    'MAX_VERTICAL_IMAGE_SIZE':res_MAX_VERTICAL_IMAGE_SIZE,
                    'SUPPORT_DISPLAY_FEATURE':res_SUPPORT_DISPLAY_FEATURE,
                    'VIDEO_INPUT_TYPE':res_VIDEO_INPUT_TYPE,
                    'PC_COMPUTER_NAME':res_PC_COMPUTER_NAME,
                    'COMPUTER_NAME_2':res_COMPUTER_NAME_2,
                    'ACTIVE_2':res_ACTIVE_2,
                    'DISPLAY_TRANSFER_CHARACTERISTIC_2':res_DISPLAY_TRANSFER_CHARACTERISTIC_2,
                    'INSTANCE_NAME_2':res_INSTANCE_NAME_2,
                    'MAX_HORIZONTAL_IMAGE_SIZE_2':res_MAX_HORIZONTAL_IMAGE_SIZE_2,
                    'MAX_VERTICAL_IMAGE_SIZE_2':res_MAX_VERTICAL_IMAGE_SIZE_2,
                    'SUPPORT_DISPLAY_FEATURE_2':res_SUPPORT_DISPLAY_FEATURE_2,
                    'VIDEO_INPUT_TYPE_2':res_VIDEO_INPUT_TYPE_2,
                    'PC_COMPUTER_NAME_2':res_PC_COMPUTER_NAME_2
                };
                rows1.push(arr_content);
            }catch(Ex){
                const res_data_inti = raw_data_inti[0].split(',');
                res_COMPUTER_NAME =  res_data_inti[0].split('"').join('');
                res_ACTIVE =  res_data_inti[1].split('"').join('');
                res_DISPLAY_TRANSFER_CHARACTERISTIC = res_data_inti[2].split('"').join('');
                res_INSTANCE_NAME = res_data_inti[3].split('"').join('');
                res_MAX_HORIZONTAL_IMAGE_SIZE = res_data_inti[4].split('"').join('');
                res_MAX_VERTICAL_IMAGE_SIZE = res_data_inti[5].split('"').join('');
                res_SUPPORT_DISPLAY_FEATURE = res_data_inti[6].split('"').join('');
                res_VIDEO_INPUT_TYPE = res_data_inti[7].split('"').join('');
                res_PC_COMPUTER_NAME = res_data_inti[8].split('"').join('');

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
                    'COMPUTER_NAME':res_COMPUTER_NAME,
                    'ACTIVE':res_ACTIVE,
                    'DISPLAY_TRANSFER_CHARACTERISTIC':res_DISPLAY_TRANSFER_CHARACTERISTIC,
                    'INSTANCE_NAME':res_INSTANCE_NAME,
                    'MAX_HORIZONTAL_IMAGE_SIZE':res_MAX_HORIZONTAL_IMAGE_SIZE,
                    'MAX_VERTICAL_IMAGE_SIZE':res_MAX_VERTICAL_IMAGE_SIZE,
                    'SUPPORT_DISPLAY_FEATURE':res_SUPPORT_DISPLAY_FEATURE,
                    'VIDEO_INPUT_TYPE':res_VIDEO_INPUT_TYPE,
                    'PC_COMPUTER_NAME':res_PC_COMPUTER_NAME,
                    'COMPUTER_NAME_2':res_COMPUTER_NAME_2,
                    'ACTIVE_2':res_ACTIVE_2,
                    'DISPLAY_TRANSFER_CHARACTERISTIC_2':res_DISPLAY_TRANSFER_CHARACTERISTIC_2,
                    'INSTANCE_NAME_2':res_INSTANCE_NAME_2,
                    'MAX_HORIZONTAL_IMAGE_SIZE_2':res_MAX_HORIZONTAL_IMAGE_SIZE_2,
                    'MAX_VERTICAL_IMAGE_SIZE_2':res_MAX_VERTICAL_IMAGE_SIZE_2,
                    'SUPPORT_DISPLAY_FEATURE_2':res_SUPPORT_DISPLAY_FEATURE_2,
                    'VIDEO_INPUT_TYPE_2':res_VIDEO_INPUT_TYPE_2,
                    'PC_COMPUTER_NAME_2':res_PC_COMPUTER_NAME_2
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
                'COMPUTER_NAME':res_COMPUTER_NAME,
                'ACTIVE':res_ACTIVE,
                'DISPLAY_TRANSFER_CHARACTERISTIC':res_DISPLAY_TRANSFER_CHARACTERISTIC,
                'INSTANCE_NAME':res_INSTANCE_NAME,
                'MAX_HORIZONTAL_IMAGE_SIZE':res_MAX_HORIZONTAL_IMAGE_SIZE,
                'MAX_VERTICAL_IMAGE_SIZE':res_MAX_VERTICAL_IMAGE_SIZE,
                'SUPPORT_DISPLAY_FEATURE':res_SUPPORT_DISPLAY_FEATURE,
                'VIDEO_INPUT_TYPE':res_VIDEO_INPUT_TYPE,
                'PC_COMPUTER_NAME':res_PC_COMPUTER_NAME,
                'COMPUTER_NAME_2':res_COMPUTER_NAME_2,
                'ACTIVE_2':res_ACTIVE_2,
                'DISPLAY_TRANSFER_CHARACTERISTIC_2':res_DISPLAY_TRANSFER_CHARACTERISTIC_2,
                'INSTANCE_NAME_2':res_INSTANCE_NAME_2,
                'MAX_HORIZONTAL_IMAGE_SIZE_2':res_MAX_HORIZONTAL_IMAGE_SIZE_2,
                'MAX_VERTICAL_IMAGE_SIZE_2':res_MAX_VERTICAL_IMAGE_SIZE_2,
                'SUPPORT_DISPLAY_FEATURE_2':res_SUPPORT_DISPLAY_FEATURE_2,
                'VIDEO_INPUT_TYPE_2':res_VIDEO_INPUT_TYPE_2,
                'PC_COMPUTER_NAME_2':res_PC_COMPUTER_NAME_2
            };
            rows1.push(arr_content);
        }
    }
    
    return rows1;
}

export function ReportMonitoringBios(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:any,res_station:any,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    let rows1: { 
            CLICK_FOR_ACTION:number,
            KODE:number; 
            KETERANGAN:string;
            REQUEST:string; 
            RESPONSE:string;
            KDCAB:string;
            KDTK:string;
            NAMA:string,
            STATION:string,
            IP:string,
            MANUFACTURER:string,
            NAME:string,
            SERIAL_NUMBER:string,
            VERSION:string,
    }[] = [];
    var res_MANUFACTURER = '-'; 
    var res_NAME = '-';
    var res_SERIAL_NUMBER = '-'; 
    var res_VERSION = '-';
   
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
                data_rows[objIndex].MANUFACTURER =  res_MANUFACTURER
                data_rows[objIndex].SERIAL_NUMBER = res_SERIAL_NUMBER;
                data_rows[objIndex].NAME = res_NAME
                data_rows[objIndex].VERSION =  res_VERSION
            }else{
               const res_data_inti = parse_data_inti.toString().split('"').join('').split(';');
               res_MANUFACTURER = res_data_inti[0]
               res_SERIAL_NUMBER = res_data_inti[1]
               res_NAME = res_data_inti[2]
               res_VERSION = res_data_inti[3]
               try{
                   
                    data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request;
                    data_rows[objIndex].RESPONSE = res_response;
                    data_rows[objIndex].KDCAB = res_kdcab;
                    data_rows[objIndex].KDTK =  res_kdtk;
                    data_rows[objIndex].NAMA = res_nama;
                    data_rows[objIndex].STATION = res_station;
                    data_rows[objIndex].IP = res_ip;
                    data_rows[objIndex].MANUFACTURER =  res_MANUFACTURER
                    data_rows[objIndex].SERIAL_NUMBER = res_SERIAL_NUMBER;
                    data_rows[objIndex].NAME = res_NAME
                    data_rows[objIndex].VERSION =  res_VERSION
                    rows1 = data_rows;
                    // setData_rows(rows);
                }catch(Ex){
                     
                    data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request;
                    data_rows[objIndex].RESPONSE = res_response;
                    data_rows[objIndex].KDCAB = res_kdcab;
                    data_rows[objIndex].KDTK =  res_kdtk;
                    data_rows[objIndex].NAMA = res_nama;
                    data_rows[objIndex].STATION = res_station;
                    data_rows[objIndex].IP = res_ip;
                    data_rows[objIndex].MANUFACTURER =  res_MANUFACTURER
                    data_rows[objIndex].SERIAL_NUMBER = res_SERIAL_NUMBER;
                    data_rows[objIndex].NAME = res_NAME
                    data_rows[objIndex].VERSION =  res_VERSION
                    rows1 = data_rows;
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
                data_rows[objIndex].MANUFACTURER =  res_MANUFACTURER
                data_rows[objIndex].SERIAL_NUMBER = res_SERIAL_NUMBER;
                data_rows[objIndex].NAME = res_NAME
                data_rows[objIndex].VERSION =  res_VERSION
                rows1 = data_rows;
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            const res_data_inti = parse_data_inti.toString().split('"').join('').split(';');
            try{
                res_MANUFACTURER = res_data_inti[0]
                res_SERIAL_NUMBER = res_data_inti[1]
                res_NAME = res_data_inti[2]
                res_VERSION = res_data_inti[3]
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
                    'MANUFACTURER':res_MANUFACTURER,
                    'SERIAL_NUMBER':res_SERIAL_NUMBER,
                    'NAME':res_NAME,
                    'VERSION':res_VERSION,
                };
                rows1.push(arr_content);
            }catch(Ex){
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
                    'MANUFACTURER':res_MANUFACTURER,
                    'SERIAL_NUMBER':res_SERIAL_NUMBER,
                    'NAME':res_NAME,
                    'VERSION':res_VERSION,
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
                'MANUFACTURER':res_MANUFACTURER,
                'SERIAL_NUMBER':res_SERIAL_NUMBER,
                'NAME':res_NAME,
                'VERSION':res_VERSION,
            };
            rows1.push(arr_content);
        }
    }
    
    return rows1;
}

export function ReportMonitoringPrinter(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:string,res_station:string,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    let rows1: { KODE: any; KETERANGAN: any;  REQUEST: any; RESPONSE: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; NAME:string,DEFAULT_PRINTER:string,DRIVER_NAME:string,PORT_NAME:string,SHARED:string,SHARE_NAME:string,SYSTEM_NAME:string,STATUS:string}[] = [];
    let res_name = '-';
    let res_default = '-';
    let res_driver_name = '-';
    let res_port_name = '-';
    let res_shared = '-';
    let res_share_name = '-';
    let res_system_name = '-';
    let res_status = '-';
    let res_PrinterPaperNames = '-';
    let res_setting_const = '-';
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
                data_rows[objIndex].NAME =  res_name
                data_rows[objIndex].DEFAULT_PRINTER = res_default;
                data_rows[objIndex].DRIVER_NAME = res_driver_name
                data_rows[objIndex].PORT_NAME =  res_port_name
                data_rows[objIndex].SHARED = res_shared
                data_rows[objIndex].SHARE_NAME = res_share_name
                data_rows[objIndex].SYSTEM_NAME = res_system_name
                data_rows[objIndex].STATUS = res_status
                data_rows[objIndex].PAPER_AVAILABLE = res_PrinterPaperNames
                data_rows[objIndex].IS_SETTING = res_setting_const
            }else{
                const sp_record =  parse_data_inti.split('\n');
                for(var i = 0;i<sp_record.length;i++){
                    const sp_field = sp_record[i].split('|');
                    res_name = sp_field[0];
                    res_default = sp_field[1];
                    res_driver_name = sp_field[2];
                    res_port_name = sp_field[3];
                    res_shared = sp_field[4];
                    res_share_name = sp_field[5] === '' ? '-' : sp_field[5];
                    res_system_name = sp_field[6];
                    
                    
                    if(sp_field[7] === "3"){
                        res_status = "Idle";
                    }else if(sp_field[7] === "4"){
                        res_status = "Printing";
                    }else if(sp_field[7] === "5"){
                        res_status = "Warming Up";
                    }else if(sp_field[7] === "6"){
                        res_status = "Stop Printing";
                    }else if(sp_field[7] === "7"){
                        res_status = "Offline";
                    }else if(sp_field[7] === "1" || sp_field[7] === "2"){
                        res_status = "Lain-Lain";
                    }else{
                        res_status = sp_field[7];
                    }

                    res_PrinterPaperNames = sp_field[8]
                    res_setting_const = sp_field[9]
                    try{
                   
                        data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
                        data_rows[objIndex].KODE = res_data_code;
                        data_rows[objIndex].KETERANGAN = res_data_msg;
                        data_rows[objIndex].REQUEST = res_request;
                        data_rows[objIndex].RESPONSE = res_response;
                        data_rows[objIndex].KDCAB = res_kdcab;
                        data_rows[objIndex].KDTK =  res_kdtk;
                        data_rows[objIndex].NAMA = res_nama;
                        data_rows[objIndex].STATION = res_station;
                        data_rows[objIndex].IP = res_ip;
                        data_rows[objIndex].NAME =  res_name
                        data_rows[objIndex].DEFAULT_PRINTER = res_default;
                        data_rows[objIndex].DRIVER_NAME = res_driver_name
                        data_rows[objIndex].PORT_NAME =  res_port_name
                        data_rows[objIndex].SHARED = res_shared
                        data_rows[objIndex].SHARE_NAME = res_share_name
                        data_rows[objIndex].SYSTEM_NAME = res_system_name
                        data_rows[objIndex].STATUS = res_status
                        data_rows[objIndex].PAPER_AVAILABLE = res_PrinterPaperNames
                        data_rows[objIndex].IS_SETTING = res_setting_const
                        rows1 = data_rows;
                    }catch(Ex){
                        
                        data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
                        data_rows[objIndex].KODE = res_data_code;
                        data_rows[objIndex].KETERANGAN = res_data_msg;
                        data_rows[objIndex].REQUEST = res_request;
                        data_rows[objIndex].RESPONSE = res_response;
                        data_rows[objIndex].KDCAB = res_kdcab;
                        data_rows[objIndex].KDTK =  res_kdtk;
                        data_rows[objIndex].NAMA = res_nama;
                        data_rows[objIndex].STATION = res_station;
                        data_rows[objIndex].IP = res_ip;
                        data_rows[objIndex].NAME =  res_name
                        data_rows[objIndex].DEFAULT_PRINTER = res_default;
                        data_rows[objIndex].DRIVER_NAME = res_driver_name
                        data_rows[objIndex].PORT_NAME =  res_port_name
                        data_rows[objIndex].SHARED = res_shared
                        data_rows[objIndex].SHARE_NAME = res_share_name
                        data_rows[objIndex].SYSTEM_NAME = res_system_name
                        data_rows[objIndex].STATUS = res_status
                        data_rows[objIndex].PAPER_AVAILABLE = res_PrinterPaperNames
                        data_rows[objIndex].IS_SETTING = res_setting_const
                        rows1 = data_rows;
                    }
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
            data_rows[objIndex].NAME =  res_name
            data_rows[objIndex].DEFAULT_PRINTER = res_default;
            data_rows[objIndex].DRIVER_NAME = res_driver_name
            data_rows[objIndex].PORT_NAME =  res_port_name
            data_rows[objIndex].SHARED = res_shared
            data_rows[objIndex].SHARE_NAME = res_share_name
            data_rows[objIndex].SYSTEM_NAME = res_system_name
            data_rows[objIndex].STATUS = res_status
            data_rows[objIndex].PAPER_AVAILABLE = res_PrinterPaperNames
            data_rows[objIndex].IS_SETTING = res_setting_const
            rows1 = data_rows;
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            const sp_record =  parse_data_inti.split('\r\n');
            for(var i = 0;i<sp_record.length;i++){       
                if(sp_record[i] !== ''){
                    const sp_field = sp_record[i].split('|');
                    res_name = sp_field[0];
                    res_default = sp_field[1];
                    res_driver_name = sp_field[2];
                    res_port_name = sp_field[3];
                    res_shared = sp_field[4];
                    res_share_name = sp_field[5] === '' ? '-' : sp_field[5];
                    res_system_name = sp_field[6];
                    
                    
                    if(sp_field[7] === "3"){
                        res_status = "Idle";
                    }else if(sp_field[7] === "4"){
                        res_status = "Printing";
                    }else if(sp_field[7] === "5"){
                        res_status = "Warming Up";
                    }else if(sp_field[7] === "6"){
                        res_status = "Stop Printing";
                    }else if(sp_field[7] === "7"){
                        res_status = "Offline";
                    }else if(sp_field[7] === "1" || sp_field[7] === "2"){
                        res_status = "Lain-Lain";
                    }else{
                        res_status = sp_field[7];
                    }

                    res_PrinterPaperNames = sp_field[8]
                    res_setting_const = sp_field[9]
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
                        'NAME': res_name,
                        'DEFAULT_PRINTER': res_default,
                        'DRIVER_NAME': res_driver_name,
                        'PORT_NAME': res_port_name,
                        'SHARED':res_shared,
                        'SHARE_NAME': res_share_name,
                        'SYSTEM_NAME': res_system_name,
                        'STATUS': res_status,
                        'PAPER_AVAILABLE': res_PrinterPaperNames,
                        'IS_SETTING': res_setting_const,
                    };
                    rows1.push(arr_content);
                }else{
                    console.log('No Add cause it null')
                }
                
            }
            //-- failed listeners --//
        } else {
            //const uniq_number = parseFloat(Math.floor(new Date().valueOf() * Math.random()).toString().substring(0,6));
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN':  res_data_msg,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'NAME': res_name,
                'DEFAULT_PRINTER': res_default,
                'DRIVER_NAME': res_driver_name,
                'PORT_NAME': res_port_name,
                'SHARED':res_shared,
                'SHARE_NAME': res_share_name,
                'SYSTEM_NAME': res_system_name,
                'STATUS': res_status,
                'PAPER_AVAILABLE': res_PrinterPaperNames,
                'IS_SETTING_57mm': res_setting_const,
            };
            rows1.push(arr_content);
        }
    }
    return rows1;
}

export function ReportMonitoringFinger(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:string,res_station:string,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    let rows2: { KODE: any; KETERANGAN: any; REQUEST: any; RESPONSE: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; NAME:string,INSTANCE_ID:string,STATUS:string}[] = [];
    let res_name = '-';
    let res_instance_id = '-';
    let res_status = '-';
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
                data_rows[objIndex].NAME =  res_name
                data_rows[objIndex].INSTANCE_ID = res_instance_id;
                data_rows[objIndex].STATUS = res_status
            }else{
                //console.log('data : '+parse_data_inti.split(",")[0]);
                const sp_field = parse_data_inti.split(',');
                let res_name =sp_field[0]
                //console.log('name : '+res_name)
                res_instance_id = sp_field[1]
                //console.log('res_instance_id : '+res_instance_id)
                res_status = sp_field[2]
                //console.log('res_status : '+res_status)
                try{
                    data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request;
                    data_rows[objIndex].RESPONSE = res_response;
                    data_rows[objIndex].KDCAB = res_kdcab;
                    data_rows[objIndex].KDTK =  res_kdtk;
                    data_rows[objIndex].NAMA = res_nama;
                    data_rows[objIndex].STATION = res_station;
                    data_rows[objIndex].IP = res_ip;
                    data_rows[objIndex].NAME =  res_name
                    data_rows[objIndex].INSTANCE_ID = res_instance_id;
                    data_rows[objIndex].STATUS = res_status
                    rows2 = data_rows;
                }catch(Ex){
                    data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request;
                    data_rows[objIndex].RESPONSE = res_response;
                    data_rows[objIndex].KDCAB = res_kdcab;
                    data_rows[objIndex].KDTK =  res_kdtk;
                    data_rows[objIndex].NAMA = res_nama;
                    data_rows[objIndex].STATION = res_station;
                    data_rows[objIndex].IP = res_ip;
                    data_rows[objIndex].NAME =  res_name
                    data_rows[objIndex].INSTANCE_ID = res_instance_id;
                    data_rows[objIndex].STATUS = res_status
                    rows2 = data_rows;
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
            data_rows[objIndex].NAME =  res_name
            data_rows[objIndex].INSTANCE_ID = res_instance_id;
            data_rows[objIndex].STATUS = res_status
            rows2 = data_rows;
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
                //console.log('data : '+parse_data_inti.split(",")[0]);
                const sp_field = parse_data_inti.split(',');
                let res_name =sp_field[0]
                //console.log('name : '+res_name)
                res_instance_id = sp_field[1]
                //console.log('res_instance_id : '+res_instance_id)
                res_status = sp_field[2]
                //console.log('res_status : '+res_status)
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
                    'NAME': res_name,
                    'INSTANCE_ID': res_instance_id,
                    'STATUS': res_status
                };
                rows2.push(arr_content);
            
            //-- failed listeners --//
        } else {
            
            //const uniq_number = parseFloat(Math.floor(new Date().valueOf() * Math.random()).toString().substring(0,6));
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN':  res_data_msg,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'NAME': res_name,
                'INSTANCE_ID': res_instance_id,
                'STATUS': res_status
            };
            rows2.push(arr_content);
        }
    }
    return rows2;
}

export function ReportMonitoringScanner(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:string,res_station:string,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    let rows3: { KODE: any; KETERANGAN: any; REQUEST: any; RESPONSE: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; NAME:string,INSTANCE_ID:string,STATUS:string}[] = [];
    let res_name = '-';
    let res_instance_id = '-';
    let res_status = '-';
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
                data_rows[objIndex].NAME =  res_name
                data_rows[objIndex].INSTANCE_ID = res_instance_id;
                data_rows[objIndex].STATUS = res_status
            }else{
                //console.log('data : '+parse_data_inti.split(",")[0]);
                const sp_field = parse_data_inti.split(',');
                let res_name =sp_field[0]
                //console.log('name : '+res_name)
                res_instance_id = sp_field[1]
                //console.log('res_instance_id : '+res_instance_id)
                res_status = sp_field[2]
                //console.log('res_status : '+res_status)
                try{
                    data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request;
                    data_rows[objIndex].RESPONSE = res_response;
                    data_rows[objIndex].KDCAB = res_kdcab;
                    data_rows[objIndex].KDTK =  res_kdtk;
                    data_rows[objIndex].NAMA = res_nama;
                    data_rows[objIndex].STATION = res_station;
                    data_rows[objIndex].IP = res_ip;
                    data_rows[objIndex].NAME =  res_name
                    data_rows[objIndex].INSTANCE_ID = res_instance_id;
                    data_rows[objIndex].STATUS = res_status
                    rows3 = data_rows;
                }catch(Ex){
                    data_rows[objIndex].CLICK_FOR_ACTION = res_data_code;
                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request;
                    data_rows[objIndex].RESPONSE = res_response;
                    data_rows[objIndex].KDCAB = res_kdcab;
                    data_rows[objIndex].KDTK =  res_kdtk;
                    data_rows[objIndex].NAMA = res_nama;
                    data_rows[objIndex].STATION = res_station;
                    data_rows[objIndex].IP = res_ip;
                    data_rows[objIndex].NAME =  res_name
                    data_rows[objIndex].INSTANCE_ID = res_instance_id;
                    data_rows[objIndex].STATUS = res_status
                    rows3 = data_rows;
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
            data_rows[objIndex].NAME =  res_name
            data_rows[objIndex].INSTANCE_ID = res_instance_id;
            data_rows[objIndex].STATUS = res_status
            rows3 = data_rows;
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
                //console.log('data : '+parse_data_inti.split(",")[0]);
                const sp_field = parse_data_inti.split(',');
                let res_name =sp_field[0]
                //console.log('name : '+res_name)
                res_instance_id = sp_field[1]
                //console.log('res_instance_id : '+res_instance_id)
                res_status = sp_field[2]
                //console.log('res_status : '+res_status)
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
                    'NAME': res_name,
                    'INSTANCE_ID': res_instance_id,
                    'STATUS': res_status
                };
                rows3.push(arr_content);
            
            //-- failed listeners --//
        } else {
            
            //const uniq_number = parseFloat(Math.floor(new Date().valueOf() * Math.random()).toString().substring(0,6));
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN':  res_data_msg,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'NAME': res_name,
                'INSTANCE_ID': res_instance_id,
                'STATUS': res_status
            };
            rows3.push(arr_content);
        }
    }
    return rows3;
}

export function ReportInstalledProgram(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_kdtk:string,res_nama:string,res_ip:string,res_station:string,res_request:string,res_response:string,res_id_report:string,res_data_code:number,res_data_msg:string,parse_data_inti:any){
    let rows3: { KODE: any; KETERANGAN: any; REQUEST: any; RESPONSE: any; KDCAB: any; KDTK: any; NAMA: any; STATION: any; IP: any; NAMA_PROGRAM:string,VERSI:string}[] = [];
    let res_nama_program = '-';
    let res_versi = '-';
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
                data_rows[objIndex].NAMA_PROGRAM =  res_nama_program
                data_rows[objIndex].VERSI = res_versi
            }else{
                const res_data_inti = parse_data_inti.toString().split('\r\n');
                for(var i = 0;i<res_data_inti.length;i++){
                    const record_program = res_data_inti[i].trim();
                    if(record_program == '' || record_program.includes('DisplayName') || record_program.includes('@Label')|| record_program.includes('WARNING')|| record_program.includes('"Name","Version","ProviderName","Source"')){

                    }else{
                        const nama_program = record_program.split("\"").join("").split(',')[0];
                        const versi = record_program.split("\"").join("").split(',')[1];
                        if(nama_program == ''){
                            console.log('program kosong : '+res_kdcab+'/'+res_kdtk+'/'+res_station)
                        }else{
                            data_rows[objIndex].CLICK_FOR_ACTION = res_data_code
                            data_rows[objIndex].KODE = res_data_code
                            data_rows[objIndex].KETERANGAN = res_data_msg
                            data_rows[objIndex].REQUEST = res_request
                            data_rows[objIndex].RESPONSE = res_request
                            data_rows[objIndex].KDCAB = res_kdcab
                            data_rows[objIndex].KDTK = res_kdtk
                            data_rows[objIndex].NAMA = res_station
                            data_rows[objIndex].STATION = res_station
                            data_rows[objIndex].IP = res_ip
                            data_rows[objIndex].NAMA_PROGRAM =  res_nama_program
                            data_rows[objIndex].VERSI = res_versi
                            rows3 = data_rows
                        }   
                    }
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
            data_rows[objIndex].NAMA_PROGRAM =  res_nama_program
            data_rows[objIndex].VERSI = res_versi;
            rows3 = data_rows;
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            const res_data_inti = parse_data_inti.toString().split('\r\n');                      
            for(var i = 0;i<res_data_inti.length;i++){
                const record_program = res_data_inti[i].trim();
                if(record_program == ''|| record_program.includes('DisplayName') || record_program.includes('@Label')|| record_program.includes('WARNING')|| record_program.includes('"Name","Version","ProviderName","Source"')){

                }else{
                    const nama_program = record_program.split("\"").join("").split(',')[0];
                    const versi = record_program.split("\"").join("").split(',')[1];
                    if(nama_program == ''){
                        console.log('program kosong : '+res_kdcab+'/'+res_kdtk+'/'+res_station)
                    }else{
                        //console.log('Id : '+GetID());
                        //const id = parseFloat(Math.floor(new Date().valueOf() * Math.random()).toString().substring(0,6));
                        const arr_content = {
                            // 'id':GetID(),
                            'KODE':res_data_code,
                            'KETERANGAN':res_data_msg,
                            'REQUEST':res_request,
                            'RESPONSE':res_response,
                            'KDCAB':res_kdcab,
                            'KDTK': res_kdtk,
                            'NAMA':res_nama,
                            'STATION':res_station,
                            'IP':res_ip,
                            'NAMA_PROGRAM':nama_program,
                            'VERSI':versi
                        };
                        rows3.push(arr_content);
                    }
                }
            }
            //-- failed listeners --//
        } else {
            const arr_content = {
                'KODE': res_data_code,
                'KETERANGAN':  res_data_msg,
                'REQUEST': res_request,
                'RESPONSE': res_response,
                'KDCAB': res_kdcab,
                'KDTK': res_kdtk,
                'NAMA': res_nama,
                'STATION': res_station,
                'IP': res_ip,
                'NAMA_PROGRAM': res_nama_program,
                'VERSI': res_versi
            };
            rows3.push(arr_content);
        }
    }
    return rows3;
}
