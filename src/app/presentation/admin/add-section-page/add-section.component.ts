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
import { AddSectionForm } from '../add-blog-page/interfaces/add-section-form-interface';

export interface MiniCourse {
    name: string
    id: string
}

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

    public addSectionBlog :FormGroup<AddSectionForm>=this.fb.group<AddSectionForm>({
      trainer:new FormControl(null,{validators:[Validators.required]}),
      name:new FormControl(null,{validators:[Validators.required]}),
      description:new FormControl(null,{validators:[Validators.required]}),
      duration:new FormControl(null,{validators:[Validators.required,Validators.pattern(this.validatorService.numberPattern)]}),
      image:new FormControl(null,{validators:[Validators.required]}),
    })

    loadVideo(event:any){
        let files:any = []
        for ( let i of event.target.files ) { files.push( i ) }
        this.fileToUpload = files
        //if (!file) console.log('file nulo')
        //return this.popupService.displayErrorModal(this.errorUploadingUserImage)}
        // Validar Formato del Archivo
        //const isValidImageExtension = this.validatorService.vali.test(file.name);
    }

    private createDTO(): AddSectionAdminDto {
        let data:AddSectionAdminDto = {
            id_course: '',
            name: '',
            description: '',
            duration: 0,
            file: this.fileToUpload[0]
        }
        return data
    }

    constructor() {
        this.courseInjection.usecase.getCoursesByParams('').subscribe({
            next:(value)=>{
                value.forEach( e => this.courses.push( { name:e.title, id:e.id  } ) )
            }
        })

    }

}
