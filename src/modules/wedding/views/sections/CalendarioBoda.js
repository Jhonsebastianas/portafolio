import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Contenedor = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5f4b3c;
  font-family: 'Georgia', serif;

  .cursive {
    font-family: "Luxurious Script", cursive;
  }
`;

const Calendario = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 2rem);
  gap: 0.5rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const Dia = styled.div`
  font-size: 0.9rem;
  opacity: ${props => (props.resaltado ? 1 : 0.5)};
  font-weight: ${props => (props.resaltado ? 'bold' : 'normal')};
  color: ${props => (props.resaltado ? '#b17259' : '#5f4b3c')};
`;

const Titulo = styled.h2`
  font-family: "Luxurious Script", cursive;
  font-size: 5rem !important;
  color: #9d7d1e;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Contador = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-size: 2rem;
  font-weight: 600;
  color: #b17259;
`;

const Tiempo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0.2rem 0.5rem;
  text-shadow: 0 0 8px rgba(250, 250, 250, 0.8);
`;

const Numero = styled.span`
  font-size: 2.2rem;
`;

const Label = styled.span`
  font-size: 0.8rem;
  color: #a48362;
  margin-top: 0.2rem;
`;

const CalendarioBoda = () => {
    const ref = useRef();
    const [tiempoRestante, setTiempoRestante] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

    useEffect(() => {
        const animate = async () => {
          const { gsap } = await import("gsap");
          const { ScrollTrigger } = await import("gsap/ScrollTrigger");
          gsap.registerPlugin(ScrollTrigger);

            gsap.from(ref.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 80%',
                },
            });
        };
    
        animate();
      }, []);

    useEffect(() => {
        const fechaObjetivo = new Date('2025-06-28T00:00:00');

        const actualizarContador = () => {
            const ahora = new Date();
            const diferencia = fechaObjetivo - ahora;

            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
            const minutos = Math.floor((diferencia / 1000 / 60) % 60);
            const segundos = Math.floor((diferencia / 1000) % 60);

            setTiempoRestante({ dias, horas, minutos, segundos });
        };

        const intervalo = setInterval(actualizarContador, 1000);
        actualizarContador(); // iniciar inmediatamente

        return () => clearInterval(intervalo);
    }, []);

    const diasSemana = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const diasMes = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <Contenedor ref={ref}>
            <Titulo>Reserva la fecha</Titulo>
            <p style={{ color: "#b17259" }}>Junio 2025</p>
            <br />
            <Calendario>
                {diasSemana.map((dia, idx) => (
                    <Dia key={`semana-${idx}`} resaltado>{dia}</Dia>
                ))}
                {Array(5).fill('').map((_, i) => <Dia key={`espacio-${i}`} />)} {/* junio inicia sábado */}
                {diasMes.map(d => (
                    <Dia key={d} resaltado={d === 28}>{d}</Dia>
                ))}
            </Calendario>

            <Titulo>Faltan</Titulo>
            <Contador>
                <Tiempo>
                    <Numero>{tiempoRestante.dias}</Numero>
                    <Label>Días</Label>
                </Tiempo>
                <Tiempo>
                    <Numero>{tiempoRestante.horas}</Numero>
                    <Label>Horas</Label>
                </Tiempo>
                <Tiempo>
                    <Numero>{tiempoRestante.minutos}</Numero>
                    <Label>Min</Label>
                </Tiempo>
                <Tiempo>
                    <Numero>{tiempoRestante.segundos}</Numero>
                    <Label>Seg</Label>
                </Tiempo>
            </Contador>
        </Contenedor>
    );
};

export default CalendarioBoda;
