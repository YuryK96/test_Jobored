import {FC, useEffect, useState} from "react";
import s from './content.module.scss'
import {useSelector} from "react-redux";
import {getFavoritesSelector, getVacanciesSelector} from "../../../redux-toolkit/vacancies/vacancies-selectors";
import clear from '../../../assets/img/clear.svg'
import ReactPaginate from "react-paginate";
import '../../../scss/pagination.scss'
import {VacancyHeader} from "../../common/vacancy-header";

export const Content: FC = () => {
    const vacancies = useSelector(getVacanciesSelector)
    const favorites = useSelector(getFavoritesSelector)

    const [itemOffset, setItemOffset] = useState(0);
    const [actualPage, setActualPage] = useState(0);

    const itemsPerPage = 4;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = vacancies.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(vacancies.length / itemsPerPage);




    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % vacancies.length;
        setActualPage(event.selected)
        setItemOffset(newOffset);
    };


    if (vacancies && vacancies.length !== 0) {
        return <section className={s.content}>


            {currentItems.map((vacancy) => {
                return <div key={vacancy.id}><VacancyHeader vacancyRichText={vacancy.vacancyRichText}
                                                            favorites={favorites}
                                                            id={vacancy.id}
                                                            profession={vacancy.profession}
                                                            payment_from={vacancy.payment_from}
                                                            currency={vacancy.currency}
                                                            type_of_work={vacancy.type_of_work.title}
                                                            town={vacancy.town.title}/></div>
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
        return <section className={s.content}>
            <div className={s.clear}><img src={clear} alt='clear'/></div>
        </section>
    }


    }