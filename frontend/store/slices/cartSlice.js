import { createSlice } from '@reduxjs/toolkit';

const CART_KEY = 'luxerent_cart';

function loadCart() {
  if (typeof window === 'undefined') return [];
  try {
    const s = localStorage.getItem(CART_KEY);
    if (!s) return [];
    const parsed = JSON.parse(s);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {}
}

const initialState = { items: loadCart() };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, product, startDate, endDate, duration } = action.payload;
      const exists = state.items.findIndex((i) => i.productId === productId);
      if (exists >= 0) {
        state.items[exists] = { productId, product, startDate, endDate, duration };
      } else {
        state.items.push({ productId, product, startDate, endDate, duration });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      saveCart(state.items);
    },
    updateCartItemDates: (state, action) => {
      const idx = state.items.findIndex((i) => i.productId === action.payload.productId);
      if (idx >= 0) {
        state.items[idx].startDate = action.payload.startDate;
        state.items[idx].endDate = action.payload.endDate;
        state.items[idx].duration = action.payload.duration;
        saveCart(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemDates, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
