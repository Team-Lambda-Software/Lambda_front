
export interface AddBlogAdminDto {
    trainerId: string
    title: string
    body: string
    categoryId: string
    tags: string[]
    images: File[]
}