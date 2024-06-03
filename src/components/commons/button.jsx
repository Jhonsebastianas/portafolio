import React from 'react'
import StyledComponents from 'styled-components'

const StyleButton = StyledComponents.a`
    display: inline-block;
    background-color: var(--first-color);
    color: #FFF;
    padding: 1rem;
    border-radius: .5rem;
    font-weight: var(--font-medium);
    cursor: pointer;

    &:hover {
        background-color: var(--first-color-alt);
    }

    .button__icon {
        font-size: 1.2rem;
        margin-left: var(--mb-0-5);
        transition: .3s;
    }
`

const Button = (props) => {
    const { children, ...otherProps } = props
    return (
        <StyleButton {...otherProps} className={props.className + " button--flex"}>
            {children}
        </StyleButton>
    )
}

export default Button

