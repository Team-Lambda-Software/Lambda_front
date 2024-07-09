import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AddBlogForm } from './components/add-blog-form-interface';

@Component({
    selector: 'add-blog-page',
    templateUrl: './add-blog.component.html',
    styleUrl: './add-blog.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule]
})
export class AddBlogPageComponent {
    private fb = inject(FormBuilder)
    
    public groupForm :FormGroup<AddBlogForm> = this.fb.group<AddBlogForm>({
        titulo:new FormControl('', {nonNullable:true, validators:[]}),
        contenido:new FormControl('', {nonNullable:true, validators:[]}),
        categoria:new FormControl('', {nonNullable:true, validators:[]}),
        entrenador:new FormControl('', {nonNullable:true, validators:[]}),
        etiquetas:new FormControl('', {nonNullable:true, validators:[]})
      }, {
        validators:[]
    })

    showData(){
        console.log( this.groupForm.value )
    }

}
