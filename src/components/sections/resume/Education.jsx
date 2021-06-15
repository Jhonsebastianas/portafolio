import React from 'react'
import SectionEducation from '@components/commons/resume/education'
import listEducation from '@constants/qualification-education'

const Education = () => {
    return (
        <section className="education section" id="education">
            <h2 className="section-title">Education</h2>

            <div className="education__container bd-grid">
                {listEducation.map((education, index) => {
                    return <SectionEducation education={education} index={index} size={listEducation.length} />
                })}
            </div>
        </section>
    )
}

export default Education