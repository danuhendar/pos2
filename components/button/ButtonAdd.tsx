'use client'

import { useTranslation } from "react-i18next";

interface ButtonAddProps{
    in_classname: any,
    idComponent:string,
    isLoading:boolean,
    isDisabled:boolean,
    in_icon:any,
    in_title_button:string,
    HandleClick:any,
}

const ButtonAdd: React.FC<ButtonAddProps> = ({in_classname,idComponent,isLoading,isDisabled,in_icon,in_title_button,HandleClick}) => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <button disabled={isDisabled} id={idComponent} onClick={
                HandleClick
            } className={in_classname}>
                {
                    isLoading  ? 
                    <>
                    <span className="inline-block w-5 h-5 align-middle border-4 border-transparent rounded-full animate-spin border-l-white-light"></span>&nbsp;{t('Please Wait')}
                    </>
                    :
                    <>
                    {in_icon}&nbsp;{t(in_title_button)}
                    </> 
                }
            </button>
        </>
    );
}
export default ButtonAdd;