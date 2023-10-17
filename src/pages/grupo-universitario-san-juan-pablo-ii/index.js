import Element from "@modules/grupo-universitario/components/element";
import LayerAnimation from "@modules/grupo-universitario/components/layer-animation";
import Menu from "@modules/grupo-universitario/layouts/menu";
import SocialNetworks from "@modules/grupo-universitario/layouts/social-networks";
import { MainCSS } from "@modules/grupo-universitario/styles/grupo-universitario.css";
import React from "react";

export default function GrupoUniversitarioPage(props) {
    return (<MainCSS>
        <LayerAnimation />
        <section>
            <Menu activeMenu={"inicio"} />
            <div className="bannerText">
                <h2>Grupo universitario</h2>
                <br />
                <h3>San Juan Pablo II.<br /> La universidad desde una perspectiva de fe</h3>
                <p>
                    Dios te ha llamado a ser luz en el mundo.
                    Únete a nuestro grupo universitario de la parroquia y descubre cómo la educación y la fe pueden trabajar juntas para fortalecer tu camino.
                    Aquí, encontrarás apoyo espiritual, amistad y un propósito que trasciende lo académico.
                    <br />
                    <br />
                    <strong>Horario:</strong> Sábados 7:00 p.m. <br /> <strong>Lugar:</strong> Parroquia La Sagrada Familia Villa Hermosa
                </p>
                <a target="_blank" href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=M3UwM3QwbTE5cmtwY2Y2ZzJzZXNha3Jza3UgYWMxZGQ4ZDliM2M2YjliMTgwMTM0MGE4OGM3YTQxNjU3YjljMDllYWUyMDFmMTc0ODc2MTZiMDZkZjVjM2MxMUBn&amp;tmsrc=ac1dd8d9b3c6b9b1801340a88c7a41657b9c09eae201f17487616b06df5c3c11%40group.calendar.google.com">Agendarme</a>
            </div>
            <img alt="logo del grupo juvenil" src="/images/grupo-universitario/logo.png" className="bulb" />
            <SocialNetworks />
            <Element number={1} />
            <Element number={2} />
        </section>
    </MainCSS>);
}