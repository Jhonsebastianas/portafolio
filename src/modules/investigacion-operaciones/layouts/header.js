import Link from 'next/link'
import React, { useEffect } from 'react'
import StyledComponents from 'styled-components'

const StyledHeader = StyledComponents.header`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: var(--z-fixed);
    background-color: var(--body-color);

    .show-menu {
        bottom: 0;
    }

    .active-link {
        color: var(--first-color);
    }

    // Change background header
    .scroll-header {
        box-shadow: 0 -1px 4px rgba(0, 0, 0, .15);
    }

    /*========== Button Dark/Light ==========*/

    .nav__btns {
        display: flex;
        align-items: center;
    }

    .change-theme {
        font-size: 1.25rem;
        color: var(--title-color);
        margin-right: var(--mb-1);
        cursor: pointer;
    }

    .change-theme:hover {
        color: var(--first-color);
    }

    /* For small devices */
    @media screen and (max-width: 350px) {
        /** MENÚ */
        .nav__menu {
            padding: 2rem .25rem 4rem !important;
        }
        .nav__list {
            column-gap: 0 !important;
        }
    }

    /* For medium devices */
    @media screen and (min-width: 768px) {
        top: 0 !important;
        bottom: initial !important;
        padding: 0 1rem;
        
        .nav__icon, .nav__close, .nav__toggle {
            display: none;
        }

        .nav__list {
            display: flex;
            column-gap: 2rem;
        }
        .nav__menu {
            margin-left: auto;
        }
        .change-theme {
            margin: 0px !important;
        }
    }

    /* For large devices */
    @media screen and (min-width: 1024px) {
        padding: 0;
    }
`

const StyledNav = StyledComponents.nav`
    max-width: 968px;
    height: var(--header-height);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav__logo, 
    .nav__toggle {
        color: var(--title-color);
        font-weight: var(--font-medium);
    }

    .nav__logo {
        &:hover {
            color: var(--first-color);
        }
    }

    .nav__toggle {
        font-size: 1.1rem;
        cursor: pointer;

        &:hover {
            color: var(--first-color);
        }
    }

    /* For medium devices */
    @media screen and (min-width: 768px) {
        height: calc(var(--header-height) + 1.5rem) !important;
        column-gap: 1rem !important;
    }
`

const StyledNavMenu = StyledComponents.div`

    .nav__list {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    .nav__link {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: var(--small-font-size);
        color: var(--title-color);
        font-weight: var(--font-medium);

        &:hover {
            color: var(--first-color);
        }
    }

    .nav__icon {
        font-size: 1.2rem;
    }

    .nav__close {
        position: absolute;
        right: 1.3rem;
        bottom: .5rem;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--first-color);

        &:hover {
            color: var(--first-color-alt);
        }
    }

    /** For small devices */
    // @media screen and (max-width: 350px) {
    //     padding: 2rem .25rem 4rem !important;
    // }

    // Responsive
    @media screen and (max-width: 767px) {
        position: fixed;
        bottom: -100%;
        left: 0;
        width: 100%;
        background-color: var(--body-color);
        padding: 2rem 1.5rem 4rem;
        box-shadow: 0 -1px 4px rgba(0, 0, 0, .15);
        border-radius: 1.5rem 1.5rem 0 0;

        transition: .3s;
    }
`



/** Menú para celular */
function showMenu() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.add('show-menu')
}

function hiddenMenu() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}

const menuToggle = () => {
    const navToogle = document.getElementById('nav-toogle'),
        navClose = document.getElementById('nav-close')

    if (navToogle) {
        navToogle.addEventListener('click', showMenu)
    }

    if (navClose) {
        navClose.addEventListener('click', hiddenMenu)
    }

}

const removeMobileMenu = () => {
    const navLink = document.querySelectorAll('.nav__link')

    navLink.forEach(links => links.addEventListener('click', hiddenMenu))
}


const Header = () => {

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            menuToggle()
            removeMobileMenu()
        }
        return () => mounted = false;
    }, [])

    return (
        <StyledHeader className="header" id="header">
            <StyledNav className="nav container">
                <a href="#" className="nav__logo">investigación de operaciones</a>
                <StyledNavMenu className="nav__menu" id="nav-menu">
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <Link href={"/investigacion-de-operaciones"} className="nav__link active-link">
                                <a >
                                    <i className="uil uil-estate nav__icon"></i> M deterministas
                                </a>
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link href={"/investigacion-de-operaciones/gestion-de-inventario/modelos-probabilisticos"} className="nav__link">
                                <a>
                                    <i className="uil uil-estate nav__icon"></i> M probabilísticos
                                </a>
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link href={"/investigacion-de-operaciones/toma-decisiones-con-probabilidad"} className="nav__link">
                                <a>
                                    <i className="uil uil-estate nav__icon"></i> Decisiones
                                </a>
                            </Link>
                        </li>
                        
                    </ul>
                    <i className="uil uil-times nav__close" id="nav-close"></i>
                </StyledNavMenu>

                <div className="nav__btns">
                    {/* Theme change button */}
                    {/* <i className="uil uil-moon change-theme" id="theme-button"></i> */}

                    <div className="nav__toggle" id="nav-toogle">
                        <i className="uil uil-apps"></i>
                    </div>
                </div>
            </StyledNav>
        </StyledHeader>
    )
}

export default Header