import { Component, Input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { IProgram } from '../../interfaces/ILittleCard';


@Component({
  selector: 'app-programs-tag',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './programs-tag.component.html',
  styleUrl: './programs-tag.component.css'
})
export class ProgramsTagComponent {

  @Input({ required: true }) public programs!: IProgram[]

  constructor() {}
}
