import {GetCategoriesResponseType, VacancyType} from "../../api/api-type";


export  type InitialState = {
    vacancies: null | VacancyType[],
    categories: null | GetCategoriesResponseType
    categoriesNamesKeys:  {title: string, key: number}[],
    favorites: VacancyHeaderType[]
    error: null | string,
    isPending: {
        vacancies: null | boolean,
        categories: null | boolean,
        auth: boolean
    }
}


export type VacancyHeaderType = {
    vacancyRichText?: string
    profession?: string
    payment_from?: number
    currency?: string
    type_of_work?: string
    town?: string
    id?: number
}