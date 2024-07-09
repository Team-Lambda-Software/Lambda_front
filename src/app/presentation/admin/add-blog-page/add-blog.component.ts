import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'add-blog-page',
    templateUrl: './add-blog.component.html',
    styleUrl: './add-blog.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule]
})
export class AddBlogPageComponent {


}
