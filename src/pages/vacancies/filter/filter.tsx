import {FC, useState} from "react";
import s from './filter.module.scss'
import {FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger} from 'react-hook-form'
import cross from '../../../assets/img/cross.svg'
import arrow_down from '../../../assets/img/arrow_down.svg'
import arrow_down_salary from '../../../assets/img/arrow_down_salary.svg'
import arrow_up_salary from '../../../assets/img/arrow_up_salary.svg'
import {FormValuesType} from "../vacancies";

export const Filter: FC<FilterType> = ({
                                           register,
                                           chooseIndustry,
                                           industry,
                                           setValue,
                                           getValues,
                                           isValid,
                                           trigger
                                       }) => {
    const [isOpenList, setIsOpenList] = useState<boolean>(false)

    const toggleList = () => {
        setIsOpenList(!isOpenList)
    }

    const salaryIncrement = (inputName: any) => {

        setValue(inputName, Number(getValues(inputName)) + 1)
        trigger(['numberFrom', 'numberUpTo'])
    }
    const salaryDecrement = (inputName: any) => {
        const number = getValues(inputName)
        if (number > 0) {
            setValue(inputName, number - 1)
            trigger(['numberFrom', 'numberUpTo'])
        }


    }

    return <aside className={s.filter}>
        <div className={s.title}><h1>Фильтры</h1>
            <div className={s.reset}><span>Сбросить все</span> <img src={cross} alt='cross'/></div>
        </div>
        <div className={s.industry}>
            <h2>Отрасль</h2>

            <div onClick={toggleList}
                 className={`${s.industry_input} ${industry ? s.blackText : s.grayText}  ${isOpenList ? s.blueBorder : ''}`}>
                <span>{industry ? industry : 'Выберите отрасль'} </span> <img src={arrow_down} alt='arrow'/>
                <div className={`${s.list} ${isOpenList ? s.openList : ''}`}><span>adsf</span>
                    <span>adsf</span><span>adsf</span></div>
            </div>

        </div>

        <div className={s.salary}>
            <h2>Оклад</h2>


            <div className={s.input_container}><input {...register('numberFrom', {
                validate: {
                    correctNumber: (value: string, formValues) => {

                        return Number(value) < Number(formValues.numberUpTo) || !formValues.numberUpTo || !value || 'Оклад от не может быть меньше Оклада до'
                    }
                }
            })} type='number' placeholder='От'/>
                <div className={s.arrows_container}>
                    <div className={s.salaryArrow_up}><img onClick={() => salaryIncrement('numberFrom')}
                                                           src={arrow_up_salary} alt='arrow_up_salary'/></div>
                    <div className={s.salaryArrow_down}><img onClick={() => salaryDecrement('numberFrom')}
                                                             src={arrow_down_salary} alt='arrow_down_salary'/></div>
                </div>
            </div>


            <div className={s.input_container}><input {...register('numberUpTo', {
                validate: {
                    correctNumber: (value: string, formValues) => {

                        return Number(value) > Number(formValues.numberFrom) || !formValues.numberFrom || !value || 'Оклад до не может быть меньше Оклада от'

                    }
                }
            })} type='number' placeholder='До'/>
                <div className={s.arrows_container}>
                    <div className={s.salaryArrow_up}><img onClick={() => salaryIncrement('numberUpTo')}
                                                           src={arrow_up_salary} alt='arrow_up_salary'/></div>
                    <div className={s.salaryArrow_down}><img onClick={() => salaryDecrement('numberUpTo')}
                                                             src={arrow_down_salary} alt='arrow_down_salary'/></div>
                </div>
            </div>

        </div>

        <div className={s.error}> {!isValid && <span>Сумма ОТ оклада должна быть меньше суммы ДО оклада</span>}</div>
        <button className={s.button} type='submit'>ok</button>
    </aside>
}

type FilterType = {
    register: UseFormRegister<FormValuesType>
    chooseIndustry: (value: string) => void
    industry: string
    setValue: UseFormSetValue<FormValuesType>
    getValues: UseFormGetValues<FormValuesType>

    isValid: boolean
    trigger: UseFormTrigger<FormValuesType>

}