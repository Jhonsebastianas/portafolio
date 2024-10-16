import React, { useEffect } from 'react'
// import Social from '@components/layouts/Social'
import ScrollUp from '@components/commons/button-scroll-up'
import Footer from './footer'
import Header from './header'

const Layout = ({ children }) => {

    useEffect(() => {
        let mounted = true
        if(mounted) {
            if(document.body.classList.contains('body__resume')) {
                document.body.classList.remove('body__resume');
            }
        }
        return () => mounted = false
    }, [])

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