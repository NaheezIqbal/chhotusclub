# Mock E-Commerce Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    React Application                        │ │
│  │                                                             │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │ │
│  │  │   Pages      │  │  Components  │  │   Redux Store   │ │ │
│  │  │              │  │              │  │                 │ │ │
│  │  │ - Auth       │  │ - Auth       │  │ - auth-slice    │ │ │
│  │  │ - Shop       │  │ - Shopping   │  │ - cart-slice    │ │ │
│  │  │ - Admin      │  │ - Admin      │  │ - product-slice │ │ │
│  │  │              │  │              │  │ - order-slice   │ │ │
│  │  └──────┬───────┘  └──────┬───────┘  └────────┬────────┘ │ │
│  │         │                 │                    │          │ │
│  │         └─────────────────┴────────────────────┘          │ │
│  │                           │                                │ │
│  │                           ▼                                │ │
│  │                  ┌─────────────────┐                       │ │
│  │                  │   Mock Layer    │                       │ │
│  │                  │  (mockData.js)  │                       │ │
│  │                  └────────┬────────┘                       │ │
│  │                           │                                │ │
│  └───────────────────────────┼────────────────────────────────┘ │
│                              │                                   │
│                              ▼                                   │
│                    ┌──────────────────┐                          │
│                    │   localStorage   │                          │
│                    │                  │                          │
│                    │ - mockUser       │                          │
│                    │ - mockCart_*     │                          │
│                    │ - mockOrders_*   │                          │
│                    │ - mockProducts   │                          │
│                    │ - etc.           │                          │
│                    └──────────────────┘                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌──────────┐                                    ┌────────────────┐
│  Login   │                                    │  localStorage  │
│  Form    │                                    └────────────────┘
└────┬─────┘                                            ▲
     │                                                  │
     │ 1. Submit credentials                            │
     ▼                                                  │
┌──────────────────────┐                               │
│   loginUser Action   │                               │
│   (auth-slice)       │                               │
└──────────┬───────────┘                               │
           │                                            │
           │ 2. Check credentials                       │
           ▼                                            │
    ┌────────────┐                                      │
    │   Mock     │  admin@gmail.com + password123?     │
    │   Logic    │  ────────────────────────────►      │
    └────┬───────┘         Yes: Admin User             │
         │                 No: Regular User            │
         │                                              │
         │ 3. Create user object                        │
         └──────────────────────────────────────────────┘
                           4. Store in localStorage

┌──────────────────────────────────────────────────────────┐
│  Subsequent Page Loads                                   │
│                                                          │
│  App Load → checkAuth() → Read from localStorage →      │
│  Set user in Redux → Routes adjust based on role        │
└──────────────────────────────────────────────────────────┘
```

## Shopping Cart Flow

```
User Action           Redux Action              localStorage
──────────           ────────────              ────────────

Add to Cart     →    addToCart()        →     mockCart_{userId}
    │                     │                           │
    │                     ├─ Get existing cart       │
    │                     ├─ Add/Update product      │
    │                     └─ Save back               │
    │                                                 │
    └─────────────────────────────────────────────────┘
                          Result: Cart Updated


View Cart       →    fetchCartItems()   →     Read mockCart_{userId}
                          │
                          └─ Display in UI


Update Qty      →    updateCartQuantity()→    Update mockCart_{userId}


Remove Item     →    deleteCartItem()   →     Remove from mockCart_{userId}
```

## Order Processing Flow

```
Checkout Page
     │
     │ 1. User selects address
     ▼
┌─────────────────┐
│ Review Order    │
│ - Cart Items    │
│ - Address       │
│ - Total         │
└────────┬────────┘
         │
         │ 2. Confirm order
         ▼
┌──────────────────────┐
│  createNewOrder()    │
│  (order-slice)       │
└──────────┬───────────┘
           │
           │ 3. Create order object
           ▼
    ┌─────────────────┐
    │  localStorage   │
    │  mockOrders_*   │
    └────────┬────────┘
             │
             │ 4. Generate mock PayPal URL
             ▼
    ┌──────────────────┐
    │  Redirect to     │
    │  Mock PayPal     │
    └────────┬─────────┘
             │
             │ 5. Return from "PayPal"
             ▼
    ┌──────────────────┐
    │  capturePayment()│
    │  Update status   │
    └────────┬─────────┘
             │
             │ 6. Order confirmed
             ▼
    ┌──────────────────┐
    │  Order History   │
    │  Page            │
    └──────────────────┘
```

## Admin Product Management

```
Admin Dashboard
       │
       ├──► Products Page
       │         │
       │         ├──► Add Product
       │         │         │
       │         │         ├─► Upload Image
       │         │         │      │
       │         │         │      └─► Convert to Base64
       │         │         │
       │         │         ├─► Fill Details
       │         │         │
       │         │         └─► addNewProduct()
       │         │                    │
       │         │                    ▼
       │         │           ┌────────────────────┐
       │         │           │   localStorage     │
       │         │           │  mockAdminProducts │
       │         │           └────────────────────┘
       │         │
       │         ├──► Edit Product
       │         │         │
       │         │         └─► editProduct()
       │         │                    │
       │         │                    ▼
       │         │           Update in localStorage
       │         │
       │         └──► Delete Product
       │                   │
       │                   └─► deleteProduct()
       │                              │
       │                              ▼
       │                     Remove from localStorage
       │
       └──► Orders Page
                 │
                 ├─► View All Orders
                 │      │
                 │      └─► getAllOrdersForAdmin()
                 │                 │
                 │                 └─► Aggregate from all mockOrders_*
                 │
                 └─► Update Order Status
                        │
                        └─► updateOrderStatus()
                                   │
                                   └─► Update in localStorage
```

## Data Persistence Model

```
┌──────────────────────────────────────────────────────┐
│                   localStorage                        │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Authentication:                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │ mockUser: { _id, email, userName, role }     │    │
│  └──────────────────────────────────────────────┘    │
│                                                       │
│  Shopping Cart (Per User):                           │
│  ┌──────────────────────────────────────────────┐    │
│  │ mockCart_user123: [                          │    │
│  │   { _id, productId, quantity, product }      │    │
│  │ ]                                            │    │
│  └──────────────────────────────────────────────┘    │
│                                                       │
│  Addresses (Per User):                               │
│  ┌──────────────────────────────────────────────┐    │
│  │ mockAddresses_user123: [                     │    │
│  │   { _id, address, city, pincode, phone }     │    │
│  │ ]                                            │    │
│  └──────────────────────────────────────────────┘    │
│                                                       │
│  Orders (Per User):                                  │
│  ┌──────────────────────────────────────────────┐    │
│  │ mockOrders_user123: [                        │    │
│  │   { _id, cartItems, addressInfo, status }    │    │
│  │ ]                                            │    │
│  └──────────────────────────────────────────────┘    │
│                                                       │
│  Reviews (Per Product):                              │
│  ┌──────────────────────────────────────────────┐    │
│  │ mockReviews_prod1: [                         │    │
│  │   { _id, userId, userName, rating, text }    │    │
│  │ ]                                            │    │
│  └──────────────────────────────────────────────┘    │
│                                                       │
│  Admin Data (Global):                                │
│  ┌──────────────────────────────────────────────┐    │
│  │ mockAdminProducts: [                         │    │
│  │   { _id, title, price, image, category }     │    │
│  │ ]                                            │    │
│  │                                              │    │
│  │ mockFeatureImages: [                         │    │
│  │   { _id, image }                             │    │
│  │ ]                                            │    │
│  └──────────────────────────────────────────────┘    │
│                                                       │
└──────────────────────────────────────────────────────┘
```

## Role-Based Access Control

```
┌────────────────────────────────────────────────────────┐
│                      User Login                        │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │  Email === admin@gmail.com    │
        │  Password === password123     │
        └───────┬───────────────────────┘
                │
        ┌───────┴───────┐
        │               │
        ▼               ▼
    ┌──────┐      ┌──────────┐
    │ Yes  │      │   No     │
    └───┬──┘      └────┬─────┘
        │              │
        ▼              ▼
┌───────────────┐  ┌─────────────┐
│  Admin User   │  │ Regular User│
│  role: admin  │  │  role: user │
└───────┬───────┘  └──────┬──────┘
        │                 │
        ▼                 ▼
┌───────────────┐  ┌─────────────┐
│ Admin Routes  │  │ Shop Routes │
│  /admin/*     │  │  /shop/*    │
│               │  │             │
│ - Dashboard   │  │ - Home      │
│ - Products    │  │ - Listing   │
│ - Orders      │  │ - Cart      │
│ - Features    │  │ - Checkout  │
│               │  │ - Account   │
└───────────────┘  └─────────────┘
```

## Search & Filter Architecture

```
User Input (Search)
       │
       ▼
┌──────────────────┐
│ Search Component │
└────────┬─────────┘
         │
         │ Keyword entered
         ▼
┌──────────────────────┐
│ getSearchResults()   │
│ (search-slice)       │
└──────────┬───────────┘
           │
           │ Filter mockProducts by:
           ├─► Title contains keyword
           ├─► Description contains keyword
           ├─► Category contains keyword
           └─► Brand contains keyword
           │
           ▼
    ┌───────────────┐
    │ Search Results│
    │ Displayed     │
    └───────────────┘


User Input (Filter)
       │
       ▼
┌──────────────────┐
│ Filter Component │
│ - Category       │
│ - Brand          │
│ - Sort           │
└────────┬─────────┘
         │
         ▼
┌────────────────────────────┐
│ fetchAllFilteredProducts() │
│ (products-slice)           │
└──────────┬─────────────────┘
           │
           │ Apply filters:
           ├─► Category filter
           ├─► Brand filter
           └─► Sort (price/name)
           │
           ▼
    ┌───────────────┐
    │ Filtered List │
    │ Displayed     │
    └───────────────┘
```

## Key Components Interaction

```
┌──────────────────────────────────────────────────────────┐
│                      Application                         │
│                                                          │
│  ┌────────────┐    ┌────────────┐    ┌──────────────┐  │
│  │    App     │───▶│ CheckAuth  │───▶│   Routes     │  │
│  │  (Main)    │    │            │    │              │  │
│  └────────────┘    └────────────┘    └──────────────┘  │
│        │                  │                   │         │
│        │                  │                   │         │
│        ▼                  ▼                   ▼         │
│  ┌────────────┐    ┌────────────┐    ┌──────────────┐  │
│  │ useEffect  │    │  Check     │    │   Admin/     │  │
│  │ checkAuth()│    │  isAuth    │    │   Shop       │  │
│  │            │    │  & role    │    │   Layouts    │  │
│  └────────────┘    └────────────┘    └──────────────┘  │
│        │                  │                   │         │
│        ▼                  ▼                   ▼         │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Redux Store (Global State)            │  │
│  │                                                   │  │
│  │  - isAuthenticated                               │  │
│  │  - user (with role)                              │  │
│  │  - cartItems                                     │  │
│  │  - products                                      │  │
│  │  - orders                                        │  │
│  │  - etc.                                          │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
│                          ▼                              │
│                  ┌───────────────┐                      │
│                  │  localStorage │                      │
│                  └───────────────┘                      │
└──────────────────────────────────────────────────────────┘
```

## Summary

This mock implementation provides:

- ✅ Complete e-commerce functionality
- ✅ No backend required
- ✅ Persistent data (localStorage)
- ✅ Role-based access (admin/user)
- ✅ Full CRUD operations
- ✅ Shopping cart & checkout
- ✅ Order management
- ✅ Product reviews
- ✅ Search & filter
- ✅ Image upload (base64)

All original API calls have been replaced with localStorage operations, maintaining the same Redux flow and component structure.
