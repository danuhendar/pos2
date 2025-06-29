import Link from "next/link";
import { t } from "i18next";
import FormFTPServer from "@/components/setting/FormFTPServer";
import { useTranslation } from "react-i18next";
const FTP_Server=() => {
    const { t, i18n } = useTranslation();
    return(
        <>
           <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                {t('Setting')}
                </li>
                <Link href="/apps/setting/ftp_server" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('FTP Server')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormFTPServer url={''} 
                        command={''}
                        IDReport={"FTP Server"}  
            />
        </>
    )
};

export default FTP_Server;