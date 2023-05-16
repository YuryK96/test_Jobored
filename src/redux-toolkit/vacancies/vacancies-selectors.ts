import {AppStateType} from "../store";


export  const getCategoryNamesKeysSelector = (state:AppStateType)=> state.vacanciesBranch.categoriesNamesKeys
export  const getVacanciesSelector = (state:AppStateType)=> state.vacanciesBranch.vacancies ? state.vacanciesBranch.vacancies : []
export  const isPendingSelector = (state:AppStateType)=> state.vacanciesBranch.isPending