import React from 'react'
import styles from '@styles/Home.module.css'
import Persona from '@constants/DatosPersona'

const Hero = () => {
    return (
        <main id="Hero" className={styles.main}>
            <h1 className={styles.title}>
                Jhon Agudelo
            </h1>
            <h2 className="cargo">Analista desarrollador</h2>
            <h3 className="funciones">Desarrollador backend y Desarrollador frontend</h3>
            <a className='ui primary basic button contactar' href={`mailto:${Persona.emailContacto}`}>
                Ponerse en contacto
            </a>
        </main>
    )
}

export default Hero