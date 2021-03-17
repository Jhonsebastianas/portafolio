
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { socialMedia } from '@config';
import { Icon } from 'semantic-ui-react';

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  // Barra social horizontal.
  @media (max-width: 768px) {
    // display: none;
    display: -webkit-inline-box;
  }

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--light-slate);
    // Barra social horizontal.
    @media (max-width: 768px) {
      // display: none;
      width: 100%;
      height: 1px;
    }
  }
  li {
    &:last-of-type {
      margin-bottom: 20px;
      // Barra social horizontal.
      @media (max-width: 768px) {
        margin-bottom: 0px;
      }
    }
    a {
      padding: 10px;
      font-size: 1.8em;
      color: var(--slate);
      &:hover,
      &:focus {
        transform: translateY(-3px);
        color: var(--green);
      }
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledSideElement = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: 30px;
  right: 'auto';
  z-index: 10;
  color: var(--light-slate);
  @media (max-width: 1080px) {
    left: '10px';
    right: 'auto';
  }
  @media (max-width: 768px) {
    // display: none;
  }
`;

const Social = ({ isHome }) => (
        <StyledSideElement>
            <StyledSocialList>
                {socialMedia &&
                    socialMedia.map(({ url, name }, i) => (
                        <li key={i}>
                            <a href={url} aria-label={name} target="_blank" rel="noopener noreferrer">
                                <Icon name={name} />
                            </a>
                        </li>
                    ))}
            </StyledSocialList>
        </StyledSideElement>
);

Social.propTypes = {
    isHome: PropTypes.bool,
};

export default Social;