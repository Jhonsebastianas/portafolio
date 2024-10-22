import Button from "@components/commons/button";
import Layout from "@modules/investigacion-operaciones/layouts/layout";
import { useState } from "react";
import styled from "styled-components";

class CantidadEconomicaPedido {
    demandaAnual = 36000;
    costoOrdenar = 1000;
    tasaCostoRetencionAnualInventario = 90; // porcentaje
    costoUnitario = 4;
    diasHabilAno = 360;
    tiempoEspera = 10;
    tasaProduccionAnual = 72000; // nuevo campo para el modelo de producción
    costoFaltante = 0; // nuevo campo para el modelo con déficit
}

class InventarioCompraOptimo {
    cantidadEconomicaPedido = 0;
    costeRetencionAnualInventario = 0;
    costeAnualOrdenar = 0;
    costeAnualTotalPorPeriodo = 0;
    costoTotalAnualInventario = 0;
    nivelInventarioMaximo = 0;
    nivelInventarioPromedio = 0;
    puntoReorden = 0;
    numeroPedidosAno = 0;
    tiempoCiclo = 0;

    // Nuevos para el modelo con déficit
    nivelDeficit = 0;
    costeFaltanteAnual = 0;

    // Punto de reorden
    porTiempo = 0;
    porInventarioConsumido = 0;
    porInventarioPorConsumir = 0;
}

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

export default function Home() {
    const FIXED = 3;
    const [inventarioCompraOptimo, setInventarioCompraOptimo] = useState(new InventarioCompraOptimo());
    const [cantidadEconomicaPedido, setCantidadEconomicaPedido] = useState(new CantidadEconomicaPedido());
    const [isCalculated, setIsCalculated] = useState(false);

    const [modeloSeleccionado, setModeloSeleccionado] = useState("compra"); // por defecto, modelo de compra

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

    const calcularInventarioCompraOptimo = (e) => {
        e.preventDefault();
        const calculos = new InventarioCompraOptimo();
        const D = cantidadEconomicaPedido.demandaAnual;
        const Co = cantidadEconomicaPedido.costoOrdenar;
        const Ch = cantidadEconomicaPedido.tasaCostoRetencionAnualInventario;
        const ChPorcentual = Ch / 100;
        const C1 = cantidadEconomicaPedido.costoUnitario;
        const Q = Math.sqrt((2 * D * Co)/(ChPorcentual * C1));

        console.log({D, Co, Ch, C1, Q})

        calculos.cantidadEconomicaPedido = Q;
        calculos.costeRetencionAnualInventario = (1/2) * calculos.cantidadEconomicaPedido * (ChPorcentual * C1);
        calculos.costeAnualOrdenar = ((D/Q) * Co);
        calculos.costeAnualTotalPorPeriodo = (calculos.costeRetencionAnualInventario + calculos.costeAnualOrdenar);
        calculos.nivelInventarioMaximo = calculos.cantidadEconomicaPedido;
        calculos.nivelInventarioPromedio = calculos.cantidadEconomicaPedido / 2;
        calculos.puntoReorden = (D / cantidadEconomicaPedido.diasHabilAno) * cantidadEconomicaPedido.tiempoEspera;
        calculos.numeroPedidosAno = D / calculos.cantidadEconomicaPedido;
        calculos.tiempoCiclo = cantidadEconomicaPedido.diasHabilAno / calculos.numeroPedidosAno;

        const C = (C1 * D) + calculos.costeAnualTotalPorPeriodo;
        calculos.costoTotalAnualInventario = C;

        // Tiempos de reorden.
        calculos.porTiempo = (calculos.tiempoCiclo - cantidadEconomicaPedido.tiempoEspera);
        calculos.porInventarioConsumido = (Q / calculos.tiempoCiclo) * calculos.porTiempo;
        calculos.porInventarioPorConsumir = Q - calculos.porInventarioConsumido;

        for (const [key, value] of Object.entries(calculos)) {
            calculos[key] = formatearNumero(value, 3); // Redondeo a 3 decimales con separadores de miles
        }
        setInventarioCompraOptimo({ ...calculos });
        setIsCalculated(true);
    };

    const calcularInventarioProduccionSinDeficit = (e) => {
        e.preventDefault();
        const calculos = new InventarioCompraOptimo();
        const D = cantidadEconomicaPedido.demandaAnual;
        const Co = cantidadEconomicaPedido.costoOrdenar;
        const Ch = cantidadEconomicaPedido.tasaCostoRetencionAnualInventario / 100;
        const C1 = cantidadEconomicaPedido.costoUnitario;
        const P = cantidadEconomicaPedido.tasaProduccionAnual / cantidadEconomicaPedido.diasHabilAno; // tasa de producción diaria
        const diasHabilAno = cantidadEconomicaPedido.diasHabilAno;
        const C3 = Ch * C1;
        const R = P * diasHabilAno;
    
        if (P <= 0 || P <= (D / diasHabilAno)) {
            alert("La tasa de producción debe ser mayor que la demanda diaria.");
            return;
        }
    
        // Fórmula EOQ modificada para producción
        const Q = Math.sqrt((2 * D * Co) / (C3 * (1 - (D / (R)))));
    
        // Calcular el costo total anual por pedido (C')
        const parteFijaCostos = C1 * Q;

        console.log({parteFijaCostos, Co})

        const C_prima = C1 * Q + Co + ((C3 * Q * Q) / (2 * D)) * (1 - (D / (R)));
    
        calculos.cantidadEconomicaPedido = Q;
        calculos.costeRetencionAnualInventario = (1 / 2) * Q * C3 * (1 - (D / (R)));
        calculos.costeAnualOrdenar = (D / Q) * Co;
        calculos.costeAnualTotalPorPeriodo = calculos.costeRetencionAnualInventario + calculos.costeAnualOrdenar;
        calculos.nivelInventarioMaximo = Q * (1 - (D / (R)));
        calculos.nivelInventarioPromedio = calculos.nivelInventarioMaximo / 2;
        calculos.puntoReorden = (D / diasHabilAno) * cantidadEconomicaPedido.tiempoEspera;
        calculos.numeroPedidosAno = D / Q;

        const t1 = Q / R;
        const t2 = (calculos.nivelInventarioMaximo) / D;
        const t = t1 + t2;

        calculos.tiempoCiclo = diasHabilAno / calculos.numeroPedidosAno;
    
        // Cálculo del costo total anual (C)
        const C_total = (C1 * D) + (Co * D / Q) + (C3 * (Q / 2) * (1 - (D / (R))));
    
        calculos.costoTotalAnualInventario = C_total;
        calculos.costeAnualTotalPorPeriodo = C_prima;
    
        // Tiempos de reorden.
        calculos.porTiempo = (calculos.tiempoCiclo - cantidadEconomicaPedido.tiempoEspera);
        calculos.porInventarioConsumido = (Q / calculos.tiempoCiclo) * calculos.porTiempo;
        calculos.porInventarioPorConsumir = Q - calculos.porInventarioConsumido;
    
        // Redondear los resultados a 3 decimales
        for (const [key, value] of Object.entries(calculos)) {
            calculos[key] = formatearNumero(value, 3); // Redondeo a 3 decimales con separadores de miles
        }
    
        setInventarioCompraOptimo({ ...calculos });
        setIsCalculated(true);
    };    

    const calcularInventarioCompraConDeficit = (e) => {
        e.preventDefault();
        const calculos = new InventarioCompraOptimo();
        const D = cantidadEconomicaPedido.demandaAnual;
        const C1 = cantidadEconomicaPedido.costoUnitario;
        const C2 = cantidadEconomicaPedido.costoOrdenar;
        const I = (cantidadEconomicaPedido.tasaCostoRetencionAnualInventario / 100);
        const C3 = I * C1;
        // Costo del déficit (falta)
        const C4 = cantidadEconomicaPedido.costoFaltante;
        const L = cantidadEconomicaPedido.tiempoEspera;
        
        // Cálculo de la cantidad económica del pedido (Q)
        const Q = Math.sqrt((2 * C2 * D) / C3) * Math.sqrt((C3 + C4) / C4);

        // Cálculo del déficit permitido (S)
        const S = Math.sqrt((2 * C2 * D) / C4) * Math.sqrt((C3) / (C3 + C4));
        
        // Cálculo de C' (costo total por periodo)
        const C_prima = C1 * Q + C2 + (C3 * Math.pow(Q - S, 2) / (2 * D)) + (C4 * Math.pow(S, 2) / (2 * D));
        console.log({ C_prima });
    
        // Cálculos comunes del modelo básico de inventario
        calculos.cantidadEconomicaPedido = Q;
        calculos.costeRetencionAnualInventario = (1 / 2) * (Q - S) * C3;
        calculos.costeAnualOrdenar = (D / Q) * C2;
        calculos.costeAnualTotalPorPeriodo = C_prima;
        
        calculos.nivelInventarioMaximo = Q - S;
        calculos.nivelInventarioPromedio = (Q - S) / 2;
        calculos.puntoReorden = (D / cantidadEconomicaPedido.diasHabilAno) * cantidadEconomicaPedido.tiempoEspera;
        calculos.numeroPedidosAno = D / Q;
        calculos.tiempoCiclo = cantidadEconomicaPedido.diasHabilAno / calculos.numeroPedidosAno;
    
        // Cálculo del costo anual de déficit
        calculos.nivelDeficit = S;
        calculos.costeFaltanteAnual = (D / Q) * C4 * S;

        // Cálculo del costo total anual del inventario (C)
        // Aquí sumamos solo el costo total relacionado con la demanda anual
        // evitando sumar los costos que ya están incluidos en C_prima.
        const C = (C1 * D) + ((D / Q) * C2) + (C3 * Math.pow(Q - S, 2) / (2 * Q)) + (C4 * Math.pow(S, 2) / (2 * Q));
        console.log({ C });

        calculos.costoTotalAnualInventario = C;

        // Tiempos de reorden.
        calculos.porTiempo = redondearGlobal(calculos.tiempoCiclo - cantidadEconomicaPedido.tiempoEspera);
        calculos.porInventarioConsumido = redondearGlobal((Q / calculos.tiempoCiclo) * calculos.porTiempo);
        calculos.porInventarioPorConsumir = redondearGlobal(Q - calculos.porInventarioConsumido);
    
        // Redondear los resultados a 3 decimales
        for (const [key, value] of Object.entries(calculos)) {
            calculos[key] = formatearNumero(value, 3); // Redondeo a 3 decimales con separadores de miles
        }
    
        setInventarioCompraOptimo({ ...calculos });
        setIsCalculated(true);
    };
    
    

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
                        <option value="compra">Modelo de compra</option>
                        <option value="produccionSinDeficit">Modelo de producción sin déficit</option>
                        <option value="compraConDeficit">Modelo de compra con déficit</option>
                    </StyledSelect>
                </FormGroup>
                
                <StyledForm onSubmit={calcularInventarioCompraOptimo}>
                    <h2>Cantidad Económica del Pedido</h2>
                    <br></br>
                    <FormGroup>
                        <StyledLabel>Demanda anual (D):</StyledLabel>
                        <StyledInput onChange={handleChange} id="demandaAnual" name="demandaAnual" type="number" value={cantidadEconomicaPedido.demandaAnual} />
                    </FormGroup>
                    <FormGroup>
                        <StyledLabel>Costo de ordenar (Co):</StyledLabel>
                        <StyledInput onChange={handleChange} id="costoOrdenar" name="costoOrdenar" type="number" value={cantidadEconomicaPedido.costoOrdenar} />
                    </FormGroup>
                    <FormGroup>
                        <StyledLabel>Tasa sobre el costo de retención anual % (Ch):</StyledLabel>
                        <StyledInput onChange={handleChange} id="tasaCostoRetencionAnualInventario" name="tasaCostoRetencionAnualInventario" type="number" value={cantidadEconomicaPedido.tasaCostoRetencionAnualInventario} />
                    </FormGroup>
                    <FormGroup>
                        <StyledLabel>Costo unitario (C1):</StyledLabel>
                        <StyledInput onChange={handleChange} id="costoUnitario" name="costoUnitario" type="number" value={cantidadEconomicaPedido.costoUnitario} />
                    </FormGroup>
                    <FormGroup>
                        <StyledLabel>Días hábiles por año:</StyledLabel>
                        <StyledInput onChange={handleChange} id="diasHabilAno" name="diasHabilAno" type="number" value={cantidadEconomicaPedido.diasHabilAno} />
                    </FormGroup>
                    <FormGroup>
                        <StyledLabel>Tiempo de espera (días):</StyledLabel>
                        <StyledInput onChange={handleChange} id="tiempoEspera" name="tiempoEspera" type="number" value={cantidadEconomicaPedido.tiempoEspera} />
                    </FormGroup>
                    {modeloSeleccionado === "produccionSinDeficit" && (
                        <FormGroup>
                            <StyledLabel>Tasa de producción anual (P / R): </StyledLabel>
                            <StyledInput onChange={handleChange} id="tasaProduccionAnual" name="tasaProduccionAnual" type="number" value={cantidadEconomicaPedido.tasaProduccionAnual} />
                        </FormGroup>
                    )}

                    {modeloSeleccionado === "compraConDeficit" && (
                        <FormGroup>
                            <StyledLabel>Costo por unidad de déficit (Cs): </StyledLabel>
                            <StyledInput onChange={handleChange} id="costoFaltante" name="costoFaltante" type="number" value={cantidadEconomicaPedido.costoFaltante} />
                        </FormGroup>
                    )}
                    <StyledButton type="submit" onClick={
                        modeloSeleccionado === "compra" 
                        ? calcularInventarioCompraOptimo
                        : modeloSeleccionado === "produccionSinDeficit"
                        ? calcularInventarioProduccionSinDeficit
                        : calcularInventarioCompraConDeficit
                    }>
                        Calcular
                    </StyledButton>
                </StyledForm>

                {isCalculated && 
                <ResultsSection>
                    <h2>Política de Inventario Óptimo</h2>
                    <ResultItem><strong>Q <span>(Cantidad económica del pedido)</span>:</strong> {inventarioCompraOptimo.cantidadEconomicaPedido} (unidades / año)</ResultItem>
                    <ResultItem><strong>C <span>(Costo almacenamiento)</span>:</strong> {inventarioCompraOptimo.costoTotalAnualInventario} (/ año)</ResultItem>
                    <ResultItem><strong>N <span>(Número de pedidos por año)</span>:</strong> {inventarioCompraOptimo.numeroPedidosAno} (pedidos / año)</ResultItem>
                    <ResultItem><strong>t <span>(Tiempo de ciclo (días))</span>:</strong> {inventarioCompraOptimo.tiempoCiclo} (días / pedido)</ResultItem>
                    <ResultItem><strong>C' <span>(Costo anual total por pedido)</span>:</strong> $ {inventarioCompraOptimo.costeAnualTotalPorPeriodo} (/ pedidos)</ResultItem>
                    {modeloSeleccionado === "compraConDeficit" && (
                        <>
                            <ResultItem><strong>S (Déficit permitido:)</strong> {inventarioCompraOptimo.nivelDeficit}</ResultItem>
                            <ResultItem><strong>Costo anual de déficit:</strong> $ {inventarioCompraOptimo.costeFaltanteAnual}</ResultItem>
                        </>
                    )}
                    <ResultItem><strong>I max (Nivel de inventario máximo):</strong> {inventarioCompraOptimo.nivelInventarioMaximo}</ResultItem>
                    <ResultItem><strong>Costo de retención anual del inventario:</strong> $ {inventarioCompraOptimo.costeRetencionAnualInventario}</ResultItem>
                    <ResultItem><strong>Costo anual de ordenar:</strong> $ {inventarioCompraOptimo.costeAnualOrdenar}</ResultItem>
                    <ResultItem><strong>Nivel de inventario promedio:</strong> {inventarioCompraOptimo.nivelInventarioPromedio}</ResultItem>
                    <ResultItem><strong>Punto de reorden:</strong> {inventarioCompraOptimo.puntoReorden}</ResultItem>
                    
                    {/* Información adicional para el modelo de producción sin déficit */}
                    {modeloSeleccionado === "produccionSinDeficit" && (
                        <>
                            <ResultItem><strong>Inventario máximo con tasa de producción:</strong> {inventarioCompraOptimo.nivelInventarioMaximo}</ResultItem>
                        </>
                    )}
                    {/* Información adicional para el modelo de compra con déficit */}
                    
                    <br></br>
                    <h2>Pr = Punto de reorden</h2>
                    <ResultItem><strong>Por tiempo:</strong> {inventarioCompraOptimo.porTiempo} (días)</ResultItem>
                    <ResultItem><strong>Por inventario consumido:</strong> {inventarioCompraOptimo.porInventarioConsumido} (unidades)</ResultItem>
                    <ResultItem><strong>Por inventario por consumir:</strong> {inventarioCompraOptimo.porInventarioPorConsumir} (unidades)</ResultItem>
                </ResultsSection>
                || ''}
            </div>
        </section>
      </Layout>
    );
}
