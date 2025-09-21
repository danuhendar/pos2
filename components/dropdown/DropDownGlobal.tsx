'use client'
import { GetID } from "@/lib/global";
import { useEffect, useState } from "react";
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
    idComponent:string,
    in_is_clear:boolean,
    in_selectedOption?:any
}

const DropDownGlobal: React.FC<DropDownGlobalProps> = ({in_classname_title,in_classname_content,data_options,isSearchable,isMulti,event,name_component,idComponent,in_is_clear,in_selectedOption}) => {
    const { t, i18n } = useTranslation();
    const [selectedOption, setSelectedOption] = useState(data_options[0]);
    
    return (
        <>
            {
                in_classname_title !== '' ? 
                <>
                <div className={in_classname_title}><label htmlFor={GetID()}>{t(name_component)}</label></div>
                <div className="mb-3">
                    <div className={in_classname_content}>
                        {typeof window !== "undefined" && (
                        <Select
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            onChange={event}
                            id={idComponent}
                            placeholder={t("Select "+name_component)}
                            options={data_options}
                            isMulti={isMulti}
                            isSearchable={isSearchable}
                            isClearable={in_is_clear}
                            value={in_selectedOption}
                        />
                        )}
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
                    isClearable={in_is_clear}
                    value={in_selectedOption}
                />
            }
            
        </>
    );
}

export default DropDownGlobal;