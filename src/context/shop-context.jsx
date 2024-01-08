import { createContext, useState, useEffect, useCallback } from "react";
import { isPost3Months } from "../helpers/isPost3Months";
import LoadingSpinner from "../components/loading-spinner/loading-spinner";
export const ShopContext = createContext({
  cartActions: {},
  cartDetails: {},
  orderActions: {},
  orderDetails: {},
  productDetails: {},
  rewardDetails: {},
  checkout: () => {},
});
// This is a common context of the application with all data
const getDefaultCart = (PRODUCTS = []) => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [totalProducts, setTotalProducts] = useState();
  const [cartItems, setCartItems] = useState({});
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalRewardNumber, setTotalRewardNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const productsResponse = await fetch("/api-data/products.json");
        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await productsResponse.json();
        setCartItems(getDefaultCart(productsData));
        setTotalProducts(productsData);

        const ordersResponse = await fetch("/api-data/orders.json");
        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch orders");
        }
        const ordersData = await ordersResponse.json();
        setTotalOrders(ordersData);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTotalRewardNumber(
      totalOrders.reduce((totalRewardPoints, order) => {
        if (!isPost3Months(order.date, new Date().getTime())) {
          return totalRewardPoints + Number(order.rewardPoints);
        }
        return totalRewardPoints;
      }, 0)
    );
  }, [totalProducts, totalOrders]);

  const getTotalCartAmount = useCallback(() => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = totalProducts.find(
          (product) => product.id === Number(item)
        );
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return Number(totalAmount.toFixed(2));
  }, [cartItems, totalProducts]);

  const addToCart = useCallback((itemId) => {
    setCartItems((prev) => {
      return { ...prev, [itemId]: prev[itemId] + 1 };
    });
    setTotalItemsInCart((prev) => prev + 1);
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => {
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });
    setTotalItemsInCart((prev) => prev - 1);
  }, []);

  const updateCartItemCount = useCallback((newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  }, []);

  const checkout = useCallback(() => {
    setTotalItemsInCart(0);
    setCartItems(getDefaultCart(totalProducts));
  }, [totalProducts]);

  const cartActions = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
  };
  const cartDetails = { cartItems, totalItemsInCart };
  const orderActions = { setTotalOrders, setOrderId };
  const orderDetails = { orderId, totalOrders };
  const productDetails = { totalProducts };
  const rewardDetails = { totalRewardNumber, setTotalRewardNumber };

  const contextValue = {
    cartActions,
    cartDetails,
    orderActions,
    orderDetails,
    productDetails,
    rewardDetails,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {isLoading ? <LoadingSpinner /> : props.children}
    </ShopContext.Provider>
  );
};
