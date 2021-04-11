import React from 'react'
import styles from '@styles/Home.module.css'
import { Button, Grid } from 'semantic-ui-react'

const Footer = () => {
    return (
        <>
            <footer className={styles.footer}>
                <Grid>
                    <Grid.Column width={16}>
                        <a className="text-light-slate"
                            href="https://github.com/Segaretsu/portafolio/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Realizado por Jhon Sebastian Agudelo Sierra
                        </a>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <a className="text-light-slate"
                            href="https://github.com/bchiang7/v4"
                            target="_blank"
                            rel="noopener noreferrer">
                            Inspirado en Brittany Chiang
                        </a>
                    </Grid.Column>
                </Grid>


            </footer>
            {/* <div>
                <Button circular color='facebook' rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/johnsebastian.agudelosierra.3/" icon='facebook' />
                <Button circular color='twitter' rel="noopener noreferrer" target="_blank" href="https://twitter.com/JhonSebastianAS" icon='twitter' />
                <Button circular color='linkedin' rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/jhonsabastianas/" icon='linkedin' />
                <Button circular color='github' rel="noopener noreferrer" target="_blank" href="https://github.com/Segaretsu/" icon='github' />
                <Button circular color='github' rel="noopener noreferrer" target="_blank" href="https://jhonsebastianas.medium.com/" icon='medium' />
            </div> */}
            <br></br>
        </>
    )
}

export default Footer