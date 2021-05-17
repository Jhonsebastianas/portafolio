import React from 'react'
import Footer from '@components/layouts/Footer'
// import Social from '@components/layouts/Social'
import Header from '@components/sections/Header'
import ScrollUp from '@components/commons/button-scroll-up'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="main">
                {children}
            </div>
            {/* <Social isHome={true} /> */}
            <Footer />
            <ScrollUp />
        </>
    )
}

export default Layout