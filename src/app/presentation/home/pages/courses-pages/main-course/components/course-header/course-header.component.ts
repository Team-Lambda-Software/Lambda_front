import { Component, Input } from '@angular/core';
import { Course } from '../../../../../../../core/course/domain/course.model';

@Component({
  selector: 'app-course-header',
  standalone: true,
  imports: [],
  templateUrl: './course-header.component.html',
  styleUrl: './course-header.component.css'
})
export class CourseHeaderComponent {
  @Input({required: true}) course!: Course;
}
