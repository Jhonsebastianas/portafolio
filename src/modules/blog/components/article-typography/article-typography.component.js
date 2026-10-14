import styled from 'styled-components';

export const ArticleHighlight = styled.div`
  background: hsla(var(--hue-color), 69%, 61%, 0.08);
  border-left: 4px solid var(--first-color);
  padding: 1.5rem 2rem;
  border-radius: 0 0.75rem 0.75rem 0;
  margin: 2rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--title-color);
  line-height: 1.6;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 10px;
    font-size: 4rem;
    color: hsla(var(--hue-color), 69%, 61%, 0.2);
    font-family: serif;
    line-height: 1;
    pointer-events: none;
  }
`;

export const ArticleList = styled.ul`
  margin: 2rem 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ArticleListItem = styled.li`
  position: relative;
  padding-left: 2.5rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-color);
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    width: 24px;
    height: 24px;
    background-image: url("${props => {
      const type = props.$type || 'check';
      const defaultColor = type === 'cross' ? '%23ff4444' : '%2300C851';
      const color = props.$color ? props.$color.replace('#', '%23') : defaultColor;
      
      const icon = type === 'cross' 
        ? "%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E" 
        : "%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E";
        
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E${icon}%3C/svg%3E`;
    }}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`;
