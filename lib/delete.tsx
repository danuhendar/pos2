import { NextResponse } from 'next/server'
import { GetToken } from './global';
 
export const Deletes = async(url:string,param:string) => {
    const key = GetToken();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Token",key);
    
    const res = await fetch(url, {
    method: 'DELETE',
    cache: "no-store",
    headers: myHeaders,
    body: param
  })
 
  const data = await res.json()
 
  return data;
}
