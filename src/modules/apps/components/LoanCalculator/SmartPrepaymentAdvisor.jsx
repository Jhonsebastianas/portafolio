import React from "react";
import styled from "styled-components";
import { formatCurrency, formatPercent } from "./loanUtils";

const AdvisorWrapper = styled.div`
  background: linear-gradient(
    135deg,
    hsla(var(--hue-color), 69%, 61%, 0.08) 0%,
    hsla(var(--hue-color), 69%, 61%, 0.02) 100%
  );
  border: 1px solid var(--first-color-lighter);
  border-radius: 1.15rem;
  padding: 1.5rem;
  margin-top: 1.25rem;
`;

const AdvisorHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin-bottom: 1.25rem;

  .bulb-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: hsla(var(--hue-color), 69%, 61%, 0.15);
    color: var(--first-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  .text-content {
    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--title-color);
      margin: 0 0 0.35rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    p {
      font-size: var(--small-font-size);
      color: var(--text-color);
      margin: 0;
      line-height: 1.55;
    }
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StrategyCard = styled.div`
  background: var(--container-color);
  border: 1px solid ${(props) => (props.$active ? "var(--first-color)" : "var(--gray-color)")};
  border-radius: 0.85rem;
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${(props) =>
    props.$active ? "0 4px 18px rgba(99, 102, 241, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.04)"};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: var(--first-color);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -2px rgba(0, 0, 0, 0.08);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  .badge {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0.2rem 0.55rem;
    border-radius: 20px;
    background: ${(props) => props.$badgeBg || "hsla(var(--hue-color), 69%, 61%, 0.12)"};
    color: ${(props) => props.$badgeColor || "var(--first-color)"};
  }

  .tag {
    font-size: var(--smaller-font-size);
    color: var(--text-color-light);
    font-weight: 500;
  }
`;

const StrategyTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: var(--title-color);
  margin: 0 0 0.35rem 0;
`;

const StrategyExplain = styled.p`
  font-size: var(--smaller-font-size);
  color: var(--text-color);
  margin: 0 0 1rem 0;
  line-height: 1.45;
`;

const MetricsList = styled.div`
  background: var(--body-color);
  border-radius: 0.65rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const MetricItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--smaller-font-size);

  .label {
    color: var(--text-color);
  }

  .val {
    font-weight: 700;
    color: ${(props) => props.$color || "var(--title-color)"};
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 0.55rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--first-color);
  background: ${(props) => (props.$active ? "var(--first-color)" : "transparent")};
  color: ${(props) => (props.$active ? "#ffffff" : "var(--first-color)")};
  font-family: var(--body-font);
  font-size: var(--small-font-size);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.2s ease;

  &:hover {
    background: var(--first-color);
    color: #ffffff;
  }
`;

const SmartPrepaymentAdvisor = ({
  recommendations = [],
  currency = "COP",
  currentPrepayment = 0,
  onApplyPrepayment,
}) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <AdvisorWrapper>
      <AdvisorHeader>
        <div className="bulb-icon">
          <i className="uil uil-lightbulb-alt" />
        </div>
        <div className="text-content">
          <h3>
            <span>Estrategias Inteligentes de Aceleración de Deuda</span>
          </h3>
          <p>
            Existe una fórmula comprobada en educación financiera: <strong>abonar una fracción pequeña extra a capital cada mes</strong>.
            A diferencia de la cuota habitual (donde gran parte se va en intereses), el 100% de tu abono extra ataca directamente el saldo capital,
            recortando meses enteros y ahorrándote intereses de forma exponencial.
          </p>
        </div>
      </AdvisorHeader>

      <CardsGrid>
        {recommendations.map((rec, index) => {
          const isSelected = Math.abs(currentPrepayment - rec.extraAmount) < 100;
          const badgeColor = index === 0 ? "var(--first-color)" : index === 1 ? "#10b981" : "#8b5cf6";
          const badgeBg = index === 0 ? "hsla(var(--hue-color), 69%, 61%, 0.12)" : index === 1 ? "rgba(16, 185, 129, 0.12)" : "rgba(139, 92, 246, 0.12)";

          return (
            <StrategyCard
              key={rec.label}
              $active={isSelected}
              $badgeColor={badgeColor}
              $badgeBg={badgeBg}
            >
              <div>
                <CardTop $badgeColor={badgeColor} $badgeBg={badgeBg}>
                  <span className="badge">{rec.badge}</span>
                  <span className="tag">{rec.tag}</span>
                </CardTop>

                <StrategyTitle>{rec.label}</StrategyTitle>
                <StrategyExplain>{rec.explanation}</StrategyExplain>

                <MetricsList>
                  <MetricItem>
                    <span className="label">Abono extra mensual:</span>
                    <span className="val" style={{ color: "var(--first-color)" }}>
                      +{formatCurrency(rec.extraAmount, currency)}
                    </span>
                  </MetricItem>
                  <MetricItem>
                    <span className="label">Tiempo ahorrado:</span>
                    <span className="val" style={{ color: "#10b981" }}>
                      ¡{rec.monthsSaved} meses menos!
                    </span>
                  </MetricItem>
                  <MetricItem>
                    <span className="label">Nuevo plazo:</span>
                    <span className="val">
                      {rec.newTermMonths} de {rec.originalTerms} meses
                    </span>
                  </MetricItem>
                  <MetricItem>
                    <span className="label">Ahorro en intereses:</span>
                    <span className="val" style={{ color: "#10b981" }}>
                      -{formatCurrency(rec.interestSaved, currency)} ({formatPercent(rec.interestSavedPercent)})
                    </span>
                  </MetricItem>
                </MetricsList>
              </div>

              <ApplyButton
                type="button"
                $active={isSelected}
                onClick={() => onApplyPrepayment(rec.extraAmount)}
              >
                <i className={isSelected ? "uil uil-check-circle" : "uil uil-plus-circle"} />
                <span>{isSelected ? "Abono Activo" : `Aplicar ${formatCurrency(rec.extraAmount, currency)}/mes`}</span>
              </ApplyButton>
            </StrategyCard>
          );
        })}
      </CardsGrid>
    </AdvisorWrapper>
  );
};

export default SmartPrepaymentAdvisor;
