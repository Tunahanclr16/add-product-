import { createSlice } from "@reduxjs/toolkit";

// Başlangıç durumu
const initialState = {
  keyword: "", 
};

// Favori slice'ı oluştur
export const keywordSlice = createSlice({
  name: "keyword", // Slice adı
  initialState, // Başlangıç durumu
  reducers: {
    keywordFunc(state,actions){
      state.keyword=actions.payload
    }
  },  
});

// Action oluşturucularını ve reducer'ı dışa aktar
export const { keywordFunc,} = keywordSlice.actions;
export default keywordSlice.reducer;
