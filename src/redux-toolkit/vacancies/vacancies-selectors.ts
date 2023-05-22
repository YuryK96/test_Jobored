import {AppStateType} from "../store";


export  const getCategoryNamesKeysSelector = (state:AppStateType)=> state.vacanciesBranch.categoriesNamesKeys
export  const getVacanciesSelector = (state:AppStateType)=> state.vacanciesBranch.vacancies ? state.vacanciesBranch.vacancies : []
export  const isPendingSelector = (state:AppStateType)=> state.vacanciesBranch.isPending
export  const getFavoritesSelector = (state:AppStateType)=> state.vacanciesBranch.favorites
export  const getVacanciesTotalSelector = (state:AppStateType)=> state.vacanciesBranch.vacanciesTotal
export  const getAuthCodeErrorSelector = (state:AppStateType)=> state.vacanciesBranch.authCodeError