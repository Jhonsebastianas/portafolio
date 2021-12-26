import React from 'react'
import StyledComponents from 'styled-components'

const StyledReferencesContent = StyledComponents.div`
    gap: .25rem !important;

    .references__title {
        font-size: var(--h3-font-size);
    }

    .references__subtitle {
        color: var(--text-color-light);
    }

    .references__subtitle,
    .references__contact {
        font-size: var(--smaller-font-size);
    }

    .references__link {
        color: var(--text-color);

        &:hover {
            color: var(--first-color);
        }
    }
`

const Reference = (props) => {

    const { reference: { name, role, email, phone } } = props
    const { number, extension } = phone

    const urlEmail = `mailto:${email}`
    const urlPhone = `https://api.whatsapp.com/send?phone=${number}`

    return (
        <StyledReferencesContent className="references__content bd-grid">
            <span className="references__subtitle">{role}</span>
            <h3 className="references__title">{name}</h3>
            <ul className="references__contact">
                <li>Email: <a className="references__link" href={urlEmail} rel="noopener noreferrer" target="_blank">{email}</a></li>
                <li>Phone: {extension} <a className="references__link" href={urlPhone} rel="noopener noreferrer" target="_blank">{number}</a></li>
            </ul>
        </StyledReferencesContent>
    )
}

export default Reference