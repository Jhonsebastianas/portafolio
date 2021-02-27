import React from 'react'
import styles from '@styles/Home.module.css'
import { Button } from 'semantic-ui-react'

const Footer = () => {
    return (
        <>
            <footer className={styles.footer}>
                <a
                    href="https://www.linkedin.com/in/jhonsabastianas/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Realizado por Jhon Sebastian Agudelo Sierra
            </a>
            </footer>
            <div>
                <Button circular color='facebook' target="_blank" href="https://www.facebook.com/johnsebastian.agudelosierra.3/" icon='facebook' />
                <Button circular color='twitter' target="_blank" href="https://twitter.com/JhonSebastianAS" icon='twitter' />
                <Button circular color='linkedin' target="_blank" href="https://www.linkedin.com/in/jhonsabastianas/" icon='linkedin' />
            </div>
            <br></br>
        </>
    )
}

export default Footer