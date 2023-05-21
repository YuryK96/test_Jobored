import {FC, useEffect, useState} from "react";
import s from './vacancies.module.scss'
import {Filter} from "./filter";
import {SearchPanel} from "./search-panel";
import {Content} from "./content";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux-toolkit/store";
import {addElseVacanciesThunk, getVacanciesThunk} from "../../redux-toolkit/vacancies/vacancies-thunk";
import {getVacanciesSelector, getVacanciesTotalSelector} from "../../redux-toolkit/vacancies/vacancies-selectors";

export const Vacancies: FC = () => {
    const [industryKey, setIndustryKey] = useState<number | string>('')
    const [actualPage, setActualPage] = useState(0);
    const [requestPage, setRequestPage] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const vacancies = useSelector(getVacanciesSelector)
    const vacanciesTotal = useSelector(getVacanciesTotalSelector)
    const dispatch = useDispatch<AppDispatch>()
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        trigger,
        formState: { isValid}
    } = useForm<FormValuesType>({mode: "onChange"})

    // number of vacancies per page
    const itemsPerPage = 4;
    const pageCount = Math.ceil(vacancies.length / itemsPerPage);


    console.log(vacanciesTotal, 'vacanciesTotal', vacancies.length, 'vacancies.length')



    // Adding else Vacancies when you are on the last page
    useEffect( ()=>{

        if(actualPage+1 === pageCount && vacanciesTotal && vacancies.length !== vacanciesTotal ){

            dispatch(addElseVacanciesThunk({
                catalogues: String(industryKey),
                keyword: getValues('search') ? getValues('search') : '',
                payment_from: getValues('numberFrom') ? getValues('numberFrom') : '',
                payment_to: getValues('numberUpTo') ? getValues('numberUpTo') : '',
                page: requestPage+1,
            })).then( ()=>  addOnePageForRequest() )

        }


    }, [actualPage,pageCount] )

    const addOnePageForRequest = ()=> {
        setRequestPage(requestPage+1)
    }

    const setActualPageInPagination = (page: number) => {
        setActualPage(page)
    }

    const chooseIndustryKey = (key: number | string) => {
        setIndustryKey(key)
    }

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % vacancies.length;
        setActualPageInPagination(event.selected)
        setItemOffset(  isNaN(newOffset) ? 0 : newOffset );
    };

    const onSubmit = (data: FormValuesType) => {
        dispatch(getVacanciesThunk({
            catalogues: String(industryKey),
            keyword: data.search ? data.search : '',
            payment_from: data.numberFrom ? data.numberFrom : '',
            payment_to: data.numberUpTo ? data.numberUpTo : '',
            page: 0,
        }))
        setActualPageInPagination(0)
        handlePageClick({selected:0})
    }

    return <section className={s.vacancies}>
        <form onSubmit={handleSubmit(onSubmit)}>

            <Filter trigger={trigger} getValues={getValues} register={register} setValue={setValue}
                    isValid={isValid} chooseIndustryKey={chooseIndustryKey}/>
            <div className={s.wrapper}>
                <SearchPanel register={register}/>
                <Content pageCount={pageCount} itemsPerPage={itemsPerPage} handlePageClick={handlePageClick} vacancies={vacancies}  itemOffset={itemOffset} setActualPageInPagination={setActualPageInPagination} actualPage={actualPage}/>
            </div>
        </form>

    </section>
}

export type  FormValuesType = {
    numberFrom: string
    numberUpTo: string
    search: string
}