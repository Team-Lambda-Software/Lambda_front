import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { CarruselBgImgComponent } from '../../components/carrusel-bg-img/carrusel-bg-img.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { ILittleCard } from '../../interfaces/ILittleCard';
import { CoursesByUserProgressToILittleCard } from '../../adapters/LitleCardAdapter';
import { CoursesMyTrainingService } from '../../services/courses/getTraining/courses-mytraining.service';
import { IUserProfile } from '../../interfaces/user-info-model';
import { UserInfoService } from '../../services/user/getUserInfo/user-info.service';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { ProgressByUserUseCaseProvider } from '../../../../core/progress/infraestructure/providers/progress-by-user-usecase.provider';
import { finalize } from 'rxjs';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { SquareSkeletonComponent } from '../../../shared/components/square-skeleton/square-skeleton.component';


@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css',
    standalone: true,
    imports: [
      RouterLink,
      CommonModule,
      CarruselBgImgComponent,
      TranslocoModule,
      NgxChartsModule,
      HeaderCardComponent,
      SquareSkeletonComponent
    ]
})
export class ProfilePageComponent implements OnInit{

  public myTrainingService = inject(CoursesMyTrainingService);
  public userInfoProfile =inject(UserInfoService);
  public userStatusService = inject(UserStatusService)
  public user = this.userStatusService.currentUser();
  public progressService = inject(ProgressByUserUseCaseProvider)

  public currentPage = 1;
  public courses = signal<ILittleCard[]>([]);
  public isLoading = signal(false);
  public isLoadingMoreCourses = signal(false);
  // private snackbar = inject(MatSnackBar);
  public isErrorCourses = signal(false);

  public progressValue = 50;

  public chartDataStatistics = [
    {
      name: 'Mon',
      value: 100
    },
    {
      name: 'Tue',
      value: 200
    },
    {
      name: 'Wed',
      value: 150
    },
    {
      name: 'Thu',
      value: 300
    },
    {
      name: 'Fri',
      value: 250
    },
    {
      name: 'Sat',
      value: 180
    },
    {
      name: 'Sun',
      value: 220
    }
  ];

  public isDarkMode!: boolean;

  public ColorSchemeBar: Color = {
    name: 'myLightScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#27AE60']
  };


  public lightColorSchemeStatistics: Color = {
    name: 'myLightScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#4F14A0', '#27AE60']
  };

  public darkColorSchemeStatistics: Color = {
    name: 'myDarkScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FFFFFF', '#27AE60']
  };

  constructor(private darkModeService: DarkModeService) {
    this.isDarkMode = this.darkModeService.isDarkMode();
  }


  ngOnInit(): void {
    this.getMyTraining();
  }

  public getMyTraining() {
    if(this.currentPage === 1) this.isLoading.set(true);
    else this.isLoadingMoreCourses.set(true);
    this.progressService.usecase
      .execute(`?perPage=3&page=${this.currentPage}`)
      .pipe(finalize(() => {
        this.isLoading.set(false)
        this.isLoadingMoreCourses.set(false)
        this.currentPage++;
      }))
      .subscribe((result) => {
        if(result.isError()) {
          this.isErrorCourses.set(true);
          //this.snackbar.open(result.getError().message, 'Cerrar');
        } else {
          let courses = result.getValue();
          this.courses.set([
            ...this.courses(),
            ...courses.map(c => CoursesByUserProgressToILittleCard(c))
          ]);
        }
      })
  }

  public getUserInfoProfile(): IUserProfile {
    let infoProfile = this.userInfoProfile.getUserInfoProfile();
    return infoProfile;
  }

  get colorSchemeStatistics(): Color {
    return this.isDarkMode ? this.darkColorSchemeStatistics : this.lightColorSchemeStatistics;
  }

  onBarSelect(event: any) {
    console.log(event);
  }
}
