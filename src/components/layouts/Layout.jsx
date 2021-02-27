import React from 'react'
import Footer from '@components/layouts/Footer'

const Layout = ({ children }) => {
    return (
        <>
            {/* <Menu /> */}
                {children}
            <Footer />
        </>
    )
}

export default Layout