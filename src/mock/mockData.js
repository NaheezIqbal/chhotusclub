// Mock data for static website

// Mock Products
export const mockProducts = [
  {
    _id: "1",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    title: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    category: "accessories",
    brand: "nike",
    price: 299,
    salePrice: 249,
    totalStock: 50,
    averageReview: 4.5,
  },
  {
    _id: "2",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    title: "Classic Leather Sneakers",
    description: "Comfortable leather sneakers for everyday wear",
    category: "footwear",
    brand: "adidas",
    price: 129,
    salePrice: 99,
    totalStock: 100,
    averageReview: 4.8,
  },
  {
    _id: "3",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    title: "Mens Casual T-Shirt",
    description: "Soft cotton t-shirt available in multiple colors",
    category: "men",
    brand: "levi",
    price: 49,
    salePrice: 39,
    totalStock: 200,
    averageReview: 4.3,
  },
  {
    _id: "4",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    title: "Women's Summer Dress",
    description: "Elegant summer dress perfect for any occasion",
    category: "women",
    brand: "h&m",
    price: 89,
    salePrice: 69,
    totalStock: 75,
    averageReview: 4.6,
  },
  {
    _id: "5",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    title: "Kids Winter Jacket",
    description: "Warm and cozy winter jacket for kids",
    category: "kids",
    brand: "zara",
    price: 79,
    salePrice: 59,
    totalStock: 60,
    averageReview: 4.7,
  },
  {
    _id: "6",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
    title: "Designer Sunglasses",
    description: "Stylish sunglasses with UV protection",
    category: "accessories",
    brand: "nike",
    price: 159,
    salePrice: 129,
    totalStock: 40,
    averageReview: 4.4,
  },
  {
    _id: "7",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    title: "Running Shoes",
    description: "Professional running shoes for athletes",
    category: "footwear",
    brand: "nike",
    price: 189,
    salePrice: 159,
    totalStock: 80,
    averageReview: 4.9,
  },
  {
    _id: "8",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    title: "Mens Formal Shirt",
    description: "Professional formal shirt for business occasions",
    category: "men",
    brand: "levi",
    price: 69,
    salePrice: 54,
    totalStock: 120,
    averageReview: 4.5,
  },
];

// Mock User
export const mockAdminUser = {
  _id: "admin123",
  userName: "Admin User",
  email: "admin@gmail.com",
  role: "admin",
};

export const mockRegularUser = {
  _id: "user123",
  userName: "John Doe",
  email: "user@example.com",
  role: "user",
};

// Mock Cart Items
export const mockCartItems = [
  {
    _id: "cart1",
    userId: "user123",
    productId: "1",
    quantity: 2,
    product: mockProducts[0],
  },
  {
    _id: "cart2",
    userId: "user123",
    productId: "3",
    quantity: 1,
    product: mockProducts[2],
  },
];

// Mock Addresses
export const mockAddresses = [
  {
    _id: "addr1",
    userId: "user123",
    address: "123 Main Street",
    city: "New York",
    pincode: "10001",
    phone: "1234567890",
    notes: "Home address",
  },
  {
    _id: "addr2",
    userId: "user123",
    address: "456 Park Avenue",
    city: "Los Angeles",
    pincode: "90001",
    phone: "0987654321",
    notes: "Office address",
  },
];

// Mock Orders
export const mockOrders = [
  {
    _id: "order1",
    userId: "user123",
    cartId: "cart123",
    cartItems: [
      {
        productId: "1",
        title: "Premium Wireless Headphones",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        price: 249,
        quantity: 1,
      },
    ],
    addressInfo: mockAddresses[0],
    orderStatus: "confirmed",
    paymentMethod: "paypal",
    paymentStatus: "paid",
    totalAmount: 249,
    orderDate: new Date().toISOString(),
    orderUpdateDate: new Date().toISOString(),
    paymentId: "pay123",
    payerId: "payer123",
  },
  {
    _id: "order2",
    userId: "user123",
    cartId: "cart124",
    cartItems: [
      {
        productId: "2",
        title: "Classic Leather Sneakers",
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        price: 99,
        quantity: 2,
      },
    ],
    addressInfo: mockAddresses[1],
    orderStatus: "pending",
    paymentMethod: "paypal",
    paymentStatus: "pending",
    totalAmount: 198,
    orderDate: new Date(Date.now() - 86400000).toISOString(),
    orderUpdateDate: new Date(Date.now() - 86400000).toISOString(),
    paymentId: "pay124",
    payerId: "payer124",
  },
];

// Mock Reviews
export const mockReviews = [
  {
    _id: "review1",
    productId: "1",
    userId: "user123",
    userName: "John Doe",
    reviewMessage: "Great product! Highly recommended.",
    reviewValue: 5,
  },
  {
    _id: "review2",
    productId: "1",
    userId: "user456",
    userName: "Jane Smith",
    reviewMessage: "Good quality but a bit expensive.",
    reviewValue: 4,
  },
  {
    _id: "review3",
    productId: "2",
    userId: "user789",
    userName: "Mike Johnson",
    reviewMessage: "Very comfortable shoes!",
    reviewValue: 5,
  },
];

// Mock Feature Images
export const mockFeatureImages = [
  {
    _id: "feature1",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  },
  {
    _id: "feature2",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  },
  {
    _id: "feature3",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  },
];

// Helper function to simulate async operations
export const simulateAsyncOperation = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Generate unique IDs
let idCounter = 100;
export const generateId = () => {
  return `id_${idCounter++}`;
};
