export interface EntityListResponse<Entity> {
    data: Entity[]
    meta: {
        pagination: {
            current_page: number
            links: {
                next: string
            }[]
            total_pages: number
            per_page: number
            count: number
            total: number
        }
    }
}
