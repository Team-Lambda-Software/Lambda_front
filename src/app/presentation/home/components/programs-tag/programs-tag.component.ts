import { Component, Input } from '@angular/core';
import { RouterLink  } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { IProgram } from '../../interfaces/ILittleCard';


@Component({
  selector: 'app-programs-tag',
  standalone: true,
  imports: [TranslocoModule, RouterLink],
  templateUrl: './programs-tag.component.html',
  styleUrl: './programs-tag.component.css'
})
export class ProgramsTagComponent {

  @Input({ required: true }) public programs!: IProgram[];
  @Input({ required: false }) public redirect?: string;

  constructor() {}
}
