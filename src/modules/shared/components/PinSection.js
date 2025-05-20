// components/PinSection.jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from 'styled-components'

gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  height: 200vh;
  background: #fff8dc;
`

const FixedSection = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background: #ffd6d6;
`

export default function PinSection() {
  const pinRef = useRef()

  useEffect(() => {
    ScrollTrigger.create({
      trigger: pinRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true,
    })
  }, [])

  return (
    <Container>
      <FixedSection ref={pinRef}>📌 Esta sección se queda fija un momento</FixedSection>
    </Container>
  )
}
