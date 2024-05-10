import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicHeaderNotificationComponent } from './basic-header-notification.component';

describe('BasicHeaderNotificationComponent', () => {
  let component: BasicHeaderNotificationComponent;
  let fixture: ComponentFixture<BasicHeaderNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicHeaderNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicHeaderNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
