

export function SendRealtime(url_per_toko:string,param:string,kdtk:string,ip:string,is_disconnect:boolean){
    const url = `ws://172.24.52.10:7322/sock/v1/RealtimeFromListener`;
    let socket: WebSocket;
    if(is_disconnect){
        console.log('is_disconnect : '+is_disconnect)
        socket = new WebSocket(url);
        socket.close()
        socket.addEventListener("close", (event) => {
            console.log('Close connection : 1')
        });
    }else{
        console.log('is_disconnect : '+is_disconnect)
        socket = new WebSocket(url);
        socket.addEventListener("open", (event) => {
            console.log('Connection Open')
            socket.send(param);
        });
    
        // Connection Error
        socket.addEventListener("error", (event) => {
            // is_disconnect.current = 1;
            // setisDisabledReconnect(false);
            console.log('Error WS : '+event)
        });
    
        // Connection close
        socket.addEventListener("close", (event) => {
            // setProgressProcesslist('Sesi Selesai, silahkan tekan tombol reconnect!');
            // setisDisabledReconnect(false);
            // if(ref.current === 0){
            //     console.log('connection close ref '+ref.current);
            //     is_disconnect.current = 1;
            // }else{
            //     console.log('connection close ref '+ref.current);   
            // }
            console.log('Close connection : 2')
            
        });
    
        socket.addEventListener("message", (event) => {
            if(is_disconnect){
                socket.close();
            }else{
                const data = event.data;
                const parse_json = JSON.parse(data);
                const code = parse_json.code;
                const msg = parse_json.msg;
                console.log('code : '+code+' msg : '+msg);
            }
        });
    }
    
    
   

    
}
