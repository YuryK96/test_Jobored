import {FC} from "react";
import s from './vacancy-header.module.scss'
import {NavLink} from "react-router-dom";
import star from "../../../assets/img/star.svg";
import location from "../../../assets/img/location_icon.svg";

export const VacancyHeader: FC<VacancyHeaderType> = ({
                                                         vacancyRichText,
                                                         profession,
                                                         payment_from,
                                                         currency,
                                                         type_of_work,
                                                         town,
                                                         isPageVacancy
                                                     }) => {


    return <div className={` ${s.container} ${isPageVacancy ? s.pageVacancy : ''}`}>
        <div className={s.wrapper}><NavLink to='vacancy' state={{
            vacancyRichText, profession, payment_from, currency, type_of_work, town
        }}><span
            className={s.name}>{profession}</span></NavLink>
            <div className={s.star}><img src={star} alt='star'/></div>
        </div>
        <div className={s.conditions}><span
            className={s.money}>з/п от {payment_from} {currency} </span> <span
            className={s.circle}>•</span> <span
            className={s.schedule}>{type_of_work}</span>
        </div>
        <div className={s.location}>
            <div className={s.icon}><img src={location} alt='location_icon'/></div>
            <span className={s.town}></span>{town}</div>


    </div>
}


 type VacancyHeaderType = {
    isPageVacancy?: boolean
    vacancyRichText?: string
    profession?: string
    payment_from?: number
    currency?: string
    type_of_work?: string
    town?: string


}