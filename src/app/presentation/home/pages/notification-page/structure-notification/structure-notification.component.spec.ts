import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureNotificationComponent } from './structure-notification.component';

describe('StructureNotificationComponent', () => {
  let component: StructureNotificationComponent;
  let fixture: ComponentFixture<StructureNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructureNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructureNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
