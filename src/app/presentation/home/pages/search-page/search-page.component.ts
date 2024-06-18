import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { BasicHeaderComponent } from '../../components/basic-header/basic-header.component';
import { ProgramsTagComponent } from '../../components/programs-tag/programs-tag.component';
import { IProgram } from '../../interfaces/ILittleCard';
import { FormsModule } from '@angular/forms';
import { SearchUsecaseProvider } from '../../../../core/search/infraestructure/providers/search-api-usecase-provider';
import { SearchModel, Body } from '../../../../core/search/domain/search-model';
import { finalize } from 'rxjs';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { PopularCoursesComponent } from './components/popular-courses/popular-courses.component';

interface ITag {
  id: number;
  name: string;
}

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterLink, BasicHeaderComponent, ProgramsTagComponent, MatExpansionModule , PopularCoursesComponent, TranslocoModule, FormsModule, MatTabsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  public inputSearch: string = '';
  public _tag: string[] = new Array<string>();
  public program: SearchModel = { blogs: [], courses: [] };
  public searchService = inject(SearchUsecaseProvider);
  public isLoading = false;  

  public categories: ITag[] = [
    { id: 1, name: 'Women' },
    { id: 2, name: 'Men' },
    { id: 3, name: 'Relaxing'},
    { id: 4, name: 'Challenging'},
    { id: 5, name: 'Daily Routine'},
    { id: 6, name: 'Energy'},
    { id: 7, name: 'Yoga'},
    { id: 8, name: 'Better Health'},
    { id: 9, name: 'Mind Relaxing'}
  ];

  constructor() { }

  getBySearch(): void {
    if(this.inputSearch.length === 0 && this._tag.length === 0) return;
    this.isLoading = true;
    let response =this.searchService.usecase.getBySearch(this.inputSearch, this._tag.map(item => item.toLowerCase()));
    console.log(response)
      if(response.isError()){
        alert(response.getError().message);
        this.isLoading = false;
        return;
      }
      response.getValue()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(data => this.program = data);
  }

  onTagClick(tag: string): void {
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

