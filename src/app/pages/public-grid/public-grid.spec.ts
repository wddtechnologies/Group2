import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicGridComponent } from './public-grid';

describe('PublicGrid', () => {
  let component: PublicGridComponent;
  let fixture: ComponentFixture<PublicGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicGridComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
