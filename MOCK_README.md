# Mock E-Commerce Application

This application has been converted to work as a static website with mock data. All API calls have been replaced with local mock implementations that use browser localStorage for data persistence.

## Mock Authentication

### Admin Login

- **Email:** admin@gmail.com
- **Password:** password123
- Logging in with these credentials will give you access to the admin panel

### Regular User Login

- **Email:** Any email address
- **Password:** Any password
- Any other credentials will log you in as a regular user with shopping capabilities

## Features

### For All Users

- Browse products with filtering and sorting
- Search for products
- View product details
- View featured images on homepage

### For Regular Users

- Add products to cart
- Manage cart items (update quantity, remove items)
- Create and manage shipping addresses
- Place orders (mock PayPal checkout)
- View order history
- Add product reviews

### For Admin Users

- View all products
- Add new products (with image upload)
- Edit existing products
- Delete products
- View all orders from all users
- Update order status
- Manage featured images for homepage

## Data Storage

All data is stored in the browser's localStorage:

- `mockUser` - Current logged in user
- `mockCart_{userId}` - Cart items for each user
- `mockAddresses_{userId}` - Shipping addresses for each user
- `mockOrders_{userId}` - Orders for each user
- `mockReviews_{productId}` - Reviews for each product
- `mockAdminProducts` - Product catalog (admin)
- `mockFeatureImages` - Homepage featured images

## How It Works

### Authentication

- Login credentials are validated in the auth slice
- User information is stored in localStorage
- Admin role is assigned based on email match
- Logout clears the stored user data

### Shopping Cart

- Cart is stored per user in localStorage
- Products are associated with cart items
- Quantities can be updated or items removed
- Cart persists across sessions

### Orders

- Orders are created with mock PayPal integration
- Orders are stored per user
- Admin can view all orders from all users
- Order status can be updated by admin

### Products

- Initial product catalog is loaded from mock data
- Admin can add, edit, and delete products
- Changes persist in localStorage
- Products support image uploads (converted to base64)

### Search & Filter

- Products can be filtered by category and brand
- Products can be sorted by price or name
- Search works across title, description, category, and brand

## Development

To reset all mock data, clear your browser's localStorage:

```javascript
localStorage.clear();
```

Then refresh the page to reinitialize with default data.

## Note

This is a demonstration application with mock data. In a production environment:

- Use proper backend API
- Implement real authentication with JWT tokens
- Use a database for data persistence
- Integrate with real payment gateway
- Add proper form validation
- Implement security measures
- Add error handling and logging
