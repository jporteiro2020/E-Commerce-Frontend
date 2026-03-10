import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // [{ product: {...}, quantity: number }]
  },
  reducers: {
    addItem(state, action) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.product.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.product.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems    = (state) => state.cart.items;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal    = (state) =>
  state.cart.items.reduce((sum, i) => sum + Number(i.product.precio) * i.quantity, 0);

export default cartSlice.reducer;
