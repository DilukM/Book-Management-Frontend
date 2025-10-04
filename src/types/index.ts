// Book Types
export interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  description?: string;
  isbn?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  publishedYear: number | string;
  genre: string;
  description?: string;
  isbn?: string;
}

// User Types
export interface User {
  id: string;
  username: string;
  password?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  token: string;
}

// Auth Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

// Search/Filter Types
export interface BookFilters {
  search?: string;
  genre?: string;
  author?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
