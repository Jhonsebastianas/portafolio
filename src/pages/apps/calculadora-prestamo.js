import React from "react";
import BlogLayout from "@modules/blog/layouts/blog.layout";
import LoanCalculator from "@modules/apps/components/LoanCalculator/LoanCalculator";

const CalculadoraPrestamoPage = () => {
  return (
    <BlogLayout>
      <div className="section" style={{ paddingTop: "2rem" }}>
        <LoanCalculator />
      </div>
    </BlogLayout>
  );
};

export default CalculadoraPrestamoPage;
