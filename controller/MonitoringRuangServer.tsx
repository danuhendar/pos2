export function ReportUPSServer(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_lokasi:string,res_request:string,res_response:string,res_id_report:string,res_ping:string,res_computer_name:string,res_ip:any,res_data_code:number,res_data_msg:string,parse_data_inti:any) { 
    let rows1: { 
            KODE:number; 
            KETERANGAN:string;
            REQUEST:string; 
            RESPONSE:string;
            KDCAB:string;
            SEGMENT:string; 
            ID_REPORT:string;
            PING:string;
            COMPUTER_NAME:string;
            IP:any;
            MODEL:string,
            LOCATION :string,
            DATE :string,
            TIME :string,
            BATTERY_REPLACEMENT_DATE :string,
            STATE_OF_CHARGE :string,
            BATTERY_TEMPERATURE :string,
            BATTERY_VOLTAGE :string,
            BATTERY_SKU :string,
            SERIAL_NUMBER :string,
            MANUFACTURE_DATE :string,
            INSTALLATION_DATE :string,
            FIRMWARE_VERSION :string,
            RUNTIME_REMAINING :string,
            OUTPUT_VOLTAGE :string,
            OUTPUT_FREQUENCY :string,
            OUTPUT_VA :string,
            OUTPUT_ENERGY_USAGE :string,
            INPUT_VOLTAGE :string,
            INPUT_FREQUENCY :string,
            LOAD_CURRENT:string,
    }[] = [];
    if(is_proses_ulang){
        if(res_data_code === 200 && parse_data_inti !== ''){
            if(parse_data_inti.includes('error : An error occurred') || parse_data_inti.includes('Error : ')){
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = 'Error Command';
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_request
                data_rows[objIndex].KDCAB = res_kdcab
                data_rows[objIndex].SEGMENT = res_lokasi
                data_rows[objIndex].ID_REPORT = res_id_report
                data_rows[objIndex].PING = res_ping
                data_rows[objIndex].COMPUTER_NAME = res_computer_name
                data_rows[objIndex].IP = res_ip
                
                data_rows[objIndex].MODEL = '-'
                data_rows[objIndex].LOCATION = '-'
                data_rows[objIndex].DATE = '-'
                data_rows[objIndex].TIME = '-'
                data_rows[objIndex].BATTERY_REPLACEMENT_DATE = '-'
                data_rows[objIndex].STATE_OF_CHARGE = '-'
                data_rows[objIndex].BATTERY_TEMPERATURE = '-'
                data_rows[objIndex].BATTERY_VOLTAGE = '-'
                data_rows[objIndex].BATTERY_SKU = '-'
                data_rows[objIndex].SERIAL_NUMBER = '-'
                data_rows[objIndex].MANUFACTURE_DATE = '-'
                data_rows[objIndex].INSTALLATION_DATE = '-'
                data_rows[objIndex].FIRMWARE_VERSION = '-'
                data_rows[objIndex].RUNTIME_REMAINING = '-'
                data_rows[objIndex].OUTPUT_VOLTAGE = '-'
                data_rows[objIndex].OUTPUT_FREQUENCY = '-'
                data_rows[objIndex].OUTPUT_VA = '-'
                data_rows[objIndex].OUTPUT_ENERGY_USAGE = '-'
                data_rows[objIndex].INPUT_VOLTAGE = '-'
                data_rows[objIndex].INPUT_FREQUENCY = '-'
                data_rows[objIndex].LOAD_CURRENT = '-'
            }else{
                
                try{
                    let sp_res = JSON.parse(parse_data_inti)    
                    

                    data_rows[objIndex].KODE = res_data_code;
                    data_rows[objIndex].KETERANGAN = res_data_msg;
                    data_rows[objIndex].REQUEST = res_request
                    data_rows[objIndex].RESPONSE = res_request
                    data_rows[objIndex].KDCAB = res_kdcab
                    data_rows[objIndex].SEGMENT = res_lokasi,
                    data_rows[objIndex].ID_REPORT = res_id_report
                    data_rows[objIndex].PING = res_ping
                    data_rows[objIndex].COMPUTER_NAME = res_computer_name
                    data_rows[objIndex].IP = res_ip
                    
                    data_rows[objIndex].MODEL = sp_res.MODEL
                    data_rows[objIndex].LOCATION = sp_res.LOCATION
                    data_rows[objIndex].DATE = sp_res.DATE
                    data_rows[objIndex].TIME = sp_res.TIME
                    data_rows[objIndex].BATTERY_REPLACEMENT_DATE = sp_res.BATTERY_REPLACEMENT_DATE
                    data_rows[objIndex].STATE_OF_CHARGE = sp_res.STATE_OF_CHARGE
                    data_rows[objIndex].BATTERY_TEMPERATURE = sp_res.BATTERY_TEMPERATURE
                    data_rows[objIndex].BATTERY_VOLTAGE = sp_res.BATTERY_VOLTAGE
                    data_rows[objIndex].BATTERY_SKU = sp_res.BATTERY_SKU
                    data_rows[objIndex].SERIAL_NUMBER = sp_res.SERIAL_NUMBER

                    data_rows[objIndex].MANUFACTURE_DATE = sp_res.MANUFACTURE_DATE
                    data_rows[objIndex].INSTALLATION_DATE = sp_res.INSTALLATION_DATE
                    data_rows[objIndex].FIRMWARE_VERSION = sp_res.FIRMWARE_VERSION
                    data_rows[objIndex].RUNTIME_REMAINING = sp_res.RUNTIME_REMAINING
                    data_rows[objIndex].OUTPUT_VOLTAGE = sp_res.OUTPUT_VOLTAGE
                    data_rows[objIndex].OUTPUT_FREQUENCY = sp_res.OUTPUT_FREQUENCY
                    data_rows[objIndex].OUTPUT_VA = sp_res.OUTPUT_VA
                    data_rows[objIndex].OUTPUT_ENERGY_USAGE = sp_res.OUTPUT_ENERGY_USAGE
                    data_rows[objIndex].INPUT_VOLTAGE = sp_res.INPUT_VOLTAGE
                    data_rows[objIndex].INPUT_FREQUENCY = sp_res.INPUT_FREQUENCY
                    data_rows[objIndex].LOAD_CURRENT = '-'
                }catch(Ex){
                    data_rows[objIndex].KODE = 405;
                    data_rows[objIndex].KETERANGAN = 'Error Parsing';
                    data_rows[objIndex].REQUEST = res_request
                    data_rows[objIndex].RESPONSE = res_request
                    data_rows[objIndex].KDCAB = res_kdcab
                    data_rows[objIndex].SEGMENT = res_lokasi
                    data_rows[objIndex].ID_REPORT = res_id_report
                    data_rows[objIndex].PING = res_ping
                    data_rows[objIndex].COMPUTER_NAME = res_computer_name
                    data_rows[objIndex].IP = res_ip
              
                    data_rows[objIndex].MODEL = '-'
                    data_rows[objIndex].LOCATION = '-'
                    data_rows[objIndex].DATE = '-'
                    data_rows[objIndex].TIME = '-'
                    data_rows[objIndex].BATTERY_REPLACEMENT_DATE = '-'
                    data_rows[objIndex].STATE_OF_CHARGE = '-'
                    data_rows[objIndex].BATTERY_TEMPERATURE = '-'
                    data_rows[objIndex].BATTERY_VOLTAGE = '-'
                    data_rows[objIndex].BATTERY_SKU = '-'
                    data_rows[objIndex].SERIAL_NUMBER = '-'
                    data_rows[objIndex].MANUFACTURE_DATE = '-'
                    data_rows[objIndex].INSTALLATION_DATE = '-'
                    data_rows[objIndex].FIRMWARE_VERSION = '-'
                    data_rows[objIndex].RUNTIME_REMAINING = '-'
                    data_rows[objIndex].OUTPUT_VOLTAGE = '-'
                    data_rows[objIndex].OUTPUT_FREQUENCY = '-'
                    data_rows[objIndex].OUTPUT_VA = '-'
                    data_rows[objIndex].OUTPUT_ENERGY_USAGE = '-'
                    data_rows[objIndex].INPUT_VOLTAGE = '-'
                    data_rows[objIndex].INPUT_FREQUENCY = '-'
                    data_rows[objIndex].LOAD_CURRENT = '-'
                }
                
            }
        }else{
                data_rows[objIndex].KODE = res_data_code;
                data_rows[objIndex].KETERANGAN = 'Error Command';
                data_rows[objIndex].REQUEST = res_request
                data_rows[objIndex].RESPONSE = res_request
                data_rows[objIndex].KDCAB = res_kdcab
                data_rows[objIndex].SEGMENT = res_lokasi
                data_rows[objIndex].ID_REPORT = res_id_report
                data_rows[objIndex].PING = res_ping,
                data_rows[objIndex].COMPUTER_NAME = res_computer_name
                data_rows[objIndex].IP = res_ip
                
               
                data_rows[objIndex].MODEL = '-'
                data_rows[objIndex].LOCATION = '-'
                data_rows[objIndex].DATE = '-'
                data_rows[objIndex].TIME = '-'
                data_rows[objIndex].BATTERY_REPLACEMENT_DATE = '-'
                data_rows[objIndex].STATE_OF_CHARGE = '-'
                data_rows[objIndex].BATTERY_TEMPERATURE = '-'
                data_rows[objIndex].BATTERY_VOLTAGE = '-'
                data_rows[objIndex].BATTERY_SKU = '-'
                data_rows[objIndex].SERIAL_NUMBER = '-'
                data_rows[objIndex].MANUFACTURE_DATE = '-'
                data_rows[objIndex].INSTALLATION_DATE = '-'
                data_rows[objIndex].FIRMWARE_VERSION = '-'
                data_rows[objIndex].RUNTIME_REMAINING = '-'
                data_rows[objIndex].OUTPUT_VOLTAGE = '-'
                data_rows[objIndex].OUTPUT_FREQUENCY = '-'
                data_rows[objIndex].OUTPUT_VA = '-'
                data_rows[objIndex].OUTPUT_ENERGY_USAGE = '-'
                data_rows[objIndex].INPUT_VOLTAGE = '-'
                data_rows[objIndex].INPUT_FREQUENCY = '-'
                data_rows[objIndex].LOAD_CURRENT = '-'
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            
            try{
                let sp_res = JSON.parse(parse_data_inti) 
                
                const arr_content = {
                    'KODE': res_data_code,
                    'KETERANGAN': res_data_msg,
                    'REQUEST': res_request,
                    'RESPONSE': res_response,
                    'KDCAB': res_kdcab,
                    'SEGMENT':res_lokasi,
                    'ID_REPORT': res_id_report,
                    'PING':res_ping,
                    'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                    'IP': res_ip,

                    'MODEL' : sp_res.Model,
                    'LOCATION' : sp_res.Location,
                    'DATE' : sp_res.Date,
                    'TIME' : sp_res.Time,
                    'BATTERY_REPLACEMENT_DATE' : sp_res.Battery_Replacement_Date,
                    'STATE_OF_CHARGE' : sp_res.State_Of_Charge,
                    'BATTERY_TEMPERATURE' : sp_res.Battery_Temprature,
                    'BATTERY_VOLTAGE' : sp_res.Battery_Voltage,
                    'BATTERY_SKU' : sp_res.Battery_SKU,
                    'SERIAL_NUMBER' : sp_res.Serial_Number,

                    'MANUFACTURE_DATE' : sp_res.Manufacture_Date,
                    'INSTALLATION_DATE' : sp_res.Installation_Date,
                    'FIRMWARE_VERSION' : sp_res.Firmware_Version,
                    'RUNTIME_REMAINING' : sp_res.Runtime_Remaining,
                    'OUTPUT_VOLTAGE':sp_res.Output_Voltage,
                    'OUTPUT_FREQUENCY' : sp_res.Output_Frequency,
                    'OUTPUT_VA' : sp_res.Output_VA,
                    'OUTPUT_ENERGY_USAGE': sp_res.Output_Energy_Usage,
                    'INPUT_VOLTAGE' :sp_res.Input_Voltage,
                    'INPUT_FREQUENCY' : sp_res.Input_Frequency,
                    'LOAD_CURRENT' : sp_res.Load_Current
                };
                rows1.push(arr_content);
            }catch(Ex){
                const arr_content = {
                    'KODE': 405,
                    'KETERANGAN': 'Error Parsing',
                    'REQUEST': res_request,
                    'RESPONSE': res_response,
                    'KDCAB': res_kdcab,
                    'SEGMENT': res_lokasi,
                    'ID_REPORT': res_id_report,
                    'PING':res_ping,
                    'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                    'IP': res_ip,
                    
                    'MODEL' : '-',
                    'LOCATION' : '-',
                    'DATE' : '-',
                    'TIME' : '-',
                    'BATTERY_REPLACEMENT_DATE' : '-',
                    'STATE_OF_CHARGE' : '-',
                    'BATTERY_TEMPERATURE' : '-',
                    'BATTERY_VOLTAGE' : '-',
                    'BATTERY_SKU' : '-',
                    'SERIAL_NUMBER' : '-',

                    'MANUFACTURE_DATE' : '-',
                    'INSTALLATION_DATE' : '-',
                    'FIRMWARE_VERSION' : '-',
                    'RUNTIME_REMAINING' : '-',
                    'OUTPUT_VOLTAGE':'-',
                    'OUTPUT_FREQUENCY' : '-',
                    'OUTPUT_VA' : '-',
                    'OUTPUT_ENERGY_USAGE': '-',
                    'INPUT_VOLTAGE' : '-',
                    'INPUT_FREQUENCY' : '-',
                    'LOAD_CURRENT' : '-'
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
                'SEGMENT': res_lokasi,
                'ID_REPORT': res_id_report,
                'PING':res_ping,
                'COMPUTER_NAME': (res_computer_name === '' ? '-' : res_computer_name),
                'IP': res_ip,
                'MODEL' : '-',
                'LOCATION' : '-',
                'DATE' : '-',
                'TIME' : '-',
                'BATTERY_REPLACEMENT_DATE' : '-',
                'STATE_OF_CHARGE' : '-',
                'BATTERY_TEMPERATURE' : '-',
                'BATTERY_VOLTAGE' : '-',
                'BATTERY_SKU' : '-',
                'SERIAL_NUMBER' : '-',
                'MANUFACTURE_DATE' : '-',
                'INSTALLATION_DATE' : '-',
                'FIRMWARE_VERSION' : '-',
                'RUNTIME_REMAINING' : '-',
                'OUTPUT_VOLTAGE':'-',
                'OUTPUT_FREQUENCY' : '-',
                'OUTPUT_VA' : '-',
                'OUTPUT_ENERGY_USAGE': '-',
                'INPUT_VOLTAGE' : '-',
                'INPUT_FREQUENCY' : '-',
                'LOAD_CURRENT' : '-'
            };
            rows1.push(arr_content);
        }
    }
    
    return rows1;
}

export function ReportCCTVRuangServer(is_proses_ulang:boolean,objIndex:number,data_rows:any,res_kdcab:string,res_lokasi:string,res_request:string,res_response:string,res_id_report:string,res_ping:string,res_computer_name:string,res_ip:any,res_data_code:number,res_data_msg:string,parse_data_inti:any) { 
    let rows1: { 
            CODE:string; 
            DESCRIPTION:string;
            UPDTIME :string,
            KDCAB:string;
            IP:any;
            LOCATION :string,
            CAMERA :string,
            MERK:string,
            SCHEDULER_06 :string,
            SCHEDULER_15 :string,
            SCHEDULER_23 :string,
            TYPE :string
            
            
    }[] = [];
    if(is_proses_ulang){
        if(res_data_code === 200 && parse_data_inti !== ''){
            if(parse_data_inti.includes('error : An error occurred') || parse_data_inti.includes('Error : ')){
                data_rows[objIndex].CODE = res_data_code;
                data_rows[objIndex].DESCRIPTION = 'Error Command';
                data_rows[objIndex].UPDTIME = '-'
                data_rows[objIndex].KDCAB = '-'
                data_rows[objIndex].IP = '-'
                data_rows[objIndex].LOCATION = '-'
                data_rows[objIndex].CAMERA = '-'
                data_rows[objIndex].MERK = '-'
                data_rows[objIndex].SCHEDULER_06 = '-'
                data_rows[objIndex].SCHEDULER_15 = '-'
                data_rows[objIndex].SCHEDULER_23 = '-'
                data_rows[objIndex].TYPE = '-'
            }else{
                
                try{
                    let sp_res = JSON.parse(parse_data_inti)    
                    data_rows[objIndex].CODE = sp_res.code;
                    data_rows[objIndex].DESCRIPTION = sp_res.msg;
                    data_rows[objIndex].UPDTIME = sp_res.updtime
                    data_rows[objIndex].KDCAB = sp_res.kdcab
                    data_rows[objIndex].IP = sp_res.ip
                    data_rows[objIndex].LOCATION = sp_res.lokasi
                    data_rows[objIndex].CAMERA = sp_res.camera
                    data_rows[objIndex].MERK = sp_res.merk
                    data_rows[objIndex].SCHEDULER_06 = sp_res.scheduler
                    data_rows[objIndex].SCHEDULER_15 = sp_res.scheduler
                    data_rows[objIndex].SCHEDULER_23 = sp_res.scheduler
                    data_rows[objIndex].TYPE = sp_res.tipe
                }catch(Ex){
                    data_rows[objIndex].KODE = 405;
                    data_rows[objIndex].DESCRIPTION = 'Error Parsing';
                    data_rows[objIndex].UPDTIME = '-'
                    data_rows[objIndex].KDCAB = '-'
                    data_rows[objIndex].IP = '-'
                    data_rows[objIndex].LOCATION = '-'
                    data_rows[objIndex].CAMERA = '-'
                    data_rows[objIndex].MERK = '-'
                    data_rows[objIndex].SCHEDULER_06 = '-'
                    data_rows[objIndex].SCHEDULER_15 = '-'
                    data_rows[objIndex].SCHEDULER_23 = '-'
                    data_rows[objIndex].TYPE = '-'
                }
                
            }
        }else{
            let sp_res = JSON.parse(parse_data_inti)        
            data_rows[objIndex].CODE = sp_res.code;
            data_rows[objIndex].DESCRIPTION = sp_res.msg;
            data_rows[objIndex].UPDTIME = sp_res.updtime
            data_rows[objIndex].KDCAB = sp_res.kdcab
            data_rows[objIndex].IP = sp_res.ip
            data_rows[objIndex].LOCATION = sp_res.lokasi
            data_rows[objIndex].CAMERA = sp_res.camera
            data_rows[objIndex].MERK = sp_res.merk
            data_rows[objIndex].SCHEDULER_06 = sp_res.scheduler
            data_rows[objIndex].SCHEDULER_15 = sp_res.scheduler
            data_rows[objIndex].SCHEDULER_23 = sp_res.scheduler
            data_rows[objIndex].TYPE = sp_res.tipe
        }
    }else{
        if (res_data_code === 200 && parse_data_inti !== '') {
            
            try{
                let sp_res = JSON.parse(parse_data_inti) 
                
                const arr_content = {
                    'CODE': sp_res.code,
                    'DESCRIPTION': sp_res.msg,
                    'UPDTIME': sp_res.updtime,
                    'KDCAB': sp_res.kdcab,
                    'IP': sp_res.ip,
                    'LOCATION' : sp_res.lokasi,
                    'CAMERA' : sp_res.camera,
                    'MERK' : sp_res.merk,
                    'SCHEDULER_06' : sp_res.scheduler_06,
                    'SCHEDULER_15' : sp_res.scheduler_15,
                    'SCHEDULER_23' : sp_res.scheduler_23,
                    'TYPE' : sp_res.tipe,
                };
                rows1.push(arr_content);
            }catch(Ex){
                const arr_content = {
                    'CODE': '405',
                    'DESCRIPTION':Ex.toString(),
                    'UPDTIME': '-',
                    'KDCAB': '-',
                    'IP': '-',
                    'LOCATION' : '-',
                    'CAMERA' : '-',
                    'MERK' :'-',
                    'SCHEDULER_06' : '-',
                    'SCHEDULER_15' : '-',
                    'SCHEDULER_23' : '-',
                    'TYPE' : '-',
                };
                rows1.push(arr_content);
            }
            
        }else{
            let sp_res = JSON.parse(parse_data_inti) 
            const arr_content = {
                'CODE': sp_res.code,
                'DESCRIPTION': sp_res.msg,
                'UPDTIME': sp_res.updtime,
                'KDCAB': sp_res.kdcab,
                'IP': sp_res.ip,
                'LOCATION' : sp_res.lokasi,
                'CAMERA' : sp_res.camera,
                'MERK' : sp_res.merk,
                'SCHEDULER_06' : sp_res.scheduler_06,
                'SCHEDULER_15' : sp_res.scheduler_15,
                'SCHEDULER_23' : sp_res.scheduler_23,
                'TYPE' : sp_res.tipe,
            };
            rows1.push(arr_content);
        }
    }
    
    return rows1;
}
