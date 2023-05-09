export type AuthResponseType = {
    access_token: string
    expires_in: number
    refresh_token: string
    reg_user_resumes_count: number
    token_type: string
    tt1: number
}

export type GetCategoriesResponseType = {
    title_rus: string
    url_rus: string
    title: string
    title_trimmed: string
    key: number
    positions: {
        title_rus: string
        url_rus:string
        title: string
        id_parent: number
        key: number
    }[]

}[]