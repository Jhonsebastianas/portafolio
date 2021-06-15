import React from 'react'
import StyledComponents from 'styled-components'

const StyledSkillContent = StyledComponents.div`
    grid-template-columns: repeat(2, 1fr);
    gap: 0;

    .skills__name {
        display: flex;
        align-items: center;
        margin-bottom: var(--mb-3);
    }

    .skills__circle {
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: var(--text-color);
        border-radius: 50%;
        margin-right: .75rem;
    }
`

const Skills = () => {
    return (
        <section className="skills section" id="skills">
            <h2 className="section-title">Skills</h2>

            <StyledSkillContent className="skills__content bd-grid">
                <ul className="skills__data">
                    <li className="skills__name">
                        <span className="skills__circle"></span> Java
                    </li>
                    <li className="skills__name">
                        <span className="skills__circle"></span> Node.js
                    </li>
                    <li className="skills__name">
                        <span className="skills__circle"></span> Express.js
                    </li>
                    <li className="skills__name">
                        <span className="skills__circle"></span> MongoDB
                    </li>
                </ul>
                <ul className="skills__data">
                    <li className="skills__name">
                        <span className="skills__circle"></span> Javascript
                    </li>
                    <li className="skills__name">
                        <span className="skills__circle"></span> Angular.js
                    </li>
                    <li className="skills__name">
                        <span className="skills__circle"></span> React.js
                    </li>
                    <li className="skills__name">
                        <span className="skills__circle"></span> HTML5
                    </li>
                </ul>
            </StyledSkillContent>
        </section>
    )
}
export default Skills