import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { simulateAsyncOperation, generateId } from "@/mock/mockData";

const initialState = {
  isLoading: false,
  reviews: [],
};

// Get reviews from localStorage
const getStoredReviews = (productId) => {
  const reviewKey = `mockReviews_${productId}`;
  const stored = localStorage.getItem(reviewKey);
  return stored ? JSON.parse(stored) : [];
};

// Save reviews to localStorage
const saveReviewsToStorage = (productId, reviews) => {
  const reviewKey = `mockReviews_${productId}`;
  localStorage.setItem(reviewKey, JSON.stringify(reviews));
};

// Mock add review
export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {
    await simulateAsyncOperation(null, 500);

    const { productId, userId, userName, reviewMessage, reviewValue } =
      formdata;
    const reviews = getStoredReviews(productId);

    const newReview = {
      _id: generateId(),
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    saveReviewsToStorage(productId, reviews);

    return {
      success: true,
      data: newReview,
    };
  }
);

// Mock get reviews
export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  await simulateAsyncOperation(null, 300);

  const reviews = getStoredReviews(id);

  return {
    success: true,
    data: reviews,
  };
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
