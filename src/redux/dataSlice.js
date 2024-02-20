import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: 1,
      name: "İphone 14 Red",
      price: 999,
      url: "https://st-troy.mncdn.com/Content/media/ProductImg/original/mpxg3tua-apple-iphone-14-512gb-productred-mpxg3tua-637986830557158848.jpg?width=785",
    },
    {
      id: 2,
      name: "Macbook Pro",
      price: 600,
      url: "https://productimages.hepsiburada.net/s/131/375-375/110000081537742.jpg",
    },
    {
      id: 3,
      name: "Playstation 5",
      price: 700,
      url: "https://m.media-amazon.com/images/I/615iJqjOd3L._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 4,
      name: "Samsung Galaxy S22 Ultra",
      price: 1299,
      url: "https://cdn.cimri.io/pictures/article/original/46/46112.jpg",
    },
    {
      id: 5,
      name: "Dell XPS 13",
      price: 899,
      url: "https://www.notebookcheck-tr.com/uploads/tx_nbc2/xps_13_plus_9320.jpg",
    },
    {
      id: 6,
      name: "Canon EOS R5",
      price: 3499,
      url: "https://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_square_32c26ad194234d42b3cd9e582a21c99b?$prod-gallery-1by1-jpg$",
    },
  ],
  favorites: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createData(state, action) {
      state.data = [...state.data, action.payload];
    },
    deleteData(state, action) {
      state.data = state.data.filter(
        (product) => product.id !== action.payload
      );
    },
    sortingData(state, action) {
      // Eğer action.payload değeri boş ise, tüm ürünlerin sıralı olması sağlanacak
      if (!action.payload) {
        // Ürünleri id'ye göre artan sırayla sıralarız
        state.data.sort((a, b) => a.id - b.id);
        return;
      }

      // Verileri belirli bir sıralama kuralına göre sıralamak için Array.prototype.sort() yöntemini kullanırız.
      state.data.sort((a, b) => {
        // Eğer sıralama türü "asc" ise (artan sıralama)
        if (action.payload === "asc") {
          // Ürünleri fiyata göre artan sırayla sıralarız
          return a.price - b.price;
        }
        // Eğer sıralama türü "desc" ise (azalan sıralama)
        else if (action.payload === "desc") {
          // Ürünleri fiyata göre azalan sırayla sıralarız
          return b.price - a.price;
        }
        // Diğer durumlarda (sıralama türü belirtilmemişse veya geçersiz bir türse), herhangi bir değişiklik yapmadan sıralamayı bozarız
        return 0;
      });
    },

    updateData(state, action) {
      state.data = state.data.map((product) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload }
          : product
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { createData, deleteData, updateData, sortingData } =
  dataSlice.actions;
export default dataSlice.reducer;
