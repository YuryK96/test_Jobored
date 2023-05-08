import {FC} from "react";
import s from './search-panel.module.scss'
import {FieldValues, UseFormRegister} from "react-hook-form";
import {FormValuesType} from "../vacancies";

export const SearchPanel: FC<SearchPanelType> = ({register}) => {


    return <div className={s.searchPanel}>
        
panel
    </div>
}


type SearchPanelType = {
    register: UseFormRegister<FormValuesType>
}