import {FC} from "react";
import s from  './layout.module.scss'
import {Outlet} from "react-router-dom";

export const Layout: FC = () => {


    return <div>
        123
        <Outlet/>
    </div>
}