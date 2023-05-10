import {FC} from "react";
import s from './content.module.scss'
import {useSelector} from "react-redux";
import {getVacanciesSelector} from "../../../redux-toolkit/vacancies/vacancies-selectors";
import star from '../../../assets/img/star.svg'
import location from '../../../assets/img/location_icon.svg'
import clear from '../../../assets/img/clear.svg'
import {NavLink} from "react-router-dom";

export const Content: FC = () => {
    const vacancies = useSelector(getVacanciesSelector)


    if (vacancies && vacancies.length !== 0) {
        return <section className={s.content}>


            {vacancies.map((vacancy) => {
                return <div key={vacancy.id} className={s.container}>
                    <div className={s.wrapper}><NavLink to='/'><span
                        className={s.name}>{vacancy.profession}</span></NavLink>
                        <div className={s.star}><img src={star} alt='star'/></div>
                    </div>
                    <div className={s.conditions}><span
                        className={s.money}>з/п от {vacancy.payment_from} {vacancy.currency} </span> <span
                        className={s.circle}>•</span> <span
                        className={s.schedule}>{vacancy.type_of_work.title}</span>
                    </div>
                    <div className={s.location}>
                        <div className={s.icon}><img src={location} alt='location_icon'/></div>
                        <span className={s.town}></span>{vacancy.town.title}</div>


                </div>
            })}


        </section>
    } else {
        return <section className={s.content}>
            <div className={s.clear}><img src={clear} alt='clear'/></div>
        </section>
    }



}