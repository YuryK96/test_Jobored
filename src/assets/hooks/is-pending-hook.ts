import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {isPendingSelector} from "../../redux-toolkit/vacancies/vacancies-selectors";


export function useIsPending() {
    const [isPending, setIsPending] = useState<boolean | null>(null)
    const pending = useSelector(isPendingSelector)


    useEffect(() => {
        if (pending.vacancies) {
            if(!isPending)
            setIsPending(true)

        } else if (pending.categories) {
            if(!isPending)
            setIsPending(true)

        } else {
            if(isPending)
            setIsPending(false)
        }
    }, [isPending, pending]);
    return isPending

}