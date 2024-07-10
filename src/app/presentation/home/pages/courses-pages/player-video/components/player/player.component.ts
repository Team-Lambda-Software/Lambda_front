import { Component, ElementRef, Input, Signal, ViewChild, effect, inject, OnDestroy } from '@angular/core';
import { ProgressCourseUseCaseProvider } from '../../../../../../../core/progress/infraestructure/providers/progress-course-usecase.provider';
import { ProgressCourse } from '../../../../../../../core/progress/application/interfaces/dto/progress-course.interface';
import { fromEvent, interval, Subscription } from 'rxjs';
import { SaveProgressUseCaseProvider } from '../../../../../../../core/progress/infraestructure/providers/save-progress-usecase.provider';
import { PopupInfoModalService } from '../../../../../../shared/services/popup-info-modal/popup-info-modal.service';

export interface SectionProperties {
  idCourse: string,
  idLesson: string,
  indexLesson: number
}

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  @Input({required: true}) _inputVideo!: Signal<string>
  @Input({required: true}) _properties!: Signal<SectionProperties>
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;


  private popupService=inject(PopupInfoModalService)

  public progressUseCaseService = inject(ProgressCourseUseCaseProvider);
  public saveProgressUseCaseService = inject(SaveProgressUseCaseProvider);
  private intervalId!: Subscription;
  private videoEnded = false;
  private savedProgress = false;

  public videoUrl : string = ''
  

  ngOnInit(){
    this.intervalId = interval(10000).subscribe(() => this.saveProgress())

    this.getProgress(this._properties().idCourse);
  }

  ngAfterViewInit() {
    fromEvent(this.videoPlayer.nativeElement, 'ended').subscribe(() => {
      console.log('El video ha finalizado');
      this.videoEnded = true;
      this.saveProgress();
      // Opcional: realizar otras acciones
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      this.intervalId.unsubscribe(); // Use unsubscribe to cancel the subscription
    }
  }

  constructor() {
    effect(() => {
      console.log('Cambiando de video');
      this.savedProgress = false;
      this.videoEnded = false;
      this.getProgress(this._properties().idCourse);
    })
  }

  saveProgress(): void {
    if (!this.videoPlayer || !this.videoPlayer.nativeElement) {
      return;
    }

    if (!this.videoPlayer.nativeElement.paused || (!this.savedProgress && this.videoEnded)) {
    
      const videoElement = this.videoPlayer.nativeElement;
      const videoDuration = videoElement.duration;
      console.log(`Duración del video: ${Math.floor(videoDuration)} segundos`);

      const currentTime = videoElement.currentTime;
      console.log(`Tiempo actual del video: ${Math.floor(currentTime)} segundos`);

      console.log('Video finalizado??: ', this.videoEnded);
      
      console.log(`Guardando progreso del curso ${this._properties().idCourse} y lección ${this._properties().idLesson}`);

      this.saveProgressUseCaseService.usecase.execute({
        courseId: this._properties().idCourse,
        lessonId: this._properties().idLesson,
        time: Math.floor(currentTime),
        markAsCompleted: this.videoEnded,
        totalTime: Math.floor(videoDuration)
      }).subscribe( result => {
        if (result.isError()){
          console.log(result.getError().message);
        }else{
          console.log('Progreso guardado correctamente');
          this.videoEnded ? this.savedProgress = true : this.savedProgress = false;
        }
      
      })
    }
  }

  async getProgress(id: string) {
    let req = await this.progressUseCaseService.usecase.execute(id);
    
      req.subscribe( res=> {
        if (res.isError()){
          this.popupService.displayErrorModal(res.getError().message)
        }else{
          const progressCourse = res.getValue() as ProgressCourse;

          progressCourse.percent === 100 ? this.savedProgress = true : this.savedProgress = false;

          const lesson = progressCourse.lessons.find(lesson => lesson.lessonId == this._properties().idLesson)
          if(lesson){
            console.log(`La lección ${lesson.lessonId} tiene un progreso de ${lesson.time} segundos`);
            if (lesson.time === this.getVideoDurationInSec()) this.videoEnded = true;
            this.setVideoStartTime(lesson.time)
          }
        }

      })
  }

  private getVideoDurationInSec(): number {
    if (!this.videoPlayer || !this.videoPlayer.nativeElement) {
      return 0;
    }

    let sec = this.videoPlayer.nativeElement.duration;

    return Math.floor(sec);
  }

  setVideoStartTime(seconds: number) {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoUrl = this._inputVideo()

      if(this.videoUrl){
        this.videoPlayer.nativeElement.load();

        this.videoPlayer.nativeElement.currentTime = seconds;
        this.videoPlayer.nativeElement.play();
      }
    }
  }

}
