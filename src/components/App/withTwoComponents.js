import React from "react";
export const withTwoComponents = (FirstComponent, SecondComponent) => ({
  flag,
  ...rest
}) => (flag ? <FirstComponent {...rest} /> : <SecondComponent {...rest} />);
