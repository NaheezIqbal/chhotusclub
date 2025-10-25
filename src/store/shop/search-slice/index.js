import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockProducts, simulateAsyncOperation } from "@/mock/mockData";

const initialState = {
  isLoading: false,
  searchResults: [],
};

// Get all products from both sources
const getAllProducts = () => {
  let allProducts = [...mockProducts];

  const storedProducts = localStorage.getItem("mockAdminProducts");
  if (storedProducts) {
    const adminProducts = JSON.parse(storedProducts);
    adminProducts.forEach((adminProduct) => {
      if (!allProducts.find((p) => p._id === adminProduct._id)) {
        allProducts.push(adminProduct);
      }
    });
  }

  return allProducts;
};

// Mock search
export const getSearchResults = createAsyncThunk(
  "/order/getSearchResults",
  async (keyword) => {
    await simulateAsyncOperation(null, 300);

    if (!keyword || keyword.trim() === "") {
      return {
        success: true,
        data: [],
      };
    }

    const searchTerm = keyword.toLowerCase();
    const allProducts = getAllProducts();

    const results = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
    );

    return {
      success: true,
      data: results,
    };
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
