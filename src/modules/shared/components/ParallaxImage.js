// components/ParallaxImage.jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from 'styled-components'

gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  height: 150vh;
  background: #ffeaf3;
  position: relative;
`

const FloatingImage = styled.img`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 300px;
`

export default function ParallaxImage() {
  const imgRef = useRef()

  useEffect(() => {
    gsap.to(imgRef.current, {
      y: -150,
      scrollTrigger: {
        trigger: imgRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return (
    <Container>
      <FloatingImage
        ref={imgRef}
        src="/images/wedding/meta_image.png"
        alt="Imagen en parallax"
      />
    </Container>
  )
}
