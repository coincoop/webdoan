import React from "react";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const Currency = ({ value }) => <>{formatCurrency(value)}</>;

export default Currency;
