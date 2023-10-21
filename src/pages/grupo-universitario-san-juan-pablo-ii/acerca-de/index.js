import CarouselComponent from "@modules/grupo-universitario/components/carousel.component";
import Element from "@modules/grupo-universitario/components/element";
import LayerAnimation from "@modules/grupo-universitario/components/layer-animation";
import Menu from "@modules/grupo-universitario/layouts/menu";
import SocialNetworks from "@modules/grupo-universitario/layouts/social-networks";
import { MainCSS } from "@modules/grupo-universitario/styles/grupo-universitario.css";
import React from "react";

const images = [
    {
        original: "/images/grupo-universitario/actual.png",
        description: "Celebramos la victoria de quien tanto nos ha amado y valorado nuestra juventud 🤍",
    },
    {
        original: "/images/grupo-universitario/pascua.png",
        description: "❤️‍🔥Así se vió nuestra pascua juvenil❤️‍🔥",
    },
    {
        original: "/images/grupo-universitario/domingoRamos.png",
        description: "🌿DOMINGO DE RAMOS🌿",
    },
    {
        original: "/images/grupo-universitario/2019.png",
        description: "Para quienes la pedían...Foto oficial 2019 📷",
    },
];

export default function AcercaDe(props) {
    return (<MainCSS>
        <LayerAnimation />
        <section>
            <Menu activeMenu={"acerca"} />
            <div className="bannerText">
                <h2>Acerca de</h2>
                <br />
                <h3>Grupo Universitario San Juan Pablo II.<br /></h3>
                <p>
                    En el Grupo Universitario San Juan Pablo II, celebramos la diversidad de caminos académicos y profesionales que nuestros miembros siguen. Aquí hay algunas de las carreras que nuestros miembros están persiguiendo:
                    <br />
                    <br />
                    <ul>
                        <li><strong>- Natalia:</strong> Estudiante de Ingeniería en Diseño industrial</li>
                        <li><strong>- Miguel:</strong> Estudiante de Derecho</li>
                        <li><strong>- Felix:</strong> Estudiante de Diseño gráfico</li>
                        <li><strong>- Omar:</strong> Ingeniero industrial</li>
                        <li><strong>- Sara:</strong> Estudiante de Odontóloga</li>
                        <li><strong>- Leonardo:</strong> Estudiante de Ingeniería en Mecatrónica</li>
                        <li><strong>- Carol:</strong> Estudiante de Auxiliar contable</li>
                        <li><strong>- Andrés:</strong> Estudiante de Mercadeo</li>
                        <li><strong>- Alejandro B:</strong> Estudiante de Ingeniería en Mecatrónica</li>
                        <li><strong>- Alejandro G:</strong> Estudiante de Ingeniería en Sistemas</li>
                        <li><strong>- Mateo:</strong> Estudiante de Psicología</li>
                        <li><strong>- Sebastian:</strong> Estudiante de Ingeniería en Informática</li>
                    </ul>
                    <br />
                    Independientemente de la carrera que elijas, en nuestro grupo, encontrarás apoyo, orientación y una comunidad que comparte tus valores y tu fe. No importa dónde te encuentres en tu viaje educativo, ¡eres bienvenido a unirte y crecer con nosotros!
                </p>
                <a target="_blank" href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=M3UwM3QwbTE5cmtwY2Y2ZzJzZXNha3Jza3UgYWMxZGQ4ZDliM2M2YjliMTgwMTM0MGE4OGM3YTQxNjU3YjljMDllYWUyMDFmMTc0ODc2MTZiMDZkZjVjM2MxMUBn&amp;tmsrc=ac1dd8d9b3c6b9b1801340a88c7a41657b9c09eae201f17487616b06df5c3c11%40group.calendar.google.com">Agendarme</a>
            </div>
            <CarouselComponent images={images} />
            {/* <img alt="logo del grupo juvenil" src="/images/grupo-universitario/logo.png" className="bulb" /> */}
            <SocialNetworks />
            {/* <Element number={1} /> */}
            <Element number={2} />
        </section>
    </MainCSS>);
}