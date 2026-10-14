import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateLoan,
  calculateMonthlyRate,
  formatCurrency,
  formatPercent,
  CURRENCIES,
} from "../src/modules/apps/components/LoanCalculator/loanUtils.js";

describe("Loan Calculator - Rate Conversion Tests", () => {
  it("should convert monthly rate correctly (1.5% -> 0.015)", () => {
    const rate = calculateMonthlyRate(1.5, "monthly");
    assert.strictEqual(rate, 0.015);
  });

  it("should convert nominal annual rate correctly (18% / 12 -> 0.015)", () => {
    const rate = calculateMonthlyRate(18, "annual", "nominal");
    assert.strictEqual(rate, 0.015);
  });

  it("should convert effective annual rate (E.A.) to monthly equivalent correctly", () => {
    // 19.56% EA -> (1 + 0.1956)^(1/12) - 1 ≈ 0.015 (1.5% mes)
    const rate = calculateMonthlyRate(19.5618, "annual", "effective");
    assert.ok(Math.abs(rate - 0.015) < 0.0001);
  });

  it("should handle 0% interest rate gracefully", () => {
    const rate = calculateMonthlyRate(0, "monthly");
    assert.strictEqual(rate, 0);
  });
});

describe("Loan Calculator - French Amortization (Cuota Fija)", () => {
  it("should calculate fixed installment, exact capital amortization and 0 ending balance", () => {
    const result = calculateLoan({
      loanAmount: 10000000,
      downPayment: 0,
      interestRate: 1.5,
      ratePeriod: "monthly",
      termMonths: 12,
      amortizationSystem: "french",
    });

    assert.strictEqual(result.principal, 10000000);
    assert.strictEqual(result.terms, 12);
    assert.strictEqual(result.schedule.length, 12);

    // Con P=10,000,000, r=0.015, n=12:
    // Cuota fija calculada debe estar entre 916,799 y 916,801
    assert.ok(Math.abs(result.monthlyPayment - 916800) < 5);

    // Suma de amortizaciones a capital debe ser exactamente igual al monto financiado
    const totalPrincipalAmortized = result.schedule.reduce((sum, row) => sum + row.principalPaid, 0);
    assert.ok(Math.abs(totalPrincipalAmortized - 10000000) < 0.01);

    // Último saldo debe ser exactamente 0
    const lastRow = result.schedule[result.schedule.length - 1];
    assert.strictEqual(lastRow.remainingBalance, 0);

    // Interés total debe coincidir con la suma de la tabla
    const totalInterestInSchedule = result.schedule.reduce((sum, row) => sum + row.interestPaid, 0);
    assert.ok(Math.abs(result.totalInterest - totalInterestInSchedule) < 0.01);

    // Total a pagar = Capital + Intereses
    assert.ok(Math.abs(result.totalPayment - (10000000 + result.totalInterest)) < 0.01);
  });

  it("should apply down payment (cuota inicial) reducing the financed capital", () => {
    const result = calculateLoan({
      loanAmount: 20000000,
      downPayment: 5000000, // 25% down payment
      interestRate: 2.0,
      ratePeriod: "monthly",
      termMonths: 24,
      amortizationSystem: "french",
    });

    assert.strictEqual(result.totalAmount, 20000000);
    assert.strictEqual(result.downPayment, 5000000);
    assert.strictEqual(result.principal, 15000000);
    assert.strictEqual(result.downPaymentPercent, 25);

    // El capital amortizado total debe ser 15,000,000
    const totalCapital = result.schedule.reduce((acc, row) => acc + row.principalPaid, 0);
    assert.ok(Math.abs(totalCapital - 15000000) < 0.01);
  });

  it("should handle 0% interest rate without division by zero error", () => {
    const result = calculateLoan({
      loanAmount: 6000000,
      downPayment: 0,
      interestRate: 0,
      ratePeriod: "monthly",
      termMonths: 6,
      amortizationSystem: "french",
    });

    assert.strictEqual(result.monthlyPayment, 1000000);
    assert.strictEqual(result.totalInterest, 0);
    assert.strictEqual(result.totalPayment, 6000000);
    assert.strictEqual(result.schedule[result.schedule.length - 1].remainingBalance, 0);
  });

  it("should handle down payment equal to loan amount (100% cuota inicial)", () => {
    const result = calculateLoan({
      loanAmount: 5000000,
      downPayment: 5000000,
      interestRate: 1.5,
      ratePeriod: "monthly",
      termMonths: 12,
    });

    assert.strictEqual(result.principal, 0);
    assert.strictEqual(result.monthlyPayment, 0);
    assert.strictEqual(result.totalInterest, 0);
    assert.strictEqual(result.totalPayment, 0);
    assert.strictEqual(result.downPaymentPercent, 100);
  });
});

describe("Loan Calculator - German Amortization (Capital Constante)", () => {
  it("should amortize equal principal every month with decreasing payments", () => {
    const result = calculateLoan({
      loanAmount: 12000000,
      downPayment: 0,
      interestRate: 1.0,
      ratePeriod: "monthly",
      termMonths: 12,
      amortizationSystem: "german",
    });

    assert.strictEqual(result.schedule.length, 12);

    // En sistema alemán con P=12,000,000 y n=12, cada abono a capital es exactamente 1,000,000
    for (let i = 0; i < result.schedule.length; i++) {
      assert.strictEqual(result.schedule[i].principalPaid, 1000000);
    }

    // Primera cuota debe ser mayor que la última cuota (decreciente)
    assert.ok(result.schedule[0].payment > result.schedule[11].payment);
    assert.strictEqual(result.maxMonthlyPayment, result.schedule[0].payment);
    assert.strictEqual(result.minMonthlyPayment, result.schedule[11].payment);

    // Saldo final en 0
    assert.strictEqual(result.schedule[11].remainingBalance, 0);
  });
});

describe("Loan Calculator - Cuota de Manejo & Seguro Adicional", () => {
  it("should correctly add fixed monthly management fee", () => {
    const resultWithoutFees = calculateLoan({
      loanAmount: 10000000,
      termMonths: 12,
      interestRate: 1.5,
      includeAdditionalFees: false,
    });

    const managementFee = 15000;
    const resultWithFees = calculateLoan({
      loanAmount: 10000000,
      termMonths: 12,
      interestRate: 1.5,
      includeAdditionalFees: true,
      managementFee,
      insuranceValue: 0,
    });

    // 12 cuotas * 15,000 = 180,000 de manejo
    assert.strictEqual(resultWithFees.totalManagementFees, 180000);
    assert.strictEqual(resultWithFees.totalAdditionalFees, 180000);
    assert.ok(
      Math.abs(resultWithFees.totalGrandPayment - (resultWithoutFees.totalPayment + 180000)) < 0.01
    );

    // Cada cuota en la tabla debe tener la cuota de manejo sumada
    for (const row of resultWithFees.schedule) {
      assert.strictEqual(row.managementFee, 15000);
      assert.ok(Math.abs(row.totalMonthlyPayment - (row.payment + 15000)) < 0.01);
    }
  });

  it("should correctly add fixed monthly insurance fee", () => {
    const insuranceValue = 25000;
    const result = calculateLoan({
      loanAmount: 5000000,
      termMonths: 6,
      interestRate: 1.0,
      includeAdditionalFees: true,
      managementFee: 0,
      insuranceType: "fixed",
      insuranceValue,
    });

    // 6 cuotas * 25,000 = 150,000
    assert.strictEqual(result.totalInsuranceFees, 150000);
    for (const row of result.schedule) {
      assert.strictEqual(row.insuranceFee, 25000);
    }
  });

  it("should correctly calculate insurance as percentage of remaining balance (% desgravamen)", () => {
    const result = calculateLoan({
      loanAmount: 10000000,
      termMonths: 12,
      interestRate: 1.5,
      includeAdditionalFees: true,
      managementFee: 10000,
      insuranceType: "balance_percentage",
      insuranceValue: 0.1, // 0.1% sobre saldo
    });

    assert.strictEqual(result.schedule.length, 12);
    // El primer mes el seguro debe ser sobre el saldo inicial (10,000,000 * 0.1% = 10,000)
    assert.ok(Math.abs(result.schedule[0].insuranceFee - 10000) < 0.01);

    // Como el saldo disminuye cada mes, el seguro de vida disminuye mes a mes
    assert.ok(result.schedule[0].insuranceFee > result.schedule[11].insuranceFee);

    // Cada cuota total debe ser la suma de pago base + seguro + manejo
    for (const row of result.schedule) {
      assert.ok(
        Math.abs(row.totalMonthlyPayment - (row.payment + row.insuranceFee + row.managementFee)) < 0.01
      );
    }
  });
});

describe("Loan Calculator - Formatting and Currency Helpers", () => {
  it("should format currencies correctly for COP, USD, EUR", () => {
    const formattedCOP = formatCurrency(15000000, "COP");
    assert.ok(formattedCOP.includes("15.000.000") || formattedCOP.includes("15,000,000"));

    const formattedUSD = formatCurrency(1500.5, "USD");
    assert.ok(formattedUSD.includes("1,500.50") || formattedUSD.includes("1.500,50"));

    const formattedEUR = formatCurrency(2000, "EUR");
    assert.ok(formattedEUR.includes("2000") || formattedEUR.includes("2.000") || formattedEUR.includes("2,000"));
    assert.ok(formattedEUR.includes("€"));
  });

  it("should format percentages correctly", () => {
    assert.strictEqual(formatPercent(1.5), "1,5%");
    assert.strictEqual(formatPercent(0), "0%");
    assert.strictEqual(formatPercent(25.75), "25,75%");
  });

  it("should include standard currencies list", () => {
    assert.ok(CURRENCIES.length >= 4);
    assert.ok(CURRENCIES.some((c) => c.code === "COP"));
    assert.ok(CURRENCIES.some((c) => c.code === "USD"));
    assert.ok(CURRENCIES.some((c) => c.code === "EUR"));
    assert.ok(CURRENCIES.some((c) => c.code === "MXN"));
  });
});
