import { render, fireEvent } from "@testing-library/react";
import { Shop } from "./shop";
import { ShopContext } from "../../context/shop-context";
import TestCaseHelper from "../../helpers/test-case-helpers";
import "@testing-library/jest-dom";

const mockNavigateFn = jest.fn();

jest.mock("react-router-dom", () => {
  return { useNavigate: () => mockNavigateFn };
});

test("Shop component rendering", () => {
  const productData = {
    id: 1,
    productName: "test product",
    price: 25.0,
    productImage: "1.png",
  };
  const contextValue = {
    productDetails: { totalProducts: [productData] },
    cartDetails: { cartItems: {} },
    cartActions: { addToCart: jest.fn() },
  };

  const { getByText } = render(
    <TestCaseHelper
      Component={Shop}
      componentContext={ShopContext}
      contextValue={contextValue}
    >
      {" "}
    </TestCaseHelper>
  );

  const linkElement = getByText("Go To Cart");
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement);
  expect(mockNavigateFn).toHaveBeenCalled();
});
