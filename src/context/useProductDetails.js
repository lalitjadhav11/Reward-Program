import { useContext } from "react";
import { ShopContext } from "./shop-context";

export const useProductDetails = () => {
    
    const {
        productDetails
    } = useContext(ShopContext);
    
    return { productDetails };
    
};