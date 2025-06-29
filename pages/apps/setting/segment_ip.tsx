import Link from "next/link";
import FormSegmentIP from "@/components/setting/FormSegmentIP";
import { useTranslation } from "react-i18next";
const Segment_IP=() => {
    const { t, i18n } = useTranslation();
    return(
        <>
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                {t('Setting')}
                </li>
                <Link href="/apps/setting/segment_ip" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Segment IP')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormSegmentIP url={''} 
                        command={''}
                        IDReport={"Segment IP"}  
            />
        </>
    )
};

export default Segment_IP;