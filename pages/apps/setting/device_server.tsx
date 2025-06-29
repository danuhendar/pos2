import Link from "next/link";
import { t } from "i18next";
import FormDeviceServer from "@/components/setting/FormDeviceServer";
import { useTranslation } from "react-i18next";
const Device_Server=() => {
    const { t, i18n } = useTranslation();
    return(
        <>
           <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                {t('Setting')}
                </li>
                <Link href="/apps/setting/device_server" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Device Server')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormDeviceServer url={''} 
                        command={''}
                        IDReport={"Device Server"}  
            />
        </>
    )
};

export default Device_Server;