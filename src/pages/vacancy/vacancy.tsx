import {FC} from "react";
import s from './vacancy.module.scss'
import {useLocation} from "react-router-dom";
import DOMPurify from 'dompurify';
import {VacancyHeader} from "../common/vacancy-header";
import {useSelector} from "react-redux";
import {getFavoritesSelector} from "../../redux-toolkit/vacancies/vacancies-selectors";


export const Vacancy: FC = () => {
    const {state}: { state: PropsType } = useLocation()
    const favorites = useSelector(getFavoritesSelector)

    return <div className={s.vacancy}>
        <VacancyHeader isPageVacancy={true} id={state.id} favorites={favorites} vacancyRichText={state.vacancyRichText}
                       town={state.town} currency={state.currency} payment_from={state.payment_from}
                       profession={state.profession} type_of_work={state.type_of_work}/>

        <div className={s.description} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(state.vacancyRichText)}}/>
    </div>
}


type PropsType = {

    vacancyRichText: string
    profession: string
    payment_from: number
    currency: string
    type_of_work: string
    town: string
    id: number


}