# 🚀 Quick Start Guide - BookHub

## Immediate Access

**Application is LIVE at:** http://localhost:3000

### Demo Credentials

```
Username: admin
Password: admin123

OR

Username: user
Password: user123
```

## 📋 Quick Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Run production build

# Maintenance
npm run lint         # Check code quality
```

## 🎯 Main Features & Routes

### Public Routes

- **/** - Home page (Welcome, features overview)
- **/login** - User login
- **/register** - New user registration

### Protected Routes (Requires Authentication)

- **/books** - List all books (with search & filter)
- **/books/add** - Add new book
- **/books/[id]** - View book details
- **/books/[id]/edit** - Edit book

## 📚 Available Books (Sample Data)

The app comes pre-loaded with 8 books:

1. The Great Gatsby (F. Scott Fitzgerald, 1925, Fiction)
2. To Kill a Mockingbird (Harper Lee, 1960, Fiction)
3. 1984 (George Orwell, 1949, Science Fiction)
4. Pride and Prejudice (Jane Austen, 1813, Romance)
5. The Catcher in the Rye (J.D. Salinger, 1951, Fiction)
6. Harry Potter (J.K. Rowling, 1997, Fantasy)
7. The Hobbit (J.R.R. Tolkien, 1937, Fantasy)
8. The Da Vinci Code (Dan Brown, 2003, Mystery)

## 🎨 Color Reference

```css
Primary (Dark Blue-Grey): #2c3e50
Secondary (Blue): #3498db
Error (Red): #e74c3c
Success (Green): #27ae60
Warning (Orange): #f39c12
Background: #f5f6fa
```

## 📱 Test Responsive Design

### Desktop

Open: http://localhost:3000 (Browser at full width)

### Tablet

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPad or similar (768px - 992px)

### Mobile

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone or similar (< 576px)

## 🧪 Testing Checklist

### Authentication

- [ ] Login with demo credentials
- [ ] Register new account
- [ ] Logout
- [ ] Try accessing /books without login (should redirect)

### Book Operations

- [ ] View books list
- [ ] Search for a book
- [ ] Filter by genre
- [ ] Click "View Details" on a book
- [ ] Edit a book
- [ ] Add a new book
- [ ] Delete a book

### Responsive Testing

- [ ] Open on mobile device (or DevTools)
- [ ] Test hamburger menu
- [ ] Check all pages are readable
- [ ] Test form inputs on touch device

## 🛠️ Key Files to Explore

### Pages

- `src/app/page.tsx` - Home page
- `src/app/books/page.tsx` - Books list
- `src/app/books/add/page.tsx` - Add book form
- `src/app/books/[id]/page.tsx` - Book details
- `src/app/books/[id]/edit/page.tsx` - Edit book form

### Components

- `src/components/Header/Header.tsx` - Navigation
- `src/components/BookCard/BookCard.tsx` - Book card display
- `src/components/Pagination/Pagination.tsx` - Pagination logic

### Context (State Management)

- `src/context/AuthContext.tsx` - Authentication state
- `src/context/BookContext.tsx` - Books data & CRUD

### Styling

- `src/styles/theme.css` - Color palette & design tokens
- `src/app/globals.css` - Global styles

### Data

- `src/data/books.json` - Sample data

## 🔧 Common Tasks

### Change Theme Colors

Edit `src/styles/theme.css`:

```css
:root {
  --primary-main: #YOUR_COLOR;
  --secondary-main: #YOUR_COLOR;
}
```

### Add More Books

1. Login to the app
2. Click "Add Book" in navigation
3. Fill in the form
4. Submit

OR edit `src/data/books.json` directly

### Modify Books Per Page

Edit `src/app/books/page.tsx`:

```typescript
const itemsPerPage = 6; // Change this number
```

## 📊 App Statistics

- **Total Pages**: 8 (Home, Login, Register, Books, Add, Detail, Edit, 404)
- **Components**: 6 (Header, Footer, BookCard, Pagination, SearchBar, Loading)
- **Context Providers**: 2 (Auth, Books)
- **Routes**: 3 public + 4 protected
- **Sample Books**: 8
- **Sample Users**: 2
- **Total Bundle Size**: ~123 KB (first load)

## 🚨 Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process on port 3000
npx kill-port 3000

# OR use a different port
PORT=3001 npm run dev
```

### Cannot Login

- Check console for errors (F12 > Console)
- Verify demo credentials: admin/admin123
- Clear browser localStorage and try again

### Books Not Showing

- Make sure you're logged in
- Check `src/data/books.json` exists
- Clear browser localStorage and reload

### Styling Issues

- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check CSS module imports in components

## 📞 Support

For issues or questions:

1. Check the PROJECT_SUMMARY.md for detailed documentation
2. Review the code comments in context files
3. Check Next.js documentation: https://nextjs.org/docs

## 🎉 Success Indicators

You'll know everything is working when:

- ✅ App loads at http://localhost:3000
- ✅ You can login with demo credentials
- ✅ Books list displays with search and filter
- ✅ You can add, edit, and delete books
- ✅ Navigation works on mobile (hamburger menu)
- ✅ All pages are responsive

---

**Happy Coding! 🚀📚**
