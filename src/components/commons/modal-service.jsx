import React from 'react'
import StyledComponent, { css } from 'styled-components'

const StyledModal = StyledComponent.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    z-index: var(--z-modal);
    // Hidden
    ${props => !(props.open) && css`
        opacity: 0;
        visibility: hidden;
    `}
    
    transition: .3s;

    .services__modal-content {
        position: relative;
        background-color: var(--container-color);
        padding: 1.5rem;
        border-radius: .5rem;
    }

    .services__modal-services {
        row-gap: 1rem;
    }

    .services__modal-service {
        display: flex;
    }

    .services__modal-title {
        font-size: var(--h3-font-size);
        font-weight: var(--font-medium);
        margin-bottom: var(--mb-1-5);
    }

    .services__modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        color: var(--first-color);
        cursor: pointer;
    }

    .services__modal-icon {
        color: var(--first-color);
        margin-right: var(--mb-0-25);
    }
`

const ModalService = (props) => {

    const { handledOpenModal, open, service: { title, services } } = props

    return (
        <StyledModal className="services__modal" open={open}>
            <div className="services__modal-content">
                <h4 className="services__modal-title">{title}</h4>
                <i className="uil uil-times services__modal-close" onClick={handledOpenModal}></i>

                <ul className="services__modal-services grid">
                    {services.map((service, index) => {
                        return (
                            <li className="services__modal-service" key={index}>
                                <i className="uil uil-check-circle services__modal-icon"></i>
                                <p>{service}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </StyledModal>
    )
}


export default ModalService