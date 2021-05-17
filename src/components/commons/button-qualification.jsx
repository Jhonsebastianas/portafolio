import React from 'react'
import StyledComponents from 'styled-components'

const StyleButton = StyledComponents.a`
    font-size: var(--h3-font-size);
    font-weight: var(--font-medium);
    cursor: pointer;
    
    &:hover {
        color: var(--first-color);
    }

    .qualification__icon {
        font-size: 1.8rem;
        margin-right: var(--mb-0-25);
    }

    &.qualification__active {
        color: var(--first-color);
    }
`

const ButtonQualification = (props) => {
    const { children, ...otherProps } = props
    return (
        <StyleButton className="qualification__button button--flex" {...otherProps}>
            {children}
        </StyleButton>
    )
}

export default ButtonQualification

