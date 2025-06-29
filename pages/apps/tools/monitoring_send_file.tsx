import FormMonitoringSendFile from "@/components/tools/FormMonitoringSendFile";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const Monitoring_Send_File=() => {
    const { t, i18n } = useTranslation();
    return(
        <>
            <div className="mb-1">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                   {t('Tools')}
                </li>
                <Link href="/apps/tools/monitoring_send_file" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Monitoring')} {t('Send')} {t('File')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormMonitoringSendFile url={''} 
                        command={''}
                        IDReport={"Monitoring Send File"}  
            />
        </>
    )
};

export default Monitoring_Send_File;