// components/FadeInSection.jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from 'styled-components'

gsap.registerPlugin(ScrollTrigger)

const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
`

export default function FadeInSection() {
  const ref = useRef()

  useEffect(() => {
    gsap.to(ref.current, {
      opacity: 1,
      duration: 1.2,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return <Section ref={ref}>✨ Fade In ✨</Section>
}