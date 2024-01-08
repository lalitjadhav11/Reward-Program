import { useContext } from "react";
import { ShopContext } from "./shop-context";

export const useOrderActions = () => {
    
    const {
        orderActions,
        orderDetails,
    } = useContext(ShopContext);
    
    return { orderActions, orderDetails };
    
};