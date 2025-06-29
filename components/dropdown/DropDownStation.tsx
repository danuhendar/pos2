'use client'
import { GetID } from "@/lib/global";
import { useTranslation } from "react-i18next";
import Select from 'react-select';

interface DropDownStationProps{
    in_classname_title: any,
    in_classname_content:string,
    data_options:any,
    isSearchable:boolean,
    isMulti:boolean,
    isInduk:boolean,
    event:any
}

const DropDownStation: React.FC<DropDownStationProps> = ({in_classname_title,in_classname_content,data_options,isSearchable,isMulti,isInduk,event}) => {
    const { t, i18n } = useTranslation();
    data_options = [
        { value: '', label: '-- '+t('All Station')+' --' },
        { value: '01', label: '01' },
        { value: '02', label: '02' },
        { value: '03', label: '03' },
        { value: '04', label: '04' },
        { value: '05', label: '05' },
        { value: '06', label: '06' },
        { value: '07', label: '07' },
        { value: '08', label: '08' },
        { value: '09', label: '09' },
        { value: '10', label: '10' },
        { value: '12', label: '12' },{ value: '22', label: '22' },
        { value: 'I1', label: 'I1' },
    ];
    const data_options_is_induk = [{value:'IS_Induk',label:'IS Induk'}]
    return (
        <>
            <div className={in_classname_title}><label htmlFor={GetID()}>{t('Station')}</label></div>
            <div className="mb-3">
                <div className={in_classname_content}>
                    <Select onChange={event} id={GetID()} placeholder={t("Select Station")} options={isInduk ? data_options_is_induk : data_options} isMulti={isMulti} isSearchable={isSearchable} />
                </div>
            </div>
        </>
    );
}

export default DropDownStation;