
import Link from "next/link";
import config from '@/lib/config.json';
import { useEffect, useState } from "react";

const Aktivasi_Windows = () => {
    const [IN_HOST, setHOST] = useState('');

    useEffect(() => {
        var rconfig = JSON.stringify(config);
       
        let student = JSON.parse(rconfig);
        const res_host = (config.api as any).HOSTNAME;
        const res_PORT_LOGIN = (config.api as any).PORT_LOGIN;
        //const res_host = (config.api as any).HOSTNAME;
        setHOST(res_host);
    });

    return(
        <>
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    Laporan
                </li>
                <Link href="/apps/laporan/aktivasi_windows" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Aktivasi Windows</span>
                </li>
                </Link>
            </ul>
            </div>
        </>
    )
};

export default Aktivasi_Windows;