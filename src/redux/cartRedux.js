import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    //GET
    getCart: (state, action) => {
      state.quantity = action.payload.quantity;
      state.products = action.payload;
      state.total = action.payload.total;
    },
    //ADD
    addCart: (state, action) => {
      state.quantity += action.payload.quantity;
      if(!state.products.length || state.products.findIndex(item => item._id === action.payload._id && item.size === action.payload.size && item.color === action.payload.color) === -1){
        state.products.unshift(action.payload);
      }else{
        state.products[
          state.products.findIndex(item => item._id === action.payload._id && item.size === action.payload.size && item.color === action.payload.color)
        ].quantity += action.payload.quantity;
        state.products[
          state.products.findIndex(item => item._id === action.payload._id && item.size === action.payload.size && item.color === action.payload.color)
        ].time += action.payload.time;
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    //DELETE
    deleteCart:(state, action) => {
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.price * action.payload.quantity;
      state.products.splice(
        state.products.findIndex(item => item._id === action.payload._id && item.size === action.payload.size && item.color === action.payload.color),
        1
      );
    },
    //UPDATEADD
    updateaddCart:(state, action) => {
      state.quantity += 1;
      state.total += action.payload.price;
      state.products[
        state.products.findIndex(item => item._id === action.payload._id && item.size === action.payload.size && item.color === action.payload.color)
      ].quantity = action.payload.quantity
    },
    //UPDATEREDUCE
    updatereduceCart:(state, action) => {
      state.quantity -= 1;
      state.total -= action.payload.price;
      state.products[
        state.products.findIndex(item => item._id === action.payload._id && item.size === action.payload.size && item.color === action.payload.color)
      ].quantity = action.payload.quantity
    },
    clearCart:(state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0
    },
  },
});

export const { 
  getCart,
  addCart, 
  deleteCart, 
  updateaddCart, 
  updatereduceCart,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;