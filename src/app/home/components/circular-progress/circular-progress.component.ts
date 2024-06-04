import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-circular-progress',
  standalone: true,
  imports: [],
  templateUrl: './circular-progress.component.html',
  styleUrl: './circular-progress.component.css',

})
export class CircularProgressComponent {

  @Input() progress: number = 0;

 getCircumference(): number {
    return 2 * Math.PI * 40; 
 }

 getStrokeDashoffset(): number {
    return this.getCircumference() - (this.progress / 100) * this.getCircumference();
 }
}
