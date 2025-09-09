import styled from 'styled-components';
import { theme } from '@styles/theme';

// Base button component
export const BaseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
  
  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// Menu item component
export const MenuItem = styled(BaseButton)`
  opacity: ${props => props.$active ? 1 : 0.5};
  color: ${props => props.$active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: var(--font-size-base);
  white-space: nowrap;
  transition: var(--transition-fast);
  
  &:hover {
    opacity: 1;
    color: var(--color-primary);
  }
`;

// CTA Button component
export const CTAButton = styled(BaseButton)`
  background-color: var(--color-secondary);
  border-radius: var(--border-radius-full);
  padding: 6px 16px 8px;
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: var(--font-size-base);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-fast);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Status indicator component
export const StatusIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-accent);
  flex-shrink: 0;
`;

// Status text component
export const StatusText = styled.span`
  font-family: var(--font-secondary);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  opacity: 0.5;
  white-space: nowrap;
`;

// Mobile menu button
export const MobileMenuButton = styled(BaseButton)`
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  background: var(--color-background-primary);
  box-shadow: var(--shadow-sm);
  position: relative;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
  }
  
  span {
    width: 20px;
    height: 2px;
    background-color: var(--color-primary);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
    border-radius: 1px;
  }
  
  &.open {
    span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    
    span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
`;

// Mobile menu overlay
export const MobileMenuOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-background-overlay);
  z-index: calc(var(--z-index-menu) - 1);
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: var(--transition-normal);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
  }
`;

// Mobile menu panel
export const MobileMenuPanel = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: var(--color-background-primary);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-index-menu);
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: var(--spacing-5xl) var(--spacing-xl) var(--spacing-xl);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
  }
`;

// Mobile menu items container
export const MobileMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-3xl);
`;

// Mobile menu item
export const MobileMenuItem = styled(MenuItem)`
  font-size: var(--font-size-lg);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-border-light);
  
  &:last-child {
    border-bottom: none;
  }
`;

// Logo component
export const Logo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: fill;
  transition: var(--transition-fast);
  
  &:hover {
    transform: scale(1.05);
  }
`;
