import React from "react";

export default function Menu(props) {
    const menuToggle = () => {
        const element = document.getElementById('navigation');
        element.classList.toggle("show");
    }
    return (
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
    );
}