import {FC} from "react";
import s from './content.module.scss'
import {useSelector} from "react-redux";
import {getFavoritesSelector} from "../../../redux-toolkit/vacancies/vacancies-selectors";
import clear from '../../../assets/img/clear.svg'
import ReactPaginate from "react-paginate";
import '../../../scss/common/pagination.scss'
import {VacancyHeader} from "../../common/vacancy-header";
import {VacancyType} from "../../../api/api-type";

export const Content: FC<ContentType> = ({actualPage, itemsPerPage, handlePageClick, itemOffset, vacancies,pageCount,}) => {

    const favorites = useSelector(getFavoritesSelector)

    const endOffset = itemOffset + itemsPerPage;
    let currentItems = vacancies.slice(itemOffset, endOffset);


    if (vacancies && vacancies.length !== 0) {
        return <section className={s.content}>

            <div className={s.wrapper}>
                {currentItems.map((vacancy) => {
                    return <div key={vacancy.id}><VacancyHeader vacancyRichText={vacancy.vacancyRichText}
                                                                favorites={favorites}
                                                                id={vacancy.id}
                                                                profession={vacancy.profession}
                                                                payment_from={vacancy.payment_from}
                                                                currency={vacancy.currency}
                                                                type_of_work={vacancy.type_of_work.title}
                                                                town={vacancy.town.title}/></div>
                })}</div>
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
        return <section className={s.content}>
            <div className={s.clear}><img src={clear} alt='clear'/></div>
        </section>
    }


}

type ContentType = {
    actualPage: number
    itemsPerPage: number
    setActualPageInPagination: (page: number) => void
    handlePageClick: (event: { selected: number }) => void
    itemOffset: number,
    vacancies: VacancyType[]
    pageCount: number


}