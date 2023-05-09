import {FC, useState} from "react";
import s from './vacancies.module.scss'
import {Filter} from "./filter";
import {SearchPanel} from "./search-panel";
import {Content} from "./content";
import {useForm} from "react-hook-form";

export const Vacancies: FC = () => {
    const [industry, setIndustry]= useState<string>('')

    const chooseIndustry = (industry: string) => {
        setIndustry(industry)
    }

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        trigger,
        formState: {errors,isValid}
    } = useForm<FormValuesType>({mode:"onChange"})


const onSubmit = (data:FormValuesType)=> {
        console.log(data)
}

    return <section className={s.vacancies}>
        <form onSubmit={handleSubmit(onSubmit)}>

        <Filter trigger={trigger}  getValues={getValues} register={register} setValue={setValue} industry={industry} isValid={isValid}   chooseIndustry={chooseIndustry}/>
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