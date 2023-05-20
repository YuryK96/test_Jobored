import {useEffect, useState} from "react";
import {getTokenInLS} from "../local-storage/local-storage";


export function useIsAuth(){
    const token = getTokenInLS()
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