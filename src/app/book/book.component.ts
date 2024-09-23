import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { generate } from 'rxjs';
import { randomInt } from 'crypto';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  newBookTitle : string = "";
  newAuthor : string = "";

  books: Book[] = []
  
  // for everything related to loading data / data that should get loaded when the component gets created
  ngOnInit(): void {
    let savedBooks = localStorage.getItem("books")

    this.books = savedBooks ? JSON.parse(savedBooks) : []
  }

  addBook() {
    // checks if these values exist
    if(this.newBookTitle.trim().length && this.newAuthor) {
      let newBook: Book = {
        id: randomInt(999),
        title: this.newBookTitle,
        author: this.newAuthor
      }

      this.books.push(newBook)

      this.newBookTitle = "";
      this.newAuthor = "";

      localStorage.setItem("books", JSON.stringify(this.books))
    }
  }
}
