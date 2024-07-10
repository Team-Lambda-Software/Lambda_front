import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddBlogForm } from '../add-blog-page/interfaces/add-blog-form-interface';
import { ValidatorService } from '../../shared/services/validator/validator.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { MatIconModule } from '@angular/material/icon';
import { AddCourseForm } from '../add-blog-page/interfaces/add-course-form-interface';
import { CategoyUseCaseProvider } from '../../../core/categories/infrastructure/providers/category-usecase-provider';
import { Category } from '../../../core/categories/domain/category.model';

@Component({
    selector: 'add-course-page',
    templateUrl: './add-course.component.html',
    styleUrl: './add-course.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,
       MatInputModule, MatIconModule,MatSelectModule]
})
export class AddCoursePageComponent {

  private fb = inject(FormBuilder)
  public validatorService= inject(ValidatorService)
  private categoryUseCaseService=inject(CategoyUseCaseProvider);
  public categories:Category[]=[]

  public addCourseForm :FormGroup<AddCourseForm>=this.fb.group<AddCourseForm>({
    title:new FormControl(null,{validators:[Validators.required,Validators.nullValidator]}),
    description:new FormControl(null,{validators:[Validators.required]}),
    category:new FormControl(null,{validators:[Validators.required]}),
    trainer:new FormControl(null,{validators:[Validators.required]}),
    weeks:new FormControl(null,{validators:[Validators.required]}),
    mins:new FormControl(null,{validators:[Validators.required]}),
    level:new FormControl(null,{validators:[Validators.required]}),
    image:new FormControl(null,{validators:[Validators.required]}),
  })

  constructor(){
    this.categoryUseCaseService.usecase.getByParams('').subscribe(
      {
        next:(value)=>{
          this.categories=value
        }
      }
    )
  }
}
