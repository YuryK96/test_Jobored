import {FC, useEffect} from "react";
import {useDispatch} from "react-redux";
import s from './layout.module.scss'
import {Outlet} from "react-router-dom";
import {Header} from "./header";
import {useIsAuth} from "../../assets/hooks/is-auth-hook";
import {AppDispatch} from "../../redux-toolkit/store";
import {authorization} from "../../redux-toolkit/auth/auth-thunk";
import {getCategories, getVacancies} from "../../redux-toolkit/vacancies/vacancies-thunk";

export const Layout: FC = () => {
    const isAuth = useIsAuth()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!isAuth) {
            dispatch(authorization())
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


    return <div className={s.layout}>
        <Header/>
        <div className={s.container}>
            <Outlet/>
        </div>

    </div>
}