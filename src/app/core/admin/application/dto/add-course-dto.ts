
export interface AddCourseAdminDto {
    trainerId: string
    name: string
    description: string
    weeksDuration: number
    minutesDuration: number
    level: number
    categoryId: string
    tags: string[]
    image: File
}