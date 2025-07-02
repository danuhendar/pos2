'use client'
import { useTranslation } from "react-i18next";
interface InputCheckBoxFilterTypeProps{
    in_title:string,
    in_value_1:string,
    in_value_2:string,
    in_name_1:string,
    in_name_2:string,
    in_name_component_1:string,
    in_name_component_2:string,
    event:any,
    
}
const InputCheckBoxFilterType: React.FC<InputCheckBoxFilterTypeProps> = ({in_title,in_value_1,in_value_2,in_name_1,in_name_2,in_name_component_1,in_name_component_2,event}) => {
    const { t, i18n } = useTranslation();
    return (
        <>
        <div>
            <div className="mb-1"><label htmlFor="dropdownLeftButton">{t(in_title)}</label></div>
            <div className="mb-3">
                <div className="w-full">
                <label className="flex items-center cursor-pointer">
                    <div>
                        <label className="flex items-center cursor-pointer">
                            <input onChange={event} type="radio" name={in_name_component_1} className="form-radio" value={in_value_1} defaultChecked />
                            <span className="text-white-dark">{t(in_name_1)}</span>
                        </label>
                    </div>
                    <div className="ml-5">
                        <label className="flex items-center cursor-pointer">
                            <input onChange={event} type="radio" name={in_name_component_2} className="form-radio" value={in_value_2} />
                            <span className="text-white-dark">{t(in_name_2)}</span>
                        </label>
                    </div>
                </label>
                </div>
            </div>       
        </div>
        </>
    );
}
export default InputCheckBoxFilterType;