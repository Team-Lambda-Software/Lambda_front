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
