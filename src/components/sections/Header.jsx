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

    .nav__logo:hover {
        color: var(--first-color);
    }

    .nav__toggle {
        font-size: 1.1rem;
        cursor: pointer;
    }

    .nav__toggle:hover {
        color: var(--first-color);
    }

    // Responsive
    @media screen and (max-width: 767px) {
        
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

function showMenu () {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.add('show-menu')
}

function hiddenMenu () {
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
        <StyledHeader id="header">
            <StyledNav className="container">
                <a href="#" className="nav__logo">Sebastian</a>
                <StyledNavMenu className="nav__menu" id="nav-menu">
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <a href="#home" className="nav__link">
                                <i class="uil uil-estate nav__icon"></i> Home
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#about" className="nav__link">
                                <i class="uil uil-user nav__icon"></i> About
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#skills" className="nav__link">
                                <i class="uil uil-user nav__icon"></i> Skills
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#services" className="nav__link">
                                <i class="uil uil-briefcase-alt nav__icon"></i> Services
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#portafolio" className="nav__link">
                                <i class="uil uil-scenery nav__icon"></i> Portafolio
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#contact" className="nav__link">
                                <i class="uil uil-message nav__icon"></i> Contactme
                            </a>
                        </li>
                    </ul>
                    <i class="uil uil-times nav__close" id="nav-close"></i>
                </StyledNavMenu>

                <div className="nav__btns">
                    <div className="nav__toggle" id="nav-toogle">
                        <i class="uil uil-apps"></i>
                    </div>
                </div>
            </StyledNav>
        </StyledHeader>
    )
}

export default Header