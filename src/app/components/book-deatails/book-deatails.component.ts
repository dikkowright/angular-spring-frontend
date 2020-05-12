import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-deatails',
  templateUrl: './book-deatails.component.html',
  styleUrls: ['./book-deatails.component.css']
})
export class BookDeatailsComponent implements OnInit {

  book: Book = new Book();
  constructor(private _activatedRoute: ActivatedRoute,
              private _bookService: BookService,) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      ()=>{
        this.getBokkInfo();
      }
    )
  }

  getBokkInfo(){

   const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
              this._bookService.get(id).subscribe(
                data =>{
                  this.book = data;
                } 
              )
         
              }   
         
       

}
