import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselBgImgComponent } from './carrusel-bg-img.component';

describe('CarruselBgImgComponent', () => {
  let component: CarruselBgImgComponent;
  let fixture: ComponentFixture<CarruselBgImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarruselBgImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarruselBgImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
