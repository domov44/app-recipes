import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import NavComponent from '../button/NavComponent';
import { PiMosque, PiUser, PiStorefront } from 'react-icons/pi';
import Text from '../textual/Text';
import Logo from '../Logo';
import TextLink from '../textual/TextLink';
import Logout from '@/utils/Logout';
import { useUser } from '@/utils/UserContext';
import MainMenu from '@/components/menu/MainMenu';
import Button from '../button/Button';
import Chip from '../textual/Chip';

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
  const { isLoggedIn } = useUser();

  return (
    <>
      <Overlay $isopen={isopen} onClick={toggleSidebar} />
      <StyledAside className="banner" $isopen={isopen}>
        <StyledAsideContent>
          <Logo />
          <MainMenu />
          {isLoggedIn &&
            <ul className='menu'>
              <Chip variant="success">Mon espace</Chip>
              <NavComponent href="/profil" icon={PiStorefront}>Mes recettes</NavComponent>
              <NavComponent href="/profil" icon={PiUser}>Profil</NavComponent>
            </ul>
          }
          {isLoggedIn &&
            <ul className='menu'>
              <Logout />
            </ul>
          }
          {!isLoggedIn &&
            <ul className='menu'>
              <Text>Vous n&apos;êtes pas connecté</Text>
              <Button variant="primary" width="full-width" href="/se-connecter">Se connecter</Button>
            </ul>
          }
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
