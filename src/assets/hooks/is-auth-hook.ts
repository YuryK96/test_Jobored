import {useEffect, useState} from "react";


export function useIsAuth(){
    const token = localStorage.getItem('token')
    const [isAuth, setIsAuth]=useState<boolean | null>(!!token)


    useEffect( ()=> {
        if(isAuth){
            setIsAuth(true)

        } else {
            setIsAuth(false)
        }
    },[isAuth] );
    return isAuth

}