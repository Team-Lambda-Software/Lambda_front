import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerVideoComponent } from './player-video.component';

describe('PlayerVideoComponent', () => {
  let component: PlayerVideoComponent;
  let fixture: ComponentFixture<PlayerVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
