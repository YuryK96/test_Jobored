import {instance} from "./api";
import {AxiosResponse} from "axios";
import {GetCategoriesResponseType} from "./api-type";



export const vacanciesAPI = {
    getCategories(){
      return  instance
            .get("catalogues/")
            .then((res:AxiosResponse<GetCategoriesResponseType>) => res.data);

    },

}
