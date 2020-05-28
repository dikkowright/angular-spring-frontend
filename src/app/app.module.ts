import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';

import { AppComponent } from './app.component';
import { BookListComponent } from './component/book-list/book-list.component';
import { from } from 'rxjs';
import { BookService } from './services/book.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { SearchComponent } from './components/search/search.component';
import { BookDeatailsComponent } from './components/book-deatails/book-deatails.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component'


const routes: Routes = [
{path: 'book/:id', component: BookDeatailsComponent},
{path: 'cart-details', component: CartDetailsComponent}, 
{path: 'book', component: BookListComponent},
{path: 'search/:keyword', component: BookListComponent},
{path: 'category/:id',component: BookListComponent},
{path: '', redirectTo: '/book',  pathMatch:'full'},
{path: '**', component: PageNotFoundComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    SearchComponent,
    BookDeatailsComponent,
    CartStatusComponent,
    CartDetailsComponent
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule.forRoot(routes)
   
    
 ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
