import React, { useEffect } from 'react'
// import Header from '@components/sections/Header'
import ScrollUp from '@components/commons/button-scroll-up'

const LayoutResume = ({ children }) => {

    useEffect(() => {
        let mounted = true
        if(mounted) {
            if(!document.body.classList.contains('body__resume')) {
                document.body.classList.add('body__resume');
            }
        }
        return () => mounted = false
    }, [])

    return (
        <>
            {/* <Header /> */}
            <div className="l-main bd-container">
                {children}
            </div>
            <ScrollUp />
        </>
    )
}

export default LayoutResume