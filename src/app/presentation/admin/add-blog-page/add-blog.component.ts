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

@Component({
    selector: 'add-blog-page',
    templateUrl: './add-blog.component.html',
    styleUrl: './add-blog.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,
      MatInputModule, MatIconModule]
})
export class AddBlogPageComponent {
    private categoryUseCaseService=inject(CategoyUseCaseProvider);

    public categories:Category[]=[]
    public trainers:Trainer[]=[]

    private titleBlog = ''
    private bodyBlog = ''
    private tagsBlog = ''
    public trainerBlog = { id: 'null', name: 'Trainer' }
    public categoryBlog = { id: 'null', name: 'Category', icon: "string" }
    public TitleOnChange = (event:any) => this.titleBlog = event.target.value
    public BodyOnChange = (event:any) => this.bodyBlog = event.target.value
    public TagsOnChange = (event:any) => this.tagsBlog = event.target.value
    public loadCategory(event:any) { this.categoryBlog = event }
    public loadTrainer(event:any) { this.trainerBlog = event }
    public showCategory() { return this.categoryBlog.name }
    public showTrainer() { return this.trainerBlog.name }
    
    showData(){
        console.log( this.createDTO() )        
    }
    
    private adminUseCase = new AddBlogAdminUseCase( new AuthLocalStorageService() )
    public validatorService= inject(ValidatorService);
    public fileToUpload=[]

    private createDTO(): AddBlogAdminDto {
        let data:AddBlogAdminDto = {    
            images: this.fileToUpload,
            title: this.titleBlog,
            body: this.bodyBlog,
            tags: this.tagsBlog.split(','),
            categoryId: this.categoryBlog.id,
            trainerId: this.trainerBlog.id
        }
        return data
    }
  
    loadImage(event:any){
        let files:any = []
        for ( let i of event.target.files ) { files.push( i ) }
        this.fileToUpload = files
        //if (!file) console.log('file nulo')
        //return this.popupService.displayErrorModal(this.errorUploadingUserImage)}
        // Validar Formato del Archivo
        //const isValidImageExtension = this.validatorService.vali.test(file.name);
    }
  
    private sendUpdatePettition(){
      this.adminUseCase.execute( this.createDTO() ).subscribe({
        next:(value) => {
            console.log(value)
        },
        error:(error:Result<Error>)=>{
          //this.popupService.displayErrorModal(error.getError().message)
        },
      })
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
