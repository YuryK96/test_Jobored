import React, {FC, useState} from "react";
import s from './filter.module.scss'
import {UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger} from 'react-hook-form'
import cross from '../../../assets/img/cross.svg'
import arrow_down from '../../../assets/img/arrow_down.svg'
import arrow_down_salary from '../../../assets/img/arrow_down_salary.svg'
import arrow_up_salary from '../../../assets/img/arrow_up_salary.svg'
import {FormValuesType} from "../vacancies";
import {useSelector} from 'react-redux'
import {getCategoryNamesKeysSelector} from "../../../redux-toolkit/vacancies/vacancies-selectors";
import {EnteredSearchDataType} from "../../layout/layout";

export const Filter: FC<FilterType> = ({
                                           register,
                                           chooseIndustryKey,
                                           setValue,
                                           getValues,
                                           isValid,
                                           trigger,
                                           industry,
                                           chooseIndustry,
                                           enteredSearchData,
                                           updateEnteredSearchData

                                       }) => {
    const [isOpenList, setIsOpenList] = useState<boolean>(false)
    const categories = useSelector(getCategoryNamesKeysSelector)

    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(true)

    const toggleShowingFilter = () => {
        setIsOpenFilter(!isOpenFilter)
    }


    const filterFieldsReset = () => {
        setValue('numberFrom', '');
        setValue('numberUpTo', '');
        chooseIndustry('');
        chooseIndustryKey('');
        updateEnteredSearchData({
                search: enteredSearchData.search,
                numberUpTo: '',
                numberFrom: '',
                industry : '',
                industryKey : '',
            }
        )
    }
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

    return <aside className={s.filter_container}>
        <button style={{background: isOpenFilter ? '#ACADB9' : ''}} type='button' onClick={toggleShowingFilter}
                className={s.show_filter_btn}>{isOpenFilter ? 'Скрыть фильтр' : 'Показать фильтр'}</button>
        <div className={`${s.filter} ${isOpenFilter ? '' : s.closeFilter}`}>
            <div className={s.title}><h1>Фильтры</h1>
                <div onClick={filterFieldsReset} className={s.reset}><span>Сбросить все</span> <img src={cross}
                                                                                                    alt='cross'/></div>
            </div>
            <div className={s.industry}>
                <h2>Отрасль</h2>

                <div onClick={toggleList} data-elem="industry-select"
                     className={`${s.industry_input} ${industry ? s.blackText : s.grayText}  ${isOpenList ? s.blueBorder : ''}`}>
                <span
                    style={{color: industry ? "#232134FF" : "#ACADB9FF"}}>{industry ? industry : 'Выберите отрасль'} </span>
                    <img src={arrow_down} alt='arrow'/>
                    <div className={`${s.list} ${isOpenList ? s.openList : ''}`}>
                        {categories.map((category) => {
                            return <span key={category.key} onClick={() => {
                                chooseIndustry(category.title);
                                chooseIndustryKey(category.key)
                            }}>{category.title}</span>
                        })}
                    </div>
                </div>

            </div>

            <div className={s.salary}>
                <h2>Оклад</h2>


                <div className={s.input_container}><input
                    data-elem="salary-from-input"
                    onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}
                    defaultValue={enteredSearchData.numberFrom}
                    {...register('numberFrom', {
                        validate: {
                            correctNumber: (value: string, formValues) => {

                                return Number(value) < Number(formValues.numberUpTo) || !formValues.numberUpTo || !value || 'оклад ОТ не может быть меньше оклада ДО'
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


                <div className={s.input_container}><input
                    data-elem="salary-to-input"
                    onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}
                    defaultValue={enteredSearchData.numberUpTo}
                    {...register('numberUpTo', {
                        validate: {
                            correctNumber: (value: string, formValues) => {

                                return Number(value) > Number(formValues.numberFrom) || !formValues.numberFrom || !value || 'оклад ДО не может быть меньше оклада ОТ'

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

            <div className={s.error}> {!isValid && <span>Неверный диапазон сумм</span>}</div>
            <button data-elem="search-button" className={s.button} type='submit'>Применить</button>
        </div>
    </aside>
}

type FilterType = {
    register: UseFormRegister<FormValuesType>
    chooseIndustryKey: (value: number | string) => void

    setValue: UseFormSetValue<FormValuesType>
    getValues: UseFormGetValues<FormValuesType>

    isValid: boolean
    trigger: UseFormTrigger<FormValuesType>
    chooseIndustry: (industry: string)
        => void
    industry: string
    enteredSearchData: EnteredSearchDataType
    updateEnteredSearchData: (data:EnteredSearchDataType)=>void
}