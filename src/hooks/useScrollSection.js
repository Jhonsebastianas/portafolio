import { useState, useEffect, useCallback } from 'react';

const useScrollSection = (sections = ['hero', 'about', 'skills', 'qualification', 'services', 'projects', 'contact']) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);

  const getSectionElement = useCallback((sectionId) => {
    if (sectionId === 'hero') {
      return document.getElementById('hero');
    }
    return document.getElementById(sectionId);
  }, []);

  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY - 5; // Offset para activar antes de llegar al centro
    let currentSection = 'hero';

    // Verificar cada sección de abajo hacia arriba
    for (let i = sections.length - 1; i >= 0; i--) {
      const sectionId = sections[i];
      const element = getSectionElement(sectionId);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        
        if (scrollPosition >= elementTop) {
          currentSection = sectionId;
          break;
        }
      }
    }

    setActiveSection(currentSection);
  }, [sections, getSectionElement]);

  const scrollToSection = useCallback(async (sectionId) => {
    setIsScrolling(true);
    
    try {
      const { gsap } = await import('gsap');
      const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
      
      gsap.registerPlugin(ScrollToPlugin);
      
      const targetY = sectionId === 'hero' ? 0 : `#${sectionId}`;
      
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetY,
        },
        ease: 'power2.inOut',
        onComplete: () => {
          setIsScrolling(false);
        }
      });
    } catch (error) {
      console.error('Error scrolling to section:', error);
      setIsScrolling(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        updateActiveSection();
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [updateActiveSection, isScrolling]);

  return {
    activeSection,
    scrollToSection,
    isScrolling,
  };
};

export default useScrollSection;
