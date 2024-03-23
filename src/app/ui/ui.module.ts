import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetayComponent } from './components/product-detay/product-detay.component';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [
    ProductDetayComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class UiModule { }
