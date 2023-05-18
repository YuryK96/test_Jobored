import {FC, useEffect, useState} from "react";
import s from './vacancy-header.module.scss'
import {NavLink} from "react-router-dom";
import star from "../../../assets/img/star.svg";
import blueStar from "../../../assets/img/blue_star.svg";
import location from "../../../assets/img/location_icon.svg";
import {addFavoriteVacancyLS, removeFavoriteVacancyLS} from "../../../local-storage/local-storage";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux-toolkit/store";
import {addFavoritesAC} from "../../../redux-toolkit/vacancies/vacancies-reducer";

export const VacancyHeader: FC<VacancyHeaderType> = ({
                                                         vacancyRichText,
                                                         profession,
                                                         payment_from,
                                                         currency,
                                                         type_of_work,
                                                         town,
                                                         isPageVacancy,
                                                         id,
                                                         favorites,

                                                     }) => {
    const dispatch = useDispatch<AppDispatch>()

    const [isFavorite, setIsFavorite] = useState<boolean>( favorites?.some((favorite) => favorite.id === id) || false
    )

    useEffect(() => {
        setIsFavorite( favorites?.some((favorite) => favorite.id === id
        ) || false)
    }, [favorites, id])


    return <div className={` ${s.container} ${isPageVacancy ? s.pageVacancy : ''}`}>
        <div className={s.wrapper}><NavLink to='/vacancy' state={{
            vacancyRichText, profession, payment_from, currency, type_of_work, town, id
        }}><span
            className={s.name}>{profession}</span></NavLink>
            <div
                onClick={isFavorite ? () => removeFavoriteVacancyLS(id, dispatch, addFavoritesAC) : () => addFavoriteVacancyLS({
                    vacancyRichText,
                        profession,
                        payment_from,
                        currency,
                        type_of_work,
                        town,
                        id
                    }, dispatch, addFavoritesAC
                )


                } className={s.star}><img src={isFavorite ? blueStar : star} alt='star'/></div>
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
    id?: number
    isPageVacancy?: boolean
    vacancyRichText?: string
    profession?: string
    payment_from?: number
    currency?: string
    type_of_work?: string
    town?: string
    favorites?: VacancyHeaderType[]


}