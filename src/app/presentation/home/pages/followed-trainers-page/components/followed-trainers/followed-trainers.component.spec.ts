import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedTrainersComponent } from './followed-trainers.component';

describe('FollowedTrainersComponent', () => {
  let component: FollowedTrainersComponent;
  let fixture: ComponentFixture<FollowedTrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowedTrainersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowedTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
