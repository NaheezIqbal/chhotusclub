import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  mockFeatureImages,
  simulateAsyncOperation,
  generateId,
} from "@/mock/mockData";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// Get feature images from localStorage
const getStoredFeatureImages = () => {
  const stored = localStorage.getItem("mockFeatureImages");
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default feature images
  localStorage.setItem("mockFeatureImages", JSON.stringify(mockFeatureImages));
  return mockFeatureImages;
};

// Save feature images to localStorage
const saveFeatureImagesToStorage = (images) => {
  localStorage.setItem("mockFeatureImages", JSON.stringify(images));
};

// Mock get feature images
export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    await simulateAsyncOperation(null, 300);

    const images = getStoredFeatureImages();

    return {
      success: true,
      data: images,
    };
  }
);

// Mock add feature image
export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    await simulateAsyncOperation(null, 500);

    const images = getStoredFeatureImages();
    const newImage = {
      _id: generateId(),
      image,
    };

    images.push(newImage);
    saveFeatureImagesToStorage(images);

    return {
      success: true,
      data: newImage,
    };
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
