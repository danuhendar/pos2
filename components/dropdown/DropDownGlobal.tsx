'use client'
import { GetID } from "@/lib/global";
import { useTranslation } from "react-i18next";
import Select from 'react-select';

interface DropDownGlobalProps{
    in_classname_title: any,
    in_classname_content:string,
    data_options:any,
    isSearchable:boolean,
    isMulti:boolean,
    event:any,
    name_component:string,
    idComponent:string
}

const DropDownGlobal: React.FC<DropDownGlobalProps> = ({in_classname_title,in_classname_content,data_options,isSearchable,isMulti,event,name_component,idComponent}) => {
    const { t, i18n } = useTranslation();
    return (
        <>
            {
                in_classname_title !== '' ? 
                <>
                <div className={in_classname_title}><label htmlFor={GetID()}>{t(name_component)}</label></div>
                <div className="mb-3">
                    <div className={in_classname_content}>
                        <Select
                            onChange={event}
                            id={idComponent}
                            placeholder={t("Select "+name_component)}
                            options={data_options}
                            isMulti={isMulti}
                            isSearchable={isSearchable}
                        />
                    </div>
                </div>
                </>
                : 
                <Select
                    onChange={event}
                    id={idComponent}
                    placeholder={t("Select "+name_component)}
                    options={data_options}
                    isMulti={isMulti}
                    isSearchable={isSearchable}
                />
            }
            
        </>
    );
}

export default DropDownGlobal;