import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddSectionAdminDto } from '../../../core/admin/application/dto/add-section-dto';
import { Course, PartialCourse } from '../../../core/course/domain/course.model';
import { CourseUsecaseProvider } from '../../../core/course/infrastructure/providers/course-usecase-provider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../shared/services/validator/validator.service';
import { DarkModeService } from '../../shared/services/dark-mode/dark-mode.service';
import { PopupInfoModalService } from '../../shared/services/popup-info-modal/popup-info-modal.service';
import { AddSectionForm } from '../interfaces/add-section-form-interface';
import { FileService } from '../../shared/services/file/file.service';
import { MiniCourse } from '../interfaces/minicourse.interface';
import { AddSectionAdminUseCase } from '../../../core/admin/application/add-section-use-case';
import { AuthLocalStorageService } from '../../../core/shared/infraestructure/local-storage/auth-local-storage.service';


@Component({
    selector: 'add-section-page',
    templateUrl: './add-section.component.html',
    styleUrl: './add-section.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,
        MatInputModule, MatIconModule,MatSelectModule]
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
    private adminUseCase = new AddSectionAdminUseCase( new AuthLocalStorageService() )
    public sectionCreatedSucsessfully='Section created succsessfully'
    public isLoading=false


    public addSectionForm :FormGroup<AddSectionForm>=this.fb.group<AddSectionForm>({
      course:new FormControl(null,{validators:[Validators.required]}),
      name:new FormControl(null,{validators:[Validators.required]}),
      description:new FormControl(null,{validators:[Validators.required]}),
      duration:new FormControl(null,{validators:[Validators.required,Validators.pattern(this.validatorService.numberPattern)]}),
      video:new FormControl(null,{validators:[Validators.required]}),
    })

    private getVideoDuration(filesRecieved:File[]):number {
      let files = filesRecieved
      let duration=0
      this.videos.push(files[0]);
      var video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = function() {
        window.URL.revokeObjectURL(video.src);
        duration=video.duration
      }
      video.src = URL.createObjectURL(files[0]);;
      return(this.videos[0].duration)
    }

    loadVideo(event:any):void{
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
      console.log(cleanedFiles);
      this.videosBase64=videosBase64
      console.log(this.getVideoDuration(cleanedFiles));

      this.addSectionForm.get('duration')?.setValue(3)

      this.addSectionForm.get('video')?.setValue(cleanedFiles[0])
      // let duration=this.getVideoDuration(cleanedFiles)
      // console.log(duration);


      //if (!file) console.log('file nulo')
      //return this.popupService.displayErrorModal(this.errorUploadingUserImage)}
      // Validar Formato del Archivo
      //const isValidImageExtension = this.validatorService.vali.test(file.name);
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
        this.adminUseCase.execute(this.createDTO()).subscribe({
          next:(value)=>{
            this.popupService.displayInfoModal(this.sectionCreatedSucsessfully)
          }
          ,error:(error)=>{this.popupService.displayErrorModal('error')}
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
