import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Basket } from 'src/app/models/basket';
import { ImageResponse } from 'src/app/models/image';
import { ListComment } from 'src/app/models/list_comment';
import { ListProduct } from 'src/app/models/list_product';

@Component({
  selector: 'app-product-detay',
  templateUrl: './product-detay.component.html',
  styleUrls: ['./product-detay.component.scss']
})
export class ProductDetayComponent implements OnInit{
  id: number = 1;
  comment: string;
  customerName: string = "Arif Can Güneş";
  productUrl: string = 'https://localhost:7231/api/products/getproductbyid?id=';
  imagesUrl: string = 'https://localhost:7231/api/productImages/getbyproductid?id=';
  commentsUrl : string = 'https://localhost:7231/api/comments/getbyproductid?productId=';
  basePath :string = 'https://localhost:7231/Uploads/Images/';
  product: ListProduct;
  images: ImageResponse[] = [];
  comments: ListComment[] = [];
  basket: Basket[] = [];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { 
  }
  ngOnInit(): void {
    this.getId();
    this.getProductDetailById(this.id);
    this.getProductImages(this.id);
    this.getProductComments(this.id);
  }

  getComment(val: string){
    console.log(val);
    this.comment = val;
  }
  
  getProductDetailById(id: number){
    this.httpClient.get<ListProduct>(`${this.productUrl}${id}`).subscribe({
      next: (product) => {
        this.product = product;
      }
    })
  }

  getProductImages(id: number){
    this.httpClient.get<ImageResponse[]>(`${this.imagesUrl}${id}`).subscribe({
      next: (images) =>{
        this.images = images;
      }
    })
  }

  getProductComments(id: number){
    this.httpClient.get<ListComment[]>(`${this.commentsUrl}${id}`).subscribe({
      next: (comments)=>{
        this.comments = comments;
      }
    })
  }

  getId(){
      this.route.fragment
    .pipe(
      map(fragment => new URLSearchParams(fragment)),
      map(params => ({
        id: params.get('productId'),
      }))
    )
    .subscribe(res => {
      this.id = parseInt(res.id);
    });
  }

  addBasket(id: number){
    if(localStorage.getItem("basket") !== null){
        this.basket = JSON.parse(localStorage.getItem("basket"));
    }
    this.basket.push({"productId": id, "ammount": 1});
    localStorage.setItem("basket",JSON.stringify(this.basket));
  }

  addComment(id: number = this.id, name: string = this.customerName, commentInside: string = this.comment){
    this.httpClient.post("https://localhost:7231/api/comments/add", { "productId": id , "customerName" : name, "commentInside": commentInside}).subscribe(reload =>{
      window.location.reload();
    });
  }
  
}
