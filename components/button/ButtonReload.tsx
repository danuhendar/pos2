'use client'
import { useTranslation } from "react-i18next";
import IconRefresh from "../Icon/IconRefresh";

interface ButtonReloadProps{
    in_classname: any,
    idComponent:string,
    isLoading:boolean,
    isDisabled:boolean,
    HandleClick:any
}

const ButtonReload: React.FC<ButtonReloadProps> = ({in_classname,idComponent,isLoading,isDisabled,HandleClick}) => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <button disabled={isDisabled} id={idComponent} onClick={
                HandleClick
            } className={in_classname}>
                <IconRefresh />&nbsp;{t('Repeat Process')}
            </button>
        </>
    );
}

export default ButtonReload;