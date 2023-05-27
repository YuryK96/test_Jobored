import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from './layout.module.scss'
import {Outlet, useLocation} from "react-router-dom";
import {Header} from "./header";
import {useIsAuth} from "../../hooks/is-auth-hook";
import {AppDispatch} from "../../redux-toolkit/store";
import {authorizationThunk, sendRefreshTokenThunk} from "../../redux-toolkit/auth/auth-thunk";
import {getCategoriesThunk, getVacanciesThunk} from "../../redux-toolkit/vacancies/vacancies-thunk";
import {useIsPending} from "../../hooks/is-pending-hook";
import {Loader} from "../common/loader";
import {getFavoriteVacanciesLS} from "../../local-storage/local-storage";
import {addFavoritesAC} from "../../redux-toolkit/vacancies/vacancies-reducer";
import {getErrorSelector} from "../../redux-toolkit/vacancies/vacancies-selectors";

export const Layout: FC = () => {
    const isAuth = useIsAuth()
    const dispatch = useDispatch<AppDispatch>()
    const error = useSelector(getErrorSelector)
    const isPending = useIsPending()
    const {pathname} = useLocation()
    const [enteredSearchData, setEnteredSearchData] = useState<EnteredSearchDataType>({
        industry: '',
        numberFrom: '',
        industryKey: '',
        numberUpTo: '',
        search: ''
    })
    const [actualPage, setActualPage] = useState(0);
    const updateEnteredSearchData = (data: EnteredSearchDataType) => {
        setEnteredSearchData(data)
    }
    const setActualPageInPagination = (page: number) => {
        setActualPage(page)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    // authorization and adding vacancies with categories
    useEffect(() => {
        if (!isAuth) {
            dispatch(authorizationThunk()).then(
                () => {
                    dispatch(getCategoriesThunk());
                    dispatch(getVacanciesThunk({
                            payment_to: '',
                            payment_from: '',
                            keyword: '',
                            catalogues: '',
                            page: 0
                        })
                    )
                })

        } else {
            dispatch(getCategoriesThunk())
            dispatch(getVacanciesThunk({
                payment_to: '',
                payment_from: '',
                keyword: '',
                catalogues: '',
                page: 0
            }))
        }
    }, [isAuth, dispatch])

    // Refreshing token
    useEffect(() => {
        if (error === '410') {
            dispatch(sendRefreshTokenThunk()).then(() => dispatch(authorizationThunk()).then(
                () => {
                    dispatch(getCategoriesThunk());
                    dispatch(getVacanciesThunk({
                            payment_to: '',
                            payment_from: '',
                            keyword: '',
                            catalogues: '',
                            page: 0
                        })
                    )
                }))
        }

    }, [error,dispatch])


    // adding favorite vacancies from Local Storage to Store
    useEffect(() => {
        const favorites = getFavoriteVacanciesLS()
        if (favorites) {
            dispatch(addFavoritesAC(favorites))
        }

    }, [dispatch])


    return <div className={s.layout}>

        {isPending && <Loader/>}


        <Header/>
        <div className={s.container}>
            <Outlet context={[enteredSearchData, updateEnteredSearchData, setActualPageInPagination, actualPage]}/>
        </div>

    </div>
}

export type EnteredSearchDataType = {
    numberFrom: string
    numberUpTo: string
    search: string
    industry: string
    industryKey: number | string
}