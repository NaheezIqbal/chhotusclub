import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { simulateAsyncOperation, generateId } from "@/mock/mockData";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

// Get orders from localStorage
const getStoredOrders = (userId) => {
  const orderKey = `mockOrders_${userId}`;
  const stored = localStorage.getItem(orderKey);
  return stored ? JSON.parse(stored) : [];
};

// Save orders to localStorage
const saveOrdersToStorage = (userId, orders) => {
  const orderKey = `mockOrders_${userId}`;
  localStorage.setItem(orderKey, JSON.stringify(orders));
};

// Mock create new order
export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    await simulateAsyncOperation(null, 500);

    const { userId, cartItems, addressInfo, totalAmount } = orderData;
    const orders = getStoredOrders(userId);

    const newOrderId = generateId();
    const newOrder = {
      _id: newOrderId,
      userId,
      cartId: generateId(),
      cartItems,
      addressInfo,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount,
      orderDate: new Date().toISOString(),
      orderUpdateDate: new Date().toISOString(),
      paymentId: null,
      payerId: null,
    };

    orders.push(newOrder);
    saveOrdersToStorage(userId, orders);

    // Mock PayPal approval URL
    const approvalURL = `/shop/paypal-return?orderId=${newOrderId}`;

    return {
      success: true,
      approvalURL,
      orderId: newOrderId,
    };
  }
);

// Mock capture payment
export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    await simulateAsyncOperation(null, 500);

    // Find and update the order
    const allKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("mockOrders_")
    );

    for (const key of allKeys) {
      const orders = JSON.parse(localStorage.getItem(key));
      const orderIndex = orders.findIndex((o) => o._id === orderId);

      if (orderIndex > -1) {
        orders[orderIndex].paymentStatus = "paid";
        orders[orderIndex].orderStatus = "confirmed";
        orders[orderIndex].paymentId = paymentId;
        orders[orderIndex].payerId = payerId;
        orders[orderIndex].orderUpdateDate = new Date().toISOString();

        localStorage.setItem(key, JSON.stringify(orders));

        return {
          success: true,
          message: "Payment captured successfully!",
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

// Mock get all orders by user ID
export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    await simulateAsyncOperation(null, 300);

    const orders = getStoredOrders(userId);

    return {
      success: true,
      data: orders,
    };
  }
);

// Mock get order details
export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    await simulateAsyncOperation(null, 300);

    // Search through all user orders
    const allKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("mockOrders_")
    );

    for (const key of allKeys) {
      const orders = JSON.parse(localStorage.getItem(key));
      const order = orders.find((o) => o._id === id);

      if (order) {
        return {
          success: true,
          data: order,
        };
      }
    }

    return {
      success: false,
      message: "Order not found",
    };
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
