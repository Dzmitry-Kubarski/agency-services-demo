export interface ListQueryParamsDto<Include = string> {
    page?: number
    limit?: number
    orderBy?: string | string[]
    sortedBy?: 'asc' | 'desc' | ('asc' | 'desc')[]
    searchJoin?: 'and' | 'or'
    search?: string | Record<string, any>
    searchFields?: Record<string, 'like' | 'ilike' | '=' | undefined>
    keywords?: string
    keywordsFields?: string[]
    filter?: string[]
    include?: Include[]
}
