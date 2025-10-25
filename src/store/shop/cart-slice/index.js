import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  mockProducts,
  simulateAsyncOperation,
  generateId,
} from "@/mock/mockData";

const initialState = {
  cartItems: [],
  isLoading: false,
};

// Get cart from localStorage
const getStoredCart = (userId) => {
  const cartKey = `mockCart_${userId}`;
  const stored = localStorage.getItem(cartKey);
  return stored ? JSON.parse(stored) : [];
};

// Save cart to localStorage
const saveCartToStorage = (userId, cartItems) => {
  const cartKey = `mockCart_${userId}`;
  localStorage.setItem(cartKey, JSON.stringify(cartItems));
};

// Get product from either mockProducts or admin products
const getProduct = (productId) => {
  // First check mockProducts
  let product = mockProducts.find((p) => p._id === productId);

  // If not found, check admin products in localStorage
  if (!product) {
    const storedProducts = localStorage.getItem("mockAdminProducts");
    if (storedProducts) {
      const adminProducts = JSON.parse(storedProducts);
      product = adminProducts.find((p) => p._id === productId);
    }
  }

  return product;
};

// Mock add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    await simulateAsyncOperation(null, 300);

    let cartItems = getStoredCart(userId);
    const product = getProduct(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cartItems.push({
        _id: generateId(),
        userId,
        productId,
        quantity,
        product,
      });
    }

    saveCartToStorage(userId, cartItems);

    return {
      success: true,
      data: cartItems,
    };
  }
);

// Mock fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    await simulateAsyncOperation(null, 300);

    const cartItems = getStoredCart(userId);

    return {
      success: true,
      data: cartItems,
    };
  }
);

// Mock delete cart item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    await simulateAsyncOperation(null, 300);

    let cartItems = getStoredCart(userId);
    cartItems = cartItems.filter((item) => item.productId !== productId);

    saveCartToStorage(userId, cartItems);

    return {
      success: true,
      data: cartItems,
    };
  }
);

// Mock update cart quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    await simulateAsyncOperation(null, 300);

    let cartItems = getStoredCart(userId);
    const itemIndex = cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        cartItems.splice(itemIndex, 1);
      } else {
        cartItems[itemIndex].quantity = quantity;
      }
    }

    saveCartToStorage(userId, cartItems);

    return {
      success: true,
      data: cartItems,
    };
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
