import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongPageComponent } from './wrong-page.component';

describe('WrongPageComponent', () => {
  let component: WrongPageComponent;
  let fixture: ComponentFixture<WrongPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrongPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
