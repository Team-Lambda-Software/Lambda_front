import { Component, Input, QueryList } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Course } from '../../../../../../../core/course/domain/course.model';

@Component({
  selector: 'app-section-expanded',
  standalone: true,
  imports: [TranslocoModule, MatExpansionModule, RouterModule],
  templateUrl: './section-expanded.component.html',
  styleUrl: './section-expanded.component.css'
})
export class SectionExpandedComponent {
  @Input({required: true}) course!: Course;
  @Input({required: true}) id!: string;
}
