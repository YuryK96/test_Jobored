import {FC} from "react";
import s from './header.module.scss'
import logo from '../../../assets/img/logo.svg'
import {NavLink} from "react-router-dom";

export const Header: FC = () => {


    return <header className={s.header}>
        <div className={s.container}>
            <div className={s.logo}> <NavLink to='/'> <img src={logo} alt='Jobored'/></NavLink></div>
            <nav><span> <NavLink className={ ( {isActive} )=> isActive ? s.active : ''  } to='/'>Поиск Вакансий</NavLink> </span> <span> <NavLink className={ ( {isActive} )=> isActive ? s.active : ''  }
                to='/favorites'>Избранное</NavLink> </span>
            </nav>
        </div>

    </header>
}