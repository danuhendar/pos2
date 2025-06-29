import FormToolsCommand from "@/components/tools/FormToolsCommand";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const Tools_Command=() => {
    const { t, i18n } = useTranslation();
    return(
        <>
            <div className="mb-1">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                   {t('Tools')}
                </li>
                <Link href="/apps/tools/tools_command" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Tools')} {t('Command')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormToolsCommand url={''} 
                        command={''}
                        IDReport={"Tools Command"}  
            />
        </>
    )
};

export default Tools_Command;