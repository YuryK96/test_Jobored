import {GetCategoriesResponseType} from "../../api/api-type";


export  type InitialState = {
    vacancies: null,
    categories: null | GetCategoriesResponseType
    categoriesNamesKeys:  {title: string, key: number}[]
}