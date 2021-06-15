import React from 'react'
import Reference from '@components/commons/resume/reference'
import StyledComponents from 'styled-components'
import listReferences from '@constants/references'

const StyledReferencesContainer = StyledComponents.div`
    @media screen and (min-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
    }
`

const References = () => {

    return (
        <section className="references section" id="references">
            <h2 className="section-title">References</h2>

            <StyledReferencesContainer className="references__container bd-grid">
                {React.Children.toArray(
                    listReferences.map(reference => <Reference reference={reference} />)
                )}
            </StyledReferencesContainer>
        </section>
    )
}

export default References