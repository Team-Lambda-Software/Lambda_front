import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddSectionAdminDto } from '../../../core/admin/application/dto/add-section-dto';
import { Course, PartialCourse } from '../../../core/course/domain/course.model';
import { CourseUsecaseProvider } from '../../../core/course/infrastructure/providers/course-usecase-provider';

@Component({
    selector: 'add-section-page',
    templateUrl: './add-section.component.html',
    styleUrl: './add-section.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule]
})
export class AddSectionPageComponent {

    public fileToUpload=[]
    public courses:PartialCourse[]=[]
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
                console.log(value)
                this.courses=value
            
            }
        })

    }

}
