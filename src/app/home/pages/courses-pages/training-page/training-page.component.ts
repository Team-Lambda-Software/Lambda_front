import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';


interface IPopularCourse {
  id: number;
  teacher: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-training-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './training-page.component.html',
  styleUrl: './training-page.component.css'
})
export class TrainingPageComponent {
  
  public levels: string[] = ['Master', 'Skilled', 'Beginner'];
  public selectedLevel: string = 'Master';
  public popularCourses: IPopularCourse[] = [
    { id: 1, teacher: 'Eduardo', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
    { id: 2, teacher: 'Paul', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
    { id: 3, teacher: 'Alfredo', category: 'Prenatal' , image: 'https://via.placeholder.com/250' },
]

  constructor(private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      if(params['level']) {
        this.setSelectedLevel(params['level']);
      }
    });
  }

  onLevelSelected(level: string) {
    // console.log('Level selected: ', level);
    this.router.navigate([] ,{queryParams: {level: level}, queryParamsHandling: 'merge'});
    this.setSelectedLevel(level);
  }

  setSelectedLevel(level: string) {
    this.selectedLevel = level;
  }
}
