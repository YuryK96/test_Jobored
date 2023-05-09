import {FC} from "react";
import s from './search-panel.module.scss'
import {UseFormRegister} from "react-hook-form";
import {FormValuesType} from "../vacancies";
import search from '../../../assets/img/search.svg'

export const SearchPanel: FC<SearchPanelType> = ({register}) => {


    return <div className={s.searchPanel}>

        <div className={s.searchInput}>
            <div className={s.wrapper}>
            <div className={s.icon}><img src={search} alt='search_icon'/></div>
            <input placeholder='Введите название вакансии' type='search' {...register('search')} /></div>
            <button type='submit'>Поиск</button>
        </div>
    </div>
}


type SearchPanelType = {
    register: UseFormRegister<FormValuesType>
}