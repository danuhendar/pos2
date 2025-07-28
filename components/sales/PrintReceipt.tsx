// Receipt.js or Receipt.tsx (if you're using TypeScript)
import { get_format_tanggal_jam, get_format_tanggal_jam_format_indo, GetFormatCurrency, GetToken, textToBase64Barcode, textToBase64QR } from '@/lib/global';
import { Posts } from '@/lib/post';
import themeConfig from '@/theme.config';
import React, { forwardRef, use, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

type ReceiptItem = {
  IN_DESKRIPSI: string;
  IN_QTY: number;
  IN_GROSS: number; // Assuming gross is a number, adjust type if needed
  IN_PRICE: number;
};

type ReceiptData = {
  items: ReceiptItem[];
};

type ReceiptProps = {
  data: ReceiptData;
  in_kode_gerai: string;
  in_alamat: string;
  in_name_gerai: string;
  in_nama: string;
  in_shift: string;
  in_bayar: string; 
  in_kembali: string;
  in_no_struk:string;
  in_total_belanja: string;
  in_tanggal_struk: string; // Optional, if you want to include the date on the receipt
};

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>((props, ref) => {
  const { data, in_kode_gerai,in_name_gerai, in_alamat,in_nama,in_shift,in_bayar,in_kembali,in_no_struk,in_total_belanja,in_tanggal_struk } = props;
  console.log("======== Receipt Data ========")
  console.log("in_kode_gerai : "+in_kode_gerai)
  console.log("in_name_gerai : "+in_name_gerai)
  console.log("in_alamat : "+in_alamat)
  console.log("in_nama : "+in_nama)
  console.log("in_shift : "+in_shift)
  console.log("in_bayar : "+in_bayar)
  console.log("in_kembali : "+in_kembali)
  console.log("in_no_struk : "+in_no_struk)
  console.log("in_total_belanja : "+in_total_belanja)
  console.log("in_tanggal_struk : "+in_tanggal_struk)
  console.log("data.items : ", JSON.stringify(data.items))
  console.log("data.items length : "+data.items.length)
  console.log("======== End Receipt Data ========")
  const { t, i18n } = useTranslation();
  const [IN_SUB_FOOTER_1, setIN_SUB_FOOTER_1] = useState('');
  const [IN_SUB_FOOTER_2, setIN_SUB_FOOTER_2] = useState(''); 
  const [IN_SUB_FOOTER_3, setIN_SUB_FOOTER_3] = useState('');
  const [IN_SUB_FOOTER_4, setIN_SUB_FOOTER_4] = useState('');
  const [IN_SUB_FOOTER_5, setIN_SUB_FOOTER_5] = useState('');
  const [IN_FOOTER_1,setIN_FOOTER_1] = useState('');
  const [IN_FOOTER_2,setIN_FOOTER_2] = useState('');

  
  useEffect(() => {
    // Fetch attributes for the receipt if needed
    GetAttributeReceipt("SUB_FOOTER");
    GetAttributeReceipt("FOOTER");
  }, []);
  const GetAttributeReceipt = (in_kategori:string) => {
      const url = `http://${themeConfig.host}:${themeConfig.port_login}/api/v2/GetAttributeReceipt`
      const param = {"IN_KATEGORI":in_kategori}
      const Token = GetToken()
      
      Posts(url,JSON.stringify(param),false,Token).then((response) => {
          const res_data = response;
          var code = res_data.code;
          var msg = res_data.msg;
          if(parseFloat(code) === 200){
              var data_body = res_data.data;
              if(in_kategori === "SUB_FOOTER"){
                setIN_SUB_FOOTER_1(data_body[0].CONTENT);
                setIN_SUB_FOOTER_2(data_body[1].CONTENT);
                setIN_SUB_FOOTER_3(data_body[2].CONTENT);
                
                setIN_SUB_FOOTER_4(data_body[3].CONTENT);
                setIN_SUB_FOOTER_5(data_body[4].CONTENT);
              }else if(in_kategori === "FOOTER"){
                setIN_FOOTER_1(data_body[0].CONTENT);
                setIN_FOOTER_2(data_body[1].CONTENT);
              }
            
          }else if(code.toString().substring(0,1) === '4'){
              if(code === 401 && msg.includes("Invalid")){
                  
              }else{
                  Swal.fire({
                      title: t("Warning"),
                      text: ""+parseFloat(code)+"-"+msg,
                      icon: "warning",
                      padding: '2em',
                      customClass: 'sweet-alerts'
                  });
              }
          }else{
              Swal.fire({
                  title: t("Warning"),
                  text: ""+parseFloat(code)+"-"+msg,
                  icon: "warning",
                  padding: '2em',
                  customClass: 'sweet-alerts'
              });
          }
      }).catch((error) => {
          console.log(error)
          Swal.fire({
              title: t("Warning"),
              text: "401-Error : Hubungi administrator, untuk proses pengecekan lebih lanjut!",
              icon: "warning",
              padding: '2em',
              customClass: 'sweet-alerts'
          });
      });
  }

  return (
    <div ref={ref} className="p-4 w-[300px] text-sm font-mono">
      {/* HEADER */}
      <h2 className="font-bold text-center">{in_name_gerai}</h2>
      <h2 className="font-bold text-center">{in_alamat}</h2>
      <div className="py-1 my-2 border-t border-b border-black border-dotted">
        <label className="text-[11px] font-thin">{in_tanggal_struk+"/"+in_kode_gerai+"/"+in_nama.substring(0,6).trim()+"/"+in_shift}</label>
      </div>
      {/* BODY */}
      <div className="border-b border-black border-dotted">
        <table className="w-full text-[10px] border-b border-dotted">
            {data.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item.IN_DESKRIPSI}</td>
                <td className="text-right">{item.IN_QTY}</td>
                <td className="text-right">{GetFormatCurrency(""+item.IN_GROSS)}</td>
                <td className="text-right">{GetFormatCurrency(""+item.IN_PRICE)}</td>
              </tr>
            ))}
        </table>    
       
        
        <div className="grid grid-cols-4 gap-3 mt-1 border-b border-black border-dotted font-semi-bold">
          <div className="col-span-3 text-right">
            <label>Total :</label>
          </div>
          <div className='text-right'>
            <label>{in_total_belanja}</label>
          </div>
          
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-3 text-right">
            <label>Bayar :</label>
          </div>
          <div className='text-right'>
            <label>{in_bayar}</label>
          </div>
          
        </div> 
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-3 text-right">
            <label>Kembali :</label>
          </div>
          <div className='text-right'>
            <label>{in_kembali}</label>
          </div>
          
        </div> 
      </div>
      {/* FOOTER */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        <div className="col-span-3">
            <h2 className="text-[9px] font-semi-bold text-center -mt-1">{IN_SUB_FOOTER_1}</h2>
            <h2 className="text-[9px] font-semi-bold text-center -mt-1">{IN_SUB_FOOTER_2}</h2>
            <h2 className="text-[9px] font-semi-bold text-center -mt-1">{IN_SUB_FOOTER_3}</h2>
            <h2 className="text-[9px] font-semi-bold text-center -mt-1">{IN_SUB_FOOTER_4}</h2>
        </div>
        <div className="text-right">
            {
                in_no_struk !== '' ?
                <img src={textToBase64QR(IN_SUB_FOOTER_5)} alt="QR Code" className="w-16 h-16 mx-auto" />
                :
                ''
            }
        </div>
      </div>
      <div className='mt-1 border-t border-b border-black border-dotted font-semi-bold'>
        <h2 className="text-[9px] font-semi-bold text-center">{IN_FOOTER_1}</h2>
        <h2 className="text-[9px] font-semi-bold text-center">{IN_FOOTER_2} {themeConfig.versi_app}</h2>
      </div>

    </div>
  );
});

export default Receipt;
