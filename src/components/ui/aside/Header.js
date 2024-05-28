import React, { useContext, useEffect, useState } from 'react';
import Section from '../wrapper/Section';
import styled, { keyframes } from 'styled-components';
import Container from '../wrapper/Container';
import InvisibleLink from '../button/InvisibleLink';
import HeaderSearch from './HeaderSearch';
import Stack from '../wrapper/Stack';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { useUser } from '@/utils/UserContext';


const StyledHeader = styled.header`
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 3;
  background: var(--transparent-bg-color);
  border-bottom: 2px solid var(--grey-color);
  padding: 10px 5% 10px 5%;
  align-items: center;
  justify-content: center;
  margin-left: ${props => (props.$isopen === 'open' ? '280px' : '0px')};
  transition: 0.2s;

  @media (max-width: 1000px) {
      margin-left: ${props => (props.$isopen === 'open' ? '0px' : '0px')};
    }
`;

const StyledAsideButton = styled.button`
  background-color: var(--bg-color);
  opacity: 1;
  border-radius: 5px;
  padding: 15px;
  position: relative;
  width: 40px;
  border: 2px solid var(--grey-color);
  height: 40px;
  display: flex;
  z-index: 2;
  transition: 0.3s;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    background: var(--color-title);
    width: 20px;
    height: 2px;
    border-radius: 50px;
    left: ${props => (props.$isopen === 'open' ? '50%' : '23%')};
    top: ${props => (props.$isopen === 'open' ? '50%' : '33%')};
    transform: ${props => (props.$isopen === 'open' ? 'translate(-50%, -50%) rotate(45deg)' : '')};
    transition: 0.3s;
}

&:hover::before{
    width: ${props => (props.$isopen === 'close' ? '18px' : '')};
    transform: ${props => (props.$isopen === 'open' ? 'translate(-50%, -50%) rotate(40deg)' : '')};
}

&:active::before{
    width: ${props => (props.$isopen === 'close' ? '15px' : '')};
    transform: ${props => (props.$isopen === 'open' ? 'translate(-50%, -50%) rotate(30deg)' : '')};
}

&::after {
    content: '';
    position: absolute;
    background: var(--color-title);
    width: 20px;
    height: 2px;
    border-radius: 50px;
    left: ${props => (props.$isopen === 'open' ? '50%' : '23%')};
    bottom: ${props => (props.$isopen === 'open' ? '50%' : '33%')};
    top: ${props => (props.$isopen === 'open' ? '50%' : '')};
    transform: ${props => (props.$isopen === 'open' ? 'translate(-50%, -50%) rotate(-45deg)' : '')};
    transition: 0.3s;

}

&:hover::after{
    width: ${props => (props.$isopen === 'close' ? '15px' : '')};
    transform: ${props => (props.$isopen === 'open' ? 'translate(-50%, -50%) rotate(-40deg)' : '')};
}

&:active::after{
    width: ${props => (props.$isopen === 'close' ? '10px' : '')};
    transform: ${props => (props.$isopen === 'open' ? 'translate(-50%, -50%) rotate(-30deg)' : '')};
}
`;

function Header({ isopen, toggleSidebar }) {
    const { user, isLoggedIn } = useUser();
    return (
        <>
            <StyledHeader $isopen={isopen}>
                <Container direction="row" align="center" width="100%" justify="space-between" maxwidth="1100px">
                    <StyledAsideButton onClick={toggleSidebar} $isopen={isopen} />
                    <Stack align="center">
                        <>
                            <HeaderSearch icon={PiMagnifyingGlass}>
                                Rechercher
                            </HeaderSearch>
                            {isLoggedIn && user?.pseudo &&
                                <InvisibleLink href="/profil" lineheight="0">
                                    <img className="user-picture-2" alt={user.pseudo} src="https://lh3.googleusercontent.com/ogw/AF2bZyjtjwRu-VKvzKCDe2olcMFTJRDJ4H5mTLcw6q8kBTggCRY=s32-c-mo"></img>
                                </InvisibleLink>
                            }
                        </>
                    </Stack>
                </Container>
            </StyledHeader>
        </>
    );
}

export default Header;