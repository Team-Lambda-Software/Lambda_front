import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { CarruselBgImgComponent } from '../../components/carrusel-bg-img/carrusel-bg-img.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DarkModeService } from '../../../shared/services/dark-mode/dark-mode.service';
import { ILittleCard } from '../../interfaces/ILittleCard';
import { CourseLitleCardAdapter } from '../../adapters/LitleCardAdapter';
import { CoursesMyTrainingService } from '../../services/courses/getTraining/courses-mytraining.service';
import { IUserProfile } from '../../interfaces/user-info-model';
import { UserInfoService } from '../../services/user/getUserInfo/user-info.service';
import { UserStatusService } from '../../../../core/user/infraestructure/services/user-status.service';


@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css',
    standalone: true,
    imports: [RouterLink, CommonModule, CarruselBgImgComponent, TranslocoModule, NgxChartsModule]
})
export class ProfilePageComponent {

  public myTrainingService = inject(CoursesMyTrainingService);
  public userInfoProfile =inject(UserInfoService);
  public userStatusService = inject(UserStatusService)
  public user = this.userStatusService.currentUser();


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


  public getMyTraining(): ILittleCard[] {
    let popular= this.myTrainingService.getMyTraining();
    return popular.map((course) => CourseLitleCardAdapter(course));
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
