import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'add-course-page',
    templateUrl: './add-course.component.html',
    styleUrl: './add-course.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule]
})
export class AddCoursePageComponent {


}
