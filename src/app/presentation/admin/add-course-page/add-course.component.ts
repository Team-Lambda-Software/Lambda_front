import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddBlogForm } from '../add-blog-page/interfaces/add-blog-form-interface';
import { ValidatorService } from '../../shared/services/validator/validator.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'add-course-page',
    templateUrl: './add-course.component.html',
    styleUrl: './add-course.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,
       MatInputModule, MatIconModule]
})
export class AddCoursePageComponent {

  private fb = inject(FormBuilder)
  public validatorService= inject(ValidatorService)


  public addCourseForm :FormGroup<AddBlogForm>=this.fb.group<AddBlogForm>({
    title:new FormControl(null,{validators:[Validators.required]}),
    content:new FormControl(null,{validators:[Validators.required]}),
    category:new FormControl(null,{validators:[Validators.required]}),
    trainer:new FormControl(null,{validators:[Validators.required]}),
    tags:new FormControl(null,{validators:[Validators.required]}),
    images:new FormControl(null,{validators:[Validators.required]})
  })
}
