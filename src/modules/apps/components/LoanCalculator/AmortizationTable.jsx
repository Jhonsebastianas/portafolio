import React, { useState } from "react";
import styled from "styled-components";
import { formatCurrency, exportScheduleToCSV } from "./loanUtils";

const TableContainer = styled.div`
  background: var(--container-color);
  border: 1px solid var(--gray-color);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
  margin-top: 1.5rem;
`;

const TableTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-color);
`;

const TableTitleGroup = styled.div`
  h3 {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--title-color);
    margin: 0 0 0.25rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    font-size: var(--small-font-size);
    color: var(--text-color);
    margin: 0;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border-radius: 0.5rem;
  font-size: var(--small-font-size);
  font-weight: 500;
  font-family: var(--body-font);
  border: 1px solid ${(props) => (props.$primary ? "var(--first-color)" : "var(--gray-color)")};
  background: ${(props) =>
    props.$primary
      ? "var(--first-color)"
      : "var(--container-color-alt)"};
  color: ${(props) => (props.$primary ? "#ffffff" : "var(--title-color)")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.$primary ? "var(--first-color-alt)" : "hsla(var(--hue-color), 69%, 61%, 0.1)"};
    border-color: var(--first-color);
    color: ${(props) => (props.$primary ? "#ffffff" : "var(--first-color)")};
    transform: translateY(-1px);
  }

  i {
    font-size: 1.1rem;
  }
`;

const ResponsiveWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 0.75rem;
  border: 1px solid var(--gray-color);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: right;
  font-size: var(--small-font-size);

  th,
  td {
    padding: 0.85rem 1rem;
    white-space: nowrap;
  }

  th {
    background: var(--container-color-alt);
    color: var(--title-color);
    font-weight: 600;
    font-size: var(--smaller-font-size);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 2px solid var(--gray-color);

    &:first-child {
      text-align: center;
      width: 70px;
    }
  }

  tbody tr {
    border-bottom: 1px solid var(--gray-color);
    transition: background 0.15s ease;

    &:nth-child(even) {
      background: hsla(var(--hue-color), 20%, 95%, 0.25);
    }

    &:hover {
      background: hsla(var(--hue-color), 69%, 61%, 0.08);
    }

    td:first-child {
      text-align: center;
      font-weight: 600;
      color: var(--first-color);
    }
  }

  tfoot tr {
    background: var(--container-color-alt);
    font-weight: 700;
    border-top: 2px solid var(--first-color-lighter);

    td {
      color: var(--title-color);
      padding: 1rem;

      &:first-child {
        text-align: center;
      }
    }
  }
`;

const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-color);
  font-size: var(--small-font-size);
  color: var(--text-color);
`;

const PageButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const PageBtn = styled.button`
  min-width: 34px;
  height: 34px;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.$active ? "var(--first-color)" : "var(--gray-color)")};
  background: ${(props) => (props.$active ? "var(--first-color)" : "var(--container-color)")};
  color: ${(props) => (props.$active ? "#fff" : "var(--title-color)")};
  font-size: var(--small-font-size);
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: var(--first-color);
    color: ${(props) => (props.$active ? "#fff" : "var(--first-color)")};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const AmortizationTable = ({ schedule = [], summary = {}, currency = "COP" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const pageSize = 12;

  if (!schedule || schedule.length === 0) {
    return (
      <TableContainer>
        <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-color)" }}>
          <i className="uil uil-info-circle" style={{ fontSize: "2rem", color: "var(--first-color)" }} />
          <p style={{ marginTop: "0.5rem" }}>
            Ingresa los datos del préstamo en el formulario superior para generar la tabla de amortización.
          </p>
        </div>
      </TableContainer>
    );
  }

  const hasAdditional = summary.includeAdditionalFees && summary.totalAdditionalFees > 0;
  const totalPages = Math.ceil(schedule.length / pageSize);
  const displayedSchedule = showAll
    ? schedule
    : schedule.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCopySummary = () => {
    const text = `Simulación de Préstamo
- Monto Solicitado: ${formatCurrency(summary.totalAmount, currency)}
- Cuota Inicial: ${formatCurrency(summary.downPayment, currency)}
- Monto Financiado: ${formatCurrency(summary.principal, currency)}
- Plazo: ${summary.terms} meses
- Sistema: ${summary.amortizationSystem === "french" ? "Francés (Cuota Fija)" : "Alemán (Capital Fijo)"}
- Cuota Base Crédito: ${formatCurrency(summary.monthlyPayment, currency)}
${hasAdditional ? `- Total Seguros: ${formatCurrency(summary.totalInsuranceFees, currency)}\n- Total Cuota Manejo: ${formatCurrency(summary.totalManagementFees, currency)}\n- Cuota Total Mes: ${formatCurrency(summary.totalMonthlyPayment, currency)}` : ""}
- Total Intereses: ${formatCurrency(summary.totalInterest, currency)}
- Total a Pagar: ${formatCurrency(hasAdditional ? summary.totalGrandPayment : summary.totalPayment, currency)}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <TableContainer id="amortization-table-section">
      <TableTopBar>
        <TableTitleGroup>
          <h3>
            <i className="uil uil-table" style={{ color: "var(--first-color)" }} />
            Tabla de Amortización Detallada
          </h3>
          <p>
            {summary.amortizationSystem === "french"
              ? "Sistema Francés: Cuotas mensuales fijas de crédito con abono progresivo a capital."
              : "Sistema Alemán: Abono a capital constante con cuotas mensuales decrecientes."}
            {hasAdditional && " (Incluye seguros y cuota de manejo en el pago total)."}
          </p>
        </TableTitleGroup>

        <ActionsGroup>
          <ActionButton
            type="button"
            onClick={() => setShowAll(!showAll)}
            title="Alternar vista completa"
          >
            <i className={showAll ? "uil uil-file-alt" : "uil uil-list-ui-alt"} />
            {showAll ? "Ver Paginado (12/pág)" : `Ver Todas (${schedule.length})`}
          </ActionButton>

          <ActionButton type="button" onClick={handleCopySummary}>
            <i className={copied ? "uil uil-check" : "uil uil-copy"} />
            {copied ? "Copiado!" : "Copiar Resumen"}
          </ActionButton>

          <ActionButton
            type="button"
            $primary
            onClick={() => exportScheduleToCSV(schedule, summary, currency)}
            title="Descargar tabla en formato Excel CSV"
          >
            <i className="uil uil-file-download-alt" />
            Exportar CSV
          </ActionButton>
        </ActionsGroup>
      </TableTopBar>

      <ResponsiveWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>Cuota</th>
              <th>Cuota Crédito</th>
              {hasAdditional && (
                <>
                  <th>Seguro</th>
                  <th>Manejo</th>
                  <th>Pago Total</th>
                </>
              )}
              <th>Abono Capital</th>
              <th>Intereses</th>
              <th>Saldo Pendiente</th>
            </tr>
          </thead>
          <tbody>
            {displayedSchedule.map((row) => (
              <tr key={row.month}>
                <td>#{row.month}</td>
                <td style={{ fontWeight: 600, color: "var(--title-color)" }}>
                  {formatCurrency(row.payment, currency)}
                </td>
                {hasAdditional && (
                  <>
                    <td style={{ color: "#ec4899" }}>
                      {formatCurrency(row.insuranceFee, currency)}
                    </td>
                    <td style={{ color: "#8b5cf6" }}>
                      {formatCurrency(row.managementFee, currency)}
                    </td>
                    <td style={{ fontWeight: 700, color: "var(--first-color)" }}>
                      {formatCurrency(row.totalMonthlyPayment, currency)}
                    </td>
                  </>
                )}
                <td style={{ color: "#6366f1" }}>
                  {formatCurrency(row.principalPaid, currency)}
                </td>
                <td style={{ color: "#f59e0b" }}>
                  {formatCurrency(row.interestPaid, currency)}
                </td>
                <td style={{ fontWeight: 500 }}>
                  {formatCurrency(row.remainingBalance, currency)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Totales</td>
              <td>{formatCurrency(summary.totalPayment, currency)}</td>
              {hasAdditional && (
                <>
                  <td>{formatCurrency(summary.totalInsuranceFees, currency)}</td>
                  <td>{formatCurrency(summary.totalManagementFees, currency)}</td>
                  <td style={{ color: "var(--first-color)" }}>
                    {formatCurrency(summary.totalGrandPayment, currency)}
                  </td>
                </>
              )}
              <td>{formatCurrency(summary.principal, currency)}</td>
              <td>{formatCurrency(summary.totalInterest, currency)}</td>
              <td>{formatCurrency(0, currency)}</td>
            </tr>
          </tfoot>
        </StyledTable>
      </ResponsiveWrapper>

      {!showAll && totalPages > 1 && (
        <PaginationBar>
          <div>
            Mostrando cuotas <strong>{(currentPage - 1) * pageSize + 1}</strong> a{" "}
            <strong>{Math.min(currentPage * pageSize, schedule.length)}</strong> de{" "}
            <strong>{schedule.length}</strong>
          </div>

          <PageButtonsGroup>
            <PageBtn
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Página anterior"
            >
              <i className="uil uil-angle-left" />
            </PageBtn>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 7) return true;
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                );
              })
              .map((page, idx, arr) => (
                <React.Fragment key={page}>
                  {idx > 0 && page - arr[idx - 1] > 1 && (
                    <span style={{ padding: "0 0.25rem", color: "var(--text-color-light)" }}>
                      ...
                    </span>
                  )}
                  <PageBtn
                    $active={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PageBtn>
                </React.Fragment>
              ))}

            <PageBtn
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Página siguiente"
            >
              <i className="uil uil-angle-right" />
            </PageBtn>
          </PageButtonsGroup>
        </PaginationBar>
      )}
    </TableContainer>
  );
};

export default AmortizationTable;
