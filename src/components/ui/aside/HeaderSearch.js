import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import SearchOverlay from '../popup/SearchOverlay';

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  min-width: 12rem;
  max-width: 24rem;

  @media (max-width: 1000px) {
    min-width: 0;
  }
`;

const Button = styled.button`
  display: flex;
  gap: 5px;
  justify-content: start;
  align-items: center;
  background: var(--bg-color);
  line-height: 0;
  color: var(--paragraph);
  width: 100%;
  border: solid 2px;
  border-color: var(--grey-color);
  padding: 6px 10px;
  font-size: 16px;
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  @media (max-width: 1000px) {
    padding: 6px;
  }
`;

const HeaderSearch = ({ label, type, className, id, onClick, children, icon: Icon, ...restProps }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const portalContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    portalContainerRef.current = document.createElement('div');
    const appContainer = document.getElementById('__next');
    appContainer.appendChild(portalContainerRef.current);

    return () => {
      appContainer.removeChild(portalContainerRef.current);
    };
  }, []);

  const handleButtonClick = () => {
    setShowOverlay(true);
    document.body.classList.add('overlay-open');
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    document.body.classList.remove('overlay-open');
  };

  return (
    <>
      <SearchContainer>
        <Button {...restProps} type={type} className={className} id={id} onClick={handleButtonClick}>
          {Icon && <Icon />}
          {windowWidth >= 1000 && children}
        </Button>
      </SearchContainer>
      {portalContainerRef.current && createPortal(
        <SearchOverlay showOverlay={showOverlay} onClose={handleCloseOverlay} />,
        portalContainerRef.current
      )}
    </>
  );
};

export default HeaderSearch;
