import { useDispatch, useSelector } from "react-redux";
import { modalFunc } from "../redux/modalSlice";
import Input from "./Input";
import { useState, useEffect } from "react"; // useEffect ekledik
import Button from "./Button";
import { createData, updateData } from "../redux/dataSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { removeFromFavorites } from "../redux/favoriteSlice";
import toast, { Toaster } from 'react-hot-toast';

export default function Modal() {
  const {data}= useSelector((state)=>state.data)
  const dispatch = useDispatch();
  const location=useLocation()
  const { favorites } = useSelector((state) => state.favorite); // Redux store'dan favori ürünleri al
  const navigate=useNavigate();
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });
  console.log("data",data)

  const modalClose = () => {
    dispatch(modalFunc());
    navigate('/')
  };

  const onChangeFunc = (e, type) => {
    if (type === "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  const loc=location.search.split("=")[1]
  useEffect(() => {
        if(loc){
              setProductInfo(data.find(dt=>dt.id== loc))
        }
}, [loc])
console.log(location.search.split('=')[1],"location")

const btnFunc = () => {
  // Eğer mevcut ürünün ID'si varsa, güncelleme işlemini gerçekleştir
  if (productInfo.id) {
    // Eğer güncellenen ürün favorilerde bulunuyorsa, favorilerden kaldır
    const isFavorite = favorites.find((item) => item.id === productInfo.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(productInfo)); // Favorilerden kaldır
      toast.success("The product has been removed because it was found in favorites.")
    }
    dispatch(updateData(productInfo)); // Güncelleme action'ını çağır
    toast.success("Product updated")
    navigate('/')
  } else {
    // Yoksa, yeni bir ürün oluştur
    dispatch(createData({...productInfo, id: data.length + 1}));
  }
  dispatch(modalFunc());
};

    return (
    <>
      <div className="absolute h-full w-full z-10 bg-black/60 left-0 right-0 "></div>
      <div className="fixed w-full z-50 h-full flex items-center justify-center top-0 left-0 right-0">
        <div className=" w-72 sm:w-1/3 bg-white shadow-lg rounded-md p-4">
          <div className="flex items-center justify-between ">
            <div>modal</div>
            <div onClick={modalClose} className="cursor-pointer">
              kapat
            </div>
          </div>
          <Input
            onChange={(e) => onChangeFunc(e, "name")}
            type={"text"}
            value={productInfo.name}
            placeholder={"product name"}
            id={"name"}
            name={"name"}
          />
          <Input
            placeholder={"Product price"}
            name={"price"}
            value={productInfo.price}
            id={"price"}
            type={"number"}
            onChange={(e) => onChangeFunc(e, "price")}
          />
          <Input
            onChange={(e) => onChangeFunc(e, "url")}
            type={"file"}
            placeholder={"product image"}
            id={"url"}
            name={"url"}
            accept="image/jpeg, image/png" // Yalnızca JPG ve PNG dosyalarını kabul et
          />
         <div className="flex justify-end items-center mt-4 ">
            <Button btnText={loc ? "update": "create"} onClick={btnFunc} />
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
}
