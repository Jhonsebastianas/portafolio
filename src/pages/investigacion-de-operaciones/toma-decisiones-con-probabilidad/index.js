import Layout from "@modules/investigacion-operaciones/layouts/layout";
import React, { useState } from "react";
import styled from "styled-components";

const DecisionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  text-align: left;
  padding: 10px;
`;

const TableCell = styled.td`
  text-align: left;
  padding: 10px;
  vertical-align: top;
`;

const EditableCell = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  padding: 5px;
  text-align: left;
  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

// Estilo para la decisión resaltada
const HighlightedDecision = styled.p`
  color: green;
  //font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: underline;
`;

export default function TomaDecisionesProbabilidadPage() {
  const [decisions, setDecisions] = useState([]);
  const [probabilidades, setProbabilidades] = useState([]);

  const addDecision = () => {
    setDecisions([
      ...decisions,
      { decision: "d" + (decisions.length + 1), scenarios: [] },
    ]);
  };

  const addScenario = (dIndex) => {
    const updatedDecisions = [...decisions];
    const index = updatedDecisions[dIndex].scenarios.length;
    updatedDecisions[dIndex].scenarios.push({
      condition: "s" + (index + 1),
      result: 0,
    });
    setDecisions(updatedDecisions);
  };

  const handleDecisionChange = (dIndex, value) => {
    const updatedDecisions = [...decisions];
    updatedDecisions[dIndex].decision = value;
    setDecisions(updatedDecisions);
  };

  const handleScenarioChange = (dIndex, sIndex, key, value) => {
    const updatedDecisions = [...decisions];
    updatedDecisions[dIndex].scenarios[sIndex][key] =
      key === "result" ? parseFloat(value) || value : value;
    setDecisions(updatedDecisions);
  };

  const handleProbChange = (index, value) => {
    const updatedProbs = [...probabilidades];
    updatedProbs[index] = parseFloat(value) || 0;
    setProbabilidades(updatedProbs);
  };

  const calculateValorEsperado = () => {
    return decisions.map((decision) =>
      decision.scenarios.reduce(
        (acc, scenario, index) =>
          acc + scenario.result * (probabilidades[index] || 0),
        0
      )
    );
  };

  const mejorDecisionValorEsperado = () => {
    const valoresEsperados = calculateValorEsperado();
    return Math.max(...valoresEsperados);
  }

  const calculateOptimista = () => {
    return decisions.map((decision) =>
      Math.max(...decision.scenarios.map((s) => s.result))
    );
  };

  const calculateMaxOptimista = () => {
    const maxDecisions = calculateOptimista();
    const maxDecision = Math.max(...maxDecisions);
    return maxDecision;
  };

  const calculateConservador = () => {
    return decisions.map((decision) =>
      Math.min(...decision.scenarios.map((s) => s.result))
    );
  };

  const calculateMaxConservador = () => {
    const minScenarios = calculateConservador();
    const maxOfMin = Math.max(...minScenarios);
    return maxOfMin;
  };

  const calculateArrepentimiento = () => {
    // Paso 1: Calcular el valor máximo para cada estado de la naturaleza
    const maxResults = decisions[0]?.scenarios.map((_, index) =>
      Math.max(...decisions.map((d) => d.scenarios[index]?.result || 0))
    ) || [];
  
    // Paso 2: Calcular el arrepentimiento para cada decisión y cada estado
    const arrepentimientosPorDecision = decisions.map((decision) =>
      decision.scenarios.map((s, index) => (maxResults[index] || 0) - s.result)
    );
  
    // Paso 3: Tomar el máximo de arrepentimiento por cada decisión
    const maxArrepentimientos = arrepentimientosPorDecision.map((arrepentimientos) =>
      Math.max(...arrepentimientos)
    );
  
    // Paso 4: Retornar los máximos de arrepentimiento
    return maxArrepentimientos;
  };

  const mejorDecisionArrepentimientoMinMax = () => {
    const maxArrepentimientos = calculateArrepentimiento();
    const minMax = Math.min(...maxArrepentimientos);
    return minMax;
  }

  return (
    <Layout>
      <div className="container">
        <br></br>
        <br></br>
        <br></br>
        <Button onClick={addDecision}>Añadir Decisión</Button>
        <DecisionTable>
          <thead>
            <TableRow>
              <TableHeader>Decisión</TableHeader>
              <TableHeader>Escenario</TableHeader>
              <TableHeader>Resultado</TableHeader>
              <TableHeader>Añadir Escenario</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {decisions.map((decision, dIndex) => (
              <React.Fragment key={dIndex}>
                {decision.scenarios.length > 0 ? (
                  decision.scenarios.map((scenario, sIndex) => (
                    <TableRow key={sIndex}>
                      {sIndex === 0 && (
                        <TableCell rowSpan={decision.scenarios.length}>
                          <EditableCell
                            type="text"
                            value={decision.decision}
                            onChange={(e) =>
                              handleDecisionChange(dIndex, e.target.value)
                            }
                          />
                        </TableCell>
                      )}
                      <TableCell>
                        <EditableCell
                          type="text"
                          value={scenario.condition}
                          onChange={(e) =>
                            handleScenarioChange(
                              dIndex,
                              sIndex,
                              "condition",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <EditableCell
                          type="number"
                          value={scenario.result}
                          onChange={(e) =>
                            handleScenarioChange(
                              dIndex,
                              sIndex,
                              "result",
                              e.target.value
                            )
                          }
                        />
                        millones
                      </TableCell>
                      {sIndex === 0 && (
                        <TableCell rowSpan={decision.scenarios.length}>
                          <Button onClick={() => addScenario(dIndex)}>
                            Añadir Escenario
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>
                      <EditableCell
                        type="text"
                        value={decision.decision}
                        onChange={(e) =>
                          handleDecisionChange(dIndex, e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell colSpan="2">Sin escenarios aún</TableCell>
                    <TableCell>
                      <Button onClick={() => addScenario(dIndex)}>
                        Añadir Escenario
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </DecisionTable>

        {/* Resultados de enfoques */}
        <h2>Resultados de Enfoques</h2>
        <div>
          <h3>Optimista</h3>
          <p>Valor máximo de los resultados máximos</p>
          {calculateOptimista().map((res, index) =>
            res === calculateMaxOptimista() ? (
              <HighlightedDecision key={index}>
                Decisión {index + 1}: {res} millones
              </HighlightedDecision>
            ) : (
              <p key={index}>
                Decisión {index + 1}: {res} millones
              </p>
            )
          )}
          <br></br>
          <h3>Conservador</h3>
          <p>Valor máximo de los resultados mínimos</p>
          {calculateConservador().map((res, index) =>
            res === calculateMaxConservador() ? (
              <HighlightedDecision key={index}>
                Decisión {index + 1}: {res} millones
              </HighlightedDecision>
            ) : (
              <p key={index}>
                Decisión {index + 1}: {res} millones
              </p>
            )
          )}
          <br></br>
          <h3>Arrepentimiento Minimax</h3>
          <p>Valor mínimo del arrepentimiento máximo</p>
          {calculateArrepentimiento().map((res, index) =>
            res === mejorDecisionArrepentimientoMinMax() ? (
              <HighlightedDecision key={index}>
                Decisión {index + 1}: {res} millones
              </HighlightedDecision>
            ) : (
              <p key={index}>
                Decisión {index + 1}: {res} millones
              </p>
            )
          )}
        </div>
        <br></br>
        <h3>Probabilidades</h3>
        {decisions[0]?.scenarios.map((_, index) => (
          <div key={index}>
            <label>Escenario {index + 1}: </label>
            <EditableCell
              type="number"
              value={probabilidades[index] || 0}
              onChange={(e) => handleProbChange(index, e.target.value)}
              step="0.01"
              min="0"
              max="1"
            />
          </div>
        ))}

        <h3>Valor Esperado</h3>
        {calculateValorEsperado().map((ve, index) => (
            ve === mejorDecisionValorEsperado() ? (
                <HighlightedDecision key={index}>
                  Decisión {index + 1}: {ve.toFixed(2)} millones
                </HighlightedDecision>
            ) : (
                <p key={index}>
                    Decisión {index + 1}: {ve.toFixed(2)} millones
                </p>
            )
        ))}
      </div>
    </Layout>
  );
}
