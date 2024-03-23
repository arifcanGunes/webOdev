import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetayComponent } from './product-detay.component';

describe('ProductDetayComponent', () => {
  let component: ProductDetayComponent;
  let fixture: ComponentFixture<ProductDetayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetayComponent]
    });
    fixture = TestBed.createComponent(ProductDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
