
import FormHistoryIDMCommand from "@/components/spesial_report/FormHistoryIDMCommand";
import Link from "next/link";
import config from '@/lib/config.json';
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormReportBroadcast from "@/components/spesial_report/FormReportBroadcast";


const Report_Broadcast=() => {
    const [IN_HOST, setHOST]=useState('');
    const { t, i18n } = useTranslation();
    useEffect(() => {
        var rconfig=JSON.stringify(config);
        let student=JSON.parse(rconfig);
        const res_host=(config.api as any).HOSTNAME_WS;
        const res_PORT_LOGIN=(config.api as any).PORT_LOGIN;
        setHOST(res_host);
    });

    return(
        <>
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    {t('Report')}
                </li>
                <Link href="/apps/spesial_report/report_broadcast" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Broadcast')} IDMCommander</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormReportBroadcast url={``} 
                        command={""}
                        IDReport={"Report Broadcast IDMCommander"}  
            />
        </>
    )
};

export default Report_Broadcast;