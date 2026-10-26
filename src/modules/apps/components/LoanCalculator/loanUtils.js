/**
 * Utilidades financieras y de cálculo para el simulador de préstamos.
 */

export const CURRENCIES = [
  { code: "COP", symbol: "$", name: "Peso Colombiano (COP)", locale: "es-CO", decimals: 0, thousandSeparator: ".", decimalSeparator: "," },
  { code: "USD", symbol: "$", name: "Dólar Estadounidense (USD)", locale: "en-US", decimals: 2, thousandSeparator: ",", decimalSeparator: "." },
  { code: "EUR", symbol: "€", name: "Euro (EUR)", locale: "es-ES", decimals: 2, thousandSeparator: ".", decimalSeparator: "," },
  { code: "MXN", symbol: "$", name: "Peso Mexicano (MXN)", locale: "es-MX", decimals: 2, thousandSeparator: ",", decimalSeparator: "." },
];

/**
 * Obtiene la configuración de la moneda
 */
export const getCurrencyConfig = (currencyCode = "COP") => {
  return CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
};

/**
 * Obtiene el separador de miles según la moneda
 */
export const getThousandSeparator = (currencyCode = "COP") => {
  const config = getCurrencyConfig(currencyCode);
  return config.thousandSeparator || (config.locale.startsWith("es") ? "." : ",");
};

/**
 * Formatea un número con máscara de miles para inputs en tiempo real
 * Ej. 15000000 -> "15.000.000" (COP) o "15,000,000" (USD)
 */
export const formatMaskedNumber = (value, currencyCode = "COP") => {
  if (value === null || value === undefined || value === "") return "";
  const num = Number(value);
  if (isNaN(num)) return "";
  if (num === 0) return "0";
  const sep = getThousandSeparator(currencyCode);
  const parts = Math.round(num).toString();
  return parts.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
};

/**
 * Parsea un string con separadores de miles y devuelve el número entero limpio
 * Ej. "15.000.000" -> 15000000
 */
export const parseMaskedNumber = (str) => {
  if (str === null || str === undefined) return 0;
  const digits = String(str).replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : 0;
};

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
 * Calcula la simulación completa de préstamo con soporte de cuota inicial,
 * cuota de manejo, seguro adicional y abonos extraordinarios a capital.
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
  // Abonos proyectados
  hasPrepayments = false,
  monthlyPrepayment = 0,
  prepaymentStrategy = "reduce_term", // 'reduce_term' | 'reduce_payment'
  hasLumpSum = false,
  lumpSumAmount = 0,
  lumpSumMonth = 6,
  _isInternalBaseCall = false,
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

  const validMonthlyPrepayment = hasPrepayments ? Math.max(0, Number(monthlyPrepayment) || 0) : 0;
  const validLumpSumAmount = (hasPrepayments && hasLumpSum) ? Math.max(0, Number(lumpSumAmount) || 0) : 0;
  const validLumpSumMonth = Math.max(1, Math.round(Number(lumpSumMonth) || 1));

  // Si el principal es 0 (ej. cuota inicial cubrió el 100%)
  if (principal === 0) {
    return {
      principal: 0,
      totalAmount,
      downPayment: initialPayment,
      monthlyPayment: 0,
      minMonthlyPayment: 0,
      maxMonthlyPayment: 0,
      totalMonthlyPayment: 0,
      minTotalMonthlyPayment: 0,
      maxTotalMonthlyPayment: 0,
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
      actualTerms: 0,
      monthsSaved: 0,
      interestSaved: 0,
      interestSavedPercent: 0,
      totalPrepaymentsPaid: 0,
      includeAdditionalFees,
      managementFee: validManagementFee,
      insuranceType,
      insuranceValue: validInsuranceValue,
      hasPrepayments,
      monthlyPrepayment: validMonthlyPrepayment,
      prepaymentStrategy,
      hasLumpSum,
      lumpSumAmount: validLumpSumAmount,
      lumpSumMonth: validLumpSumMonth,
    };
  }

  // Si se aplican abonos, calcular primero el escenario base sin abonos para conocer ahorros
  let baseScenario = null;
  if (hasPrepayments && !_isInternalBaseCall) {
    baseScenario = calculateLoan({
      loanAmount,
      downPayment,
      interestRate,
      ratePeriod,
      annualRateType,
      termMonths,
      amortizationSystem,
      includeAdditionalFees,
      managementFee,
      insuranceType,
      insuranceValue,
      hasPrepayments: false,
      _isInternalBaseCall: true,
    });
  }

  const schedule = [];
  let remainingBalance = principal;
  let totalInterest = 0;
  let totalPayment = 0;
  let totalInsuranceFees = 0;
  let totalManagementFees = 0;
  let totalPrepaymentsPaid = 0;

  // Función auxiliar para calcular seguro en cada cuota
  const calcInsuranceForMonth = (balance) => {
    if (!includeAdditionalFees || validInsuranceValue <= 0) return 0;
    if (insuranceType === "fixed") {
      return validInsuranceValue;
    }
    if (insuranceType === "balance_percentage") {
      return balance * (validInsuranceValue / 100);
    }
    if (insuranceType === "loan_percentage") {
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

    const initialFixedPayment = fixedPayment;
    let minTotalCuota = Infinity;
    let maxTotalCuota = -Infinity;

    for (let month = 1; month <= terms && remainingBalance > 0.001; month++) {
      const interestForMonth = remainingBalance * monthlyRate;
      let regularPrincipal = fixedPayment - interestForMonth;

      // Calcular abono extraordinario para este mes
      let extraForMonth = 0;
      if (hasPrepayments) {
        extraForMonth += validMonthlyPrepayment;
        if (hasLumpSum && month === validLumpSumMonth) {
          extraForMonth += validLumpSumAmount;
        }
      }

      const insuranceForMonth = calcInsuranceForMonth(remainingBalance);
      const mgmtForMonth = validManagementFee;

      let currentPrincipalPaid = regularPrincipal;
      let actualPrepaymentPaid = extraForMonth;
      let currentPayment = fixedPayment;

      const totalAmortizationDesired = regularPrincipal + extraForMonth;

      if (totalAmortizationDesired >= remainingBalance || month === terms) {
        // El préstamo se liquida en este mes
        if (remainingBalance <= regularPrincipal) {
          currentPrincipalPaid = remainingBalance;
          actualPrepaymentPaid = 0;
        } else {
          currentPrincipalPaid = regularPrincipal;
          actualPrepaymentPaid = remainingBalance - regularPrincipal;
        }
        currentPayment = currentPrincipalPaid + interestForMonth;
        remainingBalance = 0;
      } else {
        remainingBalance -= (currentPrincipalPaid + actualPrepaymentPaid);
        if (remainingBalance < 0.0001) remainingBalance = 0;
      }

      const totalMonthlyWithFees = currentPayment + actualPrepaymentPaid + insuranceForMonth + mgmtForMonth;

      if (totalMonthlyWithFees < minTotalCuota) minTotalCuota = totalMonthlyWithFees;
      if (totalMonthlyWithFees > maxTotalCuota) maxTotalCuota = totalMonthlyWithFees;

      totalInterest += interestForMonth;
      totalPayment += currentPayment;
      totalPrepaymentsPaid += actualPrepaymentPaid;
      totalInsuranceFees += insuranceForMonth;
      totalManagementFees += mgmtForMonth;

      schedule.push({
        month,
        payment: currentPayment,
        principalPaid: currentPrincipalPaid,
        prepayment: actualPrepaymentPaid,
        interestPaid: interestForMonth,
        insuranceFee: insuranceForMonth,
        managementFee: mgmtForMonth,
        additionalFees: insuranceForMonth + mgmtForMonth,
        totalMonthlyPayment: totalMonthlyWithFees,
        remainingBalance,
        totalInterestToDate: totalInterest,
        isEarlyPayoff: remainingBalance === 0 && month < terms,
      });

      // Si la estrategia es 'reduce_payment' y hubo abono extraordinario, re-amortizar el saldo restante
      if (
        hasPrepayments &&
        prepaymentStrategy === "reduce_payment" &&
        actualPrepaymentPaid > 0 &&
        remainingBalance > 0.001 &&
        month < terms
      ) {
        const remainingTerms = terms - month;
        if (monthlyRate === 0) {
          fixedPayment = remainingBalance / remainingTerms;
        } else {
          const factor = Math.pow(1 + monthlyRate, remainingTerms);
          fixedPayment = (remainingBalance * monthlyRate * factor) / (factor - 1);
        }
      }
    }

    const totalAdditionalFees = totalInsuranceFees + totalManagementFees;
    const totalGrandPayment = totalPayment + totalPrepaymentsPaid + totalAdditionalFees;

    const actualTerms = schedule.length;
    const monthsSaved = baseScenario ? Math.max(0, terms - actualTerms) : 0;
    const interestSaved = baseScenario ? Math.max(0, baseScenario.totalInterest - totalInterest) : 0;
    const interestSavedPercent = (baseScenario && baseScenario.totalInterest > 0)
      ? (interestSaved / baseScenario.totalInterest) * 100
      : 0;

    return {
      principal,
      totalAmount,
      downPayment: initialPayment,
      monthlyPayment: initialFixedPayment,
      minMonthlyPayment: initialFixedPayment,
      maxMonthlyPayment: initialFixedPayment,
      totalMonthlyPayment: schedule[0]?.totalMonthlyPayment || initialFixedPayment,
      minTotalMonthlyPayment: minTotalCuota === Infinity ? initialFixedPayment : minTotalCuota,
      maxTotalMonthlyPayment: maxTotalCuota === -Infinity ? initialFixedPayment : maxTotalCuota,
      totalInterest,
      totalPayment,
      totalPrepaymentsPaid,
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
      actualTerms,
      monthsSaved,
      interestSaved,
      interestSavedPercent,
      baseScenario,
      includeAdditionalFees,
      managementFee: validManagementFee,
      insuranceType,
      insuranceValue: validInsuranceValue,
      hasPrepayments,
      monthlyPrepayment: validMonthlyPrepayment,
      prepaymentStrategy,
      hasLumpSum,
      lumpSumAmount: validLumpSumAmount,
      lumpSumMonth: validLumpSumMonth,
    };
  } else {
    // Sistema Alemán: Amortización Constante de Capital
    let constantPrincipal = principal / terms;
    let minPayment = Infinity;
    let maxPayment = -Infinity;
    let minTotalCuota = Infinity;
    let maxTotalCuota = -Infinity;

    for (let month = 1; month <= terms && remainingBalance > 0.001; month++) {
      const interestForMonth = remainingBalance * monthlyRate;

      let extraForMonth = 0;
      if (hasPrepayments) {
        extraForMonth += validMonthlyPrepayment;
        if (hasLumpSum && month === validLumpSumMonth) {
          extraForMonth += validLumpSumAmount;
        }
      }

      const insuranceForMonth = calcInsuranceForMonth(remainingBalance);
      const mgmtForMonth = validManagementFee;

      let currentPrincipalPaid = constantPrincipal;
      let actualPrepaymentPaid = extraForMonth;

      const totalAmortizationDesired = constantPrincipal + extraForMonth;

      if (totalAmortizationDesired >= remainingBalance || month === terms) {
        if (remainingBalance <= constantPrincipal) {
          currentPrincipalPaid = remainingBalance;
          actualPrepaymentPaid = 0;
        } else {
          currentPrincipalPaid = constantPrincipal;
          actualPrepaymentPaid = remainingBalance - constantPrincipal;
        }
        remainingBalance = 0;
      } else {
        remainingBalance = Math.max(0, remainingBalance - (currentPrincipalPaid + actualPrepaymentPaid));
      }

      const currentPayment = currentPrincipalPaid + interestForMonth;
      const totalMonthlyWithFees = currentPayment + actualPrepaymentPaid + insuranceForMonth + mgmtForMonth;

      if (currentPayment < minPayment) minPayment = currentPayment;
      if (currentPayment > maxPayment) maxPayment = currentPayment;
      if (totalMonthlyWithFees < minTotalCuota) minTotalCuota = totalMonthlyWithFees;
      if (totalMonthlyWithFees > maxTotalCuota) maxTotalCuota = totalMonthlyWithFees;

      totalInterest += interestForMonth;
      totalPayment += currentPayment;
      totalPrepaymentsPaid += actualPrepaymentPaid;
      totalInsuranceFees += insuranceForMonth;
      totalManagementFees += mgmtForMonth;

      schedule.push({
        month,
        payment: currentPayment,
        principalPaid: currentPrincipalPaid,
        prepayment: actualPrepaymentPaid,
        interestPaid: interestForMonth,
        insuranceFee: insuranceForMonth,
        managementFee: mgmtForMonth,
        additionalFees: insuranceForMonth + mgmtForMonth,
        totalMonthlyPayment: totalMonthlyWithFees,
        remainingBalance,
        totalInterestToDate: totalInterest,
        isEarlyPayoff: remainingBalance === 0 && month < terms,
      });

      if (
        hasPrepayments &&
        prepaymentStrategy === "reduce_payment" &&
        actualPrepaymentPaid > 0 &&
        remainingBalance > 0.001 &&
        month < terms
      ) {
        constantPrincipal = remainingBalance / (terms - month);
      }
    }

    const totalAdditionalFees = totalInsuranceFees + totalManagementFees;
    const totalGrandPayment = totalPayment + totalPrepaymentsPaid + totalAdditionalFees;

    const actualTerms = schedule.length;
    const monthsSaved = baseScenario ? Math.max(0, terms - actualTerms) : 0;
    const interestSaved = baseScenario ? Math.max(0, baseScenario.totalInterest - totalInterest) : 0;
    const interestSavedPercent = (baseScenario && baseScenario.totalInterest > 0)
      ? (interestSaved / baseScenario.totalInterest) * 100
      : 0;

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
      totalPrepaymentsPaid,
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
      actualTerms,
      monthsSaved,
      interestSaved,
      interestSavedPercent,
      baseScenario,
      includeAdditionalFees,
      managementFee: validManagementFee,
      insuranceType,
      insuranceValue: validInsuranceValue,
      hasPrepayments,
      monthlyPrepayment: validMonthlyPrepayment,
      prepaymentStrategy,
      hasLumpSum,
      lumpSumAmount: validLumpSumAmount,
      lumpSumMonth: validLumpSumMonth,
    };
  }
};

/**
 * Genera recomendaciones inteligentes de abono extraordinario a capital
 * basadas en fórmulas y estrategias financieras comprobadas.
 */
export const calculateSmartPrepaymentRecommendations = (loanParams) => {
  const baseLoan = calculateLoan({
    ...loanParams,
    hasPrepayments: false,
    _isInternalBaseCall: true,
  });

  const baseCuota = baseLoan.monthlyPayment;
  if (baseCuota <= 0 || baseLoan.principal <= 0 || baseLoan.terms <= 1) return [];

  // Fórmula 1: Regla de la Cuota 13 (Abonar 1 cuota extra al año dividida en 12 meses = Cuota / 12 ≈ 8.33% extra)
  const amount13th = Math.round(baseCuota / 12);

  // Fórmula 2: Regla del 10% Inteligente (Cuota * 0.10)
  const amount10pct = Math.round(baseCuota * 0.10);

  // Fórmula 3: Estrategia Acelerada del 15% (Cuota * 0.15)
  const amount15pct = Math.round(baseCuota * 0.15);

  const simulateOption = (extraAmount, label, tag, badge, explanation) => {
    const sim = calculateLoan({
      ...loanParams,
      hasPrepayments: true,
      monthlyPrepayment: extraAmount,
      prepaymentStrategy: "reduce_term",
      hasLumpSum: false,
      _isInternalBaseCall: false,
    });

    return {
      label,
      tag,
      badge,
      explanation,
      extraAmount,
      originalTerms: baseLoan.terms,
      newTermMonths: sim.actualTerms,
      monthsSaved: sim.monthsSaved,
      interestSaved: sim.interestSaved,
      interestSavedPercent: sim.interestSavedPercent,
      totalPaymentWithAbonos: sim.totalGrandPayment,
    };
  };

  return [
    simulateOption(
      amount13th,
      "Fórmula de la Cuota 13",
      "8.33% adicional",
      "Fórmula Clásica",
      "Paga 1/12 de cuota extra cada mes. Equivale a pagar 13 cuotas al año sin desbalancear tu presupuesto mensual."
    ),
    simulateOption(
      amount10pct,
      "El 10% Inteligente",
      "10.0% adicional",
      "Recomendado",
      "Abona un modesto 10% de tu cuota directo a capital. Un esfuerzo pequeño con un impacto masivo en reducción de intereses."
    ),
    simulateOption(
      amount15pct,
      "Acelerador del 15%",
      "15.0% adicional",
      "Ahorro Máximo",
      "Aumenta un 15% tu pago a capital para recortar drásticamente los meses de deuda y ahorrar el máximo en intereses."
    ),
  ];
};

/**
 * Exporta la tabla de amortización a formato CSV descargable
 */
export const exportScheduleToCSV = (schedule, summary, currencyCode = "COP") => {
  if (!schedule || schedule.length === 0) return;

  const hasAdditional = summary.includeAdditionalFees && summary.totalAdditionalFees > 0;
  const hasPrepay = summary.hasPrepayments && summary.totalPrepaymentsPaid > 0;

  const headers = [
    "N° Cuota",
    "Cuota Crédito",
    ...(hasPrepay ? ["Abono Extra Capital"] : []),
    ...(hasAdditional ? ["Seguro Adicional", "Cuota de Manejo"] : []),
    "Pago Total Cuota",
    "Abono a Capital",
    "Intereses Pagados",
    "Saldo Pendiente",
    "Intereses Acumulados",
  ];

  const rows = schedule.map((item) => [
    item.month,
    item.payment.toFixed(2),
    ...(hasPrepay ? [item.prepayment.toFixed(2)] : []),
    ...(hasAdditional
      ? [
          item.insuranceFee.toFixed(2),
          item.managementFee.toFixed(2),
        ]
      : []),
    item.totalMonthlyPayment.toFixed(2),
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
    ["Plazo Pactado (Meses)", summary.terms],
    ...(hasPrepay
      ? [
          ["Plazo Real con Abonos (Meses)", summary.actualTerms],
          ["Meses Ahorrados", summary.monthsSaved],
          ["Total Abonos Extraordinarios", summary.totalPrepaymentsPaid.toFixed(2)],
          ["Intereses Ahorrados", summary.interestSaved.toFixed(2)],
        ]
      : []),
    ["Sistema de Amortizacion", summary.amortizationSystem === "french" ? "Frances (Cuota Fija)" : "Aleman (Capital Fijo)"],
    ["Total Intereses", summary.totalInterest.toFixed(2)],
    ["Total Credito (Capital + Intereses)", summary.totalPayment.toFixed(2)],
    ...(hasAdditional
      ? [
          ["Total Seguros", summary.totalInsuranceFees.toFixed(2)],
          ["Total Cuotas de Manejo", summary.totalManagementFees.toFixed(2)],
        ]
      : []),
    ["TOTAL GENERAL A PAGAR", summary.totalGrandPayment.toFixed(2)],
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
  link.setAttribute("download", `amortizacion_prestamo_${summary.actualTerms || summary.terms}cuotas.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
