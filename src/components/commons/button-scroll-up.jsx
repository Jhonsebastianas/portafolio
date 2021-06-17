import React, { useEffect } from 'react'
import StyledComponents from 'styled-components'

const StyleButton = StyledComponents.a`
    position: fixed;
    right: 1rem;
    bottom: -20%;
    background-color: var(--first-color);
    opacity: .8;
    padding: 0 .3rem;
    border-radius: .4rem;
    z-index: var(--z-tooltip);
    transition: .4s;

    &:hover {
        background-color: var(--first-color-alt);
    }

    .scrollup__icon {
        font-size: 1.5rem;
        color: #FFF;
    }
`

const scrollEvent = () => {
    function scrollUp () {
        const scrollUp = document.getElementById('scroll-up')
        if(this.scrollY >= 560) {
            scrollUp.classList.add('show-scroll')
        } else {
            scrollUp.classList.remove('show-scroll')
        }
    }
    window.addEventListener('scroll', scrollUp)
}

const ScrollButton = () => {

    useEffect(() => {
        let mounted = true
        if(mounted){
            scrollEvent()
        }
        return () => mounted = false
    }, [])
    return (
        <StyleButton href="#" className="scrollup" id="scroll-up" aria-label="Ir al principio">
            <i className="uil uil-arrow-up scrollup__icon"></i>
        </StyleButton>
    )
}

export default ScrollButton

