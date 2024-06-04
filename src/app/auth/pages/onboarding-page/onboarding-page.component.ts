import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { simpleAnimation } from './animations/simpleAnimation';

interface OnboardingSteps {
  img: string;
  title: string;
  subTitle: string;
  description: string;
}

@Component({
  selector: 'app-onboarding-page',
  standalone: true,
  imports: [NgClass],
  animations: [simpleAnimation],
  templateUrl: './onboarding-page.component.html',
  styleUrl: './onboarding-page.component.css'
})
export class OnboardingPageComponent {

  private router = inject(Router);
  public animationState = false;
  public steps : OnboardingSteps[] = [
    {
      img: 'on-boarding-yoga.png',
      title: 'Yoga',
      subTitle: 'Daily Yoga',
      description: 'Do your practice of physical exercise and relaxation make healthy'
    },
    {
      img: 'on-boarding-meditation.png',
      title: 'Meditation',
      subTitle: 'Yoga Classes',
      description: 'Meditation is the key to productivity, happiness & longevity'
    },
    {
      img: 'on-boarding-meets.png',
      title: 'Meets',
      subTitle: 'Community',
      description: 'Do your practice of physical exercise and relaxation make healthy'
    },
  ]

  public currentStep = 0;
  public selectedStep = this.steps.at(this.currentStep)!

  nextStep() {
    if ( this.currentStep + 1 < this.steps.length ) {
      this.selectedStep = this.steps.at(++this.currentStep)!
      this.toggleAnimation();
    }
    else {
      this.router.navigate(['/home'])
    }
  }

  skipSteps() {
    this.router.navigate(['/home']);
  }

  toggleAnimation() {
    this.animationState = !this.animationState
  }

}
