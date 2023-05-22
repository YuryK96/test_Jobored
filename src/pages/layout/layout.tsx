import {FC, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import s from './layout.module.scss'
import {Outlet, useLocation} from "react-router-dom";
import {Header} from "./header";
import {useIsAuth} from "../../hooks/is-auth-hook";
import {AppDispatch} from "../../redux-toolkit/store";
import {authorizationThunk} from "../../redux-toolkit/auth/auth-thunk";
import {getCategoriesThunk, getVacanciesThunk} from "../../redux-toolkit/vacancies/vacancies-thunk";
import {useIsPending} from "../../hooks/is-pending-hook";
import {Loader} from "../common/loader";
import {getFavoriteVacanciesLS} from "../../local-storage/local-storage";
import {addFavoritesAC} from "../../redux-toolkit/vacancies/vacancies-reducer";

export const Layout: FC = () => {
    const isAuth = useIsAuth()
    const dispatch = useDispatch<AppDispatch>()
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

    const updateEnteredSearchData = (data:EnteredSearchDataType)=> {
        setEnteredSearchData( data)
    }
    const setActualPageInPagination = (page: number) => {
        setActualPage(page)
    }

    useEffect( ()=>{
        window.scrollTo(0,0)
    }, [pathname] )

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
            <Outlet context={ [enteredSearchData,updateEnteredSearchData,setActualPageInPagination,actualPage] }/>
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