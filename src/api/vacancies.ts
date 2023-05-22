import {instance} from "./api";
import {AxiosResponse} from "axios";
import {FilterType, GetCategoriesResponseType, GetVacanciesResponseType} from "./api-type";


export const vacanciesAPI = {
    getCategories() {
        return instance
            .get("catalogues/")
            .then((res: AxiosResponse<GetCategoriesResponseType>) => res.data);

    },
    getVacancies(filter: FilterType) {
        return instance.get(`vacancies/?published=1&count=100&page=${filter.page}&keyword=${filter.keyword}&payment_from=${filter.payment_from}&payment_to=${filter.payment_to}&catalogues=${filter.catalogues}`).then((res: AxiosResponse<GetVacanciesResponseType>) => res.data)
    }

}


