import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

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
  templateUrl: './onboarding-page.component.html',
  styleUrl: './onboarding-page.component.css'
})
export class OnboardingPageComponent {

  private router = inject(Router);

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
    console.log(this.currentStep)
    if ( this.currentStep + 1 < this.steps.length )
      this.selectedStep = this.steps.at(++this.currentStep)!
    else {
      this.router.navigate(['/home'])
    }
  }

  skipSteps() {
    this.router.navigate(['/home']);
  }

}
