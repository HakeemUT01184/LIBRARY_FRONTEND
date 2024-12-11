import { Component, OnInit } from '@angular/core';
import { Book, BooksByCategory } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.scss'],
})
export class BookStoreComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'available',
    'order',
  ];
  books: Book[] = [];
  booksToDisplay: BooksByCategory[] = [];

  // Track collapse state of each category
  isCollapsed: boolean[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Fetch books and update the display
    this.apiService.getBooks().subscribe({
      next: (res: Book[]) => {
        this.books = res;
        this.updateList();
      },
    });
  }

  // Updates the list of books by category
  updateList() {
    this.booksToDisplay = [];
    this.isCollapsed = [];

    for (let book of this.books) {
      let categoryExists = false;
      let categoryBook: BooksByCategory | null = null;

      // Check if the category already exists in booksToDisplay
      for (let bookToDisplay of this.booksToDisplay) {
        if (bookToDisplay.bookCategoryId == book.bookCategoryId) {
          categoryExists = true;
          categoryBook = bookToDisplay;
          break;
        }
      }

      // Add book to the appropriate category
      if (categoryExists) {
        categoryBook!.books.push(book);
      } else {
        this.booksToDisplay.push({
          bookCategoryId: book.bookCategoryId,
          category: book.bookCategory.category,
          subCategory: book.bookCategory.subCategory,
          books: [book],
        });
        // Initialize the collapse state for the new category (collapsed by default)
        this.isCollapsed.push(false);
      }
    }
  }

  // Handle search functionality
  searchBooks(value: string) {
    this.updateList();
    value = value.toLowerCase();

    // Filter books based on the search value
    this.booksToDisplay = this.booksToDisplay.filter((bookToDisplay) => {
      bookToDisplay.books = bookToDisplay.books.filter((book) =>
        book.title.toLowerCase().includes(value)
      );
      return bookToDisplay.books.length > 0;
    });
  }

  // Get the total count of books in the store
  getBookCount() {
    let count = 0;
    this.booksToDisplay.forEach((b) => (count += b.books.length));
    return count;
  }

  // Handle book ordering functionality
  orderBook(book: Book) {
    this.apiService.orderBook(book).subscribe({
      next: (res) => {
        if (res === 'ordered') {
          book.ordered = true;
          let today = new Date();
          let returnDate = new Date();
          returnDate.setDate(today.getDate() + 10);

          this.snackBar.open(
            `${book.title} has been ordered! You will have to return on ${returnDate.toDateString()}`,
            'OK'
          );
        } else {
          this.snackBar.open(
            'You already have 3 orders pending to return.',
            'OK'
          );
        }
      },
    });
  }

  // Toggle the collapse state for a given category
  toggleCollapse(index: number): void {
    this.isCollapsed[index] = !this.isCollapsed[index]; // Toggle the collapse state
  }
}
