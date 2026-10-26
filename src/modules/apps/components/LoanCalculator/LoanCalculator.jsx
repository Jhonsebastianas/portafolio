import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  calculateLoan,
  calculateSmartPrepaymentRecommendations,
  CURRENCIES,
  formatCurrency,
  formatPercent,
  formatInstallmentMonth,
  isPrimaMonth,
  getCalendarPrimas,
  getCalendarBonos,
} from "./loanUtils";
import LoanSummaryCards from "./LoanSummaryCards";
import AmortizationTable from "./AmortizationTable";
import MaskedCurrencyInput from "./MaskedCurrencyInput";
import SmartPrepaymentAdvisor from "./SmartPrepaymentAdvisor";

/*=============================================
  STYLED COMPONENTS
=============================================*/
const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 4rem;
  }
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--small-font-size);
  color: var(--text-color);
  margin-bottom: 2rem;
  padding: 0.5rem 0;

  a {
    color: var(--first-color);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }

  .separator {
    color: var(--text-color-light);
  }

  .current {
    color: var(--title-color);
    font-weight: 500;
  }
`;

const HeroBanner = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.9rem;
    border-radius: 20px;
    background: hsla(var(--hue-color), 69%, 61%, 0.12);
    color: var(--first-color);
    font-size: var(--smaller-font-size);
    font-weight: 600;
    margin-bottom: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  h1 {
    font-size: var(--big-font-size);
    font-weight: 700;
    color: var(--title-color);
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
  }

  p {
    max-width: 680px;
    margin: 0 auto;
    font-size: var(--normal-font-size);
    color: var(--text-color);
    line-height: 1.6;
  }
`;

const FormContainer = styled.div`
  background: var(--container-color);
  border: 1px solid var(--gray-color);
  border-radius: 1.25rem;
  padding: 2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 8px 30px -4px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    padding: 1.5rem 1.25rem;
  }
`;

const FormTopControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--gray-color);
`;

const ControlSectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--title-color);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CurrencySelectorGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--small-font-size);
  color: var(--text-color);

  label {
    font-weight: 500;
  }

  select {
    padding: 0.45rem 0.85rem;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-color);
    background: var(--body-color);
    color: var(--title-color);
    font-family: var(--body-font);
    font-size: var(--small-font-size);
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--first-color);
    }
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: var(--small-font-size);
  font-weight: 600;
  color: var(--title-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .hint {
    font-size: var(--smaller-font-size);
    color: var(--text-color-light);
    font-weight: normal;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .input-icon {
    position: absolute;
    left: 1rem;
    font-size: 1.15rem;
    color: var(--text-color-light);
    pointer-events: none;
  }

  input,
  select {
    width: 100%;
    padding: 0.85rem 1rem 0.85rem ${(props) => (props.$hasIcon ? "2.6rem" : "1rem")};
    border-radius: 0.65rem;
    border: 1px solid var(--gray-color);
    background: var(--body-color);
    color: var(--title-color);
    font-family: var(--body-font);
    font-size: var(--normal-font-size);
    font-weight: 500;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: var(--first-color);
      box-shadow: 0 0 0 3px hsla(var(--hue-color), 69%, 61%, 0.15);
    }

    &::placeholder {
      color: var(--text-color-light);
    }
  }
`;

const QuickPillsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 0.35rem;
`;

const QuickPill = styled.button`
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: var(--smaller-font-size);
  font-family: var(--body-font);
  font-weight: 500;
  border: 1px solid ${(props) => (props.$active ? "var(--first-color)" : "var(--gray-color)")};
  background: ${(props) => (props.$active ? "hsla(var(--hue-color), 69%, 61%, 0.12)" : "var(--body-color)")};
  color: ${(props) => (props.$active ? "var(--first-color)" : "var(--text-color)")};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--first-color);
    color: var(--first-color);
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  background: var(--body-color);
  border: 1px solid var(--gray-color);
  border-radius: 0.65rem;
  padding: 0.25rem;
  gap: 0.25rem;
`;

const ToggleBtn = styled.button`
  flex: 1;
  padding: 0.55rem 0.75rem;
  border-radius: 0.45rem;
  border: none;
  font-family: var(--body-font);
  font-size: var(--small-font-size);
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  background: ${(props) => (props.$active ? "var(--container-color)" : "transparent")};
  color: ${(props) => (props.$active ? "var(--first-color)" : "var(--text-color)")};
  box-shadow: ${(props) => (props.$active ? "0 2px 6px rgba(0, 0, 0, 0.08)" : "none")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: var(--first-color);
  }
`;

const SliderWrapper = styled.div`
  margin-top: 0.5rem;

  input[type="range"] {
    width: 100%;
    -webkit-appearance: none;
    height: 6px;
    border-radius: 5px;
    background: var(--gray-color);
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--first-color);
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      transition: transform 0.15s ease;

      &:hover {
        transform: scale(1.15);
      }
    }
  }
`;

const HelperInfoBox = styled.div`
  background: hsla(var(--hue-color), 69%, 61%, 0.06);
  border-left: 3px solid var(--first-color);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin-top: 0.5rem;
  font-size: var(--smaller-font-size);
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    font-size: 1.1rem;
    color: var(--first-color);
    flex-shrink: 0;
  }
`;

const AdditionalFeesSection = styled.div`
  grid-column: 1 / -1;
  background: hsla(var(--hue-color), 20%, 96%, 0.35);
  border: 1px dashed var(--gray-color);
  border-radius: 0.85rem;
  padding: 1.25rem;
  margin-top: 0.5rem;
`;

const AdditionalFeesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;

  .title-area {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;
    font-size: var(--normal-font-size);
    color: var(--title-color);

    i {
      font-size: 1.25rem;
      color: var(--first-color);
    }
  }

  .toggle-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--small-font-size);
    color: var(--first-color);
    font-weight: 500;
  }
`;

const AdditionalFeesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--gray-color);

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const PrepaymentsContainer = styled.div`
  grid-column: 1 / -1;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, hsla(var(--hue-color), 69%, 61%, 0.05) 0%, hsla(var(--hue-color), 69%, 61%, 0.01) 100%)"
      : "hsla(var(--hue-color), 20%, 96%, 0.35)"};
  border: 1px ${(props) => (props.$active ? "solid var(--first-color-lighter)" : "dashed var(--gray-color)")};
  border-radius: 1rem;
  padding: 1.35rem;
  margin-top: 0.75rem;
  transition: all 0.25s ease;
`;

const PrepaymentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  flex-wrap: wrap;
  gap: 0.75rem;

  .title-area {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 700;
    font-size: var(--normal-font-size);
    color: var(--title-color);

    i {
      font-size: 1.35rem;
      color: #10b981;
    }

    .badge-accent {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
      background: rgba(16, 185, 129, 0.15);
      color: #059669;
      letter-spacing: 0.02em;
    }
  }

  .toggle-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--small-font-size);
    color: var(--first-color);
    font-weight: 600;
    cursor: pointer;
  }
`;

const PrepaymentsBody = styled.div`
  margin-top: 1.35rem;
  padding-top: 1.35rem;
  border-top: 1px solid var(--gray-color);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PrepaymentStrategyGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StrategySelectCard = styled.div`
  border: 1.5px solid ${(props) => (props.$selected ? "var(--first-color)" : "var(--gray-color)")};
  background: ${(props) =>
    props.$selected ? "hsla(var(--hue-color), 69%, 61%, 0.08)" : "var(--container-color)"};
  border-radius: 0.75rem;
  padding: 1rem 1.15rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  &:hover {
    border-color: var(--first-color);
  }

  .radio-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${(props) => (props.$selected ? "var(--first-color)" : "var(--text-color-light)")};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;

    &::after {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${(props) => (props.$selected ? "var(--first-color)" : "transparent")};
    }
  }

  .text-box {
    h4 {
      margin: 0 0 0.25rem 0;
      font-size: var(--small-font-size);
      font-weight: 700;
      color: var(--title-color);
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    p {
      margin: 0;
      font-size: var(--smaller-font-size);
      color: var(--text-color);
      line-height: 1.45;
    }
  }
`;

const PrepaymentsInputsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const LumpSumsContainer = styled.div`
  background: var(--body-color);
  border: 1px solid var(--gray-color);
  border-radius: 0.85rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .lump-sums-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      font-size: var(--small-font-size);
      color: var(--title-color);
      cursor: pointer;
    }

    .badge-info {
      font-size: var(--smaller-font-size);
      font-weight: 600;
      color: var(--first-color);
      background: hsla(var(--hue-color), 69%, 61%, 0.12);
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
    }
  }

  .presets-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    padding: 0.6rem 0.75rem;
    background: var(--container-color);
    border: 1px dashed var(--gray-color);
    border-radius: 0.65rem;
    font-size: var(--smaller-font-size);

    .presets-label {
      color: var(--text-color-light);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    button {
      background: hsla(var(--hue-color), 69%, 61%, 0.08);
      border: 1px solid var(--first-color-lighter);
      color: var(--first-color);
      font-family: var(--body-font);
      font-size: var(--smaller-font-size);
      font-weight: 600;
      padding: 0.25rem 0.6rem;
      border-radius: 20px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.2s ease;

      &:hover {
        background: var(--first-color);
        color: #ffffff;
      }

      &.clear-btn {
        margin-left: auto;
        border-color: #ef4444;
        color: #ef4444;
        background: rgba(239, 68, 68, 0.08);

        &:hover {
          background: #ef4444;
          color: #ffffff;
        }
      }
    }
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .lump-sums-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 0.25rem;

    .total-badge {
      font-size: var(--small-font-size);
      color: var(--text-color);
      strong {
        color: #10b981;
      }
    }
  }
`;

const LumpSumItemCard = styled.div`
  display: grid;
  grid-template-columns: auto minmax(210px, 1.3fr) 1.5fr 1.5fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.85rem;
  background: var(--container-color);
  border: 1px solid var(--gray-color);
  border-radius: 0.65rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--first-color-lighter);
  }

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }

  .item-badge {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--first-color);
    background: hsla(var(--hue-color), 69%, 61%, 0.12);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--text-color-light);
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    input,
    select {
      width: 100%;
      padding: 0.55rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid var(--gray-color);
      background: var(--body-color);
      color: var(--title-color);
      font-size: var(--small-font-size);
      font-family: var(--body-font);
      outline: none;

      &:focus {
        border-color: var(--first-color);
      }
    }
  }

  .delete-btn {
    background: transparent;
    border: none;
    color: #ef4444;
    font-size: 1.15rem;
    cursor: pointer;
    padding: 0.4rem;
    border-radius: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
      background: rgba(239, 68, 68, 0.1);
    }
  }
`;

const AddLumpSumButton = styled.button`
  background: transparent;
  border: 1px dashed var(--first-color);
  color: var(--first-color);
  font-family: var(--body-font);
  font-size: var(--small-font-size);
  font-weight: 600;
  padding: 0.55rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;

  &:hover {
    background: hsla(var(--hue-color), 69%, 61%, 0.1);
  }
`;

/*=============================================
  MAIN COMPONENT
=============================================*/
const LoanCalculator = () => {
  // Estado de moneda
  const [currency, setCurrency] = useState("COP");

  // Estado del préstamo
  const [loanAmount, setLoanAmount] = useState(15000000);
  const [hasDownPayment, setHasDownPayment] = useState(false);
  const [downPayment, setDownPayment] = useState(3000000);

  // Tasa de interés
  const [interestRate, setInterestRate] = useState(1.6);
  const [ratePeriod, setRatePeriod] = useState("monthly"); // 'monthly' | 'annual'
  const [annualRateType, setAnnualRateType] = useState("nominal"); // 'nominal' | 'effective'

  // Fecha de inicio / desembolso
  const getTodayDateString = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const [startDate, setStartDate] = useState(getTodayDateString);

  // Plazo
  const [termMonths, setTermMonths] = useState(24);

  // Sistema de amortización
  const [amortizationSystem, setAmortizationSystem] = useState("french"); // 'french' | 'german'

  // Cuota de manejo y seguro adicional
  const [includeAdditionalFees, setIncludeAdditionalFees] = useState(false);
  const [managementFee, setManagementFee] = useState(15000);
  const [insuranceType, setInsuranceType] = useState("fixed"); // 'fixed' | 'balance_percentage' | 'loan_percentage'
  const [insuranceValue, setInsuranceValue] = useState(20000);

  // Abonos proyectados a capital
  const [hasPrepayments, setHasPrepayments] = useState(false);
  const [monthlyPrepayment, setMonthlyPrepayment] = useState(100000);
  const [prepaymentStrategy, setPrepaymentStrategy] = useState("reduce_term"); // 'reduce_term' | 'reduce_payment'
  const [hasLumpSum, setHasLumpSum] = useState(false);
  const [lumpSumPrepayments, setLumpSumPrepayments] = useState(() => {
    const todayStr = getTodayDateString();
    const primas = getCalendarPrimas(todayStr, 24, 1500000);
    return primas.length > 0
      ? primas
      : [
          { id: "1", month: 6, amount: 1500000, description: "Prima de mitad de año" },
          { id: "2", month: 12, amount: 1500000, description: "Prima de fin de año" },
        ];
  });

  // Manejadores para abonos extraordinarios múltiples
  const handleAddLumpSum = () => {
    setHasLumpSum(true);
    setLumpSumPrepayments((prev) => {
      const lastMonth = prev.length > 0 ? prev[prev.length - 1].month : 0;
      const nextMonth = Math.min(termMonths, lastMonth + 6 > termMonths ? termMonths : lastMonth + 6);
      const isPrima = isPrimaMonth(startDate, nextMonth);
      const dateName = formatInstallmentMonth(startDate, nextMonth, "short");
      return [
        ...prev,
        {
          id: Date.now().toString(),
          month: nextMonth,
          amount: 1500000,
          description: isPrima
            ? `Prima ${dateName}`
            : `Abono Cuota #${nextMonth} (${dateName})`,
        },
      ];
    });
  };

  const handleRemoveLumpSum = (id) => {
    setLumpSumPrepayments((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      if (updated.length === 0) {
        setHasLumpSum(false);
      }
      return updated;
    });
  };

  const handleUpdateLumpSum = (id, field, value) => {
    setLumpSumPrepayments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handlePresetPrimasSemestrales = () => {
    setHasLumpSum(true);
    const primas = getCalendarPrimas(startDate, termMonths, 1500000);
    if (primas.length === 0 && termMonths >= 1) {
      primas.push({
        id: `prima-${termMonths}`,
        month: termMonths,
        amount: 1500000,
        description: `Abono Cuota #${termMonths} (${formatInstallmentMonth(startDate, termMonths, "short")})`,
      });
    }
    setLumpSumPrepayments(primas);
  };

  const handlePresetBonosAnuales = () => {
    setHasLumpSum(true);
    const bonos = getCalendarBonos(startDate, termMonths, 2000000);
    if (bonos.length === 0 && termMonths >= 1) {
      bonos.push({
        id: `bono-${termMonths}`,
        month: termMonths,
        amount: 2000000,
        description: `Bono Cuota #${termMonths} (${formatInstallmentMonth(startDate, termMonths, "short")})`,
      });
    }
    setLumpSumPrepayments(bonos);
  };

  const handleClearLumpSums = () => {
    setLumpSumPrepayments([]);
    setHasLumpSum(false);
  };

  const totalExtraordinaryLumpSums = useMemo(() => {
    if (!hasLumpSum || !Array.isArray(lumpSumPrepayments)) return 0;
    return lumpSumPrepayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  }, [hasLumpSum, lumpSumPrepayments]);

  // Preajustes de plazo rápido
  const termPresets = [6, 12, 24, 36, 48, 60, 72];

  // Preajustes de cuota inicial por porcentaje
  const downPaymentPercentPresets = [10, 20, 30, 40, 50];

  // Cálculo financiero reactivo con useMemo
  const summary = useMemo(() => {
    return calculateLoan({
      loanAmount,
      downPayment: hasDownPayment ? downPayment : 0,
      interestRate,
      ratePeriod,
      annualRateType,
      termMonths,
      startDate,
      amortizationSystem,
      includeAdditionalFees,
      managementFee,
      insuranceType,
      insuranceValue,
      hasPrepayments,
      monthlyPrepayment,
      prepaymentStrategy,
      hasLumpSum,
      lumpSumPrepayments: hasLumpSum ? lumpSumPrepayments : [],
    });
  }, [
    loanAmount,
    hasDownPayment,
    downPayment,
    interestRate,
    ratePeriod,
    annualRateType,
    termMonths,
    startDate,
    amortizationSystem,
    includeAdditionalFees,
    managementFee,
    insuranceType,
    insuranceValue,
    hasPrepayments,
    monthlyPrepayment,
    prepaymentStrategy,
    hasLumpSum,
    lumpSumPrepayments,
  ]);

  // Recomendaciones inteligentes de fórmulas (Cuota 13, 10% Inteligente, 15% Acelerador)
  const recommendations = useMemo(() => {
    return calculateSmartPrepaymentRecommendations({
      loanAmount,
      downPayment: hasDownPayment ? downPayment : 0,
      interestRate,
      ratePeriod,
      annualRateType,
      termMonths,
      startDate,
      amortizationSystem,
      includeAdditionalFees,
      managementFee,
      insuranceType,
      insuranceValue,
    });
  }, [
    loanAmount,
    hasDownPayment,
    downPayment,
    interestRate,
    ratePeriod,
    annualRateType,
    termMonths,
    startDate,
    amortizationSystem,
    includeAdditionalFees,
    managementFee,
    insuranceType,
    insuranceValue,
  ]);

  // Manejador para aplicar recomendación con un solo clic
  const handleApplySmartPrepayment = (extraAmount) => {
    setHasPrepayments(true);
    setMonthlyPrepayment(extraAmount);
    setPrepaymentStrategy("reduce_term");
  };

  // Manejar cambio en cuota inicial con porcentaje
  const handleDownPaymentPercent = (pct) => {
    const calculated = Math.round((loanAmount * pct) / 100);
    setDownPayment(calculated);
    setHasDownPayment(true);
  };

  return (
    <PageWrapper>
      {/* Navegación Breadcrumb */}
      <Breadcrumb>
        <Link href="/blog">
          <a>
            <i className="uil uil-estate" /> Inicio
          </a>
        </Link>
        <span className="separator">/</span>
        <Link href="/apps">
          <a>
            <i className="uil uil-apps" /> Apps
          </a>
        </Link>
        <span className="separator">/</span>
        <span className="current">Calculadora de Préstamos</span>
      </Breadcrumb>

      {/* Encabezado */}
      <HeroBanner>
        <span className="hero-tag">
          <i className="uil uil-coins" /> Simulador Financiero
        </span>
        <h1>Calculadora de Préstamos y Créditos</h1>
        <p>
          Calcula tu cuota mensual estimada, intereses totales, seguros, cuota de manejo y genera una
          tabla completa de amortización con cuota fija o abono a capital constante.
        </p>
      </HeroBanner>

      {/* Formulario de Configuración del Préstamo */}
      <FormContainer>
        <FormTopControls>
          <ControlSectionTitle>
            <i className="uil uil-sliders-v-alt" style={{ color: "var(--first-color)" }} />
            Parámetros del Préstamo
          </ControlSectionTitle>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--small-font-size)", color: "var(--text-color)" }}>
              <label htmlFor="start-date-input" style={{ fontWeight: 500, display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <i className="uil uil-calendar-alt" style={{ color: "var(--first-color)" }} />
                Fecha de inicio:
              </label>
              <input
                id="start-date-input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  padding: "0.45rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--gray-color)",
                  background: "var(--body-color)",
                  color: "var(--title-color)",
                  fontFamily: "var(--body-font)",
                  fontSize: "var(--small-font-size)",
                  cursor: "pointer",
                  outline: "none",
                }}
              />
            </div>

            <CurrencySelectorGroup>
              <label htmlFor="currency-select">Moneda:</label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </CurrencySelectorGroup>
          </div>
        </FormTopControls>

        <FormGrid>
          {/* Monto del Préstamo */}
          <FormGroup>
            <FormLabel htmlFor="loan-amount-input">
              <span>Monto Total del Préstamo / Bien</span>
              <span className="hint">Capital solicitado</span>
            </FormLabel>
            <InputWrapper $hasIcon>
              <i className="uil uil-money-bill input-icon" />
              <MaskedCurrencyInput
                id="loan-amount-input"
                value={loanAmount}
                onChange={(val) => setLoanAmount(val)}
                currency={currency}
                placeholder="Ej. 15.000.000"
              />
            </InputWrapper>
            <QuickPillsRow>
              <span style={{ fontSize: "var(--smaller-font-size)", color: "var(--text-color-light)" }}>
                Atajos:
              </span>
              {[5000000, 10000000, 20000000, 50000000].map((amt) => (
                <QuickPill
                  key={amt}
                  type="button"
                  $active={loanAmount === amt}
                  onClick={() => setLoanAmount(amt)}
                >
                  {formatCurrency(amt, currency)}
                </QuickPill>
              ))}
            </QuickPillsRow>
          </FormGroup>

          {/* Cuota Inicial */}
          <FormGroup>
            <FormLabel htmlFor="down-payment-input">
              <span>Cuota Inicial</span>
              <label style={{ cursor: "pointer", fontSize: "var(--smaller-font-size)", color: "var(--first-color)" }}>
                <input
                  type="checkbox"
                  checked={hasDownPayment}
                  onChange={(e) => setHasDownPayment(e.target.checked)}
                  style={{ marginRight: "0.3rem" }}
                />
                ¿Aportar cuota inicial?
              </label>
            </FormLabel>
            <InputWrapper $hasIcon>
              <i className="uil uil-bill input-icon" />
              <MaskedCurrencyInput
                id="down-payment-input"
                disabled={!hasDownPayment}
                value={hasDownPayment ? downPayment : 0}
                max={loanAmount}
                onChange={(val) => {
                  const safeVal = Math.min(loanAmount, Math.max(0, val));
                  setDownPayment(safeVal);
                }}
                currency={currency}
                placeholder="0"
                style={{ opacity: hasDownPayment ? 1 : 0.6 }}
              />
            </InputWrapper>
            {hasDownPayment ? (
              <QuickPillsRow>
                <span style={{ fontSize: "var(--smaller-font-size)", color: "var(--text-color-light)" }}>
                  Porcentaje:
                </span>
                {downPaymentPercentPresets.map((pct) => (
                  <QuickPill
                    key={pct}
                    type="button"
                    onClick={() => handleDownPaymentPercent(pct)}
                  >
                    {pct}%
                  </QuickPill>
                ))}
              </QuickPillsRow>
            ) : (
              <div style={{ fontSize: "var(--smaller-font-size)", color: "var(--text-color-light)", marginTop: "0.25rem" }}>
                Sin cuota inicial (se financia el 100% del monto).
              </div>
            )}
          </FormGroup>

          {/* Tasa de Interés */}
          <FormGroup>
            <FormLabel htmlFor="interest-rate-input">
              <span>Tasa de Interés (%)</span>
              <span className="hint">
                {ratePeriod === "monthly" ? "Tasa mensual" : "Tasa anual"}
              </span>
            </FormLabel>

            <ToggleGroup style={{ marginBottom: "0.5rem" }}>
              <ToggleBtn
                type="button"
                $active={ratePeriod === "monthly"}
                onClick={() => setRatePeriod("monthly")}
              >
                Mensual (% mes)
              </ToggleBtn>
              <ToggleBtn
                type="button"
                $active={ratePeriod === "annual"}
                onClick={() => setRatePeriod("annual")}
              >
                Anual (% año)
              </ToggleBtn>
            </ToggleGroup>

            <InputWrapper $hasIcon>
              <i className="uil uil-percentage input-icon" />
              <input
                id="interest-rate-input"
                type="number"
                min="0"
                step="0.05"
                value={interestRate || ""}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                placeholder="Ej. 1.5"
              />
            </InputWrapper>

            {ratePeriod === "annual" && (
              <div style={{ marginTop: "0.5rem" }}>
                <ToggleGroup>
                  <ToggleBtn
                    type="button"
                    $active={annualRateType === "nominal"}
                    onClick={() => setAnnualRateType("nominal")}
                    title="Tasa Nominal Anual dividida entre 12 meses"
                  >
                    Nominal (TNA)
                  </ToggleBtn>
                  <ToggleBtn
                    type="button"
                    $active={annualRateType === "effective"}
                    onClick={() => setAnnualRateType("effective")}
                    title="Tasa Efectiva Anual convertida a equivalente mensual"
                  >
                    Efectiva Anual (E.A.)
                  </ToggleBtn>
                </ToggleGroup>
              </div>
            )}

            <HelperInfoBox>
              <i className="uil uil-info-circle" />
              <span>
                Equivalente mensual: <strong>{formatPercent(summary.monthlyRatePercent)} mensual</strong>
              </span>
            </HelperInfoBox>
          </FormGroup>

          {/* Plazo / Cantidad de Cuotas */}
          <FormGroup>
            <FormLabel htmlFor="terms-input">
              <span>Plazo en Meses (Cuotas)</span>
              <span className="hint">{termMonths} meses ({ (termMonths / 12).toFixed(1) } años)</span>
            </FormLabel>
            <InputWrapper $hasIcon>
              <i className="uil uil-calendar-alt input-icon" />
              <input
                id="terms-input"
                type="number"
                min="1"
                max="360"
                value={termMonths || ""}
                onChange={(e) => setTermMonths(Math.max(1, Math.min(360, Number(e.target.value))))}
              />
            </InputWrapper>

            <SliderWrapper>
              <input
                type="range"
                min="1"
                max="120"
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                aria-label="Selector de plazo en meses"
              />
            </SliderWrapper>

            <QuickPillsRow>
              <span style={{ fontSize: "var(--smaller-font-size)", color: "var(--text-color-light)" }}>
                Plazos:
              </span>
              {termPresets.map((t) => (
                <QuickPill
                  key={t}
                  type="button"
                  $active={termMonths === t}
                  onClick={() => setTermMonths(t)}
                >
                  {t}m
                </QuickPill>
              ))}
            </QuickPillsRow>
          </FormGroup>

          {/* Sistema de Amortización */}
          <FormGroup style={{ gridColumn: "1 / -1" }}>
            <FormLabel>
              <span>Sistema de Amortización</span>
              <span className="hint">Modalidad de pago</span>
            </FormLabel>
            <ToggleGroup>
              <ToggleBtn
                type="button"
                $active={amortizationSystem === "french"}
                onClick={() => setAmortizationSystem("french")}
              >
                <i className="uil uil-check-circle" style={{ marginRight: "0.3rem" }} />
                Sistema Francés (Cuota Mensual Fija)
              </ToggleBtn>
              <ToggleBtn
                type="button"
                $active={amortizationSystem === "german"}
                onClick={() => setAmortizationSystem("german")}
              >
                <i className="uil uil-chart-down" style={{ marginRight: "0.3rem" }} />
                Sistema Alemán (Amortización Constante / Cuota Decreciente)
              </ToggleBtn>
            </ToggleGroup>
          </FormGroup>

          {/* Sección de Cuota de Manejo y Seguros Adicionales */}
          <AdditionalFeesSection>
            <AdditionalFeesHeader onClick={() => setIncludeAdditionalFees(!includeAdditionalFees)}>
              <div className="title-area">
                <i className="uil uil-shield-check" />
                <span>Cuota de Manejo y Seguro Adicional (Opcional)</span>
              </div>
              <label className="toggle-checkbox" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={includeAdditionalFees}
                  onChange={(e) => setIncludeAdditionalFees(e.target.checked)}
                />
                <span>¿Aplica seguro o cuota de manejo?</span>
              </label>
            </AdditionalFeesHeader>

            {includeAdditionalFees && (
              <AdditionalFeesGrid>
                {/* Cuota de Manejo Mensual */}
                <FormGroup>
                  <FormLabel htmlFor="management-fee-input">
                    <span>Cuota de Manejo Mensual</span>
                    <span className="hint">Monto fijo por mes</span>
                  </FormLabel>
                  <InputWrapper $hasIcon>
                    <i className="uil uil-receipt input-icon" />
                    <MaskedCurrencyInput
                      id="management-fee-input"
                      value={managementFee}
                      onChange={(val) => setManagementFee(val)}
                      currency={currency}
                      placeholder="Ej. 15.000"
                    />
                  </InputWrapper>
                  <QuickPillsRow>
                    <span style={{ fontSize: "var(--smaller-font-size)", color: "var(--text-color-light)" }}>
                      Valores:
                    </span>
                    {[0, 10000, 15000, 25000].map((fee) => (
                      <QuickPill
                        key={fee}
                        type="button"
                        $active={managementFee === fee}
                        onClick={() => setManagementFee(fee)}
                      >
                        {formatCurrency(fee, currency)}
                      </QuickPill>
                    ))}
                  </QuickPillsRow>
                </FormGroup>

                {/* Seguro Adicional (Vida / Desgravamen) */}
                <FormGroup>
                  <FormLabel htmlFor="insurance-value-input">
                    <span>Seguro Adicional (Vida / Deudor)</span>
                    <span className="hint">Protección de crédito</span>
                  </FormLabel>

                  <div style={{ marginBottom: "0.35rem" }}>
                    <ToggleGroup>
                      <ToggleBtn
                        type="button"
                        $active={insuranceType === "fixed"}
                        onClick={() => {
                          setInsuranceType("fixed");
                          if (insuranceValue < 100) setInsuranceValue(20000);
                        }}
                      >
                        Fijo ($ / mes)
                      </ToggleBtn>
                      <ToggleBtn
                        type="button"
                        $active={insuranceType === "balance_percentage"}
                        onClick={() => {
                          setInsuranceType("balance_percentage");
                          if (insuranceValue > 10) setInsuranceValue(0.12);
                        }}
                      >
                        % Saldo Insoluto
                      </ToggleBtn>
                      <ToggleBtn
                        type="button"
                        $active={insuranceType === "loan_percentage"}
                        onClick={() => {
                          setInsuranceType("loan_percentage");
                          if (insuranceValue > 10) setInsuranceValue(0.08);
                        }}
                      >
                        % Capital Inicial
                      </ToggleBtn>
                    </ToggleGroup>
                  </div>

                  <InputWrapper $hasIcon>
                    <i className="uil uil-shield input-icon" />
                    {insuranceType === "fixed" ? (
                      <MaskedCurrencyInput
                        id="insurance-value-input"
                        value={insuranceValue}
                        onChange={(val) => setInsuranceValue(val)}
                        currency={currency}
                        placeholder="Ej. 20.000"
                      />
                    ) : (
                      <input
                        id="insurance-value-input"
                        type="number"
                        min="0"
                        step="0.01"
                        value={insuranceValue || ""}
                        onChange={(e) => setInsuranceValue(Math.max(0, Number(e.target.value)))}
                        placeholder="Ej. 0.12"
                      />
                    )}
                  </InputWrapper>

                  <div style={{ fontSize: "var(--smaller-font-size)", color: "var(--text-color-light)", marginTop: "0.25rem" }}>
                    {insuranceType === "fixed"
                      ? `Se cobra ${formatCurrency(insuranceValue, currency)} fijos cada mes.`
                      : insuranceType === "balance_percentage"
                      ? `Se cobra el ${insuranceValue}% cada mes sobre el saldo pendiente de cada cuota.`
                      : `Se cobra el ${insuranceValue}% cada mes sobre el monto financiado inicial.`}
                  </div>
                </FormGroup>
              </AdditionalFeesGrid>
            )}
          </AdditionalFeesSection>

          {/* Sección de Abonos Proyectados a Capital */}
          <PrepaymentsContainer $active={hasPrepayments}>
            <PrepaymentsHeader onClick={() => setHasPrepayments(!hasPrepayments)}>
              <div className="title-area">
                <i className="uil uil-rocket" />
                <span>Abonos Proyectados a Capital (Acelera tu Préstamo)</span>
                <span className="badge-accent">¡Ahorra Años e Intereses!</span>
              </div>
              <label className="toggle-checkbox" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={hasPrepayments}
                  onChange={(e) => setHasPrepayments(e.target.checked)}
                />
                <span>¿Simular abonos a capital?</span>
              </label>
            </PrepaymentsHeader>

            {hasPrepayments && (
              <PrepaymentsBody>
                {/* Selector de Estrategia de Abono */}
                <div>
                  <FormLabel style={{ marginBottom: "0.6rem" }}>
                    <span>Estrategia de Aplicación del Abono Extra</span>
                    <span className="hint">¿Cómo deseas que el banco aplique tu dinero?</span>
                  </FormLabel>
                  <PrepaymentStrategyGroup>
                    <StrategySelectCard
                      $selected={prepaymentStrategy === "reduce_term"}
                      onClick={() => setPrepaymentStrategy("reduce_term")}
                    >
                      <div className="radio-circle" />
                      <div className="text-box">
                        <h4>
                          <i className="uil uil-hourglass" style={{ color: "#10b981" }} />
                          Reducir Plazo (Recomendado)
                        </h4>
                        <p>
                          Mantienes la cuota mensual pero liquidas la deuda mucho antes. Es la opción que más intereses te ahorra a lo largo de la vida del crédito.
                        </p>
                      </div>
                    </StrategySelectCard>

                    <StrategySelectCard
                      $selected={prepaymentStrategy === "reduce_payment"}
                      onClick={() => setPrepaymentStrategy("reduce_payment")}
                    >
                      <div className="radio-circle" />
                      <div className="text-box">
                        <h4>
                          <i className="uil uil-money-withdraw" style={{ color: "var(--first-color)" }} />
                          Reducir Cuota Mensual
                        </h4>
                        <p>
                          Mantienes el plazo pactado en meses, pero tu cuota mensual disminuye tras cada abono, brindándote mayor holgura financiera cada mes.
                        </p>
                      </div>
                    </StrategySelectCard>
                  </PrepaymentStrategyGroup>
                </div>

                {/* Inputs de Abono Mensual y Abono Extraordinario Único */}
                <PrepaymentsInputsGrid>
                  {/* Abono Mensual Recurrente */}
                  <FormGroup>
                    <FormLabel htmlFor="monthly-prepayment-input">
                      <span>Abono Extra Mensual Recurrente</span>
                      <span className="hint">Directo a capital en cada cuota</span>
                    </FormLabel>
                    <InputWrapper $hasIcon>
                      <i className="uil uil-plus-circle input-icon" style={{ color: "#10b981" }} />
                      <MaskedCurrencyInput
                        id="monthly-prepayment-input"
                        value={monthlyPrepayment}
                        onChange={(val) => setMonthlyPrepayment(val)}
                        currency={currency}
                        placeholder="Ej. 100.000"
                      />
                    </InputWrapper>

                    <QuickPillsRow>
                      <span style={{ fontSize: "var(--smaller-font-size)", color: "var(--text-color-light)" }}>
                        Sugeridos:
                      </span>
                      {[50000, 100000, 200000, 500000].map((amt) => (
                        <QuickPill
                          key={amt}
                          type="button"
                          $active={monthlyPrepayment === amt}
                          onClick={() => setMonthlyPrepayment(amt)}
                        >
                          +{formatCurrency(amt, currency)}
                        </QuickPill>
                      ))}
                    </QuickPillsRow>
                  </FormGroup>

                  {/* Abonos Extraordinarios Puntuales (Primas / Bonos / Cesantías) */}
                  <LumpSumsContainer>
                    <div className="lump-sums-top">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={hasLumpSum}
                          onChange={(e) => {
                            const willEnable = e.target.checked;
                            setHasLumpSum(willEnable);
                            if (willEnable && lumpSumPrepayments.length === 0) {
                              handleAddLumpSum();
                            }
                          }}
                        />
                        <span>¿Programar abonos extraordinarios (primas, bonos, aguinaldos)?</span>
                      </label>
                      {hasLumpSum && (
                        <span className="badge-info">
                          {lumpSumPrepayments.length} {lumpSumPrepayments.length === 1 ? "abono" : "abonos"} programados
                        </span>
                      )}
                    </div>

                    {hasLumpSum && (
                      <>
                        <div className="presets-bar">
                          <span className="presets-label">
                            <i className="uil uil-bolt" /> Atajos:
                          </span>
                          <button type="button" onClick={handlePresetPrimasSemestrales}>
                            <i className="uil uil-calendar-alt" /> Primas Semestrales (Jun / Dic)
                          </button>
                          <button type="button" onClick={handlePresetBonosAnuales}>
                            <i className="uil uil-star" /> Bonos Anuales (Fin de año)
                          </button>
                          <button type="button" className="clear-btn" onClick={handleClearLumpSums}>
                            <i className="uil uil-trash-alt" /> Limpiar
                          </button>
                        </div>

                        <div className="items-list">
                          {lumpSumPrepayments.map((item, index) => (
                            <LumpSumItemCard key={item.id}>
                              <div className="item-badge">#{index + 1}</div>

                              <div className="field-group">
                                <label>Cuota / Fecha de Pago</label>
                                <select
                                  value={item.month}
                                  onChange={(e) =>
                                    handleUpdateLumpSum(
                                      item.id,
                                      "month",
                                      Math.max(1, Math.min(termMonths, Number(e.target.value)))
                                    )
                                  }
                                >
                                  {Array.from({ length: termMonths }, (_, i) => i + 1).map((m) => {
                                    const isPrima = isPrimaMonth(startDate, m);
                                    const label = formatInstallmentMonth(startDate, m, "short");
                                    return (
                                      <option key={m} value={m}>
                                        Cuota #{m} • {label} {isPrima ? "⭐ (Mes de Prima)" : ""}
                                      </option>
                                    );
                                  })}
                                </select>
                                <div
                                  style={{
                                    fontSize: "0.72rem",
                                    color: isPrimaMonth(startDate, item.month) ? "#10b981" : "var(--text-color-light)",
                                    fontWeight: 600,
                                    marginTop: "0.15rem",
                                  }}
                                >
                                  {formatInstallmentMonth(startDate, item.month, "long")} (faltan {item.month}m)
                                  {isPrimaMonth(startDate, item.month) && " • ⭐ Mes de Prima"}
                                </div>
                              </div>

                              <div className="field-group">
                                <label>Monto a Abonar</label>
                                <MaskedCurrencyInput
                                  value={item.amount}
                                  onChange={(val) => handleUpdateLumpSum(item.id, "amount", val)}
                                  currency={currency}
                                  placeholder="Ej. 1.500.000"
                                />
                              </div>

                              <div className="field-group">
                                <label>Concepto / Motivo</label>
                                <input
                                  type="text"
                                  value={item.description || ""}
                                  onChange={(e) => handleUpdateLumpSum(item.id, "description", e.target.value)}
                                  placeholder="Ej. Prima de mitad de año"
                                />
                              </div>

                              <button
                                type="button"
                                className="delete-btn"
                                onClick={() => handleRemoveLumpSum(item.id)}
                                title="Eliminar abono"
                                aria-label="Eliminar abono"
                              >
                                <i className="uil uil-trash-alt" />
                              </button>
                            </LumpSumItemCard>
                          ))}
                        </div>

                        <div className="lump-sums-footer">
                          <AddLumpSumButton type="button" onClick={handleAddLumpSum}>
                            <i className="uil uil-plus-circle" />
                            <span>Agregar otro abono extraordinario</span>
                          </AddLumpSumButton>

                          <div className="total-badge">
                            Total extraordinarios: <strong>{formatCurrency(totalExtraordinaryLumpSums, currency)}</strong>
                          </div>
                        </div>
                      </>
                    )}
                  </LumpSumsContainer>
                </PrepaymentsInputsGrid>

                {/* Asesor Inteligente con Fórmulas de Educación Financiera */}
                <SmartPrepaymentAdvisor
                  recommendations={recommendations}
                  currency={currency}
                  currentPrepayment={hasPrepayments ? monthlyPrepayment : 0}
                  onApplyPrepayment={handleApplySmartPrepayment}
                />
              </PrepaymentsBody>
            )}
          </PrepaymentsContainer>
        </FormGrid>
      </FormContainer>

      {/* Tarjetas de Resultados Ejecutivos */}
      <LoanSummaryCards summary={summary} currency={currency} />

      {/* Tabla de Amortización Completa */}
      <AmortizationTable
        schedule={summary.schedule}
        summary={summary}
        currency={currency}
      />
    </PageWrapper>
  );
};

export default LoanCalculator;
