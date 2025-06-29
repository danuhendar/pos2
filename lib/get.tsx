import { NextResponse } from 'next/server'
import { GetToken, GetTokenRND } from './global';
 
export const Gets = async(url:string,is_token_rnd:boolean,is_download:boolean) => {
  let key = '';
  let data = '';
  if(is_token_rnd){
    if(is_download){
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data");
      myHeaders.append("Access-Control-Request-Method","GET");
      myHeaders.append('Access-Control-Allow-Credentials', 'true');
      const res = await fetch(url, {
        method: 'GET',
        headers: myHeaders,
        cache: "no-store",
      });
    }else{
      key = GetTokenRND();
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append('Accept', 'application/json');
      myHeaders.append("Access-Control-Request-Method","GET");
      myHeaders.append('Access-Control-Allow-Credentials', 'true');
      myHeaders.append("Token",key);
      const res = await fetch(url, {
        method: 'GET',
        headers: myHeaders,
        cache: "no-store",
      });
      data = await res.json()
    }
   
   
  }else{
    key = GetToken();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Accept', 'application/json');
    myHeaders.append("Access-Control-Request-Method","GET");
    myHeaders.append('Access-Control-Allow-Credentials', 'true');
    myHeaders.append("Token",key);
    const res = await fetch(url, {
      method: 'GET',
      headers: myHeaders,
      cache: "no-store",
    });

    data = await res.json()
  }
  
  

  return data;
}

export const Gets2 = async (url:string) => {
  try {
      const myHeaders = new Headers();
      const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log('result : '+result)
  } catch (error) {
    console.log('error : '+error)
  } finally {
    console.log('ok')
  }
};      
