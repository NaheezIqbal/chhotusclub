# Testing Guide for Mock E-Commerce

## Quick Test Steps

### 1. Test Regular User Flow

1. **Browse Products (No Login Required)**

   - Go to `/shop/home`
   - You should see featured images and products
   - Try filtering by category or brand
   - Try sorting products

2. **Login as Regular User**

   - Click "Login" or go to `/auth/login`
   - Enter any email (e.g., `user@test.com`)
   - Enter any password (e.g., `test123`)
   - You should be redirected to `/shop/home`

3. **Shopping Cart**

   - Click on any product to view details
   - Click "Add to Cart"
   - Click the cart icon to view cart
   - Try updating quantities
   - Try removing items

4. **Checkout Process**

   - Go to cart and click "Checkout"
   - Add a new shipping address
   - Select an address and proceed
   - Complete the mock PayPal payment
   - View your order in "Orders" page

5. **Product Reviews**
   - Go to an ordered product
   - Add a review with rating
   - Reviews are stored per product

### 2. Test Admin Flow

1. **Login as Admin**

   - Go to `/auth/login`
   - Email: `admin@gmail.com`
   - Password: `password123`
   - You should be redirected to `/admin/dashboard`

2. **Product Management**

   - Go to "Products" section
   - Add a new product:
     - Upload an image (will be converted to base64)
     - Fill in product details
     - Click "Add"
   - Edit an existing product
   - Delete a product

3. **Order Management**

   - Go to "Orders" section
   - View all orders from all users
   - Click on an order to see details
   - Update order status (pending, confirmed, delivered, etc.)

4. **Feature Images**
   - Go to "Dashboard" or "Features"
   - Add featured images for homepage
   - These appear on the shopping homepage

### 3. Test Search Functionality

1. Go to `/shop/search`
2. Search for products by:
   - Product name
   - Category
   - Brand
   - Description keywords

### 4. Clear Mock Data

To reset everything:

```javascript
// Open browser console (F12)
localStorage.clear();
location.reload();
```

## Expected Behavior

### Authentication

- ✅ Admin credentials show admin panel
- ✅ Any other credentials work as regular user
- ✅ Login persists across page refreshes
- ✅ Logout clears session

### Data Persistence

- ✅ Cart items persist per user
- ✅ Addresses persist per user
- ✅ Orders persist per user
- ✅ Products changes persist (admin)
- ✅ All data survives page refresh

### Security

- ✅ Regular users cannot access admin routes
- ✅ Admin users automatically redirected to admin panel
- ✅ Protected routes require login
- ✅ Public browsing works without login

## Troubleshooting

### Issue: Stuck on loading screen

**Solution:** Check browser console for errors. Clear localStorage and refresh.

### Issue: Login not working

**Solution:**

1. Verify you're using correct admin credentials: `admin@gmail.com` / `password123`
2. Check browser console for errors
3. Clear localStorage and try again

### Issue: Cart is empty after adding items

**Solution:**

1. Make sure you're logged in
2. Check localStorage for `mockCart_` entries
3. Verify the add to cart action completes successfully

### Issue: Products not showing

**Solution:**

1. Products are initialized on first load
2. Check localStorage for `mockAdminProducts`
3. If empty, clear all localStorage and refresh

### Issue: Changes not persisting

**Solution:**

1. Check if localStorage is enabled in your browser
2. Check localStorage size (might be full)
3. Clear old data and try again

## Mock Data Locations

Check localStorage in browser DevTools (F12 > Application > Local Storage):

```
mockUser                    - Current authenticated user
mockCart_user123           - Cart for user with ID 'user123'
mockAddresses_user123      - Addresses for user
mockOrders_user123         - Orders for user
mockReviews_1              - Reviews for product with ID '1'
mockAdminProducts          - All products (admin view)
mockFeatureImages          - Homepage banner images
```

## API vs Mock Comparison

| Feature        | Real API   | Mock Implementation |
| -------------- | ---------- | ------------------- |
| Authentication | JWT tokens | localStorage        |
| Data Storage   | Database   | localStorage        |
| Image Upload   | Cloudinary | Base64 Data URLs    |
| Payment        | PayPal API | Mock redirect       |
| Persistence    | Permanent  | Browser session     |
| Multi-user     | Yes        | Simulated locally   |

## Next Steps

To convert this back to a real API:

1. Uncomment the original API calls in Redux slices
2. Remove mock imports
3. Restore axios calls
4. Set up backend server
5. Configure environment variables
6. Test with real backend
