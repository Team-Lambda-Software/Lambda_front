import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitleCardComponent } from './litle-card.component';

describe('LitleCardComponent', () => {
  let component: LitleCardComponent;
  let fixture: ComponentFixture<LitleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LitleCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LitleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
