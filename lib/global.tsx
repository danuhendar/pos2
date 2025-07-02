import config from '@/lib/config.json';
import { IRootState } from '@/store';
import router from 'next/router';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Posts, PostsFile } from './post';
import { isNull, isUndefined } from 'lodash';
import secureLocalStorage from 'react-secure-storage';
import generateUniqueId from 'generate-unique-id';
import crypto from 'crypto';
import fs from 'fs';
import * as XLSX from 'xlsx';
import * as Excel from 'exceljs';
import FileSaver from 'file-saver';
import { Gets } from './get';
import JsBarcode from 'jsbarcode';
export const GenerateUniqNumber = () =>{
    const uniq_number = parseFloat(Math.floor(new Date().valueOf() * Math.random()).toString().substring(0,6));
    return uniq_number;
}

export const GetID = () =>{
    const uniq_number = generateUniqueId({
         length: 8,
         useNumbers: true,
         useLetters:false
      });
    return uniq_number;
}
export const millisToMinutesAndSeconds = (millis : number) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + " Menit " + (parseFloat(seconds) < 10 ? '0' : '') + seconds+' Detik';
}


let counter = 0;
let interval: string | number | NodeJS.Timeout;

export function stop() {
    clearInterval(interval);
}

export function convertSec(cnt: number) {
    let sec = cnt % 60;
    let min = Math.floor(cnt / 60);
    if (sec < 10) {
        if (min < 10) {
            return "0" + min + ":0" + sec;
        } else {
            return min + ":0" + sec;
        }
    } else if ((min < 10) && (sec >= 10)) {
        return "0" + min + ":" + sec;
    } else {
        return min + ":" + sec;
    }
}

export function start(in_counter:number,idComponent:any) {
    let ret = document.getElementById(idComponent);
    if(ret !== null){
        interval = setInterval(function() {
            ret.innerHTML = ""+convertSec(in_counter++);
        }, 1000);
    }
   
}

export function encryptString(data:string, secretKey:string, iv:string) {
    // Ensure the secret key is 32 bytes (AES-256 requires a 256-bit key)
    //const key = crypto.createHash('sha256').update(secretKey).digest('base64').slice(0, 32);
  
    // Initialize the cipher with AES-256-CBC mode
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    
    // Encrypt the data
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
  
    return encrypted;
}

export function DecodeAES(encryptedData:any,secretKey:string,iv:string){
    let val = ''
    try{
        let decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
        let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
        val = (decrypted + decipher.final('utf8'))
    }catch(Ex){
        val = ''
    }
    
    return val;
}

export function WritePayloadAPI(kdcab:string,toko:string,Station:string,Task:string,COMMAND:string,IDReport:string,MaxSecondHandleProses:number){
    var res_payload = '';
    let res_command_encode = encryptString(COMMAND,'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
    //console.log('res_command_encode : '+res_command_encode);
    let obj_payload = {"kdcab":kdcab,"toko":toko,"task":Task,"idreport":IDReport,"station":Station,"command":res_command_encode,"MaxSecondHandleProses":MaxSecondHandleProses};
    let arr_payload = [obj_payload];
    res_payload =  JSON.stringify(arr_payload);
    return res_payload;
}

export function WritePayloadWSOffice(kdcab:string,task:string,COMMAND:string,IDReport:string,Token:string,MaxSecondHandleProses:number,lokasi:string,NoCheckDB:boolean){
    var res_payload = '';
    let res_command_encode = encryptString(COMMAND,'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
    let obj_payload = {"kdcab":kdcab,"Task":task,"COMMAND":res_command_encode,"IDReport":IDReport,"Token":Token,"MaxSecondHandleProses":MaxSecondHandleProses,"lokasi":lokasi,"NoCheckDB":NoCheckDB};
    res_payload =  JSON.stringify(obj_payload);
    return res_payload;
}

export function WritePayloadWSRuangServer(kdcab:string,IDReport:string,Token:string,MaxSecondHandleProses:number,NoCheckDB:boolean,device:string){
    var res_payload = '';
    let obj_payload = {"kdcab":kdcab,"IDReport":IDReport,"Token":Token,"MaxSecondHandleProses":MaxSecondHandleProses,"NoCheckDB":NoCheckDB,"device":device};
    res_payload =  JSON.stringify(obj_payload);
    return res_payload;
}

export function WritePayload(kdcab:string,toko:string,Station:string,IsInduk:string,Task:string,COMMAND:string,HandleTime:number,IsTulisFile:boolean,IDReport:string,Token:string,IP:string,NoCheckDB:boolean,MaxSecondHandleProses:number){
    var res_payload = '';
    let res_command_encode = encryptString(COMMAND,'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
    var payload = {
        "kdcab":kdcab,
        "toko":toko,
        "Station":Station,
        "IsInduk":IsInduk,
        "Task":Task,
        "COMMAND":res_command_encode,
        "HandleTime":HandleTime,
        "IsTulisFile":IsTulisFile,
        "IDReport":IDReport,
        //"Token":Token,
        "IP":IP,
        "NoCheckDB":NoCheckDB,
        "MaxSecondHandleProses":MaxSecondHandleProses
    }
    res_payload = JSON.stringify(payload);
    return res_payload;
}



export function SendMessageMqtt_FromAPI(url:string,payload:string,Token:string){
    let res_data = '';
    Posts(url,payload,false,Token).then(
        (response) => {
            res_data = response;
        }
    ).catch(
        (error) => {
           res_data = error;
        }
    );
    return res_data;
}

export function WritePayloadSetRouter(ip:string,ip_routing_CDC:string,ip_routing_dawuhan:string,ip_routing_vsat:string,kdcab:string,server_ntp_1:string,server_ntp_2:string,station:string,timezonerouter:string,token:string,toko:string,noCheckDB:boolean,ip_routing_CBN:string){
    var res_payload = '';
    var payload = {
        "ip": ip,
        "ip_routing_CDC": ip_routing_CDC,
        "ip_routing_dawuhan": ip_routing_dawuhan,
        "ip_routing_CBN": ip_routing_CBN,
        "ip_routing_vsat": ip_routing_vsat,
        "kdcab": kdcab,
        "server_ntp_1": server_ntp_1,
        "server_ntp_2": server_ntp_2,
        "station": station,
        "timezonerouter": timezonerouter,
        "token": token,
        "toko": toko,
        "noCheckDB":noCheckDB
    }
    res_payload = JSON.stringify(payload);
    return res_payload;
}

export function WritePayloadRealtime(kdcab:string,toko:string,Station:string,IsInduk:string,Task:string,COMMAND:string,HandleTime:number,IsTulisFile:boolean,IDReport:string,Token:string,IP:string,SecondHandleTime:number,MaxSecondHandleTime:number){
    var res_payload = '';
    let res_command_encode = encryptString(COMMAND,'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');

    var payload = {
        "kdcab":kdcab,
        "toko":toko,
        "Station":Station,
        "IsInduk":IsInduk,
        "Task":Task,
        "COMMAND":res_command_encode,
        "HandleTime":HandleTime,
        "IsTulisFile":IsTulisFile,
        "IDReport":IDReport,
        "Token":Token,
        "IP":IP,
        "SecondHandleTime":SecondHandleTime,
        "MaxSecondHandleTime":MaxSecondHandleTime,
        "noCheckDB":true
    }
    res_payload = JSON.stringify(payload);
    return res_payload;
}

export function WritePayloadRealtimeRouter(kdcab:string,toko:string,station:string,token:string,ip:string,MaxSecondHandleTime:number){
    var res_payload = '';
    var payload = {
        "kdcab":kdcab,
        "toko":toko,
        "station":station,
        "token":token,
        "ip":ip,
        "MaxSecondHandleTime":MaxSecondHandleTime
    }
    res_payload = JSON.stringify(payload);
    return res_payload;
}

export function WritePayloadKoneksi(kdcab:string,toko:string,Station:string,HandleTime:number,Token:string,IDReport:string){
    var res_payload = '';
    var payload = {
        "kdcab":kdcab,
        "toko":toko,
        "Station":Station,
        "HandleTime":HandleTime,
        "Token":Token,
        "IDReport":IDReport
    };
    res_payload = JSON.stringify(payload);
    return res_payload;
}

export function get_data_local_storage(key:string){
    var menu = '';
    if (typeof window !== 'undefined' && window.localStorage) {
        // Perform localStorage action
        menu = localStorage.getItem(key);
        //console.log(menu)   
    }
      
    return menu; 
}

export function handleSave(key:string,data_api:any,is_Secure:boolean) {
    if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, data_api);
        if(is_Secure){
            secureLocalStorage.setItem(key, data_api);
        }else{

        }
        
    }
}

export function handleLogout(){
    if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("login"); 
        localStorage.removeItem("lmenu"); 
        localStorage.removeItem("branch_coverage"); 
        localStorage.removeItem("ot"); 
        localStorage.removeItem("rot"); 
        localStorage.removeItem("segment");
        localStorage.removeItem("nik");
        localStorage.removeItem("nama");
        localStorage.removeItem("menu");
        localStorage.removeItem("bagian");
        localStorage.removeItem("id_periode");
        router.push('/');
    }
   
}

export function get_branch_code(is_add_region_ho:boolean,is_only_region:boolean) {
    var options = [];
    try {
        if (typeof window !== "undefined" && window.localStorage) {
            var data_login = DecodeAES(localStorage.getItem("branch_coverage"),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
            if(is_only_region){
                var branch = DecodeAES(localStorage.getItem("login"),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
                var p = JSON.parse(branch)
                var res_branch = p.branch.split('RE0').join('REG');
                var arr_reg = { value: res_branch, label: res_branch };
                options.push(arr_reg);
            }else{
                options = JSON.parse(data_login);
                if(is_add_region_ho){
                    options.shift()
                    var arr_ho = { value: 'HO', label: 'HO' };
                    options.push(arr_ho);
                    var arr_reg1 = { value: 'REG1', label: 'REG1:Region 1' };
                    options.push(arr_reg1);
                    var arr_reg2 = { value: 'REG2', label: 'REG2:Region 2' }
                    options.push(arr_reg2);
                    var arr_reg3 = { value: 'REG3', label: 'REG3:Region 3' }
                    options.push(arr_reg3);
                    var arr_reg4 = { value: 'REG4', label: 'REG4:Region 4' }
                    options.push(arr_reg4);
                }
            }
            
        }
    } catch (Ex) {
        Swal.fire({
            icon: 'warning',
            padding: '2em',
            title: "Warning",
            text: "Error : 406-Access Data!",
            customClass: 'sweet-alerts',
            timer: 4000,
            timerProgressBar: true,
            showCancelButton: false,
            showConfirmButton: false
        });
        router.push('/')
    }

    return options;
}

export function GetToken(){
    var Token = DecodeAES(get_data_local_storage('ot'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN') as any;
    return Token;
}

export function GetTokenRND(){
    var Token = DecodeAES(get_data_local_storage('ot2'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN') as any;
    return Token;
}
export function GetRefreshTokenRND(){
    var RefreshToken = DecodeAES(get_data_local_storage('rot2'),'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN') as any;
    return RefreshToken;
}


export function countObjectsByValue(jsonObj:any, key:any, value:any) {
    let count = 0;
    // Iterate over each property of the JSON object
    for (const objKey in jsonObj) {
        if (jsonObj.hasOwnProperty(objKey)) {
            const objValue = jsonObj[objKey];
            // Check if the current property matches the specified key and value
            if (objKey === key && JSON.stringify(objValue) === JSON.stringify(value) && typeof objValue === 'object' && objValue !== null) {
                count++;
            }
            // If the value is an object, recursively count objects in nested objects
            if (typeof objValue === 'object' && objValue !== null) {
                count += countObjectsByValue(objValue, key, value);
            }
        }
    }
    return count;
}

export function summarizeJSONObjectByValue(jsonObject:any,in_key:string) {
    //const key_search = 'G004';
    var summary = 0;
    for(var i = 0;i<jsonObject.length;i++){
        for (const key in jsonObject[i]) {
            const value = jsonObject[i][key];
            if(value === in_key){
               summary++;
            }else{
    
            }
        }
    }

    return summary;
}

export function groupByValueAndCount2(rows:any, key:string){
    var raw = groupByValueAndCount(rows,key);
   
    let arr_key = [];
    let arr_val = [];
        for (const property in raw) {
            const value = parseFloat(`${raw[property]}`);
            arr_val.push(value)
            const key = `${property}`;
            arr_key.push(key)
        }
    let arr_concat = [arr_key,arr_val];
    return arr_concat;
}

export function groupByValueAndCount(arr:any, key:string) {
    return arr.reduce((acc: { [x: string]: any; }, obj: { [x: string]: any; }) => {
        const value = obj[key];
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
}

export function ListKey(groupedData:any, is_key:boolean) {
    var arr = [];
    for (const key in groupedData) {
        if (Object.hasOwnProperty.call(groupedData, key)) {
            const value = groupedData[key];
            if(is_key){
                //console.log(`${key}`);
                arr.push(`${key}`);
            }else{
                //console.log(`${value}`);
                arr.push(`${value}`);
            }
            
        }
    }

    return arr;
}


export function groupByValue(arr: any[], key: string | number) {
    return arr.reduce((acc: { [x: string]: any[]; }, obj: { [x: string]: any; }) => {
        const value = obj[key];
        acc[value] = acc[value] || [];
        acc[value].push(obj);
        return acc;
    }, {});
}

export function groupByMessageListeners(data:any,key_search:string,is_total:boolean,is_success:boolean,is_router:boolean){
    var arr = [];
    let res_total_sukses = 0;
    let res_total_gagal = 0;
    const group_value_keterangan = groupByValueAndCount(data,key_search);
    //console.log('group_value_keterangan : '+JSON.stringify(group_value_keterangan));
    for (const key in group_value_keterangan) {
        const in_key_data = key;
        if(is_router){
            if(in_key_data === '200'){
                res_total_sukses = group_value_keterangan[in_key_data];
                //console.log('Sukses : '+res_total_sukses);
            }else{
                res_total_gagal  = res_total_gagal + group_value_keterangan[in_key_data];
                //console.log('Gagal : '+res_total_gagal);
            }
        }else{
            if(in_key_data === '200'){
                res_total_sukses = group_value_keterangan[in_key_data];
                //console.log('Sukses : '+res_total_sukses);
            }else{
                res_total_gagal  = res_total_gagal + group_value_keterangan[in_key_data];
                //console.log('Gagal : '+res_total_gagal);
            }
        }
       
    }
    arr = [res_total_sukses,res_total_gagal];
    return arr;
}

export function groupByMessageListeners_PerCabang(data:any,key_search:string,is_total:boolean,is_success:boolean,is_error:boolean){
    var arr = [];
    const a = groupByValue(data,key_search);
    //console.log('a : '+JSON.stringify(a));
    var gagal = 0;
    for(const key in a){
       
        if (Object.hasOwnProperty.call(a, key)) {
            const val_key = key;
            //console.log('val_key : '+val_key)
            const value = a[key];
            //console.log('value : '+value)
            const key_listener_msg = 'KODE';
            if(is_total){
                const group_per_status = groupByValueAndCount(value,'KDCAB');
                //console.log('group_per_status_total : '+JSON.stringify(group_per_status));
                for (const c in group_per_status) {
                    arr.push(group_per_status[c]);
                    //console.log('c : '+group_per_status[c]);
                }
                
            }else{
                const group_per_status = groupByValueAndCount(value,key_listener_msg);
                //console.log('group_per_status : '+JSON.stringify(group_per_status));
                for (const b in group_per_status) {
                    const in_key_data = b;
                    var success = 0;
                    
                    //console.log('in_key_data : '+in_key_data);
                    if(isNaN(gagal) || isUndefined(success)){
                    
                    }else{
        
                            if(is_success){
                                if(in_key_data === '200'){
                                    success = group_per_status[in_key_data];
                                    arr.push(success);
                                }else{
                                
                                }
                                
                            }else{
                                if(in_key_data === '200'){
    
                                }else{
                                    gagal  = gagal + (isUndefined(group_per_status[in_key_data]) === true ? 0 : group_per_status[in_key_data]);
                                    arr.push(gagal);
                                }
                            }
                    }
                }
            }
           
            
        }

      

    }
    return arr;
}

export function groupByMessageRouter(data:any,key_search:string,is_total:boolean,is_success:boolean){
    var arr = [];
    const a = groupByValue(data,key_search);
    for(const key in a){
        if (Object.hasOwnProperty.call(a, key)) {
            const val_key = key;
            const value = a[key];
            const key_listener_msg = 'CLICK_FOR_ACTION';
            const group_per_status = groupByValueAndCount(value,key_listener_msg);
           
            var total = 0;
            var success = 0;
            var failed = 0;
            if(isNaN(total) || isUndefined(success) || isUndefined(failed)){
                
            }else{
               if(is_success){
                    success = ((isUndefined(group_per_status.Succes)) === true ? 0 : group_per_status.Succes);
                    arr.push(success);
                }else{
                    failed =  ((isUndefined(group_per_status.Succes)) === false ? 0 : 1);
                    arr.push(failed);
                }
            }
            
        }
    }

    return arr;
}

export function GetFailedClient(data:any,key_search:string,is_IP:boolean){
    var arr = '';
    for(var j = 0;j<data.length;j++){
        if(data[j].KODE === 200){

        }else if(data[j].KODE === 200 && (data[j].data === '' || data[j].data.toString().includes("Job timed out after")) ){
            if(is_IP){
                const ip_failed = data[j].IP;
                if(arr.includes(ip_failed)){
                                            
                }else{
                    arr += ip_failed+",";
                }
            }else{
                const kdtk_failed = data[j].KDTK;
                if(arr.includes(kdtk_failed)){
                                            
                }else{
                    arr += kdtk_failed+",";
                }
            }
        }else{
            if(is_IP){
                const ip_failed = data[j].IP;
                if(arr.includes(ip_failed)){
                                            
                }else{
                    arr += ip_failed+",";
                }
            }else{
                const kdtk_failed = data[j].KDTK;
                if(arr.includes(kdtk_failed)){
                                            
                }else{
                    arr += kdtk_failed+",";
                }
            }
            
        }
    }

    arr = arr.substring(0,(arr.length-1));
    //console.log('arr_failed : '+arr)
    return arr;
}

export function GetTotalFailedClient(idComponent:string){
    let res_text = '';
    const v = document.getElementById(idComponent);
    const val_string = v.innerHTML;
    const replace_string = val_string.split('<span class="text-center text-xl text-danger sm:text-3xl">').join('').split('</span>').join('');
    const replace_string_2 = replace_string;
    //.substring(0,1)
    
    res_text = replace_string_2;
    //console.log('res_text : '+res_text);
    return res_text;
}

export function GetTotalClientByStatus(data:any,key_search:string,sub_key:string,in_jenis_status:string){
    var arr = [];
    const a = groupByValue(data,key_search);
    //console.log('a : '+a)
    for(const key in a){
        if (Object.hasOwnProperty.call(a, key)) {
            const val_key = key;
            const value = a[key];
            const key_listener_msg = sub_key;
            const group_per_status = groupByValueAndCount(value,key_listener_msg);
            //console.log('group_per_status val_key : '+JSON.stringify(val_key)+'\r\ndata : '+JSON.stringify(group_per_status));
            if(in_jenis_status === 'OK'){
                var val = ((isUndefined(group_per_status.OK)) === true ? 0 : group_per_status.OK);
                arr.push(val);
            }else if(in_jenis_status === 'NOK CABANG INI'){
                var val = ((isUndefined(group_per_status['NOK CABANG INI'])) === true ? 0 : group_per_status['NOK CABANG INI']);
                arr.push(val);
            }else if(in_jenis_status === 'NOK ATTRIBUTE'){
                var val = ((isUndefined(group_per_status['NOK ATTRIBUTE'])) === true ? 0 : group_per_status['NOK ATTRIBUTE']);
                arr.push(val);
            }else if(in_jenis_status === 'NOK VERSI IDMCOMMANDLIBRARY'){
                var val = ((isUndefined(group_per_status['NOK VERSI IDMCOMMANDLIBRARY'])) === true ? 0 : group_per_status['NOK VERSI IDMCOMMANDLIBRARY']);
                arr.push(val);
            }else if(in_jenis_status === 'NOK SERVICE LISTENER'){
                var val = ((isUndefined(group_per_status['NOK SERVICE LISTENER'])) === true ? 0 : group_per_status['NOK SERVICE LISTENER']);
                arr.push(val);
            }else if(in_jenis_status === 'NOK VERSI SERVICE LISTENER'){
                var val = ((isUndefined(group_per_status['NOK VERSI SERVICE LISTENER'])) === true ? 0 : group_per_status['NOK VERSI SERVICE LISTENER']);
                arr.push(val);
            }else if(in_jenis_status === 'NOK VERSI LISTENER'){
                var val = ((isUndefined(group_per_status['NOK VERSI LISTENER'])) === true ? 0 : group_per_status['NOK VERSI LISTENER']);
                arr.push(val);
            }else if(in_jenis_status === 'TIMEOUT'){
                var val = ((isUndefined(group_per_status['TIMEOUT'])) === true ? 0 : group_per_status['TIMEOUT']);
                arr.push(val);
            }else if(in_jenis_status === 'ERROR COMMAND'){
                var val = ((isUndefined(group_per_status['ERROR COMMAND'])) === true ? 0 : group_per_status['ERROR COMMAND']);
                arr.push(val);
            }
            else{
                
            }
        }
        
    }

    return arr;
}

export function SummaryValueOfArray(data_array:any){
    let sum_total = 0;

    // iterate over each item in the array
    for (let i = 0; i < data_array.length; i++ ) {
        sum_total += data_array[i];
    }

    return sum_total;
}

export function removeItemOnceArray(arr : any, indexObj:any) {
    arr.slice(indexObj);
    return arr;
}

export function removeItemByValue(array:any,item:any){
    var index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index, item);
    }
    return array;
}
export function removeItemByValue_ForMultidimensi(array:any,item:any){
    const objIndex = array.findIndex(((obj: { id: any; }) => obj.id == item));
    if (objIndex !== -1) {
        array.splice(objIndex, item);
    }
    return array;
}

export function susun_ulang_data(data_rows:any){
    let arr_concat = [];
    for(var n = 0;n<data_rows.length;n++){
        const a = data_rows[n];
        if(a.KETERANGAN === 'success'){
            const arr_content = {
                'id':a.id,
                'KETERANGAN':a.KETERANGAN,
                'REQUEST':a.REQUEST,
                'RESPONSE':a.RESPONSE,
                'KDCAB':a.KDCAB,
                'KDTK': a.KDTK,
                'NAMA':a.NAMA,
                'STATION':a.STATION,
                'IP':a.IP,
                'NAMA_PROGRAM':a.NAMA_PROGRAM,
                'VERSI':a.VERSI
            };
            arr_concat.push(arr_content);
        
        }
    }

    return arr_concat;
}

export function HitungSuksesDanGagalFomTable(rows:any,in_key_search:string,is_router:boolean){
    var arr = [];
    const success = groupByMessageListeners(rows,in_key_search,false,true,is_router);
    const res_success = SummaryValueOfArray(success);
    const failed = groupByMessageListeners(rows,in_key_search,false,false,is_router);
    const res_failed = SummaryValueOfArray(failed);
    arr = [res_success,res_failed];
    return arr;
}

export function GetFormatCurrency(price:string){
    let num = price;
    let rupiahFormat = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return rupiahFormat;
}

export async function ConvertBinaryToText(event:any){
    const text = await new Response(event.data).text();
    return text;
}

export function setTombolAmbilDataGagal(idComponent:any){
    const val_gagal = GetTotalFailedClient('value_total_gagal');
    const char_svg = '<svg width="20" height="20" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-bounce w-6 h-6"><path d="M19 11L12 17L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity="0.5" d="M19 7L12 13L5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>';
    idComponent.innerHTML = char_svg+'&nbsp;'+val_gagal;
}

export function AddID(rows:any){
    var res: any[] = [];
    for(var i = 0;i<rows.length;i++){
        var obj = rows[i];
        Object.assign(obj, {id: GetID()});
        res.push(obj);
    }
    return res;
}

export function AddColumn(cols:any,item_new:any){
    var res_columns: any[] = [];
    for(var i = 0;i<1;i++){
        var obj = cols[i];
        Object.assign(obj, item_new);
        res_columns.push(obj);
    }
    return res_columns;
}
 

export function get_tahun_bulan(){
    var today = new Date();
    var bulan = today.getMonth()+1;
    var res_bulan = "";
    if(bulan<10){
        res_bulan = "0"+bulan;
    }else{
        res_bulan = ""+bulan;
    }

    var date = today.getFullYear()+res_bulan;
    var hasil = date;
    return hasil;
}
export function get_dateTimeDiff_second(endDate:Date,startDate:Date){
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    return seconds.toString();
}
export function get_format_tanggal_jam(){
    var today = new Date();
    var bulan = today.getMonth()+1;
    var res_bulan = "";
    if(bulan<10){
        res_bulan = "0"+bulan;
    }else{
        res_bulan = ""+bulan;
    }

    var menit = today.getMinutes();
    var res_menit = "";
    if(menit<10){
        res_menit = "0"+menit;
    }else{
        res_menit = ""+menit;
    }

    var detik = today.getSeconds()+1;
    var res_detik = "";
    if(detik<10){
        res_detik = "0"+detik;
    }else{
        res_detik = ""+detik;
    }

    var tanggal = today.getDate();
    var res_tanggal = "";
    if(tanggal<10){
        res_tanggal = "0"+tanggal;
    }else{
        res_tanggal = ""+tanggal;
    }

    var jam = today.getHours();
    var res_jam = "";
    if(jam<10){
        res_jam = "0"+jam;
    }else{
        res_jam = ""+jam;
    }
    var date = today.getFullYear()+'-'+res_bulan+'-'+res_tanggal;
    var time = res_jam+':'+res_menit+':'+res_detik;
    var hasil = date + ' '+ time;
    return hasil;
}

export function get_format_tanggal_jam_substract(in_hour_substract:number){
    var today = new Date();
    var bulan = today.getMonth()+1;
    var res_bulan = "";
    if(bulan<10){
        res_bulan = "0"+bulan;
    }else{
        res_bulan = ""+bulan;
    }

    var menit = today.getMinutes();
    var res_menit = "";
    if(menit<10){
        res_menit = "0"+menit;
    }else{
        res_menit = ""+menit;
    }

    var detik = today.getSeconds()+1;
    var res_detik = "";
    if(detik<10){
        res_detik = "0"+detik;
    }else{
        res_detik = ""+detik;
    }

    var tanggal = today.getDate();
    var res_tanggal = "";
    if(tanggal<10){
        res_tanggal = "0"+tanggal;
    }else{
        res_tanggal = ""+tanggal;
    }

    var jam = today.getHours() - in_hour_substract;
    var res_jam = "";
    if(jam<10){
        res_jam = "0"+jam;
    }else{
        res_jam = ""+jam;
    }

    

    var date = today.getFullYear()+'-'+res_bulan+'-'+res_tanggal;
    var time = res_jam+':'+res_menit+':'+res_detik;
    var hasil = date + ' '+ time;
    return hasil;
}


export function ConvertDateFormat(date:any,in_is_datetime:boolean) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
      
    var time =   d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    let get_data = ''
    if(in_is_datetime){
        get_data = year+'-'+month+'-'+day+' '+time
    }else{
        get_data = year+'-'+month+'-'+day
    }
    return get_data;
}


export function removeDuplicates(arr:any) {
    return arr.filter((item:any,index:any) => arr.indexOf(item) === index);
}

export function SendEmail(in_url:string,docs:any,email:any,subject:any,pesan:any,cc:any){
    var isResult = '';
    try{
        const formData = new FormData();
        formData.append("cc", cc);
        formData.append("pesan", pesan);
        formData.append("subject", subject);
        formData.append("email", email);
        formData.append("docs", docs);
        
        PostsFile(in_url,formData,false) .then(
                (response: any) => {
                    const res_data = response;
                    var code = res_data.code;
                    var msg = res_data.message;
                    var data = res_data.data;
                    
                    if(parseFloat(code) === 200){ 
                        isResult = msg;
                    }else if(code.toString().substring(0,1) === '4'){
                        isResult = msg;
                    }else{
                        isResult = msg;
                    } 
                    
                }
        ).catch((error: { toString: () => string; }) => {
            isResult = error.toString()
        });
        
    }catch(Ex){
        isResult = Ex.toString();
    } 

    return isResult;
}

export function RemoveDuplicateArray(arr:any){
    var last = '';
    let new_arr: any[] = [];
    arr.filter((value: any, index: any) => {
        var kini = value.value;
        if(kini !== last){
            new_arr.push(value)
        }else{
            
        }
        last = kini;
    });

    return new_arr;
}

export async function SendHandleRowClick(idreport:string,kdcab:string,kdtk:string,station:string,res_command:string,Token:string){
    let url_api = "http://172.24.52.30:7321/ReportFromListener/v1/CekStore";
    // let obj_payload = {"kdcab":kdcab,"toko":kdtk,"task":"COMMAND","idreport":idreport,"station":station,"command":res_command};
    // let arr_payload = [obj_payload];
    // let payload =  JSON.stringify(arr_payload);
    let payload = WritePayloadAPI(kdcab,kdtk,station,"COMMAND",res_command,idreport,160);
    console.log('url : '+url_api);
    console.log('payload : '+payload);
    let get = await Posts(url_api,payload,false,Token);
    return get;
}
export async function SendHandleRowClickOffice(task:string,IDReport:string,kdcab:string,kdtk:string,station:string,res_command:string,MaxSecondHandleProses:number,lokasi:string,ip:string,Token:string){
    let url_api = "http://172.24.52.30:7321/ReportFromOffice/V1/CekOffice";
    // let obj_payload = {"kdcab":kdcab,"toko":kdtk,"task":"COMMAND","idreport":idreport,"station":station,"command":res_command};
    // let arr_payload = [obj_payload];
    // let payload =  JSON.stringify(arr_payload);
    let res_command_encode = encryptString(res_command,'IDMC0mmandMustbeSetFor5ecr3t@3DP','R4h451A_3DP@4MaN');
    //let payload = WritePayloadAPI(kdcab,kdtk,station,"COMMAND",res_command_encode,idreport,160);
    let obj_payload = [{"kdcab":kdcab,"lokasi":lokasi,"Ip":ip,"Task":task,"COMMAND":res_command_encode,"IDReport":IDReport,"MaxSecondHandleProses":MaxSecondHandleProses}];
    let payload = JSON.stringify(obj_payload)
    console.log('url : '+url_api);
    console.log('payload : '+payload);
    let get = await Posts(url_api,payload,false,Token);
    return get;
}

export async function ApiHandleRowClick(kdcab:string,ip:string,otorisator:string,res_command:string,Token:string){
    let url_api = "http://172.24.52.65:4646/user/GetDataToko/GetCMD";
    let obj_payload = {"IN_KODE_CABANG":kdcab,"IN_IP":ip,"IN_OTORISATOR":otorisator,"IN_COMMAND":res_command};
    
    let payload =  JSON.stringify(obj_payload);
    let get = await Posts(url_api,payload,false,Token);
    return get;
}

export function GetSignature(host:string,port:number,Token:string,command:string){
    var ret_data = ''
    let url_api = 'http://'+host+':'+port+'/sign'
    return new Promise((resolve,reject) => {
        Gets(url_api,false,false).then((response) => {

            const p = JSON.parse(JSON.stringify(response))
            const code = p.code
            const msg = p.msg
            const data = p.data
            var dec_signature = DecodeAES(data, 'IDMC0mmandMustbeSetFor5ecr3t@3DP', 'R4h451A_3DP@4MaN')
            if(code === 200){
                var obj_command = {"key":dec_signature,"Command":command}
                ret_data = JSON.stringify(obj_command)
            }else{
                ret_data = 'Failed Get Signature'
            }
            resolve(ret_data)
        }).catch((err) => {
            reject(err)
        });
    });
}

export async function writeXlsxWithImageBase64(outputPath:any,imageBase64:any) {
  try {
    // Read the image file and convert it to Base64
    //const imageBuffer = fs.readFileSync(imagePath);
    //const imageBase64 = imageBuffer.toString('base64');

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['Image (Base64):'],
      [imageBase64]
    ]);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to an XLSX file
    XLSX.writeFile(workbook, outputPath);

    console.log(`XLSX file with Base64 encoded image data written to ${outputPath}`);
  } catch (error) {
    console.error('Error writing XLSX file:', error);
  }
}


export async function writeImagePngToXlsx(base64String:string,outputPath:string) {
    try {
      // Convert the image to Base64
      //const base64String = await imageToBase64(imagePath);
        
      // Construct the data URI for embedding (optional, but good practice)
      const dataURI = `data:image/png;base64,${base64String}`;
  
      // Create a new workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet([
        ['Embedded Image:'],
        [dataURI] // You can store the Data URI in a cell
      ]);
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
      // Write the workbook to an XLSX file
      XLSX.writeFile(workbook, outputPath);
  
      console.log(`PNG image data (as Base64 Data URI) written to ${outputPath}`);
      console.log('Note: Directly embedding images within XLSX cells programmatically can be complex and might require specific libraries or methods beyond basic cell content.');
      console.log('The Data URI is stored in the cell, and rendering it as an image within Excel might require additional steps (e.g., using Excel features or VBA).');
  
    } catch (error) {
      console.error('Error writing image to XLSX:', error);
    }
}

export async function embedPngImageExceljs(outputPath:string, base64String:string) {
    try {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Sheet1');
  
      // Add an image
      // Add an image using Base64 data
      const imageId = workbook.addImage({
        base64: `data:image/png;base64,${base64String}`, // Include the data URI prefix
        extension: 'png',
      });
  
      // Add the image to a specific cell with positioning
      worksheet.addImage(imageId, {
        tl: { col: 0, row: 0 },
        ext: { width: 300, height: 200 },
      });
  
      //await workbook.xlsx.writeFile(outputPath);
      workbook.xlsx.writeBuffer().then(buffer => FileSaver.saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`)).catch(err => console.log('Error writing excel export', err));
      console.log(`PNG image embedded in ${outputPath} using exceljs.`);
  
    } catch (error) {
      console.error('Error embedding image using exceljs:', error);
    }
}
  

export async function importJsonToExcel(outputPath:string, jsonData:any) {
    try {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Assuming your JSON data is an array of objects
        if (!Array.isArray(jsonData) || jsonData.length === 0) {
            console.log('JSON data is empty or not an array.');
            return;
        }

        // Extract headers from the first object (assuming consistent structure)
        const headers = Object.keys(jsonData[0]);
        worksheet.addRow(headers); // Add headers as the first row

        // Add data rows
        for (const rowData of jsonData) {
            const rowValues = headers.map(header => rowData[header]);
           
            //-- cek image base64 --//
            // Add an image
            // Add an image using Base64 data
            // const imageId = workbook.addImage({
            //     base64: `data:image/png;base64,${base64String}`, // Include the data URI prefix
            //     extension: 'png',
            // });
        
            // Add the image to a specific cell with positioning
            // worksheet.addImage(imageId, {
            //     tl: { col: 0, row: 0 },
            //     ext: { width: 300, height: 200 },
            // });
            
            worksheet.addRow(rowValues);
        }

        await workbook.xlsx.writeFile(outputPath);
        console.log(`JSON data imported to ${outputPath}`);

    } catch (error) {
        console.error('Error importing JSON to Excel:', error);
    }
}

export function GetCommandPowershell(in_command:string,timeout_command:number){
    var awal = "%systemroot%\\system32\\WindowsPowerShell\\v1.0\\powershell.exe \"$scriptBlock={"+in_command+"};$timeout="+timeout_command+";$job = Start-Job -ScriptBlock $scriptBlock;if (Wait-Job -Job $job -Timeout $timeout){$result=Receive-Job -Job $job;Write-Host $result;}else{Stop-Job -Job $job;Remove-Job -Job $job;Write-Host ('Job timed out after',$timeout,'seconds');};exit;\"";
    return awal;
}

export function textToBase64Barcode(text:string){
  //var JsBarcode = require('jsbarcode');
  var canvas = document.createElement("canvas");
  JsBarcode(canvas, text, {format: "CODE39"});
  return canvas.toDataURL("image/png");
}