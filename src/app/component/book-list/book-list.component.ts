import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap"
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

 books: Book[] = [];
 currentCategoryId: number = 1;
 searchMode: boolean = false;
 previousCategory: number = 1;

 // new properties for server side paging
 currentPage: number = 1;
 pageSize: number = 5;
 totalRecords: number = 0;

 constructor(private _bookService: BookService,
             private _activatedRoute: ActivatedRoute,
             private _cartServive: CartService,
             private _spinnerService: NgxSpinnerService,
             _config: NgbPaginationConfig) {
               _config.maxSize = 3;
               _config.boundaryLinks = true;
              }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      data =>{this.listBooks();
      });
  }

  

 listBooks(){
// starts the spinner/loader
  this._spinnerService.show();
  
  this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
  if(this.searchMode){
    //Do Search Work
    this.handleSearchBooks();
  }else{
    //Display Books Base on Category
    this.handleListBooks();
  }
  
  }

  handleListBooks(){

const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
  if(hasCategoryId){
    this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
  }else{
    this.currentCategoryId= 1;   
  }

  //setting up the current page to 1
  //if user navigate to other category
  if(this.previousCategory != this.currentCategoryId){
    this.currentPage = 1;
  }

  this.previousCategory = this.currentCategoryId;

    this._bookService.getBooks(this.currentCategoryId,
                                this.currentPage - 1,
                                this.pageSize)
                                .subscribe(this.processPaginate());
  }

  handleSearchBooks(){
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._bookService.searchBooks(keyword,
                                  this.currentPage - 1,
                                  this.pageSize)
                                  .subscribe(this.processPaginate());
  }

  updatePageSize(pageSize: number){
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  processPaginate(){
    return data => {
      //setTimeout(() => {
        //stops the spinner/loader
      this._spinnerService.hide();

      this.books = data._embedded.books;
      //page number starts from index 1
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
     // }, 1000);
    }
  }
 
  addToCart(book: Book){
    console.log(`book name: ${book.name}, and price: ${book.unit_price}`);
    const cartItem = new CartItem(book);
    this._cartServive.addToCart(cartItem);
 }
  

}
