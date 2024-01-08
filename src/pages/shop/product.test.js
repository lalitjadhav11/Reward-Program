import { render, fireEvent } from "@testing-library/react";
import { Product } from "./product";
import { ShopContext } from "../../context/shop-context";
import TestCaseHelper from "../../helpers/test-case-helpers";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => {
  return { useNavigate: jest.fn() };
});

test("Product component rendering", () => {
  const productData = {
    id: 1,
    productName: "test product",
    price: 25.0,
    productImage: "1.png",
  };
  const contextValue = {
    cartDetails: { cartItems: {} },
    cartActions: { addToCart: jest.fn() },
  };

  const { getByText, getByAltText } = render(
    <TestCaseHelper
      Component={Product}
      componentContext={ShopContext}
      product={productData}
      contextValue={contextValue}
    >
      {" "}
    </TestCaseHelper>
  );

  const addToCartBtn = getByText("Add To Cart");
  expect(addToCartBtn).toBeInTheDocument();
  expect(getByText("test product")).toBeInTheDocument();
  expect(getByText("Price: $25")).toBeInTheDocument();
  expect(getByAltText("test product")).toBeInTheDocument();

  fireEvent.click(addToCartBtn);
  expect(contextValue.cartActions.addToCart).toHaveBeenCalledWith(1);
});
