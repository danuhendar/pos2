import axios from 'axios';
export function get_api_get(in_host:string,in_port:string,in_path_url:string,in_param_value:string){
    var res = '';
    var url = 'http://'+in_host+':'+in_port+'/'+in_path_url+'/'+in_param_value;
    console.log('GET API : '+url);
    try{
        axios.get(url).then(response => {
            res = response.data;
        }).catch(error => {
            res = error;
        });
    }catch(Ex){
        res = Ex.toString()
    }
    return res;    
}
