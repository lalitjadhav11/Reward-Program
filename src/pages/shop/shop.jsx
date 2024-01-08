import { Product } from "./product";
import { useProductDetails } from "../../context/";
import { useNavigate } from "react-router-dom";
import "./shop.css";

export const Shop = () => {
  const { productDetails } = useProductDetails();
  const { totalProducts } = productDetails;
  const navigate = useNavigate();

  return (
    <div className="shop">
      <div className="products">
        { totalProducts?.map((product) => <Product product={product} key={product.id} />) }
      </div>
      <div className="cartBtn">
        <button onClick={() => navigate("/cart")}>Go To Cart</button>
      </div>
    </div>
  );
};
