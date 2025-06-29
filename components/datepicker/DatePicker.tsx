'use client'
import { useTranslation } from "react-i18next";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

interface DatePickerProps{
    in_classname_title: any,
    in_classname_content:string,
    in_classname_sub_content:string,
    event:any,
    name_component:string,
    idComponent:string,
    isRtl:boolean,
    in_date:any,
    isEnableTime:boolean,
    date_format:string,
    in_mode:any,
}

const DatePicker: React.FC<DatePickerProps> = ({in_classname_title,in_classname_content,in_classname_sub_content,event,name_component,isRtl,in_date,isEnableTime,date_format,in_mode}) => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className={in_classname_title}><label htmlFor="dropdownLeftButton">{t(name_component)}</label></div>
            <div className="mb-3">
                <div className={in_classname_content}>
                <Flatpickr
                        data-enable-time
                        options={{
                            mode:in_mode,
                            enableTime: isEnableTime,
                            dateFormat: date_format,
                            position: isRtl ? 'auto right' : 'auto left',
                        }}
                        value={in_date}
                        className={in_classname_sub_content}
                        onChange={event}
                    />
                </div>
            </div>
            
        </>
    );
}

export default DatePicker;