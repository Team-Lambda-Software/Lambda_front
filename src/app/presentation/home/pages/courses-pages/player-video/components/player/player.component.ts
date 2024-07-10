import { Component, ElementRef, Input, Signal, ViewChild, effect, inject, OnDestroy } from '@angular/core';
import { ProgressCourseUseCaseProvider } from '../../../../../../../core/progress/infraestructure/providers/progress-course-usecase.provider';
import { ProgressCourse } from '../../../../../../../core/progress/application/interfaces/dto/progress-course.interface';
import { fromEvent, interval, Subscription } from 'rxjs';
import { SaveProgressUseCaseProvider } from '../../../../../../../core/progress/infraestructure/providers/save-progress-usecase.provider';
import { PopupInfoModalService } from '../../../../../../shared/services/popup-info-modal/popup-info-modal.service';
import { TranslocoModule } from '@jsverse/transloco';

export interface SectionProperties {
  idCourse: string,
  idLesson: string,
  video: string,
  indexLesson: number
}

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  @Input({required: true}) _properties!: Signal<SectionProperties>
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;


  private popupService=inject(PopupInfoModalService)

  public progressUseCaseService = inject(ProgressCourseUseCaseProvider);
  public saveProgressUseCaseService = inject(SaveProgressUseCaseProvider);
  private intervalId!: Subscription;
  public videoEnded = false;
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
    this.videoEnded = false;
    this.savedProgress = false;
  }

  constructor() {
    effect(() => {
      console.log('Cambiando de video');
      console.log(this._properties());
      
      this.videoEnded = false;
      this.savedProgress = false;
      
      this.getProgress(this._properties().idCourse);
    })
  }

  saveProgress(): void {
    if (!this.videoPlayer || !this.videoPlayer.nativeElement || this.savedProgress) {
      return;
    }

    if (!this.videoPlayer.nativeElement.paused) {
      
        const videoDuration = this.getVideoDurationInSec()
        if (typeof videoDuration !== 'number' || isNaN(videoDuration)) return;

        console.log(`Duración del video: ${Math.floor(videoDuration)} segundos`);

        const currentTime = this.getCurrentTimeInSec()

        if (typeof currentTime !== 'number' || isNaN(currentTime)) return;

        console.log(`Tiempo actual del video: ${currentTime} segundos`);

        console.log('Video finalizado??: ', this.videoEnded);
        console.log('Progreso guardado??: ', this.savedProgress);

        console.log('Antes de guardar progreso');
        console.log(`${this._properties().toString()} - ${currentTime}:time - ${this.videoEnded}:videoEnded`);
        
        
        
        
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
            this.videoEnded ? this.savedProgress = true : this.savedProgress = false;
            console.log('Progreso guardado correctamente');
            console.log();
            
          }
        
        })
      
    }
  }

  async getProgress(id: string) {
    let req = await this.progressUseCaseService.usecase.execute(id);

    console.log(this._properties());
    
    
      req.subscribe( res=> {
        if (res.isError()){
          this.popupService.displayErrorModal(res.getError().message)
        }else{
          this.videoEnded = false;
          const progressCourse = res.getValue() as ProgressCourse;

          const lesson = progressCourse.lessons.find(lesson => lesson.lessonId === this._properties().idLesson)
          if(lesson){
            if(lesson.percent === 100) {
              console.log('La lección ya está completada');
              this.videoEnded = true
              this.savedProgress = true
            };
            console.log(`La lección ${lesson.lessonId} tiene un progreso de ${lesson.time} segundos`);
            
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

  private getCurrentTimeInSec(): number {
    if (!this.videoPlayer || !this.videoPlayer.nativeElement) {
      return 0;
    }

    let sec = this.videoPlayer.nativeElement.currentTime;

    return Math.floor(sec);
  }

  setVideoStartTime(seconds: number) {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoUrl = this._properties().video;

      if(this.videoUrl){
        
        this.videoPlayer.nativeElement.load();
        this.videoPlayer.nativeElement.currentTime = seconds;
        this.videoPlayer.nativeElement.play();
      }
    }
  }

  markAsCompleted() {
    console.log('Marcando como completado');

    this.videoEnded = true;
    this.saveProgress();
  }

}
