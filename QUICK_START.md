# 🚀 Quick Start Guide

## Installation & Setup

```bash
# Navigate to client directory
cd client

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The app should now be running at `http://localhost:5173` (or similar).

## 🎯 Quick Test

### 1. Test Admin Login (30 seconds)

1. Open the app in your browser
2. Click **"Login"** button (top right)
3. Enter credentials:
   ```
   Email: admin@gmail.com
   Password: password123
   ```
4. Click **"Login"**
5. ✅ You should see the **Admin Dashboard**

**What you can do:**

- Add/Edit/Delete products
- View all orders from all users
- Update order statuses
- Manage featured images

### 2. Test Regular User Login (1 minute)

1. Click **"Logout"** (if logged in as admin)
2. Click **"Login"** again
3. Enter ANY credentials:
   ```
   Email: john@test.com
   Password: test123
   ```
4. Click **"Login"**
5. ✅ You should see the **Shopping Home Page**

**What you can do:**

- Browse products
- Add items to cart
- Manage shipping addresses
- Place orders
- Write reviews

## 🛒 Quick Shopping Test (2 minutes)

1. **Login as user** (any email/password)
2. Click on any **product** to view details
3. Click **"Add to Cart"**
4. Click the **cart icon** (top right)
5. ✅ See your cart with the product
6. Update quantity or remove item
7. Click **"Checkout"**
8. Add a shipping address:
   ```
   Address: 123 Main St
   City: New York
   PIN: 10001
   Phone: 1234567890
   ```
9. Click **"Continue"** and complete mock checkout
10. ✅ View your order in **"Orders"** page

## 🔧 Admin Features Test (2 minutes)

1. **Login as admin:**
   ```
   Email: admin@gmail.com
   Password: password123
   ```
2. Go to **"Products"** section
3. Click **"Add New Product"**
4. Fill in product details:
   ```
   Title: Test Product
   Description: This is a test product
   Category: men
   Brand: nike
   Price: 100
   Sale Price: 80
   Stock: 50
   ```
5. Upload an image (any image file)
6. Click **"Add"**
7. ✅ See your new product in the list
8. Try **editing** or **deleting** it

## 📱 Test Key Features

### Search

1. Go to **Search** page (top navigation)
2. Type: `shoe` or `headphone`
3. ✅ See matching products

### Filter & Sort

1. Go to **Listing** page
2. Select filters: Category, Brand
3. Try sorting: Price Low to High, etc.
4. ✅ Products update accordingly

### Reviews

1. Login as user
2. Place an order (follow shopping test above)
3. Go to the product page
4. Add a review with rating
5. ✅ See your review displayed

## 🗑️ Reset Everything

If you want to start fresh:

```javascript
// Open browser console (Press F12)
localStorage.clear();
location.reload();
```

This will delete all mock data and start over.

## ❓ Troubleshooting

### Can't login as admin?

- Make sure email is exactly: `admin@gmail.com`
- Make sure password is exactly: `password123`
- Both are case-sensitive!

### Cart is empty?

- Make sure you're logged in
- Try refreshing the page
- Check browser console (F12) for errors

### Changes not saving?

- Check if localStorage is enabled in browser
- Try clearing localStorage and reloading
- Check browser console for errors

### Products not showing?

- Refresh the page
- Clear localStorage and reload
- Check if you're on the correct page (`/shop/home` or `/shop/listing`)

## 📊 What's Different from Original?

| Feature        | Original          | Mock Version               |
| -------------- | ----------------- | -------------------------- |
| Backend API    | Node.js + Express | None (localStorage)        |
| Database       | MongoDB           | Browser localStorage       |
| Authentication | JWT tokens        | localStorage               |
| Image Upload   | Cloudinary        | Base64 encoding            |
| Payments       | PayPal API        | Mock redirect              |
| Persistence    | Permanent         | Until localStorage cleared |

## 🎓 Learning Points

This mock implementation demonstrates:

- Redux state management
- React routing with authentication
- Role-based access control (admin vs user)
- Shopping cart management
- Order processing flow
- Product catalog management
- Review system
- Search and filter functionality

## 📖 More Information

- **Full Documentation:** See `MOCK_README.md`
- **Testing Guide:** See `TESTING_GUIDE.md`
- **Implementation Details:** See `IMPLEMENTATION_SUMMARY.md`

## ✨ You're Ready!

The application is now fully functional as a static mock website. You can:

- ✅ Test all features without a backend
- ✅ Demo the application
- ✅ Develop new features
- ✅ Learn React and Redux patterns

**Enjoy testing! 🎉**

---

**Need Help?**

1. Check browser console for errors (F12)
2. Clear localStorage and try again
3. Review the documentation files
4. Make sure you're using correct admin credentials
