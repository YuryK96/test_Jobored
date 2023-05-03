import {FC} from "react";
import s from  './layout.module.scss'
import {Outlet} from "react-router-dom";
import {Header} from "./header";

export const Layout: FC = () => {


    return <div className={s.layout}>
        <Header/>
        <div className={s.container}>
        <Outlet/>
        </div>

    </div>
}