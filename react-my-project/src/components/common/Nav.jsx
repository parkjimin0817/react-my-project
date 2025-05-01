import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoGoal } from 'react-icons/go';
import { FaMoon } from 'react-icons/fa';
import useThemeStore from '../../store/ThemeStore';

const Nav = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <NavBar>
      <div>
        <GoGoal size={50} color="tomato" />
      </div>
      <MenuList>
        <UserBox>
          <StyledLink to="/user">Log In</StyledLink> |
          <StyledLink to="/user/signin">Sign In</StyledLink>
        </UserBox>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/posts">Community</StyledLink>
      </MenuList>
      <div>
        <button onClick={toggleTheme}>{theme === 'dark' ? '🌙 다크모드' : '🌞 라이트모드'}</button>
      </div>
    </NavBar>
  );
};

export default Nav;

const NavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 200px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.nav};
`;
const StyledLink = styled(Link)`
  font-size: 18px;

  padding: 10px 10px 10px 10px;
`;
const UserBox = styled.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;
const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;
