import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { BasicHeaderComponent } from '../../components/basic-header/basic-header.component';
import { ProgramsTagComponent } from '../../components/programs-tag/programs-tag.component';
import { IProgram } from '../../interfaces/ILittleCard';
import { FormsModule } from '@angular/forms';
import { SearchUseCaseProvider } from '../../../../core/search/infraestructure/providers/search-api-usecase-provider';
import { SearchModel, Body } from '../../../../core/search/domain/search-model';
import { finalize } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { PopularCoursesComponent } from './components/popular-courses/popular-courses.component';
import { TagsApiUseCaseProvider } from '../../../../core/search/infraestructure/providers/tags-api-usecase-provider';
import { ITag } from '../../../../core/search/domain/tags-model';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterLink, BasicHeaderComponent, ProgramsTagComponent, MatExpansionModule , PopularCoursesComponent, TranslocoModule, FormsModule, MatTabsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  public searchService = inject(SearchUseCaseProvider);
  public tagsService = inject(TagsApiUseCaseProvider);

  public _tag: ITag[] = new Array<ITag>();
  public categories: ITag[] = new Array<ITag>();
  public isLoadingTags = false;
  
  public inputSearch: string = '';
  public program: SearchModel = { blogs: [], courses: [] };
  public isLoading = false;  


  constructor() {
    this.getTags();
   }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();
  }

  getBySearch(): void {
    if(this.inputSearch.length === 0 && this._tag.length === 0) return;
    this.isLoading = true;
    let response =this.searchService.usecase.getBySearch(this.inputSearch, this._tag.map(item => item.name.toLowerCase()));
      if(response.isError()){
        alert(response.getError().message);
        this.isLoading = false;
        return;
      }
      response.getValue()
      .pipe(
        finalize(() => {
          this.isLoading = false
        })
      )
      .subscribe(data => this.program = data);
  }

  getTags(): void {
    this.isLoadingTags = true;
    let req = this.tagsService.usecase.execute('?page=1&perPage=10');
    req.pipe(
        finalize(() => this.isLoadingTags = false)
      )
      .subscribe(data => {
        if(data.isError()){
          alert(data.getError().message);
          return;
        }
        data.getValue().forEach(item => {
          this.categories.push(item);
        });
        console.log(this.categories[0].name);
        
      })
  }
  

  onTagClick(tag: ITag): void {
      if(this._tag.includes(tag)){
        this._tag = this._tag.filter(item => item !== tag);
      }else{
        this._tag.push(tag);
      }
      this.getBySearch();
  }

    adaptToTag(data: Body[]): IProgram[]{
      let res = data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          thumbnail: item.image,
          description: item.trainer,
          level: new Date(item.date).toLocaleDateString()
        }}
      )
      return res;
  }
}

