import Button from "@components/commons/button";
import Layout from "@modules/investigacion-operaciones/layouts/layout";
import { useState } from "react";
import styled from "styled-components";
import jStat from "jstat";

// Styled components

export const StyledForm = styled.form`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  color: ${props => props.invalid ? 'red' : '#333'};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

export const StyledButton = styled(Button)`
  background-color: #007BFF;
  color: white;
  font-size: 1.1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ResultsSection = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-top: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ResultItem = styled.p`
  font-size: 1rem;
  margin: 10px 0;

  strong {
    font-weight: 600;
  }
`;

class DistribucionUniforme {
    demanda = 0;
    limiteInferior = 0;
    limiteSuperior = 0;
    costoUnidad = 0;
    costoExceso = 0;
    costoRuptura = 0;

    // Distribución normal
    desviacionTipica = 0; // σ
    muestra = 0; // μ
    Ce;
    Cr;

    utilidad = 0; // Porcentaje
    salvamento = 0 // Porcentaje
}


class InventarioCompraOptimo {
    D = 0;
    Ce = 0;
    Cr = 0;
    a = 0;
    b = 0;
    fcr = 0; // Factor critico de riestgo
    Io = 0;
    DnoSatisfecha = 0; // probabilidad

    CeTotal = 0;
}

export default function Home() {
    const FIXED = 3;
    const [inventarioCompraOptimo, setInventarioCompraOptimo] = useState(new InventarioCompraOptimo());
    const [cantidadEconomicaPedido, setCantidadEconomicaPedido] = useState(new DistribucionUniforme());
    const [isCalculated, setIsCalculated] = useState(false);

    const [modeloSeleccionado, setModeloSeleccionado] = useState("distribucionUniforme"); // por defecto, modelo de compra

    const handleModeloChange = (e) => {
        setModeloSeleccionado(e.target.value);
    };

    // Método para redondear a 3 decimales y agregar separadores de miles
    const formatearNumero = (numero, decimales = 3) => {
        return Number(numero.toFixed(decimales)).toLocaleString('en-US', {
            minimumFractionDigits: decimales,
            maximumFractionDigits: decimales
        });
    };

    const redondearGlobal = (numero, decimales = 3) => {
        return Number(numero.toFixed(decimales));
    };

    const calcularCeTotal = (Ce, Io, D) => {
      return Ce * (Io - D);
    }

    const calcularDistribucionUniforme = (e) => {
        e.preventDefault();
        const calculos = new InventarioCompraOptimo();

        const a = cantidadEconomicaPedido.limiteInferior;
        const b = cantidadEconomicaPedido.limiteSuperior;
        const Ce = cantidadEconomicaPedido.costoUnidad - (cantidadEconomicaPedido.costoUnidad * (cantidadEconomicaPedido.salvamento / 100));
        const Cr = cantidadEconomicaPedido.costoUnidad - (cantidadEconomicaPedido.costoUnidad * ((100 - cantidadEconomicaPedido.utilidad) / 100));
        const D = calculos.D;

        //
        const fcr = (Cr) / (Cr + Ce);
        //const fcr = (a) / (Cr + Ce);

        const Io = a + (fcr * (b - a));

        //const Io = Cr + (fcr * (b - a));

        const DnoSatisfecha = 1 - fcr;

        calculos.Ce = Ce;
        calculos.Cr = Cr;
        calculos.a = a;
        calculos.b = b;
        calculos.fcr = fcr;
        calculos.Io = Io;
        calculos.DnoSatisfecha = DnoSatisfecha;
        calculos.CeTotal = calcularCeTotal(Ce, Io, D);

        console.log({a, b, Ce, Cr});

        for (const [key, value] of Object.entries(calculos)) {
            calculos[key] = formatearNumero(value, 3); // Redondeo a 3 decimales con separadores de miles
        }
        setInventarioCompraOptimo({ ...calculos });
        setIsCalculated(true);
    };

    const calcularDistribucionNormal = (e) => {
      e.preventDefault();
      const calculos = new InventarioCompraOptimo();

        const μ = cantidadEconomicaPedido.muestra;
        const σ = cantidadEconomicaPedido.desviacionTipica;
        const D = calculos.D;

        let Ce = cantidadEconomicaPedido.Ce;
        if (!cantidadEconomicaPedido.Ce) {
          Ce = cantidadEconomicaPedido.costoUnidad - (cantidadEconomicaPedido.costoUnidad * (cantidadEconomicaPedido.salvamento / 100));
        }
        
        let Cr = cantidadEconomicaPedido.Cr;
        if (!cantidadEconomicaPedido.Cr) {
          Cr = cantidadEconomicaPedido.costoUnidad - (cantidadEconomicaPedido.costoUnidad * ((100 - cantidadEconomicaPedido.utilidad) / 100));
        }

        const fcr = (Cr) / (Cr + Ce);

        const z = jStat.normal.inv(fcr, 0, 1); // Calcula z para la distribución normal estándar

        //const Io = μ + (σ * (z * (b - a)));
        const Io = μ + (σ * z);

        calculos.Ce = Ce;
        calculos.Cr = Cr;
        calculos.fcr = fcr;
        calculos.Io = Io;
        calculos.DnoSatisfecha = 1 - fcr;
        calculos.CeTotal = calcularCeTotal(Ce, Io, D);

        for (const [key, value] of Object.entries(calculos)) {
          calculos[key] = formatearNumero(value, 3); // Redondeo a 3 decimales con separadores de miles
      }


        // for (const [key, value] of Object.entries(calculos)) {
        //   calculos[key] = formatearNumero(value, 3); // Redondeo a 3 decimales con separadores de miles
        // }
        setInventarioCompraOptimo({ ...calculos });
        setIsCalculated(true);
    }

    const calcularDistribucionEmpirica = () => {

    }
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCantidadEconomicaPedido({ ...cantidadEconomicaPedido, [name]: (value !== null && value !== '') ? parseFloat(value) : value });
    };

    return (
      <Layout>
        <section className="home section" id="home">
            <div className="container">
                <h1>Gestión de Inventarios</h1>
                <FormGroup>
                    <StyledLabel>Seleccionar modelo de inventario: </StyledLabel>
                    <StyledSelect onChange={handleModeloChange} value={modeloSeleccionado}>
                        <option value="distribucionUniforme">Distribución uniforme</option>
                        <option value="distribucionNormal">Distribución Normal</option>
                        <option value="compraConDeficit">Distribución Empírica – Demanda Aleatoria Discreta</option>
                    </StyledSelect>
                </FormGroup>
                
                <StyledForm onSubmit={calcularDistribucionUniforme}>
                    <h2>Cantidad Económica del Pedido</h2>
                    <br></br>
                    {/* <FormGroup>
                        <StyledLabel>Demanda (D):</StyledLabel>
                        <StyledInput onChange={handleChange} id="demanda" name="demanda" type="number" value={cantidadEconomicaPedido.demanda} />
                    </FormGroup> */}
                    <FormGroup>
                        <StyledLabel>Costo unidad (C1):</StyledLabel>
                        <StyledInput onChange={handleChange} id="costoUnidad" name="costoUnidad" type="number" value={cantidadEconomicaPedido.costoUnidad} />
                    </FormGroup>
                    { modeloSeleccionado === 'distribucionUniforme' &&
                      <>
                        <FormGroup>
                          <StyledLabel>Limite Inferior (a):</StyledLabel>
                          <StyledInput onChange={handleChange} id="limiteInferior" name="limiteInferior" type="number" value={cantidadEconomicaPedido.limiteInferior} />
                        </FormGroup>
                        <FormGroup>
                            <StyledLabel>Limite superior (b):</StyledLabel>
                            <StyledInput onChange={handleChange} id="limiteSuperior" name="limiteSuperior" type="number" value={cantidadEconomicaPedido.limiteSuperior} />
                        </FormGroup>
                      </>
                    }
                    
                    { modeloSeleccionado === 'distribucionNormal' &&
                      <>
                        <FormGroup>
                          <StyledLabel>Muestra (μ):</StyledLabel>
                          <StyledInput onChange={handleChange} id="muestra" name="muestra" type="number" value={cantidadEconomicaPedido.muestra} />
                        </FormGroup>
                        <FormGroup>
                          <StyledLabel>Desviacion tipica (σ):</StyledLabel>
                          <StyledInput onChange={handleChange} id="desviacionTipica" name="desviacionTipica" type="number" value={cantidadEconomicaPedido.desviacionTipica} />
                        </FormGroup>
                        <FormGroup>
                          <StyledLabel>Costo por unidad de exceso (Ce):</StyledLabel>
                          <StyledInput onChange={handleChange} id="Ce" name="Ce" type="number" value={cantidadEconomicaPedido.Ce} />
                        </FormGroup>
                        <FormGroup>
                          <StyledLabel>Costo por unidad deja de percibir (Cr):</StyledLabel>
                          <StyledInput onChange={handleChange} id="Cr" name="Cr" type="number" value={cantidadEconomicaPedido.Cr} />
                        </FormGroup>
                      </>
                    }
                    <FormGroup>
                        <StyledLabel>Porcentaje utilidad %():</StyledLabel>
                        <StyledInput onChange={handleChange} id="utilidad" name="utilidad" type="number" value={cantidadEconomicaPedido.utilidad} />
                    </FormGroup>
                    <FormGroup>
                        <StyledLabel>Porcentaje Salvamento %():</StyledLabel>
                        <StyledInput onChange={handleChange} id="salvamento" name="salvamento" type="number" value={cantidadEconomicaPedido.salvamento} />
                    </FormGroup>
                    <StyledButton type="submit" onClick={
                        modeloSeleccionado === "distribucionUniforme" 
                        ? calcularDistribucionUniforme
                        : modeloSeleccionado === "distribucionNormal"
                        ? calcularDistribucionNormal
                        : calcularDistribucionEmpirica
                    }>
                        Calcular
                    </StyledButton>
                </StyledForm>

                {isCalculated && 
                <ResultsSection>
                    <h2>Política de Inventario Óptimo</h2>
                    <ResultItem><strong>Ce <span>()</span>:</strong> $ {inventarioCompraOptimo.Ce} </ResultItem>
                    <ResultItem><strong>Ce Total <span>()</span>:</strong> $ {inventarioCompraOptimo.CeTotal} </ResultItem>
                    <ResultItem><strong>Cr <span>()</span>:</strong> $ {inventarioCompraOptimo.Cr} </ResultItem>
                    <ResultItem><strong>FCR <span>()</span>:</strong> {inventarioCompraOptimo.fcr} </ResultItem>
                    <ResultItem><strong>Io <span>()</span>:</strong> {inventarioCompraOptimo.Io} unidades </ResultItem>
                    <ResultItem><strong>P(D {"<="} {inventarioCompraOptimo.Io}) <span>()</span>:</strong> {inventarioCompraOptimo.fcr} probabilidad </ResultItem>
                    <ResultItem><strong>P(D {">"} {inventarioCompraOptimo.Io}) <span>()</span>:</strong> {inventarioCompraOptimo.DnoSatisfecha} probabilidad </ResultItem>
                </ResultsSection>
                || ''}
            </div>
        </section>
      </Layout>
    );
}
