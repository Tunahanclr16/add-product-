import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPostAdd } from "react-icons/md";
import { modalFunc } from "../redux/modalSlice";
import Modal from "../ui/Modal";
import { sortingData } from "../redux/dataSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { keywordFunc } from "../redux/keywordSlice";

export default function Navbar() {
  const { modal } = useSelector((state) => state.modal);
  const { favorites } = useSelector((state) => state.favorite); // Redux store'dan favori ürünleri al
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to={"/"} className="text-white font-semibold text-3xl cursor-pointer">
              Logo
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <select
                  onChange={(e) => dispatch(sortingData(e.target.value))}
                  name=""
                  id=""
                  className="bg-white rounded-md w-24 h-10 border-none outline-none"
                  defaultValue=""
                >
                  <option value="" selected>
                    All
                  </option>
                  <option value="asc">Decreasing Price</option>
                  <option value="desc">Increasing Price</option>
                </select>
                <input
                  type="text"
                  onChange={(e) => dispatch(keywordFunc(e.target.value))}
                  placeholder="Search product"
                  className="outline-none border-none w-32 h-10 rounded"
                />
              <NavLink to={"/favorites"} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:text-white">
            Favorites ({favorites.length})
          </NavLink>
              </div>
            </div>
            <div className="ml-3 relative sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <div className="flex space-x-4">
            <select
              onChange={(e) => dispatch(sortingData(e.target.value))}
              name=""
              id=""
              className="bg-white rounded-md w-24 h-10 border-none outline-none"
              defaultValue=""
            >
              <option value="" selected>
                All
              </option>
              <option value="asc">Decreasing Price</option>
              <option value="desc">Increasing Price</option>
            </select>
            <input
              type="text"
              onChange={(e) => dispatch(keywordFunc(e.target.value))}
              placeholder="Search product"
              className="outline-none border-none w-32 h-8 rounded"
            />
          </div>
          <NavLink to={"/favorites"} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:text-white">
            Favorites ({favorites.length})
          </NavLink>
          <button
            onClick={() => dispatch(modalFunc(navigate("/")))}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:text-white"
          >
            <MdPostAdd className="mr-2 h-6 w-6 inline" /> Add Product
          </button>
        </div>
      </div>
      {modal && <Modal />}
    </div>
  );
}
