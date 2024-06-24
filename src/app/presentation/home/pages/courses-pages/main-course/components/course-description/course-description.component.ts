import { Component, Input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { Course } from '../../../../../../../core/course/domain/course.model';

@Component({
  selector: 'app-course-description',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './course-description.component.html',
  styleUrl: './course-description.component.css'
})
export class CourseDescriptionComponent {
  @Input({required: true}) course!: Course;
}
