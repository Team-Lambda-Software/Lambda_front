import { AddCourseAdminUseCase } from '../../../../core/admin/application/add-course-use-case.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddBlogForm } from '../../interfaces/add-blog-form-interface';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { MatIconModule } from '@angular/material/icon';
import { AddCourseForm } from '../../interfaces/add-course-form-interface';
import { CategoyUseCaseProvider } from '../../../../core/categories/infrastructure/providers/category-usecase-provider';
import { Category } from '../../../../core/categories/domain/category.model';
import { ManyTrainersApiService } from '../../../../core/trainer/infrastructure/services/many-trainer-api.service';
import { TrainerComplete } from '../../../../core/trainer/domain/trainer.model';
import { AddCourseAdminDto } from '../../../../core/admin/application/interfaces/dto/add-course-dto';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { AuthLocalStorageService } from '../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../../../shared/services/file/file.service';
import { TrainerGetManyProvider } from '../../../../core/trainer/infrastructure/providers/trainer-get-many.service';
import { Result } from '../../../../common/helpers/Result';
import { LoaderComponent } from '../../../auth/components/loader/loader.component';
import { AddCourseApiProvider } from '../../../../core/admin/infraestructure/providers/AddCourseApiService.service';

@Component({
    selector: 'add-course-page',
    templateUrl: './add-course.component.html',
    styleUrl: './add-course.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,
       MatInputModule, MatIconModule,MatSelectModule,LoaderComponent]
})
export class AddCoursePageComponent {

  private fb = inject(FormBuilder)
  public validatorService= inject(ValidatorService)
  private categoryUseCaseService=inject(CategoyUseCaseProvider);
  public darkModeService = inject(DarkModeService);
  private popupService=inject(PopupInfoModalService)
  private fileservice=inject(FileService)
  private trainerMany = inject(TrainerGetManyProvider)
  public CourseCreatedSucsessfully='The course was created sucessfully'
  public CourseCreatedError='Something went wrong creating the course, please try again'
  public CourseTrainerError='Something went wrong loading the trainer, please try again'
  public CourseCategoryError='Something went wrong loading the categories, please try again'
  public categories:Category[]=[]
  public trainers:TrainerComplete[]=[]
  public fileToUpload=[]
  public images:string[]=[]
  public isLoadingAddCourse=false

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

  private adminUseCase = inject(AddCourseApiProvider)


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
      this.isLoadingAddCourse=true
      this.adminUseCase.usecase.execute(this.createDTO()).subscribe({
        next:(value)=>{
          this.isLoadingAddCourse=false
          this.popupService.displayInfoModal(this.CourseCreatedSucsessfully)
        }
        ,error:(error)=>{this.popupService.displayErrorModal(this.CourseCreatedError)
          this.isLoadingAddCourse=false
        }
      })
    }
  }

  constructor(){
    this.categoryUseCaseService.usecase.getByParams('').subscribe({
        next:(value)=>{ this.categories=value },
        error:(error:Result<Error>)=>{ this.popupService.displayErrorModal(this.CourseCategoryError)}
    })


    this.trainerMany.usecase.execute('?page=1&perPage=5').subscribe({
        next:(value)=>{ if(!value.isError())this.trainers=value.getValue()
          else this.popupService.displayErrorModal(value.getError().message)
        },
        error:(error:Result<Error>)=>{ this.popupService.displayErrorModal(this.CourseTrainerError)}
    })
  }
}
