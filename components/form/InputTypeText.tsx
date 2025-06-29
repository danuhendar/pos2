'use client'
import { useTranslation } from "react-i18next";

interface InputTypeTextProps{
    in_title:string,
    in_classname_title: string,
    in_classname_content:string,
    in_classname_sub_content:string,
    data_options:any,
    isDisabled:boolean,
    event:any,
    in_value:string,
}

const InputTextType: React.FC<InputTypeTextProps> = ({in_title,in_classname_title,in_classname_content,in_classname_sub_content,isDisabled,event,in_value}) => {
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
                                <input disabled={isDisabled} type="text" placeholder={t("Type "+in_title)} onChange={event} value={in_value}  className={in_classname_sub_content} />
                            </div>
                        </div>
                    </div>
                </>
                :
                <input disabled={isDisabled} type="text" placeholder={t("Type "+in_title)} onChange={event} value={in_value}  className={in_classname_sub_content} />   
           }
        </>
    );
}
export default InputTextType;