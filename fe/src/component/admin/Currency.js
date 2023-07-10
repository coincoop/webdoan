import React from "react";

const formatCurrency = (value) => {
  const formattedValue = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

  return formattedValue.slice(0, -1);
};

const Currency = ({ value }) => <>{formatCurrency(value)}</>;

export default Currency;
