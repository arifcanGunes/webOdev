import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketModule } from './basket/basket.module';
import { ProductDetayComponent } from './product-detay/product-detay.component';
import { ProductDetayModule } from './product-detay/product-detay.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BasketModule,
    ProductDetayModule,
    ProductsModule,
    HomeModule
  ]
})
export class ComponentsModule { }
