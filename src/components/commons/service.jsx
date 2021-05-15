import React from 'react'
import Button from '@components/commons/button'
import StyledComponent from 'styled-components'

const StyledServices = StyledComponent.div`
    position: relative;
    background-color: var(--container-color);
    padding: 3.5rem .5rem 1.25rem 1.5rem;
    border-radius: .25rem;
    box-shadow: 0 2px 4px rgba(0,0,0,.15);
    transition: .3s;

    &:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,.15);
    }

    .services__icon {
        display: block;
        font-size: 1.5rem;
        color: var(--first-color);
        margin-bottom: var(--mb-1);
    }

    .services__title {
        font-size: var(--h3-font-size);
        margin-bottom: var(--mb-1);
        font-weight: var(--font-medium);
    }

    .services__button {
        cursor: pointer;
        font-size: var(--small-font-size);

        &:hover .button__icon {
            transform: translateX(.25rem);
        }
    }
`

const Service = (props) => {
    const { index, handledServiceModal, service: { title, icon } } = props
    return (
        <StyledServices className="services__content" key={index}>
            <div>
                <i className={`uil ${icon} services__icon`}></i>
                <h3 className="services__title">{title}</h3>
            </div>
            <span className="button button--flex button--small button--link services__button" onClick={() => handledServiceModal(index)}>
                View More <i className="uil uil-arrow-right button__icon"></i>
            </span>
        </StyledServices>
    )
}

export default Service