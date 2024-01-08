import React from "react";
// this is custom test case helper
const TestCaseHelper = ({
  contextValue,
  modalContextValue,
  componentContext,
  Component,
  ...props
}) => {
  return (
    <componentContext.Provider value={contextValue || {}}>
      <Component {...props} />
    </componentContext.Provider>
  );
};

export default TestCaseHelper;
