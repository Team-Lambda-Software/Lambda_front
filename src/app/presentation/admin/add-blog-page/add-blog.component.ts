import { Component, inject, Optional } from '@angular/core';
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
import { Result } from '../../../common/helpers/Result';
import { AddBlogAdminUseCase } from '../../../core/admin/application/add-blog-use-case';
import { AddBlogAdminDto } from '../../../core/admin/application/dto/add-blog-dto';
import { AuthLocalStorageService } from '../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { ValidatorService } from '../../shared/services/validator/validator.service';
import { Trainer } from '../../../core/trainer/domain/trainer.model';
import { ManyTrainersApiService } from '../../../core/trainer/infrastructure/services/many-trainer-api.service';
import { MatSelectModule } from '@angular/material/select';
import { DarkModeService } from '../../shared/services/dark-mode/dark-mode.service';
import { PopupInfoModalService } from '../../shared/services/popup-info-modal/popup-info-modal.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'add-blog-page',
    templateUrl: './add-blog.component.html',
    styleUrl: './add-blog.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,
      MatInputModule, MatIconModule,MatSelectModule]
})
export class AddBlogPageComponent {
    private categoryUseCaseService=inject(CategoyUseCaseProvider);
    private fb = inject(FormBuilder)
    public validatorService= inject(ValidatorService)
    public darkModeService = inject(DarkModeService);
    private popupService=inject(PopupInfoModalService)
    public errorUploadingImage="Error uploading the image"



    public categories:Category[]=[]
    public trainers:Trainer[]=[]
    public images:string[]=[]

    public addBlogForm :FormGroup<AddBlogForm>=this.fb.group<AddBlogForm>({
      title:new FormControl(null,{validators:[Validators.required]}),
      content:new FormControl(null,{validators:[Validators.required]}),
      category:new FormControl(null,{validators:[Validators.required]}),
      trainer:new FormControl(null,{validators:[Validators.required]}),
      tags:new FormControl(null,{validators:[Validators.required]}),
      images:new FormControl(null,{validators:[Validators.required]}),
    })

    showData(){
        if(this.addBlogForm.valid){
          let formData=this.addBlogForm.value
          let sendData:AddBlogAdminDto={
            trainerId: formData.trainer!.id,
            title: formData.title!,
            body: formData.content!,
            categoryId: formData.category!.id,
            tags: formData.tags!,
            images: this.images
          }
          this.sendUpdatePettition(sendData)
        }
    }

    private adminUseCase = new AddBlogAdminUseCase( new AuthLocalStorageService() )

    private async convertFileToBase64(event:any): Promise<any> {
      return new Promise((resolve, reject) => {
        try{
          const unsafeImg=window.URL.createObjectURL(event);
          const image=this.sanitizer.bypassSecurityTrustUrl(event);
          const reader = new FileReader();
          reader.readAsDataURL(event);
          reader.onload = () => {
            resolve({
              base:reader.result
            });
          };
          reader.onerror = (error) => {
            reject({
              base:null
            });
          };
        } catch(error){
          this.popupService.displayErrorModal(this.errorUploadingImage)
        }
      });
    }

    loadImage(event:any):void{
        let files:any = []
        for ( let i of event.target.files ) { files.push( i ) }
        const cleanedFiles:File[]=files
        let imagesBase64:string[]=[]

        cleanedFiles.forEach((file)=>{
          this.convertFileToBase64(file).then(imagen=>{
            imagesBase64.push(imagen.base)
            console.log(imagesBase64);

          })
        })
        this.images=imagesBase64
        this.addBlogForm.get('images')?.setValue(cleanedFiles)

        //if (!file) console.log('file nulo')
        //return this.popupService.displayErrorModal(this.errorUploadingUserImage)}
        // Validar Formato del Archivo
        //const isValidImageExtension = this.validatorService.vali.test(file.name);
    }

    private sendUpdatePettition(data:AddBlogAdminDto){
      this.adminUseCase.execute(data).subscribe({
        next:(value) => {
            console.log(value)
        },
        error:(error:Result<Error>)=>{
          this.popupService.displayErrorModal(error.getError().message)
        },
      })
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
