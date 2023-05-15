import {GetCategoriesResponseType, VacancyType} from "../../api/api-type";


export  type InitialState = {
    vacancies: null | VacancyType[],
    categories: null | GetCategoriesResponseType
    categoriesNamesKeys:  {title: string, key: number}[],
    error: null | string,
    isPending: {
        vacancies: null | boolean,
        categories: null | boolean
    }
}