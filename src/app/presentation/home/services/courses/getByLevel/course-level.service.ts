import { Injectable } from '@angular/core';
import { ICourse } from '../../../interfaces/course-model';
import { IProgram } from '../../../interfaces/ILittleCard';
import { CourseDataAdapter } from '../../../adapters/CourseDataAdapter';

const cursos: ICourse[] = [
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "category": "Yoga for beginners",
    "description": "Learn the basics of yoga and improve your health. No previous experience required.",
    "image": "https://via.placeholder.com/250",
    "level": 1,
    "weeks": 4,
    "mins": 16,
    "instructor": "Carlos",
},
{
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "category": "Yoga for intermediates",
    "description": "Improve your yoga skills and learn new poses. Previous experience required.",
    "image": "https://via.placeholder.com/250",
    "level": 2,
    "weeks": 4,
    "mins": 16,
    "instructor": "Pedro",
},
{
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "category": "Yoga for experts",
    "description": "Become a yoga master and learn advanced poses. Previous experience required.",
    "image": "https://via.placeholder.com/250",
    "level": 3,
    "weeks": 4,
    "mins": 16,
    "instructor": "Paul",
},
{
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "category": "Yoga for seniors",
    "description": "Improve your health and flexibility with yoga. No previous experience required.",
    "image": "https://via.placeholder.com/250",
    "level": 1,
    "weeks": 4,
    "mins": 16,
    "instructor": "Carlos",
},
{
    "id": "550e8400-e29b-41d4-a716-446655440004",
    "category": "Yoga for kids",
    "description": "Learn the basics of yoga and improve your health. No previous experience required.",
    "image": "https://via.placeholder.com/250",
    "level": 1,
    "weeks": 4,
    "mins": 16,
    "instructor": "Carlos",
},
]

@Injectable({
  providedIn: 'root'
})
export class CourseLevelService {

  

  constructor() { }
  public getByLevel(level: number): ICourse[] {
    let filtrados = cursos.filter((course: ICourse) => course.level === level);
    return filtrados.map(course => CourseDataAdapter(course));
  }

  public getAll(): ICourse[] {
    return cursos.map(course => CourseDataAdapter(course));
  }
}
