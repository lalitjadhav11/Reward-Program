import { useContext } from "react";
import { ShopContext } from "./shop-context";

export const useCartActions = () => {

    const {
        cartActions,
        cartDetails
    } = useContext(ShopContext);

    return { cartActions, cartDetails };
    
};