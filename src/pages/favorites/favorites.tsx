import {FC, useState} from "react";
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
        const newOffset = (event.selected * itemsPerPage) % favorites.length;
        setActualPage(event.selected)
        setItemOffset(newOffset);
    };


    if (favorites.length !== 0) {

        return <section className={s.favorites}>
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


            <ReactPaginate
                breakLabel={false}
                pageRangeDisplayed={actualPage === 0 ? 3 : actualPage + 1 === pageCount ? 3 : 2}
                marginPagesDisplayed={0}
                nextLabel=">"
                onPageChange={handlePageClick}
                pageCount={pageCount}
                containerClassName='pagination_container'
                pageClassName='pagination_li'
                nextClassName='pagination_next'
                previousClassName='pagination_prev'
                previousLabel="<"
                renderOnZeroPageCount={null}
            />

        </section>
    } else {
        return <section className={s.clear}>
            <div className={s.clear_img}><img src={clear} alt='clear'/></div>
            <NavLink to='/' ><button>Поиск Вакансий </button></NavLink>
        </section>
    }

}