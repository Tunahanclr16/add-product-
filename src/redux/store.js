import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modalSlice'
import dataSlice from './dataSlice'
import favoriteSlice from './favoriteSlice'
import keywordSlice from './keywordSlice'

export const store = configureStore({
  reducer: {
    modal:modalSlice,
    data:dataSlice,
    favorite:favoriteSlice,
    keyword:keywordSlice,
  },
})