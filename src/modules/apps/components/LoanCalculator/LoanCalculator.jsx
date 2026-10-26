import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { calculateLoan, CURRENCIES, formatCurrency, formatPercent } from "./loanUtils";
import LoanSummaryCards from "./LoanSummaryCards";
import AmortizationTable from "./AmortizationTable";
import MaskedCurrencyInput from "./MaskedCurrencyInput";

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

  // Plazo
  const [termMonths, setTermMonths] = useState(24);

  // Sistema de amortización
  const [amortizationSystem, setAmortizationSystem] = useState("french"); // 'french' | 'german'

  // Cuota de manejo y seguro adicional
  const [includeAdditionalFees, setIncludeAdditionalFees] = useState(false);
  const [managementFee, setManagementFee] = useState(15000);
  const [insuranceType, setInsuranceType] = useState("fixed"); // 'fixed' | 'balance_percentage' | 'loan_percentage'
  const [insuranceValue, setInsuranceValue] = useState(20000);

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
    amortizationSystem,
    includeAdditionalFees,
    managementFee,
    insuranceType,
    insuranceValue,
  ]);

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
