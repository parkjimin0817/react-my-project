import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoGoal } from 'react-icons/go';
import useUserStore from '../../store/UserStore';

const Nav = () => {
  const { currentUser, logout } = useUserStore();
  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다. 또 와야돼요!');
  };
  return (
    <NavBar>
      <MenuList>
        <UserBox>
          {currentUser === null ? (
            <>
              <StyledLink to="/user">Log In</StyledLink> |<StyledLink to="/user/signin">Sign In</StyledLink>
            </>
          ) : (
            <>
              <StyledLink to="/" onClick={handleLogout}>
                Log Out
              </StyledLink>
              |<StyledLink to={`/user/${currentUser.id}`}>My Page</StyledLink>
            </>
          )}
        </UserBox>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/goals">My Goals</StyledLink>
        <StyledLink to="/posts">Community</StyledLink>
      </MenuList>
    </NavBar>
  );
};

export default Nav;

const NavBar = styled.div`
  position: fixed;
  top:70px;
  left: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 40px;
  background: ${({ theme }) => theme.nav};
`;
const StyledLink = styled(Link)`
  width: 100px;
  font-size: 18px;
  padding: 10px;
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  width: 20%;

`;
const MenuList = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  gap: 100px;
`;
