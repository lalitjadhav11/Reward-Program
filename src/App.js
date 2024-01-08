import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./Error-Boundery";
import { Navbar } from "./components/navbar/navbar";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { Checkout } from "./pages/checkout/checkout";
import { Orders } from "./pages/orders/orders";
import { ShopContextProvider } from "./context/shop-context";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </Router>
        </ShopContextProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
