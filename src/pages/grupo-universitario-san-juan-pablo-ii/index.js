import { MainCSS } from "@modules/grupo-universitario/styles/grupo-universitario.css";
import React from "react";

export default function GrupoUniversitarioPage(props) {
    const menuToggle = () => {
        const element = document.getElementById('navigation');
        element.classList.toggle("show");
    }
    return (<MainCSS>
        <div className="open">
            <div className="layer"></div>
            <div className="layer"></div>
        </div>
        <section>
            <div className="header">
                <h2 className="logo">San Juan Pablo II</h2>
                <i className="uil uil-apps icon-menu-bars x2" onClick={() => menuToggle()}></i>
                <ul id="navigation">
                    <li>
                        <a href="#" className="active">Inicio</a>
                    </li>
                    <li>
                        <a href="#acerca">Acerca de</a>
                    </li>
                    <li>
                        <a href="#contacto">Contacto</a>
                    </li>
                    <i className="uil uil-times icon-menu-times x2" onClick={() => menuToggle()}></i>
                </ul>
            </div>
            <div className="bannerText">
                <h2>Grupo universitario</h2><br />
                <h3>San Juan Pablo II.<br /> La universidad desde una perspectiva de fe</h3>
                <p>
                    Dios te ha llamado a ser luz en el mundo.
                    Únete a nuestro grupo universitario de la parroquia y descubre cómo la educación y la fe pueden trabajar juntas para fortalecer tu camino.
                    Aquí, encontrarás apoyo espiritual, amistad y un propósito que trasciende lo académico.
                    <br />
                    <br />
                    <strong>Horario:</strong> Sábados 7:00 p.m. <br /> <strong>Lugar:</strong> Parroquia La Sagrada Familia Villa Hermosa
                </p>
                <a target="_blank" href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=MDdvcGNzYjU4Y2ZnYmppNmMwcmJpNmEzNWogamhvbnNlYmFzdGlhbmFzQG0&amp;tmsrc=jhonsebastianas%40gmail.com">Agendarme</a>
            </div>
            <img alt="logo del grupo juvenil" src="/images/grupo-universitario/logo.png" className="bulb" />
            <ul className="sci">
                <li><a href="#facebook"><i className="uil uil-facebook-f"></i></a></li>
                <li><a href="#whatsapp"><i className="uil uil-whatsapp"></i></a></li>
            </ul>
            <div className="element1"></div>
            <div className="element2"></div>
        </section>
    </MainCSS>);
}