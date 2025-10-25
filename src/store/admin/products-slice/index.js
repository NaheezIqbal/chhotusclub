import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { simulateAsyncOperation, generateId } from "@/mock/mockData";

const initialState = {
  isLoading: false,
  productList: [],
};

// Get products from localStorage
const getStoredProducts = () => {
  const stored = localStorage.getItem("mockAdminProducts");
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with some default products
  const defaultProducts = [
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
  ];
  localStorage.setItem("mockAdminProducts", JSON.stringify(defaultProducts));
  return defaultProducts;
};

// Save products to localStorage
const saveProductsToStorage = (products) => {
  localStorage.setItem("mockAdminProducts", JSON.stringify(products));
};

// Mock add new product
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    await simulateAsyncOperation(null, 500);

    const products = getStoredProducts();
    const newProduct = {
      ...formData,
      _id: generateId(),
      averageReview: 0,
    };

    products.push(newProduct);
    saveProductsToStorage(products);

    return {
      success: true,
      data: newProduct,
    };
  }
);

// Mock fetch all products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    await simulateAsyncOperation(null, 500);

    const products = getStoredProducts();

    return {
      success: true,
      data: products,
    };
  }
);

// Mock edit product
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    await simulateAsyncOperation(null, 500);

    let products = getStoredProducts();
    const productIndex = products.findIndex((p) => p._id === id);

    if (productIndex > -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...formData,
      };
      saveProductsToStorage(products);

      return {
        success: true,
        data: products[productIndex],
      };
    }

    return {
      success: false,
      message: "Product not found",
    };
  }
);

// Mock delete product
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    await simulateAsyncOperation(null, 500);

    let products = getStoredProducts();
    products = products.filter((p) => p._id !== id);
    saveProductsToStorage(products);

    return {
      success: true,
      data: id,
    };
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
