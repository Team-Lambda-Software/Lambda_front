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
import { ManyTrainersApiService } from '../../../core/trainer/infrastructure/services/many-trainer-api.service';
import { TrainerComplete } from '../../../core/trainer/domain/trainer.model';
import { AddCourseAdminDto } from '../../../core/admin/application/dto/add-course-dto';

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
  public trainers:TrainerComplete[]=[]
  public fileToUpload=[]

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

  loadImage(event:any){
    let files:any = []
    for ( let i of event.target.files ) { files.push( i ) }
    this.fileToUpload = files
    //if (!file) console.log('file nulo')
    //return this.popupService.displayErrorModal(this.errorUploadingUserImage)}
    // Validar Formato del Archivo
    //const isValidImageExtension = this.validatorService.vali.test(file.name);
  }

  private createDTO(): AddCourseAdminDto {
    let data:AddCourseAdminDto = {    
        categoryId: '',
        trainerId: '',
        name: '',
        description: '',
        weeksDuration: 0,
        minutesDuration: 0,
        level: 1,
        tags: [], // this.tagsBlog.split(',')
        image: this.fileToUpload[0]
    
    }
    return data
  }

  constructor(){
    this.categoryUseCaseService.usecase.getByParams('').subscribe({
        next:(value)=>{ this.categories=value }
    })
    const trainerMany = new ManyTrainersApiService()
        
    trainerMany.execute().subscribe({
        next:(value)=>{ this.trainers=value }
    })
  }
}
