import React from "react";
import BlogLayout from "@modules/blog/layouts/blog.layout";
import LoanCalculator from "@modules/apps/components/LoanCalculator/LoanCalculator";

const CalculadoraPrestamoPage = () => {
  return (
    <BlogLayout>
      <LoanCalculator />
    </BlogLayout>
  );
};

export default CalculadoraPrestamoPage;
