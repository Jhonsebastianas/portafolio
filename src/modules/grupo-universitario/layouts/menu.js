import Link from "next/link";
import React from "react";
import PropTypes from 'prop-types';

const Menu = (props) => {
    const { activeMenu } = props;

    const isActive = (option) => {
        return option == activeMenu && 'active' || '';
    }

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
                    <Link href={"/grupo-universitario-san-juan-pablo-ii"}>
                        <a className={`${isActive("inicio")}`}>Inicio</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/grupo-universitario-san-juan-pablo-ii/acerca-de"}>
                        <a className={`${isActive("acerca")}`}>Acerca de</a>
                    </Link>
                </li>
                <li>
                    <a href="#contacto">Contacto</a>
                </li>
                <i className="uil uil-times icon-menu-times x2" onClick={() => menuToggle()}></i>
            </ul>
        </div>
    );
}

Menu.propTypes = {
    activeMenu: PropTypes.string,
}

export default Menu;