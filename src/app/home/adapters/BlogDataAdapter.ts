import { IBlog } from "../interfaces/blog-model"

export const CourseDataAdapter = (data : any): IBlog => {
    return {
        id: data.id,
        title: data.tittle,
        category: data.category,
        description: data.description,
        thumbnail: 'https://via.placeholder.com/150',
        imagenUrl: 'https://media.glamour.mx/photos/642c5305347cb2132003b34a/16:9/w_2560%2Cc_limit/yoga_y_estiramientos_diferencias.jpg',
        date: 'Feb 17,2020',
    }
}
