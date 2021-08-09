import React, { useState } from 'react'
import Service from '@components/commons/service'
import Modal from '@components/commons/modal-service'
import StyledComponent from 'styled-components'
import servicesIOffer from '@constants/services-i-offer'

const StyledServicesContainer = StyledComponent.div`
    gap: 1.5rem;
    grid-template-columns: repeat(2, 1fr);
`

const Services = () => {

    const [serviceSelected, setServiceSelected] = useState(servicesIOffer[0])
    const [modalOpen, setModalOpen] = useState(false)

    const handledServiceModal = (index) => {
        setServiceSelected(servicesIOffer[index])
        handledOpenModal()
    }

    const handledOpenModal = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <section className="services section" id="services">
            <h2 className="section__title">Services</h2>
            <span className="section__subtitle">What i offer</span>

            <StyledServicesContainer className="services__container container grid">
                {/** Servicio 1 */}
                {servicesIOffer.map((service, index) => {
                    return <Service key={index} service={service} index={index} handledServiceModal={handledServiceModal} />
                })}
            </StyledServicesContainer>

            <Modal service={serviceSelected} open={modalOpen} handledOpenModal={handledOpenModal} />
        </section>
    )
}


export default Services