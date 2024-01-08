// checks the difference in days between two dates is >= 90
export const isPost3Months = (date1, date2) => {
  const Difference_In_Time = Number(date2) - Number(date1);
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days >= 90 ? true : false;
};
