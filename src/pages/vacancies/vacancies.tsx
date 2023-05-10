import {FC, useState} from "react";
import s from './vacancies.module.scss'
import {Filter} from "./filter";
import {SearchPanel} from "./search-panel";
import {Content} from "./content";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux-toolkit/store";
import {getVacancies} from "../../redux-toolkit/vacancies/vacancies-thunk";

export const Vacancies: FC = () => {
    const [industryKey, setIndustryKey] = useState<number | string>('')
    const dispatch = useDispatch<AppDispatch>()
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        trigger,
        formState: {errors, isValid}
    } = useForm<FormValuesType>({mode: "onChange"})


    const chooseIndustryKey = (key: number | string) => {
        setIndustryKey(key)
    }
    const onSubmit = (data: FormValuesType) => {
        dispatch(getVacancies( {
            catalogues: String(industryKey),
            keyword : data.search ? data.search : '',
            payment_from : data.numberFrom ? data.numberFrom : '',
            payment_to: data.numberUpTo ? data.numberUpTo: ''
        } ) )


    }

    return <section className={s.vacancies}>
        <form onSubmit={handleSubmit(onSubmit)}>

            <Filter trigger={trigger} getValues={getValues} register={register} setValue={setValue}
                    isValid={isValid} chooseIndustryKey={chooseIndustryKey}/>
            <div className={s.wrapper}>
                <SearchPanel register={register}/>
                <Content/>
            </div>
        </form>

    </section>
}

export type  FormValuesType = {
    numberFrom: string
    numberUpTo: string
    search: string
}