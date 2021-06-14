import React from 'react'
import ExperienceSection from '@components/commons/resume/experience'
import WorkExperience from '@constants/qualification-work'

const Experience = () => {
    return (
        <section className="experience section" id="experience">
            <h2 className="section-title">Experience</h2>

            <div className="experience__container bd-grid">
                {WorkExperience.map((experience, index) => {
                    return <ExperienceSection experience={experience} index={index} size={WorkExperience.length} />
                })}
            </div>
        </section>
    )
}

export default Experience