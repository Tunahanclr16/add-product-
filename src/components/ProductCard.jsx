import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect } from "react";
import { deleteData } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useNavigate } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../redux/favoriteSlice";
import toast, { Toaster } from 'react-hot-toast';

export default function ProductCard() {
  const { data } = useSelector((state) => state.data);
  const { favorites } = useSelector((state) => state.favorite);
  const { keyword } = useSelector((state) => state.keyword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openEditIndex, setOpenEditIndex] = useState(false);

  useEffect(() => {
    console.log("Favorites:", favorites);
  }, [favorites]);

  const editFunc = (dt) => {
    dispatch(modalFunc());
    setOpenEditIndex(false);
    navigate(`/?products=${dt.id}`);
  };

  const addToFavoritesHandler = (product) => {
    const isAlreadyAdded = favorites.find((item) => item.id === product.id);
    if (isAlreadyAdded) {
      toast.error("This product is already in favorites!");
    } else {
      dispatch(addToFavorites(product));
      setOpenEditIndex(false);
      toast.success("Added to favorites");
    }
  };
  
  const deleteProduct = (productId) => {
    const isFavorite = favorites.find((item) => item.id === productId);
    if (isFavorite) {
      dispatch(removeFromFavorites({ id: productId }));
    }
    dispatch(deleteData(productId));
    navigate("/");
    setOpenEditIndex(false);
  };

  // Arama işlemini gerçekleştir
  const filteredProducts = data.filter((dt) =>
  dt.name.toLowerCase().includes(keyword.toLowerCase())
);

  return (
    <div className="flex items-center sm:justify-start justify-center flex-wrap">
      {filteredProducts.map((dt, index) => (
        <div
          className="w-[250px] xs:w-[300px] h-[250px] xs:h-[300px] rounded m-2 flex flex-col-reverse items-center relative"
          key={index}
        >
          <img
            onClick={() => setOpenEditIndex(false)}
            src={dt.url}
            className="w-full rounded-md  h-full absolute"
            alt=""
          />
          <div className="absolute w-full p-1 flex justify-between h-14 bg-blue-500">
            <h3 className="text-white text-xl">{dt.name}</h3>
            <span className="text-white text-lg">{dt.price}$</span>
          </div>
          <div
            onClick={() => setOpenEditIndex(index)}
            className="absolute top-0 right-0 cursor-pointer"
          >
            <BsThreeDots size={32} color="black" />
          </div>
          {openEditIndex === index && (
            <div className="absolute top-0 right-0 mt-10 mr-2 bg-black text-white border-white border rounded p-2">
              <div
                onClick={() => editFunc(dt)}
                className="cursor-pointer hover:text-blue-500"
              >
                Update
              </div>
              <div
                onClick={() => {
                  deleteProduct(dt.id)
                }}
                className="cursor-pointer hover:text-red-500"
              >
                Delete
              </div>
              <div
                onClick={() => addToFavoritesHandler(dt)}
                className="cursor-pointer hover:text-yellow-500"
              >
                Add to Favorites
              </div>
            </div>
          )}
        </div>
      ))}
      <Toaster />
    </div>
  );
}
