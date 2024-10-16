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
    costeAnualTotal = 0;
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
        calculos.costeAnualTotal = (calculos.costeRetencionAnualInventario + calculos.costeAnualOrdenar);
        calculos.nivelInventarioMaximo = calculos.cantidadEconomicaPedido;
        calculos.nivelInventarioPromedio = calculos.cantidadEconomicaPedido / 2;
        calculos.puntoReorden = (D / cantidadEconomicaPedido.diasHabilAno) * cantidadEconomicaPedido.tiempoEspera;
        calculos.numeroPedidosAno = D / calculos.cantidadEconomicaPedido;
        calculos.tiempoCiclo = cantidadEconomicaPedido.diasHabilAno / calculos.numeroPedidosAno;

        const C = (C1 * D) + calculos.costeAnualTotal;
        calculos.costoTotalAnualInventario = C;

        // Tiempos de reorden.
        calculos.porTiempo = (calculos.tiempoCiclo - cantidadEconomicaPedido.tiempoEspera);
        calculos.porInventarioConsumido = (Q / calculos.tiempoCiclo) * calculos.porTiempo;
        calculos.porInventarioPorConsumir = Q - calculos.porInventarioConsumido;

        for (const [key, value] of Object.entries(calculos)) {
            calculos[key] = value.toFixed(FIXED);
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
    
        if (P <= 0 || P <= (D / diasHabilAno)) {
            alert("La tasa de producción debe ser mayor que la demanda diaria.");
            return;
        }
    
        // Fórmula EOQ modificada para producción
        const Q = Math.sqrt((2 * D * Co) / (Ch * C1 * (1 - (D / (P * diasHabilAno)))));
    
        calculos.cantidadEconomicaPedido = Q;
        calculos.costeRetencionAnualInventario = (1/2) * Q * Ch * C1 * (1 - (D / (P * diasHabilAno)));
        calculos.costeAnualOrdenar = (D / Q) * Co;
        calculos.costeAnualTotal = calculos.costeRetencionAnualInventario + calculos.costeAnualOrdenar;
        calculos.nivelInventarioMaximo = Q * (1 - (D / (P * diasHabilAno)));
        calculos.nivelInventarioPromedio = calculos.nivelInventarioMaximo / 2;
        calculos.puntoReorden = (D / diasHabilAno) * cantidadEconomicaPedido.tiempoEspera;
        calculos.numeroPedidosAno = D / Q;
        calculos.tiempoCiclo = diasHabilAno / calculos.numeroPedidosAno;

        const C = (C1 * D) + calculos.costeAnualTotal;
        calculos.costoTotalAnualInventario = C;

        // Tiempos de reorden.
        calculos.porTiempo = (calculos.tiempoCiclo - cantidadEconomicaPedido.tiempoEspera);
        calculos.porInventarioConsumido = (Q / calculos.tiempoCiclo) * calculos.porTiempo;
        calculos.porInventarioPorConsumir = Q - calculos.porInventarioConsumido;

    
        for (const [key, value] of Object.entries(calculos)) {
            calculos[key] = value.toFixed(FIXED);
        }
        setInventarioCompraOptimo({ ...calculos });
        setIsCalculated(true);
    };

    const calcularInventarioCompraConDeficit = (e) => {
        e.preventDefault();
        const calculos = new InventarioCompraOptimo();
        const D = cantidadEconomicaPedido.demandaAnual;
        const Co = cantidadEconomicaPedido.costoOrdenar;
        const Ch = cantidadEconomicaPedido.tasaCostoRetencionAnualInventario;
        const ChPorcentual = Ch / 100;
        const C1 = cantidadEconomicaPedido.costoUnitario;
        
        // Costo del déficit (falta)
        const p = cantidadEconomicaPedido.costoDeficit || 10; // Ejemplo de costo por unidad en déficit
        const h = ChPorcentual * C1; // Costo de mantener inventario
        
        // Cálculo de la cantidad económica del pedido (Q)
        const Q = Math.sqrt((2 * D * Co) / (h * (1 + (h / p))));
        
        // Cálculo del déficit permitido (S)
        const S = (Q * h) / (h + p);
    
        console.log({ D, Co, Ch, C1, Q, S });
    
        // Cálculos comunes del modelo básico de inventario
        calculos.cantidadEconomicaPedido = Q;
        calculos.costeRetencionAnualInventario = (1 / 2) * (Q - S) * h;
        calculos.costeAnualOrdenar = (D / Q) * Co;
        calculos.costeAnualTotal = calculos.costeRetencionAnualInventario + calculos.costeAnualOrdenar;
        calculos.nivelInventarioMaximo = Q - S;
        calculos.nivelInventarioPromedio = (Q - S) / 2;
        calculos.puntoReorden = (D / cantidadEconomicaPedido.diasHabilAno) * cantidadEconomicaPedido.tiempoEspera;
        calculos.numeroPedidosAno = D / Q;
        calculos.tiempoCiclo = cantidadEconomicaPedido.diasHabilAno / calculos.numeroPedidosAno;
    
        // Cálculo del costo anual de déficit
        calculos.nivelDeficit = S;
        calculos.costeFaltanteAnual = (D / Q) * p * S;

        const C = (C1 * D) + calculos.costeAnualTotal;
        calculos.costoTotalAnualInventario = C;

        // Tiempos de reorden.
        calculos.porTiempo = (calculos.tiempoCiclo - cantidadEconomicaPedido.tiempoEspera);
        calculos.porInventarioConsumido = (Q / calculos.tiempoCiclo) * calculos.porTiempo;
        calculos.porInventarioPorConsumir = Q - calculos.porInventarioConsumido;
    
        // Redondear los resultados a 3 decimales
        for (const [key, value] of Object.entries(calculos)) {
            calculos[key] = value.toFixed(FIXED);
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
                    <ResultItem><strong>C' <span>(Costo anual total)</span>:</strong> $ {inventarioCompraOptimo.costeAnualTotal} (/ pedidos)</ResultItem>
                    <ResultItem><strong>Costo de retención anual del inventario:</strong> $ {inventarioCompraOptimo.costeRetencionAnualInventario}</ResultItem>
                    <ResultItem><strong>Costo anual de ordenar:</strong> $ {inventarioCompraOptimo.costeAnualOrdenar}</ResultItem>
                    <ResultItem><strong>Nivel de inventario máximo:</strong> {inventarioCompraOptimo.nivelInventarioMaximo}</ResultItem>
                    <ResultItem><strong>Nivel de inventario promedio:</strong> {inventarioCompraOptimo.nivelInventarioPromedio}</ResultItem>
                    <ResultItem><strong>Punto de reorden:</strong> {inventarioCompraOptimo.puntoReorden}</ResultItem>
                    
                    {/* Información adicional para el modelo de producción sin déficit */}
                    {modeloSeleccionado === "produccionSinDeficit" && (
                        <>
                            <ResultItem><strong>Inventario máximo con tasa de producción:</strong> {inventarioCompraOptimo.nivelInventarioMaximo}</ResultItem>
                        </>
                    )}
                    {/* Información adicional para el modelo de compra con déficit */}
                    {modeloSeleccionado === "compraConDeficit" && (
                        <>
                            <ResultItem><strong>Déficit permitido:</strong> {inventarioCompraOptimo.nivelDeficit}</ResultItem>
                            <ResultItem><strong>Costo anual de déficit:</strong> $ {inventarioCompraOptimo.costeFaltanteAnual}</ResultItem>
                        </>
                    )}
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
