import Button from "@components/commons/button";
import Layout from "@components/layouts/Layout";
import { useState } from "react";
import styled from "styled-components";

class CantidadEconomicaPedido {
    demandaAnual = 104000;
    costoOrdenar = 32;
    tasaCostoRetencionAnualInventario = 25; // porcentaje
    costoUnitario = 8;
    diasHabilAno = 250;
    tiempoEspera = 2;
}

class CantidadEconomicaProduccion extends CantidadEconomicaPedido {
    tasaProduccionDiaria = 0;
}

class InventarioCompraOptimo {
    cantidadEconomicaPedido = 0;
    costeRetencionAnualInventario = 0;
    costeAnualOrdenar = 0;
    costeAnualTotal = 0;
    nivelInventarioMaximo = 0;
    nivelInventarioPromedio = 0;
    puntoReorden = 0;
    numeroPedidosAno = 0;
    tiempoCiclo = 0;
}

export const StyledForm = styled.form`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
`

export const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: ${props => props.invalid ? 'red' : 'black'};
`

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 1.25rem;
  border-radius: 5px;
`

export default function Home() {

    const FIXED = 3;

    const [inventarioCompraOptimo, setInventarioCompraOptimo] = useState(new InventarioCompraOptimo());

    const [cantidadEconomicaPedido, setCantidadEconomicaPedido] = useState(new CantidadEconomicaPedido());

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

        for (const [key, value] of Object.entries(calculos)) {
            calculos[key] = value.toFixed(FIXED);
        }
        setInventarioCompraOptimo({...calculos});
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCantidadEconomicaPedido({ ...cantidadEconomicaPedido, [name]: (value != null && value != '') ? parseFloat(value) : value });
    }

    return (
      <Layout>
        <section className="home section" id="home">
            <div className="container">
                <h1>Inventarios</h1>
                <h2>Cantidad económica del pedido</h2>
                <StyledForm>
                    <div>
                        <StyledLabel>Demanda anual (D): </StyledLabel>
                        <StyledInput onChange={handleChange} id="demandaAnual" name="demandaAnual" type="number" value={cantidadEconomicaPedido.demandaAnual} />
                    </div>
                    <div>
                        <StyledLabel>Costo de ordenar (C2 / Co): </StyledLabel>
                        <StyledInput onChange={handleChange} id="costoOrdenar" name="costoOrdenar" type="number" value={cantidadEconomicaPedido.costoOrdenar} />
                    </div>
                    <div>
                        <StyledLabel>Tasa sobre el costo de retención
                        anual del inventario % (C3 / Ch):  </StyledLabel>
                        <StyledInput onChange={handleChange} id="tasaCostoRetencionAnualInventario" name="tasaCostoRetencionAnualInventario" type="number" value={cantidadEconomicaPedido.tasaCostoRetencionAnualInventario} />
                    </div>
                    <div>
                        <StyledLabel>Costo unitario (C1): </StyledLabel>
                        <StyledInput onChange={handleChange} id="costoUnitario" name="costoUnitario" type="number" value={cantidadEconomicaPedido.costoUnitario} />
                    </div>
                    <div>
                        <StyledLabel>Días hábiles por año: </StyledLabel>
                        <StyledInput onChange={handleChange} id="diasHabilAno" name="diasHabilAno" type="number" value={cantidadEconomicaPedido.diasHabilAno} />
                    </div>
                    <div>
                        <StyledLabel>Tiempo de espera (días): </StyledLabel>
                        <StyledInput onChange={handleChange} id="tiempoEspera" name="tiempoEspera" type="number" value={cantidadEconomicaPedido.tiempoEspera} />
                    </div>
                    <br></br>
                    <div>
                        <Button type="submit" onClick={calcularInventarioCompraOptimo}>
                            Calcular
                        </Button>
                    </div>


                </StyledForm>

                <div>
                    <h2>Política de inventario óptimo</h2>
                    <p><strong>Cantidad económica del pedido: </strong> {inventarioCompraOptimo.cantidadEconomicaPedido} </p>
                    <p><strong>Costo de retención anual del inventario: </strong> $ {inventarioCompraOptimo.costeRetencionAnualInventario}</p>
                    <p><strong>Costo anual de ordenar: </strong> $ {inventarioCompraOptimo.costeAnualOrdenar}</p>
                    <p><strong>Costo anual total:</strong> $ {inventarioCompraOptimo.costeAnualTotal}</p>
                    <p><strong>Nivel de inventario máximo: </strong>{ inventarioCompraOptimo.nivelInventarioMaximo}</p>
                    <p><strong>Nivel de inventario promedio :</strong> {inventarioCompraOptimo.nivelInventarioPromedio}</p>
                    <p><strong>Punto de reorden :</strong> { inventarioCompraOptimo.puntoReorden}</p>
                    <p><strong>Número de pedidos por año :</strong> {inventarioCompraOptimo.numeroPedidosAno}</p>
                    <p><strong>Tiempo de ciclo (días): </strong> {inventarioCompraOptimo.tiempoCiclo}</p>
                </div>
            </div>
        </section>
      </Layout>
    )
  }
  