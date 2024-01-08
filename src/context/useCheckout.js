import { useContext } from "react";
import { ShopContext } from "./shop-context";

export const useCheckout = () => {
    
    const {
        checkout
    } = useContext(ShopContext);
    
    return { checkout };
    
};