'use client'
import { useTranslation } from "react-i18next";
interface InputCheckBoxFilterTypeProps{
    event:any,
}
const InputCheckBoxFilterType: React.FC<InputCheckBoxFilterTypeProps> = ({event}) => {
    const { t, i18n } = useTranslation();
    return (
        <>
        <div>
            <div className="mb-1"><label htmlFor="dropdownLeftButton">{t('Filter Type')}</label></div>
            <div className="mb-3">
                <div className="w-full">
                <label className="flex items-center cursor-pointer">
                    <div>
                        <label className="flex items-center cursor-pointer">
                            <input onChange={event} type="radio" name="custom_radio2" className="form-radio" value={'per_cabang'} defaultChecked />
                            <span className="text-white-dark">{t('Branch')}</span>
                        </label>
                    </div>
                    <div className="ml-5">
                        <label className="flex items-center cursor-pointer">
                            <input onChange={event} type="radio" name="custom_radio2" className="form-radio" value={'per_toko'} />
                            <span className="text-white-dark">{t('1 Store')}</span>
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