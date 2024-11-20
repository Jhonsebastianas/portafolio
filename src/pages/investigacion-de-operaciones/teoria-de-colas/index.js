import Layout from "@modules/investigacion-operaciones/layouts/layout";
import React, { useState } from "react";
import styled from "styled-components";

// Estilos principales (se mantienen igual)
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--title-color);
`;

const Form = styled.form`
    margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: var(--first-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ResultItem = styled.div`
  margin-bottom: 10px;
`;

const Error = styled.p`
  color: red;
  font-weight: bold;
`;

// Funciones auxiliares
const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

// Función de cálculo modificada
const calculateQueue = (lambda, mu, k, cs, t, ce, cp) => {
  const results = {};
  if (mu <= lambda) {
    results.error =
      "La tasa de servicio (μ) debe ser mayor que la tasa de llegada (λ).";
    return results;
  }

  const rho = lambda / (mu * k); // Utilización
  results.utilization = rho;

  if (k === 1) {
    // Modelo M/M/1
    results.model = "M/M/1";
    results.lq = (lambda * lambda) / (mu * (mu - lambda)); // Lq
    results.ls = results.lq + lambda / mu; // Ls
    results.wq = results.lq / lambda; // Wq
    results.ws = results.wq + 1 / mu; // Ws
    results.cost =
      k * cs + lambda * results.wq * ce + (lambda * results.ws * cp || 0);

    if (cs || ce || cp) {
      if (cs) {
        results.costePromedio = results.ws * cs;
      }
      const costoOperacion = k * (cs || 0);
      const costoEspera = lambda * results.wq * (ce || 0);
      const costoProduccion = lambda * results.ws * (cp || 0);
      results.costoTotal = costoOperacion + costoEspera + costoProduccion;
      if (ce) {
        results.costoEspera = costoEspera;
      }
      if (cp) {
        results.costoProduccion = lambda * results.ws * (cp || 0);
      }
    }
    if (t) {
      results.lineaEspera = results.lq * (t || 4); // Línea de espera después de `t` horas
    }
  } else {
    // Modelo M/M/k
    results.model = "M/M/k";
    const factor = Math.pow(lambda / mu, k) / (factorial(k) * (1 - rho));
    const sum = Array.from(
      { length: k },
      (_, n) => Math.pow(lambda / mu, n) / factorial(n)
    ).reduce((acc, val) => acc + val, 0);
    results.p0 = 1 / (sum + factor); // P0
    results.lq =
      (results.p0 * Math.pow(lambda / mu, k) * rho) /
      (factorial(k) * Math.pow(1 - rho, 2));
    results.ls = results.lq + lambda / mu;
    results.wq = results.lq / lambda;
    results.ws = results.wq + 1 / mu;
    if (cs || ce || cp) {
      if (cs) {
        results.costePromedio = results.ws * cs;
      }
      const costoOperacion = k * (cs || 0);
      const costoEspera = lambda * results.wq * (ce || 0);
      const costoProduccion = lambda * results.ws * (cp || 0);
      results.costoTotal = costoOperacion + costoEspera + costoProduccion;
      if (ce) {
        results.costoEspera = costoEspera;
      }
      if (cp) {
        results.costoProduccion = lambda * results.ws * (cp || 0);
      }
    }
    if (t) {
      results.lineaEspera = results.lq * (t || 4); // Línea de espera después de `t` horas
    }
  }

  return results;
};

// Componente principal
const QueueCalculator = () => {
  const [lambda, setLambda] = useState("");
  const [mu, setMu] = useState("");
  const [k, setK] = useState("");
  const [cs, setCs] = useState(""); // Nuevo estado para Cs
  const [cp, setCp] = useState("");
  const [ce, setCe] = useState("");
  const [t, setT] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lambdaNum = parseFloat(lambda);
    const muNum = parseFloat(mu);
    const kNum = parseInt(k, 10);
    const csNum = cs ? parseFloat(cs) : null; // Cs opcional

    if (isNaN(lambdaNum) || isNaN(muNum) || isNaN(kNum)) {
      setResults({ error: "Por favor, ingresa valores numéricos válidos." });
      return;
    }

    const calculatedResults = calculateQueue(
      lambdaNum,
      muNum,
      kNum,
      csNum,
      t,
      ce,
      cp
    );
    setResults(calculatedResults);
  };

  return (
    <Layout>
      <br></br>
      <br></br>
      <br></br>
      <Container className="container">
        <Title>Calculadora de Teoría de Colas</Title>
        <Form onSubmit={handleSubmit}>
          <label>
            Tasa de llegada (λ):
            <Input
              type="number"
              value={lambda}
              onChange={(e) => setLambda(e.target.value)}
              required
            />
          </label>
          <label>
            Tasa de servicio (μ):
            <Input
              type="number"
              value={mu}
              onChange={(e) => setMu(e.target.value)}
              required
            />
          </label>
          <label>
            Número de servidores (k):
            <Input
              type="number"
              value={k}
              onChange={(e) => setK(e.target.value)}
              required
            />
          </label>
          <h2>Datos opcionales</h2>
          <label>
            Costo del servicio (Cs) [opcional]:
            <Input
              type="number"
              value={cs}
              onChange={(e) => setCs(e.target.value)}
            />
          </label>
          <label>
            Costo de producción por trabajador (Cp) [opcional]:
            <Input
              type="number"
              value={cp}
              onChange={(e) => setCp(e.target.value)}
            />
          </label>
          <label>
            Tiempo total del sistema (t) [opcional]:
            <Input
              type="number"
              value={t}
              onChange={(e) => setT(e.target.value)}
            />
          </label>
          <label>
            Costo de espera por trabajador (Ce) [opcional]:
            <Input
              type="number"
              value={ce}
              onChange={(e) => setCe(e.target.value)}
            />
          </label>

          <Button type="submit">Calcular</Button>
        </Form>

        {results && (
          <ResultContainer>
            {results.error ? (
              <Error>{results.error}</Error>
            ) : (
              <>
                <ResultItem>
                  <strong>Modelo:</strong> {results.model}
                </ResultItem>
                <ResultItem>
                  <strong>Utilización (ρ):</strong>{" "}
                  {results.utilization.toFixed(2)}
                </ResultItem>
                <ResultItem>
                  <strong>Lq (Promedio de clientes en cola):</strong>{" "}
                  {results.lq.toFixed(2)}
                </ResultItem>
                <ResultItem>
                  <strong>Ls (Promedio de clientes en el sistema):</strong>{" "}
                  {results.ls.toFixed(2)}
                </ResultItem>
                <ResultItem>
                  <strong>Wq (Tiempo promedio en cola):</strong>{" "}
                  {results.wq.toFixed(2)} horas
                </ResultItem>
                <ResultItem>
                  <strong>Ws (Tiempo promedio en el sistema):</strong>{" "}
                  {results.ws.toFixed(2)} horas
                </ResultItem>
                {results.lineaEspera && (
                  <ResultItem>
                    <strong>Línea de espera en t({t}):</strong>{" "}
                    {results.lineaEspera.toFixed(2)} / trabajadores
                  </ResultItem>
                )}
                {results.costePromedio && (
                  <>
                    <ResultItem>
                      <strong>Costo promedio por trabajo/hora:</strong> ${" "}
                      {results.costePromedio.toFixed(2)} / trabajo
                    </ResultItem>
                    <ResultItem>
                      <strong>Costo promedio por/día:</strong> ${" "}
                      {8 * 5 * results.costePromedio.toFixed(2)} / día
                    </ResultItem>
                  </>
                )}
                {results.costoEspera && (
                  <ResultItem>
                    <strong>Costo de espera:</strong> ${" "}
                    {results.costoEspera.toFixed(2)}{" "}
                  </ResultItem>
                )}
                {results.costoProduccion && (
                  <ResultItem>
                    <strong>Costo de producción:</strong> ${" "}
                    {results.costoProduccion.toFixed(2)}{" "}
                  </ResultItem>
                )}
                {results.costoTotal && (
                  <ResultItem>
                    <strong>Costo total:</strong> ${" "}
                    {results.costoTotal.toFixed(2)}{" "}
                  </ResultItem>
                )}
                {results.nuevoServidor && (
                  <ResultItem>
                    <strong>
                      ¿Es conveniente contratar un nuevo servidor?:
                    </strong>{" "}
                    {results.nuevoServidor}
                  </ResultItem>
                )}
              </>
            )}
          </ResultContainer>
        )}
      </Container>
    </Layout>
  );
};

export default QueueCalculator;
