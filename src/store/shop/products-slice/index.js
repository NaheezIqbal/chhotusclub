import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockProducts, simulateAsyncOperation } from "@/mock/mockData";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

// Get all products from both mockProducts and admin products
const getAllProducts = () => {
  let allProducts = [...mockProducts];

  // Also get products from admin localStorage
  const storedProducts = localStorage.getItem("mockAdminProducts");
  if (storedProducts) {
    const adminProducts = JSON.parse(storedProducts);
    // Merge products, avoiding duplicates by ID
    adminProducts.forEach((adminProduct) => {
      if (!allProducts.find((p) => p._id === adminProduct._id)) {
        allProducts.push(adminProduct);
      }
    });
  }

  return allProducts;
};

// Mock fetch filtered products
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    await simulateAsyncOperation(null, 500);

    let filteredProducts = getAllProducts();

    // Apply category filter
    if (filterParams?.category && filterParams.category.length > 0) {
      const categories = filterParams.category.split(",");
      filteredProducts = filteredProducts.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Apply brand filter
    if (filterParams?.brand && filterParams.brand.length > 0) {
      const brands = filterParams.brand.split(",");
      filteredProducts = filteredProducts.filter((product) =>
        brands.includes(product.brand)
      );
    }

    // Apply sorting
    if (sortParams) {
      switch (sortParams) {
        case "price-lowtohigh":
          filteredProducts.sort(
            (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)
          );
          break;
        case "price-hightolow":
          filteredProducts.sort(
            (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)
          );
          break;
        case "title-atoz":
          filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "title-ztoa":
          filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }
    }

    return {
      success: true,
      data: filteredProducts,
    };
  }
);

// Mock fetch product details
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    await simulateAsyncOperation(null, 300);

    // First check mockProducts
    let product = mockProducts.find((p) => p._id === id);

    // If not found, check admin products
    if (!product) {
      const storedProducts = localStorage.getItem("mockAdminProducts");
      if (storedProducts) {
        const adminProducts = JSON.parse(storedProducts);
        product = adminProducts.find((p) => p._id === id);
      }
    }

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    return {
      success: true,
      data: product,
    };
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
