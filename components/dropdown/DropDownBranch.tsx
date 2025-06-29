'use client'
import { GetID } from "@/lib/global";
import { useTranslation } from "react-i18next";
import Select from 'react-select';

interface DropDownBranchProps{
    in_classname_title: any,
    in_classname_content:string,
    data_options:any,
    isSearchable:boolean,
    isMulti:boolean,
    event:any
}

const DropDownBranch: React.FC<DropDownBranchProps> = ({in_classname_title,in_classname_content,data_options,isSearchable,isMulti,event}) => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className={in_classname_title}><label htmlFor={GetID()}>{t('Branch Code')}</label></div>
            <div className="mb-3">
                <div className={in_classname_content}>
                    <Select
                        onChange={event}
                        id={GetID()}
                        placeholder={t("Select Branch Code")}
                        options={data_options}
                        isMulti={isMulti}
                        isSearchable={isSearchable}
                    />
                </div>
            </div>
        </>
    );
}
export default DropDownBranch;