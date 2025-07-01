'use client'
import { Textarea } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface TextAreaComponentProps{
    in_title:string,
    in_classname_title: string,
    in_classname_content:string,
    in_classname_sub_content:string,
    isDisabled:boolean,
    event:any,
    in_value:string,
    in_rows:number,
    in_cols:number
}

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({in_title,in_classname_title,in_classname_content,in_classname_sub_content,isDisabled,event,in_value,in_rows,in_cols}) => {
    const { t, i18n } = useTranslation();
    return (
        <>
           {
                in_classname_title !== '' ?
                <>
                    <div>
                        <div className={in_classname_title}><label>{t(in_title)}</label></div>
                        <div className="mb-3">
                            <div className={in_classname_content}>
                                <textarea disabled={isDisabled} rows={in_rows} cols={in_cols} placeholder={t("Type "+in_title)} onChange={event} value={in_value} className={in_classname_sub_content} />
                                {/* <input disabled={isDisabled} type="text" placeholder={t("Type "+in_title)} onChange={event} value={in_value}  className={in_classname_sub_content} /> */}
                            </div>
                        </div>
                    </div>
                </>
                :
                <textarea disabled={isDisabled} rows={in_rows} cols={in_cols} placeholder={t("Type "+in_title)} onChange={event} value={in_value} className={in_classname_sub_content} />

           }
        </>
    );
}
export default TextAreaComponent;