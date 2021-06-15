import React, { useEffect } from 'react'
import Layout from '@components/layouts/LayoutResume'
/** RESUME LEFT */
import Home from '@components/sections/resume/Home'
import Social from '@components/sections/resume/Social'
import Profile from '@components/sections/resume/Profile'
import Education from '@components/sections/resume/Education'
import Skills from '@components/sections/resume/Skills'
/** RESUME RIGHT */
import Experience from '@components/sections/resume/Experience'
import Certificates from '@components/sections/resume/Certificates'
import References from '@components/sections/resume/References'

const Resume = () => {
    return (
        <Layout>
            {/* All elements within this div, is generated in pdf */}
            <div className="resume">
                <div className="resume__left">
                    <Home />
                    <Social />
                    <Profile />
                    <Education />
                    <Skills />
                </div>
                <div className="resume__right">
                    <Experience />
                    <Certificates />
                    <References />
                </div>
            </div>
        </Layout>
    )
}

export default Resume