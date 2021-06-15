import React from 'react'
import Reference from '@components/commons/resume/reference'
import listReferences from '@constants/references'

const References = () => {

    return (
        <section className="references section" id="references">
            <h2 className="section__title">References</h2>

            <div className="references__container bd-grid">
                {React.Children.toArray(
                    listReferences.map(reference => <Reference reference={reference} />)
                )}
            </div>
        </section>
    )
}

export default References