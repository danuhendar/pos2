import { NextResponse } from 'next/server'
import { GetRefreshTokenRND, GetToken, GetTokenRND } from './global';

export const Posts = async(url:string,param:any,isLogin:boolean,Token:string) => {
   
    const myHeaders = new Headers();
    
    myHeaders.append("Content-Type", "application/json");
    if(isLogin){

    }else{
       if(url.toString().includes('4646')){
          const key = GetTokenRND();
          myHeaders.append("Token",key);
          const ref_key = GetRefreshTokenRND()
          myHeaders.append("RefreshToken",ref_key);
       }else{
          const key = Token//GetToken();
          myHeaders.append("Token",key);
       }
       
    }
    

    const res = fetch(url, {
      method: 'POST',
      cache: "no-store",
      headers: myHeaders,
      body: param
  })
 
  const data = (await res).json()
 
  return data;
}

export const PostsFile = async(url:string,param:any,isLogin:boolean) => {
   
   const myHeaders = new Headers();
   
   //myHeaders.append("Content-Type", "multipart/form-data");
   if(isLogin){

   }else{
      if(url.toString().includes('4646')){
         const key = GetTokenRND();
         myHeaders.append("Token",key);
      }else{
         const key = GetToken();
         myHeaders.append("Token",key);
      }
      
   }
   

   const res = fetch(url, {
      method: 'POST',
      cache: "no-store",
      headers: myHeaders,
      body: param
   })

   const data = (await res).json();

   return data;
}