import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedTrainersPageComponent } from './followed-trainers-page.component';

describe('FollowedTrainersPageComponent', () => {
  let component: FollowedTrainersPageComponent;
  let fixture: ComponentFixture<FollowedTrainersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowedTrainersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowedTrainersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
