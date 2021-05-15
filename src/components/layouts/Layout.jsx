import React from 'react'
import Footer from '@components/layouts/Footer'
// import Social from '@components/layouts/Social'
import Header from '@components/sections/Header'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            {/* <Social isHome={true} /> */}
            <Footer />
        </>
    )
}

export default Layout