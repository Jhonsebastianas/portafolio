import React from 'react'
import Footer from '@components/layouts/Footer'
import Social from '@components/layouts/Social'

const Layout = ({ children }) => {
    return (
        <>
            {/* <Menu /> */}
            {children}
            <Social isHome={true} />
            <Footer />
        </>
    )
}

export default Layout