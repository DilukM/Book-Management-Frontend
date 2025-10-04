"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Book, BookFormData, PaginatedResponse, BookFilters } from "@/types";
import booksData from "@/data/books.json";

interface BookContextType {
  books: Book[];
  isLoading: boolean;
  getBooks: (
    page?: number,
    limit?: number,
    filters?: BookFilters
  ) => PaginatedResponse<Book>;
  getBookById: (id: string) => Book | undefined;
  addBook: (
    book: BookFormData
  ) => Promise<{ success: boolean; message?: string; book?: Book }>;
  updateBook: (
    id: string,
    book: BookFormData
  ) => Promise<{ success: boolean; message?: string }>;
  deleteBook: (id: string) => Promise<{ success: boolean; message?: string }>;
  searchBooks: (query: string) => Book[];
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load books from localStorage or use default data
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      setBooks(booksData.books);
      localStorage.setItem("books", JSON.stringify(booksData.books));
    }
    setIsLoading(false);
  }, []);

  // Update localStorage whenever books change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("books", JSON.stringify(books));
    }
  }, [books, isLoading]);

  const getBooks = (
    page: number = 1,
    limit: number = 10,
    filters?: BookFilters
  ): PaginatedResponse<Book> => {
    let filteredBooks = [...books];

    // Apply filters
    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredBooks = filteredBooks.filter(
          (book) =>
            book.title.toLowerCase().includes(searchLower) ||
            book.author.toLowerCase().includes(searchLower) ||
            book.genre.toLowerCase().includes(searchLower)
        );
      }
      if (filters.genre) {
        filteredBooks = filteredBooks.filter(
          (book) => book.genre === filters.genre
        );
      }
      if (filters.author) {
        filteredBooks = filteredBooks.filter((book) =>
          book.author.toLowerCase().includes(filters.author!.toLowerCase())
        );
      }
    }

    const total = filteredBooks.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedBooks = filteredBooks.slice(start, end);

    return {
      data: paginatedBooks,
      total,
      page,
      totalPages,
    };
  };

  const getBookById = (id: string): Book | undefined => {
    return books.find((book) => book.id === id);
  };

  const addBook = async (
    bookData: BookFormData
  ): Promise<{ success: boolean; message?: string; book?: Book }> => {
    try {
      const newBook: Book = {
        id: String(Date.now()),
        title: bookData.title,
        author: bookData.author,
        publishedYear: Number(bookData.publishedYear),
        genre: bookData.genre,
        description: bookData.description || "",
        isbn: bookData.isbn || "",
      };

      setBooks((prevBooks) => [...prevBooks, newBook]);
      return {
        success: true,
        message: "Book added successfully",
        book: newBook,
      };
    } catch (error) {
      return { success: false, message: "Failed to add book" };
    }
  };

  const updateBook = async (
    id: string,
    bookData: BookFormData
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex === -1) {
        return { success: false, message: "Book not found" };
      }

      const updatedBook: Book = {
        ...books[bookIndex],
        title: bookData.title,
        author: bookData.author,
        publishedYear: Number(bookData.publishedYear),
        genre: bookData.genre,
        description: bookData.description || "",
        isbn: bookData.isbn || "",
      };

      setBooks((prevBooks) => {
        const newBooks = [...prevBooks];
        newBooks[bookIndex] = updatedBook;
        return newBooks;
      });

      return { success: true, message: "Book updated successfully" };
    } catch (error) {
      return { success: false, message: "Failed to update book" };
    }
  };

  const deleteBook = async (
    id: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const bookExists = books.some((book) => book.id === id);
      if (!bookExists) {
        return { success: false, message: "Book not found" };
      }

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      return { success: true, message: "Book deleted successfully" };
    } catch (error) {
      return { success: false, message: "Failed to delete book" };
    }
  };

  const searchBooks = (query: string): Book[] => {
    if (!query) return books;

    const searchLower = query.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.genre.toLowerCase().includes(searchLower)
    );
  };

  const value: BookContextType = {
    books,
    isLoading,
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
}
