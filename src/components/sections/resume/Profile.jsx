import React from 'react'
import StyledComponents from 'styled-components'

const StyledProfileDescription = StyledComponents.p`
    text-align: center;
`

const Profile = () => {
    return (
        <section className="profile section" id="profile">
            <h2 className="section-title">Profile</h2>

            <StyledProfileDescription className="profile__description">
                I am a person convinced that my role in society as a software developer 
                is to impact people's lives in a positive way with innovative 
                and scalable solutions, in this way companies achieve customer 
                loyalty with incredible results, satisfactory and with quality standards.

                I am a collaborative work professional with work teams and with experience in 
                agile methodology such as Scrum.
            </StyledProfileDescription>
        </section>
    )
}

export default Profile