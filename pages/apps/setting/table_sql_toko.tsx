import Link from "next/link";
import FormTableSQLToko from "@/components/setting/FormTableSQLToko";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
const Table_SQL_Toko=() => {
    const { t, i18n } = useTranslation();
    return(
        <>
            <div className="mb-5">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    {t('Setting')}
                </li>
                <Link href="/apps/setting/table_sql_toko" className="text-primary hover:underline">    
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{t('Table SQL Store')}</span>
                </li>
                </Link>
            </ul>
            </div>
            <FormTableSQLToko url={''} 
                        command={''}
                        IDReport={"Table SQL Toko"}  
            />
        </>
    )
};

export default Table_SQL_Toko;