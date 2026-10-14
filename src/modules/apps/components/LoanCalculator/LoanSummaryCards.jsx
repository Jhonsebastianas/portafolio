import React from "react";
import styled from "styled-components";
import { formatCurrency, formatPercent } from "./loanUtils";

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.$hasFees ? "5" : "4")}, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: var(--container-color);
  border: 1px solid var(--gray-color);
  border-radius: 1rem;
  padding: 1.35rem 1.25rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.1);
    border-color: var(--first-color-lighter);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => props.$gradient || "var(--first-color)"};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const CardTitle = styled.span`
  font-size: var(--small-font-size);
  color: var(--text-color);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const IconBadge = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${(props) => props.$bg || "hsla(var(--hue-color), 69%, 61%, 0.12)"};
  color: ${(props) => props.$color || "var(--first-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const MainValue = styled.div`
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--title-color);
  letter-spacing: -0.02em;
  margin-bottom: 0.35rem;
  word-break: break-word;
`;

const SubtitleBadge = styled.div`
  font-size: var(--smaller-font-size);
  color: var(--text-color-light);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;

  .badge-tag {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
    background: ${(props) => props.$badgeBg || "hsla(var(--hue-color), 69%, 61%, 0.12)"};
    color: ${(props) => props.$badgeColor || "var(--first-color)"};
  }
`;

const BreakdownCard = styled.div`
  background: var(--container-color);
  border: 1px solid var(--gray-color);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
`;

const BreakdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;

  h3 {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--title-color);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const BreakdownLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  font-size: var(--small-font-size);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-color);

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: ${(props) => props.$color};
  }

  strong {
    color: var(--title-color);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 16px;
  background: var(--gray-color);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  position: relative;
`;

const ProgressSegment = styled.div`
  height: 100%;
  width: ${(props) => props.$percent}%;
  background: ${(props) => props.$color};
  transition: width 0.4s ease;
  position: relative;

  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const LoanSummaryCards = ({ summary, currency }) => {
  const {
    monthlyPayment,
    minMonthlyPayment,
    maxMonthlyPayment,
    principal,
    totalInterest,
    totalPayment,
    downPayment,
    downPaymentPercent,
    interestRatio,
    amortizationSystem,
    terms,
    includeAdditionalFees,
    totalManagementFees,
    totalInsuranceFees,
    totalAdditionalFees,
    totalGrandPayment,
    minTotalMonthlyPayment,
    maxTotalMonthlyPayment,
  } = summary;

  const isGerman = amortizationSystem === "german";
  const hasFees = includeAdditionalFees && totalAdditionalFees > 0;

  // Porcentajes para la barra de distribución
  const grandTotal = hasFees ? totalGrandPayment : (principal + totalInterest);
  const principalShare = grandTotal > 0 ? (principal / grandTotal) * 100 : 0;
  const interestShare = grandTotal > 0 ? (totalInterest / grandTotal) * 100 : 0;
  const feesShare = grandTotal > 0 && hasFees ? (totalAdditionalFees / grandTotal) * 100 : 0;

  return (
    <>
      <CardsGrid $hasFees={hasFees}>
        {/* Cuota Mensual */}
        <StatCard $gradient="linear-gradient(90deg, #6366f1, #8b5cf6)">
          <CardHeader>
            <CardTitle>
              {hasFees ? "Cuota Total con Cargos" : isGerman ? "Cuota Inicial / Variable" : "Cuota Mensual Fija"}
            </CardTitle>
            <IconBadge $bg="rgba(99, 102, 241, 0.12)" $color="#6366f1">
              <i className="uil uil-calculator-alt" />
            </IconBadge>
          </CardHeader>
          <MainValue>
            {hasFees ? (
              isGerman ? (
                `${formatCurrency(maxTotalMonthlyPayment, currency)} ~ ${formatCurrency(minTotalMonthlyPayment, currency)}`
              ) : (
                formatCurrency(maxTotalMonthlyPayment, currency)
              )
            ) : isGerman ? (
              `${formatCurrency(maxMonthlyPayment, currency)} ~ ${formatCurrency(minMonthlyPayment, currency)}`
            ) : (
              formatCurrency(monthlyPayment, currency)
            )}
          </MainValue>
          <SubtitleBadge>
            {hasFees ? (
              <span>Crédito base: {formatCurrency(monthlyPayment, currency)}</span>
            ) : (
              <span>Plazo: <strong>{terms} meses</strong></span>
            )}
            {isGerman && <span className="badge-tag">Decreciente</span>}
          </SubtitleBadge>
        </StatCard>

        {/* Monto Financiado */}
        <StatCard $gradient="linear-gradient(90deg, #06b6d4, #3b82f6)">
          <CardHeader>
            <CardTitle>Monto Financiado (Capital)</CardTitle>
            <IconBadge $bg="rgba(6, 182, 212, 0.12)" $color="#06b6d4">
              <i className="uil uil-money-bill" />
            </IconBadge>
          </CardHeader>
          <MainValue>{formatCurrency(principal, currency)}</MainValue>
          <SubtitleBadge $badgeBg="rgba(6, 182, 212, 0.12)" $badgeColor="#0891b2">
            <span>Inicial: {formatCurrency(downPayment, currency)}</span>
            {downPayment > 0 && (
              <span className="badge-tag">-{formatPercent(downPaymentPercent)}</span>
            )}
          </SubtitleBadge>
        </StatCard>

        {/* Total Intereses */}
        <StatCard $gradient="linear-gradient(90deg, #f59e0b, #ef4444)">
          <CardHeader>
            <CardTitle>Total Intereses</CardTitle>
            <IconBadge $bg="rgba(245, 158, 11, 0.12)" $color="#f59e0b">
              <i className="uil uil-percentage" />
            </IconBadge>
          </CardHeader>
          <MainValue>{formatCurrency(totalInterest, currency)}</MainValue>
          <SubtitleBadge $badgeBg="rgba(239, 68, 68, 0.12)" $badgeColor="#ef4444">
            <span>Costo financiero</span>
            <span className="badge-tag">+{formatPercent(interestRatio)}</span>
          </SubtitleBadge>
        </StatCard>

        {/* Seguros y Cuota de Manejo (Si aplica) */}
        {hasFees && (
          <StatCard $gradient="linear-gradient(90deg, #ec4899, #f43f5e)">
            <CardHeader>
              <CardTitle>Seguros & Manejo</CardTitle>
              <IconBadge $bg="rgba(236, 72, 153, 0.12)" $color="#ec4899">
                <i className="uil uil-shield-check" />
              </IconBadge>
            </CardHeader>
            <MainValue>{formatCurrency(totalAdditionalFees, currency)}</MainValue>
            <SubtitleBadge $badgeBg="rgba(236, 72, 153, 0.12)" $badgeColor="#ec4899">
              <span>Seguros: {formatCurrency(totalInsuranceFees, currency)}</span>
              <span>Manejo: {formatCurrency(totalManagementFees, currency)}</span>
            </SubtitleBadge>
          </StatCard>
        )}

        {/* Total a Pagar */}
        <StatCard $gradient="linear-gradient(90deg, #10b981, #059669)">
          <CardHeader>
            <CardTitle>{hasFees ? "Total General a Pagar" : "Total a Pagar"}</CardTitle>
            <IconBadge $bg="rgba(16, 185, 129, 0.12)" $color="#10b981">
              <i className="uil uil-bill" />
            </IconBadge>
          </CardHeader>
          <MainValue>
            {formatCurrency(hasFees ? totalGrandPayment : totalPayment, currency)}
          </MainValue>
          <SubtitleBadge $badgeBg="rgba(16, 185, 129, 0.12)" $badgeColor="#059669">
            <span>{hasFees ? "Capital + Interés + Cargos" : "Capital + Intereses"}</span>
            <span className="badge-tag">{terms} cuotas</span>
          </SubtitleBadge>
        </StatCard>
      </CardsGrid>

      {/* Barra de Distribución */}
      <BreakdownCard>
        <BreakdownHeader>
          <h3>
            <i className="uil uil-chart-pie" style={{ color: "var(--first-color)" }} />
            Distribución Total de Pagos
          </h3>
          <BreakdownLegend>
            <LegendItem $color="#6366f1">
              <span className="dot" />
              <span>Capital Prestado: <strong>{formatPercent(principalShare)}</strong> ({formatCurrency(principal, currency)})</span>
            </LegendItem>
            <LegendItem $color="#f59e0b">
              <span className="dot" />
              <span>Intereses Totales: <strong>{formatPercent(interestShare)}</strong> ({formatCurrency(totalInterest, currency)})</span>
            </LegendItem>
            {hasFees && (
              <LegendItem $color="#ec4899">
                <span className="dot" />
                <span>Seguros & Manejo: <strong>{formatPercent(feesShare)}</strong> ({formatCurrency(totalAdditionalFees, currency)})</span>
              </LegendItem>
            )}
          </BreakdownLegend>
        </BreakdownHeader>

        <ProgressBar>
          <ProgressSegment $percent={principalShare} $color="#6366f1" title={`Capital: ${formatPercent(principalShare)}`} />
          <ProgressSegment $percent={interestShare} $color="#f59e0b" title={`Intereses: ${formatPercent(interestShare)}`} />
          {hasFees && (
            <ProgressSegment $percent={feesShare} $color="#ec4899" title={`Seguros y Manejo: ${formatPercent(feesShare)}`} />
          )}
        </ProgressBar>
      </BreakdownCard>
    </>
  );
};

export default LoanSummaryCards;
