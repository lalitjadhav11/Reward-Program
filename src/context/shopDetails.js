import { useContext } from "react";
import { ShopContext } from "./shop-context";

export const ShopDetails = () => {

  const {
    cartActions,
    cartDetails,
    orderActions,
    orderDetails,
    productDetails,
    rewardDetails,
    checkout
  } = useContext(ShopContext);

 return { cartActions, cartDetails, orderActions, orderDetails, productDetails, rewardDetails, checkout };

};