import { useState, useEffect } from "react";
import { useCartActions } from "../../context/";
import propTypes from "prop-types";
import "./product.css";

export const Product = ({product = null}) => {  
  const { id, productName, price, productImage } = product;
  const { cartActions, cartDetails } = useCartActions();
  const { addToCart } = cartActions;
  const { cartItems } = cartDetails;
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const cartItemCount = cartItems[id];
    setCartItemCount(cartItemCount);
  }, [cartItems, id]);

  return (
    <div className="product">
      <img
        src={require(`../../assets/products/${productImage}`)}
        alt={productName}
      />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Price: ${price}</p>
      </div>
      <button className="addToCartBtn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && `(${cartItemCount})`}
      </button>
    </div>
  );
};

Product.propTypes = {
  product: propTypes.shape({ 
    id: propTypes.number,
    productName: propTypes.string,
    price: propTypes.number,
    productImage: propTypes.string,
  }).isRequired
};