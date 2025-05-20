// components/TimelineSection.jsx
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Section = styled.section`
  height: 150vh;
  background: #f4f0ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Item = styled.div`
  opacity: 0;
  transform: translateY(50px);
  margin: 1rem 0;
  background: #c6e2ff;
  padding: 1rem 2rem;
  border-radius: 8px;
`

export default function TimelineSection() {
  const itemRefs = useRef([])

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: itemRefs.current[0],
        start: 'top 80%',
        end: 'bottom top',
        scrub: false,
      },
    })

    itemRefs.current.forEach((el, i) => {
      tl.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    })
  }, [])

  return (
    <Section>
      {['Primero', 'Segundo', 'Tercero'].map((text, i) => (
        <Item key={i} ref={(el) => (itemRefs.current[i] = el)}>
          🕒 {text}
        </Item>
      ))}
    </Section>
  )
}
