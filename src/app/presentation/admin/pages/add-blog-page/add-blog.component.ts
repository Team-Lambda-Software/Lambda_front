import { Component, inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CategoyUseCaseProvider } from '../../../../core/categories/infrastructure/providers/category-usecase-provider';
import { ValidatorService } from '../../../shared/services/validator/validator.service';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { PopupInfoModalService } from '../../../shared/services/popup-info-modal/popup-info-modal.service';
import { FileService } from '../../../shared/services/file/file.service';
import { Category } from '../../../../core/categories/domain/category.model';
import { Trainer } from '../../../../core/trainer/domain/trainer.model';
import { AddBlogForm } from '../../interfaces/add-blog-form-interface';
import { AddBlogAdminDto } from '../../../../core/admin/application/dto/add-blog-dto';
import { AddBlogAdminUseCase } from '../../../../core/admin/application/add-blog-use-case';
import { AuthLocalStorageService } from '../../../../core/shared/infraestructure/local-storage/auth-local-storage.service';
import { Result } from '../../../../common/helpers/Result';
import { TrainerGetManyProvider } from '../../../../core/trainer/infrastructure/providers/trainer-get-many.service';
import { LoaderComponent } from '../../../auth/components/loader/loader.component';


@Component({
    selector: 'add-blog-page',
    templateUrl: './add-blog.component.html',
    styleUrl: './add-blog.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,
      MatInputModule, MatIconModule,MatSelectModule,LoaderComponent]
})
export class AddBlogPageComponent {
    private categoryUseCaseService=inject(CategoyUseCaseProvider);
    private fb = inject(FormBuilder)
    public validatorService= inject(ValidatorService)
    public darkModeService = inject(DarkModeService);
    private popupService=inject(PopupInfoModalService)
    private fileService=inject(FileService)
    private trainerMany = inject(TrainerGetManyProvider)
    public BlogCreatedSucsessfully='The blog was created sucessfully'
    public BlogCreatedError='Something went wrong creating the blog, please try again'
    public errorUploadingImage="Error uploading the image"

    public isLoadingAddCourse=false
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
      this.isLoadingAddCourse=true
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
          this.sendAddBlog(sendData)
        }
    }

    private adminUseCase = new AddBlogAdminUseCase( new AuthLocalStorageService() )


    loadImage(event:any):void{
        let files:any = []
        for ( let i of event.target.files ) { files.push( i ) }
        const cleanedFiles:File[]=files
        let imagesBase64:string[]=[]

        cleanedFiles.forEach((file)=>{
          this.fileService.convertFileToBase64(file).then(imagen=>{
            imagesBase64.push(imagen.model)
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

    private sendAddBlog(data:AddBlogAdminDto){
      this.adminUseCase.execute(data).subscribe({
        next:(value) => {
          this.popupService.displayInfoModal(this.BlogCreatedSucsessfully)
            this.isLoadingAddCourse=false
        },
        error:(error:Result<Error>)=>{
          this.isLoadingAddCourse=false
          this.popupService.displayErrorModal(this.BlogCreatedError)
        },
      })
    }

    constructor(){
        this.categoryUseCaseService.usecase.getByParams('').subscribe({
            next:(value)=>{ this.categories=value }
        })
        this.trainerMany.usecase.execute('?page=1&perPage=5').subscribe({
          next:(value)=>{ if(!value.isError())this.trainers=value.getValue()
            else this.popupService.displayErrorModal(value.getError().message)
          },
          error:(error:Result<Error>)=>{ this.popupService.displayErrorModal(error.getError().message)}
      })

    }

}
