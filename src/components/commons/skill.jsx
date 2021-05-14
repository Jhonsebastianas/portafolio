import React from 'react'
import StyledComponents from 'styled-components'

const StyledSkillContainer = StyledComponents.div`

    .skills__header {
        display: flex;
        align-items: center;
        margin-bottom: var(--mb-2-5);
        cursor: pointer;

        .skills__title {
            font-size: var(--h3-font-size);
        }

        .skills__icon, skills__arrow {
            font-size: 2rem;
            color: var(--first-color);
        }

        .skills__icon {
            margin-right: var(--mb-0-75);
        }

        .skills__arrow {
            margin-left: auto;
            transition: .4s;
        }
    }

    .skills__titles {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--mb-0-5);
    }

    .skills__subtitle {
        font-size: var(--small-font-size);
        color: var(--text-color-light);
    }

    .skills__name {
        font-size: var(--normal-font-size);
        font-weight: var(--font-medium);
    }
`

const SkillContainer = (props) => {

    const { skill: { title, subtitle, icon, skills }, index } = props

    return (
        <StyledSkillContainer key={index}>
            {/*==================== SKILLS 1====================*/}
            <div className="skills__content">
                <div className="skills__header">
                    <i class={`uil ${icon} skills__icon`}></i>

                    <div>
                        <h1 className="skills__title">{title}</h1>
                        <span className="skills__subtitle">{subtitle}</span>
                    </div>

                    <i class="uil uil-angle-down skills__arrow"></i>
                </div>

                <div className="skills__list grid">
                    {skills.map((skill, index) => {
                        const { name, percentage, class: claseCss } = skill
                        return (
                            <div className="skills__data" key={index}>
                                <div className="skills__titles">
                                    <h3 className="skills__name">{name}</h3>
                                    <span className="skills__number">{percentage}</span>
                                </div>
                                <div className="skills__bar">
                                    <span className={`skills__percentage  ${claseCss}`}></span>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </StyledSkillContainer>
    )
}

export default SkillContainer