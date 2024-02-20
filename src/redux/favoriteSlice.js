import { createSlice } from "@reduxjs/toolkit";

// Başlangıç durumu
const initialState = {
  favorites: [], // Favori ürünlerin listesi
};

// Favori slice'ı oluştur
export const favoriteSlice = createSlice({
  name: "favorite", // Slice adı
  initialState, // Başlangıç durumu
  reducers: {
    // Favorilere ürün ekleme işlevi
    addToFavorites: (state, action) => {
      // Action'dan gelen ürünü favorilere ekle
      // Ancak aynı ürün daha önce eklenmişse tekrar eklenmez
      if (!state.favorites.some(product => product.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    // Favorilerden ürün çıkarma işlevi
    removeFromFavorites: (state, action) => {
      // Action'dan gelen ürünü favorilerden filtrele
      state.favorites = state.favorites.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

// Action oluşturucularını ve reducer'ı dışa aktar
export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
