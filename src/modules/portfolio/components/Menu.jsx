import { useState, useEffect } from "react";
import styled from "styled-components";
import useScrollSection from "@hooks/useScrollSection";
import {
  MenuItem,
  CTAButton,
  StatusIndicator,
  StatusText,
  MobileMenuButton,
  MobileMenuOverlay,
  MobileMenuPanel,
  MobileMenuItems,
  MobileMenuItem,
  Logo,
} from "@components/commons/MenuComponents";
import { theme } from "@styles/theme";
import useIsMobile from "@modules/shared/hooks/useIsMobile";

// Desktop Menu Styles
const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: var(--z-index-menu);
  padding: var(--spacing-md) 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: var(--spacing-sm) var(--spacing-lg);
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  padding: 0 var(--spacing-xl);
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0;
  }
`;

const MenuLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-4xl);

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: var(--spacing-lg);
  }
`;

const MenuCenter = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: var(--font-size-base);
  color: var(--color-primary);
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const MenuRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: var(--spacing-md);
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { activeSection, scrollToSection } = useScrollSection();

  const menuItems = [
    { id: "hero", label: "Sebastian Agudelo" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // Determinar qué mostrar en el centro
  const getCenterContent = () => {
    if (isMobile) {
      return activeSection === "hero" ? (
        "Sebastian Agudelo"
      ) : (
        <Logo src="/images/logo.svg" alt="Sebastian Agudelo" />
      );
    }
    return activeSection === "hero" ? null : (
      <Logo src="/images/logo.svg" alt="Sebastian Agudelo" />
    );
  };

  const handleMenuClick = (sectionId) => {
    scrollToSection(sectionId);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest("[data-mobile-menu]")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <MenuWrapper>
        <MenuContainer>
          {/* Mobile Menu Button - Left */}
          {isMobile && (
            <MobileMenuButton
              onClick={toggleMobileMenu}
              className={isMobileMenuOpen ? "open" : ""}
              data-mobile-menu
            >
              <span></span>
              <span></span>
              <span></span>
            </MobileMenuButton>
          )}

          {/* Desktop Menu Left */}
          <MenuLeft>
            {!isMobile &&
              menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  $active={activeSection === item.id}
                  onClick={() => handleMenuClick(item.id)}
                >
                  {item.label}
                </MenuItem>
              ))}
          </MenuLeft>

          {/* Center Content - Logo or Name */}
          <MenuCenter>{getCenterContent()}</MenuCenter>

          {/* Right Side */}
          <MenuRight>
            {isMobile ? (
              <>
                <CTAButton onClick={() => handleMenuClick("contact")}>
                  Book
                </CTAButton>
                <StatusIndicator />
              </>
            ) : (
              <>
                <CTAButton onClick={() => handleMenuClick("contact")}>
                  Book a spot
                </CTAButton>
                <StatusContainer>
                  <StatusIndicator />
                  <StatusText>Available</StatusText>
                </StatusContainer>
              </>
            )}
          </MenuRight>
        </MenuContainer>
      </MenuWrapper>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay $isOpen={isMobileMenuOpen} />

      {/* Mobile Menu Panel */}
      <MobileMenuPanel $isOpen={isMobileMenuOpen} data-mobile-menu>
        {/* Mobile Menu Header with Close Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "var(--spacing-3xl)",
            paddingBottom: "var(--spacing-lg)",
            borderBottom: "1px solid var(--color-border-light)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--font-size-lg)",
              fontWeight: "600",
              color: "var(--color-primary)",
              margin: 0,
            }}
          >
            Menu
          </h3>
          <MobileMenuButton
            onClick={toggleMobileMenu}
            className={isMobileMenuOpen ? "open" : ""}
            style={{
              background: "transparent",
              boxShadow: "none",
              padding: "var(--spacing-xs)",
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuButton>
        </div>

        <MobileMenuItems>
          {menuItems.map((item) => (
            <MobileMenuItem
              key={item.id}
              $active={activeSection === item.id}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.label}
            </MobileMenuItem>
          ))}
        </MobileMenuItems>

        {/* Mobile CTA */}
        <div
          style={{
            marginTop: "var(--spacing-3xl)",
            paddingTop: "var(--spacing-xl)",
            borderTop: "1px solid var(--color-border-light)",
          }}
        >
          <CTAButton
            onClick={() => handleMenuClick("contact")}
            style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: "var(--spacing-lg)",
            }}
          >
            Book a spot
          </CTAButton>
          <StatusContainer style={{ justifyContent: "center" }}>
            <StatusIndicator />
            <StatusText>Available for new projects</StatusText>
          </StatusContainer>
        </div>
      </MobileMenuPanel>
    </>
  );
};

export default Menu;
