import {VacancyHeaderType} from "../redux-toolkit/vacancies/vacancies-type";
import {AppDispatch} from "../redux-toolkit/store";
import {Action, ActionCreator} from "@reduxjs/toolkit";

export const setTokenInLS = (token: string) => {
    localStorage.setItem("token", token);
}
export const getTokenInLS = () => localStorage.getItem("token");
export const getRefreshTokenInLS = () => localStorage.getItem("refresh_token");

export const setRefreshTokenInLS = (token: string) => {
    localStorage.setItem("refresh_token", token);
}


export const addFavoriteVacancyLS: AddFavoriteVacancyType = (vacancy, dispatch, addFavoritesAC) => {
    if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([vacancy]))
        dispatch(addFavoritesAC([vacancy]))
    } else {
        const favorites: VacancyHeaderType[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites.push(vacancy)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        dispatch(addFavoritesAC(favorites))


    }
}
export const removeFavoriteVacancyLS: RemoveFavoriteVacancyType = (id, dispatch, addFavoritesAC) => {
    if (localStorage.getItem('favorites') && id) {
        const favorites: VacancyHeaderType[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        const newFavorites = favorites.filter((vacancy) => vacancy.id !== id
        )
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        dispatch(addFavoritesAC(newFavorites))


    }
}

export const getFavoriteVacanciesLS = () => JSON.parse(localStorage.getItem('favorites') || '[]')


type RemoveFavoriteVacancyType = (id: number | undefined, dispatch: AppDispatch, addFavoritesAC: ActionCreator<Action>) => void

type AddFavoriteVacancyType = (vacancy: VacancyHeaderType, dispatch: AppDispatch, addFavoritesAC: ActionCreator<Action>) => void

