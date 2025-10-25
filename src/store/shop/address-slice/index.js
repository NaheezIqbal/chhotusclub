import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { simulateAsyncOperation, generateId } from "@/mock/mockData";

const initialState = {
  isLoading: false,
  addressList: [],
};

// Get addresses from localStorage
const getStoredAddresses = (userId) => {
  const addressKey = `mockAddresses_${userId}`;
  const stored = localStorage.getItem(addressKey);
  return stored ? JSON.parse(stored) : [];
};

// Save addresses to localStorage
const saveAddressesToStorage = (userId, addresses) => {
  const addressKey = `mockAddresses_${userId}`;
  localStorage.setItem(addressKey, JSON.stringify(addresses));
};

// Mock add new address
export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    await simulateAsyncOperation(null, 300);

    const { userId } = formData;
    const addresses = getStoredAddresses(userId);

    const newAddress = {
      ...formData,
      _id: generateId(),
    };

    addresses.push(newAddress);
    saveAddressesToStorage(userId, addresses);

    return {
      success: true,
      data: newAddress,
    };
  }
);

// Mock fetch all addresses
export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    await simulateAsyncOperation(null, 300);

    const addresses = getStoredAddresses(userId);

    return {
      success: true,
      data: addresses,
    };
  }
);

// Mock edit address
export const editaAddress = createAsyncThunk(
  "/addresses/editaAddress",
  async ({ userId, addressId, formData }) => {
    await simulateAsyncOperation(null, 300);

    let addresses = getStoredAddresses(userId);
    const addressIndex = addresses.findIndex((addr) => addr._id === addressId);

    if (addressIndex > -1) {
      addresses[addressIndex] = {
        ...addresses[addressIndex],
        ...formData,
      };
      saveAddressesToStorage(userId, addresses);

      return {
        success: true,
        data: addresses[addressIndex],
      };
    }

    return {
      success: false,
      message: "Address not found",
    };
  }
);

// Mock delete address
export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    await simulateAsyncOperation(null, 300);

    let addresses = getStoredAddresses(userId);
    addresses = addresses.filter((addr) => addr._id !== addressId);
    saveAddressesToStorage(userId, addresses);

    return {
      success: true,
      data: addressId,
    };
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
