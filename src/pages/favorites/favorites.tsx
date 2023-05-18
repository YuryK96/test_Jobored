import {FC, useEffect, useState} from "react";
import s from './favorites.module.scss'
import {useSelector} from "react-redux";
import {getFavoritesSelector} from "../../redux-toolkit/vacancies/vacancies-selectors";
import {VacancyHeader} from "../common/vacancy-header";
import clear from "../../assets/img/clear.svg";
import ReactPaginate from "react-paginate";
import {NavLink} from "react-router-dom";

export const Favorites: FC = () => {
    const favorites = useSelector(getFavoritesSelector)

    const [itemOffset, setItemOffset] = useState(0);
    const [actualPage, setActualPage] = useState(0);

    const itemsPerPage = 4;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = favorites.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(favorites.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        if (currentItems.length === 0) {
            const newOffset = ((event.selected - 1) * itemsPerPage) % favorites.length;
            setActualPage(event.selected - 1)
            setItemOffset(newOffset);
        } else {
            const newOffset = (event.selected * itemsPerPage) % favorites.length;
            setActualPage(event.selected)
            setItemOffset(newOffset);
        }
    };
    useEffect(() => {
        if (actualPage !== 0 && currentItems.length === 0) {
            handlePageClick({selected: actualPage})
        }
    }, [currentItems, actualPage])


    if (favorites.length !== 0) {

        return <section className={s.favorites}>

            <div className={s.wrapper}>
                {currentItems.map((vacancy) => {
                    return <div key={vacancy.id}><VacancyHeader vacancyRichText={vacancy.vacancyRichText}
                                                                favorites={favorites}
                                                                id={vacancy.id}
                                                                profession={vacancy.profession}
                                                                payment_from={vacancy.payment_from}
                                                                currency={vacancy.currency}
                                                                type_of_work={vacancy.type_of_work}

                                                                town={vacancy.town}/></div>

                })}
            </div>
            <div className={s.wrapper_pagination}>
                <ReactPaginate
                    breakLabel={false}
                    pageRangeDisplayed={actualPage === 0 ? 3 : actualPage + 1 === pageCount ? 3 : 2}
                    marginPagesDisplayed={0}
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    forcePage={actualPage}
                    containerClassName='pagination_container'
                    pageClassName='pagination_li'
                    nextClassName='pagination_next'
                    previousClassName='pagination_prev'
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                /></div>

        </section>
    } else {
        return <section className={s.clear}>
            <div className={s.clear_img}><img src={clear} alt='clear'/></div>
            <NavLink to='/'>
                <button>Поиск Вакансий</button>
            </NavLink>
        </section>
    }

}