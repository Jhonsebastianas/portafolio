'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function HeroZoomScroll() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Iniciar Lenis
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // GSAP zoom
    gsap.to(textRef.current, {
      scale: 10,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        pin: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-black">
      <div
        ref={textRef}
        className="text-[15vw] font-bold text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        ENTER LENIS
      </div>
      <div className="h-screen bg-white flex items-center justify-center text-black text-4xl font-semibold">
        Lenis es una open-source library…
      </div>
    </section>
  );
}
