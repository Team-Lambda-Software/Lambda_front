import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCarruselComponent } from './card-carrusel.component';

describe('CardCarruselComponent', () => {
  let component: CardCarruselComponent;
  let fixture: ComponentFixture<CardCarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCarruselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
