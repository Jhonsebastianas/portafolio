import React from 'react'
import StyledComponents from 'styled-components'

const StyledCertificacionContent = StyledComponents.div`
    .certificate__title {
        font-size: var(--h3-font-size);
        // margin-bottom: var(--mb-3); for: certificate__description
    }
`

const Certificate = (props) => {

    const { certification: { source, title } } = props

    return (
        <StyledCertificacionContent className="certificate__content">
            <h3 className="certificate__title">{title}</h3>
            {/* <p className="certificate__description">{description}</p> */}
            <a href={source} rel="noopener noreferrer" target="_blank">
                <i class="uil uil-folder certificate__see-icon"></i> credential
            </a>
        </StyledCertificacionContent>
    )
}

export default Certificate