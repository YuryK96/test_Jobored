import {FC} from "react";
import s from './loader.module.scss'
import loader from '../../../assets/img/loader.svg'

export const Loader: FC = () => {

    return (
        <div className={s.loader}>

            <div className={s.wrapper}><img src={loader} alt='loader'/></div>

        </div>
    )
}