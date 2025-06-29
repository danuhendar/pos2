'use client'
import { useTranslation } from "react-i18next";

interface ButtonTriggerProps{
    in_classname: string,
    idComponent:string,
    isLoading:boolean,
    isDisabled:boolean,
    HandleClick:any
}

const ButtonTrigger: React.FC<ButtonTriggerProps> = ({in_classname,idComponent,isLoading,isDisabled,HandleClick}) => {
    const { t, i18n } = useTranslation();
    return (
        <>
        <span id={idComponent} className={in_classname}>
            <a className="cursor-pointer" onClick={(event) => {
                //NewhandleRowClick(event, cellValues, rows);
                HandleClick
            }} >
                Trigger
            </a>
        </span>
        </>
    );
}

export default ButtonTrigger;