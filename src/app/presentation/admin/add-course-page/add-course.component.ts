import { AddCourseAdminUseCase } from './../../../core/admin/application/add-course-use-case';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddBlogForm } from '../interfaces/add-blog-form-interface';
import { ValidatorService } from '../../shared/services/validator/validator.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { MatIconModule } from '@angular/material/icon';
import { AddCourseForm } from '../interfaces/add-course-form-interface';
import { CategoyUseCaseProvider } from '../../../core/categories/infrastructure/providers/category-usecase-provider';
import { Category } from '../../../core/categories/domain/category.model';
import { ManyTrainersApiService } from '../../../core/trainer/infrastructure/services/many-trainer-api.service';
import { TrainerComplete } from '../../../core/trainer/domain/trainer.model';
import { AddCourseAdminDto } from '../../../core/admin/application/dto/add-course-dto';
import { DarkModeService } from '../../shared/services/dark-mode/dark-mode.service';
import { AuthLocalStorageService } from '../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { PopupInfoModalService } from '../../shared/services/popup-info-modal/popup-info-modal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../../shared/services/file/file.service';

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
  public darkModeService = inject(DarkModeService);
  private popupService=inject(PopupInfoModalService)
  private fileservice=inject(FileService)

  public categories:Category[]=[]
  public trainers:TrainerComplete[]=[]
  public fileToUpload=[]
  public images:string[]=[]

  public addCourseForm :FormGroup<AddCourseForm>=this.fb.group<AddCourseForm>({
    title:new FormControl(null,{validators:[Validators.required,Validators.nullValidator]}),
    description:new FormControl(null,{validators:[Validators.required]}),
    category:new FormControl(null,{validators:[Validators.required]}),
    trainer:new FormControl(null,{validators:[Validators.required]}),
    weeks:new FormControl(null,{validators:[Validators.required,Validators.pattern(this.validatorService.numberPattern)]}),
    tags:new FormControl(null,{validators:[Validators.required]}),
    level:new FormControl(null,{validators:[Validators.required,Validators.pattern(this.validatorService.numberPattern)]}),
    image:new FormControl(null,{validators:[Validators.required]}),
  })

  private adminUseCase = new AddCourseAdminUseCase( new AuthLocalStorageService() )


  loadImage(event:any):void{
    let files:any = []
    for ( let i of event.target.files ) { files.push( i ) }
    const cleanedFiles:File[]=files
    let imagesBase64:string[]=[]

    cleanedFiles.forEach((file)=>{
      this.fileservice.convertFileToBase64(file).then(imagen=>{
        imagesBase64.push(imagen.model)
        console.log(imagesBase64);
      })
    })
    this.images=imagesBase64
    console.log(this.images);

    this.addCourseForm.get('image')?.setValue(cleanedFiles[0])

    //if (!file) console.log('file nulo')
    //return this.popupService.displayErrorModal(this.errorUploadingUserImage)}
    // Validar Formato del Archivo
    //const isValidImageExtension = this.validatorService.vali.test(file.name);
}

  private createDTO(): AddCourseAdminDto {
    let userData=this.addCourseForm.value
    let data:AddCourseAdminDto = {
        categoryId: userData.category!.id,
        trainerId: userData.trainer!.id,
        name: userData.title!,
        description: userData.description!,
        tags: userData.tags!,
        weeksDuration: parseInt(userData.weeks!),
        level: parseInt(userData.level!),
        image: this.images[0]
    }
    this.images=[]
    this.addCourseForm.get('image')?.setValue(null)
    return data
  }

  addCourse(){
    if(this.addCourseForm.valid){
      this.adminUseCase.execute(this.createDTO()).subscribe({
        next:(value)=>{}
        ,error:(error)=>{this.popupService.displayErrorModal('error')}
      })
    }
  }

  constructor(private sanitizer:DomSanitizer){
    this.categoryUseCaseService.usecase.getByParams('').subscribe({
        next:(value)=>{ this.categories=value }
    })
    const trainerMany = new ManyTrainersApiService()

    trainerMany.execute().subscribe({
        next:(value)=>{ this.trainers=value }
    })
  }
}
