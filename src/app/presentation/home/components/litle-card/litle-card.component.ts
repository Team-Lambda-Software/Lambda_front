import { Component, Input } from '@angular/core';
import { ILittleCard } from '../../interfaces/ILittleCard';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-litle-card',
  standalone: true,
  imports: [NgStyle, RouterLink],
  templateUrl: './litle-card.component.html',
  styleUrl: './litle-card.component.css'
})
export class LitleCardComponent {

  @Input({ required: true }) public item!: ILittleCard;
  @Input({ required: true }) public route!: string;

  fixTrainerRoute(): string {
    return this.route.includes('trainer') ? `${this.route}/${this.item.id}` : this.route;
  }
}
