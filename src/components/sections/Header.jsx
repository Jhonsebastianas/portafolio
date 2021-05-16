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

/** SCROLL SECTIONS ACTIVE LINK */
const scrollSections = () => {
    const sections = document.querySelectorAll('section[id]')

    function scrollActive() {
        const scrollY = window.pageYOffset
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight
            const sectionTop = current.offsetTop - 50
            const sectionId = current.getAttribute('id')
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
            } else {
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
            }
        })
    }

    window.addEventListener('scroll', scrollActive)
}

/** Change background header */
const scrollHeaderChange = () => {
    function scrollHeader() {
        const nav = document.getElementById('header')

        if (this.scrollY >= 80) {
            nav.classList.add('scroll-header')
        } else {
            nav.classList.remove('scroll-header')
        }
    }
    window.addEventListener('scroll', scrollHeader)
}


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

/** Night theme */
const addNightTheme = () => {
    const themeButton = document.getElementById('theme-button')
    const darkTheme = 'dark-theme'
    const iconTheme = 'uil-sun'

    // Previously selected topic
    const selectedTheme = localStorage.getItem('selected-theme')
    const selectedIcon = localStorage.getItem('selected-icon')

    // We obtain the current theme that the interface has by validating the dark-theme class
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

    // We validate if the user previously chose a topic
    if (selectedTheme) {
        // if the validation is fulfilled, we ask what the issue was to know if we activated or deactivate the dark theme
        document.body.classList[(selectedTheme === 'dark') ? 'add': 'remove'](darkTheme)
        themeButton.classList[(selectedIcon === 'uil-moon') ? 'add': 'remove'](iconTheme)
    }

    // Active / deactivate the theme manually with the button

    themeButton.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme)
        localStorage.setItem('selected-icon', getCurrentIcon)
    })

}

const Header = () => {

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            menuToggle()
            removeMobileMenu()
            scrollSections()
            scrollHeaderChange()
            addNightTheme()
        }
        return () => mounted = false;
    }, [])

    return (
        <StyledHeader className="header" id="header">
            <StyledNav className="nav container">
                <a href="#" className="nav__logo">Sebastian</a>
                <StyledNavMenu className="nav__menu" id="nav-menu">
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <a href="#home" className="nav__link active-link">
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
                            <a href="#portfolio" className="nav__link">
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
                    {/* Theme change button */}
                    <i className="uil uil-moon change-theme" id="theme-button"></i>

                    <div className="nav__toggle" id="nav-toogle">
                        <i class="uil uil-apps"></i>
                    </div>
                </div>
            </StyledNav>
        </StyledHeader>
    )
}

export default Header