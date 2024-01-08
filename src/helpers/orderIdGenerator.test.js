import orderIdGenerator from "./orderIdGenerator";

test("Calculate Reward Points", () => {
  expect(/^[a-zA-Z0-9-]{36}$/.test(orderIdGenerator())).toEqual(true);
});
