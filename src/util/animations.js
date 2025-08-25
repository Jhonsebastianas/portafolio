// Utility functions for GSAP and Lenis animations
// Using dynamic imports to avoid SSR issues in Next.js v12

export const initLenis = async () => {
  try {
    const Lenis = (await import('@studio-freight/lenis')).default;
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
      lerp: 0.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return lenis;
  } catch (error) {
    console.warn('Lenis not initialized:', error);
    return null;
  }
};

export const initGSAP = async () => {
  try {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger };
  } catch (error) {
    console.warn('GSAP not initialized:', error);
    return null;
  }
};

export const createHorizontalScroll = async (trigger, target, options = {}, onTimelineCreated = null) => {
  try {
    const { gsap, ScrollTrigger } = await initGSAP();
    if (!gsap || !ScrollTrigger) return null;

    const {
      start = 'top top',
      end = '+=100%',
      scrub = true,
      pin = true,
      anticipatePin = 1,
    } = options;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        pin,
        anticipatePin,
        invalidateOnRefresh: true,
      }
    });

    tl.to(target, { x: () => -(target.scrollWidth - target.clientWidth) });

    // Si se proporciona un callback, ejecutarlo con el timeline
    if (onTimelineCreated && typeof onTimelineCreated === 'function') {
      onTimelineCreated(tl);
    }

    return tl;
  } catch (error) {
    console.warn('Horizontal scroll not created:', error);
    return null;
  }
};

export const fadeInUp = async (element, delay = 0) => {
  try {
    const { gsap } = await initGSAP();
    if (!gsap) return;

    gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power2.out' }
    );
  } catch (error) {
    console.warn('Fade in animation not created:', error);
  }
};

export const staggerFadeIn = async (elements, stagger = 0.1, delay = 0) => {
  try {
    const { gsap } = await initGSAP();
    if (!gsap) return;

    gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger, delay, ease: 'power2.out' }
    );
  } catch (error) {
    console.warn('Stagger animation not created:', error);
  }
};
