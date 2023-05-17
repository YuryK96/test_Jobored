import {FC, useEffect} from "react";
import {useDispatch} from "react-redux";
import s from './layout.module.scss'
import {Outlet} from "react-router-dom";
import {Header} from "./header";
import {useIsAuth} from "../../hooks/is-auth-hook";
import {AppDispatch} from "../../redux-toolkit/store";
import {authorization} from "../../redux-toolkit/auth/auth-thunk";
import {getCategories, getVacancies} from "../../redux-toolkit/vacancies/vacancies-thunk";
import {useIsPending} from "../../hooks/is-pending-hook";
import {Loader} from "../common/loader";
import {getFavoriteVacanciesLS} from "../../local-storage/local-storage";
import {addFavoritesAC} from "../../redux-toolkit/vacancies/vacancies-reducer";

export const Layout: FC = () => {
    const isAuth = useIsAuth()
    const dispatch = useDispatch<AppDispatch>()
    const isPending = useIsPending()

    useEffect(() => {
        if (!isAuth) {
            dispatch(authorization()).then(
                () => {
                    dispatch(getCategories());
                    dispatch(getVacancies({
                            payment_to: '',
                            payment_from: '',
                            keyword: '',
                            catalogues: ''
                        })
                    )
                })

        } else {
            dispatch(getCategories())
            dispatch(getVacancies({
                payment_to: '',
                payment_from: '',
                keyword: '',
                catalogues: ''
            }))
        }
    }, [isAuth, dispatch])


    useEffect( ()=>{
        const favorites = getFavoriteVacanciesLS()
        if (favorites) {
            dispatch(addFavoritesAC(favorites))
        }

    },[dispatch] )


    return <div className={s.layout}>

        {isPending && <Loader/>}


        <Header/>
        <div className={s.container}>
            <Outlet/>
        </div>

    </div>
}