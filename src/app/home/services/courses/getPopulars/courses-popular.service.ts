import { Injectable } from '@angular/core';
import { ICourse } from '../../../interfaces/course-model';
import { ICard } from '../../../interfaces/ILittleCard';
import { CourseDataAdapter } from '../../../adapters/CourseDataAdapter';
import { CourseLitleCardAdapter } from '../../../adapters/LitleCardAdapter';

const cursos: ICourse[] = [
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "category": "Yoga for beginners",
    "description": "Learn the basics of yoga and improve your health. No previous experience required.",
    "image": "https://th.bing.com/th/id/R.fb0470336c93f79c3849ee071c23b325?rik=wYIvg5dZ5yr%2bHw&riu=http%3a%2f%2fobrazki.4ever.eu%2fdata%2fdownload%2fsport%2fjoga%2c-rozgrzewka%2c-cwiczenie-255948.jpg%3fno-logo&ehk=x4bDbFvlQtBdGWGCeoyQsUu8KdDNdus0t7Xzvav%2b3%2f4%3d&risl=&pid=ImgRaw&r=0",
    "level": 1,
    "weeks": 4,
    "mins": 16,
    "instructor": "Carlos",
},
{
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "category": "Yoga for intermediates",
    "description": "Improve your yoga skills and learn new poses. Previous experience required.",
    "image": "https://th.bing.com/th/id/R.fb0470336c93f79c3849ee071c23b325?rik=wYIvg5dZ5yr%2bHw&riu=http%3a%2f%2fobrazki.4ever.eu%2fdata%2fdownload%2fsport%2fjoga%2c-rozgrzewka%2c-cwiczenie-255948.jpg%3fno-logo&ehk=x4bDbFvlQtBdGWGCeoyQsUu8KdDNdus0t7Xzvav%2b3%2f4%3d&risl=&pid=ImgRaw&r=0",
    "level": 2,
    "weeks": 4,
    "mins": 16,
    "instructor": "Pedro",
},
{
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "category": "Yoga for experts",
    "description": "Become a yoga master and learn advanced poses. Previous experience required.",
    "image": "https://th.bing.com/th/id/R.fb0470336c93f79c3849ee071c23b325?rik=wYIvg5dZ5yr%2bHw&riu=http%3a%2f%2fobrazki.4ever.eu%2fdata%2fdownload%2fsport%2fjoga%2c-rozgrzewka%2c-cwiczenie-255948.jpg%3fno-logo&ehk=x4bDbFvlQtBdGWGCeoyQsUu8KdDNdus0t7Xzvav%2b3%2f4%3d&risl=&pid=ImgRaw&r=0",
    "level": 3,
    "weeks": 4,
    "mins": 16,
    "instructor": "Paul",
},
{
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "category": "Yoga for seniors",
    "description": "Improve your health and flexibility with yoga. No previous experience required.",
    "image": "https://th.bing.com/th/id/R.fb0470336c93f79c3849ee071c23b325?rik=wYIvg5dZ5yr%2bHw&riu=http%3a%2f%2fobrazki.4ever.eu%2fdata%2fdownload%2fsport%2fjoga%2c-rozgrzewka%2c-cwiczenie-255948.jpg%3fno-logo&ehk=x4bDbFvlQtBdGWGCeoyQsUu8KdDNdus0t7Xzvav%2b3%2f4%3d&risl=&pid=ImgRaw&r=0",
    "level": 1,
    "weeks": 4,
    "mins": 16,
    "instructor": "Carlos",
},
{
    "id": "550e8400-e29b-41d4-a716-446655440004",
    "category": "Yoga for kids",
    "description": "Learn the basics of yoga and improve your health. No previous experience required.",
    "image": "https://th.bing.com/th/id/R.fb0470336c93f79c3849ee071c23b325?rik=wYIvg5dZ5yr%2bHw&riu=http%3a%2f%2fobrazki.4ever.eu%2fdata%2fdownload%2fsport%2fjoga%2c-rozgrzewka%2c-cwiczenie-255948.jpg%3fno-logo&ehk=x4bDbFvlQtBdGWGCeoyQsUu8KdDNdus0t7Xzvav%2b3%2f4%3d&risl=&pid=ImgRaw&r=0",
    "level": 1,
    "weeks": 4,
    "mins": 16,
    "instructor": "Carlos",
},
]

@Injectable({
  providedIn: 'root'
})

export class CoursesPopularService {

  constructor() { }

  public getPopulars(): ICourse[] {
    // la peticione que hagamos al back la pasamos por el adapter para que tenga el formato que necesitamos
    return cursos.map(course => CourseDataAdapter(course));
  }
}