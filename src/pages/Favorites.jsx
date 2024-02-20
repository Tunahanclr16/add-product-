import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../redux/favoriteSlice";

export default function FavoritesPage() {
  const { favorites } = useSelector((state) => state.favorite); // Redux store'dan favori ürünleri al
  const dispatch = useDispatch();
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4">Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-32">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="bg-white  p-4 shadow-md rounded-md"
            >
              <img
                src={favorite.url}
                alt={favorite.name}
                className="w-full h-full object-contain rounded-md mb-4"
              />
              <div className="flex justify-between gap-2 items-center mb-2">
                <h3 className="text-lg whitespace-nowrap font-semibold">
                  {favorite.name}
                </h3>
                <span className="text-gray-600">${favorite.price}</span>
              </div>
              <button
                onClick={() => dispatch(removeFromFavorites(favorite))}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Remove from favorites{" "}
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-red-500 text-3xl font-bold mt-2">
            No favorite products added yet!
          </div>
        )}
      </div>
    </div>
  );
}
