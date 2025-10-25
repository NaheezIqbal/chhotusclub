import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { simulateAsyncOperation } from "@/mock/mockData";

const initialState = {
  orderList: [],
  orderDetails: null,
};

// Get all orders from all users
const getAllStoredOrders = () => {
  const allOrders = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("mockOrders_")) {
      const orders = JSON.parse(localStorage.getItem(key));
      allOrders.push(...orders);
    }
  }
  return allOrders;
};

// Mock get all orders for admin
export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    await simulateAsyncOperation(null, 500);

    const orders = getAllStoredOrders();

    return {
      success: true,
      data: orders,
    };
  }
);

// Mock get order details for admin
export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    await simulateAsyncOperation(null, 300);

    const allOrders = getAllStoredOrders();
    const order = allOrders.find((o) => o._id === id);

    if (order) {
      return {
        success: true,
        data: order,
      };
    }

    return {
      success: false,
      message: "Order not found",
    };
  }
);

// Mock update order status
export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    await simulateAsyncOperation(null, 500);

    // Find and update the order in all user orders
    const allKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("mockOrders_")
    );

    for (const key of allKeys) {
      const orders = JSON.parse(localStorage.getItem(key));
      const orderIndex = orders.findIndex((o) => o._id === id);

      if (orderIndex > -1) {
        orders[orderIndex].orderStatus = orderStatus;
        orders[orderIndex].orderUpdateDate = new Date().toISOString();

        localStorage.setItem(key, JSON.stringify(orders));

        return {
          success: true,
          message: "Order status updated successfully!",
          data: orders[orderIndex],
        };
      }
    }

    return {
      success: false,
      message: "Order not found",
    };
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
