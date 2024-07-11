import { Component } from '@angular/core';
import { AllTrainersComponent } from './components/all-trainers/all-trainers.component';
import { BasicHeaderComponent } from '../../components/basic-header/basic-header.component';
import { FollowedTrainersComponent } from "./components/followed-trainers/followed-trainers.component";

@Component({
  selector: 'app-followed-trainers-page',
  standalone: true,
  imports: [
    AllTrainersComponent,
    FollowedTrainersPageComponent,
    BasicHeaderComponent,
    FollowedTrainersComponent
],
  templateUrl: './followed-trainers-page.component.html',
  styleUrl: './followed-trainers-page.component.css'
})
export class FollowedTrainersPageComponent {

}
