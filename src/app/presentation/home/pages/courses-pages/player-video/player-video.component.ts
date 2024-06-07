import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute,RouterLink } from '@angular/router';
import { BasicHeaderComponent } from '../../../components/basic-header/basic-header.component';
import { Lesson } from '../../../../../core/course/domain/course.model';

interface PlayerOptions {
  redirect?: string;
  title: string;
  content: string;
  videoUrl: string;
}

@Component({
  selector: 'app-player-video',
  standalone: true,
  imports: [RouterLink, BasicHeaderComponent],
  templateUrl: './player-video.component.html',
  styleUrl: './player-video.component.css'
})
export class PlayerVideoComponent {
  lesson: Lesson | undefined;
  courseId: string | undefined;
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.lesson = this.router.getCurrentNavigation()?.extras?.state?.['lesson'];
    this.courseId = this.router.getCurrentNavigation()?.extras?.state?.['courseId'];
    if (!this.lesson && this.courseId) {
      this.router.navigate(['/home/main-course'], { queryParams: { id: this.courseId } });
    } else if (!this.lesson) {
      this.router.navigate(['/home']);
    }
    console.log(this.lesson);
    console.log(this.courseId);
    
  }
}
