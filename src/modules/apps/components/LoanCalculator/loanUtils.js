/**
 * Utilidades financieras y de cálculo para el simulador de préstamos.
 */

export const CURRENCIES = [
  { code: "COP", symbol: "$", name: "Peso Colombiano (COP)", locale: "es-CO", decimals: 0 },
  { code: "USD", symbol: "$", name: "Dólar Estadounidense (USD)", locale: "en-US", decimals: 2 },
  { code: "EUR", symbol: "€", name: "Euro (EUR)", locale: "es-ES", decimals: 2 },
  { code: "MXN", symbol: "$", name: "Peso Mexicano (MXN)", locale: "es-MX", decimals: 2 },
];

/**
 * Formatea un valor numérico a la moneda seleccionada
 */
export const formatCurrency = (value, currencyCode = "COP") => {
  const num = Number(value);
  if (isNaN(num)) return "$ 0";

  const currencyObj = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];

  try {
    return new Intl.NumberFormat(currencyObj.locale, {
      style: "currency",
      currency: currencyObj.code,
      minimumFractionDigits: currencyObj.decimals,
      maximumFractionDigits: currencyObj.decimals,
    }).format(num);
  } catch (error) {
    return `${currencyObj.symbol} ${num.toLocaleString(currencyObj.locale, {
      minimumFractionDigits: currencyObj.decimals,
      maximumFractionDigits: currencyObj.decimals,
    })}`;
  }
};

/**
 * Formatea porcentaje con hasta 2 decimales
 */
export const formatPercent = (val) => {
  const num = Number(val);
  if (isNaN(num)) return "0%";
  return `${num.toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`;
};

/**
 * Calcula la tasa de interés mensual en decimal según el tipo de período
 */
export const calculateMonthlyRate = (rateInput, ratePeriod = "monthly", annualRateType = "nominal") => {
  const rate = Math.max(0, Number(rateInput) || 0);
  if (ratePeriod === "monthly") {
    return rate / 100;
  }
  // Anual
  if (annualRateType === "effective") {
    // Tasa Efectiva Anual: im = (1 + EA)^(1/12) - 1
    return Math.pow(1 + rate / 100, 1 / 12) - 1;
  }
  // Tasa Nominal Anual: im = (TNA / 12)
  return (rate / 100) / 12;
};

/**
 * Calcula la simulación completa de préstamo
 * 
 * @param {Object} params
 * @param {number} params.loanAmount - Valor total o valor del bien
 * @param {number} params.downPayment - Cuota inicial
 * @param {number} params.interestRate - Tasa de interés ingresada (%)
 * @param {'monthly' | 'annual'} params.ratePeriod - Período de la tasa
 * @param {'nominal' | 'effective'} params.annualRateType - Tipo de tasa anual (Nominal o Efectiva Anual)
 * @param {number} params.termMonths - Número de cuotas (meses)
 * @param {'french' | 'german'} params.amortizationSystem - Sistema francés (cuota fija) o alemán (capital constante)
 * @param {boolean} params.includeAdditionalFees - Si incluye seguros o cuota de manejo
 * @param {number} params.managementFee - Cuota de manejo mensual fija
 * @param {'fixed' | 'balance_percentage' | 'loan_percentage'} params.insuranceType - Tipo de seguro adicional
 * @param {number} params.insuranceValue - Monto o porcentaje de seguro adicional
 */
export const calculateLoan = ({
  loanAmount = 10000000,
  downPayment = 0,
  interestRate = 1.5,
  ratePeriod = "monthly",
  annualRateType = "nominal",
  termMonths = 12,
  amortizationSystem = "french",
  includeAdditionalFees = false,
  managementFee = 0,
  insuranceType = "fixed",
  insuranceValue = 0,
}) => {
  const totalAmount = Math.max(0, Number(loanAmount) || 0);
  const initialPayment = Math.max(0, Math.min(totalAmount, Number(downPayment) || 0));
  const principal = Math.max(0, totalAmount - initialPayment);
  const terms = Math.max(1, Math.round(Number(termMonths) || 1));
  const rateInput = Math.max(0, Number(interestRate) || 0);

  const monthlyRate = calculateMonthlyRate(rateInput, ratePeriod, annualRateType);
  const monthlyRatePercent = monthlyRate * 100;

  const validManagementFee = includeAdditionalFees ? Math.max(0, Number(managementFee) || 0) : 0;
  const validInsuranceValue = includeAdditionalFees ? Math.max(0, Number(insuranceValue) || 0) : 0;

  // Si el principal es 0 (ej. cuota inicial cubrió el 100%)
  if (principal === 0) {
    return {
      principal: 0,
      totalAmount,
      downPayment: initialPayment,
      monthlyPayment: 0,
      minMonthlyPayment: 0,
      maxMonthlyPayment: 0,
      totalInterest: 0,
      totalPayment: 0,
      totalManagementFees: 0,
      totalInsuranceFees: 0,
      totalAdditionalFees: 0,
      totalGrandPayment: 0,
      downPaymentPercent: totalAmount > 0 ? 100 : 0,
      interestRatio: 0,
      monthlyRatePercent,
      schedule: [],
      amortizationSystem,
      terms,
      includeAdditionalFees,
      managementFee: validManagementFee,
      insuranceType,
      insuranceValue: validInsuranceValue,
    };
  }

  const schedule = [];
  let remainingBalance = principal;
  let totalInterest = 0;
  let totalPayment = 0;
  let totalInsuranceFees = 0;
  let totalManagementFees = 0;

  // Función auxiliar para calcular seguro en cada cuota
  const calcInsuranceForMonth = (balance) => {
    if (!includeAdditionalFees || validInsuranceValue <= 0) return 0;
    if (insuranceType === "fixed") {
      return validInsuranceValue;
    }
    if (insuranceType === "balance_percentage") {
      // Porcentaje sobre saldo pendiente
      return balance * (validInsuranceValue / 100);
    }
    if (insuranceType === "loan_percentage") {
      // Porcentaje sobre capital prestado original
      return principal * (validInsuranceValue / 100);
    }
    return 0;
  };

  if (amortizationSystem === "french") {
    // Sistema Francés: Cuota Fija de Crédito
    let fixedPayment = 0;
    if (monthlyRate === 0) {
      fixedPayment = principal / terms;
    } else {
      const compoundFactor = Math.pow(1 + monthlyRate, terms);
      fixedPayment = (principal * monthlyRate * compoundFactor) / (compoundFactor - 1);
    }

    let minTotalCuota = Infinity;
    let maxTotalCuota = -Infinity;

    for (let month = 1; month <= terms; month++) {
      const interestForMonth = remainingBalance * monthlyRate;
      let principalPaid = fixedPayment - interestForMonth;
      let currentPayment = fixedPayment;

      const insuranceForMonth = calcInsuranceForMonth(remainingBalance);
      const mgmtForMonth = validManagementFee;

      // Último mes: ajustar decimales para que el saldo quede exactamente en 0
      if (month === terms || principalPaid > remainingBalance) {
        principalPaid = remainingBalance;
        currentPayment = principalPaid + interestForMonth;
        remainingBalance = 0;
      } else {
        remainingBalance -= principalPaid;
        if (remainingBalance < 0.0001) remainingBalance = 0;
      }

      const totalMonthlyWithFees = currentPayment + insuranceForMonth + mgmtForMonth;

      if (totalMonthlyWithFees < minTotalCuota) minTotalCuota = totalMonthlyWithFees;
      if (totalMonthlyWithFees > maxTotalCuota) maxTotalCuota = totalMonthlyWithFees;

      totalInterest += interestForMonth;
      totalPayment += currentPayment;
      totalInsuranceFees += insuranceForMonth;
      totalManagementFees += mgmtForMonth;

      schedule.push({
        month,
        payment: currentPayment,
        principalPaid,
        interestPaid: interestForMonth,
        insuranceFee: insuranceForMonth,
        managementFee: mgmtForMonth,
        additionalFees: insuranceForMonth + mgmtForMonth,
        totalMonthlyPayment: totalMonthlyWithFees,
        remainingBalance,
        totalInterestToDate: totalInterest,
      });
    }

    const totalAdditionalFees = totalInsuranceFees + totalManagementFees;
    const totalGrandPayment = totalPayment + totalAdditionalFees;

    return {
      principal,
      totalAmount,
      downPayment: initialPayment,
      monthlyPayment: fixedPayment,
      minMonthlyPayment: fixedPayment,
      maxMonthlyPayment: fixedPayment,
      totalMonthlyPayment: schedule[0]?.totalMonthlyPayment || fixedPayment,
      minTotalMonthlyPayment: minTotalCuota === Infinity ? fixedPayment : minTotalCuota,
      maxTotalMonthlyPayment: maxTotalCuota === -Infinity ? fixedPayment : maxTotalCuota,
      totalInterest,
      totalPayment,
      totalManagementFees,
      totalInsuranceFees,
      totalAdditionalFees,
      totalGrandPayment,
      downPaymentPercent: totalAmount > 0 ? (initialPayment / totalAmount) * 100 : 0,
      interestRatio: principal > 0 ? (totalInterest / principal) * 100 : 0,
      monthlyRatePercent,
      schedule,
      amortizationSystem,
      terms,
      includeAdditionalFees,
      managementFee: validManagementFee,
      insuranceType,
      insuranceValue: validInsuranceValue,
    };
  } else {
    // Sistema Alemán: Amortización Constante de Capital
    const constantPrincipal = principal / terms;
    let minPayment = Infinity;
    let maxPayment = -Infinity;
    let minTotalCuota = Infinity;
    let maxTotalCuota = -Infinity;

    for (let month = 1; month <= terms; month++) {
      const interestForMonth = remainingBalance * monthlyRate;
      let principalPaid = constantPrincipal;

      const insuranceForMonth = calcInsuranceForMonth(remainingBalance);
      const mgmtForMonth = validManagementFee;

      if (month === terms || principalPaid > remainingBalance) {
        principalPaid = remainingBalance;
      }

      const currentPayment = principalPaid + interestForMonth;
      remainingBalance = Math.max(0, remainingBalance - principalPaid);

      const totalMonthlyWithFees = currentPayment + insuranceForMonth + mgmtForMonth;

      if (currentPayment < minPayment) minPayment = currentPayment;
      if (currentPayment > maxPayment) maxPayment = currentPayment;
      if (totalMonthlyWithFees < minTotalCuota) minTotalCuota = totalMonthlyWithFees;
      if (totalMonthlyWithFees > maxTotalCuota) maxTotalCuota = totalMonthlyWithFees;

      totalInterest += interestForMonth;
      totalPayment += currentPayment;
      totalInsuranceFees += insuranceForMonth;
      totalManagementFees += mgmtForMonth;

      schedule.push({
        month,
        payment: currentPayment,
        principalPaid,
        interestPaid: interestForMonth,
        insuranceFee: insuranceForMonth,
        managementFee: mgmtForMonth,
        additionalFees: insuranceForMonth + mgmtForMonth,
        totalMonthlyPayment: totalMonthlyWithFees,
        remainingBalance,
        totalInterestToDate: totalInterest,
      });
    }

    const totalAdditionalFees = totalInsuranceFees + totalManagementFees;
    const totalGrandPayment = totalPayment + totalAdditionalFees;

    return {
      principal,
      totalAmount,
      downPayment: initialPayment,
      monthlyPayment: schedule[0]?.payment || 0,
      minMonthlyPayment: minPayment === Infinity ? 0 : minPayment,
      maxMonthlyPayment: maxPayment === -Infinity ? 0 : maxPayment,
      totalMonthlyPayment: schedule[0]?.totalMonthlyPayment || 0,
      minTotalMonthlyPayment: minTotalCuota === Infinity ? 0 : minTotalCuota,
      maxTotalMonthlyPayment: maxTotalCuota === -Infinity ? 0 : maxTotalCuota,
      totalInterest,
      totalPayment,
      totalManagementFees,
      totalInsuranceFees,
      totalAdditionalFees,
      totalGrandPayment,
      downPaymentPercent: totalAmount > 0 ? (initialPayment / totalAmount) * 100 : 0,
      interestRatio: principal > 0 ? (totalInterest / principal) * 100 : 0,
      monthlyRatePercent,
      schedule,
      amortizationSystem,
      terms,
      includeAdditionalFees,
      managementFee: validManagementFee,
      insuranceType,
      insuranceValue: validInsuranceValue,
    };
  }
};

/**
 * Exporta la tabla de amortización a formato CSV descargable
 */
export const exportScheduleToCSV = (schedule, summary, currencyCode = "COP") => {
  if (!schedule || schedule.length === 0) return;

  const hasAdditional = summary.includeAdditionalFees && summary.totalAdditionalFees > 0;

  const headers = [
    "N° Cuota",
    "Cuota Crédito",
    ...(hasAdditional ? ["Seguro Adicional", "Cuota de Manejo", "Pago Total Cuota"] : []),
    "Abono a Capital",
    "Intereses Pagados",
    "Saldo Pendiente",
    "Intereses Acumulados",
  ];

  const rows = schedule.map((item) => [
    item.month,
    item.payment.toFixed(2),
    ...(hasAdditional
      ? [
          item.insuranceFee.toFixed(2),
          item.managementFee.toFixed(2),
          item.totalMonthlyPayment.toFixed(2),
        ]
      : []),
    item.principalPaid.toFixed(2),
    item.interestPaid.toFixed(2),
    item.remainingBalance.toFixed(2),
    item.totalInterestToDate.toFixed(2),
  ]);

  const metaRows = [
    ["--- SIMULACION DE PRESTAMO ---"],
    ["Monto Total Solicitado", summary.totalAmount],
    ["Cuota Inicial", summary.downPayment],
    ["Monto Financiado (Capital)", summary.principal],
    ["Plazo en Meses", summary.terms],
    ["Sistema de Amortizacion", summary.amortizationSystem === "french" ? "Frances (Cuota Fija)" : "Aleman (Capital Fijo)"],
    ["Total Intereses", summary.totalInterest.toFixed(2)],
    ["Total Credito (Capital + Intereses)", summary.totalPayment.toFixed(2)],
    ...(hasAdditional
      ? [
          ["Total Seguros", summary.totalInsuranceFees.toFixed(2)],
          ["Total Cuotas de Manejo", summary.totalManagementFees.toFixed(2)],
          ["TOTAL GENERAL A PAGAR", summary.totalGrandPayment.toFixed(2)],
        ]
      : []),
    ["Moneda", currencyCode],
    [],
  ];

  const csvContent =
    "\uFEFF" +
    metaRows.map((r) => r.join(",")).join("\n") +
    headers.join(",") +
    "\n" +
    rows.map((r) => r.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `amortizacion_prestamo_${summary.terms}cuotas.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
