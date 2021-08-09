import React from 'react'
import StyledComponents, { css } from 'styled-components'

const StyledSkillContainer = StyledComponents.div`

    .skills__header {
        display: flex;
        align-items: center;
        margin-bottom: var(--mb-2-5);
        cursor: pointer;

        .skills__title {
            font-size: var(--h3-font-size);
        }

        .skills__icon, .skills__arrow {
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

    .skills__close .skills__list{
        height: 0;
        overflow: hidden;
    }

    .skills__open .skills__list{
        height: max-content;
        margin-bottom: var(--mb-2-5);
    }

    .skills__open .skills__arrow{
        transform: rotate(-180deg);
    }

    .skills__list {
        row-gap: 1.5rem;
        padding-left: 2.7rem;
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

    .skills__bar, skills__percentage {
        height: 5px;
        border-radius: .25rem;
    }

    .skills__bar {
        background-color: var(--first-color-lighter);
    }

    .skills__percentage {
        display: block;
        background-color: var(--first-color);
    }
`

const StyledSkillBar = StyledComponents.div`
    .skills__bar, .skills__percentage {
        height: 5px;
        border-radius: .25rem;
    }

    .skills__bar {
        background-color: var(--first-color-lighter);
    }

    .skills__percentage {
        display: block;
        background-color: var(--first-color);
        ${props => props.percentage && css`
            width: ${props.percentage};
        `}
    }
`

const SkillContainer = (props) => {

    const { skill: { title, subtitle, icon, skills } } = props

    return (
        <StyledSkillContainer>
            {/*==================== SKILLS 1====================*/}
            <div className={`skills__content skills__close`}>
                <div className="skills__header">
                    <i className={`uil ${icon} skills__icon`}></i>

                    <div>
                        <h1 className="skills__title">{title}</h1>
                        <span className="skills__subtitle">{subtitle}</span>
                    </div>

                    <i className="uil uil-angle-down skills__arrow"></i>
                </div>

                <div className="skills__list grid">
                    {skills.map((skill, index) => {
                        const { name, percentage } = skill
                        return (
                            <div className="skills__data" key={index}>
                                <div className="skills__titles">
                                    <h2 className="skills__name">{name}</h2>
                                    <span className="skills__number">{percentage}</span>
                                </div>
                                <StyledSkillBar className="skills__bar" percentage={percentage} >
                                    <span className="skills__percentage"></span>
                                </StyledSkillBar>
                            </div>
                        )
                    })}

                </div>
            </div>
        </StyledSkillContainer>
    )
}

export default SkillContainer