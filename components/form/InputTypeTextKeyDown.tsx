'use client'
import { useTranslation } from "react-i18next";

interface InputTypeTextKeydownProps{
    in_title:string,
    in_classname_title: string,
    in_classname_content:string,
    in_classname_sub_content:string,
    data_options:any,
    isDisabled:boolean,
    event:any,
    in_value:string,
    in_ref:any,
    in_event_keydown:any,
}

const InputTextTypeKeyDown: React.FC<InputTypeTextKeydownProps> = ({in_title,in_classname_title,in_classname_content,in_classname_sub_content,isDisabled,event,in_value,in_ref,in_event_keydown}) => {
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
                                <input disabled={isDisabled} type="text" placeholder={t("Type "+in_title)} onChange={event} onKeyDown={in_event_keydown} value={in_value}  className={in_classname_sub_content} ref={in_ref} />
                            </div>
                        </div>
                    </div>
                </>
                :
                <input disabled={isDisabled} type="text" placeholder={t("Type "+in_title)} onChange={event} value={in_value}  onKeyDown={in_event_keydown}  className={in_classname_sub_content} ref={in_ref} />   
           }
        </>
    );
}
export default InputTextTypeKeyDown;