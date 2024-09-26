import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  newBookTitle : string = "";
  newAuthor : string = "";

  books: Book[] = []
  
  // for everything related to loading data / data that should get loaded when the component gets created
  ngOnInit(): void {
    // retrieve books
    let savedBooks = localStorage.getItem("books")

    this.books = savedBooks ? JSON.parse(savedBooks) : []
  }

  addBook() {
    // checks if these values exist
    if(this.newBookTitle.trim().length && this.newAuthor) {
      let newBook: Book = {
        id: Date.now(),
        title: this.newBookTitle,
        author: this.newAuthor
      }

      this.books.push(newBook)

      this.newBookTitle = "";
      this.newAuthor = "";

      // store book
      localStorage.setItem("books", JSON.stringify(this.books))
    }
  }

  deleteBook(index: number) {
    this.books.splice(index, 1)
    localStorage.setItem("books", JSON.stringify(this.books))
  }
}
