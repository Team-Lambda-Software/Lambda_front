import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionExpandedComponent } from './section-expanded.component';

describe('SectionExpandedComponent', () => {
  let component: SectionExpandedComponent;
  let fixture: ComponentFixture<SectionExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionExpandedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
