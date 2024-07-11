import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../../../auth/components/loader/loader.component';
import { MiniCourse } from '../../interfaces/minicourse.interface';
import { CourseUsecaseProvider } from '../../../../core/course/infrastructure/providers/course-usecase-provider';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { FileService } from '../../../shared/services/file/file.service';
import { AuthLocalStorageService } from '../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { AddSectionAdminUseCase } from '../../../../core/admin/application/add-section-use-case.service';
import { AddSectionForm } from '../../interfaces/add-section-form-interface';
import { AddSectionAdminDto } from '../../../../core/admin/application/interfaces/dto/add-section-dto';
import { AddSectionApiService } from '../../../../core/admin/infraestructure/services/AddSectionApiService.service';
import { AddSectionApiProvider } from '../../../../core/admin/infraestructure/providers/AddSectionApiService.service';



@Component({
    selector: 'add-section-page',
    templateUrl: './add-section.component.html',
    styleUrl: './add-section.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSelectModule, LoaderComponent]
})
export class AddSectionPageComponent {

    public fileToUpload=[]
    public courses:MiniCourse[]=[]
    private courseInjection=inject(CourseUsecaseProvider);
    private fb = inject(FormBuilder)
    public validatorService= inject(ValidatorService)
    public darkModeService = inject(DarkModeService);
    private popupService=inject(PopupInfoModalService)
    private fileToBase64Service=inject(FileService)
    public videosBase64:string[]=[]
    public videos:any[]=[]
    private adminUseCase = inject(AddSectionApiProvider)
    public sectionCreatedSucsessfully='Section created succsessfully'
    public sectionCreatedError='Something went wrong creating the section, please try again'

    public isLoadingSection=false
    private videoDuration = 0

    public addSectionForm :FormGroup<AddSectionForm>=this.fb.group<AddSectionForm>({
      course:new FormControl(null,{validators:[Validators.required]}),
      name:new FormControl(null,{validators:[Validators.required]}),
      description:new FormControl(null,{validators:[Validators.required]}),
      duration:new FormControl(null,{validators:[Validators.required,Validators.pattern(this.validatorService.numberPattern)]}),
      video:new FormControl(null,{validators:[Validators.required]}),
    })

    loadVideo(event:any):void{
      this.videoDuration = 0 
      this.videosBase64=[]
      let files:any = []
      for ( let i of event.target.files ) { files.push( i ) }
      const cleanedFiles:File[]=files
      let videosBase64:string[]=[]

      cleanedFiles.forEach((file)=>{
        this.fileToBase64Service.convertFileToBase64(file).then(imagen=>{
          videosBase64.push(imagen.model)
          console.log(videosBase64);
        })
      })
      this.videosBase64=videosBase64
      const url = window.URL.createObjectURL(files[0])
      document.getElementById('video_tester')?.setAttribute('src', url)
      this.addSectionForm.get('video')?.setValue(cleanedFiles[0])
      // let duration=this.getVideoDuration(cleanedFiles)
      // console.log(duration);


      //if (!file) console.log('file nulo')
      //return this.popupService.displayErrorModal(this.errorUploadingUserImage)}
      // Validar Formato del Archivo
      //const isValidImageExtension = this.validatorService.vali.test(file.name);
  }

    onMetadata(e:any, video:any) { 
      this.videoDuration = video.duration 
      this.addSectionForm.get('duration')?.setValue(this.videoDuration)
    }

    private createDTO(): AddSectionAdminDto {
      let userForm=this.addSectionForm.value
        let data:AddSectionAdminDto = {
            id_course: userForm.course?.id!,
            name: userForm.name!,
            description: userForm.description!,
            duration: userForm.duration!,
            video: this.videosBase64[0]
        }
        console.log(data);

        return data
    }

    addSection(){
      console.log('hola');

      if(this.addSectionForm.valid){
        this.isLoadingSection=true
        this.adminUseCase.usecase.execute(this.createDTO()).subscribe({
          next:(value)=>{
            this.isLoadingSection=false
            this.popupService.displayInfoModal(this.sectionCreatedSucsessfully)
          }
          ,error:(error)=>{
            this.isLoadingSection=false
            this.popupService.displayErrorModal(this.sectionCreatedError)
          }
        })
      }
    }

    constructor() {
        this.courseInjection.usecase.getCoursesByParams('').subscribe({
            next:(value)=>{
                value.forEach( e => this.courses.push( { name:e.title, id:e.id  } ) )
            }
        })

    }

}
