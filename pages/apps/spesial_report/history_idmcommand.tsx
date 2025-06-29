
import FormHistoryIDMCommand from "@/components/spesial_report/FormHistoryIDMCommand";
import Link from "next/link";
import config from '@/lib/config.json';
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";


const History_IDMCommand=() => {
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
                <Link href="/apps/spesial_report/history_idmcommand" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('History')} {t('Log')} IDMCommander</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormHistoryIDMCommand url={`ws://${IN_HOST}:7322/sock/v1/ReportIDMCommand`} 
                        command={""}
                        IDReport={"Report Log IDMCommander"}  
            />
        </>
    )
};

export default History_IDMCommand;