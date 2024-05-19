import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsTagComponent } from './programs-tag.component';

describe('ProgramsTagComponent', () => {
  let component: ProgramsTagComponent;
  let fixture: ComponentFixture<ProgramsTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramsTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramsTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
