import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'add-section-page',
    templateUrl: './add-section.component.html',
    styleUrl: './add-section.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule]
})
export class AddSectionPageComponent {


}
