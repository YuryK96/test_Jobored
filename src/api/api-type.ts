export type AuthResponseType = {
    access_token: string
    expires_in: number
    refresh_token: string
    reg_user_resumes_count: number
    token_type: string
    tt1: number
}

export type FilterType = {
    payment_from: string,
    payment_to: string,
    keyword: string,
    catalogues: string
    page: number}

export type GetCategoriesResponseType = {
    title_rus: string
    url_rus: string
    title: string
    title_trimmed: string
    key: number
    positions: {
        title_rus: string
        url_rus: string
        title: string
        id_parent: number
        key: number
    }[]

}[]

export type GetVacanciesResponseType = {
    more: boolean
    subscription_active: boolean
    subscription_id: number
    total: number
    objects: VacancyType[]
}

export type VacancyType = {
    address: string
    age_form: number
    age_to: number
    agency: { id: number, title: string }
    agreement: boolean
    already_sent_on_vacancy: boolean
    anonymous: boolean
    canEdit: boolean
    candidat: string
    catalogues: { id: number, title: string, key: number, positions: [] }[]
    children: { id: number, title: string }
    client: { address: null | string, addresses: [], client_logo: string, description: string, id: number, industry: [], is_blocked: boolean, link: string, registered_date: number, short_reg: boolean, staff_count: string, title: string, town: { id: number, title: string, declension: string, hasMetro: boolean, genitive: string }, url: string, vacancy_count: number }
    client_logo: string,
    compensation: null | string
    contact: string
    covid_vaccination_requirement: { id: number, title: string }
    currency: string,
    date_archived: number
    date_pub_to: number
    date_published: number
    driving_licence: []
    education: { id: number, title: string }
    experience: { id: number, title: string }
    favorite: boolean
    fax: string
    faxes: any
    firm_activity: string
    firm_name: string
    gender: { id: number, title: string }
    highlight: boolean
    id: number
    id_client: number
    isBlacklisted: boolean
    is_archive: boolean
    is_closed: boolean
    is_storage: boolean
    languages: []
    latitude: number
    link: string
    longitude: number
    maritalstatus: { id: number, title: string }
    metro: []
    moveable: boolean
    payment_from: number
    payment_to: number
    phone: string
    phones: []
    place_of_work: { id: number, title: string }
    profession: string
    rejected: boolean
    response_info: []
    town: { id: number, title: string, declension: string, hasMetro: boolean, genitive: string }
    type_of_work: { id: boolean, title: string }
    vacancyRichText: string
    work: string


}