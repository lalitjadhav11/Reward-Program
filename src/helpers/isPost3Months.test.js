import { isPost3Months } from "./isPost3Months";

test("Calculate Reward Points", () => {
  expect(isPost3Months(1686790230000, 1699641000000)).toEqual(true);
  expect(isPost3Months(1699641000000, 1686790230000)).toEqual(false);
});