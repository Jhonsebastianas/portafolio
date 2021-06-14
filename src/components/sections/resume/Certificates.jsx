import React from 'react'
import Certification from '@components/commons/resume/certificate'
import listCertifications from '@constants/certificates'

const Certificates = () => {
    return (
        <section className="certificate section" id="certificates">
            <h2 className="section-title">Certificates</h2>

            <div className="certificate__container bd-grid">
                {React.Children.toArray(
                    listCertifications.map(certification => <Certification certification={certification} />)
                )}
            </div>
        </section>
    )
}


export default Certificates