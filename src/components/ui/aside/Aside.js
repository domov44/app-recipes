import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import NavComponent from '../button/NavComponent';
import { PiTicket, PiMosque, PiUser, PiGearSix, PiBell, PiRepeat, PiListBullets, PiUsersThree, PiCookingPot, PiStorefront, PiMegaphone, PiQuestion, PiProhibit, PiCarrot } from 'react-icons/pi';
import Chip from '../textual/Chip';
import Title from '../textual/Title';
import Text from '../textual/Text';
import Button from '../button/Button';
import Logo from '../Logo';
import TextLink from '../textual/TextLink';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const StyledAside = styled.aside`
  background: var(--bg-color);
  width: 280px;
  border-right: 2px solid var(--grey-color);
  height: 100%;
  position: fixed;
  z-index: 5;
  animation: ${props => (props.$isopen === 'open' ? slideIn : slideOut)} 0.3s forwards;
  animation-fill-mode: forwards;

  @media (max-width: 1000px) {
    width: 80%;
    transform: translateX(${props => (props.$isopen === 'open' ? '' : '-100%')});
    visibility: ${props => (props.$isopen === 'open' ? '' : 'hidden')};
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 4;
  display: none;

  @media (max-width: 1000px) {
    display: ${props => (props.$isopen === 'open' ? 'block' : 'none')};
  }
`;

const StyledAsideContent = styled.div`
  background: var(--bg-color);
  padding: 15px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  transition: 0.3s;
  overflow-y: auto;
  height: 100%;
`;

function Aside({ isopen, toggleSidebar }) {

  return (
    <>
      <Overlay $isopen={isopen} onClick={toggleSidebar} />
      <StyledAside className="banner" $isopen={isopen}>

        <StyledAsideContent>
          <Logo />
          <ul className='menu'>
            <NavComponent href="/" icon={PiMosque}>Accueil</NavComponent>
          </ul>
          <Text>
            Développé avec ❤ par
            <TextLink href="https://www.ronanscotet.com/">
              Ronan Scotet
            </TextLink>
          </Text>
        </StyledAsideContent>
      </StyledAside>
    </>
  );
}

export default Aside;