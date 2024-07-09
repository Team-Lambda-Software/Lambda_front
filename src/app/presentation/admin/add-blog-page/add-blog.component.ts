import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddBlogForm } from './interfaces/add-blog-form-interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CategoyUseCaseProvider } from '../../../core/categories/infrastructure/providers/category-usecase-provider';
import { Category } from '../../../core/categories/domain/category.model';
import { SearchUseCaseProvider } from '../../../core/search/infraestructure/providers/search-api-usecase-provider';
import { TagsApiUseCaseProvider } from '../../../core/search/infraestructure/providers/tags-api-usecase-provider';
import { ITag } from '../../../core/search/domain/tags-model';

@Component({
    selector: 'add-blog-page',
    templateUrl: './add-blog.component.html',
    styleUrl: './add-blog.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,
      MatInputModule, MatIconModule]
})
export class AddBlogPageComponent {
    private fb = inject(FormBuilder)
    private categoryUseCaseService=inject(CategoyUseCaseProvider);
    public tagsService = inject(TagsApiUseCaseProvider);

    public categories:Category[]=[]
    public tags:ITag[]=[]

    public addBlogForm :FormGroup<AddBlogForm>=this.fb.group<AddBlogForm>({
      title:new FormControl(null,{validators:[Validators.required]}),
      content:new FormControl(null,{validators:[Validators.required]}),
      category:new FormControl(null,{validators:[Validators.required]}),
      trainer:new FormControl(null,{validators:[Validators.required]}),
      tags:new FormControl(null,{validators:[Validators.required]}),
      images:new FormControl(null,{validators:[Validators.required]})
    })

    showData(){
        console.log( this.addBlogForm.value )
    }
    constructor(){
      this.categoryUseCaseService.usecase.getByParams('').subscribe(
        {
          next:(value)=>{
            this.categories=value
          }
        }
      )
      this.tagsService.usecase.execute('').subscribe({
        next:(value)=>{
           if (!value.isError()){
            this.tags=value.getValue()
           }
        }
      })
    }

}
